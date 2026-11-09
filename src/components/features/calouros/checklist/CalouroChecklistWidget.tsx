// src/components/features/calouros/checklist/CalouroChecklistWidget.tsx — Widget de Resumo do Checklist do Calouro (Padrão Dossiê Tátil)
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { getVaultItem, type VaultData } from '../../../../lib/storage/studentVault';
import { CagpIcon } from '@/components/ui/CagpIcon';
import { bounceSpring } from '@/lib/motion';

const TOTAL_ITEMS = 10;

export const CalouroChecklistWidget: React.FC = () => {
  const [checks, setChecks] = useState<VaultData<'cagp_calouro_checklist_v1'>>({});

  useEffect(() => {
    const load = () => {
      setChecks(getVaultItem('cagp_calouro_checklist_v1') || {});
    };
    load();
    const handleUpdate = () => load();
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('cagp:vault-updated', handleUpdate);
    window.addEventListener('cagp-vault-updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('cagp:vault-updated', handleUpdate);
      window.removeEventListener('cagp-vault-updated', handleUpdate);
    };
  }, []);

  const completedCount = Object.values(checks).filter(Boolean).length;
  const pct = Math.round((completedCount / TOTAL_ITEMS) * 100);

  return (
    <div className="p-5 sm:p-6 bg-white border-3 border-[#16181d] rounded-xl flex flex-col justify-between h-full shadow-[6px_6px_0_0_#16181d] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_0_#16181d] transition-all select-none">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-lg bg-[#5B2A86] text-white flex items-center justify-center border-3 border-[#16181d] shadow-[2px_2px_0_0_#16181d] shrink-0">
              <CagpIcon name="checklist" className="w-5 h-5 text-white" />
            </span>
            <div>
              <h3 className="font-head font-black text-sm uppercase text-[#16181d] leading-tight m-0 tracking-wide">
                Checklist 30 Dias
              </h3>
              <span className="text-xs text-gray-700 font-mono font-bold">10 Passos • Cofre Local</span>
            </div>
          </div>
          {completedCount >= TOTAL_ITEMS ? (
            <span className="cagp-stamp-badge is-homologado text-xs py-0.5 px-2.5 shadow-sm">
              <span className="inline-flex items-center gap-1 font-head font-bold uppercase tracking-wider">
                <CagpIcon name="stamp" className="w-3 h-3 inline" />
                <span>HOMOLOGADO</span>
              </span>
            </span>
          ) : (
            <span
              className={`px-2.5 py-0.5 rounded-md font-mono text-xs font-black uppercase border-2 border-[#16181d] shadow-[2px_2px_0_0_#16181d] ${
                completedCount > 0
                  ? 'bg-[#5B2A86] text-white'
                  : 'bg-[#FFFDF9] text-[#16181d]'
              }`}
            >
              {completedCount}/{TOTAL_ITEMS} Feitos
            </span>
          )}
        </div>

        <p className="text-xs text-gray-800 leading-relaxed mb-4 font-body font-medium">
          Ativação de sistemas (MinhaUFMG, eduroam), emissão de carteirinha, FUMP e reconhecimento da FAFICH.
        </p>

        {/* Barra de Progresso Animada */}
        <div className="space-y-1.5 mb-4">
          <div className="flex justify-between text-xs text-[#16181d] font-mono font-black">
            <span>Progresso Salvo</span>
            <span className="text-[#5B2A86]">{pct}%</span>
          </div>
          <div className="w-full bg-[#f4f0ea] border-3 border-[#16181d] rounded-full h-3.5 overflow-hidden p-0.5 shadow-[2px_2px_0_0_#16181d]">
            <motion.div
              initial={false}
              animate={{ width: `${Math.min(100, pct)}%` }}
              transition={bounceSpring}
              className="bg-gradient-to-r from-[#5B2A86] to-[#FF8811] h-full rounded-full"
            />
          </div>
        </div>
      </div>

      <a
        href="#checklist"
        className="min-h-[44px] px-4 py-2.5 bg-[#5B2A86] hover:bg-[#461e69] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 text-white rounded-xl font-head text-xs uppercase font-black tracking-wider flex items-center justify-center gap-2 transition-all no-underline shadow-[4px_4px_0_0_#16181d] border-3 border-[#16181d]"
      >
        <span>Carimbar Checklist 30d</span>
        <CagpIcon name="chevron-right" className="w-4 h-4" />
      </a>
    </div>
  );
};
