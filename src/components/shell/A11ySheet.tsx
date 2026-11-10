import React, { useState, useEffect } from 'react';
import { DirectionProvider } from '@/components/ui/direction';
import { BottomSheet } from './BottomSheet';
import { getVaultItem, setVaultItem, type VaultData, VaultDefaults, applyA11yPrefsToDOM } from '@/lib/storage/studentVault';
import { A11yTabContent } from './A11yTabContent';
import { SettingsDataSection } from '@/components/features/settings/SettingsDataSection';

interface A11ySheetProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'a11y' | 'settings';
}

export const A11ySheet: React.FC<A11ySheetProps> = ({ isOpen, onClose, initialTab = 'a11y' }) => {
  const [activeTab, setActiveTab] = useState<'a11y' | 'settings'>(initialTab);
  const [prefs, setPrefs] = useState<VaultData<'cagp_a11y_prefs_v2'>>(VaultDefaults.cagp_a11y_prefs_v2);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = getVaultItem('cagp_a11y_prefs_v2');
      setPrefs(stored);
      applyA11yPrefsToDOM(stored);

      const handleA11yEvt = () => setActiveTab('a11y');
      const handleSettingsEvt = () => setActiveTab('settings');

      window.addEventListener('cagp:open-a11y', handleA11yEvt);
      window.addEventListener('cagp:open-settings', handleSettingsEvt);

      return () => {
        window.removeEventListener('cagp:open-a11y', handleA11yEvt);
        window.removeEventListener('cagp:open-settings', handleSettingsEvt);
      };
    }
  }, []);

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  const update = (partial: Partial<VaultData<'cagp_a11y_prefs_v2'>>) => {
    const updated = { ...prefs, ...partial };
    setPrefs(updated);
    setVaultItem('cagp_a11y_prefs_v2', updated);
    applyA11yPrefsToDOM(updated);
  };

  const title = 'Ajustes';

  return (
    <DirectionProvider dir="ltr">
      <BottomSheet id="cagp-a11y-sheet" isOpen={isOpen} onClose={onClose} title={title} initialDetent="medium">
        <div className="space-y-4">
          {/* Ajustes = Leitura (acessibilidade) + Seus dados (atalhos para os donos de cada dado). */}
          <div role="tablist" aria-label="Ajustes" className="grid grid-cols-2 gap-1.5 p-1.5 bg-muted rounded-xl border-2 border-border">
            <button
              type="button"
              onClick={() => setActiveTab('a11y')}
              role="tab"
              aria-selected={activeTab === 'a11y'}
              className={`min-h-[44px] py-2 px-3 text-xs font-heading font-bold uppercase tracking-[0.03em] rounded-lg border-2 cursor-pointer flex items-center justify-center gap-1.5 transition-[background-color,color,transform] duration-(--duration-press) ease-(--ease-spring-snappy) active:translate-x-px active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
                activeTab === 'a11y'
                  ? 'bg-active text-active-foreground border-border shadow-xs'
                  : 'border-transparent text-foreground hover:bg-white'
              }`}
            >
              <i className="bi bi-universal-access" aria-hidden="true"></i> Leitura
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              role="tab"
              aria-selected={activeTab === 'settings'}
              className={`min-h-[44px] py-2 px-3 text-xs font-heading font-bold uppercase tracking-[0.03em] rounded-lg border-2 cursor-pointer flex items-center justify-center gap-1.5 transition-[background-color,color,transform] duration-(--duration-press) ease-(--ease-spring-snappy) active:translate-x-px active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
                activeTab === 'settings'
                  ? 'bg-active text-active-foreground border-border shadow-xs'
                  : 'border-transparent text-foreground hover:bg-white'
              }`}
            >
              <i className="bi bi-gear-fill" aria-hidden="true"></i> Seus dados
            </button>
          </div>

          {activeTab === 'a11y' && (
            <div className="cagp-animate-ws-enter">
              <A11yTabContent prefs={prefs} update={update} />
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="cagp-animate-ws-enter">
              <SettingsDataSection compact />
            </div>
          )}
        </div>
      </BottomSheet>
    </DirectionProvider>
  );
};
