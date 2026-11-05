import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

describe('Polimento Visual & A11y (Auditoria Mobile, Alto Contraste e Modo Noturno)', () => {
  const headerPath = path.resolve(__dirname, '../src/components/shell/SuperAppHeader.astro');
  const globalCssPath = path.resolve(__dirname, '../src/styles/global.css');

  const headerContent = fs.readFileSync(headerPath, 'utf-8');
  const cssContent = fs.readFileSync(globalCssPath, 'utf-8');
  // Strip external @import directives so the in-memory stylesheet can evaluate pure CSS without network
  const localCss = cssContent.replace(/@import\s+[^;]+;/g, '');

  beforeEach(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
    document.documentElement.removeAttribute('data-a11y-contrast');
    document.documentElement.removeAttribute('data-theme');
  });

  it('1. Mobile Header Overflow: botão de a11y rápido é hidden em mobile estreito (< sm)', () => {
    // cagp-btn-a11y-quick deve ter a classe hidden sm:flex
    const a11yBtnMatch = headerContent.match(/id="cagp-btn-a11y-quick"[\s\S]*?class="([^"]+)"/);
    expect(a11yBtnMatch).not.toBeNull();
    const classList = a11yBtnMatch![1];
    expect(classList).toContain('hidden sm:flex');
  });

  it('1. Mobile Header Overflow: divisor sutil do header é ocultado em mobile estreito', () => {
    // Divisor antes do passaporte deve ser hidden sm:block para não consumir espaço horizontal
    expect(headerContent).toContain('class="hidden sm:block h-5 w-[1.5px] bg-[#DFDBD2] shrink-0 mx-0.5"');
  });

  it('1. Mobile Header Layout: Ilha 3 contém exatamente os 4 botões essenciais no SSR', () => {
    expect(headerContent).toContain('id="cagp-btn-spotlight"');
    expect(headerContent).toContain('id="cagp-btn-campus"');
    expect(headerContent).toContain('id="cagp-btn-passport"');
    expect(headerContent).toContain('id="cagp-mobile-menu-btn"');
  });

  it('2. Alto Contraste AAA: regra para filhos de itens ativos sucede regra universal e zera fundo', () => {
    // Verifica a presença de html[data-a11y-contrast="high"] *
    const universalRuleIndex = cssContent.indexOf('html[data-a11y-contrast="high"] * {');
    expect(universalRuleIndex).toBeGreaterThan(0);

    // Verifica a regra de especificidade de filhos de itens ativos
    const activeChildrenSelector = 'html[data-a11y-contrast="high"] .is-active *';
    const activeChildrenIndex = cssContent.indexOf(activeChildrenSelector);
    expect(activeChildrenIndex).toBeGreaterThan(universalRuleIndex);

    const activeRulesBlock = cssContent.slice(activeChildrenIndex, activeChildrenIndex + 300);
    expect(activeRulesBlock).toContain('background-color: transparent !important;');
    expect(activeRulesBlock).toContain('color: #000000 !important;');
  });

  it('2. Alto Contraste AAA (DOM Computed Styles): filhos de .is-active, [aria-selected="true"] e [aria-current="page"] computam transparent e #000000', () => {
    document.documentElement.setAttribute('data-a11y-contrast', 'high');
    const styleEl = document.createElement('style');
    styleEl.textContent = localCss;
    document.head.appendChild(styleEl);

    document.body.innerHTML = `
      <button class="is-active"><span id="child-active">Ativo</span></button>
      <button aria-selected="true"><i id="child-selected" class="bi bi-star"></i></button>
      <a aria-current="page"><span id="child-current">Página</span></a>
      <button class="inactive"><span id="child-inactive">Inativo</span></button>
    `;

    const childActive = document.getElementById('child-active')!;
    const styleActive = window.getComputedStyle(childActive);
    expect(styleActive.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(styleActive.color).toBe('rgb(0, 0, 0)');

    const childSelected = document.getElementById('child-selected')!;
    const styleSelected = window.getComputedStyle(childSelected);
    expect(styleSelected.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(styleSelected.color).toBe('rgb(0, 0, 0)');

    const childCurrent = document.getElementById('child-current')!;
    const styleCurrent = window.getComputedStyle(childCurrent);
    expect(styleCurrent.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(styleCurrent.color).toBe('rgb(0, 0, 0)');

    // Inativo recebe fundo preto e texto amarelo pela regra universal
    const childInactive = document.getElementById('child-inactive')!;
    const styleInactive = window.getComputedStyle(childInactive);
    expect(styleInactive.backgroundColor).toBe('rgb(0, 0, 0)');
    expect(styleInactive.color).toBe('rgb(255, 255, 0)');
  });

  it('3. Modo Claro Exclusivo: data-theme dark é completamente ausente do CSS', () => {
    expect(cssContent).not.toContain('html[data-theme="dark"]');
  });

  it('4. Apple HIG Mobile Topbar: Ilha 3 e controles essenciais (perfil, notificação, menu) visíveis em mobile com touch target >= 44px', () => {
    // Ilha 3 não deve ser oculta em mobile (< sm)
    expect(headerContent).not.toContain('hidden sm:flex pointer-events-auto');
    expect(headerContent).toContain('pointer-events-auto bg-white/95');

    // Ilha 1 com min-h 44px
    expect(headerContent).toContain('min-h-[44px] group min-w-0" aria-label="Página Inicial CAGP"');

    // Botões essenciais com min-w-[44px] min-h-[44px]
    const passportMatch = headerContent.match(/id="cagp-btn-passport"[\s\S]*?class="([^"]+)"/);
    expect(passportMatch).not.toBeNull();
    expect(passportMatch![1]).toContain('min-w-[44px]');
    expect(passportMatch![1]).toContain('min-h-[44px]');

    const campusMatch = headerContent.match(/id="cagp-btn-campus"[\s\S]*?class="([^"]+)"/);
    expect(campusMatch).not.toBeNull();
    expect(campusMatch![1]).toContain('min-w-[44px]');
    expect(campusMatch![1]).toContain('min-h-[44px]');

    const mobileMenuMatch = headerContent.match(/id="cagp-mobile-menu-btn"[\s\S]*?class="([^"]+)"/);
    expect(mobileMenuMatch).not.toBeNull();
    expect(mobileMenuMatch![1]).toContain('min-w-[44px]');
    expect(mobileMenuMatch![1]).toContain('min-h-[44px]');
  });

  it('5. Apple HIG V-02 & V-13: Regras globais de summary (44px) e piso de microtexto (11px) ativas', () => {
    expect(cssContent).toContain('button:not(.cagp-dot-btn), a, input, select, summary');
    expect(cssContent).toContain('details > summary');
    expect(cssContent).toContain('font-size: 11px !important;');
  });

  it('6. Apple HIG V-12: Isolamento de camada GPU em superfícies de vidro óptico', () => {
    expect(cssContent).toContain('isolation: isolate;');
    expect(cssContent).toContain('transform: translateZ(0);');
    expect(cssContent).toContain('-webkit-backdrop-filter: blur(16px) saturate(180%);');
  });
});

