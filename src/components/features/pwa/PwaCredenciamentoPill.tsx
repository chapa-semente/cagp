// src/components/pwa/PwaCredenciamentoPill.tsx
// Pílula Flutuante Neobrutalista para Status de Credenciamento e Mobilização Chapa Semente ("Ativar Meu App")

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { getVaultItem, type ElectionActivation } from '@/lib/storage/studentVault';
import { getWhatsAppShareData } from '@/lib/pwa/pwaManager';
import { bounceSpring, tactileSpring } from '@/lib/motion';

export const PwaCredenciamentoPill: React.FC = () => {
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
    syncState();
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

  if (isDismissed) return null;

  const isCompleted = activation?.completed;

  return (
    <motion.aside
      aria-label="Status do Credenciamento Discente e Eleições"
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={bounceSpring}
      className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:bottom-4 left-3 md:left-6 z-[1040] max-w-[calc(100vw-1.5rem)] sm:max-w-sm pointer-events-auto"
    >
      {isCompleted ? (
        /* Pílula de Apoiador Confirmado da Chapa Semente */
        <motion.div
          onClick={handleOpenCredenciamento}
          whileHover={{ x: -2, y: -2 }}
          whileTap={{ x: 2, y: 2 }}
          transition={tactileSpring}
          className="group flex items-center gap-2 p-1.5 pl-2.5 bg-white border-3 border-[#16181d] rounded-full shadow-[4px_4px_0_0_#16181d] hover:shadow-[6px_6px_0_0_#16181d] transition-shadow cursor-pointer select-none"
          title="Clique para ver seu passaporte eleitoral ou convocar a turma"
        >
          <div className="w-6 h-6 rounded-full bg-primary border-2 border-[#16181d] flex items-center justify-center p-0.5 shrink-0">
            <img
              src="/logos/semente/icone_folha_superior.svg"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain invert brightness-0"
            />
          </div>
          <span className="font-heading text-[11px] font-black uppercase text-foreground tracking-wide">
            Sou Semente • 25 e 26/11
          </span>

          <button
            type="button"
            onClick={handleShare}
            className="px-2.5 py-1 rounded-full bg-[#25D366] text-foreground font-heading font-black text-[10px] uppercase border-2 border-[#16181d] hover:bg-[#1EBE5D] cursor-pointer flex items-center gap-1 transition-transform active:scale-95 shadow-xs"
            title="Convidar turma no WhatsApp"
          >
            <i className="bi bi-whatsapp text-[10px]" aria-hidden="true" />
            <span>Mobilizar</span>
          </button>
        </motion.div>
      ) : (
        /* Pílula Canônica "Ativar Meu App" — Indução Inteligente de WebApp + Lembrete Eleitoral */
        <motion.div
          onClick={handleOpenCredenciamento}
          whileHover={{ x: -2, y: -2 }}
          whileTap={{ x: 2, y: 2 }}
          transition={tactileSpring}
          className="overflow-hidden flex flex-col bg-white border-3 border-[#16181d] rounded-xl shadow-[4px_4px_0_0_#16181d] hover:shadow-[6px_6px_0_0_#16181d] transition-shadow cursor-pointer select-none"
        >
          {/* Micro-faixa tricolor Semente */}
          <div className="h-[4px] w-full flex border-b-2 border-[#16181d]" aria-hidden="true">
            <div className="h-full w-1/3 bg-accent" />
            <div className="h-full w-1/3 bg-secondary" />
            <div className="h-full w-1/3 bg-teal-700" />
          </div>

          <div className="flex items-center gap-2.5 p-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent text-foreground border-2 border-[#16181d] shadow-[2px_2px_0_0_#16181d] flex items-center justify-center shrink-0">
              <i className="bi bi-phone-vibrate-fill text-sm" aria-hidden="true" />
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <span className="font-heading text-xs font-black uppercase text-foreground block leading-tight truncate">
                Ativar Meu App
              </span>
              <span className="text-[10px] font-mono font-bold text-primary block leading-tight truncate">
                Atalho Offline + Urna 25 e 26/11
              </span>
            </div>

            <button
              type="button"
              className="px-2.5 py-1.5 min-h-[32px] rounded-lg bg-primary hover:bg-[#4A216E] text-white font-heading font-black text-[10px] uppercase border-2 border-[#16181d] shadow-[2px_2px_0_0_#16181d] cursor-pointer shrink-0"
            >
              Ativar Meu App
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsDismissed(true);
              }}
              className="w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:bg-background hover:text-foreground cursor-pointer border border-transparent hover:border-[#16181d] bg-transparent text-xs shrink-0"
              aria-label="Minimizar aviso"
              title="Minimizar aviso"
            >
              <i className="bi bi-x-lg text-[10px]" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
};
