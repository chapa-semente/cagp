// src/lib/planoResumoData.ts — Fonte única dos números, cenários e compromissos consolidados do
// Plano de Execução 2026-2027 (19/11/2026). Todos os valores e datas vêm de
// _referencias/analise_gestao_reconecta/06-plano-de-execucao-semente/plano.md e plano-em-uma-pagina.md.

export interface NumeroDestaque {
  numero: string;
  rotulo: string;
  desc: string;
}

export const PLANO_NUMEROS_DESTAQUE: readonly NumeroDestaque[] = [
  {
    numero: '14',
    rotulo: 'propostas',
    desc: 'Cada uma com entrega, prazo, custo, indicador e plano B.',
  },
  {
    numero: '9 de 14',
    rotulo: 'a R$ 0,00',
    desc: 'Não tiram dinheiro do caixa do CA. As outras somam R$ 6.521,05 no orçamento.',
  },
  {
    numero: 'R$ 8.136,99',
    rotulo: 'saldo previsto no fim',
    desc: 'No cenário regular, depois de pagar armário, CNPJ e compras votadas pelos estudantes.',
  },
];

export const PLANO_AUTOCRITICA = {
  titulo: 'A mesma régua aplicada à nossa carta',
  texto:
    'Lida só pelo texto curto da carta-programa, 6 das 14 propostas da Semente eram genéricas e 2 chegavam sem plano. Por coerência, publicamos este plano de execução: o que será entregue, até quando, quanto custa, quem responde e o plano B se algo travar.',
} as const;

/**
 * O desconto para fumpistas na calourada (seção 6.1 do plano). Corrigido em 22/11/2026 depois da conta com a
 * prestação de contas de setembro de 2026: era 40% limitado a 10% do resultado (19 ingressos por festa).
 * A errata fica à vista no site e no PDF; ver _referencias/.../analise-desconto-fump.md.
 */
export const PLANO_FUMP = {
  titulo: '25% de desconto para fumpistas na calourada',
  desconto: '25%',
  publico:
    'Estudantes nos níveis I, II e III da FUMP. Quem ainda não tem nível, como o calouro, comprova com a cota de renda, a avaliação da FUMP em andamento ou, no mínimo, a inscrição no CadÚnico.',
  teto: 'Até 60 ingressos com desconto por festa, 10 em cada lote, e o que sobra passa para o lote seguinte (até R$ 1.500,00 no ano, no cenário regular).',
  prioridade: 'Se a procura passar da cota de um lote, a prioridade é do nível I, depois do II e do III.',
  conferencia: 'A comprovação é feita na compra antecipada, nunca na porta. O ingresso é nominal, e o CAGP não guarda cópia nem lista de quem é fumpista.',
  transparencia: 'Depois de cada festa, o resultado publicado mostra quantos ingressos saíram com desconto em cada lote e quanto isso representou em reais.',
  errata: {
    data: '22/11/2026',
    antes: '40% de desconto, limitado a 10% do resultado previsto de cada festa',
    agora: '25% de desconto, em até 60 ingressos por festa, 10 em cada lote',
    motivo:
      'Refeita a conta com a prestação de contas da calourada de setembro de 2026, o limite antigo cabia em só 19 ingressos por festa, e cerca de 45 fumpistas iriam querer o desconto. Com 25%, a cota de 60 atende todos no cenário médio.',
    orcamento:
      'O orçamento foi refeito: o desconto vai de R$ 760,00 para até R$ 1.500,00 no ano, as compras votadas pelos estudantes, de R$ 2.052,00 para R$ 1.830,00, e o saldo no fim do mandato, de R$ 8.654,99 para R$ 8.136,99.',
  },
} as const;

export const PLANO_CALOURADA_CONJUNTA = {
  tipo: 'possibilidade' as const,
  selo: 'Possibilidade',
  titulo: 'Uma calourada com Ciências do Estado',
  resumo:
    'Não é entrega garantida e não entra no orçamento base. O compromisso é abrir conversa com a representação de Ciências do Estado e a Atlética Meia Noite no 1º semestre de 2027 e levar qualquer proposta escrita à reunião aberta antes de fechar acordo.',
  impactoSaldoRegular: 'R$ 7.603,24',
  diferencaRegular: '− R$ 533,75',
  diferencaPatrimonio: '− R$ 228,75',
} as const;

export interface MarcoLinhaTempo {
  data: string;
  fato: string;
  propostas: string;
  destaque?: boolean;
  cemDias?: boolean;
}

export const PLANO_LINHA_TEMPO: readonly MarcoLinhaTempo[] = [
  { data: 'Posse + 15 dias', fato: 'Quanto o CAGP tem em caixa e quais bens recebeu, publicado no site.', propostas: '1', cemDias: true },
  { data: 'Até 20 dez. 2026', fato: 'Calendário das reuniões abertas e canal de escuta, com resposta em até 7 dias.', propostas: '2 e 14', cemDias: true },
  { data: 'Até 31 jan. 2027', fato: 'Contas reais no portal. Daí em diante, cada gasto entra em até 7 dias, com comprovante.', propostas: '1', destaque: true, cemDias: true },
  { data: 'Até 28 fev. 2027', fato: 'Inventário dos bens, lista dos conselhos e trilhas da Enap.', propostas: '6, 8 e 10', cemDias: true },
  { data: 'Mar. 2027', fato: 'Recepção de calouros, que a avaliam em abril, e guias revisados.', propostas: '7 e 3', cemDias: true },
  { data: '15 mar. 2027', fato: 'Primeiro boletim de contas, em reunião aberta. Repete em 15 de junho e 15 de setembro.', propostas: '1 e 2', destaque: true, cemDias: true },
  { data: 'Até 31 mar. 2027', fato: 'Estudo do CNPJ, com custos, e calendário dos quatro eventos.', propostas: '4 e 9', cemDias: true },
  { data: 'Abr. e maio 2027', fato: 'Primeira pré-venda de produtos; a segunda é em setembro.', propostas: '13' },
  { data: 'Até 31 maio 2027', fato: 'Assembleia Geral decide se o CAGP abre CNPJ.', propostas: '4' },
  { data: 'Até jun. 2027', fato: 'Armário na salinha, se a FAFICH autorizar; primeiro curso livre; e voto dos estudantes sobre 30% do resultado da calourada.', propostas: '5, 10 e 6', destaque: true },
  { data: 'Out. 2027', fato: 'Prestação de contas do ano, em Assembleia Geral.', propostas: '1 e 2', destaque: true },
];

export const PLANO_ROTINAS_FIXAS: readonly { ritmo: string; entrega: string }[] = [
  { ritmo: 'Toda semana letiva', entrega: 'Oportunidades na segunda e agenda na quinta (proposta 12).' },
  { ritmo: 'Todo mês', entrega: 'Reunião aberta, relatório de contas e registro do canal de escuta até o dia 10 (1, 2 e 14).' },
  { ritmo: 'Todo semestre', entrega: 'Uma ação conjunta com outra entidade estudantil (proposta 8).' },
  { ritmo: 'A cada trimestre', entrega: 'Boletim de contas (15 mar., 15 jun. e 15 set.) e informe sobre a Empresa Júnior (1 e 11).' },
];

export type CenarioId = 'pessimista' | 'regular' | 'otimista';

export interface OrcamentoCenario {
  id: CenarioId;
  nome: string;
  premissa: string;
  receitas: string;
  despesas: string;
  resultado: string;
  saldoFinal: string;
  reservaFuncionamento: string;
  reservaCnpj: string;
  margemLivre: string;
  patrimonioVotado: string;
  descontoFump: string;
  armario: string;
  cnpj: string;
  nota: string;
}

export const PLANO_ORCAMENTO_BASE_2026 = {
  saldoInicial: 'R$ 667,31',
  receitas: 'R$ 37.192,93',
  despesas: 'R$ 32.285,90',
  resultado: 'R$ 4.907,03',
  saldoFinal: 'R$ 5.574,34',
  fonte: 'Nota Técnica nº 01/2026 e planilha de 226 lançamentos (dez. 2025 a out. 2026), usadas como referência neutra de onde saiu cada previsão.',
  notaNaoRecorrente:
    'Em 2026, R$ 5.376,64 foram despesas que não se repetem (R$ 4.073,50 de dívida e R$ 1.303,14 da abertura da EJ). Em 2027 esse espaço dá lugar a R$ 5.842,79 em armário, CNPJ e compras votadas pelos estudantes.',
} as const;

export const PLANO_ORCAMENTO_CENARIOS: Record<CenarioId, OrcamentoCenario> = {
  pessimista: {
    id: 'pessimista',
    nome: 'Pessimista',
    premissa: 'Calouradas e festas menores rendem 70% do previsto; sem apoio da PRAE; armário e CNPJ são adiados.',
    receitas: 'R$ 24.035,00',
    despesas: 'R$ 22.537,15',
    resultado: 'R$ 1.497,85',
    saldoFinal: 'R$ 7.072,19',
    reservaFuncionamento: 'R$ 4.500,00',
    reservaCnpj: 'R$ 0,00',
    margemLivre: 'R$ 2.572,19',
    patrimonioVotado: 'R$ 333,00',
    descontoFump: '− R$ 1.050,00',
    armario: 'Adiado (R$ 0,00)',
    cnpj: 'Adiado (R$ 0,00)',
    nota: 'Quando a receita cai, o que cede é o investimento; as 9 propostas de custo zero seguem inteiras e o saldo termina acima da reserva.',
  },
  regular: {
    id: 'regular',
    nome: 'Regular',
    premissa: 'Repete a média das duas calouradas de 2026, mantém festas menores, soma pré-venda e 1 apoio da PRAE.',
    receitas: 'R$ 36.680,00',
    despesas: 'R$ 34.117,35',
    resultado: 'R$ 2.562,65',
    saldoFinal: 'R$ 8.136,99',
    reservaFuncionamento: 'R$ 4.500,00',
    reservaCnpj: 'R$ 1.040,19',
    margemLivre: 'R$ 2.596,80',
    patrimonioVotado: 'R$ 1.830,00',
    descontoFump: '− R$ 1.500,00',
    armario: 'Feito (R$ 1.451,90)',
    cnpj: 'Feito se Assembleia aprovar (R$ 2.560,89)',
    nota: 'O mandato começa com R$ 5.574,34 em caixa e termina com R$ 8.136,99, acima da reserva de funcionamento e da reserva de transição do CNPJ.',
  },
  otimista: {
    id: 'otimista',
    nome: 'Otimista',
    premissa: 'Calouradas e festas rendem 110% do previsto, pré-venda cresce 20% e a PRAE aprova duas chamadas.',
    receitas: 'R$ 41.926,00',
    despesas: 'R$ 37.078,27',
    resultado: 'R$ 4.847,73',
    saldoFinal: 'R$ 10.422,07',
    reservaFuncionamento: 'R$ 4.500,00',
    reservaCnpj: 'R$ 1.040,19',
    margemLivre: 'R$ 4.881,88',
    patrimonioVotado: 'R$ 2.295,00',
    descontoFump: '− R$ 1.500,00',
    armario: 'Feito (R$ 1.451,90)',
    cnpj: 'Feito se Assembleia aprovar (R$ 2.560,89)',
    nota: 'Mesmo no cenário otimista o caixa não comporta contador com mensalidade fixa; por isso o cenário do CNPJ é o das declarações avulsas.',
  },
};

export interface LinhaComparativoOrcamento {
  rubrica: string;
  base2026: string;
  previsto2027: string;
  nota: string;
  destaque?: boolean;
}

export const PLANO_ORCAMENTO_COMPARATIVO: readonly LinhaComparativoOrcamento[] = [
  { rubrica: 'Calouradas (1º e 2º semestres — entradas)', base2026: 'R$ 23.368,51', previsto2027: 'R$ 23.400,00', nota: 'Média das duas festas de 2026 (R$ 11.700 cada).' },
  { rubrica: 'Desconto de 25% para fumpistas na calourada', base2026: 'R$ 0,00', previsto2027: '− R$ 1.500,00', nota: 'Até 60 ingressos por festa, 10 por lote. Corrigido em 22/11/2026: era 40% até 10% do resultado.' },
  { rubrica: 'Festas menores e bar', base2026: 'R$ 8.808,38', previsto2027: 'R$ 8.800,00', nota: 'Mesmo ritmo de eventos de 2026.' },
  { rubrica: 'Produtos do CAGP (entradas)', base2026: 'R$ 3.905,01', previsto2027: 'R$ 4.290,00', nota: 'Duas pré-vendas (R$ 3.900) + metade do estoque.' },
  { rubrica: 'Apoio da PRAE à recepção + rendimento', base2026: 'R$ 74,03', previsto2027: 'R$ 650,00', nota: '1 chamada PRAE (R$ 500) + aplicação (R$ 150).' },
  { rubrica: 'Total das receitas', base2026: 'R$ 37.192,93', previsto2027: 'R$ 36.680,00', nota: 'Inclui vendas na salinha (R$ 1.040 em 2027).', destaque: true },
  { rubrica: 'Custeio das festas, bar, produtos e salinha', base2026: 'R$ 26.739,26', previsto2027: 'R$ 27.074,56', nota: 'Inclui margem de 5% para imprevistos nas calouradas.' },
  { rubrica: 'Reuniões, eventos, cursos, recepção e frete', base2026: 'R$ 170,00', previsto2027: 'R$ 1.200,00', nota: 'R$ 25 em 16 atividades + PRAE + impressões.' },
  { rubrica: 'Armário (prop. 5) + CNPJ (prop. 4) + Patrimônio (prop. 6)', base2026: 'R$ 0,00', previsto2027: 'R$ 5.842,79', nota: 'Só saem depois da 1ª calourada (junho em diante).' },
  { rubrica: 'Dívida + abertura da Empresa Júnior', base2026: 'R$ 5.376,64', previsto2027: 'R$ 0,00', nota: 'Não se repetem; repasse à EJ só por Assembleia (prop. 11).' },
  { rubrica: 'Total das despesas', base2026: 'R$ 32.285,90', previsto2027: 'R$ 34.117,35', nota: 'Valor fixado é teto, nunca meta de gasto.', destaque: true },
  { rubrica: 'Saldo no fim do mandato', base2026: 'R$ 5.574,34', previsto2027: 'R$ 8.136,99', nota: 'Parte de R$ 667,31 (2026) e de R$ 5.574,34 (2027).', destaque: true },
];

export interface MesCaixa {
  mes: string;
  entradas: string;
  saidas: string;
  saldo: string;
  saldoNum: number;
}

export const PLANO_CAIXA_MENSAL: readonly MesCaixa[] = [
  { mes: 'dez', entradas: 'R$ 547,13', saidas: 'R$ 608,00', saldo: 'R$ 5.513,47', saldoNum: 5513.47 },
  { mes: 'jan', entradas: 'R$ 61,59', saidas: 'R$ 0,00', saldo: 'R$ 5.575,06', saldoNum: 5575.06 },
  { mes: 'fev', entradas: 'R$ 13,64', saidas: 'R$ 0,00', saldo: 'R$ 5.588,69', saldoNum: 5588.69 },
  { mes: 'mar', entradas: 'R$ 7.995,63', saidas: 'R$ 3.892,37', saldo: 'R$ 9.691,96', saldoNum: 9691.96 },
  { mes: 'abr', entradas: 'R$ 8.631,35', saidas: 'R$ 7.954,24', saldo: 'R$ 10.369,06', saldoNum: 10369.06 },
  { mes: 'mai', entradas: 'R$ 1.406,84', saidas: 'R$ 2.114,78', saldo: 'R$ 9.661,12', saldoNum: 9661.12 },
  { mes: 'jun', entradas: 'R$ 2.514,44', saidas: 'R$ 2.951,86', saldo: 'R$ 9.223,70', saldoNum: 9223.7 },
  { mes: 'jul', entradas: 'R$ 13,64', saidas: 'R$ 1.784,48', saldo: 'R$ 7.452,85', saldoNum: 7452.85 },
  { mes: 'ago', entradas: 'R$ 6.104,35', saidas: 'R$ 5.431,48', saldo: 'R$ 8.125,72', saldoNum: 8125.72 },
  { mes: 'set', entradas: 'R$ 9.277,86', saidas: 'R$ 8.287,64', saldo: 'R$ 9.115,95', saldoNum: 9115.95 },
  { mes: 'out', entradas: 'R$ 113,54', saidas: 'R$ 1.092,50', saldo: 'R$ 8.136,99', saldoNum: 8136.99 },
];

export const PLANO_RESERVAS: readonly { nome: string; valor: string; finalidade: string }[] = [
  { nome: 'Reserva de funcionamento', valor: 'R$ 4.500,00', finalidade: 'Pagar despesas antecipadas das festas sem que integrante tire dinheiro do próprio bolso.' },
  { nome: 'Reserva do CNPJ para o ano seguinte', valor: 'R$ 1.040,19', finalidade: 'Garantir averbação de ata, certificado digital e declarações na gestão seguinte (só se a Assembleia aprovar).' },
  { nome: 'Reserva do patrimônio', valor: '30% das calouradas', finalidade: 'Compras e reformas escolhidas por voto direto dos estudantes (proposta 6).' },
  { nome: 'Margem livre', valor: 'R$ 2.596,80', finalidade: 'Imprevistos no cenário regular; qualquer gasto acima de R$ 500,00 passa pela reunião aberta.' },
];

export const PLANO_GATILHO_RESERVA =
  'Gatilho de segurança: se o caixa cair abaixo de R$ 4.500,00, a gestão suspende todo gasto novo e a votação do patrimônio e leva o caso à reunião aberta seguinte. As entregas de custo zero seguem intactas.';

export const PLANO_REGRAS_EXECUCAO: readonly string[] = [
  'Toda entrada e saída entra no portal em até 7 dias, com comprovante.',
  'O valor fixado no orçamento é teto, nunca meta de gasto.',
  'Remanejamento ou gasto imprevisto acima de R$ 500,00 exige aprovação em reunião aberta.',
  'Toda compra acima de R$ 300,00 exige três cotações publicadas antes.',
  'Ninguém da gestão vende para o CAGP, nem adianta dinheiro sem registro prévio no portal.',
  'Todo mês tem relatório previsto × realizado até o dia 10.',
  'O planejamento financeiro real substitui a estimativa na reunião trimestral de março, após receber os extratos.',
];

export const PLANO_PRIORIDADES_CORTE: readonly { nivel: string; regra: string; propostas: string }[] = [
  {
    nivel: 'Não caem nunca',
    regra: 'Mantidas mesmo sob corte máximo, porque garantem transparência e cobrança.',
    propostas: 'Contas abertas (1), Reuniões abertas (2) e Canal de escuta (14).',
  },
  {
    nivel: 'Vêm em seguida',
    regra: 'Prioridade alta para manter o curso informado e representado.',
    propostas: 'Comunicação semanal (12), Recepção de calouros (7), Decisão do CNPJ (4) e Conselhos (8).',
  },
  {
    nivel: 'Cedem primeiro',
    regra: 'Cortadas ou reduzidas só por decisão registrada em reunião aberta se faltar gente ou caixa.',
    propostas: 'Cursos presenciais (10), 4º evento acadêmico (9) e 2ª campanha de produtos (13).',
  },
];
