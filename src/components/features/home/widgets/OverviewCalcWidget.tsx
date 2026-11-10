import React, { useState, useEffect } from 'react';
import { getVaultItem, type VaultData } from '@/lib/storage/studentVault';
import { route } from '@/lib/paths';

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
    <div className="cagp-card p-5 bg-white border-2 border-border rounded-xl flex flex-col justify-between h-full shadow hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-md transition-all">
      <div>
        {/* Header do Widget */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-lg bg-secondary text-white flex items-center justify-center text-lg border-3 border-border shadow-sm">
              <i className="bi bi-calculator text-white" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-head font-bold text-sm text-foreground leading-tight m-0">
                Calculadora 600h
              </h3>
              <span className="text-xs text-gray-700 font-mono font-medium">Extensão Obrigatória & AAC</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md font-head text-xs font-bold bg-secondary text-white border border-border shadow-xs">
            {percent}%
          </span>
        </div>

        {/* Resumo de Progresso */}
        <div className="space-y-2 mb-4">
          <div>
            <div className="flex justify-between text-xs font-mono text-gray-800 mb-1 font-bold">
              <span>Extensão Obrigatória</span>
              <span className="text-secondary">{extClamped} / 300h</span>
            </div>
            <div className="w-full h-3 bg-white border-3 border-border rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-secondary rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (extClamped / 300) * 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-gray-800 mb-1 font-bold">
              <span>Atividades Complementares (AAC)</span>
              <span className="text-success">{aacClamped} / 300h</span>
            </div>
            <div className="w-full h-3 bg-white border-3 border-border rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-success rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (aacClamped / 300) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {total === 0 ? (
          <p className="text-xs text-gray-700 font-body font-medium bg-white p-3 rounded-lg border-2 border-border mb-3 shadow-xs">
            <i className="bi bi-info-circle mr-1 text-secondary" aria-hidden="true" />
            Nenhuma hora lançada ainda. Simule suas atividades para calcular a integralização.
          </p>
        ) : (
          <p className="text-xs text-gray-700 font-body mb-3 font-medium">
            Total integralizado: <strong className="text-secondary font-mono font-bold">{total} de 600h</strong> (restam {600 - total}h).
          </p>
        )}
      </div>

      {/* Ação */}
      <a
        href={route('/acg') + '#calculadora'}
        className="min-h-[44px] px-3.5 py-2 bg-primary text-white text-white hover:bg-primary-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-xl font-head text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all no-underline mt-2 border-3 border-border shadow"
      >
        <span>Abrir Calculadora Completa</span>
        <i className="bi bi-arrow-right" aria-hidden="true" />
      </a>
    </div>
  );
};
