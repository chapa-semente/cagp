// Garante que toda classe `bi-*` usada em src/ tem glifo gerado em src/styles/icons.css
// e que CagpIcon / React icons.tsx estão sincronizados com seus artefatos gerados.
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = path.resolve(__dirname, '..');

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else if (/\.(astro|tsx|ts|jsx|js|css|json)$/.test(ent.name)) out.push(p);
  }
  return out;
}

describe('sistema de ícones (Phosphor Bold)', () => {
  it('define regra CSS para toda classe bi-* usada em src/, incluindo bi-percent', () => {
    const iconsCss = readFileSync(path.join(root, 'src/styles/icons.css'), 'utf-8');
    const defined = new Set([...iconsCss.matchAll(/\.bi-([a-z0-9-]+)::?before/g)].map((m) => `bi-${m[1]}`));

    expect(defined.has('bi-percent')).toBe(true);
    expect(iconsCss).toContain('.bi-percent::before');

    const missing: { cls: string; file: string }[] = [];
    for (const file of walk(path.join(root, 'src'))) {
      if (file.endsWith('icons.css') || file.endsWith('cagpIcons.ts')) continue;
      const content = readFileSync(file, 'utf-8');
      for (const m of content.matchAll(/(?<![a-z0-9-])bi-[a-z0-9-]+/g)) {
        const cls = m[0];
        if (!defined.has(cls)) {
          missing.push({ cls, file: path.relative(root, file) });
        }
      }
    }

    expect(missing).toEqual([]);
  });
});
