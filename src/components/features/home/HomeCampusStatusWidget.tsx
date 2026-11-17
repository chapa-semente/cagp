// HomeCampusStatusWidget.tsx — "Hoje à noite" na home: RU agora e as últimas partidas do ônibus interno.
// O ônibus NÃO é ao vivo (decisão de 10/11/2026): mostra o horário oficial e leva à página /onibus-internos.
// O dono dos horários completos e dos lembretes é a folha Campus agora (CampusSheet); aqui é o resumo.
// O id #cagp-widget-campus é o alvo do tour (parada da Paloma).
// Renderizado no build, sem hidratar: sai com o estado neutro (horário oficial) e o script
// src/scripts/homeToday.ts troca o selo do RU pelo horário de verdade ([data-home-ru-*]).
import React from 'react';
import { CagpIcon } from '@/components/ui/CagpIcon';
import { NEUTRAL_CAMPUS_STATUS, computeCampusLiveStatus, type CampusLiveStatus } from '@/lib/campusStatus';
import { route } from '@/lib/paths';

export { NEUTRAL_CAMPUS_STATUS, computeCampusLiveStatus };
export type { CampusLiveStatus };

interface Props {
  status?: CampusLiveStatus;
}

/** Hoje à noite: cartões que deslizam de lado (kit Semente). No desktop eles empilham. */
export const HomeCampusStatusWidget: React.FC<Props> = ({ status = NEUTRAL_CAMPUS_STATUS }) => {
  const cards = [
    { icon: 'utensils' as const, rotulo: 'RU II', title: 'Jantar', num: status.ruBadge, sub: status.ruSub, bg: '#FFC83D', fg: '#1F1F1F', vivo: 'ru' },
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
      dispatch: 'cagp:open-campus',
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
              <span className="sk-desliza-n" data-home-ru-badge={c.vivo ? '' : undefined}>{c.num}</span>
              {c.sub && <span className="sk-desliza-sub" data-home-ru-sub={c.vivo ? '' : undefined}>{c.sub}</span>}
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
              ) : c.dispatch ? (
                <button type="button" data-cagp-dispatch={c.dispatch} className="sk-desliza-corpo">
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
