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
    <div className="p-5 sm:p-6 bg-white border-2 border-[#0A0A0A] rounded-xl flex flex-col justify-between h-full shadow-[3px_3px_0_0_#0A0A0A] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_0_#0A0A0A] transition-all select-none">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-lg bg-[#8B1E2D] text-white flex items-center justify-center border-2 border-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] shrink-0">
              <CagpIcon name="checklist" className="w-4 h-4 text-white" />
            </span>
            <div>
              <h3 className="font-head font-bold text-sm uppercase text-[#0A0A0A] leading-tight m-0 tracking-wide">
                Checklist 30 Dias
              </h3>
              <span className="text-[11px] text-gray-700 font-mono font-medium">10 Passos Essenciais</span>
            </div>
          </div>
          {completedCount >= TOTAL_ITEMS ? (
            <span className="cagp-stamp-badge is-homologado text-[10px] py-0.5 px-2.5 shadow-[2px_2px_0_0_#0A0A0A]">
              <span className="inline-flex items-center gap-1 font-head font-bold uppercase tracking-wider">
                <CagpIcon name="stamp" className="w-3 h-3 inline" />
                <span>HOMOLOGADO</span>
              </span>
            </span>
          ) : (
            <span
              className={`px-2.5 py-0.5 rounded-md font-head text-[11px] font-bold border border-[#0A0A0A] shadow-[1px_1px_0_0_#0A0A0A] ${
                completedCount > 0
                  ? 'bg-[#8B1E2D] text-white'
                  : 'bg-[#FBF8F3] text-gray-800'
              }`}
            >
              {completedCount}/{TOTAL_ITEMS} Concluídos
            </span>
          )}
        </div>

        <p className="text-xs text-gray-700 leading-relaxed mb-4 font-body font-medium">
          Ativação de sistemas (MinhaUFMG, eduroam), emissão de carteirinha, FUMP e reconhecimento do campus.
        </p>

        {/* Barra de Progresso */}
        <div className="space-y-1.5 mb-4">
          <div className="flex justify-between text-xs text-gray-800 font-mono font-bold">
            <span>Progresso</span>
            <span className="text-[#8B1E2D]">{pct}%</span>
          </div>
          <div className="w-full bg-[#FBF8F3] border-2 border-[#0A0A0A] rounded-full h-3 overflow-hidden p-0.5">
            <div
              className="bg-[#8B1E2D] h-full transition-all duration-300 rounded-full"
              style={{ width: `${Math.min(100, pct)}%` }}
            />
          </div>
        </div>
      </div>

      <a
        href="#checklist"
        className="min-h-[44px] px-4 py-2 bg-[#8B1E2D] hover:bg-[#6D1723] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-white rounded-xl font-head text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all no-underline shadow-[3px_3px_0_0_#0A0A0A] border-2 border-[#0A0A0A]"
      >
        <span>Abrir Checklist 30d</span>
        <CagpIcon name="chevron-right" className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};
