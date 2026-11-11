// src/scripts/tabSwipe.ts — Arrastar de lado troca de aba (celular).
//
// Na raiz de uma aba (Hoje, Guias, Chapa, Meu curso), arrastar o conteúdo para a esquerda abre a
// aba seguinte e para a direita, a anterior. Depois de Meu curso, o arrasto abre o painel Mais.
// O conteúdo acompanha o dedo com resistência e, ao soltar, a troca usa a mesma animação de página
// (o <main> anda na direção certa e a pílula da barra viaja até a aba nova).
//
// O gesto não disputa com o que já é do dedo ou do sistema:
//   - começa longe das bordas da tela (o voltar do iOS e do Android mora ali);
//   - não vale dentro de nada que role de lado (cartões deslizantes, abas, tabelas), nem em
//     slider, campo de texto ou mapa;
//   - só vale na raiz da aba: dentro de uma página, o lado é do "voltar" do navegador;
//   - arrasto na vertical é rolagem, sempre.
import { navigate } from 'astro:transitions/client';
import { AXIS_REGISTRY, normalizePathname } from '@/lib/navigationRegistry';

const BORDA = 28; // px reservados ao gesto de voltar do sistema
const DISPARO = 72; // px de arrasto para trocar de aba
const TRAVA = 12; // px até decidir se o gesto é de lado ou de rolagem

export function setupTabSwipe() {
  const w = window as unknown as { __cagpTabSwipe?: boolean };
  if (w.__cagpTabSwipe) return;
  w.__cagpTabSwipe = true;

  // "Mais" é um painel no celular, então fica fora da fila de abas.
  const abas = AXIS_REGISTRY.filter((a) => a.id !== 'mais');
  const raizes = abas.map((a) => normalizePathname(new URL(a.rootHref, window.location.href).pathname));

  let x0 = 0;
  let y0 = 0;
  let t0 = 0;
  let indice = -1;
  let eixo: 'lado' | 'rolagem' | null = null;
  let main: HTMLElement | null = null;

  const rolaDeLado = (alvo: Element | null) => {
    for (let el = alvo as HTMLElement | null; el && el !== main; el = el.parentElement) {
      if (el.matches('input, textarea, select, [role="slider"], [contenteditable], [data-sem-arrasto], .leaflet-container')) return true;
      if (el.scrollWidth > el.clientWidth + 4) {
        const ox = getComputedStyle(el).overflowX;
        if (ox === 'auto' || ox === 'scroll') return true;
      }
    }
    return false;
  };

  const solta = (volta: boolean) => {
    if (!main) return;
    main.style.transition = volta ? 'translate var(--duration-spring) var(--ease-spring)' : '';
    main.style.translate = '';
    const el = main;
    if (volta) window.setTimeout(() => (el.style.transition = ''), 560);
  };

  document.addEventListener(
    'touchstart',
    (e) => {
      indice = -1;
      eixo = null;
      if (e.touches.length !== 1 || window.innerWidth >= 768) return;
      const t = e.touches[0];
      if (t.clientX < BORDA || t.clientX > window.innerWidth - BORDA) return;
      // Folha, busca, tour ou painel aberto: o gesto é deles.
      if (document.body.style.overflow === 'hidden' || document.querySelector('[role="dialog"]')) return;
      main = document.getElementById('main-content');
      if (!main || !main.contains(e.target as Node) || rolaDeLado(e.target as Element)) return;
      indice = raizes.indexOf(normalizePathname(window.location.pathname));
      x0 = t.clientX;
      y0 = t.clientY;
      t0 = e.timeStamp;
    },
    { passive: true }
  );

  document.addEventListener(
    'touchmove',
    (e) => {
      if (indice < 0 || !main) return;
      const dx = e.touches[0].clientX - x0;
      const dy = e.touches[0].clientY - y0;
      if (!eixo) {
        if (Math.abs(dy) > TRAVA && Math.abs(dy) >= Math.abs(dx)) eixo = 'rolagem';
        else if (Math.abs(dx) > TRAVA && Math.abs(dx) > Math.abs(dy) * 1.5) eixo = 'lado';
        else return;
      }
      if (eixo !== 'lado') return;
      // Na primeira aba não há o que abrir à direita: o conteúdo quase não cede.
      const semDestino = dx > 0 && indice === 0;
      main.style.transition = 'none';
      main.style.translate = `${dx * (semDestino ? 0.12 : 0.4)}px 0`;
    },
    { passive: true }
  );

  const fim = (e: TouchEvent) => {
    if (indice < 0 || eixo !== 'lado') {
      indice = -1;
      return;
    }
    const dx = e.changedTouches[0].clientX - x0;
    const rapido = Math.abs(dx) / Math.max(1, e.timeStamp - t0) > 0.5 && Math.abs(dx) > 40;
    const atual = indice;
    indice = -1;
    if (Math.abs(dx) < DISPARO && !rapido) return solta(true);

    const destino = dx < 0 ? atual + 1 : atual - 1;
    if (destino < 0) return solta(true);
    if ('vibrate' in navigator) navigator.vibrate(8);
    if (destino >= abas.length) {
      solta(true);
      window.dispatchEvent(new CustomEvent('cagp:open-mais'));
      return;
    }
    solta(false);
    navigate(abas[destino].rootHref);
  };
  document.addEventListener('touchend', fim, { passive: true });
  document.addEventListener('touchcancel', () => {
    if (indice >= 0 && eixo === 'lado') solta(true);
    indice = -1;
  });
}
