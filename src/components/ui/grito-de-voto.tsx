// grito-de-voto.tsx — O grito de campanha para ilhas React. Mesmo markup e CSS de GritoDeVoto.astro.
import * as React from 'react';
import { cn } from '@/lib/utils';
import { GRITO, GRITO_VOTO } from '@/lib/chapaSementeData';

export interface GritoDeVotoProps {
  onColor?: boolean;
  tamanho?: 'sm' | 'md' | 'lg';
  duasLinhas?: boolean;
  curto?: boolean;
  as?: 'p' | 'span';
  className?: string;
}

export const GritoDeVoto: React.FC<GritoDeVotoProps> = ({ onColor = false, tamanho = 'md', duasLinhas = false, curto = false, as: Tag = 'p', className }) => (
  <Tag className={cn('cagp-grito', `cagp-grito--${tamanho}`, onColor && 'is-on-color', duasLinhas && 'cagp-grito--duas', className)}>
    <span className="sr-only">{GRITO}</span>
    <span className="cagp-grito__parte" aria-hidden="true">{curto ? 'Vote 2!' : GRITO_VOTO}</span>
    <span className="cagp-grito__parte" aria-hidden="true">
      Faz o{' '}
      <span className="cagp-marker cagp-marker--circle">
        <span className="cagp-marker__word">S</span>
        <svg className="cagp-marker__stroke" viewBox="0 0 200 80" preserveAspectRatio="none">
          <path pathLength={1} d="M150 9C104 1 30 5 11 30c-16 21 22 42 86 44 60 2 99-14 96-36-2-17-41-29-92-28" />
        </svg>
      </span>
      !
    </span>
  </Tag>
);
