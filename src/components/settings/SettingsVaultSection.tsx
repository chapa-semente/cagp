import React from 'react';

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
    <section className="bg-white border-[3px] border-[#0A0A0A] rounded-xl p-5 sm:p-6 shadow-[4px_4px_0_0_#0A0A0A] space-y-4 font-body">
      <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#15803D] text-white border-2 border-[#0A0A0A] flex items-center justify-center shadow-[2px_2px_0_0_#0A0A0A]">
            <i className="bi bi-safe2-fill text-base" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-head text-base sm:text-lg font-extrabold uppercase text-[#0A0A0A] m-0 tracking-tight">
              3. Meu CAGP Sync &amp; Cofre Discente
            </h2>
            <p className="text-xs text-[#0A0A0A] m-0 font-medium">Armazenamento estritamente local com verificação CRC32</p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-[#0A0A0A] bg-[#FBF8F3] px-2.5 py-1 rounded-lg border-2 border-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A]">
          {vaultSize} bytes
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleExportBackup}
            className="px-4 py-2.5 bg-white hover:bg-[#FBF8F3] text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-xl text-xs font-head font-bold uppercase shadow-[2px_2px_0_0_#0A0A0A] hover:shadow-[3px_3px_0_0_#0A0A0A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex-1 justify-center cursor-pointer transition-all inline-flex items-center gap-2"
          >
            <i className="bi bi-clipboard-check text-[#15803D]" aria-hidden="true" />
            <span>Exportar Backup Base64 (CAGP1)</span>
          </button>
          <button
            type="button"
            onClick={handleResetVault}
            className="px-4 py-2.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white border-2 border-[#0A0A0A] rounded-xl text-xs font-head font-bold uppercase shadow-[2px_2px_0_0_#0A0A0A] hover:shadow-[3px_3px_0_0_#0A0A0A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer transition-all inline-flex items-center gap-2"
          >
            <i className="bi bi-trash" aria-hidden="true" />
            <span>Limpar Dados Locais</span>
          </button>
        </div>

        <div className="pt-3 border-t-2 border-[#0A0A0A]">
          <label className="block text-xs font-head font-extrabold uppercase text-[#0A0A0A] mb-2" htmlFor="settings-import-input">
            Restaurar Backup a partir de Token
          </label>
          <div className="flex items-center gap-2 min-w-0 w-full">
            <input
              id="settings-import-input"
              type="text"
              placeholder="Cole o token CAGP1:... aqui"
              value={backupInput}
              onChange={(e) => setBackupInput(e.target.value)}
              className="flex-1 min-w-0 bg-[#FBF8F3] border-2 border-[#0A0A0A] p-2.5 text-xs font-mono rounded-xl shadow-[2px_2px_0_0_#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
            />
            <button
              type="button"
              onClick={handleImportBackup}
              className="px-4 py-2.5 bg-[#8B1E2D] hover:bg-[#9E2424] text-white border-2 border-[#0A0A0A] rounded-xl text-xs font-head font-bold uppercase shadow-[2px_2px_0_0_#0A0A0A] hover:shadow-[3px_3px_0_0_#0A0A0A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer transition-all shrink-0"
            >
              Restaurar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
