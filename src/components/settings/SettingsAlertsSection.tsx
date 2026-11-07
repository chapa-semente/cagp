import React from 'react';
import type { VaultData } from '../../lib/storage/studentVault';
import { downloadPresetIcs } from '../../lib/calendar/icsGenerator';

interface Props {
  notifs: VaultData<'cagp_notifications_prefs_v1'>;
  updateNotifs: (partial: Partial<VaultData<'cagp_notifications_prefs_v1'>>) => void;
}

export const SettingsAlertsSection: React.FC<Props> = ({ notifs, updateNotifs }) => {
  return (
    <section className="bg-white border-[3px] border-[#0A0A0A] rounded-xl p-5 sm:p-6 shadow-[4px_4px_0_0_#0A0A0A] space-y-4 font-body">
      <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FF8811] text-[#0A0A0A] border-2 border-[#0A0A0A] flex items-center justify-center shadow-[2px_2px_0_0_#0A0A0A]">
            <i className="bi bi-bell-fill text-base" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-head text-base sm:text-lg font-extrabold uppercase text-[#0A0A0A] m-0 tracking-tight">
              2. Alertas do Campus &amp; Horários Noturnos
            </h2>
            <p className="text-xs text-[#0A0A0A] m-0 font-medium">Sincronização com o cotidiano discente da FAFICH</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-4 bg-[#FBF8F3] rounded-xl border-2 border-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] flex flex-wrap items-center justify-between gap-3">
          <div>
            <strong className="block text-xs font-head font-extrabold uppercase text-[#0A0A0A]">
              Jantar no RU II Setorial (18h15)
            </strong>
            <span className="text-xs text-[#0A0A0A] font-medium">Catracas encerram às 19h30 no turno noturno</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => downloadPresetIcs('ru-1815')}
              className="px-3 py-1.5 bg-white hover:bg-[#FBF8F3] text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-xl text-xs font-head font-bold uppercase shadow-[2px_2px_0_0_#0A0A0A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <i className="bi bi-calendar-plus text-[#8B1E2D]" aria-hidden="true" /> Baixar .ics
            </button>
            <input
              type="checkbox"
              checked={notifs.ru1815}
              onChange={(e) => updateNotifs({ ru1815: e.target.checked })}
              className="w-5 h-5 accent-[#8B1E2D] cursor-pointer rounded border-2 border-[#0A0A0A]"
            />
          </div>
        </div>

        <div className="p-4 bg-[#FBF8F3] rounded-xl border-2 border-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] flex flex-wrap items-center justify-between gap-3">
          <div>
            <strong className="block text-xs font-head font-extrabold uppercase text-[#0A0A0A]">
              Último Circular FAFICH (22h30)
            </strong>
            <span className="text-xs text-[#0A0A0A] font-medium">Linhas gratuitas operam viagens até 22h45</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => downloadPresetIcs('circular-2230')}
              className="px-3 py-1.5 bg-white hover:bg-[#FBF8F3] text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-xl text-xs font-head font-bold uppercase shadow-[2px_2px_0_0_#0A0A0A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <i className="bi bi-calendar-plus text-[#8B1E2D]" aria-hidden="true" /> Baixar .ics
            </button>
            <input
              type="checkbox"
              checked={notifs.circular2230}
              onChange={(e) => updateNotifs({ circular2230: e.target.checked })}
              className="w-5 h-5 accent-[#8B1E2D] cursor-pointer rounded border-2 border-[#0A0A0A]"
            />
          </div>
        </div>

        <div className="p-4 bg-[#FBF8F3] rounded-xl border-2 border-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] flex flex-wrap items-center justify-between gap-3">
          <div>
            <strong className="block text-xs font-head font-extrabold uppercase text-[#0A0A0A]">
              Guardião 120 Dias de AAC
            </strong>
            <span className="text-xs text-[#0A0A0A] font-medium">Aviso preventivo antes da preclusão regimental (Art. 15, § 4º)</span>
          </div>
          <input
            type="checkbox"
            checked={notifs.aac120d}
            onChange={(e) => updateNotifs({ aac120d: e.target.checked })}
            className="w-5 h-5 accent-[#8B1E2D] cursor-pointer rounded border-2 border-[#0A0A0A]"
          />
        </div>
      </div>
    </section>
  );
};
