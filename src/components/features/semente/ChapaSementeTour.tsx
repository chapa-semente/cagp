import React from 'react';

interface ChapaSementeTourProps {
  buttonText?: string;
  variant?: 'primary' | 'hero' | 'compact';
  className?: string;
}

export const ChapaSementeTour: React.FC<ChapaSementeTourProps> = ({
  buttonText = 'Conheça a Chapa Semente • Tour das Lideranças',
  variant = 'hero',
  className = '',
}) => {
  const handleStart = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cagp:start-semente-tour'));
    }
  };

  const getButtonClasses = () => {
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
        onClick={handleStart}
        className={getButtonClasses()}
        aria-label="Abrir tour interativo da Chapa Semente"
      >
        <i className="bi bi-compass-fill text-base sm:text-lg"></i>
        <span>{buttonText}</span>
      </button>
    </div>
  );
};
