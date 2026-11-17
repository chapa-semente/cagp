// src/lib/molduras.ts — As frases e os anéis da moldura de apoio (src/data/molduras.json).
//
// Desde 13/11/2026 a moldura tem duas escolhas separadas: a FRASE ("Gostosas com Chapa 2",
// "Sou fumpista", "Sapatão com Chapa 2"…) e a COR DO ANEL (as cores da chapa, uma bandeira do
// orgulho ou as cores da neurodiversidade). Quem é bi e fumpista põe "Sou fumpista" no anel bi.
// Este arquivo é lido por três lugares: o desenho no canvas (src/scripts/molduraDeApoio.ts), a
// página (src/pages/chapa-semente/moldura.astro) e a tela da moldura no tour (SementeTour.tsx).
import dados from '@/data/molduras.json';

export type Flexao = 'o' | 'a' | 'e';

export interface Frase {
  id: string;
  grupo: string;
  texto: string;
  /** Formas no feminino e no neutro, quando a frase tem gênero. */
  a?: string;
  e?: string;
  /** Anel que a frase puxa sozinha (a bandeira de "Sou bi", o dourado de "Sou autista"). */
  anel?: string;
  circularS?: boolean;
}

export interface Anel {
  id: string;
  grupo: string;
  nome: string;
  /** Anel de uma cor só. */
  cor?: string;
  /** Tom mais fundo, para a folha grande do cartaz. */
  fundo?: string;
  /** Faixas da bandeira, de cima para baixo. */
  faixas?: string[];
  pesos?: number[];
  /** O triângulo da bandeira do Progresso, de fora para dentro. */
  cunha?: string[];
  /** Fatias em volta da foto, no sentido do relógio, a partir do alto. */
  roda?: string[];
  /** Faixa colada na foto (o círculo da bandeira intersexo). */
  aro?: string;
  /** Cores do infinito desenhado num adesivo (uma cor ou o arco-íris). */
  selo?: string[];
  /** Cor da frase quando o laranja some no anel. */
  caneta?: string;
}

export const TINTA = '#1F1F1F';
export const GRUPOS_DE_FRASES = dados.grupos as { id: string; nome: string }[];
export const FRASES = dados.frases as Frase[];
export const GRUPOS_DE_ANEIS = dados.gruposDeAneis as { id: string; nome: string }[];
export const ANEIS = dados.aneis as Anel[];

export const fraseDoId = (id: string) => FRASES.find((f) => f.id === id) ?? FRASES[0];
export const anelDoId = (id: string) => ANEIS.find((a) => a.id === id) ?? ANEIS[0];
export const temGenero = (f: Frase) => Boolean(f.a || f.e);

/** O texto da frase na flexão escolhida (o, a ou e). Frase sem gênero sai igual nas três. */
export function textoDaFrase(f: Frase, flexao: Flexao = 'o'): string {
  return (flexao === 'o' ? f.texto : f[flexao]) ?? f.texto;
}

function luminancia(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const canal = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * canal((n >> 16) & 255) + 0.7152 * canal((n >> 8) & 255) + 0.0722 * canal(n & 255);
}

/** Grafite ou branco: o que tiver mais contraste sobre a cor dada. */
export function tintaSobre(hex: string): string {
  const l = luminancia(hex);
  return (l + 0.05) / (luminancia(TINTA) + 0.05) >= 1.05 / (l + 0.05) ? TINTA : '#FFFFFF';
}

/** As faixas do anel como frações da altura (0 a 1), de cima para baixo. */
export function faixasDoAnel(a: Anel): { de: number; ate: number; cor: string }[] {
  if (!a.faixas) return [];
  const pesos = a.faixas.map((_, i) => a.pesos?.[i] ?? 1);
  const total = pesos.reduce((s, p) => s + p, 0);
  let de = 0;
  return a.faixas.map((cor, i) => {
    const faixa = { de, ate: de + pesos[i] / total, cor };
    de = faixa.ate;
    return faixa;
  });
}

/** Meia-altura de cada degrau da cunha do Progresso, em frações do raio do medalhão. */
export const degrauDaCunha = (i: number) => 1 - i * 0.13;

/**
 * A cor do anel num ponto do medalhão: `lado` é 'alto' ou 'baixo' e `fy` é a altura desse ponto na
 * tela inteira (0 a 1). Serve para escolher a tinta do texto que passa por ali.
 */
export function corDoAnelEm(a: Anel, lado: 'alto' | 'baixo', fy: number): string {
  if (a.roda) return a.roda[lado === 'alto' ? 0 : Math.floor(a.roda.length / 2)];
  const faixas = faixasDoAnel(a);
  if (faixas.length) return (faixas.find((f) => fy >= f.de && fy < f.ate) ?? faixas[faixas.length - 1]).cor;
  return a.cor ?? '#FFFFFF';
}

/** Um anel é "estampado" quando não é uma cor só: bandeira em faixas ou roda de cores. */
export const anelEstampado = (a: Anel) => Boolean(a.faixas || a.roda);

/**
 * O miolo de um <svg viewBox="0 0 48 48"> com a amostra do anel: as mesmas faixas, cunha ou roda
 * que o canvas desenha, e o círculo da foto no meio. O recorte redondo é do CSS (border-radius).
 */
export function amostraDoAnel(a: Anel): string {
  const L = 48;
  const R = L / 2;
  let s = `<rect width="${L}" height="${L}" fill="${a.cor ?? '#FFFFFF'}"/>`;
  for (const f of faixasDoAnel(a)) {
    s += `<rect y="${(f.de * L).toFixed(2)}" width="${L}" height="${((f.ate - f.de) * L + 0.3).toFixed(2)}" fill="${f.cor}"/>`;
  }
  a.cunha?.forEach((cor, i) => {
    const m = R * degrauDaCunha(i);
    s += `<path d="M0 ${(R - m).toFixed(2)}L${m.toFixed(2)} ${R}L0 ${(R + m).toFixed(2)}Z" fill="${cor}"/>`;
  });
  if (a.roda) {
    const n = a.roda.length;
    const passo = (Math.PI * 2) / n;
    const ponto = (ang: number) => `${(R + L * Math.cos(ang)).toFixed(2)} ${(R + L * Math.sin(ang)).toFixed(2)}`;
    a.roda.forEach((cor, i) => {
      const de = -Math.PI / 2 - passo / 2 + i * passo;
      s += `<path d="M${R} ${R}L${ponto(de)}A${L} ${L} 0 0 1 ${ponto(de + passo)}Z" fill="${cor}"/>`;
    });
  }
  if (a.aro) s += `<circle cx="${R}" cy="${R}" r="15.5" fill="${a.aro}"/>`;
  s += `<circle cx="${R}" cy="${R}" r="11" fill="#EFE7F6" stroke="${TINTA}" stroke-width="2.5"/>`;
  return s;
}
