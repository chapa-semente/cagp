import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CHAPA_LEADERS, getLeaderPhotoUrl } from '@/lib/chapaSementeData';
import { asset } from '@/lib/paths';
import { photoCardTap, photoZoomSpring } from '@/lib/motion';

/** Hover contido: sem rotação nem escala que invadam o conteúdo abaixo do retrato. */
const portraitHover = { y: -2, transition: photoZoomSpring };

interface LeaderAvatarProps {
  name: string;
  photoFilename?: string;
  /** object-position do retrato, para manter o rosto no recorte. */
  photoPosition?: string;
  initials: string;
  deptColor: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circle' | 'portrait';
  role?: string;
  tagline?: string;
  index?: number;
  /** Total exibido no contador (padrão: tamanho real da nominata). */
  total?: number;
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-11 h-11 sm:w-12 sm:h-12 text-xs sm:text-sm',
  lg: 'w-16 h-16 text-base',
  xl: 'w-24 h-24 text-xl',
};

export const LeaderAvatar: React.FC<LeaderAvatarProps> = ({
  name,
  photoFilename,
  photoPosition = 'center 30%',
  initials,
  deptColor,
  size = 'md',
  variant = 'circle',
  role,
  tagline,
  index,
  total = CHAPA_LEADERS.length,
  className = '',
}) => {
  const counter =
    typeof index === 'number'
      ? `${String(index + 1).padStart(2, '0')}/${String(total).padStart(2, '0')}`
      : null;
  const [hasError, setHasError] = useState(false);
  const photoUrl = getLeaderPhotoUrl(photoFilename, variant === 'portrait' ? 'full' : 'thumb');

  if (variant === 'portrait') {
    const hasRealPhoto = Boolean(photoUrl && !hasError);

    return (
      <motion.div
        whileHover={portraitHover}
        whileTap={photoCardTap}
        transition={photoZoomSpring}
        className={`group relative w-full aspect-[4/3] md:aspect-square rounded-xl overflow-hidden border-3 border-border shadow-md bg-card select-none ${className}`}
      >
        {hasRealPhoto ? (
          <>
            <img
              src={photoUrl!}
              alt={`Retrato oficial de ${name} — ${role || 'Liderança da Chapa 2 · Semente'}`}
              onError={() => setHasError(true)}
              style={{ objectPosition: photoPosition }}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
                      </>
        ) : (
          /* Pôster Ilustrado Neobrutalista aspect-[4/5] para lideranças sem foto em arquivo */
          <div
            className={`relative w-full h-full flex flex-col items-center justify-between p-5 ${deptColor}`}
          >
            {/* Selo Superior Esquerdo + Sticker do Cargo */}
            <div className="w-full flex items-center justify-between gap-2 z-10">
              <span className="px-2.5 py-1 rounded-lg bg-accent text-foreground border-2 border-border shadow-xs font-heading text-xs font-black uppercase tracking-wider -rotate-2">
                {role || 'CHAPA 2 · SEMENTE'}
              </span>
              {counter && (
                <span className="px-2 py-0.5 rounded-md bg-white text-foreground border-2 border-border shadow-xs font-mono text-xs font-black tabular-nums">
                  {counter}
                </span>
              )}
            </div>

            {/* Centro: Ilustração Vetorial Semente + Iniciais Gigantes em Poppins Bold */}
            <div className="relative my-auto flex flex-col items-center justify-center z-10">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white border-2 border-border shadow-md flex items-center justify-center p-3">
                <img
                  src={asset('/logos/semente/semente-simbolo.webp')}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-contain opacity-20 absolute inset-0 p-2"
                />
                <span className="relative z-10 font-heading text-4xl sm:text-5xl font-black tracking-tighter text-primary drop-shadow-[2px_2px_0_var(--color-accent)]">
                  {initials}
                </span>
              </div>
              <span className="mt-3 px-3 py-0.5 rounded-full bg-foreground text-accent border-2 border-white font-mono text-xs font-bold uppercase tracking-widest shadow-xs">
                REPRESENTAÇÃO DISCENTE
              </span>
            </div>

            {/* Rodapé do Pôster */}
            <div className="w-full z-10 pt-8" />
          </div>
        )}

        {/* Contador da nominata (o cargo aparece logo abaixo do retrato, fora da foto) */}
        {hasRealPhoto && counter && (
          <span className="absolute top-2.5 right-2.5 z-20 pointer-events-none px-2 py-0.5 rounded-md bg-white text-foreground border-2 border-border shadow-xs font-mono text-xs font-black tabular-nums">
            {counter}
          </span>
        )}

      </motion.div>
    );
  }

  const sizeClasses = SIZE_MAP[size] || SIZE_MAP.md;

  if (photoUrl && !hasError) {
    return (
      <img
        src={photoUrl}
        alt={`Foto de ${name}`}
        onError={() => setHasError(true)}
        className={`${sizeClasses} rounded-full object-cover border-3 border-border shadow-xs shrink-0 bg-muted select-none ${className}`}
        loading="lazy"
        decoding="async"
      />
    );
  }

  // Fallback tátil Neobrutalista circular
  return (
    <div
      className={`${sizeClasses} rounded-full flex items-center justify-center font-heading font-black tracking-tight border-3 border-border shadow-xs shrink-0 select-none ${deptColor} ${className}`}
      title={name}
      aria-label={`Avatar de ${name}`}
    >
      {initials}
    </div>
  );
};
