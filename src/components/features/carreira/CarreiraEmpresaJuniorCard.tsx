// src/components/features/carreira/CarreiraEmpresaJuniorCard.tsx — Card de Mobilização da Empresa Júnior (Proposta 11)
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { getVaultItem, setVaultItem } from '@/lib/storage/studentVault';
import { tactileSpring } from '@/lib/motion';
import { toast } from 'sonner';

export const CarreiraEmpresaJuniorCard: React.FC = () => {
  const [interested, setInterested] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const profile = getVaultItem('cagp_carreira_talentos_v1');
    setInterested(Boolean(profile.interestedInEmpresaJunior));
  }, []);

  const toggleInterest = () => {
    const current = getVaultItem('cagp_carreira_talentos_v1');
    const updated = !interested;
    setInterested(updated);
    setVaultItem('cagp_carreira_talentos_v1', {
      ...current,
      interestedInEmpresaJunior: updated,
      updatedAt: new Date().toISOString(),
    });

    if (updated) {
      toast.success('Inscrição confirmada! Você foi adicionado ao Grupo de Trabalho da Empresa Júnior.');
    } else {
      toast.info('Inscrição no GT da Empresa Júnior removida.');
    }
  };

  return (
    <section
      id="cagp-carreira-ej-card"
      aria-labelledby="heading-empresa-junior"
      className="p-5 sm:p-6 rounded-xl border-2 border-border bg-[#F0FDF4] shadow-[3px_3px_0_0_#1F1F1F] flex flex-col sm:flex-row sm:items-center justify-between gap-5 font-sans select-none"
    >
      <div className="space-y-1.5 max-w-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#134E4A] border border-border shrink-0" aria-hidden="true" />
          <span className="font-mono text-xs font-black uppercase text-[#134E4A]">
            Proposta 11 em Mobilização • Empresa Júnior de Gestão Pública UFMG
          </span>
        </div>
        <h2
          id="heading-empresa-junior"
          className="font-heading text-base sm:text-lg font-black text-foreground m-0 leading-snug"
        >
          Quer participar da fundação ou diretoria da Empresa Júnior de GP?
        </h2>
        <p className="font-sans text-xs text-content-secondary m-0 leading-relaxed font-medium">
          A Chapa Semente atuará junto ao Colegiado para viabilizar apoio jurídico e institucional à criação da primeira Empresa Júnior de Gestão Pública da UFMG — consultoria real para órgãos públicos e OSCs desde o 1º período.
        </p>
      </div>

      <motion.button
        whileHover={{ x: -2, y: -2 }}
        whileTap={{ x: 2, y: 2 }}
        transition={tactileSpring}
        type="button"
        onClick={toggleInterest}
        className={`min-h-[44px] px-4 py-2.5 rounded-xl border-3 border-border font-heading text-xs font-black uppercase shrink-0 cursor-pointer flex items-center justify-center gap-2 shadow-[3px_3px_0_0_#1F1F1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all ${
          interested
            ? 'bg-[#134E4A] text-white'
            : 'bg-white text-foreground hover:bg-muted'
        }`}
      >
        <i
          className={`bi ${interested ? 'bi-check-circle-fill' : 'bi-rocket-takeoff'} text-base`}
          aria-hidden="true"
        />
        <span>
          {interested ? 'Inscrito no GT Empresa Júnior' : 'Quero Apoiar a Empresa Júnior'}
        </span>
      </motion.button>
    </section>
  );
};
