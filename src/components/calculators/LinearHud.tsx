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
      className="sticky top-14 z-[40] bg-white border-[3px] border-[#0A0A0A] rounded-xl p-4 sm:p-5 shadow-[4px_4px_0_0_#0A0A0A] mb-6"
      role="region"
      aria-label="Progresso de Integralização 600h"
    >
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-head font-bold text-xs uppercase text-[#0A0A0A] tracking-wider">
            Meta Global 600h:
          </span>
          <span className="font-mono text-sm font-bold text-[#9E2424] tabular-nums">
            {total}h / 600h ({totalCr} cr)
          </span>
          <span className="font-mono text-xs text-[#57534E] tabular-nums font-bold">
            • {totalPct}%
          </span>
          {total >= 600 ? (
            <span className="cagp-stamp-badge is-deferido text-[11px] py-1 px-2.5 inline-flex items-center gap-1.5 border border-[#0A0A0A] shadow-[1px_1px_0_0_#0A0A0A]">
              <CagpIcon name="stamp" className="w-3.5 h-3.5 text-white" />
              <span className="font-bold text-white">INTEGRALIZAÇÃO APTA</span>
            </span>
          ) : (
            <span className="text-xs font-body text-[#57534E]">
              (Faltam {600 - total}h)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          {capExt >= 300 ? (
            <span className="cagp-stamp-badge is-teto text-[11px] py-1 px-2.5 inline-flex items-center gap-1 border border-[#0A0A0A]">
              <CagpIcon name="check" className="w-3 h-3 text-white" />
              <span>Ext: 300h Teto</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-md border-2 border-[#0A0A0A] font-bold bg-[#9E2424] text-white shadow-[1.5px_1.5px_0_0_#0A0A0A] tabular-nums">
              Ext: {capExt}/300h
            </span>
          )}

          {capAac >= 300 ? (
            <span className="cagp-stamp-badge is-teto text-[11px] py-1 px-2.5 inline-flex items-center gap-1 border border-[#0A0A0A]">
              <CagpIcon name="check" className="w-3 h-3 text-white" />
              <span>AAC: 300h Teto</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-md border-2 border-[#0A0A0A] font-bold bg-[#266264] text-white shadow-[1.5px_1.5px_0_0_#0A0A0A] tabular-nums">
              AAC: {capAac}/300h
            </span>
          )}
        </div>
      </div>

      {/* Dual Tracks: Extensão e AAC lado a lado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t-2 border-[#0A0A0A]/20">
        <div>
          <div className="flex justify-between items-center text-[11px] font-bold mb-1">
            <span className="font-head uppercase text-[#0A0A0A]">1. Extensão Obrigatória</span>
            <span className="font-mono text-[#0A0A0A]">{capExt}/300h ({extCr} cr)</span>
          </div>
          <div className="w-full bg-[#F3ECE0] rounded-full h-3 overflow-hidden border-2 border-[#0A0A0A] shadow-[1px_1px_0_0_#0A0A0A]">
            <div
              className={`h-full transition-all duration-300 ${capExt >= 300 ? 'bg-[#266264]' : 'bg-[#9E2424]'}`}
              style={{ width: `${extPct}%` }}
              role="progressbar"
              aria-valuenow={capExt}
              aria-valuemin={0}
              aria-valuemax={300}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center text-[11px] font-bold mb-1">
            <span className="font-head uppercase text-[#0A0A0A]">2. Atividades Complementares (AAC)</span>
            <span className="font-mono text-[#0A0A0A]">{capAac}/300h ({aacCr} cr)</span>
          </div>
          <div className="w-full bg-[#F3ECE0] rounded-full h-3 overflow-hidden border-2 border-[#0A0A0A] shadow-[1px_1px_0_0_#0A0A0A]">
            <div
              className={`h-full transition-all duration-300 ${capAac >= 300 ? 'bg-[#266264]' : 'bg-[#5B2A86]'}`}
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
