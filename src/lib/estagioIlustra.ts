// src/lib/estagioIlustra.ts — As cinco ilustrações do ciclo (semente → raiz → broto → planta → fruto).
//
// Versão 2 (11/11/2026, pedido do Gabriel: "mais expressivo, fiel ao logo e neobrutalista").
// Cada desenho é um corte do solo, como um adesivo recortado: formas cheias e chapadas com
// contorno de tinta grafite, sobre um arco claro que cresce a cada estágio (o semicírculo do
// manual nascendo no horizonte). A planta usa sempre as cores do símbolo: caule e cabeça roxos,
// folha laranja, e o verde-broto e o amarelo-fruto como apoio. Quem muda de estágio para estágio
// é o bloco de cor, a terra e o tamanho da planta.
//
// Todas as formas vêm de src/lib/sementeGeometry.ts: a folha do logo vira folha e braço, a forma
// central vira semente, raiz e seixo, e a cabeça da pessoa vira o fruto. Em "planta" a figura do
// símbolo reaparece no alto: a cabeça roxa entre o braço roxo e a folha laranja.
//
// As curvas não são repetidas: cada forma é um <use> do sprite que o BaseLayout põe na página
// (SEMENTE_SPRITE). Devolve o miolo de um <svg viewBox="0 0 200 200">. O contorno e o movimento vêm das classes
// (.ei-ink, .ei-pop, .ei-rise, .ei-sway) definidas em EstagioIlustra.astro.
import { NERVURA_PATH } from './sementeGeometry';

export interface IlustraCores {
  /** Cor do bloco onde o desenho pousa. */
  bg: string;
  /** Terra: um tom mais fundo do bloco. */
  solo: string;
  /** O arco claro atrás da planta (o "solo" do estágio em estagios.css). */
  arco: string;
}

export type IlustraNivel = 1 | 2 | 3 | 4 | 5;

export const ILUSTRA_CORES: Record<IlustraNivel, IlustraCores> = {
  1: { bg: '#5B2A85', solo: '#3F1A61', arco: '#EFE7F6' },
  2: { bg: '#8A4B2A', solo: '#5E2F17', arco: '#F3E3D5' },
  3: { bg: '#6DB33F', solo: '#2F6B1E', arco: '#E4F2D8' },
  4: { bg: '#266264', solo: '#123F41', arco: '#E3F0EF' },
  5: { bg: '#FFC83D', solo: '#8A4B2A', arco: '#FFF2C7' },
};

/** As cores da planta são as do símbolo, iguais em todos os estágios. */
const ROXO = '#5B2A85';
const LARANJA = '#FE8812';
const VERDE = '#6DB33F';
const AMARELO = '#FFC83D';
const CREME = '#FFF6E5';

const n1 = (v: number) => Number(v.toFixed(1));
const n2 = (v: number) => Number(v.toFixed(2));

export function renderEstagioIlustra(nivel: IlustraNivel, cores: IlustraCores = ILUSTRA_CORES[nivel]): string {
  const c = cores;
  const out: string[] = [];
  let ordem = 0;
  /** Cada parte entra na vez dela (`--i` é o atraso): primeiro a semente, por último o fruto. */
  const anima = (classe: 'ei-pop' | 'ei-rise', miolo: string) => `<g class="${classe}" style="--i:${ordem++}">${miolo}</g>`;

  const folha = (x: number, y: number, rot: number, len: number, fill: string, espelha = false, nervura = true) => {
    const k = len / 100;
    const veio = nervura ? `<path class="ei-veio" d="${NERVURA_PATH}"/>` : '';
    // A folha balança de leve em torno do próprio pé (--s alterna o sentido).
    return `<g transform="translate(${n1(x)} ${n1(y)}) rotate(${rot}) scale(${n2(espelha ? -k : k)} ${n2(k)})">${anima(
      'ei-pop',
      `<g class="ei-sway" style="--s:${espelha ? -1 : 1}"><use class="ei-ink" href="#sg-folha" fill="${fill}"/>${veio}</g>`
    )}</g>`;
  };
  const gota = (x: number, y: number, rot: number, len: number, fill: string, largura = 1, espelha = false, opt: { parada?: boolean; ink?: boolean } = {}) => {
    const k = len / 100;
    const forma = `<use${opt.ink === false ? '' : ' class="ei-ink"'} href="#sg-gota" fill="${fill}"/>`;
    return `<g transform="translate(${n1(x)} ${n1(y)}) rotate(${rot}) scale(${n2((espelha ? -k : k) * largura)} ${n2(k)})">${opt.parada ? forma : anima('ei-pop', forma)}</g>`;
  };
  const caule = (x: number, y: number, h: number, ginga: number, w: number) =>
    `<g transform="translate(${x} ${y})">${anima(
      'ei-rise',
      `<path class="ei-ink" fill="${ROXO}" d="M${-w} 0C${n1(-w - ginga)} ${n1(-h * 0.38)} ${n1(ginga - w * 0.5)} ${n1(-h * 0.62)} -1.6 ${-h}L1.6 ${-h}C${n1(ginga + w * 0.5)} ${n1(-h * 0.62)} ${n1(w - ginga)} ${n1(-h * 0.38)} ${w} 0Z"/>`
    )}</g>`;
  const bola = (x: number, y: number, r: number, fill: string, brilho = true) =>
    `<g transform="translate(${x} ${y})">${anima(
      'ei-pop',
      `<circle class="ei-ink" r="${r}" fill="${fill}"/>${brilho ? `<circle cx="${n1(-r * 0.34)}" cy="${n1(-r * 0.34)}" r="${n1(r * 0.24)}" fill="#fff"/>` : ''}`
    )}</g>`;
  const raizes = (x: number, y: number, len: number) =>
    [
      gota(x, y, 180, len, CREME, 0.62),
      gota(x - 3, y + 1, 218, len * 0.84, CREME, 0.6, true),
      gota(x + 3, y + 1, 144, len * 0.8, CREME, 0.6),
      gota(x - len * 0.3, y + len * 0.44, 246, len * 0.42, CREME, 0.62, true),
      gota(x + len * 0.28, y + len * 0.38, 116, len * 0.38, CREME, 0.62),
    ].join('');
  /** A semente deitada, centrada em (x, y), com o brilho por dentro. */
  const semente = (x: number, y: number, len: number, rot = 74) => {
    const r = (rot * Math.PI) / 180;
    const bx = x - (Math.sin(r) * len) / 2;
    const by = y + (Math.cos(r) * len) / 2;
    return (
      gota(bx, by, rot, len, LARANJA, 1.45) +
      gota(bx + len * 0.22 * Math.sin(r) + 1, by - len * 0.22 * Math.cos(r) - 1, rot, len * 0.52, AMARELO, 0.5, false, { ink: false })
    );
  };

  // O chão de cada estágio e o arco claro, que cresce junto com a planta.
  const g = { 1: 98, 2: 88, 3: 142, 4: 160, 5: 160 }[nivel];
  const raio = { 1: 50, 2: 60, 3: 80, 4: 92, 5: 96 }[nivel];
  out.push(
    `<circle class="ei-ink" cx="100" cy="${g + 4}" r="${raio}" fill="${c.arco}"/>`,
    // A terra passa dos dois lados do quadro: onde o SVG deixa vazar (faixa do rodapé), ela corre o bloco todo.
    `<path class="ei-ink" fill="${c.solo}" d="M-900 ${g + 3}H-8C34 ${g - 7} 70 ${g - 3} 104 ${g + 2}S168 ${g + 9} 208 ${g - 2}H1100V208H-900Z"/>`,
    `<path fill="none" stroke="${c.bg}" stroke-width="2.4" stroke-linecap="round" d="M12 ${g + 36}C50 ${g + 29} 84 ${g + 35} 118 ${g + 38}"/>`,
    gota(24, Math.min(190, g + 56), 74, 17, c.bg, 1.3, false, { parada: true, ink: false }),
    gota(176, Math.min(186, g + 32), -68, 14, c.bg, 1.4, false, { parada: true, ink: false }),
    gota(152, Math.min(196, g + 62), 80, 10, c.bg, 1.3, false, { parada: true, ink: false })
  );

  if (nivel === 1) {
    // O berço: a semente do símbolo inteira (o casulo roxo e a forma laranja dentro dele).
    out.push(
      `<path class="ei-ink" fill="${c.arco}" d="M14 152c0-28 40-42 90-40s84 20 82 46-42 38-88 36-84-14-84-42Z"/>`,
      gota(42, 176, 66, 128, ROXO, 1.9),
      gota(58, 169, 66, 92, LARANJA, 1.15, false, { ink: false }),
      gota(72, 163, 66, 50, AMARELO, 0.5, false, { ink: false }),
      gota(150, 140, 150, 26, CREME, 0.7),
      bola(150, 52, 7, AMARELO, false),
      bola(54, 62, 5.5, VERDE, false),
      bola(104, 30, 6.5, LARANJA, false)
    );
  }
  if (nivel === 2) {
    out.push(
      raizes(100, 102, 96),
      semente(100, 98, 70, 70),
      caule(101, 86, 36, 4, 5),
      folha(101, 54, 22, 40, LARANJA),
      folha(101, 62, -50, 26, VERDE, true)
    );
  }
  if (nivel === 3) {
    out.push(
      raizes(100, 160, 38),
      semente(100, 156, 44),
      caule(100, 146, 92, 9, 6.5),
      folha(99, 62, 18, 78, LARANJA),
      folha(99, 74, -50, 54, ROXO, true),
      folha(101, 108, 62, 30, VERDE)
    );
  }
  if (nivel >= 4) {
    out.push(
      raizes(100, 178, 22),
      semente(100, 174, 36),
      caule(100, 164, 124, 10, 6.5),
      folha(104, 136, 62, 50, LARANJA),
      folha(96, 118, -64, 54, VERDE, true),
      folha(103, 96, 54, 44, LARANJA),
      folha(97, 80, -56, 40, VERDE, true),
      // A pessoa do símbolo: o braço roxo, a folha laranja e a cabeça entre os dois.
      folha(100, 50, 30, 38, LARANJA),
      folha(100, 52, -34, 30, ROXO, true),
      bola(97, 25, 11, ROXO, false)
    );
  }
  if (nivel === 5) {
    out.push(
      bola(150, 112, 14, AMARELO),
      bola(48, 92, 13, AMARELO),
      bola(142, 62, 12, AMARELO),
      bola(60, 48, 11, AMARELO),
      // A semente que cai e recomeça o ciclo.
      gota(156, 158, 72, 24, LARANJA, 1.45)
    );
  }
  return out.join('');
}
