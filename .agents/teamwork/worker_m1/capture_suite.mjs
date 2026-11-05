import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const WORK_DIR = '/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/worker_m1';
const SCREENSHOT_DIR = path.join(WORK_DIR, 'screenshots');
const IMPECCABLE_BIN = '/home/gsathler/Nextcloud/Projects/cagp/.agents/skills/impeccable/scripts/bin/linux-x64/impeccable';
const BASE_URL = 'http://localhost:4321';

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const ROUTES = [
  // 14 Primary Routes
  { path: '/', type: 'primary', name: 'Home Hub Portal' },
  { path: '/curso', type: 'primary', name: 'O Curso de Gestão Pública' },
  { path: '/calouros', type: 'primary', name: 'Guia do Calouro' },
  { path: '/pesquisa', type: 'primary', name: 'Pesquisa & 11 Núcleos' },
  { path: '/percurso', type: 'primary', name: 'Central Curricular & Grafo 10P' },
  { path: '/acg', type: 'primary', name: 'Extensão & Horas AAC (600h)' },
  { path: '/estagio', type: 'primary', name: 'Estágio Supervisionado & Art. 41' },
  { path: '/tcc', type: 'primary', name: 'Trabalho de Conclusão de Curso' },
  { path: '/documentos', type: 'primary', name: 'Acervo de Documentos' },
  { path: '/faq', type: 'primary', name: 'Dúvidas Frequentes & A11y' },
  { path: '/sobre', type: 'primary', name: 'O Centro Acadêmico (Sobre)' },
  { path: '/gestao', type: 'primary', name: 'Gestão, Equipe & Contas' },
  { path: '/configuracoes', type: 'primary', name: 'Configurações & Sincronização' },
  { path: '/mapa-do-site', type: 'primary_redirect', name: 'Mapa do Site (Redirect)' },

  // Canonical Redirects
  { path: '/optativas', type: 'redirect', name: 'Catálogo de Optativas (Redirect)' },
  { path: '/estagio-tcc', type: 'redirect', name: 'Hub Integrado Estágio e TCC (Redirect)' },

  // 8 Dynamic Document Reader Routes
  { path: '/documentos/ppc-gestao-publica-ufmg', type: 'document', name: 'Doc: PPC 2020' },
  { path: '/documentos/regulamento-gestao-publica-ufmg', type: 'document', name: 'Doc: Regulamento N-20229' },
  { path: '/documentos/regimento-interno-cagp-ufmg', type: 'document', name: 'Doc: Regimento Interno CAGP' },
  { path: '/documentos/percurso-bacharelado-nucleo-geral', type: 'document', name: 'Doc: Núcleo Geral' },
  { path: '/documentos/percurso-bacharelado-nucleo-complementar', type: 'document', name: 'Doc: Núcleo Complementar' },
  { path: '/documentos/percurso-bacharelado-nucleo-avancado', type: 'document', name: 'Doc: Núcleo Avançado' },
  { path: '/documentos/ementario-gestao-publica-ufmg', type: 'document', name: 'Doc: Ementário Oficial' },
  { path: '/documentos/transcricao-recepcao-ingressantes-2024-2', type: 'document', name: 'Doc: Transcrição Ingressantes' },
];

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: 'desktop', width: 1440, height: 900, isMobile: false, hasTouch: false },
];

// In-page evaluator measuring real layout & DOM metrics
const DOM_EVALUATOR_FN = () => {
  // 1. Touch targets (< 44x44px)
  const interactiveSelector = 'button, a, input:not([type="hidden"]), select, textarea, summary, [role="button"], [role="tab"], [role="link"], [role="switch"], [role="checkbox"]';
  const elements = Array.from(document.querySelectorAll(interactiveSelector));

  const touchTargets = [];
  let naturalZoneCount = 0; // bottom 35% on mobile (y >= 548.6 for 844h)
  let stretchZoneCount = 0; // middle 35% (253.2 <= y < 548.6)
  let hardZoneCount = 0;    // top 30% (y < 253.2)
  const viewportHeight = window.innerHeight;
  const bottom35Boundary = viewportHeight * 0.65;
  const top30Boundary = viewportHeight * 0.30;

  for (const el of elements) {
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;

    // Check thumb zones for items currently in initial viewport
    if (rect.top >= 0 && rect.top <= viewportHeight) {
      if (rect.top >= bottom35Boundary) {
        naturalZoneCount++;
      } else if (rect.top >= top30Boundary) {
        stretchZoneCount++;
      } else {
        hardZoneCount++;
      }
    }

    const isUndersized = rect.width < 43.5 || rect.height < 43.5;
    if (isUndersized) {
      const text = (el.innerText || el.getAttribute('aria-label') || el.getAttribute('title') || el.value || '').trim().slice(0, 40);
      const tag = el.tagName.toLowerCase();
      const id = el.id ? `#${el.id}` : '';
      const cls = Array.from(el.classList).slice(0, 4).join('.');
      const identifier = `${tag}${id}${cls ? '.' + cls : ''}`;

      touchTargets.push({
        identifier,
        tag,
        id: el.id || null,
        className: el.className || '',
        text,
        width: Math.round(rect.width * 10) / 10,
        height: Math.round(rect.height * 10) / 10,
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        deficientWidth: rect.width < 43.5,
        deficientHeight: rect.height < 43.5,
      });
    }
  }

  // 2. Liquid Glass / Materials check
  const glassElements = [];
  const allNodes = Array.from(document.querySelectorAll('*'));
  for (const el of allNodes) {
    const style = window.getComputedStyle(el);
    const bf = style.backdropFilter || style.webkitBackdropFilter;
    if (bf && bf !== 'none') {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;

      const isolation = style.isolation;
      const transform = style.transform;
      const willChange = style.willChange;
      const hasGpuIsolation = isolation === 'isolate' || (transform && transform !== 'none') || willChange.includes('transform');

      const tag = el.tagName.toLowerCase();
      const id = el.id ? `#${el.id}` : '';
      const cls = Array.from(el.classList).slice(0, 4).join('.');

      glassElements.push({
        selector: `${tag}${id}${cls ? '.' + cls : ''}`,
        id: el.id || null,
        backdropFilter: bf,
        backgroundColor: style.backgroundColor,
        isolation,
        transform,
        willChange,
        hasGpuIsolation,
        borderWidth: style.borderWidth,
        borderColor: style.borderColor,
      });
    }
  }

  // 3. Contrast analysis & Undersized Text
  function parseColor(str) {
    if (!str || str === 'transparent' || str === 'inherit') return null;
    const match = str.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/);
    if (!match) return null;
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
      a: match[4] !== undefined ? parseFloat(match[4]) : 1.0,
    };
  }

  function getLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  function getContrastRatio(rgb1, rgb2) {
    const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  function getEffectiveBackgroundColor(el) {
    let curr = el;
    let bgLayers = [];
    const isHighContrast = document.documentElement.getAttribute('data-a11y-contrast') === 'high';
    const baseCanvas = isHighContrast ? { r: 0, g: 0, b: 0, a: 1 } : { r: 247, g: 245, b: 240, a: 1 };

    while (curr && curr !== document) {
      const style = window.getComputedStyle(curr);
      const bg = parseColor(style.backgroundColor);
      if (bg && bg.a > 0) {
        bgLayers.unshift(bg);
        if (bg.a >= 0.99) break;
      }
      curr = curr.parentElement;
    }

    let blended = { ...baseCanvas };
    for (const layer of bgLayers) {
      const a = layer.a;
      blended.r = Math.round(layer.r * a + blended.r * (1 - a));
      blended.g = Math.round(layer.g * a + blended.g * (1 - a));
      blended.b = Math.round(layer.b * a + blended.b * (1 - a));
    }
    return blended;
  }

  const contrastViolations = [];
  const undersizedTextViolations = [];
  const textCandidates = Array.from(document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a, button, label, li, td, th, strong, em, small, b, code, summary'));

  for (const el of textCandidates) {
    const directText = Array.from(el.childNodes)
      .filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0)
      .map(n => n.textContent.trim())
      .join(' ') || (el.children.length === 0 ? el.innerText.trim() : '');

    if (!directText || directText.length < 2) continue;

    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;

    const fontSize = parseFloat(style.fontSize);
    const fontWeight = parseInt(style.fontWeight, 10) || 400;

    // Check undersized functional text (< 11px)
    if (fontSize > 0 && fontSize < 11) {
      const tag = el.tagName.toLowerCase();
      const id = el.id ? `#${el.id}` : '';
      const cls = Array.from(el.classList).slice(0, 3).join('.');
      undersizedTextViolations.push({
        selector: `${tag}${id}${cls ? '.' + cls : ''}`,
        fontSize,
        text: directText.slice(0, 40),
      });
    }

    const fg = parseColor(style.color);
    if (!fg) continue;
    const bg = getEffectiveBackgroundColor(el);

    const ratio = Math.round(getContrastRatio(fg, bg) * 100) / 100;
    const isLarge = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
    const requiredRatio = isLarge ? 3.0 : 4.5;

    if (ratio < requiredRatio) {
      const tag = el.tagName.toLowerCase();
      const id = el.id ? `#${el.id}` : '';
      const cls = Array.from(el.classList).slice(0, 3).join('.');
      contrastViolations.push({
        selector: `${tag}${id}${cls ? '.' + cls : ''}`,
        text: directText.slice(0, 50),
        fontSize,
        fontWeight,
        fg: `rgb(${fg.r},${fg.g},${fg.b})`,
        bg: `rgb(${bg.r},${bg.g},${bg.b})`,
        ratio,
        requiredRatio,
        isLarge,
      });
    }
  }

  // 4. Safe area insets & Viewport units
  const header = document.querySelector('header');
  const bottomNav = document.querySelector('#cagp-bottom-nav');
  const main = document.querySelector('main');

  const safeAreaInfo = {
    headerPaddingTop: header ? window.getComputedStyle(header).paddingTop : null,
    headerInlineStyle: header ? header.getAttribute('style') : null,
    bottomNavBottom: bottomNav ? window.getComputedStyle(bottomNav).bottom : null,
    bottomNavInlineStyle: bottomNav ? bottomNav.getAttribute('style') : null,
    mainPaddingBottom: main ? window.getComputedStyle(main).paddingBottom : null,
  };

  // 5. SegmentedControl Tabs
  const tabElements = Array.from(document.querySelectorAll('.cagp-workspace-tab, .cagp-workspace-viewall'));
  const tabsInfo = tabElements.map(t => ({
    tabId: t.getAttribute('data-ws-tab'),
    hash: t.getAttribute('data-ws-hash'),
    label: (t.innerText || '').trim(),
    isActive: t.classList.contains('is-active'),
    ariaSelected: t.getAttribute('aria-selected'),
  }));

  return {
    touchTargets,
    touchTargetsCount: touchTargets.length,
    thumbZone: {
      naturalZoneCount,
      stretchZoneCount,
      hardZoneCount,
      totalVisibleInteractive: naturalZoneCount + stretchZoneCount + hardZoneCount,
      naturalZonePercentage: Math.round((naturalZoneCount / Math.max(1, naturalZoneCount + stretchZoneCount + hardZoneCount)) * 100),
    },
    glassElements,
    contrastViolations,
    contrastViolationsCount: contrastViolations.length,
    undersizedTextViolations,
    undersizedTextCount: undersizedTextViolations.length,
    safeAreaInfo,
    tabsInfo,
  };
};

async function runImpeccableDetect(url) {
  try {
    const { stdout } = await execFileAsync(IMPECCABLE_BIN, ['detect', url, '--json'], { maxBuffer: 10 * 1024 * 1024 });
    return JSON.parse(stdout);
  } catch (err) {
    if (err.stdout) {
      try {
        return JSON.parse(err.stdout);
      } catch (parseErr) {
        return [{ error: 'Failed to parse impeccable json output', raw: err.stdout.slice(0, 500) }];
      }
    }
    return [{ error: err.message }];
  }
}

async function safeScreenshot(page, filePath, options = {}) {
  try {
    await page.waitForTimeout(150);
    await page.screenshot({ path: filePath, fullPage: false, timeout: 6000, ...options });
    return filePath;
  } catch (err) {
    console.log(`(Screenshot note for ${path.basename(filePath)}: ${err.message})`);
    return null;
  }
}

async function run() {
  console.log('=== CAGP Super App: Milestone 1 Live Browser Capture ===');
  console.log(`Starting headless Chromium automation against ${BASE_URL}...`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=medium'],
  });

  const captureResults = {
    timestamp: new Date().toISOString(),
    routesChecked: 0,
    totalSubviewsInspected: 0,
    routes: {},
    overlays: {},
    themeVariants: {},
    impeccableFindings: {},
    consoleMessages: [],
  };

  try {
    for (const vp of VIEWPORTS) {
      console.log(`\n======================================================`);
      console.log(`[VIEWPORT] ${vp.name.toUpperCase()} (${vp.width}x${vp.height})`);
      console.log(`======================================================`);

      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.isMobile,
        hasTouch: vp.hasTouch,
        deviceScaleFactor: 2,
      });

      const page = await context.newPage();

      page.on('console', (msg) => {
        const type = msg.type();
        if (type === 'error' || type === 'warning') {
          captureResults.consoleMessages.push({
            viewport: vp.name,
            type,
            text: msg.text(),
            location: msg.location(),
          });
        }
      });

      page.on('pageerror', (err) => {
        captureResults.consoleMessages.push({
          viewport: vp.name,
          type: 'pageerror',
          text: err.message,
          stack: err.stack,
        });
      });

      for (const r of ROUTES) {
        const targetUrl = `${BASE_URL}${r.path}`;
        process.stdout.write(`Visiting ${r.path} [${vp.name}] ... `);

        let response = null;
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            response = await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
            await page.waitForTimeout(400);
            break;
          } catch (err) {
            if (attempt === 0) {
              await page.waitForTimeout(800);
              continue;
            }
            console.log(`FAILED: ${err.message}`);
          }
        }

        const statusCode = response ? response.status() : null;
        const finalUrl = page.url();
        const title = await page.title();

        const screenshotSlug = r.path === '/' ? 'home' : r.path.replace(/\//g, '_').replace(/^_/, '');
        const screenshotPath = path.join(SCREENSHOT_DIR, `${screenshotSlug}-${vp.name}.png`);
        await safeScreenshot(page, screenshotPath);

        let baseMetrics;
        try {
          baseMetrics = await page.evaluate(DOM_EVALUATOR_FN);
        } catch (evalErr) {
          console.log(`(Evaluation error: ${evalErr.message}, retrying)`);
          await page.waitForTimeout(500);
          baseMetrics = await page.evaluate(DOM_EVALUATOR_FN);
        }

        // Sub-views interaction using robust selector queries
        const subviewsInspected = [];
        let tabDescriptors = [];
        try {
          tabDescriptors = await page.evaluate(() => {
            const tabs = Array.from(document.querySelectorAll('.cagp-workspace-tab, .cagp-workspace-viewall'));
            return tabs.map(t => ({
              tabId: t.getAttribute('data-ws-tab'),
              hash: t.getAttribute('data-ws-hash'),
              label: (t.innerText || '').trim(),
              isViewAll: t.classList.contains('cagp-workspace-viewall'),
            }));
          });
        } catch (tabErr) {
          tabDescriptors = [];
        }

        for (const tabInfo of tabDescriptors) {
          try {
            const selector = tabInfo.isViewAll
              ? '.cagp-workspace-viewall'
              : `[data-ws-tab="${tabInfo.tabId}"]`;

            const btn = await page.$(selector);
            if (btn) {
              await btn.click({ timeout: 2000 });
              await page.waitForTimeout(200);

              const panelStatus = await page.evaluate((tid) => {
                if (tid === '__all__') {
                  const panels = Array.from(document.querySelectorAll('.cagp-workspace-view'));
                  return {
                    visiblePanels: panels.filter(p => !p.hasAttribute('hidden')).length,
                    totalPanels: panels.length,
                  };
                }
                const panel = document.querySelector(`[data-ws-panel="${tid}"], #ws-panel-${tid}`);
                return {
                  hasPanel: Boolean(panel),
                  isHidden: panel ? panel.hasAttribute('hidden') : null,
                  display: panel ? window.getComputedStyle(panel).display : null,
                };
              }, tabInfo.tabId);

              const subMetrics = await page.evaluate(DOM_EVALUATOR_FN);

              subviewsInspected.push({
                tabId: tabInfo.tabId,
                hash: tabInfo.hash,
                label: tabInfo.label,
                panelStatus,
                undersizedTargetsCount: subMetrics.touchTargetsCount,
                contrastViolationsCount: subMetrics.contrastViolationsCount,
              });
            }
          } catch (tabClickErr) {
            subviewsInspected.push({
              tabId: tabInfo.tabId,
              hash: tabInfo.hash,
              label: tabInfo.label,
              error: tabClickErr.message,
            });
          }
        }

        const routeKey = `${r.path}@${vp.name}`;
        captureResults.routes[routeKey] = {
          path: r.path,
          name: r.name,
          type: r.type,
          viewport: vp.name,
          statusCode,
          finalUrl,
          title,
          screenshotPath,
          undersizedTargetsCount: baseMetrics.touchTargetsCount,
          thumbZone: baseMetrics.thumbZone,
          glassElementsCount: baseMetrics.glassElements.length,
          contrastViolationsCount: baseMetrics.contrastViolationsCount,
          undersizedTextCount: baseMetrics.undersizedTextCount,
          safeAreaInfo: baseMetrics.safeAreaInfo,
          tabsDetected: baseMetrics.tabsInfo.length,
          subviewsInspected,
          touchTargetsSample: baseMetrics.touchTargets.slice(0, 10),
          glassElements: baseMetrics.glassElements,
          contrastViolationsSample: baseMetrics.contrastViolations.slice(0, 10),
          undersizedTextSample: baseMetrics.undersizedTextViolations.slice(0, 10),
        };

        captureResults.routesChecked++;
        captureResults.totalSubviewsInspected += Math.max(1, subviewsInspected.length);

        console.log(`OK (Status ${statusCode}, ${baseMetrics.touchTargetsCount} targets <44px, ${baseMetrics.contrastViolationsCount} contrast issues, ${baseMetrics.undersizedTextCount} text <11px, ${subviewsInspected.length} tabs)`);
      }

      await context.close();
    }

    // =========================================================================
    // OVERLAYS & GLOBAL SHEETS TEST
    // =========================================================================
    console.log(`\n======================================================`);
    console.log(`[TESTING] Global Sheets, Modals, and Drawers`);
    console.log(`======================================================`);

    const overlayContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const overlayPage = await overlayContext.newPage();
    await overlayPage.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    await overlayPage.waitForTimeout(600);

    // 1. Spotlight Modal
    console.log('Testing Spotlight Modal (cagp:open-spotlight)...');
    await overlayPage.evaluate(() => window.dispatchEvent(new CustomEvent('cagp:open-spotlight')));
    await overlayPage.waitForTimeout(400);

    const spotlightInput = await overlayPage.$('[role="dialog"] input');
    if (spotlightInput) {
      await spotlightInput.fill('percurso');
      await overlayPage.waitForTimeout(300);
      const spotlightMetrics = await overlayPage.evaluate(DOM_EVALUATOR_FN);
      const ssPath = path.join(SCREENSHOT_DIR, 'overlay-spotlight-desktop.png');
      await safeScreenshot(overlayPage, ssPath);

      captureResults.overlays['spotlight'] = {
        name: 'Spotlight Search Modal',
        triggeredBy: 'cagp:open-spotlight',
        rendered: true,
        screenshotPath: ssPath,
        glassElements: spotlightMetrics.glassElements,
        undersizedTargetsCount: spotlightMetrics.touchTargetsCount,
        contrastViolationsCount: spotlightMetrics.contrastViolationsCount,
      };
      await overlayPage.keyboard.press('Escape');
      await overlayPage.waitForTimeout(300);
      console.log('Spotlight tested and closed.');
    }

    // 2. Passport Sheet
    console.log('Testing Passport Sheet (cagp:open-passport)...');
    await overlayPage.evaluate(() => window.dispatchEvent(new CustomEvent('cagp:open-passport')));
    await overlayPage.waitForTimeout(400);
    const ssPassport = path.join(SCREENSHOT_DIR, 'overlay-passport-desktop.png');
    await safeScreenshot(overlayPage, ssPassport);
    const passportMetrics = await overlayPage.evaluate(DOM_EVALUATOR_FN);
    captureResults.overlays['passport'] = {
      name: 'Passport Sheet (Passaporte Discente)',
      triggeredBy: 'cagp:open-passport',
      rendered: true,
      screenshotPath: ssPassport,
      undersizedTargetsCount: passportMetrics.touchTargetsCount,
      contrastViolationsCount: passportMetrics.contrastViolationsCount,
    };
    await overlayPage.keyboard.press('Escape');
    await overlayPage.waitForTimeout(300);

    // 3. Campus Sheet
    console.log('Testing Campus Sheet (cagp:open-campus)...');
    await overlayPage.evaluate(() => window.dispatchEvent(new CustomEvent('cagp:open-campus')));
    await overlayPage.waitForTimeout(400);
    const ssCampus = path.join(SCREENSHOT_DIR, 'overlay-campus-desktop.png');
    await safeScreenshot(overlayPage, ssCampus);
    const campusMetrics = await overlayPage.evaluate(DOM_EVALUATOR_FN);
    captureResults.overlays['campus'] = {
      name: 'Campus Status Sheet (RU II & Circular)',
      triggeredBy: 'cagp:open-campus',
      rendered: true,
      screenshotPath: ssCampus,
      undersizedTargetsCount: campusMetrics.touchTargetsCount,
      contrastViolationsCount: campusMetrics.contrastViolationsCount,
    };
    await overlayPage.keyboard.press('Escape');
    await overlayPage.waitForTimeout(300);

    // 4. A11y & Settings Sheet
    console.log('Testing A11y & Settings Sheet (cagp:open-a11y)...');
    await overlayPage.evaluate(() => window.dispatchEvent(new CustomEvent('cagp:open-a11y')));
    await overlayPage.waitForTimeout(400);
    const ssA11y = path.join(SCREENSHOT_DIR, 'overlay-a11y-desktop.png');
    await safeScreenshot(overlayPage, ssA11y);
    const a11yMetrics = await overlayPage.evaluate(DOM_EVALUATOR_FN);
    captureResults.overlays['a11y'] = {
      name: 'Universal A11y & Settings Sheet',
      triggeredBy: 'cagp:open-a11y',
      rendered: true,
      screenshotPath: ssA11y,
      undersizedTargetsCount: a11yMetrics.touchTargetsCount,
      contrastViolationsCount: a11yMetrics.contrastViolationsCount,
    };
    await overlayPage.keyboard.press('Escape');
    await overlayPage.waitForTimeout(300);

    // 5. Shortcuts Sheet
    console.log('Testing Shortcuts Sheet (cagp:open-shortcuts)...');
    await overlayPage.evaluate(() => window.dispatchEvent(new CustomEvent('cagp:open-shortcuts')));
    await overlayPage.waitForTimeout(400);
    const ssShortcuts = path.join(SCREENSHOT_DIR, 'overlay-shortcuts-desktop.png');
    await safeScreenshot(overlayPage, ssShortcuts);
    const shortcutsMetrics = await overlayPage.evaluate(DOM_EVALUATOR_FN);
    captureResults.overlays['shortcuts'] = {
      name: 'Shortcuts Picker Sheet',
      triggeredBy: 'cagp:open-shortcuts',
      rendered: true,
      screenshotPath: ssShortcuts,
      undersizedTargetsCount: shortcutsMetrics.touchTargetsCount,
      contrastViolationsCount: shortcutsMetrics.contrastViolationsCount,
    };
    await overlayPage.keyboard.press('Escape');
    await overlayPage.waitForTimeout(300);

    // 6. Welcome Modal (TipKit & Onboarding)
    console.log('Testing SuperApp Welcome Modal...');
    // Reset onboarding completed flag in local storage and reload
    await overlayPage.evaluate(() => {
      localStorage.removeItem('cagp_onboarding_completed_v1');
    });
    await overlayPage.reload({ waitUntil: 'domcontentloaded' });
    await overlayPage.waitForTimeout(1400); // Wait 1200ms for TipKit timer

    const tipKitBtn = await overlayPage.$('aside[aria-label="Dica de boas-vindas do Super App"] button');
    if (tipKitBtn) {
      await tipKitBtn.click();
      await overlayPage.waitForTimeout(300);
      const ssWelcome = path.join(SCREENSHOT_DIR, 'overlay-welcome-tour.png');
      await safeScreenshot(overlayPage, ssWelcome);
      const welcomeMetrics = await overlayPage.evaluate(DOM_EVALUATOR_FN);

      captureResults.overlays['welcome_modal'] = {
        name: 'Welcome Tour Modal (Apple HIG Onboarding)',
        rendered: true,
        screenshotPath: ssWelcome,
        undersizedTargetsCount: welcomeMetrics.touchTargetsCount,
        contrastViolationsCount: welcomeMetrics.contrastViolationsCount,
      };
      await overlayPage.keyboard.press('Escape');
    }

    await overlayContext.close();

    // 7. Mobile Drawer (< 1024px)
    console.log('Testing Mobile Drawer on 390x844...');
    const mobileDrawerContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });
    const mobileDrawerPage = await mobileDrawerContext.newPage();
    await mobileDrawerPage.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    await mobileDrawerPage.waitForTimeout(400);

    await mobileDrawerPage.evaluate(() => {
      const btn = document.querySelector('#cagp-mobile-menu-btn');
      if (btn) btn.click();
      else window.dispatchEvent(new CustomEvent('cagp:open-drawer'));
    });
    await mobileDrawerPage.waitForTimeout(400);

    const ssMobileDrawer = path.join(SCREENSHOT_DIR, 'overlay-mobile-drawer.png');
    await safeScreenshot(mobileDrawerPage, ssMobileDrawer);
    const drawerMetrics = await mobileDrawerPage.evaluate(DOM_EVALUATOR_FN);

    captureResults.overlays['mobile_drawer'] = {
      name: 'Mobile Drawer Menu',
      triggeredBy: '#cagp-mobile-menu-btn',
      rendered: true,
      screenshotPath: ssMobileDrawer,
      undersizedTargetsCount: drawerMetrics.touchTargetsCount,
      contrastViolationsCount: drawerMetrics.contrastViolationsCount,
      touchTargetsSample: drawerMetrics.touchTargets.slice(0, 5),
    };

    await mobileDrawerPage.evaluate(() => window.dispatchEvent(new CustomEvent('cagp:close-drawer')));
    await mobileDrawerPage.waitForTimeout(300);
    await mobileDrawerContext.close();

    // =========================================================================
    // THEME VARIANT TESTS (High Contrast, Large Font, Desktop Dock)
    // =========================================================================
    console.log(`\n======================================================`);
    console.log(`[TESTING] Interactive Theme Variants & Modes`);
    console.log(`======================================================`);

    const themeContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const themePage = await themeContext.newPage();
    await themePage.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    await themePage.waitForTimeout(400);

    // A. High Contrast Mode
    console.log('Evaluating High Contrast Mode (data-a11y-contrast="high")...');
    await themePage.evaluate(() => {
      document.documentElement.setAttribute('data-a11y-contrast', 'high');
    });
    await themePage.waitForTimeout(400);

    const ssHighContrast = path.join(SCREENSHOT_DIR, 'theme-high-contrast-home.png');
    await safeScreenshot(themePage, ssHighContrast);
    const highContrastMetrics = await themePage.evaluate(DOM_EVALUATOR_FN);

    captureResults.themeVariants['high_contrast'] = {
      name: 'High Contrast Mode',
      attribute: 'data-a11y-contrast="high"',
      screenshotPath: ssHighContrast,
      contrastViolationsCount: highContrastMetrics.contrastViolationsCount,
      contrastViolations: highContrastMetrics.contrastViolations.slice(0, 10),
      glassElementsCount: highContrastMetrics.glassElements.length,
    };

    // B. Font XL Mode
    console.log('Evaluating Large Font Mode (data-a11y-font="xl")...');
    await themePage.evaluate(() => {
      document.documentElement.removeAttribute('data-a11y-contrast');
      document.documentElement.setAttribute('data-a11y-font', 'xl');
    });
    await themePage.waitForTimeout(400);

    const ssFontXl = path.join(SCREENSHOT_DIR, 'theme-font-xl-home.png');
    await safeScreenshot(themePage, ssFontXl);
    const fontXlMetrics = await themePage.evaluate(DOM_EVALUATOR_FN);

    captureResults.themeVariants['font_xl'] = {
      name: 'Font XL Mode (125% scale)',
      attribute: 'data-a11y-font="xl"',
      screenshotPath: ssFontXl,
      undersizedTargetsCount: fontXlMetrics.touchTargetsCount,
      contrastViolationsCount: fontXlMetrics.contrastViolationsCount,
    };

    // C. Desktop Dock Mode
    console.log('Evaluating Desktop Dock (data-desktop-dock="true")...');
    await themePage.evaluate(() => {
      document.documentElement.removeAttribute('data-a11y-font');
      document.documentElement.setAttribute('data-desktop-dock', 'true');
      const prefs = JSON.parse(localStorage.getItem('cagp_a11y_prefs_v2') || '{}');
      prefs.showDesktopDock = true;
      localStorage.setItem('cagp_a11y_prefs_v2', JSON.stringify(prefs));
      window.dispatchEvent(new CustomEvent('cagp:vault-updated', { detail: { key: 'cagp_a11y_prefs_v2' } }));
    });
    await themePage.waitForTimeout(500);

    const ssDock = path.join(SCREENSHOT_DIR, 'feature-desktop-dock.png');
    await safeScreenshot(themePage, ssDock);
    const dockMetrics = await themePage.evaluate(() => {
      const dock = document.querySelector('aside[aria-label="Dock de Atalhos Rápidos Discentes"], nav[aria-label="Atalhos rápidos customizáveis"]');
      if (!dock) return { found: false };
      const items = Array.from(dock.querySelectorAll('a, button'));
      return {
        found: true,
        itemCount: items.length,
        items: items.map(el => {
          const r = el.getBoundingClientRect();
          return {
            label: el.getAttribute('aria-label') || el.innerText,
            width: Math.round(r.width),
            height: Math.round(r.height),
            undersized: r.width < 44 || r.height < 44,
          };
        }),
      };
    });

    captureResults.themeVariants['desktop_dock'] = {
      name: 'macOS-Style Desktop Floating Dock',
      attribute: 'data-desktop-dock="true"',
      screenshotPath: ssDock,
      dockMetrics,
    };

    await themeContext.close();

    // =========================================================================
    // IMPECCABLE AUDIT PASS ON PUBLIC ROUTES
    // =========================================================================
    console.log(`\n======================================================`);
    console.log(`[IMPECCABLE] Running Automated Anti-Pattern Audits`);
    console.log(`======================================================`);

    for (const r of ROUTES) {
      process.stdout.write(`Impeccable detect on ${r.path} ... `);
      const url = `${BASE_URL}${r.path}`;
      const findings = await runImpeccableDetect(url);
      captureResults.impeccableFindings[r.path] = {
        path: r.path,
        findingsCount: findings.length,
        findings,
      };
      console.log(`${findings.length} findings`);
    }

  } finally {
    await browser.close();
  }

  // Write results to files
  const summaryPath = path.join(WORK_DIR, 'capture-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(captureResults, null, 2), 'utf-8');
  console.log(`\nCapture complete! Summary written to ${summaryPath}`);

  compileAuditReports(captureResults);
}

function compileAuditReports(data) {
  // 1. Touch Targets Audit
  const touchTargetsMap = {};
  for (const [key, route] of Object.entries(data.routes)) {
    if (route.touchTargetsSample && route.touchTargetsSample.length > 0) {
      touchTargetsMap[key] = {
        path: route.path,
        viewport: route.viewport,
        totalUndersized: route.undersizedTargetsCount,
        samples: route.touchTargetsSample,
      };
    }
  }
  fs.writeFileSync(path.join(WORK_DIR, 'touch-targets-audit.json'), JSON.stringify(touchTargetsMap, null, 2), 'utf-8');

  // 2. Materials & Liquid Glass Audit
  const glassAudit = {};
  for (const [key, route] of Object.entries(data.routes)) {
    if (route.glassElements && route.glassElements.length > 0) {
      glassAudit[key] = {
        path: route.path,
        viewport: route.viewport,
        count: route.glassElements.length,
        elements: route.glassElements,
      };
    }
  }
  fs.writeFileSync(path.join(WORK_DIR, 'materials-glass-audit.json'), JSON.stringify(glassAudit, null, 2), 'utf-8');

  // 3. Contrast & Typography Audit
  const contrastAudit = {};
  for (const [key, route] of Object.entries(data.routes)) {
    contrastAudit[key] = {
      path: route.path,
      viewport: route.viewport,
      contrastViolationsCount: route.contrastViolationsCount,
      undersizedTextCount: route.undersizedTextCount,
      contrastSamples: route.contrastViolationsSample,
      undersizedTextSamples: route.undersizedTextSample,
    };
  }
  fs.writeFileSync(path.join(WORK_DIR, 'contrast-audit.json'), JSON.stringify(contrastAudit, null, 2), 'utf-8');

  // 4. Console Errors
  fs.writeFileSync(path.join(WORK_DIR, 'console-errors.json'), JSON.stringify(data.consoleMessages, null, 2), 'utf-8');

  // 5. Impeccable Anti-patterns
  fs.writeFileSync(path.join(WORK_DIR, 'impeccable-audit.json'), JSON.stringify(data.impeccableFindings, null, 2), 'utf-8');

  console.log('Dedicated audit JSON files created successfully.');
}

run().catch((err) => {
  console.error('Fatal execution error in capture suite:', err);
  process.exit(1);
});
