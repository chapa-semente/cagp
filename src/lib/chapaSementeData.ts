// src/lib/chapaSementeData.ts — Mapeamento Central das 9 Lideranças da Chapa Semente e Tour dos 5 Eixos
// Baseado estritamente em _referencias/documentos-oficiais/briefing_do_site.md

import { asset, route } from '@/lib/paths';

export interface LeaderInfo {
  id: string;
  name: string;
  role: string;
  tagline: string;
  quote: string;
  painPoint: string;
  solution: string;
  photoFilename?: string;
  initials: string;
  deptColor: string;
  badgeBg: string;
  toolLabel: string;
  toolHref: string;
  targetId: string;
}

export const CHAPA_LEADERS: LeaderInfo[] = [
  {
    id: 'gabriel',
    name: 'Gabriel Sathler',
    role: 'Presidência',
    tagline: 'Criador e Programador do SuperApp',
    quote:
      'Centro Acadêmico não pode ser terra arrasada a cada troca de mandato. O SuperApp é a garantia de que as informações do curso pertencem a todos os estudantes, independentemente do resultado das urnas.',
    painPoint:
      'A cada eleição o centro acadêmico perde histórico, arquivos e contatos, deixando os estudantes reféns do improviso da gestão vigente.',
    solution:
      'Infraestrutura institucional perene, mantida em código aberto e com alimentação simples em Markdown para o curso de Gestão Pública.',
    photoFilename: 'Gabriel Sathler.jpg',
    initials: 'GS',
    deptColor: 'bg-purple-600 text-white border-purple-800',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    toolLabel: 'Conhecer Infraestrutura',
    toolHref: route('/transparencia'),
    targetId: 'cagp-home-banner-semente',
  },
  {
    id: 'livia',
    name: 'Lívia Martins',
    role: 'Assessoria da Presidência',
    tagline: 'Idealizadora do Manual "Como se Formar" & Diretora de Arte',
    quote:
      'É "old" que o curso tem potencial, mas é evidente também que o estudante se perde diante de portais confusos. Chega de poluição visual: manual prático e currículo a um clique.',
    painPoint:
      'Sobrecarga cognitiva e formato inacessível do portal da universidade, somados ao isolamento profissional de quem não sabe como validar estágios ou se formar.',
    solution:
      'Manual prático descomplicado, estilo neobrutalista moderno e banco de currículos integrado para inserção profissional discente.',
    photoFilename: 'Livia Martins.jpeg',
    initials: 'LM',
    deptColor: 'bg-emerald-600 text-white border-emerald-800',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    toolLabel: 'Acessar Hub de Carreira',
    toolHref: route('/carreira'),
    targetId: 'cagp-shortcut-carreira',
  },
  {
    id: 'larissa',
    name: 'Larissa Prado',
    role: 'Vice-Presidência',
    tagline: 'Acolhimento Discente & Ouvidoria Permanente',
    quote:
      'Chegar a uma universidade imensa sem saber para onde correr gera angústia real. O Centro Acadêmico não pode funcionar como uma panelinha que só conversa entre si. A gestão existe para servir a todas as salas.',
    painPoint:
      'O desamparo de quem vem de fora ou ingressa sem conhecer ninguém, deparando-se com um centro acadêmico fechado em círculos de amizade.',
    solution:
      'Hub de acolhimento estudantil, mapas do campus, guia de recepção de calouros e canal de ouvidoria permanente ("Reclame Aqui GP").',
    photoFilename: 'Larissa Prado.jpg',
    initials: 'LP',
    deptColor: 'bg-amber-600 text-white border-amber-800',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    toolLabel: 'Abrir Canal de Ouvidoria',
    toolHref: route('/ouvidoria'),
    targetId: 'cagp-shortcut-ouvidoria',
  },
  {
    id: 'mariana',
    name: 'Mariana Presti',
    role: 'Diretoria Acadêmica',
    tagline: 'Pesquisa Aberta & 11 Núcleos do DCP',
    quote:
      'Planilhas abandonadas no Drive não formam pesquisadores. Oportunidade que você não vê é oportunidade perdida: seu currículo e suas bolsas começam abertas no site.',
    painPoint:
      'O confinamento da pesquisa acadêmica e a dependência de planilhas de Drive esquecidas para achar editais e grupos de pesquisa.',
    solution:
      'Centralização aberta de todos os 11 núcleos do DCP, laboratórios de pesquisa e oportunidades de bolsas de iniciação científica (PIBIC) em tempo real.',
    photoFilename: 'MarianaPresti.jpeg',
    initials: 'MP',
    deptColor: 'bg-blue-600 text-white border-blue-800',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
    toolLabel: 'Ver Oportunidades de Pesquisa',
    toolHref: route('/pesquisa'),
    targetId: 'cagp-shortcut-pesquisa',
  },
  {
    id: 'joao',
    name: 'João Pedro Fragoso',
    role: 'Comunicação e Marketing',
    tagline: 'Seriedade Institucional & Escuta de Ementas',
    quote:
      'Comunicação de Centro Acadêmico é muito mais do que postar convite de festa no Instagram. Gestão Pública pede profundidade, seriedade e diálogo. Sua voz vira pauta.',
    painPoint:
      'Uma comunicação superficial restrita a cobrir eventos de festa, sem espaço para acolhimento de denúncias ou divulgação científica.',
    solution:
      'Portal oficial de notícias, canal de escuta para reportar disciplinas com ementas defasadas diretamente ao Colegiado e vídeos demonstrativos.',
    photoFilename: 'João Pedro Fragoso.jpg',
    initials: 'JF',
    deptColor: 'bg-rose-600 text-white border-rose-800',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
    toolLabel: 'Acessar Mural de Notícias',
    toolHref: route('/noticias'),
    targetId: 'cagp-home-news-feed',
  },
  {
    id: 'vitoria',
    name: 'Vitória Moraes',
    role: 'Diretoria Financeira',
    tagline: 'Transparência Centavo a Centavo & Tutoriais FUMP',
    quote:
      'O estudante trabalhador e o fumpista sustentam a universidade no dia a dia e precisam de retorno concreto. Não aceitamos caixas opacos ou saldo parado sem uso.',
    painPoint:
      'Caixas opacos com movimentações obscuras e falta de orientação prática para obtenção de auxílios socioeconômicos da assistência estudantil.',
    solution:
      'Portal da Transparência em tempo real centavo a centavo e tutoriais passo a passo para requerimento de benefícios da FUMP e estágio.',
    photoFilename: 'Vitoria Moraes.jpg',
    initials: 'VM',
    deptColor: 'bg-emerald-700 text-white border-emerald-900',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    toolLabel: 'Ver Portal da Transparência',
    toolHref: route('/transparencia'),
    targetId: 'cagp-shortcut-transparencia',
  },
  {
    id: 'italo',
    name: 'Ítalo de Morais',
    role: 'Articulação e Assuntos Políticos',
    tagline: 'Autonomia Política, Eficiência & Cursos Livres',
    quote:
      'Autonomia e articulação começam na capacidade de resolver os problemas do curso sem gastar rios de dinheiro com terceiros. Debate e formação ao alcance de todos.',
    painPoint:
      'O isolamento institucional do CA, a falta de formação crítica ampla e o desperdício de recursos contratando terceiros para serviços básicos.',
    solution:
      'Solução de hospedagem técnica em cooperação discente, divulgação aberta de cursos livres de ciência política e defesa da independência do CA.',
    photoFilename: 'Italo de Morais.jpg',
    initials: 'IM',
    deptColor: 'bg-cyan-700 text-white border-cyan-900',
    badgeBg: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    toolLabel: 'Explorar Cursos Livres & ENAP',
    toolHref: route('/cursos'),
    targetId: 'cagp-shortcut-cursos',
  },
  {
    id: 'lara',
    name: 'Lara Soares',
    role: 'Diretoria Jurídica',
    tagline: 'Estágio sem Travas & Segurança Burocrática',
    quote:
      'Poucas coisas causam tanto estresse na graduação quanto conseguir uma vaga de estágio e ver o contrato parado sem saber a quem recorrer. O caminho formal está esquematizado.',
    painPoint:
      'A insegurança e o desgaste burocrático de perder estágios ou ter contratos travados por desconhecimento das regras institucionais da UFMG.',
    solution:
      'Roteiro de preenchimento de Termos de Compromisso de Estágio (TCE), minutas para download e instruções claras para dispensa do Artigo 41.',
    photoFilename: 'Lara Soares.jpg',
    initials: 'LS',
    deptColor: 'bg-indigo-700 text-white border-indigo-900',
    badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    toolLabel: 'Acessar Guia de Estágio',
    toolHref: route('/carreira') + '#art41',
    targetId: 'cagp-shortcut-estagio',
  },
  {
    id: 'paloma-alice',
    name: 'Paloma Correia & Alice Maurício',
    role: 'Cultura e Acolhimento',
    tagline: 'Voz do Turno Noturno & Integração na FAFICH',
    quote:
      'Gestão Pública é um curso noturno, feito por quem trabalha o dia inteiro e não pode comparecer a eventos às duas da tarde. Nossa cultura universitária respeita o tempo do aluno trabalhador.',
    painPoint:
      'Atividades de convivência marcadas em horários incompatíveis com o turno da noite e calouros sem referências sobre os espaços da universidade.',
    solution:
      'Calendário cultural planejado para o período noturno, tutoriais validados diretamente por ingressantes e defesa das linhas do Circular 22:30.',
    photoFilename: 'Paloma Correia.jpg',
    initials: 'PA',
    deptColor: 'bg-orange-600 text-white border-orange-800',
    badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
    toolLabel: 'Ver Guia Noturno & FUMP',
    toolHref: route('/permanencia'),
    targetId: 'cagp-shortcut-permanencia',
  },
];

const AVAILABLE_LEADER_PHOTOS = new Set([
  'Gabriel Sathler.jpg',
  'Livia Martins.jpeg',
  'MarianaPresti.jpeg',
  'João Pedro Fragoso.jpg',
]);

export function getLeaderPhotoUrl(filename?: string): string | null {
  if (!filename || !AVAILABLE_LEADER_PHOTOS.has(filename)) return null;
  const encodedName = encodeURIComponent(filename);
  return asset(`/images/chapa/${encodedName}`);
}

// ---------------------------------------------------------------------------
// PERSISTÊNCIA DA SESSÃO DO TOUR ENTRE PÁGINAS (SESSION STORAGE)
// ---------------------------------------------------------------------------

export interface TourSessionState {
  isOpen: boolean;
  currentStep: number;
  isPlaying: boolean;
  autoPlay: boolean;
}

export const TOUR_SESSION_KEY = 'cagp_tour_session_v1';

export function loadTourSession(): TourSessionState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(TOUR_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveTourSession(state: TourSessionState): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(TOUR_SESSION_KEY, JSON.stringify(state));
  } catch {}
}

export function clearTourSession(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(TOUR_SESSION_KEY);
  } catch {}
}

// ---------------------------------------------------------------------------
// 12 PARADAS ESTRUTURADAS DO TOUR MULTI-PÁGINAS DA CHAPA SEMENTE
// Articulando as 9 lideranças e as ferramentas do SuperApp nas rotas reais
// ---------------------------------------------------------------------------

export interface ChapaTourStop {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  pageRoute: string;
  target: string;
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center';
  leader?: LeaderInfo;
  badge: string;
  badgeBg: string;
  quote?: string;
  painPoint: string;
  solution: string;
  toolLabel: string;
  toolHref: string;
}

export const CHAPA_TOUR_12_STOPS: ChapaTourStop[] = [
  {
    id: 'stop-gabriel',
    stepNumber: 1,
    title: '1. Gabriel Sathler — Presidência',
    subtitle: 'Criador e Programador do SuperApp CAGP',
    pageRoute: route('/'),
    target: '#cagp-home-banner-semente, main',
    placement: 'bottom',
    leader: CHAPA_LEADERS[0],
    badge: 'Presidência • SuperApp',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    quote:
      'Centro Acadêmico não pode ser terra arrasada a cada troca de mandato. O SuperApp é a garantia de que as informações do curso pertencem a todos os estudantes, independentemente do resultado das urnas.',
    painPoint:
      'A cada eleição o centro acadêmico perde histórico, arquivos e contatos, deixando os estudantes reféns do improviso da gestão vigente.',
    solution:
      'Infraestrutura institucional perene, mantida em código aberto e com alimentação simples em Markdown para o curso de Gestão Pública.',
    toolLabel: 'Ver Carta-Programa da Chapa Semente',
    toolHref: route('/chapa-semente'),
  },
  {
    id: 'stop-campus',
    stepNumber: 2,
    title: '2. Rotina Noturna & Campus em Tempo Real',
    subtitle: 'Plantão Noturno FAFICH / UFMG',
    pageRoute: route('/'),
    target: '#cagp-widget-campus, #cagp-home-banner-semente, main',
    placement: 'top',
    badge: 'Turno Noturno • Pampulha',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    painPoint:
      'Sair da aula às 22h30 sem saber se o Circular Noturno ainda está circulando ou perder o horário do jantar do RU por falta de avisos integrados.',
    solution:
      'Widget tátil do Campus Agora com monitoramento do RU II Setorial (jantar até 20h30), última saída da Linha Circular Noturna às 22h30 e biblioteca da FAFICH.',
    toolLabel: 'Explorar Guia Noturno & RU',
    toolHref: route('/permanencia'),
  },
  {
    id: 'stop-passaporte',
    stepNumber: 3,
    title: '3. Passaporte Discente & Cofre Offline',
    subtitle: 'Sua Identidade Acadêmica e Histórico Seguro',
    pageRoute: route('/'),
    target: '#cagp-home-passport-btn, #passaporte, main',
    placement: 'left',
    badge: 'Privacidade • Local-First',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    painPoint:
      'Perder prazos de 120 dias para envio de certificados de atividades complementares ou depender de logins lentos e instáveis do portal da universidade.',
    solution:
      'Perfil discente 100% privado e salvo no seu navegador (Student Vault), funcionando offline com visualização dos Candangos e anel de integralização 3.000h.',
    toolLabel: 'Abrir Passaporte Discente',
    toolHref: '#passaporte',
  },
  {
    id: 'stop-livia',
    stepNumber: 4,
    title: '4. Lívia Martins — Assessoria da Presidência',
    subtitle: 'Idealizadora do Manual "Como se Formar" & Diretora de Arte',
    pageRoute: route('/carreira'),
    target: '#cagp-carreira-header, #ws-panel-v0, main',
    placement: 'bottom',
    leader: CHAPA_LEADERS[1],
    badge: 'Carreira & Formação',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    quote:
      'É "old" que o curso tem potencial, mas é evidente também que o estudante se perde diante de portais confusos. Chega de poluição visual: manual prático e currículo a um clique.',
    painPoint:
      'Sobrecarga cognitiva e formato inacessível do portal da universidade, somados ao isolamento profissional de quem não sabe como validar estágios ou se formar.',
    solution:
      'Manual prático descomplicado, estilo neobrutalista moderno e banco de currículos integrado para inserção profissional discente.',
    toolLabel: 'Acessar Hub de Carreira & Estágio',
    toolHref: route('/carreira'),
  },
  {
    id: 'stop-larissa',
    stepNumber: 5,
    title: '5. Larissa Prado — Vice-Presidência',
    subtitle: 'Acolhimento Discente & Ouvidoria Permanente',
    pageRoute: route('/ouvidoria'),
    target: '#cagp-ouvidoria-header, main',
    placement: 'bottom',
    leader: CHAPA_LEADERS[2],
    badge: 'Acolhimento & Ouvidoria',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    quote:
      'Chegar a uma universidade imensa sem saber para onde correr gera angústia real. O Centro Acadêmico não pode funcionar como uma panelinha que só conversa entre si. A gestão existe para servir a todas as salas.',
    painPoint:
      'O desamparo de quem vem de fora ou ingressa sem conhecer ninguém, deparando-se com um centro acadêmico fechado em círculos de amizade.',
    solution:
      'Canal contínuo de escuta discente ("Reclame Aqui GP"), denúncia de ementas defasadas ao Colegiado e apoio humanizado integral.',
    toolLabel: 'Abrir Canal de Ouvidoria Discente',
    toolHref: route('/ouvidoria'),
  },
  {
    id: 'stop-mariana',
    stepNumber: 6,
    title: '6. Mariana Presti — Diretoria Acadêmica',
    subtitle: 'Pesquisa Aberta & 11 Núcleos do DCP',
    pageRoute: route('/pesquisa'),
    target: '#cagp-pesquisa-header, #ws-panel-v1, #nucleos, main',
    placement: 'bottom',
    leader: CHAPA_LEADERS[3],
    badge: 'Pesquisa & Iniciação Científica',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
    quote:
      'Planilhas abandonadas no Drive não formam pesquisadores. Oportunidade que você não vê é oportunidade perdida: seu currículo e suas bolsas começam abertas no site.',
    painPoint:
      'O confinamento da pesquisa acadêmica e a dependência de planilhas de Drive esquecidas para achar editais e grupos de pesquisa.',
    solution:
      'Centralização aberta de todos os 11 núcleos do DCP, laboratórios de pesquisa e oportunidades de bolsas de iniciação científica (PIBIC) em tempo real.',
    toolLabel: 'Ver Oportunidades de Pesquisa',
    toolHref: route('/pesquisa'),
  },
  {
    id: 'stop-joao',
    stepNumber: 7,
    title: '7. João Pedro Fragoso — Comunicação e Marketing',
    subtitle: 'Seriedade Institucional & Escuta de Ementas',
    pageRoute: route('/noticias'),
    target: '#cagp-noticias-header, #cagp-home-news-feed, main',
    placement: 'top',
    leader: CHAPA_LEADERS[4],
    badge: 'Comunicação & Notícias',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
    quote:
      'Comunicação de Centro Acadêmico é muito mais do que postar convite de festa no Instagram. Gestão Pública pede profundidade, seriedade e diálogo. Sua voz vira pauta.',
    painPoint:
      'Uma comunicação superficial restrita a cobrir eventos de festa, sem espaço para acolhimento de denúncias ou divulgação científica.',
    solution:
      'Portal oficial de notícias, avisos de editais em primeira mão e canal de escuta para reportar disciplinas com ementas defasadas diretamente ao Colegiado.',
    toolLabel: 'Acessar Mural de Notícias',
    toolHref: route('/noticias'),
  },
  {
    id: 'stop-vitoria',
    stepNumber: 8,
    title: '8. Vitória Moraes — Diretoria Financeira',
    subtitle: 'Transparência Centavo a Centavo & Tutoriais FUMP',
    pageRoute: route('/transparencia'),
    target: '#cagp-transparencia-header, main',
    placement: 'bottom',
    leader: CHAPA_LEADERS[5],
    badge: 'Transparência & Caixa Aberto',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    quote:
      'O estudante trabalhador e o fumpista sustentam a universidade no dia a dia e precisam de retorno concreto. Não aceitamos caixas opacos ou saldo parado sem uso.',
    painPoint:
      'Caixas opacos com movimentações obscuras e falta de orientação prática para obtenção de auxílios socioeconômicos da assistência estudantil.',
    solution:
      'Portal da Transparência em tempo real centavo a centavo, livro-caixa público e tutoriais passo a passo para requerimento de benefícios da FUMP e estágio.',
    toolLabel: 'Ver Portal da Transparência',
    toolHref: route('/transparencia'),
  },
  {
    id: 'stop-italo',
    stepNumber: 9,
    title: '9. Ítalo de Morais — Articulação e Assuntos Políticos',
    subtitle: 'Autonomia Política, Eficiência & Cursos Livres',
    pageRoute: route('/cursos'),
    target: '#cagp-cursos-header, main',
    placement: 'bottom',
    leader: CHAPA_LEADERS[6],
    badge: 'Formação & Cursos Livres',
    badgeBg: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    quote:
      'Autonomia e articulação começam na capacidade de resolver os problemas do curso sem gastar rios de dinheiro com terceiros. Debate e formação ao alcance de todos.',
    painPoint:
      'O isolamento institucional do CA, a falta de formação crítica ampla e o desperdício de recursos contratando terceiros para serviços básicos.',
    solution:
      'Catálogo de 1.045 cursos gratuitos da ENAP/EV.G que contam como Extensão/AAC com adição em 1 clique na Calculadora 600h e cursos livres de ciência política.',
    toolLabel: 'Explorar Catálogo ENAP & Cursos Livres',
    toolHref: route('/cursos'),
  },
  {
    id: 'stop-lara',
    stepNumber: 10,
    title: '10. Lara Soares — Diretoria Jurídica',
    subtitle: 'Estágio sem Travas & Segurança Burocrática',
    pageRoute: route('/carreira'),
    target: '#cagp-carreira-art41, #art41, #ws-panel-v1, main',
    placement: 'bottom',
    leader: CHAPA_LEADERS[7],
    badge: 'Segurança Jurídica & Estágio',
    badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    quote:
      'Poucas coisas causam tanto estresse na graduação quanto conseguir uma vaga de estágio e ver o contrato parado sem saber a quem recorrer. O caminho formal está esquematizado.',
    painPoint:
      'A insegurança e o desgaste burocrático de perder estágios ou ter contratos travados por desconhecimento das regras institucionais da UFMG.',
    solution:
      'Roteiro de preenchimento de Termos de Compromisso de Estágio (TCE), minutas para download e instruções claras para dispensa de estágio de servidores (Artigo 41).',
    toolLabel: 'Consultar Guia de Estágio & Art. 41',
    toolHref: route('/carreira') + '#art41',
  },
  {
    id: 'stop-paloma-alice',
    stepNumber: 11,
    title: '11. Paloma & Alice — Cultura e Acolhimento',
    subtitle: 'Voz do Turno Noturno & Integração na FAFICH',
    pageRoute: route('/permanencia'),
    target: '#cagp-permanencia-header, main',
    placement: 'bottom',
    leader: CHAPA_LEADERS[8],
    badge: 'Permanência & FUMP',
    badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
    quote:
      'Gestão Pública é um curso noturno, feito por quem trabalha o dia inteiro e não pode comparecer a eventos às duas da tarde. Nossa cultura universitária respeita o tempo do aluno trabalhador.',
    painPoint:
      'Atividades de convivência marcadas em horários incompatíveis com o turno da noite e calouros sem referências sobre os espaços da universidade.',
    solution:
      'Guia de Permanência Estudantil FUMP (Níveis I, II e III), moradia universitária, bolsas, acolhimento e defesa das linhas do Circular Noturno 22:30.',
    toolLabel: 'Ver Guia de Permanência FUMP',
    toolHref: route('/permanencia'),
  },
  {
    id: 'stop-curriculo',
    stepNumber: 12,
    title: '12. Trajetória Curricular & Integralização 3.000h',
    subtitle: 'PPC 2020 • Grafo 10P e Calculadora 600h',
    pageRoute: route('/percurso'),
    target: '#cagp-percurso-header, #ws-panel-v0, #grafo, main',
    placement: 'top',
    badge: 'Currículo & 600h Extensão',
    badgeBg: 'bg-teal-100 text-teal-900 border-teal-300',
    painPoint:
      'Descobrir no final do curso pendências de horas complementares ou matérias trancadas por pré-requisitos não planejados.',
    solution:
      'Mapeamento visual da jornada acadêmica completa em Gestão Pública: 27 disciplinas obrigatórias, 10 períodos, regras de pré-requisitos e calculadora com guardião de 120 dias.',
    toolLabel: 'Acessar Grafo do Percurso Curricular',
    toolHref: route('/percurso'),
  },
];

export const CHAPA_SEMENTE_LEADERS = CHAPA_LEADERS;

