// src/components/features/semente/SementeTour.tsx — Tour da Chapa Semente.
//
// Primeira visita: abre antes de qualquer conteúdo (decisão de 10/11/2026), inclusive por link direto.
// Fluxo: panfletagem (suspense + o Plantão Semente em vídeo; ver TourPanfletagem.tsx)
// → abertura (todos os rostos) → pergunta de perfil → para cada integrante, uma tela de história
// (foto + dor do estudante) que se recolhe num cartão enquanto o spotlight recorta a ferramenta real
// → fechamento com a votação → convite da moldura. Ao terminar, devolve a pessoa à página por onde entrou.
//
// Revisão de 12/11/2026 (teste de uma colega do curso, que ficou presa na moldura e achou o tour longo):
//   • "Pular" em toda tela, desde o vídeo. Leva à tela da votação, que tem "Ir pro site": sai em 2 toques.
//   • O caminho padrão mostra só as TOUR_CURTO pessoas mais ligadas ao perfil; "Conhecer os outros"
//     abre o resto (state.full).
//   • A moldura virou convite: "Agora não, ir pro site" está sempre lá. Nada mais tranca o site.
//
// Decisão de 10/11/2026: o tour NÃO navega mais pelo site. Cada parada mostra uma captura estática da
// ferramenta (public/images/chapa/tour/shots, geradas por scripts/capture-tour-shots.mjs) e o spotlight
// recorta a ferramenta na própria foto. Nenhuma página é carregada por trás: zero rede além das imagens.
//
// Movimento (DESIGN.md › Movimento): o bloco de cor que vira cartão é o gesto autoral, feito com
// clip-path; fotos "germinam" de baixo para cima; o fim é o carimbo. Movimento sempre ativo.

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import SHOTS_JSON from '@/data/sementeTourShots.json';
import { asset } from '@/lib/paths';
import { easeOutExpo } from '@/lib/motion';
import { MarkerWord } from '@/components/ui/marker-word';
import { GritoDeVoto } from '@/components/ui/grito-de-voto';
import molduras from '@/data/molduras.json';
import { getVaultItem, setVaultItem, type UserRole } from '@/lib/storage/studentVault';
import {
  canTriggerInstallPrompt,
  downloadElectionCalendarReminder,
  isIOS,
  isStandalone,
  onInstallPromptChange,
  triggerInstallPrompt,
} from '@/lib/pwa/pwaManager';
import {
  TOUR_ORDER,
  TOUR_PEOPLE_IN_CHAPA_ORDER,
  TOUR_PROFILES,
  getTourPerson,
  getTourShareUrl,
  loadSementeTour,
  saveSementeTour,
  type SementeTourState,
  type TourPerson, SEMENTE_TOUR_KEY, TOUR_CURTO } from '@/lib/sementeTour';
import { START_PROPOSTAS_TOUR } from '@/lib/propostasTour';
import { CHAPA_NUMERO, CHAPA_ROTULO } from '@/lib/chapaSementeData';
import { TourPanfletagem } from './TourPanfletagem';

// ---------------------------------------------------------------------------
// Sequência de telas
// ---------------------------------------------------------------------------

type Screen =
  | { kind: 'intro' }
  | { kind: 'perfil' }
  | { kind: 'story'; person: TourPerson; n: number; total: number }
  /** `more`: quantas pessoas ficaram fora do caminho curto (só na última parada dele). */
  | { kind: 'spot'; person: TourPerson; n: number; total: number; next?: TourPerson; more: number }
  | { kind: 'final' }
  // A última tela (decisão do Gabriel em 11/11/2026): a moldura de apoio, um convite desde 12/11.
  | { kind: 'moldura' };

const TOTAL_PEOPLE = TOUR_PEOPLE_IN_CHAPA_ORDER.length;

/**
 * A sequência de telas. Sem perfil não há pessoas, mas a votação e a moldura existem sempre: é para
 * elas que o "Pular" leva. No caminho curto entram só as TOUR_CURTO primeiras pessoas do perfil; como
 * o completo começa pelas mesmas, o índice salvo vale nos dois.
 */
function buildScreens(profile?: UserRole, full = false): Screen[] {
  const screens: Screen[] = [{ kind: 'intro' }, { kind: 'perfil' }];
  if (profile) {
    const all = TOUR_ORDER[profile].map(getTourPerson);
    const people = full ? all : all.slice(0, TOUR_CURTO);
    people.forEach((person, n) => {
      const last = n === people.length - 1;
      screens.push({ kind: 'story', person, n, total: people.length });
      screens.push({ kind: 'spot', person, n, total: people.length, next: people[n + 1], more: last ? all.length - people.length : 0 });
    });
  }
  screens.push({ kind: 'final' });
  screens.push({ kind: 'moldura' });
  return screens;
}

/** Roxo e petróleo se alternam por pessoa (color blocking do Cartaz). */
const PURPLE = '#5B2A85';
const TEAL = '#266264';
function screenColor(s: Screen | undefined): string {
  if (!s) return PURPLE;
  if (s.kind === 'story' || s.kind === 'spot') return s.n % 2 === 0 ? PURPLE : TEAL;
  return PURPLE;
}

/** Separa o nome que abre a frase ("Ítalo reuniu…") para escrevê-lo à mão. */
function splitLeadingName(answer: string, name: string): [string, string] {
  return answer.startsWith(name) ? [name, answer.slice(name.length)] : ['', answer];
}

/** Captura estática de uma ferramenta: a imagem e onde o alvo está dentro dela (em px da imagem). */
interface TourShot {
  src: string;
  w: number;
  h: number;
  rect: { x: number; y: number; w: number; h: number };
}
const SHOTS = SHOTS_JSON as Record<string, { mobile?: TourShot; desktop?: TourShot }>;

/** Tela em pé ou estreita usa a captura de celular; o resto usa a de desktop. */
function pickShot(id: string, vw: number, vh: number): TourShot | null {
  const entry = SHOTS[id];
  if (!entry) return null;
  const portrait = vw < 700 || vw / Math.max(1, vh) < 0.85;
  return (portrait ? entry.mobile ?? entry.desktop : entry.desktop ?? entry.mobile) ?? null;
}
const preloadShot = (shot: TourShot | null) => {
  if (shot) new Image().src = asset(shot.src);
};

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const FULL_INSET = 'inset(0px 0px 0px 0px round 0px)';

function insetFor(rect: Rect, vw: number, vh: number, radius = 16): string {
  const top = Math.max(0, rect.top);
  const left = Math.max(0, rect.left);
  const right = Math.max(0, vw - (rect.left + rect.width));
  const bottom = Math.max(0, vh - (rect.top + rect.height));
  return `inset(${top}px ${right}px ${bottom}px ${left}px round ${radius}px)`;
}

// ---------------------------------------------------------------------------
// Peças visuais
// ---------------------------------------------------------------------------

/** Um segmento por pessoa: feitos em branco, atual em laranja (a folha), por vir só contornados. */
const PeopleProgress: React.FC<{ current: number; total: number; compact?: boolean }> = ({ current, total, compact }) => (
  <ol
    className={`flex items-center gap-1 m-0 p-0 list-none ${compact ? 'h-2.5' : 'h-3'}`}
    aria-label={`Pessoa ${current + 1} de ${total}`}
  >
    {Array.from({ length: total }, (_, i) => (
      <li
        key={i}
        aria-hidden="true"
        className={`h-full flex-1 rounded-full border-2 border-foreground ${
          i < current ? 'bg-white' : i === current ? 'bg-accent' : 'bg-white/0 border-white'
        }`}
      />
    ))}
  </ol>
);

/** Foto que "germina": revela de baixo para cima com clip-path. */
const GrowPhoto: React.FC<{
  person: TourPerson;
  className?: string;
  delay?: number;
  sizes?: 'thumb' | 'full';
  alt?: string;
}> = ({ person, className = '', delay = 0, sizes = 'full', alt = '' }) => (
  <motion.img
    src={sizes === 'thumb' ? person.thumb : person.photo}
    alt={alt}
    decoding="async"
    draggable={false}
    initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
    animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    transition={{ duration: 0.6, delay, ease: easeOutExpo }}
    style={{ objectPosition: person.position }}
    className={`block w-full h-full object-cover select-none ${className}`}
  />
);

// Botões do tour no gesto do kit Semente: o laranja (ação principal) tem os cantos da folha.
const btnBase =
  'inline-flex items-center justify-center gap-2 border-3 border-foreground font-heading font-bold select-none cursor-pointer ' +
  'transition-[transform,box-shadow,background-color] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed';
const btnAccent =
  `${btnBase} rounded-[26px_7px_26px_7px] uppercase tracking-[0.04em] bg-accent text-foreground shadow-md hover:-translate-x-px hover:-translate-y-px hover:shadow-lg hover:bg-accent-hover active:translate-x-[3px] active:translate-y-[3px] active:shadow-none`;
const btnOutlineLight =
  `${btnBase} rounded-[12px] bg-white text-foreground shadow-md hover:-translate-x-px hover:-translate-y-px hover:shadow-lg hover:bg-muted active:translate-x-[3px] active:translate-y-[3px] active:shadow-none`;

const BackButton: React.FC<{ onClick: () => void; label?: string }> = ({ onClick, label = 'Voltar' }) => (
  <button type="button" onClick={onClick} className={`${btnOutlineLight} w-12 h-12 shrink-0 text-base`} aria-label={label}>
    <i className="bi bi-arrow-left" aria-hidden="true" />
  </button>
);

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

interface TourRuntime extends SementeTourState {
  returnTo?: string;
  replay?: boolean;
}

export const SementeTour: React.FC = () => {
  const [state, setState] = useState<TourRuntime | null>(null);
  const [vp, setVp] = useState({ w: 0, h: 0 });
  const [cardRect, setCardRect] = useState<Rect | null>(null);
  const [closing, setClosing] = useState(false);
  // A panfletagem roda antes da tela dos rostos e não entra no índice salvo: quem volta do perfil não a revê.
  const [panfletagem, setPanfletagem] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const [cardEl, setCardEl] = useState<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const screens = useMemo(() => buildScreens(state?.profile, state?.full), [state?.profile, state?.full]);
  const open = state?.status === 'active';
  const index = state ? Math.min(state.index, screens.length - 1) : 0;
  const screen = open ? screens[index] : undefined;
  const isSpot = screen?.kind === 'spot';
  const showPanfletagem = screen?.kind === 'intro' && panfletagem;

  // ---- Montagem: decide se o tour abre --------------------------------------------------------
  useEffect(() => {
    (window as unknown as { __cagpTourMounted?: boolean }).__cagpTourMounted = true;
    const saved = loadSementeTour() as TourRuntime | null;
    if (saved?.status === 'done') {
      document.documentElement.removeAttribute('data-semente-tour');
      setState(saved);
      return;
    }
    // Quem ficou no meio do tour antigo (24 telas) continua de onde parou, no caminho completo.
    if (saved?.profile && saved.full === undefined && saved.index >= 2 + TOUR_CURTO * 2) saved.full = true;
    setState(
      saved ?? {
        status: 'active',
        index: 0,
        returnTo: window.location.pathname + window.location.search + window.location.hash,
      }
    );
  }, []);

  // Rever o tour (botões da home e da /chapa-semente): mesmo fluxo, com saída livre.
  useEffect(() => {
    const start = () => {
      setClosing(false);
      setPanfletagem(true);
      setState({
        status: 'active',
        index: 0,
        replay: true,
        returnTo: window.location.pathname + window.location.search + window.location.hash,
      });
    };
    window.addEventListener('cagp:start-semente-tour', start);
    // Para quem já fez o tour esta ilha só carrega quando pedem para rever (client:sinal="tour"):
    // o pedido que a acordou chegou antes de ela existir, e o BaseLayout deixou anotado.
    const w = window as unknown as { __cagpSementeTourPending?: number };
    if (w.__cagpSementeTourPending && Date.now() - w.__cagpSementeTourPending < 10000) start();
    w.__cagpSementeTourPending = undefined;
    return () => window.removeEventListener('cagp:start-semente-tour', start);
  }, []);

  // ---- Persistência ---------------------------------------------------------------------------
  useEffect(() => {
    if (state) saveSementeTour(state);
  }, [state]);

  // Outra aba terminou o tour (ou o armazenamento mudou por fora): esta aba fecha em vez de
  // regravar "ativo" por cima. O tour vive entre páginas (transition:persist), então sem isso
  // ele seguia navegando pelas paradas com o estado salvo já "concluído".
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== SEMENTE_TOUR_KEY) return;
      const saved = loadSementeTour() as TourRuntime | null;
      if (saved?.status === 'done') {
        setState((s) => (s && s.status === 'active' && !s.replay ? saved : s));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // ---- Viewport ---------------------------------------------------------------------------------
  useLayoutEffect(() => {
    const measure = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // ---- Bloqueio da página de trás (rolagem + inert), reaplicado a cada troca de página ------------
  useEffect(() => {
    if (!open) return;
    const apply = () => {
      const root = document.documentElement;
      root.classList.add('cagp-semente-tour-open');
      root.removeAttribute('data-semente-tour');
      Array.from(document.body.children).forEach((el) => {
        if (rootRef.current && el.contains(rootRef.current)) return;
        if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return;
        if (!el.hasAttribute('inert')) {
          el.setAttribute('inert', '');
          el.setAttribute('data-tour-inert', '');
        }
      });
    };
    apply();
    document.addEventListener('astro:after-swap', apply);
    return () => {
      document.removeEventListener('astro:after-swap', apply);
      document.documentElement.classList.remove('cagp-semente-tour-open');
      document.querySelectorAll('[data-tour-inert]').forEach((el) => {
        el.removeAttribute('inert');
        el.removeAttribute('data-tour-inert');
      });
    };
  }, [open]);

  // ---- Capturas: a foto da próxima ferramenta já vem enquanto a pessoa lê a tela atual -----------
  useEffect(() => {
    if (!screen || !vp.w) return;
    if (screen.kind === 'story') preloadShot(pickShot(screen.person.leader.id, vp.w, vp.h));
    if (screen.kind === 'spot' && screen.next) preloadShot(pickShot(screen.next.leader.id, vp.w, vp.h));
    if (screen.kind === 'perfil' && state?.profile) preloadShot(pickShot(TOUR_ORDER[state.profile][0], vp.w, vp.h));
  }, [screen, vp.w, vp.h, state?.profile]);

  // ---- Medida do cartão do spotlight -----------------------------------------------------------
  useLayoutEffect(() => {
    if (!isSpot || !cardEl) {
      setCardRect(null);
      return;
    }
    const el = cardEl;
    const read = () => {
      const r = el.getBoundingClientRect();
      setCardRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isSpot, cardEl, vp.w, vp.h]);

  // ---- Navegação entre telas --------------------------------------------------------------------
  const go = useCallback(
    (delta: number) => {
      setState((s) => {
        if (!s) return s;
        const nextIndex = Math.max(0, Math.min(buildScreens(s.profile, s.full).length - 1, s.index + delta));
        return { ...s, index: nextIndex };
      });
    },
    []
  );

  const chooseProfile = (role: UserRole) => {
    setVaultItem('cagp_user_role_v1', role);
    setState((s) => (s ? { ...s, profile: role, full: false, index: 2 } : s));
  };

  /** "Conhecer os outros": o caminho completo começa pelas mesmas pessoas, então é só seguir. */
  const showEveryone = () => setState((s) => (s ? { ...s, full: true, index: s.index + 1 } : s));

  /** "Pular": vai para a tela da votação, de onde a pessoa sai com um toque ou volta para onde estava. */
  const skip = useCallback(() => {
    setPanfletagem(false);
    setState((s) => {
      if (!s) return s;
      const finalIndex = buildScreens(s.profile, s.full).findIndex((x) => x.kind === 'final');
      return s.index >= finalIndex ? s : { ...s, skipFrom: s.index, index: finalIndex };
    });
  }, []);

  /** O voltar da votação: quem pulou retorna à tela de onde pulou. */
  const backFromFinal = () =>
    setState((s) => {
      if (!s) return s;
      if (s.skipFrom === undefined) return { ...s, index: Math.max(0, s.index - 1) };
      return { ...s, index: s.skipFrom, skipFrom: undefined };
    });

  const finish = useCallback(() => {
    setClosing(true);
    setVaultItem('cagp_onboarding_completed_v1', true);
    window.setTimeout(
      () => {
        setState((s) => (s ? { ...s, status: 'done', index: 0, skipFrom: undefined } : s));
        setClosing(false);
        window.dispatchEvent(new CustomEvent('cagp:semente-tour-done'));
      },
      520
    );
  }, []);

  // Foco no título de cada tela + teclado (setas avançam e voltam; Esc pula, e ao rever fecha).
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => headingRef.current?.focus({ preventScroll: true }), 260);
    return () => window.clearTimeout(t);
  }, [open, index, showPanfletagem]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (state?.replay) finish();
        else skip();
        return;
      }
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (showPanfletagem) return;
      if (e.key === 'ArrowRight' && screen?.kind !== 'perfil' && screen?.kind !== 'final' && screen?.kind !== 'moldura') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, screen, index, go, finish, skip, state?.replay, showPanfletagem]);

  if (!open || !screen) return null;

  // ---- Geometria do bloco de cor -----------------------------------------------------------------
  const panelColor = screenColor(screen);
  const panelClip = closing
    ? `inset(${vp.h}px 0px 0px 0px round 0px)`
    : isSpot && cardRect && vp.w
      ? insetFor(cardRect, vp.w, vp.h)
      : FULL_INSET;
  const showScrim = isSpot && !closing;
  // A captura ocupa a largura da tela, alinhada ao topo; o recorte é o alvo na escala da foto.
  const shot = screen.kind === 'spot' && vp.w ? pickShot(screen.person.leader.id, vp.w, vp.h) : null;
  const shotScale = shot ? vp.w / shot.w : 1;
  let holeRect: Rect | null = null;
  if (shot && cardRect) {
    const top = Math.max(8, shot.rect.y * shotScale - 8);
    const left = Math.max(8, shot.rect.x * shotScale - 8);
    const right = Math.min(vp.w - 8, (shot.rect.x + shot.rect.w) * shotScale + 8);
    const overCard = right > cardRect.left && left < cardRect.left + cardRect.width;
    const floor = Math.min(shot.h * shotScale, overCard ? cardRect.top - 14 : vp.h - 14);
    const bottom = Math.min(floor, (shot.rect.y + shot.rect.h) * shotScale + 8);
    holeRect = { top, left, width: Math.max(0, right - left), height: Math.max(48, bottom - top) };
  }
  const hole = holeRect ?? { top: 0, left: 0, width: vp.w, height: vp.h };
  const settledSpot = isSpot && !!cardRect;
  // O canto de cima à direita: "Pular" na primeira visita (menos na votação e na moldura, que já são
  // a saída), o fechar ao rever. As telas reservam esse canto para o botão não cobrir nada.
  const canSkip = !state?.replay && screen.kind !== 'final' && screen.kind !== 'moldura';
  const corner = canSkip ? 'pular' : state?.replay ? 'fechar' : undefined;

  const liveText =
    screen.kind === 'story'
      ? `${screen.person.leader.name}, ${screen.person.leader.role}. Pessoa ${screen.n + 1} de ${TOTAL_PEOPLE}.`
      : screen.kind === 'spot'
        ? `Ferramenta: ${screen.person.stop.tool}.`
        : screen.kind === 'final'
          ? 'Votação: 25 e 26 de novembro.'
          : screen.kind === 'moldura'
            ? 'Sua foto com a moldura da Chapa 2.'
            : '';

  return (
    <MotionConfig reducedMotion="never">
      <div
        ref={rootRef}
        id="cagp-semente-tour"
        role="dialog"
        aria-modal="true"
        aria-labelledby="semente-tour-heading"
        className="fixed inset-0 z-[1200] font-sans"
        style={{ viewTransitionName: 'semente-tour' }}
      >
        <p className="sr-only" aria-live="polite">
          {liveText}
        </p>

        {/* 0. O "site" por trás do tour é uma fotografia: areia opaca e a captura da ferramenta. */}
        {!closing && <div aria-hidden="true" className="absolute inset-0 bg-background" />}
        <AnimatePresence initial={false}>
          {shot && !closing && (
            <motion.img
              key={shot.src}
              src={asset(shot.src)}
              alt=""
              aria-hidden="true"
              draggable={false}
              decoding="async"
              width={shot.w}
              height={shot.h}
              className="absolute left-0 top-0 block h-auto w-full max-w-none select-none"
              initial={{ y: 56, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
            />
          )}
        </AnimatePresence>

        {/* 1. Escurecimento com o recorte da ferramenta */}
        <motion.svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-auto"
          width={vp.w}
          height={vp.h}
          initial={false}
          animate={{ opacity: showScrim ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <defs>
            <mask id="semente-tour-hole">
              <rect x="0" y="0" width={vp.w} height={vp.h} fill="white" />
              <motion.rect
                initial={false}
                animate={{ x: hole.left, y: hole.top, width: hole.width, height: hole.height }}
                transition={{ duration: 0.55, ease: easeOutExpo }}
                rx={14}
                fill="black"
              />
            </mask>
          </defs>
          <rect x="0" y="0" width={vp.w} height={vp.h} fill="#1F1F1F" fillOpacity={0.78} mask="url(#semente-tour-hole)" />
        </motion.svg>

        {/* Contorno laranja do recorte (a folha marcando o que brotou) */}
        <AnimatePresence>
          {showScrim && holeRect && (
            <motion.div
              key="hole-outline"
              aria-hidden="true"
              className="absolute pointer-events-none rounded-[14px] border-3 border-accent"
              initial={{ opacity: 0, top: hole.top, left: hole.left, width: hole.width, height: hole.height }}
              animate={{ opacity: 1, top: hole.top, left: hole.left, width: hole.width, height: hole.height }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: easeOutExpo }}
            />
          )}
        </AnimatePresence>

        {/* 2. O bloco de cor: tela cheia na história, recolhido no cartão do spotlight */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          initial={false}
          animate={{ clipPath: panelClip, backgroundColor: panelColor }}
          transition={{ duration: 0.62, ease: easeOutExpo }}
        />

        {/* 3. Contorno e sombra do cartão (só depois de recolhido) */}
        <AnimatePresence>
          {settledSpot && cardRect && (
            <motion.div
              key={`frame-${index}`}
              aria-hidden="true"
              className="absolute pointer-events-none rounded-[16px] border-3 border-foreground shadow-xl"
              style={{ top: cardRect.top, left: cardRect.left, width: cardRect.width, height: cardRect.height }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.08 } }}
              transition={{ duration: 0.18, delay: 0.42 }}
            />
          )}
        </AnimatePresence>

        {/* 4. Conteúdo */}
        <AnimatePresence mode="wait" initial={false}>
          {!closing && (
            <motion.div
              key={showPanfletagem ? 'panfletagem' : `${screen.kind}-${index}`}
              className="absolute inset-0 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.22, delay: isSpot ? 0.34 : 0.12 } }}
              exit={{ opacity: 0, transition: { duration: 0.14 } }}
            >
              {showPanfletagem && <TourPanfletagem onDone={() => setPanfletagem(false)} />}
              {screen.kind === 'intro' && !showPanfletagem && (
                <IntroScreen headingRef={headingRef} corner={!!corner} onStart={() => go(1)} />
              )}
              {screen.kind === 'perfil' && (
                <PerfilScreen headingRef={headingRef} corner={!!corner} onChoose={chooseProfile} onBack={() => go(-1)} />
              )}
              {screen.kind === 'story' && (
                <StoryScreen
                  headingRef={headingRef}
                  person={screen.person}
                  n={screen.n}
                  total={screen.total}
                  corner={corner}
                  onNext={() => go(1)}
                  onBack={() => go(-1)}
                />
              )}
              {screen.kind === 'spot' && (
                <SpotCard
                  cardRef={setCardEl}
                  headingRef={headingRef}
                  person={screen.person}
                  n={screen.n}
                  total={screen.total}
                  next={screen.next}
                  more={screen.more}
                  missing={!shot}
                  onNext={() => go(1)}
                  onMore={showEveryone}
                  onBack={() => go(-1)}
                />
              )}
              {screen.kind === 'final' && (
                <FinalScreen
                  headingRef={headingRef}
                  profile={state?.profile}
                  skipped={state?.skipFrom !== undefined && !state?.replay}
                  onBack={backFromFinal}
                  onNext={() => go(1)}
                  onExit={finish}
                />
              )}
              {screen.kind === 'moldura' && (
                <MolduraScreen headingRef={headingRef} onBack={() => go(-1)} onFinish={finish} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {canSkip && !closing && (
          <button
            type="button"
            onClick={skip}
            className={`${btnOutlineLight} absolute top-[max(12px,env(safe-area-inset-top))] right-3 h-11 px-4 text-sm uppercase tracking-[0.04em] shadow-sm sm:right-6`}
            aria-label="Pular o tour"
          >
            Pular
          </button>
        )}
        {state?.replay && !closing && (
          <button
            type="button"
            onClick={finish}
            className="absolute top-[max(12px,env(safe-area-inset-top))] right-3 w-11 h-11 rounded-[12px] border-3 border-foreground bg-white text-foreground inline-flex items-center justify-center shadow-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Fechar o tour"
          >
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        )}
      </div>
    </MotionConfig>
  );
};

// ---------------------------------------------------------------------------
// Telas
// ---------------------------------------------------------------------------

type HeadingRef = React.RefObject<HTMLHeadingElement | null>;

const screenPadBase = 'absolute inset-0 overflow-y-auto overscroll-contain px-4 sm:px-8 pb-[max(16px,env(safe-area-inset-bottom))]';
const screenPad = `${screenPadBase} pt-[max(16px,env(safe-area-inset-top))]`;
/** Telas centradas, quando há botão no canto ("Pular" ou fechar): o conteúdo começa abaixo dele. */
const screenPadCorner = `${screenPadBase} pt-[max(68px,calc(env(safe-area-inset-top)+56px))]`;

const IntroScreen: React.FC<{ headingRef: HeadingRef; corner: boolean; onStart: () => void }> = ({ headingRef, corner, onStart }) => (
  <div className={corner ? screenPadCorner : screenPad}>
    <div className="mx-auto flex min-h-full max-w-[1120px] flex-col justify-center gap-6 py-4 md:grid md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:items-center md:gap-14">
      {/* Mosaico: todos os rostos da chapa */}
      <ul
        className="m-0 grid list-none grid-cols-4 gap-2 p-0 md:order-2 md:gap-3"
        aria-label={`As ${TOTAL_PEOPLE} pessoas da Chapa Semente`}
      >
        {TOUR_PEOPLE_IN_CHAPA_ORDER.map((p, i) => (
          <li key={p.leader.id} className="aspect-square overflow-hidden rounded-[30%_10%_30%_10%] border-3 border-foreground bg-muted-foreground odd:-rotate-2 even:rotate-1">
            <GrowPhoto person={p} sizes="thumb" delay={0.08 + i * 0.045} alt={`${p.leader.name}, ${p.leader.role}`} />
          </li>
        ))}
      </ul>

      <div className="space-y-5 md:order-1">
        <img
          src={asset('/logos/semente/semente-horizontal-branco.webp')}
          alt="Chapa Gestão Pública Semente"
          width="768"
          height="229"
          className="h-9 w-auto sm:h-11"
        />
        <h1
          id="semente-tour-heading"
          ref={headingRef}
          tabIndex={-1}
          className="m-0 font-heading text-[clamp(1.85rem,6.2vw,3.5rem)] font-bold leading-[1.06] tracking-[-0.02em] text-white [text-wrap:balance] focus:outline-none"
        >
          Antes de tudo, conheça{' '}
          <MarkerWord onColor className="text-[1.1em] tracking-normal">quem fez</MarkerWord> este site.
        </h1>
        <p className="m-0 max-w-[46ch] text-base leading-relaxed text-white sm:text-lg">
          Somos a Semente, a {CHAPA_ROTULO} na eleição do Centro Acadêmico de Gestão Pública. São {TOTAL_PEOPLE} pessoas, e três delas
          te mostram agora o que já funciona aqui pro seu momento do curso.
        </p>
        <p className="m-0 font-heading text-base font-bold uppercase tracking-[0.04em] text-white" aria-hidden="true">
          Toda mudança começa pequena.
        </p>
        <p className="m-0 text-sm font-bold uppercase tracking-[0.04em] text-white tabular-nums">
          Eleição 25 e 26/11 · cerca de 2 minutos · aparece uma vez só
        </p>
        <button type="button" onClick={onStart} className={`${btnAccent} h-[52px] w-full px-6 text-sm sm:w-auto`}>
          Começar
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
);

const PerfilScreen: React.FC<{ headingRef: HeadingRef; corner: boolean; onChoose: (r: UserRole) => void; onBack: () => void }> = ({
  headingRef,
  corner,
  onChoose,
  onBack,
}) => (
  <div className={corner ? screenPadCorner : screenPad}>
    <div className="mx-auto flex min-h-full max-w-[720px] flex-col justify-center gap-6 py-4">
      <div className="space-y-2">
        <h2
          id="semente-tour-heading"
          ref={headingRef}
          tabIndex={-1}
          className="m-0 font-heading text-[clamp(1.75rem,5.6vw,3rem)] font-bold leading-[1.08] tracking-[-0.02em] [text-wrap:balance] focus:outline-none"
        >
          Em que momento do curso você está?
        </h2>
        <p className="m-0 text-base text-white">Quem cuida do que você precisa aparece primeiro.</p>
      </div>
      <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
        {TOUR_PROFILES.map((opt, i) => (
          <motion.li
            key={opt.role}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: easeOutExpo }}
          >
            <button
              type="button"
              onClick={() => onChoose(opt.role)}
              className={`${btnOutlineLight} min-h-[76px] w-full justify-start gap-4 px-4 py-3 text-left`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-primary text-white">
                <i className={`bi ${opt.icon} text-xl`} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-lg font-bold leading-tight">{opt.label}</span>
                <span className="block text-sm font-normal text-muted-foreground">{opt.hint}</span>
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-white underline underline-offset-[0.22em] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <i className="bi bi-arrow-left" aria-hidden="true" />
          Voltar
        </button>
      </div>
    </div>
  </div>
);

const StoryScreen: React.FC<{
  headingRef: HeadingRef;
  person: TourPerson;
  n: number;
  total: number;
  /** Botão no canto de cima à direita: o cabeçalho da tela abre espaço para ele. */
  corner?: 'pular' | 'fechar';
  onNext: () => void;
  onBack: () => void;
}> = ({ headingRef, person, n, total, corner, onNext, onBack }) => {
  const { leader, stop } = person;
  return (
    <div className={`${screenPad} flex flex-col`}>
      <div className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col gap-4 md:gap-6">
        {/* Uma linha só, da altura do botão do canto: símbolo, progresso e "n de total". */}
        <div className={`flex min-h-11 items-center gap-3 ${corner === 'pular' ? 'pr-[92px] sm:pr-[100px]' : corner === 'fechar' ? 'pr-14' : ''}`}>
          <img src={asset('/logos/semente/semente-simbolo-branco.webp')} alt="" aria-hidden="true" className="h-7 w-auto shrink-0" />
          <div className="min-w-0 flex-1">
            <PeopleProgress current={n} total={total} />
          </div>
          <span className="-rotate-3 shrink-0 rounded-md border-2 border-foreground bg-[#FFC83D] px-2 py-1 text-sm font-bold tabular-nums text-foreground shadow-[2px_2px_0_0_#1F1F1F]">
            {n + 1} de {total}
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-5 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center md:gap-14">
          <figure className="relative m-0 mr-2 mb-2 min-h-[170px] flex-1 overflow-hidden rounded-[48px_12px_48px_12px] border-3 border-foreground bg-muted-foreground shadow-[5px_5px_0_0_var(--color-accent),9px_9px_0_0_#1F1F1F] md:aspect-[4/5] md:max-h-[72dvh] md:flex-none">
            <GrowPhoto person={person} className="absolute inset-0" />
            <motion.figcaption
              className="absolute bottom-3 left-3 rounded-[8px] bg-foreground px-3 py-2 text-white"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.35, ease: easeOutExpo }}
            >
              <span className="block text-base font-bold leading-tight">{leader.name}</span>
              <span className="block text-sm leading-snug">{leader.role}</span>
            </motion.figcaption>
          </figure>

          <div className="space-y-4 md:space-y-6">
            <motion.h2
              id="semente-tour-heading"
              ref={headingRef}
              tabIndex={-1}
              className="m-0 font-heading text-[clamp(1.6rem,5.4vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.02em] [text-wrap:balance] focus:outline-none"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: easeOutExpo }}
            >
              {stop.hook}
            </motion.h2>
            <motion.p
              className="m-0 max-w-[48ch] text-base leading-relaxed sm:text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: easeOutExpo }}
            >
              {(() => {
                const [name, rest] = splitLeadingName(stop.answer, person.firstName === 'João' ? 'João Pedro' : person.firstName);
                return name ? (
                  <>
                    <strong className="font-heading font-bold text-white">{name}</strong>
                    {rest}
                  </>
                ) : (
                  stop.answer
                );
              })()}
            </motion.p>
            <div className="flex items-center gap-3 pt-1">
              <BackButton onClick={onBack} />
              <button type="button" onClick={onNext} className={`${btnAccent} h-[52px] flex-1 px-5 text-sm md:flex-none`}>
                Ver a ferramenta
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpotCard: React.FC<{
  cardRef: (el: HTMLDivElement | null) => void;
  headingRef: HeadingRef;
  person: TourPerson;
  n: number;
  total: number;
  next?: TourPerson;
  /** Quantas pessoas ficaram fora do caminho curto (só na última parada dele). */
  more: number;
  missing: boolean;
  onNext: () => void;
  onMore: () => void;
  onBack: () => void;
}> = ({ cardRef, headingRef, person, n, total, next, more, missing, onNext, onMore, onBack }) => {
  const { leader, stop } = person;
  return (
    <div
      ref={cardRef}
      className="absolute bottom-[max(12px,env(safe-area-inset-bottom))] left-3 right-3 p-4 sm:p-5 md:left-auto md:right-6 md:bottom-6 md:w-[480px]"
    >
      <PeopleProgress current={n} total={total} compact />
      <div className="mt-3 flex items-center gap-3">
        <span className="h-12 w-12 shrink-0 overflow-hidden rounded-[12px] border-2 border-foreground bg-muted-foreground">
          <img
            src={person.thumb}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: person.position }}
          />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-base font-bold leading-tight">{leader.name}</span>
          <span className="block truncate text-sm leading-snug">{leader.role}</span>
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <h2
          id="semente-tour-heading"
          ref={headingRef}
          tabIndex={-1}
          className="m-0 font-heading text-xl font-bold leading-tight focus:outline-none"
        >
          {stop.tool}
        </h2>
        {stop.simulated ? (
          <span className="cagp-stamp-badge is-simulado">Simulado</span>
        ) : (
          <MarkerWord onColor className="text-xl">já funciona</MarkerWord>
        )}
      </div>
      <p className="m-0 mt-1.5 text-base leading-snug">
        {missing ? `${stop.proof} Você encontra a ferramenta depois, pelo menu.` : stop.proof}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <BackButton onClick={onBack} />
        <button type="button" onClick={onNext} className={`${btnAccent} h-12 flex-1 px-4 text-sm`}>
          {next ? `Próxima: ${next.firstName}` : 'Ir para a votação'}
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </button>
      </div>
      {more > 0 && (
        <button
          type="button"
          onClick={onMore}
          className="mt-1.5 inline-flex min-h-[44px] w-full items-center justify-center text-sm font-bold text-white underline underline-offset-[0.22em] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Conhecer os outros {more} da chapa
        </button>
      )}
    </div>
  );
};

const FinalScreen: React.FC<{
  headingRef: HeadingRef;
  profile?: UserRole;
  /** A pessoa chegou aqui pelo "Pular": a saída é direta, sem passar pela moldura. */
  skipped: boolean;
  onBack: () => void;
  /** Segue para a última tela (o convite da moldura de apoio). */
  onNext: () => void;
  /** Fecha o tour daqui mesmo. */
  onExit: () => void;
}> = ({ headingRef, profile, skipped, onBack, onNext, onExit }) => {
  const [calendarSaved, setCalendarSaved] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [showIosHint, setShowIosHint] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [shared, setShared] = useState(false);
  const [stamped, setStamped] = useState(false);
  const ios = typeof window !== 'undefined' && isIOS() && !isStandalone();
  const canVote = profile !== 'ingressar';

  useEffect(() => {
    setCanInstall(canTriggerInstallPrompt());
    setInstalled(isStandalone());
    return onInstallPromptChange(setCanInstall);
  }, []);

  const record = (supporter: boolean) => {
    const prev = getVaultItem('cagp_election_activation_v1');
    setVaultItem('cagp_election_activation_v1', {
      ...prev,
      completed: true,
      sementeSupporter: supporter,
      installed: installed || prev.installed,
      calendarReminderSaved: calendarSaved || prev.calendarReminderSaved,
      sharedWhatsApp: shared || prev.sharedWhatsApp,
      completedAt: new Date().toISOString(),
    });
  };

  const handleCommit = () => {
    record(true);
    setStamped(true);
    window.setTimeout(onNext, 1500);
  };

  const handleInstall = async () => {
    if (canInstall) {
      const res = await triggerInstallPrompt();
      if (res.outcome === 'accepted') setInstalled(true);
    } else if (ios) {
      setShowIosHint((v) => !v);
    }
  };

  const actionBtn = `${btnOutlineLight} min-h-[48px] w-full justify-start px-4 text-left text-base`;

  return (
    <div className={screenPad}>
      <div className="mx-auto flex min-h-full max-w-[1120px] flex-col justify-center gap-6 py-4 md:grid md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:items-center md:gap-14">
        <div className="space-y-5">
          <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0" aria-label={`As ${TOTAL_PEOPLE} pessoas da Chapa Semente`}>
            {TOUR_PEOPLE_IN_CHAPA_ORDER.map((p, i) => (
              <li key={p.leader.id} className="h-10 w-10 overflow-hidden rounded-[30%_10%_30%_10%] border-2 border-foreground bg-muted-foreground sm:h-12 sm:w-12">
                <GrowPhoto person={p} sizes="thumb" delay={0.05 + i * 0.035} alt={p.leader.name} />
              </li>
            ))}
          </ul>
          <h2
            id="semente-tour-heading"
            ref={headingRef}
            tabIndex={-1}
            className="m-0 font-heading text-[clamp(1.85rem,6vw,3.5rem)] font-bold leading-[1.06] tracking-[-0.02em] [text-wrap:balance] focus:outline-none"
          >
            {canVote ? (
              <>
                <span className="block">25 e 26 de novembro:</span>
                <GritoDeVoto as="span" onColor duasLinhas tamanho="lg" className="mt-3" />
              </>
            ) : (
              <>
                Você ainda não vota, mas quem vota te{' '}
                <MarkerWord onColor className="text-[1.1em] tracking-normal">escuta</MarkerWord>.
              </>
            )}
          </h2>
          <dl className="m-0 grid gap-3 text-base">
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 text-sm font-bold uppercase tracking-[0.04em] leading-6">Chapa</dt>
              <dd className="m-0 font-bold tabular-nums">{CHAPA_NUMERO} · Semente</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 text-sm font-bold uppercase tracking-[0.04em] leading-6">Quando</dt>
              <dd className="m-0 tabular-nums">25 e 26/11, das 17h às 22h30</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 text-sm font-bold uppercase tracking-[0.04em] leading-6">Onde</dt>
              <dd className="m-0">Sala do CAGP, na FAFICH. Voto secreto.</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 text-sm font-bold uppercase tracking-[0.04em] leading-6">Leve</dt>
              <dd className="m-0">Documento oficial com foto. Vota quem tem matrícula ativa em Gestão Pública.</dd>
            </div>
          </dl>
        </div>

        {/* Quem pulou vê a saída antes das ações de apoio: em celular baixo ela não pode ficar fora da tela. */}
        <div className={skipped ? 'flex flex-col-reverse gap-4' : 'space-y-4'}>
          <ul className="m-0 grid list-none gap-2.5 p-0">
            <li>
              <button
                type="button"
                className={actionBtn}
                onClick={() => {
                  downloadElectionCalendarReminder('voting');
                  setCalendarSaved(true);
                }}
              >
                <i className={`bi ${calendarSaved ? 'bi-check2' : 'bi-calendar-plus'} text-lg text-primary`} aria-hidden="true" />
                {calendarSaved ? 'Lembrete baixado' : 'Lembrar na agenda'}
              </button>
            </li>
            {(canInstall || ios) && !installed && (
              <li>
                {/* O convite de instalar (decisão de 11/11/2026): com o motivo, porque no iPhone o Safari
                    pode apagar o que foi salvo num site que fica 7 dias sem uso, e na tela inicial não. */}
                <button
                  type="button"
                  className={`${actionBtn} h-auto py-2.5`}
                  onClick={handleInstall}
                  aria-expanded={ios ? showIosHint : undefined}
                >
                  <i className="bi bi-phone text-lg text-primary" aria-hidden="true" />
                  <span className="grid gap-0.5">
                    <span>Pôr o site na tela inicial</span>
                    <span className="text-sm font-normal normal-case tracking-normal text-content-secondary">
                      {ios
                        ? 'Assim o iPhone não apaga suas horas, notas e foto se você ficar uns dias sem abrir.'
                        : 'Abre direto, como um app, e funciona sem sinal.'}
                    </span>
                  </span>
                </button>
                {showIosHint && (
                  <p className="m-0 mt-2 rounded-[12px] bg-white p-3 text-sm text-foreground">
                    Abra este site no <strong>Safari</strong>, toque em <strong>Compartilhar</strong> e depois em <strong>Adicionar à Tela de Início</strong>. Pelo navegador do WhatsApp essa opção não aparece.
                  </p>
                )}
              </li>
            )}
            <li>
              <a
                href={typeof window !== 'undefined' ? getTourShareUrl() : '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShared(true)}
                className={`${actionBtn} no-underline`}
              >
                <i className="bi bi-whatsapp text-lg text-success" aria-hidden="true" />
                Chamar a turma no WhatsApp
              </a>
            </li>
          </ul>

          <div className="relative min-h-[140px] pt-2">
            <AnimatePresence mode="wait" initial={false}>
              {stamped ? (
                <motion.div key="stamp" className="flex justify-center pt-2" initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
                  <span className="cagp-big-stamp is-semente" role="status">
                    <span className="cagp-big-stamp-title">Semente plantada</span>
                    <span className="cagp-big-stamp-sub">{CHAPA_ROTULO} · até dia 25</span>
                  </span>
                </motion.div>
              ) : (
                <motion.div key="actions" className="space-y-3" exit={{ opacity: 0, transition: { duration: 0.12 } }}>
                  <div className="flex items-center gap-3">
                    <BackButton onClick={onBack} />
                    <button type="button" onClick={handleCommit} className={`${btnAccent} h-[56px] flex-1 px-5 text-sm`}>
                      {canVote ? `Vou votar na ${CHAPA_ROTULO}` : `Apoio a ${CHAPA_ROTULO}`}
                    </button>
                  </div>
                  {skipped ? (
                    // Quem pulou não declarou nada: sai sem registrar apoio nem indecisão.
                    <button type="button" onClick={onExit} className={`${btnOutlineLight} h-12 w-full px-5 text-sm uppercase tracking-[0.04em]`}>
                      Ir pro site
                      <i className="bi bi-arrow-right" aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        record(false);
                        onNext();
                      }}
                      className="inline-flex min-h-[44px] w-full items-center justify-center text-sm font-bold text-white underline underline-offset-[0.22em] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {canVote ? 'Ainda estou decidindo' : 'Continuar'}
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────── Última tela: a moldura de apoio ───────────────────────── */

const MOLDURA_FUNDO: Record<string, string> = { roxo: '#5B2A85', petroleo: '#266264', broto: '#6DB33F', fruto: '#FFC83D', papel: '#FFFFFF', tinta: '#1F1F1F' };
const MOLDURA_ESCURA = new Set(['roxo', 'petroleo', 'tinta']);

/**
 * A moldura de apoio, dentro do tour. É a mesma ferramenta de /chapa-semente/moldura
 * (src/scripts/molduraDeApoio.ts), só com a moldura redonda de perfil. É um convite: desde 12/11/2026
 * a saída ("Agora não, ir pro site") está sempre na tela. Antes o tour só fechava com uma foto, e uma
 * colega do curso ficou presa aqui sem conseguir ver o site.
 */
const MolduraScreen: React.FC<{ headingRef: HeadingRef; onBack: () => void; onFinish: () => void }> = ({ headingRef, onBack, onFinish }) => {
  const raizRef = React.useRef<HTMLDivElement>(null);
  const [temFoto, setTemFoto] = useState(false);
  const [falhou, setFalhou] = useState(false);

  useEffect(() => {
    const raiz = raizRef.current;
    if (!raiz) return;
    let vivo = true;
    const comFoto = () => setTemFoto(true);
    raiz.addEventListener('moldura:foto', comFoto);
    import('@/scripts/molduraDeApoio')
      .then((m) => {
        if (!vivo) return;
        m.ligarMoldura(raiz);
        if (raiz.dataset.temFoto) setTemFoto(true);
      })
      .catch(() => vivo && setFalhou(true));
    return () => {
      vivo = false;
      raiz.removeEventListener('moldura:foto', comFoto);
    };
  }, []);

  const verPropostas = () => {
    onFinish();
    window.setTimeout(() => {
      (window as unknown as { __cagpPropostasPending?: boolean }).__cagpPropostasPending = true;
      window.dispatchEvent(new CustomEvent(START_PROPOSTAS_TOUR));
    }, 620);
  };

  return (
    <div className={screenPad}>
      <div
        ref={raizRef}
        data-moldura
        className="mx-auto flex min-h-full max-w-[1040px] flex-col justify-center gap-5 py-4 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center md:gap-12"
      >
        <div className="grid justify-items-center gap-2">
          <canvas
            width={1080}
            height={1080}
            data-formato="perfil"
            aria-label="Prévia da sua foto com a moldura da Chapa 2"
            className="block h-auto w-[min(54vw,216px)] touch-none cursor-grab rounded-full border-3 border-foreground bg-primary-tint shadow-lg md:w-[min(34vw,380px)]"
          />
          {temFoto && <p className="m-0 text-sm text-white">Arraste a foto pra enquadrar.</p>}
        </div>

        <div className="grid gap-4">
          <h2
            id="semente-tour-heading"
            ref={headingRef}
            tabIndex={-1}
            className="m-0 font-heading text-[clamp(1.7rem,5.4vw,3rem)] font-bold leading-[1.06] tracking-[-0.02em] [text-wrap:balance] focus:outline-none"
          >
            Agora põe a sua <MarkerWord onColor className="text-[1.1em] tracking-normal">cara</MarkerWord> na campanha.
          </h2>
          <p className="m-0 max-w-[46ch] text-base leading-relaxed sm:text-lg">
            Escolha uma foto e uma moldura. Em um minuto a sua foto de perfil já está pedindo voto pra {CHAPA_ROTULO}. A foto não sai do seu celular.
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <label className={`${temFoto ? btnOutlineLight : btnAccent} h-[56px] cursor-pointer px-5 text-sm has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-white has-[:focus-visible]:outline-offset-2`}>
              <i className="bi bi-camera" aria-hidden="true" />
              {temFoto ? 'Trocar a foto' : 'Escolher minha foto'}
              <input type="file" accept="image/*" className="sr-only" data-moldura-foto />
            </label>
            <button type="button" data-moldura-baixar disabled hidden={!temFoto} className={`${btnOutlineLight} h-[56px] px-5 text-sm`}>
              <i className="bi bi-download" aria-hidden="true" />
              Baixar
            </button>
            <button type="button" data-moldura-postar disabled hidden={!temFoto} className={`${btnOutlineLight} h-[56px] px-5 text-sm`}>
              <i className="bi bi-share" aria-hidden="true" />
              Postar
            </button>
          </div>

          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-2 p-0 text-sm font-bold uppercase tracking-[0.04em]">Escolha a moldura</legend>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {molduras.molduras.map((m, i) => (
                <label
                  key={m.id}
                  style={{ background: MOLDURA_FUNDO[m.cor] }}
                  className="grid min-h-[56px] cursor-pointer place-items-center rounded-[16px_5px_16px_5px] border-3 border-foreground px-2 py-1.5 text-center shadow-sm transition-[translate,box-shadow] duration-(--duration-press) has-[:checked]:translate-x-0.5 has-[:checked]:translate-y-0.5 has-[:checked]:shadow-none has-[:checked]:outline-4 has-[:checked]:outline-offset-2 has-[:checked]:outline-white has-[:focus-visible]:outline-4 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent"
                >
                  <input type="radio" name="moldura" value={m.id} defaultChecked={i === 0} className="sr-only" />
                  <span className={`cagp-grito cagp-grito--sm justify-center [animation:none] ${MOLDURA_ESCURA.has(m.cor) ? 'is-on-color' : ''}`} style={{ ['--grito' as string]: '1.0625rem' }}>
                    {m.linhas.join(' ')}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={verPropostas}
            className="inline-flex min-h-[44px] items-center justify-self-start text-sm font-bold text-white underline underline-offset-[0.22em] cursor-pointer focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Ver as 14 propostas, uma por uma
          </button>
          {falhou && !temFoto && (
            <p className="m-0 text-sm font-bold leading-snug text-white" role="status">
              A moldura não carregou agora. Ela também fica na aba Chapa 2.
            </p>
          )}

          {/* A saída fica sempre à vista: no celular é uma barra presa ao pé da tela, por cima da
              rolagem (a tela é mais alta que o aparelho, e sair não pode depender de rolar). */}
          <div className="sticky bottom-0 z-10 -mx-4 -mb-8 flex items-center gap-3 border-t-3 border-foreground bg-primary px-4 pt-3 pb-[max(16px,env(safe-area-inset-bottom))] sm:-mx-8 sm:px-8 md:static md:m-0 md:border-0 md:bg-transparent md:p-0">
            <BackButton onClick={onBack} />
            {temFoto ? (
              <button type="button" onClick={onFinish} className={`${btnAccent} h-[56px] flex-1 px-5 text-sm leading-tight md:flex-none md:px-6`}>
                Pronto, ir pro site
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </button>
            ) : (
              <button type="button" onClick={onFinish} className={`${btnOutlineLight} h-[56px] flex-1 px-4 text-sm uppercase leading-tight tracking-[0.04em] md:flex-none md:px-5`}>
                {falhou ? 'Ir pro site' : 'Agora não, ir pro site'}
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SementeTour;
