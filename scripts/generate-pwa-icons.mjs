// Gera todos os assets da Chapa Semente a partir dos PNGs OFICIAIS do manual
// (_referencias/identidade_visual_chapa_semente/1.png … 12.png, 1080×1350 com margem).
//
// 1. Recorta a margem transparente de cada arquivo e publica em public/logos/semente/*.webp
// 2. Gera favicon, apple-touch-icon e ícones PWA (any + maskable) a partir do isotipo 10.png
// 3. Gera o badge monocromático de notificação a partir do isotipo branco 12.png
//
// Uso: node scripts/generate-pwa-icons.mjs   (requer ImageMagick 7 — comando `magick`)

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT_DIR = process.cwd();
const SRC_DIR = path.join(ROOT_DIR, '_referencias/identidade_visual_chapa_semente');
const LOGO_DIR = path.join(ROOT_DIR, 'public/logos/semente');
const PWA_DIR = path.join(ROOT_DIR, 'public/imagens/pwa');

// Numeração do manual (seção 6) → nome publicado
const OFFICIAL_ASSETS = {
  1: 'semente-horizontal',
  2: 'semente-horizontal-preto',
  3: 'semente-horizontal-branco',
  4: 'semente-horizontal-badge-laranja',
  5: 'semente-horizontal-badge-petroleo',
  6: 'semente-vertical',
  7: 'semente-vertical-badge',
  8: 'semente-vertical-branco',
  9: 'semente-vertical-preto',
  10: 'semente-simbolo',
  11: 'semente-simbolo-preto',
  12: 'semente-simbolo-branco',
};

const magick = (...args) => execFileSync('magick', args, { stdio: 'inherit' });
const src = (n) => path.join(SRC_DIR, `${n}.png`);

fs.mkdirSync(LOGO_DIR, { recursive: true });
fs.mkdirSync(PWA_DIR, { recursive: true });

console.log('[1/3] Logos oficiais recortados → public/logos/semente/');
for (const [n, name] of Object.entries(OFFICIAL_ASSETS)) {
  const out = path.join(LOGO_DIR, `${name}.webp`);
  magick(src(n), '-trim', '+repage', '-quality', '90', '-define', 'webp:alpha-quality=100', out);
  console.log(`  - ${n}.png → ${name}.webp`);
}

// Isotipo centralizado num quadrado branco. `fill` = fração do lado ocupada pela altura do símbolo.
function squareIcon(sourceN, size, fill, out, background = '#FFFFFF') {
  const inner = Math.round(size * fill);
  magick(
    src(sourceN), '-trim', '+repage',
    '-resize', `${inner}x${inner}`,
    '-background', background, '-gravity', 'center', '-extent', `${size}x${size}`,
    '-alpha', background === 'none' ? 'on' : 'remove',
    out,
  );
}

console.log('[2/3] Ícones PWA, apple-touch e favicon (isotipo 10.png)');
// "any": respiro ~12% (regra 02 do manual: o símbolo nunca encosta na borda)
squareIcon(10, 192, 0.76, path.join(PWA_DIR, 'pwa-192x192.png'));
squareIcon(10, 512, 0.76, path.join(PWA_DIR, 'pwa-512x512.png'));
// "maskable": símbolo inteiro dentro do círculo seguro de 80%
squareIcon(10, 192, 0.6, path.join(PWA_DIR, 'pwa-maskable-192x192.png'));
squareIcon(10, 512, 0.6, path.join(PWA_DIR, 'pwa-maskable-512x512.png'));
squareIcon(10, 180, 0.72, path.join(PWA_DIR, 'apple-touch-icon.png'));
squareIcon(10, 96, 0.84, path.join(ROOT_DIR, 'public/favicon-96x96.png'));
// favicon.ico multi-resolução (16/32/48)
const tmp = path.join(PWA_DIR, '.favicon-src.png');
squareIcon(10, 256, 0.86, tmp);
magick(tmp, '-define', 'icon:auto-resize=48,32,16', path.join(ROOT_DIR, 'public/favicon.ico'));
fs.unlinkSync(tmp);

console.log('[3/3] Badge monocromático de notificação (isotipo 12.png)');
squareIcon(12, 96, 0.84, path.join(PWA_DIR, 'badge-96x96.png'), 'none');

console.log('Pronto: todos os assets vêm dos arquivos oficiais do manual.');
