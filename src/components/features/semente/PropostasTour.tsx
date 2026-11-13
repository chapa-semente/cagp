// src/components/features/semente/PropostasTour.tsx — Tour opcional das 14 propostas.
//
// Refeito em 12/11/2026 (noite), no molde do tour da chapa: eram 14 telas de pictograma, título,
// texto e citação (16 toques, ~800 palavras, quatro fundos de cor). Agora:
//   • uma tela por eixo (4), que abre pela dor do estudante e lista as propostas do eixo em uma linha
//     cada, com o rosto de quem toca; tocar numa abre o detalhe (foto em folha, compromisso, fala);
//   • fundo roxo e petróleo alternando; a cor do eixo (raiz, broto, planta, fruto) só no adesivo;
//   • os desenhos são os da chapa, feitos à mão (DesenhosDaChapa.tsx): cada eixo tem uma cena com as
//     mãos originais, e cada proposta tem o seu desenho a caneta dentro da estrela, colado na foto.
// Desde 13/11/2026 o tour aponta o que já foi feito: o adesivo laranja ("Já no ar", "Já começou") na
// linha da proposta, a contagem no subtítulo do eixo e, no detalhe, a ficha branca com o que existe
// hoje e o link da prova. Proposta sem nada feito diz isso em uma linha (`jaFeito` no roteiro).
// Abre pelo evento START_PROPOSTAS_TOUR; sempre dá para fechar. Roteiro: src/lib/propostasTour.ts.
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { asset, route } from '@/lib/paths';
import { easeOutExpo } from '@/lib/motion';
import { GritoDeVoto } from '@/components/ui/grito-de-voto';
import { getTourPerson } from '@/lib/sementeTour';
import { AdesivoChapa, AdesivoDaProposta, CenaDoEixo } from './DesenhosDaChapa';
import { CreditoDosDesenhos } from './CreditoDosDesenhos';
import { PROPOSTA_EIXOS, PROPOSTA_SEM_INICIO, PROPOSTA_STOPS, START_PROPOSTAS_TOUR, type PropostaStop } from '@/lib/propostasTour';

const TOTAL = PROPOSTA_STOPS.length;
const EIXOS = PROPOSTA_EIXOS.length;
const PURPLE = '#5B2A85';
const TEAL = '#266264';
const eixoDe = (id: number) => PROPOSTA_EIXOS.find((e) => id >= e.de && id <= e.ate) ?? PROPOSTA_EIXOS[0];

// ---------------------------------------------------------------------------
// Peças
// ---------------------------------------------------------------------------

const btnBase =
  'inline-flex items-center justify-center gap-2 border-3 border-foreground font-heading font-bold select-none cursor-pointer no-underline ' +
  'transition-[transform,box-shadow,background-color] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-md ' +
  'hover:-translate-x-px hover:-translate-y-px hover:shadow-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-none ' +
  'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent';
const btnWhite = `${btnBase} rounded-[12px] bg-white text-foreground hover:bg-muted`;
const btnGo = `${btnBase} rounded-[26px_7px_26px_7px] uppercase tracking-[0.04em] bg-accent text-foreground hover:bg-accent-hover`;
const linkDark =
  'inline-flex min-h-[44px] w-fit cursor-pointer flex-wrap items-center gap-2 text-sm font-bold text-foreground underline underline-offset-[0.22em] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent';
const linkLight =
  'inline-flex min-h-[44px] w-fit cursor-pointer items-center gap-2 text-sm font-bold text-white underline underline-offset-[0.22em] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white';
const h2Cls = 'm-0 font-heading font-bold leading-[1.08] tracking-[-0.02em] [text-wrap:balance] focus:outline-none focus-visible:outline-none';

/** Um segmento por eixo: feitos em branco, atual em laranja, por vir só contornados. */
const Progress: React.FC<{ current: number }> = ({ current }) => (
  <ol className="m-0 flex h-3 list-none items-center gap-1 p-0" aria-label={`Eixo ${current} de ${EIXOS}`}>
    {PROPOSTA_EIXOS.map((e) => (
      <li
        key={e.id}
        aria-hidden="true"
        className={`h-full flex-1 rounded-full border-2 border-foreground ${e.id < current ? 'bg-white' : e.id === current ? 'bg-accent' : 'border-white bg-white/0'}`}
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
  /** null = fechado; 1..4 = eixo; 5 = fechamento. */
  const [step, setStep] = useState<number | null>(null);
  /** Proposta aberta por cima do eixo (o detalhe), ou null. */
  const [aberta, setAberta] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const open = step !== null;

  useEffect(() => {
    const abrir = (eixo?: number) => {
      setAberta(null);
      setStep(eixo && eixo >= 1 && eixo <= EIXOS ? eixo : 1);
    };
    // Os blocos de eixo da /chapa-semente mandam o eixo no evento (data-cagp-eixo).
    const start = (e: Event) => abrir((e as CustomEvent<{ eixo?: number }>).detail?.eixo);
    // O botão pode ser tocado antes desta ilha montar: ele deixa um aviso (com o eixo, se houver), e o
    // tour abre ao chegar.
    const w = window as unknown as { __cagpPropostasPending?: boolean | number };
    if (w.__cagpPropostasPending) {
      const pedido = w.__cagpPropostasPending;
      w.__cagpPropostasPending = false;
      abrir(typeof pedido === 'number' ? pedido : undefined);
    }
    window.addEventListener(START_PROPOSTAS_TOUR, start);
    return () => window.removeEventListener(START_PROPOSTAS_TOUR, start);
  }, []);

  const close = useCallback(() => {
    (window as unknown as { __cagpPropostasPending?: boolean | number }).__cagpPropostasPending = false;
    setAberta(null);
    setStep(null);
  }, []);
  const go = useCallback((delta: number) => {
    setAberta(null);
    setStep((s) => (s === null ? s : Math.max(1, Math.min(EIXOS + 1, s + delta))));
  }, []);

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
      // Esc fecha primeiro o detalhe; só depois o tour.
      if (e.key === 'Escape') aberta !== null ? setAberta(null) : close();
      else if (aberta !== null) return;
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, step, aberta, close, go]);

  const eixo = step !== null && step <= EIXOS ? PROPOSTA_EIXOS[step - 1] : undefined;
  const detalhe = aberta !== null ? PROPOSTA_STOPS.find((p) => p.id === aberta) : undefined;
  // Roxo e petróleo se alternam por eixo, como por pessoa no tour da chapa.
  const bg = eixo && eixo.id % 2 === 0 ? TEAL : PURPLE;

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
            className="fixed inset-0 z-[1190] font-sans text-white"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)', backgroundColor: bg }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', backgroundColor: bg }}
            exit={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={detalhe ? `p${detalhe.id}` : `e${step}`}
                className="absolute inset-0"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.34, ease: easeOutExpo } }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
              >
                {detalhe ? (
                  <Detalhe headingRef={headingRef} stop={detalhe} onBack={() => setAberta(null)} onClose={close} />
                ) : eixo ? (
                  <Eixo headingRef={headingRef} eixo={eixo} bg={bg} onOpen={setAberta} onNext={() => go(1)} onBack={() => go(-1)} />
                ) : (
                  <Fechamento headingRef={headingRef} onBack={() => go(-1)} onClose={close} />
                )}
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-[max(12px,env(safe-area-inset-top))] inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-[12px] border-3 border-foreground bg-white text-foreground shadow-sm focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent sm:right-6"
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
type EixoInfo = (typeof PROPOSTA_EIXOS)[number];

/** O adesivo do eixo: o único lugar em que a cor do eixo aparece. */
const AdesivoEixo: React.FC<{ eixo: EixoInfo; texto: string }> = ({ eixo, texto }) => (
  <span
    className="-rotate-3 shrink-0 rounded-md border-2 border-foreground px-2 py-1 text-sm font-bold tabular-nums shadow-[2px_2px_0_0_#1F1F1F]"
    style={{ backgroundColor: eixo.bg, color: eixo.fg }}
  >
    {texto}
  </span>
);

/** O adesivo laranja do que já foi feito. Mesmo desenho do cartão da carta completa. */
const seloCls =
  'inline-block w-fit rounded-md border-2 border-foreground bg-accent px-1.5 py-0.5 font-heading text-xs font-bold uppercase leading-tight tracking-[0.04em] text-foreground shadow-[2px_2px_0_0_#1F1F1F]';

/** "2 já saíram do papel", "1 já saiu do papel", "as 2 já saíram do papel". */
const feitasEmTexto = (feitas: number, total: number) =>
  feitas === total ? `as ${total} já saíram do papel` : feitas === 1 ? '1 já saiu do papel' : `${feitas} já saíram do papel`;

/* ───────────────────────── Uma tela por eixo ───────────────────────── */

const Eixo: React.FC<{ headingRef: HeadingRef; eixo: EixoInfo; bg: string; onOpen: (id: number) => void; onNext: () => void; onBack: () => void }> = ({
  headingRef,
  eixo,
  bg,
  onOpen,
  onNext,
  onBack,
}) => {
  const propostas = PROPOSTA_STOPS.filter((p) => p.id >= eixo.de && p.id <= eixo.ate);
  const proximo = PROPOSTA_EIXOS.find((e) => e.id === eixo.id + 1);
  const feitas = propostas.filter((p) => p.jaFeito).length;
  return (
    <div className={`${screenPad} flex flex-col`}>
      {/* min-h-0: no celular a cena encolhe (até 76px) para a lista caber sem rolar; o eixo Raiz tem 6 linhas. */}
      <div className="mx-auto flex min-h-0 w-full max-w-[1120px] flex-1 flex-col gap-4 md:gap-6">
        <div className="flex min-h-11 items-center gap-3 pr-[60px] sm:pr-[72px]">
          <img src={asset('/logos/semente/semente-simbolo-branco.webp')} alt="" aria-hidden="true" className="h-7 w-auto shrink-0" />
          <div className="min-w-0 flex-1">
            <Progress current={eixo.id} />
          </div>
          <AdesivoEixo eixo={eixo} texto={`${eixo.estagio} · ${eixo.id} de ${EIXOS}`} />
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center md:gap-14">
          <svg viewBox="0 0 320 180" className="mx-auto block max-h-[32dvh] min-h-[76px] w-full max-w-[420px] flex-1 overflow-hidden md:max-h-none md:flex-none" aria-hidden="true">
            <CenaDoEixo eixo={eixo.id} />
          </svg>

          <div className="grid gap-3 md:gap-5">
            <div className="grid gap-1.5">
              <h2 id="propostas-tour-heading" ref={headingRef} tabIndex={-1} className={`${h2Cls} text-[clamp(1.5rem,5.2vw,3rem)]`}>
                {eixo.gancho}
              </h2>
              <p className="m-0 text-base leading-snug">
                {eixo.nome}: {propostas.length} propostas{feitas > 0 && `, ${feitasEmTexto(feitas, propostas.length)}`}.
              </p>
            </div>
            <ul className="m-0 grid list-none gap-1.5 p-0">
              {propostas.map((p, i) => {
                const person = getTourPerson(p.leaderId);
                return (
                  <motion.li
                    key={p.id}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease: easeOutExpo }}
                  >
                    <button type="button" onClick={() => onOpen(p.id)} className={`${btnWhite} min-h-[48px] w-full justify-start gap-3 px-2.5 py-1 text-left shadow-sm`}>
                      <span className="h-9 w-9 shrink-0 overflow-hidden rounded-[30%_10%_30%_10%] border-2 border-foreground bg-muted">
                        <img src={person.thumb} alt="" className="h-full w-full object-cover" style={{ objectPosition: person.position }} />
                      </span>
                      {/* O adesivo corre na linha do título: título curto não ganha uma linha a mais. */}
                      <span className="min-w-0 flex-1 py-1 text-base font-bold leading-tight">
                        {p.titulo}
                        {p.jaFeito && (
                          <>
                            {' '}
                            <span className={`${seloCls} my-0.5 ml-0.5 -rotate-1 whitespace-nowrap align-middle`}>{p.jaFeito.selo}</span>
                          </>
                        )}
                      </span>
                      <i className="bi bi-chevron-right shrink-0 text-sm" aria-hidden="true" />
                    </button>
                  </motion.li>
                );
              })}
            </ul>
            {/* Em celular baixo a lista passa da tela: o avançar fica preso ao pé, por cima da rolagem. */}
            <div
              className="sticky -bottom-4 z-10 -mx-4 -mb-4 flex items-center gap-3 px-4 pt-2 pb-[max(16px,env(safe-area-inset-bottom))] sm:-mx-8 sm:px-8 md:static md:m-0 md:p-0 md:pt-1"
              style={{ backgroundColor: bg }}
            >
              {eixo.id > 1 && (
                <button type="button" onClick={onBack} className={`${btnWhite} h-12 w-12 shrink-0 text-base`} aria-label="Voltar ao eixo anterior">
                  <i className="bi bi-arrow-left" aria-hidden="true" />
                </button>
              )}
              <button type="button" onClick={onNext} className={`${btnGo} h-[52px] flex-1 px-5 text-sm md:flex-none`}>
                {proximo ? `Próximo: ${proximo.estagio}` : 'Ver o fim'}
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────── O detalhe de uma proposta ───────────────────────── */

const Detalhe: React.FC<{ headingRef: HeadingRef; stop: PropostaStop; onBack: () => void; onClose: () => void }> = ({ headingRef, stop, onBack, onClose }) => {
  const person = getTourPerson(stop.leaderId);
  const eixo = eixoDe(stop.id);
  return (
    <div className={`${screenPad} flex flex-col`}>
      <div className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col gap-4 md:gap-6">
        <div className="flex min-h-11 items-center gap-3 pr-[60px] sm:pr-[72px]">
          <AdesivoEixo eixo={eixo} texto={`${eixo.estagio} · proposta ${stop.id} de ${TOTAL}`} />
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-5 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center md:gap-16">
          {/* Quem toca a proposta, com o rabisco dela colado no canto. */}
          <div className="relative mr-2 mb-3 flex min-h-[170px] flex-1 md:aspect-[4/5] md:max-h-[72dvh] md:flex-none">
            <figure className="relative m-0 flex-1 overflow-hidden rounded-[48px_12px_48px_12px] border-3 border-foreground bg-muted-foreground shadow-[5px_5px_0_0_var(--color-accent),9px_9px_0_0_#1F1F1F]">
              <motion.img
                src={person.photo}
                alt=""
                decoding="async"
                draggable={false}
                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
                style={{ objectPosition: person.position }}
                className="absolute inset-0 block h-full w-full select-none object-cover"
              />
              <figcaption className="absolute left-3 top-3 max-w-[calc(100%-24px)] rounded-[8px] bg-foreground px-3 py-2 text-white">
                <span className="block text-base font-bold leading-tight">{person.leader.name}</span>
                <span className="block text-sm leading-snug">{person.leader.role}</span>
              </figcaption>
            </figure>
            <AdesivoDaProposta
              art={stop.art}
              className="absolute -bottom-7 -right-3 w-[66%] max-w-[250px] md:-right-12 md:w-[62%] md:max-w-[330px]"
            />
          </div>

          <div className="grid gap-3 md:gap-5">
            <h2 id="propostas-tour-heading" ref={headingRef} tabIndex={-1} className={`${h2Cls} text-[clamp(1.5rem,5.2vw,3rem)]`}>
              {stop.titulo}
            </h2>
            <p className="m-0 max-w-[50ch] text-base leading-snug sm:text-lg sm:leading-relaxed">{stop.compromisso}</p>
            <p className="m-0 max-w-[46ch] font-heading text-lg font-bold leading-snug">{stop.porque}</p>
            {stop.jaFeito ? (
              /* O que já existe: papel branco com o adesivo batido no canto, depois que a foto germina. */
              <div className="relative mt-3 grid max-w-[50ch] gap-1 rounded-[12px] border-3 border-foreground bg-white px-4 pb-2 pt-5 text-foreground shadow-md">
                <motion.span
                  className={`${seloCls} absolute -top-3 left-3 origin-left`}
                  initial={{ opacity: 0, scale: 1.8, rotate: -10 }}
                  animate={{ opacity: [0, 1, 1], scale: [1.8, 0.92, 1], rotate: [-10, -1, -2] }}
                  transition={{ duration: 0.36, delay: 0.45, times: [0, 0.62, 1], ease: easeOutExpo }}
                >
                  {stop.jaFeito.selo}
                </motion.span>
                <p className="m-0 text-base leading-snug">{stop.jaFeito.texto}</p>
                {stop.prova ? <Prova prova={stop.prova} onClose={onClose} className={linkDark} /> : <span className="h-2" aria-hidden="true" />}
              </div>
            ) : (
              <>
                <p className="m-0 text-base leading-snug">{PROPOSTA_SEM_INICIO}</p>
                {stop.prova && <Prova prova={stop.prova} onClose={onClose} className={`${linkLight} flex-wrap`} />}
              </>
            )}
            <div className="flex items-center gap-3 pt-1">
              <button type="button" onClick={onBack} className={`${btnGo} h-[52px] flex-1 px-5 text-sm md:flex-none`}>
                <i className="bi bi-arrow-left" aria-hidden="true" />
                Voltar às propostas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Prova: React.FC<{ prova: NonNullable<PropostaStop['prova']>; onClose: () => void; className: string }> = ({ prova, onClose, className }) => (
  <a href={route(prova.href)} onClick={onClose} className={className}>
    {prova.label}
    {prova.simulado && <span className="cagp-stamp-badge is-simulado">Simulado</span>}
    <i className="bi bi-arrow-up-right" aria-hidden="true" />
  </a>
);

/* ───────────────────────── Fechamento ───────────────────────── */

const Fechamento: React.FC<{ headingRef: HeadingRef; onBack: () => void; onClose: () => void }> = ({ headingRef, onBack, onClose }) => (
  <div className={screenPad}>
    <div className="mx-auto flex min-h-full max-w-[760px] flex-col justify-center gap-6 py-14">
      {/* O adesivo original da chapa, desenhado à mão: "Chapa" e os dois dedos. */}
      <AdesivoChapa className="-mb-2 block h-auto w-[min(78vw,340px)] -rotate-3 self-start" />
      <h2 id="propostas-tour-heading" ref={headingRef} tabIndex={-1} className={`${h2Cls} text-[clamp(1.9rem,6.2vw,3.5rem)]`}>
        <span className="block">Da raiz ao fruto, dias 25 e 26:</span>
        <GritoDeVoto as="span" onColor duasLinhas tamanho="lg" className="mt-3" />
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <a href={route('/gestao')} onClick={onClose} className={`${btnGo} min-h-[52px] px-5 text-sm`}>
          Como votar
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </a>
        <a href={`${route('/chapa-semente')}#carta`} onClick={onClose} className={`${btnWhite} min-h-[52px] px-5 text-base`}>
          Ler a carta completa
        </a>
      </div>
      <button type="button" onClick={onBack} className={linkLight}>
        <i className="bi bi-arrow-left" aria-hidden="true" />
        Voltar às propostas
      </button>
      {/* Quem desenhou assina no fim, como numa história em quadrinhos. */}
      <CreditoDosDesenhos link className="border-t-2 border-white/40 pt-3" />
    </div>
  </div>
);

export default PropostasTour;
