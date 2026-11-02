import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

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
      // Expand to large detent on upward swipe
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

  const heightClass = detent === 'large' ? 'h-[90dvh]' : 'h-[50dvh]';

  const sheetContent = (
    <div
      id={id}
      className="fixed inset-0 z-[1080] flex flex-col justify-end pointer-events-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet Modal Container */}
      <div
        className={`relative z-[1090] w-full max-w-2xl mx-auto bg-white/98 backdrop-blur-xl rounded-t-2xl border-2 border-b-0 border-[#0A0A0A] shadow-[0_-8px_32px_rgba(10,10,10,0.2)] flex flex-col transition-all duration-300 animate-in slide-in-from-bottom duration-300 ease-out ${heightClass}`}
        style={{
          transform: `translateY(${dragY}px)`,
          paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
        }}
      >
        {/* Grabber Area */}
        <div
          className="w-full h-10 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={() => setDetent(detent === 'medium' ? 'large' : 'medium')}
          aria-label="Alternar altura da gaveta"
        >
          <div className="w-9 h-1.5 bg-[#DFDBD2] rounded-full hover:bg-gray-400 transition-colors" />
        </div>

        {/* Sheet Topbar */}
        <div className="flex items-center justify-between px-4 pb-2 border-b border-[#DFDBD2]">
          <h2 id={`${id}-title`} className="font-['Oswald'] text-lg font-bold text-[#0A0A0A] uppercase tracking-wide">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F7F5F0] hover:bg-[#DFDBD2] text-[#0A0A0A] font-bold text-sm cursor-pointer transition-colors active:scale-95"
            aria-label="Fechar gaveta"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3 touch-pan-y">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(sheetContent, document.body);
};
