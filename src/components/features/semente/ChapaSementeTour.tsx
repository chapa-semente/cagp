import React from 'react';

interface ChapaSementeTourProps {
  buttonText?: string;
  variant?: 'primary' | 'hero' | 'compact' | 'link';
  className?: string;
}

export const ChapaSementeTour: React.FC<ChapaSementeTourProps> = ({
  buttonText = 'Rever o tour da chapa',
  variant = 'hero',
  className = '',
}) => {
  // Sem onClick: o clique é atendido pelo ouvinte único do BaseLayout (data-cagp-dispatch), então o
  // botão funciona como HTML puro, sem precisar hidratar React só para disparar um evento.
  const getButtonClasses = () => {
    // Link sobre cor: ação de apoio, sem disputar com o único CTA laranja da tela.
    if (variant === 'link') {
      return 'inline-flex items-center gap-1.5 min-h-[44px] px-1 bg-transparent border-0 text-white font-heading font-bold text-sm underline underline-offset-[0.22em] decoration-2 decoration-accent hover:decoration-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary select-none';
    }
    if (variant === 'hero') {
      return 'inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-accent text-foreground font-heading font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border-3 border-border shadow-md hover:bg-accent-hover active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed transition-all cursor-pointer min-h-[48px] select-none';
    }
    if (variant === 'compact') {
      return 'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-accent text-foreground font-heading font-extrabold text-xs uppercase rounded-lg border-2 border-border shadow-sm hover:bg-accent-hover active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed transition-all cursor-pointer min-h-[44px] select-none';
    }
    return 'inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white font-heading font-bold text-xs uppercase rounded-xl border-3 border-border shadow hover:bg-primary-hover active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed transition-all cursor-pointer min-h-[44px] select-none';
  };

  return (
    <div className={`inline-block ${className}`}>
      <button
        type="button"
        data-cagp-dispatch="cagp:start-semente-tour"
        className={getButtonClasses()}
      >
        <i className={`bi bi-compass-fill ${variant === 'link' ? 'text-base' : 'text-base sm:text-lg'}`} aria-hidden="true"></i>
        <span>{buttonText}</span>
      </button>
    </div>
  );
};
