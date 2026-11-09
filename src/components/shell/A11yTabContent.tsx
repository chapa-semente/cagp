import React from 'react';
import type { VaultData } from '@/lib/storage/studentVault';
import { SHADER_OPTIONS } from './GlobalCanvasBackdrop';

interface Props {
  prefs: VaultData<'cagp_a11y_prefs_v2'>;
  update: (partial: Partial<VaultData<'cagp_a11y_prefs_v2'>>) => void;
}

export const A11yTabContent: React.FC<Props> = ({ prefs, update }) => {
  return (
    <div className="space-y-4 text-foreground">
      {/* Contraste Visual */}
      <div className="bg-background p-3.5 rounded-xl border-2 border-border shadow-xs">
        <span className="block font-heading font-extrabold text-xs uppercase tracking-tight mb-2.5">
          Contraste Visual
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => update({ contrast: 'normal' })}
            className={`py-2 px-3 text-xs font-heading font-extrabold uppercase rounded-lg border-2 cursor-pointer min-h-[44px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
              prefs.contrast === 'normal'
                ? 'bg-foreground text-background text-white border-border shadow-xs'
                : 'bg-white text-foreground border-border hover:bg-muted'
            }`}
          >
            Padrão Institucional
          </button>
          <button
            type="button"
            onClick={() => update({ contrast: 'high' })}
            className={`py-2 px-3 text-xs font-heading font-extrabold uppercase rounded-lg border-2 cursor-pointer min-h-[44px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
              prefs.contrast === 'high'
                ? 'bg-foreground text-yellow-300 border-yellow-300 shadow-xs'
                : 'bg-black text-yellow-300 border-black hover:bg-zinc-900'
            }`}
          >
            Alto Contraste AAA
          </button>
        </div>
      </div>

      {/* Tamanho da Tipografia (Stepper) */}
      <div className="bg-background p-3.5 rounded-xl border-2 border-border shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="font-heading font-extrabold text-xs uppercase tracking-tight">
            Escala Tipográfica
          </span>
          <span className="text-xs font-mono font-bold text-muted-foreground tabular-nums">
            {prefs.font === 'sm' ? '90%' : prefs.font === 'md' ? '100% (Padrão)' : prefs.font === 'lg' ? '115%' : '130%'}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => update({ font: size })}
              className={`py-2 text-xs font-heading font-extrabold uppercase rounded-lg border-2 cursor-pointer min-h-[44px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
                prefs.font === size
                  ? 'bg-secondary text-white border-border shadow-xs'
                  : 'bg-white text-foreground border-border hover:bg-muted'
              }`}
            >
              {size === 'sm' ? 'A-' : size === 'md' ? 'A' : size === 'lg' ? 'A+' : 'A++'}
            </button>
          ))}
        </div>
      </div>

      {/* Dislexia */}
      <button
        type="button"
        onClick={() => update({ dyslexia: !prefs.dyslexia })}
        className={`w-full p-3.5 text-xs font-heading font-extrabold uppercase rounded-xl border-2 text-left cursor-pointer transition-all min-h-[48px] flex items-center justify-between shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
          prefs.dyslexia
            ? 'bg-secondary text-white border-border'
            : 'bg-background text-foreground border-border hover:bg-muted'
        }`}
      >
        <div className="pr-2">
          <span className="block text-xs font-black uppercase tracking-tight">Fonte para Dislexia (OpenDyslexic)</span>
          <span className="text-xs font-sans font-normal opacity-90 block mt-1 normal-case">
            Tipografia especializada com gravidade reforçada na base das letras
          </span>
        </div>
        <span
          className={`text-xs font-heading font-extrabold px-3 py-1.5 rounded-lg border-2 shrink-0 ${
            prefs.dyslexia
              ? 'bg-white/20 text-white border-white/40'
              : 'bg-white text-foreground border-border'
          }`}
        >
          {prefs.dyslexia ? 'Ativa' : 'Desativada'}
        </span>
      </button>

      {/* Efeito Visual de Fundo (BoldKit Canvas WebGL) */}
      <div className="bg-background p-3.5 rounded-xl border-2 border-border shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="block font-heading font-extrabold text-xs uppercase tracking-tight text-foreground">
            Efeito Visual de Fundo (BoldKit Canvas)
          </span>
          <span className="text-xs font-mono font-bold text-muted-foreground">23 Modos</span>
        </div>
        <select
          value={prefs.shader || 'auto'}
          onChange={(e) => {
            update({ shader: e.target.value });
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('cagp:vault-updated'));
            }
          }}
          className="w-full min-h-[44px] px-3.5 py-2 text-xs font-mono font-bold bg-white text-foreground border-2 border-border rounded-lg shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
          aria-label="Selecionar shader dinâmico de fundo"
        >
          {SHADER_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Atalhos de Teclado */}
      <div className="p-3 rounded-xl border-2 border-border bg-background text-xs text-muted-foreground space-y-1.5 shadow-xs">
        <span className="font-heading font-extrabold text-xs uppercase tracking-tight text-foreground block">
          <i className="bi bi-keyboard me-1 text-primary"></i> Atalhos Rápidos de Acessibilidade
        </span>
        <div className="flex flex-wrap gap-3 pt-0.5">
          <span className="flex items-center gap-1.5 font-medium">
            <kbd className="px-2 py-1 bg-white text-foreground border-2 border-border rounded-md text-xs font-mono font-bold shadow-xs">Alt + A</kbd>
            <span>Abrir / Fechar Painel</span>
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <kbd className="px-2 py-1 bg-white text-foreground border-2 border-border rounded-md text-xs font-mono font-bold shadow-xs">Esc</kbd>
            <span>Fechar</span>
          </span>
        </div>
      </div>
    </div>
  );
};
