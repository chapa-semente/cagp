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
      <div className="bg-background p-3 rounded-lg border border-muted">
        <span className="block font-['Oswald'] font-bold text-xs uppercase mb-2">Contraste Visual</span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => update({ contrast: 'normal' })}
            className={`py-2 px-3 text-xs font-['Oswald'] uppercase font-bold rounded border cursor-pointer min-h-[44px] ${
              prefs.contrast === 'normal'
                ? 'bg-foreground text-background text-white border-border'
                : 'bg-white border-muted'
            }`}
          >
            Padrão Institucional
          </button>
          <button
            type="button"
            onClick={() => update({ contrast: 'high' })}
            className={`py-2 px-3 text-xs font-['Oswald'] uppercase font-bold rounded border cursor-pointer min-h-[44px] ${
              prefs.contrast === 'high'
                ? 'bg-foreground text-background text-yellow-300 border-yellow-300'
                : 'bg-black text-yellow-300 border-black'
            }`}
          >
            Alto Contraste AAA
          </button>
        </div>
      </div>

      {/* Tamanho da Tipografia (Stepper) */}
      <div className="bg-background p-3 rounded-lg border border-muted">
        <div className="flex items-center justify-between mb-2">
          <span className="font-['Oswald'] font-bold text-xs uppercase">Tamanho do Texto</span>
          <span className="text-[10px] font-mono text-gray-500">
            {prefs.font === 'sm' ? '90%' : prefs.font === 'md' ? '100% (Padrão)' : prefs.font === 'lg' ? '115%' : '130%'}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => update({ font: size })}
              className={`py-2 text-xs font-['Oswald'] uppercase font-bold rounded border cursor-pointer min-h-[44px] ${
                prefs.font === size
                  ? 'bg-secondary text-white border-border'
                  : 'bg-white text-gray-700 border-muted hover:border-border'
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
        className={`w-full p-3 text-xs font-['Oswald'] uppercase font-bold rounded-lg border text-left cursor-pointer transition-colors min-h-[48px] flex items-center justify-between ${
          prefs.dyslexia ? 'bg-secondary text-white border-border' : 'bg-background border-muted'
        }`}
      >
        <div>
          <span className="block text-xs font-bold uppercase">Fonte para Dislexia (OpenDyslexic)</span>
          <span className="text-[11px] font-normal opacity-85 block mt-0.5">Tipografia especializada com gravidade na base</span>
        </div>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded border ${
            prefs.dyslexia
              ? 'bg-white/20 text-white border-white/30'
              : 'bg-white text-gray-700 border-gray-300'
          }`}
        >
          {prefs.dyslexia ? 'Ativa' : 'Desativada'}
        </span>
      </button>

      {/* Dock Flutuante Desktop */}
      <div className="bg-background p-3 rounded-lg border border-muted flex items-center justify-between gap-3">
        <div>
          <span className="block font-['Oswald'] font-bold text-xs uppercase text-foreground">Dock Flutuante (Desktop)</span>
          <span className="text-[11px] text-gray-500">Barra de navegação inferior estilo macOS em telas grandes</span>
        </div>
        <label htmlFor="a11y-tab-dock-toggle" className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer">
          <input
            id="a11y-tab-dock-toggle"
            name="a11yShowDesktopDock"
            type="checkbox"
            checked={!!prefs.showDesktopDock}
            onChange={(e) => update({ showDesktopDock: e.target.checked })}
            className="w-5 h-5 accent-[#8B1E2D] cursor-pointer"
            aria-label="Ativar dock flutuante no desktop"
          />
        </label>
      </div>

      {/* Shader Dinâmico de Fundo (BoldKit Canvas 60fps) */}
      <div className="bg-background p-3 rounded-lg border border-muted space-y-2">
        <div className="flex items-center justify-between">
          <span className="block font-['Oswald'] font-bold text-xs uppercase text-foreground">
            Shader Dinâmico de Fundo (BoldKit 60fps)
          </span>
          <span className="text-[10px] font-mono text-gray-500">23 Efeitos</span>
        </div>
        <select
          value={prefs.shader || 'auto'}
          onChange={(e) => {
            update({ shader: e.target.value });
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('cagp:vault-updated'));
            }
          }}
          className="w-full min-h-[44px] px-3 py-2 text-xs font-mono font-bold bg-white text-foreground border-3 border-border rounded-lg shadow-xs cursor-pointer focus:outline-hidden"
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
      <div className="p-2.5 rounded-lg border border-muted bg-background text-[11px] text-gray-600 space-y-1">
        <span className="font-['Oswald'] font-bold text-xs uppercase text-foreground block">
          <i className="bi bi-keyboard me-1"></i> Atalhos de Acessibilidade
        </span>
        <div className="flex flex-wrap gap-3">
          <span><kbd className="px-1.5 py-0.5 bg-white border border-muted rounded text-[10px] font-mono">Alt + A</kbd> Abrir / Fechar</span>
          <span><kbd className="px-1.5 py-0.5 bg-white border border-muted rounded text-[10px] font-mono">Esc</kbd> Fechar Painel</span>
        </div>
      </div>
    </div>
  );
};
