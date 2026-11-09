#!/usr/bin/env node
/**
 * scripts/inspect-viewports.mjs
 * 
 * Automação de inspeção visual multi-viewport via Chrome DevTools Protocol (CDP).
 * Conecta-se diretamente ao Google Chrome rodando com:
 *   google-chrome-stable --remote-debugging-port=9222 --user-data-dir=$HOME/.config/chrome-debug
 * 
 * Recursos:
 * - Emula múltiplos viewports (Mobile, Tablet, Desktop, Wide)
 * - Detecta vazamento horizontal (horizontal scroll overflow)
 * - Audita alvos de toque (< 44x44px em mobile)
 * - Captura screenshots de página inteira salvos em .visual-audit/screenshots/
 */

import fs from 'node:fs';
import path from 'node:path';

const CDP_PORT = process.env.CDP_PORT || 9222;
const CDP_HOST = process.env.CDP_HOST || '127.0.0.1';
const CDP_BASE = `http://${CDP_HOST}:${CDP_PORT}`;

const VIEWPORTS = [
  { name: 'mobile-compact', width: 375, height: 812, dpr: 2, isMobile: true, label: 'Mobile (iPhone Mini / SE)' },
  { name: 'mobile-standard', width: 390, height: 844, dpr: 3, isMobile: true, label: 'Mobile (iPhone 14/15/16)' },
  { name: 'tablet-portrait', width: 768, height: 1024, dpr: 2, isMobile: false, label: 'Tablet (iPad Mini/Air)' },
  { name: 'desktop-compact', width: 1280, height: 800, dpr: 1, isMobile: false, label: 'Desktop (13" Laptop)' },
  { name: 'desktop-standard', width: 1440, height: 900, dpr: 1, isMobile: false, label: 'Desktop Amplo (1440p)' },
];

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    check: false,
    url: 'http://localhost:4321/',
    outDir: '.visual-audit/screenshots',
    fullPage: true,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--check') {
      options.check = true;
    } else if (args[i] === '--url' && args[i + 1]) {
      options.url = args[++i];
    } else if (args[i] === '--out' && args[i + 1]) {
      options.outDir = args[++i];
    } else if (args[i] === '--viewport-only') {
      options.fullPage = false;
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log(`
Uso: node scripts/inspect-viewports.mjs [opções]

Opções:
  --check            Apenas verifica conexão com o Chrome CDP e lista abas
  --url <url>        URL a inspecionar (padrão: http://localhost:4321/)
  --out <dir>        Diretório para salvar prints (padrão: .visual-audit/screenshots)
  --viewport-only    Captura apenas o viewport visível em vez da página inteira
  --help             Exibe esta mensagem de ajuda
      `);
      process.exit(0);
    }
  }

  return options;
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.msgId = 1;
    this.pending = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.id && this.pending.has(data.id)) {
            const { resolve, reject } = this.pending.get(data.id);
            this.pending.delete(data.id);
            if (data.error) {
              reject(new Error(data.error.message || JSON.stringify(data.error)));
            } else {
              resolve(data.result);
            }
          }
        } catch (e) {
          console.error('[CDP Client] Erro ao parsear mensagem:', e);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.msgId++;
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

async function getBrowserInfo() {
  try {
    const res = await fetch(`${CDP_BASE}/json/version`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    throw new Error(
      `Não foi possível conectar ao Chrome em ${CDP_BASE}.\nCertifique-se de que o Chrome está rodando com:\ngoogle-chrome-stable --remote-debugging-port=9222 --user-data-dir=$HOME/.config/chrome-debug\nDetalhe: ${err.message}`
    );
  }
}

async function getTargetTab(targetUrl) {
  const res = await fetch(`${CDP_BASE}/json/list`);
  const targets = await res.json();
  const pages = targets.filter((t) => t.type === 'page');

  if (pages.length === 0) {
    throw new Error('Nenhuma aba do tipo "page" encontrada no Chrome.');
  }

  // Tentar encontrar uma aba com a URL alvo ou localhost
  const cleanTarget = targetUrl.replace(/\/$/, '');
  const matched = pages.find((p) => p.url.startsWith(cleanTarget)) ||
                  pages.find((p) => p.url.includes('localhost:4321')) ||
                  pages[0];

  return matched;
}

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

async function main() {
  const options = parseArgs();

  console.log(`\n🔍 [Impeccable Visual Inspector] Conectando a ${CDP_BASE}...`);
  const versionInfo = await getBrowserInfo();
  console.log(`✅ Conectado com sucesso: ${versionInfo.Browser} (${versionInfo['Protocol-Version']})`);

  if (options.check) {
    const res = await fetch(`${CDP_BASE}/json/list`);
    const tabs = await res.json();
    console.log(`\n📋 Abas ativas no navegador (${tabs.length}):`);
    for (const t of tabs) {
      console.log(` • [${t.type}] "${t.title}" -> ${t.url}`);
    }
    return;
  }

  const tab = await getTargetTab(options.url);
  console.log(`🎯 Inspecionando aba: "${tab.title}"`);
  console.log(`🔗 URL: ${tab.url}`);

  const client = new CDPClient(tab.webSocketDebuggerUrl);
  await client.connect();

  // Habilitar domínios necessários
  await client.send('Page.enable');
  await client.send('DOM.enable');
  await client.send('Runtime.enable');

  // Se a URL informada for diferente da URL da aba, navegar
  if (options.url && !tab.url.startsWith(options.url.replace(/\/$/, ''))) {
    console.log(`🌐 Navegando para ${options.url}...`);
    await client.send('Page.navigate', { url: options.url });
    await sleep(1500);
  }

  // Criar diretório de saída
  const resolvedOutDir = path.resolve(process.cwd(), options.outDir);
  fs.mkdirSync(resolvedOutDir, { recursive: true });

  console.log(`\n📸 Iniciando auditoria multi-viewport e captura de tela...`);
  console.log(`📁 Diretório de saída: ${resolvedOutDir}\n`);

  const results = [];

  for (const vp of VIEWPORTS) {
    process.stdout.write(` • Testando ${vp.name.padEnd(18)} (${vp.width}x${vp.height} @${vp.dpr}x)... `);

    // 1. Emular métricas de tela
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: vp.dpr,
      mobile: vp.isMobile,
      screenOrientation: { angle: 0, type: 'portraitPrimary' },
    });

    await sleep(400); // Aguarda layout e reflow

    // 2. Avaliar no DOM vazamento de largura e alvos de toque
    const auditRes = await client.send('Runtime.evaluate', {
      expression: `
        (() => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const clientWidth = docEl.clientWidth;
          const overflowX = scrollWidth > clientWidth + 1; // tolerância 1px de subpixel

          // Procurar elementos que vazam
          let offendingSelectors = [];
          if (overflowX) {
            const allElements = document.querySelectorAll('*');
            for (const el of allElements) {
              const rect = el.getBoundingClientRect();
              if (rect.right > clientWidth + 2) {
                const tag = el.tagName.toLowerCase();
                const id = el.id ? '#' + el.id : '';
                const cls = el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').slice(0, 2).join('.') : '';
                offendingSelectors.push(tag + id + cls);
                if (offendingSelectors.length >= 3) break;
              }
            }
          }

          // Alvos de toque pequenos em mobile (< 44px)
          let smallTouchTargets = 0;
          if (${vp.isMobile}) {
            const interactive = document.querySelectorAll('button, a, input, select, textarea, [role="button"]');
            for (const el of interactive) {
              const rect = el.getBoundingClientRect();
              if (rect.width > 0 && rect.height > 0) {
                if (rect.width < 40 || rect.height < 40) {
                  smallTouchTargets++;
                }
              }
            }
          }

          return {
            clientWidth,
            scrollWidth,
            overflowX,
            overflowPixels: overflowX ? scrollWidth - clientWidth : 0,
            offendingSelectors,
            smallTouchTargets
          };
        })()
      `,
      returnByValue: true,
    });

    const audit = auditRes.result.value;

    // 3. Capturar screenshot
    const screenshotParams = {
      format: 'png',
      captureBeyondViewport: options.fullPage,
    };

    const screenshotData = await client.send('Page.captureScreenshot', screenshotParams);
    const fileName = `${vp.name}-${vp.width}x${vp.height}.png`;
    const filePath = path.join(resolvedOutDir, fileName);
    fs.writeFileSync(filePath, Buffer.from(screenshotData.data, 'base64'));

    const status = audit.overflowX ? '⚠️ OVERFLOW' : '✅ OK';
    console.log(`${status} (Salvo: ${fileName})`);

    results.push({
      ...vp,
      ...audit,
      filePath,
      fileName,
    });
  }

  // Limpar override para restaurar a janela original
  await client.send('Emulation.clearDeviceMetricsOverride');
  client.close();

  // Relatório Final
  console.log(`\n======================================================`);
  console.log(`📊 RESUMO DA AUDITORIA VISUAL MULTI-VIEWPORT`);
  console.log(`======================================================`);
  for (const r of results) {
    const icon = r.overflowX ? '❌' : '✅';
    console.log(`${icon} [${r.name}] ${r.label} (${r.width}px):`);
    console.log(`   - Largura do documento: ${r.scrollWidth}px (Viewport: ${r.clientWidth}px)`);
    if (r.overflowX) {
      console.log(`   - ⚠️ VAZAMENTO DETECTADO: +${r.overflowPixels}px de transbordamento horizontal`);
      if (r.offendingSelectors.length > 0) {
        console.log(`   - Elementos emissores prováveis: ${r.offendingSelectors.join(', ')}`);
      }
    } else {
      console.log(`   - ✅ Sem vazamento horizontal`);
    }
    if (r.isMobile) {
      console.log(`   - Alvos de toque interativos < 40px: ${r.smallTouchTargets}`);
    }
    console.log(`   - Screenshot gerado: ${r.filePath}\n`);
  }

  console.log(`🎉 Auditoria concluída! Abra os prints em ${resolvedOutDir} para inspecionar.`);
}

main().catch((err) => {
  console.error('\n❌ Erro durante inspeção visual:', err.message);
  process.exit(1);
});
