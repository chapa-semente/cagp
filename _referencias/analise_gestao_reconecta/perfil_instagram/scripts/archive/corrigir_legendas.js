import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const CACHE_FILE = path.resolve('posts_cache.json');
const CUTOFF_DATE = new Date('2025-12-08T00:00:00-03:00');

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function isSuspicious(leg) {
  if (!leg) return true;
  const t = leg.trim().toLowerCase();
  return (
    t.length < 25 ||
    t === '•' ||
    t === 'edited' ||
    t.startsWith('edited') ||
    t.startsWith('add a thought') ||
    t.startsWith('drop an emoji') ||
    t.startsWith('tag a friend') ||
    t.startsWith('original audio') ||
    t.startsWith('áudio original') ||
    t.startsWith('and ') ||
    t.includes('others') ||
    t.includes('outras pessoas') ||
    t === 'ufmg - universidade federal de minas gerais' ||
    t === 'espaço y' ||
    t === 'espaço verão'
  );
}

async function repararLegendas() {
  console.log('🔍 Iniciando auditoria e re-extração definitiva de legendas...');
  const posts = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));

  const postsParaCorrigir = posts.filter(p => {
    const dt = new Date(p.timestamp_iso);
    return dt >= CUTOFF_DATE && isSuspicious(p.legenda);
  });

  console.log(`📋 Total de posts no período: ${posts.filter(p => new Date(p.timestamp_iso) >= CUTOFF_DATE).length}`);
  console.log(`⚠️ Posts identificados para correção de legenda: ${postsParaCorrigir.length}`);

  if (postsParaCorrigir.length === 0) {
    console.log('✅ Nenhuma legenda suspeita encontrada!');
    return;
  }

  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const page = browser.contexts()[0].pages()[0];

  let corrigidos = 0;

  for (let i = 0; i < postsParaCorrigir.length; i++) {
    const item = postsParaCorrigir[i];
    console.log(`\n🔄 [${i + 1}/${postsParaCorrigir.length}] Re-extraindo: ${item.url} (${item.data_formatada})`);

    await page.goto(item.url, { waitUntil: 'domcontentloaded' });
    await sleep(2500 + Math.random() * 1000);

    const novaLegenda = await page.evaluate(() => {
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
          if (res.length > 20) return res;
        }
      }
      return '';
    });

    if (novaLegenda && novaLegenda.length > 0) {
      const target = posts.find(p => p.id === item.id);
      if (target) {
        target.legenda = novaLegenda;
        corrigidos++;
        console.log(`   ✅ Nova legenda capturada (${novaLegenda.length} chars): ${novaLegenda.replace(/[\r\n]+/g, ' ').slice(0, 80)}...`);
      }
    } else {
      console.log('   ⚠️ Não foi possível encontrar legenda adicional (pode ser post sem texto).');
    }

    fs.writeFileSync(CACHE_FILE, JSON.stringify(posts, null, 2), 'utf-8');
  }

  console.log(`\n✨ Concluída auditoria! Total de legendas reparadas: ${corrigidos}/${postsParaCorrigir.length}`);
  process.exit(0);
}

repararLegendas().catch(err => {
  console.error('❌ Erro:', err);
  process.exit(1);
});
