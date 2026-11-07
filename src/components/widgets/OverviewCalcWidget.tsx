import React, { useState, useEffect } from 'react';
import { getVaultItem, type VaultData } from '../../lib/storage/studentVault';
import { route } from '../../lib/paths';

export const OverviewCalcWidget: React.FC = () => {
  const [data, setData] = useState<VaultData<'cagp_calc_ext_aac_v1'>>({});

  const calculateHours = (currentData: Record<string, number>) => {
    let extSum = 0;
    let aacSum = 0;

    for (const [key, val] of Object.entries(currentData)) {
      const num = Number(val) || 0;
      if (key.startsWith('ext_')) {
        extSum += num;
      } else if (key.startsWith('aac_')) {
        aacSum += num;
      }
    }

    const extClamped = Math.min(300, Math.max(0, extSum));
    const aacClamped = Math.min(300, Math.max(0, aacSum));
    const total = Math.min(600, extClamped + aacClamped);

    return { extClamped, aacClamped, total };
  };

  useEffect(() => {
    setData(getVaultItem('cagp_calc_ext_aac_v1') || {});

    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail?.key === 'cagp_calc_ext_aac_v1') {
        setData(custom.detail.value || {});
      }
    };

    window.addEventListener('cagp:vault-updated', handleUpdate);
    return () => window.removeEventListener('cagp:vault-updated', handleUpdate);
  }, []);

  const { extClamped, aacClamped, total } = calculateHours(data);
  const percent = Math.round((total / 600) * 100);

  return (
    <div className="cagp-card p-5 bg-white border-2 border-[#0A0A0A] rounded-xl flex flex-col justify-between h-full shadow-[3px_3px_0_0_#0A0A0A] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_0_#0A0A0A] transition-all">
      <div>
        {/* Header do Widget */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-lg bg-[#8B1E2D] text-white flex items-center justify-center text-lg border-2 border-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A]">
              <i className="bi bi-calculator text-white" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-head font-bold text-sm uppercase text-[#0A0A0A] leading-tight m-0 tracking-wide">
                Calculadora 600h
              </h3>
              <span className="text-[11px] text-gray-700 font-mono font-medium">Extensão Obrigatória & AAC</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md font-head text-xs font-bold bg-[#8B1E2D] text-white border border-[#0A0A0A] shadow-[1px_1px_0_0_#0A0A0A]">
            {percent}%
          </span>
        </div>

        {/* Resumo de Progresso */}
        <div className="space-y-2 mb-4">
          <div>
            <div className="flex justify-between text-xs font-mono text-gray-800 mb-1 font-bold">
              <span>Extensão Obrigatória</span>
              <span className="text-[#8B1E2D]">{extClamped} / 300h</span>
            </div>
            <div className="w-full h-3 bg-white border-2 border-[#0A0A0A] rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-[#8B1E2D] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (extClamped / 300) * 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-gray-800 mb-1 font-bold">
              <span>Atividades Complementares (AAC)</span>
              <span className="text-[#15803D]">{aacClamped} / 300h</span>
            </div>
            <div className="w-full h-3 bg-white border-2 border-[#0A0A0A] rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-[#15803D] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (aacClamped / 300) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {total === 0 ? (
          <p className="text-xs text-gray-700 font-body font-medium bg-white p-3 rounded-lg border-2 border-[#0A0A0A] mb-3 shadow-[1px_1px_0_0_#0A0A0A]">
            <i className="bi bi-info-circle mr-1 text-[#8B1E2D]" aria-hidden="true" />
            Nenhuma hora lançada ainda. Simule suas atividades para calcular a integralização.
          </p>
        ) : (
          <p className="text-xs text-gray-700 font-body mb-3 font-medium">
            Total integralizado: <strong className="text-[#8B1E2D] font-mono font-bold">{total} de 600h</strong> (restam {600 - total}h).
          </p>
        )}
      </div>

      {/* Ação */}
      <a
        href={route('/acg') + '#calculadora'}
        className="min-h-[44px] px-3.5 py-2 bg-[#0A0A0A] text-white hover:bg-[#8B1E2D] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-xl font-head text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all no-underline mt-2 border-2 border-[#0A0A0A] shadow-[3px_3px_0_0_#0A0A0A]"
      >
        <span>Abrir Calculadora Completa</span>
        <i className="bi bi-arrow-right" aria-hidden="true" />
      </a>
    </div>
  );
};
