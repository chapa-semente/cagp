// src/lib/sementeTour.ts — Roteiro do tour obrigatório da Chapa Semente (primeira visita).
// Decisão de 10/11/2026: o tour abre antes de qualquer conteúdo, não tem "pular" e só fecha no fim.
// Cada integrante tem uma tela de história (foto + dor do estudante) e um spotlight na ferramenta
// real que defendeu. A ordem muda conforme o momento de curso que a pessoa escolhe na abertura.
// Fatos: só o que o site já entrega. Ferramenta simulada leva `simulated: true` (sticker SIMULADO).

import { asset, route } from '@/lib/paths';
import { CHAPA_LEADERS, type LeaderInfo } from '@/lib/chapaSementeData';
import type { UserRole } from '@/lib/storage/studentVault';

export type TourLeaderId =
  | 'gabriel'
  | 'larissa'
  | 'livia'
  | 'mariana'
  | 'nilo'
  | 'joao'
  | 'vitoria'
  | 'klaus'
  | 'italo'
  | 'lara'
  | 'paloma'
  | 'alice';

export interface TourStop {
  leaderId: TourLeaderId;
  /** Rota onde a ferramenta vive (o tour mostra uma captura dela; ver scripts/capture-tour-shots.mjs). */
  route: string;
  /** Aba do SegmentedControl (`data-ws-tab`) que precisa estar aberta. */
  tab?: string;
  /** Seletor único do alvo do spotlight (sem vírgulas: um alvo por parada). */
  target: string;
  /** A dor, na voz de quem estuda. Pergunta curta. */
  hook: string;
  /** Quem resolveu e como, em uma frase. */
  answer: string;
  /** Nome da ferramenta no spotlight. */
  tool: string;
  /** O que a ferramenta faz de verdade, hoje. */
  proof: string;
  simulated?: boolean;
  /** Enquadramento da foto recortada do tour (CSS object-position). Padrão: 'center 30%'. */
  photoPosition?: string;
}

export const TOUR_STOPS: Record<TourLeaderId, TourStop> = {
  gabriel: {
    leaderId: 'gabriel',
    route: route('/guias'),
    target: '[data-tour="gabriel"]',
    hook: 'Pediu o requerimento no grupo e ninguém mandou?',
    answer: 'Gabriel construiu este site para os documentos do curso ficarem com os estudantes, não com a diretoria da vez.',
    tool: 'Documentos mais pedidos',
    proof: 'Os formulários que mais aparecem no WhatsApp, prontos para abrir e mandar. Ideia nossa, construída há muito tempo, e o site é do curso.',
  },
  larissa: {
    leaderId: 'larissa',
    route: route('/ouvidoria'),
    target: '[data-tour="larissa"]',
    hook: 'Tem uma reclamação sobre o curso e não sabe para quem levar?',
    answer: 'Larissa quer um centro acadêmico que escute todas as turmas, não só a panelinha.',
    tool: 'Ouvidoria do estudante',
    proof: 'Você escreve a demanda, o site organiza o texto e guarda no seu celular, pronto para copiar e enviar.',
  },
  livia: {
    leaderId: 'livia',
    route: route('/formatura'),
    target: '[data-tour="livia"]',
    hook: 'Chegou na reta final e não sabe o que falta para colar grau?',
    answer: 'Lívia transformou o "como se formar" num roteiro sem poluição visual.',
    tool: 'Reta final, passo a passo',
    proof: 'Dez passos, do estágio à colação, com o que entregar em cada um. Você marca o que já fez e vê o que falta.',
  },
  mariana: {
    leaderId: 'mariana',
    route: route('/pesquisa'),
    tab: 'v0',
    target: '[data-tour="mariana"]',
    hook: 'Quer pesquisar, mas as oportunidades moram em planilhas esquecidas no Drive?',
    answer: 'Mariana abriu os 11 núcleos de pesquisa do departamento num lugar só.',
    tool: 'Os 11 núcleos do DCP',
    proof: 'Quem são, o que estudam e como chegar em cada grupo de pesquisa de Ciência Política.',
  },
  nilo: {
    leaderId: 'nilo',
    route: route('/pesquisa'),
    tab: 'v1',
    target: '[data-tour="nilo"]',
    hook: 'Iniciação científica parece coisa de quem já conhece algum professor?',
    answer: 'Nilo mapeou o caminho para qualquer estudante chegar na pesquisa.',
    tool: 'Como entrar em pesquisa',
    proof: 'Iniciação científica, bolsas e imersão: o que é cada uma e o primeiro passo para pedir.',
  },
  joao: {
    leaderId: 'joao',
    route: route('/noticias'),
    target: '[data-tour="joao"]',
    hook: 'A comunicação do CA só aparece quando tem festa?',
    answer: 'João Pedro quer um mural sério: assembleias, editais e o que muda no curso.',
    tool: 'Mural de notícias',
    proof: 'É o modelo do mural que vamos alimentar. As notícias de agora são exemplos.',
    simulated: true,
  },
  vitoria: {
    leaderId: 'vitoria',
    route: route('/permanencia'),
    tab: 'v0',
    target: '[data-tour="vitoria"]',
    hook: 'Trabalha de dia, estuda à noite e não sabe se tem direito à FUMP?',
    answer: 'Vitória escreveu o guia da assistência estudantil sem juridiquês.',
    tool: 'Níveis da FUMP',
    proof: 'O que cada nível garante, quem pode pedir e um simulador para ver onde você se encaixa.',
  },
  klaus: {
    leaderId: 'klaus',
    photoPosition: 'center 30%',
    route: route('/transparencia'),
    target: '[data-tour="klaus"]',
    hook: 'Sabe para onde vai o dinheiro do centro acadêmico?',
    answer: 'Klaus quer o caixa do CAGP aberto, lançamento por lançamento, para qualquer estudante conferir.',
    tool: 'Portal da Transparência',
    proof: 'É o modelo do livro-caixa que vamos publicar. Os lançamentos de agora são exemplos.',
    simulated: true,
  },
  italo: {
    leaderId: 'italo',
    photoPosition: 'center 30%',
    route: route('/cursos'),
    target: '[data-tour="italo"]',
    hook: 'Faltam horas complementares e não sobra tempo nem dinheiro para curso?',
    answer: 'Ítalo reuniu cursos gratuitos que entram na sua conta das 600h.',
    tool: '1.045 cursos gratuitos da ENAP',
    proof: 'Filtre por tema e carga horária e mande o curso direto para a calculadora das 600h.',
  },
  lara: {
    leaderId: 'lara',
    route: route('/estagio'),
    tab: 'v1',
    target: '[data-tour="lara"]',
    hook: 'Já trabalha no serviço público e acha que vai ter que fazer estágio mesmo assim?',
    answer: 'Lara destrinchou o Art. 41: quem trabalha na área pode pedir a dispensa das 300h.',
    tool: 'Simulador do Art. 41',
    proof: 'Responda sobre o seu vínculo e veja se dá para aproveitar o trabalho no lugar do estágio, com os documentos do pedido.',
  },
  paloma: {
    leaderId: 'paloma',
    photoPosition: 'center 30%',
    route: route('/'),
    target: '#cagp-widget-campus',
    hook: 'Saiu da aula às 22h e o Circular já tinha passado?',
    answer: 'Paloma defende o turno da noite: um CA no horário de quem trabalha.',
    tool: 'Campus agora',
    proof: 'O horário do jantar no RU e as últimas partidas do ônibus interno, logo na tela inicial.',
  },
  alice: {
    leaderId: 'alice',
    route: route('/calouros'),
    tab: 'v1',
    target: '[data-tour="alice"]',
    hook: 'Acabou de entrar na UFMG e não sabe nem onde fica a sala?',
    answer: 'Alice acabou de chegar ao curso e escreveu o guia que queria ter recebido.',
    tool: 'Os primeiros 30 dias',
    proof: 'Um checklist do começo do curso, para marcar no seu ritmo, salvo só no seu celular.',
  },
};

/** Opções da pergunta de abertura (reaproveita os papéis do cofre). */
export const TOUR_PROFILES: { role: UserRole; label: string; hint: string; icon: string }[] = [
  { role: 'calouro', label: 'Acabei de entrar', hint: '1º ou 2º período', icon: 'bi-door-open' },
  { role: 'veterano', label: 'Estou no meio do curso', hint: 'Estágio, 600h, optativas', icon: 'bi-signpost-split' },
  { role: 'formando', label: 'Estou na reta final', hint: 'TCC, colação', icon: 'bi-mortarboard' },
  { role: 'ingressar', label: 'Quero entrar no curso', hint: 'Ainda não estudo aqui', icon: 'bi-compass' },
];

/** Quem cuida da dor do perfil aparece primeiro. Mariana e Nilo ficam juntos (mesma página). */
export const TOUR_ORDER: Record<UserRole, TourLeaderId[]> = {
  calouro: ['alice', 'larissa', 'paloma', 'vitoria', 'klaus', 'gabriel', 'mariana', 'nilo', 'italo', 'lara', 'livia', 'joao'],
  veterano: ['italo', 'lara', 'vitoria', 'klaus', 'gabriel', 'mariana', 'nilo', 'paloma', 'larissa', 'livia', 'alice', 'joao'],
  formando: ['livia', 'lara', 'gabriel', 'italo', 'larissa', 'vitoria', 'klaus', 'mariana', 'nilo', 'paloma', 'alice', 'joao'],
  ingressar: ['gabriel', 'alice', 'paloma', 'vitoria', 'klaus', 'mariana', 'nilo', 'italo', 'lara', 'livia', 'larissa', 'joao'],
};

export interface TourPerson {
  stop: TourStop;
  leader: LeaderInfo;
  firstName: string;
  photo: string;
  thumb: string;
  /** object-position da foto do tour. */
  position: string;
}

export function getTourPerson(id: TourLeaderId): TourPerson {
  const leader = CHAPA_LEADERS.find((l) => l.id === id);
  if (!leader) throw new Error(`Integrante desconhecido no tour: ${id}`);
  return {
    stop: TOUR_STOPS[id],
    leader,
    firstName: leader.name.split(' ')[0],
    photo: asset(`/images/chapa/tour/${id}.webp`),
    thumb: asset(`/images/chapa/tour/${id}-thumb.webp`),
    // Fotos refeitas para o tour já vêm enquadradas; as demais herdam o ajuste do site.
    position: TOUR_STOPS[id].photoPosition ?? leader.photoPosition ?? 'center 30%',
  };
}

/** Todos, na ordem da chapa (mosaico de abertura e fechamento). */
export const TOUR_PEOPLE_IN_CHAPA_ORDER: TourPerson[] = CHAPA_LEADERS.map((l) =>
  getTourPerson(l.id as TourLeaderId)
);

// ---------------------------------------------------------------------------
// Estado persistido (localStorage: o navegador do WhatsApp abre sessão nova a cada link)
// ---------------------------------------------------------------------------

export const SEMENTE_TOUR_KEY = 'cagp_semente_tour_v2';

export interface SementeTourState {
  status: 'active' | 'done';
  profile?: UserRole;
  /** Índice da tela atual na sequência derivada do perfil. */
  index: number;
}

export function loadSementeTour(): SementeTourState | null {
  try {
    const raw = localStorage.getItem(SEMENTE_TOUR_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SementeTourState;
    if (parsed.status !== 'active' && parsed.status !== 'done') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveSementeTour(state: SementeTourState): void {
  try {
    localStorage.setItem(SEMENTE_TOUR_KEY, JSON.stringify(state));
  } catch {
    // Armazenamento bloqueado: o tour segue funcionando nesta página.
  }
}

/** Mensagem de convite (o tour não sabe se a pessoa instalou nada, então não afirma isso). */
export function getTourShareUrl(): string {
  const base = document.documentElement.dataset.baseUrl || '/';
  const siteUrl = `${window.location.origin}${base.endsWith('/') ? base : `${base}/`}`;
  const text = [
    '*Eleição do CAGP: 25 e 26 de novembro, das 17h às 22h30, na sala do CAGP (FAFICH)*',
    '',
    'A Chapa Semente já pôs no ar um site com os guias do curso: documentos, estágio, 600h, FUMP, calouros.',
    `Dá uma olhada e conhece as ${CHAPA_LEADERS.length} pessoas da chapa:`,
    siteUrl,
  ].join('\n');
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}
