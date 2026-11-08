// src/lib/cagpIcons.ts — Sistema Vetorial Próprio CAGP (Grid 24x24, Stroke 1.75px)

export type CagpIconName =
  | 'hoje'
  | 'compass'
  | 'curso'
  | 'curriculo'
  | 'carreira'
  | 'acervo'
  | 'cagp'
  | 'search'
  | 'bell'
  | 'passport'
  | 'utensils'
  | 'bus'
  | 'building'
  | 'clock'
  | 'calculator'
  | 'checklist'
  | 'briefcase'
  | 'thesis'
  | 'sparkle'
  | 'shield'
  | 'sliders'
  | 'stamp'
  | 'chevron-right'
  | 'chevron-down'
  | 'arrow-up-right'
  | 'close'
  | 'door-open'
  | 'calendar'
  | 'check'
  | 'newspaper'
  | 'users'
  | 'bolt'
  | 'menu'
  | 'settings'
  | 'sidebar'
  | 'download'
  | 'file-text'
  | 'map-pin'
  | 'alert-triangle'
  | 'info'
  | 'phone'
  | 'heart'
  | 'moon'
  | 'filter'
  | 'lock'
  | 'key'
  | 'plus'
  | 'kanban';

const ICON_PATHS: Record<CagpIconName, string> = {
  // Eixo 1: Hoje — Bússola Discente
  hoje: `
    <circle cx="12" cy="12" r="9" />
    <polygon points="15.5,8.5 13.4,13.4 8.5,15.5 10.6,10.6" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  `,
  compass: `
    <circle cx="12" cy="12" r="9" />
    <polygon points="15.5,8.5 13.4,13.4 8.5,15.5 10.6,10.6" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  `,
  // Eixo 2: Curso — Capelo & Coluna Institucional
  curso: `
    <path d="M2.5 9.5L12 4.5L21.5 9.5L12 14.5L2.5 9.5Z" />
    <path d="M6.5 11.8V16.8C6.5 18.2 9 19.5 12 19.5C15 19.5 17.5 18.2 17.5 16.8V11.8" />
    <path d="M21 10V16" />
  `,
  // Eixo 3: Currículo — Grafo 10P de Pré-requisitos
  curriculo: `
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <circle cx="18" cy="18" r="2.5" />
    <path d="M8.5 6H15.5" />
    <path d="M6 8.5V15.5" />
    <path d="M16.2 7.8L7.8 16.2" />
    <path d="M8.5 18H15.5" />
  `,
  // Eixo 4: Carreira — Maleta de Oportunidades & Estágio
  carreira: `
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V7" />
    <path d="M12 12V14" />
    <path d="M3 11H21" />
  `,
  // Acervo Legado
  acervo: `
    <path d="M3 7.5C3 6.4 3.9 5.5 5 5.5H9.2L11.2 7.8H19C20.1 7.8 21 8.7 21 9.8V17.5C21 18.6 20.1 19.5 19 19.5H5C3.9 19.5 3 18.6 3 17.5V7.5Z" />
    <path d="M8 13.5H16" />
    <path d="M8 16.2H13" />
  `,
  // Eixo 5: O CAGP — Os Candangos / Pilares Republicanos
  cagp: `
    <path d="M3.5 19.5H20.5" />
    <circle cx="8.5" cy="6" r="1.8" />
    <circle cx="15.5" cy="6" r="1.8" />
    <path d="M5.5 19.5L7.2 10.5H10.5L11.5 15" />
    <path d="M18.5 19.5L16.8 10.5H13.5L12.5 15" />
    <path d="M9.5 12.5H14.5" />
  `,
  search: `
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20L16.2 16.2" />
  `,
  bell: `
    <path d="M6 9.5C6 6.2 8.7 3.5 12 3.5C15.3 3.5 18 6.2 18 9.5C18 14 20 15.8 20 15.8H4C4 15.8 6 14 6 9.5Z" />
    <path d="M10 19C10.5 20 11.2 20.5 12 20.5C12.8 20.5 13.5 20 14 19" />
  `,
  passport: `
    <rect x="4" y="3" width="16" height="18" rx="2.5" />
    <circle cx="12" cy="10" r="2.8" />
    <path d="M8 16.5C9.2 15 10.5 14.5 12 14.5C13.5 14.5 14.8 15 16 16.5" />
  `,
  utensils: `
    <path d="M6 3.5V10.5C6 12 7.2 13 8.5 13V20.5" />
    <path d="M8.5 3.5V9" />
    <path d="M11 3.5V10.5C11 12 9.8 13 8.5 13" />
    <path d="M16.5 3.5C14.8 5.5 14.5 8.5 14.5 11.5H17V20.5" />
  `,
  bus: `
    <rect x="4" y="4" width="16" height="13" rx="2.5" />
    <path d="M4 11H20" />
    <path d="M7.5 14.2H8.5" />
    <path d="M15.5 14.2H16.5" />
    <path d="M6.5 17V19.5" />
    <path d="M17.5 17V19.5" />
  `,
  building: `
    <path d="M3 20H21" />
    <path d="M5 20V6.5L12 3.5L19 6.5V20" />
    <path d="M9 10H10.5" />
    <path d="M13.5 10H15" />
    <path d="M9 13.5H10.5" />
    <path d="M13.5 13.5H15" />
    <path d="M10.5 20V16.5H13.5V20" />
  `,
  clock: `
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12L15.2 14" />
  `,
  calculator: `
    <rect x="5" y="3.5" width="14" height="17" rx="2.2" />
    <path d="M8 7.5H16" />
    <circle cx="8.8" cy="12" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="15.2" cy="12" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="8.8" cy="15.8" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="12" cy="15.8" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="15.2" cy="15.8" r="0.9" fill="currentColor" stroke="none" />
  `,
  checklist: `
    <rect x="4" y="3.5" width="16" height="17" rx="2.2" />
    <path d="M8 9.5L9.8 11.2L13 8" />
    <path d="M14.8 9.8H16.5" />
    <path d="M8 15L9.8 16.7L13 13.5" />
    <path d="M14.8 15.2H16.5" />
  `,
  briefcase: `
    <rect x="3.5" y="7.5" width="17" height="12" rx="2.2" />
    <path d="M9 7.5V5.5C9 4.7 9.7 4 10.5 4H13.5C14.3 4 15 4.7 15 5.5V7.5" />
    <path d="M3.5 12.5H20.5" />
  `,
  thesis: `
    <path d="M6 4H15.5L19 7.5V19C19 19.8 18.3 20.5 17.5 20.5H6C5.2 20.5 4.5 19.8 4.5 19V5.5C4.5 4.7 5.2 4 6 4Z" />
    <path d="M15 4V8H19" />
    <path d="M8 12H15.5" />
    <path d="M8 15.5H13.5" />
  `,
  sparkle: `
    <path d="M12 3.5L14.1 9.4L20 11.5L14.1 13.6L12 19.5L9.9 13.6L4 11.5L9.9 9.4L12 3.5Z" />
  `,
  shield: `
    <path d="M12 3.5L19 6.5V11.8C19 16 16 19.2 12 20.5C8 19.2 5 16 5 11.8V6.5L12 3.5Z" />
    <path d="M9.2 12L11.2 14L15 9.8" />
  `,
  sliders: `
    <path d="M4 7H20" />
    <path d="M4 17H20" />
    <circle cx="9" cy="7" r="2.2" fill="white" />
    <circle cx="15" cy="17" r="2.2" fill="white" />
  `,
  stamp: `
    <path d="M7 17H17" />
    <rect x="4.5" y="17" width="15" height="3" rx="1" />
    <path d="M9.5 17V13.5C9.5 12 8.2 11 8.2 8.5C8.2 6.3 9.9 4.5 12 4.5C14.1 4.5 15.8 6.3 15.8 8.5C15.8 11 14.5 12 14.5 13.5V17" />
  `,
  'chevron-right': `
    <path d="M9.5 6L15.5 12L9.5 18" />
  `,
  'chevron-down': `
    <path d="M6 9.5L12 15.5L18 9.5" />
  `,
  'arrow-up-right': `
    <path d="M7 17L17 7" />
    <path d="M9 7H17V15" />
  `,
  close: `
    <path d="M6.5 6.5L17.5 17.5" />
    <path d="M17.5 6.5L6.5 17.5" />
  `,
  'door-open': `
    <path d="M4 20H20" />
    <path d="M6.5 20V5.5C6.5 4.7 7.2 4 8 4H15.5C16.3 4 17 4.7 17 5.5V20" />
    <circle cx="14" cy="12" r="0.9" fill="currentColor" stroke="none" />
  `,
  calendar: `
    <rect x="3.5" y="5.5" width="17" height="15" rx="2.2" />
    <path d="M8 3.5V7" />
    <path d="M16 3.5V7" />
    <path d="M3.5 10H20.5" />
  `,
  check: `
    <path d="M5.5 12.5L10 17L18.5 7.5" />
  `,
  newspaper: `
    <rect x="3.5" y="4.5" width="17" height="15" rx="2.2" />
    <path d="M7.5 8.5H13.5" />
    <path d="M7.5 12H16.5" />
    <path d="M7.5 15.5H14" />
  `,
  users: `
    <circle cx="9" cy="8.5" r="3" />
    <path d="M3.8 18.5C4.5 15.5 6.5 14 9 14C11.5 14 13.5 15.5 14.2 18.5" />
    <circle cx="16.2" cy="9.2" r="2.3" />
    <path d="M15.2 14.2C17.2 14.4 18.9 15.7 19.6 18.2" />
  `,
  bolt: `
    <path d="M13 3.5L5.5 13.5H12L11 20.5L18.5 10.5H12L13 3.5Z" />
  `,
  menu: `
    <path d="M4 6.5H20" />
    <path d="M4 12H16" />
    <path d="M4 17.5H20" />
  `,
  settings: `
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3.5V5.5" />
    <path d="M12 18.5V20.5" />
    <path d="M4.6 7.8L6.3 8.8" />
    <path d="M17.7 15.2L19.4 16.2" />
    <path d="M19.4 7.8L17.7 8.8" />
    <path d="M6.3 15.2L4.6 16.2" />
  `,
  sidebar: `
    <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
    <path d="M9.5 4V20" />
  `,
  download: `
    <path d="M12 3.5V15.5" />
    <path d="M7 10.5L12 15.5L17 10.5" />
    <path d="M4 19.5H20" />
  `,
  'file-text': `
    <path d="M14 2.5H6C4.9 2.5 4 3.4 4 4.5V19.5C4 20.6 4.9 21.5 6 21.5H18C19.1 21.5 20 20.6 20 19.5V8.5L14 2.5Z" />
    <path d="M14 2.5V8.5H20" />
    <path d="M8 12.5H16" />
    <path d="M8 16.5H13" />
  `,
  'map-pin': `
    <path d="M12 2.5C8.7 2.5 6 5.2 6 8.5C6 13.5 12 21.5 12 21.5C12 21.5 18 13.5 18 8.5C18 5.2 15.3 2.5 12 2.5Z" />
    <circle cx="12" cy="8.5" r="2.5" />
  `,
  'alert-triangle': `
    <path d="M12 3.5L21 19.5H3L12 3.5Z" />
    <path d="M12 9V13.5" />
    <circle cx="12" cy="16.5" r="0.9" fill="currentColor" stroke="none" />
  `,
  info: `
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11V16" />
    <circle cx="12" cy="8" r="0.9" fill="currentColor" stroke="none" />
  `,
  phone: `
    <path d="M5 4H8.5L10.5 8.5L8.5 10.5C9.7 12.9 11.6 14.8 14 16L16 14L20.5 16V19.5C20.5 20.1 20 20.6 19.4 20.5C10.7 19.7 3.8 12.8 3 4.1C2.9 3.5 3.4 3 4 3H5" />
  `,
  heart: `
    <path d="M12 20.5C12 20.5 3.5 15 3.5 8.5C3.5 5.5 6 3.5 9 3.5C10.5 3.5 11.5 4.5 12 5.5C12.5 4.5 13.5 3.5 15 3.5C18 3.5 20.5 5.5 20.5 8.5C20.5 15 12 20.5 12 20.5Z" />
  `,
  moon: `
    <path d="M21 12.8C20 13.5 18.8 14 17.5 14C13.9 14 11 11.1 11 7.5C11 6.2 11.5 5 12.2 4C7.5 4.5 4 8.5 4 13.5C4 18.7 8.3 23 13.5 23C18.5 23 22.5 19.5 23 14.8C22.3 15.3 21.5 15.6 20.6 15.6" />
  `,
  filter: `
    <path d="M3 5H21L14 13.5V19.5L10 17.5V13.5L3 5Z" />
  `,
  lock: `
    <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
    <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
  `,
  key: `
    <circle cx="7.5" cy="15.5" r="4.5" />
    <path d="m21 3-9.5 9.5" />
    <path d="m15.5 7.5 3 3" />
    <path d="m18.5 4.5 2 2" />
  `,
  plus: `
    <path d="M12 5V19" />
    <path d="M5 12H19" />
  `,
  kanban: `
    <rect x="3.5" y="4.5" width="4.5" height="15" rx="1.5" />
    <rect x="9.75" y="4.5" width="4.5" height="9" rx="1.5" />
    <rect x="16" y="4.5" width="4.5" height="12" rx="1.5" />
  `,
};

export function getCagpIconPaths(name: CagpIconName): string {
  return ICON_PATHS[name] || ICON_PATHS.hoje;
}

export function getCagpIconSvg(name: CagpIconName, className = 'w-5 h-5'): string {
  const paths = getCagpIconPaths(name);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="${className}" aria-hidden="true">${paths}</svg>`;
}

/**
 * Converte um identificador de eixo ou classe Bootstrap Icon em um CagpIconName canônico.
 */
export function resolveCagpIconName(raw: string): CagpIconName {
  const key = raw.replace(/^bi-/, '').trim();
  const map: Record<string, CagpIconName> = {
    hoje: 'hoje',
    compass: 'hoje',
    'compass-fill': 'hoje',
    curso: 'curso',
    mortarboard: 'curso',
    'mortarboard-fill': 'curso',
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
  return map[key] || 'hoje';
}
