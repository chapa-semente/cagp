import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT_DIR = process.cwd();
const SEMENTE_SYMBOL_PATH = path.join(ROOT_DIR, 'public/logos/semente/simbolo_semente_fiel.svg');
const OUT_SYMBOL_WHITE_BG = path.join(ROOT_DIR, 'public/logos/semente/simbolo_semente_fundo_branco.svg');
const OUT_FAVICON_SVG = path.join(ROOT_DIR, 'public/favicon.svg');
const OUT_PWA_SVG = path.join(ROOT_DIR, 'public/imagens/pwa/pwa-icon.svg');
const OUT_PWA_192 = path.join(ROOT_DIR, 'public/imagens/pwa/pwa-192x192.png');
const OUT_PWA_512 = path.join(ROOT_DIR, 'public/imagens/pwa/pwa-512x512.png');
const OUT_PWA_MASKABLE_512 = path.join(ROOT_DIR, 'public/imagens/pwa/pwa-maskable-512x512.png');
const OUT_APPLE_TOUCH = path.join(ROOT_DIR, 'public/imagens/pwa/apple-touch-icon.png');
const OUT_FAVICON_ICO = path.join(ROOT_DIR, 'public/favicon.ico');

// Ensure output dirs exist
fs.mkdirSync(path.dirname(OUT_SYMBOL_WHITE_BG), { recursive: true });
fs.mkdirSync(path.dirname(OUT_PWA_SVG), { recursive: true });

const sementeSymbolContent = fs.readFileSync(SEMENTE_SYMBOL_PATH, 'utf8');

// Extract inner elements of the symbol (<defs> and <g id="simbolo-semente">)
const defsMatch = sementeSymbolContent.match(/<defs>[\s\S]*?<\/defs>/);
const defsContent = defsMatch ? defsMatch[0] : '';
const groupMatch = sementeSymbolContent.match(/<g id="simbolo-semente"[\s\S]*?<\/g>/);
const groupContent = groupMatch ? groupMatch[0] : '';

if (!groupContent) {
  throw new Error('Failed to extract <g id="simbolo-semente"> from ' + SEMENTE_SYMBOL_PATH);
}

function buildSvgWithWhiteBg(innerX, innerY, innerW, innerH) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#FFFFFF"/>
  <svg x="${innerX}" y="${innerY}" width="${innerW}" height="${innerH}" viewBox="57 24 1205 1982" preserveAspectRatio="xMidYMid meet">
    ${defsContent}
    ${groupContent}
  </svg>
</svg>
`;
}

// 1. Standard icon SVG (ideal for square display, favicon, PWA standard: padding ~11%)
const standardSvg = buildSvgWithWhiteBg(56, 56, 400, 400);
fs.writeFileSync(OUT_SYMBOL_WHITE_BG, standardSvg, 'utf8');
fs.writeFileSync(OUT_FAVICON_SVG, standardSvg, 'utf8');
fs.writeFileSync(OUT_PWA_SVG, standardSvg, 'utf8');

console.log('[1/4] SVG files generated:');
console.log('  -', OUT_SYMBOL_WHITE_BG);
console.log('  -', OUT_FAVICON_SVG);
console.log('  -', OUT_PWA_SVG);

// 2. Maskable icon SVG (inner size 340x340, strictly within 80% safe zone circle diameter 409.6px)
const maskableSvg = buildSvgWithWhiteBg(86, 86, 340, 340);
const tempMaskableSvgPath = path.join(ROOT_DIR, 'public/imagens/pwa/temp-maskable.svg');
fs.writeFileSync(tempMaskableSvgPath, maskableSvg, 'utf8');

// 3. Render PNGs using rsvg-convert
console.log('[2/4] Rendering PNG raster assets:');
execSync(`rsvg-convert -w 192 -h 192 "${OUT_PWA_SVG}" -o "${OUT_PWA_192}"`);
console.log('  - pwa-192x192.png created');

execSync(`rsvg-convert -w 512 -h 512 "${OUT_PWA_SVG}" -o "${OUT_PWA_512}"`);
console.log('  - pwa-512x512.png created');

execSync(`rsvg-convert -w 512 -h 512 "${tempMaskableSvgPath}" -o "${OUT_PWA_MASKABLE_512}"`);
console.log('  - pwa-maskable-512x512.png created');
fs.unlinkSync(tempMaskableSvgPath);

execSync(`rsvg-convert -w 180 -h 180 "${OUT_PWA_SVG}" -o "${OUT_APPLE_TOUCH}"`);
console.log('  - apple-touch-icon.png (180x180) created');

// 4. Generate multi-resolution favicon.ico
console.log('[3/4] Generating favicon.ico:');
execSync(`magick "${OUT_PWA_SVG}" -resize 32x32 "${OUT_FAVICON_ICO}"`);
console.log('  - favicon.ico (32x32) created');

console.log('[4/4] All PWA & Favicon assets successfully generated with solid white background!');
