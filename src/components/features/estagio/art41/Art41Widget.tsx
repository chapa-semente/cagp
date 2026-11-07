// src/components/features/estagio/art41/Art41Widget.tsx — Widget de Resumo da Dispensa Art. 41
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
    window.addEventListener('cagp-vault-updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('cagp-vault-updated', handleUpdate);
    };
  }, []);

  const checkedCount = CRITERIA_IDS.filter((id) => checks[id]).length;
  const isEligible = checkedCount === 5;

  return (
    <div className="cagp-card p-5 bg-white border-2 border-[#0A0A0A] rounded-xl flex flex-col justify-between h-full shadow-[3px_3px_0_0_#0A0A0A] hover:shadow-[1.5px_1.5px_0_0_#0A0A0A] hover:translate-x-[1px] hover:translate-y-[1px] transition-all select-none">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-xl bg-[#9E2424]/10 text-[#9E2424] flex items-center justify-center text-lg border border-[#9E2424] shadow-[1px_1px_0_0_#0A0A0A]">
              <i className="bi bi-briefcase-fill" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-head font-bold text-sm uppercase text-[#0A0A0A] leading-tight m-0">
                Dispensa Art. 41
              </h3>
              <span className="text-[11px] text-[#57534E] font-mono">Servidores & Setor Público</span>
            </div>
          </div>
          <span
            className={`px-2.5 py-1 rounded-md font-head text-[11px] font-bold border border-[#0A0A0A] shadow-[1px_1px_0_0_#0A0A0A] ${
              isEligible
                ? 'bg-[#266264] text-white'
                : checkedCount > 0
                ? 'bg-[#FF8811] text-[#0A0A0A]'
                : 'bg-white text-[#0A0A0A]'
            }`}
          >
            {isEligible ? 'Elegível' : `${checkedCount}/5 Critérios`}
          </span>
        </div>

        <p className="font-body text-xs text-[#292524] leading-relaxed mb-3.5">
          Simulador oficial para aproveitamento de atuação profissional no setor público para dispensa das 300h de estágio.
        </p>

        <div className="p-3 bg-white border border-[#0A0A0A] rounded-lg mb-4 flex items-center justify-between text-xs shadow-[1px_1px_0_0_#0A0A0A]">
          <span className="text-[#57534E] font-medium">Status da Simulação:</span>
          <span className="font-mono font-bold text-[#0A0A0A]">
            {isEligible ? 'Dispensa Apta (300h)' : `${checkedCount} requisitos marcados`}
          </span>
        </div>
      </div>

      <a
        href="#art41"
        className="min-h-[44px] px-4 py-2.5 bg-[#9E2424] hover:bg-[#851E1E] text-white rounded-xl font-head text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all no-underline border-2 border-[#0A0A0A] shadow-[2.5px_2.5px_0_0_#0A0A0A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      >
        <span>Abrir Simulador Art. 41</span>
        <i className="bi bi-arrow-right" aria-hidden="true" />
      </a>
    </div>
  );
};
