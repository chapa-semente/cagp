// Botão que abre o tour das 14 propostas (PropostasTour, montado no BaseLayout).
import React from 'react';
import { START_PROPOSTAS_TOUR } from '@/lib/propostasTour';

export const PropostasTourButton: React.FC<{ label?: string; className?: string }> = ({
  label = 'Ver as 14 propostas, uma por uma',
  className = '',
}) => (
  <button
    type="button"
    onClick={() => {
      (window as unknown as { __cagpPropostasPending?: boolean }).__cagpPropostasPending = true;
      window.dispatchEvent(new CustomEvent(START_PROPOSTAS_TOUR));
    }}
    className={`inline-flex min-h-[52px] cursor-pointer select-none items-center justify-center gap-2 rounded-xl border-3 border-border bg-accent px-5 font-heading text-sm font-bold uppercase tracking-[0.03em] text-foreground shadow-md transition-[transform,box-shadow,background-color] duration-(--duration-press) hover:-translate-x-px hover:-translate-y-px hover:bg-accent-hover hover:shadow-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${className}`}
  >
    {label}
    <i className="bi bi-arrow-right" aria-hidden="true" />
  </button>
);

export default PropostasTourButton;
