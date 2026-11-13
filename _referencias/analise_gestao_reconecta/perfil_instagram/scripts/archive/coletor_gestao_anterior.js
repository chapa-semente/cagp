import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const CACHE_RECONECTA = path.resolve('posts_cache.json');
const CACHE_ANTERIOR = path.resolve('posts_anterior_cache.json');
const MERGED_CSV = path.resolve('posts_comparativo_gestoes.csv');

const START_DATE = new Date('2025-08-01T00:00:00-03:00');
const END_DATE = new Date('2025-12-07T23:59:59-03:00');

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function coletarGestaoAnterior() {
  console.log('🚀 Iniciando Coletor da Gestão Anterior (01/08/2025 a 07/12/2025)...');
  
  let cachedAnterior = [];
  if (fs.existsSync(CACHE_ANTERIOR)) {
    try {
      cachedAnterior = JSON.parse(fs.readFileSync(CACHE_ANTERIOR, 'utf-8'));
      console.log(`📦 Encontrados ${cachedAnterior.length} posts no cache da gestão anterior.`);
    } catch (e) {}
  }

  const postsMap = new Map();
  for (const p of cachedAnterior) {
    postsMap.set(p.id, p);
  }

  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const page = browser.contexts()[0].pages()[0];

  await page.goto('https://www.instagram.com/cagp.ufmg/', { waitUntil: 'domcontentloaded' });
  await sleep(2500);

  // Scrolla para baixo para carregar os posts de 2025
  console.log('📜 Navegando pela grade até a faixa temporal de 2025...');
  const discoveredUrls = new Set();
  
  for (let s = 0; s < 25; s++) {
    const urls = await page.evaluate(() => Array.from(document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]')).map(a => a.href.split('?')[0]));
    urls.forEach(u => discoveredUrls.add(u));
    await page.evaluate(() => window.scrollBy(0, 1500));
    await sleep(1500);
  }

  const urlList = Array.from(discoveredUrls);
  console.log(`📋 Total de URLs mapeadas na grade: ${urlList.length}`);

  // Filtra posts que já sabemos serem da Reconecta
  const reconectaPosts = JSON.parse(fs.readFileSync(CACHE_RECONECTA, 'utf-8'));
  const reconectaIds = new Set(reconectaPosts.map(p => p.id));

  let stopReached = false;
  let novos = 0;

  for (let i = 0; i < urlList.length; i++) {
    if (stopReached) break;

    const url = urlList[i];
    const match = url.match(/\/(p|reel)\/([A-Za-z0-9_-]+)/);
    const id = match ? match[2] : null;
    if (!id || reconectaIds.has(id)) continue;

    if (postsMap.has(id)) {
      const ex = postsMap.get(id);
      if (ex.timestamp_iso && new Date(ex.timestamp_iso) < START_DATE) {
        console.log(`🛑 Post ${id} (${ex.data_formatada}) anterior a 01/08/2025.`);
        stopReached = true;
        break;
      }
      continue;
    }

    console.log(`\n📥 [${postsMap.size + 1}] Coletando post da gestão anterior: ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await sleep(2500 + Math.random() * 1500);

    const postData = await page.evaluate(() => {
      const timeEls = Array.from(document.querySelectorAll('time[datetime]'));
      let timestamp_iso = null;
      let data_formatada = '';
      if (timeEls.length > 0) {
        const postTimeEl = timeEls[timeEls.length - 1] || timeEls[0];
        timestamp_iso = postTimeEl.getAttribute('datetime');
        data_formatada = postTimeEl.textContent?.trim() || postTimeEl.getAttribute('title') || '';
      }

      const isBanned = (txt) => {
        if (!txt) return true;
        const t = txt.trim().toLowerCase();
        return (
          t === '•' ||
          t === 'edited' ||
          t.startsWith('edited') ||
          t.startsWith('add a thought') ||
          t.startsWith('drop an emoji') ||
          t.startsWith('tag a friend') ||
          t.startsWith('original audio') ||
          t.startsWith('áudio original') ||
          t.startsWith('liked by') ||
          t.startsWith('curtido por') ||
          t.includes('others') ||
          t.includes('outras pessoas') ||
          t === 'ufmg - universidade federal de minas gerais' ||
          t === 'espaço y' ||
          t === 'espaço verão' ||
          t === 'view all comments' ||
          t === 'ver todos os comentários' ||
          t === 'reply' ||
          t === 'responder' ||
          t === 'meta'
        );
      };

      let legenda = '';
      const spans = Array.from(document.querySelectorAll('article span, main span'));
      for (const s of spans) {
        const raw = (s.innerText || '').replace(/\u00a0/g, ' ').trim();
        if (raw.length > 25 && !isBanned(raw)) {
          const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 0);
          const cleanLines = lines.filter((line, idx) => {
            if (idx === 0 && (line.includes('cagp') || line.includes('cace') || line.includes('cacs') || line.includes('fenecap') || line.includes('casaufmg') || line.includes('tacadipietro') || line.includes('Verified') || !line.includes(' '))) return false;
            if (/^\d+[hdwms]$/i.test(line) || /^\d+\s*(horas?|dias?|sem|min|hours?|days?|ago|w|d|h)/i.test(line)) return false;
            if (line === 'Edited' || line === '•' || isBanned(line)) return false;
            return true;
          });
          const res = cleanLines.join('\n').trim();
          if (res.length > 20) {
            legenda = res;
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
      const allSpans = Array.from(document.querySelectorAll('section span, section div, main span'));
      for (const s of allSpans) {
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
      url,
      timestamp_iso: postData.timestamp_iso,
      data_formatada: dataFormatadaBr,
      tipo: postData.tipo,
      curtidas: postData.curtidas,
      comentarios: postData.comentarios,
      legenda: postData.legenda,
      gestao: 'Gestão Anterior (2025)'
    };

    postsMap.set(id, postItem);
    novos++;

    console.log(`   🗓️ Data: ${postItem.data_formatada} | Tipo: ${postItem.tipo} | Curtidas: ${postItem.curtidas}`);
    console.log(`   📝 Legenda: ${(postItem.legenda || '').replace(/[\r\n]+/g, ' ').slice(0, 80)}...`);

    fs.writeFileSync(CACHE_ANTERIOR, JSON.stringify(Array.from(postsMap.values()), null, 2), 'utf-8');

    if (parsedDate && parsedDate < START_DATE) {
      console.log(`🛑 Atingido post de ${postItem.data_formatada} (anterior a 01/08/2025). Encerrando coleta.`);
      stopReached = true;
      break;
    }
  }

  console.log(`\n✨ Coleta da Gestão Anterior finalizada! Total coletado: ${postsMap.size} posts.`);

  // Consolidar e gerar posts_comparativo_gestoes.csv
  const anteriorPostsValidos = Array.from(postsMap.values()).filter(p => {
    if (!p.timestamp_iso) return false;
    const dt = new Date(p.timestamp_iso);
    return dt >= START_DATE && dt <= END_DATE;
  });

  console.log(`✅ Posts válidos da gestão anterior no período (01/08/2025 a 07/12/2025): ${anteriorPostsValidos.length}`);

  const reconectaValidos = reconectaPosts.filter(p => {
    if (!p.timestamp_iso) return false;
    return new Date(p.timestamp_iso) >= new Date('2025-12-08T00:00:00-03:00');
  }).map(p => ({ ...p, gestao: 'Gestão Reconecta (2025-2026)' }));

  console.log(`✅ Posts válidos da Reconecta: ${reconectaValidos.length}`);

  const todosPosts = [...reconectaValidos, ...anteriorPostsValidos];

  // Helper de classificação simples
  const categorizar = (leg, url) => {
    const txt = (leg + ' ' + url).toLowerCase();
    if (txt.includes('desgovernados') || txt.includes('festa') || txt.includes('ingresso') || txt.includes('open bar') || txt.includes('lote') || txt.includes('espaço')) return 'Festas & Arrecadação';
    if (txt.includes('eleiç') || txt.includes('voto') || txt.includes('lula') || txt.includes('democracia') || txt.includes('assembleia') || txt.includes('dce') || txt.includes('nota pública') || txt.includes('repúdio')) return 'Representação & Política';
    if (txt.includes('aac') || txt.includes('tcc') || txt.includes('oportunidade') || txt.includes('palestra') || txt.includes('oficina') || txt.includes('educa') || txt.includes('acadêmico') || txt.includes('matrícula')) return 'Assuntos Acadêmicos';
    if (txt.includes('calouro') || txt.includes('manual') || txt.includes('sisu') || txt.includes('taça') || txt.includes('futsal') || txt.includes('sinuca') || txt.includes('jornal') || txt.includes('notícias')) return 'Integração & Esportes';
    if (txt.includes('salinha') || txt.includes('dívida') || txt.includes('prestação de contas') || txt.includes('lojinha') || txt.includes('processo seletivo')) return 'Gestão & Infraestrutura';
    return 'Geral & Comunicados';
  };

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""').replace(/[\r\n]+/g, ' ');
    return `"${str}"`;
  };

  const headers = [
    'id',
    'gestao',
    'data',
    'timestamp_iso',
    'tipo',
    'curtidas',
    'comentarios',
    'macro_categoria',
    'is_periodo_eleitoral',
    'is_calourada',
    'url',
    'legenda'
  ];

  const rows = todosPosts.map(p => {
    const cat = categorizar(p.legenda || '', p.url || '');
    const dt = new Date(p.timestamp_iso);
    const m = dt.getMonth() + 1; // 1 to 12
    const y = dt.getFullYear();
    
    // Período eleitoral: Setembro/Outubro de 2026 (Reconecta) ou Outubro/Novembro de 2025 (Anterior)
    const isEleitoral = (y === 2026 && (m === 9 || m === 10)) || (y === 2025 && (m === 10 || m === 11)) ? 1 : 0;
    
    // Período de calourada: Março/Abril ou Agosto/Setembro
    const isCalourada = (m === 3 || m === 4 || m === 8 || m === 9) ? 1 : 0;

    return [
      escapeCSV(p.id),
      escapeCSV(p.gestao),
      escapeCSV(p.data_formatada),
      escapeCSV(p.timestamp_iso),
      escapeCSV(p.tipo),
      p.curtidas ?? 0,
      p.comentarios ?? 0,
      escapeCSV(cat),
      isEleitoral,
      isCalourada,
      escapeCSV(p.url),
      escapeCSV(p.legenda)
    ].join(',');
  });

  fs.writeFileSync(MERGED_CSV, [headers.join(','), ...rows].join('\n'), 'utf-8');
  console.log(`📊 Base comparativa finalizada com ${todosPosts.length} posts: ${MERGED_CSV}`);
  process.exit(0);
}

coletarGestaoAnterior().catch(e => {
  console.error('❌ Erro:', e);
  process.exit(1);
});
