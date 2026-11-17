// expandDetails.ts — dá a todo <details> do site a física da gaveta de Regras da calculadora ACG.
// Delegação única no document: vale para páginas Astro, ilhas React e conteúdo MDX, e
// sobrevive à navegação do ClientRouter. O <details> continua nativo: sem JS, abre seco;
// Ctrl+F e âncoras continuam abrindo. Para excluir um, use data-expand="off".
// Tempos e curva espelham os tokens --duration-expand* e --ease-snap de global.css.

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const DURATION = 320;
const FADE = 240;
const RISE = 280;

type Running = { height: Animation; content: Animation[]; opening: boolean };
const running = new WeakMap<HTMLDetailsElement, Running>();

function bodyOf(details: HTMLDetailsElement) {
  return Array.from(details.children).filter(
    (el): el is HTMLElement => el instanceof HTMLElement && el.tagName !== 'SUMMARY'
  );
}

function heightWhen(details: HTMLDetailsElement, open: boolean) {
  const was = details.open;
  details.open = open;
  const h = details.getBoundingClientRect().height;
  details.open = was;
  return h;
}

function finish(details: HTMLDetailsElement) {
  const r = running.get(details);
  if (!r) return;
  running.delete(details);
  if (!r.opening) details.open = false;
  r.content.forEach((a) => a.cancel());
  details.style.overflow = '';
  delete details.dataset.expandState;
}

function toggle(details: HTMLDetailsElement) {
  const current = running.get(details);
  // Clique no meio do movimento inverte a partir da altura em que está.
  const opening = current ? !current.opening : !details.open;
  const from = details.getBoundingClientRect().height;

  if (current) {
    current.height.cancel();
    current.content.forEach((a) => a.cancel());
    running.delete(details);
  }

  const to = heightWhen(details, opening);
  details.open = true;
  details.style.overflow = 'hidden';
  details.dataset.expandState = opening ? 'opening' : 'closing';

  const height = details.animate(
    { height: [`${from}px`, `${to}px`] },
    { duration: DURATION, easing: EASE }
  );

  const content = bodyOf(details).map((el) =>
    opening
      ? el.animate(
          [
            { opacity: 0, transform: 'translateY(-4px)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: RISE, easing: EASE }
        )
      : el.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: FADE,
          easing: EASE,
          fill: 'forwards',
        })
  );

  running.set(details, { height, content, opening });
  height.onfinish = () => {
    if (running.get(details)?.height === height) finish(details);
  };
}

function onClick(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0) return;
  const target = event.target as Element | null;
  const summary = target?.closest?.('summary');
  if (!summary) return;

  const details = summary.parentElement;
  if (!(details instanceof HTMLDetailsElement)) return;
  if (details.querySelector(':scope > summary') !== summary) return;
  if (details.dataset.expand === 'off') return;

  // Link ou botão dentro do summary segue com o próprio comportamento.
  const interactive = target!.closest('a, button, input, select, textarea, label');
  if (interactive && summary.contains(interactive)) return;

  event.preventDefault();
  toggle(details);
}

declare global {
  interface Window {
    __cagpExpandDetailsBound?: boolean;
  }
}

if (typeof window !== 'undefined' && !window.__cagpExpandDetailsBound) {
  window.__cagpExpandDetailsBound = true;
  document.addEventListener('click', onClick);
}

export {};
