// src/components/features/carreira/CarreiraTalentosPreview.tsx — Preview do Banco de Talentos para o Hub de Carreira
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { getVaultItem } from '@/lib/storage/studentVault';
import {
  STATUS_LABELS,
  generateTalentosSummary,
  type TalentosProfile,
} from '@/lib/carreiraData';
import { route } from '@/lib/paths';
import { tactileSpring } from '@/lib/motion';
import { toast } from '@/lib/toast';

export const CarreiraTalentosPreview: React.FC = () => {
  const [profile, setProfile] = useState<TalentosProfile | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const data = getVaultItem('cagp_carreira_talentos_v1');
    setProfile(data);
  }, []);

  const copySummary = () => {
    if (!profile) return;
    const text = generateTalentosSummary(profile);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success('Resumo profissional copiado para a área de transferência!');
    }
  };

  const hasData =
    profile &&
    (profile.skills.length > 0 ||
      profile.interestAreas.length > 0 ||
      Boolean(profile.lattesUrl) ||
      Boolean(profile.linkedinUrl));

  return (
    <section
      id="cagp-carreira-talentos-preview"
      aria-labelledby="heading-talentos-preview"
      className="p-5 sm:p-6 rounded-xl border-2 border-border bg-white shadow-md space-y-4 font-sans select-none"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-border pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-primary border border-border shrink-0" aria-hidden="true" />
            <span className="font-mono text-xs font-bold text-primary uppercase">
              Só neste celular
            </span>
          </div>
          <h2
            id="heading-talentos-preview"
            className="font-heading text-base sm:text-lg font-black text-foreground m-0"
          >
            Meu Perfil de Competências &amp; Cartão Discente
          </h2>
          <p className="text-xs text-muted-foreground m-0 mt-0.5 font-medium">
            Mapeamento de competências para exportação em processos seletivos e estágios.
          </p>
        </div>

        <a
          href={route('/carreira/talentos')}
          className="min-h-[44px] px-4 py-2 rounded-xl border-2 border-border bg-primary hover:bg-primary-hover text-white font-heading text-xs font-black uppercase no-underline inline-flex items-center justify-center gap-1.5 shrink-0 shadow-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
        >
          <span>{hasData ? 'Editar Perfil Completo' : 'Cadastrar Meu Perfil'}</span>
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        <div className="md:col-span-8 space-y-3">
          <p className="text-xs sm:text-sm text-content-secondary leading-relaxed m-0 font-medium">
            Seus dados ficam <strong>salvos só neste celular</strong> (sem envio a servidores terceiros). Você pode catalogar competências técnicas como <em>SEI!</em>, <em>Lei 14.133</em>, <em>MROSC</em>, vincular seu Lattes/LinkedIn e exportar seu resumo profissional com 1 clique.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono font-bold">
            <span className="px-2.5 py-1 rounded-md bg-background border border-border text-foreground">
              Status: {profile ? STATUS_LABELS[profile.stageStatus] : 'Buscando Estágio'}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-background border border-border text-foreground tabular-nums">
              Disponibilidade: {profile?.weeklyHoursAvailable ?? 30}h/sem
            </span>
            <span className="px-2.5 py-1 rounded-md bg-success-tint border border-petroleo-deep/40 text-petroleo-deep tabular-nums">
              Competências: {profile?.skills.length ?? 0}
            </span>
          </div>
        </div>

        <div className="md:col-span-4 p-4 rounded-xl border-2 border-border bg-background space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <span className="font-mono text-xs font-black uppercase text-primary">
              Cartão Colecionável
            </span>
            <i className="bi bi-stars text-primary text-sm" aria-hidden="true" />
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-mono">Áreas Foco:</span>
              <strong className="font-mono text-foreground tabular-nums">
                {profile?.interestAreas.length ?? 0} selecionadas
              </strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-mono">Empresa Jr:</span>
              <strong className="font-mono text-petroleo-deep">
                {profile?.interestedInEmpresaJunior ? 'Membro Apoiador' : 'Não inscrito'}
              </strong>
            </div>
          </div>

          {hasData && (
            <button
              type="button"
              onClick={copySummary}
              className="min-h-[44px] w-full px-3 py-2 rounded-xl border-2 border-border bg-accent hover:bg-accent-hover text-foreground font-heading text-xs font-black uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 transition-all"
            >
              <i className="bi bi-clipboard-check-fill" aria-hidden="true" />
              <span>Copiar Resumo</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
