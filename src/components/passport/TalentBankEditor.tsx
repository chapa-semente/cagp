import React, { useRef } from 'react';
import type { VaultData } from '../../lib/storage/studentVault';
import { TALENT_CATEGORIES, PRIDE_OPTIONS, AVATAR_PRESETS } from './talentConstants';

interface TalentBankEditorProps {
  profile: VaultData<'cagp_student_profile_v1'>;
  onChange: (updated: VaultData<'cagp_student_profile_v1'>) => void;
  onSave: () => void;
}

export const TalentBankEditor: React.FC<TalentBankEditorProps> = ({
  profile,
  onChange,
  onSave,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const minDim = Math.min(img.width, img.height);
          const sx = (img.width - minDim) / 2;
          const sy = (img.height - minDim) / 2;
          ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, 256, 256);
          const croppedDataUrl = canvas.toDataURL('image/webp', 0.85);
          onChange({ ...profile, photoDataUrl: croppedDataUrl });
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const toggleInterest = (key: string) => {
    const current = profile.interests || [];
    const exists = current.includes(key);
    const updated = exists ? current.filter((k) => k !== key) : [...current, key];
    onChange({ ...profile, interests: updated });
  };

  return (
    <div className="space-y-4 font-body">
      {/* Upload de Foto & Presets */}
      <div className="bg-white border-2 border-[#0A0A0A] p-4 rounded-xl shadow-[3px_3px_0_0_#0A0A0A] space-y-3">
        <span className="font-head font-extrabold text-xs uppercase text-[#0A0A0A] block">
          1. Foto de Perfil &amp; Avatar (256x256)
        </span>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
          aria-label="Upload de foto de perfil"
        />

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="min-h-[44px] px-3.5 py-2 bg-[#8B1E2D] hover:bg-[#9E2424] text-white font-head font-bold uppercase text-xs rounded-xl border-2 border-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <i className="bi bi-camera-fill" aria-hidden="true" />
            <span>Tirar / Subir Foto</span>
          </button>
          {profile.photoDataUrl && (
            <button
              type="button"
              onClick={() => onChange({ ...profile, photoDataUrl: undefined })}
              className="min-h-[44px] px-3.5 py-2 bg-white hover:bg-[#FFEBEE] text-[#DC2626] font-head font-bold uppercase text-xs rounded-xl border-2 border-[#DC2626] shadow-[2px_2px_0_0_#DC2626] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <i className="bi bi-trash" aria-hidden="true" />
              <span>Remover Foto</span>
            </button>
          )}
        </div>

        <div>
          <span className="text-[11px] font-head uppercase font-bold text-[#0A0A0A] block mb-1.5">
            Ou escolha um avatar temático discente:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {AVATAR_PRESETS.map((p) => {
              const isSelected = profile.avatarPreset === p.id && !profile.photoDataUrl;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onChange({ ...profile, avatarPreset: p.id, photoDataUrl: undefined })}
                  className={`p-2 rounded-xl border-2 text-left flex items-center gap-2 transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'border-[#0A0A0A] bg-white shadow-[3px_3px_0px_#0A0A0A] -translate-x-[1px] -translate-y-[1px]'
                      : 'border-[#0A0A0A] bg-[#FBF8F3] hover:bg-white'
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-lg border-2 border-[#0A0A0A] flex items-center justify-center shrink-0 text-xs font-head font-extrabold shadow-[1px_1px_0_0_#0A0A0A]"
                    style={{ backgroundColor: p.bg, color: p.color }}
                  >
                    {p.icon ? (
                      <i className={`bi ${p.icon}`} aria-hidden="true" />
                    ) : (
                      <span>{p.text?.slice(0, 2) || 'GP'}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="font-head text-xs font-bold uppercase text-[#0A0A0A] block truncate">
                      {p.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Identificação Acadêmica */}
      <div className="bg-white border-2 border-[#0A0A0A] p-4 rounded-xl shadow-[3px_3px_0_0_#0A0A0A] space-y-3">
        <span className="font-head font-extrabold text-xs uppercase text-[#0A0A0A] block">
          2. Dados do Estudante
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1" htmlFor="prof-name">Nome Completo ou Social</label>
            <input
              id="prof-name"
              type="text"
              value={profile.name}
              onChange={(e) => onChange({ ...profile, name: e.target.value })}
              className="w-full bg-[#F7F5F0] border border-[#DFDBD2] p-2 rounded text-base sm:text-xs text-[#0A0A0A] focus:border-[#8B1E2D] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1" htmlFor="prof-pronouns">Pronomes (opcional)</label>
            <input
              id="prof-pronouns"
              type="text"
              placeholder="Ex: ela/dela, ele/dele"
              value={profile.pronouns || ''}
              onChange={(e) => onChange({ ...profile, pronouns: e.target.value })}
              className="w-full bg-[#F7F5F0] border border-[#DFDBD2] p-2 rounded text-base sm:text-xs text-[#0A0A0A] focus:border-[#8B1E2D] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1" htmlFor="prof-period">Período Atual</label>
            <select
              id="prof-period"
              value={profile.period}
              onChange={(e) => onChange({ ...profile, period: e.target.value })}
              className="w-full bg-[#F7F5F0] border border-[#DFDBD2] p-2 rounded text-base sm:text-xs text-[#0A0A0A] focus:border-[#8B1E2D] focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((p) => (
                <option key={p} value={`${p}º Período`}>{p}º Período</option>
              ))}
              <option value="Egresso">Egresso</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1" htmlFor="prof-pathway">Percurso Formativo</label>
            <select
              id="prof-pathway"
              value={profile.pathway || '01-01'}
              onChange={(e) => onChange({ ...profile, pathway: e.target.value })}
              className="w-full bg-[#F7F5F0] border border-[#DFDBD2] p-2 rounded text-base sm:text-xs text-[#0A0A0A] focus:border-[#8B1E2D] focus:outline-none"
            >
              <option value="01-01">01-01 • Bacharelado Geral</option>
              <option value="01-02">01-02 • Complementar (FCA / 5ºP)</option>
              <option value="01-03">01-03 • Avançado PPGCP (7ºP)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Marcador de Orgulho */}
      <div className="bg-white border-2 border-[#0A0A0A] p-4 rounded-xl shadow-[3px_3px_0_0_#0A0A0A] space-y-2.5">
        <span className="font-head font-extrabold text-xs uppercase text-[#0A0A0A] block">
          3. Marcador / Pin de Diversidade (Opcional)
        </span>
        <div className="flex flex-wrap gap-2">
          {PRIDE_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => onChange({ ...profile, prideChoice: opt.key })}
              className={`px-3 py-1.5 rounded-xl border-2 border-[#0A0A0A] text-xs font-head font-bold uppercase flex items-center gap-2 cursor-pointer transition-all ${
                profile.prideChoice === opt.key
                  ? 'bg-[#0A0A0A] text-white shadow-[2px_2px_0_0_#0A0A0A]'
                  : 'bg-[#FBF8F3] hover:bg-white text-[#0A0A0A] shadow-[1px_1px_0_0_#0A0A0A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
              }`}
            >
              <span className={`cagp-pride-swatch cagp-pride-swatch--${opt.key}`} />
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Áreas de Interesse (Banco de Talentos) */}
      <div className="bg-white border-2 border-[#0A0A0A] p-4 rounded-xl shadow-[3px_3px_0_0_#0A0A0A] space-y-2.5">
        <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-2">
          <span className="font-head font-extrabold text-xs uppercase text-[#0A0A0A]">
            4. Áreas de Atuação &amp; Banco de Talentos
          </span>
          <span className="text-[11px] font-mono font-bold text-[#0A0A0A]">
            {(profile.interests || []).length} selecionadas
          </span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {TALENT_CATEGORIES.map((cat) => {
            const isSelected = (profile.interests || []).includes(cat.key);
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => toggleInterest(cat.key)}
                aria-pressed={isSelected}
                className={`px-3 py-1.5 rounded-xl border-2 border-[#0A0A0A] text-xs font-head font-bold uppercase cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#8B1E2D] text-white shadow-[2px_2px_0_0_#0A0A0A]'
                    : 'bg-[#FBF8F3] hover:bg-white text-[#0A0A0A] shadow-[1px_1px_0_0_#0A0A0A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Salvar Perfil */}
      <button
        type="button"
        onClick={onSave}
        className="min-h-[44px] w-full py-2.5 px-4 bg-[#8B1E2D] hover:bg-[#9E2424] text-white font-head font-extrabold uppercase tracking-wider text-xs rounded-xl border-2 border-[#0A0A0A] shadow-[3px_3px_0_0_#0A0A0A] hover:shadow-[4px_4px_0_0_#0A0A0A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer inline-flex items-center justify-center gap-2"
      >
        <i className="bi bi-check2-circle text-base" aria-hidden="true" />
        <span>Salvar no Cofre Discente</span>
      </button>
    </div>
  );
};
