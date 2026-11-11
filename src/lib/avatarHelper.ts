// src/lib/avatarHelper.ts — Renderizador Universal de Avatar Discente (Foto, Presets e Iniciais)
export interface StudentProfileData {
  name?: string;
  period?: string;
  photoDataUrl?: string;
  avatarPreset?: string;
  prideChoice?: string;
  pronouns?: string;
  semester?: string;
  pathway?: string;
  interests?: string[];
}

export const AVATAR_PRESET_CONFIG: Record<
  string,
  { bg: string; color: string; icon?: string; text?: string }
> = {
  candangos: { bg: '#9E2424', color: '#A85300', icon: 'bi-bank' },
  monogram: { bg: '#1F1F1F', color: '#A85300', text: 'Iniciais' },
  fafich: { bg: '#005A9C', color: '#A85300', icon: 'bi-building' },
  republica: { bg: '#166534', color: '#FFFFFF', icon: 'bi-house-heart-fill' },
  formando: { bg: '#8B1E2D', color: '#A85300', icon: 'bi-mortarboard-fill' },
  pesquisador: { bg: '#1F1F1F', color: '#FFFFFF', icon: 'bi-person-badge-fill' },
  estudante_f: { bg: '#2A6264', color: '#FFFFFF', icon: 'bi-person-standing-dress' },
  estudante_m: { bg: '#5B2E85', color: '#FFFFFF', icon: 'bi-person-fill' },
};

/** O perfil pode vir de um backup colado de outro aparelho: nada dele entra no HTML sem escapar. */
function esc(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

/** Só aceita foto que seja imagem embutida (data:image/...), como a que o Passaporte grava. */
function safePhoto(url?: string): string | null {
  return url && /^data:image\/(png|jpe?g|webp|gif|avif);base64,[A-Za-z0-9+/=]+$/.test(url) ? url : null;
}

/** Lê o perfil salvo direto do aparelho (sem validar esquema), para os slots fora do React. */
export function readStoredProfile(): StudentProfileData | null {
  try {
    const raw = localStorage.getItem('cagp_student_profile_v1');
    return raw ? (JSON.parse(raw) as StudentProfileData) : null;
  } catch {
    return null;
  }
}

/**
 * Gera o markup HTML seguro para renderizar o avatar do estudante em qualquer slot (header, drawer, etc.).
 * A foto entra com alt vazio: o botão que a contém já diz "Abrir Seu perfil".
 */
export function renderAvatarHtml(profile?: StudentProfileData | null, size: 'sm' | 'md' | 'lg' = 'md'): string {
  if (!profile) {
    return `<span class="w-full h-full flex items-center justify-center text-gray-500 bg-background"><i class="bi bi-person-fill text-lg" aria-hidden="true"></i></span>`;
  }

  // 1. Se houver foto carregada (DataURL)
  const photo = safePhoto(profile.photoDataUrl);
  if (photo) {
    return `<img src="${photo}" alt="" decoding="async" class="w-full h-full object-cover" />`;
  }

  const initials = profile.name
    ? profile.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => esc(w[0].toUpperCase()))
        .join('')
    : 'GP';

  // 2. Se houver preset configurado
  const presetKey = profile.avatarPreset && AVATAR_PRESET_CONFIG[profile.avatarPreset] ? profile.avatarPreset : 'candangos';
  const preset = AVATAR_PRESET_CONFIG[presetKey];

  const prideBadge =
    profile.prideChoice && /^[a-z0-9_-]+$/i.test(profile.prideChoice) && profile.prideChoice !== 'none'
      ? `<span class="cagp-pride-pin cagp-pride-swatch--${profile.prideChoice}" aria-hidden="true"></span>`
      : '';

  if (presetKey === 'monogram') {
    return `
      <span class="w-full h-full flex items-center justify-center font-heading font-bold text-xs uppercase" style="background-color: ${preset.bg}; color: ${preset.color};">
        ${initials}
      </span>
      ${prideBadge}
    `;
  }

  if (preset.icon) {
    return `
      <span class="w-full h-full flex items-center justify-center text-sm" style="background-color: ${preset.bg}; color: ${preset.color};">
        <i class="bi ${preset.icon}" aria-hidden="true"></i>
      </span>
      ${prideBadge}
    `;
  }

  return `
    <span class="w-full h-full flex items-center justify-center font-heading font-bold text-xs" style="background-color: ${preset.bg}; color: ${preset.color};">
      ${initials}
    </span>
    ${prideBadge}
  `;
}
