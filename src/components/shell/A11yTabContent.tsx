// A11yTabContent.tsx — Ajustes › Leitura. Um só painel de acessibilidade no site (folha Ajustes e /configuracoes).
// Três ajustes de leitura e nada mais: tamanho da letra, contraste e fonte para dislexia.
// O fundo animado não é escolha do estudante: é do volume Cartaz (DESIGN.md › Movimento › Canvas).
import React from 'react';
import type { VaultData } from '@/lib/storage/studentVault';

interface Props {
  prefs: VaultData<'cagp_a11y_prefs_v2'>;
  update: (partial: Partial<VaultData<'cagp_a11y_prefs_v2'>>) => void;
}

const FONT_SIZES = [
  { id: 'sm', label: 'Menor', sample: 'text-sm' },
  { id: 'md', label: 'Normal', sample: 'text-base' },
  { id: 'lg', label: 'Maior', sample: 'text-lg' },
  { id: 'xl', label: 'Bem maior', sample: 'text-xl' },
] as const;

const optionClass = (on: boolean) =>
  `min-h-[52px] px-2 py-2 rounded-xl border-2 border-border cursor-pointer flex flex-col items-center justify-center gap-0.5 transition-[background-color,color,transform,box-shadow] duration-(--duration-press) ease-(--ease-spring-snappy) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
    on ? 'bg-active text-active-foreground translate-x-0.5 translate-y-0.5' : 'bg-white text-foreground shadow-xs hover:bg-primary-tint active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
  }`;

export const A11yTabContent: React.FC<Props> = ({ prefs, update }) => {
  const font = prefs.font || 'md';
  return (
    <div className="space-y-6 text-foreground">
      <fieldset className="m-0 p-0 border-0 space-y-2">
        <legend className="font-heading font-bold text-base mb-2">Tamanho da letra</legend>
        <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label="Tamanho da letra">
          {FONT_SIZES.map((s) => (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={font === s.id}
              onClick={() => update({ font: s.id })}
              className={optionClass(font === s.id)}
            >
              <span className={`font-heading font-bold leading-none ${s.sample}`} aria-hidden="true">Aa</span>
              <span className="text-xs font-bold">{s.label}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="m-0 p-0 border-0 space-y-2">
        <legend className="font-heading font-bold text-base mb-2">Contraste</legend>
        <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Contraste">
          <button
            type="button"
            role="radio"
            aria-checked={prefs.contrast !== 'high'}
            onClick={() => update({ contrast: 'normal' })}
            className={optionClass(prefs.contrast !== 'high')}
          >
            <span className="text-sm font-bold">Normal</span>
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={prefs.contrast === 'high'}
            onClick={() => update({ contrast: 'high' })}
            className={optionClass(prefs.contrast === 'high')}
          >
            <span className="text-sm font-bold">Alto</span>
            {/* Amostra do modo: preto e amarelo, como fica a tela. */}
            <span className="text-xs font-bold px-1.5 rounded-md bg-[#000000] text-[#FFFF00]" aria-hidden="true">preto e amarelo</span>
          </button>
        </div>
      </fieldset>

      <div className="flex items-center justify-between gap-4 p-4 rounded-xl border-2 border-border bg-white">
        <div className="min-w-0">
          <span id="ajuste-dislexia" className="block font-heading font-bold text-base">Fonte para dislexia</span>
          <span className="block text-sm text-content-secondary">Letras com a base mais pesada, mais fáceis de não embaralhar.</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={prefs.dyslexia}
          aria-labelledby="ajuste-dislexia"
          onClick={() => update({ dyslexia: !prefs.dyslexia })}
          className={`relative shrink-0 w-14 h-8 rounded-full border-2 border-border cursor-pointer transition-colors duration-(--duration-press) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
            prefs.dyslexia ? 'bg-active' : 'bg-muted'
          }`}
        >
          <span
            aria-hidden="true"
            className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white border-2 border-border shadow-xs transition-transform duration-(--duration-spring) ease-(--ease-spring) ${
              prefs.dyslexia ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
};
