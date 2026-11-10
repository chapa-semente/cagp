import React, { useState, useEffect } from 'react';
import { getVaultItem, setVaultItem, type VaultData, VaultDefaults, applyA11yPrefsToDOM } from '@/lib/storage/studentVault';
import { route } from '@/lib/paths';
import { SettingsA11ySection } from './SettingsA11ySection';
import { SettingsDataSection } from './SettingsDataSection';

// Ajustes (/configuracoes): acessibilidade + atalhos para os donos de cada dado.
// Backup mora em Seu perfil, lembretes em Campus agora, documentos em /documentos.
export const SettingsInteractive: React.FC = () => {
  const [a11y, setA11y] = useState<VaultData<'cagp_a11y_prefs_v2'>>(VaultDefaults.cagp_a11y_prefs_v2);

  useEffect(() => {
    const storedA11y = getVaultItem('cagp_a11y_prefs_v2');
    setA11y(storedA11y);
    applyA11yPrefsToDOM(storedA11y);
  }, []);

  const updateA11y = (partial: Partial<VaultData<'cagp_a11y_prefs_v2'>>) => {
    const updated = { ...a11y, ...partial };
    setA11y(updated);
    setVaultItem('cagp_a11y_prefs_v2', updated);
    applyA11yPrefsToDOM(updated);
  };

  return (
    <div className="space-y-6 font-body">
      <SettingsA11ySection a11y={a11y} updateA11y={updateA11y} />

      <SettingsDataSection />

      <section aria-labelledby="ajustes-sobre" className="bg-white border-2 border-border rounded-xl p-5 sm:p-6 shadow-md space-y-3 text-foreground">
        <h2 id="ajustes-sobre" className="font-heading font-bold text-lg m-0">Sobre este app</h2>
        <p className="text-sm text-content-secondary m-0">
          Site estático, gratuito e que funciona offline, feito pela Chapa Semente para quem estuda Gestão Pública na FAFICH/UFMG.
          O conteúdo é Markdown simples: qualquer gestão do CA consegue manter.
        </p>
        <p className="text-sm m-0">
          Regimento, regulamento e PPC estão em{' '}
          <a href={route('/documentos')} className="text-primary font-bold underline">Documentos</a>.
        </p>
        <p className="text-xs text-muted-foreground font-mono tabular-nums m-0">Versão 3.0.0</p>
      </section>
    </div>
  );
};
