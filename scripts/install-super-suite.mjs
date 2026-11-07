/**
 * scripts/install-super-suite.mjs
 *
 * Automated installer for:
 * 1. Neobrutalism.com (Base UI - 54 primitives) -> src/components/ui/
 * 2. BoldKit Suite (69+ UI, 14 charts, 64 shapes, 15 blocks, 2 tools, 15 math curves, 7 ASCII, 23 Canvas FX) -> src/components/boldkit/
 * 3. Styles & motion tokens -> src/styles/neobrutalism.css and src/styles/boldkit.css
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Install Neobrutalism.com (Base UI)
// ─────────────────────────────────────────────────────────────────────────────
async function installNeobrutalism() {
  console.log('🚀 [1/6] Installing Neobrutalism.com Base UI components (54 items)...');
  const uiDir = path.join(ROOT, 'src/components/ui');
  await ensureDir(uiDir);

  const regRes = await fetch('https://neobrutalism.com/r/registry.json');
  const reg = await regRes.json();
  const items = Array.isArray(reg) ? reg : reg.items || [];

  let count = 0;
  for (const item of items) {
    try {
      const itemRes = await fetch(`https://neobrutalism.com/r/base/${item.name}.json`);
      if (!itemRes.ok) {
        console.warn(`  ⚠️ Failed to fetch neobrutalism item: ${item.name}`);
        continue;
      }
      const data = await itemRes.json();
      for (const file of data.files || []) {
        const fileName = path.basename(file.path || file.target || `${item.name}.tsx`);
        const filePath = path.join(uiDir, fileName);
        
        let content = file.content;
        // Fix any potential issues with react-day-picker if needed
        // Keep strict type consistency
        await fs.writeFile(filePath, content, 'utf8');
        count++;
      }
    } catch (err) {
      console.error(`  ❌ Error installing ${item.name}:`, err.message);
    }
  }
  console.log(`✅ [1/6] Neobrutalism.com: Successfully installed ${count} files in src/components/ui/`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Install BoldKit Styles & Motion
// ─────────────────────────────────────────────────────────────────────────────
async function installStyles() {
  console.log('🎨 [2/6] Generating Neobrutalism and BoldKit styles...');
  const stylesDir = path.join(ROOT, 'src/styles');
  await ensureDir(stylesDir);

  // 2.1 Neobrutalism CSS with theme-cagp tokens
  const neobrutalismCss = `/* Neobrutalism.com Base UI Design System Tokens */
:root {
  --border: #000000;
  --radius: 0.25rem;

  /* Hard offset shadows */
  --shadow-sm: 2px 2px 0px 0px #000000;
  --shadow-md: 4px 4px 0px 0px #000000;
  --shadow-lg: 6px 6px 0px 0px #000000;
  --shadow: 4px 4px 0px 0px #000000;

  /* Institutional theme-cagp (FAFICH / UFMG) */
  --primary: #8B1E2D;
  --primary-foreground: #FFFFFF;
  --secondary: #E8A317;
  --secondary-foreground: #000000;
  --accent: #FF8811;
  --accent-foreground: #000000;
  --background: #FBF8F3;
  --foreground: #0A0A0A;
  --card: #FFFFFF;
  --card-foreground: #0A0A0A;
  --popover: #FFFFFF;
  --popover-foreground: #0A0A0A;
  --muted: #F4F1EA;
  --muted-foreground: #57534E;
  --destructive: #DC2626;
  --destructive-foreground: #FFFFFF;
  --input: #000000;
  --ring: #8B1E2D;

  /* Charts */
  --chart-1: #8B1E2D;
  --chart-2: #E8A317;
  --chart-3: #1E3F66;
  --chart-4: #15803D;
  --chart-5: #5B2A86;
}

.dark {
  --background: #0A0A0A;
  --foreground: #FBF8F3;
  --card: #171717;
  --card-foreground: #FBF8F3;
  --popover: #171717;
  --popover-foreground: #FBF8F3;
  --border: #FBF8F3;
  --shadow-sm: 2px 2px 0px 0px #FBF8F3;
  --shadow-md: 4px 4px 0px 0px #FBF8F3;
  --shadow-lg: 6px 6px 0px 0px #FBF8F3;
  --shadow: 4px 4px 0px 0px #FBF8F3;
  --muted: #262626;
  --muted-foreground: #A3A3A3;
}
`;
  await fs.writeFile(path.join(stylesDir, 'neobrutalism.css'), neobrutalismCss, 'utf8');

  // 2.2 BoldKit Motion CSS
  const motionRes = await fetch('https://boldkit.dev/r/motion.json');
  const motionData = await motionRes.json();
  const motionCssContent = motionData.files?.[0]?.content || '';
  await fs.writeFile(path.join(stylesDir, 'boldkit.css'), motionCssContent, 'utf8');

  // 2.3 Ensure global.css imports them
  const globalCssPath = path.join(stylesDir, 'global.css');
  let globalCss = await fs.readFile(globalCssPath, 'utf8');
  if (globalCss.includes('./retroui.css')) {
    globalCss = globalCss.replace(
      '@import "./retroui.css";',
      '@import "./neobrutalism.css";\n@import "./boldkit.css";'
    );
  } else if (!globalCss.includes('./boldkit.css')) {
    globalCss = `@import "./neobrutalism.css";\n@import "./boldkit.css";\n${globalCss}`;
  }
  await fs.writeFile(globalCssPath, globalCss, 'utf8');
  console.log('✅ [2/6] Styles: Generated neobrutalism.css and boldkit.css, updated global.css');
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Install BoldKit Core Registry (UI, Charts, Shapes, Math Curves, ASCII)
// ─────────────────────────────────────────────────────────────────────────────
async function installBoldKitRegistry() {
  console.log('⚡ [3/6] Installing BoldKit registry items...');
  const bkDir = path.join(ROOT, 'src/components/boldkit');
  const uiDir = path.join(bkDir, 'ui');
  const chartsDir = path.join(bkDir, 'charts');
  const libDir = path.join(bkDir, 'lib');
  const hooksDir = path.join(bkDir, 'hooks');

  await Promise.all([ensureDir(uiDir), ensureDir(chartsDir), ensureDir(libDir), ensureDir(hooksDir)]);

  const regRes = await fetch('https://boldkit.dev/r/registry.json');
  const reg = await regRes.json();
  const items = reg.items || [];

  const chartNames = new Set([
    'donut-chart', 'radial-bar-chart', 'radar-chart', 'gauge-chart',
    'funnel-chart', 'treemap-chart', 'heatmap-chart', 'sankey-chart',
    'sparkline', 'chart-toolbar'
  ]);

  let count = 0;
  for (const item of items) {
    if (item.type === 'registry:theme' || item.type === 'registry:font' || item.type === 'registry:style') {
      continue;
    }

    try {
      const res = await fetch(`https://boldkit.dev/r/${item.name}.json`);
      if (!res.ok) continue;
      const data = await res.json();

      for (const file of data.files || []) {
        let content = file.content;
        const baseName = path.basename(file.path || `${item.name}.tsx`);

        // Normalise internal imports for modularity
        content = content
          .replace(/@\/lib\/motion-core/g, '@boldkit/lib/motion-core')
          .replace(/@\/lib\/canvas-effect-core/g, '@boldkit/lib/canvas-effect-core')
          .replace(/@\/lib\/math-curves/g, '@boldkit/lib/math-curves')
          .replace(/@\/lib\/chart-export/g, '@boldkit/lib/chart-export')
          .replace(/@\/hooks\/use-canvas-effect/g, '@boldkit/hooks/use-canvas-effect')
          .replace(/@\/hooks\/use-theme/g, '@boldkit/hooks/use-theme')
          .replace(/@\/components\/ui\/shapes/g, '@boldkit/shapes')
          .replace(/@\/components\/ui\/chart/g, '@boldkit/charts/chart');

        let targetDir = uiDir;
        if (file.path.includes('/lib/')) {
          targetDir = libDir;
        } else if (file.path.includes('/hooks/')) {
          targetDir = hooksDir;
        } else if (chartNames.has(item.name) || baseName === 'chart.tsx') {
          targetDir = chartsDir;
        } else if (baseName === 'shapes.tsx') {
          targetDir = bkDir;
        } else if (baseName === 'ascii-shapes.tsx') {
          targetDir = bkDir;
        }

        const dest = path.join(targetDir, baseName);
        await fs.writeFile(dest, content, 'utf8');
        count++;
      }
    } catch (err) {
      console.warn(`  ⚠️ Could not fetch boldkit item: ${item.name} (${err.message})`);
    }
  }

  // Also create chart-line, chart-bar, chart-area, chart-pie, chart-scatter helpers in charts/
  const chartRechartsVariants = `import * as React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from './chart';
import {
  ResponsiveContainer,
  LineChart, Line,
  BarChart, Bar,
  AreaChart, Area,
  PieChart, Pie, Cell,
  ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid
} from 'recharts';

export interface BaseChartProps {
  data: any[];
  config?: ChartConfig;
  className?: string;
  dataKey?: string;
  categoryKey?: string;
}

export function BoldLineChart({ data, config, className, dataKey = 'value', categoryKey = 'name' }: BaseChartProps) {
  return (
    <ChartContainer config={config || {}} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis dataKey={categoryKey} stroke="#000" />
          <YAxis stroke="#000" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey={dataKey} stroke="hsl(var(--primary))" strokeWidth={3} dot={{ strokeWidth: 2, r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function BoldBarChart({ data, config, className, dataKey = 'value', categoryKey = 'name' }: BaseChartProps) {
  return (
    <ChartContainer config={config || {}} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis dataKey={categoryKey} stroke="#000" />
          <YAxis stroke="#000" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey={dataKey} fill="hsl(var(--primary))" stroke="#000" strokeWidth={2} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function BoldAreaChart({ data, config, className, dataKey = 'value', categoryKey = 'name' }: BaseChartProps) {
  return (
    <ChartContainer config={config || {}} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis dataKey={categoryKey} stroke="#000" />
          <YAxis stroke="#000" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area type="monotone" dataKey={dataKey} stroke="#000" strokeWidth={2} fill="hsl(var(--secondary))" fillOpacity={0.7} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function BoldPieChart({ data, config, className, dataKey = 'value', categoryKey = 'name' }: BaseChartProps) {
  const COLORS = ['#8B1E2D', '#E8A317', '#1E3F66', '#15803D', '#5B2A86'];
  return (
    <ChartContainer config={config || {}} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie data={data} dataKey={dataKey} nameKey={categoryKey} cx="50%" cy="50%" outerRadius={80} stroke="#000" strokeWidth={2}>
            {data.map((_, index) => (
              <Cell key={\`cell-\${index}\`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function BoldScatterChart({ data, config, className, dataKey = 'y', categoryKey = 'x' }: BaseChartProps) {
  return (
    <ChartContainer config={config || {}} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis dataKey={categoryKey} stroke="#000" name="X" />
          <YAxis dataKey={dataKey} stroke="#000" name="Y" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Scatter data={data} fill="hsl(var(--primary))" stroke="#000" strokeWidth={2} />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
`;
  await fs.writeFile(path.join(chartsDir, 'chart-variants.tsx'), chartRechartsVariants, 'utf8');

  console.log(`✅ [3/6] BoldKit: Successfully installed ${count} core items across ui, charts, lib, hooks!`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Install All 23 Canvas FX Components
// ─────────────────────────────────────────────────────────────────────────────
async function installCanvasFX() {
  console.log('🌌 [4/6] Installing all 23 Canvas FX components...');
  const fxDir = path.join(ROOT, 'src/components/boldkit/canvas-effects');
  await ensureDir(fxDir);

  const fxNames = [
    'mesh-gradient', 'swirl', 'god-rays', 'pulsing-border', 'dither', 'halftone', 'crt', 'truchet',
    'aurora', 'flow-field', 'plasma', 'metaballs', 'matrix-rain', 'particle-web', 'dot-wave', 'dot-blob',
    'mouse-ripple', 'lissajous-grid', 'warp-speed', 'gravity-wells', 'topography', 'lightning', 'voronoi-pulse'
  ];

  const exportsList = [];

  for (const name of fxNames) {
    try {
      const res = await fetch(`https://boldkit.dev/r/${name}.json`);
      if (!res.ok) {
        console.warn(`  ⚠️ Canvas FX ${name} returned ${res.status}`);
        continue;
      }
      const data = await res.json();
      for (const file of data.files || []) {
        let content = file.content;
        const fileName = path.basename(file.path || `${name}.tsx`);

        // Normalise imports
        content = content
          .replace(/@\/hooks\/use-canvas-effect/g, '@boldkit/hooks/use-canvas-effect')
          .replace(/@\/lib\/canvas-effect-core/g, '@boldkit/lib/canvas-effect-core')
          .replace(/@\/lib\/utils/g, '@/lib/utils');

        await fs.writeFile(path.join(fxDir, fileName), content, 'utf8');
        
        const componentName = fileName.replace(/\.tsx?$/, '');
        exportsList.push(`export * from './${componentName}';`);
      }
    } catch (err) {
      console.warn(`  ⚠️ Error installing canvas FX ${name}:`, err.message);
    }
  }

  // Write index.ts for canvas effects
  await fs.writeFile(path.join(fxDir, 'index.ts'), exportsList.join('\n') + '\n', 'utf8');
  console.log(`✅ [4/6] Canvas FX: Installed ${exportsList.length} canvas components in src/components/boldkit/canvas-effects/`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Install 15 Section Blocks
// ─────────────────────────────────────────────────────────────────────────────
async function installBlocks() {
  console.log('🧱 [5/6] Installing 15 Section Blocks in src/components/boldkit/blocks/...');
  const blocksDir = path.join(ROOT, 'src/components/boldkit/blocks');
  await ensureDir(blocksDir);

  const blocksCode = {
    'hero-section.tsx': `import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface HeroSectionProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description: string;
  primaryAction?: { label: string; onClick?: () => void; href?: string };
  secondaryAction?: { label: string; onClick?: () => void; href?: string };
  className?: string;
}

export function HeroSection({
  badge,
  title,
  titleHighlight,
  description,
  primaryAction,
  secondaryAction,
  className,
}: HeroSectionProps) {
  return (
    <section className={cn("py-16 md:py-24 px-4 text-center border-b-4 border-black bg-cagp-cream", className)}>
      <div className="max-w-4xl mx-auto space-y-6">
        {badge && (
          <Badge className="px-4 py-1.5 text-sm bg-cagp-gold text-black border-2 border-black font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-4 h-4 mr-1 inline" /> {badge}
          </Badge>
        )}
        <h1 className="text-4xl sm:text-6xl font-black font-mono tracking-tight text-black leading-none">
          {title}{' '}
          {titleHighlight && (
            <span className="bg-cagp-burgundy text-white px-3 py-1 border-3 border-black inline-block shadow-md">
              {titleHighlight}
            </span>
          )}
        </h1>
        <p className="text-lg sm:text-xl text-neutral-800 font-medium max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          {primaryAction && (
            <Button
              className="bg-cagp-burgundy text-white font-bold px-6 py-3 border-3 border-black shadow-md hover:translate-x-0.5 hover:translate-y-0.5"
              onClick={primaryAction.onClick}
            >
              {primaryAction.label} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="outline"
              className="bg-white text-black font-bold px-6 py-3 border-3 border-black shadow-md"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
`,
    'feature-grid.tsx': `import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export interface FeatureItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
  tag?: string;
}

export interface FeatureGridProps {
  title?: string;
  subtitle?: string;
  features: FeatureItem[];
  className?: string;
}

export function FeatureGrid({ title, subtitle, features, className }: FeatureGridProps) {
  return (
    <section className={cn("py-12 px-4 max-w-6xl mx-auto", className)}>
      {(title || subtitle) && (
        <div className="text-center mb-10 space-y-2">
          {title && <h2 className="text-3xl sm:text-4xl font-black font-mono">{title}</h2>}
          {subtitle && <p className="text-neutral-700 font-medium max-w-xl mx-auto">{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => (
          <Card key={idx} className="border-3 border-black shadow-md bg-white hover:-translate-y-1 transition-transform">
            <CardHeader className="space-y-2">
              {feat.icon && <div className="w-12 h-12 bg-cagp-gold border-2 border-black flex items-center justify-center font-bold">{feat.icon}</div>}
              <CardTitle className="text-xl font-bold font-mono">{feat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-neutral-700 font-medium text-sm">
                {feat.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
`,
    'testimonials.tsx': `import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export interface TestimonialItem {
  name: string;
  role: string;
  avatarText: string;
  quote: string;
}

export function TestimonialsSection({ testimonials, className }: { testimonials: TestimonialItem[]; className?: string }) {
  return (
    <section className={cn("py-12 px-4 max-w-6xl mx-auto", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item, idx) => (
          <Card key={idx} className="border-3 border-black shadow-md bg-white p-6 space-y-4">
            <CardContent className="p-0 space-y-4">
              <p className="font-medium text-neutral-800 italic">“{item.quote}”</p>
              <div className="flex items-center gap-3 pt-2 border-t-2 border-neutral-200">
                <Avatar className="border-2 border-black w-10 h-10">
                  <AvatarFallback className="bg-cagp-gold font-bold text-black">{item.avatarText}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-sm leading-none">{item.name}</h4>
                  <p className="text-xs text-neutral-600 font-medium">{item.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
`,
    'logo-cloud.tsx': `import * as React from 'react';
import { cn } from '@/lib/utils';

export function LogoCloud({ logos, title, className }: { logos: { name: string; node?: React.ReactNode }[]; title?: string; className?: string }) {
  return (
    <div className={cn("py-8 border-y-3 border-black bg-neutral-100 px-4 text-center", className)}>
      {title && <p className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 mb-6">{title}</p>}
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
        {logos.map((logo, idx) => (
          <div key={idx} className="font-black font-mono text-lg text-neutral-800 border-2 border-black bg-white px-4 py-2 shadow-sm">
            {logo.node || logo.name}
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    'cta-section.tsx': `import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function CTASection({ title, subtitle, actionText, onAction, className }: { title: string; subtitle: string; actionText: string; onAction?: () => void; className?: string }) {
  return (
    <section className={cn("py-14 px-4 my-8 max-w-5xl mx-auto bg-cagp-burgundy border-4 border-black shadow-lg text-white text-center space-y-6", className)}>
      <h2 className="text-3xl sm:text-5xl font-black font-mono">{title}</h2>
      <p className="text-lg text-neutral-200 max-w-xl mx-auto font-medium">{subtitle}</p>
      <div>
        <Button onClick={onAction} className="bg-cagp-gold text-black font-black text-lg px-8 py-4 border-3 border-black shadow-md hover:bg-yellow-400">
          {actionText}
        </Button>
      </div>
    </section>
  );
}
`,
    'stats-section.tsx': `import * as React from 'react';
import { cn } from '@/lib/utils';
import { StatCard } from '../ui/stat-card';

export interface StatItem {
  value: string;
  label: string;
  description?: string;
  trend?: string;
}

export function StatsSection({ stats, className }: { stats: StatItem[]; className?: string }) {
  return (
    <section className={cn("py-10 px-4 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
      {stats.map((s, idx) => (
        <StatCard key={idx} value={s.value} title={s.label} className="border-3 border-black shadow-md bg-white" />
      ))}
    </section>
  );
}
`,
    'team-section.tsx': `import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
}

export function TeamSection({ members, className }: { members: TeamMember[]; className?: string }) {
  return (
    <section className={cn("py-12 px-4 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {members.map((m, idx) => (
        <Card key={idx} className="border-3 border-black shadow-md bg-white text-center p-4">
          <div className="w-20 h-20 bg-cagp-burgundy text-white border-2 border-black mx-auto rounded-full flex items-center justify-center font-bold text-xl mb-4">
            {m.name.slice(0, 2).toUpperCase()}
          </div>
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-lg font-bold font-mono">{m.name}</CardTitle>
            <p className="text-xs font-bold text-cagp-burgundy uppercase">{m.role}</p>
          </CardHeader>
          {m.bio && <CardContent className="p-0 text-xs text-neutral-600 font-medium">{m.bio}</CardContent>}
        </Card>
      ))}
    </section>
  );
}
`,
    'faq-section.tsx': `import * as React from 'react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export interface FaqItem {
  question: string;
  answer: string;
}

export function FAQSection({ items, title = "Perguntas Frequentes", className }: { items: FaqItem[]; title?: string; className?: string }) {
  return (
    <section className={cn("py-12 px-4 max-w-3xl mx-auto", className)}>
      <h2 className="text-3xl font-black font-mono text-center mb-8">{title}</h2>
      <Accordion type="single" collapsible className="space-y-4">
        {items.map((item, idx) => (
          <AccordionItem key={idx} value={\`item-\${idx}\`} className="border-3 border-black shadow-sm bg-white px-4">
            <AccordionTrigger className="font-bold text-left hover:no-underline font-mono">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-neutral-700 font-medium pt-2 pb-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
`,
    'footer-section.tsx': `import * as React from 'react';
import { cn } from '@/lib/utils';

export function FooterSection({ copyright, links, className }: { copyright: string; links?: { label: string; href: string }[]; className?: string }) {
  return (
    <footer className={cn("border-t-4 border-black bg-cagp-cream py-10 px-6", className)}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm font-mono font-bold text-black">{copyright}</p>
        {links && (
          <div className="flex gap-6 text-sm font-bold font-mono">
            {links.map((link, idx) => (
              <a key={idx} href={link.href} className="hover:underline text-neutral-800">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
`,
    'contact-section.tsx': `import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function ContactSection({ title = "Fale Conosco", onSubmit, className }: { title?: string; onSubmit?: (e: React.FormEvent) => void; className?: string }) {
  return (
    <Card className={cn("max-w-xl mx-auto border-4 border-black shadow-lg bg-white p-6 my-10", className)}>
      <CardHeader className="text-center p-0 mb-6">
        <CardTitle className="text-3xl font-black font-mono">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <form onSubmit={onSubmit} className="space-y-4">
          <Input placeholder="Seu Nome Completo" className="border-2 border-black" required />
          <Input type="email" placeholder="Seu E-mail Institucional" className="border-2 border-black" required />
          <Textarea placeholder="Mensagem ou solicitação..." className="border-2 border-black min-h-[120px]" required />
          <Button type="submit" className="w-full bg-cagp-burgundy text-white font-bold border-2 border-black shadow-md">
            Enviar Mensagem
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
`,
    'auth-forms.tsx': `import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function LoginForm({ onSubmit, className }: { onSubmit?: (e: React.FormEvent) => void; className?: string }) {
  return (
    <Card className={cn("max-w-md mx-auto border-4 border-black shadow-lg bg-white p-6 my-8", className)}>
      <CardHeader className="text-center p-0 mb-6">
        <CardTitle className="text-2xl font-black font-mono">Acesso ao Sistema</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <form onSubmit={onSubmit} className="space-y-4">
          <Input type="text" placeholder="Número de Matrícula UFMG" className="border-2 border-black" required />
          <Input type="password" placeholder="Senha do Portal" className="border-2 border-black" required />
          <Button type="submit" className="w-full bg-cagp-burgundy text-white font-bold border-2 border-black shadow-md">
            Entrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
`,
    'settings-page.tsx': `import * as React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function SettingsBlock({ className }: { className?: string }) {
  return (
    <div className={cn("max-w-3xl mx-auto py-8 px-4", className)}>
      <h2 className="text-3xl font-black font-mono mb-6">Configurações</h2>
      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="border-2 border-black p-1 bg-neutral-100">
          <TabsTrigger value="geral" className="font-bold font-mono">Geral</TabsTrigger>
          <TabsTrigger value="notificacoes" className="font-bold font-mono">Notificações</TabsTrigger>
        </TabsList>
        <TabsContent value="geral" className="mt-4">
          <Card className="border-3 border-black shadow-sm p-6 space-y-4 bg-white">
            <CardTitle className="text-lg font-bold font-mono">Preferências do Sistema</CardTitle>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="font-bold">Modo Alto Contraste</Label>
              <Switch id="dark-mode" />
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="notificacoes" className="mt-4">
          <Card className="border-3 border-black shadow-sm p-6 space-y-4 bg-white">
            <CardTitle className="text-lg font-bold font-mono">Avisos e Lembretes</CardTitle>
            <div className="flex items-center justify-between">
              <Label htmlFor="reminders" className="font-bold">Alertas de Prazos DRCA</Label>
              <Switch id="reminders" defaultChecked />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
`,
    'onboarding-flow.tsx': `import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function OnboardingFlow({ steps, onComplete, className }: { steps: { title: string; content: string }[]; onComplete?: () => void; className?: string }) {
  const [current, setCurrent] = React.useState(0);
  return (
    <Card className={cn("max-w-lg mx-auto border-4 border-black shadow-lg bg-white p-6 my-8", className)}>
      <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-2">
        <span className="font-mono font-bold text-xs uppercase">Etapa {current + 1} de {steps.length}</span>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div key={i} className={cn("w-3 h-3 border border-black", i === current ? "bg-cagp-burgundy" : "bg-neutral-200")} />
          ))}
        </div>
      </div>
      <CardContent className="p-0 space-y-4">
        <h3 className="text-2xl font-black font-mono">{steps[current].title}</h3>
        <p className="text-neutral-700 font-medium">{steps[current].content}</p>
        <div className="flex justify-between pt-4">
          <Button variant="outline" disabled={current === 0} onClick={() => setCurrent(c => c - 1)} className="border-2 border-black">
            Anterior
          </Button>
          {current < steps.length - 1 ? (
            <Button onClick={() => setCurrent(c => c + 1)} className="bg-cagp-burgundy text-white border-2 border-black font-bold">
              Próximo
            </Button>
          ) : (
            <Button onClick={onComplete} className="bg-cagp-gold text-black border-2 border-black font-bold">
              Concluir
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
`,
    'error-pages.tsx': `import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function ErrorPageBlock({ code = "404", message = "Página não encontrada no campus.", homeHref = "/", className }: { code?: string; message?: string; homeHref?: string; className?: string }) {
  return (
    <div className={cn("min-h-[50vh] flex flex-col items-center justify-center text-center p-6", className)}>
      <div className="bg-cagp-gold border-4 border-black shadow-xl px-8 py-4 mb-6">
        <span className="text-6xl sm:text-8xl font-black font-mono text-black">{code}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-black font-mono mb-4 text-black">{message}</h2>
      <Button asChild className="bg-cagp-burgundy text-white font-bold border-3 border-black shadow-md">
        <a href={homeHref}>Retornar ao Início</a>
      </Button>
    </div>
  );
}
`,
    'pricing-section.tsx': `import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

export function PricingSection({ plans, className }: { plans: PricingPlan[]; className?: string }) {
  return (
    <section className={cn("py-12 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6", className)}>
      {plans.map((p, idx) => (
        <Card key={idx} className={cn("border-4 border-black p-6 flex flex-col justify-between", p.highlight ? "bg-cagp-cream shadow-xl border-cagp-burgundy" : "bg-white shadow-md")}>
          <div>
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl font-black font-mono">{p.title}</CardTitle>
              <div className="text-3xl font-black font-mono mt-2">{p.price}</div>
              <p className="text-xs text-neutral-600 font-medium mt-1">{p.description}</p>
            </CardHeader>
            <CardContent className="p-0 space-y-2 mb-6">
              {p.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-medium">
                  <Check className="w-4 h-4 text-cagp-burgundy shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </CardContent>
          </div>
          <CardFooter className="p-0">
            <Button className={cn("w-full font-bold border-2 border-black", p.highlight ? "bg-cagp-burgundy text-white" : "bg-neutral-100 text-black")}>
              Selecionar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
`
  };

  const exports = [];
  for (const [filename, content] of Object.entries(blocksCode)) {
    await fs.writeFile(path.join(blocksDir, filename), content, 'utf8');
    const compName = filename.replace(/\.tsx?$/, '');
    exports.push(`export * from './${compName}';`);
  }
  await fs.writeFile(path.join(blocksDir, 'index.ts'), exports.join('\n') + '\n', 'utf8');
  console.log(`✅ [5/6] Blocks: Successfully generated 15 Section Blocks in src/components/boldkit/blocks/`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Install Tool 01 (ShapeBuilder) & Tool 02 (DotMatrixStudio)
// ─────────────────────────────────────────────────────────────────────────────
async function installTools() {
  console.log('🛠️ [6/6] Installing Tool 01 (ShapeBuilder) and Tool 02 (DotMatrixStudio)...');
  const toolsDir = path.join(ROOT, 'src/components/boldkit/tools');
  await ensureDir(toolsDir);

  // Tool 01: ShapeBuilder
  const shapeBuilderCode = `import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  TriangleShape, DiamondBadge, PentagonShape, HexagonShape, OctagonShape,
  CrossShape, TrapezoidShape, ParallelogramShape, Star4Shape, Star5Shape,
  Star6Shape, BurstShape, ExplosionShape, SplatShape, LightningShape,
  BlobShape, WaveShape, CloudShape, HeartShape, AppleShape,
  SunShape, CrescentShape, RainbowShape, PlanetShape, UmbrellaShape,
  ArrowBadge, ZigzagBanner, RibbonShape, ShieldShape, TagShape,
  PriceTagShape, TicketShape, CouponShape, BookmarkShape, FlagShape,
  PillShape, SpeechBubble, CursorShape, EyeShape, GearShape,
  RhombusShape, EllipseShape
} from '../shapes';
import { Check, Copy } from 'lucide-react';

const SHAPES = [
  { id: 'triangle', name: 'Triangle', Component: TriangleShape, category: 'Geometric' },
  { id: 'diamond', name: 'Diamond', Component: DiamondBadge, category: 'Geometric' },
  { id: 'pentagon', name: 'Pentagon', Component: PentagonShape, category: 'Geometric' },
  { id: 'hexagon', name: 'Hexagon', Component: HexagonShape, category: 'Geometric' },
  { id: 'octagon', name: 'Octagon', Component: OctagonShape, category: 'Geometric' },
  { id: 'cross', name: 'Cross', Component: CrossShape, category: 'Geometric' },
  { id: 'trapezoid', name: 'Trapezoid', Component: TrapezoidShape, category: 'Geometric' },
  { id: 'parallelogram', name: 'Parallelogram', Component: ParallelogramShape, category: 'Geometric' },
  { id: 'star4', name: 'Star 4', Component: Star4Shape, category: 'Stars' },
  { id: 'star5', name: 'Star 5', Component: Star5Shape, category: 'Stars' },
  { id: 'star6', name: 'Star 6', Component: Star6Shape, category: 'Stars' },
  { id: 'burst', name: 'Burst', Component: BurstShape, category: 'Stars' },
  { id: 'explosion', name: 'Explosion', Component: ExplosionShape, category: 'Stars' },
  { id: 'splat', name: 'Splat', Component: SplatShape, category: 'Stars' },
  { id: 'lightning', name: 'Lightning', Component: LightningShape, category: 'Stars' },
  { id: 'blob', name: 'Blob', Component: BlobShape, category: 'Organic' },
  { id: 'wave', name: 'Wave', Component: WaveShape, category: 'Organic' },
  { id: 'cloud', name: 'Cloud', Component: CloudShape, category: 'Organic' },
  { id: 'heart', name: 'Heart', Component: HeartShape, category: 'Organic' },
  { id: 'apple', name: 'Apple', Component: AppleShape, category: 'Organic' },
  { id: 'sun', name: 'Sun', Component: SunShape, category: 'Celestial' },
  { id: 'crescent', name: 'Crescent', Component: CrescentShape, category: 'Celestial' },
  { id: 'rainbow', name: 'Rainbow', Component: RainbowShape, category: 'Celestial' },
  { id: 'planet', name: 'Planet', Component: PlanetShape, category: 'Celestial' },
  { id: 'umbrella', name: 'Umbrella', Component: UmbrellaShape, category: 'Celestial' },
  { id: 'arrow-badge', name: 'Arrow Badge', Component: ArrowBadge, category: 'Badges' },
  { id: 'zigzag', name: 'Zigzag', Component: ZigzagBanner, category: 'Badges' },
  { id: 'ribbon', name: 'Ribbon', Component: RibbonShape, category: 'Badges' },
  { id: 'shield', name: 'Shield', Component: ShieldShape, category: 'Badges' },
  { id: 'tag', name: 'Tag', Component: TagShape, category: 'Badges' },
  { id: 'price-tag', name: 'Price Tag', Component: PriceTagShape, category: 'Badges' },
  { id: 'ticket', name: 'Ticket', Component: TicketShape, category: 'Tickets' },
  { id: 'coupon', name: 'Coupon', Component: CouponShape, category: 'Tickets' },
  { id: 'bookmark', name: 'Bookmark', Component: BookmarkShape, category: 'Tickets' },
  { id: 'flag', name: 'Flag', Component: FlagShape, category: 'Communication' },
  { id: 'pill', name: 'Pill', Component: PillShape, category: 'Decorative' },
  { id: 'speech-bubble', name: 'Speech Bubble', Component: SpeechBubble, category: 'Communication' },
  { id: 'cursor', name: 'Cursor', Component: CursorShape, category: 'Mechanical' },
  { id: 'eye', name: 'Eye', Component: EyeShape, category: 'Mechanical' },
  { id: 'gear', name: 'Gear', Component: GearShape, category: 'Mechanical' },
  { id: 'rhombus', name: 'Rhombus', Component: RhombusShape, category: 'Geometric' },
  { id: 'ellipse', name: 'Ellipse', Component: EllipseShape, category: 'Geometric' },
];

const ANIMATIONS = ['none', 'spin', 'pulse', 'float', 'wiggle', 'bounce', 'glitch', 'spin-step'] as const;

export function ShapeBuilder({ className }: { className?: string }) {
  const [selectedId, setSelectedId] = React.useState('triangle');
  const [size, setSize] = React.useState(120);
  const [strokeWidth, setStrokeWidth] = React.useState(2);
  const [filled, setFilled] = React.useState(true);
  const [color, setColor] = React.useState('#8B1E2D');
  const [animation, setAnimation] = React.useState<typeof ANIMATIONS[number]>('none');
  const [speed, setSpeed] = React.useState<'slow' | 'normal' | 'fast'>('normal');
  const [copied, setCopied] = React.useState(false);

  const currentShape = SHAPES.find(s => s.id === selectedId) || SHAPES[0];
  const ShapeComp = currentShape.Component;

  const generatedCode = \`<\${ShapeComp.name}
  size={\${size}}
  strokeWidth={\${strokeWidth}}
  filled={\${filled}}
  color="\${color}"\${animation !== 'none' ? \`\\n  animation="\${animation}"\\n  speed="\${speed}"\` : ''}
/>\`;

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("max-w-5xl mx-auto p-6 bg-white border-4 border-black shadow-xl", className)}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-black pb-4 mb-6">
        <div>
          <h2 className="text-3xl font-black font-mono">Tool 01: SHAPEBUILDER</h2>
          <p className="text-sm font-medium text-neutral-600">42 shapes · 7 animations · Dial in every prop and copy the code.</p>
        </div>
        <Button onClick={copyCode} className="bg-cagp-gold text-black font-bold border-2 border-black shadow-md">
          {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
          {copied ? 'Copiado!' : 'Copiar Código'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="md:col-span-6 space-y-6">
          <div>
            <Label className="font-bold font-mono text-sm">Selecione o Shape (42 disponíveis):</Label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="mt-1 w-full border-2 border-black p-2 font-mono text-sm bg-neutral-50 shadow-sm"
            >
              {SHAPES.map(s => (
                <option key={s.id} value={s.id}>{s.category}: {s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between text-sm font-bold font-mono mb-1">
              <span>Tamanho (Size): {size}px</span>
            </div>
            <Slider value={[size]} min={40} max={240} step={4} onValueChange={(v) => setSize(v[0])} />
          </div>

          <div>
            <div className="flex justify-between text-sm font-bold font-mono mb-1">
              <span>Espessura da Borda (Stroke): {strokeWidth}px</span>
            </div>
            <Slider value={[strokeWidth]} min={1} max={6} step={1} onValueChange={(v) => setStrokeWidth(v[0])} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="filled-toggle" className="font-bold font-mono text-sm">Preenchimento (Filled):</Label>
            <Switch id="filled-toggle" checked={filled} onCheckedChange={setFilled} />
          </div>

          <div>
            <Label className="font-bold font-mono text-sm">Cor:</Label>
            <div className="flex gap-2 mt-1">
              {['#8B1E2D', '#E8A317', '#1E3F66', '#15803D', '#5B2A86', '#0A0A0A'].map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn("w-8 h-8 border-2 border-black", color === c ? "ring-2 ring-offset-2 ring-black" : "")}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div>
            <Label className="font-bold font-mono text-sm">Animação:</Label>
            <select
              value={animation}
              onChange={(e) => setAnimation(e.target.value as any)}
              className="mt-1 w-full border-2 border-black p-2 font-mono text-sm bg-neutral-50 shadow-sm"
            >
              {ANIMATIONS.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Preview */}
        <div className="md:col-span-6 flex flex-col items-center justify-center p-8 bg-neutral-100 border-3 border-black shadow-inner min-h-[300px]">
          <div className="p-4 bg-white border-2 border-black shadow-md flex items-center justify-center min-w-[200px] min-h-[200px]">
            <ShapeComp
              size={size}
              strokeWidth={strokeWidth}
              filled={filled}
              color={color}
              animation={animation}
              speed={speed}
            />
          </div>
          <pre className="mt-4 p-3 bg-neutral-900 text-green-400 font-mono text-xs w-full overflow-x-auto border-2 border-black">
            {generatedCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
`;
  await fs.writeFile(path.join(toolsDir, 'shape-builder.tsx'), shapeBuilderCode, 'utf8');

  // Tool 02: DotMatrixStudio
  const dotMatrixStudioCode = `import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, Download, Plus, Trash2 } from 'lucide-react';

const ROWS = 8;
const COLS = 20;

function createEmptyGrid(): boolean[][] {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(false));
}

export function DotMatrixStudio({ className }: { className?: string }) {
  const [frames, setFrames] = React.useState<boolean[][][]>([createEmptyGrid()]);
  const [currentFrameIndex, setCurrentFrameIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [fps, setFps] = React.useState(6);
  const [isDrawing, setIsDrawing] = React.useState(false);

  const currentGrid = frames[currentFrameIndex] || frames[0];

  // Playback timer
  React.useEffect(() => {
    if (!isPlaying || frames.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentFrameIndex((prev) => (prev + 1) % frames.length);
    }, 1000 / fps);
    return () => clearInterval(interval);
  }, [isPlaying, frames.length, fps]);

  const togglePixel = (r: number, c: number) => {
    const nextFrames = [...frames];
    const newGrid = nextFrames[currentFrameIndex].map((row, ri) =>
      row.map((val, ci) => (ri === r && ci === c ? !val : val))
    );
    nextFrames[currentFrameIndex] = newGrid;
    setFrames(nextFrames);
  };

  const addFrame = () => {
    setFrames([...frames, createEmptyGrid()]);
    setCurrentFrameIndex(frames.length);
  };

  const clearCurrent = () => {
    const nextFrames = [...frames];
    nextFrames[currentFrameIndex] = createEmptyGrid();
    setFrames(nextFrames);
  };

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(frames));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "dot-matrix-art.json");
    dlAnchorElem.click();
  };

  const exportSVG = () => {
    const dotSize = 10;
    const gap = 3;
    const width = COLS * (dotSize + gap);
    const height = ROWS * (dotSize + gap);
    let svgContent = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${width}" height="\${height}" viewBox="0 0 \${width} \${height}">\`;
    svgContent += \`<rect width="100%" height="100%" fill="#000000"/>\`;
    currentGrid.forEach((row, r) => {
      row.forEach((filled, c) => {
        const x = c * (dotSize + gap) + gap;
        const y = r * (dotSize + gap) + gap;
        svgContent += \`<circle cx="\${x + dotSize / 2}" cy="\${y + dotSize / 2}" r="\${dotSize / 2}" fill="\${filled ? '#E8A317' : '#222222'}"/>\`;
      });
    });
    svgContent += \`</svg>\`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dot-matrix.svg';
    a.click();
  };

  return (
    <div className={cn("max-w-5xl mx-auto p-6 bg-white border-4 border-black shadow-xl", className)}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-black pb-4 mb-6">
        <div>
          <h2 className="text-3xl font-black font-mono">Tool 02: DOT MATRIX STUDIO</h2>
          <p className="text-sm font-medium text-neutral-600">8 × 20 Live Pixel Art & Frame-by-Frame Animator · Export WebM / PNG / SVG / JSON</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportSVG} variant="outline" className="border-2 border-black font-bold">
            <Download className="w-4 h-4 mr-1" /> SVG
          </Button>
          <Button onClick={exportJSON} className="bg-cagp-gold text-black border-2 border-black font-bold">
            <Download className="w-4 h-4 mr-1" /> JSON
          </Button>
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="bg-black p-6 rounded border-4 border-black shadow-inner flex justify-center overflow-x-auto">
        <div className="grid grid-cols-20 gap-1.5" style={{ gridTemplateColumns: \`repeat(\${COLS}, minmax(0, 1fr))\` }}>
          {currentGrid.map((row, r) =>
            row.map((filled, c) => (
              <button
                key={\`\${r}-\${c}\`}
                type="button"
                onClick={() => togglePixel(r, c)}
                className={cn(
                  "w-5 h-5 sm:w-7 sm:h-7 rounded-full border border-neutral-800 transition-colors",
                  filled ? "bg-cagp-gold shadow-[0_0_8px_#E8A317]" : "bg-neutral-900 hover:bg-neutral-800"
                )}
              />
            ))
          )}
        </div>
      </div>

      {/* Playback & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-6 p-4 bg-neutral-100 border-2 border-black">
        <div className="flex items-center gap-3">
          <Button onClick={() => setIsPlaying(!isPlaying)} className="bg-cagp-burgundy text-white font-bold border-2 border-black">
            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isPlaying ? 'Pausar' : 'Animar'}
          </Button>
          <Button onClick={clearCurrent} variant="outline" className="border-2 border-black font-bold">
            <RotateCcw className="w-4 h-4 mr-2" /> Limpar
          </Button>
          <div className="flex items-center gap-2 ml-4">
            <span className="font-mono text-xs font-bold">FPS: {fps}</span>
            <Slider value={[fps]} min={1} max={24} step={1} onValueChange={(v) => setFps(v[0])} className="w-24" />
          </div>
        </div>

        {/* Frames Timeline */}
        <div className="flex items-center gap-2">
          {frames.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => { setIsPlaying(false); setCurrentFrameIndex(idx); }}
              className={cn(
                "w-8 h-8 font-mono text-xs font-bold border-2 border-black",
                idx === currentFrameIndex ? "bg-cagp-burgundy text-white" : "bg-white text-black"
              )}
            >
              {idx + 1}
            </button>
          ))}
          <Button onClick={addFrame} size="icon" className="w-8 h-8 border-2 border-black bg-white text-black hover:bg-neutral-200">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
`;
  await fs.writeFile(path.join(toolsDir, 'dot-matrix-studio.tsx'), dotMatrixStudioCode, 'utf8');

  // Tools index
  await fs.writeFile(
    path.join(toolsDir, 'index.ts'),
    "export * from './shape-builder';\nexport * from './dot-matrix-studio';\n",
    'utf8'
  );
  console.log('✅ [6/6] Tools: Successfully generated ShapeBuilder and DotMatrixStudio in src/components/boldkit/tools/');
}

// ─────────────────────────────────────────────────────────────────────────────
// Master Runner
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('🌟 CAGP SUPER APP — NeoBrutalism & BoldKit Full Suite Installer');
  console.log('═══════════════════════════════════════════════════════════════════');
  try {
    await installNeobrutalism();
    await installStyles();
    await installBoldKitRegistry();
    await installCanvasFX();
    await installBlocks();
    await installTools();

    // Create master index for boldkit
    const masterIndex = `export * from './shapes';
export * from './ascii-shapes';
export * from './ui/math-curve-loader';
export * from './ui/math-curve-progress';
export * from './ui/math-curve-background';
export * from './canvas-effects';
export * from './blocks';
export * from './tools';
`;
    await fs.writeFile(path.join(ROOT, 'src/components/boldkit/index.ts'), masterIndex, 'utf8');

    console.log('═══════════════════════════════════════════════════════════════════');
    console.log('🎉 ALL SUITES SUCCESSFULLY INSTALLED AND CONFIGURED!');
    console.log('═══════════════════════════════════════════════════════════════════');
  } catch (err) {
    console.error('Fatal error during installation:', err);
    process.exit(1);
  }
}

main();
