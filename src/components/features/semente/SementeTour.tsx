// src/components/features/semente/SementeTour.tsx — Tour da Chapa Semente.
//
// Primeira visita: abre antes de qualquer conteúdo (decisão de 10/11/2026), inclusive por link direto.
//
// Sequência de 12/11/2026 (noite), refeita depois da crítica do tour (muito texto, saídas com sete
// nomes, foto da moldura que não ia para lugar nenhum, indeciso empurrado para a moldura):
//   vídeo (TourPanfletagem.tsx) → momento do curso → uma tela por pessoa (rosto, a dor do estudante e
//   um "print" da ferramenta real) → a carteirinha com a foto da pessoa → votação.
//   • O vídeo tem o próprio "Pular vídeo", que só pula o vídeo. Nas outras telas "Pular" leva à votação,
//     onde "Ir pro site" é o botão principal de quem pulou.
//   • Uma foto só: a que a pessoa põe na carteirinha é a de Seu perfil (cabeçalho, carteirinha) e já
//     chega pronta na moldura de apoio (src/lib/fotoDoPerfil.ts).
//   • A moldura só é oferecida a quem tocou em "Vou votar na Chapa 2". Quem está decidindo recebe o
//     debate de 24/11, as propostas e a saída. O carimbo é o último gesto de quem apoia.
//   • O caminho padrão mostra só as TOUR_CURTO pessoas mais ligadas ao perfil; "Conhecer os outros"
//     abre o resto (state.full). Nada tranca o site.
//
// O tour NÃO navega pelo site (10/11/2026): o print de cada ferramenta é um recorte da captura estática
// (public/images/chapa/tour/shots, geradas por scripts/capture-tour-shots.mjs), sem o cabeçalho do site.
//
// Movimento (DESIGN.md › Movimento): o bloco de cor troca por pessoa, as fotos "germinam" de baixo
// para cima, o print cola como adesivo e o fim é o carimbo. Movimento sempre ativo.

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import SHOTS_JSON from '@/data/sementeTourShots.json';
import { asset } from '@/lib/paths';
import { celebrateSpring, easeOutExpo } from '@/lib/motion';
import { MarkerWord } from '@/components/ui/marker-word';
import { GritoDeVoto } from '@/components/ui/grito-de-voto';
import molduras from '@/data/molduras.json';
import { getVaultItem, setVaultItem, type UserRole } from '@/lib/storage/studentVault';
import { guardarNomeNoPerfil, lerFotoDoPerfil } from '@/lib/fotoDoPerfil';
import {
  canTriggerInstallPrompt,
  downloadElectionCalendarReminder,
  isIOS,
  isStandalone,
  onInstallPromptChange,
  triggerInstallPrompt,
} from '@/lib/pwa/pwaManager';
import {
  SEMENTE_TOUR_KEY,
  TOUR_CURTO,
  TOUR_ORDER,
  TOUR_PEOPLE_IN_CHAPA_ORDER,
  TOUR_PROFILES,
  TOUR_SEQUENCIA,
  getTourPerson,
  getTourShareUrl,
  loadSementeTour,
  saveSementeTour,
  type SementeTourState,
  type TourPerson,
} from '@/lib/sementeTour';
import { START_PROPOSTAS_TOUR } from '@/lib/propostasTour';
import { CHAPA_ROTULO } from '@/lib/chapaSementeData';
import { TourPanfletagem } from './TourPanfletagem';
import { CreditoDosDesenhos } from './CreditoDosDesenhos';

// O adesivo "Chapa ✌" desenhado à mão (os desenhos originais da chapa, quadro a quadro). Só carrega na
// tela da votação: os desenhos pesam e a primeira visita não precisa deles antes.
const AdesivoChapa = React.lazy(() => import('./DesenhosDaChapa').then((m) => ({ default: m.AdesivoChapa })));

// ---------------------------------------------------------------------------
// Sequência de telas
// ---------------------------------------------------------------------------

type Screen =
  /** O vídeo. Não tem tela própria além dele: quando acaba (ou é pulado), vem o perfil. */
  | { kind: 'intro' }
  | { kind: 'perfil' }
  /** `more`: quantas pessoas ficaram fora do caminho curto (só na última dele). */
  | { kind: 'pessoa'; person: TourPerson; n: number; total: number; next?: TourPerson; more: number }
  | { kind: 'carteirinha' }
  | { kind: 'final' }
  /** Só para quem declarou voto: a moldura de apoio, com a foto da carteirinha já no lugar. */
  | { kind: 'moldura' };

const TOTAL_PEOPLE = TOUR_PEOPLE_IN_CHAPA_ORDER.length;

/**
 * A sequência de telas. Sem perfil não há pessoas, mas a votação existe sempre: é para ela que o
 * "Pular" leva. No caminho curto entram só as TOUR_CURTO primeiras pessoas do perfil; como o completo
 * começa pelas mesmas, o índice salvo vale nos dois. Quem ainda não estuda aqui não tem carteirinha.
 */
function buildScreens(profile?: UserRole, full = false): Screen[] {
  const screens: Screen[] = [{ kind: 'intro' }, { kind: 'perfil' }];
  if (profile) {
    const all = TOUR_ORDER[profile].map(getTourPerson);
    const people = full ? all : all.slice(0, TOUR_CURTO);
    people.forEach((person, n) => {
      const last = n === people.length - 1;
      screens.push({ kind: 'pessoa', person, n, total: people.length, next: people[n + 1], more: last ? all.length - people.length : 0 });
    });
    if (profile !== 'ingressar') screens.push({ kind: 'carteirinha' });
  }
  screens.push({ kind: 'final' });
  screens.push({ kind: 'moldura' });
  return screens;
}

/** Roxo e petróleo se alternam por pessoa (color blocking do Cartaz). */
const PURPLE = '#5B2A85';
const TEAL = '#266264';
function screenColor(s: Screen | undefined): string {
  if (s?.kind === 'pessoa') return s.n % 2 === 0 ? PURPLE : TEAL;
  return PURPLE;
}

/** Separa o nome que abre a frase ("Ítalo reuniu…") para destacá-lo. */
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
const preload = (src?: string) => {
  if (src) new Image().src = src;
};

// ---------------------------------------------------------------------------
// Peças visuais
// ---------------------------------------------------------------------------

/** Um segmento por pessoa: feitos em branco, atual em laranja (a folha), por vir só contornados. */
const PeopleProgress: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <ol className="flex h-3 items-center gap-1 m-0 p-0 list-none" aria-label={`Pessoa ${current + 1} de ${total}`}>
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

/** Os 12 rostos em fila: quem assina o site. */
const Rostos: React.FC<{ className?: string }> = ({ className = '' }) => (
  <ul className={`m-0 flex list-none flex-wrap gap-1.5 p-0 ${className}`} aria-label={`As ${TOTAL_PEOPLE} pessoas da Chapa Semente`}>
    {TOUR_PEOPLE_IN_CHAPA_ORDER.map((p, i) => (
      <li key={p.leader.id} className="h-10 w-10 overflow-hidden rounded-[30%_10%_30%_10%] border-2 border-foreground bg-muted-foreground sm:h-12 sm:w-12">
        <GrowPhoto person={p} sizes="thumb" delay={0.05 + i * 0.035} alt={p.leader.name} />
      </li>
    ))}
  </ul>
);

/**
 * O "print" da ferramenta: só a região da ferramenta na captura (sem o cabeçalho do site), colado
 * como adesivo no canto da foto de quem a defendeu.
 */
const ToolPrint: React.FC<{ shot: TourShot; label: string }> = ({ shot, label }) => {
  const { rect } = shot;
  // Ferramenta muito alta: o print mostra o começo dela.
  const altura = Math.min(rect.h, rect.w * 1.15);
  return (
    <motion.div
      role="img"
      aria-label={`Print da ferramenta: ${label}`}
      className="absolute -bottom-2 -right-1 w-[42%] max-w-[230px] overflow-hidden rounded-[10px] border-3 border-foreground bg-white shadow-[4px_4px_0_0_#1F1F1F] md:-right-6 md:w-[46%] md:max-w-[280px]"
      style={{ aspectRatio: `${rect.w} / ${altura}` }}
      initial={{ scale: 1.7, opacity: 0, rotate: 14 }}
      animate={{ scale: 1, opacity: 1, rotate: 3 }}
      transition={{ ...celebrateSpring, delay: 0.5 }}
    >
      <img
        src={asset(shot.src)}
        alt=""
        draggable={false}
        decoding="async"
        className="absolute block h-auto max-w-none select-none"
        style={{
          width: `${(shot.w / rect.w) * 100}%`,
          left: `${(-rect.x / rect.w) * 100}%`,
          top: `${(-rect.y / altura) * 100}%`,
        }}
      />
    </motion.div>
  );
};

// Botões do tour no gesto do kit Semente: o laranja (ação principal) tem os cantos da folha.
const btnBase =
  'inline-flex items-center justify-center gap-2 border-3 border-foreground font-heading font-bold select-none cursor-pointer ' +
  'transition-[transform,box-shadow,background-color] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed';
const btnAccent =
  `${btnBase} rounded-[26px_7px_26px_7px] uppercase tracking-[0.04em] bg-accent text-foreground shadow-md hover:-translate-x-px hover:-translate-y-px hover:shadow-lg hover:bg-accent-hover active:translate-x-[3px] active:translate-y-[3px] active:shadow-none`;
const btnOutlineLight =
  `${btnBase} rounded-[12px] bg-white text-foreground shadow-md hover:-translate-x-px hover:-translate-y-px hover:shadow-lg hover:bg-muted active:translate-x-[3px] active:translate-y-[3px] active:shadow-none`;
const linkLight =
  'inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-white underline underline-offset-[0.22em] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

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
  const [closing, setClosing] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const screens = useMemo(() => buildScreens(state?.profile, state?.full), [state?.profile, state?.full]);
  const open = state?.status === 'active';
  const index = state ? Math.min(state.index, screens.length - 1) : 0;
  const screen = open ? screens[index] : undefined;
  const inVideo = screen?.kind === 'intro';

  // ---- Montagem: decide se o tour abre --------------------------------------------------------
  useEffect(() => {
    (window as unknown as { __cagpTourMounted?: boolean }).__cagpTourMounted = true;
    const saved = loadSementeTour() as TourRuntime | null;
    if (saved?.status === 'done') {
      document.documentElement.removeAttribute('data-semente-tour');
      setState(saved);
      return;
    }
    // Quem ficou no meio de uma sequência antiga recomeça: os índices das telas mudaram.
    const fresh: TourRuntime = {
      status: 'active',
      index: 0,
      v: TOUR_SEQUENCIA,
      returnTo: window.location.pathname + window.location.search + window.location.hash,
    };
    setState(saved && saved.v === TOUR_SEQUENCIA ? saved : fresh);
  }, []);

  // Rever o tour (botões da home e da /chapa-semente): mesmo fluxo, com saída livre.
  useEffect(() => {
    const start = () => {
      setClosing(false);
      setState({
        status: 'active',
        index: 0,
        v: TOUR_SEQUENCIA,
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
  // regravar "ativo" por cima.
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

  // ---- A foto e o print da próxima pessoa já vêm enquanto a pessoa lê a tela atual ----------------
  useEffect(() => {
    if (!screen || !vp.w) return;
    const warm = (p?: TourPerson) => {
      if (!p) return;
      preload(p.photo);
      const shot = pickShot(p.leader.id, vp.w, vp.h);
      if (shot) preload(asset(shot.src));
    };
    if (screen.kind === 'pessoa') warm(screen.next);
    // No vídeo e na pergunta ainda não há perfil: aquece a primeira pessoa de cada caminho possível.
    if (screen.kind === 'perfil') TOUR_PROFILES.forEach((o) => preload(getTourPerson(TOUR_ORDER[o.role][0]).photo));
  }, [screen, vp.w, vp.h]);

  // ---- Navegação entre telas --------------------------------------------------------------------
  const go = useCallback((delta: number) => {
    setState((s) => {
      if (!s) return s;
      const nextIndex = Math.max(0, Math.min(buildScreens(s.profile, s.full).length - 1, s.index + delta));
      return { ...s, index: nextIndex };
    });
  }, []);

  /** Fim do vídeo, ou "Pular vídeo": só o vídeo fica para trás. */
  const afterVideo = useCallback(() => setState((s) => (s && s.index === 0 ? { ...s, index: 1 } : s)), []);

  const chooseProfile = (role: UserRole) => {
    setVaultItem('cagp_user_role_v1', role);
    setState((s) => (s ? { ...s, profile: role, full: false, index: 2 } : s));
  };

  /** "Conhecer os outros": o caminho completo começa pelas mesmas pessoas, então é só seguir. */
  const showEveryone = () => setState((s) => (s ? { ...s, full: true, index: s.index + 1 } : s));

  /** "Pular": vai para a tela da votação, de onde a pessoa sai com um toque ou volta para onde estava. */
  const skip = useCallback(() => {
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
      if (s.skipFrom === undefined) return { ...s, index: Math.max(1, s.index - 1) };
      return { ...s, index: s.skipFrom, skipFrom: undefined };
    });

  const finish = useCallback(() => {
    setClosing(true);
    setVaultItem('cagp_onboarding_completed_v1', true);
    // Grava já: quem fecha e troca de página antes do fim da animação não revê o tour.
    setState((s) => {
      if (s) saveSementeTour({ ...s, status: 'done', index: 0, skipFrom: undefined });
      return s;
    });
    window.setTimeout(() => {
      setState((s) => (s ? { ...s, status: 'done', index: 0, skipFrom: undefined } : s));
      setClosing(false);
      window.dispatchEvent(new CustomEvent('cagp:semente-tour-done'));
    }, 520);
  }, []);

  /** Fecha o tour da chapa e abre o das propostas. */
  const verPropostas = () => {
    finish();
    window.setTimeout(() => {
      (window as unknown as { __cagpPropostasPending?: boolean }).__cagpPropostasPending = true;
      window.dispatchEvent(new CustomEvent(START_PROPOSTAS_TOUR));
    }, 620);
  };

  // Foco no título de cada tela + teclado (setas avançam e voltam; Esc pula, e ao rever fecha).
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
        else if (inVideo) afterVideo();
        else skip();
        return;
      }
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (inVideo) return;
      if (e.key === 'ArrowRight' && screen?.kind === 'pessoa') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft' && index > 1) {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, screen, index, go, finish, skip, afterVideo, state?.replay, inVideo]);

  if (!open || !screen) return null;

  const panelColor = screenColor(screen);
  const panelClip = closing ? `inset(${vp.h}px 0px 0px 0px round 0px)` : 'inset(0px 0px 0px 0px round 0px)';
  // O canto de cima à direita: "Pular" na primeira visita (menos no vídeo, que tem o próprio "Pular
  // vídeo", e na votação e na moldura, que já são a saída); ao rever, o fechar.
  const canSkip = !state?.replay && (screen.kind === 'perfil' || screen.kind === 'pessoa' || screen.kind === 'carteirinha');
  const corner = canSkip ? 'pular' : state?.replay ? 'fechar' : undefined;
  const shot = screen.kind === 'pessoa' && vp.w ? pickShot(screen.person.leader.id, vp.w, vp.h) : null;

  const liveText =
    screen.kind === 'pessoa'
      ? `${screen.person.leader.name}, ${screen.person.leader.role}. Pessoa ${screen.n + 1} de ${screen.total}.`
      : screen.kind === 'carteirinha'
        ? 'Sua carteirinha.'
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

        {/* O bloco de cor: troca por pessoa e, no fim, desce como cortina. */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          initial={false}
          animate={{ clipPath: panelClip, backgroundColor: panelColor }}
          transition={{ duration: 0.62, ease: easeOutExpo }}
        />

        <AnimatePresence mode="wait" initial={false}>
          {!closing && (
            <motion.div
              key={`${screen.kind}-${index}`}
              className="absolute inset-0 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.22, delay: 0.12 } }}
              exit={{ opacity: 0, transition: { duration: 0.14 } }}
            >
              {screen.kind === 'intro' && <TourPanfletagem onDone={afterVideo} />}
              {screen.kind === 'perfil' && <PerfilScreen headingRef={headingRef} onChoose={chooseProfile} />}
              {screen.kind === 'pessoa' && (
                <PessoaScreen
                  headingRef={headingRef}
                  person={screen.person}
                  n={screen.n}
                  total={screen.total}
                  next={screen.next}
                  more={screen.more}
                  hasCard={state?.profile !== 'ingressar'}
                  shot={shot}
                  corner={corner}
                  onNext={() => go(1)}
                  onMore={showEveryone}
                  onBack={() => go(-1)}
                />
              )}
              {screen.kind === 'carteirinha' && (
                <CarteirinhaScreen headingRef={headingRef} profile={state?.profile} onNext={() => go(1)} onBack={() => go(-1)} />
              )}
              {screen.kind === 'final' && (
                <FinalScreen
                  headingRef={headingRef}
                  profile={state?.profile}
                  skipped={state?.skipFrom !== undefined && !state?.replay}
                  onBack={backFromFinal}
                  onMoldura={() => go(1)}
                  onPropostas={verPropostas}
                  onExit={finish}
                />
              )}
              {screen.kind === 'moldura' && <MolduraScreen headingRef={headingRef} onBack={() => go(-1)} onFinish={finish} />}
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
            className="absolute top-[max(12px,env(safe-area-inset-top))] right-3 w-11 h-11 rounded-[12px] border-3 border-foreground bg-white text-foreground inline-flex items-center justify-center shadow-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:right-6"
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
/** Telas centradas com botão no canto ("Pular" ou fechar): o conteúdo começa abaixo dele. */
const screenPadCorner = `${screenPadBase} pt-[max(68px,calc(env(safe-area-inset-top)+56px))]`;
const h2Cls = 'm-0 font-heading font-bold leading-[1.08] tracking-[-0.02em] [text-wrap:balance] focus:outline-none focus-visible:outline-none';

/* ───────────────────────── Momento do curso ───────────────────────── */

const PerfilScreen: React.FC<{ headingRef: HeadingRef; onChoose: (r: UserRole) => void }> = ({ headingRef, onChoose }) => (
  <div className={screenPadCorner}>
    <div className="mx-auto flex min-h-full max-w-[720px] flex-col justify-center gap-6 py-4">
      <div className="grid gap-4">
        <img
          src={asset('/logos/semente/semente-horizontal-branco.webp')}
          alt="Chapa Gestão Pública Semente"
          width="768"
          height="229"
          className="h-9 w-auto justify-self-start sm:h-11"
        />
        <Rostos />
        <h2 id="semente-tour-heading" ref={headingRef} tabIndex={-1} className={`${h2Cls} text-[clamp(1.75rem,5.6vw,3rem)]`}>
          A gente fez este site. Em que <MarkerWord onColor className="text-[1.1em] tracking-normal">momento</MarkerWord> do curso você está?
        </h2>
      </div>
      <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
        {TOUR_PROFILES.map((opt, i) => (
          <motion.li
            key={opt.role}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: easeOutExpo }}
          >
            <button type="button" onClick={() => onChoose(opt.role)} className={`${btnOutlineLight} min-h-[72px] w-full justify-start gap-4 px-4 py-3 text-left`}>
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
    </div>
  </div>
);

/* ───────────────────────── Uma tela por pessoa ───────────────────────── */

const PessoaScreen: React.FC<{
  headingRef: HeadingRef;
  person: TourPerson;
  n: number;
  total: number;
  next?: TourPerson;
  /** Quantas pessoas ficaram fora do caminho curto (só na última dele). */
  more: number;
  /** Depois das pessoas vem a carteirinha (quem ainda não estuda aqui vai direto à votação). */
  hasCard: boolean;
  shot: TourShot | null;
  /** Botão no canto de cima à direita: a linha do progresso abre espaço para ele. */
  corner?: 'pular' | 'fechar';
  onNext: () => void;
  onMore: () => void;
  onBack: () => void;
}> = ({ headingRef, person, n, total, next, more, hasCard, shot, corner, onNext, onMore, onBack }) => {
  const { leader, stop } = person;
  const [name, rest] = splitLeadingName(stop.answer, person.firstName === 'João' ? 'João Pedro' : person.firstName);
  return (
    <div className={`${screenPad} flex flex-col`}>
      <div className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col gap-4 md:gap-6">
        {/* Uma linha só, da altura do botão do canto: símbolo, progresso e "n de total". */}
        <div className={`flex min-h-11 items-center gap-3 ${corner === 'pular' ? 'pr-[108px] sm:pr-[120px]' : corner === 'fechar' ? 'pr-[60px] sm:pr-[72px]' : ''}`}>
          <img src={asset('/logos/semente/semente-simbolo-branco.webp')} alt="" aria-hidden="true" className="h-7 w-auto shrink-0" />
          <div className="min-w-0 flex-1">
            <PeopleProgress current={n} total={total} />
          </div>
          <span className="-rotate-3 shrink-0 rounded-md border-2 border-foreground bg-[#FFC83D] px-2 py-1 text-sm font-bold tabular-nums text-foreground shadow-[2px_2px_0_0_#1F1F1F]">
            {n + 1} de {total}
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-5 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center md:gap-16">
          {/* Tocar na foto avança, como nos stories; o botão laranja faz o mesmo para quem usa teclado. */}
          <div className="relative mr-2 mb-3 flex min-h-[190px] flex-1 cursor-pointer md:aspect-[4/5] md:max-h-[72dvh] md:flex-none" onClick={onNext}>
            <figure className="relative m-0 flex-1 overflow-hidden rounded-[48px_12px_48px_12px] border-3 border-foreground bg-muted-foreground shadow-[5px_5px_0_0_var(--color-accent),9px_9px_0_0_#1F1F1F]">
              <GrowPhoto person={person} className="absolute inset-0" />
              <motion.figcaption
                className="absolute left-3 top-3 max-w-[calc(100%-24px)] rounded-[8px] bg-foreground px-3 py-2 text-white"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.35, ease: easeOutExpo }}
              >
                <span className="block text-base font-bold leading-tight">{leader.name}</span>
                <span className="block text-sm leading-snug">{leader.role}</span>
              </motion.figcaption>
            </figure>
            {shot && <ToolPrint shot={shot} label={stop.tool} />}
          </div>

          <div className="grid gap-3 md:gap-5">
            <motion.h2
              id="semente-tour-heading"
              ref={headingRef}
              tabIndex={-1}
              className={`${h2Cls} text-[clamp(1.5rem,5.2vw,3.25rem)]`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: easeOutExpo }}
            >
              {stop.hook}
            </motion.h2>
            <motion.p
              className="m-0 max-w-[48ch] text-base leading-snug sm:text-lg sm:leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: easeOutExpo }}
            >
              {name ? (
                <>
                  <strong className="font-heading font-bold text-white">{name}</strong>
                  {rest}
                </>
              ) : (
                stop.answer
              )}
            </motion.p>
            <p className="m-0 flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className="font-heading text-lg font-bold leading-tight">{stop.tool}</span>
              {stop.simulated ? (
                <span className="cagp-stamp-badge is-simulado">Simulado</span>
              ) : (
                <MarkerWord onColor className="text-xl">já funciona</MarkerWord>
              )}
            </p>
            <div className="flex items-center gap-3 pt-1">
              {n > 0 ? <BackButton onClick={onBack} /> : <BackButton onClick={onBack} label="Voltar ao momento do curso" />}
              <button type="button" onClick={onNext} className={`${btnAccent} h-[52px] flex-1 px-5 text-sm md:flex-none`}>
                {next ? `Próxima: ${next.firstName}` : hasCard ? 'Agora é com você' : 'Ir para a votação'}
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </button>
            </div>
            {more > 0 && (
              <button type="button" onClick={onMore} className={`${linkLight} mt-1 w-full justify-center md:w-auto`}>
                Conhecer os outros {more} da chapa
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────── A carteirinha ───────────────────────── */

/**
 * A carteirinha com a cara da pessoa. A foto é a de Seu perfil (cabeçalho e carteirinha do site) e a
 * mesma que chega na moldura de apoio; fica só no aparelho. Nada aqui é obrigatório.
 */
const CarteirinhaScreen: React.FC<{ headingRef: HeadingRef; profile?: UserRole; onNext: () => void; onBack: () => void }> = ({
  headingRef,
  profile,
  onNext,
  onBack,
}) => {
  const [foto, setFoto] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [falhou, setFalhou] = useState(false);
  const momento = TOUR_PROFILES.find((o) => o.role === profile);

  useEffect(() => {
    setFoto(lerFotoDoPerfil());
    const salvo = getVaultItem('cagp_student_profile_v1').name;
    if (salvo && salvo !== 'Estudante de Gestão Pública') setNome(salvo);
  }, []);

  const escolher = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    e.target.value = '';
    if (!arquivo) return;
    try {
      // O mesmo carregador da moldura: a foto inteira fica pronta para ela, o recorte vai para o perfil.
      const m = await import('@/scripts/molduraDeApoio');
      await m.usarFoto(arquivo, true);
      setFoto(lerFotoDoPerfil());
      setFalhou(false);
    } catch {
      setFalhou(true);
    }
  };

  const seguir = () => {
    guardarNomeNoPerfil(nome);
    onNext();
  };

  const entradaDeFoto = <input type="file" accept="image/*" className="sr-only" onChange={escolher} />;

  return (
    <div className={screenPadCorner}>
      <div className="mx-auto flex min-h-full max-w-[1040px] flex-col justify-center gap-9 py-4 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center md:gap-14">
        {/* O cartão: Ficha branca sobre o roxo, levemente torta, com a sombra de folha das fotos. */}
        <motion.div
          className="mx-auto w-full max-w-[380px] -rotate-2 overflow-hidden rounded-[16px] border-3 border-foreground bg-white text-foreground shadow-[5px_5px_0_0_var(--color-accent),9px_9px_0_0_#1F1F1F]"
          initial={{ y: 40, opacity: 0, rotate: -8 }}
          animate={{ y: 0, opacity: 1, rotate: -2 }}
          transition={{ ...celebrateSpring, delay: 0.1 }}
        >
          <div className="flex items-center justify-between gap-3 bg-foreground px-4 py-2 text-white">
            <span className="text-xs font-bold uppercase tracking-[0.04em]">Gestão Pública · FAFICH / UFMG</span>
            <img src={asset('/logos/semente/semente-simbolo-branco.webp')} alt="" aria-hidden="true" className="h-5 w-auto shrink-0" />
          </div>
          <div className="flex items-center gap-4 p-4">
            <label className="relative block h-24 w-24 shrink-0 cursor-pointer overflow-hidden rounded-[30%_10%_30%_10%] border-3 border-foreground bg-primary-tint has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent">
              {foto ? (
                <motion.img
                  key={foto.slice(-24)}
                  src={foto}
                  alt="Sua foto"
                  className="block h-full w-full object-cover"
                  initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                  transition={{ duration: 0.6, ease: easeOutExpo }}
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-primary">
                  <i className="bi bi-camera text-3xl" aria-hidden="true" />
                </span>
              )}
              <span className="sr-only">{foto ? 'Trocar a foto' : 'Pôr minha foto'}</span>
              {entradaDeFoto}
            </label>
            <div className="grid min-w-0 flex-1 justify-items-start gap-2">
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                maxLength={60}
                autoComplete="given-name"
                enterKeyHint="done"
                placeholder="Seu nome"
                aria-label="Seu nome (opcional)"
                className="block w-full min-w-0 rounded-none border-0 border-b-3 border-dashed border-foreground bg-transparent px-0 py-1 font-heading text-xl font-bold leading-tight text-foreground placeholder:text-content-secondary focus:border-solid focus:border-primary focus:outline-none"
              />
              {momento && (
                <span className="inline-block rounded-md border-2 border-foreground bg-primary px-2 py-0.5 text-xs font-bold uppercase tracking-[0.04em] text-white">
                  {momento.label}
                </span>
              )}
            </div>
          </div>
          <p className="m-0 border-t-3 border-foreground bg-muted px-4 py-2.5 text-sm leading-snug">
            Guarda suas horas, disciplinas e prazos. Só neste celular.
          </p>
        </motion.div>

        <div className="grid gap-5">
          <h2 id="semente-tour-heading" ref={headingRef} tabIndex={-1} className={`${h2Cls} text-[clamp(1.75rem,5.6vw,3rem)]`}>
            Essa carteirinha já é <MarkerWord onColor className="text-[1.1em] tracking-normal">sua</MarkerWord>.
          </h2>
          {falhou && (
            <p className="m-0 text-sm font-bold leading-snug text-white" role="status">
              Não deu pra abrir essa foto. Tente outra.
            </p>
          )}
          <div className="flex items-center gap-3">
            <BackButton onClick={onBack} />
            {foto ? (
              <button type="button" onClick={seguir} className={`${btnAccent} h-[52px] flex-1 px-5 text-sm md:flex-none`}>
                Ficou boa, seguir
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </button>
            ) : (
              <label className={`${btnAccent} h-[52px] flex-1 px-5 text-sm has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-white has-[:focus-visible]:outline-offset-2 md:flex-none`}>
                <i className="bi bi-camera" aria-hidden="true" />
                Pôr minha foto
                {entradaDeFoto}
              </label>
            )}
          </div>
          {!foto && (
            <button type="button" onClick={seguir} className={`${linkLight} w-full justify-center md:w-auto`}>
              Seguir sem foto
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────── Votação ───────────────────────── */

const FinalScreen: React.FC<{
  headingRef: HeadingRef;
  profile?: UserRole;
  /** A pessoa chegou aqui pelo "Pular": a saída é o botão principal. */
  skipped: boolean;
  onBack: () => void;
  /** Abre a moldura de apoio (só oferecida a quem declarou voto). */
  onMoldura: () => void;
  onPropostas: () => void;
  /** Fecha o tour daqui mesmo. */
  onExit: () => void;
}> = ({ headingRef, profile, skipped, onBack, onMoldura, onPropostas, onExit }) => {
  // 'ask' pergunta; 'apoio' é o carimbo e o que fazer com ele; 'indeciso' aponta o debate e as propostas.
  const [stage, setStage] = useState<'ask' | 'apoio' | 'indeciso'>(() => {
    const a = getVaultItem('cagp_election_activation_v1');
    return a?.completed && a?.sementeSupporter ? 'apoio' : 'ask';
  });
  const [calendarSaved, setCalendarSaved] = useState(false);
  const [debateSaved, setDebateSaved] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [showIosHint, setShowIosHint] = useState(false);
  const [installed, setInstalled] = useState(false);
  const ios = typeof window !== 'undefined' && isIOS() && !isStandalone();
  const canVote = profile !== 'ingressar';

  useEffect(() => {
    setCanInstall(canTriggerInstallPrompt());
    setInstalled(isStandalone());
    return onInstallPromptChange(setCanInstall);
  }, []);

  const record = (patch: { supporter?: boolean; calendar?: boolean; shared?: boolean; installed?: boolean }) => {
    const prev = getVaultItem('cagp_election_activation_v1');
    setVaultItem('cagp_election_activation_v1', {
      ...prev,
      completed: true,
      sementeSupporter: patch.supporter ?? prev.sementeSupporter,
      installed: patch.installed || prev.installed,
      calendarReminderSaved: patch.calendar || prev.calendarReminderSaved,
      sharedWhatsApp: patch.shared || prev.sharedWhatsApp,
      completedAt: new Date().toISOString(),
    });
  };

  const handleInstall = async () => {
    if (canInstall) {
      const res = await triggerInstallPrompt();
      if (res.outcome === 'accepted') {
        setInstalled(true);
        record({ installed: true });
      }
    } else if (ios) {
      setShowIosHint((v) => !v);
    }
  };

  const actionBtn = `${btnOutlineLight} min-h-[48px] w-full justify-start px-4 text-left text-base`;
  const exitBtn = (
    <button type="button" onClick={onExit} className={`${btnAccent} h-[56px] flex-1 px-5 text-sm`}>
      Ir pro site
      <i className="bi bi-arrow-right" aria-hidden="true" />
    </button>
  );

  return (
    <div className={screenPad}>
      <div className="mx-auto flex min-h-full max-w-[1120px] flex-col justify-center gap-6 py-4 md:grid md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:items-center md:gap-14">
        <div className="grid gap-5">
          {/* O "Chapa 2" desenhado à mão abre a tela do voto; depois do compromisso, o carimbo assume. */}
          {stage === 'ask' && (
            <React.Suspense fallback={<span className="block h-[92px]" aria-hidden="true" />}>
              <AdesivoChapa className="-mb-2 block h-[92px] w-auto -rotate-3 justify-self-start sm:h-[120px]" />
            </React.Suspense>
          )}
          {/* Só texto aqui: esta tela tem um pedido só, o do voto. O link fica no tour das propostas e em /sobre-o-site. */}
          {stage === 'ask' && <CreditoDosDesenhos className="-mt-3" />}
          <Rostos />
          <h2 id="semente-tour-heading" ref={headingRef} tabIndex={-1} className={`${h2Cls} text-[clamp(1.85rem,6vw,3.5rem)]`}>
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
          {canVote && (
            <p className="m-0 max-w-[40ch] text-base leading-snug tabular-nums sm:text-lg">
              Das 17h às 22h30, na sala do CAGP (FAFICH). Na cédula, um X em uma chapa só.
            </p>
          )}
        </div>

        <div className="min-h-[190px]">
          <AnimatePresence mode="wait" initial={false}>
            {stage === 'ask' && (
              <motion.div key="ask" className="grid gap-3" exit={{ opacity: 0, transition: { duration: 0.12 } }}>
                {skipped ? (
                  <>
                    <div className="flex items-center gap-3">
                      <BackButton onClick={onBack} label="Voltar ao tour" />
                      {exitBtn}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        record({ supporter: true });
                        setStage('apoio');
                      }}
                      className={`${btnOutlineLight} h-12 w-full px-5 text-sm uppercase tracking-[0.04em]`}
                    >
                      {canVote ? `Vou votar na ${CHAPA_ROTULO}` : `Apoio a ${CHAPA_ROTULO}`}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <BackButton onClick={onBack} />
                      <button
                        type="button"
                        onClick={() => {
                          record({ supporter: true });
                          setStage('apoio');
                        }}
                        className={`${btnAccent} h-[56px] flex-1 px-5 text-sm`}
                      >
                        {canVote ? `Vou votar na ${CHAPA_ROTULO}` : `Apoio a ${CHAPA_ROTULO}`}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        record({ supporter: false });
                        if (canVote) setStage('indeciso');
                        else onExit();
                      }}
                      className={`${linkLight} w-full justify-center`}
                    >
                      {canVote ? 'Ainda estou decidindo' : 'Ir pro site'}
                    </button>
                  </>
                )}
              </motion.div>
            )}

            {stage === 'apoio' && (
              <motion.div
                key="apoio"
                className="grid gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.16 } }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
              >
                <div className="flex justify-center md:justify-start">
                  <span className="cagp-big-stamp is-semente" role="status">
                    <span className="cagp-big-stamp-title">Semente plantada</span>
                    <span className="cagp-big-stamp-sub">{CHAPA_ROTULO} · até dia 25</span>
                  </span>
                </div>
                <ul className="m-0 grid list-none gap-2.5 p-0">
                  <li>
                    <button type="button" className={actionBtn} onClick={onMoldura}>
                      <i className="bi bi-camera text-lg text-primary" aria-hidden="true" />
                      Fazer minha moldura de apoio
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={actionBtn}
                      onClick={() => {
                        downloadElectionCalendarReminder('voting');
                        setCalendarSaved(true);
                        record({ calendar: true });
                      }}
                    >
                      <i className={`bi ${calendarSaved ? 'bi-check2' : 'bi-calendar-plus'} text-lg text-primary`} aria-hidden="true" />
                      {calendarSaved ? 'Lembrete baixado' : 'Baixar lembrete pra agenda'}
                    </button>
                  </li>
                  <li>
                    <a
                      href={typeof window !== 'undefined' ? getTourShareUrl() : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => record({ shared: true })}
                      className={`${actionBtn} no-underline`}
                    >
                      <i className="bi bi-whatsapp text-lg text-success" aria-hidden="true" />
                      Chamar a turma no WhatsApp
                    </a>
                  </li>
                  {(canInstall || ios) && !installed && (
                    <li>
                      {/* O convite de instalar (11/11/2026) vem com o motivo: no iPhone o Safari pode apagar
                          o que foi salvo num site que fica 7 dias sem uso, e na tela inicial não. */}
                      <button type="button" className={`${actionBtn} h-auto py-2.5`} onClick={handleInstall} aria-expanded={ios ? showIosHint : undefined}>
                        <i className="bi bi-phone text-lg text-primary" aria-hidden="true" />
                        <span className="grid gap-0.5">
                          <span>Pôr o site na tela inicial</span>
                          <span className="text-sm font-normal normal-case tracking-normal text-content-secondary">
                            {ios ? 'Assim o iPhone não apaga suas horas, notas e foto.' : 'Abre direto, como um app, e funciona sem sinal.'}
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
                </ul>
                <div className="flex items-center gap-3">{exitBtn}</div>
              </motion.div>
            )}

            {stage === 'indeciso' && (
              <motion.div
                key="indeciso"
                className="grid gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.16 } }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
              >
                <p className="m-0 max-w-[40ch] text-lg font-bold leading-snug">
                  Sem pressa. O debate das chapas é dia 24/11, às 18h.
                </p>
                <ul className="m-0 grid list-none gap-2.5 p-0">
                  <li>
                    <button
                      type="button"
                      className={actionBtn}
                      onClick={() => {
                        downloadElectionCalendarReminder('debate');
                        setDebateSaved(true);
                      }}
                    >
                      <i className={`bi ${debateSaved ? 'bi-check2' : 'bi-calendar-plus'} text-lg text-primary`} aria-hidden="true" />
                      {debateSaved ? 'Lembrete baixado' : 'Baixar lembrete do debate'}
                    </button>
                  </li>
                  <li>
                    <button type="button" className={actionBtn} onClick={onPropostas}>
                      <i className="bi bi-card-checklist text-lg text-primary" aria-hidden="true" />
                      Ver as 14 propostas
                    </button>
                  </li>
                </ul>
                <div className="flex items-center gap-3">
                  <BackButton onClick={() => setStage('ask')} />
                  {exitBtn}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────── A moldura de apoio ───────────────────────── */

const MOLDURA_FUNDO: Record<string, string> = { roxo: '#5B2A85', petroleo: '#266264', broto: '#6DB33F', fruto: '#FFC83D', papel: '#FFFFFF', tinta: '#1F1F1F' };
const MOLDURA_ESCURA = new Set(['roxo', 'petroleo', 'tinta']);

/**
 * A moldura de apoio, dentro do tour: a mesma ferramenta de /chapa-semente/moldura
 * (src/scripts/molduraDeApoio.ts), só com a moldura redonda de perfil. Só chega aqui quem declarou
 * voto, e a foto da carteirinha já vem no lugar. As molduras aparecem quando há foto.
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

  return (
    <div className={screenPad}>
      <div
        ref={raizRef}
        data-moldura
        data-moldura-perfil="substituir"
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
          <h2 id="semente-tour-heading" ref={headingRef} tabIndex={-1} className={`${h2Cls} text-[clamp(1.7rem,5.4vw,3rem)]`}>
            Sua <MarkerWord onColor className="text-[1.1em] tracking-normal">cara</MarkerWord> na campanha.
          </h2>
          <p className="m-0 text-base leading-snug">A foto não sai do seu celular.</p>

          <div className="flex flex-wrap items-center gap-2.5">
            <button type="button" data-moldura-baixar disabled hidden={!temFoto} className={`${btnAccent} h-[52px] px-5 text-sm`}>
              <i className="bi bi-download" aria-hidden="true" />
              Baixar
            </button>
            <button type="button" data-moldura-postar disabled hidden={!temFoto} className={`${btnOutlineLight} h-[52px] px-5 text-sm`}>
              <i className="bi bi-share" aria-hidden="true" />
              Postar
            </button>
            <label className={`${temFoto ? btnOutlineLight : btnAccent} h-[52px] cursor-pointer px-5 text-sm has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-white has-[:focus-visible]:outline-offset-2`}>
              <i className="bi bi-camera" aria-hidden="true" />
              {temFoto ? 'Trocar' : 'Escolher minha foto'}
              <input type="file" accept="image/*" className="sr-only" data-moldura-foto />
            </label>
          </div>

          <fieldset className="m-0 border-0 p-0" hidden={!temFoto}>
            <legend className="mb-2 p-0 text-sm font-bold uppercase tracking-[0.04em]">Escolha a moldura</legend>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {molduras.molduras.map((m, i) => (
                <label
                  key={m.id}
                  style={{ background: MOLDURA_FUNDO[m.cor] }}
                  className="grid min-h-[52px] cursor-pointer place-items-center rounded-[16px_5px_16px_5px] border-3 border-foreground px-2 py-1.5 text-center shadow-sm transition-[translate,box-shadow] duration-(--duration-press) has-[:checked]:translate-x-0.5 has-[:checked]:translate-y-0.5 has-[:checked]:shadow-none has-[:checked]:outline-4 has-[:checked]:outline-offset-2 has-[:checked]:outline-white has-[:focus-visible]:outline-4 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent"
                >
                  <input type="radio" name="moldura" value={m.id} defaultChecked={i === 0} className="sr-only" />
                  <span className={`cagp-grito cagp-grito--sm justify-center [animation:none] ${MOLDURA_ESCURA.has(m.cor) ? 'is-on-color' : ''}`} style={{ ['--grito' as string]: '1.0625rem' }}>
                    {m.linhas.join(' ')}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {falhou && !temFoto && (
            <p className="m-0 text-sm font-bold leading-snug text-white" role="status">
              A moldura não carregou agora. Ela também fica na aba Chapa 2.
            </p>
          )}

          {/* A saída fica sempre à vista: no celular é uma barra presa ao pé da tela. */}
          <div className="sticky bottom-0 z-10 -mx-4 -mb-4 flex items-center gap-3 border-t-3 border-foreground bg-primary px-4 pt-3 pb-[max(16px,env(safe-area-inset-bottom))] sm:-mx-8 sm:px-8 md:static md:m-0 md:border-0 md:bg-transparent md:p-0">
            <BackButton onClick={onBack} />
            <button type="button" onClick={onFinish} className={`${btnOutlineLight} h-[52px] flex-1 px-4 text-sm uppercase leading-tight tracking-[0.04em] md:flex-none md:px-5`}>
              Ir pro site
              <i className="bi bi-arrow-right" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SementeTour;
