import { describe, it, expect } from 'vitest';
import { createDotWave, createTopography, type BackdropContext } from '../src/lib/canvasBackdrop';

// O fundo animado foi reescrito para gastar menos (src/lib/canvasBackdrop.ts), com a promessa de
// desenhar exatamente o mesmo. Aqui cada comando de desenho do motor novo é comparado com a fórmula
// original dos efeitos BoldKit (DotWave e Topography), copiada abaixo como referência.

type Call = [string, ...(number | string)[]];

function recorder() {
  const calls: Call[] = [];
  const ctx = {
    globalAlpha: 1,
    lineWidth: 1,
    _fill: '',
    _stroke: '',
    set fillStyle(v: string) { this._fill = v; },
    get fillStyle() { return this._fill; },
    set strokeStyle(v: string) { this._stroke = v; },
    get strokeStyle() { return this._stroke; },
    clearRect(x: number, y: number, w: number, h: number) { calls.push(['clearRect', x, y, w, h]); },
    fillRect(x: number, y: number, w: number, h: number) { calls.push(['fillRect', x, y, w, h, this.globalAlpha, this._fill]); },
    beginPath() { calls.push(['beginPath']); },
    moveTo(x: number, y: number) { calls.push(['moveTo', x, y]); },
    lineTo(x: number, y: number) { calls.push(['lineTo', x, y]); },
    stroke() { calls.push(['stroke', this._stroke, this.lineWidth]); },
  };
  return { ctx: ctx as unknown as BackdropContext, calls };
}

// ─── Referência: DotWave original ────────────────────────────────────────────
function referenceDotWave(ctx: BackdropContext, W: number, H: number, t: number, color = '#ef4444', GAP = 22) {
  ctx.clearRect(0, 0, W, H);
  const cols = Math.ceil(W / GAP) + 1;
  const rows = Math.ceil(H / GAP) + 1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = (Math.sin(c * 0.45 + r * 0.3 - t * 1.2) + Math.sin(c * 0.2 - r * 0.4 + t * 0.8) + 2) / 4;
      const size = 2 + v * 8;
      ctx.globalAlpha = 0.15 + v * 0.85;
      ctx.fillStyle = color;
      ctx.fillRect(c * GAP + GAP / 2 - size / 2, r * GAP + GAP / 2 - size / 2, size, size);
    }
  }
  ctx.globalAlpha = 1;
}

// ─── Referência: Topography original ─────────────────────────────────────────
function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function vNoise(x: number, y: number): number {
  const f = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lp = (a: number, b: number, t: number) => a + (b - a) * t;
  const h = (nx: number, ny: number) => {
    const n = Math.sin(nx * 127.1 + ny * 311.7) * 43758.5453;
    return n - Math.floor(n);
  };
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  return lp(lp(h(ix, iy), h(ix + 1, iy), f(fx)), lp(h(ix, iy + 1), h(ix + 1, iy + 1), f(fx)), f(fy));
}
function fbm(x: number, y: number): number {
  return vNoise(x, y) * 0.5 + vNoise(x * 2.1 + 5.3, y * 2.1 + 1.7) * 0.3 + vNoise(x * 4.3 + 9.1, y * 4.3 + 3.9) * 0.2;
}
const PALETTE = ['#0d2137', '#134e5e', '#1a7a5c', '#5da84e', '#c4b44a', '#e07e3a', '#b84232'];
function referenceTopography(ctx: BackdropContext, W: number, H: number, t: number, lvl = 12) {
  const CELL = 6;
  const pal = PALETTE.map(hexToRgb);
  ctx.fillStyle = '#0a0e17';
  ctx.fillRect(0, 0, W, H);
  const cols = Math.ceil(W / CELL) + 1;
  const rows = Math.ceil(H / CELL) + 1;
  const noiseScale = 0.008;
  const grid: number[][] = [];
  for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < cols; c++) grid[r][c] = fbm(c * CELL * noiseScale + t * 0.3, r * CELL * noiseScale + t * 0.2);
  }
  for (let lv = 0; lv < lvl; lv++) {
    const threshold = (lv + 1) / (lvl + 1);
    const frac = lv / (lvl - 1 || 1);
    const s = pal.length - 1;
    const idx = Math.min(s - 1, Math.floor(frac * s));
    const f = frac * s - idx;
    const a = pal[idx], b = pal[idx + 1];
    const cr = a[0] + (b[0] - a[0]) * f, cg = a[1] + (b[1] - a[1]) * f, cb = a[2] + (b[2] - a[2]) * f;
    const alpha = 0.3 + frac * 0.5;
    ctx.beginPath();
    for (let r = 0; r < rows - 1; r++) {
      for (let c = 0; c < cols - 1; c++) {
        const tl = grid[r][c], tr = grid[r][c + 1], bl = grid[r + 1][c], br = grid[r + 1][c + 1];
        const config = (tl >= threshold ? 8 : 0) | (tr >= threshold ? 4 : 0) | (br >= threshold ? 2 : 0) | (bl >= threshold ? 1 : 0);
        if (config === 0 || config === 15) continue;
        const x0 = c * CELL, y0 = r * CELL;
        const lerp = (p: number, q: number) => { const d = q - p; return d === 0 ? 0.5 : (threshold - p) / d; };
        const top = { x: x0 + lerp(tl, tr) * CELL, y: y0 };
        const right = { x: x0 + CELL, y: y0 + lerp(tr, br) * CELL };
        const bottom = { x: x0 + lerp(bl, br) * CELL, y: y0 + CELL };
        const left = { x: x0, y: y0 + lerp(tl, bl) * CELL };
        const line = (p: { x: number; y: number }, q: { x: number; y: number }) => { ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); };
        switch (config) {
          case 1: case 14: line(left, bottom); break;
          case 2: case 13: line(bottom, right); break;
          case 3: case 12: line(left, right); break;
          case 4: case 11: line(top, right); break;
          case 5: line(left, top); line(bottom, right); break;
          case 6: case 9: line(top, bottom); break;
          case 7: case 8: line(left, top); break;
          case 10: line(left, bottom); line(top, right); break;
        }
      }
    }
    ctx.strokeStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${alpha})`;
    ctx.lineWidth = lv === 0 || lv === lvl - 1 ? 1.4 : 0.8;
    ctx.stroke();
  }
}

function expectSameCalls(actual: Call[], expected: Call[], tolerance: number) {
  expect(actual.length).toBe(expected.length);
  for (let i = 0; i < expected.length; i++) {
    const a = actual[i];
    const e = expected[i];
    expect(a[0], `comando ${i}`).toBe(e[0]);
    for (let k = 1; k < e.length; k++) {
      if (typeof e[k] === 'number') {
        if (Math.abs((a[k] as number) - (e[k] as number)) > tolerance) {
          throw new Error(`comando ${i} (${e[0]}), argumento ${k}: ${a[k]} ≠ ${e[k]}`);
        }
      } else if (a[k] !== e[k]) {
        throw new Error(`comando ${i} (${e[0]}), argumento ${k}: ${a[k]} ≠ ${e[k]}`);
      }
    }
  }
}

// Tamanhos reais: iPhone (390×844 a 3x), Android comum (360×800 a 2x) e desktop.
const SIZES: Array<[number, number]> = [[1170, 2532], [720, 1600], [1440, 900]];
// A referência original é lenta de propósito (é o que o motor novo substitui): folga no relógio.
const SLOW = 60_000;

describe('fundo animado: motor novo desenha o mesmo que o original', () => {
  it('DotWave: mesmos quadrados, tamanhos e opacidades em vários instantes', () => {
    for (const [W, H] of SIZES) {
      const size = { width: W, height: H };
      const { ctx, calls } = recorder();
      const frame = createDotWave(ctx, size);
      let t = 0;
      for (const step of [1, 2, 2, 1.7, 6]) {
        calls.length = 0;
        frame(step);
        const ref = recorder();
        referenceDotWave(ref.ctx, W, H, t);
        // A soma de ângulos por tabela difere da conta direta só no último bit do ponto flutuante.
        expectSameCalls(calls, ref.calls, 1e-9);
        t += 0.035 * step;
      }
    }
  }, SLOW);

  it('Topography: mesmas curvas de nível, cores e espessuras em vários instantes', () => {
    for (const [W, H] of SIZES) {
      const size = { width: W, height: H };
      const { ctx, calls } = recorder();
      const frame = createTopography(ctx, size, { lineColor: '#5B2A85', speed: 0.5 });
      let t = 0;
      for (const step of [2, 2, 1.3]) {
        calls.length = 0;
        frame(step);
        const ref = recorder();
        referenceTopography(ref.ctx, W, H, t);
        // Mesmas operações, na mesma ordem: o resultado é idêntico bit a bit.
        expectSameCalls(calls, ref.calls, 0);
        t += 0.006 * 0.5 * step;
      }
    }
  }, SLOW);

  it('redimensionar no meio da animação continua desenhando igual', () => {
    const size = { width: 720, height: 1600 };
    const { ctx, calls } = recorder();
    const frame = createTopography(ctx, size, { lineColor: '#5B2A85', speed: 0.5 });
    frame(2);
    size.width = 1600;
    size.height = 720;
    calls.length = 0;
    frame(2);
    const ref = recorder();
    referenceTopography(ref.ctx, 1600, 720, 0.006 * 0.5 * 2);
    expectSameCalls(calls, ref.calls, 0);
  }, SLOW);
});
