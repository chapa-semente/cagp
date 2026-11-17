// src/lib/sementeGeometry.ts — As curvas oficiais do símbolo da Chapa Semente, prontas para compor.
//
// Origem: o traçado vetorial do isotipo guardado na pasta de trabalho logos/semente/ (fora de src).
// Aquele traçado foi aposentado como LOGO (o logo do site é sempre o asset oficial em
// public/logos/semente/, ver tests/pwa-manifest-icons.test.ts). Aqui ele serve só de geometria
// para desenho de apoio: os dois contornos laranja foram normalizados, sem redesenho, com a base
// da forma em (0,0) e a ponta em (0,-100). Assim qualquer desenho do site (estágios da planta,
// ramo, controles) é montado com translate / rotate / scale destas duas formas, e nunca com um
// círculo ou uma lente "parecida". Nunca usar estas formas para remontar o símbolo.
//
//   FOLHA   = a folha superior do símbolo (larga, barriga para a esquerda).
//   SEMENTE = a forma central do símbolo (esguia, em S): serve de semente, raiz e seixo.
//   NERVURA = o corte em S que atravessa a folha, eco do vão branco entre a pessoa e a semente.
//
// Para regenerar: normalizar os pontos da folha superior e da forma central do traçado
// (translação para a ponta inferior, rotação de 16,2° e 32,9°, escala para comprimento 100).

export const FOLHA_PATH =
  'M0.0-100.0C2.0-97.7 3.4-95.2 5.1-92.7C6.7-90.1 8.1-87.5 9.4-84.8C10.6-82.1 11.7-79.4 12.6-76.6C13.5-73.8 14.2-70.9 14.8-68.0C15.3-65.1 15.7-62.2 15.9-59.2C16.1-56.3 16.1-53.4 15.9-50.4C15.8-47.5 15.5-44.5 15.0-41.6C14.5-38.7 13.8-35.8 13.0-33.0C12.2-30.1 11.3-27.3 10.4-24.4C9.4-21.6 8.3-18.9 7.2-16.1C6.1-13.3 4.9-10.6 3.8-7.9C2.6-5.2 1.1-2.6 0.0 0.0C-2.1-1.8-4.6-3.2-6.9-4.9C-9.1-6.6-11.4-8.2-13.7-9.9C-15.9-11.6-18.1-13.4-20.1-15.3C-22.2-17.3-24.1-19.3-25.9-21.6C-27.6-23.9-29.2-26.3-30.5-28.8C-31.8-31.3-32.9-34.0-33.7-36.6C-34.5-39.3-35.0-42.1-35.1-44.9C-35.3-47.6-35.0-50.4-34.5-53.1C-33.9-55.9-33.0-58.6-31.8-61.1C-30.7-63.7-29.3-66.2-27.7-68.6C-26.2-71.0-24.5-73.3-22.8-75.5C-21.0-77.7-19.2-79.9-17.4-82.1C-15.6-84.3-13.7-86.4-11.9-88.5C-10.1-90.7-8.3-92.8-6.4-94.9C-4.5-97.0-2.0-98.0 0.0-100.0Z';

export const SEMENTE_PATH =
  'M-0.0-100.0C1.7-99.1 3.3-98.6 4.7-97.5C6.1-96.4 7.4-95.2 8.6-93.9C9.7-92.6 10.8-91.2 11.8-89.8C12.7-88.3 13.6-86.8 14.4-85.2C15.2-83.6 15.8-82.0 16.5-80.3C17.1-78.6 17.6-76.9 18.1-75.2C18.5-73.5 19.0-71.7 19.3-70.0C19.6-68.2 19.9-66.5 20.1-64.7C20.3-63.0 20.5-61.2 20.5-59.4C20.6-57.7 20.6-55.9 20.5-54.2C20.4-52.4 20.2-50.7 19.9-48.9C19.7-47.2 19.4-45.4 19.0-43.7C18.5-42.0 18.1-40.3 17.5-38.6C17.0-36.9 16.4-35.2 15.8-33.6C15.1-31.9 14.4-30.3 13.6-28.7C12.9-27.1 12.1-25.5 11.2-23.9C10.4-22.4 9.5-20.9 8.6-19.4C7.6-17.8 6.7-16.3 5.9-14.8C5.1-13.2 4.3-11.6 3.7-10.0C3.0-8.3 2.4-6.7 1.8-5.0C1.3-3.3 0.5-1.7 0.0 0.0C-1.4-1.2-3.0-2.0-4.2-3.3C-5.4-4.6-6.5-6.0-7.4-7.5C-8.4-9.0-9.3-10.5-10.1-12.1C-11.0-13.7-11.7-15.4-12.3-17.0C-13.0-18.7-13.5-20.4-14.0-22.2C-14.5-23.9-14.9-25.7-15.3-27.4C-15.7-29.2-16.0-31.0-16.2-32.7C-16.4-34.5-16.5-36.3-16.6-38.1C-16.6-39.9-16.6-41.7-16.5-43.5C-16.4-45.2-16.2-47.0-16.0-48.8C-15.7-50.6-15.4-52.3-15.0-54.1C-14.7-55.8-14.2-57.6-13.7-59.3C-13.2-61.0-12.7-62.8-12.1-64.5C-11.5-66.2-10.9-67.8-10.2-69.5C-9.5-71.2-8.8-72.8-8.1-74.5C-7.4-76.1-6.7-77.8-6.1-79.4C-5.4-81.1-4.8-82.8-4.2-84.5C-3.7-86.2-3.2-87.9-2.7-89.6C-2.2-91.4-1.8-93.1-1.5-94.9C-1.1-96.6-0.3-98.2-0.0-100.0Z';

export const NERVURA_PATH = 'M0-2C-5-28-8-52-4-80';

/**
 * As duas curvas definidas UMA vez por página (BaseLayout põe este SVG no topo do <body>).
 * Todo desenho do site as reaproveita com <use href="#sg-folha"> / <use href="#sg-gota">, em vez de
 * repetir ~1 KB de traçado por folha: sem isso, cada página carregava mais de 100 KB só de curvas.
 * O contorno não escala com o desenho (vector-effect), então stroke-width é sempre em px de tela.
 */
export const SEMENTE_SPRITE =
  `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>` +
  `<path id="sg-folha" vector-effect="non-scaling-stroke" d="${FOLHA_PATH}"/>` +
  `<path id="sg-gota" vector-effect="non-scaling-stroke" d="${SEMENTE_PATH}"/>` +
  `</defs></svg>`;
