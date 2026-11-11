// canvasBackdrop.ts — o fundo animado do volume Cartaz (DESIGN.md › Movimento › Canvas), sem React.
//
// Mesmo desenho dos efeitos BoldKit DotWave e Topography (mesmas fórmulas, cores e velocidade),
// com o motor refeito para caber num celular, do jeito que se fazia em hardware limitado:
//
//   - Tabelas no lugar de contas repetidas. O DotWave separa as duas ondas em tabelas por coluna e
//     por linha (sen(a+b) = sen a·cos b + cos a·sen b): nenhum seno dentro do laço dos pontos.
//     A Topography calcula o ruído só nos nós da malha (alguns milhares) e interpola entre eles;
//     antes eram ~12 senos por célula, mais de um milhão por quadro num celular.
//   - Nada de memória nova por quadro: a grade e os segmentos vivem em vetores reaproveitados.
//   - As curvas de nível saem numa passada só pela grade (cada célula sabe quais níveis a cruzam),
//     em vez de uma passada inteira por nível.
//   - 30 quadros por segundo. O passo de tempo é proporcional ao tempo real, então a velocidade do
//     movimento é a mesma de antes.
//   - Parado quando ninguém vê: aba em segundo plano, fora da tela, tour ou abertura por cima.
//
// tests/canvasBackdrop.test.ts compara cada comando de desenho com a fórmula original.

export type BackdropKind = 'dotwave' | 'topography';

/** Só o que os desenhos usam do contexto 2D (o teste entra com um gravador no lugar). */
export type BackdropContext = Pick<
  CanvasRenderingContext2D,
  'clearRect' | 'fillRect' | 'beginPath' | 'moveTo' | 'lineTo' | 'stroke' | 'globalAlpha' | 'fillStyle' | 'strokeStyle' | 'lineWidth'
>;

export interface BackdropSize {
  width: number;
  height: number;
}

/** Desenha um quadro e avança o tempo em `frames` quadros de 60 fps. */
export type BackdropFrame = (frames: number) => void;

// ─── DotWave ─────────────────────────────────────────────────────────────────
// v = (sen(c·0,45 + r·0,3 − t·1,2) + sen(c·0,2 − r·0,4 + t·0,8) + 2) / 4

export interface DotWaveOptions {
  color?: string;
  gap?: number;
  speed?: number;
}

export function createDotWave(ctx: BackdropContext, size: BackdropSize, options: DotWaveOptions = {}): BackdropFrame {
  const { color = '#ef4444', gap = 22, speed = 1 } = options;
  let t = 0;
  let cols = 0;
  let rows = 0;
  // Por linha (não mudam com o tempo): cos/sen de r·0,3 e de r·0,4.
  let cosB = new Float64Array(0);
  let sinB = new Float64Array(0);
  let cosD = new Float64Array(0);
  let sinD = new Float64Array(0);
  // Por coluna (mudam a cada quadro): sen/cos de c·0,45 − 1,2t e de c·0,2 + 0,8t.
  let sinA = new Float64Array(0);
  let cosA = new Float64Array(0);
  let sinC = new Float64Array(0);
  let cosC = new Float64Array(0);

  return (frames) => {
    const W = size.width;
    const H = size.height;
    ctx.clearRect(0, 0, W, H);
    const nCols = Math.ceil(W / gap) + 1;
    const nRows = Math.ceil(H / gap) + 1;
    if (nRows !== rows) {
      rows = nRows;
      cosB = new Float64Array(rows);
      sinB = new Float64Array(rows);
      cosD = new Float64Array(rows);
      sinD = new Float64Array(rows);
      for (let r = 0; r < rows; r++) {
        cosB[r] = Math.cos(r * 0.3);
        sinB[r] = Math.sin(r * 0.3);
        cosD[r] = Math.cos(r * 0.4);
        sinD[r] = Math.sin(r * 0.4);
      }
    }
    if (nCols !== cols) {
      cols = nCols;
      sinA = new Float64Array(cols);
      cosA = new Float64Array(cols);
      sinC = new Float64Array(cols);
      cosC = new Float64Array(cols);
    }
    for (let c = 0; c < cols; c++) {
      const a = c * 0.45 - t * 1.2;
      const k = c * 0.2 + t * 0.8;
      sinA[c] = Math.sin(a);
      cosA[c] = Math.cos(a);
      sinC[c] = Math.sin(k);
      cosC[c] = Math.cos(k);
    }

    ctx.fillStyle = color;
    const half = gap / 2;
    for (let r = 0; r < rows; r++) {
      const cb = cosB[r];
      const sb = sinB[r];
      const cd = cosD[r];
      const sd = sinD[r];
      const y = r * gap + half;
      for (let c = 0; c < cols; c++) {
        const v = (sinA[c] * cb + cosA[c] * sb + (sinC[c] * cd - cosC[c] * sd) + 2) / 4;
        const dot = 2 + v * 8;
        ctx.globalAlpha = 0.15 + v * 0.85;
        ctx.fillRect(c * gap + half - dot / 2, y - dot / 2, dot, dot);
      }
    }
    ctx.globalAlpha = 1;
    t += 0.035 * speed * frames;
  };
}

// ─── Topography ──────────────────────────────────────────────────────────────
// Campo de elevação de ruído (3 oitavas) com curvas de nível por marching squares.

export interface TopographyOptions {
  lineColor?: string;
  levels?: number;
  speed?: number;
  palette?: string[];
}

const TOPO_PALETTE = ['#0d2137', '#134e5e', '#1a7a5c', '#5da84e', '#c4b44a', '#e07e3a', '#b84232'];
const TOPO_CELL = 6;
const TOPO_NOISE_SCALE = 0.008;
/** Oitavas do ruído: escala, deslocamento em x e y, peso. */
const TOPO_OCTAVES = [
  { scale: 1, ox: 0, oy: 0, weight: 0.5 },
  { scale: 2.1, ox: 5.3, oy: 1.7, weight: 0.3 },
  { scale: 4.3, ox: 9.1, oy: 3.9, weight: 0.2 },
] as const;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const quintic = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

function latticeHash(nx: number, ny: number): number {
  const n = Math.sin(nx * 127.1 + ny * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

/** Uma oitava: para cada coluna/linha, o nó da malha à esquerda/acima e o peso da interpolação. */
interface OctaveAxes {
  ix: Int32Array;
  wx: Float64Array;
  iy: Int32Array;
  wy: Float64Array;
  hash: Float64Array;
}

export function createTopography(ctx: BackdropContext, size: BackdropSize, options: TopographyOptions = {}): BackdropFrame {
  const { lineColor = '#8ecae6', levels = 12, speed = 1, palette = TOPO_PALETTE } = options;
  const CELL = TOPO_CELL;
  const pal = palette.map(hexToRgb);
  const base = hexToRgb(lineColor);

  // Por nível: limiar, cor e espessura não mudam de um quadro para o outro.
  const thresholds = new Float64Array(levels);
  const strokes: string[] = [];
  const widths = new Float64Array(levels);
  for (let lv = 0; lv < levels; lv++) {
    thresholds[lv] = (lv + 1) / (levels + 1);
    const frac = lv / (levels - 1 || 1);
    let cr: number, cg: number, cb: number;
    if (pal.length > 1) {
      const s = pal.length - 1;
      const idx = Math.min(s - 1, Math.floor(frac * s));
      const f = frac * s - idx;
      const a = pal[idx];
      const b = pal[idx + 1];
      cr = a[0] + (b[0] - a[0]) * f;
      cg = a[1] + (b[1] - a[1]) * f;
      cb = a[2] + (b[2] - a[2]) * f;
    } else {
      [cr, cg, cb] = base;
    }
    strokes.push(`rgba(${cr | 0},${cg | 0},${cb | 0},${0.3 + frac * 0.5})`);
    widths[lv] = lv === 0 || lv === levels - 1 ? 1.4 : 0.8;
  }

  let t = 0;
  let cols = 0;
  let rows = 0;
  let grid = new Float64Array(0);
  const octaves: OctaveAxes[] = TOPO_OCTAVES.map(() => ({
    ix: new Int32Array(0),
    wx: new Float64Array(0),
    iy: new Int32Array(0),
    wy: new Float64Array(0),
    hash: new Float64Array(0),
  }));
  // Segmentos de cada nível (x1, y1, x2, y2), reaproveitados entre quadros.
  const segs: Float64Array[] = Array.from({ length: levels }, () => new Float64Array(1024));
  const segLen = new Int32Array(levels);

  const push = (lv: number, x1: number, y1: number, x2: number, y2: number) => {
    let buf = segs[lv];
    const n = segLen[lv];
    if (n + 4 > buf.length) {
      const grown = new Float64Array(buf.length * 2);
      grown.set(buf);
      buf = segs[lv] = grown;
    }
    buf[n] = x1;
    buf[n + 1] = y1;
    buf[n + 2] = x2;
    buf[n + 3] = y2;
    segLen[lv] = n + 4;
  };

  return (frames) => {
    const W = size.width;
    const H = size.height;
    if (!W || !H) return;

    ctx.fillStyle = '#0a0e17';
    ctx.fillRect(0, 0, W, H);

    const nCols = Math.ceil(W / CELL) + 1;
    const nRows = Math.ceil(H / CELL) + 1;
    if (nCols !== cols || nRows !== rows) {
      cols = nCols;
      rows = nRows;
      grid = new Float64Array(cols * rows);
      for (const o of octaves) {
        o.ix = new Int32Array(cols);
        o.wx = new Float64Array(cols);
        o.iy = new Int32Array(rows);
        o.wy = new Float64Array(rows);
      }
    }

    // 1) Ruído: nós da malha uma vez por quadro, interpolação por célula.
    grid.fill(0);
    for (let k = 0; k < TOPO_OCTAVES.length; k++) {
      const { scale, ox, oy, weight } = TOPO_OCTAVES[k];
      const o = octaves[k];
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (let c = 0; c < cols; c++) {
        const x0 = c * CELL * TOPO_NOISE_SCALE + t * 0.3;
        const x = k === 0 ? x0 : x0 * scale + ox;
        const i = Math.floor(x);
        o.ix[c] = i;
        o.wx[c] = quintic(x - i);
        if (i < minX) minX = i;
        if (i > maxX) maxX = i;
      }
      for (let r = 0; r < rows; r++) {
        const y0 = r * CELL * TOPO_NOISE_SCALE + t * 0.2;
        const y = k === 0 ? y0 : y0 * scale + oy;
        const j = Math.floor(y);
        o.iy[r] = j;
        o.wy[r] = quintic(y - j);
        if (j < minY) minY = j;
        if (j > maxY) maxY = j;
      }
      const hw = maxX - minX + 2;
      const hh = maxY - minY + 2;
      if (o.hash.length < hw * hh) o.hash = new Float64Array(hw * hh);
      const hash = o.hash;
      for (let j = 0; j < hh; j++) for (let i = 0; i < hw; i++) hash[j * hw + i] = latticeHash(minX + i, minY + j);

      for (let r = 0; r < rows; r++) {
        const rowTop = (o.iy[r] - minY) * hw;
        const rowBottom = rowTop + hw;
        const fy = o.wy[r];
        const out = r * cols;
        for (let c = 0; c < cols; c++) {
          const i = o.ix[c] - minX;
          const fx = o.wx[c];
          const h00 = hash[rowTop + i];
          const h10 = hash[rowTop + i + 1];
          const h01 = hash[rowBottom + i];
          const h11 = hash[rowBottom + i + 1];
          const top = h00 + (h10 - h00) * fx;
          const bottom = h01 + (h11 - h01) * fx;
          grid[out + c] += (top + (bottom - top) * fy) * weight;
        }
      }
    }

    // 2) Curvas de nível: cada célula só visita os níveis que passam por ela.
    segLen.fill(0);
    const scaleLv = levels + 1;
    for (let r = 0; r < rows - 1; r++) {
      const y0 = r * CELL;
      const rowA = r * cols;
      const rowB = rowA + cols;
      for (let c = 0; c < cols - 1; c++) {
        const tl = grid[rowA + c];
        const tr = grid[rowA + c + 1];
        const bl = grid[rowB + c];
        const br = grid[rowB + c + 1];
        let lo = tl, hi = tl;
        if (tr < lo) lo = tr; else if (tr > hi) hi = tr;
        if (bl < lo) lo = bl; else if (bl > hi) hi = bl;
        if (br < lo) lo = br; else if (br > hi) hi = br;

        // Um nível cruza a célula quando lo < limiar <= hi.
        let lv = Math.floor(lo * scaleLv) - 1;
        if (lv < 0) lv = 0;
        while (lv < levels && thresholds[lv] <= lo) lv++;
        if (lv >= levels || thresholds[lv] > hi) continue;

        const x0 = c * CELL;
        for (; lv < levels && thresholds[lv] <= hi; lv++) {
          const threshold = thresholds[lv];
          const config = (tl >= threshold ? 8 : 0) | (tr >= threshold ? 4 : 0) | (br >= threshold ? 2 : 0) | (bl >= threshold ? 1 : 0);
          if (config === 0 || config === 15) continue;

          const dTop = tr - tl;
          const dRight = br - tr;
          const dBottom = br - bl;
          const dLeft = bl - tl;
          const topX = x0 + (dTop === 0 ? 0.5 : (threshold - tl) / dTop) * CELL;
          const rightY = y0 + (dRight === 0 ? 0.5 : (threshold - tr) / dRight) * CELL;
          const bottomX = x0 + (dBottom === 0 ? 0.5 : (threshold - bl) / dBottom) * CELL;
          const leftY = y0 + (dLeft === 0 ? 0.5 : (threshold - tl) / dLeft) * CELL;

          switch (config) {
            case 1: case 14: push(lv, x0, leftY, bottomX, y0 + CELL); break;
            case 2: case 13: push(lv, bottomX, y0 + CELL, x0 + CELL, rightY); break;
            case 3: case 12: push(lv, x0, leftY, x0 + CELL, rightY); break;
            case 4: case 11: push(lv, topX, y0, x0 + CELL, rightY); break;
            case 5: push(lv, x0, leftY, topX, y0); push(lv, bottomX, y0 + CELL, x0 + CELL, rightY); break;
            case 6: case 9: push(lv, topX, y0, bottomX, y0 + CELL); break;
            case 7: case 8: push(lv, x0, leftY, topX, y0); break;
            case 10: push(lv, x0, leftY, bottomX, y0 + CELL); push(lv, topX, y0, x0 + CELL, rightY); break;
          }
        }
      }
    }

    // 3) Um traço por nível, na ordem original (do mais baixo ao mais alto).
    for (let lv = 0; lv < levels; lv++) {
      const buf = segs[lv];
      const n = segLen[lv];
      ctx.beginPath();
      for (let i = 0; i < n; i += 4) {
        ctx.moveTo(buf[i], buf[i + 1]);
        ctx.lineTo(buf[i + 2], buf[i + 3]);
      }
      ctx.strokeStyle = strokes[lv];
      ctx.lineWidth = widths[lv];
      ctx.stroke();
    }

    t += 0.006 * speed * frames;
  };
}

// ─── Ciclo de vida ───────────────────────────────────────────────────────────

const FRAME_MS = 1000 / 30;
/** Folga para o relógio do navegador: um quadro que chega 3 ms antes ainda conta. */
const FRAME_SLACK_MS = 3;

export interface BackdropHandle {
  dispose(): void;
}

/**
 * Liga um desenho a um <canvas> que ocupa o elemento pai. Tamanho em pixels do aparelho (o desenho
 * mede o espaçamento em pixels físicos, como antes), 30 fps, parado quando `isCovered()` diz que
 * algo cobre a tela, quando sai da tela ou quando a aba vai para segundo plano.
 */
export function mountBackdrop(canvas: HTMLCanvasElement, kind: BackdropKind, isCovered: () => boolean = () => false): BackdropHandle {
  const ctx = canvas.getContext('2d');
  if (!ctx) return { dispose() {} };

  const size: BackdropSize = { width: canvas.width, height: canvas.height };
  const updateSize = () => {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = Math.round(rect.width * dpr) || canvas.clientWidth || 300;
    const h = Math.round(rect.height * dpr) || canvas.clientHeight || 150;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    size.width = canvas.width;
    size.height = canvas.height;
  };
  updateSize();

  const frame = kind === 'topography' ? createTopography(ctx, size, { lineColor: '#5B2A85', speed: 0.5 }) : createDotWave(ctx, size);

  let disposed = false;
  let onScreen = true;
  let raf = 0;
  let last = 0;

  const loop = (now: number) => {
    raf = 0;
    if (disposed) return;
    const elapsed = now - last;
    if (elapsed >= FRAME_MS - FRAME_SLACK_MS) {
      last = now;
      // Passo em quadros de 60 fps: 2 a 30 fps. Limitado para a volta de uma pausa não dar um salto.
      frame(Math.min(Math.max((elapsed / 1000) * 60, 0.5), 6));
    }
    raf = requestAnimationFrame(loop);
  };
  const sync = () => {
    const run = !disposed && onScreen && !document.hidden && !isCovered();
    if (run && !raf) {
      last = performance.now() - FRAME_MS; // desenha já no primeiro quadro, com passo de um quadro
      raf = requestAnimationFrame(loop);
    } else if (!run && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };

  const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateSize) : null;
  resizeObserver?.observe(canvas);
  const intersection =
    typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(
          (entries) => {
            onScreen = entries[0] ? entries[0].isIntersecting : true;
            sync();
          },
          { threshold: 0.05 }
        )
      : null;
  intersection?.observe(canvas);
  // A abertura e os tours cobrem a página inteira: o fundo espera por baixo sem gastar bateria.
  const coverObserver = new MutationObserver(sync);
  coverObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-semente-tour'] });
  document.addEventListener('visibilitychange', sync);
  sync();

  return {
    dispose() {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      resizeObserver?.disconnect();
      intersection?.disconnect();
      coverObserver.disconnect();
      document.removeEventListener('visibilitychange', sync);
    },
  };
}

/** Teto da abertura (SplashScreen.astro some sozinha em 8s mesmo se o script dela falhar). */
const SPLASH_CEILING_MS = 9000;

/** A tela está coberta pela abertura (splash) ou por um tour da chapa? */
function pageIsCovered(): boolean {
  const root = document.documentElement;
  const splashUp = !root.classList.contains('cagp-booted') && performance.now() < SPLASH_CEILING_MS;
  return splashUp || root.classList.contains('cagp-semente-tour-open') || root.getAttribute('data-semente-tour') === 'pending';
}

let current: BackdropHandle | null = null;

/** Monta o fundo da página atual (o <div id="cagp-canvas-backdrop"> só existe nas páginas Cartaz). */
function mountCurrentPage(): void {
  current?.dispose();
  current = null;
  const host = document.getElementById('cagp-canvas-backdrop');
  if (!host) return;
  let canvas = host.querySelector('canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.style.cssText = 'display:block;width:100%;height:100%';
    host.appendChild(canvas);
  }
  const kind: BackdropKind = host.dataset.shader === 'topography' ? 'topography' : 'dotwave';
  current = mountBackdrop(canvas, kind, pageIsCovered);
  // Se a abertura nunca avisar que saiu, o fundo começa quando o teto dela passar.
  const wait = SPLASH_CEILING_MS - performance.now();
  if (wait > 0 && !document.documentElement.classList.contains('cagp-booted')) {
    window.setTimeout(() => {
      if (!document.documentElement.classList.contains('cagp-booted')) mountCurrentPage();
    }, wait + 50);
  }
}

/** Chamado uma vez pelo GlobalCanvasBackdrop.astro. Remonta a cada troca de página do ClientRouter. */
export function setupCanvasBackdrop(): void {
  const w = window as unknown as { __cagpCanvasBackdrop?: boolean };
  if (w.__cagpCanvasBackdrop) return;
  w.__cagpCanvasBackdrop = true;
  const idle = window.requestIdleCallback ? (fn: () => void) => window.requestIdleCallback(fn) : (fn: () => void) => window.setTimeout(fn, 1);
  // Decoração: entra quando o navegador está livre, depois do conteúdo.
  document.addEventListener('astro:page-load', () => idle(mountCurrentPage));
  document.addEventListener('astro:before-swap', () => {
    current?.dispose();
    current = null;
  });
}
