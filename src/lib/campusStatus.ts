// src/lib/campusStatus.ts — "Aberto agora?" do RU e o resumo do ônibus interno, sem React.
// Usado pelo cartão "Hoje à noite" da home (HomeCampusStatusWidget.tsx, renderizado no build) e
// pelo script que atualiza o cartão no aparelho (src/scripts/homeToday.ts).
import { CAMPUS_HORARIOS } from '@/data/acolhimento';

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
