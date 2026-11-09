// src/lib/navigationRegistry.ts — Registro Central de Navegação, Eixos e Micro-Apps (Super App CAGP UFMG)
import { route } from './paths';

export type AxisId = 'hoje' | 'curso' | 'curriculo' | 'carreira' | 'cagp' | 'acervo';
export type FeatureType = 'hub' | 'overview' | 'page' | 'tool' | 'guide' | 'catalog';

export interface NavigationItem {
  id: string;
  label: string;
  shortLabel: string;
  href: string;
  icon: string;
  description: string;
  type: FeatureType;
  isOverview?: boolean;
  badge?: string;
  match: string[];
}

export interface AxisOverviewHighlight {
  id: string;
  title: string;
  desc: string;
  icon: string;
  href: string;
  actionLabel: string;
  statKey?: string;
}

export interface AxisConfig {
  id: AxisId;
  number: number;
  name: string;
  tagline: string;
  icon: string;
  color: string;
  rootHref: string;
  items: NavigationItem[];
  overviewHighlights: AxisOverviewHighlight[];
}

export const AXIS_REGISTRY: AxisConfig[] = [
  {
    id: 'hoje',
    number: 1,
    name: 'Hoje',
    tagline: 'Rotina do Campus, RU & Bússola Discente',
    icon: 'bi-compass',
    color: '#8B1E2D',
    rootHref: route('/'),
    items: [
      {
        id: 'hoje-overview',
        label: 'Visão Geral',
        shortLabel: 'Hoje',
        href: route('/'),
        icon: 'bi-compass',
        description: 'Bússola discente, avisos em tempo real e status do campus.',
        type: 'overview',
        isOverview: true,
        match: ['^/$', '^/index\\.html$'],
      },
      {
        id: 'hoje-noticias',
        label: 'Mural de Notícias',
        shortLabel: 'Notícias',
        href: route('/noticias'),
        icon: 'bi-newspaper',
        description: 'Mural completo de notícias, assembleias, editais de estágio e eventos.',
        type: 'page',
        match: ['^/noticias'],
      },
    ],
    overviewHighlights: [
      {
        id: 'hl-noticias',
        title: 'Mural de Notícias',
        desc: 'Assembleias, estágios, eventos da atlética e avisos acadêmicos na íntegra.',
        icon: 'bi-newspaper',
        href: route('/noticias'),
        actionLabel: 'Ver Notícias',
      },
      {
        id: 'hl-passaporte',
        title: 'Passaporte Discente',
        desc: 'Seu progresso acadêmico salvo 100% no cofre local seguro.',
        icon: 'bi-person-badge',
        href: route('/') + '#passaporte',
        actionLabel: 'Abrir Passaporte',
      },
      {
        id: 'hl-campus',
        title: 'Campus no Agora',
        desc: 'Cardápios e horários do RU II Setorial e Circular Noturno da UFMG.',
        icon: 'bi-clock-history',
        href: route('/') + '#campus',
        actionLabel: 'Ver Horários',
      },
    ],
  },
  {
    id: 'curso',
    number: 2,
    name: 'Acolhimento',
    tagline: 'Vida Universitária, Permanência FUMP & Pesquisa DCP',
    icon: 'bi-mortarboard',
    color: '#005A9C',
    rootHref: route('/curso'),
    items: [
      {
        id: 'curso-overview',
        label: 'Visão Geral do Curso',
        shortLabel: 'Curso',
        href: route('/curso'),
        icon: 'bi-mortarboard',
        description: 'Sumário executivo do curso, Colegiado DCP e matriz acadêmica.',
        type: 'overview',
        isOverview: true,
        match: ['^/curso$', '^/curso/$', '^/curso/index\\.html$'],
      },
      {
        id: 'curso-calouros',
        label: 'Guia do Calouro',
        shortLabel: 'Calouros',
        href: route('/calouros'),
        icon: 'bi-backpack',
        description: 'Checklist interativo de 30 dias e acolhimento na FAFICH.',
        type: 'guide',
        match: ['^/calouros'],
      },
      {
        id: 'curso-permanencia',
        label: 'Permanência & Noturno',
        shortLabel: 'Permanência',
        href: route('/permanencia'),
        icon: 'bi-shield-heart',
        description: 'Guia da FUMP (Níveis I, II e III) e Guia do Estudante Noturno da FAFICH.',
        type: 'guide',
        match: ['^/permanencia'],
      },
      {
        id: 'curso-pesquisa',
        label: 'Pesquisa & 11 Núcleos',
        shortLabel: 'Pesquisa',
        href: route('/pesquisa'),
        icon: 'bi-journal-bookmark',
        description: 'Laboratórios, 11 núcleos do DCP e oportunidades de iniciação científica.',
        type: 'page',
        match: ['^/pesquisa'],
      },
    ],
    overviewHighlights: [
      {
        id: 'hl-calouro',
        title: 'Checklist do Calouro',
        desc: 'Tarefas essenciais dos primeiros 30 dias na UFMG.',
        icon: 'bi-backpack',
        href: route('/calouros'),
        actionLabel: 'Abrir Guia do Calouro',
        statKey: 'cagp_calouro_checklist_v1',
      },
      {
        id: 'hl-permanencia',
        title: 'FUMP & Noturno FAFICH',
        desc: 'Bolsas permanência, auxílios, RU e Circular Noturno 22:30.',
        icon: 'bi-shield-heart',
        href: route('/permanencia'),
        actionLabel: 'Ver Permanência',
      },
      {
        id: 'hl-pesquisa',
        title: 'Pesquisa & 11 Núcleos',
        desc: 'Bolsas PIBIC e iniciação científica no Departamento de Ciência Política.',
        icon: 'bi-journal-bookmark',
        href: route('/pesquisa'),
        actionLabel: 'Ver Oportunidades',
      },
    ],
  },
  {
    id: 'curriculo',
    number: 3,
    name: 'Trajetória 600h',
    tagline: 'Grade 10P, Grafo Vivo, Calculadora 600h & Cursos ENAP',
    icon: 'bi-diagram-3',
    color: '#15803D',
    rootHref: route('/percurso'),
    items: [
      {
        id: 'curriculo-overview',
        label: 'Grafo Vivo 10P',
        shortLabel: 'Grafo 10P',
        href: route('/percurso'),
        icon: 'bi-diagram-3',
        description: 'Central Curricular com Grafo Vivo dos 10 períodos e 27 obrigatórias.',
        type: 'overview',
        isOverview: true,
        match: ['^/percurso'],
      },
      {
        id: 'curriculo-optativas',
        label: 'Catálogo de Optativas',
        shortLabel: 'Optativas',
        href: route('/optativas'),
        icon: 'bi-collection',
        description: 'Disciplinas optativas e Formação Livre recomendadas para Gestão Pública.',
        type: 'catalog',
        match: ['^/optativas'],
      },
      {
        id: 'curriculo-acg',
        label: 'Horas 600h & ACG',
        shortLabel: 'Calc 600h',
        href: route('/acg'),
        icon: 'bi-calculator',
        description: 'Calculadora de 300h de Extensão e 300h de AAC com Guardião 120 dias.',
        type: 'tool',
        match: ['^/acg'],
      },
      {
        id: 'curriculo-cursos',
        label: 'Cursos Livres & ENAP',
        shortLabel: 'Cursos Livres',
        href: route('/cursos'),
        icon: 'bi-mortarboard-fill',
        description: 'Cursos Livres do CAGP e catálogo curado ENAP/EV.G que contam para Extensão/AAC.',
        type: 'catalog',
        match: ['^/cursos'],
      },
    ],
    overviewHighlights: [
      {
        id: 'hl-grafo',
        title: 'Grafo Dinâmico 10P',
        desc: 'Simule sua matrícula com travas formais do SIGA e adicione matérias optativas.',
        icon: 'bi-diagram-3',
        href: route('/percurso') + '#grafo',
        actionLabel: 'Abrir Grafo',
      },
      {
        id: 'hl-calc',
        title: 'Calculadora 600h',
        desc: 'Simule sua integralização de Extensão (300h) e AAC (300h).',
        icon: 'bi-calculator',
        href: route('/acg') + '#calculadora',
        actionLabel: 'Calcular Horas',
        statKey: 'cagp_calc_ext_aac_v1',
      },
      {
        id: 'hl-cursos',
        title: 'Cursos ENAP & EV.G',
        desc: '1.464 cursos gratuitos com adição em 1 clique na Calculadora 600h.',
        icon: 'bi-mortarboard-fill',
        href: route('/cursos'),
        actionLabel: 'Ver Cursos',
      },
    ],
  },
  {
    id: 'carreira',
    number: 4,
    name: 'Carreira',
    tagline: 'Estágio Não Obrigatório, Obrigatório 300h, Art. 41 & TCC',
    icon: 'bi-briefcase',
    color: '#B45309',
    rootHref: route('/carreira'),
    items: [
      {
        id: 'carreira-hub',
        label: 'Hub de Carreira & Inserção',
        shortLabel: 'Hub Carreira',
        href: route('/carreira'),
        icon: 'bi-briefcase',
        description: 'Cockpit unificado com atalhos de vagas, Empresa Júnior, Banco de Talentos e guias.',
        type: 'hub',
        isOverview: true,
        match: ['^/carreira/?$', '^/carreira/index\\.html$'],
      },
      {
        id: 'carreira-vagas',
        label: 'Radar de Vagas & Editais',
        shortLabel: 'Radar de Vagas',
        href: route('/carreira/vagas'),
        icon: 'bi-megaphone',
        description: 'Mural de estágios, trainees e oportunidades públicas em BH e Minas Gerais.',
        type: 'catalog',
        match: ['^/carreira/vagas/?$', '^/carreira/vagas/index\\.html$'],
      },
      {
        id: 'carreira-talentos',
        label: 'Banco de Talentos GP',
        shortLabel: 'Banco de Talentos',
        href: route('/carreira/talentos'),
        icon: 'bi-stars',
        description: 'Cofre local de competências técnicas discentes e exportação para currículo.',
        type: 'tool',
        match: ['^/carreira/talentos/?$', '^/carreira/talentos/index\\.html$'],
      },
      {
        id: 'carreira-estagio-obrigatorio',
        label: 'Estágio 300h & Aproveitamento Servidor',
        shortLabel: 'Estágio & Art. 41',
        href: route('/estagio'),
        icon: 'bi-person-check',
        description: 'Simulador de Aproveitamento Servidor (Art. 41) e fluxo das 300h de DCP 135/136.',
        type: 'tool',
        match: ['^/estagio/?$', '^/estagio/index\\.html$'],
      },
      {
        id: 'carreira-tcc',
        label: 'TCC & Monografia (180h)',
        shortLabel: 'TCC (180h)',
        href: route('/tcc'),
        icon: 'bi-journal-check',
        description: 'Tabela comparativa Monografia vs Artigo (Art. 19), termo de aceite e linha do tempo de defesa.',
        type: 'guide',
        match: ['^/tcc/?$', '^/tcc/index\\.html$'],
      },
      {
        id: 'carreira-reta-final',
        label: 'Hub Reta Final (Formando)',
        shortLabel: 'Reta Final Formando',
        href: route('/estagio-tcc'),
        icon: 'bi-check2-square',
        description: 'Painel unificado para Formandos: checklist de Estágio 300h, TCC 180h e Colação de Grau.',
        type: 'tool',
        match: ['^/estagio-tcc/?$', '^/estagio-tcc/index\\.html$'],
      },
    ],
    overviewHighlights: [
      {
        id: 'hl-art41',
        title: 'Dispensa Art. 41 (Servidores)',
        desc: 'Verifique se seu trabalho na gestão pública dispensa Estágio A e B.',
        icon: 'bi-briefcase',
        href: route('/estagio') + '#art41',
        actionLabel: 'Simular Art. 41',
        statKey: 'cagp_art41_checklist_v1',
      },
      {
        id: 'hl-tce',
        title: 'Estágio Não Obrigatório',
        desc: 'Do 1º ao 10º período: modelos de TCE, jornada de 30h e cartilha jurídica.',
        icon: 'bi-file-earmark-check',
        href: route('/estagio') + '#tutorial',
        actionLabel: 'Ver Direitos',
      },
      {
        id: 'hl-tcc',
        title: 'Modalidades de TCC (Art. 19)',
        desc: 'Monografia, artigo científico, plano de intervenção ou estudo de caso.',
        icon: 'bi-journal-check',
        href: route('/tcc') + '#modalidades',
        actionLabel: 'Ver Modalidades',
      },
    ],
  },
  {
    id: 'cagp',
    number: 5,
    name: 'O CAGP',
    tagline: 'Transparência Centavo a Centavo, Ouvidoria & Chapa Semente',
    icon: 'bi-shield-check',
    color: '#5B2A86',
    rootHref: route('/transparencia'),
    items: [
      {
        id: 'cagp-transparencia',
        label: 'Portal da Transparência',
        shortLabel: 'Transparência',
        href: route('/transparencia'),
        icon: 'bi-cash-coin',
        description: 'Balancete financeiro, execução orçamentária RREO centavo a centavo e garantias estatutárias.',
        type: 'page',
        isOverview: true,
        match: ['^/transparencia'],
      },
      {
        id: 'cagp-ouvidoria',
        label: 'Ouvidoria & Reclame Aqui',
        shortLabel: 'Ouvidoria',
        href: route('/ouvidoria'),
        icon: 'bi-megaphone',
        description: 'Canal contínuo de escuta discente e denúncia formal de ementas defasadas ao Colegiado.',
        type: 'tool',
        match: ['^/ouvidoria'],
      },
      {
        id: 'cagp-chapa-semente',
        label: 'Chapa Semente • Propostas',
        shortLabel: 'Semente',
        href: route('/chapa-semente'),
        icon: 'bi-flower1',
        description: 'Carta-Programa da Chapa Semente: 9 diretorias, Tour interativo e compromisso público.',
        type: 'page',
        badge: 'Campanha',
        match: ['^/chapa-semente'],
      },
      {
        id: 'cagp-documentos',
        label: 'Documentos & Atos Normativos',
        shortLabel: 'Documentos',
        href: route('/documentos'),
        icon: 'bi-folder2-open',
        description: 'Atos normativos, resoluções, regulamento N-20229 e formulários oficiais para download.',
        type: 'page',
        match: ['^/documentos'],
      },
      {
        id: 'cagp-sobre',
        label: 'Sobre o CAGP & Estatuto',
        shortLabel: 'Sobre',
        href: route('/sobre'),
        icon: 'bi-bank',
        description: 'História do centro acadêmico, monumento Os Candangos e princípios republicanos.',
        type: 'page',
        match: ['^/sobre'],
      },
      {
        id: 'cagp-gestao',
        label: 'Processo Eleitoral & Diretorias',
        shortLabel: 'Diretorias',
        href: route('/gestao'),
        icon: 'bi-people',
        description: 'Edital de eleições 2026, cronograma da Junta Eleitoral e estrutura de diretorias.',
        type: 'page',
        match: ['^/gestao'],
      },
      {
        id: 'cagp-faq',
        label: 'Dúvidas & FAQ',
        shortLabel: 'FAQ',
        href: route('/faq'),
        icon: 'bi-question-circle',
        description: 'Respostas oficiais sobre procedimentos acadêmicos e acessibilidade NAI.',
        type: 'guide',
        match: ['^/faq', '^/mapa-do-site'],
      },
    ],
    overviewHighlights: [
      {
        id: 'hl-transparencia',
        title: 'Caixa Centavo a Centavo',
        desc: 'Extrato financeiro com gráficos em tempo real geridos pela Diretoria Financeira.',
        icon: 'bi-cash-coin',
        href: route('/transparencia'),
        actionLabel: 'Ver Contas',
      },
      {
        id: 'hl-ouvidoria',
        title: 'Ouvidoria & Escuta Ativa',
        desc: 'Canal seguro para denúncias de ementas defasadas e infraestrutura.',
        icon: 'bi-megaphone',
        href: route('/ouvidoria'),
        actionLabel: 'Abrir Ouvidoria',
      },
      {
        id: 'hl-semente',
        title: 'Chapa Semente — Lideranças & Tour',
        desc: 'Conheça o Tour interativo com as propostas e soluções para os estudantes.',
        icon: 'bi-flower1',
        href: route('/chapa-semente'),
        actionLabel: 'Ver Propostas',
      },
    ],
  },
];

/**
 * Normaliza pathname removendo o base path do GitHub Pages para conferência de rotas.
 */
export function normalizePathname(pathname: string): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  let clean = pathname;
  if (base && clean.startsWith(base)) {
    clean = clean.slice(base.length);
  }
  clean = clean.replace(/\/index\.html$/, '');
  if (!clean.startsWith('/')) clean = `/${clean}`;
  return clean || '/';
}

/**
 * Retorna o eixo correspondente a um ID canônico.
 */
export function getAxisById(id: AxisId): AxisConfig | undefined {
  return AXIS_REGISTRY.find((axis) => axis.id === id);
}

/**
 * Retorna o eixo correspondente a uma URL/pathname do site.
 */
export function getAxisByPath(pathname: string): AxisConfig | undefined {
  const clean = normalizePathname(pathname);

  // Eixo 1: Home
  if (clean === '/' || clean === '/index.html') {
    return AXIS_REGISTRY[0];
  }

  // Tenta encontrar por regex de correspondência nos itens
  for (const axis of AXIS_REGISTRY) {
    for (const item of axis.items) {
      if (item.match && item.match.length > 0) {
        for (const pattern of item.match) {
          if (new RegExp(pattern).test(clean)) {
            return axis;
          }
        }
      }
    }
  }

  // Fallback baseado no primeiro segmento da URL
  if (clean.startsWith('/noticias')) return AXIS_REGISTRY[0];
  if (clean.startsWith('/curso') || clean.startsWith('/calouros') || clean.startsWith('/permanencia') || clean.startsWith('/pesquisa')) {
    return AXIS_REGISTRY[1];
  }
  if (clean.startsWith('/percurso') || clean.startsWith('/optativas') || clean.startsWith('/acg') || clean.startsWith('/cursos')) {
    return AXIS_REGISTRY[2];
  }
  if (clean.startsWith('/carreira') || clean.startsWith('/estagio') || clean.startsWith('/tcc') || clean.startsWith('/estagio-tcc')) {
    return AXIS_REGISTRY[3];
  }
  if (
    clean.startsWith('/transparencia') ||
    clean.startsWith('/ouvidoria') ||
    clean.startsWith('/chapa-semente') ||
    clean.startsWith('/documentos') ||
    clean.startsWith('/sobre') ||
    clean.startsWith('/gestao') ||
    clean.startsWith('/faq') ||
    clean.startsWith('/mapa-do-site')
  ) {
    return AXIS_REGISTRY[4];
  }

  return undefined;
}

/**
 * Retorna o ID do item ativo dentro de um eixo para o pathname fornecido.
 */
export function getActiveItemId(axis: AxisConfig, pathname: string, hash: string = ''): string {
  const clean = normalizePathname(pathname);

  // Se houver hash específico que coincida com algum item
  if (hash) {
    const hashItem = axis.items.find((item) => item.href.includes(hash));
    if (hashItem) return hashItem.id;
  }

  // Confere primeiro por correspondência exata de rota
  for (const item of axis.items) {
    if (item.match && item.match.length > 0) {
      for (const pattern of item.match) {
        if (new RegExp(pattern).test(clean)) {
          return item.id;
        }
      }
    }
  }

  // Fallback: primeiro item do eixo (Visão Geral)
  return axis.items[0]?.id || '';
}

/**
 * Retorna todos os 5 Eixos.
 */
export function getAllAxes(): AxisConfig[] {
  return AXIS_REGISTRY;
}
