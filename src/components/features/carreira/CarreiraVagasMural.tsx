// src/components/features/carreira/CarreiraVagasMural.tsx — Mural Completo de Vagas & Editais
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CURATED_VACANCIES, type VacancyItem } from '@/lib/carreiraData';
import { tactileSpring } from '@/lib/motion';
import { SIMULATION_NOTICE } from '@/lib/simulatedData';

export const CarreiraVagasMural: React.FC = () => {
  const [sphereFilter, setSphereFilter] = useState<string>('Todas');

  const filteredVacancies =
    sphereFilter === 'Todas'
      ? CURATED_VACANCIES
      : CURATED_VACANCIES.filter((v) => v.tag === sphereFilter);

  return (
    <div className="space-y-6 font-sans select-none text-foreground">
      {/* Vagas de exemplo: o radar real é a Proposta 12 (PRODUCT.md › Real × simulado). */}
      <div role="note" className="px-4 py-3 rounded-xl bg-warning-tint border-2 border-border flex flex-wrap items-center justify-between gap-2 text-sm text-foreground">
        <span className="max-w-prose"><strong>Aviso:</strong> {SIMULATION_NOTICE} As vagas abaixo são exemplos, não editais abertos.</span>
        <span className="cagp-sticker-simulado">Simulado</span>
      </div>

      {/* Barra de Filtros por Esfera */}
      <div className="p-4 sm:p-5 rounded-xl border-2 border-border bg-white shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-heading font-black text-foreground m-0 flex items-center gap-2">
              <i className="bi bi-funnel-fill text-primary" aria-hidden="true" />
              <span>Filtro por Esfera Governamental &amp; Setor</span>
            </h2>
            <p className="text-xs text-muted-foreground m-0 mt-0.5 font-medium">
              Selecione o nível de atuação para visualizar os editais vigentes:
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scroll-mask-x">
            {['Todas', 'Estadual', 'Municipal', 'Controle', 'OSCs'].map((sp) => (
              <button
                key={sp}
                type="button"
                onClick={() => setSphereFilter(sp)}
                className={`min-h-[44px] px-3.5 py-1.5 rounded-xl border-2 border-border font-heading text-xs font-extrabold uppercase shrink-0 cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 active:translate-x-0.5 active:translate-y-0.5 ${
                  sphereFilter === sp
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-white text-foreground hover:bg-muted'
                }`}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>

        {/* Tarja Informativa Proposta 12 */}
        <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-mono text-xs font-bold text-muted-foreground">
            Total de Vagas Listadas: <strong className="text-foreground tabular-nums">{filteredVacancies.length}</strong>
          </span>
          <span className="px-2.5 py-1 rounded bg-background border border-border font-mono text-xs font-bold text-primary uppercase">
            Proposta 12 • Radar Permanente Chapa Semente
          </span>
        </div>
      </div>

      {/* Grid de Vagas */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredVacancies.map((v) => (
            <motion.div
              layout
              key={v.id}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ x: -2, y: -2 }}
              transition={tactileSpring}
              className="p-5 rounded-xl border-2 border-border bg-white shadow-xs hover:shadow-sm flex flex-col justify-between gap-4 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-black uppercase px-2.5 py-0.5 rounded bg-background border-2 border-border text-foreground">
                    {v.tag}
                  </span>
                  <span className="cagp-sticker-simulado">Simulado</span>
                </div>
                <h3 className="font-heading font-black text-sm sm:text-base text-foreground leading-tight m-0">
                  {v.agency}
                </h3>
                <p className="text-xs font-medium text-content-secondary mt-1.5 mb-0 leading-relaxed">
                  {v.role}
                </p>

                <div className="mt-4 p-3 rounded-xl bg-background border border-border space-y-1.5 text-xs font-mono text-foreground tabular-nums">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Jornada:</span>
                    <strong>{v.hours}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Bolsa:</span>
                    <strong className="text-emerald-800">{v.allowance}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Requisito:</span>
                    <strong>{v.periodReq}</strong>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-border">
                <span className="block font-mono text-xs font-bold text-primary uppercase">
                  {v.proposalLink}
                </span>
                <a
                  href={v.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-primary text-white text-xs font-heading font-black uppercase rounded-xl border-2 border-border shadow-xs hover:bg-primary-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all cursor-pointer min-h-[44px] no-underline"
                >
                  <span>Acessar Portal do Órgão</span>
                  <i className="bi bi-box-arrow-up-right text-xs" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
