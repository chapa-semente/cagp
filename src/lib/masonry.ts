// masonry.ts — colunas independentes, como as pilhas da calculadora ACG.
// Quando um cartão expande, só os cartões ABAIXO dele, na MESMA coluna, descem;
// a linha vizinha e as outras colunas não se mexem.
//
// A grade continua sendo a grade do Tailwind (grid-cols-*, gap-*): o número de colunas e o
// espaçamento vêm do CSS em cada breakpoint. O script só troca as linhas por trilhos de 1px,
// fixa cada item na coluna (i % colunas) e faz cada um ocupar exatamente a própria altura.
// A ordem do DOM (leitura, Tab, leitor de tela) segue da esquerda para a direita.
// Sem JS, a grade comum continua funcionando.

type Masonry = { relayout: () => void; destroy: () => void };

const instances = new WeakMap<HTMLElement, Masonry>();

function isPlaced(el: Element): el is HTMLElement {
  if (!(el instanceof HTMLElement)) return false;
  const cs = getComputedStyle(el);
  // Itens saindo (AnimatePresence popLayout) ficam absolutos e não ocupam célula.
  return cs.display !== 'none' && cs.position !== 'absolute' && cs.position !== 'fixed';
}

export function attachMasonry(grid: HTMLElement): Masonry {
  const existing = instances.get(grid);
  if (existing) return existing;

  let gap = 0;
  let cols = 1;
  let width = -1;
  const sizes = new WeakMap<Element, number>();

  const setSpan = (el: HTMLElement, height: number) => {
    sizes.set(el, height);
    el.style.gridRowEnd = `span ${Math.max(1, Math.ceil(height + gap))}`;
  };

  // Lê colunas e espaçamento do CSS original (sem a classe que zera o row-gap).
  const readGrid = () => {
    grid.classList.remove('is-masonry');
    const cs = getComputedStyle(grid);
    gap = parseFloat(cs.rowGap) || 0;
    cols = cs.gridTemplateColumns.split(' ').filter(Boolean).length || 1;
    grid.classList.add('is-masonry');
  };

  const itemObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const el = entry.target as HTMLElement;
      const h = entry.borderBoxSize?.[0]?.blockSize ?? el.offsetHeight;
      if (sizes.get(el) !== h) setSpan(el, h);
    }
  });

  const relayout = () => {
    // Grade dentro de aba/painel oculto: mede quando aparecer (o ResizeObserver da grade avisa).
    if (!grid.getClientRects().length) {
      width = -1;
      return;
    }
    readGrid();
    let i = 0;
    for (const el of Array.from(grid.children)) {
      if (!isPlaced(el)) continue;
      el.style.gridColumn = String((i % cols) + 1);
      setSpan(el, el.offsetHeight);
      itemObserver.observe(el);
      i += 1;
    }
  };

  const gridObserver = new ResizeObserver(([entry]) => {
    const w = entry.contentRect.width;
    if (w === width) return;
    width = w;
    relayout();
  });

  const mutationObserver = new MutationObserver(relayout);

  relayout();
  gridObserver.observe(grid);
  mutationObserver.observe(grid, { childList: true });

  const instance: Masonry = {
    relayout,
    destroy() {
      gridObserver.disconnect();
      itemObserver.disconnect();
      mutationObserver.disconnect();
      grid.classList.remove('is-masonry');
      for (const el of Array.from(grid.children)) {
        if (el instanceof HTMLElement) {
          el.style.gridColumn = '';
          el.style.gridRowEnd = '';
        }
      }
      instances.delete(grid);
    },
  };
  instances.set(grid, instance);
  return instance;
}

/** Ativa as grades marcadas com data-masonry (páginas Astro). */
export function initMasonryGrids(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-masonry]').forEach((grid) => attachMasonry(grid));
}
