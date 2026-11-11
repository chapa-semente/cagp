// scrape-onibus-internos.mjs
// Coleta as linhas internas do campus Pampulha no site oficial da UFMG
// (https://www.ufmg.br/transporte/) e grava src/data/onibusInternos.json.
// O site passa a mostrar esse retrato estático (nada "ao vivo"): rode de novo
// quando a UFMG mudar horários:  node scripts/scrape-onibus-internos.mjs
import { writeFile } from 'node:fs/promises';

const INDEX = 'https://www.ufmg.br/transporte/';
const UA = 'Mozilla/5.0 (compatible; site-do-curso/1.0)';
const OUT = new URL('../src/data/onibusInternos.json', import.meta.url);

const get = async (url) => {
  const res = await fetch(url, { headers: { 'user-agent': UA } });
  if (!res.ok) throw new Error(`${res.status} em ${url}`);
  return res.text();
};

const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/´/g, "'");
const text = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const icons = (html) => [...html.matchAll(/<i[^>]*class="[^"]*\bti (ti-[a-z0-9-]+)/g)].map((m) => m[1]);

// Ramer–Douglas–Peucker: o GPX tem milhares de pontos; o desenho precisa de ~150.
function simplify(points, eps) {
  if (points.length < 3) return points;
  const [a, b] = [points[0], points[points.length - 1]];
  let max = 0;
  let idx = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const p = points[i];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1e-12;
    const d = Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / len;
    if (d > max) [max, idx] = [d, i];
  }
  if (max <= eps) return [a, b];
  return [...simplify(points.slice(0, idx + 1), eps).slice(0, -1), ...simplify(points.slice(idx), eps)];
}

async function scrapeLine(url) {
  const html = await get(url);
  const main = html.slice(html.indexOf('<main'), html.indexOf('<!-- #post-'));
  const nome = text(main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '');
  const periodo = text(main.match(/<\/h1>\s*<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1] ?? '');

  const stopsHtml = main.slice(main.indexOf('id="line-stops"'), main.indexOf('id="map"'));
  const paradas = [...stopsHtml.matchAll(/<button[^>]*data-lat="([^"]+)"[^>]*data-lon="([^"]+)"[^>]*>([\s\S]*?)<\/button>/g)].map(
    (m) => ({ nome: text(m[3]), lat: Number(Number(m[1]).toFixed(6)), lon: Number(Number(m[2]).toFixed(6)) }),
  );

  const horario = main.slice(main.indexOf('id="horario"'));
  const header = horario.match(/<header[\s\S]*?<\/header>/)?.[0] ?? '';
  const legenda = [...header.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)]
    .map((m) => ({ icone: icons(m[1])[0] ?? null, texto: text(m[1]) }))
    .filter((l) => l.texto);

  const turnos = [...horario.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>\s*<div[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g)].map((m) => ({
    turno: text(m[1]),
    partidas: [...m[2].matchAll(/<time[^>]*>([\s\S]*?)<\/time>/g)].map((t) => ({
      hora: text(t[1]).match(/\d{2}:\d{2}/)?.[0] ?? text(t[1]),
      marcas: icons(t[1]),
    })),
  }));

  const gpxUrl = html.match(/url:\s*'([^']+\.gpx)'/)?.[1]?.replace('ufmg.br//', 'ufmg.br/');
  let trajeto = [];
  if (gpxUrl) {
    const gpx = await get(gpxUrl);
    const pts = [...gpx.matchAll(/<(?:trkpt|rtept)[^>]*lat="([^"]+)"[^>]*lon="([^"]+)"/g)].map((m) => [Number(m[2]), Number(m[1])]);
    trajeto = simplify(pts, 0.00004).map(([lon, lat]) => [Number(lon.toFixed(5)), Number(lat.toFixed(5))]);
  }

  const slug = url.replace(/\/$/, '').split('/').pop();
  return { slug, nome, periodo, fonte: url, paradas, legenda, turnos, trajeto };
}

const index = await get(INDEX);
const urls = [...new Set([...index.matchAll(/href="(https:\/\/www\.ufmg\.br\/onibus\/[^"]+)"/g)].map((m) => m[1]))];
const linhas = [];
for (const url of urls) {
  const linha = await scrapeLine(url);
  const total = linha.turnos.reduce((n, t) => n + t.partidas.length, 0);
  console.log(`${linha.slug}: ${linha.paradas.length} paradas, ${total} partidas, ${linha.trajeto.length} pontos de trajeto`);
  linhas.push(linha);
}

const ordemPeriodo = ['Período Letivo', 'Sábado', 'Férias e Recessos'];
linhas.sort((a, b) => ordemPeriodo.indexOf(a.periodo) - ordemPeriodo.indexOf(b.periodo) || a.nome.localeCompare(b.nome, 'pt-BR'));

await writeFile(
  OUT,
  `${JSON.stringify({ coletadoEm: new Date().toLocaleDateString('sv-SE'), fonte: INDEX, contato: { setor: 'Divisão de Transportes', telefone: '(31) 3409-4601', email: 'sfrota@dsg.ufmg.br' }, linhas }, null, 1)}\n`,
);
console.log(`ok → ${OUT.pathname}`);
