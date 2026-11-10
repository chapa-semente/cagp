import React from 'react';
import { StatCard } from '@/components/ui/stat-card';
import { asset } from '@/lib/paths';

export const PesquisaStatsBanner: React.FC = () => {
  return (
    <section className="space-y-4 my-6" aria-label="Indicadores de Pesquisa e Extensão UFMG">
      <h2 className="sr-only">Indicadores de Pesquisa e Iniciação Científica UFMG</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="PPGCP / DCP UFMG"
          value="Nota 7"
          change="Conceito máximo CAPES em Ciência Política"
          trend="up"
          colorScheme="primary"
        />
        <StatCard
          title="Iniciação Científica (DCP 198)"
          value="Até 90h"
          change="6 créditos em AAC • PIBIC / CNPq / FAPEMIG"
          trend="up"
          colorScheme="secondary"
        />
        <StatCard
          title="Pesquisa Interinstitucional"
          value="Até 75h"
          change="5 créditos (DCP 201/202 • FJP, IPEA, IES)"
          trend="neutral"
          colorScheme="accent"
        />
        <StatCard
          title="Extensão Obrigatória"
          value="300 Horas"
          change="DCP 195/196 + SIEX • 10% da carga horária"
          trend="neutral"
          colorScheme="teal"
          progress={{ value: 100, label: 'Integralização 10% PPC 2020' }}
        />
      </div>

      <div className="p-4 rounded-xl border-2 border-border bg-white shadow-[3px_3px_0_0_#1F1F1F] flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-0.5">
          <span className="font-mono text-xs font-black uppercase text-secondary block">
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
