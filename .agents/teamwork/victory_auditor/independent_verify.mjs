import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrast(rgb1, rgb2) {
  const l1 = getLuminance(...rgb1);
  const l2 = getLuminance(...rgb2);
  const brighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (brighter + 0.05) / (darker + 0.05);
}

async function run() {
  console.log('=== STARTING INDEPENDENT VICTORY AUDITOR BROWSER VERIFICATION ===');
  const browser = await chromium.launch({ headless: true });
  const results = {};

  try {
    // Test 1: Desktop Viewport (1440x900)
    console.log('\n--- 1. Testing Desktop (1440x900) Header Touch Targets ---');
    const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await desktopPage.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

    const btnA11y = await desktopPage.$('#cagp-btn-a11y-quick');
    const btnPassport = await desktopPage.$('#cagp-btn-passport');

    if (btnA11y) {
      const box = await btnA11y.boundingBox();
      console.log('cagp-btn-a11y-quick bounding box:', box);
      results.btnA11y = box;
    } else {
      console.log('cagp-btn-a11y-quick NOT FOUND');
    }

    if (btnPassport) {
      const box = await btnPassport.boundingBox();
      console.log('cagp-btn-passport bounding box:', box);
      results.btnPassport = box;
    } else {
      console.log('cagp-btn-passport NOT FOUND');
    }

    // Test 2: Viewport Meta & Zoom Restrictions
    console.log('\n--- 2. Testing Viewport Meta & Gesture Zoom Prevention ---');
    const metaViewport = await desktopPage.$eval('meta[name="viewport"]', el => el.getAttribute('content'));
    console.log('Viewport content:', metaViewport);
    results.metaViewport = metaViewport;

    const gestureBlocked = await desktopPage.evaluate(() => {
      let blocked = false;
      const evt = new Event('gesturestart', { cancelable: true });
      document.dispatchEvent(evt);
      return evt.defaultPrevented;
    });
    console.log('gesturestart defaultPrevented:', gestureBlocked);
    results.gestureBlocked = gestureBlocked;

    // Test 3: Campaign Banner Contrast Ratio
    console.log('\n--- 3. Testing Campaign Banner Contrast Ratio ---');
    const bannerContrast = await desktopPage.evaluate(() => {
      const el = document.querySelector('strong.text-\\[\\#FF8718\\]');
      if (!el) return null;
      const style = window.getComputedStyle(el);
      let parent = el.parentElement;
      let bg = window.getComputedStyle(parent).backgroundColor;
      while (parent && (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent')) {
        parent = parent.parentElement;
        if (parent) bg = window.getComputedStyle(parent).backgroundColor;
      }
      return {
        text: el.textContent,
        color: style.color,
        bgColor: bg,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight
      };
    });
    console.log('Banner evaluated styles:', bannerContrast);
    if (bannerContrast) {
      // Parse rgb
      const parseRgb = (str) => {
        const m = str.match(/\d+/g);
        return m ? m.slice(0, 3).map(Number) : [0, 0, 0];
      };
      const fg = parseRgb(bannerContrast.color);
      const bg = parseRgb(bannerContrast.bgColor);
      const cr = getContrast(fg, bg);
      console.log(`Calculated contrast ratio: ${cr.toFixed(4)}:1 (FG: ${fg}, BG: ${bg})`);
      results.bannerContrastRatio = cr;
    }
    await desktopPage.close();

    // Test 4: Mobile Viewport (390x844) - Document Reader Summary Accordion Height
    console.log('\n--- 4. Testing Document Reader Summary Accordion on Mobile (390x844) ---');
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto('http://localhost:4321/documentos/ppc-gestao-publica-ufmg', { waitUntil: 'networkidle' });

    const summaryBox = await mobilePage.evaluate(() => {
      const s = document.querySelector('summary.cursor-pointer');
      if (!s) return null;
      const rect = s.getBoundingClientRect();
      const style = window.getComputedStyle(s);
      return {
        width: rect.width,
        height: rect.height,
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom,
        text: s.textContent.trim().slice(0, 40)
      };
    });
    console.log('Mobile document reader summary box:', summaryBox);
    results.summaryBox = summaryBox;
    await mobilePage.close();

    // Test 5: Compact Mobile (375x667 iPhone SE) - /configuracoes Horizontal Scroll Blowout
    console.log('\n--- 5. Testing iPhone SE (375x667) Horizontal Overflow on /configuracoes ---');
    const compactPage = await browser.newPage({ viewport: { width: 375, height: 667 } });
    await compactPage.goto('http://localhost:4321/configuracoes', { waitUntil: 'networkidle' });

    const scrollWidth = await compactPage.evaluate(() => {
      return {
        viewportWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    });
    console.log('iPhone SE horizontal overflow test:', scrollWidth);
    results.compactOverflow = scrollWidth;
    await compactPage.close();

    // Test 6: Desktop Line-Length Blowout on /documentos/ppc-gestao-publica-ufmg
    console.log('\n--- 6. Testing Desktop Reader Editorial Column Width ---');
    const readerPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await readerPage.goto('http://localhost:4321/documentos/ppc-gestao-publica-ufmg', { waitUntil: 'networkidle' });

    const readerMetrics = await readerPage.evaluate(() => {
      const art = document.querySelector('article.cagp-doc-reader');
      const p = document.querySelector('article.cagp-doc-reader p');
      return {
        articleWidth: art ? art.getBoundingClientRect().width : null,
        articleClasses: art ? art.className : null,
        pWidth: p ? p.getBoundingClientRect().width : null,
        pCharLength: p ? p.textContent.trim().length : null
      };
    });
    console.log('Reader desktop column metrics:', readerMetrics);
    results.readerMetrics = readerMetrics;
    await readerPage.close();

    // Test 7: GPU Layer Isolation on Glass Elements
    console.log('\n--- 7. Testing Glass Surface GPU Isolation ---');
    const glassPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await glassPage.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

    const glassAudit = await glassPage.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*')).filter(el => {
        const s = window.getComputedStyle(el);
        return s.backdropFilter && s.backdropFilter !== 'none';
      });
      return {
        totalGlassElements: elements.length,
        withIsolation: elements.filter(el => window.getComputedStyle(el).isolation === 'isolate').length,
        withGpuTransform: elements.filter(el => window.getComputedStyle(el).transform !== 'none').length,
        selectors: elements.slice(0, 5).map(el => el.tagName + '.' + el.className.split(' ').slice(0, 3).join('.'))
      };
    });
    console.log('Glass GPU isolation audit:', glassAudit);
    results.glassAudit = glassAudit;
    await glassPage.close();

    console.log('\n=== ALL INDEPENDENT VERIFICATION CHECKS COMPLETED ===');
    console.log('Final Summary Data:', JSON.stringify(results, null, 2));
  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error('VERIFICATION ERROR:', err);
  process.exit(1);
});
