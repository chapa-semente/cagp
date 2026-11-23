// src/components/features/semente/SementeTour.tsx — Tour Reta Final da Chapa 2 · Semente (19/11/2026).
//
// Substitui o antigo fluxo de vídeo + 12 telas por um briefing de 3 telas voltado às propostas
// consolidadas e ao Plano de Execução:
//   1. Plano em 15 segundos (9/14 a R$ 0, 25% FUMP na calourada, Plano B) + saída real em 1 toque.
//   2. Momento do curso -> as 3 propostas consolidadas com maior impacto nessa fase (custo, 1ª data, link).
//   3. Debate 24/11 e votação 25–26/11 (apoiador -> moldura opcional / agenda / WhatsApp; indeciso -> Plano / PDF 1 pág / debate).
//   4. Moldura de apoio (só abre se quem apoia clicar em "Fazer minha moldura de apoio").
//
// Deep-links (/propostas/*, /chapa-semente/plano, /chapa-semente/debate, /doc/*, /documentos*, /emergencia) abrem sem
// este modal (BaseLayout.astro). Toda tela oferece saída em 1 toque ("Ir pro site" / Esc).

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MotionConfig, motion } from 'motion/react';
import { asset, route } from '@/lib/paths';
import { easeOutExpo } from '@/lib/motion';
import { MarkerWord } from '@/components/ui/marker-word';
import { GritoDeVoto } from '@/components/ui/grito-de-voto';
import { ANEIS, FRASES, GRUPOS_DE_ANEIS, GRUPOS_DE_FRASES, amostraDoAnel, temGenero } from '@/lib/molduras';
import '@/styles/moldura.css';
import { getVaultItem, setVaultItem, type UserRole } from '@/lib/storage/studentVault';
import {
  canTriggerInstallPrompt,
  downloadElectionCalendarReminder,
  isAndroid,
  isIOS,
  isStandalone,
  onInstallPromptChange,
  triggerInstallPrompt,
} from '@/lib/pwa/pwaManager';
import {
  SEMENTE_TOUR_KEY,
  TOUR_PEOPLE_IN_CHAPA_ORDER,
  TOUR_PROFILES,
  TOUR_PROPOSTAS_POR_PERFIL,
  TOUR_SEQUENCIA,
  getTourPerson,
  getTourShareUrl,
  loadSementeTour,
  saveSementeTour,
  tourVistoNestaVersao,
  type SementeTourState,
  type TourLeaderId,
  type TourPerson,
} from '@/lib/sementeTour';
import { PROPOSTA_STOPS } from '@/lib/propostasTour';
import { PLANO_PDF_RESUMO, resumoExecucaoDaProposta } from '@/lib/planoExecucao';
import { CHAPA_ROTULO, DEBATE_DATA, DEBATE_HORA } from '@/lib/chapaSementeData';
import { CreditoDosDesenhos } from './CreditoDosDesenhos';

const AdesivoChapa = React.lazy(() => import('./DesenhosDaChapa').then((m) => ({ default: m.AdesivoChapa })));

type ScreenKind = 'resumo' | 'perfil' | 'final' | 'moldura';

const SCREENS: readonly ScreenKind[] = ['resumo', 'perfil', 'final', 'moldura'];
const TOTAL_PEOPLE = TOUR_PEOPLE_IN_CHAPA_ORDER.length;
const PURPLE = '#5B2A85';
const TEAL = '#266264';

function screenColor(kind: ScreenKind): string {
  return kind === 'perfil' ? TEAL : PURPLE;
}

function readSavedRole(): UserRole | undefined {
  try {
    const raw = localStorage.getItem('cagp_user_role_v1');
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    if (parsed === 'calouro' || parsed === 'veterano' || parsed === 'formando' || parsed === 'ingressar') {
      return parsed;
    }
  } catch {
    // ignore storage errors
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Peças visuais
// ---------------------------------------------------------------------------

const StepProgress: React.FC<{ current: number }> = ({ current }) => (
  <ol className="flex h-3 items-center gap-1.5 m-0 p-0 list-none" aria-label={`Etapa ${current + 1} de 3`}>
    {[0, 1, 2].map((i) => (
      <li
        key={i}
        aria-hidden="true"
        className={`h-full flex-1 rounded-full border-2 border-foreground ${
          i < current ? 'bg-white' : i === current ? 'bg-accent' : 'bg-transparent border-white'
        }`}
      />
    ))}
  </ol>
);

const GrowThumb: React.FC<{ person: TourPerson; delay?: number }> = ({ person, delay = 0 }) => (
  <motion.img
    src={person.thumb}
    alt={person.leader.name}
    decoding="async"
    draggable={false}
    initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
    animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    transition={{ duration: 0.45, delay, ease: easeOutExpo }}
    style={{ objectPosition: person.position }}
    className="block w-full h-full object-cover select-none"
  />
);

const Rostos: React.FC<{ className?: string }> = ({ className = '' }) => (
  <ul className={`m-0 flex list-none flex-wrap gap-1.5 p-0 ${className}`} aria-label={`As ${TOTAL_PEOPLE} pessoas da Chapa Semente`}>
    {TOUR_PEOPLE_IN_CHAPA_ORDER.map((p, i) => (
      <li key={p.leader.id} className="h-10 w-10 overflow-hidden rounded-[30%_10%_30%_10%] border-2 border-foreground bg-muted-foreground sm:h-11 sm:w-11">
        <GrowThumb person={p} delay={0.03 + i * 0.025} />
      </li>
    ))}
  </ul>
);

const btnBase =
  'inline-flex items-center justify-center gap-2 border-3 border-foreground font-heading font-bold select-none cursor-pointer no-underline ' +
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
  retornando?: boolean;
}

export const SementeTour: React.FC = () => {
  const [state, setState] = useState<TourRuntime | null>(null);
  const [vp, setVp] = useState({ w: 0, h: 0 });
  const [closing, setClosing] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const open = state?.status === 'active';
  const index = state ? Math.max(0, Math.min(state.index, SCREENS.length - 1)) : 0;
  const screenKind: ScreenKind = SCREENS[index] ?? 'resumo';

  useEffect(() => {
    (window as unknown as { __cagpTourMounted?: boolean }).__cagpTourMounted = true;
    const saved = loadSementeTour() as TourRuntime | null;
    if (tourVistoNestaVersao(saved)) {
      document.documentElement.removeAttribute('data-semente-tour');
      setState(saved);
      return;
    }
    const pendingClick = Boolean((window as unknown as { __cagpSementeTourPending?: number }).__cagpSementeTourPending);
    if (!pendingClick && Date.now() > Date.parse('2026-11-26T22:30:00-03:00')) {
      document.documentElement.removeAttribute('data-semente-tour');
      return;
    }
    const emAppInstalado = isStandalone();
    const retornando = Boolean(saved?.status === 'done' || saved?.peloApp || emAppInstalado);
    const fresh: TourRuntime = {
      status: 'active',
      index: 0,
      profile: saved?.profile ?? readSavedRole(),
      v: TOUR_SEQUENCIA,
      peloApp: saved?.peloApp || emAppInstalado || undefined,
      retornando,
      returnTo: window.location.pathname + window.location.search + window.location.hash,
    };
    setState(
      saved && saved.v === TOUR_SEQUENCIA
        ? { ...saved, retornando: saved.retornando ?? retornando }
        : fresh,
    );
  }, []);

  useEffect(() => {
    const start = () => {
      setClosing(false);
      setState({
        status: 'active',
        index: 0,
        profile: readSavedRole(),
        v: TOUR_SEQUENCIA,
        replay: true,
        returnTo: window.location.pathname + window.location.search + window.location.hash,
      });
    };
    window.addEventListener('cagp:start-semente-tour', start);
    const w = window as unknown as { __cagpSementeTourPending?: number };
    if (w.__cagpSementeTourPending && Date.now() - w.__cagpSementeTourPending < 10000) start();
    w.__cagpSementeTourPending = undefined;
    return () => window.removeEventListener('cagp:start-semente-tour', start);
  }, []);

  useEffect(() => {
    if (state) saveSementeTour(state);
  }, [state]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== SEMENTE_TOUR_KEY) return;
      const saved = loadSementeTour() as TourRuntime | null;
      if (tourVistoNestaVersao(saved)) {
        setState((s) => (s && s.status === 'active' && !s.replay ? saved : s));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useLayoutEffect(() => {
    const measure = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

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

  const go = useCallback((delta: number) => {
    setState((s) => {
      if (!s) return s;
      const nextIndex = Math.max(0, Math.min(SCREENS.length - 1, s.index + delta));
      return { ...s, index: nextIndex };
    });
  }, []);

  const chooseProfile = (role: UserRole) => {
    setVaultItem('cagp_user_role_v1', role);
    setState((s) => (s ? { ...s, profile: role } : s));
  };

  const clearProfile = () => {
    setState((s) => (s ? { ...s, profile: undefined } : s));
  };

  const finish = useCallback(() => {
    setClosing(true);
    setVaultItem('cagp_onboarding_completed_v1', true);
    setState((s) => {
      if (s) {
        saveSementeTour({
          status: 'done',
          v: TOUR_SEQUENCIA,
          index: 0,
          profile: s.profile,
          full: s.full,
          peloApp: s.peloApp,
        });
      }
      return s;
    });
    window.setTimeout(() => {
      setState((s) => ({
        status: 'done',
        v: TOUR_SEQUENCIA,
        index: 0,
        profile: s?.profile,
        full: s?.full,
        peloApp: s?.peloApp,
      }));
      setClosing(false);
      window.dispatchEvent(new CustomEvent('cagp:semente-tour-done'));
    }, 360);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => headingRef.current?.focus({ preventScroll: true }), 140);
    return () => window.clearTimeout(t);
  }, [open, index]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        finish();
        return;
      }
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' && index < 2) {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft' && index > 0 && index <= 2) {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, index, go, finish]);

  if (!open) return null;

  const panelColor = screenColor(screenKind);
  const panelClip = closing ? `inset(${vp.h || 900}px 0px 0px 0px round 0px)` : 'inset(0px 0px 0px 0px round 0px)';

  const liveText =
    screenKind === 'resumo'
      ? 'O plano da Chapa 2 em 15 segundos. Etapa 1 de 3.'
      : screenKind === 'perfil'
        ? 'O que muda no seu momento do curso. Etapa 2 de 3.'
        : screenKind === 'final'
          ? 'Debate dia 24 de novembro e votação em 25 e 26 de novembro. Etapa 3 de 3.'
          : 'Sua foto com a moldura da Chapa 2.';

  return (
    <MotionConfig reducedMotion="user">
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

        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          initial={false}
          animate={{ clipPath: panelClip, backgroundColor: panelColor }}
          transition={{ duration: 0.42, ease: easeOutExpo }}
        />

        {!closing && (
          <motion.div
            key={screenKind}
            className="absolute inset-0 text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: easeOutExpo }}
          >
            {screenKind === 'resumo' && (
              <PlanoResumoScreen
                headingRef={headingRef}
                retornando={Boolean(state?.retornando)}
                onNext={() => go(1)}
                onExit={finish}
              />
            )}
            {screenKind === 'perfil' && (
              <PerfilPropostasScreen
                headingRef={headingRef}
                profile={state?.profile}
                onChoose={chooseProfile}
                onResetProfile={clearProfile}
                onNext={() => go(1)}
                onBack={() => go(-1)}
                onExit={finish}
              />
            )}
            {screenKind === 'final' && (
              <FinalScreen
                headingRef={headingRef}
                profile={state?.profile}
                onBack={() => go(-1)}
                onMoldura={() => go(1)}
                onExit={finish}
              />
            )}
            {screenKind === 'moldura' && (
              <MolduraScreen headingRef={headingRef} onBack={() => go(-1)} onFinish={finish} />
            )}
          </motion.div>
        )}

        {!closing && (
          <button
            type="button"
            onClick={finish}
            className={`${btnOutlineLight} absolute z-20 top-[max(12px,env(safe-area-inset-top))] right-3 h-11 gap-1.5 px-2.5 text-xs uppercase tracking-[0.04em] shadow-sm sm:right-6 sm:gap-2 sm:px-3.5`}
            aria-label="Ir pro site e fechar esta apresentação"
          >
            <span>Ir pro site</span>
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        )}
      </div>
    </MotionConfig>
  );
};

// ---------------------------------------------------------------------------
// Telas (3 telas + moldura opcional)
// ---------------------------------------------------------------------------

type HeadingRef = React.RefObject<HTMLHeadingElement | null>;

const screenPadBase = 'absolute inset-0 overflow-y-auto overscroll-contain px-4 sm:px-8 pb-[max(20px,env(safe-area-inset-bottom))]';
const screenPadTop = `${screenPadBase} pt-[max(14px,env(safe-area-inset-top))]`;
const h2Cls = 'm-0 font-heading font-bold leading-[1.08] tracking-[-0.02em] [text-wrap:balance] focus:outline-none focus-visible:outline-none';

/* ───────────────────────── Tela 1: O Plano em 15s ───────────────────────── */

const RECIBOS_TELA_1: { icon: string; cor: string; titulo: string; texto: string }[] = [
  {
    icon: 'bi-cash-coin',
    cor: 'bg-primary text-white',
    titulo: '9 de 14 custam R$ 0,00',
    texto: 'Contas reais no portal até 31/01, reunião aberta todo mês e 1º boletim em 15/03.',
  },
  {
    icon: 'bi-percent',
    cor: 'bg-secondary text-white',
    titulo: '25% de desconto FUMP na calourada',
    texto: 'Em até 60 ingressos por festa, 10 por lote. Quem ainda não tem nível comprova com cota de renda ou CadÚnico.',
  },
  {
    icon: 'bi-signpost-split',
    cor: 'bg-[#8A4B2A] text-white',
    titulo: 'Plano B por escrito',
    texto: 'Cada proposta diz quem responde, como conferir e o que fazer se algo travar.',
  },
];

const PlanoResumoScreen: React.FC<{ headingRef: HeadingRef; retornando?: boolean; onNext: () => void; onExit: () => void }> = ({
  headingRef,
  retornando = false,
  onNext,
  onExit,
}) => (
  <div className={screenPadTop}>
    <div className="mx-auto flex min-h-full max-w-[780px] flex-col justify-between gap-2.5 py-0.5 sm:gap-3.5 sm:py-1">
      <div className="flex min-h-11 items-center gap-2 sm:gap-3 pr-[148px] sm:pr-[164px]">
        <img src={asset('/logos/semente/semente-simbolo-branco.webp')} alt="" aria-hidden="true" className="h-7 w-auto shrink-0" />
        <div className="min-w-0 flex-1">
          <StepProgress current={0} />
        </div>
        <span className="-rotate-2 shrink-0 rounded-md border-2 border-foreground bg-[#FFC83D] px-2 py-1 text-xs font-bold uppercase tracking-[0.04em] tabular-nums text-foreground shadow-[2px_2px_0_0_#1F1F1F]">
          1 de 3
        </span>
      </div>

      <div className="my-auto grid gap-2 sm:gap-3">
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <img
            src={asset('/logos/semente/semente-horizontal-branco.webp')}
            alt="Chapa Gestão Pública Semente"
            width="768"
            height="229"
            className="h-7 w-auto sm:h-10"
          />
          <span className="rounded-md border-2 border-foreground bg-white px-2.5 py-1 font-heading text-xs font-bold uppercase tracking-[0.04em] text-foreground">
            {retornando ? 'Novidade · Plano no ar' : `${CHAPA_ROTULO} · Reta Final`}
          </span>
        </div>

        <h2 id="semente-tour-heading" ref={headingRef} tabIndex={-1} className={`${h2Cls} text-[clamp(1.45rem,4.8vw,2.65rem)]`}>
          14 propostas com{' '}
          <span className="whitespace-nowrap">
            <MarkerWord onColor className="text-[1.08em] tracking-normal">
              data
            </MarkerWord>
            ,
          </span>{' '}
          custo e plano B.
        </h2>

        <p className="m-0 max-w-[54ch] text-sm leading-snug text-white sm:text-base">
          {retornando
            ? 'Você já conhece o site da Semente. Agora publicamos o plano completo das 14 propostas — com data, custo e plano B.'
            : 'O site do curso já está no ar. Agora veja como cada proposta sai do papel entre dezembro de 2026 e outubro de 2027.'}
        </p>

        <ul className="m-0 grid list-none gap-1.5 p-0 sm:gap-2">
          {RECIBOS_TELA_1.map((item) => (
            <li
              key={item.titulo}
              className="flex items-start gap-2.5 rounded-[12px] border-3 border-foreground bg-white px-3 py-1.5 text-foreground shadow-[4px_4px_0_0_#1F1F1F] sm:gap-3 sm:py-2"
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[14px_4px_14px_4px] border-2 border-foreground sm:h-9 sm:w-9 ${item.cor}`}>
                <i className={`bi ${item.icon} text-base`} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-heading text-base font-bold leading-tight tabular-nums">{item.titulo}</span>
                <span className="block text-sm leading-snug text-content-secondary">{item.texto}</span>
              </span>
            </li>
          ))}
        </ul>

        {Date.now() <= Date.parse('2026-11-24T23:59:59-03:00') && (
          <a
            href={route('/chapa-semente/debate')}
            onClick={onExit}
            data-faixa-debate
            className="group grid gap-1.5 rounded-[16px] border-3 border-foreground bg-[#FFC83D] px-3 py-2 text-foreground no-underline shadow-[4px_4px_0_0_#FE8812,7px_7px_0_0_#1F1F1F] transition-[transform,box-shadow] duration-150 hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_0_#FE8812,9px_9px_0_0_#1F1F1F] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:gap-2 sm:px-3.5 sm:py-2.5"
          >
            <span className="flex items-center justify-between gap-2">
              <span className="-rotate-1 inline-flex items-center gap-1.5 rounded-md border-2 border-foreground bg-primary px-2 py-0.5 font-heading text-xs font-bold uppercase tracking-[0.04em] text-white shadow-[2px_2px_0_0_#1F1F1F]">
                <i className="bi bi-bar-chart-line" aria-hidden="true" />
                Antes do debate · 24/11
              </span>
              <span className="hidden sm:inline font-heading text-xs font-bold uppercase tracking-[0.04em] text-foreground">
                Tudo com fonte
              </span>
            </span>
            <span className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="min-w-0 grid gap-0.5">
                <span className="block font-heading text-base font-bold leading-tight text-foreground sm:text-lg">
                  O que a gestão entregou — e o que ficou no papel?
                </span>
                <span className="block text-sm leading-snug text-foreground tabular-nums">
                  14 de 33 promessas, nova carta sem datas e quem recebeu na dívida de R$ 4.505.
                </span>
              </span>
              <span className="inline-flex min-h-[40px] shrink-0 items-center justify-center gap-1.5 self-start sm:self-center rounded-[18px_5px_18px_5px] border-2 border-foreground bg-primary px-3.5 py-2 font-heading text-xs font-bold uppercase tracking-[0.04em] text-white shadow-[2px_2px_0_0_#1F1F1F] group-hover:bg-primary-hover">
                Ver análise
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </span>
            </span>
          </a>
        )}
      </div>

      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
        <button type="button" onClick={onNext} className={`${btnAccent} min-h-[48px] w-full px-5 py-2.5 text-sm sm:min-h-[52px] sm:w-auto sm:px-6`}>
          Ver o que muda pra mim
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </button>
        <button type="button" onClick={onExit} className={`${linkLight} justify-center px-2`}>
          Ir direto pro site
        </button>
      </div>
    </div>
  </div>
);

/* ───────────────────────── Tela 2: Momento → 3 propostas consolidadas ───────────────────────── */

const PerfilPropostasScreen: React.FC<{
  headingRef: HeadingRef;
  profile?: UserRole;
  onChoose: (r: UserRole) => void;
  onResetProfile: () => void;
  onNext: () => void;
  onBack: () => void;
  onExit: () => void;
}> = ({ headingRef, profile, onChoose, onResetProfile, onNext, onBack, onExit }) => {
  const selecionadas = profile ? TOUR_PROPOSTAS_POR_PERFIL[profile] : null;
  const perfilMeta = profile ? TOUR_PROFILES.find((p) => p.role === profile) : undefined;

  return (
    <div className={screenPadTop}>
      <div className="mx-auto flex min-h-full max-w-[820px] flex-col justify-between gap-5 py-1">
        <div className="flex min-h-11 items-center gap-2 sm:gap-3 pr-[148px] sm:pr-[164px]">
          <img src={asset('/logos/semente/semente-simbolo-branco.webp')} alt="" aria-hidden="true" className="h-7 w-auto shrink-0" />
          <div className="min-w-0 flex-1">
            <StepProgress current={1} />
          </div>
          <span className="-rotate-2 shrink-0 rounded-md border-2 border-foreground bg-[#FFC83D] px-2 py-1 text-xs font-bold uppercase tracking-[0.04em] tabular-nums text-foreground shadow-[2px_2px_0_0_#1F1F1F]">
            2 de 3
          </span>
        </div>

        <div className="my-auto grid gap-4">
          {!selecionadas ? (
            <>
              <h2 id="semente-tour-heading" ref={headingRef} tabIndex={-1} className={`${h2Cls} text-[clamp(1.6rem,5.4vw,2.75rem)]`}>
                Em que <MarkerWord onColor className="text-[1.08em] tracking-normal">momento</MarkerWord> do curso você está?
              </h2>
              <p className="m-0 max-w-[52ch] text-base leading-snug text-white">
                Mostramos as 3 propostas do plano com entrega direta para essa etapa (com data, custo e responsável).
              </p>
              <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
                {TOUR_PROFILES.map((opt) => (
                  <li key={opt.role}>
                    <button
                      type="button"
                      onClick={() => onChoose(opt.role)}
                      className={`${btnOutlineLight} min-h-[72px] w-full justify-start gap-4 px-4 py-3 text-left`}
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px_4px_14px_4px] border-2 border-foreground bg-primary text-white">
                        <i className={`bi ${opt.icon} text-xl`} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-base font-bold leading-tight">{opt.label}</span>
                        <span className="block text-sm font-normal text-content-secondary">{opt.hint}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-md border-2 border-foreground bg-white px-2.5 py-1 font-heading text-xs font-bold uppercase tracking-[0.04em] text-foreground">
                  {perfilMeta?.label}
                </span>
                <button type="button" onClick={onResetProfile} className={`${linkLight} text-sm`}>
                  Trocar momento
                </button>
              </div>
              <h2 id="semente-tour-heading" ref={headingRef} tabIndex={-1} className={`${h2Cls} text-[clamp(1.5rem,5vw,2.5rem)]`}>
                3 entregas com <MarkerWord onColor className="text-[1.08em] tracking-normal">recibo</MarkerWord> pra você.
              </h2>

              <ul className="m-0 grid list-none gap-3 p-0">
                {selecionadas.map((id) => {
                  const resumo = resumoExecucaoDaProposta(id);
                  const stop = PROPOSTA_STOPS.find((p) => p.id === id);
                  if (!resumo || !stop) return null;
                  const person = getTourPerson(stop.leaderId as TourLeaderId);
                  return (
                    <li
                      key={id}
                      className="grid gap-2 rounded-[14px] border-3 border-foreground bg-white p-3.5 text-foreground shadow-[4px_4px_0_0_#1F1F1F]"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md border-2 border-foreground bg-primary px-1.5 font-heading text-xs font-bold tabular-nums text-white">
                            {id}
                          </span>
                          <span
                            className={`rounded-md border-2 border-foreground px-2 py-0.5 font-heading text-xs font-bold uppercase tracking-[0.04em] tabular-nums ${
                              resumo.gratis ? 'bg-primary text-white' : 'bg-muted text-foreground'
                            }`}
                          >
                            {resumo.custo}
                          </span>
                          <span className="rounded-md border-2 border-foreground bg-accent px-2 py-0.5 font-heading text-xs font-bold uppercase tracking-[0.04em] text-foreground">
                            {resumo.selo}
                          </span>
                        </div>
                        <a
                          href={route(`/propostas/${id}#plano`)}
                          onClick={onExit}
                          className="inline-flex min-h-[44px] items-center gap-1 font-heading text-xs font-bold uppercase tracking-[0.03em] text-primary underline underline-offset-[0.22em]"
                        >
                          Abrir plano
                          <i className="bi bi-arrow-up-right" aria-hidden="true" />
                        </a>
                      </div>

                      <p className="m-0 font-heading text-base font-bold leading-snug text-foreground">
                        {resumo.tituloPlano}
                      </p>

                      <div className="flex items-center gap-2.5 text-sm leading-snug text-content-secondary">
                        <img
                          src={person.thumb}
                          alt=""
                          width={32}
                          height={32}
                          style={{ objectPosition: person.position }}
                          className="h-8 w-8 shrink-0 rounded-[10px_3px_10px_3px] border-2 border-foreground object-cover"
                        />
                        <p className="m-0 tabular-nums">
                          <strong className="text-foreground">{resumo.primeiraData}:</strong> {resumo.primeiraEntrega}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <BackButton onClick={onBack} />
          <button type="button" onClick={onNext} className={`${btnAccent} h-[52px] flex-1 px-5 text-sm sm:flex-none`}>
            Debate e votação
            <i className="bi bi-arrow-right" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────── Tela 3: Debate 24/11 & Votação 25–26/11 ───────────────────────── */

const FinalScreen: React.FC<{
  headingRef: HeadingRef;
  profile?: UserRole;
  onBack: () => void;
  onMoldura: () => void;
  onExit: () => void;
}> = ({ headingRef, profile, onBack, onMoldura, onExit }) => {
  const [stage, setStage] = useState<'ask' | 'apoio' | 'indeciso'>(() => {
    const a = getVaultItem('cagp_election_activation_v1');
    return a?.completed && a?.sementeSupporter ? 'apoio' : 'ask';
  });
  const [calendarSaved, setCalendarSaved] = useState(false);
  const [debateSaved, setDebateSaved] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [showInstallHint, setShowInstallHint] = useState(false);
  const [installed, setInstalled] = useState(false);
  const ios = typeof window !== 'undefined' && isIOS() && !isStandalone();
  const android = typeof window !== 'undefined' && isAndroid() && !isStandalone();
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
      } else {
        setShowInstallHint(true);
      }
    } else {
      setShowInstallHint((v) => !v);
    }
  };

  const actionBtn = `${btnOutlineLight} min-h-[48px] w-full justify-start px-4 text-left text-base`;
  const exitBtn = (
    <button type="button" onClick={onExit} className={`${btnAccent} h-[52px] flex-1 px-5 text-sm`}>
      Ir pro site
      <i className="bi bi-arrow-right" aria-hidden="true" />
    </button>
  );

  return (
    <div className={screenPadTop}>
      <div className="mx-auto flex min-h-full max-w-[1040px] flex-col justify-center gap-6 py-2">
        <div className="flex min-h-11 items-center gap-2 sm:gap-3 pr-[148px] sm:pr-[164px]">
          <img src={asset('/logos/semente/semente-simbolo-branco.webp')} alt="" aria-hidden="true" className="h-7 w-auto shrink-0" />
          <div className="min-w-0 flex-1">
            <StepProgress current={2} />
          </div>
          <span className="-rotate-2 shrink-0 rounded-md border-2 border-foreground bg-[#FFC83D] px-2 py-1 text-xs font-bold uppercase tracking-[0.04em] tabular-nums text-foreground shadow-[2px_2px_0_0_#1F1F1F]">
            3 de 3
          </span>
        </div>

        <div className="my-auto grid gap-6 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:items-center md:gap-12">
          <div className="grid gap-4">
            {stage === 'ask' && (
              <React.Suspense fallback={<span className="block h-[84px]" aria-hidden="true" />}>
                <AdesivoChapa className="-mb-2 block h-[84px] w-auto -rotate-3 justify-self-start sm:h-[112px]" />
              </React.Suspense>
            )}
            {stage === 'ask' && <CreditoDosDesenhos className="-mt-2" />}
            <Rostos />
            <h2 id="semente-tour-heading" ref={headingRef} tabIndex={-1} className={`${h2Cls} text-[clamp(1.75rem,5.6vw,3.25rem)]`}>
              {canVote ? (
                <>
                  <span className="block tabular-nums">25 e 26 de novembro:</span>
                  <GritoDeVoto as="span" onColor duasLinhas tamanho="lg" className="mt-2" />
                </>
              ) : (
                <>
                  Você ainda não vota, mas quem vota te{' '}
                  <MarkerWord onColor className="text-[1.1em] tracking-normal">escuta</MarkerWord>.
                </>
              )}
            </h2>
            {canVote && (
              <p className="m-0 max-w-[44ch] text-base leading-snug tabular-nums sm:text-lg">
                Debate das chapas em {DEBATE_DATA}, às {DEBATE_HORA}. Votação em 25 e 26/11, das 17h às 22h30, na sala do CAGP (FAFICH). Um X em uma chapa só.
              </p>
            )}
          </div>

          <div className="min-h-[200px]">
            {stage === 'ask' && (
              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <BackButton onClick={onBack} />
                  <button
                    type="button"
                    onClick={() => {
                      record({ supporter: true });
                      setStage('apoio');
                    }}
                    className={`${btnAccent} h-[54px] flex-1 px-5 text-sm`}
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
                  className={`${btnOutlineLight} min-h-[48px] w-full px-5 text-sm uppercase tracking-[0.04em]`}
                >
                  {canVote ? 'Ainda estou decidindo' : 'Ir pro site'}
                </button>
              </div>
            )}

            {stage === 'apoio' && (
              <div className="grid gap-4">
                <div className="flex justify-center md:justify-start">
                  <span className="cagp-big-stamp is-semente" role="status">
                    <span className="cagp-big-stamp-title">Semente plantada</span>
                    <span className="cagp-big-stamp-sub">{CHAPA_ROTULO} · 25 e 26/11</span>
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
                      className={actionBtn}
                    >
                      <i className="bi bi-whatsapp text-lg text-success" aria-hidden="true" />
                      Chamar a turma no WhatsApp
                    </a>
                  </li>
                  {(canInstall || ios || android) && !installed && (
                    <li>
                      <button type="button" className={`${actionBtn} h-auto py-2.5`} onClick={handleInstall} aria-expanded={canInstall ? undefined : showInstallHint}>
                        <i className="bi bi-phone text-lg text-primary" aria-hidden="true" />
                        <span className="grid gap-0.5">
                          <span>Pôr o site na tela inicial</span>
                          <span className="text-sm font-normal normal-case tracking-normal text-content-secondary">
                            {ios ? 'Assim o iPhone não apaga suas horas, notas e foto.' : 'Abre direto, como um app, e funciona sem sinal.'}
                          </span>
                        </span>
                      </button>
                      {showInstallHint && (
                        <p className="m-0 mt-2 rounded-[12px] bg-white p-3 text-sm text-foreground">
                          {ios
                            ? 'Abra este site no Safari, toque em Compartilhar e depois em Adicionar à Tela de Início. Pelo navegador do WhatsApp ou Instagram essa opção não aparece.'
                            : 'Toque nos três pontinhos do navegador e em Adicionar à tela inicial. Veio pelo WhatsApp ou Instagram? Escolha antes Abrir no Chrome.'}
                        </p>
                      )}
                    </li>
                  )}
                </ul>
                <div className="flex items-center gap-3">
                  <BackButton onClick={() => setStage('ask')} />
                  {exitBtn}
                </div>
              </div>
            )}

            {stage === 'indeciso' && (
              <div className="grid gap-4">
                <p className="m-0 max-w-[42ch] text-base font-bold leading-snug sm:text-lg">
                  Sem pressa. Veja os dados com fonte antes do debate de {DEBATE_DATA}, às {DEBATE_HORA}:
                </p>
                <ul className="m-0 grid list-none gap-2.5 p-0">
                  {Date.now() <= Date.parse('2026-11-24T23:59:59-03:00') && (
                    <li data-faixa-debate>
                      <a
                        href={route('/chapa-semente/debate')}
                        onClick={onExit}
                        className="group flex items-center gap-3 rounded-[14px] border-3 border-foreground bg-[#FFC83D] px-4 py-3 text-foreground no-underline shadow-[4px_4px_0_0_#1F1F1F] transition-[transform,box-shadow] duration-150 hover:-translate-x-px hover:-translate-y-px hover:shadow-[6px_6px_0_0_#1F1F1F] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px_4px_14px_4px] border-2 border-foreground bg-primary text-white">
                          <i className="bi bi-bar-chart-line text-lg" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1 grid gap-0.5">
                          <span className="block font-heading text-base font-bold leading-tight text-foreground">
                            Ver análise da gestão atual
                          </span>
                          <span className="block text-sm leading-snug text-foreground tabular-nums">
                            14 de 33 promessas, nova carta sem datas e a dívida de R$ 4.505 — tudo com fonte.
                          </span>
                        </span>
                        <i className="bi bi-arrow-right text-lg text-foreground shrink-0" aria-hidden="true" />
                      </a>
                    </li>
                  )}
                  <li>
                    <a href={route('/chapa-semente/plano')} onClick={onExit} className={actionBtn}>
                      <i className="bi bi-clipboard-check text-lg text-primary" aria-hidden="true" />
                      Abrir o plano de execução (datas, custos e plano B)
                    </a>
                  </li>
                  <li>
                    <a href={asset(PLANO_PDF_RESUMO)} target="_blank" rel="noopener" className={actionBtn}>
                      <i className="bi bi-file-earmark-pdf text-lg text-primary" aria-hidden="true" />
                      Baixar resumo em 1 página (PDF · 260 KB)
                    </a>
                  </li>
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
                      {debateSaved ? 'Lembrete do debate baixado' : 'Baixar lembrete do debate (.ics)'}
                    </button>
                  </li>
                </ul>
                <div className="flex items-center gap-3">
                  <BackButton onClick={() => setStage('ask')} />
                  {exitBtn}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────── Tela 4 (Opcional): Moldura de apoio ───────────────────────── */

const MOLDURA_FLEXOES = [
  { id: 'o', rotulo: '-o', nome: 'masculino' },
  { id: 'a', rotulo: '-a', nome: 'feminino' },
  { id: 'e', rotulo: '-e', nome: 'neutro' },
];

const MolduraScreen: React.FC<{ headingRef: HeadingRef; onBack: () => void; onFinish: () => void }> = ({
  headingRef,
  onBack,
  onFinish,
}) => {
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
    <div className={screenPadTop}>
      <div
        ref={raizRef}
        data-moldura
        data-moldura-perfil="substituir"
        className="mx-auto flex min-h-full max-w-[1040px] flex-col justify-center gap-5 py-12 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center md:gap-12"
      >
        <div
          className={`grid justify-items-center gap-2 ${
            temFoto
              ? 'sticky top-[calc(max(14px,env(safe-area-inset-top))*-1)] z-10 -mx-4 -mt-4 border-b-3 border-foreground bg-primary px-4 pb-2 pt-[calc(max(14px,env(safe-area-inset-top))+8px)] sm:-mx-8 sm:px-8 md:top-8 md:mx-0 md:mt-0 md:self-start md:border-0 md:bg-transparent md:p-0'
              : ''
          }`}
        >
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
            <label
              className={`${temFoto ? btnOutlineLight : btnAccent} h-[52px] cursor-pointer px-5 text-sm has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-white has-[:focus-visible]:outline-offset-2`}
            >
              <i className="bi bi-camera" aria-hidden="true" />
              {temFoto ? 'Trocar' : 'Escolher minha foto'}
              <input type="file" accept="image/*" className="sr-only" data-moldura-foto />
            </label>
          </div>

          <form className="grid gap-4" hidden={!temFoto} onSubmit={(e) => e.preventDefault()}>
            <fieldset className="m-0 min-w-0 border-0 p-0">
              <legend className="mb-2 p-0 text-sm font-bold uppercase tracking-[0.04em]">Escolha a frase</legend>
              <div className="mo-escolhas is-on-color">
                <div className="mo-abas" role="group" aria-label="Tipo de frase">
                  {GRUPOS_DE_FRASES.map((g, i) => (
                    <button key={g.id} type="button" className="mo-aba" data-moldura-aba={g.id} aria-pressed={i === 0}>
                      {g.nome}
                    </button>
                  ))}
                </div>
                <fieldset className="mo-flexoes" data-moldura-flexoes hidden>
                  <legend>A frase termina em</legend>
                  <div className="sk-seg">
                    <span className="sk-seg-ind" aria-hidden="true" />
                    {MOLDURA_FLEXOES.map((f, i) => (
                      <React.Fragment key={f.id}>
                        <input
                          type="radio"
                          name="flexao"
                          id={`tour-flexao-${f.id}`}
                          value={f.id}
                          defaultChecked={i === 0}
                          aria-label={`Frase no ${f.nome}`}
                        />
                        <label htmlFor={`tour-flexao-${f.id}`}>{f.rotulo}</label>
                      </React.Fragment>
                    ))}
                  </div>
                </fieldset>
                {GRUPOS_DE_FRASES.map((g, i) => (
                  <div key={g.id} className="mo-frases" data-moldura-grupo={g.id} hidden={i > 0}>
                    {FRASES.filter((f) => f.grupo === g.id).map((f) => (
                      <label key={f.id} className="mo-frase">
                        <input type="radio" name="frase" value={f.id} defaultChecked={f.id === FRASES[0].id} className="sr-only" />
                        <span className="cagp-grito" data-moldura-texto={temGenero(f) ? f.id : undefined}>
                          {f.texto}
                        </span>
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="m-0 min-w-0 border-0 p-0">
              <legend className="mb-2 p-0 text-sm font-bold uppercase tracking-[0.04em]">E a cor do anel</legend>
              <div className="mo-escolhas is-on-color">
                {GRUPOS_DE_ANEIS.map((g) => (
                  <div key={g.id} className="mo-aneis-grupo" role="group" aria-label={g.nome}>
                    <p className="mo-aneis-nome">{g.nome}</p>
                    <div className="mo-aneis">
                      {ANEIS.filter((a) => a.grupo === g.id).map((a) => (
                        <label key={a.id} className="mo-anel">
                          <input
                            type="radio"
                            name="anel"
                            value={a.id}
                            defaultChecked={a.id === (FRASES[0].anel ?? ANEIS[0].id)}
                            className="sr-only"
                          />
                          <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: amostraDoAnel(a) }} />
                          <span className="mo-anel-nome">{a.nome}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
          </form>

          {falhou && !temFoto && (
            <p className="m-0 text-sm font-bold leading-snug text-white" role="status">
              A moldura não carregou agora. Ela também fica na aba Chapa 2.
            </p>
          )}

          <div className="sticky bottom-0 z-10 -mx-4 -mb-4 flex items-center gap-3 border-t-3 border-foreground bg-primary px-4 pt-3 pb-[max(16px,env(safe-area-inset-bottom))] sm:-mx-8 sm:px-8 md:static md:m-0 md:border-0 md:bg-transparent md:p-0">
            <BackButton onClick={onBack} />
            <button
              type="button"
              onClick={onFinish}
              className={`${btnOutlineLight} h-[52px] flex-1 px-4 text-sm uppercase leading-tight tracking-[0.04em] md:flex-none md:px-5`}
            >
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
