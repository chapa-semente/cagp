#!/usr/bin/env node
// scripts/check-hardcoded-styles.mjs — Catraca contra estilos escritos à mão.
// Falha se um arquivo protegido usar cor hex literal ou sombra arbitrária (`shadow-[...]`)
// em vez dos tokens (border-border, bg-card, shadow-lg, text-muted-foreground...).
// Para proteger mais um arquivo depois de limpá-lo, adicione o caminho em GUARDED.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();

const GUARDED = [
  'src/pages/curso.astro',
  'src/pages/calouros.astro',
  'src/pages/permanencia.astro',
  'src/pages/pesquisa.astro',
  'src/components/features/acolhimento',
  'src/components/features/curso/CursoPainelGeral.astro',
  'src/components/features/curso/CursoPilares.astro',
  'src/components/features/calouros/CalouroCentralOverview.astro',
  'src/components/features/permanencia/PermanenciaInteractiveHub.tsx',
];

const RULES = [
  { id: 'hex-color', re: /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![0-9a-fA-F-])/g, hint: 'use um token de cor (text-foreground, bg-card, border-border...)' },
  { id: 'arbitrary-shadow', re: /shadow-\[[^\]]+\]/g, hint: 'use shadow-xs | sm | md | lg | xl' },
];

const EXT = /\.(astro|tsx|ts|jsx|css)$/;

function collect(path) {
  const abs = join(ROOT, path);
  const st = statSync(abs, { throwIfNoEntry: false });
  if (!st) return [];
  if (st.isFile()) return [abs];
  return readdirSync(abs).flatMap((name) => collect(relative(ROOT, join(abs, name))));
}

const files = GUARDED.flatMap(collect).filter((f) => EXT.test(f));
const problems = [];

for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    // Comentários e entidades HTML (&#123;) não contam.
    const code = line.replace(/\/\/.*$/, '').replace(/&#\w+;/g, '');
    for (const rule of RULES) {
      for (const m of code.matchAll(rule.re)) {
        problems.push(`${relative(ROOT, file)}:${i + 1}  ${rule.id}  ${m[0]}  → ${rule.hint}`);
      }
    }
  });
}

if (problems.length) {
  console.error(`✗ ${problems.length} estilo(s) escrito(s) à mão em arquivos protegidos:\n`);
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`✓ ${files.length} arquivos protegidos sem cor hex nem sombra arbitrária.`);
