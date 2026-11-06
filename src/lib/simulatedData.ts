// src/lib/simulatedData.ts — Fonte isolada de dados simulados para demonstração da proposta (Entrega final: Fev/2027)
import type { UserRole } from './storage/studentVault';
import { route } from './paths';

export const SIMULATION_NOTICE =
  'Conteúdo simulado — o Super App é uma proposta; a versão final será entregue no fim de fevereiro de 2027.';

export const SIMULATION_BADGE_TEXT = 'Simulação • Proposta Fev/2027';

export type NewsCategory = 'todas' | 'assembleia' | 'estagio' | 'academico' | 'eventos';

export interface SimulatedNewsRelatedLink {
  label: string;
  href: string;
}

export interface SimulatedNewsItem {
  id: string;
  slug: string;
  simulated: true;
  category: Exclude<NewsCategory, 'todas'>;
  tag: string;
  tagColor: 'burgundy' | 'gold' | 'green' | 'blue';
  title: string;
  summary: string;
  body: string;
  fullContent: string[];
  highlights: string[];
  author: string;
  readingTime: string;
  meta: string;
  dateLabel: string;
  ctaLabel: string;
  ctaHref?: string;
  relatedLinks: SimulatedNewsRelatedLink[];
  relevantRoles: UserRole[];
  motif: 'assembleia' | 'carreiras' | 'calourada' | 'congresso';
}

export const SIMULATED_NEWS: SimulatedNewsItem[] = [
  {
    id: 'sim-news-assembleia',
    slug: 'assembleia-ru-noturno-bolsas-fafich',
    simulated: true,
    category: 'assembleia',
    tag: 'Assembleia Geral • CAGP',
    tagColor: 'burgundy',
    title: 'Assembleia discute ampliação do RU Noturno, bolsas e pauta da FAFICH',
    summary:
      'Convocação ordinária no Auditório B102 para deliberar sobre permanência no turno noturno, fluxo do Bandejão e representação discente nos colegiados.',
    body:
      'Simulação de pauta discente: convocação de estudantes do Bacharelado em Gestão Pública para Assembleia Geral Ordinária às 18h30 no Auditório B102 da FAFICH. A ordem do dia contempla: (1) avaliação do fluxo do jantar no Bandejão RU II; (2) acompanhamento das bolsas de extensão do PPC 2020; e (3) informes das comissões discentes.',
    fullContent: [
      'A Diretoria Executiva do Centro Acadêmico de Gestão Pública (CAGP), no uso de suas atribuições estatutárias (Art. 17 do Regimento de 14/10/2024), convoca os estudantes de todos os períodos para a Assembleia Geral Ordinária a ser realizada às 18h30 no Auditório B102 da FAFICH.',
      'O primeiro ponto de pauta aborda a ergonomia do turno noturno: o monitoramento conjunto entre o CAGP, o DA FAFICH e a FUMP sobre o tempo de fila no Restaurante Universitário Setorial II entre 18h15 e 19h00 — janela crítica para estudantes trabalhadores que se deslocam direto para as aulas das 19h00 no 3º andar.',
      'No segundo ponto, a Diretoria de Ensino, Pesquisa e Extensão apresentará o levantamento semestral de editais de extensão universitária compatíveis com a creditação obrigatória de 300 horas prevista no PPC 2020 (Versão 2020/1), garantindo que estudantes do noturno tenham acesso a projetos com atividades remotas ou vespertinas/noturnas.',
      'Por fim, serão eleitos os suplentes da representação discente junto ao Colegiado do Curso de Gestão Pública (Sala F-2039) e à Câmara Departamental do Departamento de Ciência Política (DCP). A presença na Assembleia Geral é registrada em ata pública disponibilizada no Portal da Transparência do CAGP.',
    ],
    highlights: [
      'Local e horário: Auditório B102 (FAFICH) às 18h30 em primeira convocação e 18h45 em segunda convocação.',
      'Pauta 1: Fluxo do Jantar no Bandejão RU II Setorial (17h30–19h30) e iluminação das paradas do Circular Interno.',
      'Pauta 2: Mapeamento de vagas em programas e projetos para integralização das 300h de Extensão Universitária.',
      'Pauta 3: Indicação de representantes discentes titulares e suplentes nos órgãos colegiados (Art. 29, VII).',
    ],
    author: 'Diretoria Executiva & Secretaria-Geral do CAGP',
    readingTime: '4 min de leitura',
    meta: 'Auditório B102 • 18h30',
    dateLabel: 'Pauta demonstrativa • Diretoria CAGP',
    ctaLabel: 'Consultar Estatuto e Governança',
    ctaHref: route('/sobre') + '#governanca',
    relatedLinks: [
      { label: 'Estatuto e Governança do CAGP', href: route('/sobre') + '#governanca' },
      { label: 'Portal da Transparência do CAGP', href: route('/transparencia') },
      { label: 'Diretorias e Gestão Discente', href: route('/gestao') },
    ],
    relevantRoles: ['calouro', 'veterano', 'formando', 'ingressar'],
    motif: 'assembleia',
  },
  {
    id: 'sim-news-estagio',
    slug: 'edital-simulado-estagio-politicas-publicas',
    simulated: true,
    category: 'estagio',
    tag: 'Estágio & Carreiras',
    tagColor: 'gold',
    title: 'Edital Simulado — Vagas de estágio em Políticas Públicas e Gestão Municipal',
    summary:
      'Oportunidade demonstrativa voltada a estudantes a partir do 3º período com atuação em avaliação de programas, compras públicas e orçamento.',
    body:
      'Simulação de oportunidade profissional: seleção demonstrativa para estágio supervisionado (compatível com DCP 135 / DCP 136) em órgãos de gestão pública em Belo Horizonte. Carga de 20h ou 30h semanais, bolsa-auxílio compatível e supervisão técnica na área de políticas públicas.',
    fullContent: [
      'A Comissão de Carreiras e Articulação Institucional do CAGP divulga este edital demonstrativo para ilustrar como o Mural de Notícias conecta estudantes do Bacharelado em Gestão Pública às vagas de estágio não obrigatório e obrigatório em órgãos municipais, estaduais, federais e organizações do terceiro setor em Belo Horizonte.',
      'De acordo com a Resolução do Colegiado de 21/11/2024, o Estágio Curricular Obrigatório soma 300 horas divididas entre Estágio Supervisionado I (DCP 135, 150h no 8º período) e Estágio Supervisionado II (DCP 136, 150h no 9º período). Contudo, estudantes a partir do 3º período já podem atuar em estágios não obrigatórios que desenvolvam competências em planejamento governamental, análise de dados públicos e gestão de contratos.',
      'Atenção à regra de ouro do regulamento: nenhuma hora de estágio curricular é contabilizada retroativamente sem a prévia assinatura do Termo de Compromisso de Estágio (TCE) e do Plano de Atividades no SEI-UFMG pela Coordenação de Estágios do curso.',
      'Para estudantes que já trabalham em tempo integral na administração pública ou em funções correlatas de gestão de políticas públicas, o Art. 41 do Regulamento de Estágio permite pleitear o aproveitamento de atuação profissional para dispensa de até 100% da carga horária das disciplinas DCP 135 e DCP 136.',
    ],
    highlights: [
      'Requisitos demonstrativos: Matrícula ativa entre o 3º e o 9º período do Bacharelado em Gestão Pública (FAFICH/UFMG).',
      'Jornada compatível com o turno noturno: 20h semanais (4h diárias) ou 30h semanais (6h diárias).',
      'Obrigatoriedade normativa: Assinatura prévia do TCE e Plano de Atividades via SEI antes do início da contagem de horas.',
      'Alternativa para trabalhadores: Consulte o simulador do Art. 41 para dispensa por atuação profissional comprovada.',
    ],
    author: 'Diretoria de Ensino & Comissão de Carreiras CAGP',
    readingTime: '5 min de leitura',
    meta: '3º ao 9º Período • 20h/sem',
    dateLabel: 'Demonstração • Mural de Carreiras',
    ctaLabel: 'Abrir Guia de Estágio e Art. 41',
    ctaHref: route('/estagio'),
    relatedLinks: [
      { label: 'Regulamento de Estágio e Simulador Art. 41', href: route('/estagio') },
      { label: 'Modelos de Termo de Compromisso e Relatórios (.docx)', href: route('/documentos') + '#formularios' },
      { label: 'Calculadora de 600h (Extensão + AAC)', href: route('/acg') },
    ],
    relevantRoles: ['veterano', 'formando', 'calouro'],
    motif: 'carreiras',
  },
  {
    id: 'sim-news-calourada',
    slug: 'semana-recepcao-calourada-atletica',
    simulated: true,
    category: 'eventos',
    tag: 'Calourada & Atlética',
    tagColor: 'green',
    title: 'Semana de Recepção Discente, Tour Noturno na FAFICH e Integração com a Atlética',
    summary:
      'Roda de conversa sobre Estado e Democracia, apadrinhamento de calouros no noturno, guia de sobrevivência no campus e integração esportiva.',
    body:
      'Simulação de programação de acolhimento: recepção aos ingressantes do Bacharelado em Gestão Pública às 18h15 no saguão da FAFICH, seguida de tour guiado pela Biblioteca, Sala F-2039, cantina e apresentação do SIGA. Às 21h, integração com a Atlética e veteranos.',
    fullContent: [
      'A chegada à Universidade Federal de Minas Gerais no turno noturno exige orientação rápida e acolhimento entre pares. Por isso, o Centro Acadêmico de Gestão Pública (CAGP) e a Atlética organizam semestralmente a Semana de Recepção Discente, pensada para integrar os calouros desde o primeiro dia letivo na FAFICH.',
      'A programação tem início às 18h15 no saguão principal da FAFICH com a entrega do Guia de Sobrevivência do Calouro e o Tour Noturno: visitamos a Secretaria do Colegiado no 2º andar (Sala F-2039), a Biblioteca da FAFICH, os auditórios, as salas de aula do 3º andar e o trajeto seguro até o Bandejão RU II Setorial e os pontos do Circular Interno.',
      'Nas mesas acadêmicas de abertura, docentes do Departamento de Ciência Política (DCP) e egressos convidados debatem os desafios contemporâneos da administração pública brasileira e explicam o funcionamento dos 3 percursos curriculares do PPC 2020 (Gestão Pública Geral, Políticas Setoriais e Métodos Quantitativos). A participação nas mesas confere certificado válido para Atividades Acadêmicas Complementares (AAC).',
      'Encerrando a programação, a Diretoria de Eventos e Cultura e a Atlética promovem o apadrinhamento entre veteranos e ingressantes, apresentando as modalidades esportivas, baterias universitárias e espaços de convivência da FAFICH.',
    ],
    highlights: [
      '18h15 — Recepção no Saguão da FAFICH e Tour Noturno (Sala F-2039, Biblioteca, 3º andar e paradas do Circular).',
      '19h15 — Mesa de abertura: "O Campo de Públicas na UFMG e os 3 Percursos do PPC 2020" (vale certificado AAC).',
      '20h45 — Oficina prática de sobrevivência digital: MinhaUFMG, eduroam, questionário da FUMP e matrícula no SIGA.',
      '21h30 — Apadrinhamento de turma e integração com a Atlética e coletivos estudantis.',
    ],
    author: 'Diretoria de Eventos, Cultura & Comissão de Recepção',
    readingTime: '4 min de leitura',
    meta: 'Valendo horas AAC • 18h15',
    dateLabel: 'Demonstração • Comissão de Recepção',
    ctaLabel: 'Abrir Guia Completo do Calouro',
    ctaHref: route('/calouros'),
    relatedLinks: [
      { label: 'Guia de Sobrevivência do Calouro', href: route('/calouros') },
      { label: 'Grafo Curricular de 10 Períodos', href: route('/percurso') },
      { label: 'Conheça o CAGP e sua História', href: route('/sobre') },
    ],
    relevantRoles: ['calouro', 'ingressar', 'veterano'],
    motif: 'calourada',
  },
  {
    id: 'sim-news-congresso',
    slug: 'seminario-estado-orcamento-govtech',
    simulated: true,
    category: 'academico',
    tag: 'Seminário & Pesquisa',
    tagColor: 'blue',
    title: 'Seminário de Estado, Orçamento e GovTech recebe submissões de resumos',
    summary:
      'Chamada simulada de trabalhos de iniciação científica e relatos de extensão vinculados aos 11 núcleos temáticos do DCP/UFMG.',
    body:
      'Simulação de evento acadêmico: chamada para apresentação de pôsteres, artigos e relatos de extensão universitária em Gestão Pública. Certificados emitidos contam para o teto de Atividades Acadêmicas Complementares (lembre-se da trava de 120 dias do Art. 15, § 4º após a realização do evento).',
    fullContent: [
      'O Seminário Discente de Estado, Orçamento Público e Transformação Governamental (GovTech) é uma iniciativa demonstrativa que articula os estudantes da graduação em Gestão Pública com os 11 grupos de pesquisa e extensão vinculados ao Departamento de Ciência Política (DCP) e à FAFICH/UFMG.',
      'Estudantes do 1º ao 10º período podem submeter resumos expandidos em quatro eixos temáticos: (1) Instituições Democráticas, Legislativo e Judiciário; (2) Planejamento, Finanças Públicas e Federalismo Fiscal; (3) Avaliação de Políticas Sociais, Urbanas e Ambientais; e (4) Governo Digital, Transparência Ativa e Inovação no Setor Público.',
      'Tanto a participação como ouvinte quanto a apresentação de trabalhos geram certificados oficiais contabilizáveis nas Atividades Acadêmicas Complementares (AAC). Recordamos a exigência normativa da Resolução de 21/11/2024 (Art. 15, § 4º): todo certificado de evento deve ser protocolado no Colegiado via SEI-UFMG dentro do prazo improrrogável de 120 dias corridos após a realização da atividade.',
      'Para estudantes do 9º e 10º períodos, os artigos completos apresentados e aprovados nas sessões coordenadas podem servir como base para o Trabalho de Conclusão de Curso (TCC) na modalidade de Artigo Científico (Art. 19 do Regulamento de TCC).',
    ],
    highlights: [
      '4 Grupos de Trabalho alinhados aos núcleos do DCP (NEPEM, MARGEM, CEDEPLAR, Centro de Estudos Legislativos e outros).',
      'Creditação direta no teto de 600h (AAC e Extensão) conforme barema da Resolução de 21/11/2024.',
      'Alerta do Guardião 120d: protocole o certificado no SEI em até 120 dias após o encerramento do evento (Art. 15, § 4º).',
      'Integração com TCC: possibilidade de desenvolvimento na modalidade de Artigo Científico ou Relatório Técnico.',
    ],
    author: 'Diretoria de Ensino, Pesquisa e Extensão • CAGP',
    readingTime: '5 min de leitura',
    meta: 'Submissão demonstrativa • AAC',
    dateLabel: 'Demonstração • Pesquisa & Extensão',
    ctaLabel: 'Conhecer os 11 Núcleos de Pesquisa',
    ctaHref: route('/pesquisa'),
    relatedLinks: [
      { label: 'Os 11 Núcleos de Pesquisa e Extensão do Curso', href: route('/pesquisa') },
      { label: 'Guardião de 120 Dias e Calculadora 600h', href: route('/acg') },
      { label: 'As 4 Modalidades de TCC (180h)', href: route('/tcc') },
    ],
    relevantRoles: ['veterano', 'formando', 'ingressar'],
    motif: 'congresso',
  },
  {
    id: 'sim-news-enecp',
    slug: 'delegacao-ufmg-encontro-nacional-campo-de-publicas',
    simulated: true,
    category: 'academico',
    tag: 'Congresso Nacional • ENECP',
    tagColor: 'blue',
    title: 'Organização da delegação discente da UFMG para o Encontro Nacional do Campo de Públicas',
    summary:
      'Articulação simulada de caravana estudantil, submissão de trabalhos coletivos e apoio do Fundo Discente para representação da FAFICH.',
    body:
      'Simulação de mobilização acadêmica: abertura de cadastro de interesse para compor a delegação do Bacharelado em Gestão Pública da UFMG no Encontro Nacional de Estudantes do Campo de Públicas (ENECP).',
    fullContent: [
      'A presença histórica dos estudantes da UFMG nos encontros regionais e nacionais do Campo de Públicas (ENECP e Congresso da ANEPCP) fortalece a identidade do nosso bacharelado e projeta as pesquisas desenvolvidas na FAFICH em âmbito nacional.',
      'Nesta simulação de chamada, a Diretoria de Ensino, Pesquisa e Extensão e a Diretoria de Finanças e Patrimônio apresentam o cronograma de organização da delegação discente, incluindo oficinas de preparação de resumos, revisão colaborativa entre veteranos e calouros e solicitação de auxílio transporte junto à direção da unidade.',
      'Os critérios de distribuição de eventuais apoios logísticos do Fundo Discente seguem estritamente os princípios de publicidade e controle social previstos no Art. 8º, Parágrafo Único do Estatuto do CAGP, com prestação de contas integral no Portal da Transparência.',
    ],
    highlights: [
      'Oficina de escrita de resumos científicos e relatos de experiência para estudantes a partir do 1º período.',
      'Aproveitamento de horas: apresentação de trabalho em evento nacional pontua no Grupo I de AAC.',
      'Transparência: critérios públicos de seleção e prestação de contas no Portal da Transparência do CAGP.',
    ],
    author: 'Diretoria de Ensino, Pesquisa e Extensão • CAGP',
    readingTime: '4 min de leitura',
    meta: 'Delegação UFMG • Campo de Públicas',
    dateLabel: 'Demonstração • Articulação Nacional',
    ctaLabel: 'Simular Horas no Barema AAC',
    ctaHref: route('/acg') + '#calculadora',
    relatedLinks: [
      { label: 'Barema Oficial de AAC e Extensão', href: route('/acg') },
      { label: 'Portal da Transparência do CAGP', href: route('/transparencia') },
    ],
    relevantRoles: ['calouro', 'veterano', 'formando', 'ingressar'],
    motif: 'congresso',
  },
  {
    id: 'sim-news-colegiado-optativas',
    slug: 'consulta-discente-oferta-optativas-noturno',
    simulated: true,
    category: 'assembleia',
    tag: 'Representação • Colegiado DCP',
    tagColor: 'burgundy',
    title: 'Consulta discente sobre demanda de disciplinas optativas para o próximo semestre letivo',
    summary:
      'Levantamento simulado conduzido pelos representantes discentes para mapear interesse nos 3 percursos formativos antes da montagem de horários.',
    body:
      'Simulação de consulta participativa: a representação discente no Colegiado do Curso coleta prioridades de oferta entre as 68 optativas do PPC 2020 para subsidiar o planejamento semestral do turno noturno.',
    fullContent: [
      'A escolha das disciplinas optativas é um dos momentos mais estratégicos da trajetória no Bacharelado em Gestão Pública: são 720 horas (12 disciplinas de 60h) que definem se o estudante concluirá a graduação no Percurso 01-01 (Formação em Gestão Pública), no Percurso 01-02 (Formação Complementar em Políticas Setoriais) ou no Percurso 01-03 (Formação Complementar em Métodos Quantitativos).',
      'Nesta notícia demonstrativa, a representação discente junto ao Colegiado consolida as demandas das turmas do 3º ao 10º período para apresentar à Coordenação na reunião ordinária de planejamento de encargos didáticos.',
      'Recomendamos que cada estudante utilize o Explorador de 68 Optativas e o Grafo Curricular de 10 Períodos disponíveis neste Super App para verificar os pré-requisitos formais (como a cadeia DCP 128 → DCP 129 e a trava ECN 140 → ECN 044) antes do período de requerimento de matrícula no SIGA.',
    ],
    highlights: [
      'Mapeamento de demanda para os Percursos 01-01 (Geral), 01-02 (Políticas Setoriais) e 01-03 (Métodos Quantitativos).',
      'Prioridade de oferta no horário noturno (19h00–22h30) para evitar conflito com jornada de trabalho diurna.',
      'Verificação antecipada de pré-requisitos no Grafo 10P antes da abertura da 1ª fase do SIGA.',
    ],
    author: 'Representação Discente no Colegiado • CAGP',
    readingTime: '4 min de leitura',
    meta: 'Colegiado F-2039 • Planejamento',
    dateLabel: 'Demonstração • Representação Discente',
    ctaLabel: 'Explorar as 68 Optativas',
    ctaHref: route('/optativas'),
    relatedLinks: [
      { label: 'Catálogo Interativo das 68 Optativas', href: route('/optativas') },
      { label: 'Grafo Curricular e Trava ECN 140 → ECN 044', href: route('/percurso') },
      { label: 'Documentos e Ementário Completo', href: route('/documentos') },
    ],
    relevantRoles: ['veterano', 'formando', 'calouro'],
    motif: 'assembleia',
  },
];

export interface SimulatedTransparencyEntry {
  id: string;
  code: string;
  simulated: true;
  date: string;
  description: string;
  category: 'Fundo Discente' | 'Acolhimento' | 'Acadêmico' | 'Patrimônio & Sede' | 'Comunicação';
  type: 'receita' | 'despesa';
  amount: string;
  amountValue: number;
  documentRef: string;
  status: 'Homologado em Ata' | 'Auditado pelo Conselho';
}

export interface SimulatedRreoMonth {
  id: string;
  simulated: true;
  month: string;
  inflow: string;
  outflow: string;
  endingBalance: string;
  status: string;
}

export interface SimulatedGovernanceRecord {
  id: string;
  simulated: true;
  code: string;
  date: string;
  title: string;
  organ: string;
  summary: string;
}

export const SIMULATED_TRANSPARENCY = {
  simulated: true as const,
  notice: SIMULATION_NOTICE,
  referencePeriod: 'Balancete Demonstrativo • 2026/2 (Simulação)',
  balance: 'R$ 1.840,00',
  totalIn: 'R$ 2.650,00',
  totalOut: 'R$ 810,00',
  reserveFund: 'R$ 500,00',
  statuteDate: '14/10/2024',
  entries: [
    {
      id: 'tr-1',
      code: 'LANC-2026-01',
      simulated: true as const,
      date: 'Ago/2026',
      description: 'Saldo remanescente transferido em termo de posse da gestão anterior (Simulação)',
      category: 'Fundo Discente' as const,
      type: 'receita' as const,
      amount: '+ R$ 720,00',
      amountValue: 720,
      documentRef: 'Termo de Posse #01/2026',
      status: 'Auditado pelo Conselho' as const,
    },
    {
      id: 'tr-2',
      code: 'LANC-2026-02',
      simulated: true as const,
      date: 'Set/2026',
      description: 'Arrecadação de kits discentes, cordões e adesivos Candangos na Calourada (Simulação)',
      category: 'Fundo Discente' as const,
      type: 'receita' as const,
      amount: '+ R$ 1.450,00',
      amountValue: 1450,
      documentRef: 'Relatório RREO Set/2026',
      status: 'Homologado em Ata' as const,
    },
    {
      id: 'tr-3',
      code: 'LANC-2026-03',
      simulated: true as const,
      date: 'Set/2026',
      description: 'Impressão de guias de acolhimento noturno e sinalização de salas na FAFICH (Simulação)',
      category: 'Acolhimento' as const,
      type: 'despesa' as const,
      amount: '- R$ 310,00',
      amountValue: 310,
      documentRef: 'NF Simulada #0042',
      status: 'Homologado em Ata' as const,
    },
    {
      id: 'tr-4',
      code: 'LANC-2026-04',
      simulated: true as const,
      date: 'Out/2026',
      description: 'Contribuição espontânea de egressos para o Fundo de Apoio a Eventos (Simulação)',
      category: 'Fundo Discente' as const,
      type: 'receita' as const,
      amount: '+ R$ 480,00',
      amountValue: 480,
      documentRef: 'Relatório RREO Out/2026',
      status: 'Homologado em Ata' as const,
    },
    {
      id: 'tr-5',
      code: 'LANC-2026-05',
      simulated: true as const,
      date: 'Out/2026',
      description: 'Manutenção de insumos de convivência e organização do espaço discente (Simulação)',
      category: 'Patrimônio & Sede' as const,
      type: 'despesa' as const,
      amount: '- R$ 180,00',
      amountValue: 180,
      documentRef: 'NF Simulada #0058',
      status: 'Auditado pelo Conselho' as const,
    },
    {
      id: 'tr-6',
      code: 'LANC-2026-06',
      simulated: true as const,
      date: 'Nov/2026',
      description: 'Apoio logístico e emissão de certificados do Seminário de Políticas Públicas (Simulação)',
      category: 'Acadêmico' as const,
      type: 'despesa' as const,
      amount: '- R$ 320,00',
      amountValue: 320,
      documentRef: 'NF Simulada #0071',
      status: 'Homologado em Ata' as const,
    },
  ] satisfies SimulatedTransparencyEntry[],
  rreoMonthly: [
    {
      id: 'rreo-ago',
      simulated: true as const,
      month: 'Agosto / 2026',
      inflow: '+ R$ 720,00',
      outflow: 'R$ 0,00',
      endingBalance: 'R$ 720,00',
      status: 'Publicado (Art. 30, V)',
    },
    {
      id: 'rreo-set',
      simulated: true as const,
      month: 'Setembro / 2026',
      inflow: '+ R$ 1.450,00',
      outflow: '- R$ 310,00',
      endingBalance: 'R$ 1.860,00',
      status: 'Publicado (Art. 30, V)',
    },
    {
      id: 'rreo-out',
      simulated: true as const,
      month: 'Outubro / 2026',
      inflow: '+ R$ 480,00',
      outflow: '- R$ 180,00',
      endingBalance: 'R$ 2.160,00',
      status: 'Publicado (Art. 30, V)',
    },
    {
      id: 'rreo-nov',
      simulated: true as const,
      month: 'Novembro / 2026',
      inflow: 'R$ 0,00',
      outflow: '- R$ 320,00',
      endingBalance: 'R$ 1.840,00',
      status: 'Em consolidação',
    },
  ] satisfies SimulatedRreoMonth[],
  governanceRecords: [
    {
      id: 'ata-01',
      simulated: true as const,
      code: 'ATA-AG-2026/01',
      date: 'Ago/2026',
      title: 'Ata Simulada da Assembleia Geral de Abertura do Semestre Letivo',
      organ: 'Assembleia Geral (Art. 17)',
      summary: 'Aprovação do plano semestral de acolhimento noturno e calendário de reuniões abertas.',
    },
    {
      id: 'ata-02',
      simulated: true as const,
      code: 'PARECER-CF-2026/01',
      date: 'Out/2026',
      title: 'Parecer Demonstrativo do Conselho Fiscal sobre o 1º Bimestre',
      organ: 'Conselho Fiscal e Consultivo (Art. 36)',
      summary: 'Conferência de comprovantes e homologação do balancete semestral sem ressalvas.',
    },
    {
      id: 'ata-03',
      simulated: true as const,
      code: 'INV-PAT-2026/02',
      date: 'Nov/2026',
      title: 'Inventário Simulado de Bens e Materiais sob Guarda do CAGP',
      organ: 'Diretoria de Finanças e Patrimônio (Art. 30, VII)',
      summary: 'Catalogação de livros do acervo discente, equipamentos de som, banners e materiais de eventos.',
    },
  ] satisfies SimulatedGovernanceRecord[],
};

export interface SimulatedTestimonial {
  id: string;
  simulated: true;
  roleLabel: string;
  cohortLabel: string;
  area: string;
  quote: string;
}

export const SIMULATED_INGRESSAR_DATA = {
  simulated: true as const,
  notice: SIMULATION_NOTICE,
  highlights: [
    {
      id: 'ing-1',
      simulated: true as const,
      metric: '3.000h',
      label: 'Carga Horária PPC 2020',
      detail: '10 períodos no turno noturno, pensado para quem trabalha ou estagia durante o dia.',
    },
    {
      id: 'ing-2',
      simulated: true as const,
      metric: '3 Eixos Formativos',
      label: 'Percursos Curriculares',
      detail: 'Gestão Pública Geral (01-01), Políticas Setoriais (01-02) ou Métodos Quantitativos (01-03).',
    },
    {
      id: 'ing-3',
      simulated: true as const,
      metric: 'Art. 41',
      label: 'Aproveitamento Profissional',
      detail: 'Quem já atua na administração pública pode pleitear dispensa de estágio supervisionado.',
    },
  ],
  testimonials: [
    {
      id: 'test-1',
      simulated: true as const,
      roleLabel: 'Perfil Simulado • Atuação em Planejamento e Orçamento',
      cohortLabel: 'Relato Demonstrativo de Egresso(a)',
      area: 'Setor Público Estadual / Municipal',
      quote:
        'A formação noturna na FAFICH permite conciliar o trabalho diurno com uma base sólida em ciência política, direito administrativo, economia do setor público e avaliação de políticas.',
    },
    {
      id: 'test-2',
      simulated: true as const,
      roleLabel: 'Perfil Simulado • Atuação em Avaliação de Impacto e Terceiro Setor',
      cohortLabel: 'Relato Demonstrativo de Egresso(a)',
      area: 'Organizações da Sociedade Civil & GovTech',
      quote:
        'O percurso em métodos quantitativos e as 300h de extensão obrigatória conectam a sala de aula com problemas reais de gestão urbana, saúde e educação em Minas Gerais.',
    },
  ],
};
