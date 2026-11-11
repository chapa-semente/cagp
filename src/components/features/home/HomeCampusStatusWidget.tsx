// HomeCampusStatusWidget.tsx — "Hoje à noite" na home: RU agora e as últimas partidas do ônibus interno.
// O ônibus NÃO é ao vivo (decisão de 10/11/2026): mostra o horário oficial e leva à página /onibus-internos.
// O dono dos horários completos e dos lembretes é a folha Campus agora (CampusSheet); aqui é o resumo.
// O id #cagp-widget-campus é o alvo do tour (parada da Paloma).
import React from 'react';
import { CagpIcon } from '@/components/ui/CagpIcon';
import { CAMPUS_HORARIOS } from '@/data/acolhimento';
import { route } from '@/lib/paths';

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
const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const fmt = (m: number) => `${Math.floor(m / 60)}h${String(m % 60).padStart(2, '0')}`;

const J = CAMPUS_HORARIOS.jantar;
const C = CAMPUS_HORARIOS.circular;

export const NEUTRAL_CAMPUS_STATUS: CampusLiveStatus = {
  ruBadge: `Jantar ${J.texto}`,
  ruTone: 'warn',
  ruSub: `${J.local}. A catraca fecha às 19h30 em ponto.`,
  busBadge: `Dias de aula, ${C.texto}`,
  busTone: 'open',
  busSub: `Últimas partidas: ${C.ultimasSaidas.map((t) => fmt(toMin(t))).join(', ')} (${C.linhas}).`,
};

export function computeCampusLiveStatus(now: Date): CampusLiveStatus {
  const minutes = now.getHours() * 60 + now.getMinutes();
  const isWeekday = (J.dias as readonly number[]).includes(now.getDay());
  const abre = toMin(J.abre);
  const fecha = toMin(J.fecha);

  let ru: Pick<CampusLiveStatus, 'ruBadge' | 'ruTone' | 'ruSub'>;
  if (!isWeekday) {
    ru = { ruBadge: 'Fechado hoje', ruTone: 'closed', ruSub: 'O jantar volta na segunda, às 17h10.' };
  } else if (minutes >= abre && minutes < fecha) {
    ru = { ruBadge: 'Aberto agora', ruTone: 'open', ruSub: `Fecha em ${fecha - minutes} min, às 19h30.` };
  } else if (minutes >= fecha) {
    ru = { ruBadge: 'Jantar encerrado', ruTone: 'closed', ruSub: 'Amanhã tem de novo, das 17h10 às 19h30.' };
  } else {
    ru = { ruBadge: 'Abre às 17h10', ruTone: 'warn', ruSub: `${J.local}. A catraca fecha às 19h30 em ponto.` };
  }

  // Ônibus interno: sempre o horário oficial publicado, nunca "próximo em X min".
  const { busBadge, busTone, busSub } = NEUTRAL_CAMPUS_STATUS;
  return { ...ru, busBadge, busTone, busSub };
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
    { icon: 'utensils' as const, title: 'RU II, jantar', badge: status.ruBadge, tone: status.ruTone, sub: status.ruSub, href: undefined as string | undefined, cta: '' },
    { icon: 'bus' as const, title: 'Ônibus interno', badge: status.busBadge, tone: status.busTone, sub: status.busSub, href: route('/onibus-internos'), cta: 'Ver horários e mapa das linhas' },
  ];

  return (
    <section id="cagp-widget-campus" aria-labelledby="home-hoje-a-noite" className="cagp-reveal-card bg-white border-2 border-border rounded-xl shadow-md overflow-hidden">
      <div className="px-4 pt-4 sm:px-5 sm:pt-5 flex items-center justify-between gap-3">
        <h2 id="home-hoje-a-noite" className="font-heading font-bold text-lg text-foreground m-0">
          Hoje à noite
        </h2>
        <span className="text-xs font-heading font-bold uppercase tracking-[0.04em] text-muted-foreground">
          Horário de hoje
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
              {r.href && (
                <a href={r.href} className="inline-flex items-center gap-1 min-h-[44px] -mb-2 text-sm font-heading font-bold text-primary underline underline-offset-[0.22em]">
                  {r.cta}
                  <CagpIcon name="chevron-right" className="w-4 h-4" />
                </a>
              )}
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
          Lembretes do jantar e do último ônibus
        </span>
        <CagpIcon name="chevron-right" className="w-4 h-4" />
      </button>
    </section>
  );
};
