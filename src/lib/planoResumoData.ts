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
    desc: 'Não tiram dinheiro do caixa do CA. As outras somam R$ 6.743,05 no orçamento.',
  },
  {
    numero: 'R$ 8.654,99',
    rotulo: 'saldo previsto no fim',
    desc: 'No cenário regular, depois de pagar armário, CNPJ e compras votadas pelos estudantes.',
  },
];

export const PLANO_AUTOCRITICA = {
  titulo: 'A mesma régua aplicada à nossa carta',
  texto:
    'Lida só pelo texto curto da carta-programa, 6 das 14 propostas da Semente eram genéricas e 2 chegavam sem plano. Por coerência, publicamos este plano de execução: o que será entregue, até quando, quanto custa, quem responde e o plano B se algo travar.',
} as const;

export const PLANO_FUMP_40 = {
  titulo: '40% de desconto para fumpistas na calourada',
  desconto: '40%',
  publico: 'Estudantes classificados pela FUMP nos níveis I, II e III.',
  teto: 'Ingressos limitados a 10% do resultado previsto de cada calourada (− R$ 760,00 no ano no cenário regular).',
  prioridade: 'Se a procura passar do limite, a prioridade é do nível I, depois do II e do III.',
  conferencia: 'A conferência é feita na compra antecipada, nunca na porta. O CAGP confere e não guarda cópia nem lista de nomes.',
  transparencia: 'Depois de cada festa, o resultado publicado mostra quantos ingressos saíram com desconto e quanto isso representou em reais.',
} as const;

export const PLANO_CALOURADA_CONJUNTA = {
  tipo: 'possibilidade' as const,
  selo: 'Possibilidade',
  titulo: 'Uma calourada com Ciências do Estado',
  resumo:
    'Não é entrega garantida e não entra no orçamento base. O compromisso é abrir conversa com a representação de Ciências do Estado e a Atlética Meia Noite no 1º semestre de 2027 e levar qualquer proposta escrita à reunião aberta antes de fechar acordo.',
  impactoSaldoRegular: 'R$ 8.056,49',
  diferencaRegular: '− R$ 598,50',
  diferencaPatrimonio: '− R$ 256,50',
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
    'Em 2026, R$ 5.376,64 foram despesas que não se repetem (R$ 4.073,50 de dívida e R$ 1.303,14 da abertura da EJ). Em 2027 esse espaço dá lugar a R$ 6.064,79 em armário, CNPJ e compras votadas pelos estudantes.',
} as const;

export const PLANO_ORCAMENTO_CENARIOS: Record<CenarioId, OrcamentoCenario> = {
  pessimista: {
    id: 'pessimista',
    nome: 'Pessimista',
    premissa: 'Calouradas e festas menores rendem 70% do previsto; sem apoio da PRAE; armário e CNPJ são adiados.',
    receitas: 'R$ 24.869,00',
    despesas: 'R$ 22.787,35',
    resultado: 'R$ 2.081,65',
    saldoFinal: 'R$ 7.655,99',
    reservaFuncionamento: 'R$ 4.500,00',
    reservaCnpj: 'R$ 0,00',
    margemLivre: 'R$ 3.155,99',
    patrimonioVotado: 'R$ 583,20',
    descontoFump: '− R$ 216,00',
    armario: 'Adiado (R$ 0,00)',
    cnpj: 'Adiado (R$ 0,00)',
    nota: 'Quando a receita cai, o que cede é o investimento; as 9 propostas de custo zero seguem inteiras e o saldo termina acima da reserva.',
  },
  regular: {
    id: 'regular',
    nome: 'Regular',
    premissa: 'Repete a média das duas calouradas de 2026, mantém festas menores, soma pré-venda e 1 apoio da PRAE.',
    receitas: 'R$ 37.420,00',
    despesas: 'R$ 34.339,35',
    resultado: 'R$ 3.080,65',
    saldoFinal: 'R$ 8.654,99',
    reservaFuncionamento: 'R$ 4.500,00',
    reservaCnpj: 'R$ 1.040,19',
    margemLivre: 'R$ 3.114,80',
    patrimonioVotado: 'R$ 2.052,00',
    descontoFump: '− R$ 760,00',
    armario: 'Feito (R$ 1.451,90)',
    cnpj: 'Feito se Assembleia aprovar (R$ 2.560,89)',
    nota: 'O mandato começa com R$ 5.574,34 em caixa e termina com R$ 8.654,99, acima da reserva de funcionamento e da reserva de transição do CNPJ.',
  },
  otimista: {
    id: 'otimista',
    nome: 'Otimista',
    premissa: 'Calouradas e festas rendem 110% do previsto, pré-venda cresce 20% e a PRAE aprova duas chamadas.',
    receitas: 'R$ 42.511,00',
    despesas: 'R$ 37.253,77',
    resultado: 'R$ 5.257,23',
    saldoFinal: 'R$ 10.831,57',
    reservaFuncionamento: 'R$ 4.500,00',
    reservaCnpj: 'R$ 1.040,19',
    margemLivre: 'R$ 5.291,38',
    patrimonioVotado: 'R$ 2.470,50',
    descontoFump: '− R$ 915,00',
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
  { rubrica: 'Desconto 40% fumpistas na calourada', base2026: 'R$ 0,00', previsto2027: '− R$ 760,00', nota: 'Compromisso novo, limitado a 10% do resultado previsto.' },
  { rubrica: 'Festas menores e bar', base2026: 'R$ 8.808,38', previsto2027: 'R$ 8.800,00', nota: 'Mesmo ritmo de eventos de 2026.' },
  { rubrica: 'Produtos do CAGP (entradas)', base2026: 'R$ 3.905,01', previsto2027: 'R$ 4.290,00', nota: 'Duas pré-vendas (R$ 3.900) + metade do estoque.' },
  { rubrica: 'Apoio da PRAE à recepção + rendimento', base2026: 'R$ 74,03', previsto2027: 'R$ 650,00', nota: '1 chamada PRAE (R$ 500) + aplicação (R$ 150).' },
  { rubrica: 'Total das receitas', base2026: 'R$ 37.192,93', previsto2027: 'R$ 37.420,00', nota: 'Inclui vendas na salinha (R$ 1.040 em 2027).', destaque: true },
  { rubrica: 'Custeio das festas, bar, produtos e salinha', base2026: 'R$ 26.739,26', previsto2027: 'R$ 27.074,56', nota: 'Inclui margem de 5% para imprevistos nas calouradas.' },
  { rubrica: 'Reuniões, eventos, cursos, recepção e frete', base2026: 'R$ 170,00', previsto2027: 'R$ 1.200,00', nota: 'R$ 25 em 16 atividades + PRAE + impressões.' },
  { rubrica: 'Armário (prop. 5) + CNPJ (prop. 4) + Patrimônio (prop. 6)', base2026: 'R$ 0,00', previsto2027: 'R$ 6.064,79', nota: 'Só saem depois da 1ª calourada (junho em diante).' },
  { rubrica: 'Dívida + abertura da Empresa Júnior', base2026: 'R$ 5.376,64', previsto2027: 'R$ 0,00', nota: 'Não se repetem; repasse à EJ só por Assembleia (prop. 11).' },
  { rubrica: 'Total das despesas', base2026: 'R$ 32.285,90', previsto2027: 'R$ 34.339,35', nota: 'Valor fixado é teto, nunca meta de gasto.', destaque: true },
  { rubrica: 'Saldo no fim do mandato', base2026: 'R$ 5.574,34', previsto2027: 'R$ 8.654,99', nota: 'Parte de R$ 667,31 (2026) e de R$ 5.574,34 (2027).', destaque: true },
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
  { mes: 'mar', entradas: 'R$ 8.151,14', saidas: 'R$ 3.892,37', saldo: 'R$ 9.847,47', saldoNum: 9847.47 },
  { mes: 'abr', entradas: 'R$ 8.845,84', saidas: 'R$ 7.954,24', saldo: 'R$ 10.739,06', saldoNum: 10739.06 },
  { mes: 'mai', entradas: 'R$ 1.406,84', saidas: 'R$ 2.114,78', saldo: 'R$ 10.031,12', saldoNum: 10031.12 },
  { mes: 'jun', entradas: 'R$ 2.514,44', saidas: 'R$ 2.951,86', saldo: 'R$ 9.593,70', saldoNum: 9593.7 },
  { mes: 'jul', entradas: 'R$ 13,64', saidas: 'R$ 1.895,48', saldo: 'R$ 7.711,85', saldoNum: 7711.85 },
  { mes: 'ago', entradas: 'R$ 6.227,07', saidas: 'R$ 5.431,48', saldo: 'R$ 8.507,44', saldoNum: 8507.44 },
  { mes: 'set', entradas: 'R$ 9.525,14', saidas: 'R$ 8.287,64', saldo: 'R$ 9.744,95', saldoNum: 9744.95 },
  { mes: 'out', entradas: 'R$ 113,54', saidas: 'R$ 1.203,50', saldo: 'R$ 8.654,99', saldoNum: 8654.99 },
];

export const PLANO_RESERVAS: readonly { nome: string; valor: string; finalidade: string }[] = [
  { nome: 'Reserva de funcionamento', valor: 'R$ 4.500,00', finalidade: 'Pagar despesas antecipadas das festas sem que integrante tire dinheiro do próprio bolso.' },
  { nome: 'Reserva do CNPJ para o ano seguinte', valor: 'R$ 1.040,19', finalidade: 'Garantir averbação de ata, certificado digital e declarações na gestão seguinte (só se a Assembleia aprovar).' },
  { nome: 'Reserva do patrimônio', valor: '30% das calouradas', finalidade: 'Compras e reformas escolhidas por voto direto dos estudantes (proposta 6).' },
  { nome: 'Margem livre', valor: 'R$ 3.114,80', finalidade: 'Imprevistos no cenário regular; qualquer gasto acima de R$ 500,00 passa pela reunião aberta.' },
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
