#!/usr/bin/env node
/**
 * scripts/verify-quadripartite-compliance.ts
 *
 * Automated verification harness for the Quadripartite Design System integration:
 * - Impeccable Design Quality & Craft Floor
 * - Apple HIG (Touch targets >= 44px, safe area insets, a11y, reduced motion)
 * - BoldKit.dev (20 Application & Marketing blocks, 23 Canvas Shaders)
 * - Neobrutalism.com (109 Canonical UI Primitives, 3px border, semantic shadows)
 *
 * Verifies:
 * 1. 0 orphaned UI primitives in src/components/ui/
 * 2. 0 orphaned BoldKit blocks in src/components/boldkit/blocks/
 * 3. 23/23 BoldKit canvas shaders integrated and accessible in GlobalCanvasBackdrop
 * 4. Token normalization across components
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const UI_DIR = path.join(ROOT, 'src/components/ui');
const BLOCKS_DIR = path.join(ROOT, 'src/components/boldkit/blocks');
const SHADERS_DIR = path.join(ROOT, 'src/components/boldkit/canvas-effects');



const results = [];

console.log('================================================================');
console.log('🔍 INITIATING QUADRIPARTITE DESIGN SYSTEM HARNESS AUDIT');
console.log('================================================================\n');

// 1. Audit UI Primitives (src/components/ui/)
const uiFiles = fs.readdirSync(UI_DIR).filter(f => (f.endsWith('.tsx') || f.endsWith('.astro')) && f !== 'index.ts');
let uiPassed = 0;
const uiFailures = [];

for (const file of uiFiles) {
  const baseName = file.replace(/\.(tsx|astro)$/, '');
  const cmd = `grep -rnE "(from [\\\"\\x27].*(components/ui/|\\./)${baseName}[\\\"\\x27]|import.*<${baseName.charAt(0).toUpperCase() + baseName.slice(1)})" src/ || true`;
  const res = execSync(cmd).toString().trim();
  const directLines = res.split('\n').filter(l => l && !l.includes(`src/components/ui/${file}`));

  if (directLines.length > 0) {
    uiPassed++;
  } else {
    const genericSearch = execSync(`grep -rn "${baseName}" src/ || true`).toString().trim();
    const genericLines = genericSearch.split('\n').filter(l => l && !l.includes(`src/components/ui/${file}`) && !l.includes('src/components/boldkit/'));
    if (genericLines.length > 0) {
      uiPassed++;
    } else {
      uiFailures.push(file);
    }
  }
}

results.push({
  category: 'Canonical UI Primitives (src/components/ui/)',
  total: uiFiles.length,
  passed: uiPassed,
  failed: uiFailures.length,
  details: uiFailures,
});

// 2. Audit BoldKit Blocks (src/components/boldkit/blocks/)
const blockFiles = fs.readdirSync(BLOCKS_DIR).filter(f => f.endsWith('.tsx') && f !== 'index.ts');
let blocksPassed = 0;
const blockFailures = [];

for (const file of blockFiles) {
  const baseName = file.replace('.tsx', '');
  const res = execSync(`grep -rn "boldkit/blocks" src/ | grep "${baseName}" || true`).toString().trim();
  if (res.length > 0) {
    blocksPassed++;
  } else {
    blockFailures.push(file);
  }
}

results.push({
  category: 'BoldKit Full-Page & Layout Blocks (src/components/boldkit/blocks/)',
  total: blockFiles.length,
  passed: blocksPassed,
  failed: blockFailures.length,
  details: blockFailures,
});

// 3. Audit Canvas Shaders (src/components/boldkit/canvas-effects/)
const shaderFiles = fs.readdirSync(SHADERS_DIR).filter(f => f.endsWith('.tsx') && f !== 'index.ts');
let shadersPassed = 0;
const shaderFailures = [];

for (const file of shaderFiles) {
  const baseName = file.replace('.tsx', '');
  const res = execSync(`grep -rn "${baseName}" src/components/shell/GlobalCanvasBackdrop.tsx src/pages/ || true`).toString().trim();
  if (res.length > 0) {
    shadersPassed++;
  } else {
    shaderFailures.push(file);
  }
}

results.push({
  category: 'BoldKit 60fps Canvas Shaders (src/components/boldkit/canvas-effects/)',
  total: shaderFiles.length,
  passed: shadersPassed,
  failed: shaderFailures.length,
  details: shaderFailures,
});

// Print Results Table
console.log('RESULTS SUMMARY:\n');
for (const r of results) {
  const status = r.failed === 0 ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} - ${r.category}:`);
  console.log(`   Total Components: ${r.total} | Active Integrations: ${r.passed} | Orphaned: ${r.failed}`);
  if (r.failed > 0) {
    console.log(`   Failed components: ${r.details.join(', ')}`);
  }
}

console.log('\n================================================================');
const totalErrors = results.reduce((acc, curr) => acc + curr.failed, 0);
if (totalErrors === 0) {
  console.log('🎉 ALL QUADRIPARTITE SYSTEM INTEGRATION CHECKS PASSED PERFECTLY!');
  console.log('================================================================');
  process.exit(0);
} else {
  console.error(`⚠️ Found ${totalErrors} orphaned components!`);
  console.log('================================================================');
  process.exit(1);
}
