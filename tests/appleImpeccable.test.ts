import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { execSync } from 'node:child_process';

describe('apple-impeccable Meta-Skill (Integrity & Critique Framework)', () => {
  const skillRoot = path.resolve(__dirname, '../.agents/skills/apple-impeccable');
  const skillMdPath = path.join(skillRoot, 'SKILL.md');
  const critiqueRefPath = path.join(skillRoot, 'references/superapp-ux-critique.md');
  const matrixPath = path.join(skillRoot, 'references/reference-routing-matrix.md');
  const auditScriptPath = path.join(skillRoot, 'scripts/run-audit.sh');
  const pluginJsonPath = path.join(skillRoot, 'plugin.json');

  it('1. SKILL.md Frontmatter e Princípio Yoda / Grill Me', () => {
    expect(fs.existsSync(skillMdPath)).toBe(true);
    const content = fs.readFileSync(skillMdPath, 'utf-8');

    // Frontmatter check
    expect(content).toMatch(/^---\s*[\r\n]+name:\s*apple-impeccable/);
    expect(content).toContain('argument-hint:');
    expect(content).toContain('critique');

    // Yoda / Grill Me and 7 pillars check
    expect(content).toContain('Postura Yoda e Protocolo `/grill-me`');
    expect(content).toContain('Os 7 Pilares de Avaliação de Super App');
    expect(content).toContain('Dinâmica de Animações & Molas (Springs)');
    expect(content).toContain('Arquitetura de Temas & Acessibilidade Universal');
    expect(content).toContain('/browser');
  });

  it('2. superapp-ux-critique.md cobre todos os pilares de Super App e postura não-ditatorial', () => {
    expect(fs.existsSync(critiqueRefPath)).toBe(true);
    const content = fs.readFileSync(critiqueRefPath, 'utf-8');

    // Pillars and Philosophy
    expect(content).toContain('Filosofia Consultiva: A Postura Yoda & Protocolo `/grill-me`');
    expect(content).toContain('Thumb Zone vs Eye Zone');
    expect(content).toContain('Dinâmica de Fluid Glass');
    expect(content).toContain('Dinâmica de Animações & Física de Molas (Springs)');
    expect(content).toContain('Engenharia de Onboarding');
    expect(content).toContain('Ergonomia de Botões');
    expect(content).toContain('Arquitetura de Temas & Acessibilidade Visual Universal');
    expect(content).toContain('/browser');
    expect(content).toContain('Checklist Yoda');
  });

  it('3. Resolução de 100% dos links Markdown internos', () => {
    const mdFiles: string[] = [];
    function walk(dir: string) {
      for (const item of fs.readdirSync(dir)) {
        const full = path.join(dir, item);
        if (fs.statSync(full).isDirectory()) walk(full);
        else if (full.endsWith('.md')) mdFiles.push(full);
      }
    }
    walk(skillRoot);

    expect(mdFiles.length).toBeGreaterThanOrEqual(7);

    for (const file of mdFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let match;
      while ((match = linkRegex.exec(content)) !== null) {
        const link = match[2].trim();
        if (link.startsWith('http') || link.startsWith('#') || link.startsWith('mailto:')) continue;
        const cleanLink = link.split('#')[0];
        if (!cleanLink) continue;
        const targetPath = path.resolve(path.dirname(file), cleanLink);
        expect(fs.existsSync(targetPath), `Broken link in ${path.relative(skillRoot, file)}: ${link}`).toBe(true);
      }
    }
  });

  it('4. plugin.json é válido e contém sugestão de critique', () => {
    expect(fs.existsSync(pluginJsonPath)).toBe(true);
    const raw = fs.readFileSync(pluginJsonPath, 'utf-8');
    const parsed = JSON.parse(raw);
    expect(parsed.name).toBe('apple-impeccable');
    expect(parsed.suggestedPrompts).toBeDefined();
    expect(parsed.suggestedPrompts.some((p: string) => p.includes('critique'))).toBe(true);
  });

  it('5. Script run-audit.sh sintaxe bash e comando critique funcional', () => {
    expect(fs.existsSync(auditScriptPath)).toBe(true);
    // Syntax check
    expect(() => execSync(`bash -n "${auditScriptPath}"`)).not.toThrow();

    // Execution check on index.astro
    const output = execSync(`bash "${auditScriptPath}" critique src/pages/index.astro`, {
      encoding: 'utf-8',
    });
    expect(output).toContain('Super App UX Critique & Consultative Architecture Review');
    expect(output).toContain('Thumb Zone Analysis');
    expect(output).toContain('Dynamic Animations & Motion Physics');
    expect(output).toContain('Universal Theme Architecture');
    expect(output).toContain('Consultative Yoda / Grill Me Framework: Next Steps');
  });
});
