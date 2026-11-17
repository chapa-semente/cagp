// src/scripts/countUp.ts — Numerais que contam até o valor quando aparecem (DESIGN.md › Movimento › Números).
// Uso: <span data-count-to="65" data-count-suffix="%">65%</span>. O HTML já traz o valor final
// (sem JS ou sem suporte, nada muda); o script zera só quando vai animar.
const DURATION = 900;
// Mesma ginga do --ease-spring (passa um pouco do ponto e assenta), em função contínua.
const spring = (t: number) => 1 - Math.exp(-6.5 * t) * Math.cos(5.2 * t);

const done = new WeakSet<Element>();
const fmt = new Intl.NumberFormat('pt-BR');

function run(el: HTMLElement) {
  if (done.has(el)) return;
  done.add(el);
  const to = Number(el.dataset.countTo);
  if (!Number.isFinite(to)) return;
  const prefix = el.dataset.countPrefix ?? '';
  const suffix = el.dataset.countSuffix ?? '';
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / DURATION);
    const v = t >= 1 ? to : Math.round(to * spring(t));
    el.textContent = `${prefix}${fmt.format(v)}${suffix}`;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

let io: IntersectionObserver | null = null;
let mo: MutationObserver | null = null;

function watch(root: ParentNode) {
  root.querySelectorAll<HTMLElement>('[data-count-to]').forEach((el) => {
    if (!done.has(el)) io?.observe(el);
  });
}

export function setupCountUp() {
  io?.disconnect();
  mo?.disconnect();
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          io?.unobserve(e.target);
          run(e.target as HTMLElement);
        }
      });
    },
    { threshold: 0.6 }
  );
  watch(document);
  // Ilhas React montam depois do page-load: observa o que entrar no DOM.
  mo = new MutationObserver((records) => {
    for (const r of records) r.addedNodes.forEach((n) => n instanceof HTMLElement && watch(n.parentNode ?? n));
  });
  mo.observe(document.body, { childList: true, subtree: true });
}
