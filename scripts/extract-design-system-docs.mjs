#!/usr/bin/env node
/**
 * scripts/extract-design-system-docs.mjs
 *
 * Automated extraction & generation of 100% self-contained Markdown (.md)
 * documentation for Neobrutalism.com (64 components) and BoldKit.dev (84+ components,
 * 20 blocks, and extras: canvas effects, charts, shapes).
 *
 * Output: _referencias/design-system/
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const OUT_DIR = path.join(ROOT, '_referencias', 'design-system');
const NEO_CACHE = '/tmp/neobrutalism-cache';
const BOLD_CACHE = '/tmp/boldkit-cache';

// Helper: Ensure directories exist
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Helper: slugify
function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '');
}

console.log('🚀 Iniciando extração e compilação de documentação em Markdown...');

// Verify caches
if (!fs.existsSync(NEO_CACHE) || !fs.existsSync(BOLD_CACHE)) {
  console.error('❌ Caches /tmp/neobrutalism-cache ou /tmp/boldkit-cache não encontrados!');
  process.exit(1);
}

// Setup target structure
const NEO_OUT = path.join(OUT_DIR, 'neobrutalism');
const NEO_COMPS_OUT = path.join(NEO_OUT, 'components');

const BOLD_OUT = path.join(OUT_DIR, 'boldkit');
const BOLD_COMPS_OUT = path.join(BOLD_OUT, 'components');
const BOLD_MKT_BLOCKS_OUT = path.join(BOLD_OUT, 'blocks', 'marketing');
const BOLD_APP_BLOCKS_OUT = path.join(BOLD_OUT, 'blocks', 'application');
const BOLD_EXTRAS_OUT = path.join(BOLD_OUT, 'extras');

[
  OUT_DIR,
  NEO_OUT,
  NEO_COMPS_OUT,
  BOLD_OUT,
  BOLD_COMPS_OUT,
  BOLD_MKT_BLOCKS_OUT,
  BOLD_APP_BLOCKS_OUT,
  BOLD_EXTRAS_OUT,
].forEach(ensureDir);

// ============================================================================
// 1. PROCESS NEOBRUTALISM.COM
// ============================================================================
console.log('\n📦 Processando componentes de Neobrutalism.com...');

const neoMdxDir = path.join(NEO_CACHE, 'src', 'markdown', 'components');
const neoMdxFiles = fs.readdirSync(neoMdxDir).filter(f => f.endsWith('.mdx'));

const neoComponentsList = [];

for (const mdxFile of neoMdxFiles) {
  const slug = mdxFile.replace(/\.mdx$/, '');
  const mdxPath = path.join(neoMdxDir, mdxFile);
  let rawContent = fs.readFileSync(mdxPath, 'utf8');

  // Extract frontmatter
  let title = slug;
  let description = '';
  let shadcnDocsLink = '';

  const fmMatch = rawContent.match(/^---\n([\s\S]*?)\n---/);
  if (fmMatch) {
    const fmText = fmMatch[1];
    const tMatch = fmText.match(/title:\s*(.+)/);
    const dMatch = fmText.match(/description:\s*(.+)/);
    const sMatch = fmText.match(/shadcnDocsLink:\s*(.+)/);
    if (tMatch) title = tMatch[1].trim();
    if (dMatch) description = dMatch[1].trim();
    if (sMatch) shadcnDocsLink = sMatch[1].trim();
  }

  // Find component source code if available
  let componentSourceCode = '';
  const compSourceCandidates = [
    path.join(NEO_CACHE, 'src', 'components', 'ui', `${slug}.tsx`),
    path.join(NEO_CACHE, 'src', 'components', 'ui', `${slug}.ts`),
  ];
  for (const c of compSourceCandidates) {
    if (fs.existsSync(c)) {
      componentSourceCode = fs.readFileSync(c, 'utf8').trim();
      break;
    }
  }

  // Resolve <Installation>
  const installRegex = /<Installation\b[^>]*>([\s\S]*?)<\/Installation>/g;
  rawContent = rawContent.replace(installRegex, (match, inner) => {
    let code = '';
    const fileMatch = inner.match(/file=<rootDir>\/([^\s`]+)/);
    if (fileMatch) {
      const fullPath = path.join(NEO_CACHE, fileMatch[1]);
      if (fs.existsSync(fullPath)) {
        code = fs.readFileSync(fullPath, 'utf8').trim();
      }
    }
    if (!code && componentSourceCode) {
      code = componentSourceCode;
    }

    let out = `### CLI Installation\n\n\`\`\`bash\nnpx shadcn@latest add "https://neobrutalism.com/r/${slug}.json"\n\`\`\`\n`;
    if (code) {
      out += `\n### Component Source Code (\`components/ui/${slug}.tsx\`)\n\n\`\`\`tsx\n${code}\n\`\`\`\n`;
    }
    return out;
  });

  // Resolve <ComponentPreview>
  const previewRegex = /<ComponentPreview\b([\s\S]*?)>([\s\S]*?)<\/ComponentPreview>/g;
  rawContent = rawContent.replace(previewRegex, (match, attrs, inner) => {
    let exampleCode = '';
    const fileMatch = inner.match(/file=<rootDir>\/([^\s`]+)/);
    if (fileMatch) {
      const fullPath = path.join(NEO_CACHE, fileMatch[1]);
      if (fs.existsSync(fullPath)) {
        exampleCode = fs.readFileSync(fullPath, 'utf8').trim();
      }
    }

    if (exampleCode) {
      return `\`\`\`tsx\n${exampleCode}\n\`\`\``;
    }

    // If inner contains fenced code block without file path, keep code block
    const codeFenceMatch = inner.match(/```(?:tsx|jsx|ts|js)?\n([\s\S]*?)\n```/);
    if (codeFenceMatch) {
      return `\`\`\`tsx\n${codeFenceMatch[1].trim()}\n\`\`\``;
    }

    return '';
  });

  // Remove frontmatter from body to avoid duplication
  let bodyContent = rawContent.replace(/^---\n[\s\S]*?\n---\n*/, '').trim();

  // Clean any remaining raw JSX component wrappers
  bodyContent = bodyContent
    .replace(/<Tabs\b[^>]*>/g, '')
    .replace(/<\/Tabs>/g, '')
    .replace(/<TabsList\b[^>]*>/g, '')
    .replace(/<\/TabsList>/g, '')
    .replace(/<TabsTrigger\b[^>]*>/g, '')
    .replace(/<\/TabsTrigger>/g, '')
    .replace(/<TabsContent\b[^>]*>/g, '')
    .replace(/<\/TabsContent>/g, '');

  // Detect dependencies from component source code
  const deps = new Set(['tailwind-merge', 'clsx', 'class-variance-authority']);
  if (componentSourceCode.includes('@radix-ui') || componentSourceCode.includes('radix-ui')) deps.add('radix-ui');
  if (componentSourceCode.includes('@base-ui')) deps.add('@base-ui/react');
  if (componentSourceCode.includes('lucide-react')) deps.add('lucide-react');
  if (componentSourceCode.includes('date-fns')) deps.add('date-fns');
  if (componentSourceCode.includes('cmdk')) deps.add('cmdk');
  if (componentSourceCode.includes('recharts')) deps.add('recharts');
  if (componentSourceCode.includes('embla-carousel')) deps.add('embla-carousel-react');
  if (componentSourceCode.includes('input-otp')) deps.add('input-otp');
  if (componentSourceCode.includes('react-day-picker')) deps.add('react-day-picker');

  const finalMarkdown = `---
title: "${title}"
description: "${description.replace(/"/g, '\\"')}"
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/${slug}"
category: "components"
dependencies:
${Array.from(deps).map(d => `  - "${d}"`).join('\n')}
${shadcnDocsLink ? `shadcnDocsLink: "${shadcnDocsLink}"` : ''}
---

# ${title}

> ${description}

${bodyContent}
`;

  const destFile = path.join(NEO_COMPS_OUT, `${slug}.md`);
  fs.writeFileSync(destFile, finalMarkdown, 'utf8');

  neoComponentsList.push({
    title,
    slug,
    description,
    dependencies: Array.from(deps),
  });
}

console.log(`✅ ${neoComponentsList.length} componentes do Neobrutalism.com compilados com sucesso!`);

// Write Neobrutalism README.md
const neoReadme = `# Neobrutalism.com — Documentação e Catálogo de Componentes

Coleção integral de documentação dos **${neoComponentsList.length} componentes** do [Neobrutalism.com](https://neobrutalism.com), baseados em Tailwind CSS, Radix UI e Shadcn UI com estética brutalista de alto contraste, bordas sólidas e sombras deslocadas marcantes.

## Estrutura da Documentação

Cada arquivo nesta pasta é **100% autossuficiente**, contendo:
- Metadados completos em YAML Frontmatter
- Comando de instalação via Shadcn CLI
- Código-fonte TypeScript/React completo (\`components/ui/*.tsx\`)
- Guia de importação e uso básico
- Todos os exemplos interativos com código completo pronto para copiar e colar

## Catálogo de Componentes (${neoComponentsList.length})

| Componente | Descrição | Dependências Chave | Link |
| :--- | :--- | :--- | :--- |
${neoComponentsList
  .sort((a, b) => a.title.localeCompare(b.title))
  .map(
    c =>
      `| **${c.title}** | ${c.description || '—'} | \`${c.dependencies.slice(0, 3).join(', ')}\` | [\`${c.slug}.md\`](components/${c.slug}.md) |`
  )
  .join('\n')}
`;

fs.writeFileSync(path.join(NEO_OUT, 'README.md'), neoReadme, 'utf8');

// ============================================================================
// 2. PROCESS BOLDKIT.DEV COMPONENTS
// ============================================================================
console.log('\n📦 Processando componentes de BoldKit.dev...');

const boldDocsDir = path.join(BOLD_CACHE, 'src', 'pages', 'docs');
const boldDocFiles = fs.readdirSync(boldDocsDir).filter(f => f.endsWith('Doc.tsx'));

const boldComponentsList = [];

for (const docFile of boldDocFiles) {
  const docPath = path.join(boldDocsDir, docFile);
  const content = fs.readFileSync(docPath, 'utf8');

  const nameMatch = content.match(/name="([^"]+)"/);
  const descMatch = content.match(/description="([^"]+)"/);
  const title = nameMatch ? nameMatch[1] : docFile.replace(/Doc\.tsx$/, '');
  const description = descMatch ? descMatch[1] : '';
  const slug = toSlug(title);

  // Extract dependencies
  const deps = new Set(['tailwind-merge', 'clsx', 'class-variance-authority']);
  const depsMatch = content.match(/dependencies=\{\[([^\]]+)\]\}/);
  if (depsMatch) {
    depsMatch[1]
      .split(',')
      .map(s => s.replace(/['"\s]/g, ''))
      .filter(Boolean)
      .forEach(d => deps.add(d));
  }

  // Extract usage code
  let usageCode = '';
  const usageMatch = content.match(/const usageCode = `([\s\S]*?)`/);
  if (usageMatch) {
    usageCode = usageMatch[1].trim();
  }

  // Extract component source code
  let componentSourceCode = '';
  const compCandidates = [
    path.join(BOLD_CACHE, 'registry', 'default', 'ui', `${slug}.tsx`),
    path.join(BOLD_CACHE, 'src', 'components', 'ui', `${slug}.tsx`),
  ];
  for (const cand of compCandidates) {
    if (fs.existsSync(cand)) {
      componentSourceCode = fs.readFileSync(cand, 'utf8').trim();
      break;
    }
  }

  // Fallback: check if source is imported via `import sourceCode from '...'`
  if (!componentSourceCode) {
    const rawImportMatch = content.match(/import sourceCode from ['"]@\/components\/ui\/([^'"]+)\?raw['"]/);
    if (rawImportMatch) {
      const p = path.join(BOLD_CACHE, 'src', 'components', 'ui', rawImportMatch[1]);
      if (fs.existsSync(p)) {
        componentSourceCode = fs.readFileSync(p, 'utf8').trim();
      }
    }
  }

  // Extract ExampleSections
  const examples = [];
  const parts = content.split('<ExampleSection');
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    const tMatch = part.match(/title="([^"]+)"/);
    const dMatch = part.match(/description="([^"]+)"/);
    const cMatch = part.match(/code=\{`([\s\S]*?)`\}/);

    if (tMatch || cMatch) {
      examples.push({
        title: tMatch ? tMatch[1] : `Example ${i}`,
        description: dMatch ? dMatch[1] : '',
        code: cMatch ? cMatch[1].trim() : '',
      });
    }
  }

  // If no ExampleSections were found, check for inline code blocks or previews
  if (examples.length === 0) {
    const codeBlockMatches = content.matchAll(/<CodeBlock[\s\S]*?code=\{`([\s\S]*?)`\}[\s\S]*?\/>/g);
    let cbIndex = 1;
    for (const cbm of codeBlockMatches) {
      examples.push({
        title: `Example ${cbIndex++}`,
        description: '',
        code: cbm[1].trim(),
      });
    }
  }

  const finalMarkdown = `---
title: "${title}"
description: "${description.replace(/"/g, '\\"')}"
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/${slug}"
category: "components"
dependencies:
${Array.from(deps).map(d => `  - "${d}"`).join('\n')}
---

# ${title}

> ${description}

## Installation

\`\`\`bash
npx shadcn@latest add "https://boldkit.dev/r/${slug}.json"
\`\`\`

${
  componentSourceCode
    ? `### Component Source Code (\`components/ui/${slug}.tsx\`)

\`\`\`tsx
${componentSourceCode}
\`\`\`
`
    : ''
}
${
  usageCode
    ? `## Usage

\`\`\`tsx
${usageCode}
\`\`\`
`
    : ''
}
## Examples

${
  examples.length > 0
    ? examples
        .map(
          e => `### ${e.title}

${e.description ? `${e.description}\n` : ''}
\`\`\`tsx
${e.code}
\`\`\`
`
        )
        .join('\n')
    : 'No additional individual examples defined.'
}
`;

  const destFile = path.join(BOLD_COMPS_OUT, `${slug}.md`);
  fs.writeFileSync(destFile, finalMarkdown, 'utf8');

  boldComponentsList.push({
    title,
    slug,
    description,
    dependencies: Array.from(deps),
    examplesCount: examples.length,
  });
}

console.log(`✅ ${boldComponentsList.length} componentes do BoldKit.dev compilados com sucesso!`);

// ============================================================================
// 3. PROCESS BOLDKIT.DEV BLOCKS (Marketing & Application)
// ============================================================================
console.log('\n📦 Processando blocos de seções de BoldKit.dev (Marketing & Application)...');

const boldBlocksDir = path.join(BOLD_CACHE, 'src', 'pages', 'docs', 'blocks');
const boldBlockFiles = fs.readdirSync(boldBlocksDir).filter(f => f.endsWith('Doc.tsx'));

const boldBlocksList = [];

for (const blockFile of boldBlockFiles) {
  const blockPath = path.join(boldBlocksDir, blockFile);
  const content = fs.readFileSync(blockPath, 'utf8');

  const nameMatch = content.match(/name="([^"]+)"/);
  const descMatch = content.match(/description="([^"]+)"/);
  const catMatch = content.match(/category="([^"]+)"/);
  const reactSourceMatch = content.match(/react:\s*["']([^"']+)["']/);

  const title = nameMatch ? nameMatch[1] : blockFile.replace(/Doc\.tsx$/, '');
  const description = descMatch ? descMatch[1] : '';
  const category = (catMatch ? catMatch[1] : 'marketing').toLowerCase();
  const slug = toSlug(title);

  // Read block implementation source code
  let blockSourceCode = '';
  if (reactSourceMatch) {
    const p = path.join(BOLD_CACHE, reactSourceMatch[1]);
    if (fs.existsSync(p)) {
      blockSourceCode = fs.readFileSync(p, 'utf8').trim();
    }
  }

  // Parse variants
  const variants = [];
  const variantBlocks = content.split(/name:\s*['"]([^'"]+)['"]/);
  for (let i = 1; i < variantBlocks.length; i += 2) {
    const vName = variantBlocks[i];
    const vBody = variantBlocks[i + 1] || '';
    const dMatch = vBody.match(/description:\s*['"]([^'"]+)['"]/);
    const rMatch = vBody.match(/reactCode:\s*`([\s\S]*?)`/);

    if (rMatch) {
      variants.push({
        name: vName,
        description: dMatch ? dMatch[1] : '',
        code: rMatch[1].trim(),
      });
    }
  }

  const finalMarkdown = `---
title: "${title}"
description: "${description.replace(/"/g, '\\"')}"
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/blocks/${slug}"
category: "blocks"
subcategory: "${category}"
dependencies:
  - "radix-ui"
  - "lucide-react"
  - "class-variance-authority"
---

# ${title}

> ${description}

## Category: ${category.toUpperCase()}

${
  blockSourceCode
    ? `## Full Block Implementation (\`${reactSourceMatch ? reactSourceMatch[1] : `components/blocks/${category}/${slug}.tsx`}\`)

\`\`\`tsx
${blockSourceCode}
\`\`\`
`
    : ''
}
## Variants and Usage Examples

${
  variants.length > 0
    ? variants
        .map(
          v => `### Variant: ${v.name}

${v.description ? `> ${v.description}\n` : ''}
\`\`\`tsx
${v.code}
\`\`\`
`
        )
        .join('\n')
    : 'No additional variants found.'
}
`;

  const targetDir = category === 'application' ? BOLD_APP_BLOCKS_OUT : BOLD_MKT_BLOCKS_OUT;
  const destFile = path.join(targetDir, `${slug}.md`);
  fs.writeFileSync(destFile, finalMarkdown, 'utf8');

  boldBlocksList.push({
    title,
    slug,
    category,
    description,
    variantsCount: variants.length,
    fileRel: `blocks/${category}/${slug}.md`,
  });
}

console.log(`✅ ${boldBlocksList.length} blocos do BoldKit.dev compilados com sucesso!`);

// ============================================================================
// 4. PROCESS BOLDKIT EXTRAS (Canvas Effects, Charts, Shapes)
// ============================================================================
console.log('\n📦 Processando extras de BoldKit.dev (Canvas Effects, Charts, Shapes)...');

// 4.1 Canvas Effects
const canvasDir = path.join(BOLD_CACHE, 'src', 'components', 'CanvasEffects', 'react');
const canvasFiles = fs.readdirSync(canvasDir).filter(f => f.endsWith('.tsx') && !f.includes('test'));

const effectsDocs = [];
for (const cFile of canvasFiles) {
  const effectName = cFile.replace(/\.tsx$/, '');
  const effectCode = fs.readFileSync(path.join(canvasDir, cFile), 'utf8').trim();
  effectsDocs.push({
    name: effectName,
    code: effectCode,
  });
}

const canvasEffectsMarkdown = `---
title: "Canvas Effects"
description: "Coleção de 23 efeitos gráficos interativos baseados em HTML5 Canvas e WebGL/React com suporte a prefers-reduced-motion e temas neobrutalistas."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/canvas-effects"
category: "extras"
totalEffects: ${effectsDocs.length}
dependencies:
  - "motion"
  - "clsx"
  - "tailwind-merge"
---

# BoldKit Canvas Effects (${effectsDocs.length} Efeitos Interativos)

> Efeitos de animação gráfica em HTML5 Canvas de alta performance e baixo overhead com estética neobrutalista, grid de pontos, ruído analógico, CRT retro e física fluida.

## Visão Geral e Uso

\`\`\`tsx
import { ${effectsDocs.map(e => e.name).slice(0, 5).join(', ')} } from '@/components/CanvasEffects/react'

export function HeroBanner() {
  return (
    <div className="relative h-96 w-full border-3 border-black overflow-hidden bg-white shadow-[4px_4px_0_0_#000]">
      <Aurora className="absolute inset-0 opacity-80" />
      <div className="relative z-10 p-8">
        <h1 className="text-4xl font-black">Neobrutalism in Motion</h1>
      </div>
    </div>
  )
}
\`\`\`

---

${effectsDocs
  .map(
    e => `## Effect: \`${e.name}\`

\`\`\`tsx
${e.code}
\`\`\`
`
  )
  .join('\n---\n\n')}
`;

fs.writeFileSync(path.join(BOLD_EXTRAS_OUT, 'canvas-effects.md'), canvasEffectsMarkdown, 'utf8');

// 4.2 Charts
const chartUiPath = path.join(BOLD_CACHE, 'registry', 'default', 'ui', 'chart.tsx');
const chartToolbarPath = path.join(BOLD_CACHE, 'registry', 'default', 'ui', 'chart-toolbar.tsx');
const donutChartPath = path.join(BOLD_CACHE, 'registry', 'default', 'ui', 'donut-chart.tsx');

const chartCode = fs.existsSync(chartUiPath) ? fs.readFileSync(chartUiPath, 'utf8').trim() : '';
const chartToolbarCode = fs.existsSync(chartToolbarPath) ? fs.readFileSync(chartToolbarPath, 'utf8').trim() : '';
const donutChartCode = fs.existsSync(donutChartPath) ? fs.readFileSync(donutChartPath, 'utf8').trim() : '';

const chartsMarkdown = `---
title: "Charts Neobrutalism"
description: "Sistema completo de gráficos estatísticos baseado em Recharts com bordas espessas, tooltips com sombra sólida, legendas e barra de ferramentas de exportação."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/charts"
category: "extras"
dependencies:
  - "recharts"
  - "lucide-react"
  - "clsx"
  - "tailwind-merge"
---

# Neobrutalist Charts & Data Visualization

> Biblioteca de gráficos para dados institucionais, relatórios e dashboards com visual brutalista de alto contraste.

## 1. Core Chart Container (\`components/ui/chart.tsx\`)

\`\`\`tsx
${chartCode}
\`\`\`

---

## 2. Chart Toolbar & Export (\`components/ui/chart-toolbar.tsx\`)

Permite alternar tipo de gráfico, zoom e download de imagem PNG/SVG dos gráficos renderizados.

\`\`\`tsx
${chartToolbarCode}
\`\`\`

---

## 3. Donut & Radial Charts (\`components/ui/donut-chart.tsx\`)

\`\`\`tsx
${donutChartCode}
\`\`\`
`;

fs.writeFileSync(path.join(BOLD_EXTRAS_OUT, 'charts.md'), chartsMarkdown, 'utf8');

// 4.3 Shapes
const asciiShapesPath = path.join(BOLD_CACHE, 'registry', 'default', 'ui', 'ascii-shapes.tsx');
const shapesCode = fs.existsSync(asciiShapesPath) ? fs.readFileSync(asciiShapesPath, 'utf8').trim() : '';

const shapesMarkdown = `---
title: "Shapes & ASCII Art"
description: "Mais de 64 formas geométricas neobrutalistas em SVG, estrelas, cruzes, faixas, badges decorativos e ilustrações ASCII estilizadas."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/shapes"
category: "extras"
dependencies:
  - "lucide-react"
  - "clsx"
---

# Decorative Shapes & ASCII Matrix

> Coleção completa de ícones, formas vetoriais, estrelas retro (Retro Stars) e selos neobrutalistas para composição de cartazes, hero sections e cartões.

## Componente Vetorial (\`components/ui/ascii-shapes.tsx\`)

\`\`\`tsx
${shapesCode}
\`\`\`
`;

fs.writeFileSync(path.join(BOLD_EXTRAS_OUT, 'shapes.md'), shapesMarkdown, 'utf8');

console.log('✅ Extras do BoldKit.dev compilados com sucesso!');

// Write BoldKit README.md
const boldReadme = `# BoldKit.dev — Documentação e Catálogo de Componentes & Blocos

Documentação integral de mais de **${boldComponentsList.length} componentes**, **${boldBlocksList.length} blocos de layout** e extras gráficos do ecossistema [BoldKit.dev](https://boldkit.dev), construído para React 19, Tailwind CSS v4 e Radix UI com estilo brutalista.

## Sumário do Conteúdo

1. [Componentes UI (\`${boldComponentsList.length} itens\`)](#componentes-ui)
2. [Blocos de Seções (\`${boldBlocksList.length} blocos\`)](#blocos-de-seções)
3. [Extras Gráficos](#extras-gráficos)
   - [\`extras/canvas-effects.md\`](extras/canvas-effects.md) — 23 efeitos animados de Canvas
   - [\`extras/charts.md\`](extras/charts.md) — Sistema de gráficos Recharts
   - [\`extras/shapes.md\`](extras/shapes.md) — 64 formas SVG e selos retro

---

## Componentes UI (${boldComponentsList.length})

| Componente | Descrição | Exemplos | Link |
| :--- | :--- | :---: | :--- |
${boldComponentsList
  .sort((a, b) => a.title.localeCompare(b.title))
  .map(
    c =>
      `| **${c.title}** | ${c.description ? c.description.slice(0, 90) + '...' : '—'} | ${c.examplesCount} | [\`${c.slug}.md\`](components/${c.slug}.md) |`
  )
  .join('\n')}

---

## Blocos de Seções (${boldBlocksList.length})

### Marketing Sections (${boldBlocksList.filter(b => b.category === 'marketing').length})
${boldBlocksList
  .filter(b => b.category === 'marketing')
  .sort((a, b) => a.title.localeCompare(b.title))
  .map(b => `- [**${b.title}**](${b.fileRel}) — ${b.description} (${b.variantsCount} variantes)`)
  .join('\n')}

### Application Sections (${boldBlocksList.filter(b => b.category === 'application').length})
${boldBlocksList
  .filter(b => b.category === 'application')
  .sort((a, b) => a.title.localeCompare(b.title))
  .map(b => `- [**${b.title}**](${b.fileRel}) — ${b.description} (${b.variantsCount} variantes)`)
  .join('\n')}
`;

fs.writeFileSync(path.join(BOLD_OUT, 'README.md'), boldReadme, 'utf8');

// ============================================================================
// 5. MASTER CATALOG README.md
// ============================================================================
console.log('\n📦 Gerando Catálogo Geral Mestre (_referencias/design-system/README.md)...');

const allCompSlugs = Array.from(
  new Set([...neoComponentsList.map(c => c.slug), ...boldComponentsList.map(c => c.slug)])
).sort();

const masterReadme = `# Catálogo Mestre de Referências Neobrutalistas: Neobrutalism.com & BoldKit.dev

Bem-vindo ao repositório unificado de documentação integral em Markdown dos dois maiores ecossistemas de design **Neobrutalism UI** da atualidade.

Esta documentação foi compilada de forma **100% autossuficiente**: cada arquivo contém o código-fonte TypeScript completo, comandos do Shadcn CLI, dependências necessárias e todos os exemplos práticos embutidos inline diretamente no markdown.

---

## Estatísticas Gerais da Coleta

| Métrica | Neobrutalism.com | BoldKit.dev | Total Consolidado |
| :--- | :---: | :---: | :---: |
| **Componentes UI** | **${neoComponentsList.length}** | **${boldComponentsList.length}** | **${neoComponentsList.length + boldComponentsList.length}** |
| **Blocos de Layout** | — | **${boldBlocksList.length}** | **${boldBlocksList.length}** |
| **Efeitos Canvas Interativos** | — | **${effectsDocs.length}** | **${effectsDocs.length}** |
| **Gráficos Brutalistas (Charts)** | Integrado | **14 variações** | **Completo** |
| **Formas SVG & ASCII** | Integrado | **64 shapes** | **64+** |
| **Arquivos Markdown Gerados** | **${neoComponentsList.length + 1}** | **${boldComponentsList.length + boldBlocksList.length + 4}** | **${neoComponentsList.length + boldComponentsList.length + boldBlocksList.length + 5} arquivos** |

---

## Estrutura de Diretórios

\`\`\`
_referencias/design-system/
├── README.md                               # Este catálogo mestre
├── neobrutalism/
│   ├── README.md                           # Índice e guia do Neobrutalism.com
│   └── components/                         # ${neoComponentsList.length} arquivos .md autossuficientes
│       ├── accordion.md
│       ├── button.md
│       ├── dialog.md
│       └── ...
└── boldkit/
    ├── README.md                           # Índice e guia do BoldKit.dev
    ├── components/                         # ${boldComponentsList.length} arquivos .md autossuficientes
    │   ├── accordion.md
    │   ├── button.md
    │   └── ...
    ├── blocks/
    │   ├── marketing/                      # 13 blocos de página (Hero, Bento, CTA, etc.)
    │   └── application/                    # 7 blocos de app (Auth, Dashboard, Settings, etc.)
    └── extras/
        ├── canvas-effects.md               # 23 efeitos em HTML5 Canvas
        ├── charts.md                       # Gráficos Recharts neobrutalistas
        └── shapes.md                       # 64 Formas decorativas SVG
\`\`\`

---

## Matriz Comparativa de Componentes UI

A tabela abaixo cruza todos os componentes disponíveis em ambas as bibliotecas com links diretos para cada documentação:

| Componente | Neobrutalism.com | BoldKit.dev |
| :--- | :---: | :---: |
${allCompSlugs
  .map(slug => {
    const neoItem = neoComponentsList.find(c => c.slug === slug);
    const boldItem = boldComponentsList.find(c => c.slug === slug);
    const neoLink = neoItem ? `[✅ ${neoItem.title}](neobrutalism/components/${slug}.md)` : '—';
    const boldLink = boldItem ? `[✅ ${boldItem.title}](boldkit/components/${slug}.md)` : '—';
    return `| **\`${slug}\`** | ${neoLink} | ${boldLink} |`;
  })
  .join('\n')}

---

## Blocos de Layout Prontos (BoldKit)

### Marketing Sections
${boldBlocksList
  .filter(b => b.category === 'marketing')
  .sort((a, b) => a.title.localeCompare(b.title))
  .map(b => `- [**${b.title}**](boldkit/${b.fileRel}) — ${b.description}`)
  .join('\n')}

### Application Sections
${boldBlocksList
  .filter(b => b.category === 'application')
  .sort((a, b) => a.title.localeCompare(b.title))
  .map(b => `- [**${b.title}**](boldkit/${b.fileRel}) — ${b.description}`)
  .join('\n')}

---

## Recursos Extras de Alta Fidelidade

- **[Canvas Effects Animados](boldkit/extras/canvas-effects.md)**: Aurora, MatrixRain, Plasma, CRT, Dither, DotWave, GravityWells e outros 16 efeitos com baixo consumo e suporte a reduced motion.
- **[Gráficos e Estatísticas (Charts)](boldkit/extras/charts.md)**: Toolbars, gráficos de rosca (donut), linhas, barras e áreas com paleta neobrutalista de alto contraste.
- **[Formas SVG e Selos Retrô](boldkit/extras/shapes.md)**: Mais de 64 elementos decorativos, estrelas de 4 a 12 pontas, selos e ASCII art.
`;

fs.writeFileSync(path.join(OUT_DIR, 'README.md'), masterReadme, 'utf8');

console.log(`\n🎉 Processo finalizado com sucesso!`);
console.log(`Total de arquivos Markdown gerados em _referencias/design-system/:`);
console.log(`  - Neobrutalism: ${neoComponentsList.length} componentes + 1 README`);
console.log(`  - BoldKit: ${boldComponentsList.length} componentes + ${boldBlocksList.length} blocos + 3 extras + 1 README`);
console.log(`  - Catálogo Geral: 1 README mestre`);
console.log(`  => TOTAL: ${neoComponentsList.length + boldComponentsList.length + boldBlocksList.length + 6} arquivos Markdown!`);
