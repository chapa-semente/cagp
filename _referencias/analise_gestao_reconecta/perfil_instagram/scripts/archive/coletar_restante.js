import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const CACHE_FILE = path.resolve('posts_cache.json');
const CSV_FILE = path.resolve('posts_coletados.csv');
const MD_FILE = path.resolve('posts_coletados.md');
const targetSinceDate = new Date('2025-12-08T00:00:00-03:00');

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function exportToCSV(posts) {
  const headers = ['id', 'data', 'timestamp_iso', 'tipo', 'curtidas', 'comentarios', 'url', 'eixo_chapa', 'proposta_chapa', 'legenda_limpa'];
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
  fs.writeFileSync(CSV_FILE, [headers.join(','), ...rows].join('\n'), 'utf-8');
}

function exportToMD(posts) {
  const total = posts.length;
  const fotos = posts.filter(p => p.tipo === 'Foto').length;
  const carrosseis = posts.filter(p => p.tipo === 'Carrossel').length;
  const reels = posts.filter(p => p.tipo === 'Reels' || p.tipo === 'Vídeo').length;

  let md = `# Registro Estruturado de Publicações - @cagp.ufmg\n\n`;
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

async function coletarRestante() {
  console.log('🔄 Retomando coleta a partir do post 60...');
  const cachedPosts = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  const postsMap = new Map();
  for (const p of cachedPosts) {
    postsMap.set(p.id, p);
  }

  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const context = browser.contexts()[0];
  const page = context.pages()[0];

  // Garante que está no perfil e rola para baixo
  await page.goto('https://www.instagram.com/cagp.ufmg/', { waitUntil: 'domcontentloaded' });
  await sleep(2500);

  const allUrls = new Set();
  for (let s = 0; s < 18; s++) {
    const urls = await page.evaluate(() => Array.from(document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]')).map(a => a.href.split('?')[0]));
    urls.forEach(u => allUrls.add(u));
    await page.evaluate(() => window.scrollBy(0, 1500));
    await sleep(1500);
  }

  const urlList = Array.from(allUrls);
  console.log(`📋 Total de URLs descobertas na grade: ${urlList.length}`);

  let newFound = 0;
  for (let i = 0; i < urlList.length; i++) {
    const postUrl = urlList[i];
    const match = postUrl.match(/\/(p|reel)\/([A-Za-z0-9_-]+)/);
    const id = match ? match[2] : null;
    if (!id) continue;

    if (postsMap.has(id)) {
      continue;
    }

    console.log(`\n📥 Extraindo novo post (${postsMap.size + 1}): ${postUrl}`);
    await page.goto(postUrl, { waitUntil: 'domcontentloaded' });
    await sleep(3500 + Math.random() * 2000);

    const postData = await page.evaluate(() => {
      const timeEls = Array.from(document.querySelectorAll('time[datetime]'));
      let timestamp_iso = null;
      let data_formatada = '';
      if (timeEls.length > 0) {
        const postTimeEl = timeEls[timeEls.length - 1] || timeEls[0];
        timestamp_iso = postTimeEl.getAttribute('datetime');
        data_formatada = postTimeEl.textContent?.trim() || postTimeEl.getAttribute('title') || '';
      }

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

      let tipo = 'Foto';
      if (document.querySelector('video') || window.location.href.includes('/reel/')) {
        tipo = 'Reels';
      } else if (
        document.querySelector('button[aria-label*="Avançar"], button[aria-label*="Next"]') ||
        document.querySelectorAll('article ul li').length > 1
      ) {
        tipo = 'Carrossel';
      }

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

      return { timestamp_iso, data_formatada, legenda, tipo, curtidas, comentarios };
    });

    const parsedDate = postData.timestamp_iso ? new Date(postData.timestamp_iso) : null;
    let dataFormatadaBr = postData.data_formatada;
    if (parsedDate && !isNaN(parsedDate.getTime())) {
      dataFormatadaBr = parsedDate.toLocaleDateString('pt-BR');
    }

    const postItem = {
      id,
      url: postUrl,
      timestamp_iso: postData.timestamp_iso,
      data_formatada: dataFormatadaBr,
      tipo: postData.tipo,
      curtidas: postData.curtidas,
      comentarios: postData.comentarios,
      legenda: postData.legenda,
      isPinned: false
    };

    postsMap.set(id, postItem);
    newFound++;

    console.log(`   🗓️ Data: ${postItem.data_formatada} | Tipo: ${postItem.tipo} | Curtidas: ${postItem.curtidas} | Comentários: ${postItem.comentarios}`);
    console.log(`   📝 Prévia: ${(postItem.legenda || '').replace(/[\r\n]+/g, ' ').slice(0, 70)}...`);

    const currentList = Array.from(postsMap.values());
    fs.writeFileSync(CACHE_FILE, JSON.stringify(currentList, null, 2), 'utf-8');
    exportToCSV(currentList);
    exportToMD(currentList);

    // Se a data for anterior a 08/12/2025, para a coleta!
    if (parsedDate && parsedDate < targetSinceDate) {
      console.log(`\n🛑 Encontrado post de ${postItem.data_formatada} (anterior a 08/12/2025).`);
      console.log('✅ Coleta finalizada com precisão total até 08/12/2025!');
      break;
    }
  }

  console.log(`\n✨ Concluído! Novos posts adicionados: ${newFound}. Total acumulado: ${postsMap.size}.`);
  process.exit(0);
}

coletarRestante().catch(e => {
  console.error('❌ Erro:', e);
  process.exit(1);
});
