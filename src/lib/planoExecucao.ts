// src/lib/planoExecucao.ts — O plano de execução da Semente, proposta por proposta (18/11/2026).
// Os dados vêm de src/data/planoExecucao.json e src/data/planoCompleto.json, gerados por
// scripts/plano-para-site.mjs a partir do plano e dos boletins. Não edite os JSON à mão: mude o
// plano e rode o script de novo.
import dados from '@/data/planoExecucao.json';
import completo from '@/data/planoCompleto.json';

/** Texto já escapado; só <strong>, <em> e <code> passam. */
type Html = string;

export interface PlanoTabela {
  titulo: string;
  cabecalho: Html[];
  linhas: Html[][];
  fonte: Html | null;
}

export type PlanoBloco = { p: Html } | { lista: { forte: Html; texto: Html }[] } | { tabela: PlanoTabela };

export interface PlanoProposta {
  id: number;
  /** PDF do boletim da proposta, em public/. */
  boletimPdf: string;
  /** Título do boletim; `marca` é a palavra da caneta. */
  titulo: { antes: string; marca: string; depois: string };
  selo: 'Já no ar' | 'Já começou' | 'Começa na posse' | string;
  /** "R$ 0,00" quando não sai dinheiro do caixa. */
  custo: string;
  custoNota: Html;
  quemResponde: Html;
  daCartaAoPlano: Html[];
  /** "O que você vai ver e quando": `forte` é a data (ou a condição), `texto` é a entrega. */
  quando: { forte: Html; texto: Html }[];
  secoes: { titulo: string; blocos: PlanoBloco[] }[];
}

export const PLANO_MANDATO = dados.mandato;
export const PLANO_PROPOSTAS = dados.propostas as PlanoProposta[];
export const PLANO_PDF_COMPLETO = dados.pdfCompleto;
export const PLANO_PDF_RESUMO = dados.pdfResumo;
export const PLANO_PAGINAS = 109;

export function planoDaProposta(id: number): PlanoProposta | undefined {
  return PLANO_PROPOSTAS.find((p) => p.id === id);
}

/**
 * O que muda para o estudante, numa frase: é a primeira coisa que o bloco do plano diz (pedido do
 * Gabriel em 18/11/2026: linguagem simples, o impacto e o que quer dizer nas primeiras frases).
 * Texto meu, tirado das fichas e dos boletins do plano; cada data e número daqui está no plano.
 */
export const IMPACTO_DA_PROPOSTA: Record<number, string> = {
  1: 'Você vai saber para onde vai cada real do CA: todo gasto aparece no site em até 7 dias, com comprovante, e todo mês sai um relatório das contas.',
  2: 'As decisões do CA deixam de ficar entre a diretoria: qualquer estudante pode participar, e o resumo do que foi decidido sai em até 2 dias úteis.',
  3: 'Cada guia do site vai mostrar quando foi revisto pela última vez, e o erro que você apontar é corrigido ou respondido em até 7 dias.',
  4: 'Quem decide se o CA vira associação com CNPJ são os estudantes, em Assembleia até 31 de maio de 2027, depois de ver quanto custa abrir e manter.',
  5: 'Até junho de 2027, um armário de aço com 12 portas na salinha, para usar durante o dia com o seu cadeado, se a FAFICH autorizar.',
  6: '30% do que cada calourada render vai a voto: são os estudantes que escolhem o que o CA compra ou reforma.',
  7: 'Quem acabou de entrar no curso avalia a recepção, e a avaliação é publicada. A cada semestre, uma atividade de recepção é feita junto com outra entidade.',
  8: 'Você fica sabendo o que o CAGP disse e votou nos conselhos da UFMG: o resumo de cada reunião sai em até 7 dias.',
  9: 'Dois eventos por semestre com quem trabalha com gestão pública, no horário do noturno, com o calendário publicado até 31 de março de 2027.',
  10: 'Três trilhas de cursos da Enap no site até fevereiro de 2027 e dois cursos presenciais de pelo menos 8 horas ao longo do ano.',
  11: 'A Empresa Júnior conta com o apoio do CA, mas nenhum real do caixa vai para ela sem decisão da Assembleia Geral.',
  12: 'Toda segunda-feira letiva, as oportunidades da semana (estágio, concurso, bolsa); toda quinta, a agenda do curso.',
  13: 'Camiseta, caneca e ecobag do curso escolhidas por enquete: só se produz o que foi pago, e o resultado de cada campanha vai para o portal.',
  14: 'Mandou um pedido ou uma crítica para o CA? Alguém responde, e todo mês sai um registro público do que chegou e do que foi feito.',
};

// ---- O plano inteiro, transcrito (página /chapa-semente/plano) ----

export type DocBloco =
  | { t: 'h'; n: number; id: string; html: Html }
  | { t: 'p'; html: Html }
  | { t: 'lista'; ord: boolean; itens: Html[] }
  | { t: 'nota'; html: Html }
  | { t: 'meta'; chave: string; valor: Html }
  | {
      t: 'elemento';
      classe: 'quadro' | 'tabela' | 'figura';
      tipo: string;
      numero: number | null;
      titulo: Html;
      cab: Html[];
      linhas: Html[][];
      fonte: Html;
      ficha?: { situacao: string; leitura: string; eixo: string };
      imagem?: string;
    };

export interface DocSecao {
  /** O título de nível 2 (seção, parte, referências, apêndice). */
  cabeca: Extract<DocBloco, { t: 'h' }>;
  blocos: DocBloco[];
}

export const PLANO_TITULO: Html = completo.titulo;

/** O documento em seções de nível 2, na ordem do PDF. */
export const PLANO_SECOES: DocSecao[] = (() => {
  const secoes: DocSecao[] = [];
  for (const b of completo.blocos as DocBloco[]) {
    if (b.t === 'h' && b.n <= 2) secoes.push({ cabeca: b, blocos: [] });
    else secoes.at(-1)?.blocos.push(b);
  }
  return secoes;
})();

export interface PlanoSumarioItem {
  id: string;
  html: Html;
  parte: boolean;
  /** As subseções (nível 3) da seção. */
  filhos: { id: string; html: Html }[];
}

/** O sumário do plano: seções de nível 2 e as subseções de nível 3 de cada uma. */
export const PLANO_SUMARIO: PlanoSumarioItem[] = PLANO_SECOES.map((s) => ({
  id: s.cabeca.id,
  html: s.cabeca.html,
  parte: /^Parte /.test(s.cabeca.html.replace(/<[^>]+>/g, '')),
  filhos: s.blocos.filter((b): b is Extract<DocBloco, { t: 'h' }> => b.t === 'h' && b.n === 3).map((b) => ({ id: b.id, html: b.html })),
}));
