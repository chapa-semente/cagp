import React, { useState } from 'react';
import { motion } from 'motion/react';
import { getLeaderPhotoUrl } from '@/lib/chapaSementeData';
import { asset } from '@/lib/paths';
import { photoCardHover, photoCardTap, photoZoomSpring } from '@/lib/motion';

interface LeaderAvatarProps {
  name: string;
  photoFilename?: string;
  initials: string;
  deptColor: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circle' | 'portrait';
  role?: string;
  tagline?: string;
  index?: number;
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
  initials,
  deptColor,
  size = 'md',
  variant = 'circle',
  role,
  tagline,
  index,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);
  const photoUrl = getLeaderPhotoUrl(photoFilename);

  if (variant === 'portrait') {
    const hasRealPhoto = Boolean(photoUrl && !hasError);

    return (
      <motion.div
        whileHover={photoCardHover}
        whileTap={photoCardTap}
        transition={photoZoomSpring}
        style={{ border: '3px solid #1F1F1F', boxShadow: '8px 8px 0px #1F1F1F' }}
        className={`group relative w-full aspect-[4/5] min-h-[320px] rounded-xl overflow-hidden border-3 border-[#1F1F1F] shadow-[8px_8px_0_0_#1F1F1F] bg-card select-none ${className}`}
      >
        {hasRealPhoto ? (
          <>
            <img
              src={photoUrl!}
              alt={`Retrato oficial de ${name} — ${role || 'Liderança Chapa Semente'}`}
              onError={() => setHasError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              loading="lazy"
            />
            {/* Vinheta editorial sutil na base para contraste de badges */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1F1F1F]/90 via-[#1F1F1F]/40 to-transparent"
              aria-hidden="true"
            />
          </>
        ) : (
          /* Pôster Ilustrado Neobrutalista aspect-[4/5] para lideranças sem foto em arquivo */
          <div
            className={`relative w-full h-full flex flex-col items-center justify-between p-5 ${deptColor}`}
            style={{
              backgroundImage:
                'radial-gradient(rgba(22, 24, 29, 0.22) 1.5px, transparent 1.5px)',
              backgroundSize: '14px 14px',
            }}
          >
            {/* Selo Superior Esquerdo + Sticker do Cargo */}
            <div className="w-full flex items-center justify-between gap-2 z-10">
              <span className="px-2.5 py-1 rounded-lg bg-accent text-foreground border-2 border-border shadow-xs font-heading text-xs font-black uppercase tracking-wider -rotate-2">
                {role || 'CHAPA SEMENTE 2026'}
              </span>
              {typeof index === 'number' && (
                <span className="px-2 py-0.5 rounded-md bg-white text-foreground border-2 border-border shadow-xs font-mono text-xs font-black tabular-nums">
                  {String(index + 1).padStart(2, '0')}/10
                </span>
              )}
            </div>

            {/* Centro: Ilustração Vetorial Semente + Iniciais Gigantes em Poppins Bold */}
            <div className="relative my-auto flex flex-col items-center justify-center z-10">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white border-2 border-border shadow-md flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-110">
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

        {/* Badges Flutuantes no Topo (quando há foto real) */}
        {hasRealPhoto && (
          <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-20 pointer-events-none">
            <span className="px-2.5 py-1 rounded-lg bg-accent text-foreground border-2 border-border shadow-xs font-heading text-xs font-black uppercase tracking-wider -rotate-1">
              {role || 'Chapa Semente'}
            </span>
            {typeof index === 'number' && (
              <span className="px-2 py-0.5 rounded-md bg-white text-foreground border-2 border-border shadow-xs font-mono text-xs font-black tabular-nums">
                {String(index + 1).padStart(2, '0')}/10
              </span>
            )}
          </div>
        )}

        {/* Sticker de Identidade na Base da Moldura */}
        <div className="absolute bottom-3 inset-x-3 z-20 flex items-end justify-between gap-2 pointer-events-none">
          <div className="bg-white/95 text-foreground border-2 border-border rounded-xl px-3 py-1.5 shadow-sm min-w-0 flex-1">
            <span className="font-heading text-sm sm:text-base font-black uppercase tracking-tight block truncate leading-tight">
              {name}
            </span>
            {tagline && (
              <span className="font-mono text-xs font-bold text-primary block truncate">
                {tagline}
              </span>
            )}
          </div>
        </div>
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
