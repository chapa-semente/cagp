import React from 'react';
import { motion } from 'motion/react';
import { getVaultItem, USER_ROLE_META, type UserRole, type VaultData } from '@/lib/storage/studentVault';
import { bounceSpring } from '@/lib/motion';
import { AvatarRenderer } from './AvatarRenderer';
import { asset } from '@/lib/paths';

interface PassportCardProps {
  profile: VaultData<'cagp_student_profile_v1'>;
  obrigCount: number;
  extHours: number;
  /** Momento no curso: a única fonte de "em que fase você está" no site (cagp_user_role_v1). */
  role: UserRole;
  onEditPhoto: () => void;
}

const TALENT_LABELS: Record<string, string> = {
  pol_pub: 'Políticas Públicas',
  orcamento: 'Orçamento & Finanças',
  gestao_pessoas: 'Gestão de Pessoas',
  licitacoes: 'Licitações & Contratos',
  cidades: 'Políticas Urbanas',
  saude: 'Saúde Pública (SUS)',
  educacao: 'Educação Pública',
  govtech: 'GovTech & Dados',
  dados: 'Avaliação & Métricas',
  terceiro_setor: 'Terceiro Setor',
  rel_inst: 'Relações Institucionais',
  clima: 'Meio Ambiente',
};

export const PassportCard: React.FC<PassportCardProps> = ({
  profile,
  obrigCount,
  extHours,
  role,
  onEditPhoto,
}) => {
  const obrigPct = Math.min(100, Math.round((obrigCount / 27) * 100));
  const extPct = Math.min(100, Math.round((extHours / 600) * 100));
  const globalPct = Math.round((obrigPct + extPct) / 2);

  const roleMeta = USER_ROLE_META[role];
  const stampLabel = `${roleMeta.shortLabel.toUpperCase()} • ATIVO`;
  const cred = typeof window !== 'undefined' ? getVaultItem('cagp_election_activation_v1') : null;
  const isSementeEleitor = cred?.completed && cred?.sementeSupporter;
  const initials = profile.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="cagp-passport-card mb-4"
    >
      {/* Topbar Institucional */}
      <div className="cagp-passport-topbar">
        <div className="cagp-passport-inst">
          <i className="bi bi-bank2 text-white" aria-hidden="true" />
          <span>FAFICH / UFMG • GESTÃO PÚBLICA</span>
        </div>
        <span className="cagp-passport-stamp">{stampLabel}</span>
      </div>

      {/* Body com Avatar e Identidade */}
      <div className="p-3.5 sm:p-4 flex flex-wrap items-center gap-3 sm:gap-4">
        {/* Avatar com Trigger de Câmera */}
        <AvatarRenderer
          profile={profile}
          sizeClass="cagp-avatar-frame--lg"
          showCameraBadge
          onClick={onEditPhoto}
          title="Clique para trocar foto ou avatar"
        />

        {/* Dados de Identidade */}
        <div className="flex-1 min-w-[180px]">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="font-head text-lg sm:text-xl font-extrabold text-foreground leading-tight m-0">
              {profile.name}
            </h3>
            {profile.pronouns && (
              <span className="text-xs text-foreground font-mono font-bold">
                ({profile.pronouns})
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-head font-extrabold uppercase bg-primary text-white border border-border shadow-xs">{roleMeta.shortLabel} · {roleMeta.badge}</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold bg-foreground text-background text-white border border-border shadow-xs">Ingresso {profile.semester || '2026/1'}</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-head font-bold uppercase bg-primary text-white border border-border shadow-xs">{profile.pathway || '01-01'} • Geral</span>
            {isSementeEleitor && (
              <span className="cagp-stamp-badge is-semente text-xs py-0.5 px-2 flex items-center gap-1">
                <img
                  src={asset('/logos/semente/semente-simbolo-branco.webp')}
                  alt=""
                  aria-hidden="true"
                  className="w-3.5 h-3.5 object-contain"
                />
                <span>Eleitor Semente 2026</span>
              </span>
            )}
          </div>
        </div>

        {/* Anel Métrico de Integralização */}
        <div
          className="cagp-metric-ring shrink-0"
          style={{ '--ring-pct': globalPct } as React.CSSProperties}
          title="Índice Médio de Integralização"
        >
          <div className="cagp-metric-ring-inner font-mono font-bold">{globalPct}%</div>
        </div>
      </div>

      {/* Áreas de Interesse no Passaporte (Banco de Talentos) */}
      {profile.interests && profile.interests.length > 0 && (
        <div className="px-4 py-2.5 bg-white border-t-2 border-border flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-head uppercase font-extrabold text-foreground mr-1">
            Interesses:
          </span>
          {profile.interests.map((key) => (
            <span
              key={key}
              className="text-xs font-head font-bold uppercase bg-white border border-border text-foreground px-2 py-0.5 rounded shadow-[1px_1px_0px_#1F1F1F]"
            >
              {TALENT_LABELS[key] || key}
            </span>
          ))}
        </div>
      )}

      {/* Dupla Barra de Progresso (27 Obrigatórias + 600h AAC) */}
      <div className="cagp-passport-progress-grid">
        <div>
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-head font-extrabold uppercase text-xs text-foreground">
              27 Obrigatórias
            </span>
            <span className="font-mono font-bold text-xs text-info">
              {obrigCount}/27 ({obrigPct}%)
            </span>
          </div>
          <div className="cagp-passport-mini-track">
            <div
              className="cagp-passport-mini-fill is-obrig"
              style={{ width: `${obrigPct}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-head font-extrabold uppercase text-xs text-foreground">
              600h Extensão & AAC
            </span>
            <span className="font-mono font-bold text-xs text-success">
              {extHours}h/600h ({extPct}%)
            </span>
          </div>
          <div className="cagp-passport-mini-track">
            <div
              className="cagp-passport-mini-fill is-acg"
              style={{ width: `${extPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Carimbos de Conquistas Desbloqueadas (cagp-stamp) */}
      <div className="px-4 py-2.5 bg-background border-t-2 border-border flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono uppercase font-bold text-foreground mr-1">
          Carimbos Oficiais:
        </span>
        <motion.span
          initial={{ scale: 1.35, rotate: -8, opacity: 0 }}
          animate={{ scale: 1, rotate: -2, opacity: 1 }}
          transition={bounceSpring}
          className="px-2 py-0.5 rounded bg-primary text-white font-mono text-xs font-bold uppercase border-2 border-border shadow-sm"
        >
          {isSementeEleitor ? 'Eleitor Semente 2026' : 'Passaporte Semente Ativo'}
        </motion.span>
        {obrigCount > 0 && (
          <motion.span
            initial={{ scale: 1.35, rotate: 6, opacity: 0 }}
            animate={{ scale: 1, rotate: 1.5, opacity: 1 }}
            transition={bounceSpring}
            className="px-2 py-0.5 rounded bg-secondary text-white font-mono text-xs font-bold uppercase border-2 border-border shadow-sm"
          >
            {obrigCount} Disciplinas Registradas
          </motion.span>
        )}
        {extHours > 0 && (
          <motion.span
            initial={{ scale: 1.35, rotate: -5, opacity: 0 }}
            animate={{ scale: 1, rotate: -1, opacity: 1 }}
            transition={bounceSpring}
            className="px-2 py-0.5 rounded bg-accent text-foreground font-mono text-xs font-bold uppercase border-2 border-border shadow-sm"
          >
            {extHours}h ACG/Extensão
          </motion.span>
        )}
      </div>

      {/* Ações Rápidas */}
      <div className="p-2.5 sm:p-3 bg-white border-t-2 border-border flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onEditPhoto}
          className="min-h-[44px] cagp-btn-secondary text-xs py-1.5 px-3 flex-1 justify-center cursor-pointer active:translate-x-[3px] active:translate-y-[3px]"
        >
          <i className="bi bi-camera-fill" aria-hidden="true" />
          <span>Trocar foto</span>
        </button>
      </div>
    </motion.div>
  );
};
