// src/lib/debateCadernoData.ts — Fonte única dos números, tabelas, PDFs e panorama macro da
// Análise da gestão (debate de 24/11/2026) em /chapa-semente/debate.
//
// Todos os números vêm literalmente dos 3 estudos já auditados em _referencias/analise_gestao_reconecta/:
//   - 03-analise-gestao-2025-26/boletim.md
//   - 04-analise-carta-2026-27/boletim.md + 02-dados/matriz-carta-2027-pdf.md
//   - 05 - Analise da divida/boletim.md + dossie.md
//
// Blindagem editorial (Edital arts. 11, III, 16 e 32):
//   - Panorama macro baseado em documentos e fatos públicos, sem caderno de perguntas nem exposição pessoal.
//   - Não cita nomes pessoais nas pautas de Seminário da UNE/DCE e Erika Hilton; trata
//     estritamente do cargo/gestão e não exibe nem menciona captura de conversa privada.
//   - Explicita legitimidade do ressarcimento e canal de retificação (/ouvidoria).


import { PLANO_PAGINAS } from '@/lib/planoExecucao';

export type DestaqueCor = 'roxo' | 'laranja' | 'petroleo' | 'raiz';

export interface DebateDestaque {
  numero: string;
  rotulo: string;
  desc: string;
  href?: string;
  acaoLabel?: string;
  cor?: DestaqueCor;
}

export const DEBATE_DESTAQUES: readonly DebateDestaque[] = [
  {
    numero: '14 de 33',
    rotulo: 'promessas entregues e mostradas',
    desc: '10 ficaram pela metade, 4 só constam no relatório da gestão e 5 não têm registro.',
    href: '#balanco',
    acaoLabel: 'Ver balanço',
    cor: 'roxo',
  },
  {
    numero: '39 · 0 datas',
    rotulo: 'propostas na nova carta',
    desc: 'O site lista 42; a prestação de contas saiu da carta em PDF e nenhuma proposta traz prazo.',
    href: '#carta-2027',
    acaoLabel: 'Ver nova carta',
    cor: 'laranja',
  },
  {
    numero: '77,8%',
    rotulo: 'da dívida era da atual direção',
    desc: 'R$ 3.505,50 dos R$ 4.505,50 quitados em abril cabiam à presidência e à vice-presidência atuais.',
    href: '#divida',
    acaoLabel: 'Ver dossiê',
    cor: 'petroleo',
  },
  {
    numero: '0 de 75',
    rotulo: 'posts sobre RU, FUMP ou bolsas',
    desc: '27 posts foram sobre festa; pauta estudantil teve 236 curtidas de mediana contra 54 de festa.',
    href: '#redes-cagp',
    acaoLabel: 'Ver redes',
    cor: 'raiz',
  },
];

export interface DebateTemaMacro {
  id: string;
  titulo: string;
  icone: string;
  acento: 'roxo' | 'petroleo' | 'fruto' | 'raiz';
  dadoCurto: string;
  panorama: string;
  semente: string;
  href: string;
  linkLabel: string;
}

export const DEBATE_TEMAS_MACRO: readonly DebateTemaMacro[] = [
  {
    id: 'contas',
    titulo: 'Transparência e prestação de contas',
    icone: 'bi-cash-coin',
    acento: 'roxo',
    dadoCurto: '1× no ano · saiu do PDF',
    panorama:
      'Em 2025, a prestação de contas bimestral nas redes aconteceu apenas uma vez em assembleia no fim do mandato (26/10/2026), embora o Regimento preveja relatório mensal. Para 2026–2027, a prestação de contas do caixa aparece no site da chapa, mas desapareceu da carta-proposta em PDF.',
    semente:
      'Portal da Transparência já pronto no site do curso: contas reais até 31/01/2027, relatório mensal até o dia 10 e boletim trimestral em 15/03, 15/06 e 15/09.',
    href: '#carta-2027',
    linkLabel: 'Comparar site e PDF',
  },
  {
    id: 'divida',
    titulo: 'Dívida quitada e governança do caixa',
    icone: 'bi-shield-check',
    acento: 'petroleo',
    dadoCurto: '77,8% à atual direção',
    panorama:
      'Ressarcir quem adiantou despesas do CA é legítimo. Os documentos mostram que a dívida de R$ 4.505,50 veio de uma só gestão (Principia, 2025), que R$ 3.505,50 cabiam à atual presidência e vice-presidência — que também assinaram a própria quitação — e que faltam a Nota Técnica nº 01/2025 e os comprovantes.',
    semente:
      'Regra de impedimento (quem recebe não decide nem assina), zero adiantamento sem registro prévio no portal e reserva de R$ 4.500,00 no caixa.',
    href: '#divida',
    linkLabel: 'Abrir dossiê da dívida',
  },
  {
    id: 'prazos',
    titulo: 'Promessas, prazos e planejamento',
    icone: 'bi-calendar-check',
    acento: 'fruto',
    dadoCurto: '39 propostas · 0 datas',
    panorama:
      'Em 2025, cada uma das 33 propostas tinha prazo e 14 foram feitas e mostradas. Na carta 2026–2027 em PDF, o total subiu para 39 propostas, mas sem nenhuma data de entrega; as claras e viáveis caíram de 36% para 21%, e 4 promessas que não saíram do papel voltam quase iguais.',
    semente:
      `14 propostas num plano público de ${PLANO_PAGINAS} páginas com entrega, data-limite, teto de custo (9 de 14 a R$ 0,00), diretoria responsável e Plano B por escrito.`,
    href: '#balanco',
    linkLabel: 'Ver balanço 2025–2026',
  },
  {
    id: 'representacao',
    titulo: 'Representação estudantil e pautas do curso',
    icone: 'bi-megaphone',
    acento: 'raiz',
    dadoCurto: '0 de 75 posts sobre RU/FUMP',
    panorama:
      'Nos 75 posts do @cagp.ufmg, 27 foram sobre festa e nenhum tratou de RU, FUMP, bolsas ou rotina do noturno — embora pauta estudantil tenha tido 236 curtidas de mediana contra 54 de festa. Na articulação estudantil, também faltou divulgação e chamada aberta ao curso em agendas de assistência e direitos, como o convite do DCE/UFMG para o Seminário da UNE de Assistência Estudantil em Uberlândia (com transporte, alimentação e estrutura garantidos) e a vinda pública da deputada Erika Hilton à UFMG.',
    semente:
      'Todo convite externo com vaga ou auxílio publicado em até 48h (aberto ao curso caso a diretoria não vá) e agenda semanal pública toda quinta-feira.',
    href: '#redes-cagp',
    linkLabel: 'Ver análise das redes',
  },
];

export const DEBATE_DECLARACAO_INTERESSE =
  'A Chapa Semente (Chapa 2) concorre com a Chapa Reconecta (Chapa 1) na eleição de 25 e 26 de novembro de 2026. Duas integrantes da Semente, Larissa Prado e Lívia Martins, fizeram parte da gestão Reconecta; Gabriel Sathler, candidato a presidente pela Semente, integrou a gestão anterior (Principia), em que a dívida surgiu; os três participaram da construção da Empresa Júnior e continuam a integrá-la; e Ítalo de Morais idealizou o Minas Vira Voto, que atuou com o CAGP em outubro de 2026. Por isso cada informação tem fonte indicada e o canal de correção está aberto.';

export interface DebatePdf {
  id: string;
  titulo: string;
  meta: string;
  desc: string;
  href: string;
  principal?: boolean;
}

export const DEBATE_BOLETINS: readonly DebatePdf[] = [
  {
    id: 'boletim-gestao',
    titulo: 'Balanço da gestão 2025–2026',
    meta: 'Boletim curto · 344 KB',
    desc: '14 de 33 promessas mostradas, 75 posts do @cagp.ufmg e o resumo das entregas e lacunas.',
    href: '/documentos/debate/boletim-reconecta-2025-2026.pdf',
    principal: true,
  },
  {
    id: 'boletim-carta',
    titulo: 'Carta da Reconecta 2026–2027',
    meta: 'Boletim curto · 304 KB',
    desc: 'As 39 propostas do PDF vs. 42 do site, zero datas de entrega e o retorno de 23 promessas.',
    href: '/documentos/debate/boletim-carta-2027.pdf',
  },
  {
    id: 'boletim-divida',
    titulo: 'A dívida em uma página',
    meta: '1 página · 252 KB',
    desc: 'Quem tinha a receber nos R$ 4.505,50, o quadro Campanha × Documentos e o que evita repetição.',
    href: '/documentos/debate/boletim-divida-cagp.pdf',
  },
];

export const DEBATE_RELATORIOS: readonly DebatePdf[] = [
  {
    id: 'relatorio-gestao',
    titulo: 'Relatório completo: gestão 2025–2026',
    meta: 'PDF completo · 837 KB',
    desc: 'Método, ficha de cada uma das 33 propostas da carta de 2025, os 75 posts e referências.',
    href: '/documentos/debate/relatorio-reconecta-2025-2026.pdf',
  },
  {
    id: 'relatorio-carta',
    titulo: 'Relatório completo: carta 2026–2027',
    meta: 'PDF completo · 923 KB',
    desc: 'Análise proposta a proposta da versão do site de campanha, com nota datada de revisão.',
    href: '/documentos/debate/relatorio-carta-2027.pdf',
  },
  {
    id: 'dossie-divida',
    titulo: 'Dossiê completo: a dívida do CAGP',
    meta: '19 páginas · 567 KB',
    desc: 'Fontes, linha do tempo, Regimento Interno, análise pelos princípios do art. 8º, III e referências.',
    href: '/documentos/debate/dossie-divida-cagp.pdf',
  },
];

export interface PlacarLinha {
  situacao: string;
  quantas: number;
  criterio: string;
}

export const DEBATE_PLACAR_2025: readonly PlacarLinha[] = [
  { situacao: 'Fez e mostrou', quantas: 14, criterio: 'Consta do relatório da gestão e foi divulgada.' },
  { situacao: 'Fez pela metade', quantas: 10, criterio: 'Entregue em parte, ou menos vezes que o prometido.' },
  { situacao: 'Diz que fez, não mostrou', quantas: 4, criterio: 'Consta do relatório da gestão, sem registro público.' },
  { situacao: 'Não apareceu', quantas: 5, criterio: 'Sem registro no relatório e no Instagram.' },
];

export interface Leitura2025Linha {
  leitura: string;
  total: number;
  fezMostrou: number;
  metade: number;
  dizFez: number;
  naoApareceu: number;
}

export const DEBATE_LEITURA_2025: readonly Leitura2025Linha[] = [
  { leitura: 'Genérica', total: 11, fezMostrou: 5, metade: 2, dizFez: 2, naoApareceu: 2 },
  { leitura: 'Complexa sem plano', total: 4, fezMostrou: 0, metade: 2, dizFez: 0, naoApareceu: 2 },
  { leitura: 'Clara e viável', total: 12, fezMostrou: 5, metade: 4, dizFez: 2, naoApareceu: 1 },
  { leitura: 'Continuidade', total: 6, fezMostrou: 4, metade: 2, dizFez: 0, naoApareceu: 0 },
];

export const DEBATE_ENTREGAS_RECONHECIDAS: readonly { titulo: string; texto: string }[] = [
  { titulo: 'Dívida quitada', texto: 'Os R$ 4.505,50 foram pagos em abril de 2026, e o período terminou com R$ 5.574,34 em caixa.' },
  { titulo: 'Jornal e calouros', texto: 'Jornal do CAGP criado, com três edições, e calouros recebidos nos dois semestres.' },
  { titulo: 'AACs e visitas', texto: 'Quatro AACs com certificado e três visitas a órgãos públicos realizadas.' },
  { titulo: 'Passe livre', texto: 'Atuação pelo passe livre universitário, com audiência pública e abaixo-assinado.' },
  { titulo: 'Empresa Júnior', texto: 'Empresa Júnior em formalização, com estatuto e documentos levados a cartório.' },
];

export const DEBATE_LACUNAS_2025: readonly { titulo: string; texto: string }[] = [
  { titulo: 'Prestação de contas', texto: 'Prevista a cada dois meses nas redes sociais; houve uma apresentação geral em assembleia em 26 de outubro.' },
  { titulo: 'Acompanhamento das propostas', texto: 'Previsto para todo mês no mandato; não há registro público.' },
  { titulo: 'Ritmo de Jornal e AACs', texto: 'A carta previa frequência mensal; ocorreram 3 edições do jornal e 4 AACs em 11 meses.' },
  { titulo: 'CAGP Educa & Conecta', texto: 'As oficinas de R, Excel e Power BI, previstas para maio de 2026, não têm registro.' },
  { titulo: 'Escuta dos estudantes', texto: 'Houve três assembleias presenciais, mas o canal permanente de escuta não foi criado.' },
  { titulo: 'Comunicação da Empresa Júnior', texto: 'Primeiro post ocorreu apenas em 21 de setembro, sem informar etapas nem custos ao longo do ano.' },
];

export interface BarraInstagram {
  assunto: string;
  valor: number;
  labelValor: string;
  destaque?: boolean;
}

export const DEBATE_POSTS_ASSUNTO: readonly BarraInstagram[] = [
  { assunto: 'Festa (Desgovernados)', valor: 27, labelValor: '27 posts', destaque: true },
  { assunto: 'Política nacional', valor: 11, labelValor: '11' },
  { assunto: 'Calouros e integração', valor: 9, labelValor: '9' },
  { assunto: 'Gestão do CA', valor: 9, labelValor: '9' },
  { assunto: 'Acadêmico', valor: 8, labelValor: '8' },
  { assunto: 'Pauta estudantil', valor: 7, labelValor: '7' },
  { assunto: 'Jornal do CAGP', valor: 3, labelValor: '3' },
  { assunto: 'Outros', valor: 1, labelValor: '1' },
];

export const DEBATE_CURTIDAS_MEDIANA: readonly BarraInstagram[] = [
  { assunto: 'Pauta estudantil', valor: 236, labelValor: '236', destaque: true },
  { assunto: 'Política nacional', valor: 118, labelValor: '118' },
  { assunto: 'Calouros e integração', valor: 84.5, labelValor: '84,5' },
  { assunto: 'Acadêmico', valor: 68.5, labelValor: '68,5' },
  { assunto: 'Jornal do CAGP', valor: 64, labelValor: '64' },
  { assunto: 'Festa (Desgovernados)', valor: 54, labelValor: '54' },
  { assunto: 'Gestão do CA', valor: 37, labelValor: '37' },
];

export const DEBATE_INSTAGRAM_NOTA =
  'Média de 6,8 posts/mês (dez. 2025 a out. 2026), lidos em 13 nov. 2026. Zero posts encontrados sobre RU, FUMP, bolsas, aulas do noturno ou grade. Como são poucos posts por tema e curtidas também vêm de fora do curso, a mediana indica uma direção, não uma medida exata de preferência.';

export const DEBATE_SITE_VS_PDF: readonly { ponto: string; site: string; pdf: string }[] = [
  {
    ponto: 'Prestação de contas do caixa',
    site: '"Prestação de contas periódica com receitas, despesas, saldo e destino dos recursos"',
    pdf: 'Não há proposta sobre o tema (prestar contas aparece só sobre limpeza da salinha e assembleias)',
  },
  {
    ponto: 'Canal de dúvidas',
    site: 'Resposta "em até 1 semana"',
    pdf: 'Resposta "com agilidade", sem prazo máximo',
  },
  {
    ponto: 'Apoio jurídico',
    site: 'Pedidos registrados e, "a cada semestre, há um balanço público"',
    pdf: 'Entra no canal de dúvidas, sem o balanço público',
  },
  {
    ponto: 'Limpeza da salinha',
    site: '"Faxina semanal"',
    pdf: '"Mutirões recorrentes", sem frequência definida',
  },
  {
    ponto: 'Estatuto explicado',
    site: 'Revisão no mandato, com "melhorias votadas em assembleia"',
    pdf: 'Só o resumo do estatuto, dentro do portal',
  },
  {
    ponto: 'Só na carta em PDF',
    site: 'Não aparecem no site',
    pdf: 'Aprimoramento da recepção de calouros e WhatsApp do CAGP',
  },
];

export const DEBATE_CARTA_2027_COMPARATIVO: readonly { leitura: string; c2025: number; p2025: string; c2027: number; p2027: string }[] = [
  { leitura: 'Genérica', c2025: 11, p2025: '33%', c2027: 12, p2027: '31%' },
  { leitura: 'Complexa sem plano', c2025: 4, p2025: '12%', c2027: 6, p2027: '15%' },
  { leitura: 'Clara e viável', c2025: 12, p2025: '36%', c2027: 8, p2027: '21%' },
  { leitura: 'Continuidade', c2025: 6, p2025: '18%', c2027: 13, p2027: '33%' },
];

export const DEBATE_RETORNO_23: readonly { situacao: string; quantas: number; desc: string }[] = [
  { situacao: 'Feitas e divulgadas', quantas: 10, desc: 'Retomam propostas entregues e mostradas em 2025–2026.' },
  { situacao: 'Entregues em parte', quantas: 7, desc: 'Tiveram cumprimento parcial ou abaixo da frequência prometida.' },
  { situacao: 'Só no relatório', quantas: 2, desc: 'Citadas no relatório da gestão sem registro público.' },
  { situacao: 'Não apareceram', quantas: 4, desc: 'Monitoramento, CAGP Educa & Conecta, truco e suporte jurídico.' },
];

export const DEBATE_SEIS_COMPLEXAS: readonly string[] = [
  'Portal dos Estudantes (sem responsável técnico nem prazo no PDF)',
  'I Congresso Acadêmico de Gestão Pública (sem data, espaço ou orçamento)',
  'CAGP Educa & Reconecta (oficinas de análise de dados sem data de início)',
  'CAGP Explica (checagem de notícias sem método nem equipe)',
  'Rodas de conversa com parlamentares (sem agenda nem autorização)',
  'Canal de Dúvidas e Suporte Jurídico (revisão de contrato é ato privativo de advogado)',
];

export const DEBATE_QUATRO_NAO_SAIRAM: readonly string[] = [
  'Monitoramento da execução das propostas (era mensal em 2025; vira "continuamente" sem prazos estipulados)',
  'CAGP Educa & Conecta / Reconecta (oficinas de R, Excel e Power BI seguem sem data)',
  'Campeonatos de truco (não ocorreu em 2025–2026 e volta sem indicar o que muda)',
  'Suporte jurídico aos estudantes (perdeu o balanço semestral que constava no site)',
];

export const DEBATE_JA_NO_AR_SEMENTE: readonly { proposta: string; entrega: string; href: string; label: string }[] = [
  {
    proposta: 'Portal dos Estudantes, com normas, estágios e documentos',
    entrega: 'Guias de estágio, extensão e AAC, TCC, calouros, FUMP e os documentos oficiais já estão no ar.',
    href: '/guias',
    label: 'Abrir guias e documentos',
  },
  {
    proposta: 'Guia do Estudante, com regras da UFMG',
    entrega: '14 guias da vida na UFMG (sistemas, carteirinha, biblioteca, direitos e regras) com fontes.',
    href: '/regras-da-graduacao',
    label: 'Ver guias da UFMG',
  },
  {
    proposta: 'Canal de dúvidas e escuta',
    entrega: 'O "Fala com a gente" já funciona para erros, ideias e críticas ao site.',
    href: '/ouvidoria',
    label: 'Ir pro Fala com a gente',
  },
];

export const DEBATE_DIVIDA_NUMEROS: readonly DebateDestaque[] = [
  {
    numero: 'R$ 4.505,50',
    rotulo: 'Dívida quitada em abril',
    desc: 'Reconhecida pela gestão Principia em 2025 e paga em 8 abr. 2026 pela gestão Reconecta.',
  },
  {
    numero: '3 credores',
    rotulo: 'Todos de uma só gestão',
    desc: 'Integravam a diretoria da Principia (2025). Sem dívida com banco, fornecedor ou UFMG.',
  },
  {
    numero: 'R$ 3.505,50',
    rotulo: '77,8% para a atual direção',
    desc: 'Parte devida à atual presidência e vice-presidência do CAGP, que também assinaram a declaração.',
  },
];

export const DEBATE_DIVIDA_CREDORES: readonly {
  credor: string;
  cargo2025: string;
  cargo2026: string;
  valorNum: number;
  valor: string;
}[] = [
  {
    credor: 'Guilherme Nunes Martins',
    cargo2025: 'Diretor de Cultura',
    cargo2026: 'Vice-presidente',
    valorNum: 2505.5,
    valor: 'R$ 2.505,50',
  },
  {
    credor: 'Nina Queirolo Lage',
    cargo2025: 'Diretora Acadêmica',
    cargo2026: 'Presidente',
    valorNum: 1000,
    valor: 'R$ 1.000,00',
  },
  {
    credor: 'Ex-vice-presidente da gestão Principia',
    cargo2025: 'Vice-presidente',
    cargo2026: 'Não integra a gestão',
    valorNum: 1000,
    valor: 'R$ 1.000,00',
  },
];

export const DEBATE_DIVIDA_NOTA_LEGITIMIDADE =
  'Ressarcir quem pagou uma despesa do CA do próprio bolso é legítimo, e o Regimento (art. 53) orienta solucionar pendências de gestões anteriores. Este dossiê não aponta ilegalidade, desvio nem ganho pessoal: aponta lacunas de informação e o fato de dois dos três credores terem assinado, como dirigentes em 2026, a própria quitação.';

export const DEBATE_CAMPANHA_VS_DOCS: readonly { campanha: string; documentos: string }[] = [
  {
    campanha: '"dívidas herdadas das gestões anteriores"',
    documentos: 'Uma gestão só: a Principia, de 2025. A presidente e o vice-presidente de hoje eram diretores dela.',
  },
  {
    campanha: 'Calourada de 2025 deu dívida por "falta de mobilização de parte da gestão"',
    documentos: 'Pode ter pesado. Mas a calourada cabia à Diretoria de Cultura (Regimento, art. 33), ocupada em 2025 pelo vice-presidente de hoje. Sem as contas da festa, não dá para dizer quem errou.',
  },
  {
    campanha: '"Lucro de quase 10 mil reais" e, "além disso", 5 mil em caixa',
    documentos: 'O resultado do mandato foi de R$ 4.907,03 (só o das calouradas fica entre R$ 7,6 mil e R$ 9,7 mil). O caixa de R$ 5.574,34 é esse resultado mais os R$ 667,31 recebidos: não é dinheiro a mais.',
  },
];

export const DEBATE_DIVIDA_LACUNAS: readonly string[] = [
  'As despesas que compõem os R$ 4.505,50, com data, valor e comprovante.',
  'As contas da calourada de outubro de 2025 e a Nota Técnica nº 01/2025.',
  'Quem autorizou usar dinheiro próprio de integrantes e em que condições.',
  'O lançamento na planilha dos R$ 432,00 compensados em produtos (a planilha mostra Pix de R$ 4.073,50).',
];

export const DEBATE_DIVIDA_PREVENCAO: readonly string[] = [
  'Regra de impedimento: quem tem dinheiro a receber não decide nem assina o próprio pagamento.',
  'Proibição de adiantar dinheiro sem registro prévio no portal e limite aprovado.',
  'Reserva de funcionamento (R$ 4.500,00) no caixa e prestação mensal prevista no art. 30, XI do Regimento.',
];

export const DEBATE_MENSAGENS_WHATSAPP = {
  panorama:
    '📊 *Análise da gestão atual antes do debate (24/11 às 18h)* — Veja o panorama com fontes públicas:\n• 14 de 33 promessas entregues e mostradas\n• 39 propostas na nova carta e 0 datas de entrega\n• Dossiê dos R$ 4.505,50 (77,8% cabiam à atual direção)\n• 0 de 75 posts sobre RU, FUMP ou bolsas\nLeia e baixe os boletins:',
  balanco:
    '📈 *Balanço da gestão 2025–2026 do CAGP* — Reconhecendo as entregas reais e mostrando o que ficou no papel: 14 de 33 promessas mostradas, 27 de 75 posts sobre festa e 0 sobre RU, FUMP ou bolsas. Tudo com fonte:',
  divida:
    '📄 *Dossiê da dívida do CAGP em 1 página* — Os documentos mostram que R$ 3.505,50 (77,8%) dos R$ 4.505,50 quitados em abril eram devidos à própria presidência e vice-presidência atuais. Sem acusação de ilegalidade, com todas as fontes e declaração de interesse:',
} as const;
