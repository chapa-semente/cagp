// homeToday.ts — O que a home (aba Hoje) sabe do aparelho, sem React.
//
// A home sai pronta do build (HomeWorkspaceA.tsx renderizado sem hidratar). Este script liga, sobre
// esse HTML, o que só o aparelho sabe:
//   - a fase do curso (Seu perfil) → o bloco de atalhos certo, tirado de <template data-home-role>;
//   - que dia é hoje → a contagem para a eleição;
//   - que horas são → "RU aberto agora", conferido a cada 30 s;
//   - horas e disciplinas salvas → o cartão "Seu progresso" (só aparece se houver dado).
// Reage a cagp:vault-updated (a pessoa trocou a fase ou lançou horas com a home aberta).
import { computeCampusLiveStatus } from '@/lib/campusStatus';
import { USER_ROLES, type UserRole } from '@/lib/userRole';

const ELECTION_DAY = new Date(2026, 10, 25); // 25/11/2026, 00h, horário local

type HomeWindow = Window & { __cagpHomeToday?: boolean };

function readJson(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storedRole(): UserRole {
  const value = readJson('cagp_user_role_v1');
  return USER_ROLES.includes(value as UserRole) ? (value as UserRole) : 'calouro';
}

/** Mesma conta do cofre: soma das horas lançadas (até 600) e nº de obrigatórias marcadas. */
function storedProgress(): { ext: number; obrig: number } {
  const calc = readJson('cagp_calc_ext_aac_v1');
  const calcOk = calc && typeof calc === 'object' && !Array.isArray(calc) && Object.values(calc).every((v) => typeof v === 'number');
  const ext = calcOk ? Math.min(600, Object.values(calc as Record<string, number>).reduce((a, b) => a + (Number(b) || 0), 0)) : 0;
  const grade = readJson('cagp_minha_grade_v1') as { savedCourses?: unknown } | null;
  const saved = grade && Array.isArray(grade.savedCourses) && grade.savedCourses.every((c) => typeof c === 'string') ? grade.savedCourses : [];
  return { ext, obrig: saved.length };
}

function applyRole(): void {
  const host = document.querySelector<HTMLElement>('[data-home-atalhos]');
  if (!host) return;
  const role = storedRole();
  if (host.dataset.homeAtalhos === role) return;
  const template = document.querySelector<HTMLTemplateElement>(`template[data-home-role="${role}"]`);
  if (!template) return;
  host.replaceChildren(template.content.cloneNode(true));
  host.dataset.homeAtalhos = role;
}

function applyCountdown(): void {
  const el = document.querySelector<HTMLElement>('[data-home-countdown]');
  if (!el) return;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysLeft = Math.round((ELECTION_DAY.getTime() - today.getTime()) / 86_400_000);
  el.textContent =
    daysLeft > 1
      ? `Faltam ${daysLeft} dias pra eleição`
      : daysLeft === 1
        ? 'A eleição é amanhã'
        : daysLeft >= -1
          ? 'Hoje tem eleição no CA'
          : 'A eleição de 2026 já passou';
}

function applyCampus(): void {
  const badge = document.querySelector<HTMLElement>('[data-home-ru-badge]');
  const sub = document.querySelector<HTMLElement>('[data-home-ru-sub]');
  if (!badge || !sub) return;
  const status = computeCampusLiveStatus(new Date());
  if (badge.textContent !== status.ruBadge) badge.textContent = status.ruBadge;
  if (sub.textContent !== status.ruSub) sub.textContent = status.ruSub;
}

let barObserver: IntersectionObserver | null = null;

function applyProgress(): void {
  const aside = document.querySelector<HTMLElement>('[data-home-aside]');
  if (!aside) return;
  const { ext, obrig } = storedProgress();
  let card = aside.querySelector<HTMLElement>('[aria-labelledby="home-progresso"]');
  if (!(ext > 0 || obrig > 0)) {
    card?.remove();
    return;
  }
  const fresh = !card;
  if (!card) {
    const template = document.querySelector<HTMLTemplateElement>('template[data-home-progresso]');
    card = template?.content.firstElementChild?.cloneNode(true) as HTMLElement | null;
    if (!card) return;
  }
  const rows = [
    { key: 'ext', n: ext, unit: 'h', pct: Math.round((ext / 600) * 100) },
    { key: 'obrig', n: obrig, unit: '', pct: Math.min(100, Math.round((obrig / 27) * 100)) },
  ];
  for (const row of rows) {
    const num = card.querySelector<HTMLElement>(`[data-home-progresso-n="${row.key}"]`);
    if (num) {
      num.dataset.countTo = String(row.n);
      num.textContent = `${row.n}${row.unit}`;
    }
    card.querySelector<HTMLElement>(`[data-home-progresso-barra="${row.key}"]`)?.style.setProperty('--pct', `${Math.max(3, row.pct)}%`);
  }
  if (!fresh) return;
  aside.appendChild(card);
  // A barra enche quando o cartão aparece na tela, uma vez (era whileInView do motion).
  barObserver?.disconnect();
  barObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      barObserver?.unobserve(entry.target);
    }
  });
  card.querySelectorAll('.cagp-barra-progresso').forEach((bar) => barObserver?.observe(bar));
}

/** Os rostos entram quando a abertura (splash) sai da frente; sem abertura, entram já. */
function releaseFaces(): void {
  document.querySelectorAll('[data-home-rostos][data-espera]').forEach((el) => el.removeAttribute('data-espera'));
}

let campusTimer = 0;

function mountHome(): void {
  window.clearInterval(campusTimer);
  if (!document.querySelector('[data-home-atalhos]')) return;
  applyRole();
  applyCountdown();
  applyCampus();
  applyProgress();
  campusTimer = window.setInterval(applyCampus, 30_000);
  if (document.documentElement.classList.contains('cagp-booted')) releaseFaces();
}

export function setupHomeToday(): void {
  const w = window as HomeWindow;
  if (w.__cagpHomeToday) {
    mountHome();
    return;
  }
  w.__cagpHomeToday = true;
  window.addEventListener('cagp:vault-updated', () => {
    applyRole();
    applyProgress();
  });
  window.addEventListener('cagp:splash-done', releaseFaces);
  document.addEventListener('astro:page-load', mountHome);
  document.addEventListener('astro:before-swap', () => {
    window.clearInterval(campusTimer);
    barObserver?.disconnect();
  });
  mountHome();
}
