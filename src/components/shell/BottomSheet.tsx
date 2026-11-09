import React, { useState, useEffect, useRef } from 'react';

interface BottomSheetProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialDetent?: 'medium' | 'large';
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  id,
  isOpen,
  onClose,
  title,
  initialDetent = 'medium',
  children,
}) => {
  const [detent, setDetent] = useState<'medium' | 'large'>(initialDetent);
  const [dragY, setDragY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const isDragging = useRef(false);
  const startY = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setDetent(initialDetent);
    setDragY(0);
  }, [isOpen, initialDetent]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted || typeof document === 'undefined') return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    if (diff > 0) {
      setDragY(diff);
    } else if (diff < -40 && detent === 'medium') {
      setDetent('large');
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (dragY > 100) {
      onClose();
    }
    setDragY(0);
  };

  const heightClass = detent === 'large' ? 'h-[90svh] max-h-[90svh] md:max-h-[85svh]' : 'h-[60svh] max-h-[75svh]';

  return (
    <div
      id={id}
      className="fixed inset-0 z-[1080] flex flex-col justify-end md:justify-center md:items-center p-0 md:p-4 pointer-events-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 transition-opacity duration-200 animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet / Form Sheet Modal Container Neobrutalista */}
      <div
        className={`relative z-[1090] w-full max-w-2xl md:max-w-xl mx-auto bg-white rounded-t-2xl md:rounded-2xl border-[3px] border-border shadow-[0_-6px_0_0_#16181d] md:shadow-lg flex flex-col transition-all duration-200 animate-in slide-in-from-bottom md:zoom-in-95 ease-out ${heightClass}`}
        style={{
          transform: `translateY(${dragY}px)`,
          paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
        }}
      >
        {/* Grabber Area (Mobile only) */}
        <div
          className="w-full h-8 flex md:hidden items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none shrink-0"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={() => setDetent(detent === 'medium' ? 'large' : 'medium')}
          aria-label="Alternar altura da gaveta"
        >
          <div className="w-12 h-2 bg-foreground text-background rounded-full hover:bg-black transition-colors" />
        </div>

        {/* Sheet Topbar */}
        <div className="flex items-center justify-between px-4 pt-2 md:pt-4 pb-3 border-b-[3px] border-border shrink-0">
          <h2 id={`${id}-title`} className="font-heading text-lg md:text-xl font-extrabold text-foreground">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDetent(detent === 'medium' ? 'large' : 'medium')}
              className="hidden md:flex w-9 h-9 items-center justify-center rounded-xl bg-white hover:bg-muted border-[2px] border-border shadow-xs text-foreground text-xs font-bold transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              title={detent === 'medium' ? 'Expandir' : 'Recolher'}
              aria-label={detent === 'medium' ? 'Expandir gaveta' : 'Recolher gaveta'}
            >
              <i className={`bi ${detent === 'medium' ? 'bi-arrows-angle-expand' : 'bi-arrows-angle-contract'}`}></i>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white hover:bg-muted border-[2px] border-border shadow-xs text-foreground hover:text-secondary font-bold text-sm transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              aria-label="Fechar gaveta"
            >
              <i className="bi bi-x-lg" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scrollable Sheet Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 md:p-5 font-sans">
          {children}
        </div>
      </div>
    </div>
  );
};
