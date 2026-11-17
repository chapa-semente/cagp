// src/scripts/sharedTitle.ts — Título que viaja (DESIGN.md › Movimento), nomeado só na hora.
// Linhas de lista marcam o título com data-vt-title e o destino com data-vt-href. Só a linha tocada
// recebe o view-transition-name (as outras deslizam junto com a página), e na volta só a linha
// da página de onde a pessoa veio. O <h1> do PageHeader já tem o nome da própria rota.
import { vtTitleName } from '@/lib/viewTransitionNames';

const name = (el: HTMLElement, path: string) => {
  el.style.setProperty('view-transition-name', vtTitleName(path));
  el.style.setProperty('view-transition-class', 'vt-title');
};

const pathOf = (href: string) => {
  try {
    return new URL(href, window.location.href).pathname;
  } catch {
    return href;
  }
};

export function setupSharedTitle() {
  if ((window as unknown as { __cagpSharedTitle?: boolean }).__cagpSharedTitle) return;
  (window as unknown as { __cagpSharedTitle?: boolean }).__cagpSharedTitle = true;

  // Ida: a linha tocada carrega o nome da rota que vai abrir.
  document.addEventListener('astro:before-preparation', (e) => {
    const source = (e as Event & { sourceElement?: Element }).sourceElement;
    const link = source?.closest('a');
    const title = link?.querySelector<HTMLElement>('[data-vt-title]');
    if (link && title) name(title, pathOf(link.href));
  });

  // Caminho da página que está na tela: no voltar do navegador (popstate) a URL já mudou
  // quando a troca começa, então o "de onde veio" fica guardado aqui.
  let shownPath = window.location.pathname;
  document.addEventListener('astro:page-load', () => {
    shownPath = window.location.pathname;
  });

  // Volta: na página nova, a linha que aponta para a página de onde se saiu recebe o nome.
  document.addEventListener('astro:before-swap', (e) => {
    const doc = (e as Event & { newDocument?: Document }).newDocument;
    if (!doc) return;
    const from = shownPath.replace(/\/+$/, '') || '/';
    const match = Array.from(doc.querySelectorAll<HTMLElement>('[data-vt-href]')).find(
      (el) => (pathOf(el.dataset.vtHref || '').replace(/\/+$/, '') || '/') === from
    );
    if (match) name(match, from);
  });
}
