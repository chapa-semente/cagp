#!/usr/bin/env node
// scripts/build-icons.mjs — Sistema único de ícones (Phosphor Bold).
//
// O site tinha três sistemas (Bootstrap Icons, lucide-react e desenhos próprios a 1.75px).
// Agora tudo é Phosphor Bold, e as abas da barra usam 4 ícones próprios com a geometria
// da semente (src/lib/cagpIcons.ts › TAB_ICONS).
//
// Este script gera:
//   1. src/styles/icons.css — as classes `bi bi-*` (API legada, usada em ~100 arquivos e em
//      dados como 'bi-shield-check') passam a desenhar o glifo Phosphor Bold equivalente.
//   2. src/assets/fonts/phosphor-bold-subset.woff — só os glifos usados (~10 KB em vez de 150 KB).
//   3. src/lib/cagpIconPaths.generated.ts — o miolo SVG Phosphor dos nomes do CagpIcon.
//
// Rodar depois de usar um `bi-*` novo:  node scripts/build-icons.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { icons } = require('@phosphor-icons/core');
const byName = new Map(icons.map((i) => [i.name, i]));
const coreDir = join(root, 'node_modules/@phosphor-icons/core');
const webDir = join(root, 'node_modules/@phosphor-icons/web');

// Bootstrap → Phosphor. Variantes "-fill" viram o mesmo desenho Bold: um traço só no site inteiro.
const BI = {
  'airplane': 'airplane', 'alarm': 'alarm', 'archive': 'archive', 'arrow-bar-up': 'arrow-line-up',
  'arrow-counterclockwise': 'arrow-counter-clockwise', 'arrow-left': 'arrow-left', 'arrow-left-right': 'arrows-left-right',
  'arrow-repeat': 'arrows-clockwise', 'arrow-right': 'arrow-right', 'arrows-angle-contract': 'arrows-in-simple',
  'arrows-angle-expand': 'arrows-out-simple', 'arrow-up': 'arrow-up', 'award': 'medal', 'backpack': 'backpack',
  'balance-scale': 'scales', 'bank': 'bank', 'bank2': 'bank', 'bar-chart-line': 'chart-bar', 'bell': 'bell',
  'book': 'book-open', 'book-half': 'book-open-text', 'bookmark-check': 'bookmark-simple', 'box-arrow-up-right': 'arrow-square-out',
  'briefcase': 'briefcase', 'broadcast': 'broadcast', 'broadcast-pin': 'broadcast', 'building': 'building-office',
  'building-check': 'buildings', 'building-gear': 'buildings', 'buildings': 'buildings', 'bus-front': 'bus',
  'calculator': 'calculator', 'calendar2-event': 'calendar-dot', 'calendar2-week': 'calendar-blank', 'calendar3': 'calendar-blank',
  'calendar-check': 'calendar-check', 'calendar-event': 'calendar-dot', 'calendar-plus': 'calendar-plus', 'camera': 'camera',
  'camera-reels': 'film-reel', 'card-text': 'article', 'cash-coin': 'coins', 'cash-stack': 'money', 'chat-heart': 'chat-circle-dots',
  'chat-square-quote': 'quotes', 'check2': 'check', 'check2-circle': 'check-circle', 'check2-square': 'check-square',
  'check-circle': 'check-circle', 'check-lg': 'check', 'chevron-down': 'caret-down', 'chevron-left': 'caret-left',
  'chevron-right': 'caret-right', 'clipboard': 'clipboard-text', 'clipboard2-data': 'clipboard-text', 'clipboard-check': 'list-checks',
  'clock': 'clock', 'clock-history': 'clock-counter-clockwise', 'cloud-check': 'cloud-check', 'collection': 'stack',
  'columns-gap': 'columns', 'compass': 'compass', 'cup-hot': 'coffee', 'dash': 'minus', 'dash-circle': 'minus-circle',
  'diagram-2': 'tree-structure', 'diagram-3': 'tree-structure', 'display': 'monitor', 'door-closed': 'door', 'door-open': 'door-open',
  'download': 'download-simple', 'envelope': 'envelope-simple', 'envelope-open': 'envelope-simple-open', 'envelope-plus': 'envelope-simple',
  'exclamation-octagon': 'warning-octagon', 'exclamation-triangle': 'warning', 'eye': 'eye', 'file-earmark-arrow-down': 'file-arrow-down',
  'file-earmark-arrow-up': 'file-arrow-up', 'file-earmark-check': 'seal-check', 'file-earmark-diff': 'file-plus',
  'file-earmark-pdf': 'file-pdf', 'file-earmark-person': 'identification-card', 'file-earmark-richtext': 'file-text',
  'file-earmark-ruled': 'file-text', 'file-earmark-spreadsheet': 'file-xls', 'file-earmark-text': 'file-text',
  'file-earmark-word': 'file-doc', 'file-text': 'file-text', 'flag': 'flag', 'flask': 'flask', 'flower1': 'flower',
  'folder2-open': 'folder-open', 'folder-symlink': 'folder-simple', 'funnel': 'funnel-simple', 'gear': 'gear-six',
  'gender-female': 'gender-female', 'geo-alt': 'map-pin', 'globe': 'globe', 'globe2': 'globe-simple', 'google': 'google-logo',
  'graph-up-arrow': 'trend-up', 'grid': 'squares-four', 'headset': 'headset', 'heart': 'heart', 'heart-pulse': 'heartbeat',
  'house-heart': 'house-line', 'info-circle': 'info', 'instagram': 'instagram-logo', 'journal-bookmark': 'book-bookmark',
  'journal-check': 'notebook', 'journal-richtext': 'notebook', 'journal-text': 'notebook', 'journal-x': 'notebook',
  'kanban': 'kanban', 'keyboard': 'keyboard', 'layout-sidebar-inset': 'sidebar-simple', 'lightbulb': 'lightbulb',
  'lightning-charge': 'lightning', 'link-45deg': 'link-simple', 'list': 'list', 'list-nested': 'list-dashes', 'arrow-down': 'arrow-down', 'lock': 'lock-simple',
  'megaphone': 'megaphone-simple', 'mic': 'microphone', 'moon-stars': 'moon-stars', 'mortarboard': 'graduation-cap',
  'newspaper': 'newspaper', 'palette': 'palette', 'patch-check': 'seal-check', 'pencil': 'pencil-simple', 'pencil-square': 'note-pencil',
  'people': 'users-three', 'person-badge': 'identification-badge', 'person': 'user', 'person-heart': 'user-circle',
  'person-lines': 'address-book', 'person-standing-dress': 'person', 'person-vcard': 'identification-card',
  'person-video3': 'video-conference', 'person-workspace': 'desktop', 'phone': 'device-mobile', 'pie-chart': 'chart-pie-slice',
  'play': 'play', 'plus': 'plus', 'plus-circle': 'plus-circle', 'plus-slash-minus': 'plus-minus', 'question-circle': 'question',
  'quote': 'quotes', 'rocket-takeoff': 'rocket-launch', 'safe2': 'vault', 'search': 'magnifying-glass', 'send-check': 'paper-plane-tilt',
  'send': 'paper-plane-tilt', 'share': 'share-network', 'shield-check': 'shield-check', 'shield-exclamation': 'shield-warning',
  'shield-fill-check': 'shield-check', 'shield-lock': 'shield-check', 'shield-shaded': 'shield', 'shuffle': 'shuffle',
  'signpost-split': 'signpost', 'sliders': 'sliders-horizontal', 'sliders2': 'sliders-horizontal', 'star': 'star',
  'stars': 'sparkle', 'symmetry-horizontal': 'arrows-left-right', 'table': 'table', 'trash': 'trash', 'universal-access': 'person-arms-spread',
  'whatsapp': 'whatsapp-logo', 'wifi': 'wifi-high', 'wifi-off': 'wifi-slash', 'x': 'x', 'x-circle': 'x-circle', 'x-lg': 'x',
  'x-octagon': 'x-circle', 'youtube': 'youtube-logo', 'telephone': 'phone', 'map': 'map-trifold', 'geo': 'map-pin',
  'card-checklist': 'list-checks', 'key': 'key', 'plus-lg': 'plus', 'arrow-up-right': 'arrow-up-right',
};

// Nomes do CagpIcon → Phosphor. Os 4 ícones de aba (hoje, guias, curso, mais) são desenhados à mão
// em src/lib/cagpIcons.ts e não passam por aqui.
const CAGP = {
  compass: 'compass', curriculo: 'tree-structure', carreira: 'briefcase', acervo: 'folder-open', cagp: 'users-three',
  search: 'magnifying-glass', bell: 'bell', passport: 'identification-card', utensils: 'fork-knife', bus: 'bus',
  building: 'buildings', clock: 'clock', calculator: 'calculator', checklist: 'list-checks', briefcase: 'briefcase',
  thesis: 'notebook', sparkle: 'sparkle', shield: 'shield-check', sliders: 'sliders-horizontal', stamp: 'seal-check',
  'chevron-right': 'caret-right', 'chevron-down': 'caret-down', 'arrow-up-right': 'arrow-up-right', close: 'x',
  'door-open': 'door-open', calendar: 'calendar-blank', check: 'check', newspaper: 'newspaper', users: 'users',
  bolt: 'lightning', menu: 'list', settings: 'gear-six', sidebar: 'sidebar-simple', download: 'download-simple',
  'file-text': 'file-text', 'map-pin': 'map-pin', 'alert-triangle': 'warning', info: 'info', phone: 'phone',
  heart: 'heart', moon: 'moon-stars', filter: 'funnel-simple', lock: 'lock-simple', key: 'key', plus: 'plus',
  kanban: 'kanban', whatsapp: 'whatsapp-logo', share: 'share-network', 'arrow-right': 'arrow-right',
  'arrow-left': 'arrow-left', 'file-pdf': 'file-pdf', 'graduation-cap': 'graduation-cap', 'map-trifold': 'map-trifold',
  megaphone: 'megaphone-simple', vote: 'check-square-offset', 'seal-check': 'seal-check', copy: 'copy',
  leaf: 'plant', accessibility: 'person-arms-spread', 'chevron-left': 'caret-left', external: 'arrow-square-out',
};

const missing = [];
const need = (name, from) => {
  if (!byName.has(name)) missing.push(`${from} → ${name}`);
  return byName.get(name);
};

// 1) Classes usadas no código-fonte
const used = new Set(
  execFileSync('grep', ['-rhoE', '\\bbi-[a-z0-9-]+', join(root, 'src')], { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean),
);
for (const k of Object.keys(BI)) used.add(`bi-${k}`);

const cssRules = [];
const codepoints = new Set();
for (const cls of [...used].sort()) {
  const base = cls.slice(3).replace(/-fill$/, '').replace(/-fill-/, '-');
  const target = BI[base] ?? BI[cls.slice(3)];
  if (!target) {
    missing.push(`${cls} (sem mapa)`);
    continue;
  }
  const icon = need(target, cls);
  if (!icon) continue;
  codepoints.add(icon.codepoint);
  cssRules.push(`.bi-${cls.slice(3)}::before { content: "\\${icon.codepoint.toString(16)}"; }`);
}

// 2) Miolo SVG para o CagpIcon
const pathEntries = [];
for (const [cagpName, phName] of Object.entries(CAGP)) {
  if (!need(phName, `CagpIcon:${cagpName}`)) continue;
  const svg = readFileSync(join(coreDir, 'assets/bold', `${phName}-bold.svg`), 'utf8');
  const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
  pathEntries.push(`  ${JSON.stringify(cagpName)}: ${JSON.stringify(inner)},`);
}

if (missing.length) {
  console.error('Ícones sem correspondência no Phosphor:\n  ' + missing.join('\n  '));
  process.exit(1);
}

// 3) Fonte recortada
mkdirSync(join(root, 'src/assets/fonts'), { recursive: true });
const fontOut = join(root, 'src/assets/fonts/phosphor-bold-subset.woff');
execFileSync('pyftsubset', [
  join(webDir, 'src/bold/Phosphor-Bold.ttf'),
  `--unicodes=${[...codepoints].map((c) => 'U+' + c.toString(16)).join(',')}`,
  '--flavor=woff',
  '--no-hinting',
  '--layout-features=',
  `--output-file=${fontOut}`,
]);

const header = '/* GERADO por scripts/build-icons.mjs — não editar à mão. */\n';
writeFileSync(
  join(root, 'src/styles/icons.css'),
  `${header}
/* Sistema único de ícones: Phosphor Bold. A API \`bi bi-*\` continua valendo e desenha o glifo Phosphor. */
@font-face {
  font-family: "Phosphor-Bold";
  src: url("../assets/fonts/phosphor-bold-subset.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

.bi {
  display: inline-block;
  font-family: "Phosphor-Bold" !important;
  font-style: normal;
  font-weight: normal !important;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  letter-spacing: 0;
  vertical-align: -0.125em;
  speak: never;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

${cssRules.join('\n')}
`,
);

writeFileSync(
  join(root, 'src/lib/cagpIconPaths.generated.ts'),
  `// GERADO por scripts/build-icons.mjs — não editar à mão. Miolo SVG Phosphor Bold (viewBox 0 0 256 256).
export const PHOSPHOR_PATHS = {
${pathEntries.join('\n')}
} as const;

export type PhosphorCagpName = keyof typeof PHOSPHOR_PATHS;
`,
);

console.log(`icons.css: ${cssRules.length} classes · fonte com ${codepoints.size} glifos · CagpIcon: ${pathEntries.length} desenhos`);
