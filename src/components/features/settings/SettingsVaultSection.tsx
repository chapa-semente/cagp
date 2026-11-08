import React from 'react';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';

interface Props {
  vaultSize: number;
  backupInput: string;
  setBackupInput: (v: string) => void;
  handleExportBackup: () => void;
  handleImportBackup: () => void;
  handleResetVault: () => void;
}

export const SettingsVaultSection: React.FC<Props> = ({
  vaultSize,
  backupInput,
  setBackupInput,
  handleExportBackup,
  handleImportBackup,
  handleResetVault,
}) => {
  return (
    <section className="bg-white border-[3px] border-border rounded-xl p-5 sm:p-6 shadow-md space-y-4 font-body">
      <div className="flex items-center justify-between border-b-2 border-border pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-success text-white border-3 border-border flex items-center justify-center shadow-sm">
            <i className="bi bi-safe2-fill text-base" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-head text-base sm:text-lg font-extrabold uppercase text-foreground m-0 tracking-tight">
              3. Meu CAGP Sync &amp; Cofre Discente
            </h2>
            <p className="text-xs text-foreground m-0 font-medium">Armazenamento estritamente local com verificação CRC32</p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-foreground bg-white px-2.5 py-1 rounded-lg border-3 border-border shadow-sm">
          {vaultSize} bytes
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleExportBackup}
            className="px-4 py-2.5 bg-white hover:bg-muted text-foreground border-3 border-border rounded-xl text-xs font-head font-bold uppercase shadow-sm hover:shadow active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex-1 justify-center cursor-pointer transition-all inline-flex items-center gap-2"
          >
            <i className="bi bi-clipboard-check text-success" aria-hidden="true" />
            <span>Exportar Backup Base64 (CAGP1)</span>
          </button>
          <button
            type="button"
            onClick={handleResetVault}
            className="px-4 py-2.5 bg-destructive hover:bg-[#B91C1C] text-white border-3 border-border rounded-xl text-xs font-head font-bold uppercase shadow-sm hover:shadow active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer transition-all inline-flex items-center gap-2"
          >
            <i className="bi bi-trash" aria-hidden="true" />
            <span>Limpar Dados Locais</span>
          </button>
        </div>

        <Field className="pt-3 border-t-2 border-border space-y-1">
          <FieldLabel htmlFor="settings-import-input" className="text-xs font-head font-extrabold uppercase text-foreground">
            Restaurar Backup a partir de Token
          </FieldLabel>
          <FieldDescription className="text-xs text-muted-foreground font-medium">
            Insira o token alfanumérico CAGP1 para sincronizar suas horas e dados locais com integridade CRC32.
          </FieldDescription>
          <div className="flex items-center gap-2 min-w-0 w-full pt-1">
            <input
              id="settings-import-input"
              type="text"
              placeholder="Cole o token CAGP1:... aqui"
              value={backupInput}
              onChange={(e) => setBackupInput(e.target.value)}
              className="flex-1 min-w-0 bg-white border-3 border-border p-2.5 text-xs font-mono rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
            />
            <button
              type="button"
              onClick={handleImportBackup}
              className="px-4 py-2.5 bg-secondary hover:bg-secondary text-white border-3 border-border rounded-xl text-xs font-head font-bold uppercase shadow-sm hover:shadow active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer transition-all shrink-0"
            >
              Restaurar
            </button>
          </div>
        </Field>
      </div>
    </section>
  );
};
