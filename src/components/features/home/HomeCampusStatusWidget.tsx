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

interface Props {
  status: CampusLiveStatus;
  openCampus: () => void;
}

/** Hoje à noite: cartões que deslizam de lado (kit Semente). No desktop eles empilham. */
export const HomeCampusStatusWidget: React.FC<Props> = ({ status, openCampus }) => {
  const cards = [
    { icon: 'utensils' as const, rotulo: 'RU II', title: 'Jantar', num: status.ruBadge, sub: status.ruSub, bg: '#FFC83D', fg: '#1F1F1F' },
    {
      icon: 'bus' as const,
      rotulo: 'Ônibus interno',
      title: 'Hoje',
      num: status.busBadge,
      sub: status.busSub,
      bg: '#6DB33F',
      fg: '#1F1F1F',
      href: route('/onibus-internos'),
      cta: 'Ver horários e mapa das linhas',
    },
    {
      icon: 'bell' as const,
      rotulo: 'Lembretes',
      title: 'No seu calendário',
      num: 'Jantar e último ônibus',
      sub: '',
      bg: '#5B2A85',
      fg: '#FFFFFF',
      onClick: openCampus,
      cta: 'Escolher os lembretes',
    },
  ];

  return (
    <section id="cagp-widget-campus" aria-labelledby="home-hoje-a-noite" className="space-y-1">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="home-hoje-a-noite" className="font-heading font-bold text-xl text-foreground m-0">
          Hoje à noite
        </h2>
        <span className="text-xs font-heading font-bold uppercase tracking-[0.04em] text-muted-foreground">
          Horário de hoje
        </span>
      </div>
      <ul className="sk-desliza sk-desliza-home" role="list" tabIndex={0} aria-label="Hoje à noite: deslize para o lado">
        {cards.map((c) => {
          const miolo = (
            <>
              <span className="sk-desliza-faixa">
                <CagpIcon name={c.icon} />
                {c.rotulo}
              </span>
              <span className="sk-desliza-t">{c.title}</span>
              <span className="sk-desliza-n">{c.num}</span>
              {c.sub && <span className="sk-desliza-sub">{c.sub}</span>}
              {c.cta && (
                <span className="sk-desliza-cta">
                  {c.cta}
                  <CagpIcon name="chevron-right" className="w-4 h-4" />
                </span>
              )}
            </>
          );
          return (
            <li key={c.rotulo} style={{ '--bg': c.bg, '--fg': c.fg } as React.CSSProperties}>
              {c.href ? (
                <a href={c.href} className="sk-desliza-corpo">
                  {miolo}
                </a>
              ) : c.onClick ? (
                <button type="button" onClick={c.onClick} className="sk-desliza-corpo">
                  {miolo}
                </button>
              ) : (
                <div className="sk-desliza-corpo">{miolo}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
