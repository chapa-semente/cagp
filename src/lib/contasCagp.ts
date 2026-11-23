// src/lib/contasCagp.ts — As contas do CAGP de 2025–26 no Portal da Transparência (23/11/2026).
//
// Os números vêm de src/data/contasCagp2025.json, gerado por `node scripts/contas-para-site.mjs` a partir da
// planilha que a gestão Reconecta divulgou com a Nota Técnica nº 01/2026. O script confere cada total com a
// planilha, com a Nota Técnica e com o plano de execução; aqui só se formata. Valores em centavos.
// A comparação "hoje × com a Semente" sai do plano de execução (proposta 1, seção 5.1 e caderno 15.1).
import dados from '@/data/contasCagp2025.json';
import { PLANO_ORCAMENTO_COMPARATIVO } from '@/lib/planoResumoData';

export type RubricaId =
  | 'calourada-1'
  | 'calourada-2'
  | 'festas'
  | 'lojinha'
  | 'salinha'
  | 'rendimento'
  | 'seguro'
  | 'divida'
  | 'ej';

export interface Lancamento {
  linha: number;
  data: string;
  tipo: 'entrada' | 'saida';
  valor: number;
  descricao: string;
  rubrica: RubricaId;
  especie: boolean;
  saldo: number;
  nomeTrocado?: boolean;
  nota?: string;
  observacao?: string;
}

export interface Rubrica {
  id: RubricaId;
  nome: string;
  curto: string;
  entrou: number;
  saiu: number;
  sobrou: number;
  lancamentos: number;
}

export interface Mes {
  id: string;
  nome: string;
  curto: string;
  entradas: number;
  saidas: number;
  saldo: number;
  lancamentos: number;
}

export interface ContasCagp {
  fonte: {
    titulo: string;
    autor: string;
    periodo: string;
    acompanha: string;
    aba: string;
    primeiraLinha: number;
    ultimaLinha: number;
    arquivoOriginal: string;
    arquivoCsv: string;
    bytesOriginal: number;
    bytesCsv: number;
    sha256: string;
    conferidoEm: string;
  };
  resumo: {
    caixaInicial: number;
    entradas: number;
    saidas: number;
    saldo: number;
    contaDigital: number;
    especie: number;
    lancamentos: number;
    lancamentosEmEspecie: number;
    nomesTrocados: number;
    primeiraData: string;
    ultimaData: string;
    saldoMinimo: { valor: number; data: string; linha: number };
  };
  rubricas: Rubrica[];
  meses: Mes[];
  lancamentos: Lancamento[];
}

export const CONTAS = dados as ContasCagp;

/** 123456 → "1.234,56" */
export function decimalBr(centavos: number): string {
  const [inteiro, frac] = (Math.abs(centavos) / 100).toFixed(2).split('.');
  return `${inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${frac}`;
}

/** 123456 → "R$ 1.234,56"; negativo com o sinal de menos tipográfico. */
export function reais(centavos: number): string {
  return `${centavos < 0 ? '− ' : ''}R$ ${decimalBr(centavos)}`;
}

/** Valor com sinal explícito, para resultado de rubrica e lançamento: "+ R$ 534,00" / "− R$ 578,08". */
export function reaisComSinal(centavos: number): string {
  if (centavos === 0) return 'R$ 0,00';
  return `${centavos > 0 ? '+' : '−'} R$ ${decimalBr(centavos)}`;
}

/** "2026-03-05" → "05/03/2026" */
export function dataBr(iso: string): string {
  return iso.split('-').reverse().join('/');
}

export const RUBRICA_POR_ID = new Map(CONTAS.rubricas.map((r) => [r.id, r]));

/** Partes do todo, arredondadas para a frase (nunca para a tabela). */
export const PCT_CALOURADAS_NAS_ENTRADAS = Math.round(
  ((RUBRICA_POR_ID.get('calourada-1')!.entrou + RUBRICA_POR_ID.get('calourada-2')!.entrou) / CONTAS.resumo.entradas) * 100,
);
export const RESULTADO_CALOURADAS =
  RUBRICA_POR_ID.get('calourada-1')!.sobrou + RUBRICA_POR_ID.get('calourada-2')!.sobrou;

/** Teto do gráfico mês a mês: o maior movimento do período, arredondado para cima a cada R$ 5 mil. */
export const TETO_MES = Math.ceil(Math.max(...CONTAS.meses.flatMap((m) => [m.entradas, m.saidas])) / 500000) * 500000;
/** Teto das barras por rubrica: a maior entrada ou saída de uma rubrica. */
export const TETO_RUBRICA = Math.max(...CONTAS.rubricas.flatMap((r) => [r.entrou, r.saiu]));

/**
 * O espaço "Se a Semente for eleita": o que a planilha de 2025–26 traz e o que o plano promete, item a item.
 * Fato contra fato, sem adjetivo; onde a planilha acerta, o texto diz (decisão de 23/11/2026).
 */
export interface ItemComparacao {
  id: string;
  titulo: string;
  hoje: string;
  semente: string;
  fonte: string;
}

export const HOJE_X_SEMENTE: readonly ItemComparacao[] = [
  {
    id: 'quando',
    titulo: 'Quando as contas aparecem',
    hoje: 'A carta de 2025 previa prestação de contas a cada dois meses. Houve uma, no fim do mandato, na assembleia de 26/10/2026.',
    semente: 'Cada entrada ou saída entra no portal em até 7 dias, com a data do fato e a data da publicação. Meta: 90% no prazo.',
    fonte: 'Plano de execução, proposta 1',
  },
  {
    id: 'mes',
    titulo: 'O relatório de cada mês',
    hoje: 'A planilha é uma lista única de onze meses. O mês a mês desta página foi somado por nós.',
    semente: 'Relatório até o dia 10 de cada mês, no modelo do Anexo I do Regimento (art. 30, XI): 11 no mandato.',
    fonte: 'Regimento Interno, art. 30, XI; plano, proposta 1',
  },
  {
    id: 'comprovante',
    titulo: 'Comprovante de cada gasto',
    hoje: 'Cada linha tem data, valor e descrição. A planilha não liga o lançamento a uma nota ou recibo.',
    semente: 'A nota ou o recibo é publicado junto de cada saída. Meta: 100% das saídas.',
    fonte: 'Plano de execução, proposta 1',
  },
  {
    id: 'rubrica',
    titulo: 'Rubrica e orçamento',
    hoje: 'A planilha não classifica os lançamentos. As rubricas da aba Contas 2025–26 são classificação nossa.',
    semente: 'Cada lançamento já entra com a rubrica do orçamento do mandato, e o relatório mostra o previsto e o realizado lado a lado.',
    fonte: 'Plano de execução, seção 7',
  },
  {
    id: 'festas',
    titulo: 'Quanto cada festa deixou',
    hoje: `Para saber, é preciso somar à mão. Somando, as duas calouradas deixaram ${reais(RESULTADO_CALOURADAS)}.`,
    semente: 'Cada festa fecha com receita, custo e resultado. 30% do resultado de cada calourada vai a voto dos estudantes.',
    fonte: 'Plano de execução, propostas 1 e 6',
  },
  {
    id: 'especie',
    titulo: 'Dinheiro em espécie',
    hoje: `A planilha marca o que foi em espécie (${CONTAS.resumo.lancamentosEmEspecie} lançamentos) e separa o saldo físico: ${reais(CONTAS.resumo.especie)}.`,
    semente: 'A marcação continua, e todo mês o saldo do portal é conferido com o extrato do banco. Meta: diferença de R$ 0,00.',
    fonte: 'Plano de execução, proposta 1',
  },
  {
    id: 'transicao',
    titulo: 'Na troca de gestão',
    hoje: `A planilha abre com os ${reais(CONTAS.resumo.caixaInicial)} recebidos da gestão anterior, como registra o contrato de transição.`,
    semente: 'Termo de recebimento do caixa publicado em até 15 dias depois da posse, com saldo, conta e bens recebidos.',
    fonte: 'Nota Técnica nº 01/2026; plano, proposta 1',
  },
  {
    id: 'formato',
    titulo: 'Onde consultar',
    hoje: 'Um arquivo .xlsx, com os lançamentos em uma aba.',
    semente: 'Painel com busca, mês a mês e rubricas, e o CSV aberto com a fonte em cada linha. É o que a aba Contas 2025–26 já faz com a planilha.',
    fonte: 'Esta página',
  },
];

/** Previsto × realizado, pelos totais do orçamento do plano (cenário regular). */
function linhaDoOrcamento(prefixo: string) {
  const linha = PLANO_ORCAMENTO_COMPARATIVO.find((l) => l.rubrica.startsWith(prefixo));
  if (!linha) throw new Error(`Linha "${prefixo}" não encontrada no orçamento do plano.`);
  return linha;
}
export const PREVISTO_X_REALIZADO = [
  { rotulo: 'Entrou', realizado: reais(CONTAS.resumo.entradas), previsto: linhaDoOrcamento('Total das receitas').previsto2027 },
  { rotulo: 'Saiu', realizado: reais(CONTAS.resumo.saidas), previsto: `${linhaDoOrcamento('Total das despesas').previsto2027} (teto)` },
  { rotulo: 'Saldo no fim', realizado: reais(CONTAS.resumo.saldo), previsto: linhaDoOrcamento('Saldo no fim').previsto2027 },
] as const;
