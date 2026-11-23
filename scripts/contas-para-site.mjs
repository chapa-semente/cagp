// scripts/contas-para-site.mjs — Leva a planilha de contas da gestão 2025–26 para o Portal da Transparência (23/11/2026).
//
// Fonte: a planilha que a gestão Reconecta divulgou com a Nota Técnica de Prestação de Contas nº 01/2026
// ("Relatório Resumido de Execução Orçamentária e Prestação de Contas", dez/2025 a out/2026), guardada em
// _referencias/analise_gestao_reconecta/01-fontes/prestacao-de-contas-2025-26/. Essa pasta não vai para o
// GitHub; o que vai é o resultado:
//   - src/data/contasCagp2025.json ............ o que a página /transparencia lê;
//   - public/documentos/transparencia/contas-cagp-2025-26.csv ..... a planilha do portal, para baixar;
//   - public/documentos/transparencia/prestacao-de-contas-reconecta-2025-26.xlsx ..... o original, sem alteração.
// Rodar:  node scripts/contas-para-site.mjs
//
// O que o script faz no caminho (decisões do Gabriel em 23/11/2026):
// - Nome de pessoa vira [pessoa] na página e no CSV (TROCAS_DE_NOME). O arquivo original vai inteiro.
// - Cada lançamento ganha uma rubrica, a mesma da Tabela 2 do plano de execução (CLASSIFICACAO). A planilha não
//   tem rubrica: a classificação é da Semente e a página diz isso.
// - O script para se alguma conta não fechar: o resumo da própria planilha (células B1 a B6), a Nota Técnica,
//   a Tabela 2 e o caixa mês a mês do plano. Cada troca de nome precisa casar o número de vezes previsto.
// Sem dependência: o .xlsx é um zip; o leitor abaixo usa só node:zlib.
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateRawSync } from 'node:zlib';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGEM = join(
  raiz,
  '_referencias/analise_gestao_reconecta/01-fontes/prestacao-de-contas-2025-26',
  'RELATÓRIO RESUMIDO DE EXECUÇÃO ORÇAMENTÁRIA E PRESTAÇÃO DE CONTAS.xlsx',
);
const SAIDA_JSON = join(raiz, 'src/data/contasCagp2025.json');
const PASTA_PUBLICA = join(raiz, 'public/documentos/transparencia');
const NOME_CSV = 'contas-cagp-2025-26.csv';
const NOME_ORIGINAL = 'prestacao-de-contas-reconecta-2025-26.xlsx';

/** [trecho exato na descrição, troca, quantas vezes aparece]. */
const TROCAS_DE_NOME = [
  ['PIX VITÓRIA CABRAL', 'PIX [pessoa] CABRAL', 1],
  ['MOLETOM REBECA', 'MOLETOM [pessoa]', 1],
  ['BEBIDAS - HIGOR', 'BEBIDAS - [pessoa]', 1],
  ['DJ ENZO MARTINS', 'DJ [pessoa]', 3],
  ['DJ GOOSE', 'DJ [pessoa]', 1],
  ['DJ VAN GOOF', 'DJ [pessoa]', 2],
  ['DJ MATH', 'DJ [pessoa]', 1],
];

/** As rubricas da Tabela 2 do plano de execução, na mesma ordem. */
const RUBRICAS = [
  { id: 'calourada-1', nome: 'Calourada do 1º semestre', curto: 'Calourada 1º sem.' },
  { id: 'calourada-2', nome: 'Calourada do 2º semestre', curto: 'Calourada 2º sem.' },
  { id: 'festas', nome: 'Festas menores e bar', curto: 'Festas e bar' },
  { id: 'lojinha', nome: 'Lojinha', curto: 'Lojinha' },
  { id: 'salinha', nome: 'Vendas na salinha', curto: 'Salinha' },
  { id: 'rendimento', nome: 'Rendimento da aplicação', curto: 'Rendimento' },
  { id: 'seguro', nome: 'Seguro da conta e carreto', curto: 'Seguro e carreto' },
  { id: 'divida', nome: 'Pagamento da dívida', curto: 'Dívida' },
  { id: 'ej', nome: 'Abertura da Empresa Júnior', curto: 'Empresa Júnior' },
];

/** Tabela 2 do plano (seção 7.1), em centavos: [entrou, saiu]. O script confere rubrica por rubrica. */
const TABELA_2_DO_PLANO = {
  'calourada-1': [1225451, 817970],
  'calourada-2': [1111400, 763383],
  festas: [880838, 626085],
  lojinha: [390501, 391140],
  salinha: [103700, 75348],
  rendimento: [7403, 0],
  seguro: [0, 17000],
  divida: [0, 407350],
  ej: [0, 130314],
};

/** Figura "O caixa de 2026 mês a mês" do plano, em centavos: [entradas, saídas, saldo no fim do mês]. */
const CAIXA_DO_PLANO = {
  '2025-12': [53400, 73808, 46323],
  '2026-01': [4800, 1000, 50123],
  '2026-02': [0, 0, 50123],
  '2026-03': [800035, 384733, 465425],
  '2026-04': [1013684, 1308213, 170896],
  '2026-05': [51700, 47000, 175596],
  '2026-06': [241586, 162311, 254871],
  '2026-07': [0, 9000, 245871],
  '2026-08': [782709, 352362, 676218],
  '2026-09': [755401, 755349, 676270],
  '2026-10': [15978, 134814, 557434],
};

/** Nota Técnica nº 01/2026 (minuta), seções 3 a 5, em centavos. */
const NOTA_TECNICA = { receitas: 3719293, despesas: 3228590, contaDigital: 518434, especie: 39000, saldo: 557434 };

/** Lançamentos que a regra geral não resolve: [linha da planilha, rubrica, por quê]. */
const EXCECOES = [
  [
    221,
    'calourada-2',
    'A planilha não diz o evento. A compra foi feita em 12/09, um dia depois da segunda calourada, e o plano a conta nela.',
  ],
];

/**
 * Regra geral, pela descrição (já com o nome trocado). A primeira que casar vale.
 * Calourada se divide pela data: até junho é a do 1º semestre.
 */
function classificar(desc, dataIso) {
  if (/PAGAMENTO DÍVIDA/.test(desc)) return 'divida';
  if (/ATLAS EMPRESA JÚNIOR/.test(desc)) return 'ej';
  if (/RENDIMENTO/.test(desc)) return 'rendimento';
  if (/SEGURO|CARRETO/.test(desc)) return 'seguro';
  if (/CALOURADA|XEQUE MATE|^PAGAMENTO DJ|^ADIANTAMENTO DJ/.test(desc)) {
    return Number(dataIso.slice(5, 7)) <= 6 && dataIso.startsWith('2026') ? 'calourada-1' : 'calourada-2';
  }
  if (/LOJINHA|CANECA|CAMISA|BOTTONS|MOLETOM/.test(desc)) return 'lojinha';
  if (/SALINHA/.test(desc) && !/NA TORA/.test(desc)) return 'salinha';
  return 'festas';
}

// ---------------------------------------------------------------------------------------------
// Leitor mínimo de .xlsx (zip + XML da aba)

function lerZip(buf) {
  let fim = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      fim = i;
      break;
    }
  }
  if (fim < 0) throw new Error('O arquivo não parece um .xlsx (zip sem diretório central).');
  const total = buf.readUInt16LE(fim + 10);
  let p = buf.readUInt32LE(fim + 16);
  const arquivos = new Map();
  for (let n = 0; n < total; n++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error('Diretório central do zip corrompido.');
    const metodo = buf.readUInt16LE(p + 10);
    const tamanho = buf.readUInt32LE(p + 20);
    const nomeLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const comentarioLen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const nome = buf.toString('utf8', p + 46, p + 46 + nomeLen);
    const inicio = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const bruto = buf.subarray(inicio, inicio + tamanho);
    arquivos.set(nome, metodo === 8 ? inflateRawSync(bruto) : Buffer.from(bruto));
    p += 46 + nomeLen + extraLen + comentarioLen;
  }
  return arquivos;
}

const desescapar = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');

const textos = (xml) => [...xml.matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g)].map((m) => desescapar(m[1])).join('');

function lerAba(arquivos) {
  const compartilhados = arquivos.has('xl/sharedStrings.xml')
    ? [...arquivos.get('xl/sharedStrings.xml').toString('utf8').matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) => textos(m[1]))
    : [];
  const livro = arquivos.get('xl/workbook.xml').toString('utf8');
  const nomeDaAba = desescapar(/<sheet\s[^>]*name="([^"]+)"/.exec(livro)[1]);
  const xml = arquivos.get('xl/worksheets/sheet1.xml').toString('utf8');
  const celulas = new Map();
  for (const m of xml.matchAll(/<c\s+r="([A-Z]+\d+)"([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
    const [, ref, attrs, corpo = ''] = m;
    const tipo = /\bt="([^"]+)"/.exec(attrs)?.[1] ?? 'n';
    const v = /<v>([\s\S]*?)<\/v>/.exec(corpo)?.[1];
    let valor = null;
    if (tipo === 's' && v != null) valor = compartilhados[Number(v)];
    else if (tipo === 'inlineStr') valor = textos(corpo);
    else if (tipo === 'str' && v != null) valor = desescapar(v);
    else if (tipo === 'b' && v != null) valor = v === '1';
    else if (v != null) valor = Number(v);
    if (valor !== null && valor !== '') celulas.set(ref, valor);
  }
  return { nomeDaAba, celulas };
}

// ---------------------------------------------------------------------------------------------

const centavos = (n) => Math.round(Number(n) * 100);
const dataDoExcel = (serial) => new Date(Date.UTC(1899, 11, 30) + Math.round(serial) * 86400000).toISOString().slice(0, 10);
const reais = (c) => {
  const s = (Math.abs(c) / 100).toFixed(2).split('.');
  return `${c < 0 ? '− ' : ''}R$ ${s[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${s[1]}`;
};
function conferir(rotulo, obtido, esperado) {
  if (obtido !== esperado) throw new Error(`${rotulo} não confere: deu ${reais(obtido)}, o esperado é ${reais(esperado)}.`);
}

const bufOriginal = readFileSync(ORIGEM);
const { nomeDaAba, celulas } = lerAba(lerZip(bufOriginal));

const CABECALHO = { A7: 'DATA', B7: 'ENTRADA', C7: 'SAÍDA', D7: 'VALOR FÍSICO?', E7: 'FATO CAUSADOR', F7: 'OBSERVAÇÃO' };
for (const [ref, texto] of Object.entries(CABECALHO)) {
  if (String(celulas.get(ref) ?? '').trim() !== texto) {
    throw new Error(`A planilha mudou de formato: ${ref} deveria ser "${texto}" e é "${celulas.get(ref)}".`);
  }
}

const caixaInicial = centavos(celulas.get('B6'));
const resumoDaPlanilha = {
  saldo: centavos(celulas.get('B1')),
  contaDigital: centavos(celulas.get('B2')),
  especie: centavos(celulas.get('B3')),
  entradasComCaixa: centavos(celulas.get('B4')),
  saidas: centavos(celulas.get('B5')),
  caixaInicial,
};

const ultimaLinha = Math.max(...[...celulas.keys()].map((r) => Number(r.replace(/^[A-Z]+/, ''))));
const usosDaTroca = new Map(TROCAS_DE_NOME.map(([de]) => [de, 0]));
const excecoes = new Map(EXCECOES.map(([linha, rubrica, porque]) => [linha, { rubrica, porque }]));
const excecoesUsadas = new Set();

const lancamentos = [];
let saldo = caixaInicial;
let saldoMinimo = { valor: Infinity, data: '', linha: 0 };
for (let linha = 8; linha <= ultimaLinha; linha++) {
  const data = celulas.get(`A${linha}`);
  const entrada = celulas.get(`B${linha}`);
  const saida = celulas.get(`C${linha}`);
  const original = celulas.get(`E${linha}`);
  if (data == null && entrada == null && saida == null && original == null) continue;
  if (typeof data !== 'number' || typeof original !== 'string') throw new Error(`Linha ${linha} sem data ou sem descrição.`);
  if ((entrada == null) === (saida == null)) throw new Error(`Linha ${linha}: precisa de entrada ou saída, uma só.`);

  let descricao = original.trim().replace(/\s+/g, ' ');
  let nomeTrocado = false;
  for (const [de, para] of TROCAS_DE_NOME) {
    if (descricao.includes(de)) {
      descricao = descricao.replace(de, para);
      usosDaTroca.set(de, usosDaTroca.get(de) + 1);
      nomeTrocado = true;
    }
  }
  if (/\b(VITÓRIA|REBECA|HIGOR|ENZO|GOOSE|GOOF|MATH)\b/.test(descricao)) throw new Error(`Linha ${linha}: sobrou nome em "${descricao}".`);

  const dataIso = dataDoExcel(data);
  const excecao = excecoes.get(linha);
  if (excecao) excecoesUsadas.add(linha);
  const rubrica = excecao?.rubrica ?? classificar(descricao, dataIso);
  const valor = centavos(entrada ?? saida);
  const tipo = entrada != null ? 'entrada' : 'saida';
  saldo += tipo === 'entrada' ? valor : -valor;
  if (saldo < saldoMinimo.valor) saldoMinimo = { valor: saldo, data: dataIso, linha };

  const obs = celulas.get(`F${linha}`);
  lancamentos.push({
    linha,
    data: dataIso,
    tipo,
    valor,
    descricao,
    rubrica,
    especie: String(celulas.get(`D${linha}`) ?? '').trim().toUpperCase() === 'SIM',
    saldo,
    ...(nomeTrocado ? { nomeTrocado: true } : {}),
    ...(excecao ? { nota: excecao.porque } : {}),
    ...(obs ? { observacao: String(obs).trim() } : {}),
  });
}

for (const [de, , vezes] of TROCAS_DE_NOME) {
  if (usosDaTroca.get(de) !== vezes) throw new Error(`A troca de nome "${de}" casou ${usosDaTroca.get(de)} vez(es); o previsto é ${vezes}.`);
}
for (const [linha] of EXCECOES) {
  if (!excecoesUsadas.has(linha)) throw new Error(`A exceção da linha ${linha} não encontrou o lançamento.`);
}

// Totais: planilha, Nota Técnica e plano.
const soma = (lista, tipo) => lista.filter((l) => l.tipo === tipo).reduce((t, l) => t + l.valor, 0);
const entradas = soma(lancamentos, 'entrada');
const saidas = soma(lancamentos, 'saida');
const especie = lancamentos.reduce((t, l) => (l.especie ? t + (l.tipo === 'entrada' ? l.valor : -l.valor) : t), 0);
conferir('Entradas + caixa inicial (célula B4)', entradas + caixaInicial, resumoDaPlanilha.entradasComCaixa);
conferir('Saídas (célula B5)', saidas, resumoDaPlanilha.saidas);
conferir('Saldo (célula B1)', saldo, resumoDaPlanilha.saldo);
conferir('Valor em espécie (célula B3)', especie, resumoDaPlanilha.especie);
conferir('Conta digital (célula B2)', saldo - especie, resumoDaPlanilha.contaDigital);
conferir('Receitas da Nota Técnica', entradas, NOTA_TECNICA.receitas);
conferir('Despesas da Nota Técnica', saidas, NOTA_TECNICA.despesas);
conferir('Conta digital da Nota Técnica', saldo - especie, NOTA_TECNICA.contaDigital);
conferir('Espécie da Nota Técnica', especie, NOTA_TECNICA.especie);
conferir('Saldo da Nota Técnica', saldo, NOTA_TECNICA.saldo);

const rubricas = RUBRICAS.map((r) => {
  const daRubrica = lancamentos.filter((l) => l.rubrica === r.id);
  const entrou = soma(daRubrica, 'entrada');
  const saiu = soma(daRubrica, 'saida');
  const [planoEntrou, planoSaiu] = TABELA_2_DO_PLANO[r.id];
  conferir(`Tabela 2, ${r.nome} (entrou)`, entrou, planoEntrou);
  conferir(`Tabela 2, ${r.nome} (saiu)`, saiu, planoSaiu);
  return { ...r, entrou, saiu, sobrou: entrou - saiu, lancamentos: daRubrica.length };
});

const NOMES_DOS_MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const meses = Object.entries(CAIXA_DO_PLANO).map(([id, [planoEntradas, planoSaidas, planoSaldo]]) => {
  const doMes = lancamentos.filter((l) => l.data.startsWith(id));
  const e = soma(doMes, 'entrada');
  const s = soma(doMes, 'saida');
  const saldoNoFim = doMes.length ? doMes[doMes.length - 1].saldo : null;
  conferir(`Caixa do plano, ${id} (entradas)`, e, planoEntradas);
  conferir(`Caixa do plano, ${id} (saídas)`, s, planoSaidas);
  const [ano, mes] = id.split('-').map(Number);
  return {
    id,
    nome: `${NOMES_DOS_MESES[mes - 1]} de ${ano}`,
    curto: `${NOMES_DOS_MESES[mes - 1].slice(0, 3)}/${String(ano).slice(2)}`,
    entradas: e,
    saidas: s,
    saldo: saldoNoFim ?? planoSaldo,
    lancamentos: doMes.length,
  };
});
// O saldo de fim de mês sem lançamento repete o do mês anterior; com lançamento, tem de bater com o plano.
for (const m of meses) conferir(`Caixa do plano, ${m.id} (saldo)`, m.saldo, CAIXA_DO_PLANO[m.id][2]);
if (meses.reduce((t, m) => t + m.lancamentos, 0) !== lancamentos.length) throw new Error('Há lançamento fora dos onze meses.');
// A ordem da planilha precisa ser a das datas, ou o saldo linha a linha não faz sentido.
for (let i = 1; i < lancamentos.length; i++) {
  if (lancamentos[i].data < lancamentos[i - 1].data) throw new Error(`Linha ${lancamentos[i].linha} está fora da ordem das datas.`);
}

const sha256 = createHash('sha256').update(bufOriginal).digest('hex');
const fonte = {
  titulo: 'Relatório Resumido de Execução Orçamentária e Prestação de Contas',
  autor: 'Gestão Reconecta (CAGP/UFMG)',
  periodo: 'dezembro de 2025 a outubro de 2026',
  acompanha: 'Nota Técnica de Prestação de Contas nº 01/2026',
  aba: nomeDaAba,
  primeiraLinha: lancamentos[0].linha,
  ultimaLinha: lancamentos[lancamentos.length - 1].linha,
  arquivoOriginal: `/documentos/transparencia/${NOME_ORIGINAL}`,
  arquivoCsv: `/documentos/transparencia/${NOME_CSV}`,
  bytesOriginal: bufOriginal.length,
  sha256,
  conferidoEm: '2026-11-23',
};
const citacao = (linha) => `Planilha da ${fonte.autor}, ${fonte.titulo}, dez/2025 a out/2026, aba ${fonte.aba}, linha ${linha}`;

const dados = {
  geradoPor: 'scripts/contas-para-site.mjs',
  observacao: 'Valores em centavos. A rubrica é classificação da Chapa Semente; a planilha original não tem. Nomes de pessoas trocados por [pessoa].',
  fonte,
  resumo: {
    caixaInicial,
    entradas,
    saidas,
    saldo,
    contaDigital: saldo - especie,
    especie,
    lancamentos: lancamentos.length,
    lancamentosEmEspecie: lancamentos.filter((l) => l.especie).length,
    nomesTrocados: lancamentos.filter((l) => l.nomeTrocado).length,
    primeiraData: lancamentos[0].data,
    ultimaData: lancamentos[lancamentos.length - 1].data,
    saldoMinimo,
  },
  rubricas,
  meses,
  lancamentos,
};

// CSV no padrão do portal: ponto e vírgula, vírgula decimal, BOM (o Excel abre direto com acento).
const campo = (v) => `"${String(v).replace(/"/g, '""')}"`;
const decimal = (c) => (c / 100).toFixed(2).replace('.', ',');
const nomeDaRubrica = new Map(RUBRICAS.map((r) => [r.id, r.nome]));
const linhasCsv = [
  [
    'Linha na planilha original',
    'Data',
    'Mês',
    'Tipo',
    'Valor (R$)',
    'Descrição (como na planilha)',
    'Rubrica (classificação da Chapa Semente)',
    'Em espécie',
    'Saldo depois do lançamento (R$)',
    'Observação',
    'Fonte',
  ],
  ...lancamentos.map((l) => [
    l.linha,
    l.data.split('-').reverse().join('/'),
    l.data.slice(0, 7),
    l.tipo === 'entrada' ? 'Entrada' : 'Saída',
    decimal(l.tipo === 'entrada' ? l.valor : -l.valor),
    l.descricao,
    nomeDaRubrica.get(l.rubrica),
    l.especie ? 'Sim' : 'Não',
    decimal(l.saldo),
    [l.nomeTrocado ? 'Nome de pessoa trocado por [pessoa]' : '', l.nota ?? '', l.observacao ?? ''].filter(Boolean).join(' '),
    citacao(l.linha),
  ]),
];
const csv = '﻿' + linhasCsv.map((linha) => linha.map(campo).join(';')).join('\r\n') + '\r\n';
fonte.bytesCsv = Buffer.byteLength(csv, 'utf8');

mkdirSync(PASTA_PUBLICA, { recursive: true });
writeFileSync(SAIDA_JSON, JSON.stringify(dados, null, 1) + '\n');
writeFileSync(join(PASTA_PUBLICA, NOME_CSV), csv);
copyFileSync(ORIGEM, join(PASTA_PUBLICA, NOME_ORIGINAL));

console.log(`${lancamentos.length} lançamentos (linhas ${fonte.primeiraLinha} a ${fonte.ultimaLinha} da aba ${nomeDaAba}).`);
console.log(`Caixa inicial ${reais(caixaInicial)} + entradas ${reais(entradas)} − saídas ${reais(saidas)} = ${reais(saldo)}`);
console.log(`Confere com a planilha (B1 a B6), com a Nota Técnica nº 01/2026, com a Tabela 2 e com o caixa mês a mês do plano.`);
console.log(`Nomes trocados em ${dados.resumo.nomesTrocados} lançamentos. Menor saldo: ${reais(saldoMinimo.valor)} em ${saldoMinimo.data}.`);
console.log(`Escritos: src/data/contasCagp2025.json, public/documentos/transparencia/${NOME_CSV} e ${NOME_ORIGINAL}.`);
