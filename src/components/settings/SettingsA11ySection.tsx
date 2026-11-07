import React from 'react';
import type { VaultData } from '../../lib/storage/studentVault';

interface Props {
  a11y: VaultData<'cagp_a11y_prefs_v2'>;
  updateA11y: (partial: Partial<VaultData<'cagp_a11y_prefs_v2'>>) => void;
}

export const SettingsA11ySection: React.FC<Props> = ({ a11y, updateA11y }) => {
  return (
    <section className="bg-white border-[3px] border-[#0A0A0A] rounded-xl p-5 sm:p-6 shadow-[4px_4px_0_0_#0A0A0A] space-y-4 font-body">
      <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#8B1E2D] text-white border-2 border-[#0A0A0A] flex items-center justify-center shadow-[2px_2px_0_0_#0A0A0A]">
            <i className="bi bi-universal-access text-base" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-head text-base sm:text-lg font-extrabold uppercase text-[#0A0A0A] m-0 tracking-tight">
              1. Acessibilidade &amp; Aparência Universal
            </h2>
            <p className="text-xs text-[#0A0A0A] m-0 font-medium">Ajustes instantâneos de tema, legibilidade e conforto visual</p>
          </div>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A]">
          WCAG AAA
        </span>
      </div>

      <div className="divide-y-2 divide-[#0A0A0A]">
        {/* Tamanho da Fonte */}
        <div className="py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <strong className="block text-xs font-head font-extrabold uppercase text-[#0A0A0A]">Tamanho da Tipografia</strong>
            <span className="text-xs text-[#0A0A0A] font-medium">Escala responsiva do texto do aplicativo (90% a 130%)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border-2 border-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A]">
            {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => updateA11y({ font: s })}
                className={`min-w-[40px] min-h-[40px] px-3 py-1.5 text-xs font-head font-extrabold uppercase rounded-lg cursor-pointer transition-all flex items-center justify-center ${
                  a11y.font === s
                    ? 'bg-[#8B1E2D] text-white border-2 border-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A]'
                    : 'text-[#0A0A0A] hover:bg-white border-2 border-transparent hover:border-[#0A0A0A]'
                }`}
              >
                {s === 'sm' ? 'A-' : s === 'md' ? 'A' : s === 'lg' ? 'A+' : 'A++'}
              </button>
            ))}
          </div>
        </div>

        {/* Dislexia */}
        <div className="py-3.5 flex items-center justify-between gap-3">
          <div>
            <strong className="block text-xs font-head font-extrabold uppercase text-[#0A0A0A]">Fonte para Dislexia (OpenDyslexic)</strong>
            <span className="text-xs text-[#0A0A0A] font-medium">Aplica a tipografia especializada OpenDyslexic com gravidade na base</span>
          </div>
          <label className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer">
            <input
              type="checkbox"
              id="a11y-dyslexia"
              name="a11y-dyslexia"
              checked={a11y.dyslexia}
              onChange={(e) => updateA11y({ dyslexia: e.target.checked })}
              className="w-5 h-5 accent-[#8B1E2D] cursor-pointer rounded border-2 border-[#0A0A0A]"
            />
          </label>
        </div>

        {/* Alto Contraste AAA */}
        <div className="py-3.5 flex items-center justify-between gap-3">
          <div>
            <strong className="block text-xs font-head font-extrabold uppercase text-[#0A0A0A]">Alto Contraste AAA (Preto &amp; Amarelo)</strong>
            <span className="text-xs text-[#0A0A0A] font-medium">Fundo nanquim (#000000) e textos amarelos de alto contraste</span>
          </div>
          <label className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer">
            <input
              type="checkbox"
              id="a11y-contrast"
              name="a11y-contrast"
              checked={a11y.contrast === 'high'}
              onChange={(e) => updateA11y({ contrast: e.target.checked ? 'high' : 'normal' })}
              className="w-5 h-5 accent-[#8B1E2D] cursor-pointer rounded border-2 border-[#0A0A0A]"
            />
          </label>
        </div>

        {/* Dock Flutuante Desktop */}
        <div className="py-3.5 flex items-center justify-between gap-3">
          <div>
            <strong className="block text-xs font-head font-extrabold uppercase text-[#0A0A0A]">Dock Flutuante (Desktop)</strong>
            <span className="text-xs text-[#0A0A0A] font-medium">Barra de atalhos inferior inspirada no macOS para telas grandes</span>
          </div>
          <label className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer">
            <input
              type="checkbox"
              id="a11y-dock"
              name="a11y-dock"
              checked={!!a11y.showDesktopDock}
              onChange={(e) => updateA11y({ showDesktopDock: e.target.checked })}
              className="w-5 h-5 accent-[#8B1E2D] cursor-pointer rounded border-2 border-[#0A0A0A]"
            />
          </label>
        </div>
      </div>
    </section>
  );
};
