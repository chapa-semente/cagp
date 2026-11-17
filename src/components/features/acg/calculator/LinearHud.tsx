import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { bounceSpring } from '@/lib/motion';
import { getVaultItem, type VaultData } from '@/lib/storage/studentVault';
import { CagpIcon } from '@/components/ui/CagpIcon';

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
      className="sticky top-14 z-[40] bg-white border-[3px] border-border rounded-xl p-4 sm:p-5 shadow-md mb-6"
      role="region"
      aria-label="Progresso de Integralização 600h"
    >
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-head font-bold text-xs uppercase text-foreground tracking-wider">
            Meta Global 600h:
          </span>
          <span className="font-mono text-sm font-bold text-secondary tabular-nums">
            {total}h / 600h ({totalCr} cr)
          </span>
          <span className="font-mono text-xs text-muted-foreground tabular-nums font-bold">
            • {totalPct}%
          </span>
          {total >= 600 ? (
            <span className="cagp-stamp-badge is-deferido text-xs py-1 px-2.5 inline-flex items-center gap-1.5 border border-border shadow-xs">
              <CagpIcon name="stamp" className="w-3.5 h-3.5 text-white" />
              <span className="font-bold text-white">INTEGRALIZAÇÃO APTA</span>
            </span>
          ) : (
            <span className="text-xs font-body text-muted-foreground">
              (Faltam {600 - total}h)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          {capExt >= 300 ? (
            <span className="cagp-stamp-badge is-teto text-xs py-1 px-2.5 inline-flex items-center gap-1 border border-border">
              <CagpIcon name="check" className="w-3 h-3 text-white" />
              <span>Ext: 300h Teto</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-md border-3 border-border font-bold bg-secondary text-white shadow-xs tabular-nums">
              Ext: {capExt}/300h
            </span>
          )}

          {capAac >= 300 ? (
            <span className="cagp-stamp-badge is-teto text-xs py-1 px-2.5 inline-flex items-center gap-1 border border-border">
              <CagpIcon name="check" className="w-3 h-3 text-white" />
              <span>AAC: 300h Teto</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-md border-3 border-border font-bold bg-teal-700 text-white shadow-xs tabular-nums">
              AAC: {capAac}/300h
            </span>
          )}
        </div>
      </div>

      {/* Dual Tracks: Extensão e AAC lado a lado com Física de Mola */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2.5 border-t-2 border-border">
        <div>
          <div className="flex justify-between items-center text-xs font-bold mb-1">
            <span className="font-head uppercase text-foreground">1. Extensão Obrigatória (300h)</span>
            <span className="font-mono text-foreground tabular-nums">{capExt}/300h ({extCr} cr)</span>
          </div>
          <div className="w-full bg-surface-hover rounded-full h-3.5 overflow-hidden border-3 border-border shadow-xs">
            <motion.div
              initial={false}
              animate={{ width: `${extPct}%` }}
              transition={bounceSpring}
              className={`h-full ${capExt >= 300 ? 'bg-teal-700' : 'bg-secondary'}`}
              role="progressbar"
              aria-valuenow={capExt}
              aria-valuemin={0}
              aria-valuemax={300}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center text-xs font-bold mb-1">
            <span className="font-head uppercase text-foreground">2. Atividades Complementares • AAC (300h)</span>
            <span className="font-mono text-foreground tabular-nums">{capAac}/300h ({aacCr} cr)</span>
          </div>
          <div className="w-full bg-surface-hover rounded-full h-3.5 overflow-hidden border-3 border-border shadow-xs">
            <motion.div
              initial={false}
              animate={{ width: `${aacPct}%` }}
              transition={bounceSpring}
              className={`h-full ${capAac >= 300 ? 'bg-teal-700' : 'bg-primary'}`}
              role="progressbar"
              aria-valuenow={capAac}
              aria-valuemin={0}
              aria-valuemax={300}
            />
          </div>
        </div>
      </div>

      {/* Selo de Autoria Chapa Semente */}
      <div className="mt-3 pt-2.5 border-t-2 border-border flex flex-wrap items-center justify-between gap-2">
        <span className="cagp-stamp-badge is-semente text-xs py-0.5 px-2.5">
          Ferramenta Criada pela Chapa Semente
        </span>
        <span className="text-xs font-mono font-bold text-muted-foreground">
          Cálculo local salvo automaticamente (15h = 1 cr)
        </span>
      </div>
    </div>
  );
};
