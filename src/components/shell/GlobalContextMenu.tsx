import React, { useState, useEffect, useRef, useCallback } from 'react';
import { route } from '@/lib/paths';
import { CagpIcon } from '@/components/ui/CagpIcon';

export interface ContextMenuEntity {
  type: 'course' | 'cert' | 'proposal' | 'news' | 'tool' | 'doc-template' | 'shell';
  data?: any;
  element?: HTMLElement;
}

export const GlobalContextMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeEntity, setActiveEntity] = useState<ContextMenuEntity>({ type: 'shell' });
  const menuRef = useRef<HTMLDivElement>(null);
  const longPressTimerRef = useRef<number | null>(null);
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const targetElementRef = useRef<HTMLElement | null>(null);

  const openMenu = useCallback((clientX: number, clientY: number, target: HTMLElement | null) => {
    // Detect closest context entity
    const entityEl = target?.closest('[data-context-type]') as HTMLElement | null;
    let entity: ContextMenuEntity = { type: 'shell' };

    if (entityEl) {
      const type = (entityEl.getAttribute('data-context-type') || 'shell') as ContextMenuEntity['type'];
      const rawData = entityEl.getAttribute('data-context-data') || entityEl.getAttribute('data-context-payload');
      let data = {};
      if (rawData) {
        try {
          data = JSON.parse(rawData);
        } catch {
          data = { id: rawData };
        }
      }
      entity = { type, data, element: entityEl };
    }

    setActiveEntity(entity);

    // Keep menu within viewport boundaries
    const menuWidth = 260;
    const menuHeight = 320;
    const x = Math.min(clientX, window.innerWidth - menuWidth - 16);
    const y = Math.min(clientY, window.innerHeight - menuHeight - 16);

    setPosition({ x: Math.max(12, x), y: Math.max(12, y) });
    setIsOpen(true);

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(25);
    }
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    if (targetElementRef.current) {
      targetElementRef.current.classList.remove('cagp-touch-holding');
      targetElementRef.current = null;
    }
  }, []);

  useEffect(() => {
    // 1. Desktop Right Click
    const handleContextMenu = (e: MouseEvent) => {
      // Do not override if holding Shift or if inside standard input/textarea where native context menu is preferred
      const target = e.target as HTMLElement | null;
      if (e.shiftKey) return;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      e.preventDefault();
      openMenu(e.clientX, e.clientY, target);
    };

    // 2. Mobile Long Press (500ms) with tactile micro-scale
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };

      const target = e.target as HTMLElement | null;
      targetElementRef.current = target;
      if (target?.closest('[data-context-type]')) {
        target.closest('[data-context-type]')?.classList.add('cagp-touch-holding');
      }

      if (longPressTimerRef.current) {
        window.clearTimeout(longPressTimerRef.current);
      }

      longPressTimerRef.current = window.setTimeout(() => {
        if (touchStartPosRef.current) {
          openMenu(touchStartPosRef.current.x, touchStartPosRef.current.y, targetElementRef.current);
        }
      }, 500);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartPosRef.current || e.touches.length !== 1) return;
      const touch = e.touches[0];
      const dx = Math.abs(touch.clientX - touchStartPosRef.current.x);
      const dy = Math.abs(touch.clientY - touchStartPosRef.current.y);

      // Cancel long press if user is scrolling (moved more than 10px)
      if (dx > 10 || dy > 10) {
        if (longPressTimerRef.current) {
          window.clearTimeout(longPressTimerRef.current);
          longPressTimerRef.current = null;
        }
        if (targetElementRef.current) {
          targetElementRef.current.closest('[data-context-type]')?.classList.remove('cagp-touch-holding');
        }
      }
    };

    const handleTouchEnd = () => {
      if (longPressTimerRef.current) {
        window.clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
      if (targetElementRef.current) {
        targetElementRef.current.closest('[data-context-type]')?.classList.remove('cagp-touch-holding');
      }
    };

    // 3. Click outside or Escape to close
    const handlePointerDownOutside = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    window.addEventListener('pointerdown', handlePointerDownOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      window.removeEventListener('pointerdown', handlePointerDownOutside);
      window.removeEventListener('keydown', handleKeyDown);
      if (longPressTimerRef.current) {
        window.clearTimeout(longPressTimerRef.current);
      }
    };
  }, [openMenu, closeMenu]);

  if (!isOpen) return null;

  const handleAction = (callback: () => void) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(12);
    }
    callback();
    closeMenu();
  };

  const copyCurrentUrl = () => {
    navigator.clipboard?.writeText(window.location.href);
    window.dispatchEvent(new CustomEvent('cagp:toast', {
      detail: { title: 'Link copiado!', description: 'URL copiada para a área de transferência.', variant: 'success' }
    }));
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('cagp_theme', isDark ? 'dark' : 'light');
    window.dispatchEvent(new CustomEvent('cagp:theme-change', { detail: { theme: isDark ? 'dark' : 'light' } }));
  };

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent('cagp:open-spotlight'));
  };

  const openPassport = () => {
    window.dispatchEvent(new CustomEvent('cagp:open-passport'));
  };

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Menu de Contexto do SuperApp"
      className="fixed z-[9999] min-w-[240px] max-w-[280px] rounded-xl border-2 border-foreground bg-popover p-1.5 text-popover-foreground shadow-lg select-none animate-in fade-in-0 zoom-in-95 duration-100"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {/* Context-Specific Items */}
      {activeEntity.type === 'course' && (
        <div className="pb-1 mb-1 border-b-2 border-border">
          <div className="px-2.5 py-1 text-xs font-heading font-black uppercase tracking-wide text-primary truncate">
            Disciplina: {activeEntity.data?.code || activeEntity.data?.id || 'UFMG'}
          </div>
          <button
            type="button"
            className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-heading font-bold uppercase tracking-wide rounded-lg hover:bg-primary hover:text-white transition-all text-left cursor-pointer"
            onClick={() => handleAction(() => {
              window.dispatchEvent(new CustomEvent('cagp:course-toggle-cursada', { detail: activeEntity.data }));
            })}
          >
            <CagpIcon name="check" className="w-3.5 h-3.5 shrink-0" />
            <span>Alternar Cursada no Vault</span>
          </button>
          <button
            type="button"
            className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-heading font-bold uppercase tracking-wide rounded-lg hover:bg-accent hover:text-accent-foreground transition-all text-left cursor-pointer"
            onClick={() => handleAction(() => {
              window.dispatchEvent(new CustomEvent('cagp:course-view-detail', { detail: activeEntity.data }));
            })}
          >
            <CagpIcon name="thesis" className="w-3.5 h-3.5 shrink-0" />
            <span>Ver Ementa Completa</span>
          </button>
        </div>
      )}

      {activeEntity.type === 'cert' && (
        <div className="pb-1 mb-1 border-b-2 border-border">
          <div className="px-2.5 py-1 text-xs font-heading font-black uppercase tracking-wide text-accent truncate">
            Certificado ACG (600h)
          </div>
          <button
            type="button"
            className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-heading font-bold uppercase tracking-wide rounded-lg hover:bg-accent hover:text-white transition-all text-left cursor-pointer"
            onClick={() => handleAction(() => {
              window.location.href = route('/acg#guardiao-120-dias');
            })}
          >
            <CagpIcon name="clock" className="w-3.5 h-3.5 shrink-0" />
            <span>Verificar Prazo de 120 Dias</span>
          </button>
        </div>
      )}

      {activeEntity.type === 'proposal' && (
        <div className="pb-1 mb-1 border-b-2 border-border">
          <div className="px-2.5 py-1 text-xs font-heading font-black uppercase tracking-wide text-primary truncate">
            Chapa Semente • Proposta
          </div>
          <button
            type="button"
            className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-heading font-bold uppercase tracking-wide rounded-lg hover:bg-primary hover:text-white transition-all text-left cursor-pointer"
            onClick={() => handleAction(() => {
              const text = encodeURIComponent(`Confira esta proposta da Chapa Semente para o CAGP: ${activeEntity.data?.title || window.location.href}`);
              window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
            })}
          >
            <CagpIcon name="users" className="w-3.5 h-3.5 shrink-0" />
            <span>Compartilhar no WhatsApp</span>
          </button>
        </div>
      )}

      {activeEntity.type === 'news' && (
        <div className="pb-1 mb-1 border-b-2 border-border">
          <div className="px-2.5 py-1 text-xs font-heading font-black uppercase tracking-wide text-primary truncate">
            Comunicado Discente
          </div>
          <button
            type="button"
            className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-heading font-bold uppercase tracking-wide rounded-lg hover:bg-primary hover:text-white transition-all text-left cursor-pointer"
            onClick={() => handleAction(copyCurrentUrl)}
          >
            <CagpIcon name="file-text" className="w-3.5 h-3.5 shrink-0" />
            <span>Copiar Link do Comunicado</span>
          </button>
        </div>
      )}

      {/* General SuperApp Actions (Always available) */}
      <div className="space-y-0.5">
        <div className="px-2.5 py-1 text-xs font-heading font-bold uppercase tracking-wide text-muted-foreground">
          Navegação Rápida
        </div>
        <a
          href={route('/')}
          className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-heading font-bold uppercase tracking-wide rounded-lg hover:bg-muted transition-all text-inherit no-underline"
          onClick={() => handleAction(() => {})}
        >
          <span className="flex items-center gap-2">
            <CagpIcon name="hoje" className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Início &amp; Campus</span>
          </span>
          <span className="font-mono text-xs font-bold text-muted-foreground tabular-nums">g h</span>
        </a>
        <a
          href={route('/acg')}
          className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-heading font-bold uppercase tracking-wide rounded-lg hover:bg-muted transition-all text-inherit no-underline"
          onClick={() => handleAction(() => {})}
        >
          <span className="flex items-center gap-2">
            <CagpIcon name="calculator" className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span>Calculadora ACG</span>
          </span>
          <span className="font-mono text-xs font-bold text-muted-foreground tabular-nums">g a</span>
        </a>
        <a
          href={route('/percurso')}
          className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-heading font-bold uppercase tracking-wide rounded-lg hover:bg-muted transition-all text-inherit no-underline"
          onClick={() => handleAction(() => {})}
        >
          <span className="flex items-center gap-2">
            <CagpIcon name="curriculo" className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Simulador Percurso</span>
          </span>
          <span className="font-mono text-xs font-bold text-muted-foreground tabular-nums">g p</span>
        </a>
        <a
          href={route('/chapa-semente')}
          className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-heading font-bold uppercase tracking-wide rounded-lg hover:bg-muted transition-all text-inherit no-underline"
          onClick={() => handleAction(() => {})}
        >
          <span className="flex items-center gap-2">
            <CagpIcon name="sparkle" className="w-3.5 h-3.5 text-accent shrink-0" />
            <span>Chapa Semente</span>
          </span>
          <span className="font-mono text-xs font-bold text-primary tabular-nums">2026</span>
        </a>

        <div className="my-1 border-t-2 border-border"></div>

        <button
          type="button"
          className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-heading font-bold uppercase tracking-wide rounded-lg hover:bg-muted transition-all text-left cursor-pointer"
          onClick={() => handleAction(openSearch)}
        >
          <span className="flex items-center gap-2">
            <CagpIcon name="search" className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Buscar no App</span>
          </span>
          <span className="font-mono text-xs font-bold text-muted-foreground tabular-nums">⌘K</span>
        </button>
        <button
          type="button"
          className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-heading font-bold uppercase tracking-wide rounded-lg hover:bg-muted transition-all text-left cursor-pointer"
          onClick={() => handleAction(openPassport)}
        >
          <span className="flex items-center gap-2">
            <CagpIcon name="passport" className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Passaporte Discente</span>
          </span>
          <span className="font-mono text-xs font-bold text-muted-foreground">Vault</span>
        </button>
        <button
          type="button"
          className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-heading font-bold uppercase rounded-lg hover:bg-muted transition-all text-left cursor-pointer"
          onClick={() => handleAction(toggleTheme)}
        >
          <span className="flex items-center gap-2">
            <CagpIcon name="moon" className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Alternar Tema</span>
          </span>
        </button>
        <button
          type="button"
          className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-heading font-bold uppercase rounded-lg hover:bg-muted transition-all text-left cursor-pointer"
          onClick={() => handleAction(copyCurrentUrl)}
        >
          <span className="flex items-center gap-2">
            <CagpIcon name="file-text" className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Copiar Link da Página</span>
          </span>
        </button>
      </div>
    </div>
  );
};
