#!/usr/bin/env node
// gerar-objetos.mjs — Os objetos das cenas do tour das propostas (nota fiscal, certificado, celular…),
// desenhados com traço de caneta: a linha treme um pouco, engrossa e afina com a "pressão" e as pontas
// se cruzam, como num desenho feito à mão. As mãos, a estrela, as letras e os tracinhos NÃO saem daqui:
// são os desenhos originais, vetorizados por extrair-referencia.py.
//
// Unidades: os pixels do desenho de referência (a mão do V tem 380×520 e traço de ~9), para que os
// objetos fiquem na mesma escala e na mesma espessura das mãos.
// Uso: node scripts/desenhos/gerar-objetos.mjs   →  src/data/desenhosObjetos.json
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { getStroke } from 'perfect-freehand';

const TRACO = 9.5;
const TINTA = '#151515';

// Sorteio com semente: o mesmo desenho a cada rodada.
function sorteio(semente) {
  let a = semente >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Passa por uma linha quebrada com os cantos amaciados e um ponto a cada ~`passo` px. */
function percorrer(pontos, { fechado = false, raio = 7, passo = 9 } = {}) {
  const pts = fechado ? [...pontos, pontos[0], pontos[1]] : pontos;
  const saida = [];
  const anda = (a, b) => {
    const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const n = Math.max(1, Math.round(d / passo));
    for (let i = 0; i < n; i++) saida.push([a[0] + ((b[0] - a[0]) * i) / n, a[1] + ((b[1] - a[1]) * i) / n]);
  };
  let anterior = pts[0];
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i];
    const proximo = pts[i + 1];
    if (!proximo) { anda(anterior, p); saida.push(p); break; }
    // encurta o trecho antes do canto e faz a curva com três pontos
    const d1 = Math.hypot(p[0] - anterior[0], p[1] - anterior[1]);
    const d2 = Math.hypot(proximo[0] - p[0], proximo[1] - p[1]);
    const r = Math.min(raio, d1 / 2.2, d2 / 2.2);
    const antes = [p[0] - ((p[0] - anterior[0]) / d1) * r, p[1] - ((p[1] - anterior[1]) / d1) * r];
    const depois = [p[0] + ((proximo[0] - p[0]) / d2) * r, p[1] + ((proximo[1] - p[1]) / d2) * r];
    anda(anterior, antes);
    saida.push(antes, [(antes[0] + 2 * p[0] + depois[0]) / 4, (antes[1] + 2 * p[1] + depois[1]) / 4]);
    anterior = depois;
  }
  return saida;
}

/** O tremor da mão: desvio suave (ondas lentas) mais um tiquinho de ruído, perpendicular ao traço. */
function tremer(pontos, rnd, forca = 1.7) {
  const f1 = 0.035 + rnd() * 0.02, f2 = 0.11 + rnd() * 0.05, a1 = rnd() * 6.28, a2 = rnd() * 6.28;
  let s = 0;
  return pontos.map((p, i) => {
    const q = pontos[Math.min(i + 1, pontos.length - 1)], o = pontos[Math.max(i - 1, 0)];
    const dx = q[0] - o[0], dy = q[1] - o[1], d = Math.hypot(dx, dy) || 1;
    s += i ? Math.hypot(p[0] - pontos[i - 1][0], p[1] - pontos[i - 1][1]) : 0;
    const desvio = (Math.sin(s * f1 + a1) * 0.7 + Math.sin(s * f2 + a2) * 0.3) * forca + (rnd() - 0.5) * 0.5;
    return [p[0] + (-dy / d) * desvio, p[1] + (dx / d) * desvio];
  });
}

const n1 = (v) => Math.round(v);

/** Tira os pontos que não mudam a forma (Ramer–Douglas–Peucker): o arquivo fica leve sem alisar o traço. */
function enxugar(pts, tol = 0.7) {
  if (pts.length < 4) return pts;
  const fica = new Array(pts.length).fill(false);
  fica[0] = fica[pts.length - 1] = true;
  const pilha = [[0, pts.length - 1]];
  while (pilha.length) {
    const [i, j] = pilha.pop();
    const [ax, ay] = pts[i], [bx, by] = pts[j];
    const d = Math.hypot(bx - ax, by - ay) || 1;
    let maior = 0, k = -1;
    for (let m = i + 1; m < j; m++) {
      const dist = Math.abs((by - ay) * pts[m][0] - (bx - ax) * pts[m][1] + bx * ay - by * ax) / d;
      if (dist > maior) { maior = dist; k = m; }
    }
    if (maior > tol) { fica[k] = true; pilha.push([i, k], [k, j]); }
  }
  return pts.filter((_, i) => fica[i]);
}

function caminhoFechado(bruto) {
  const pts = enxugar(bruto, 0.9);
  if (pts.length < 3) return '';
  let d = `M${n1((pts[0][0] + pts[1][0]) / 2)} ${n1((pts[0][1] + pts[1][1]) / 2)}`;
  for (let i = 1; i <= pts.length; i++) {
    const a = pts[i % pts.length], b = pts[(i + 1) % pts.length];
    d += `Q${n1(a[0])} ${n1(a[1])} ${n1((a[0] + b[0]) / 2)} ${n1((a[1] + b[1]) / 2)}`;
  }
  return `${d}Z`;
}

/** Um traço de caneta: vira um polígono cheio, mais grosso onde a mão "aperta". */
function traco(pontos, rnd, { tamanho = TRACO, fechado = false, raio, forca } = {}) {
  let linha = tremer(percorrer(pontos, { fechado, raio }), rnd, forca);
  // Quem fecha uma forma à mão passa um pouco do ponto de partida.
  if (fechado) linha = [...linha, ...linha.slice(1, 3)];
  const contorno = getStroke(linha, {
    size: tamanho,
    thinning: 0.22,
    smoothing: 0.6,
    streamline: 0.42,
    simulatePressure: true,
    last: true,
    start: { cap: true, taper: 0 },
    end: { cap: true, taper: 0 },
  });
  return { linha, d: caminhoFechado(contorno) };
}

/** Uma forma fechada: a cor por baixo e o traço por cima, os dois com o mesmo tremor. */
function forma(pontos, rnd, cor, opcoes = {}) {
  const t = traco(pontos, rnd, { ...opcoes, fechado: true });
  return [{ d: caminhoFechado(t.linha), cor }, { d: t.d, cor: TINTA }];
}
const risco = (pontos, rnd, opcoes) => ({ d: traco(pontos, rnd, opcoes).d, cor: TINTA });

/** Uma linha de "texto": um risco ondulado, como quem faz de conta que escreveu. */
function escrita(x0, x1, y, rnd, opcoes) {
  const pts = [];
  for (let x = x0; x <= x1; x += 22) pts.push([x, y + (rnd() - 0.5) * 5]);
  return risco(pts, rnd, { raio: 3, forca: 1.1, ...opcoes });
}

function folha(cx, cy, k, rnd) {
  const pts = [[0, 0], [2, -30], [18, -58], [50, -72], [50, -40], [34, -14], [0, 0]].map(([x, y]) => [cx + x * k, cy + y * k]);
  return [...forma(pts.slice(0, -1), rnd, '#6DB33F', { raio: 10 }), risco([[cx + 4 * k, cy - 6 * k], [cx + 40 * k, cy - 58 * k]], rnd, { tamanho: TRACO * 0.7 })];
}

/** A volta de caneta em torno de um ponto: uma elipse torta, que começa antes e termina depois. */
function voltaDeCaneta(cx, cy, rx, ry, rnd) {
  const pts = [];
  for (let t = -0.5; t < Math.PI * 2 + 0.75; t += 0.16) {
    const cresce = 1 + (t / (Math.PI * 2)) * 0.07;
    pts.push([cx + Math.cos(t - 2.2) * rx * cresce, cy + Math.sin(t - 2.2) * ry * cresce]);
  }
  const linha = tremer(pts, rnd, 2.2);
  let d = `M${n1(linha[0][0])} ${n1(linha[0][1])}`;
  for (let i = 1; i < linha.length - 1; i++) {
    const a = linha[i], b = linha[i + 1];
    d += `Q${n1(a[0])} ${n1(a[1])} ${n1((a[0] + b[0]) / 2)} ${n1((a[1] + b[1]) / 2)}`;
  }
  return d;
}

const objetos = {};

// Nota fiscal: papel com a barra serrilhada embaixo, três linhas e o total em negrito.
{
  const rnd = sorteio(11);
  const borda = [[10, 12], [240, 8], [244, 372]];
  for (let x = 222, i = 0; x > 14; x -= 23, i++) borda.push([x, i % 2 ? 372 : 352]);
  borda.push([8, 370]);
  objetos.nota = {
    w: 252, h: 384,
    partes: [
      ...forma(borda, rnd, '#FFFFFF', { raio: 4 }),
      escrita(40, 206, 70, rnd), escrita(40, 206, 118, rnd), escrita(40, 150, 166, rnd),
      escrita(120, 208, 262, rnd, { tamanho: TRACO * 1.7 }),
    ],
    // a volta que a caneta laranja dá no total: linha aberta, que passa do ponto de partida
    caneta: voltaDeCaneta(164, 262, 68, 31, rnd),
  };
}

// Certificado: o que se leva de um evento ou de um curso. Deitado, com título, duas linhas, a folha e o selo.
{
  const rnd = sorteio(23);
  objetos.certificado = {
    w: 620, h: 340,
    partes: [
      ...forma([[10, 14], [608, 8], [612, 326], [8, 330]], rnd, '#FFFFFF', { raio: 9 }),
      escrita(190, 430, 78, rnd, { tamanho: TRACO * 1.7 }),
      escrita(160, 460, 142, rnd), escrita(200, 420, 186, rnd),
      ...folha(286, 290, 0.95, rnd),
      ...forma([[470, 232], [500, 222], [528, 236], [534, 266], [512, 288], [480, 286], [462, 262]], rnd, '#FE8812', { raio: 12 }),
      risco([[478, 284], [470, 316]], rnd), risco([[514, 286], [524, 316]], rnd),
    ],
  };
}

// Celular: capinha amarela, tela branca com um balão de conversa.
{
  const rnd = sorteio(37);
  objetos.celular = {
    w: 200, h: 372,
    partes: [
      ...forma([[14, 12], [186, 8], [190, 360], [10, 364]], rnd, '#FFC83D', { raio: 22 }),
      ...forma([[30, 44], [170, 42], [172, 318], [28, 320]], rnd, '#FFFFFF', { raio: 8 }),
      risco([[84, 26], [116, 25]], rnd, { tamanho: TRACO * 0.8 }),
      ...forma([[50, 78], [150, 76], [152, 136], [96, 138], [74, 160], [76, 138], [48, 136]], rnd, '#F29CB2', { raio: 9, tamanho: TRACO * 0.85 }),
      escrita(64, 136, 100, rnd, { tamanho: TRACO * 0.7 }), escrita(64, 112, 118, rnd, { tamanho: TRACO * 0.7 }),
      escrita(50, 150, 200, rnd, { tamanho: TRACO * 0.8 }), escrita(50, 120, 236, rnd, { tamanho: TRACO * 0.8 }),
    ],
  };
}

// A exclamação do aviso, para ir dentro da estrela.
{
  const rnd = sorteio(41);
  objetos.exclamacao = {
    w: 60, h: 190,
    partes: [risco([[30, 14], [32, 70], [30, 122]], rnd, { tamanho: TRACO * 2.4, forca: 1 }), risco([[29, 166], [32, 168]], rnd, { tamanho: TRACO * 2.6, forca: 0.3 })],
  };
}

// ---------------------------------------------------------------------------
// Os 14 desenhos das propostas (caixa de 300×300). Vão dentro da estrela laranja, então não usam laranja.
// ---------------------------------------------------------------------------
const BRANCO = '#FFFFFF', AMARELO = '#FFC83D', VERDE = '#6DB33F', ROXO = '#5B2A85', ROSA = '#F29CB2', PETROLEO = '#266264';
const ret = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
const elipse = (cx, cy, rx, ry, n = 14) => Array.from({ length: n }, (_, i) => [cx + Math.cos((i / n) * 6.283) * rx, cy + Math.sin((i / n) * 6.283) * ry]);
const bola = (cx, cy, r, rnd, cor, opcoes) => forma(elipse(cx, cy, r, r), rnd, cor, { raio: r * 0.5, ...opcoes });
const grosso = (pontos, rnd, vezes = 1.6, opcoes) => risco(pontos, rnd, { tamanho: TRACO * vezes, ...opcoes });
function folhaLado(cx, cy, k, rnd, lado = 1) {
  const pts = [[0, 0], [2, -30], [18, -58], [50, -72], [50, -40], [34, -14]].map(([x, y]) => [cx + x * k * lado, cy + y * k]);
  return [...forma(pts, rnd, VERDE, { raio: 10 }), risco([[cx + 4 * k * lado, cy - 6 * k], [cx + 40 * k * lado, cy - 58 * k]], rnd, { tamanho: TRACO * 0.7 })];
}
const desenho = (semente, partes) => ({ w: 300, h: 300, partes: partes(sorteio(semente)) });

// 1 · Prestação de contas: três barras subindo e a moeda.
objetos.contas = desenho(101, (r) => [
  ...forma(ret(52, 176, 104, 252), r, AMARELO), ...forma(ret(124, 126, 176, 252), r, VERDE), ...forma(ret(196, 74, 248, 252), r, ROXO),
  risco([[26, 254], [276, 252]], r),
  ...bola(84, 84, 40, r, AMARELO), risco([[97, 68], [78, 64], [70, 78], [94, 92], [90, 106], [68, 104]], r, { raio: 9 }), risco([[83, 54], [84, 116]], r, { tamanho: TRACO * 0.75 }),
]);
// 2 · Reunião aberta todo mês: o calendário com o dia marcado.
objetos.reunioes = desenho(102, (r) => [
  ...forma(ret(40, 62, 262, 262), r, BRANCO, { raio: 12 }), ...forma(ret(40, 62, 262, 112), r, ROSA, { raio: 10 }),
  grosso([[102, 38], [101, 84]], r, 1.5), grosso([[200, 38], [201, 84]], r, 1.5),
  grosso([[98, 190], [134, 226], [208, 148]], r, 1.9, { raio: 6 }),
]);
// 3 · O site do curso: a janela do navegador com a folha.
objetos.site = desenho(103, (r) => [
  ...forma(ret(28, 52, 272, 244), r, BRANCO, { raio: 16 }), risco([[30, 98], [270, 96]], r),
  ...bola(58, 75, 8, r, ROSA, { tamanho: TRACO * 0.7 }), ...bola(84, 75, 8, r, AMARELO, { tamanho: TRACO * 0.7 }), ...bola(110, 75, 8, r, VERDE, { tamanho: TRACO * 0.7 }),
  ...folhaLado(96, 222, 1.35, r), escrita(178, 244, 142, r), escrita(178, 228, 176, r),
]);
// 4 · CNPJ para o CAGP: o documento com o selo de "feito".
objetos.cnpj = desenho(104, (r) => [
  ...forma([[58, 30], [198, 28], [246, 76], [244, 272], [60, 270]], r, BRANCO, { raio: 8 }), risco([[198, 30], [199, 78], [244, 77]], r),
  escrita(86, 176, 112, r), escrita(86, 214, 150, r), escrita(86, 150, 188, r),
  ...bola(196, 228, 40, r, VERDE), grosso([[176, 228], [191, 244], [217, 210]], r, 1.5, { raio: 5 }),
]);
// 5 · Segurança na sala do CA: o cadeado.
objetos.seguranca = desenho(105, (r) => [
  grosso([[104, 152], [103, 100], [118, 62], [150, 48], [182, 62], [197, 100], [196, 152]], r, 1.5, { raio: 14 }),
  ...forma(ret(68, 142, 232, 268), r, AMARELO, { raio: 18 }),
  ...bola(150, 190, 15, r, TINTA), grosso([[150, 198], [151, 236]], r, 1.7),
]);
// 6 · Você vota no que o CA reforma: a cédula entrando na urna.
objetos.patrimonio = desenho(106, (r) => [
  ...forma([[112, 26], [192, 36], [182, 128], [104, 120]], r, BRANCO, { raio: 6 }), grosso([[130, 64], [144, 80], [170, 52]], r, 1.3, { raio: 5 }),
  ...forma(ret(50, 132, 250, 272), r, ROXO, { raio: 10 }), ...forma(ret(34, 104, 266, 140), r, BRANCO, { raio: 10 }),
  grosso([[106, 122], [194, 121]], r, 1.5), ...folhaLado(124, 244, 1.1, r),
]);
// 7 · Recepção de calouros: o broto no vaso.
objetos.calouros = desenho(107, (r) => [
  risco([[150, 196], [147, 150], [151, 104]], r, { raio: 8 }), ...folhaLado(152, 128, 1.25, r, 1), ...folhaLado(148, 152, 1.1, r, -1),
  ...forma([[92, 192], [208, 190], [192, 272], [108, 274]], r, ROSA, { raio: 8 }), ...forma(ret(80, 176, 220, 204), r, ROSA, { raio: 8 }),
]);
// 8 · Diálogo com o movimento estudantil: dois balões de conversa.
objetos.entidades = desenho(108, (r) => [
  ...forma([[28, 46], [192, 44], [194, 148], [112, 150], [80, 188], [84, 150], [30, 150]], r, BRANCO, { raio: 14 }), escrita(56, 164, 82, r), escrita(56, 136, 114, r),
  ...forma([[128, 138], [272, 136], [274, 232], [232, 232], [240, 268], [198, 234], [130, 234]], r, ROSA, { raio: 14 }), escrita(154, 248, 170, r), escrita(154, 222, 200, r),
]);
// 9 · Eventos com quem faz gestão pública: o microfone.
objetos.eventos = desenho(109, (r) => [
  ...forma([[126, 148], [176, 148], [166, 238], [136, 238]], r, ROXO, { raio: 6 }),
  ...forma(elipse(150, 92, 50, 62), r, AMARELO, { raio: 24 }), risco([[108, 74], [192, 72]], r, { tamanho: TRACO * 0.8 }), risco([[104, 104], [196, 104]], r, { tamanho: TRACO * 0.8 }),
  grosso([[150, 238], [151, 270]], r, 1.3), grosso([[100, 274], [202, 272]], r, 1.4),
]);
// 10 · Cursos livres: o livro aberto.
objetos.cursos = desenho(110, (r) => [
  ...forma([[28, 86], [150, 110], [150, 256], [30, 232]], r, BRANCO, { raio: 8 }), ...forma([[150, 110], [272, 86], [270, 232], [150, 256]], r, BRANCO, { raio: 8 }),
  risco([[52, 130], [126, 144]], r), risco([[52, 164], [126, 178]], r), risco([[176, 144], [248, 130]], r), risco([[176, 178], [230, 168]], r),
  ...folhaLado(140, 86, 1.1, r),
]);
// 11 · Apoio à empresa júnior: a maleta.
objetos.empresa = desenho(111, (r) => [
  grosso([[114, 104], [113, 72], [187, 70], [186, 104]], r, 1.4, { raio: 12 }),
  ...forma(ret(40, 102, 262, 252), r, AMARELO, { raio: 18 }), risco([[42, 168], [260, 166]], r), ...forma(ret(132, 150, 168, 186), r, BRANCO, { raio: 6 }),
]);
// 12 · Comunicação que informa: o megafone.
objetos.comunicacao = desenho(112, (r) => [
  grosso([[108, 186], [122, 258]], r, 2.1),
  ...forma([[62, 128], [208, 58], [210, 242], [62, 184]], r, ROSA, { raio: 12 }), ...forma(ret(36, 122, 66, 190), r, ROXO, { raio: 8 }),
  risco([[234, 112], [250, 150], [236, 190]], r, { raio: 14 }), risco([[258, 88], [282, 150], [260, 212]], r, { raio: 16 }),
]);
// 13 · Produtos do CAGP: a camiseta com a folha.
objetos.produtos = desenho(113, (r) => [
  ...forma([[100, 48], [58, 62], [18, 112], [54, 144], [80, 122], [80, 268], [220, 268], [220, 122], [246, 144], [282, 112], [242, 62], [200, 48], [176, 72], [124, 72]], r, ROXO, { raio: 8 }),
  ...folhaLado(128, 214, 1.15, r),
]);
// 14 · Canal permanente de escuta: a carta, com resposta.
objetos.escuta = desenho(114, (r) => [
  ...forma(ret(34, 82, 266, 242), r, BRANCO, { raio: 10 }), risco([[36, 86], [150, 172], [264, 86]], r, { raio: 8 }),
  ...forma([[150, 226], [124, 202], [124, 184], [138, 174], [150, 186], [162, 174], [176, 184], [176, 202]], r, ROSA, { raio: 7, tamanho: TRACO * 0.85 }),
]);

const destino = join(dirname(fileURLToPath(import.meta.url)), '../../src/data/desenhosObjetos.json');
writeFileSync(destino, JSON.stringify({ _comentario: 'Gerado por scripts/desenhos/gerar-objetos.mjs. Não editar à mão.', traco: TRACO, ...objetos }));
console.log('ok', destino, JSON.stringify(objetos).length, 'bytes');
