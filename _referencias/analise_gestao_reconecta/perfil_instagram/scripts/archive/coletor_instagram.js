import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

// Argumentos via CLI
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const limitArg = args.find(a => a.startsWith('--limit='));
const maxLimit = limitArg ? parseInt(limitArg.split('=')[1], 10) : (isDryRun ? 3 : 200);
const sinceArg = args.find(a => a.startsWith('--since='));
// Data limite: 08 de dezembro de 2025
const targetSinceDate = sinceArg ? new Date(sinceArg.split('=')[1]) : new Date('2025-12-08T00:00:00-03:00');
const profileArg = args.find(a => a.startsWith('--profile='));
const profileName = profileArg ? profileArg.split('=')[1] : 'cagp.ufmg';

const CACHE_FILE = path.resolve('posts_cache.json');
const CSV_FILE = path.resolve('posts_coletados.csv');
const MD_FILE = path.resolve('posts_coletados.md');

// Helper para delay humano pseudoaleatório
function sleep(minMs, maxMs = null) {
  const ms = maxMs ? Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs : minMs;
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Carregar cache existente para suportar retomada incremental
function loadCache() {
  if (fs.existsSync(CACHE_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
      console.log(`📦 Cache encontrado com ${data.length} post(s) já coletados.`);
      return data;
    } catch (e) {
      console.warn('⚠️ Erro ao ler cache existente, iniciando novo:', e.message);
    }
  }
  return [];
}

function saveCache(posts) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(posts, null, 2), 'utf-8');
}

// Exportador para CSV seguro
function exportToCSV(posts) {
  const headers = [
    'id',
    'data',
    'timestamp_iso',
    'tipo',
    'curtidas',
    'comentarios',
    'url',
    'eixo_chapa',
    'proposta_chapa',
    'legenda_limpa'
  ];

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""').replace(/[\r\n]+/g, ' ');
    return `"${str}"`;
  };

  const rows = posts.map(p => [
    escapeCSV(p.id),
    escapeCSV(p.data_formatada),
    escapeCSV(p.timestamp_iso),
    escapeCSV(p.tipo),
    p.curtidas ?? 0,
    p.comentarios ?? 0,
    escapeCSV(p.url),
    escapeCSV(p.eixo_chapa || 'Não categorizado'),
    escapeCSV(p.proposta_chapa || 'Geral'),
    escapeCSV(p.legenda)
  ].join(','));

  const csvContent = [headers.join(','), ...rows].join('\n');
  fs.writeFileSync(CSV_FILE, csvContent, 'utf-8');
}

// Exportador para Markdown legível
function exportToMD(posts) {
  const total = posts.length;
  const fotos = posts.filter(p => p.tipo === 'Foto').length;
  const carrosseis = posts.filter(p => p.tipo === 'Carrossel').length;
  const reels = posts.filter(p => p.tipo === 'Reels' || p.tipo === 'Vídeo').length;

  let md = `# Registro Estruturado de Publicações - @${profileName}\n\n`;
  md += `> Período de Análise: **08/12/2025** até **${new Date().toLocaleDateString('pt-BR')}**\n`;
  md += `> Total de posts catalogados: **${total}**\n\n`;

  md += `### Resumo por Formato\n`;
  md += `| Formato | Quantidade | Percentual |\n`;
  md += `|---|---|---|\n`;
  md += `| 📸 Foto Única | ${fotos} | ${total ? ((fotos/total)*100).toFixed(1) : 0}% |\n`;
  md += `| 📑 Carrossel | ${carrosseis} | ${total ? ((carrosseis/total)*100).toFixed(1) : 0}% |\n`;
  md += `| 🎬 Reels/Vídeo | ${reels} | ${total ? ((reels/total)*100).toFixed(1) : 0}% |\n\n`;

  md += `### Tabela Cronológica de Publicações\n\n`;
  md += `| Data | Tipo | Curtidas | Comentários | Link | Resumo da Legenda |\n`;
  md += `|---|---|---|---|---|---|\n`;

  for (const p of posts) {
    const resumoLegenda = (p.legenda || '').replace(/[\r\n]+/g, ' ').slice(0, 80) + '...';
    md += `| ${p.data_formatada || '-'} | ${p.tipo} | ${p.curtidas ?? '-'} | ${p.comentarios ?? '-'} | [Ver post](${p.url}) | ${resumoLegenda} |\n`;
  }

  md += `\n---\n\n## Detalhamento Completo dos Posts\n\n`;
  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    md += `### Post ${i + 1} - [${p.data_formatada}] (${p.tipo})\n`;
    md += `- **URL**: ${p.url}\n`;
    md += `- **Data/Hora**: ${p.timestamp_iso || p.data_formatada}\n`;
    md += `- **Métricas**: ${p.curtidas ?? 0} curtidas | ${p.comentarios ?? 0} comentários\n`;
    md += `- **Legenda Integral**:\n\n`;
    md += `\`\`\`text\n${p.legenda || '(Sem legenda)'}\n\`\`\`\n\n`;
    md += `---\n\n`;
  }

  fs.writeFileSync(MD_FILE, md, 'utf-8');
}

async function coletarPosts() {
  console.log(`\n🚀 Iniciando Coletor Seguro do Instagram`);
  console.log(`🎯 Perfil: @${profileName}`);
  console.log(`📅 Limite inicial de corte: ${targetSinceDate.toISOString().split('T')[0]}`);
  if (isDryRun) console.log(`🧪 Modo Dry-Run ativo (limite máximo de ${maxLimit} posts)`);

  const postsMap = new Map();
  const cachedPosts = loadCache();
  for (const p of cachedPosts) {
    postsMap.set(p.id, p);
  }

  console.log('🔌 Conectando ao Chrome na porta 9222...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const contexts = browser.contexts();
  if (contexts.length === 0) {
    throw new Error('Nenhum contexto de navegador encontrado no Chrome.');
  }

  const context = contexts[0];
  let page = context.pages().find(p => p.url().includes('instagram.com'));
  
  if (!page) {
    console.log('🌐 Criando nova aba para acessar o Instagram...');
    page = await context.newPage();
  }

  const targetProfileUrl = `https://www.instagram.com/${profileName}/`;
  if (!page.url().includes(`instagram.com/${profileName}`)) {
    console.log(`🧭 Navegando para ${targetProfileUrl}...`);
    await page.goto(targetProfileUrl, { waitUntil: 'domcontentloaded' });
    await sleep(3500, 5000);
  } else {
    console.log(`✅ Já posicionado no perfil: ${page.url()}`);
  }

  // Verifica se está logado
  if (page.url().includes('/accounts/login/')) {
    console.error('❌ O Chrome não parece estar logado no Instagram!');
    console.error('Por favor, faça login na janela do Chrome e execute novamente.');
    return;
  }

  const processedUrls = new Set();
  for (const p of cachedPosts) {
    processedUrls.add(p.url);
  }

  let reachedCutoff = false;
  let consecutiveStops = 0;
  let scrollAttempts = 0;

  console.log('🔍 Iniciando fluxo contínuo de varredura e extração...');

  while (!reachedCutoff && postsMap.size < maxLimit) {
    // 1. Garante que está na página do perfil para ver a grade
    if (!page.url().endsWith(`/${profileName}/`) && !page.url().endsWith(`/${profileName}`)) {
      console.log('🔙 Retornando à página do perfil...');
      await page.goto(targetProfileUrl, { waitUntil: 'domcontentloaded' });
      await sleep(2500, 3500);
    }

    // 2. Extrai os links dos posts visíveis no DOM
    const visiblePosts = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]'));
      return anchors.map(a => {
        const href = a.getAttribute('href');
        const isPinned = !!a.querySelector('svg[aria-label*="fixad"], svg[aria-label*="Pin"], svg[aria-label*="pin"]');
        return {
          url: href.startsWith('http') ? href : `https://www.instagram.com${href}`,
          isPinned
        };
      });
    });

    // Filtra posts que ainda não foram processados nesta execução
    const newItems = visiblePosts.filter(item => !processedUrls.has(item.url.split('?')[0]));

    if (newItems.length === 0) {
      scrollAttempts++;
      if (scrollAttempts >= 5) {
        console.log('ℹ️ Não foram encontrados mais posts após 5 tentativas de rolagem. Fim do feed.');
        break;
      }
      console.log('📜 Rolando para carregar mais publicações...');
      await page.evaluate(() => window.scrollBy({ top: 900, behavior: 'smooth' }));
      await sleep(2500, 3500);
      continue;
    }

    scrollAttempts = 0;

    // Processa os posts encontrados
    for (const item of newItems) {
      if (reachedCutoff || postsMap.size >= maxLimit) break;

      const cleanUrl = item.url.split('?')[0];
      processedUrls.add(cleanUrl);

      const match = cleanUrl.match(/\/(p|reel)\/([A-Za-z0-9_-]+)/);
      const id = match ? match[2] : `post_${postsMap.size}`;

      if (postsMap.has(id)) {
        const existing = postsMap.get(id);
        console.log(`⏩ [${postsMap.size + 1}] Post ${id} já presente no cache (${existing.data_formatada}).`);
        if (existing.timestamp_iso) {
          const pDate = new Date(existing.timestamp_iso);
          if (pDate < targetSinceDate && postsMap.size > 3) {
            consecutiveStops++;
            if (consecutiveStops >= 2) {
              console.log(`🛑 Linha temporal atingiu posts anteriores a 08/12/2025 (${existing.data_formatada}).`);
              reachedCutoff = true;
              break;
            }
          }
        }
        continue;
      }

      console.log(`\n📥 [${postsMap.size + 1}] Acessando: ${cleanUrl}`);
      await page.goto(cleanUrl, { waitUntil: 'domcontentloaded' });
      await sleep(3500, 5500); // Intervalo de segurança anti-ban

      // Extrai dados no DOM do post
      const postData = await page.evaluate(() => {
        // 1. Data do post
        const timeEls = Array.from(document.querySelectorAll('time[datetime]'));
        let timestamp_iso = null;
        let data_formatada = '';
        if (timeEls.length > 0) {
          const postTimeEl = timeEls[timeEls.length - 1] || timeEls[0];
          timestamp_iso = postTimeEl.getAttribute('datetime');
          data_formatada = postTimeEl.textContent?.trim() || postTimeEl.getAttribute('title') || '';
        }

        // 2. Legenda do post limpa
        let legenda = '';
        const allSpans = Array.from(document.querySelectorAll('article span, main span'));
        for (const s of allSpans) {
          const text = s.innerText || '';
          if (text.length > 5 && !text.includes('Reply') && !text.includes('Responder') && !text.includes('View all') && !text.includes('Ver todos')) {
            const raw = text.replace(/\u00a0/g, ' ');
            const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 0);
            const cleanLines = lines.filter((l, idx) => {
              if (idx === 0 && (l.includes('cagp') || l.includes('fenecap') || l.includes('Verified') || !l.includes(' '))) return false;
              if (/^\d+[hdwms]$/i.test(l) || /^\d+\s*(horas?|dias?|sem|min|hours?|days?|ago)/i.test(l)) return false;
              return true;
            });
            const candLeg = cleanLines.join('\n').trim();
            if (candLeg.length > 0) {
              legenda = candLeg;
              break;
            }
          }
        }

        // 3. Tipo de post
        let tipo = 'Foto';
        if (document.querySelector('video') || window.location.href.includes('/reel/')) {
          tipo = 'Reels';
        } else if (
          document.querySelector('button[aria-label*="Avançar"], button[aria-label*="Next"]') ||
          document.querySelectorAll('article ul li').length > 1
        ) {
          tipo = 'Carrossel';
        }

        // 4. Curtidas e Comentários
        let curtidas = 0;
        let comentarios = 0;
        const spans = Array.from(document.querySelectorAll('section span, section div, main span'));
        for (const s of spans) {
          const txt = s.innerText?.trim() || '';
          const mCurtidas = txt.match(/([\d\.,]+)\s*(curtida|like)/i);
          if (mCurtidas) {
            curtidas = parseInt(mCurtidas[1].replace(/[\.,]/g, ''), 10) || 0;
          }
          const mComent = txt.match(/Ver todos os ([\d\.,]+) comentários/i) || txt.match(/View all ([\d\.,]+) comments/i);
          if (mComent) {
            comentarios = parseInt(mComent[1].replace(/[\.,]/g, ''), 10) || 0;
          }
        }

        if (curtidas === 0 || comentarios === 0) {
          const sections = Array.from(document.querySelectorAll('section'));
          for (const sec of sections) {
            const lines = (sec.innerText || '').split('\n').map(l => l.trim()).filter(l => /^\d+$/.test(l));
            if (lines.length >= 2) {
              comentarios = comentarios || parseInt(lines[0], 10);
              curtidas = curtidas || parseInt(lines[1], 10);
            }
          }
        }

        return {
          timestamp_iso,
          data_formatada,
          legenda,
          tipo,
          curtidas,
          comentarios
        };
      });

      const parsedDate = postData.timestamp_iso ? new Date(postData.timestamp_iso) : null;
      let dataFormatadaBr = postData.data_formatada;
      if (parsedDate && !isNaN(parsedDate.getTime())) {
        dataFormatadaBr = parsedDate.toLocaleDateString('pt-BR');
      }

      const postItem = {
        id,
        url: cleanUrl,
        timestamp_iso: postData.timestamp_iso,
        data_formatada: dataFormatadaBr,
        tipo: postData.tipo,
        curtidas: postData.curtidas,
        comentarios: postData.comentarios,
        legenda: postData.legenda,
        isPinned: item.isPinned
      };

      postsMap.set(id, postItem);

      console.log(`   🗓️ Data: ${postItem.data_formatada} | Tipo: ${postItem.tipo} | Curtidas: ${postItem.curtidas} | Comentários: ${postItem.comentarios}`);
      console.log(`   📝 Prévia: ${(postItem.legenda || '').replace(/[\r\n]+/g, ' ').slice(0, 80)}...`);

      // Salvamento incremental
      const currentList = Array.from(postsMap.values());
      saveCache(currentList);
      exportToCSV(currentList);
      exportToMD(currentList);

      // Verificação da data limite de corte (08/12/2025)
      // Posts fixados no topo (posições 1 a 3) não disparam o corte
      if (parsedDate && parsedDate < targetSinceDate) {
        if (postsMap.size > 3) {
          consecutiveStops++;
          console.log(`⚠️ Post com data (${postItem.data_formatada}) anterior a 08/12/2025 identificado (${consecutiveStops}/2).`);
          if (consecutiveStops >= 2) {
            console.log(`🛑 Chegamos ao limite de 08/12/2025 na linha cronológica! Encerrando coleta.`);
            reachedCutoff = true;
            break;
          }
        } else {
          console.log(`📌 Post mais antigo no topo identificado como fixado (${postItem.data_formatada}). Continuando.`);
        }
      } else {
        consecutiveStops = 0;
      }

      // Intervalo de segurança anti-ban entre acessos
      const waitTime = Math.floor(Math.random() * 2500) + 3500;
      console.log(`⏳ Aguardando ${(waitTime / 1000).toFixed(1)}s antes do próximo...`);
      await sleep(waitTime);
    }
  }

  console.log(`\n✨ Coleta concluída com sucesso!`);
  console.log(`📊 Total de posts coletados: ${postsMap.size}`);
  console.log(`📁 Arquivos atualizados:\n   - ${CACHE_FILE}\n   - ${CSV_FILE}\n   - ${MD_FILE}`);
  process.exit(0);
}

coletarPosts().catch(err => {
  console.error('❌ Erro na coleta:', err);
  process.exit(1);
});
