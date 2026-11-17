// marker-word.tsx — A caneta da chapa para ilhas React. Mesmo markup e CSS de MarkerWord.astro.
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface MarkerWordProps {
  children: React.ReactNode;
  mark?: 'underline' | 'circle';
  onColor?: boolean;
  /** Abaixo da dobra: o traço se desenha guiado pela rolagem. */
  scroll?: boolean;
  className?: string;
}

export const MarkerWord: React.FC<MarkerWordProps> = ({ children, mark = 'underline', onColor = false, scroll = false, className }) => (
  <span className={cn('cagp-marker', `cagp-marker--${mark}`, onColor && 'is-on-color', scroll && 'is-scroll', className)}>
    <span className="cagp-marker__word">{children}</span>
    {mark === 'underline' ? (
      <svg className="cagp-marker__stroke" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
        <path pathLength={1} d="M3 13C38 7 74 6 108 9s58 4 89-3" />
      </svg>
    ) : (
      <svg className="cagp-marker__stroke" viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true">
        <path pathLength={1} d="M150 9C104 1 30 5 11 30c-16 21 22 42 86 44 60 2 99-14 96-36-2-17-41-29-92-28" />
      </svg>
    )}
  </span>
);
