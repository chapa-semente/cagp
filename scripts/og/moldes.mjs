// scripts/og/moldes.mjs — Os moldes vetoriais dos banners de compartilhamento (DESIGN.md › Banners de compartilhamento).
//
// Cada função devolve um SVG (texto) no tamanho final: 1200×630 para a prévia de link, 1080×1920 para story
// e 1080×1350 para feed. Quem fotografa os SVGs é scripts/generate-og.mjs, num Chrome sem janela e com as
// fontes do site. Anatomia fixa: bloco na cor da aba, gancho curto com uma palavra na caneta, um rosto ou um
// desenho na moldura de folha e a barra branca com o logo (asset oficial, sempre sobre branco), o grito
// "Faz o S!" na caneta laranja, a data e o adesivo do 2. As curvas de folha e de semente vêm de src/lib/sementeGeometry.ts; nada aqui remonta o símbolo.

export const TINTA = '#1F1F1F';
export const ROXO = '#5B2A85';
export const LARANJA = '#FE8812';
export const PETROLEO = '#266264';
export const AREIA = '#F4F2EC';
export const AREIA_FUNDA = '#E7E3D8';

/** Cor de cada aba (src/lib/estagios.ts) + um tom chapado mais fundo para a folha de fundo. */
export const ABAS = {
  hoje: { bg: '#5B2A85', fg: '#FFFFFF', fundo: '#4A216E', sub: '#EFE7F6', caneta: '#FFFFFF' },
  guias: { bg: '#8A4B2A', fg: '#FFFFFF', fundo: '#733C20', sub: '#F3E3D5', caneta: '#FFFFFF' },
  chapa: { bg: '#6DB33F', fg: '#1F1F1F', fundo: '#5CA032', sub: '#1F1F1F', caneta: '#5B2A85' },
  curso: { bg: '#266264', fg: '#FFFFFF', fundo: '#1D5052', sub: '#E3F0EF', caneta: '#FFFFFF' },
  mais: { bg: '#FFC83D', fg: '#1F1F1F', fundo: '#F5B41F', sub: '#1F1F1F', caneta: '#5B2A85' },
};

/** Os 4 eixos da carta-programa (src/lib/propostasTour.ts › PROPOSTA_EIXOS), com nome curto para a etiqueta. */
export const EIXOS = {
  1: { bg: '#8A4B2A', fg: '#FFFFFF', fundo: '#733C20', caneta: '#FFFFFF', nome: 'Transparência e gestão' },
  2: { bg: '#6DB33F', fg: '#1F1F1F', fundo: '#5CA032', caneta: '#5B2A85', nome: 'Cultura e bem viver' },
  3: { bg: '#266264', fg: '#FFFFFF', fundo: '#1D5052', caneta: '#FFFFFF', nome: 'Acadêmico e carreira' },
  4: { bg: '#FFC83D', fg: '#1F1F1F', fundo: '#F5B41F', caneta: '#5B2A85', nome: 'Comunicação' },
};

const BARRA = {
  antes: { texto: 'Eleição do CAGP · 25 e 26/11', adesivo: true, grito: true },
  dia: { texto: 'É hoje, até 22h30 · sala do CAGP', adesivo: true, grito: true },
  depois: { texto: 'O site do curso de Gestão Pública', adesivo: false, grito: false },
};

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const n1 = (v) => Math.round(v * 10) / 10;

/** Quebra equilibrada: o menor número de linhas que cabe em `max` caracteres, sem palavra órfã no fim. */
export function quebrar(texto, max) {
  const guloso = (lim) => {
    const linhas = [];
    let atual = '';
    for (const p of texto.split(/\s+/)) {
      if (atual && (atual + ' ' + p).length > lim) {
        linhas.push(atual);
        atual = p;
      } else atual = atual ? `${atual} ${p}` : p;
    }
    if (atual) linhas.push(atual);
    return linhas;
  };
  let linhas = guloso(max);
  for (let lim = max - 1; lim > 8; lim--) {
    const t = guloso(lim);
    if (t.length > linhas.length) break;
    linhas = t;
  }
  return linhas;
}

const semChaves = (s) => s.replace(/[{}]/g, '');
/** Maior corpo em que a linha mais longa cabe na largura (Poppins Bold ≈ 0,66 em por caractere). */
function caber(linhas, largura, teto, k = 0.66) {
  const maior = Math.max(...linhas.map((l) => semChaves(l).length));
  return Math.floor(Math.min(teto, largura / (maior * k)));
}

// Largura aproximada das maiúsculas da Poppins Bold (em), para a caixa das etiquetas.
const LARG = { I: 0.3, J: 0.56, L: 0.56, E: 0.6, F: 0.58, T: 0.62, S: 0.64, Z: 0.64, P: 0.66, B: 0.68, R: 0.68, Y: 0.68, M: 0.92, W: 1.02, O: 0.8, Q: 0.8, G: 0.77, N: 0.76, C: 0.72, ' ': 0.28, '·': 0.3, '-': 0.42, 1: 0.42, '.': 0.28, '/': 0.4 };
const SEM_ACENTO = { Á: 'A', Ã: 'A', Â: 'A', É: 'E', Ê: 'E', Í: 'I', Ó: 'O', Ô: 'O', Õ: 'O', Ú: 'U', Ç: 'C' };
const largMaiusculas = (rotulo, corpo) => [...rotulo].reduce((soma, ch) => soma + (LARG[SEM_ACENTO[ch] ?? ch] ?? 0.72) + 0.045, 0) * corpo;

function cantos(x, y, w, h, tl, tr, br, bl) {
  return `M${n1(x + tl)},${n1(y)}H${n1(x + w - tr)}A${n1(tr)},${n1(tr)} 0 0 1 ${n1(x + w)},${n1(y + tr)}V${n1(y + h - br)}A${n1(br)},${n1(br)} 0 0 1 ${n1(x + w - br)},${n1(y + h)}H${n1(x + bl)}A${n1(bl)},${n1(bl)} 0 0 1 ${n1(x)},${n1(y + h - bl)}V${n1(y + tl)}A${n1(tl)},${n1(tl)} 0 0 1 ${n1(x + tl)},${n1(y)}Z`;
}
/** Canto de folha do kit: pontas no alto à direita e embaixo à esquerda. */
function folhaRet(x, y, w, h, k = 1) {
  const grande = Math.min(w, h) * 0.2 * k;
  const pequeno = Math.min(w, h) * 0.05 * k;
  return cantos(x, y, w, h, grande, pequeno, grande, pequeno);
}

function linha(s, corpo, corCaneta) {
  return s
    .split(/(\{[^}]+\})/)
    .map((p) =>
      p.startsWith('{')
        ? `<tspan class="mk" data-s="${corpo}" font-family="'Permanent Marker', cursive" font-weight="400" font-size="${Math.round(corpo * 1.02)}" fill="${corCaneta}">${esc(p.slice(1, -1))}</tspan>`
        : esc(p),
    )
    .join('');
}

function texto(x, y, linhas, corpo, cor, { peso = 700, entre = 1.12, ancora = 'start', caneta = '#FFFFFF', extra = '' } = {}) {
  const lista = Array.isArray(linhas) ? linhas : [linhas];
  let s = `<text x="${n1(x)}" y="${Math.round(y)}" font-family="Poppins, sans-serif" font-weight="${peso}" font-size="${corpo}" fill="${cor}" text-anchor="${ancora}" ${extra}>`;
  lista.forEach((l, i) => {
    s += `<tspan x="${n1(x)}" dy="${i === 0 ? 0 : Math.round(corpo * entre)}">${linha(l, corpo, caneta)}</tspan>`;
  });
  return `${s}</text>`;
}

function etiqueta(x, y, rotulo, { bg = '#FFFFFF', fg = TINTA, corpo = 20, h = 42, giro = 0, raio = 9, largura = null } = {}) {
  const r = rotulo.toUpperCase();
  const w = Math.round(largura ?? largMaiusculas(r, corpo) + 32);
  const ajuste = largura ? '' : ` textLength="${w - 32}" lengthAdjust="spacing"`;
  const svg =
    `<g${giro ? ` transform="rotate(${giro} ${x} ${y})"` : ''}>` +
    `<rect x="${x + 4}" y="${y + 4}" width="${w}" height="${h}" rx="${raio}" fill="${TINTA}"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${raio}" fill="${bg}" stroke="${TINTA}" stroke-width="3"/>` +
    `<text x="${x + w / 2}" y="${Math.round(y + h / 2 + corpo * 0.36)}" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="700" font-size="${corpo}" letter-spacing="${n1(corpo * 0.04)}" fill="${fg}"${ajuste}>${esc(r)}</text></g>`;
  return { svg, w };
}

/** Adesivo de número da chapa (DESIGN.md › Número da chapa): branco, canto de folha, sombra laranja + grafite. */
function adesivo2(x, y, k = 1, giro = -4) {
  const w = 112 * k;
  const h = 122 * k;
  const d = cantos(0, 0, w, h, 34 * k, 10 * k, 34 * k, 10 * k);
  return (
    `<g transform="translate(${n1(x)} ${n1(y)}) rotate(${giro} ${w / 2} ${h / 2})">` +
    `<path d="${d}" transform="translate(${10 * k} ${10 * k})" fill="${TINTA}"/>` +
    `<path d="${d}" transform="translate(${5 * k} ${5 * k})" fill="${LARANJA}" stroke="${TINTA}" stroke-width="${3 * k}"/>` +
    `<path d="${d}" fill="#FFFFFF" stroke="${TINTA}" stroke-width="${4 * k}"/>` +
    `<text x="${w / 2}" y="${31 * k}" text-anchor="middle" font-family="Poppins, sans-serif" font-size="${17 * k}" font-weight="700" letter-spacing="${0.9 * k}" fill="${TINTA}">CHAPA</text>` +
    `<text x="${w / 2}" y="${104 * k}" text-anchor="middle" font-family="Poppins, sans-serif" font-size="${84 * k}" font-weight="700" fill="${ROXO}">2</text></g>`
  );
}

function adesivoNumero(x, y, n, k = 1, giro = -5) {
  const w = 104 * k;
  const h = 112 * k;
  const d = cantos(0, 0, w, h, 32 * k, 9 * k, 32 * k, 9 * k);
  const corpo = (String(n).length === 1 ? 70 : 58) * k;
  return (
    `<g transform="translate(${x} ${y}) rotate(${giro} ${w / 2} ${h / 2})"><path d="${d}" transform="translate(${9 * k} ${9 * k})" fill="${TINTA}"/>` +
    `<path d="${d}" transform="translate(${4.5 * k} ${4.5 * k})" fill="${LARANJA}" stroke="${TINTA}" stroke-width="${3 * k}"/>` +
    `<path d="${d}" fill="#FFFFFF" stroke="${TINTA}" stroke-width="${4 * k}"/>` +
    `<text x="${w / 2}" y="${n1(h / 2 + corpo * 0.36)}" text-anchor="middle" font-family="Poppins, sans-serif" font-size="${corpo}" font-weight="700" fill="${ROXO}">${n}</text></g>`
  );
}

const folhaFundo = (cor, x = 1000, y = 640, giro = 22, k = 6.6) =>
  `<use href="#g-folha" transform="translate(${x} ${y}) rotate(${giro}) scale(${k})" fill="${cor}"/>`;

function adesivoModelo(x, y, giro = -5) {
  return etiqueta(x, y, 'Modelo · dados de exemplo', { bg: '#FEF3C7', corpo: 18, h: 38, giro, raio: 6 }).svg;
}

const abrir = (w, h, titulo) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(titulo)}">`;

/**
 * @param {object} cfg
 * @param {Record<string, {nome: string, cargo: string, w: number, h: number, fx: number, fy: number}>} cfg.pessoas
 * @param {string[]} cfg.ordem  ids na ordem da chapa
 * @param {{w: number, h: number}} cfg.logo  tamanho do asset #lg-h (logo horizontal policromático)
 * @param {{w: number, h: number}} cfg.logoBranco  tamanho do asset #lg-hb (logo horizontal negativo)
 * @param {'antes'|'dia'|'depois'} cfg.fase
 */
export function criarMoldes({ pessoas, ordem, logo, logoBranco, fase = 'antes' }) {
  let recorte = 0;
  const barraDaFase = BARRA[fase] ?? BARRA.antes;

  function foto(id, x, y, w, h, { rotulo = false, traco = 6, sombra = 10, giro = 0, corSombra = TINTA, broto = 0 } = {}) {
    const p = pessoas[id];
    if (!p) throw new Error(`Pessoa desconhecida no banner: ${id}`);
    const s = Math.max(w / p.w, h / p.h);
    const tx = x - (p.w * s - w) * p.fx;
    const ty = y - (p.h * s - h) * p.fy;
    const cid = `cp${++recorte}`;
    const d = folhaRet(x, y, w, h);
    let g = `<g${giro ? ` transform="rotate(${giro} ${Math.round(x + w / 2)} ${Math.round(y + h / 2)})"` : ''}>`;
    if (broto) {
      g += `<use href="#g-folha" transform="translate(${x + w - 34} ${y + 26}) rotate(34) scale(${broto})" fill="${LARANJA}" stroke="${TINTA}" stroke-width="${n1(5 / broto)}" stroke-linejoin="round"/>`;
    }
    if (sombra) g += `<path d="${d}" transform="translate(${sombra} ${sombra})" fill="${corSombra}"/>`;
    g +=
      `<clipPath id="${cid}"><path d="${d}"/></clipPath><g clip-path="url(#${cid})">` +
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${AREIA_FUNDA}"/>` +
      `<use href="#ph-${id}" transform="translate(${n1(tx)} ${n1(ty)}) scale(${s.toFixed(4)})"/>`;
    if (rotulo) {
      // Nome e cargo em etiqueta grafite sólida na base da foto, nunca soltos sobre a imagem.
      const alto = 78;
      const corpoNome = Math.floor(Math.min(27, (w - 44) / (p.nome.length * 0.66)));
      const corpoCargo = Math.floor(Math.min(18, (w - 44) / (p.cargo.length * 0.57)));
      g += `<rect x="${x}" y="${y + h - alto}" width="${w}" height="${alto}" fill="${TINTA}"/>`;
      g += texto(x + 22, y + h - alto + 34, p.nome, corpoNome, '#FFFFFF');
      g += texto(x + 22, y + h - alto + 60, p.cargo, corpoCargo, '#FFFFFF', { peso: 400 });
    }
    return `${g}</g><path d="${d}" fill="none" stroke="${TINTA}" stroke-width="${traco}"/></g>`;
  }

  function barra({ direita = barraDaFase.texto, adesivo = barraDaFase.adesivo, W = 1200, y = 534, h = 96 } = {}) {
    const k = 62 / logo.h;
    let s = `<rect x="0" y="${y}" width="${W}" height="${h}" fill="#FFFFFF"/><rect x="0" y="${y - 3}" width="${W}" height="5" fill="${TINTA}"/>`;
    s += `<use href="#lg-h" transform="translate(44 ${y + 17}) scale(${k.toFixed(4)})"/>`;
    // O grito da campanha na caneta: laranja com contorno de tinta, ao lado do logo.
    if (barraDaFase.grito && W === 1200) {
      s += `<text x="292" y="${y + 64}" transform="rotate(-3 292 ${y + 64})" font-family="'Permanent Marker', cursive" font-size="42" fill="${LARANJA}" stroke="${TINTA}" stroke-width="7" stroke-linejoin="round" paint-order="stroke">Faz o S!</text>`;
    }
    if (direita) s += texto(adesivo ? 1018 : 1150, y + 60, direita, 30, TINTA, { ancora: 'end' });
    if (adesivo) s += adesivo2(1046, y - 62);
    return s;
  }

  // Desenhos para páginas sem rosto: geometria do kit (canto de folha e as duas curvas do símbolo).
  function arte(tipo, numero) {
    const x = 846;
    const y = 62;
    const w = 284;
    const h = 330;
    const d = folhaRet(x, y, w, h);
    let g = `<path d="${d}" transform="translate(10 10)" fill="${TINTA}"/><path d="${d}" fill="#FFFFFF" stroke="${TINTA}" stroke-width="6"/>`;
    const cx = x + w / 2;
    const cy = y + h / 2;
    if (tipo === 'numero') {
      const corpo = Math.floor(Math.min(120, (w - 56) / (numero.length * 0.68)));
      g += texto(cx, cy - 18, numero, corpo, ROXO, { ancora: 'middle' });
      const tx0 = x + 42;
      const tw = w - 84;
      g += `<rect x="${tx0}" y="${cy + 62}" width="${tw}" height="24" rx="12" fill="${AREIA_FUNDA}" stroke="${TINTA}" stroke-width="4"/>`;
      g += `<rect x="${tx0}" y="${cy + 62}" width="${Math.round(tw * 0.64)}" height="24" rx="12" fill="${PETROLEO}" stroke="${TINTA}" stroke-width="4"/>`;
      g += `<use href="#g-folha" transform="translate(${Math.round(tx0 + tw * 0.64)} ${cy + 68}) rotate(26) scale(0.5)" fill="${LARANJA}" stroke="${TINTA}" stroke-width="9" stroke-linejoin="round"/>`;
    } else if (tipo === 'grade') {
      const nos = [
        [x + 40, y + 60, ROXO],
        [x + 160, y + 60, PETROLEO],
        [x + 100, y + 150, LARANJA],
        [x + 40, y + 240, PETROLEO],
        [x + 160, y + 240, ROXO],
      ];
      for (const [a, b] of [[0, 2], [1, 2], [2, 3], [2, 4]]) {
        g += `<path d="M${nos[a][0] + 42},${nos[a][1] + 26} L${nos[b][0] + 42},${nos[b][1] + 26}" stroke="${TINTA}" stroke-width="6" fill="none"/>`;
      }
      for (const [nx, ny, cor] of nos) g += `<path d="${folhaRet(nx, ny, 84, 52, 1.6)}" fill="${cor}" stroke="${TINTA}" stroke-width="5"/>`;
    } else if (tipo === 'fichas') {
      [[PETROLEO, -9], [LARANJA, 5], ['#FFFFFF', -2]].forEach(([cor, giro], i) => {
        g += `<g transform="rotate(${giro} ${cx} ${cy})"><path d="${folhaRet(cx - 78, cy - 104 + i * 8, 156, 200, 0.7)}" fill="${cor}" stroke="${TINTA}" stroke-width="5"/></g>`;
      });
      for (let i = 0; i < 4; i++) {
        g += `<rect x="${cx - 52}" y="${cy - 56 + i * 32}" width="${i < 3 ? 104 : 62}" height="12" rx="6" fill="${i === 0 ? ROXO : AREIA_FUNDA}"/>`;
      }
    } else if (tipo === 'balao') {
      g += `<path d="${folhaRet(cx - 96, cy - 110, 192, 170, 1.2)}" fill="${ROXO}" stroke="${TINTA}" stroke-width="6"/>`;
      g += `<path d="M${cx - 30},${cy + 56} l-34,58 l70,-58 z" fill="${ROXO}" stroke="${TINTA}" stroke-width="6" stroke-linejoin="round"/>`;
      g += `<rect x="${cx - 40}" y="${cy + 50}" width="60" height="12" fill="${ROXO}"/>`;
      g += texto(cx, cy + 14, '?', 120, '#FFFFFF', { ancora: 'middle' });
    } else {
      // planta: caule roxo, folhas laranja e verde-broto, semente na terra
      g += `<path d="M${cx},${y + h - 52} C${cx - 8},${cy + 30} ${cx + 14},${cy - 30} ${cx},${y + 70}" stroke="${ROXO}" stroke-width="12" fill="none" stroke-linecap="round"/>`;
      g += `<use href="#g-folha" transform="translate(${cx + 2} ${cy + 52}) rotate(52) scale(1.25)" fill="${LARANJA}" stroke="${TINTA}" stroke-width="4" stroke-linejoin="round"/>`;
      g += `<use href="#g-folha" transform="translate(${cx} ${cy + 6}) rotate(-58) scale(1.05)" fill="#6DB33F" stroke="${TINTA}" stroke-width="4.6" stroke-linejoin="round"/>`;
      g += `<use href="#g-folha" transform="translate(${cx + 2} ${y + 124}) rotate(8) scale(0.95)" fill="${LARANJA}" stroke="${TINTA}" stroke-width="5" stroke-linejoin="round"/>`;
      g += `<path d="M${x + 46},${y + h - 50} H${x + w - 46}" stroke="${TINTA}" stroke-width="6" stroke-linecap="round"/>`;
      g += `<use href="#g-gota" transform="translate(${cx} ${y + h - 22}) rotate(90) scale(0.5)" fill="#8A4B2A" stroke="${TINTA}" stroke-width="9"/>`;
    }
    return g;
  }

  // ---------- Dor e resposta: guia, ferramenta, catálogo ----------
  function pagina({ aba, etiqueta: rotulo, gancho, sub, pessoa, arte: tipoArte, numero, modelo }) {
    const st = ABAS[aba];
    if (!st) throw new Error(`Aba desconhecida no banner: ${aba}`);
    let o = abrir(1200, 630, semChaves(gancho.join(' ')));
    o += `<rect width="1200" height="534" fill="${st.bg}"/>${folhaFundo(st.fundo)}`;
    o += etiqueta(64, 50, rotulo).svg;
    const largura = pessoa || tipoArte ? 716 : 1040;
    const corpo = caber(gancho, largura, gancho.length <= 2 ? 82 : 68);
    const y0 = 122 + corpo;
    o += texto(64, y0, gancho, corpo, st.fg, { caneta: st.caneta });
    o += texto(64, y0 + (gancho.length - 1) * corpo * 1.12 + 62, sub, 32, st.sub, { peso: 400, entre: 1.36 });
    if (pessoa) o += foto(pessoa, 830, 54, 300, 380, { rotulo: true, broto: 0.92 });
    else if (tipoArte) o += arte(tipoArte, numero);
    if (modelo) o += adesivoModelo(742, 34);
    return `${o}${barra()}</svg>`;
  }

  // ---------- Cartaz da chapa: home ----------
  function home() {
    const st = ABAS.hoje;
    let o = abrir(1200, 630, 'Ninguém te contou? A gente conta.');
    o += `<rect width="1200" height="534" fill="${st.bg}"/>${folhaFundo(st.fundo, 520, 660, -18, 6.2)}`;
    o += etiqueta(64, 50, 'O site do curso de Gestão Pública · UFMG').svg;
    const gancho = ['Ninguém te contou?', 'A gente {conta}.'];
    const corpo = caber(gancho, 640, 72);
    o += texto(64, 128 + corpo, gancho, corpo, '#FFFFFF');
    o += texto(64, 128 + corpo * 2.12 + 66, ['Estágio, 600h, FUMP e documentos:', 'o guia do curso já está no ar.'], 32, st.sub, { peso: 400, entre: 1.36 });
    const t = 98;
    const vao = 13;
    ordem.forEach((id, i) => {
      const col = i % 3;
      const lin = Math.floor(i / 3);
      o += foto(id, 760 + col * (t + vao), 34 + lin * (t + vao), t, t, {
        traco: 4,
        sombra: 5,
        giro: [-2, 1.5, -1, 2][(i + lin) % 4],
        corSombra: [1, 6, 11].includes(i) ? LARANJA : TINTA,
      });
    });
    return `${o}${barra()}</svg>`;
  }

  // ---------- Cartaz da chapa: os três números que são fato ----------
  function chapa() {
    const st = ABAS.chapa;
    let o = abrir(1200, 630, '12 pessoas. 14 propostas. 1 site no ar.');
    o += `<rect width="1200" height="534" fill="${st.bg}"/>${folhaFundo(st.fundo, 1040, 560, 28, 6)}`;
    o += etiqueta(64, 46, 'Chapa 2 · Semente').svg;
    [[String(ordem.length), 'pessoas.'], ['14', 'propostas.'], ['1', 'site no ar.']].forEach(([num, palavra], i) => {
      o += `<text x="64" y="${176 + i * 84}" font-family="Poppins, sans-serif" font-weight="700" font-size="76" fill="${TINTA}"><tspan fill="${ROXO}">${num}</tspan> ${palavra}</text>`;
    });
    o += '<g transform="rotate(3 900 220)">';
    const d = folhaRet(680, 130, 440, 176, 0.9);
    o += `<path d="${d}" transform="translate(9 9)" fill="${TINTA}"/><path d="${d}" fill="#FFFFFF" stroke="${TINTA}" stroke-width="5"/>`;
    o += texto(716, 204, ['Toda mudança', 'começa {pequena}.'], 40, TINTA, { caneta: ROXO, entre: 1.4 });
    o += '</g>';
    ordem.forEach((id, i) => {
      o += foto(id, 64 + i * 79, 426, 70, 70, { traco: 4, sombra: 4 });
    });
    return `${o}${barra()}</svg>`;
  }

  // ---------- Cartaz de serviço: como votar ----------
  function votar() {
    const st = ABAS.hoje;
    let o = abrir(1200, 630, 'Como votar na eleição do CAGP');
    o += `<rect width="1200" height="534" fill="${st.bg}"/>${folhaFundo(st.fundo, 260, 640, -14, 6.4)}`;
    o += adesivo2(92, 96, 2.5, -5);
    o += etiqueta(452, 50, 'Como votar').svg;
    o += texto(452, 176, 'Eleição do CAGP', 64, '#FFFFFF');
    [['Quando', '25 e 26/11, das 17h às 22h30'], ['Onde', 'Sala do CAGP, na FAFICH'], ['Marque', 'Um X em uma chapa só']].forEach(([k, v], i) => {
      const y = 232 + i * 82;
      o += etiqueta(452, y, k, { bg: LARANJA, largura: 132 }).svg + texto(608, y + 33, v, 34, '#FFFFFF');
    });
    return `${o}${barra({ direita: 'Voto presencial e secreto', adesivo: false })}</svg>`;
  }

  // ---------- Documento na mão ----------
  function doc({ sigla, tipo, nome, sub, formatos = ['PDF'] }) {
    let o = abrir(1200, 630, nome.join(' '));
    o += `<rect width="1200" height="534" fill="${AREIA}"/><rect x="430" width="770" height="534" fill="${ROXO}"/>`;
    o += folhaFundo('#4A216E', 1060, 640, 24, 6.2);
    const sx = 92;
    const sy = 56;
    const sw = 322;
    const sh = 420;
    const folha = `M${sx},${sy} H${sx + sw - 58} L${sx + sw},${sy + 58} V${sy + sh} H${sx} Z`;
    o += '<g transform="rotate(-4 250 270)">';
    o += `<path d="${folha}" transform="translate(11 11)" fill="${TINTA}"/><path d="${folha}" fill="#FFFFFF" stroke="${TINTA}" stroke-width="5" stroke-linejoin="round"/>`;
    o += `<path d="M${sx + sw - 58},${sy} V${sy + 58} H${sx + sw} Z" fill="${AREIA_FUNDA}" stroke="${TINTA}" stroke-width="5" stroke-linejoin="round"/>`;
    // o rótulo do tipo para antes da dobra do canto
    const corpoTipo = Math.floor(Math.min(19, (sw - 110) / (tipo.length * 0.74)));
    o += texto(sx + 30, sy + 54, tipo.toUpperCase(), corpoTipo, '#5E5A52', { extra: 'letter-spacing="1"' });
    const corpoSigla = Math.floor(Math.min(96, (sw - 60) / (sigla.length * 0.7)));
    o += texto(sx + 28, sy + 78 + corpoSigla * 0.82, sigla, corpoSigla, ROXO);
    const ly = sy + 100 + corpoSigla;
    [250, 262, 210, 250, 150].forEach((larg, i) => {
      if (ly + i * 30 <= sy + sh - 110) o += `<rect x="${sx + 30}" y="${ly + i * 30}" width="${larg}" height="13" rx="6.5" fill="${AREIA_FUNDA}"/>`;
    });
    let fx = sx + 30;
    for (const f of formatos) {
      const e = etiqueta(fx, sy + sh - 74, f, { bg: f === 'PDF' ? ROXO : PETROLEO, fg: '#FFFFFF' });
      o += e.svg;
      fx += e.w + 14;
    }
    o += '</g>';
    o += etiqueta(500, 50, 'Documento pronto pra baixar').svg;
    o += texto(500, 162, 'Pediu? Tá {aqui}.', 42, '#FFFFFF', { peso: 400 });
    const corpo = caber(nome, 640, nome.length <= 2 ? 64 : 54);
    o += texto(500, 190 + corpo, nome, corpo, '#FFFFFF');
    o += texto(500, 190 + corpo + (nome.length - 1) * corpo * 1.12 + 56, sub, 30, '#EFE7F6', { peso: 400, entre: 1.36 });
    return `${o}${barra()}</svg>`;
  }

  // ---------- Proposta N de 14 ----------
  function proposta({ n, eixo, titulo, pessoa, fala, modelo }) {
    const e = EIXOS[eixo];
    const linhasTitulo = quebrar(titulo, 20);
    const linhasFala = quebrar(fala, 46);
    let o = abrir(1200, 630, `Proposta ${n}: ${titulo}`);
    o += `<rect width="1200" height="534" fill="${e.bg}"/>${folhaFundo(e.fundo)}`;
    o += adesivoNumero(60, 34, n);
    o += etiqueta(196, 58, `Proposta ${n} de 14 · ${e.nome}`, { corpo: 19 }).svg;
    const corpo = caber(linhasTitulo, 716, linhasTitulo.length <= 2 ? 66 : 56);
    o += texto(64, 168 + corpo, linhasTitulo, corpo, e.fg);
    const d = folhaRet(64, 392, 716, 108, 0.8);
    o += `<path d="${d}" transform="translate(7 7)" fill="${TINTA}"/><path d="${d}" fill="#FFFFFF" stroke="${TINTA}" stroke-width="4"/>`;
    const corpoFala = Math.min(caber(linhasFala, 656, 27, 0.56), linhasFala.length > 2 ? 23 : 27);
    const yFala = 392 + (linhasFala.length === 1 ? 54 + corpoFala * 0.36 : linhasFala.length === 2 ? 44 : 31);
    o += texto(92, yFala, linhasFala, corpoFala, TINTA, { peso: 400, entre: linhasFala.length > 2 ? 1.22 : 1.4 });
    o += foto(pessoa, 830, 54, 300, 380, { rotulo: true, broto: 0.92 });
    if (modelo) o += adesivoModelo(742, 34);
    return `${o}${barra()}</svg>`;
  }

  // ---------- Pessoa ----------
  function pessoa({ id, gancho, alternar }) {
    const p = pessoas[id];
    const [bg, fundo] = alternar ? [PETROLEO, '#1D5052'] : [ROXO, '#4A216E'];
    const linhas = quebrar(gancho, 27);
    let o = abrir(1200, 630, `${p.nome}, ${p.cargo}`);
    o += `<rect width="1200" height="534" fill="${bg}"/>${folhaFundo(fundo, 1040, 650, 20, 6.6)}`;
    o += foto(id, 64, 46, 360, 428, { broto: 1 });
    o += etiqueta(486, 50, p.cargo, { corpo: 19 }).svg;
    const corpoNome = Math.floor(Math.min(76, 640 / (p.nome.length * 0.68)));
    o += texto(486, 126 + corpoNome, p.nome, corpoNome, '#FFFFFF');
    const corpoGancho = caber(linhas, 620, 40, 0.58);
    o += texto(486, 126 + corpoNome + 78, linhas, corpoGancho, '#FFFFFF', { peso: 400, entre: 1.38 });
    return `${o}${barra()}</svg>`;
  }

  // ---------- Padrão ----------
  function padrao() {
    const st = ABAS.hoje;
    let o = abrir(1200, 630, 'Toda mudança começa pequena.');
    o += `<rect width="1200" height="534" fill="${st.bg}"/>${folhaFundo(st.fundo)}`;
    o += etiqueta(64, 50, 'Gestão Pública · UFMG').svg;
    o += texto(64, 204, ['Toda mudança', 'começa {pequena}.'], 80, '#FFFFFF');
    o += texto(64, 360, ['O site do curso, feito pela Chapa 2.'], 32, st.sub, { peso: 400 });
    o += arte('planta');
    return `${o}${barra()}</svg>`;
  }

  // ---------- Em pé: story do voto declarado (1080×1920) ----------
  function storyVoto() {
    const W = 1080;
    const H = 1920;
    let o = abrir(W, H, 'Eu voto Chapa 2');
    o += `<rect width="${W}" height="${H}" fill="${ROXO}"/>${folhaFundo('#4A216E', 860, 1960, 18, 15)}`;
    o += `<use href="#lg-hb" transform="translate(${(W - 560) / 2} 250) scale(${(560 / logoBranco.w).toFixed(4)})"/>`;
    o += texto(W / 2, 600, 'Eu voto', 150, '#FFFFFF', { ancora: 'middle' });
    o += adesivo2(W / 2 - 196, 660, 3.5, -5);
    o += '<g transform="rotate(-6 540 1220)">';
    o += `<rect x="150" y="1150" width="780" height="140" rx="20" fill="${TINTA}" transform="translate(10 10)"/>`;
    o += `<rect x="150" y="1150" width="780" height="140" rx="20" fill="#FFFFFF" stroke="${TINTA}" stroke-width="8"/>`;
    o += texto(540, 1246, 'SEMENTE PLANTADA', 66, ROXO, { ancora: 'middle', extra: 'letter-spacing="2"' });
    o += '</g>';
    const t = 132;
    const vao = 18;
    const x0 = (W - (6 * t + 5 * vao)) / 2;
    ordem.forEach((id, i) => {
      o += foto(id, x0 + (i % 6) * (t + vao), 1350 + Math.floor(i / 6) * (t + vao), t, t, { traco: 5, sombra: 6 });
    });
    o += texto(W / 2, 1722, '25 e 26/11 · 17h às 22h30', 50, '#FFFFFF', { ancora: 'middle' });
    o += texto(W / 2, 1786, 'Sala do CAGP, na FAFICH', 40, '#EFE7F6', { peso: 400, ancora: 'middle' });
    return `${o}</svg>`;
  }

  // ---------- Em pé: proposta para o feed (1080×1350) ----------
  function feedProposta({ n, eixo, titulo, pessoa: id, fala }) {
    const W = 1080;
    const H = 1350;
    const e = EIXOS[eixo];
    let o = abrir(W, H, `Proposta ${n}: ${titulo}`);
    o += `<rect width="${W}" height="${H}" fill="${e.bg}"/>${folhaFundo(e.fundo, 900, 1300, 22, 11)}`;
    o += adesivoNumero(70, 70, n, 1.7);
    o += etiqueta(290, 118, `Proposta ${n} de 14`, { corpo: 30, h: 62 }).svg;
    // título: cabe em até 4 linhas entre o adesivo e a foto
    let linhas = quebrar(titulo, 15);
    let corpo = caber(linhas, 940, 104);
    while (linhas.length * corpo * 1.12 > 340 && corpo > 56) corpo -= 4;
    o += texto(70, 290 + corpo, linhas, corpo, e.fg);
    o += foto(id, 560, 640, 440, 480, { rotulo: true, broto: 1.4, sombra: 14, traco: 8 });
    const d = folhaRet(70, 760, 440, 300, 0.7);
    o += `<path d="${d}" transform="translate(11 11)" fill="${TINTA}"/><path d="${d}" fill="#FFFFFF" stroke="${TINTA}" stroke-width="6"/>`;
    // fala: o maior corpo em que o trecho inteiro cabe no cartão
    let corpoFala = 44;
    let linhasFala = [];
    for (; corpoFala >= 22; corpoFala -= 2) {
      linhasFala = quebrar(fala, Math.floor(376 / (corpoFala * 0.56)));
      if (linhasFala.length * corpoFala * 1.3 <= 244) break;
    }
    const altoFala = (linhasFala.length - 1) * corpoFala * 1.3;
    o += texto(104, 910 - altoFala / 2 + corpoFala * 0.36, linhasFala, corpoFala, TINTA, { peso: 400, entre: 1.3 });
    o += `<rect y="1180" width="${W}" height="170" fill="#FFFFFF"/><rect y="1176" width="${W}" height="8" fill="${TINTA}"/>`;
    o += `<use href="#lg-h" transform="translate(60 1214) scale(${(96 / logo.h).toFixed(4)})"/>`;
    if (barraDaFase.adesivo) {
      o += texto(840, 1284, '25 e 26/11', 44, TINTA, { ancora: 'end' });
      o += adesivo2(872, 1130, 1.5);
    }
    return `${o}</svg>`;
  }

  return { pagina, home, chapa, votar, doc, proposta, pessoa, padrao, storyVoto, feedProposta };
}

/** Roda na página, depois das fontes: desenha o traço laranja da caneta sob cada palavra marcada. */
export const SUBLINHAR = `(() => {
  const NS = 'http://www.w3.org/2000/svg';
  document.querySelectorAll('tspan.mk').forEach((t) => {
    const n = t.getNumberOfChars();
    if (!n) return;
    const a = t.getStartPositionOfChar(0), b = t.getEndPositionOfChar(n - 1);
    const s = parseFloat(t.dataset.s), w = b.x - a.x, y = a.y + s * 0.17;
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', 'M' + (a.x - s * 0.06) + ',' + y + ' q' + (w * 0.26) + ',' + (-s * 0.11) + ' ' + (w * 0.52) + ',' + (-s * 0.03) + ' t' + (w * 0.52) + ',' + (-s * 0.04));
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', '#FE8812');
    p.setAttribute('stroke-width', Math.max(4, s * 0.1));
    p.setAttribute('stroke-linecap', 'round');
    const tx = t.closest('text');
    tx.parentNode.insertBefore(p, tx);
  });
})()`;
