import React from 'react';
import { CagpIcon } from '@/components/ui/CagpIcon';
import { route } from '@/lib/paths';
import type { VaultData } from '@/lib/storage/studentVault';

export interface CampusLiveStatus {
  ruBadge: string;
  ruTone: 'open' | 'warn' | 'closed';
  ruSub: string;
  busBadge: string;
  busTone: 'open' | 'warn' | 'closed';
  busSub: string;
}

/**
 * Estado sem horário, idêntico no build e no navegador. O HTML do GitHub Pages é gerado no build
 * (GitHub Actions, em UTC); calcular "aberto agora" durante o render fazia o texto do servidor
 * divergir do navegador (erro de hidratação #418, que fazia o React redesenhar a home inteira).
 * A home começa com este estado e troca pelo horário real logo depois de montar.
 */
export const NEUTRAL_CAMPUS_STATUS: CampusLiveStatus = {
  ruBadge: 'Jantar 17h30–19h30',
  ruTone: 'warn',
  ruSub: 'Catracas fecham impreterivelmente às 19h30',
  busBadge: 'Saídas até 22h45',
  busTone: 'open',
  busSub: 'Noturno: 18h50 · 19h10 · 20h40 · 22h15 · 22h35 · 22h45',
};

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
    <section aria-labelledby="heading-campus-now" className="space-y-3 font-sans" id="cagp-widget-campus">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3.5 w-3.5 shrink-0" aria-hidden="true">
            <span
              className={`inline-flex rounded-full h-3.5 w-3.5 border-2 border-border ${
                campusAnyOpen
                  ? 'bg-success'
                  : campusAnyWarn
                  ? 'bg-warning'
                  : 'bg-[#57534E]'
              }`}
            />
          </span>
          <h2
            id="heading-campus-now"
            className="font-heading text-base sm:text-lg font-extrabold text-foreground m-0"
          >
            Plantão Noturno • Campus Agora
          </h2>
        </div>
        <button
          type="button"
          onClick={openCampus}
          className="min-h-[44px] px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold text-secondary hover:bg-muted border-3 border-transparent hover:border-border bg-transparent cursor-pointer inline-flex items-center gap-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
        >
          <span>Horários e linhas completas</span>
          <CagpIcon name="chevron-right" className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: Bandejão RU II Setorial */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border-2 border-border shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center shrink-0 border-2 border-border">
                <CagpIcon name="utensils" className="w-5 h-5" />
              </span>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded-lg border-2 border-border tabular-nums ${
                  status.ruTone === 'open'
                    ? 'bg-success-tint text-[#166534]'
                    : status.ruTone === 'warn'
                    ? 'bg-[#FEF3C7] text-[#854D0E]'
                    : 'bg-background text-muted-foreground'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full border border-border ${
                    status.ruTone === 'open'
                      ? 'bg-success'
                      : status.ruTone === 'warn'
                      ? 'bg-warning'
                      : 'bg-[#57534E]'
                  }`}
                  aria-hidden="true"
                />
                <span>{status.ruBadge}</span>
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-sm font-heading font-extrabold text-foreground m-0">Bandejão RU II Setorial</h3>
              <span className="font-mono text-xs font-bold text-foreground bg-[#E7E3D8] px-2 py-0.5 rounded border border-border tabular-nums">
                R$ 5,60
              </span>
            </div>
            <p className="text-xs font-mono text-muted-foreground mt-1.5 mb-0 leading-relaxed font-medium tabular-nums max-w-prose">
              {notifs.ru1815
                ? 'Lembrete 18h15 ativo no cofre • Catraca fecha às 19h30'
                : status.ruSub}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-border flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => toggleNotif('ru1815')}
              aria-pressed={notifs.ru1815}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl font-heading text-xs font-bold border-2 border-border cursor-pointer inline-flex items-center gap-1.5 transition-all w-full justify-center active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed tabular-nums shadow-sm ${
                notifs.ru1815
                  ? 'bg-secondary text-white'
                  : 'bg-white text-foreground hover:bg-muted'
              }`}
            >
              <CagpIcon name="bell" className="w-3.5 h-3.5" />
              <span className="font-mono font-bold">{notifs.ru1815 ? 'Alarme 18h15 Ativo' : 'Ativar Alarme 18h15'}</span>
            </button>
          </div>
        </div>

        {/* Card 2: Circular Interno */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border-2 border-border shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="w-10 h-10 rounded-xl bg-info text-white flex items-center justify-center shrink-0 border-2 border-border">
                <CagpIcon name="bus" className="w-5 h-5" />
              </span>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded-lg border-2 border-border tabular-nums ${
                  status.busTone === 'open'
                    ? 'bg-success-tint text-[#166534]'
                    : status.busTone === 'warn'
                    ? 'bg-[#FEF3C7] text-[#854D0E]'
                    : 'bg-background text-muted-foreground'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full border border-border ${
                    status.busTone === 'open'
                      ? 'bg-success'
                      : status.busTone === 'warn'
                      ? 'bg-warning'
                      : 'bg-[#57534E]'
                  }`}
                  aria-hidden="true"
                />
                <span>{status.busBadge}</span>
              </span>
            </div>
            <h3 className="text-sm font-heading font-extrabold text-foreground m-0">Circular Interno • FAFICH</h3>
            <p className="text-xs font-mono text-muted-foreground mt-1.5 mb-0 leading-relaxed font-medium tabular-nums max-w-prose">
              {notifs.circular2230
                ? 'Lembrete 22h30 ativo no cofre • Última saída às 22h45'
                : status.busSub}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-border">
            <button
              type="button"
              onClick={() => toggleNotif('circular2230')}
              aria-pressed={notifs.circular2230}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl font-heading text-xs font-bold border-2 border-border cursor-pointer inline-flex items-center gap-1.5 transition-all w-full justify-center active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed tabular-nums shadow-sm ${
                notifs.circular2230
                  ? 'bg-secondary text-white'
                  : 'bg-white text-foreground hover:bg-muted'
              }`}
            >
              <CagpIcon name="bell" className="w-3.5 h-3.5" />
              <span className="font-mono font-bold">{notifs.circular2230 ? 'Alarme 22h30 Ativo' : 'Ativar Alarme 22h30'}</span>
            </button>
          </div>
        </div>

        {/* Card 3: Secretaria do Colegiado & FAFICH */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border-2 border-border shadow-md flex flex-col justify-between sm:col-span-2 lg:col-span-1">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 border-2 border-border">
                <CagpIcon name="building" className="w-5 h-5" />
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold bg-[#E7E3D8] text-foreground px-2.5 py-1 rounded-lg border-2 border-border tabular-nums">
                <span className="w-2 h-2 rounded-full bg-success border border-border" aria-hidden="true" />
                <span>Sala F-2039 • 2º Andar</span>
              </span>
            </div>
            <h3 className="text-sm font-heading font-extrabold text-foreground m-0">Colegiado DCP &amp; FAFICH</h3>
            <p className="text-xs font-mono text-muted-foreground mt-1.5 mb-0 leading-relaxed font-medium tabular-nums max-w-prose">
              Secretaria: Norma Guedes (08h–20h) • Biblioteca e CEAG abertos no turno noturno até 22h.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-border flex items-center justify-between gap-2 text-xs">
            <span className="font-mono text-muted-foreground text-xs font-bold truncate tabular-nums">FAFICH • 2º Andar</span>
            <a
              href={route('/curso') + '#colegiado'}
              className="min-h-[44px] px-3.5 py-1.5 rounded-xl font-heading font-bold text-secondary hover:bg-muted border-2 border-transparent hover:border-border no-underline shrink-0 inline-flex items-center gap-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span>Contatos</span>
              <i className="bi bi-arrow-right" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
