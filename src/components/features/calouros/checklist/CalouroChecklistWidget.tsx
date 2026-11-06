// src/components/features/calouros/checklist/CalouroChecklistWidget.tsx — Widget de Resumo do Checklist do Calouro (Padrão Dossiê Tátil)
import React, { useState, useEffect } from 'react';
import { getVaultItem, type VaultData } from '../../../../lib/storage/studentVault';
import { CagpIcon } from '../../../ui/CagpIcon';

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
    <div className="p-5 sm:p-6 bg-white border border-[#DFDBD2] rounded-3xl flex flex-col justify-between h-full shadow-xs hover:border-[#8B1E2D]/50 transition-all select-none">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-[#8B1E2D]/10 text-[#8B1E2D] flex items-center justify-center border border-[#8B1E2D]/20 shrink-0">
              <CagpIcon name="checklist" className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-['Oswald'] font-bold text-sm uppercase text-[#0A0A0A] leading-tight m-0">
                Checklist 30 Dias
              </h3>
              <span className="text-[11px] text-[#57534E] font-mono">10 Passos Essenciais</span>
            </div>
          </div>
          {completedCount >= TOTAL_ITEMS ? (
            <span className="cagp-stamp-badge is-homologado text-[10px] py-0.5 px-2.5 shadow-xs">
              <span className="inline-flex items-center gap-1">
                <CagpIcon name="stamp" className="w-3 h-3 inline" />
                <span>HOMOLOGADO</span>
              </span>
            </span>
          ) : (
            <span
              className={`px-2.5 py-0.5 rounded-full font-['Oswald'] text-[11px] font-bold ${
                completedCount > 0
                  ? 'bg-[#8B1E2D] text-white'
                  : 'bg-[#FBF8F3] text-[#57534E] border border-[#DFDBD2]'
              }`}
            >
              {completedCount}/{TOTAL_ITEMS} Concluídos
            </span>
          )}
        </div>

        <p className="text-xs text-[#292524] leading-relaxed mb-4">
          Ativação de sistemas (MinhaUFMG, eduroam), emissão de carteirinha, FUMP e reconhecimento do campus.
        </p>

        {/* Barra de Progresso */}
        <div className="space-y-1.5 mb-4">
          <div className="flex justify-between text-[11px] text-[#57534E] font-mono">
            <span>Progresso</span>
            <span className="font-bold text-[#8B1E2D]">{pct}%</span>
          </div>
          <div className="w-full bg-[#FBF8F3] border border-[#DFDBD2] rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#8B1E2D] h-full transition-all duration-300"
              style={{ width: `${Math.min(100, pct)}%` }}
            />
          </div>
        </div>
      </div>

      <a
        href="#checklist"
        className="min-h-[44px] px-4 py-2 bg-[#8B1E2D] hover:bg-[#6D1723] active:scale-95 text-white rounded-xl font-['Oswald'] text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all no-underline shadow-xs"
      >
        <span>Abrir Checklist 30d</span>
        <CagpIcon name="chevron-right" className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};
