// appSidebar.ts — Comportamento do trilho lateral (AppSidebar.astro), sem React.
//
// O que a ilha React fazia, feito aqui com o DOM que já vem pronto no HTML:
//   - recolher/expandir no desktop, com a largura na mola de gaveta (drawerSpring);
//   - gaveta do tablet (abre pela barra, pelo botão do trilho compacto e por Ctrl+B);
//   - dicas ao lado dos ícones do trilho compacto (antes Radix Tooltip);
//   - nome, fase e foto de "Seu perfil" no botão do rodapé do trilho;
//   - atalhos de teclado: Ctrl/⌘+K e "/" abrem a busca, Ctrl/⌘+B recolhe o trilho.
// Os ouvintes são registrados uma vez e sempre agem sobre o DOM da página atual: o ClientRouter
// troca o <body> a cada navegação, e o trilho novo chega aberto, como antes.
import { navigate } from 'astro:transitions/client';
import { route } from '@/lib/paths';
import { readStoredProfile, renderAvatarHtml } from '@/lib/avatarHelper';
import { USER_ROLE_META, USER_ROLES, type UserRole } from '@/lib/userRole';

type RailWindow = Window & { __cagpAppSidebar?: boolean; __cagpPaletteMounted?: boolean };

const WIDTH_OPEN = 264;
const WIDTH_COMPACT = 88;
const DRAWER_WIDTH = 280;

// ─── Mola ────────────────────────────────────────────────────────────────────
// A mesma física do motion/react (src/lib/motion.ts › drawerSpring), amostrada numa curva
// linear() para a Web Animations API. Sem suporte a linear(), cai na curva de saída do site.

interface SpringTiming {
  duration: number;
  easing: string;
}

function springTiming(stiffness: number, damping: number, mass: number): SpringTiming {
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const wd = w0 * Math.sqrt(Math.max(1 - zeta * zeta, 1e-6));
  // Tempo até a oscilação caber em 0,1% do percurso.
  const seconds = Math.log(1000) / (zeta * w0);
  const steps = 40;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (seconds * i) / steps;
    const x = 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t));
    points.push(i === steps ? '1' : String(Math.round(x * 1000) / 1000));
  }
  return { duration: Math.round(seconds * 1000), easing: `linear(${points.join(', ')})` };
}

const DRAWER_SPRING = springTiming(340, 32, 1.1);
const EASE_FALLBACK = 'cubic-bezier(0.16, 1, 0.3, 1)';

function animateSpring(el: HTMLElement, keyframes: Keyframe[]): void {
  if (typeof el.animate !== 'function') return;
  try {
    el.animate(keyframes, { duration: DRAWER_SPRING.duration, easing: DRAWER_SPRING.easing });
  } catch {
    el.animate(keyframes, { duration: DRAWER_SPRING.duration, easing: EASE_FALLBACK });
  }
}

// ─── Perfil no rodapé do trilho ──────────────────────────────────────────────

const AVATAR_EMPTY_CLASS =
  'w-9 h-9 rounded-lg bg-accent text-foreground border-2 border-border flex items-center justify-center font-heading font-bold text-xs shrink-0';
const AVATAR_FILLED_CLASS = 'relative w-9 h-9 rounded-lg bg-white border-2 border-border overflow-hidden flex items-center justify-center shrink-0';

function storedRole(): UserRole {
  try {
    const raw = localStorage.getItem('cagp_user_role_v1');
    const value = raw ? (JSON.parse(raw) as unknown) : null;
    return USER_ROLES.includes(value as UserRole) ? (value as UserRole) : 'calouro';
  } catch {
    return 'calouro';
  }
}

/** Mesmo modelo de Seu perfil: nome salvo, fase do curso (cagp_user_role_v1) e foto ou avatar. */
function syncProfile(root: ParentNode = document): void {
  try {
    const stored = readStoredProfile();
    // O cofre só aceita perfil com nome e período em texto; fora disso vale o padrão ("Seu perfil").
    const valid = stored && typeof stored.name === 'string' && typeof stored.period === 'string' ? stored : null;
    const trimmed = valid?.name?.trim();
    const name = trimmed && trimmed !== 'Estudante de Gestão Pública' ? trimmed : 'Seu perfil';
    const meta = USER_ROLE_META[storedRole()];
    const period = `${meta.shortLabel} · ${meta.badge}`;
    const avatarHtml = stored && (stored.photoDataUrl || stored.avatarPreset || stored.name) ? renderAvatarHtml(stored, 'sm') : null;

    root.querySelectorAll<HTMLElement>('[data-rail-name]').forEach((el) => (el.textContent = name));
    root.querySelectorAll<HTMLElement>('[data-rail-period]').forEach((el) => (el.textContent = period));
    root.querySelectorAll<HTMLElement>('[data-rail-avatar]').forEach((el) => {
      if (avatarHtml) {
        el.className = AVATAR_FILLED_CLASS;
        el.innerHTML = avatarHtml;
      } else {
        el.className = AVATAR_EMPTY_CLASS;
        el.textContent = 'GP';
      }
    });
  } catch {
    // armazenamento bloqueado: o trilho fica com o texto padrão
  }
}

// ─── Desktop: recolher / expandir ────────────────────────────────────────────

const desktopRail = () => document.getElementById('cagp-desktop-sidebar');
const tabletRail = () => document.getElementById('cagp-tablet-rail');

/** O miolo aberto fica guardado enquanto o trilho do desktop mostra o compacto. */
let stashedFull: HTMLElement | null = null;

function isDesktopCollapsed(): boolean {
  return desktopRail()?.dataset.collapsed === 'true';
}

function setDesktopCollapsed(collapsed: boolean): void {
  const rail = desktopRail();
  if (!rail || isDesktopCollapsed() === collapsed) return;
  const from = rail.getBoundingClientRect().width;
  hideTip();
  if (collapsed) {
    const compact = tabletRail()?.querySelector<HTMLElement>('[data-rail-content="compact"]');
    const full = rail.querySelector<HTMLElement>('[data-rail-content="full"]');
    if (!compact || !full) return;
    stashedFull = full;
    rail.replaceChildren(compact.cloneNode(true));
  } else {
    if (!stashedFull) return;
    rail.replaceChildren(stashedFull);
    stashedFull = null;
  }
  rail.dataset.collapsed = String(collapsed);
  const to = collapsed ? WIDTH_COMPACT : WIDTH_OPEN;
  rail.style.width = `${to}px`;
  animateSpring(rail, [{ width: `${from}px` }, { width: `${to}px` }]);
  syncProfile(rail);
}

// ─── Tablet: gaveta por cima da página ───────────────────────────────────────

const DRAWER_ID = 'cagp-tablet-drawer';

function closeTabletDrawer(): void {
  document.getElementById(DRAWER_ID)?.remove();
}

function openTabletDrawer(): void {
  if (document.getElementById(DRAWER_ID)) return;
  const source = stashedFull ?? desktopRail()?.querySelector<HTMLElement>('[data-rail-content="full"]');
  if (!source) return;
  hideTip();

  const wrap = document.createElement('div');
  wrap.id = DRAWER_ID;
  wrap.className = 'fixed inset-0 z-[1100] hidden md:flex xl:hidden';

  const backdrop = document.createElement('div');
  backdrop.className = 'fixed inset-0 bg-foreground/70 transition-opacity duration-200 animate-in fade-in';
  backdrop.setAttribute('aria-hidden', 'true');
  backdrop.addEventListener('click', closeTabletDrawer);

  const panel = document.createElement('aside');
  panel.className = 'relative z-10 w-[280px] h-full border-r-3 border-border bg-white shadow-[8px_0px_0px_var(--color-border,#1F1F1F)]';
  panel.appendChild(source.cloneNode(true));

  wrap.append(backdrop, panel);
  // Ao lado do trilho, dentro da casca da página: sai junto com ela na troca de página.
  (tabletRail()?.parentElement ?? document.body).appendChild(wrap);
  syncProfile(panel);
  animateSpring(panel, [{ transform: `translateX(-${DRAWER_WIDTH}px)` }, { transform: 'translateX(0)' }]);
}

function toggleTabletDrawer(): void {
  if (document.getElementById(DRAWER_ID)) closeTabletDrawer();
  else openTabletDrawer();
}

/** "Abrir o menu": no celular "Mais" é uma página; no tablet é a gaveta; no desktop o trilho já está lá. */
function handleOpenDrawer(): void {
  if (window.innerWidth < 768) void navigate(route('/mais'));
  else if (window.innerWidth < 1280) toggleTabletDrawer();
}

// ─── Dicas do trilho compacto ────────────────────────────────────────────────
// Mesma aparência e mesmos tempos do Radix Tooltip que a ilha usava: abre 150 ms depois do mouse
// parar em cima (na hora, pelo teclado), à direita do ícone, e some com um desvanecer curto.
// A classe é a que o cn() da ilha entregava (font-bold já resolvido sobre o font-medium do kit).

const TIP_CLASS =
  'z-50 overflow-hidden border-2 border-foreground bg-foreground px-3 py-1.5 text-xs text-background shadow-md ease-out origin-[var(--radix-popper-content-transform-origin)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 font-heading font-bold';
const TIP_DELAY_MS = 150;
const TIP_OFFSET = 6;

let tipTimer = 0;
let tipFrame = 0;
let tipWrap: HTMLElement | null = null;
let tipTrigger: HTMLElement | null = null;

/** Põe a dica à direita do ícone, centrada na altura dele. */
function placeTip(): void {
  if (!tipWrap || !tipTrigger) return;
  const rect = tipTrigger.getBoundingClientRect();
  const height = tipWrap.offsetHeight;
  const x = Math.round(rect.right + TIP_OFFSET);
  const y = Math.round(Math.min(Math.max(rect.top + rect.height / 2 - height / 2, 4), window.innerHeight - height - 4));
  tipWrap.style.transform = `translate(${x}px, ${y}px)`;
  tipWrap.style.setProperty('--radix-popper-content-transform-origin', `0px ${height / 2}px`);
}

/** O ícone desliza 4px no hover (mola): a dica acompanha até ele assentar, como o Radix fazia. */
function followTrigger(): void {
  window.cancelAnimationFrame(tipFrame);
  const until = performance.now() + 700;
  const step = () => {
    placeTip();
    if (tipWrap && performance.now() < until) tipFrame = window.requestAnimationFrame(step);
  };
  tipFrame = window.requestAnimationFrame(step);
}

function showTip(trigger: HTMLElement): void {
  const text = trigger.dataset.railTip;
  if (!text || tipTrigger === trigger) return;
  removeTipNow();
  tipTrigger = trigger;

  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;left:0;top:0;min-width:max-content;z-index:50;pointer-events:none';
  const tip = document.createElement('div');
  tip.id = 'cagp-rail-tip';
  tip.setAttribute('role', 'tooltip');
  tip.dataset.side = 'right';
  tip.dataset.align = 'center';
  tip.dataset.state = 'delayed-open';
  tip.className = TIP_CLASS;
  tip.textContent = text;
  wrap.appendChild(tip);
  document.body.appendChild(wrap);

  trigger.setAttribute('aria-describedby', tip.id);
  tipWrap = wrap;
  placeTip();
  followTrigger();
}

function removeTipNow(): void {
  window.clearTimeout(tipTimer);
  window.cancelAnimationFrame(tipFrame);
  tipTrigger?.removeAttribute('aria-describedby');
  tipTrigger = null;
  tipWrap?.remove();
  tipWrap = null;
}

function hideTip(): void {
  window.clearTimeout(tipTimer);
  window.cancelAnimationFrame(tipFrame);
  const wrap = tipWrap;
  const tip = wrap?.firstElementChild as HTMLElement | null;
  tipTrigger?.removeAttribute('aria-describedby');
  tipTrigger = null;
  tipWrap = null;
  if (!wrap || !tip) return;
  tip.dataset.state = 'closed';
  // Sai com a animação de fechamento; o temporizador cobre aba em segundo plano, onde ela não roda.
  const done = () => wrap.remove();
  tip.addEventListener('animationend', done, { once: true });
  window.setTimeout(done, 220);
}

const tipTriggerOf = (target: EventTarget | null) =>
  target instanceof Element ? target.closest<HTMLElement>('[data-rail-tip]') : null;

// ─── Ligação ─────────────────────────────────────────────────────────────────

const dispatch = (name: string) => window.dispatchEvent(new CustomEvent(name));

function isTypingTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  return Boolean(el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable));
}

export function setupAppSidebar(): void {
  const w = window as RailWindow;
  if (w.__cagpAppSidebar) {
    syncProfile();
    return;
  }
  w.__cagpAppSidebar = true;

  document.addEventListener('click', (event) => {
    const control = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-rail-action]') : null;
    if (!control) return;
    const inDesktop = window.innerWidth >= 1280;
    switch (control.dataset.railAction) {
      case 'search':
        dispatch('cagp:open-spotlight');
        break;
      case 'collapse':
        if (inDesktop) setDesktopCollapsed(true);
        else closeTabletDrawer();
        break;
      case 'expand':
        if (inDesktop) setDesktopCollapsed(false);
        else openTabletDrawer();
        break;
      case 'campus':
        closeTabletDrawer();
        dispatch('cagp:open-campus');
        break;
      case 'passport':
        closeTabletDrawer();
        dispatch('cagp:open-passport');
        break;
    }
  });

  window.addEventListener('keydown', (event) => {
    const mod = event.metaKey || event.ctrlKey;
    const key = event.key.toLowerCase();
    // Com a busca montada, ela mesma cuida de Ctrl+K e "/" (abre e fecha).
    if (!w.__cagpPaletteMounted) {
      if (mod && key === 'k') {
        event.preventDefault();
        dispatch('cagp:open-spotlight');
        return;
      }
      if (event.key === '/' && !isTypingTarget(event.target)) {
        event.preventDefault();
        dispatch('cagp:open-spotlight');
        return;
      }
    }
    if (mod && key === 'b') {
      event.preventDefault();
      if (window.innerWidth < 768) void navigate(route('/mais'));
      else if (window.innerWidth < 1280) toggleTabletDrawer();
      else setDesktopCollapsed(!isDesktopCollapsed());
    }
    if (event.key === 'Escape') hideTip();
  });

  window.addEventListener('cagp:open-drawer', handleOpenDrawer);
  window.addEventListener('cagp:open-sidebar', handleOpenDrawer);
  window.addEventListener('cagp:open-mais', handleOpenDrawer);
  window.addEventListener('cagp:close-rail-drawer', closeTabletDrawer);
  window.addEventListener('cagp:passport-updated', () => syncProfile());
  window.addEventListener('cagp:vault-updated', () => syncProfile());

  // Dicas: só mouse e teclado (toque não abre dica, como no Radix).
  document.addEventListener('pointerover', (event) => {
    if (event.pointerType === 'touch') return;
    const trigger = tipTriggerOf(event.target);
    if (!trigger || trigger === tipTrigger) return;
    window.clearTimeout(tipTimer);
    tipTimer = window.setTimeout(() => showTip(trigger), TIP_DELAY_MS);
  });
  document.addEventListener('pointerout', (event) => {
    const trigger = tipTriggerOf(event.target);
    if (!trigger || trigger.contains(event.relatedTarget as Node | null)) return;
    hideTip();
  });
  document.addEventListener('pointerdown', () => hideTip());
  document.addEventListener('focusin', (event) => {
    const trigger = tipTriggerOf(event.target);
    if (trigger && trigger.matches(':focus-visible')) showTip(trigger);
  });
  document.addEventListener('focusout', (event) => {
    if (tipTriggerOf(event.target)) hideTip();
  });
  window.addEventListener('scroll', () => tipWrap && hideTip(), { passive: true, capture: true });

  // Página nova: o trilho chega aberto no HTML; sobram só restos da página anterior para limpar.
  document.addEventListener('astro:before-swap', () => {
    removeTipNow();
    stashedFull = null;
  });
  document.addEventListener('astro:page-load', () => syncProfile());
  syncProfile();
}
