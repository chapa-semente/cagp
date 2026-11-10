// HomeCampusStatusWidget.tsx — "Hoje à noite" na home: RU e Circular agora, em uma ficha.
// O dono dos horários completos e dos lembretes é a folha Campus agora (CampusSheet); aqui é o resumo.
// O id #cagp-widget-campus é o alvo do tour (parada da Paloma).
import React from 'react';
import { CagpIcon } from '@/components/ui/CagpIcon';

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
 * divergir do navegador (erro de hidratação #418). O horário real entra depois de montar.
 */
export const NEUTRAL_CAMPUS_STATUS: CampusLiveStatus = {
  ruBadge: 'Jantar 17h30–19h30',
  ruTone: 'warn',
  ruSub: 'Catraca fecha às 19h30 em ponto',
  busBadge: 'Saídas até 22h45',
  busTone: 'open',
  busSub: 'Noturno: 18h50 · 19h10 · 20h40 · 22h15 · 22h35 · 22h45',
};

export function computeCampusLiveStatus(now: Date): CampusLiveStatus {
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const isWeekend = day === 0 || day === 6;

  let ruBadge = 'Jantar 17h30–19h30';
  let ruTone: CampusLiveStatus['ruTone'] = 'warn';
  let ruSub = 'Catraca fecha às 19h30 em ponto';

  if (isWeekend) {
    ruBadge = 'Fechado no fim de semana';
    ruTone = 'closed';
    ruSub = 'Volta segunda: almoço 11h, jantar 17h30';
  } else if (minutes >= 17 * 60 + 30 && minutes < 19 * 60 + 30) {
    ruBadge = 'Aberto agora';
    ruTone = 'open';
    ruSub = `Fecha em ${19 * 60 + 30 - minutes} min (19h30)`;
  } else if (minutes >= 19 * 60 + 30) {
    ruBadge = 'Jantar encerrado';
    ruTone = 'closed';
    ruSub = 'Amanhã: almoço 11h, jantar 17h30';
  } else {
    ruBadge = 'Jantar às 17h30';
    ruTone = 'warn';
    ruSub = 'Catraca fecha às 19h30 em ponto';
  }

  const departures = [18 * 60 + 50, 19 * 60 + 10, 20 * 60 + 40, 22 * 60 + 15, 22 * 60 + 35, 22 * 60 + 45];
  const next = departures.find((d) => d >= minutes);
  let busBadge: string;
  let busTone: CampusLiveStatus['busTone'];
  let busSub = 'Noturno: 18h50 · 19h10 · 20h40 · 22h15 · 22h35 · 22h45';
  const fmt = (m: number) => `${Math.floor(m / 60)}h${String(m % 60).padStart(2, '0')}`;
  if (isWeekend) {
    busBadge = 'Sem Circular hoje';
    busTone = 'closed';
    busSub = 'Volta segunda-feira';
  } else if (next === undefined) {
    busBadge = 'Último já saiu';
    busTone = 'closed';
    busSub = 'O último sai 22h45. Amanhã tem de novo.';
  } else if (next - minutes <= 15) {
    busBadge = `Próximo ${fmt(next)}`;
    busTone = 'warn';
    busSub = `Sai em ${next - minutes} min. Corre!`;
  } else {
    busBadge = `Próximo ${fmt(next)}`;
    busTone = 'open';
  }

  return { ruBadge, ruTone, ruSub, busBadge, busTone, busSub };
}

const TONE: Record<CampusLiveStatus['ruTone'], string> = {
  open: 'bg-success-tint text-success',
  warn: 'bg-warning-tint text-warning',
  closed: 'bg-muted text-content-secondary',
};

interface Props {
  status: CampusLiveStatus;
  openCampus: () => void;
}

export const HomeCampusStatusWidget: React.FC<Props> = ({ status, openCampus }) => {
  const rows = [
    { icon: 'utensils' as const, title: 'RU II, jantar', badge: status.ruBadge, tone: status.ruTone, sub: status.ruSub },
    { icon: 'bus' as const, title: 'Circular', badge: status.busBadge, tone: status.busTone, sub: status.busSub },
  ];

  return (
    <section id="cagp-widget-campus" aria-labelledby="home-hoje-a-noite" className="cagp-reveal-card bg-white border-2 border-border rounded-xl shadow-md overflow-hidden">
      <div className="px-4 pt-4 sm:px-5 sm:pt-5 flex items-center justify-between gap-3">
        <h2 id="home-hoje-a-noite" className="font-heading font-bold text-lg text-foreground m-0">
          Hoje à noite
        </h2>
        <span className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-[0.04em] text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-success cagp-pulse-indicator" aria-hidden="true" />
          ao vivo
        </span>
      </div>
      <ul className="list-none m-0 p-0 mt-3 divide-y-2 divide-border border-t-2 border-border">
        {rows.map((r) => (
          <li key={r.title} className="px-4 py-3 sm:px-5 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0" aria-hidden="true">
              <CagpIcon name={r.icon} className="w-5 h-5 text-foreground" />
            </span>
            <span className="flex-1 min-w-0">
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-heading font-bold text-sm text-foreground">{r.title}</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-heading font-bold uppercase tracking-[0.04em] tabular-nums ${TONE[r.tone]}`}>
                  {r.badge}
                </span>
              </span>
              <span className="block text-sm text-content-secondary tabular-nums mt-0.5">{r.sub}</span>
            </span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={openCampus}
        className="w-full min-h-[48px] px-4 sm:px-5 border-t-2 border-border bg-muted hover:bg-primary-tint flex items-center justify-between gap-2 text-sm font-heading font-bold text-foreground cursor-pointer transition-colors duration-(--duration-press) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      >
        <span className="inline-flex items-center gap-2">
          <i className="bi bi-alarm-fill text-primary" aria-hidden="true" />
          Horários e lembrete do último Circular
        </span>
        <CagpIcon name="chevron-right" className="w-4 h-4" />
      </button>
    </section>
  );
};
