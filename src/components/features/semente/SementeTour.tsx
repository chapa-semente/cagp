// src/components/features/semente/SementeTour.tsx — Tour obrigatório da Chapa Semente.
//
// Primeira visita: abre antes de qualquer conteúdo, sem "pular", e só fecha no fim (decisão de 10/11/2026).
// Fluxo: abertura (todos os rostos) → pergunta de perfil → para cada integrante, uma tela de história
// (foto + dor do estudante) que se recolhe num cartão enquanto o spotlight recorta a ferramenta real
// → fechamento com a votação. Ao terminar, devolve a pessoa à página por onde ela entrou.
//
// Montado uma vez no BaseLayout com `transition:persist`: o ClientRouter troca as páginas por baixo
// sem desmontar o tour, então os spotlights atravessam rotas sem recarregar.
//
// Movimento (DESIGN.md › Movimento): o bloco de cor que vira cartão é o gesto autoral, feito com
// clip-path; fotos "germinam" de baixo para cima; o fim é o carimbo. Movimento sempre ativo.

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { navigate } from 'astro:transitions/client';
import { asset } from '@/lib/paths';
import { easeOutExpo } from '@/lib/motion';
import { MarkerWord } from '@/components/ui/marker-word';
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
  type TourPerson,
} from '@/lib/sementeTour';

// ---------------------------------------------------------------------------
// Sequência de telas
// ---------------------------------------------------------------------------

type Screen =
  | { kind: 'intro' }
  | { kind: 'perfil' }
  | { kind: 'story'; person: TourPerson; n: number }
  | { kind: 'spot'; person: TourPerson; n: number; next?: TourPerson }
  | { kind: 'final' };

const TOTAL_PEOPLE = TOUR_PEOPLE_IN_CHAPA_ORDER.length;

function buildScreens(profile?: UserRole): Screen[] {
  const screens: Screen[] = [{ kind: 'intro' }, { kind: 'perfil' }];
  if (!profile) return screens;
  const people = TOUR_ORDER[profile].map(getTourPerson);
  people.forEach((person, n) => {
    screens.push({ kind: 'story', person, n });
    screens.push({ kind: 'spot', person, n, next: people[n + 1] });
  });
  screens.push({ kind: 'final' });
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

const normalizePath = (p: string) => p.replace(/\/$/, '') || '/';
const toPageUrl = (p: string) => (p.endsWith('/') ? p : `${p}/`);
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
const PeopleProgress: React.FC<{ current: number; compact?: boolean }> = ({ current, compact }) => (
  <ol
    className={`flex items-center gap-1 m-0 p-0 list-none ${compact ? 'h-1.5' : 'h-2'}`}
    aria-label={`Pessoa ${current + 1} de ${TOTAL_PEOPLE}`}
  >
    {Array.from({ length: TOTAL_PEOPLE }, (_, i) => (
      <li
        key={i}
        aria-hidden="true"
        className={`h-full flex-1 rounded-full border-2 ${
          i < current
            ? 'bg-white border-white'
            : i === current
              ? 'bg-accent border-accent'
              : 'bg-transparent border-white'
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

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-[12px] border-3 border-foreground font-heading font-bold select-none cursor-pointer ' +
  'transition-[transform,box-shadow,background-color] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed';
const btnAccent =
  `${btnBase} uppercase tracking-[0.04em] bg-accent text-foreground shadow-md hover:-translate-x-px hover:-translate-y-px hover:shadow-lg hover:bg-accent-hover active:translate-x-[3px] active:translate-y-[3px] active:shadow-none`;
const btnOutlineLight =
  `${btnBase} bg-white text-foreground shadow-md hover:-translate-x-px hover:-translate-y-px hover:shadow-lg hover:bg-muted active:translate-x-[3px] active:translate-y-[3px] active:shadow-none`;

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
  const [holeRect, setHoleRect] = useState<Rect | null>(null);
  const [targetMissing, setTargetMissing] = useState(false);
  /** A página da ferramenta ainda está chegando (rede lenta): o cartão diz isso em vez de parecer travado. */
  const [waitingPage, setWaitingPage] = useState(false);
  /** Rota com troca já em andamento: não dispara outra igual (reiniciaria o download na rede lenta). */
  const pendingRoute = useRef<string | null>(null);
  const [closing, setClosing] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [cardEl, setCardEl] = useState<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const locateRun = useRef(0);

  const screens = useMemo(() => buildScreens(state?.profile), [state?.profile]);
  const open = state?.status === 'active';
  const index = state ? Math.min(state.index, screens.length - 1) : 0;
  const screen = open ? screens[index] : undefined;
  const isSpot = screen?.kind === 'spot';

  // ---- Montagem: decide se o tour abre --------------------------------------------------------
  useEffect(() => {
    (window as unknown as { __cagpTourMounted?: boolean }).__cagpTourMounted = true;
    const saved = loadSementeTour() as TourRuntime | null;
    if (saved?.status === 'done') {
      document.documentElement.removeAttribute('data-semente-tour');
      setState(saved);
      return;
    }
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
      setState({
        status: 'active',
        index: 0,
        replay: true,
        returnTo: window.location.pathname + window.location.search + window.location.hash,
      });
    };
    window.addEventListener('cagp:start-semente-tour', start);
    return () => window.removeEventListener('cagp:start-semente-tour', start);
  }, []);

  // ---- Persistência ---------------------------------------------------------------------------
  useEffect(() => {
    if (state) saveSementeTour(state);
  }, [state]);

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
    // A troca de página roda por trás do bloco de cor: pula a view transition, que bloqueia toques
    // enquanto anima (os "Próxima" tocados nessa janela eram perdidos).
    const skip = (e: Event) => (e as Event & { viewTransition?: ViewTransition }).viewTransition?.skipTransition();
    document.addEventListener('astro:before-swap', skip);
    return () => {
      document.removeEventListener('astro:after-swap', apply);
      document.removeEventListener('astro:before-swap', skip);
      document.body.style.removeProperty('padding-bottom');
      document.documentElement.classList.remove('cagp-semente-tour-open');
      document.querySelectorAll('[data-tour-inert]').forEach((el) => {
        el.removeAttribute('inert');
        el.removeAttribute('data-tour-inert');
      });
    };
  }, [open]);

  // ---- Rotas: a tela de história já leva a página certa para trás do bloco de cor ----------------
  const ensureRoute = (rawRoute: string) => {
    const route = normalizePath(rawRoute);
    if (normalizePath(window.location.pathname) !== route && pendingRoute.current !== route) {
      pendingRoute.current = route;
      navigate(toPageUrl(rawRoute));
    }
  };

  useEffect(() => {
    if (!screen || (screen.kind !== 'story' && screen.kind !== 'spot')) return;
    ensureRoute(screen.person.stop.route);
  }, [screen]);

  useEffect(() => {
    const clear = () => {
      pendingRoute.current = null;
    };
    document.addEventListener('astro:page-load', clear);
    return () => document.removeEventListener('astro:page-load', clear);
  }, []);

  // Enquanto a pessoa lê o cartão, a página da próxima já vem pela rede.
  useEffect(() => {
    if (screen?.kind !== 'spot' || !screen.next) return;
    const nextRoute = screen.next.stop.route;
    if (normalizePath(nextRoute) === normalizePath(window.location.pathname)) return;
    // fetch de baixa prioridade: aquece o cache HTTP (GitHub Pages) e o do service worker.
    const ctrl = new AbortController();
    fetch(toPageUrl(nextRoute), { credentials: 'same-origin', signal: ctrl.signal, priority: 'low' } as RequestInit).catch(
      () => {}
    );
    return () => ctrl.abort();
  }, [screen]);

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

  // ---- Localiza o alvo, abre a aba certa, rola e recorta --------------------------------------
  const locate = useCallback(async () => {
    if (!screen || screen.kind !== 'spot') return;
    const run = ++locateRun.current;
    const { stop } = screen.person;
    setTargetMissing(false);

    // Espera a rota certa (a troca começou na tela de história). Em rede lenta pode levar segundos:
    // o cartão avisa "abrindo a página" e o spotlight só procura a ferramenta quando ela chegou.
    if (normalizePath(window.location.pathname) !== normalizePath(stop.route)) {
      setWaitingPage(true);
      setHoleRect(null); // nada de recorte aceso sobre a página errada enquanto a certa chega
    }
    for (let i = 0; i < 300; i++) {
      if (normalizePath(window.location.pathname) === normalizePath(stop.route)) break;
      // Outra troca terminou por cima desta (a pessoa voltou e avançou rápido): pede a página de novo.
      if (i % 20 === 0) ensureRoute(stop.route);
      if (i > 0 && normalizePath(window.location.pathname) !== normalizePath(stop.route)) {
        setWaitingPage(true);
        setHoleRect(null);
      }
      await wait(100);
    }
    if (run !== locateRun.current) return;
    setWaitingPage(false);
    if (normalizePath(window.location.pathname) !== normalizePath(stop.route)) {
      // Nunca chegou (offline): tenta de novo e deixa o cartão orientar a pessoa.
      pendingRoute.current = null;
      setTargetMissing(true);
      return;
    }

    if (stop.tab) {
      const tabBtn = document.querySelector<HTMLButtonElement>(`.cagp-workspace-tab[data-ws-tab="${stop.tab}"]`);
      if (tabBtn && tabBtn.getAttribute('aria-selected') !== 'true') tabBtn.click();
    }

    let el: HTMLElement | null = null;
    for (let i = 0; i < 40; i++) {
      el = document.querySelector<HTMLElement>(stop.target);
      if (el && el.getBoundingClientRect().height > 0) break;
      el = null;
      await wait(100);
    }
    if (run !== locateRun.current) return;
    if (!el) {
      if (import.meta.env.DEV) console.warn(`[SementeTour] alvo não encontrado: ${stop.target} em ${stop.route}`);
      setTargetMissing(true);
      setHoleRect(null);
      return;
    }

    const headerOffset = window.innerWidth >= 768 ? 88 : 72;
    // Ferramenta no fim da página: sem sobra de rolagem, ela ficaria embaixo do cartão.
    // Uma folga temporária no fim do body deixa o alvo subir até logo abaixo do cabeçalho.
    const cardBox = cardEl?.getBoundingClientRect();
    if (cardBox) document.body.style.paddingBottom = `${Math.ceil(window.innerHeight - cardBox.top + 24)}px`;
    // Espera a rolagem suave do SegmentedControl terminar antes de fixar a posição.
    await wait(60);
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerOffset, behavior: 'instant' });
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    if (run !== locateRun.current) return;

    const r = el.getBoundingClientRect();
    const card = cardEl?.getBoundingClientRect();
    const floor = card ? card.top - 14 : window.innerHeight - 14;
    const top = Math.max(8, r.top - 8);
    const bottom = Math.min(floor, r.bottom + 8);
    const left = Math.max(8, r.left - 8);
    const right = Math.min(window.innerWidth - 8, r.right + 8);
    setHoleRect({ top, left, width: Math.max(0, right - left), height: Math.max(48, bottom - top) });
  }, [screen, cardEl]);

  useEffect(() => {
    if (!isSpot) {
      locateRun.current++;
      setHoleRect(null);
      setTargetMissing(false);
      setWaitingPage(false);
      return;
    }
    void locate();
    const onLoad = () => void locate();
    document.addEventListener('astro:page-load', onLoad);
    window.addEventListener('resize', onLoad);
    return () => {
      document.removeEventListener('astro:page-load', onLoad);
      window.removeEventListener('resize', onLoad);
    };
  }, [isSpot, locate, cardRect?.top]);

  // ---- Navegação entre telas --------------------------------------------------------------------
  const go = useCallback(
    (delta: number) => {
      setState((s) => {
        if (!s) return s;
        const nextIndex = Math.max(0, Math.min(buildScreens(s.profile).length - 1, s.index + delta));
        return { ...s, index: nextIndex };
      });
    },
    []
  );

  const chooseProfile = (role: UserRole) => {
    setVaultItem('cagp_user_role_v1', role);
    setState((s) => (s ? { ...s, profile: role, index: 2 } : s));
  };

  const finish = useCallback(() => {
    setClosing(true);
    const returnTo = state?.returnTo;
    setVaultItem('cagp_onboarding_completed_v1', true);
    window.setTimeout(
      () => {
        setState((s) => (s ? { ...s, status: 'done', index: 0 } : s));
        setClosing(false);
        window.dispatchEvent(new CustomEvent('cagp:semente-tour-done'));
        if (returnTo && normalizePath(returnTo.split(/[?#]/)[0]) !== normalizePath(window.location.pathname)) {
          navigate(returnTo);
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      },
      520
    );
  }, [state?.returnTo]);

  // Foco no título de cada tela + teclado (setas avançam e voltam; Esc não fecha na primeira visita).
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => headingRef.current?.focus({ preventScroll: true }), 260);
    return () => window.clearTimeout(t);
  }, [open, index]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (state?.replay) finish();
        return;
      }
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' && screen?.kind !== 'perfil' && screen?.kind !== 'final') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, screen, index, go, finish, state?.replay]);

  if (!open || !screen) return null;

  // ---- Geometria do bloco de cor -----------------------------------------------------------------
  const panelColor = screenColor(screen);
  const panelClip = closing
    ? `inset(${vp.h}px 0px 0px 0px round 0px)`
    : isSpot && cardRect && vp.w
      ? insetFor(cardRect, vp.w, vp.h)
      : FULL_INSET;
  const showScrim = isSpot && !closing;
  const hole = holeRect ?? { top: 0, left: 0, width: vp.w, height: vp.h };
  const settledSpot = isSpot && !!cardRect;

  const liveText =
    screen.kind === 'story'
      ? `${screen.person.leader.name}, ${screen.person.leader.role}. Pessoa ${screen.n + 1} de ${TOTAL_PEOPLE}.`
      : screen.kind === 'spot'
        ? `Ferramenta: ${screen.person.stop.tool}.`
        : screen.kind === 'final'
          ? 'Votação: 25 e 26 de novembro.'
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
              key={`${screen.kind}-${index}`}
              className="absolute inset-0 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.22, delay: isSpot ? 0.34 : 0.12 } }}
              exit={{ opacity: 0, transition: { duration: 0.14 } }}
            >
              {screen.kind === 'intro' && <IntroScreen headingRef={headingRef} onStart={() => go(1)} />}
              {screen.kind === 'perfil' && (
                <PerfilScreen headingRef={headingRef} onChoose={chooseProfile} onBack={() => go(-1)} />
              )}
              {screen.kind === 'story' && (
                <StoryScreen
                  headingRef={headingRef}
                  person={screen.person}
                  n={screen.n}
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
                  next={screen.next}
                  missing={targetMissing}
                  waiting={waitingPage}
                  onNext={() => go(1)}
                  onBack={() => go(-1)}
                />
              )}
              {screen.kind === 'final' && (
                <FinalScreen
                  headingRef={headingRef}
                  profile={state?.profile}
                  onBack={() => go(-1)}
                  onFinish={finish}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

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

const screenPad =
  'absolute inset-0 overflow-y-auto overscroll-contain px-4 sm:px-8 pt-[max(16px,env(safe-area-inset-top))] pb-[max(16px,env(safe-area-inset-bottom))]';

const IntroScreen: React.FC<{ headingRef: HeadingRef; onStart: () => void }> = ({ headingRef, onStart }) => (
  <div className={screenPad}>
    <div className="mx-auto flex min-h-full max-w-[1120px] flex-col justify-center gap-6 py-4 md:grid md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:items-center md:gap-14">
      {/* Mosaico: todos os rostos da chapa */}
      <ul
        className="m-0 grid list-none grid-cols-4 gap-2 p-0 md:order-2 md:gap-3"
        aria-label={`As ${TOTAL_PEOPLE} pessoas da Chapa Semente`}
      >
        {TOUR_PEOPLE_IN_CHAPA_ORDER.map((p, i) => (
          <li key={p.leader.id} className="aspect-square overflow-hidden rounded-[12px] border-2 border-foreground bg-muted-foreground">
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
          Somos a Chapa Semente, candidata ao Centro Acadêmico de Gestão Pública. São {TOTAL_PEOPLE} pessoas, e cada uma vai te
          mostrar uma ferramenta que já funciona aqui.
        </p>
        <p className="m-0 font-heading text-base font-bold uppercase tracking-[0.04em] text-white" aria-hidden="true">
          Toda mudança começa pequena.
        </p>
        <p className="m-0 text-sm font-bold uppercase tracking-[0.04em] text-white tabular-nums">
          Eleição 25 e 26/11 · cerca de 3 minutos · aparece uma vez só
        </p>
        <button type="button" onClick={onStart} className={`${btnAccent} h-[52px] w-full px-6 text-sm sm:w-auto`}>
          Começar
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
);

const PerfilScreen: React.FC<{ headingRef: HeadingRef; onChoose: (r: UserRole) => void; onBack: () => void }> = ({
  headingRef,
  onChoose,
  onBack,
}) => (
  <div className={screenPad}>
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
  onNext: () => void;
  onBack: () => void;
}> = ({ headingRef, person, n, onNext, onBack }) => {
  const { leader, stop } = person;
  return (
    <div className={`${screenPad} flex flex-col`}>
      <div className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col gap-4 md:gap-6">
        <div className="space-y-3">
          <PeopleProgress current={n} />
          <div className="flex items-center justify-between gap-3">
            <img src={asset('/logos/semente/semente-simbolo-branco.webp')} alt="" aria-hidden="true" className="h-7 w-auto" />
            <span className="text-sm font-bold tabular-nums">
              {n + 1} de {TOTAL_PEOPLE}
            </span>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-5 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center md:gap-14">
          <figure className="relative m-0 min-h-[170px] flex-1 overflow-hidden rounded-[16px] border-3 border-foreground bg-muted-foreground md:aspect-[4/5] md:max-h-[72dvh] md:flex-none">
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
  next?: TourPerson;
  missing: boolean;
  waiting: boolean;
  onNext: () => void;
  onBack: () => void;
}> = ({ cardRef, headingRef, person, n, next, missing, waiting, onNext, onBack }) => {
  const { leader, stop } = person;
  return (
    <div
      ref={cardRef}
      className="absolute bottom-[max(12px,env(safe-area-inset-bottom))] left-3 right-3 p-4 sm:p-5 md:left-auto md:right-6 md:bottom-6 md:w-[480px]"
    >
      <PeopleProgress current={n} compact />
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
        {waiting
          ? 'Abrindo a página da ferramenta…'
          : missing
            ? `${stop.proof} A página não abriu agora; você encontra a ferramenta depois pelo menu.`
            : stop.proof}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <BackButton onClick={onBack} />
        <button type="button" onClick={onNext} className={`${btnAccent} h-12 flex-1 px-4 text-sm`}>
          {next ? `Próxima: ${next.firstName}` : 'Ir para a votação'}
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

const FinalScreen: React.FC<{
  headingRef: HeadingRef;
  profile?: UserRole;
  onBack: () => void;
  onFinish: () => void;
}> = ({ headingRef, profile, onBack, onFinish }) => {
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
    window.setTimeout(onFinish, 1500);
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
              <li key={p.leader.id} className="h-10 w-10 overflow-hidden rounded-[10px] border-2 border-foreground bg-muted-foreground sm:h-12 sm:w-12">
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
                25 e 26 de novembro:{' '}
                vote <MarkerWord onColor className="text-[1.1em] tracking-normal">Semente</MarkerWord>.
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

        <div className="space-y-4">
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
                <button type="button" className={actionBtn} onClick={handleInstall} aria-expanded={ios ? showIosHint : undefined}>
                  <i className="bi bi-phone text-lg text-primary" aria-hidden="true" />
                  Pôr o site na tela inicial
                </button>
                {showIosHint && (
                  <p className="m-0 mt-2 rounded-[12px] bg-white p-3 text-sm text-foreground">
                    No Safari, toque em <strong>Compartilhar</strong> e depois em <strong>Adicionar à Tela de Início</strong>.
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

          <div className="relative min-h-[136px] pt-2">
            <AnimatePresence mode="wait" initial={false}>
              {stamped ? (
                <motion.div key="stamp" className="flex justify-center pt-2" initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
                  <span className="cagp-big-stamp is-semente" role="status">
                    <span className="cagp-big-stamp-title">Semente plantada</span>
                    <span className="cagp-big-stamp-sub">Até dia 25</span>
                  </span>
                </motion.div>
              ) : (
                <motion.div key="actions" className="space-y-3" exit={{ opacity: 0, transition: { duration: 0.12 } }}>
                  <div className="flex items-center gap-3">
                    <BackButton onClick={onBack} />
                    <button type="button" onClick={handleCommit} className={`${btnAccent} h-[56px] flex-1 px-5 text-sm`}>
                      {canVote ? 'Vou votar na Semente' : 'Apoio a Semente'}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      record(false);
                      onFinish();
                    }}
                    className="inline-flex min-h-[44px] w-full items-center justify-center text-sm font-bold text-white underline underline-offset-[0.22em] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {canVote ? 'Ainda estou decidindo' : 'Ir para o site'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SementeTour;
