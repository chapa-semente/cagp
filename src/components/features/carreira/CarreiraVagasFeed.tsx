// src/components/features/carreira/CarreiraVagasFeed.tsx — Bloco Sintético de Vagas em Destaque para o Hub de Carreira
import React from 'react';
import { motion } from 'motion/react';
import { CURATED_VACANCIES } from '@/lib/carreiraData';
import { route } from '@/lib/paths';
import { tactileSpring } from '@/lib/motion';

export const CarreiraVagasFeed: React.FC = () => {
  const featured = CURATED_VACANCIES.filter((v) => v.featured).slice(0, 3);

  return (
    <section
      id="cagp-carreira-vagas-feed"
      aria-labelledby="heading-vagas-feed"
      className="space-y-4 font-sans select-none"
    >
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-primary border border-border shrink-0" aria-hidden="true" />
          <div>
            <h2
              id="heading-vagas-feed"
              className="font-heading text-base sm:text-lg font-black text-foreground m-0"
            >
              Vagas e editais de exemplo (Proposta 12)
            </h2>
            <p className="text-xs text-muted-foreground m-0 mt-0.5 font-medium">
              Oportunidades curadas em órgãos estaduais, municipais, controle externo e OSCs.
            </p>
          </div>
        </div>

        <a
          href={route('/carreira/vagas')}
          className="min-h-[44px] px-3.5 py-1.5 rounded-xl text-xs font-heading font-extrabold uppercase tracking-wide bg-white hover:bg-muted text-foreground hover:text-primary border-3 border-border shadow-xs no-underline inline-flex items-center gap-1.5 transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 tabular-nums"
        >
          <span>Mural Completo de Vagas ({CURATED_VACANCIES.length})</span>
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((v) => (
          <motion.div
            key={v.id}
            whileHover={{ x: -2, y: -2 }}
            transition={tactileSpring}
            className="p-4 rounded-xl border-2 border-border bg-white shadow-xs hover:shadow-sm flex flex-col justify-between gap-3 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-black uppercase px-2 py-0.5 rounded bg-background border-2 border-border text-foreground">
                  {v.tag}
                </span>
                <span className="cagp-sticker-simulado">Simulado</span>
              </div>
              <h3 className="font-heading font-black text-sm text-foreground leading-tight m-0">
                {v.agency}
              </h3>
              <p className="text-xs font-medium text-content-secondary mt-1 mb-0">
                {v.role}
              </p>

              <div className="mt-3 p-2.5 rounded-lg bg-background border border-border space-y-1 text-xs font-mono text-foreground tabular-nums">
                <div className="flex items-center justify-between">
                  <span>Jornada:</span>
                  <strong>{v.hours}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Bolsa:</span>
                  <strong>{v.allowance}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Requisito:</span>
                  <strong>{v.periodReq}</strong>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-1 border-t border-border">
              <span className="block font-mono text-xs font-bold text-primary uppercase">
                {v.proposalLink}
              </span>
              <a
                href={v.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 bg-primary text-white text-xs font-heading font-black uppercase rounded-xl border-2 border-border shadow-xs hover:bg-primary-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all cursor-pointer min-h-[44px] no-underline"
              >
                <span>Acessar Portal do Órgão</span>
                <i className="bi bi-box-arrow-up-right text-xs" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
