// src/components/features/semente/PropostasTour.tsx — Tour opcional das 14 propostas.
//
// Mesmo espírito do tour da chapa, mas sem tocar no site: cada proposta é uma tela de cor (os 4 eixos
// viram raiz, broto, planta e fruto), com uma animação vetorial desenhada ali mesmo e a fala da
// diretoria que puxa a proposta. Abre pelo evento START_PROPOSTAS_TOUR; sempre dá para fechar.
// Roteiro: src/lib/propostasTour.ts.
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { asset, route } from '@/lib/paths';
import { celebrateSpring, easeOutExpo } from '@/lib/motion';
import { MarkerWord } from '@/components/ui/marker-word';
import { GritoDeVoto } from '@/components/ui/grito-de-voto';
import { getTourPerson } from '@/lib/sementeTour';
import { CHAPA_ROTULO } from '@/lib/chapaSementeData';
import { PROPOSTA_EIXOS, PROPOSTA_STOPS, START_PROPOSTAS_TOUR, type PropostaArt, type PropostaStop } from '@/lib/propostasTour';

const TOTAL = PROPOSTA_STOPS.length;
const PURPLE = '#5B2A85';
const eixoDe = (id: number) => PROPOSTA_EIXOS[id <= 6 ? 0 : id <= 8 ? 1 : id <= 11 ? 2 : 3];
const primeiraDoEixo = [1, 7, 9, 12];

// ---------------------------------------------------------------------------
// Animações vetoriais: traço que se desenha (D) e forma que brota (Pop)
// ---------------------------------------------------------------------------

const D: React.FC<{ d: string; delay?: number; tint?: string; w?: number }> = ({ d, delay = 0, tint, w = 9 }) => (
  <motion.path
    d={d}
    fill="none"
    stroke={tint ?? 'currentColor'}
    strokeWidth={w}
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ pathLength: { duration: 0.8, delay, ease: easeOutExpo }, opacity: { duration: 0.01, delay } }}
  />
);

const Pop: React.FC<{ children: React.ReactNode; delay?: number; from?: 'center' | 'bottom' | 'left' }> = ({ children, delay = 0, from = 'center' }) => (
  <motion.g
    style={{ transformBox: 'fill-box', transformOrigin: from === 'bottom' ? '50% 100%' : from === 'left' ? '0% 50%' : '50% 50%' }}
    initial={from === 'bottom' ? { scaleY: 0 } : from === 'left' ? { scaleX: 0 } : { scale: 0 }}
    animate={from === 'bottom' ? { scaleY: 1 } : from === 'left' ? { scaleX: 1 } : { scale: 1 }}
    transition={{ ...celebrateSpring, delay }}
  >
    {children}
  </motion.g>
);

const LEAF = 'M0 0c0-22 14-38 38-40 1 24-14 39-38 40z';

function Art({ kind, tint }: { kind: PropostaArt; tint: string }) {
  const ink = 'currentColor';
  switch (kind) {
    case 'contas':
      return (
        <>
          <D d="M28 172h144" />
          <Pop from="bottom" delay={0.25}><rect x="44" y="118" width="30" height="50" rx="5" fill={ink} /></Pop>
          <Pop from="bottom" delay={0.38}><rect x="86" y="84" width="30" height="84" rx="5" fill={ink} /></Pop>
          <Pop from="bottom" delay={0.51}><rect x="128" y="50" width="30" height="118" rx="5" fill={tint} /></Pop>
          <D d="M40 96l42-34 30 14 44-40" delay={0.75} w={7} />
        </>
      );
    case 'reunioes':
      return (
        <>
          <D d="M100 62a38 38 0 1 0 .1 0z" />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
            return (
              <Pop key={i} delay={0.3 + i * 0.09}>
                <circle cx={100 + Math.cos(a) * 68} cy={100 + Math.sin(a) * 68} r="15" fill={i === 0 ? tint : ink} />
              </Pop>
            );
          })}
        </>
      );
    case 'site':
      return (
        <>
          <D d="M64 22h72a12 12 0 0 1 12 12v132a12 12 0 0 1-12 12H64a12 12 0 0 1-12-12V34a12 12 0 0 1 12-12z" />
          <Pop from="left" delay={0.45}><rect x="68" y="52" width="64" height="14" rx="7" fill={ink} /></Pop>
          <Pop from="left" delay={0.57}><rect x="68" y="78" width="44" height="14" rx="7" fill={ink} /></Pop>
          <Pop from="left" delay={0.69}><rect x="68" y="104" width="56" height="14" rx="7" fill={ink} /></Pop>
          <Pop delay={0.95}><path d={LEAF} transform="translate(126 60) scale(1.5)" fill={tint} /></Pop>
        </>
      );
    case 'cnpj':
      return (
        <>
          <D d="M52 24h62l34 34v118H52z" />
          <D d="M114 24v34h34" delay={0.3} w={7} />
          <D d="M70 86h50M70 108h36" delay={0.5} w={7} />
          <motion.g
            style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
            initial={{ scale: 2.2, opacity: 0, rotate: -18 }}
            animate={{ scale: 1, opacity: 1, rotate: -8 }}
            transition={{ ...celebrateSpring, delay: 0.9 }}
          >
            <circle cx="124" cy="142" r="30" fill={tint} />
            <path d="M110 142l10 10 18-20" fill="none" stroke="#1F1F1F" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        </>
      );
    case 'seguranca':
      return (
        <>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const x = 34 + (i % 3) * 46;
            const y = 34 + Math.floor(i / 3) * 70;
            const key = i === 4;
            return (
              <Pop key={i} delay={0.1 + i * 0.09}>
                <rect x={x} y={y} width="40" height="62" rx="7" fill={key ? tint : 'none'} stroke={ink} strokeWidth="7" />
                <circle cx={x + 20} cy={y + 28} r="5" fill={key ? '#1F1F1F' : ink} />
              </Pop>
            );
          })}
          <D d="M28 176h144" delay={0.7} />
        </>
      );
    case 'patrimonio':
      return (
        <>
          {[0, 1, 2].map((i) => (
            <React.Fragment key={i}>
              <Pop delay={0.1 + i * 0.22}>
                <rect x="34" y={36 + i * 50} width="34" height="34" rx="7" fill={i === 2 ? tint : 'none'} stroke={ink} strokeWidth="7" />
              </Pop>
              <D d={`M42 ${54 + i * 50}l8 8 12-15`} delay={0.3 + i * 0.22} w={6} tint={i === 2 ? '#1F1F1F' : undefined} />
              <D d={`M86 ${53 + i * 50}h${[78, 54, 66][i]}`} delay={0.2 + i * 0.22} />
            </React.Fragment>
          ))}
        </>
      );
    case 'calouros':
      return (
        <>
          <D d="M30 164h140" />
          <Pop delay={0.3}><ellipse cx="100" cy="160" rx="15" ry="10" fill={ink} /></Pop>
          <D d="M100 150V78" delay={0.5} />
          <Pop delay={0.95}><path d={LEAF} transform="translate(102 104) scale(1.35)" fill={tint} /></Pop>
          <Pop delay={1.1}><path d={LEAF} transform="translate(98 84) scale(-1.2 1.2)" fill={tint} /></Pop>
        </>
      );
    case 'entidades':
      return (
        <>
          <D d="M100 56L48 146M100 56l52 90M48 146h104" />
          <Pop delay={0.5}><circle cx="100" cy="56" r="24" fill={tint} /></Pop>
          <Pop delay={0.62}><circle cx="48" cy="146" r="20" fill={ink} /></Pop>
          <Pop delay={0.74}><circle cx="152" cy="146" r="20" fill={ink} /></Pop>
        </>
      );
    case 'eventos':
      return (
        <>
          <D d="M40 36h120a12 12 0 0 1 12 12v72a12 12 0 0 1-12 12H96l-34 32v-32H40a12 12 0 0 1-12-12V48a12 12 0 0 1 12-12z" />
          <Pop delay={0.6}><circle cx="66" cy="84" r="10" fill={ink} /></Pop>
          <Pop delay={0.72}><circle cx="100" cy="84" r="10" fill={tint} /></Pop>
          <Pop delay={0.84}><circle cx="134" cy="84" r="10" fill={ink} /></Pop>
        </>
      );
    case 'cursos':
      return (
        <>
          <D d="M100 66c-20-14-44-17-72-13v100c28-4 52-1 72 13 20-14 44-17 72-13V53c-28-4-52-1-72 13z" />
          <D d="M100 66v100" delay={0.4} w={7} />
          <D d="M48 84c12-1 24 1 34 6M48 108c12-1 24 1 34 6" delay={0.6} w={6} />
          <Pop delay={0.95}><path d={LEAF} transform="translate(100 58) scale(1.3)" fill={tint} /></Pop>
        </>
      );
    case 'empresa':
      return (
        <>
          <D d="M28 172h36v-34h36v-34h36V70h36" />
          <D d="M40 96l40-36 26 20 44-44" delay={0.5} tint={tint} />
          <D d="M124 36h26v26" delay={0.9} tint={tint} />
        </>
      );
    case 'comunicacao':
      return (
        <>
          <D d="M34 86v32h26l52 34V52L60 86z" />
          <D d="M56 120l8 40h18" delay={0.4} w={7} />
          <D d="M134 80a30 30 0 0 1 0 44" delay={0.6} tint={tint} />
          <D d="M152 60a58 58 0 0 1 0 84" delay={0.78} tint={tint} />
        </>
      );
    case 'produtos':
      return (
        <>
          <D d="M72 34L30 58l16 30 20-10v94h68V78l20 10 16-30-42-24c-6 16-50 16-56 0z" />
          <Pop delay={0.85}><path d={LEAF} transform="translate(88 132) scale(1.25)" fill={tint} /></Pop>
        </>
      );
    case 'escuta':
      return (
        <>
          <D d="M38 34h82a12 12 0 0 1 12 12v44a12 12 0 0 1-12 12H76l-26 24v-24H38a12 12 0 0 1-12-12V46a12 12 0 0 1 12-12z" />
          <D d="M50 60h58M50 78h36" delay={0.45} w={6} />
          <Pop delay={0.8}>
            <path d="M92 112h70a12 12 0 0 1 12 12v30a12 12 0 0 1-12 12h-8v20l-22-20H92a12 12 0 0 1-12-12v-30a12 12 0 0 1 12-12z" fill={tint} />
          </Pop>
        </>
      );
  }
}

// ---------------------------------------------------------------------------
// Peças
// ---------------------------------------------------------------------------

const btnBase =
  'inline-flex items-center justify-center gap-2 border-3 border-foreground font-heading font-bold select-none cursor-pointer no-underline ' +
  'transition-[transform,box-shadow,background-color] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-md ' +
  'hover:-translate-x-px hover:-translate-y-px hover:shadow-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-none ' +
  'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-foreground';
const btnWhite = `${btnBase} rounded-[12px] bg-white text-foreground hover:bg-muted`;
const btnGo = `${btnBase} rounded-[26px_7px_26px_7px] uppercase tracking-[0.04em] bg-accent text-foreground hover:bg-accent-hover`;
const btnGoPurple = `${btnBase} rounded-[12px] uppercase tracking-[0.04em] bg-primary text-white hover:bg-primary-hover`;

const Progress: React.FC<{ current: number; fg: string }> = ({ current, fg }) => (
  <ol className="m-0 flex h-2 list-none items-center gap-1 p-0" aria-label={`Proposta ${current} de ${TOTAL}`}>
    {PROPOSTA_STOPS.map((p) => (
      <li
        key={p.id}
        aria-hidden="true"
        className={`h-full flex-1 rounded-full border-2 ${primeiraDoEixo.includes(p.id) && p.id > 1 ? 'ml-1.5' : ''}`}
        style={{ borderColor: fg, backgroundColor: p.id <= current ? fg : 'transparent' }}
      />
    ))}
  </ol>
);

const screenPad =
  'absolute inset-0 overflow-y-auto overscroll-contain px-4 sm:px-8 pt-[max(16px,env(safe-area-inset-top))] pb-[max(16px,env(safe-area-inset-bottom))]';

// ---------------------------------------------------------------------------
// Componente
// ---------------------------------------------------------------------------

export const PropostasTour: React.FC = () => {
  /** null = fechado; 0 = abertura; 1..14 = proposta; 15 = fechamento. */
  const [step, setStep] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const open = step !== null;

  useEffect(() => {
    const start = () => setStep(0);
    // O botão pode ser tocado antes desta ilha montar: ele deixa um aviso, e o tour abre ao chegar.
    const w = window as unknown as { __cagpPropostasPending?: boolean };
    if (w.__cagpPropostasPending) {
      w.__cagpPropostasPending = false;
      start();
    }
    window.addEventListener(START_PROPOSTAS_TOUR, start);
    return () => window.removeEventListener(START_PROPOSTAS_TOUR, start);
  }, []);

  const close = useCallback(() => {
    (window as unknown as { __cagpPropostasPending?: boolean }).__cagpPropostasPending = false;
    setStep(null);
  }, []);
  const go = useCallback((delta: number) => setStep((s) => (s === null ? s : Math.max(0, Math.min(TOTAL + 1, s + delta)))), []);

  // Página de trás parada e fora do foco enquanto o tour está aberto.
  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add('cagp-semente-tour-open');
    const frozen: Element[] = [];
    Array.from(document.body.children).forEach((el) => {
      if (rootRef.current && el.contains(rootRef.current)) return;
      if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE' || el.hasAttribute('inert')) return;
      el.setAttribute('inert', '');
      frozen.push(el);
    });
    return () => {
      document.documentElement.classList.remove('cagp-semente-tour-open');
      frozen.forEach((el) => el.removeAttribute('inert'));
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => headingRef.current?.focus({ preventScroll: true }), 240);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, step, close, go]);

  // A foto de quem fala na próxima tela já vem enquanto a pessoa lê esta.
  useEffect(() => {
    if (step === null || step >= TOTAL) return;
    new Image().src = getTourPerson(PROPOSTA_STOPS[step].leaderId).thumb;
  }, [step]);

  const stop: PropostaStop | undefined = step !== null && step >= 1 && step <= TOTAL ? PROPOSTA_STOPS[step - 1] : undefined;
  const eixo = stop ? eixoDe(stop.id) : undefined;
  const bg = eixo?.bg ?? PURPLE;
  const fg = eixo?.fg ?? '#FFFFFF';

  return (
    <MotionConfig reducedMotion="never">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={rootRef}
            id="cagp-propostas-tour"
            role="dialog"
            aria-modal="true"
            aria-labelledby="propostas-tour-heading"
            className="fixed inset-0 z-[1190] font-sans"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)', backgroundColor: bg }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', backgroundColor: bg }}
            exit={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
            style={{ color: fg }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                className="absolute inset-0"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.34, ease: easeOutExpo } }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
              >
                {step === 0 && <Abertura headingRef={headingRef} onStart={() => go(1)} onJump={(n) => setStep(n)} />}
                {stop && eixo && (
                  <Proposta headingRef={headingRef} stop={stop} eixo={eixo} onNext={() => go(1)} onBack={() => go(-1)} onClose={close} />
                )}
                {step === TOTAL + 1 && <Fechamento headingRef={headingRef} onBack={() => go(-1)} onClose={close} />}
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-[max(12px,env(safe-area-inset-top))] inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-[12px] border-3 border-foreground bg-white text-foreground shadow-sm focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              aria-label="Fechar o tour das propostas"
            >
              <i className="bi bi-x-lg" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
};

type HeadingRef = React.RefObject<HTMLHeadingElement | null>;

const Abertura: React.FC<{ headingRef: HeadingRef; onStart: () => void; onJump: (n: number) => void }> = ({ headingRef, onStart, onJump }) => (
  <div className={screenPad}>
    <div className="mx-auto flex min-h-full max-w-[1120px] flex-col justify-center gap-7 py-14 md:grid md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:items-center md:gap-14">
      <div className="space-y-5">
        <img src={asset('/logos/semente/semente-horizontal-branco.webp')} alt="Chapa Gestão Pública Semente" width="768" height="229" className="h-9 w-auto sm:h-11" />
        <h2
          id="propostas-tour-heading"
          ref={headingRef}
          tabIndex={-1}
          className="m-0 font-heading text-[clamp(1.9rem,6.4vw,3.6rem)] font-bold leading-[1.06] tracking-[-0.02em] [text-wrap:balance] focus:outline-none"
        >
          {TOTAL} propostas, <MarkerWord onColor className="text-[1.08em] tracking-normal">uma por uma</MarkerWord>.
        </h2>
        <p className="m-0 max-w-[46ch] text-base leading-relaxed sm:text-lg">
          Cada proposta da nossa Carta-Programa vem com a diretoria que vai tocar e com o que ela já disse sobre o assunto. Leva uns 4 minutos.
        </p>
        <button type="button" onClick={onStart} className={`${btnGo} h-[52px] w-full px-6 text-sm sm:w-auto`}>
          Começar pela raiz
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </button>
      </div>

      <ul className="m-0 grid list-none gap-3 p-0" aria-label="Os quatro eixos da carta">
        {PROPOSTA_EIXOS.map((e, i) => (
          <motion.li
            key={e.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.07, ease: easeOutExpo }}
          >
            <button
              type="button"
              onClick={() => onJump(primeiraDoEixo[i])}
              className={`${btnBase} min-h-[68px] w-full justify-between gap-3 px-4 py-3 text-left`}
              style={{ backgroundColor: e.bg, color: e.fg }}
            >
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-bold leading-tight">{e.estagio}</span>
                <span className="block text-sm font-normal leading-snug">{e.nome}</span>
              </span>
              <span className="shrink-0 text-2xl font-bold tabular-nums">{[6, 2, 3, 3][i]}</span>
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  </div>
);

const Proposta: React.FC<{
  headingRef: HeadingRef;
  stop: PropostaStop;
  eixo: (typeof PROPOSTA_EIXOS)[number];
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
}> = ({ headingRef, stop, eixo, onNext, onBack, onClose }) => {
  const person = getTourPerson(stop.leaderId);
  const claro = eixo.fg === '#1F1F1F';
  return (
    <div className={`${screenPad} flex flex-col`}>
      <div className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col gap-4 md:gap-6">
        <div className="space-y-3 pr-14">
          <Progress current={stop.id} fg={eixo.fg} />
          <p className="m-0 text-sm font-bold tabular-nums">
            {stop.id} de {TOTAL} · {eixo.estagio}: {eixo.nome}
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-5 md:grid md:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] md:items-center md:gap-14">
          <div className="relative mx-auto aspect-square w-full max-w-[220px] shrink-0 overflow-hidden rounded-[28%_8%_28%_8%] border-3 border-foreground shadow-[5px_5px_0_0_var(--color-accent),9px_9px_0_0_#1F1F1F] rotate-2 bg-background text-foreground shadow-xl md:max-w-[400px]">
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full p-[9%]" aria-hidden="true">
              <Art kind={stop.art} tint={eixo.tinta === PURPLE ? PURPLE : '#FE8812'} />
            </svg>
            <span className="absolute left-2.5 top-1.5 font-heading text-3xl font-bold leading-none tabular-nums md:text-5xl" aria-hidden="true">
              {String(stop.id).padStart(2, '0')}
            </span>
          </div>

          <div className="flex flex-col gap-4 md:gap-5">
            <h2
              id="propostas-tour-heading"
              ref={headingRef}
              tabIndex={-1}
              className="m-0 font-heading text-[clamp(1.6rem,5.4vw,3rem)] font-bold leading-[1.08] tracking-[-0.02em] [text-wrap:balance] focus:outline-none"
            >
              {stop.titulo}
            </h2>
            <p className="m-0 max-w-[50ch] text-base leading-relaxed sm:text-lg">{stop.compromisso}</p>

            <motion.figure
              className="m-0 rounded-[14px] border-3 border-foreground bg-white p-4 text-foreground shadow-md"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: easeOutExpo }}
            >
              <blockquote className="m-0 text-base font-bold leading-snug sm:text-lg">“{stop.fala}”</blockquote>
              <figcaption className="mt-3 flex items-center gap-3">
                <span className="h-11 w-11 shrink-0 overflow-hidden rounded-[30%_10%_30%_10%] border-2 border-foreground bg-muted">
                  <img src={person.thumb} alt="" className="h-full w-full object-cover" style={{ objectPosition: person.position }} />
                </span>
                <span className="min-w-0 text-sm leading-snug">
                  <span className="block font-bold">{person.leader.name}</span>
                  <span className="block text-content-secondary">{person.leader.role}</span>
                </span>
              </figcaption>
            </motion.figure>

            {stop.prova && (
              <a href={route(stop.prova.href)} onClick={onClose} className={`${btnWhite} min-h-[48px] w-full justify-between px-4 text-left text-base sm:w-auto sm:justify-start`}>
                <span className="inline-flex flex-wrap items-center gap-2">
                  {stop.prova.label}
                  {stop.prova.simulado && <span className="cagp-stamp-badge is-simulado">Simulado</span>}
                </span>
                <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </a>
            )}

            <div className="flex items-center gap-3 pt-1">
              <button type="button" onClick={onBack} className={`${btnWhite} h-12 w-12 shrink-0 text-base`} aria-label="Voltar">
                <i className="bi bi-arrow-left" aria-hidden="true" />
              </button>
              <button type="button" onClick={onNext} className={`${claro ? btnGoPurple : btnGo} h-[52px] flex-1 px-5 text-sm md:flex-none`}>
                {stop.id < TOTAL ? 'Próxima proposta' : 'Fechar a carta'}
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Fechamento: React.FC<{ headingRef: HeadingRef; onBack: () => void; onClose: () => void }> = ({ headingRef, onBack, onClose }) => (
  <div className={screenPad}>
    <div className="mx-auto flex min-h-full max-w-[760px] flex-col justify-center gap-6 py-14">
      <h2
        id="propostas-tour-heading"
        ref={headingRef}
        tabIndex={-1}
        className="m-0 font-heading text-[clamp(1.9rem,6.2vw,3.5rem)] font-bold leading-[1.06] tracking-[-0.02em] [text-wrap:balance] focus:outline-none"
      >
        <span className="block">Da raiz ao fruto, dias 25 e 26:</span>
        <GritoDeVoto as="span" onColor duasLinhas tamanho="lg" className="mt-3" />
      </h2>
      <p className="m-0 max-w-[50ch] text-base leading-relaxed sm:text-lg">
        Essas são as {TOTAL} propostas da nossa Carta-Programa. O texto completo de cada uma está na página da chapa.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <a href={route('/gestao')} onClick={onClose} className={`${btnGo} min-h-[52px] px-5 text-sm`}>
          Como votar
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </a>
        <a href={`${route('/chapa-semente')}#propostas`} onClick={onClose} className={`${btnWhite} min-h-[52px] px-5 text-base`}>
          Ler a carta completa
        </a>
      </div>
      <button
        type="button"
        onClick={onBack}
        className="inline-flex min-h-[44px] w-fit cursor-pointer items-center gap-2 text-sm font-bold underline underline-offset-[0.22em] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <i className="bi bi-arrow-left" aria-hidden="true" />
        Voltar à última proposta
      </button>
    </div>
  </div>
);

export default PropostasTour;
