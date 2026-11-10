// src/components/features/estagio/art41/Art41Widget.tsx — Widget de Resumo do Aproveitamento Servidor (Art. 41)
import React, { useState, useEffect } from 'react';
import { getVaultItem, type VaultData } from '../../../../lib/storage/studentVault';

const CRITERIA_IDS = ['crit_vinculo', 'crit_matricula', 'crit_fase1', 'crit_horas', 'crit_fase2'];

export const Art41Widget: React.FC = () => {
  const [checks, setChecks] = useState<VaultData<'cagp_art41_checklist_v1'>>({});

  useEffect(() => {
    const load = () => {
      setChecks(getVaultItem('cagp_art41_checklist_v1') || {});
    };
    load();
    const handleUpdate = () => load();
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('cagp:vault-updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('cagp:vault-updated', handleUpdate);
    };
  }, []);

  const checkedCount = CRITERIA_IDS.filter((id) => checks[id]).length;
  const isEligible = checkedCount === 5;

  return (
    <div className="cagp-card p-5 bg-white border-2 border-border rounded-xl flex flex-col justify-between h-full shadow-md hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-xl transition-all select-none">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-xl bg-petroleo-deep text-white flex items-center justify-center text-lg border-2 border-border shadow-sm">
              <i className="bi bi-briefcase-fill" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-head font-bold text-sm text-foreground leading-tight m-0">
                Aproveitamento Servidor
              </h3>
              <span className="text-xs text-muted-foreground font-mono">Dispensa Art. 41 • Setor Público</span>
            </div>
          </div>
          <span
            className={`px-2.5 py-1 rounded-md font-head text-xs font-bold border-2 border-border shadow-xs ${
              isEligible
                ? 'bg-petroleo-deep text-white'
                : checkedCount > 0
                ? 'bg-accent text-foreground'
                : 'bg-white text-foreground'
            }`}
          >
            {isEligible ? 'Elegível' : `${checkedCount}/5 Critérios`}
          </span>
        </div>

        <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3.5">
          Trilha oficial de <strong>Aproveitamento Servidor (Art. 41)</strong> para dispensar as 300h de estágio com atuação no setor público ou OSC.
        </p>

        <div className="p-3 bg-white border-2 border-border rounded-lg mb-4 flex items-center justify-between text-xs shadow-xs">
          <span className="text-muted-foreground font-medium">Status da Simulação:</span>
          <span className="font-mono font-bold text-petroleo-deep">
            {isEligible ? 'Dispensa Apta (300h)' : `${checkedCount} requisitos marcados`}
          </span>
        </div>
      </div>

      <a
        href="#art41"
        className="min-h-[44px] px-4 py-2.5 bg-petroleo-deep hover:bg-petroleo-deep text-white rounded-xl font-head text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all no-underline border-3 border-border shadow-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      >
        <span>Simular Aproveitamento Servidor</span>
        <i className="bi bi-arrow-right" aria-hidden="true" />
      </a>
    </div>
  );
};
