// src/lib/navigationRegistry.ts — Registro central de navegação (Modelo B, por tarefa)
//
// Fonte única da navegação: barra inferior, cabeçalho do celular, trilho do desktop,
// busca (⌘K), hubs (/guias, /meu-curso, /mais), JourneyNav e transições de página
// leem daqui. Não duplique esta lista em outro arquivo.
//
// Regra: cada rota pertence a UMA aba (é ela que acende na barra). Atalhos para
// rotas de outras abas podem existir nos hubs, mas não mudam o dono da rota.
import { route } from './paths';

export type AxisId = 'hoje' | 'guias' | 'chapa' | 'curso' | 'mais';
export type FeatureType = 'hub' | 'overview' | 'page' | 'tool' | 'guide' | 'catalog';

export interface NavigationItem {
  id: string;
  label: string;
  shortLabel: string;
  href: string;
  icon: string;
  /** Uma linha dizendo o que a página resolve (aparece nos hubs e no JourneyNav). */
  description: string;
  type: FeatureType;
  /** Grupo dentro do hub da aba (ver `groups` do eixo). */
  group?: string;
  isOverview?: boolean;
  badge?: string;
  /** Termos que o estudante usa na busca e que não estão no título. */
  keywords?: string;
  match: string[];
}

export interface AxisGroup {
  id: string;
  title: string;
}

export interface AxisConfig {
  id: AxisId;
  number: number;
  name: string;
  /** Rótulo da barra inferior no celular (cabe em ~70px com Poppins Bold 12px). */
  mobileLabel: string;
  tagline: string;
  /** O que se resolve na aba, em até cinco palavras (faixa "O que tem em cada aba" e a cartilha). */
  resumo: string;
  icon: string;
  /** Mantido por compatibilidade; eixos não pintam interface (DESIGN.md › Rubro Is a Seal). */
  color: string;
  rootHref: string;
  /** Grupos do hub, na ordem em que aparecem. */
  groups?: AxisGroup[];
  items: NavigationItem[];
}

export const AXIS_REGISTRY: AxisConfig[] = [
  {
    id: 'hoje',
    number: 1,
    // O id segue 'hoje' (estágio, ícone, dados salvos); o nome na tela é "Início" desde 12/11/2026:
    // quem abria o site pela primeira vez não lia "Hoje" como a página inicial.
    name: 'Início',
    mobileLabel: 'Início',
    tagline: 'O que está acontecendo agora no campus e no curso',
    resumo: 'RU, ônibus e prazos de hoje',
    icon: 'bi-compass',
    color: '#5B2A85',
    rootHref: route('/'),
    items: [
      {
        id: 'hoje-inicio',
        label: 'Início',
        shortLabel: 'Início',
        href: route('/'),
        icon: 'bi-compass',
        description: 'RU hoje à noite, ônibus internos, próximos prazos e atalhos para o seu perfil.',
        type: 'overview',
        isOverview: true,
        keywords: 'home início ru restaurante circular ônibus prazos',
        match: ['^/$'],
      },
      {
        id: 'hoje-noticias',
        label: 'Mural de notícias',
        shortLabel: 'Mural',
        href: route('/noticias'),
        icon: 'd-mural',
        description: 'Exemplo de mural com assembleias, editais e eventos (conteúdo simulado).',
        type: 'catalog',
        keywords: 'notícias avisos assembleia eventos editais',
        match: ['^/noticias'],
      },
    ],
  },
  {
    id: 'guias',
    number: 2,
    name: 'Guias',
    mobileLabel: 'Guias',
    tagline: 'Passo a passo dos trâmites e os documentos de cada um',
    resumo: 'Estágio, FUMP e documentos',
    icon: 'thesis',
    color: '#5B2A85',
    rootHref: route('/guias'),
    groups: [
      { id: 'documentos', title: 'Documentos' },
      { id: 'comecando', title: 'Começando' },
      { id: 'campus', title: 'No campus' },
      { id: 'durante', title: 'Durante o curso' },
      { id: 'apoio', title: 'Apoio e direitos' },
      { id: 'terminando', title: 'Terminando' },
      { id: 'duvidas', title: 'Dúvidas' },
    ],
    items: [
      {
        id: 'guias-hub',
        label: 'Todos os guias',
        shortLabel: 'Guias',
        href: route('/guias'),
        icon: 'thesis',
        description: 'Todos os trâmites do curso e os documentos mais pedidos.',
        type: 'hub',
        isOverview: true,
        match: ['^/guias'],
      },
      {
        id: 'guias-documentos',
        label: 'Documentos e requerimentos',
        shortLabel: 'Documentos',
        href: route('/documentos'),
        icon: 'd-documentos',
        description: 'Formulários, requerimentos e normas oficiais para baixar e enviar.',
        type: 'catalog',
        group: 'documentos',
        keywords: 'formulário requerimento tce termo de compromisso plano de atividades colação aproveitamento trancamento resolução norma pdf',
        match: ['^/documentos', '^/doc/'],
      },
      {
        id: 'guias-calouros',
        label: 'Guia do calouro',
        shortLabel: 'Calouro',
        href: route('/calouros'),
        icon: 'd-calouro',
        description: 'Checklist dos primeiros 30 dias, mapa do campus e salas da FAFICH.',
        type: 'guide',
        group: 'comecando',
        keywords: 'calouro ingressante mapa campus salas fafich primeiros dias carteirinha matrícula',
        match: ['^/calouros'],
      },
      {
        id: 'guias-sistemas',
        label: 'Sistemas da UFMG',
        shortLabel: 'Sistemas',
        href: route('/sistemas'),
        icon: 'd-sistemas',
        description: 'Folha NIPs, minhaUFMG, Siga, Moodle, Wi-Fi e Microsoft 365, na ordem certa.',
        type: 'guide',
        group: 'comecando',
        keywords: 'nips minhaufmg minha ufmg siga moodle wifi wi-fi rede sem fio internet senha login dti office microsoft 365 teams e-mail email ufmg virtual',
        match: ['^/sistemas/?$'],
      },
      {
        id: 'guias-carteirinha',
        label: 'Carteirinha da UFMG',
        shortLabel: 'Carteirinha',
        href: route('/carteirinha'),
        icon: 'd-carteirinha',
        description: 'Pedir, desbloquear e tirar a segunda via do crachá de estudante.',
        type: 'guide',
        group: 'comecando',
        keywords: 'carteirinha carteira crachá cracha identificação estudantil segunda via 2ª via perdi roubo desbloquear meu crachá',
        match: ['^/carteirinha/?$'],
      },
      {
        id: 'guias-biblioteca',
        label: 'Biblioteca',
        shortLabel: 'Biblioteca',
        href: route('/biblioteca'),
        icon: 'd-biblioteca',
        description: 'Liberar o cadastro, achar um livro no catálogo e pedir ajuda na pesquisa.',
        type: 'guide',
        group: 'comecando',
        keywords: 'biblioteca bu livro empréstimo pergamum catálogo treinamento periódicos capes acervo',
        match: ['^/biblioteca/?$'],
      },
      {
        id: 'guias-curso',
        label: 'Quem atende e onde fica',
        shortLabel: 'Quem atende',
        href: route('/curso'),
        icon: 'd-atende',
        description: 'Secretaria, Colegiado e horários de atendimento do curso.',
        type: 'guide',
        group: 'comecando',
        keywords: 'secretaria colegiado coordenação atendimento horário contato história egressos',
        match: ['^/curso/?$'],
      },
      {
        id: 'guias-mapas',
        label: 'Mapas dos campi',
        shortLabel: 'Mapas',
        href: route('/mapas'),
        icon: 'd-mapas',
        description: 'Os mapas oficiais do campus Pampulha, do campus Saúde e do centro de BH.',
        type: 'page',
        group: 'campus',
        keywords: 'mapa mapas campus pampulha saúde centro prédio onde fica localização',
        match: ['^/mapas/?$'],
      },
      {
        id: 'guias-internos',
        label: 'Ônibus internos',
        shortLabel: 'Ônibus',
        href: route('/onibus-internos'),
        icon: 'd-onibus',
        description: 'Horários, paradas e mapa das linhas gratuitas do campus.',
        type: 'guide',
        group: 'campus',
        keywords: 'ônibus onibus interno internos circular linha 1 2 3 4 horário itinerário transporte campus gratuito sábado férias',
        match: ['^/onibus-internos'],
      },
      {
        id: 'guias-cultura',
        label: 'Cultura, esporte e lazer',
        shortLabel: 'Cultura e lazer',
        href: route('/cultura-e-lazer'),
        icon: 'd-cultura',
        description: 'O centro esportivo, as atléticas e os museus e espaços culturais da UFMG.',
        type: 'page',
        group: 'campus',
        keywords: 'ceu centro esportivo piscina quadra atlética atléticas museu museus espaço do conhecimento conservatório centro cultural lazer esporte',
        match: ['^/cultura-e-lazer/?$'],
      },
      {
        id: 'guias-emergencia',
        label: 'Urgência e emergência',
        shortLabel: 'Emergência',
        href: route('/emergencia'),
        icon: 'd-emergencia',
        description: 'Para quem ligar e o que fazer se alguém passar mal no campus.',
        type: 'guide',
        group: 'campus',
        keywords: 'emergência urgência samu 192 bombeiros 193 dast passou mal acidente socorro ambulância primeiros socorros segurança',
        match: ['^/emergencia/?$'],
      },
      {
        id: 'guias-optativas',
        label: 'Optativas e formação livre',
        shortLabel: 'Optativas',
        href: route('/optativas'),
        icon: 'd-optativas',
        description: 'Disciplinas optativas e de formação livre recomendadas para o curso.',
        type: 'catalog',
        group: 'durante',
        keywords: 'optativa disciplina formação livre matrícula eletiva',
        match: ['^/optativas'],
      },
      {
        id: 'guias-estagio',
        label: 'Estágio',
        shortLabel: 'Estágio',
        href: route('/estagio'),
        icon: 'd-estagio',
        description: 'Estágio obrigatório e não obrigatório, TCE e dispensa por trabalho (Art. 41).',
        type: 'guide',
        group: 'durante',
        keywords: 'estágio tce termo de compromisso art 41 dispensa servidor 300h dcp 135 136',
        match: ['^/estagio/?$'],
      },
      {
        id: 'guias-pesquisa',
        label: 'Pesquisa e extensão',
        shortLabel: 'Pesquisa',
        href: route('/pesquisa'),
        icon: 'd-pesquisa',
        description: 'Os núcleos do DCP e como entrar em iniciação científica e extensão.',
        type: 'page',
        group: 'durante',
        keywords: 'pesquisa iniciação científica pibic extensão núcleo dcp bolsa',
        match: ['^/pesquisa'],
      },
      {
        id: 'guias-intercambio',
        label: 'Intercâmbio',
        shortLabel: 'Intercâmbio',
        href: route('/intercambio'),
        icon: 'd-intercambio',
        description: 'Mobilidade acadêmica no Brasil (Prograd) e no exterior (DRI).',
        type: 'page',
        group: 'durante',
        keywords: 'intercâmbio intercambio mobilidade acadêmica dri exterior internacional nacional estudar fora edital',
        match: ['^/intercambio/?$'],
      },
      {
        id: 'guias-regras',
        label: 'Regras da graduação',
        shortLabel: 'Regras',
        href: route('/regras-da-graduacao'),
        icon: 'd-regras',
        description: 'Matrícula, recurso em 10 dias, formação avançada e formações transversais.',
        type: 'page',
        group: 'durante',
        keywords: 'normas gerais de graduação ngg matrícula recurso recorrer créditos integralização formação transversal avançada pdu giz trancamento',
        match: ['^/regras-da-graduacao/?$'],
      },
      {
        id: 'guias-permanencia',
        label: 'FUMP e vida no noturno',
        shortLabel: 'FUMP',
        href: route('/permanencia'),
        icon: 'd-fump',
        description: 'Programas da FUMP, preço do RU por nível, como pedir e a vida no noturno.',
        type: 'guide',
        group: 'apoio',
        keywords: 'fump auxílio bolsa permanência assistência estudantil moradia alimentação noturno',
        match: ['^/permanencia'],
      },
      {
        id: 'guias-acessibilidade',
        label: 'Acessibilidade e NAI',
        shortLabel: 'Acessibilidade',
        href: route('/acessibilidade'),
        icon: 'd-acessibilidade',
        description: 'O que o Núcleo de Acessibilidade e Inclusão oferece e como pedir.',
        type: 'page',
        group: 'apoio',
        keywords: 'nai acessibilidade inclusão deficiência libras intérprete tecnologia assistiva transporte adaptado monitoria',
        match: ['^/acessibilidade/?$'],
      },
      {
        id: 'guias-saude-mental',
        label: 'Saúde mental',
        shortLabel: 'Saúde mental',
        href: route('/saude-mental'),
        icon: 'd-saude-mental',
        description: 'Onde ser ouvido na UFMG: canais de acolhimento, Prae e FUMP.',
        type: 'page',
        group: 'apoio',
        keywords: 'saúde mental psicólogo psicologia acolhimento escuta ansiedade prae apoio ajuda',
        match: ['^/saude-mental/?$'],
      },
      {
        id: 'guias-direitos',
        label: 'Seus direitos',
        shortLabel: 'Direitos',
        href: route('/direitos'),
        icon: 'd-direitos',
        description: 'Assédio, discriminação e trote: como denunciar. E como pedir o nome social.',
        type: 'page',
        group: 'apoio',
        keywords: 'direitos humanos assédio discriminação racismo trote denúncia denunciar ouvidoria ufmg nome social ações afirmativas violência',
        match: ['^/direitos/?$'],
      },
      {
        id: 'guias-entidades',
        label: 'Entidades estudantis',
        shortLabel: 'Entidades',
        href: route('/entidades'),
        icon: 'd-entidades',
        description: 'DCE, diretório acadêmico, centro acadêmico, atléticas e empresas juniores.',
        type: 'page',
        group: 'apoio',
        keywords: 'dce da ca diretório centro acadêmico atlética empresa júnior representação estudantil dne carteira de estudante',
        match: ['^/entidades/?$'],
      },
      {
        id: 'guias-tcc',
        label: 'TCC',
        shortLabel: 'TCC',
        href: route('/tcc'),
        icon: 'd-tcc',
        description: 'Modalidades de TCC, termo de aceite do orientador e linha do tempo da defesa.',
        type: 'guide',
        group: 'terminando',
        keywords: 'tcc monografia artigo orientador termo de aceite defesa',
        match: ['^/tcc'],
      },
      {
        id: 'guias-faq',
        label: 'Dúvidas frequentes',
        shortLabel: 'Dúvidas',
        href: route('/faq'),
        icon: 'd-duvidas',
        description: 'Respostas curtas sobre procedimentos acadêmicos e acessibilidade (NAI).',
        type: 'guide',
        group: 'duvidas',
        keywords: 'faq perguntas dúvidas nai acessibilidade',
        match: ['^/faq'],
      },
      {
        id: 'guias-siglas',
        label: 'Siglas da UFMG',
        shortLabel: 'Siglas',
        href: route('/siglas'),
        icon: 'd-siglas',
        description: 'O que quer dizer cada sigla da universidade, com o link oficial.',
        type: 'page',
        group: 'duvidas',
        keywords: 'glossário glossario sigla siglas significado cepe drca prograd prae proex cad bu ceu fafich nsg',
        match: ['^/siglas/?$'],
      },
      {
        id: 'guias-quem',
        label: 'Quem é quem na UFMG',
        shortLabel: 'Quem é quem',
        href: route('/quem-e-quem'),
        icon: 'd-quem',
        description: 'Conselhos, pró-reitorias e órgãos: quem decide o quê e a quem recorrer.',
        type: 'page',
        group: 'duvidas',
        keywords: 'estrutura reitoria conselho universitário cepe pró-reitoria prograd prae proex drca cenex unidade departamento congregação telefones cedecom',
        match: ['^/quem-e-quem/?$'],
      },
    ],
  },
  {
    id: 'chapa',
    number: 3,
    name: 'Chapa 2 · Semente',
    mobileLabel: 'Chapa 2',
    tagline: 'Quem somos, o que propomos e como votar na Chapa 2 em 25 e 26/11',
    resumo: 'Quem somos e como votar',
    icon: 'bi-flower1',
    color: '#5B2A85',
    rootHref: route('/chapa-semente'),
    items: [
      {
        id: 'chapa-semente',
        label: 'Integrantes e propostas',
        shortLabel: 'A chapa',
        href: route('/chapa-semente'),
        icon: 'd-chapa',
        description: 'Os 12 integrantes da Chapa 2, a Semente, e as propostas para o CAGP.',
        type: 'overview',
        isOverview: true,
        keywords: 'chapa 2 dois número semente votar eleição propostas integrantes candidatos',
        // A moldura de apoio é página própria da aba (item abaixo): fica fora deste padrão.
        match: ['^/chapa-semente(?!/moldura)', '^/propostas/'],
      },
      {
        id: 'chapa-eleicao',
        label: 'Eleição e como votar',
        shortLabel: 'Como votar',
        href: route('/gestao'),
        icon: 'd-votar',
        description: 'Cronograma do edital, local e horário da votação e as diretorias.',
        type: 'page',
        keywords: 'eleição votar chapa 2 número urna edital junta eleitoral debate diretorias',
        match: ['^/gestao'],
      },
      {
        id: 'chapa-moldura',
        label: 'Moldura de apoio',
        shortLabel: 'Moldura',
        href: route('/chapa-semente/moldura'),
        icon: 'd-moldura',
        description: 'Ponha a sua foto numa moldura da Chapa 2, com a sua frase e a cor do anel, e poste no perfil, no feed ou no story.',
        type: 'tool',
        keywords: 'moldura foto perfil story feed apoio gostosas bb faz o s twibbon avatar campanha bandeira orgulho lgbt lésbica gay bi pan assexual trans não-binárie intersexo queer neurodivergente autista tdah fumpista cotista calouro veterano atlética extensionista',
        match: ['^/chapa-semente/moldura'],
      },
    ],
  },
  {
    id: 'curso',
    number: 4,
    name: 'Meu curso',
    mobileLabel: 'Meu curso',
    tagline: 'Sua grade, suas horas e a reta final',
    resumo: 'Suas horas, grade e formatura',
    icon: 'bi-diagram-3',
    color: '#266264',
    rootHref: route('/meu-curso'),
    items: [
      {
        id: 'curso-hub',
        label: 'Meu curso',
        shortLabel: 'Meu curso',
        href: route('/meu-curso'),
        icon: 'bi-diagram-3',
        description: 'Quanto falta, o que vence, o próximo semestre e suas atividades num painel só.',
        type: 'hub',
        isOverview: true,
        keywords: 'calendário escolar calendario prazos datas matrícula período letivo quanto falta',
        match: ['^/meu-curso'],
      },
      {
        id: 'curso-acg',
        label: 'Horas 600h',
        shortLabel: 'Horas 600h',
        href: route('/acg'),
        icon: 'd-horas',
        description: 'O que conta nas 600h, quanto vale cada atividade e como protocolar.',
        type: 'guide',
        keywords: 'acg aac extensão horas complementares 600h calculadora atividade integralizadora',
        match: ['^/acg'],
      },
      {
        id: 'curso-grade',
        label: 'Grade e percurso',
        shortLabel: 'Grade',
        href: route('/percurso'),
        icon: 'd-grade',
        description: 'O mapa dos 10 períodos e os pré-requisitos de cada disciplina.',
        type: 'tool',
        keywords: 'grade curricular percurso período pré-requisito obrigatória grafo matriz',
        match: ['^/percurso'],
      },
      {
        id: 'curso-cursos',
        label: 'Cursos que contam horas',
        shortLabel: 'Cursos',
        href: route('/cursos'),
        icon: 'd-cursos',
        description: 'Cursos gratuitos da ENAP pra guardar na sua lista e contar nas 600h.',
        type: 'catalog',
        keywords: 'enap evg curso livre gratuito certificado horas',
        match: ['^/cursos'],
      },
      {
        id: 'curso-formatura',
        label: 'Formatura e colação',
        shortLabel: 'Formatura',
        href: route('/formatura'),
        icon: 'd-formatura',
        description: 'Checklist da reta final: estágio, TCC e inscrição na colação de grau.',
        type: 'tool',
        keywords: 'formatura colação de grau formando diploma reta final',
        match: ['^/formatura', '^/estagio-tcc'],
      },
    ],
  },
  {
    id: 'mais',
    number: 5,
    name: 'Mais',
    mobileLabel: 'Mais',
    tagline: 'Carreira, CAGP, ouvidoria e ajustes',
    resumo: 'Carreira, CA e ajustes',
    icon: 'menu',
    color: '#1F1F1F',
    rootHref: route('/mais'),
    groups: [
      { id: 'carreira', title: 'Carreira' },
      { id: 'cagp', title: 'O CAGP' },
      { id: 'app', title: 'Este site' },
    ],
    items: [
      {
        id: 'mais-hub',
        label: 'Mais',
        shortLabel: 'Mais',
        href: route('/mais'),
        icon: 'menu',
        description: 'Carreira, CAGP, ouvidoria e ajustes.',
        type: 'hub',
        isOverview: true,
        match: ['^/mais'],
      },
      {
        id: 'mais-carreira',
        label: 'Carreira',
        shortLabel: 'Carreira',
        href: route('/carreira'),
        icon: 'd-carreira',
        description: 'Atalhos de carreira, Empresa Júnior e exemplos de vagas (simuladas).',
        type: 'hub',
        group: 'carreira',
        keywords: 'carreira emprego trainee concurso empresa júnior',
        match: ['^/carreira/?$'],
      },
      {
        id: 'mais-vagas',
        label: 'Vagas e editais',
        shortLabel: 'Vagas',
        href: route('/carreira/vagas'),
        icon: 'd-vagas',
        description: 'Vagas reais que chegam no grupo do curso e o modelo do mural proposto.',
        type: 'catalog',
        group: 'carreira',
        keywords: 'vaga estágio trainee edital oportunidade',
        match: ['^/carreira/vagas'],
      },
      {
        id: 'mais-talentos',
        label: 'Banco de talentos',
        shortLabel: 'Talentos',
        href: route('/carreira/talentos'),
        icon: 'd-talentos',
        description: 'Organize suas competências e exporte para o currículo (salvo no celular).',
        type: 'tool',
        group: 'carreira',
        keywords: 'currículo competências talentos portfólio',
        match: ['^/carreira/talentos'],
      },
      {
        id: 'mais-ouvidoria',
        label: 'Fala com a gente',
        shortLabel: 'Fala com a gente',
        href: route('/ouvidoria'),
        icon: 'd-ouvidoria',
        // Desde 12/11/2026 o canal já funciona para crítica, erro e ideia sobre o site (vai para o e-mail
        // da chapa). A Proposta 14, o canal do CA para o curso, continua na página como proposta.
        description: 'Achou um erro ou tem uma crítica ao site? Mande pra Chapa 2.',
        type: 'tool',
        group: 'cagp',
        keywords: 'ouvidoria reclamação crítica erro bug sugestão ideia feedback fala com o ca',
        match: ['^/ouvidoria'],
      },
      {
        id: 'mais-transparencia',
        label: 'Portal da Transparência',
        shortLabel: 'Transparência',
        href: route('/transparencia'),
        icon: 'd-transparencia',
        description: 'O que o Regimento exige sobre as contas e o livro-caixa proposto.',
        type: 'page',
        group: 'cagp',
        keywords: 'contas finanças balancete rreo prestação de contas dinheiro',
        match: ['^/transparencia'],
      },
      {
        id: 'mais-sobre',
        label: 'Sobre o CAGP',
        shortLabel: 'Sobre',
        href: route('/sobre'),
        icon: 'd-sobre',
        description: 'História, Regimento Interno e como o Centro Acadêmico funciona.',
        type: 'page',
        group: 'cagp',
        keywords: 'centro acadêmico cagp história regimento estatuto candangos',
        // Exato: '^/sobre' sozinho também pegava /sobre-o-site.
        match: ['^/sobre$', '^/sobre/'],
      },
      {
        id: 'mais-ajustes',
        label: 'Ajustes e acessibilidade',
        shortLabel: 'Ajustes',
        href: route('/configuracoes'),
        icon: 'd-ajustes',
        description: 'Tamanho da letra, alto contraste, perfil e dados salvos no celular.',
        type: 'page',
        group: 'app',
        keywords: 'configurações acessibilidade fonte contraste perfil nome social dados',
        match: ['^/configuracoes'],
      },
      {
        id: 'mais-mapa',
        label: 'Mapa do site',
        shortLabel: 'Mapa do site',
        href: route('/mapa-do-site'),
        icon: 'd-mapa',
        description: 'Todas as páginas do site numa lista só.',
        type: 'page',
        group: 'app',
        match: ['^/mapa-do-site'],
      },
      {
        id: 'mais-site',
        label: 'Sobre este site',
        shortLabel: 'Sobre o site',
        href: route('/sobre-o-site'),
        icon: 'd-site',
        description: 'O que é este site e como usar, em cinco passos.',
        type: 'page',
        group: 'app',
        keywords: 'como usar tutorial cartilha ajuda passo a passo primeira vez como mexer quem fez o site',
        match: ['^/sobre-o-site'],
      },
    ],
  },
];

/**
 * Normaliza pathname removendo o base path do GitHub Pages e a barra final.
 */
export function normalizePathname(pathname: string): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  let clean = pathname;
  if (base && clean.startsWith(base)) {
    clean = clean.slice(base.length);
  }
  clean = clean.replace(/\/index\.html$/, '');
  if (!clean.startsWith('/')) clean = `/${clean}`;
  if (clean.length > 1) clean = clean.replace(/\/$/, '');
  return clean || '/';
}

export function getAxisById(id: AxisId): AxisConfig | undefined {
  return AXIS_REGISTRY.find((axis) => axis.id === id);
}

/** Item do registro dono de uma rota, com o eixo correspondente. */
export function getItemByPath(pathname: string): { axis: AxisConfig; item: NavigationItem } | undefined {
  const clean = normalizePathname(pathname);
  for (const axis of AXIS_REGISTRY) {
    for (const item of axis.items) {
      if (item.match.some((pattern) => new RegExp(pattern).test(clean))) {
        return { axis, item };
      }
    }
  }
  return undefined;
}

/** Aba dona de uma rota. Rotas fora do registro (ex.: 404) devolvem undefined. */
export function getAxisByPath(pathname: string): AxisConfig | undefined {
  return getItemByPath(pathname)?.axis;
}

export function getActiveItemId(axis: AxisConfig, pathname: string): string {
  const found = getItemByPath(pathname);
  if (found && found.axis.id === axis.id) return found.item.id;
  return axis.items[0]?.id || '';
}

/** Páginas da mesma aba, na ordem do registro, sem o hub. Usado pelo JourneyNav. */
export function getSiblingPages(pathname: string): { prev?: NavigationItem; next?: NavigationItem } {
  const found = getItemByPath(pathname);
  if (!found) return {};
  const pages = found.axis.items.filter((i) => i.type !== 'hub');
  const idx = pages.findIndex((i) => i.id === found.item.id);
  if (idx === -1) return {};
  return { prev: pages[idx - 1], next: pages[idx + 1] };
}

/**
 * Metadados de transição (grupo = posição da aba; profundidade 0 = raiz da aba).
 * Derivado do registro para o BaseLayout não manter um mapa paralelo.
 */
export function getRouteMeta(): Record<string, { group: number; depth: number }> {
  const meta: Record<string, { group: number; depth: number }> = {};
  for (const axis of AXIS_REGISTRY) {
    const root = normalizePathname(axis.rootHref);
    for (const item of axis.items) {
      const path = normalizePathname(item.href.split('#')[0]);
      if (meta[path]) continue;
      meta[path] = { group: axis.number, depth: path === root ? 0 : 1 };
    }
  }
  return meta;
}

export function getAllAxes(): AxisConfig[] {
  return AXIS_REGISTRY;
}
