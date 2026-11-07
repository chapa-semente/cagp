#!/usr/bin/env node
/**
 * scripts/sync-design-system-source.mjs
 *
 * Sincroniza e copia a coleção integral original de códigos-fonte (.tsx, .ts, .css,
 * utilitários, hooks, exemplos e dependências) de Neobrutalism.com e BoldKit.dev
 * para _referencias/design-system/, enriquecendo os arquivos de documentação .md
 * com links navegáveis diretos.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const OUT_DIR = path.join(ROOT, '_referencias', 'design-system');
const NEO_CACHE = '/tmp/neobrutalism-cache';
const BOLD_CACHE = '/tmp/boldkit-cache';

// Helper: Ensure directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Helper: Copy directory recursively
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('🚀 Iniciando sincronização e cópia integral de códigos-fonte...');

// 1. Clones temporários se não existirem
if (!fs.existsSync(NEO_CACHE)) {
  console.log('📥 Clonando ekmas/neobrutalism-components (depth 1)...');
  execSync('git clone --depth 1 https://github.com/ekmas/neobrutalism-components.git /tmp/neobrutalism-cache', {
    stdio: 'inherit',
  });
}

if (!fs.existsSync(BOLD_CACHE)) {
  console.log('📥 Clonando ANIBIT14/boldkit (depth 1)...');
  execSync('git clone --depth 1 https://github.com/ANIBIT14/boldkit.git /tmp/boldkit-cache', {
    stdio: 'inherit',
  });
}

// ============================================================================
// 2. NEOBRUTALISM.COM SOURCE
// ============================================================================
console.log('\n📦 Copiando código-fonte integral de Neobrutalism.com...');

const NEO_DEST = path.join(OUT_DIR, 'neobrutalism');
const NEO_UI_DEST = path.join(NEO_DEST, 'ui');
const NEO_EXAMPLES_DEST = path.join(NEO_DEST, 'examples');
const NEO_LIB_DEST = path.join(NEO_DEST, 'lib');
const NEO_HOOKS_DEST = path.join(NEO_DEST, 'hooks');
const NEO_STYLING_DEST = path.join(NEO_DEST, 'styling');

[NEO_DEST, NEO_UI_DEST, NEO_EXAMPLES_DEST, NEO_LIB_DEST, NEO_HOOKS_DEST, NEO_STYLING_DEST].forEach(ensureDir);

// Copy UI components
copyDirRecursive(path.join(NEO_CACHE, 'src', 'components', 'ui'), NEO_UI_DEST);

// Copy examples
copyDirRecursive(path.join(NEO_CACHE, 'src', 'examples', 'ui'), NEO_EXAMPLES_DEST);

// Copy lib
copyDirRecursive(path.join(NEO_CACHE, 'src', 'lib'), NEO_LIB_DEST);

// Copy hooks
copyDirRecursive(path.join(NEO_CACHE, 'src', 'hooks'), NEO_HOOKS_DEST);

// Copy styling
copyDirRecursive(path.join(NEO_CACHE, 'src', 'styling'), NEO_STYLING_DEST);

// Copy package.reference.json
const neoPkgSrc = path.join(NEO_CACHE, 'package.json');
if (fs.existsSync(neoPkgSrc)) {
  const pkgContent = fs.readFileSync(neoPkgSrc, 'utf8');
  fs.writeFileSync(path.join(NEO_DEST, 'package.reference.json'), pkgContent, 'utf8');

  const pkgObj = JSON.parse(pkgContent);
  const deps = pkgObj.dependencies || {};
  const devDeps = pkgObj.devDependencies || {};

  const neoDepMd = `# Neobrutalism.com — Dependências Oficiais de Referência

Este documento registra as dependências, ferramentas de compilação e versões originais especificadas pelo autor de [Neobrutalism.com](https://neobrutalism.com).

## Runtime Dependencies

| Pacote | Versão | Propósito |
| :--- | :--- | :--- |
${Object.entries(deps)
  .map(([k, v]) => `| \`${k}\` | \`${v}\` | Core runtime / UI primitive |`)
  .join('\n')}

## Dev Dependencies & Build Tools

| Pacote | Versão |
| :--- | :--- |
${Object.entries(devDeps)
  .map(([k, v]) => `| \`${k}\` | \`${v}\` |`)
  .join('\n')}

## Compatibilidade com Nosso Projeto

- **React 19 / Astro 7**: Os componentes utilizam primitives padrão de Radix UI / Base UI, compativel com nosso \`@astrojs/react\`.
- **Tailwind CSS v4**: Utilizam classes utilitárias clássicas com sombras deslocadas (\`shadow-shadow\`, \`border-border\`) parametrizáveis via variáveis CSS.
`;

  fs.writeFileSync(path.join(NEO_DEST, 'DEPENDENCIES.md'), neoDepMd, 'utf8');
}

const neoUiCount = fs.readdirSync(NEO_UI_DEST).filter(f => f.endsWith('.tsx') || f.endsWith('.ts')).length;
const neoExCount = fs.readdirSync(NEO_EXAMPLES_DEST).length;
console.log(`✅ Neobrutalism: ${neoUiCount} componentes em ui/ e ${neoExCount} diretórios em examples/ copiados!`);

// ============================================================================
// 3. BOLDKIT.DEV SOURCE
// ============================================================================
console.log('\n📦 Copiando código-fonte integral de BoldKit.dev...');

const BOLD_DEST = path.join(OUT_DIR, 'boldkit');
const BOLD_UI_DEST = path.join(BOLD_DEST, 'ui');
const BOLD_BLOCKS_MKT_DEST = path.join(BOLD_DEST, 'blocks-code', 'marketing');
const BOLD_BLOCKS_APP_DEST = path.join(BOLD_DEST, 'blocks-code', 'application');
const BOLD_CANVAS_DEST = path.join(BOLD_DEST, 'canvas-effects');
const BOLD_LIB_DEST = path.join(BOLD_DEST, 'lib');
const BOLD_HOOKS_DEST = path.join(BOLD_DEST, 'hooks');
const BOLD_STYLES_DEST = path.join(BOLD_DEST, 'styles');

[
  BOLD_DEST,
  BOLD_UI_DEST,
  BOLD_BLOCKS_MKT_DEST,
  BOLD_BLOCKS_APP_DEST,
  BOLD_CANVAS_DEST,
  BOLD_LIB_DEST,
  BOLD_HOOKS_DEST,
  BOLD_STYLES_DEST,
].forEach(ensureDir);

// Copy UI components from registry/default/ui
copyDirRecursive(path.join(BOLD_CACHE, 'registry', 'default', 'ui'), BOLD_UI_DEST);

// Supplement with any extra components from src/components/ui if not present
const boldSrcUi = path.join(BOLD_CACHE, 'src', 'components', 'ui');
if (fs.existsSync(boldSrcUi)) {
  const extraUi = fs.readdirSync(boldSrcUi, { withFileTypes: true });
  for (const entry of extraUi) {
    if (entry.name === '__tests__') continue;
    const dest = path.join(BOLD_UI_DEST, entry.name);
    if (!fs.existsSync(dest)) {
      if (entry.isDirectory()) {
        copyDirRecursive(path.join(boldSrcUi, entry.name), dest);
      } else {
        fs.copyFileSync(path.join(boldSrcUi, entry.name), dest);
      }
    }
  }
}

// Copy blocks
copyDirRecursive(path.join(BOLD_CACHE, 'src', 'components', 'blocks', 'marketing'), BOLD_BLOCKS_MKT_DEST);
copyDirRecursive(path.join(BOLD_CACHE, 'src', 'components', 'blocks', 'application'), BOLD_BLOCKS_APP_DEST);

// Copy canvas effects
copyDirRecursive(path.join(BOLD_CACHE, 'src', 'components', 'CanvasEffects', 'react'), BOLD_CANVAS_DEST);

// Copy lib
copyDirRecursive(path.join(BOLD_CACHE, 'registry', 'default', 'lib'), BOLD_LIB_DEST);

// Copy hooks
copyDirRecursive(path.join(BOLD_CACHE, 'registry', 'default', 'hooks'), BOLD_HOOKS_DEST);

// Copy styles
copyDirRecursive(path.join(BOLD_CACHE, 'registry', 'default', 'styles'), BOLD_STYLES_DEST);

// Copy registry.json
const boldRegistrySrc = path.join(BOLD_CACHE, 'registry.json');
if (fs.existsSync(boldRegistrySrc)) {
  fs.copyFileSync(boldRegistrySrc, path.join(BOLD_DEST, 'registry.json'));
}

// Copy package.reference.json
const boldPkgSrc = path.join(BOLD_CACHE, 'package.json');
if (fs.existsSync(boldPkgSrc)) {
  const pkgContent = fs.readFileSync(boldPkgSrc, 'utf8');
  fs.writeFileSync(path.join(BOLD_DEST, 'package.reference.json'), pkgContent, 'utf8');

  const pkgObj = JSON.parse(pkgContent);
  const deps = pkgObj.dependencies || {};
  const devDeps = pkgObj.devDependencies || {};

  const boldDepMd = `# BoldKit.dev — Dependências Oficiais de Referência

Este documento registra as dependências, ferramentas de compilação e versões originais especificadas pelo autor de [BoldKit.dev](https://boldkit.dev).

## Runtime Dependencies

| Pacote | Versão | Propósito |
| :--- | :--- | :--- |
${Object.entries(deps)
  .map(([k, v]) => `| \`${k}\` | \`${v}\` | Core runtime / Radix / Motion |`)
  .join('\n')}

## Dev Dependencies & Build Tools

| Pacote | Versão |
| :--- | :--- |
${Object.entries(devDeps)
  .map(([k, v]) => `| \`${k}\` | \`${v}\` |`)
  .join('\n')}

## Principais Destaques

- **Lucide Icons**: Utiliza \`lucide-react\` para todos os ícones decorativos.
- **Recharts**: Base para os 14 modelos de gráficos estatísticos brutalistas.
- **Motion**: Base para física de curvas e animações sem travamentos.
`;

  fs.writeFileSync(path.join(BOLD_DEST, 'DEPENDENCIES.md'), boldDepMd, 'utf8');
}

const boldUiCount = fs.readdirSync(BOLD_UI_DEST).filter(f => f.endsWith('.tsx') || f.endsWith('.ts')).length;
const boldMktBlocksCount = fs.readdirSync(BOLD_BLOCKS_MKT_DEST).filter(f => f.endsWith('.tsx')).length;
const boldAppBlocksCount = fs.readdirSync(BOLD_BLOCKS_APP_DEST).filter(f => f.endsWith('.tsx')).length;
const boldCanvasCount = fs.readdirSync(BOLD_CANVAS_DEST).filter(f => f.endsWith('.tsx')).length;

console.log(
  `✅ BoldKit: ${boldUiCount} componentes em ui/, ${boldMktBlocksCount + boldAppBlocksCount} blocos em blocks-code/ e ${boldCanvasCount} efeitos em canvas-effects/ copiados!`
);

// ============================================================================
// 4. ENRICH MARKDOWN FILES WITH DIRECT LINKS
// ============================================================================
console.log('\n🔗 Enriquecendo arquivos .md com links diretos navegáveis para o código-fonte...');

// 4.1 Neobrutalism Markdown docs
const neoCompsDir = path.join(NEO_DEST, 'components');
const neoMdFiles = fs.readdirSync(neoCompsDir).filter(f => f.endsWith('.md'));

for (const mdFile of neoMdFiles) {
  const slug = mdFile.replace(/\.md$/, '');
  const mdPath = path.join(neoCompsDir, mdFile);
  let content = fs.readFileSync(mdPath, 'utf8');

  // Check if source code and examples exist
  const sourcePathRel = `../ui/${slug}.tsx`;
  const hasSource = fs.existsSync(path.join(NEO_UI_DEST, `${slug}.tsx`)) || fs.existsSync(path.join(NEO_UI_DEST, `${slug}.ts`));
  const hasExamples = fs.existsSync(path.join(NEO_EXAMPLES_DEST, slug));

  if (!content.includes('**Original Source Code**:')) {
    const navLinks = [
      hasSource ? `> 🔗 **Original Source Code**: [\`components/ui/${slug}.tsx\`](../ui/${slug}.tsx)` : null,
      hasExamples ? `> 📂 **Original Examples**: [\`examples/ui/${slug}/\`](../examples/${slug}/)` : null,
    ]
      .filter(Boolean)
      .join('\n');

    if (navLinks) {
      // Insert right after the title H1
      content = content.replace(/(# [^\n]+\n\n(?:> [^\n]+\n\n)?)/, `$1${navLinks}\n\n`);
      fs.writeFileSync(mdPath, content, 'utf8');
    }
  }
}

// 4.2 BoldKit Markdown docs
const boldCompsDir = path.join(BOLD_DEST, 'components');
const boldMdFiles = fs.readdirSync(boldCompsDir).filter(f => f.endsWith('.md'));

for (const mdFile of boldMdFiles) {
  const slug = mdFile.replace(/\.md$/, '');
  const mdPath = path.join(boldCompsDir, mdFile);
  let content = fs.readFileSync(mdPath, 'utf8');

  const hasSource = fs.existsSync(path.join(BOLD_UI_DEST, `${slug}.tsx`));

  if (!content.includes('**Original Source Code**:')) {
    if (hasSource) {
      const navLink = `> 🔗 **Original Source Code**: [\`components/ui/${slug}.tsx\`](../ui/${slug}.tsx)\n\n`;
      content = content.replace(/(# [^\n]+\n\n(?:> [^\n]+\n\n)?)/, `$1${navLink}`);
      fs.writeFileSync(mdPath, content, 'utf8');
    }
  }
}

// 4.3 BoldKit Block Markdown docs
const boldMktBlockMdDir = path.join(BOLD_DEST, 'blocks', 'marketing');
if (fs.existsSync(boldMktBlockMdDir)) {
  const files = fs.readdirSync(boldMktBlockMdDir).filter(f => f.endsWith('.md'));
  for (const f of files) {
    const slug = f.replace(/\.md$/, '');
    const p = path.join(boldMktBlockMdDir, f);
    let c = fs.readFileSync(p, 'utf8');
    if (!c.includes('**Original Block Implementation**:')) {
      const nav = `> 🔗 **Original Block Implementation**: [\`blocks-code/marketing/${slug}.tsx\`](../../blocks-code/marketing/${slug}.tsx)\n\n`;
      c = c.replace(/(# [^\n]+\n\n(?:> [^\n]+\n\n)?)/, `$1${nav}`);
      fs.writeFileSync(p, c, 'utf8');
    }
  }
}

const boldAppBlockMdDir = path.join(BOLD_DEST, 'blocks', 'application');
if (fs.existsSync(boldAppBlockMdDir)) {
  const files = fs.readdirSync(boldAppBlockMdDir).filter(f => f.endsWith('.md'));
  for (const f of files) {
    const slug = f.replace(/\.md$/, '');
    const p = path.join(boldAppBlockMdDir, f);
    let c = fs.readFileSync(p, 'utf8');
    if (!c.includes('**Original Block Implementation**:')) {
      const nav = `> 🔗 **Original Block Implementation**: [\`blocks-code/application/${slug}.tsx\`](../../blocks-code/application/${slug}.tsx)\n\n`;
      c = c.replace(/(# [^\n]+\n\n(?:> [^\n]+\n\n)?)/, `$1${nav}`);
      fs.writeFileSync(p, c, 'utf8');
    }
  }
}

console.log('✅ Links navegáveis inseridos nos arquivos de documentação!');

// ============================================================================
// 5. UPDATE MASTER README.MD
// ============================================================================
console.log('\n📦 Atualizando Catálogo Geral Mestre (_referencias/design-system/README.md)...');

const masterReadmePath = path.join(OUT_DIR, 'README.md');
let masterReadme = fs.readFileSync(masterReadmePath, 'utf8');

// Update directory tree section in README
const updatedTree = `\`\`\`
_referencias/design-system/
├── README.md                               # Catálogo mestre unificado (Docs + Códigos)
│
├── neobrutalism/
│   ├── README.md                           # Índice e guia do Neobrutalism.com
│   ├── DEPENDENCIES.md                     # Guia de dependências e versões de pacotes
│   ├── package.reference.json              # Configuração original package.json
│   ├── components/                         # 64 arquivos .md autossuficientes
│   ├── ui/                                 # [CÓDIGO ORIGINAL] 64 componentes .tsx
│   ├── examples/                           # [CÓDIGO ORIGINAL] Árvore completa de exemplos .tsx
│   ├── lib/                                # Utilitários (utils.ts, etc.)
│   ├── hooks/                              # Hooks React customizados
│   └── styling/                            # Tokens e configurações de estilo
│
└── boldkit/
    ├── README.md                           # Índice e guia do BoldKit.dev
    ├── DEPENDENCIES.md                     # Guia de dependências e versões de pacotes
    ├── package.reference.json              # Configuração original package.json
    ├── registry.json                       # Catálogo oficial de registry Shadcn
    ├── components/                         # 84 arquivos .md autossuficientes
    ├── blocks/                             # 20 arquivos .md de blocos de layout
    ├── extras/                             # 3 arquivos .md (Canvas Effects, Charts, Shapes)
    ├── ui/                                 # [CÓDIGO ORIGINAL] 84 componentes .tsx
    ├── blocks-code/                        # [CÓDIGO ORIGINAL] 20 blocos Marketing & App .tsx
    ├── canvas-effects/                     # [CÓDIGO ORIGINAL] 23 efeitos gráficos Canvas .tsx
    ├── lib/                                # Utilitários (motion-core, canvas-core, etc.)
    ├── hooks/                              # use-canvas-effect, use-theme
    └── styles/                             # globals.css, motion.css
\`\`\``;

masterReadme = masterReadme.replace(/```\n_referencias\/design-system\/[\s\S]*?```/, updatedTree);
fs.writeFileSync(masterReadmePath, masterReadme, 'utf8');

// Cleanup temporary clones
console.log('\n🧹 Limpando caches temporários em /tmp...');
execSync('rm -rf /tmp/neobrutalism-cache /tmp/boldkit-cache');

console.log(`\n🎉 Sincronização integral de código-fonte concluída com sucesso!`);
console.log(`Resumo dos códigos originais disponíveis em _referencias/design-system/:`);
console.log(`  - Neobrutalism: ${neoUiCount} componentes em ui/ | ${neoExCount} pastas em examples/ | lib | hooks | styling`);
console.log(`  - BoldKit: ${boldUiCount} componentes em ui/ | ${boldMktBlocksCount + boldAppBlocksCount} blocos em blocks-code/ | ${boldCanvasCount} efeitos canvas | lib | hooks | styles`);
