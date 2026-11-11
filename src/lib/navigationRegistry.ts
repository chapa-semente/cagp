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
    name: 'Hoje',
    mobileLabel: 'Hoje',
    tagline: 'O que está acontecendo agora no campus e no curso',
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
        icon: 'bi-newspaper',
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
    icon: 'thesis',
    color: '#5B2A85',
    rootHref: route('/guias'),
    groups: [
      { id: 'documentos', title: 'Documentos' },
      { id: 'comecando', title: 'Começando' },
      { id: 'durante', title: 'Durante o curso' },
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
        icon: 'bi-folder2-open',
        description: 'Formulários, requerimentos e normas oficiais para baixar e enviar.',
        type: 'catalog',
        group: 'documentos',
        keywords: 'formulário requerimento tce termo de compromisso plano de atividades colação aproveitamento trancamento resolução norma pdf',
        match: ['^/documentos'],
      },
      {
        id: 'guias-calouros',
        label: 'Guia do calouro',
        shortLabel: 'Calouro',
        href: route('/calouros'),
        icon: 'bi-backpack',
        description: 'Checklist dos primeiros 30 dias, mapa do campus e salas da FAFICH.',
        type: 'guide',
        group: 'comecando',
        keywords: 'calouro ingressante mapa campus salas fafich primeiros dias carteirinha matrícula',
        match: ['^/calouros'],
      },
      {
        id: 'guias-internos',
        label: 'Ônibus internos',
        shortLabel: 'Ônibus',
        href: route('/onibus-internos'),
        icon: 'bi-bus-front',
        description: 'Horários, paradas e mapa das linhas gratuitas do campus.',
        type: 'guide',
        group: 'comecando',
        keywords: 'ônibus onibus interno internos circular linha 1 2 3 4 horário itinerário transporte campus gratuito sábado férias',
        match: ['^/onibus-internos'],
      },
      {
        id: 'guias-curso',
        label: 'Quem atende e onde fica',
        shortLabel: 'O curso',
        href: route('/curso'),
        icon: 'bi-mortarboard',
        description: 'Secretaria, Colegiado e horários de atendimento do curso.',
        type: 'guide',
        group: 'comecando',
        keywords: 'secretaria colegiado coordenação atendimento horário contato história egressos',
        match: ['^/curso/?$'],
      },
      {
        id: 'guias-permanencia',
        label: 'FUMP e vida no noturno',
        shortLabel: 'FUMP',
        href: route('/permanencia'),
        icon: 'heart',
        description: 'Níveis da FUMP, auxílios, RU à noite e ônibus interno até 22h50.',
        type: 'guide',
        group: 'durante',
        keywords: 'fump auxílio bolsa permanência assistência estudantil moradia alimentação noturno',
        match: ['^/permanencia'],
      },
      {
        id: 'guias-optativas',
        label: 'Optativas e formação livre',
        shortLabel: 'Optativas',
        href: route('/optativas'),
        icon: 'kanban',
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
        icon: 'briefcase',
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
        icon: 'bi-journal-bookmark',
        description: 'Os núcleos do DCP e como entrar em iniciação científica e extensão.',
        type: 'page',
        group: 'durante',
        keywords: 'pesquisa iniciação científica pibic extensão núcleo dcp bolsa',
        match: ['^/pesquisa'],
      },
      {
        id: 'guias-tcc',
        label: 'TCC',
        shortLabel: 'TCC',
        href: route('/tcc'),
        icon: 'bi-journal-check',
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
        icon: 'info',
        description: 'Respostas curtas sobre procedimentos acadêmicos e acessibilidade (NAI).',
        type: 'guide',
        group: 'duvidas',
        keywords: 'faq perguntas dúvidas nai acessibilidade',
        match: ['^/faq'],
      },
    ],
  },
  {
    id: 'chapa',
    number: 3,
    name: 'Chapa Semente',
    mobileLabel: 'Chapa',
    tagline: 'Quem somos, o que propomos e como votar em 25 e 26/11',
    icon: 'bi-flower1',
    color: '#5B2A85',
    rootHref: route('/chapa-semente'),
    items: [
      {
        id: 'chapa-semente',
        label: 'Integrantes e propostas',
        shortLabel: 'Propostas',
        href: route('/chapa-semente'),
        icon: 'sparkle',
        description: 'Os 11 integrantes da Chapa Semente e as propostas para o CAGP.',
        type: 'overview',
        isOverview: true,
        keywords: 'chapa semente votar eleição propostas integrantes candidatos',
        match: ['^/chapa-semente'],
      },
      {
        id: 'chapa-eleicao',
        label: 'Eleição e como votar',
        shortLabel: 'Como votar',
        href: route('/gestao'),
        icon: 'bi-people',
        description: 'Cronograma do edital, local e horário da votação e as diretorias.',
        type: 'page',
        keywords: 'eleição votar urna edital junta eleitoral debate diretorias',
        match: ['^/gestao'],
      },
    ],
  },
  {
    id: 'curso',
    number: 4,
    name: 'Meu curso',
    mobileLabel: 'Meu curso',
    tagline: 'Sua grade, suas horas e a reta final',
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
        description: 'Grade, horas complementares e checklist da formatura num lugar só.',
        type: 'hub',
        isOverview: true,
        match: ['^/meu-curso'],
      },
      {
        id: 'curso-acg',
        label: 'Horas 600h',
        shortLabel: 'Horas 600h',
        href: route('/acg'),
        icon: 'bi-calculator',
        description: 'Calcule suas 300h de extensão e 300h de AAC e veja o que falta.',
        type: 'tool',
        keywords: 'acg aac extensão horas complementares 600h calculadora atividade integralizadora',
        match: ['^/acg'],
      },
      {
        id: 'curso-grade',
        label: 'Grade e percurso',
        shortLabel: 'Grade',
        href: route('/percurso'),
        icon: 'bi-diagram-3',
        description: 'As disciplinas dos 10 períodos e os pré-requisitos de cada uma.',
        type: 'tool',
        keywords: 'grade curricular percurso período pré-requisito obrigatória grafo matriz',
        match: ['^/percurso'],
      },
      {
        id: 'curso-cursos',
        label: 'Cursos que contam horas',
        shortLabel: 'Cursos',
        href: route('/cursos'),
        icon: 'bi-mortarboard-fill',
        description: 'Cursos gratuitos da ENAP e do CAGP que contam para extensão e AAC.',
        type: 'catalog',
        keywords: 'enap evg curso livre gratuito certificado horas',
        match: ['^/cursos'],
      },
      {
        id: 'curso-formatura',
        label: 'Formatura e colação',
        shortLabel: 'Formatura',
        href: route('/formatura'),
        icon: 'bi-check2-square',
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
        icon: 'bi-briefcase',
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
        icon: 'newspaper',
        description: 'Exemplo de mural de estágios e oportunidades (conteúdo simulado).',
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
        icon: 'sparkle',
        description: 'Organize suas competências e exporte para o currículo (salvo no celular).',
        type: 'tool',
        group: 'carreira',
        keywords: 'currículo competências talentos portfólio',
        match: ['^/carreira/talentos'],
      },
      {
        id: 'mais-ouvidoria',
        label: 'Fala com o CA',
        shortLabel: 'Ouvidoria',
        href: route('/ouvidoria'),
        icon: 'users',
        description: 'Escreva uma demanda sobre ementas, infraestrutura ou o Colegiado.',
        type: 'tool',
        group: 'cagp',
        keywords: 'ouvidoria reclamação denúncia demanda ementa infraestrutura',
        match: ['^/ouvidoria'],
      },
      {
        id: 'mais-transparencia',
        label: 'Portal da Transparência',
        shortLabel: 'Transparência',
        href: route('/transparencia'),
        icon: 'shield',
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
        icon: 'bi-bank',
        description: 'História, Regimento Interno e como o Centro Acadêmico funciona.',
        type: 'page',
        group: 'cagp',
        keywords: 'centro acadêmico cagp história regimento estatuto candangos',
        match: ['^/sobre'],
      },
      {
        id: 'mais-ajustes',
        label: 'Ajustes e acessibilidade',
        shortLabel: 'Ajustes',
        href: route('/configuracoes'),
        icon: 'bi-sliders',
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
        icon: 'map-pin',
        description: 'Todas as páginas do site numa lista só.',
        type: 'page',
        group: 'app',
        match: ['^/mapa-do-site'],
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
