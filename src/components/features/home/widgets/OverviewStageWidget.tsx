import React, { useState, useEffect } from 'react';
import { getVaultItem, type VaultData } from '@/lib/storage/studentVault';
import { route } from '@/lib/paths';

export const OverviewStageWidget: React.FC = () => {
  const [data, setData] = useState<VaultData<'cagp_art41_checklist_v1'>>({});

  useEffect(() => {
    setData(getVaultItem('cagp_art41_checklist_v1') || {});

    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail?.key === 'cagp_art41_checklist_v1') {
        setData(custom.detail.value || {});
      }
    };

    window.addEventListener('cagp:vault-updated', handleUpdate);
    return () => window.removeEventListener('cagp:vault-updated', handleUpdate);
  }, []);

  const totalRequired = 17;
  const checkedCount = Object.values(data).filter(Boolean).length;
  const percent = Math.round((checkedCount / totalRequired) * 100);

  return (
    <div className="cagp-card p-5 bg-white border-2 border-border rounded-xl flex flex-col justify-between h-full shadow hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-md transition-all">
      <div>
        {/* Header do Widget */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-lg bg-success text-white flex items-center justify-center text-lg border-3 border-border shadow-sm">
              <i className="bi bi-briefcase text-white" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-head font-bold text-sm text-foreground leading-tight m-0">
                Estágio & Art. 41
              </h3>
              <span className="text-xs text-gray-700 font-mono font-medium">DCP 135 e DCP 136 (300h)</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md font-head text-xs font-bold bg-success text-white border border-border shadow-xs">
            {checkedCount}/{totalRequired}
          </span>
        </div>

        {/* Status de Elegibilidade */}
        <div className="space-y-2 mb-4">
          <p className="text-xs text-gray-700 leading-relaxed font-body font-medium">
            Servidores públicos e profissionais comissionados ou de ONGs podem dispensar os <strong>Estágios A e B</strong> via Art. 41 do Regulamento N-20229.
          </p>

          <div>
            <div className="flex justify-between text-xs font-mono text-gray-800 mb-1 font-bold">
              <span>Requisitos Cumpridos</span>
              <span className="text-success">{percent}%</span>
            </div>
            <div className="w-full h-3 bg-white border-3 border-border rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-success rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {checkedCount >= totalRequired ? (
            <div className="p-2.5 bg-success-tint border-3 border-border rounded-lg text-xs text-success font-bold flex items-center gap-2 shadow-xs">
              <i className="bi bi-check-circle-fill text-base" aria-hidden="true" />
              <span className="font-head uppercase tracking-wide">Perfil Elegível para Dispensa Total</span>
            </div>
          ) : (
            <p className="text-xs text-gray-600 italic font-body font-medium">
              {checkedCount === 0
                ? 'Checklist de elegibilidade ainda não preenchido.'
                : `Faltam ${totalRequired - checkedCount} critérios para atingir dispensa completa.`}
            </p>
          )}
        </div>
      </div>

      {/* Ação */}
      <a
        href={route('/estagio') + '#art41'}
        className="min-h-[44px] px-3.5 py-2 bg-primary text-white text-white hover:bg-success active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-xl font-head text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all no-underline mt-2 border-3 border-border shadow"
      >
        <span>Simular Dispensa Art. 41</span>
        <i className="bi bi-arrow-right" aria-hidden="true" />
      </a>
    </div>
  );
};
