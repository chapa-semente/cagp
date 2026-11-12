// src/components/features/semente/TourPanfletagem.tsx — Abertura "panfletagem" do tour da chapa.
//
// Dois momentos antes da tela dos 12 rostos (decisão de 11/11/2026):
//   1. suspense: o corredor vazio em tela cheia, "Vem um babado forte." e o convite para dar o play
//      (o navegador só libera som depois do toque);
//   2. o meme: 19 s de vídeo vertical em tela cheia, o "Plantão Semente". Manchetes, legendas e o papel
//      com a arte da chapa já vêm queimados no arquivo (gerado por _rascunhos/panfletagem/_fonte/long.py).
//      Em tela deitada o vídeo aparece inteiro, centralizado. Não tem "pular" (decisão do Gabriel);
//      ao rever o tour, o fechar do próprio tour continua lá.
// Quando o vídeo acaba, o tour segue direto para a tela dos rostos.
// O vídeo nunca trava o tour: erro, rede lenta ou autoplay negado também levam à tela dos rostos.

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { asset } from '@/lib/paths';
import { MarkerWord } from '@/components/ui/marker-word';

type Stage = 'suspense' | 'video';

/** A capa é o corredor ainda vazio. */
const VIDEO = { src: '/videos/panfletagem-vertical.mp4', poster: '/videos/panfletagem-vertical-poster.webp' } as const;
/** Sem imagem rodando depois disto, o tour segue sem o vídeo (sinal ruim). */
const START_TIMEOUT_MS = 6000;
/** Teto do momento do vídeo, contando travadas no meio. */
const TOTAL_TIMEOUT_MS = 32000;

const btnBase =
  'inline-flex items-center justify-center gap-2 border-3 border-foreground font-heading font-bold select-none cursor-pointer ' +
  'transition-[transform,box-shadow,background-color] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';
const btnAccent = `${btnBase} rounded-[26px_7px_26px_7px] uppercase tracking-[0.04em] bg-accent text-foreground shadow-md hover:-translate-x-px hover:-translate-y-px hover:shadow-lg hover:bg-accent-hover active:translate-x-[3px] active:translate-y-[3px] active:shadow-none`;
const btnLight = `${btnBase} rounded-[12px] bg-white text-foreground shadow-md hover:-translate-x-px hover:-translate-y-px hover:shadow-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-none`;
const linkBtn =
  'inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-white underline underline-offset-[0.22em] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const headingCls =
  'm-0 font-heading text-[clamp(1.85rem,6.2vw,3.5rem)] font-bold leading-[1.06] tracking-[-0.02em] text-white [text-wrap:balance] focus:outline-none';

export const TourPanfletagem: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [stage, setStage] = useState<Stage>('suspense');
  const [muted, setMuted] = useState(false);
  // Tela em pé: o vídeo cobre tudo. Tela deitada: aparece inteiro, sobre grafite.
  const [empe] = useState(() => typeof window !== 'undefined' && window.innerWidth / Math.max(1, window.innerHeight) < 0.85);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timers = useRef<number[]>([]);
  const finished = useRef(false);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  useEffect(() => {
    const t = window.setTimeout(() => headingRef.current?.focus({ preventScroll: true }), 260);
    return () => window.clearTimeout(t);
  }, [stage]);

  /** Fim do vídeo (ou vídeo que não rodou): segue para a tela dos rostos, uma vez só. */
  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    clearTimers();
    videoRef.current?.pause();
    onDone();
  }, [onDone]);

  const play = (withSound: boolean) => {
    const v = videoRef.current;
    setMuted(!withSound);
    setStage('video');
    if (!v) return finish();
    v.muted = !withSound;
    v.currentTime = 0;
    timers.current.push(
      window.setTimeout(() => {
        if (v.currentTime < 0.1) finish();
      }, START_TIMEOUT_MS),
      window.setTimeout(finish, TOTAL_TIMEOUT_MS)
    );
    v.play().catch(finish);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    const next = !muted;
    if (v) v.muted = next;
    setMuted(next);
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-foreground">
      <video
        ref={videoRef}
        src={asset(VIDEO.src)}
        poster={asset(VIDEO.poster)}
        preload="auto"
        playsInline
        disablePictureInPicture
        onEnded={finish}
        onError={() => stage === 'video' && finish()}
        className={`absolute inset-0 block h-full w-full ${empe ? 'object-cover' : 'object-contain'}`}
        aria-label="Vídeo de humor feito com inteligência artificial, no formato de plantão de notícias: um homem de terno e chapéu espalha panfletos por um corredor de escola. As legendas dizem que a Chapa 2 tem 14 propostas no papel e 10 ferramentas já funcionando neste site, e que a votação é em 25 e 26 de novembro, das 17h às 22h30, na sala do CAGP."
      />

      {/* O cartão Cartaz ancorado embaixo, o mesmo gesto do spotlight do tour. */}
      <div
        className={`absolute bottom-[max(12px,env(safe-area-inset-bottom))] left-3 rounded-[16px] border-3 border-foreground bg-primary text-white shadow-xl md:bottom-6 md:left-6 ${
          stage === 'suspense' ? 'right-3 p-4 sm:p-5 md:right-auto md:w-[460px]' : 'px-2 py-2'
        }`}
      >
        {stage === 'suspense' ? (
          <div className="space-y-3">
            <span className="inline-block -rotate-2 rounded-md border-2 border-foreground bg-accent px-2 py-1 text-sm font-bold uppercase tracking-[0.04em] text-foreground shadow-[2px_2px_0_0_#1F1F1F]">
              Plantão urgente
            </span>
            <h1 id="semente-tour-heading" ref={headingRef} tabIndex={-1} className={headingCls}>
              Vem um <MarkerWord onColor className="text-[1.1em] tracking-normal">babado</MarkerWord> forte.
            </h1>
            <p className="m-0 text-base leading-snug text-white">
              O Plantão Semente interrompe o site com notícia urgente da Chapa 2. São 19 segundos, e com som é muito melhor.
            </p>
            {/* O botão respira para chamar o toque; o afundar no clique continua o do kit. */}
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.9, ease: 'easeInOut' }}>
              <button type="button" onClick={() => play(true)} className={`${btnAccent} h-[56px] w-full px-6 text-base`}>
                <i className="bi bi-play-fill" aria-hidden="true" />
                Dar o play com som
              </button>
            </motion.div>
            <button type="button" onClick={() => play(false)} className={linkBtn}>
              Tô sem fone, ver sem som
            </button>
          </div>
        ) : (
          <>
            <h1 id="semente-tour-heading" ref={headingRef} tabIndex={-1} className="sr-only">
              Plantão Semente
            </h1>
            <button type="button" onClick={toggleMute} aria-pressed={!muted} className={`${btnLight} min-h-[44px] px-3 text-sm`}>
              {muted ? 'Ligar o som' : 'Tirar o som'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TourPanfletagem;
