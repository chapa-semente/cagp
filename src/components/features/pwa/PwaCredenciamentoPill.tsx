// src/components/features/pwa/PwaCredenciamentoPill.tsx
// Pílula Flutuante Neobrutalista Compacta para Status de Credenciamento e Mobilização Chapa Semente
// Rigorosamente ancorada no rodapé (bottom) e sobreposta à frente do conteúdo das páginas:
// 1. Sobreposição Frontal (z-[1070]): Flutua à frente de todo o conteúdo das páginas, cards, rodapé e BottomNav.
// 2. Elevação Neobrutalista Tátil: Borda border-3 border-border com sombra sólida shadow-[4px_4px_0_0_var(--color-border,#16181d)], destacando-se nitidamente do plano de fundo.
// 3. Ancoragem Estrita ao Rodapé (top: auto !important):
//    - Mobile (< 768px): bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] left-3, compacto (h-11), alvos de toque 44x44pt.
//    - Tablet (768px - 1279px): md:bottom-5 md:left-[108px] (respiro para sidebar de 92px).
//    - Desktop (>= 1280px): xl:bottom-6 xl:left-[288px] (respiro para sidebar de 264px).
// 4. Renderização Instantânea (SSR + Client Portal): Renders no SSR para zero layout flash e porta para document.body no cliente.
// 5. Persistência de Dismiss: O botão de fechar grava em sessionStorage para navegação desimpedida.

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { getVaultItem, type ElectionActivation } from '@/lib/storage/studentVault';
import { getWhatsAppShareData } from '@/lib/pwa/pwaManager';
import { tactileSpring } from '@/lib/motion';
import { asset } from '@/lib/paths';

export const PwaCredenciamentoPill: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [activation, setActivation] = useState<ElectionActivation | null>(null);
  const [studentName, setStudentName] = useState('Estudante de Gestão Pública');
  const [isDismissed, setIsDismissed] = useState(false);

  const syncState = () => {
    try {
      const act = getVaultItem('cagp_election_activation_v1');
      setActivation(act);
      const profile = getVaultItem('cagp_student_profile_v1');
      if (profile && profile.name) {
        setStudentName(profile.name);
      }
    } catch (e) {
      console.warn('[PWA] Erro ao sincronizar estado da pílula:', e);
    }
  };

  useEffect(() => {
    setMounted(true);
    syncState();
    if (typeof window !== 'undefined') {
      const dismissed = sessionStorage.getItem('cagp_pill_dismissed_v1');
      if (dismissed === 'true') {
        setIsDismissed(true);
      }
    }
    window.addEventListener('cagp:vault-updated', syncState);
    return () => window.removeEventListener('cagp:vault-updated', syncState);
  }, []);

  const handleOpenCredenciamento = () => {
    window.dispatchEvent(new CustomEvent('cagp:open-credenciamento'));
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { url } = getWhatsAppShareData(studentName);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('cagp_pill_dismissed_v1', 'true');
    }
  };

  if (isDismissed) return null;

  const isCompleted = activation?.completed;

  const content = (
    <AnimatePresence>
      <motion.aside
        key="cagp-semente-floating-pill"
        aria-label="Status do Credenciamento Discente e Eleições"
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={tactileSpring}
        style={{
          position: 'fixed',
          top: 'auto',
        }}
        className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:bottom-5 xl:bottom-6 left-3 md:left-[108px] xl:left-[288px] z-[1070] pointer-events-auto select-none max-w-[calc(100vw-1.5rem)] sm:max-w-max"
      >
        {isCompleted ? (
          /* Pílula de Apoiador Confirmado da Chapa Semente */
          <motion.div
            onClick={handleOpenCredenciamento}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={tactileSpring}
            className="flex items-center gap-2 h-11 px-1.5 pl-2.5 bg-white border-3 border-border rounded-full shadow-[4px_4px_0_0_var(--color-border,#16181d)] hover:shadow-[6px_6px_0_0_var(--color-border,#16181d)] transition-all cursor-pointer group"
            title="Ver passaporte eleitoral ou mobilizar turma"
          >
            <div className="w-6 h-6 rounded-full bg-primary border-2 border-border flex items-center justify-center p-0.5 shrink-0">
              <img
                src={asset('/logos/semente/icone_folha_superior.svg')}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-contain invert brightness-0"
              />
            </div>
            <span className="font-heading text-xs font-black uppercase text-foreground tracking-tight whitespace-nowrap">
              <span className="hidden sm:inline">Sou Semente • 25 e 26/11</span>
              <span className="sm:hidden">Sou Semente</span>
            </span>

            <button
              type="button"
              onClick={handleShare}
              className="px-3 min-h-[44px] rounded-full bg-[#25D366] text-foreground font-heading font-black text-xs uppercase border-2 border-border hover:bg-[#1EBE5D] cursor-pointer flex items-center gap-1 transition-transform active:scale-95 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              title="Convidar turma no WhatsApp"
            >
              <i className="bi bi-whatsapp text-xs" aria-hidden="true" />
              <span className="hidden sm:inline">Mobilizar</span>
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0"
              title="Fechar aviso"
              aria-label="Fechar aviso"
            >
              <i className="bi bi-x text-base" aria-hidden="true" />
            </button>
          </motion.div>
        ) : (
          /* Pílula Compacta "Ativar Meu App" — Indução PWA Discreta */
          <motion.div
            onClick={handleOpenCredenciamento}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={tactileSpring}
            className="flex items-center gap-2 h-11 px-1.5 pl-2.5 bg-white border-3 border-border rounded-full shadow-[4px_4px_0_0_var(--color-border,#16181d)] hover:shadow-[6px_6px_0_0_var(--color-border,#16181d)] transition-all cursor-pointer group"
            title="Ativar atalho offline e urna 25 e 26/11"
          >
            <div className="w-6 h-6 rounded-full bg-accent text-foreground border-2 border-border flex items-center justify-center shrink-0">
              <i className="bi bi-phone-vibrate-fill text-xs" aria-hidden="true" />
            </div>

            <div className="flex flex-col pr-0.5">
              <span className="font-heading text-xs font-black uppercase text-foreground tracking-tight leading-none whitespace-nowrap">
                <span className="hidden sm:inline">Ativar App • Urna 25 e 26/11</span>
                <span className="sm:hidden">Ativar App</span>
              </span>
            </div>

            <button
              type="button"
              className="px-3 min-h-[44px] rounded-full bg-primary hover:bg-primary-hover text-white font-heading font-black text-xs uppercase border-2 border-border shadow-xs cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Ativar
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0"
              title="Fechar aviso"
              aria-label="Fechar aviso"
            >
              <i className="bi bi-x text-base" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </motion.aside>
    </AnimatePresence>
  );

  // No cliente, monta via portal no document.body para garantir isolamento contra transforms;
  // No SSR, renderiza diretamente para garantir presença imediata no HTML inicial.
  if (mounted && typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }

  return content;
};
