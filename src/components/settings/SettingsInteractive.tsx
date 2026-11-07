import React, { useState, useEffect } from 'react';
import { getVaultItem, setVaultItem, type VaultData, VaultDefaults, getAllVaultData, applyA11yPrefsToDOM } from '../../lib/storage/studentVault';
import { exportVaultBackup, importVaultBackup } from '../../lib/storage/backupVault';
import { asset } from '../../lib/paths';
import { SettingsA11ySection } from './SettingsA11ySection';
import { SettingsAlertsSection } from './SettingsAlertsSection';
import { SettingsVaultSection } from './SettingsVaultSection';

export const SettingsInteractive: React.FC = () => {
  const [a11y, setA11y] = useState<VaultData<'cagp_a11y_prefs_v2'>>(VaultDefaults.cagp_a11y_prefs_v2);

  const [notifs, setNotifs] = useState<VaultData<'cagp_notifications_prefs_v1'>>({
    ru1815: false,
    circular2230: false,
    aac120d: true,
  });

  const [vaultSize, setVaultSize] = useState<number>(0);
  const [backupInput, setBackupInput] = useState<string>('');
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedA11y = getVaultItem('cagp_a11y_prefs_v2');
      const storedNotifs = getVaultItem('cagp_notifications_prefs_v1');
      setA11y(storedA11y);
      setNotifs(storedNotifs);
      applyA11yPrefsToDOM(storedA11y);

      const all = getAllVaultData();
      const bytes = new Blob([JSON.stringify(all)]).size;
      setVaultSize(bytes);
    }
  }, []);

  const updateA11y = (partial: Partial<VaultData<'cagp_a11y_prefs_v2'>>) => {
    const updated = { ...a11y, ...partial };
    setA11y(updated);
    setVaultItem('cagp_a11y_prefs_v2', updated);
    applyA11yPrefsToDOM(updated);
  };

  const updateNotifs = (partial: Partial<VaultData<'cagp_notifications_prefs_v1'>>) => {
    const updated = { ...notifs, ...partial };
    setNotifs(updated);
    setVaultItem('cagp_notifications_prefs_v1', updated);
  };

  const handleExportBackup = () => {
    const token = exportVaultBackup();
    navigator.clipboard.writeText(token);
    setFeedback({ text: 'Token de backup copiado com sucesso!', type: 'success' });
  };

  const handleImportBackup = () => {
    if (!backupInput.trim()) {
      setFeedback({ text: 'Insira um token CAGP1:... válido.', type: 'error' });
      return;
    }
    const res = importVaultBackup(backupInput.trim());
    if (res.success) {
      setFeedback({ text: `Backup restaurado! (${res.restoredKeys} chaves atualizadas)`, type: 'success' });
      setBackupInput('');
      const storedA11y = getVaultItem('cagp_a11y_prefs_v2');
      const storedNotifs = getVaultItem('cagp_notifications_prefs_v1');
      setA11y(storedA11y);
      setNotifs(storedNotifs);
      applyA11yPrefsToDOM(storedA11y);
    } else {
      setFeedback({ text: res.error || 'Erro na restauração.', type: 'error' });
    }
  };

  const handleResetVault = () => {
    if (window.confirm('Atenção: todos os dados locais do cofre serão redefinidos para os padrões. Deseja prosseguir?')) {
      localStorage.clear();
      setFeedback({ text: 'Cofre discente limpo. Recarregue a página.', type: 'success' });
      setTimeout(() => window.location.reload(), 1200);
    }
  };

  return (
    <div className="space-y-6 font-body">
      {feedback && (
        <div
          className={`p-4 rounded-xl border-2 border-[#0A0A0A] shadow-[3px_3px_0_0_#0A0A0A] text-xs font-head font-bold uppercase flex items-center gap-2.5 ${
            feedback.type === 'success'
              ? 'bg-[#E8F5E9] text-[#15803D]'
              : 'bg-[#FFEBEE] text-[#C4161C]'
          }`}
        >
          <i
            className={`bi text-base ${
              feedback.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'
            }`}
          />
          <span>{feedback.text}</span>
        </div>
      )}

      {/* 1. ACESSIBILIDADE UNIVERSAL */}
      <SettingsA11ySection a11y={a11y} updateA11y={updateA11y} />

      {/* 2. ALERTAS DO CAMPUS */}
      <SettingsAlertsSection notifs={notifs} updateNotifs={updateNotifs} />

      {/* 3. COFRE DISCENTE */}
      <SettingsVaultSection
        vaultSize={vaultSize}
        backupInput={backupInput}
        setBackupInput={setBackupInput}
        handleExportBackup={handleExportBackup}
        handleImportBackup={handleImportBackup}
        handleResetVault={handleResetVault}
      />

      {/* 4. REGIMENTOS, ATOS & TRANSPARÊNCIA */}
      <section className="bg-white border-[3px] border-[#0A0A0A] rounded-xl p-5 sm:p-6 shadow-[4px_4px_0_0_#0A0A0A] space-y-4">
        <div className="border-b-2 border-[#0A0A0A] pb-3">
          <h2 className="font-head text-base sm:text-lg font-extrabold uppercase text-[#0A0A0A] m-0 tracking-tight">
            4. Regimentos, Atos &amp; Transparência
          </h2>
          <p className="text-xs text-[#0A0A0A] m-0 font-medium">Documentos mestres que regem a vida acadêmica discente</p>
        </div>

        <div className="border-2 border-[#0A0A0A] rounded-xl overflow-hidden divide-y-2 divide-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A]">
          <a
            href={asset('/documentos/regimento-interno-cagp-ufmg.pdf')}
            download
            className="p-3.5 bg-[#FBF8F3] hover:bg-white flex items-center justify-between gap-3 text-xs no-underline transition-colors group"
          >
            <div className="space-y-0.5 min-w-0">
              <span className="font-head font-extrabold uppercase text-[#0A0A0A] block group-hover:text-[#8B1E2D]">
                Regimento Interno do CAGP (14/10/2024)
              </span>
              <span className="text-xs text-[#0A0A0A] font-medium block">
                Estatuto soberano aprovado pela Assembleia Geral Discente
              </span>
            </div>
            <i className="bi bi-download text-base text-[#8B1E2D]" aria-hidden="true" />
          </a>
          <a
            href={asset('/documentos/regulamento-gestao-publica-ufmg.pdf')}
            download
            className="p-3.5 bg-[#FBF8F3] hover:bg-white flex items-center justify-between gap-3 text-xs no-underline transition-colors group"
          >
            <div className="space-y-0.5 min-w-0">
              <span className="font-head font-extrabold uppercase text-[#0A0A0A] block group-hover:text-[#8B1E2D]">
                Regulamento do Curso Versão N-20229
              </span>
              <span className="text-xs text-[#0A0A0A] font-medium block">
                Normas oficiais de AAC, estágio e culminância de TCC
              </span>
            </div>
            <i className="bi bi-download text-base text-[#8B1E2D]" aria-hidden="true" />
          </a>
          <a
            href={asset('/documentos/ppc-gestao-publica-ufmg.pdf')}
            download
            className="p-3.5 bg-[#FBF8F3] hover:bg-white flex items-center justify-between gap-3 text-xs no-underline transition-colors group"
          >
            <div className="space-y-0.5 min-w-0">
              <span className="font-head font-extrabold uppercase text-[#0A0A0A] block group-hover:text-[#8B1E2D]">
                Projeto Pedagógico do Curso (PPC 2020)
              </span>
              <span className="text-xs text-[#0A0A0A] font-medium block">
                Estrutura curricular de 3.000h e perfil de formação discente
              </span>
            </div>
            <i className="bi bi-download text-base text-[#8B1E2D]" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* 5. GOVERNANÇA E PWA */}
      <section className="bg-white border-[3px] border-[#0A0A0A] rounded-xl p-5 shadow-[4px_4px_0_0_#0A0A0A] text-xs text-[#0A0A0A] space-y-2">
        <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-2">
          <span className="font-head text-xs sm:text-sm font-extrabold uppercase text-[#0A0A0A]">
            Super App Discente CAGP UFMG
          </span>
          <span className="font-mono text-xs font-bold bg-[#FBF8F3] px-2 py-0.5 rounded border border-[#0A0A0A]">
            Versão 3.0.0 (Astro 7)
          </span>
        </div>
        <p className="leading-relaxed m-0 font-medium">
          Aplicativo estático progressivo (PWA) de custo zero e código aberto sob licença GPLv3. Desenvolvido para
          garantir autonomia, privacidade total e transparência aos estudantes do Bacharelado em Gestão Pública da
          FAFICH/UFMG.
        </p>
      </section>
    </div>
  );
};
