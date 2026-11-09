import React from 'react';
import type { VaultData } from '@/lib/storage/studentVault';
import { downloadPresetIcs } from '@/lib/calendar/icsGenerator';

interface Props {
  notifs: VaultData<'cagp_notifications_prefs_v1'>;
  updateNotifs: (partial: Partial<VaultData<'cagp_notifications_prefs_v1'>>) => void;
}

export const SettingsAlertsSection: React.FC<Props> = ({ notifs, updateNotifs }) => {
  return (
    <section className="bg-white border-[3px] border-border rounded-xl p-5 sm:p-6 shadow-md space-y-4 font-body">
      <div className="flex items-center justify-between border-b-2 border-border pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent text-foreground border-3 border-border flex items-center justify-center shadow-sm">
            <i className="bi bi-bell-fill text-base" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-head text-base sm:text-lg font-extrabold text-foreground m-0">
              2. Alertas do Campus &amp; Horários Noturnos
            </h2>
            <p className="text-xs text-foreground m-0 font-medium">Sincronização com o cotidiano discente da FAFICH</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-4 bg-white rounded-xl border-3 border-border shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div>
            <strong className="block text-xs font-head font-extrabold uppercase text-foreground">
              Jantar no RU II Setorial (18h15)
            </strong>
            <span className="text-xs text-foreground font-medium">Catracas encerram às 19h30 no turno noturno</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => downloadPresetIcs('ru-1815')}
              className="px-3 py-1.5 bg-white hover:bg-muted text-foreground border-3 border-border rounded-xl text-xs font-head font-bold uppercase shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <i className="bi bi-calendar-plus text-secondary" aria-hidden="true" /> Baixar .ics
            </button>
            <input
              type="checkbox"
              checked={notifs.ru1815}
              onChange={(e) => updateNotifs({ ru1815: e.target.checked })}
              className="w-5 h-5 accent-primary cursor-pointer rounded border-3 border-border"
            />
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border-3 border-border shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div>
            <strong className="block text-xs font-head font-extrabold uppercase text-foreground">
              Último Circular FAFICH (22h30)
            </strong>
            <span className="text-xs text-foreground font-medium">Linhas gratuitas operam viagens até 22h45</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => downloadPresetIcs('circular-2230')}
              className="px-3 py-1.5 bg-white hover:bg-muted text-foreground border-3 border-border rounded-xl text-xs font-head font-bold uppercase shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <i className="bi bi-calendar-plus text-secondary" aria-hidden="true" /> Baixar .ics
            </button>
            <input
              type="checkbox"
              checked={notifs.circular2230}
              onChange={(e) => updateNotifs({ circular2230: e.target.checked })}
              className="w-5 h-5 accent-primary cursor-pointer rounded border-3 border-border"
            />
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border-3 border-border shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div>
            <strong className="block text-xs font-head font-extrabold uppercase text-foreground">
              Guardião 120 Dias de AAC
            </strong>
            <span className="text-xs text-foreground font-medium">Aviso preventivo antes da preclusão regimental (Art. 15, § 4º)</span>
          </div>
          <input
            type="checkbox"
            checked={notifs.aac120d}
            onChange={(e) => updateNotifs({ aac120d: e.target.checked })}
            className="w-5 h-5 accent-primary cursor-pointer rounded border-3 border-border"
          />
        </div>
      </div>
    </section>
  );
};
