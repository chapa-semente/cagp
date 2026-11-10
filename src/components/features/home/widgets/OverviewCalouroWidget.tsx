import React, { useState, useEffect } from 'react';
import { getVaultItem, type VaultData } from '@/lib/storage/studentVault';
import { route } from '@/lib/paths';

export const OverviewCalouroWidget: React.FC = () => {
  const [data, setData] = useState<VaultData<'cagp_calouro_checklist_v1'>>({});

  useEffect(() => {
    setData(getVaultItem('cagp_calouro_checklist_v1') || {});

    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail?.key === 'cagp_calouro_checklist_v1') {
        setData(custom.detail.value || {});
      }
    };

    window.addEventListener('cagp:vault-updated', handleUpdate);
    return () => window.removeEventListener('cagp:vault-updated', handleUpdate);
  }, []);

  const totalTasks = 12;
  const doneCount = Object.values(data).filter(Boolean).length;
  const percent = Math.round((doneCount / totalTasks) * 100);

  return (
    <div className="cagp-card p-5 bg-white border-2 border-border rounded-xl flex flex-col justify-between h-full shadow hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-md transition-all">
      <div>
        {/* Header do Widget */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-lg bg-info text-white flex items-center justify-center text-lg border-3 border-border shadow-sm">
              <i className="bi bi-backpack text-white" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-head font-bold text-sm text-foreground leading-tight m-0">
                Guia do Calouro
              </h3>
              <span className="text-xs text-gray-700 font-mono font-medium">Primeiros 30 Dias na FAFICH</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md font-head text-xs font-bold bg-info text-white border border-border shadow-xs">
            {doneCount}/{totalTasks}
          </span>
        </div>

        {/* Progresso do Calouro */}
        <div className="space-y-2 mb-4">
          <p className="text-xs text-gray-700 leading-relaxed font-body font-medium">
            Checklist prático: carteirinha de estudante, cadastro no RU II, acesso ao SIGA, e-mail institucional e sala da secretaria F-2039.
          </p>

          <div>
            <div className="flex justify-between text-xs font-mono text-gray-800 mb-1 font-bold">
              <span>Etapas Concluídas</span>
              <span className="text-info">{percent}%</span>
            </div>
            <div className="w-full h-3 bg-white border-3 border-border rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-info rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-gray-600 italic font-body font-medium">
            {doneCount === 0
              ? 'Comece agora marcando as tarefas já realizadas.'
              : `${doneCount} de ${totalTasks} etapas concluídas com sucesso.`}
          </p>
        </div>
      </div>

      {/* Ação */}
      <a
        href={route('/calouros') + '#checklist'}
        className="min-h-[44px] px-3.5 py-2 bg-primary text-white text-white hover:bg-info active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-xl font-head text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all no-underline mt-2 border-3 border-border shadow"
      >
        <span>Abrir Guia do Calouro</span>
        <i className="bi bi-arrow-right" aria-hidden="true" />
      </a>
    </div>
  );
};
