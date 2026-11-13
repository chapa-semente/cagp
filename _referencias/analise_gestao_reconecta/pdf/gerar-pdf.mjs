// Gera os dois PDFs em A4: compila o montador (pdf/), serve localmente e imprime com o Chrome.
// O relatório é impresso duas vezes: a primeira descobre em que página cada seção caiu, a segunda
// preenche o sumário.  Uso: node gerar-pdf.mjs [--rascunho]
import { createRequire } from 'node:module';
import { execFile, execFileSync } from 'node:child_process';
import { promisify } from 'node:util';
import { existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.resolve(aqui, '../../..');
const saida = path.resolve(aqui, '..');

const doProjeto = createRequire(path.join(raiz, 'package.json'));
const doAstro = createRequire(doProjeto.resolve('astro/package.json'));
const vite = await import(pathToFileURL(doAstro.resolve('vite')).href);

const chrome = ['/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(existsSync);
if (!chrome) throw new Error('Chrome ou Chromium não encontrado.');

const config = path.join(aqui, 'vite.config.mjs');
const t0 = Date.now();
const passo = (m) => console.log(`[${((Date.now() - t0) / 1000).toFixed(1)}s] ${m}`);
await vite.build({ configFile: config, logLevel: 'error' });
passo('compilado');
const servidor = await vite.preview({ configFile: config, logLevel: 'warn', preview: { port: 4319, host: '127.0.0.1' } });
const base = servidor.resolvedUrls.local[0];
passo(`servindo em ${base}`);

// Assíncrono de propósito: o servidor roda neste mesmo processo e precisa responder ao Chrome.
const rodar = promisify(execFile);
async function imprimir(consulta, arquivo) {
  await rodar(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--hide-scrollbars',
    `--print-to-pdf=${arquivo}`, `${base}?${consulta}`], { timeout: 60000, killSignal: 'SIGKILL' });
  passo(`impresso ${path.basename(arquivo)}`);
}

/** Página (numeração impressa) em que aparece cada marca §§id§§. A capa não conta. */
function paginasDe(arquivo) {
  const texto = execFileSync('pdftotext', [arquivo, '-'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const mapa = {};
  texto.split('\f').forEach((pag, i) => {
    for (const m of pag.matchAll(/§§\s*([^§]+?)\s*§§/g)) if (!(m[1] in mapa)) mapa[m[1]] = i;
  });
  return mapa;
}

try {
  // Sem adesivo de rascunho por padrão; --rascunho recoloca.
  const sufixo = process.argv.includes('--rascunho') ? '&rascunho' : '';
  const feitos = [];
  for (const [doc, nome] of [['boletim', 'boletim-reconecta'], ['boletim2', 'boletim-carta-2027']]) {
    const arquivo = path.join(saida, `${nome}.pdf`);
    await imprimir(`doc=${doc}${sufixo}`, arquivo);
    feitos.push(arquivo);
  }
  for (const [doc, nome] of [['relatorio', 'relatorio-reconecta'], ['relatorio2', 'relatorio-carta-2027']]) {
    const arquivo = path.join(saida, `${nome}.pdf`);
    const provisorio = path.join(aqui, 'dist', 'provisorio.pdf');
    await imprimir(`doc=${doc}${sufixo}`, provisorio);
    const paginas = paginasDe(provisorio);
    await imprimir(`doc=${doc}${sufixo}&pag=${encodeURIComponent(JSON.stringify(paginas))}`, arquivo);
    rmSync(provisorio, { force: true });
    feitos.push(arquivo);
  }
  for (const f of feitos) {
    const n = execFileSync('pdfinfo', [f], { encoding: 'utf8' }).match(/Pages:\s+(\d+)/)?.[1];
    console.log(`${path.basename(f)}: ${n} páginas`);
  }
} finally {
  await new Promise((ok) => servidor.httpServer.close(ok));
}
