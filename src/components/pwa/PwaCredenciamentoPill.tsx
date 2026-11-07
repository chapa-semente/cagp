// src/components/pwa/PwaCredenciamentoPill.tsx
// Pílula Flutuante Neobrutalista para Status de Credenciamento e Mobilização Chapa Semente (Zero Emojis)

import React, { useState, useEffect } from 'react';
import { getVaultItem, type ElectionActivation } from '../../lib/storage/studentVault';
import { getWhatsAppShareData } from '../../lib/pwa/pwaManager';

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
    <aside
      aria-label="Status do Credenciamento Discente e Eleições"
      className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:bottom-4 left-3 md:left-6 z-[1040] max-w-sm pointer-events-auto"
    >
      {isCompleted ? (
        /* Pílula de Apoiador Confirmado da Chapa Semente */
        <div
          onClick={handleOpenCredenciamento}
          className="group flex items-center gap-2 p-1.5 pl-2.5 bg-white border-3 border-[#16181d] rounded-full shadow-[4px_4px_0_0_#16181d] hover:shadow-[5px_5px_0_0_#16181d] transition-all cursor-pointer select-none"
          title="Clique para ver seu passaporte eleitoral ou convocar a turma"
        >
          <div className="w-5 h-5 rounded-full bg-[#5B2A86] border border-[#16181d] flex items-center justify-center p-0.5 shrink-0">
            <img
              src="/logos/semente/icone_folha_superior.svg"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain invert brightness-0"
            />
          </div>
          <span className="font-heading text-[11px] font-black uppercase text-[#16181d] tracking-wide">
            Sou Semente • 25 e 26/11
          </span>

          <button
            type="button"
            onClick={handleShare}
            className="px-2 py-0.5 rounded-full bg-[#25D366] text-[#0A0A0A] font-heading font-black text-[10px] uppercase border-2 border-[#16181d] hover:bg-[#1EBE5D] cursor-pointer flex items-center gap-1 transition-transform active:scale-95 shadow-[1px_1px_0_0_#16181d]"
            title="Convidar turma no WhatsApp"
          >
            <i className="bi bi-whatsapp text-[10px]" aria-hidden="true" />
            <span>Mobilizar</span>
          </button>
        </div>
      ) : (
        /* Pílula de Indução Contínua para Credenciamento Incompleto com Tricolor */
        <div
          onClick={handleOpenCredenciamento}
          className="overflow-hidden flex flex-col bg-[#FFFDF9] border-3 border-[#16181d] rounded-xl shadow-[4px_4px_0_0_#16181d] hover:bg-[#F4F1EA] transition-all cursor-pointer"
        >
          {/* Micro-faixa tricolor */}
          <div className="h-[3px] w-full flex border-b border-[#16181d]" aria-hidden="true">
            <div className="h-full w-1/3 bg-[#FF8811]" />
            <div className="h-full w-1/3 bg-[#9E2424]" />
            <div className="h-full w-1/3 bg-[#266264]" />
          </div>

          <div className="flex items-center gap-2 p-2">
            <div className="w-6 h-6 rounded bg-[#FF8811] text-[#16181d] border border-[#16181d] flex items-center justify-center shrink-0">
              <i className="bi bi-shield-lock-fill text-xs" aria-hidden="true" />
            </div>

            <div className="flex-1 pr-1">
              <span className="font-heading text-[11px] font-black uppercase text-[#16181d] block leading-tight">
                Credenciamento Pendente
              </span>
              <span className="text-[10px] font-mono text-[#57534E] block leading-tight">
                Offline FAFICH &amp; Eleições 2026
              </span>
            </div>

            <button
              type="button"
              className="px-2 py-1 rounded bg-[#5B2A86] text-white font-heading font-black text-[10px] uppercase border border-[#16181d] shadow-[2px_2px_0_0_#16181d] cursor-pointer shrink-0"
            >
              Ativar
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsDismissed(true);
              }}
              className="w-5 h-5 rounded flex items-center justify-center text-[#57534E] hover:bg-[#16181d]/10 cursor-pointer border-0 bg-transparent text-xs"
              aria-label="Minimizar aviso"
            >
              <i className="bi bi-x-lg text-[10px]" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
