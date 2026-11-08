import React from 'react';
import { StatCard } from '@/components/ui/stat-card';
import { Sparkline } from '@/components/ui/sparkline';
import { MathCurveProgress } from '@/components/ui/math-curve-progress';
import { asset } from '@/lib/paths';

export const PesquisaStatsBanner: React.FC = () => {
  return (
    <section className="space-y-4 my-6" aria-label="Indicadores de Pesquisa e Extensão UFMG">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1">
          <StatCard
            title="PPGCP / DCP UFMG"
            value="Nota 7"
            change="Conceito máximo CAPES em Ciência Política"
            trend="up"
            colorScheme="primary"
          />
          <Sparkline data={[5, 5, 6, 6, 7, 7]} type="area" color="#5B2A86" height={24} ariaLabel="Evolução da nota CAPES do PPGCP" />
        </div>
        <div className="space-y-1">
          <StatCard
            title="Iniciação Científica (DCP 198)"
            value="Até 90h"
            change="6 créditos em AAC • PIBIC / CNPq / FAPEMIG"
            trend="up"
            colorScheme="secondary"
          />
          <Sparkline data={[400, 400, 500, 700, 700]} type="line" color="#FF8811" height={24} ariaLabel="Evolução do valor da bolsa IC" />
        </div>
        <StatCard
          title="Pesquisa Interinstitucional"
          value="Até 75h"
          change="5 créditos (DCP 201/202 • FJP, IPEA, IES)"
          trend="neutral"
          colorScheme="accent"
        />
        <div className="p-4 rounded-xl border-3 border-border bg-card shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground block">Extensão Obrigatória</span>
            <span className="font-heading text-xl font-black text-foreground block">300 Horas</span>
            <span className="text-[10px] font-sans text-muted-foreground block">DCP 195/196 + SIEX</span>
          </div>
          <MathCurveProgress value={100} size="sm" fillColor="#266264" />
        </div>
      </div>

      <div className="p-4 rounded-xl border-3 border-border bg-white shadow-[4px_4px_0px_#16181d] flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-0.5">
          <span className="font-mono text-[10px] font-black uppercase text-secondary block">
            PRÓ-REITORIAS VINCULADAS • PESQUISA, EXTENSÃO E PÓS-GRADUAÇÃO (NÚCLEO AVANÇADO)
          </span>
          <p className="text-xs font-bold text-foreground m-0">
            Projetos registrados no SIEX/PROEX e na PRPq garantem integralização curricular direta mediante certificado oficial.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={asset('/logos/ufmg/assinaturas/prpq-ufmg.jpg')}
            alt="PRPq UFMG"
            className="h-9 object-contain rounded border border-border bg-white p-1"
          />
          <img
            src={asset('/logos/ufmg/assinaturas/proex-ufmg.jpg')}
            alt="PROEX UFMG"
            className="h-9 object-contain rounded border border-border bg-white p-1"
          />
          <img
            src={asset('/logos/ufmg/assinaturas/prpg-ufmg.jpg')}
            alt="PRPG UFMG"
            className="h-9 object-contain rounded border border-border bg-white p-1"
          />
        </div>
      </div>
    </section>
  );
};
