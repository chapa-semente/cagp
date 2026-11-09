import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Tour, type TourStep } from '@/components/ui/tour';
import {
  CHAPA_TOUR_12_STOPS,
  loadTourSession,
  saveTourSession,
  clearTourSession,
  type TourSessionState,
} from '@/lib/chapaSementeData';
import { LeaderAvatar } from './LeaderAvatar';

export const GlobalTourHost: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const isNavigatingRef = useRef(false);

  // Normalizador de caminho (remove trailing slash para comparações estáveis)
  const normalizePath = (p: string) => {
    const raw = p.replace(/\/$/, '') || '/';
    return raw;
  };

  // Destino com barra final: o GitHub Pages serve páginas como diretórios e
  // responde 301 para '/cagp/rota' -> '/cagp/rota/'. Indo direto evita o redirect.
  const toPageUrl = (p: string) => (p.endsWith('/') ? p : `${p}/`);

  // 1. Inicialização: carregar estado do sessionStorage na montagem da página
  useEffect(() => {
    const session = loadTourSession();
    if (session && session.isOpen) {
      const stepIndex = Math.min(
        Math.max(0, session.currentStep),
        CHAPA_TOUR_12_STOPS.length - 1
      );
      setCurrentStep(stepIndex);
      setIsPlaying(session.isPlaying);

      const stop = CHAPA_TOUR_12_STOPS[stepIndex];
      const currentPath = normalizePath(window.location.pathname);
      const targetPath = normalizePath(stop.pageRoute);

      if (currentPath !== targetPath) {
        // Redireciona para a página da parada atual caso a página ainda seja diferente
        isNavigatingRef.current = true;
        window.location.href = toPageUrl(stop.pageRoute);
        return;
      }

      // Se a rota incluir hash (ex: #art41), ativa a aba correspondente se existir
      if (stop.toolHref.includes('#')) {
        const hash = stop.toolHref.split('#')[1];
        if (hash) {
          const tabBtn = document.querySelector<HTMLElement>(
            `[data-ws-hash="#${hash}"], [data-ws-tab="${hash}"]`
          );
          tabBtn?.click();
        }
      }

      // Pequeno timeout para garantir que o DOM e as ilhas React da página estejam renderizados
      const t = setTimeout(() => {
        setIsOpen(true);
        setIsReady(true);
      }, 350);

      return () => clearTimeout(t);
    }
  }, []);

  // 2. Ouvir eventos globais de início e encerramento do tour
  useEffect(() => {
    const handleStartTour = () => {
      const initialState: TourSessionState = {
        isOpen: true,
        currentStep: 0,
        isPlaying: true,
        autoPlay: true,
      };
      saveTourSession(initialState);
      setCurrentStep(0);
      setIsPlaying(true);

      const firstStop = CHAPA_TOUR_12_STOPS[0];
      const currentPath = normalizePath(window.location.pathname);
      const targetPath = normalizePath(firstStop.pageRoute);

      if (currentPath !== targetPath) {
        isNavigatingRef.current = true;
        window.location.href = toPageUrl(firstStop.pageRoute);
      } else {
        setIsOpen(true);
        setIsReady(true);
      }
    };

    const handleCloseTour = () => {
      clearTourSession();
      setIsOpen(false);
    };

    window.addEventListener('cagp:start-semente-tour', handleStartTour);
    window.addEventListener('cagp:close-semente-tour', handleCloseTour);

    return () => {
      window.removeEventListener('cagp:start-semente-tour', handleStartTour);
      window.removeEventListener('cagp:close-semente-tour', handleCloseTour);
    };
  }, []);

  // 3. Gerenciamento de transição de parada (com navegação entre rotas)
  const handleStepChange = useCallback(
    (nextIndex: number) => {
      if (nextIndex >= CHAPA_TOUR_12_STOPS.length) {
        clearTourSession();
        setIsOpen(false);
        return;
      }

      const nextStop = CHAPA_TOUR_12_STOPS[nextIndex];
      const nextState: TourSessionState = {
        isOpen: true,
        currentStep: nextIndex,
        isPlaying,
        autoPlay: true,
      };
      saveTourSession(nextState);
      setCurrentStep(nextIndex);

      const currentPath = normalizePath(window.location.pathname);
      const targetPath = normalizePath(nextStop.pageRoute);

      if (currentPath !== targetPath) {
        isNavigatingRef.current = true;
        setIsOpen(false); // Fecha brevemente antes do descarregamento da página
        window.location.href = toPageUrl(nextStop.pageRoute);
      } else {
        // Mesma página: ativa hash de aba se necessário
        if (nextStop.toolHref.includes('#')) {
          const hash = nextStop.toolHref.split('#')[1];
          if (hash) {
            const tabBtn = document.querySelector<HTMLElement>(
              `[data-ws-hash="#${hash}"], [data-ws-tab="${hash}"]`
            );
            tabBtn?.click();
          }
        }
      }
    },
    [isPlaying]
  );

  const handleComplete = useCallback(() => {
    clearTourSession();
    setIsOpen(false);
  }, []);

  const handleSkip = useCallback(() => {
    clearTourSession();
    setIsOpen(false);
  }, []);

  // 4. Construção das 12 paradas estruturadas para o componente Tour
  const steps: TourStep[] = CHAPA_TOUR_12_STOPS.map((stop, index) => {
    return {
      target: stop.target,
      title: stop.title,
      description: stop.quote ? `"${stop.quote}"` : stop.subtitle,
      placement: stop.placement,
      content: (
        <div className="space-y-2 mt-2 pt-2 border-t-2 border-border/40 text-xs text-foreground">
          <div className="flex items-center gap-2.5">
            {stop.leader ? (
              <LeaderAvatar
                name={stop.leader.name}
                photoFilename={stop.leader.photoFilename}
                initials={stop.leader.initials}
                deptColor={stop.leader.deptColor}
                size="sm"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-primary text-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center shrink-0 text-sm font-heading font-black">
                {stop.stepNumber}
              </div>
            )}
            <div className="min-w-0">
              <span
                className={`text-[9px] font-heading font-black uppercase px-1.5 py-0.5 rounded border ${stop.badgeBg}`}
              >
                {stop.badge}
              </span>
              <p className="text-[10px] font-mono text-muted-foreground mt-0.5 font-bold truncate">
                {stop.subtitle}
              </p>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-muted/60 border border-border/40 space-y-0.5">
            <div className="text-[9px] font-heading font-bold uppercase text-primary">
              Desafio &amp; Demanda Discente:
            </div>
            <p className="text-[10px] text-muted-foreground leading-snug m-0 font-medium line-clamp-2 sm:line-clamp-none">
              {stop.painPoint}
            </p>
          </div>

          <div className="p-2 rounded-lg bg-primary/5 border border-primary/20 space-y-0.5">
            <div className="text-[9px] font-heading font-bold uppercase text-foreground">
              Solução no SuperApp:
            </div>
            <p className="text-[10px] text-foreground leading-snug m-0 font-medium line-clamp-2 sm:line-clamp-none">
              {stop.solution}
            </p>
          </div>

          <div className="pt-1">
            <a
              href={stop.toolHref}
              onClick={() => {
                // Ao clicar para ir ao local, preserva o passo no cofre da sessão
                saveTourSession({
                  isOpen: true,
                  currentStep: index,
                  isPlaying: false, // Pausa para permitir que o usuário explore a página
                  autoPlay: true,
                });
              }}
              className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 bg-primary text-white text-[11px] font-heading font-black uppercase rounded-lg border-2 border-border shadow-[2px_2px_0px_#000] hover:bg-primary/95 active:translate-y-[1px] active:shadow-none transition-all no-underline min-h-[38px] sm:min-h-[44px]"
            >
              <span>{stop.toolLabel}</span>
              <i className="bi bi-arrow-right text-[10px]"></i>
            </a>
          </div>
        </div>
      ),
    };
  });

  return (
    <Tour
      steps={steps}
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open && !isNavigatingRef.current) {
          clearTourSession();
        }
      }}
      currentStep={currentStep}
      onStepChange={handleStepChange}
      onComplete={handleComplete}
      onSkip={handleSkip}
      autoPlay={true}
      autoPlayInterval={8000}
      showProgress={true}
      showSkipButton={true}
    />
  );
};
