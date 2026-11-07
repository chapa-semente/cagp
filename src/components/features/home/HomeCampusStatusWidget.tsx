import React from 'react';
import { CagpIcon } from '../../ui/CagpIcon';
import { route } from '../../../lib/paths';
import type { VaultData } from '../../../lib/storage/studentVault';

export interface CampusLiveStatus {
  ruBadge: string;
  ruTone: 'open' | 'warn' | 'closed';
  ruSub: string;
  busBadge: string;
  busTone: 'open' | 'warn' | 'closed';
  busSub: string;
}

export function computeCampusLiveStatus(now: Date): CampusLiveStatus {
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const isWeekend = day === 0 || day === 6;

  let ruBadge = 'Jantar 17h30–19h30';
  let ruTone: 'open' | 'warn' | 'closed' = 'warn';
  let ruSub = 'Catracas fecham impreterivelmente às 19h30';

  if (isWeekend) {
    ruBadge = 'Fechado no fim de semana';
    ruTone = 'closed';
    ruSub = 'Retorna segunda-feira (Almoço 11h e Jantar 17h30)';
  } else if (minutes >= 1050 && minutes <= 1170) {
    ruBadge = 'Aberto agora • até 19h30';
    ruTone = 'open';
    ruSub = 'Jantar em andamento no RU II Setorial';
  } else if (minutes >= 660 && minutes <= 840) {
    ruBadge = 'Almoço aberto • até 14h';
    ruTone = 'open';
    ruSub = 'Jantar noturno abre às 17h30';
  } else if (minutes < 1050) {
    ruBadge = 'Abre jantar às 17h30';
    ruTone = 'warn';
    ruSub = 'Chegue até 18h30 para evitar fila extensa';
  } else {
    ruBadge = 'Encerrado hoje (19h30)';
    ruTone = 'closed';
    ruSub = 'Reabre no próximo dia útil';
  }

  let busBadge = 'Saídas até 22h45';
  let busTone: 'open' | 'warn' | 'closed' = 'open';
  let busSub = 'Noturno: 18h50 · 19h10 · 20h40 · 22h15 · 22h35 · 22h45';

  if (isWeekend) {
    busBadge = 'Sem operação interna';
    busTone = 'closed';
    busSub = 'Linhas internas operam em dias letivos (seg–sex)';
  } else if (minutes > 1365) {
    busBadge = 'Encerrado após 22h45';
    busTone = 'closed';
    busSub = 'Último circular noturno já partiu da Praça de Serviços';
  } else if (minutes >= 1320) {
    busBadge = 'Últimas saídas (22h15/35/45)';
    busTone = 'warn';
    busSub = 'Atenção ao horário limite na parada da FAFICH';
  }

  return { ruBadge, ruTone, ruSub, busBadge, busTone, busSub };
}

interface Props {
  status: CampusLiveStatus;
  notifs: VaultData<'cagp_notifications_prefs_v1'>;
  toggleNotif: (key: 'ru1815' | 'circular2230' | 'aac120d') => void;
  openCampus: () => void;
}

export const HomeCampusStatusWidget: React.FC<Props> = ({
  status,
  notifs,
  toggleNotif,
  openCampus,
}) => {
  const campusAnyOpen = status.ruTone === 'open' || status.busTone === 'open';
  const campusAnyWarn = status.ruTone === 'warn' || status.busTone === 'warn';

  return (
    <section aria-labelledby="heading-campus-now" className="space-y-3 font-sans" id="campus">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-3 h-3 rounded-full shrink-0 border border-black ${
              campusAnyOpen
                ? 'bg-[#15803D] animate-pulse'
                : campusAnyWarn
                ? 'bg-[#B45309] animate-pulse'
                : 'bg-[#57534E]'
            }`}
            aria-hidden="true"
          />
          <h2
            id="heading-campus-now"
            className="font-heading text-base sm:text-lg font-extrabold uppercase text-[#0A0A0A] m-0"
          >
            Plantão Noturno • Campus Agora
          </h2>
        </div>
        <button
          type="button"
          onClick={openCampus}
          className="min-h-[44px] px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold text-[#9E2424] hover:bg-[#FBF8F3] border-2 border-transparent hover:border-[#0A0A0A] bg-transparent cursor-pointer inline-flex items-center gap-1 transition-all"
        >
          <span>Horários e linhas completas</span>
          <CagpIcon name="chevron-right" className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Bandejão RU II Setorial */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border-[3px] border-[#0A0A0A] shadow-[4px_4px_0_0_#0A0A0A] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="w-10 h-10 rounded-xl bg-[#9E2424] text-white flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0_0_#0A0A0A]">
                <CagpIcon name="utensils" className="w-5 h-5" />
              </span>
              <span
                className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border-2 border-black shadow-[1.5px_1.5px_0_0_#0A0A0A] tabular-nums ${
                  status.ruTone === 'open'
                    ? 'bg-[#DCFCE7] text-[#166534]'
                    : status.ruTone === 'warn'
                    ? 'bg-[#FEF08A] text-[#854D0E]'
                    : 'bg-[#F4F1EA] text-[#57534E]'
                }`}
              >
                {status.ruBadge}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-sm font-heading font-extrabold text-[#0A0A0A] m-0">Bandejão RU II Setorial</h3>
              <span className="font-mono text-xs font-bold text-[#0A0A0A] bg-[#EFE9E0] px-2 py-0.5 rounded border border-black tabular-nums">
                R$ 5,60
              </span>
            </div>
            <p className="text-xs text-[#57534E] mt-1.5 mb-0 leading-relaxed font-medium">
              {notifs.ru1815
                ? 'Lembrete 18h15 ativo no cofre • Catraca fecha às 19h30'
                : status.ruSub}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t-[2px] border-[#0A0A0A]/15 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => toggleNotif('ru1815')}
              aria-pressed={notifs.ru1815}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl font-heading text-xs font-bold border-2 border-black cursor-pointer inline-flex items-center gap-1.5 transition-all w-full justify-center active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                notifs.ru1815
                  ? 'bg-[#9E2424] text-white shadow-[2px_2px_0_0_#0A0A0A]'
                  : 'bg-[#FBF8F3] text-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] hover:bg-[#F4F1EA]'
              }`}
            >
              <CagpIcon name="bell" className="w-3.5 h-3.5" />
              <span>{notifs.ru1815 ? 'Alarme 18h15 Ativo' : 'Ativar Alarme 18h15'}</span>
            </button>
          </div>
        </div>

        {/* Card 2: Circular Interno */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border-[3px] border-[#0A0A0A] shadow-[4px_4px_0_0_#0A0A0A] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="w-10 h-10 rounded-xl bg-[#005A9C] text-white flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0_0_#0A0A0A]">
                <CagpIcon name="bus" className="w-5 h-5" />
              </span>
              <span
                className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border-2 border-black shadow-[1.5px_1.5px_0_0_#0A0A0A] tabular-nums ${
                  status.busTone === 'open'
                    ? 'bg-[#DCFCE7] text-[#166534]'
                    : status.busTone === 'warn'
                    ? 'bg-[#FEF08A] text-[#854D0E]'
                    : 'bg-[#F4F1EA] text-[#57534E]'
                }`}
              >
                {status.busBadge}
              </span>
            </div>
            <h3 className="text-sm font-heading font-extrabold text-[#0A0A0A] m-0">Circular Interno • FAFICH</h3>
            <p className="text-xs text-[#57534E] mt-1.5 mb-0 leading-relaxed font-medium tabular-nums">
              {notifs.circular2230
                ? 'Lembrete 22h30 ativo no cofre • Última saída às 22h45'
                : status.busSub}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t-[2px] border-[#0A0A0A]/15">
            <button
              type="button"
              onClick={() => toggleNotif('circular2230')}
              aria-pressed={notifs.circular2230}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl font-heading text-xs font-bold border-2 border-black cursor-pointer inline-flex items-center gap-1.5 transition-all w-full justify-center active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                notifs.circular2230
                  ? 'bg-[#9E2424] text-white shadow-[2px_2px_0_0_#0A0A0A]'
                  : 'bg-[#FBF8F3] text-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] hover:bg-[#F4F1EA]'
              }`}
            >
              <CagpIcon name="bell" className="w-3.5 h-3.5" />
              <span>{notifs.circular2230 ? 'Alarme 22h30 Ativo' : 'Ativar Alarme 22h30'}</span>
            </button>
          </div>
        </div>

        {/* Card 3: Secretaria do Colegiado & FAFICH */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border-[3px] border-[#0A0A0A] shadow-[4px_4px_0_0_#0A0A0A] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="w-10 h-10 rounded-xl bg-[#5B2A86] text-white flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0_0_#0A0A0A]">
                <CagpIcon name="building" className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono font-bold bg-[#EFE9E0] text-[#0A0A0A] px-2.5 py-1 rounded-lg border-2 border-black shadow-[1.5px_1.5px_0_0_#0A0A0A] tabular-nums">
                Sala F-2039 • 2º Andar
              </span>
            </div>
            <h3 className="text-sm font-heading font-extrabold text-[#0A0A0A] m-0">Colegiado DCP & FAFICH</h3>
            <p className="text-xs text-[#57534E] mt-1.5 mb-0 leading-relaxed font-medium">
              Secretaria: Norma Guedes (08h–20h) • Biblioteca e CEAG abertos no turno noturno até 22h.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t-[2px] border-[#0A0A0A]/15 flex items-center justify-between gap-2 text-xs">
            <span className="font-mono text-[#57534E] text-[11px] font-bold truncate">FAFICH • 2º Andar</span>
            <a
              href={route('/curso') + '#colegiado'}
              className="min-h-[44px] px-3.5 py-1.5 rounded-xl font-heading font-bold text-[#9E2424] hover:bg-[#FBF8F3] border-2 border-transparent hover:border-black no-underline shrink-0 inline-flex items-center gap-1 transition-all"
            >
              <span>Contatos</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
