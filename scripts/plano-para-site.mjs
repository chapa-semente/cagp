// scripts/plano-para-site.mjs — Leva o plano de execução da Semente para o site (18/11/2026).
//
// Fonte: os 14 boletins e as fichas (seção 5) do plano, em
// _referencias/analise_gestao_reconecta/06-plano-de-execucao-semente/. Essa pasta não vai para o
// GitHub; o que vai é o resultado, src/data/planoExecucao.json, que as páginas /propostas/N leem.
// Mudou data ou valor no plano? Rode de novo:  node scripts/plano-para-site.mjs
//
// Desde 18/11/2026 o script também:
// - transcreve o plano inteiro, sem cortes, em src/data/planoCompleto.json (a página /chapa-semente/plano);
// - copia os PDFs (plano completo, resumo de uma página e os 14 boletins) e as capturas da pesquisa de
//   preços para public/documentos/plano-semente/. Regere os PDFs antes (gerador, sempre com --so).
//
// O que muda no caminho (decisões de tom do site, ver AJUSTES abaixo):
// - Sai a seção "Onde ler tudo" (aponta seções do PDF) e o pedido de voto (a faixa de voto já fecha a página).
// - Saem as frases com números da gestão que termina: o site só mostra o que a Semente fez e vai fazer
//   (decisão de 13/11/2026 para o tour e as propostas). Cada ajuste precisa casar uma vez só; se o texto
//   do boletim mudar e o ajuste deixar de casar, o script para e avisa.
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const pasta = join(raiz, '_referencias/analise_gestao_reconecta/06-plano-de-execucao-semente');
const saida = join(raiz, 'src/data/planoExecucao.json');

/** [boletim, trecho exato, troca]. */
const AJUSTES = [
  [1, ', a partir dos 226 lançamentos que a gestão que termina registrou em onze meses.', '.'],
  [1, '\nPonto de partida: no mandato 2025-2026 houve uma prestação de contas, reunida no fim.\n', '\n'],
  [4, ', e R$ 37.192,93 em entradas circularam em onze meses sem conta da entidade.', '.'],
  [13, 'e a lojinha existe: em 2026 movimentou cerca de R$ 3,9 mil e não deixou sobra.', 'e a lojinha já existe.'],
  [7, ' (seção 6.1 do plano).', '.'],
  [11, 'R$ 0,00. Em 2026, o CAGP pagou R$ 1.303,14 da abertura da Atlas Empresa Júnior. Neste plano,', 'R$ 0,00. Neste plano,'],
];
/** Mesma régua para as fichas do plano (custo em detalhe, quem responde). */
const AJUSTES_FICHA = [
  [11, 'Em 2026, o CAGP pagou R$ 1.303,14 da abertura da Atlas Empresa Júnior. ', ''],
];
const SECOES_FORA = new Set(['Onde ler tudo']);

const escapar = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const inline = (s) =>
  escapar(s.trim())
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/==(.+?)==/g, '<strong>$1</strong>');

function aplicar(texto, ajustes, n, onde) {
  for (const [alvo, de, para] of ajustes) {
    if (alvo !== n) continue;
    const vezes = texto.split(de).length - 1;
    if (vezes !== 1) throw new Error(`Ajuste do ${onde} ${n} casou ${vezes} vezes: "${de.trim().slice(0, 60)}…"`);
    texto = texto.replace(de, para);
  }
  return texto;
}

/** Primeira frase, sem cortar em abreviação de mês ("abr. 2027") nem em número ("1.261,90"). */
function primeiraFrase(s) {
  const re = /\.(\s+|$)/g;
  let m;
  while ((m = re.exec(s))) {
    const antes = s.slice(0, m.index);
    if (/\b(jan|fev|mar|abr|maio|jun|jul|ago|set|out|nov|dez|art|nº)$/i.test(antes)) continue;
    return s.slice(0, m.index + 1);
  }
  return s;
}
/** As fontes citam seções do PDF; no site basta o nome do plano. */
const semSecao = (s) => s.replace(/, seç(ão|ões) [\d.]+?( e [\d.]+?)?(?=\.(\s|$))/g, '');

const celulas = (linha) => linha.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

/** Lê um boletim: título, selo e as seções com parágrafos, listas e quadros. */
function lerBoletim(texto) {
  const linhas = texto.replace(/<!--[\s\S]*?-->/g, '').split('\n');
  const bol = { titulo: null, selo: null, secoes: [] };
  let secao = null;
  let tabela = null;
  let lista = null;
  const fecharLista = () => { lista = null; };
  for (let i = 0; i < linhas.length; i++) {
    const l = linhas[i];
    if (l.startsWith('# ')) {
      const m = l.slice(2).match(/^Proposta \d+: (.*)$/);
      const t = m ? m[1] : l.slice(2);
      const p = t.match(/^(.*?)==(.+?)==(.*)$/);
      bol.titulo = p ? { antes: p[1], marca: p[2], depois: p[3] } : { antes: t, marca: '', depois: '' };
      continue;
    }
    if (l.startsWith('::selo ')) { bol.selo = l.slice(7).trim(); continue; }
    if (l.startsWith('## ')) {
      fecharLista();
      const titulo = l.slice(3).trim();
      secao = titulo.includes('Vote Chapa') || SECOES_FORA.has(titulo) ? null : { titulo, blocos: [] };
      if (secao) bol.secoes.push(secao);
      continue;
    }
    if (!secao) continue;
    if (/^::(quadro|tabela) /.test(l)) {
      fecharLista();
      tabela = { titulo: l.replace(/^::(quadro|tabela) /, '').trim(), cabecalho: [], linhas: [], fonte: null };
      secao.blocos.push({ tabela });
      continue;
    }
    if (l.startsWith('::fonte ')) { if (tabela) tabela.fonte = inline(semSecao(l.slice(8))); tabela = null; continue; }
    if (l.startsWith('::')) continue;
    if (l.startsWith('|')) {
      if (!tabela) continue;
      if (/^\|[-\s|:]+\|$/.test(l.trim())) continue;
      if (!tabela.cabecalho.length) tabela.cabecalho = celulas(l).map(inline);
      else tabela.linhas.push(celulas(l).map(inline));
      continue;
    }
    if (l.startsWith('- ')) {
      const m = l.slice(2).match(/^\*\*(.+?)\*\*\s*(.*)$/);
      const item = m ? { forte: inline(m[1].replace(/:$/, '')), texto: inline(m[2]) } : { forte: '', texto: inline(l.slice(2)) };
      if (!lista) { lista = []; secao.blocos.push({ lista }); }
      lista.push(item);
      continue;
    }
    if (l.trim() === '') { fecharLista(); continue; }
    if (l.startsWith('**') && l.trim().endsWith('**') && !secao) continue;
    fecharLista();
    secao.blocos.push({ p: inline(l) });
  }
  return bol;
}

/**
 * Lê as fichas do plano: custo, a nota do custo e quem responde. As 14 da seção 5 têm número; as que
 * vieram de estudantes (seção 6.4 em diante, desde 22/11/2026) têm "E1", "E2"…, guardadas como "e1".
 */
function lerFichas(plano) {
  const fichas = new Map();
  const partes = plano.split(/^::figura ficha \| /m).slice(1);
  for (const parte of partes) {
    const rotulo = parte.split('|')[0].trim();
    const n = /^\d+$/.test(rotulo) ? Number(rotulo) : rotulo.toLowerCase();
    const campos = {};
    for (const l of parte.split('\n').slice(1)) {
      if (!l.startsWith('|')) { if (Object.keys(campos).length) break; continue; }
      const [campo, ...resto] = celulas(l);
      campos[campo] = resto.join(' | ');
    }
    const ajustado = (s) => aplicar(s, AJUSTES_FICHA.filter(([, de]) => s.includes(de)), n, 'ficha');
    const detalhe = ajustado(campos['Custo, em detalhe'] ?? '');
    fichas.set(n, {
      custo: campos['Custo'],
      custoNota: inline(primeiraFrase(detalhe)),
      quemResponde: inline(ajustado(campos['Quem responde'] ?? '')),
    });
  }
  return fichas;
}

const plano = readFileSync(join(pasta, 'plano.md'), 'utf8').split('<!-- NÃO PUBLICAR')[0];
const fichas = lerFichas(plano);
const arquivos = readdirSync(join(pasta, 'boletins')).filter((f) => /^\d\d-.*\.md$/.test(f)).sort();

const propostas = arquivos.map((arquivo) => {
  const n = Number(arquivo.slice(0, 2));
  const texto = aplicar(readFileSync(join(pasta, 'boletins', arquivo), 'utf8'), AJUSTES, n, 'boletim');
  const bol = lerBoletim(texto);
  const ficha = fichas.get(n);
  if (!ficha) throw new Error(`Ficha da proposta ${n} não encontrada no plano.`);
  const carta = bol.secoes.find((s) => s.titulo === 'O que a carta diz');
  const quando = bol.secoes.find((s) => s.titulo === 'O que você vai ver e quando');
  if (!carta || !quando) throw new Error(`Boletim ${arquivo} sem "O que a carta diz" ou "O que você vai ver e quando".`);
  return {
    id: n,
    boletimPdf: `/documentos/plano-semente/boletim-${arquivo.replace(/\.md$/, '.pdf')}`,
    titulo: bol.titulo,
    selo: bol.selo,
    ...ficha,
    daCartaAoPlano: carta.blocos.filter((b) => b.p).map((b) => b.p),
    quando: quando.blocos.flatMap((b) => b.lista ?? []),
    secoes: bol.secoes.filter((s) => s !== carta && s !== quando),
  };
});

if (propostas.length !== 14) throw new Error(`Esperava 14 boletins, achei ${propostas.length}.`);

// Propostas que vieram de estudantes (22/11/2026): boletim "e1-nome.md" e ficha "E1" na seção 6.4.
// Mesmo formato das 14; "O que o estudante sugeriu" ocupa o lugar de "O que a carta diz".
const arquivosEstudantes = readdirSync(join(pasta, 'boletins')).filter((f) => /^e\d+-.*\.md$/.test(f)).sort();
const deEstudantes = arquivosEstudantes.map((arquivo) => {
  const id = arquivo.split('-')[0];
  const bol = lerBoletim(readFileSync(join(pasta, 'boletins', arquivo), 'utf8'));
  const ficha = fichas.get(id);
  if (!ficha) throw new Error(`Ficha da proposta de estudante ${id.toUpperCase()} não encontrada no plano.`);
  // "De estudante nº 1: quatro ações…" — o título do site é só o que vem depois dos dois-pontos.
  const t = bol.titulo;
  const semRotulo = (s) => s.replace(/^De estudante nº \d+:\s*/, '');
  const titulo = t.antes.startsWith('De estudante') ? { ...t, antes: semRotulo(t.antes) } : t;
  const sugeriu = bol.secoes.find((s) => s.titulo === 'O que o estudante sugeriu');
  const quando = bol.secoes.find((s) => s.titulo === 'O que você vai ver e quando');
  if (!sugeriu || !quando) throw new Error(`Boletim ${arquivo} sem "O que o estudante sugeriu" ou "O que você vai ver e quando".`);
  return {
    id,
    numero: Number(id.slice(1)),
    boletimPdf: `/documentos/plano-semente/boletim-${arquivo.replace(/\.md$/, '.pdf')}`,
    titulo,
    selo: bol.selo,
    ...ficha,
    daCartaAoPlano: sugeriu.blocos.filter((b) => b.p).map((b) => b.p),
    quando: quando.blocos.flatMap((b) => b.lista ?? []),
    secoes: bol.secoes.filter((s) => s !== sugeriu && s !== quando),
  };
});

const dados = {
  pdfCompleto: '/documentos/plano-semente/plano-de-execucao-semente.pdf',
  pdfResumo: '/documentos/plano-semente/plano-semente-em-uma-pagina.pdf',
  aviso: 'Gerado por scripts/plano-para-site.mjs a partir do plano de execução. Não edite à mão.',
  mandato: 'dezembro de 2026 a outubro de 2027',
  paginas: Number(execFileSync('pdfinfo', [join(pasta, 'plano-semente.pdf')], { encoding: 'utf8' }).match(/Pages:\s+(\d+)/)?.[1]),
  propostas,
  deEstudantes,
};
writeFileSync(saida, JSON.stringify(dados, null, 2) + '\n');
console.log(`planoExecucao.json: ${propostas.length} propostas e ${deEstudantes.length} de estudantes; plano com ${dados.paginas} páginas.`);

// ---------------------------------------------------------------------------------------------------
// O plano inteiro, transcrito (18/11/2026). Mesmo leitor do gerador de PDF (_gerador-pdf/src/md.ts),
// com o texto já em HTML seguro e os elementos numerados como no PDF (Quadro 6, Tabela 2, Figura 3),
// para que as remissões do texto ("ver o Quadro 35") batam com a página.
const inlineDoc = (s) =>
  inline(s).replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?![*\w])/g, '$1<em>$2</em>').replace(/`([^`]+)`/g, '<code>$1</code>');
const slug = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function lerDocumento(md) {
  const ls = md.split('<!-- NÃO PUBLICAR')[0].replace(/<!--[\s\S]*?-->/g, '').split('\n');
  const out = [];
  const conta = { quadro: 0, tabela: 0, figura: 0 };
  const ids = new Set();
  let i = 0;
  const tabela = () => {
    const rows = [];
    while (i < ls.length && ls[i].startsWith('|')) rows.push(celulas(ls[i++]));
    return { cab: rows[0] ?? [], linhas: rows.slice(2) };
  };
  while (i < ls.length) {
    const l = ls[i];
    if (!l.trim()) { i++; continue; }
    const h = l.match(/^(#{1,4}) (.*)$/);
    if (h) {
      const texto = h[2].trim();
      let id = slug(texto) || 'secao';
      while (ids.has(id)) id += '-b';
      ids.add(id);
      out.push({ t: 'h', n: h[1].length, id, html: inlineDoc(texto) });
      i++;
      continue;
    }
    if (l.trim() === '---') { i++; continue; }
    const el = l.match(/^::(quadro|tabela|figura) (.*)$/);
    if (el) {
      i++;
      const classe = el[1];
      let tipo = classe;
      let titulo = el[2].trim();
      if (classe === 'figura') { const [a, ...b] = titulo.split('|'); tipo = a.trim(); titulo = b.join('|').trim(); }
      while (i < ls.length && !ls[i].trim()) i++;
      const tb = i < ls.length && ls[i].startsWith('|') ? tabela() : { cab: [], linhas: [] };
      while (i < ls.length && !ls[i].trim()) i++;
      let fonte = '';
      if (i < ls.length && ls[i].startsWith('::fonte ')) fonte = ls[i++].slice(8).trim();
      // A ficha de proposta e o "plano em números" do resumo não entram na numeração, como no PDF.
      const semNumero = tipo === 'ficha' || tipo === 'olhada';
      if (!semNumero) conta[classe]++;
      const bloco = {
        t: 'elemento', classe, tipo, numero: semNumero ? null : conta[classe], titulo: inlineDoc(titulo),
        cab: tb.cab.map(inlineDoc), linhas: tb.linhas.map((r) => r.map(inlineDoc)), fonte: fonte ? inlineDoc(fonte) : '',
      };
      if (tipo === 'ficha') {
        // "::figura ficha | nº | nome | situação | arte | leitura | eixo": o título é o próprio cabeçalho.
        // A ficha "E1" é da proposta de estudante nº 1 (22/11/2026).
        const [n, nome, situacao, , leitura, eixo] = titulo.split('|').map((x) => x.trim());
        const rotulo = /^E\d+$/.test(n) ? `De estudante nº ${n.slice(1)}` : `Proposta ${n}`;
        Object.assign(bloco, { titulo: inlineDoc(`${rotulo}: ${nome}`), ficha: { situacao, leitura, eixo } });
        bloco.linhas = tb.linhas.map(([campo, conteudo]) => [inlineDoc(campo), ...String(conteudo ?? '').split(' // ').map(inlineDoc)]);
      }
      if (tipo.startsWith('imagens:')) {
        const arquivo = tipo.slice(8).split('/').pop().replace(/\.png$/i, '.webp');
        Object.assign(bloco, { tipo: 'imagem', imagem: `/documentos/plano-semente/${arquivo}` });
      }
      out.push(bloco);
      continue;
    }
    const meta = l.match(/^::([a-zç-]+) (.*)$/);
    if (meta) { out.push({ t: 'meta', chave: meta[1], valor: inlineDoc(meta[2]) }); i++; continue; }
    if (l.startsWith('> ')) {
      const par = [];
      while (i < ls.length && ls[i].startsWith('> ')) par.push(ls[i++].slice(2).trim());
      out.push({ t: 'nota', html: inlineDoc(par.join(' ')) });
      continue;
    }
    if (/^(- |\d+\. )/.test(l)) {
      const ord = !l.startsWith('- ');
      const itens = [];
      while (i < ls.length && /^(- |\d+\. )/.test(ls[i])) itens.push(inlineDoc(ls[i++].replace(/^(- |\d+\. )/, '')));
      out.push({ t: 'lista', ord, itens });
      continue;
    }
    const par = [];
    while (i < ls.length && ls[i].trim() && !/^(#{1,4} |\||- |\d+\. |---\s*$|::|> )/.test(ls[i])) par.push(ls[i++].trim());
    out.push({ t: 'p', html: inlineDoc(par.join(' ')) });
  }
  return out;
}

const planoMd = readFileSync(join(pasta, 'plano.md'), 'utf8');
const blocos = lerDocumento(planoMd);
const titulo = blocos.find((b) => b.t === 'h' && b.n === 1);
writeFileSync(
  join(raiz, 'src/data/planoCompleto.json'),
  JSON.stringify({ aviso: dados.aviso, titulo: titulo?.html ?? '', blocos: blocos.filter((b) => b !== titulo) }) + '\n',
);
console.log(`planoCompleto.json: ${blocos.length} blocos, ${blocos.filter((b) => b.t === 'elemento').length} quadros, tabelas e figuras.`);

// Os PDFs e as capturas, para baixar e abrir no site.
const destino = join(raiz, 'public/documentos/plano-semente');
mkdirSync(destino, { recursive: true });
const mdDoBoletim = (pdf) => {
  const chave = pdf.match(/boletim-(\d\d|e\d+)-/)[1];
  return [...arquivos, ...arquivosEstudantes].find((f) => f.split('-')[0] === chave);
};
const copiar = (de, para) => {
  if (!existsSync(de)) throw new Error(`Falta ${de}: gere o PDF antes.`);
  if (statSync(de).mtimeMs < statSync(join(pasta, de.includes('boletim-') ? 'boletins' : '', de.includes('uma-pagina') ? 'plano-em-uma-pagina.md' : de.includes('boletim-') ? mdDoBoletim(de) : 'plano.md')).mtimeMs - 1000) {
    console.warn(`Aviso: ${de.split('/').pop()} é mais antigo que o Markdown dele. Regere o PDF.`);
  }
  copyFileSync(de, join(destino, para));
};
copiar(join(pasta, 'plano-semente.pdf'), 'plano-de-execucao-semente.pdf');
copiar(join(pasta, 'plano-semente-em-uma-pagina.pdf'), 'plano-semente-em-uma-pagina.pdf');
for (const f of readdirSync(join(pasta, 'boletins')).filter((f) => /^boletim-(\d\d|e\d+)-.*\.pdf$/.test(f))) copiar(join(pasta, 'boletins', f), f);
// Capturas da pesquisa de preços (Apêndice A), em WebP.
for (const b of blocos.filter((b) => b.tipo === 'imagem')) {
  const nome = b.imagem.split('/').pop();
  const png = join(pasta, 'cotacoes', nome.replace(/\.webp$/, '.png'));
  execFileSync('cwebp', ['-quiet', '-q', '80', '-resize', '1200', '0', png, '-o', join(destino, nome)]);
}
console.log('PDFs e capturas copiados para public/documentos/plano-semente/.');
