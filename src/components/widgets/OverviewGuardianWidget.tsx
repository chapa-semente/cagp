import React, { useState, useEffect } from 'react';
import { getVaultItem, type StudentCert } from '../../lib/storage/studentVault';
import { route } from '../../lib/paths';

export const OverviewGuardianWidget: React.FC = () => {
  const [certs, setCerts] = useState<StudentCert[]>([]);

  useEffect(() => {
    const list = getVaultItem('cagp_aac_120d_certs_v1') || [];
    setCerts(list);

    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail?.key === 'cagp_aac_120d_certs_v1') {
        setCerts(custom.detail.value || []);
      }
    };

    window.addEventListener('cagp:vault-updated', handleUpdate);
    return () => window.removeEventListener('cagp:vault-updated', handleUpdate);
  }, []);

  return (
    <div className="cagp-card p-5 bg-white border-2 border-[#0A0A0A] rounded-xl flex flex-col justify-between h-full shadow-[3px_3px_0_0_#0A0A0A] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_0_#0A0A0A] transition-all">
      <div>
        {/* Header do Widget */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-lg bg-[#B45309] text-white flex items-center justify-center text-lg border-2 border-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A]">
              <i className="bi bi-shield-check text-white" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-head font-bold text-sm uppercase text-[#0A0A0A] leading-tight m-0 tracking-wide">
                Guardião 120 Dias
              </h3>
              <span className="text-[11px] text-gray-700 font-mono font-medium">Art. 15, § 4º Regulamento N-20229</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md font-head text-xs font-bold bg-[#B45309] text-white border border-[#0A0A0A] shadow-[1px_1px_0_0_#0A0A0A]">
            {certs.length} certs
          </span>
        </div>

        {/* Status dos Certificados */}
        <div className="mb-4">
          <div className="bg-[#FEF3C7] border-2 border-[#0A0A0A] rounded-lg p-3 mb-3 text-xs text-[#0A0A0A] leading-relaxed shadow-[1px_1px_0_0_#0A0A0A]">
            <div className="font-bold flex items-center gap-1.5 text-[#B45309] mb-1 font-head uppercase tracking-wider text-[11px]">
              <i className="bi bi-alarm-fill" aria-hidden="true" />
              <span>Prazo Fatal Regimental:</span>
            </div>
            Certificados de AAC devem ser protocolados perante o Colegiado de Gestão Pública em até <strong>120 dias corridos</strong> da emissão.
          </div>

          {certs.length > 0 ? (
            <div className="space-y-2">
              <span className="text-xs font-head uppercase tracking-wider text-[#0A0A0A] font-bold">
                Últimos Certificados Cadastrados:
              </span>
              {certs.slice(0, 2).map((c) => (
                <div key={c.id} className="p-2.5 bg-white border-2 border-[#0A0A0A] rounded-lg text-xs flex justify-between items-center shadow-[1px_1px_0_0_#0A0A0A]">
                  <span className="font-medium text-gray-900 truncate max-w-[170px] font-body">{c.title}</span>
                  <span className="font-mono text-[#8B1E2D] font-bold text-xs">{c.hours}h</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-600 italic font-body font-medium">
              Nenhum certificado cadastrado ainda no cofre local.
            </p>
          )}
        </div>
      </div>

      {/* Ação */}
      <a
        href={route('/acg') + '#guardiao-120-dias'}
        className="min-h-[44px] px-3.5 py-2 bg-[#0A0A0A] text-white hover:bg-[#B45309] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-xl font-head text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all no-underline mt-2 border-2 border-[#0A0A0A] shadow-[3px_3px_0_0_#0A0A0A]"
      >
        <span>Gerenciar Certificados & Prazos</span>
        <i className="bi bi-arrow-right" aria-hidden="true" />
      </a>
    </div>
  );
};
