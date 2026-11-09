import React, { useState, useEffect } from 'react';
import { getVaultItem, setVaultItem, type VaultData, getAllVaultData } from '@/lib/storage/studentVault';
import { exportVaultBackup, importVaultBackup } from '@/lib/storage/backupVault';
import { downloadPresetIcs } from '@/lib/calendar/icsGenerator';
import { route } from '@/lib/paths';

export const SettingsTabContent: React.FC = () => {
  const [notifs, setNotifs] = useState<VaultData<'cagp_notifications_prefs_v1'>>({
    ru1815: false,
    circular2230: false,
    aac120d: true,
  });
  const [vaultBytes, setVaultBytes] = useState<number>(0);
  const [backupInput, setBackupInput] = useState<string>('');
  const [feedback, setFeedback] = useState<{ text: string; isSuccess: boolean } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setNotifs(getVaultItem('cagp_notifications_prefs_v1'));
      const all = getAllVaultData();
      const bytes = new Blob([JSON.stringify(all)]).size;
      setVaultBytes(bytes);
    }
  }, []);

  const updateNotif = (partial: Partial<VaultData<'cagp_notifications_prefs_v1'>>) => {
    const updated = { ...notifs, ...partial };
    setNotifs(updated);
    setVaultItem('cagp_notifications_prefs_v1', updated);
  };

  const handleCopyBackup = () => {
    const token = exportVaultBackup();
    navigator.clipboard.writeText(token);
    setFeedback({ text: 'Token CAGP1 copiado para a área de transferência!', isSuccess: true });
    if (typeof window !== 'undefined' && (window as any).cagpToast) {
      (window as any).cagpToast('Token CAGP1 copiado!', 'bi-clipboard-check-fill');
    }
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleRestore = () => {
    if (!backupInput.trim()) return;
    const res = importVaultBackup(backupInput.trim());
    if (res.success) {
      setFeedback({ text: `Backup restaurado! (${res.restoredKeys} chaves atualizadas)`, isSuccess: true });
      setBackupInput('');
      setTimeout(() => window.location.reload(), 1200);
    } else {
      setFeedback({ text: res.error || 'Falha ao restaurar.', isSuccess: false });
    }
  };

  const handleClear = () => {
    if (window.confirm('Atenção: todos os dados salvos neste aparelho serão resetados. Prosseguir?')) {
      localStorage.clear();
      setFeedback({ text: 'Cofre redefinido.', isSuccess: true });
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <div className="space-y-4 text-foreground">
      {feedback && (
        <div className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center gap-2 ${feedback.isSuccess ? 'bg-success/10 text-success border-success' : 'bg-destructive/10 text-destructive border-destructive'}`}>
          <i className={`bi ${feedback.isSuccess ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'}`} />
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Alertas do Campus */}
      <div className="bg-background p-3.5 rounded-xl border-2 border-border shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-heading font-extrabold text-xs uppercase tracking-tight text-foreground">
            <i className="bi bi-bell-fill text-warning me-1.5"></i> Alertas Noturnos
          </span>
          <span className="text-xs font-mono font-bold text-muted-foreground">Noturno FAFICH</span>
        </div>

        <div className="flex items-center justify-between text-xs pt-2 border-t-2 border-border">
          <div>
            <span className="font-heading font-bold block text-foreground">Jantar RU II Setorial (18h15)</span>
            <span className="text-xs text-muted-foreground">Catracas até 19h30</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => downloadPresetIcs('ru-1815')}
              className="cagp-btn-secondary text-xs min-h-[44px] px-3 font-heading font-extrabold cursor-pointer inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
              aria-label="Baixar evento iCalendar para Jantar RU II 18h15"
            >
              .ics
            </button>
            <label
              htmlFor="notif-ru1815"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              title="Alternar alerta de Jantar RU II"
            >
              <input
                id="notif-ru1815"
                name="notifRu1815"
                type="checkbox"
                checked={notifs.ru1815}
                onChange={(e) => updateNotif({ ru1815: e.target.checked })}
                className="w-5 h-5 accent-[#8B1E2D] cursor-pointer"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-2 border-t-2 border-border">
          <div>
            <span className="font-heading font-bold block text-foreground">Último Circular FAFICH (22h30)</span>
            <span className="text-xs text-muted-foreground">Gratuito até 22h45</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => downloadPresetIcs('circular-2230')}
              className="cagp-btn-secondary text-xs min-h-[44px] px-3 font-heading font-extrabold cursor-pointer inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
              aria-label="Baixar evento iCalendar para Circular FAFICH 22h30"
            >
              .ics
            </button>
            <label
              htmlFor="notif-circular2230"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              title="Alternar alerta de Circular FAFICH"
            >
              <input
                id="notif-circular2230"
                name="notifCircular2230"
                type="checkbox"
                checked={notifs.circular2230}
                onChange={(e) => updateNotif({ circular2230: e.target.checked })}
                className="w-5 h-5 accent-[#8B1E2D] cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Cofre Discente */}
      <div className="bg-background p-3.5 rounded-xl border-2 border-border shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-heading font-extrabold text-xs uppercase tracking-tight text-foreground">
            <i className="bi bi-safe2-fill text-success me-1.5"></i> Meu CAGP Sync
          </span>
          <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded-md border-2 border-border shadow-xs tabular-nums">
            {vaultBytes} bytes
          </span>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={handleCopyBackup}
            className="cagp-btn-secondary text-xs font-heading font-extrabold min-h-[44px] px-3 flex-1 justify-center cursor-pointer inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
          >
            <i className="bi bi-clipboard-check me-1.5"></i> Copiar Backup CAGP1
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="cagp-btn-outline text-xs min-h-[44px] min-w-[44px] px-3 text-destructive border-2 border-destructive/40 cursor-pointer inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-1"
            title="Redefinir Cofre Local"
            aria-label="Redefinir Cofre Local"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>

        <div className="pt-2 border-t-2 border-border flex gap-2 items-center">
          <input
            id="settings-tab-backup-input"
            name="settingsBackupToken"
            type="text"
            placeholder="Restaurar token CAGP1:..."
            value={backupInput}
            onChange={(e) => setBackupInput(e.target.value)}
            className="flex-1 min-h-[44px] bg-white border-2 border-border px-3 py-2 text-xs font-mono rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          <button
            type="button"
            onClick={handleRestore}
            className="cagp-btn-primary text-xs font-heading font-extrabold min-h-[44px] px-3.5 cursor-pointer inline-flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
          >
            Restaurar
          </button>
        </div>
      </div>

      {/* Link para Rota Completa */}
      <div className="pt-1 text-center">
        <a
          href={route('/configuracoes')}
          className="text-xs font-heading font-extrabold uppercase tracking-tight text-secondary hover:underline inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
        >
          Abrir Página Completa de Configurações <i className="bi bi-arrow-right"></i>
        </a>
      </div>
    </div>
  );
};
