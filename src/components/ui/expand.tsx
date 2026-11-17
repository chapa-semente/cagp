// expand.tsx — Física de expansão do site inteiro (origem: gaveta de Regras da calculadora ACG).
// Toda expansão de texto ("ver mais", "ler ementa", "texto integral") usa estas peças:
//   - <ExpandRegion open>: gaveta 0fr → 1fr; com peekLines, mostra N linhas fechado.
//   - <ExpandChevron open>: chevron que gira no mesmo tempo da gaveta.
//   - useExpandSet(): estado individual por item (abrir um não fecha o outro).
//   - useMasonryColumns(): colunas independentes; expandir um cartão só desce a coluna dele.
// A CSS vive em src/styles/global.css (.cagp-expand*). <details> é animado por src/lib/expandDetails.ts.
import * as React from 'react';
import { ChevronDown } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { attachMasonry } from '@/lib/masonry';

interface ExpandRegionProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  /** Linhas visíveis quando fechado. Sem valor, a região some por completo. */
  peekLines?: number;
  innerClassName?: string;
}

export const ExpandRegion = React.forwardRef<HTMLDivElement, ExpandRegionProps>(
  ({ open, peekLines, className, innerClassName, style, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('cagp-expand', peekLines && 'cagp-expand--peek', open && 'is-open', className)}
      style={
        peekLines
          ? ({ ...style, '--expand-peek': `${peekLines}lh` } as React.CSSProperties)
          : style
      }
      {...rest}
    >
      <div className={cn('cagp-expand-inner', innerClassName)}>{children}</div>
    </div>
  )
);
ExpandRegion.displayName = 'ExpandRegion';

export function ExpandChevron({ open, className }: { open: boolean; className?: string }) {
  return (
    <ChevronDown
      className={cn('cagp-expand-chevron w-4 h-4', open && 'is-open', className)}
      aria-hidden="true"
    />
  );
}

/** Estado de expansão individual: cada chave abre e fecha sozinha. */
export function useExpandSet<K extends string | number>() {
  const [openKeys, setOpenKeys] = React.useState<ReadonlySet<K>>(() => new Set());

  const toggle = React.useCallback((key: K) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const isOpen = React.useCallback((key: K) => openKeys.has(key), [openKeys]);

  return { isOpen, toggle };
}

/**
 * Colunas independentes na grade do ref (como as pilhas da calculadora ACG):
 * ao expandir um cartão, só os de baixo na mesma coluna descem.
 */
export function useMasonryColumns<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);

  React.useLayoutEffect(() => {
    if (!ref.current) return;
    const masonry = attachMasonry(ref.current);
    return () => masonry.destroy();
  }, []);

  // Filtros e reordenações re-renderizam os filhos: recalcula colunas antes da pintura.
  React.useLayoutEffect(() => {
    if (ref.current) attachMasonry(ref.current).relayout();
  });

  return ref;
}
