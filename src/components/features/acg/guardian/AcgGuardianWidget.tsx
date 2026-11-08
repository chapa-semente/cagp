// src/components/features/acg/guardian/AcgGuardianWidget.tsx — Widget de Resumo do Guardião de 120 Dias
import React, { useState, useEffect } from 'react';
import { getVaultItem, type VaultData } from '../../../../lib/storage/studentVault';

export const AcgGuardianWidget: React.FC = () => {
  const [certs, setCerts] = useState<VaultData<'cagp_aac_120d_certs_v1'>>([]);

  useEffect(() => {
    const load = () => {
      setCerts(getVaultItem('cagp_aac_120d_certs_v1') || []);
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

  // Calcular dias restantes para cada certificado
  const now = new Date().getTime();
  const certsWithDays = certs.map((c) => {
    const issueDate = new Date(c.date).getTime();
    const deadline = issueDate + 120 * 24 * 60 * 60 * 1000;
    const diffDays = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
    return { ...c, diffDays };
  });

  certsWithDays.sort((a, b) => a.diffDays - b.diffDays);
  const nearest = certsWithDays[0];

  return (
    <div className="cagp-card p-5 bg-white border-3 border-border rounded-xl flex flex-col justify-between h-full shadow hover:shadow-xs hover:translate-x-[1px] hover:translate-y-[1px] transition-all select-none">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-lg border border-accent shadow-xs">
              <i className="bi bi-shield-exclamation" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-head font-bold text-sm uppercase text-foreground leading-tight m-0">
                Alerta 120 Dias
              </h3>
              <span className="text-[11px] text-muted-foreground font-mono">Art. 15, § 4º do Regulamento</span>
            </div>
          </div>
          <span
            className={`px-2.5 py-1 rounded-md font-head text-[11px] font-bold border border-border shadow-xs ${
              !nearest
                ? 'bg-white text-foreground'
                : nearest.diffDays < 0
                ? 'bg-secondary text-white'
                : nearest.diffDays <= 30
                ? 'bg-accent text-foreground'
                : 'bg-teal-700 text-white'
            }`}
          >
            {!nearest ? 'Sem Certificados' : nearest.diffDays < 0 ? 'Expirado' : `${nearest.diffDays} dias restantes`}
          </span>
        </div>

        <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3.5">
          Monitor do prazo decadencial fatal de 120 dias para eventos como ouvinte (Mod. III) e trabalhos em anais (Mod. VII).
        </p>

        {certs.length > 0 && nearest ? (
          <div className="p-3.5 bg-white border border-border rounded-xl mb-4 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[10px] font-head uppercase font-bold text-muted-foreground">
                Próximo a Vencer ({certs.length} cadastrado{certs.length > 1 ? 's' : ''}):
              </span>
              <span className="text-xs font-mono font-bold text-foreground">{nearest.hours}h</span>
            </div>
            <div className="text-xs font-bold font-head uppercase text-foreground truncate">{nearest.title}</div>
            <div className="text-[11px] font-mono flex items-center justify-between mt-1.5">
              <span className="text-muted-foreground">{nearest.mod}</span>
              <span
                className={`font-bold ${
                  nearest.diffDays < 0
                    ? 'text-secondary'
                    : nearest.diffDays <= 30
                    ? 'text-accent'
                    : 'text-[#266264]'
                }`}
              >
                {nearest.diffDays < 0
                  ? `Venceu há ${Math.abs(nearest.diffDays)} dias`
                  : `Vence em ${nearest.diffDays} dias`}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-3.5 bg-white border border-border rounded-xl mb-4 text-center">
            <p className="font-body text-xs text-muted-foreground m-0">
              Nenhum certificado cadastrado. Adicione seus comprovantes para receber avisos antes do prazo prescricional.
            </p>
          </div>
        )}
      </div>

      <a
        href="#guardiao-120-dias"
        className="min-h-[44px] px-4 py-2.5 bg-foreground text-background hover:bg-accent hover:text-foreground active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-white rounded-xl font-head text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all no-underline border-3 border-border shadow-sm"
      >
        <span>Gerenciar Certificados</span>
        <i className="bi bi-arrow-right" aria-hidden="true" />
      </a>
    </div>
  );
};
