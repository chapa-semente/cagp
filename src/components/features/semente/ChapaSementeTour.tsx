import React from 'react';

interface ChapaSementeTourProps {
  buttonText?: string;
  variant?: 'primary' | 'hero' | 'compact';
  className?: string;
}

export const ChapaSementeTour: React.FC<ChapaSementeTourProps> = ({
  buttonText = 'Conheça a Chapa Semente • Tour das 9 Lideranças',
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
      return 'inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-[#FF8811] text-white font-heading font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border-3 border-border shadow-[4px_4px_0px_#000] hover:bg-[#FF8811]/90 active:translate-y-[2px] active:shadow-none transition-all cursor-pointer min-h-[48px] select-none';
    }
    if (variant === 'compact') {
      return 'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#FF8811] text-white font-heading font-extrabold text-xs uppercase rounded-lg border-2 border-border shadow-[2px_2px_0px_#000] hover:bg-[#FF8811]/90 active:translate-y-[1px] transition-all cursor-pointer min-h-[44px] select-none';
    }
    return 'inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white font-heading font-bold text-xs uppercase rounded-xl border-3 border-border shadow-[3px_3px_0px_#000] hover:bg-primary/90 active:translate-y-[1px] transition-all cursor-pointer min-h-[44px] select-none';
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
