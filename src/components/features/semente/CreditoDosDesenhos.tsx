// CreditoDosDesenhos.tsx — A assinatura de quem desenhou, para ficar junto dos desenhos.
// Leve de propósito (não importa os desenhos): pode entrar em qualquer tela dos tours.
import React from 'react';
import { ARTISTA_DOS_DESENHOS as A } from '@/lib/creditos';

/** `link`: leva ao Instagram dela. Nas telas em que há um pedido de voto, o crédito é só texto. */
export const CreditoDosDesenhos: React.FC<{ link?: boolean; className?: string }> = ({ link = false, className = '' }) => (
  <p className={`m-0 text-sm leading-snug ${className}`}>
    Desenhos de <strong className="font-bold">{A.nome}</strong>, {A.quem}
    {link ? (
      <>
        {' · '}
        <a
          href={A.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center font-bold text-inherit underline underline-offset-[0.22em] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {A.instagram}
          <span className="sr-only"> no Instagram (abre em outra aba)</span>
        </a>
      </>
    ) : (
      <> · {A.instagram}</>
    )}
  </p>
);

export default CreditoDosDesenhos;
