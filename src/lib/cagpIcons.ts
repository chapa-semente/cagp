// src/lib/cagpIcons.ts — Sistema único de ícones (Phosphor Bold, grade 256).
// 4 ícones de aba são desenhados à mão com a geometria da Semente (semicírculo, folha, gota);
// o resto vem do Phosphor Bold, gerado por scripts/build-icons.mjs em cagpIconPaths.generated.ts.
import { PHOSPHOR_PATHS, type PhosphorCagpName } from './cagpIconPaths.generated';

/** Traço dos ícones próprios: o mesmo peso visual do Phosphor Bold (24 em 256 ≈ 2,25px a 24px). */
const S = 'fill="none" stroke="currentColor" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"';

/** As 4 abas desenhadas para a marca. A aba Chapa usa o símbolo oficial (asset), nunca um ícone. */
const TAB_ICONS = {
  // Hoje: o semicírculo do manual nascendo na linha do horizonte.
  hoje: `<path ${S} d="M28 192h200"/><path ${S} d="M64 192a64 64 0 0 1 128 0"/><path ${S} d="M128 44v32M52 84l22 22M204 84l-22 22"/>`,
  // Guias: o caminho em S do primeiro passo (aro) até a folha (chegada).
  guias: `<circle ${S} cx="60" cy="200" r="22"/><path ${S} d="M82 200h50a38 38 0 0 0 0-76h-28a38 38 0 0 1 0-76h24"/><path fill="currentColor" d="M152 76V52a28 28 0 0 1 28-28h52v24a28 28 0 0 1-28 28z"/>`,
  // Meu curso: o livro aberto com a folha brotando da lombada.
  curso: `<path ${S} d="M128 104c-26-16-58-20-96-16v112c38-4 70 0 96 16 26-16 58-20 96-16V88c-38-4-70 0-96 16z"/><path ${S} d="M128 104v112"/><path fill="currentColor" d="M117 98c0-38 22-66 62-72 2 40-22 66-62 72z"/>`,
  // Mais: três blocos e a folha no canto que brota.
  mais: `<rect ${S} x="36" y="36" width="72" height="72" rx="16"/><rect ${S} x="36" y="148" width="72" height="72" rx="16"/><rect ${S} x="148" y="148" width="72" height="72" rx="16"/><path fill="currentColor" d="M137 119V84a59 59 0 0 1 59-59h35v35a59 59 0 0 1-59 59z"/>`,
} as const;

export type CagpIconName = keyof typeof TAB_ICONS | PhosphorCagpName;

const ICON_PATHS: Record<string, string> = { ...PHOSPHOR_PATHS, ...TAB_ICONS };

export function getCagpIconPaths(name: CagpIconName): string {
  return ICON_PATHS[name] || ICON_PATHS.compass;
}

export function getCagpIconSvg(name: CagpIconName, className = 'w-5 h-5'): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class="${className}" aria-hidden="true">${getCagpIconPaths(name)}</svg>`;
}

/**
 * Converte um identificador de eixo ou classe Bootstrap Icon em um CagpIconName canônico.
 */
export function resolveCagpIconName(raw: string): CagpIconName {
  const key = raw.replace(/^bi-/, '').trim();
  const map: Record<string, CagpIconName> = {
    hoje: 'hoje',
    compass: 'compass',
    'compass-fill': 'compass',
    curso: 'curso',
    mortarboard: 'curso',
    curriculo: 'curriculo',
    percurso: 'curriculo',
    'diagram-3': 'curriculo',
    'diagram-3-fill': 'curriculo',
    carreira: 'carreira',
    estagio: 'carreira',
    acervo: 'acervo',
    documentos: 'acervo',
    'folder2-open': 'acervo',
    'file-earmark-pdf': 'thesis',
    cagp: 'cagp',
    sobre: 'cagp',
    people: 'cagp',
    'people-fill': 'users',
    buildings: 'building',
    'universal-access': 'accessibility',
    flower1: 'leaf',
    'chevron-left': 'chevron-left',
    'mortarboard-fill': 'curso',
    whatsapp: 'whatsapp',
    guias: 'guias',
    mais: 'mais',
    bank: 'building',
    bank2: 'building',
    backpack: 'checklist',
    'clock-history': 'clock',
    'person-badge': 'passport',
    'person-vcard': 'passport',
    calculator: 'calculator',
    briefcase: 'briefcase',
    'journal-check': 'thesis',
    'journal-bookmark': 'thesis',
    'question-circle': 'shield',
    'shield-check': 'shield',
    'cash-coin': 'briefcase',
    search: 'search',
    sliders2: 'sliders',
    bell: 'bell',
    'bell-fill': 'bell',
    download: 'download',
    'box-arrow-up-right': 'arrow-up-right',
    'arrow-up-right': 'arrow-up-right',
    'file-earmark-pdf-fill': 'file-text',
    'card-checklist': 'checklist',
    'check2-square': 'checklist',
    'patch-check-fill': 'stamp',
    'check-lg': 'check',
    'check2': 'check',
    'exclamation-octagon-fill': 'alert-triangle',
    'exclamation-triangle': 'alert-triangle',
    'info-circle': 'info',
    'telephone-fill': 'phone',
    'telephone': 'phone',
    'heart-pulse-fill': 'heart',
    'moon-stars-fill': 'moon',
    'bus-front-fill': 'bus',
    'map-fill': 'map-pin',
    geo: 'map-pin',
    'geo-alt': 'map-pin',
    funnel: 'filter',
    'funnel-fill': 'filter',
    lock: 'lock',
    'lock-fill': 'lock',
    key: 'key',
    'key-fill': 'key',
    plus: 'plus',
    'plus-lg': 'plus',
    'plus-circle': 'plus',
    kanban: 'kanban',
    'check-circle': 'check',
    'check-circle-fill': 'check',
  };
  // Nomes que já são ícones CAGP (ex.: 'thesis', 'menu') passam direto.
  return map[key] || (key in ICON_PATHS ? (key as CagpIconName) : 'compass');
}
