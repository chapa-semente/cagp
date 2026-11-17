// semente-shapes.tsx — Formas orgânicas da identidade Chapa Semente (manual §3 e §7.1).
// Única decoração do sistema (DESIGN.md › Shapes): o arco da folha, a gota da semente e o semicírculo.
// Sempre chapadas (roxo, laranja ou petróleo), sem contorno, sem sombra, sem degradê, só no volume Cartaz.
import * as React from 'react';
import { cn } from '@/lib/utils';

type ShapeColor = 'orange' | 'purple' | 'teal' | 'sand' | 'white';

const FILL: Record<ShapeColor, string> = {
  orange: '#FE8812',
  purple: '#5B2A85',
  teal: '#266264',
  sand: '#F4F2EC',
  white: '#FFFFFF',
};

interface ShapeProps extends React.SVGProps<SVGSVGElement> {
  color?: ShapeColor;
  /** Brota uma vez a partir da base (DESIGN.md › Movimento › Germinar). Só no herói do Cartaz. */
  germinate?: boolean;
}

/** Folha: arco ascendente apontando para cima/direita — a ideia nova, o que brota. */
export function LeafShape({ color = 'orange', germinate = false, className, ...props }: ShapeProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className={cn(germinate && 'cagp-germinate', className)}
      {...props}
    >
      <path d="M8 92 C8 42 42 8 92 8 C92 58 58 92 8 92 Z" fill={FILL[color]} />
    </svg>
  );
}

/** Semente: gota vertical — o núcleo, o potencial que vira ação. */
export function SeedShape({ color = 'purple', germinate = false, className, ...props }: ShapeProps) {
  return (
    <svg
      viewBox="0 0 100 120"
      aria-hidden="true"
      focusable="false"
      className={cn(germinate && 'cagp-germinate', className)}
      {...props}
    >
      <path d="M50 4 C70 34 86 58 86 78 A36 36 0 0 1 14 78 C14 58 30 34 50 4 Z" fill={FILL[color]} />
    </svg>
  );
}

/** Semicírculo: divisor curvo entre blocos de cor (color blocking com curva orgânica). */
export function SemicircleShape({ color = 'teal', className, ...props }: Omit<ShapeProps, 'germinate'>) {
  return (
    <svg viewBox="0 0 100 50" aria-hidden="true" focusable="false" className={className} {...props}>
      <path d="M0 50 A50 50 0 0 1 100 50 Z" fill={FILL[color]} />
    </svg>
  );
}
