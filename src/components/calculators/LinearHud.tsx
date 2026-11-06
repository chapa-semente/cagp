import React, { useState, useEffect } from 'react';
import { getVaultItem, type VaultData } from '../../lib/storage/studentVault';
import { CagpIcon } from '../ui/CagpIcon';

export const LinearHud: React.FC = () => {
  const [calcData, setCalcData] = useState<VaultData<'cagp_calc_ext_aac_v1'>>({});

  const refresh = () => {
    setCalcData(getVaultItem('cagp_calc_ext_aac_v1'));
  };

  useEffect(() => {
    refresh();
    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail?.key === 'cagp_calc_ext_aac_v1') {
        setCalcData(custom.detail.value);
      }
    };
    window.addEventListener('cagp:vault-updated', handleUpdate);
    return () => window.removeEventListener('cagp:vault-updated', handleUpdate);
  }, []);

  // Compute totals respecting aliases
  let totalExt = 0;
  let totalAac = 0;
  for (const [k, v] of Object.entries(calcData)) {
    const val = Number(v) || 0;
    if (k.startsWith('ext_')) totalExt += val;
    if (k.startsWith('aac_')) totalAac += val;
  }
  const capExt = Math.min(totalExt, 300);
  const capAac = Math.min(totalAac, 300);
  const extCr = Math.round(capExt / 15);
  const aacCr = Math.round(capAac / 15);
  const extPct = Math.min(100, Math.round((capExt / 300) * 100));
  const aacPct = Math.min(100, Math.round((capAac / 300) * 100));

  const total = capExt + capAac;
  const totalCr = extCr + aacCr;
  const totalPct = Math.min(100, Math.round((total / 600) * 100));

  return (
    <div
      id="cagp-calc-hud-linear"
      className="sticky top-14 z-[40] bg-white border border-[#DFDBD2] rounded-2xl p-4 shadow-sm mb-4"
      role="region"
      aria-label="Progresso de Integralização 600h"
    >
      <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-['Oswald'] font-bold text-xs uppercase text-[#0A0A0A] tracking-wider">
            Meta Global 600h:
          </span>
          <span className="font-mono text-sm font-bold text-[#8B1E2D] tabular-nums">
            {total}h / 600h ({totalCr} cr)
          </span>
          <span className="font-mono text-xs text-[#57534E] tabular-nums">
            • {totalPct}%
          </span>
          {total >= 600 ? (
            <span className="cagp-stamp-badge is-deferido text-[11px] py-1 px-2.5 inline-flex items-center gap-1.5">
              <CagpIcon name="stamp" className="w-3.5 h-3.5 text-green-700" />
              <span className="font-bold text-green-800">INTEGRALIZAÇÃO APTA</span>
            </span>
          ) : (
            <span className="text-xs font-['Inter'] text-[#57534E]">
              (Faltam {600 - total}h)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          {capExt >= 300 ? (
            <span className="cagp-stamp-badge is-teto text-[11px] py-1 px-2.5 inline-flex items-center gap-1">
              <CagpIcon name="check" className="w-3 h-3 text-green-700" />
              <span>Ext: 300h Teto</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full border font-bold bg-[#8B1E2D]/10 text-[#8B1E2D] border-[#8B1E2D]/30 tabular-nums">
              Ext: {capExt}/300h
            </span>
          )}

          {capAac >= 300 ? (
            <span className="cagp-stamp-badge is-teto text-[11px] py-1 px-2.5 inline-flex items-center gap-1">
              <CagpIcon name="check" className="w-3 h-3 text-green-700" />
              <span>AAC: 300h Teto</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full border font-bold bg-[#F4F1EA] text-[#292524] border-[#DFDBD2] tabular-nums">
              AAC: {capAac}/300h
            </span>
          )}
        </div>
      </div>

      {/* Dual Tracks: Extensão e AAC lado a lado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 border-t border-[#DFDBD2]">
        <div>
          <div className="flex justify-between items-center text-[11px] font-semibold mb-1">
            <span className="font-['Oswald'] uppercase text-gray-700">1. Extensão Obrigatória</span>
            <span className="font-mono text-gray-900">{capExt}/300h ({extCr} cr)</span>
          </div>
          <div className="w-full bg-[#F7F5F0] rounded-full h-2 overflow-hidden border border-[#DFDBD2]">
            <div
              className={`h-full transition-all duration-300 rounded-full ${capExt >= 300 ? 'bg-[#15803D]' : 'bg-[#9E2424]'}`}
              style={{ width: `${extPct}%` }}
              role="progressbar"
              aria-valuenow={capExt}
              aria-valuemin={0}
              aria-valuemax={300}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center text-[11px] font-semibold mb-1">
            <span className="font-['Oswald'] uppercase text-gray-700">2. Atividades Complementares (AAC)</span>
            <span className="font-mono text-gray-900">{capAac}/300h ({aacCr} cr)</span>
          </div>
          <div className="w-full bg-[#F7F5F0] rounded-full h-2 overflow-hidden border border-[#DFDBD2]">
            <div
              className={`h-full transition-all duration-300 rounded-full ${capAac >= 300 ? 'bg-[#15803D]' : 'bg-[#1E3F66]'}`}
              style={{ width: `${aacPct}%` }}
              role="progressbar"
              aria-valuenow={capAac}
              aria-valuemin={0}
              aria-valuemax={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
