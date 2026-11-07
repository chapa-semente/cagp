import React from 'react';
import { DonutChart } from '@/components/boldkit/charts/donut-chart';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const EGRESSOS_DATA = [
  { name: 'Executivo Estadual', value: 37, fill: '#9E2424' },
  { name: 'Executivo Federal', value: 15, fill: '#5B2A86' },
  { name: 'Executivo Municipal', value: 13, fill: '#266264' },
  { name: 'Consultoria Especializada', value: 12, fill: '#FF8811' },
  { name: 'Terceiro Setor / ONGs', value: 6, fill: '#15803D' },
  { name: 'Outros Setores / Academia', value: 17, fill: '#57534E' },
];

const EGRESSOS_CONFIG = {
  value: { label: 'Percentual (%)', color: '#9E2424' },
};

const COLEGIADO_2026 = [
  {
    cargo: 'Coordenadora do Curso & Presidente do NDE',
    nome: 'Profª Isabele Batista Mitozo',
    depto: 'DCP / FAFICH',
    email: 'coordgestaopublicaufmg@gmail.com',
    destaque: true,
  },
  {
    cargo: 'Subcoordenadora & Membro do NDE',
    nome: 'Profª Ludmila Mendonça Lopes Ribeiro',
    depto: 'DSO / FAFICH',
    email: 'ludmila.ribeiro@gmail.com',
    destaque: true,
  },
  {
    cargo: 'Representante Titular — Ciência Política',
    nome: 'Prof. Paulo Ricardo Diniz Filho',
    depto: 'DCP / FAFICH (Titular + NDE)',
    email: 'paulo.ng.diniz@gmail.com',
  },
  {
    cargo: 'Representante Titular — Ciência Política',
    nome: 'Prof. Lucas Pereira Rezende',
    depto: 'DCP / FAFICH (Titular)',
    email: 'lucasprezende@fafich.ufmg.br',
  },
  {
    cargo: 'Representante Suplente — Ciência Política',
    nome: 'Prof. Lucas Gelape / Prof. José Angelo Machado',
    depto: 'DCP / FAFICH (Suplentes)',
    email: 'lgelape@gmail.com',
  },
  {
    cargo: 'Representação — Sociologia',
    nome: 'Profª Ana Paula Vasconcelos (Tit.) / Profª Elaine Vilela (Sup.)',
    depto: 'DSO / FAFICH',
    email: 'anapaulavasconcelos@gmail.com',
  },
  {
    cargo: 'Representação — Economia',
    nome: 'Profª Lizia de Figueiredo (Tit.) / Profª Clara Zanon (Sup.)',
    depto: 'ECN / FACE / CEDEPLAR',
    email: 'lizia@cedeplar.ufmg.br',
  },
  {
    cargo: 'Representação Discente no Colegiado',
    nome: 'Nina Queirolo Lage',
    depto: 'Discente GP / CAGP',
    email: 'ninaqueirololage@gmail.com',
  },
];

const NDE_MEMBROS = [
  { nome: 'Profª Isabele Batista Mitozo', papel: 'Presidente / Coordenadora', email: 'coordgestaopublicaufmg@gmail.com' },
  { nome: 'Profª Ludmila Mendonça Lopes Ribeiro', papel: 'Subcoordenadora Eleita', email: 'ludmila.ribeiro@gmail.com' },
  { nome: 'Prof. Paulo Ricardo Diniz Filho', papel: 'Membro Docente Eleito', email: 'paulo.ng.diniz@gmail.com' },
  { nome: 'Prof. Marcus Abílio Pereira', papel: 'Membro Docente Eleito', email: 'magopebh@gmail.com' },
  { nome: 'Prof. João Carlos Amoroso Botelho', papel: 'Membro Docente Eleito', email: 'joaocarlosbotelho@hotmail.com' },
  { nome: 'Profª Natália Guimarães Duarte Sátyro', papel: 'Membro Docente Eleito', email: 'nsatyro@gmail.com' },
];

export const CursoAnalyticsAndColegiado: React.FC = () => {
  return (
    <section className="space-y-8 my-8" aria-label="Dados Analíticos, Egressos e Governança do Curso">
      {/* KPIs Oficiais do Curso */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Estudantes Vinculados"
          value="426"
          change="356 na N-20229 • 70 na N-20152"
          trend="up"
          colorScheme="primary"
        />
        <StatCard
          title="Atuação no Executivo"
          value="65%"
          change="Estadual (37%), Federal (15%), Municipal (13%)"
          trend="up"
          colorScheme="secondary"
        />
        <StatCard
          title="Conceito MEC (CPC)"
          value="Nota 4"
          change="Escala 1 a 5 • Criado em 2009 (REUNI)"
          trend="neutral"
          colorScheme="accent"
        />
        <StatCard
          title="Carga Horária Total"
          value="3.000h"
          change="200 créditos • 10 semestres (Noturno)"
          trend="neutral"
          colorScheme="success"
        />
      </div>

      {/* Tabs Interativos: Egressos, Cientometria e Colegiado 2026 */}
      <Tabs defaultValue="egressos" className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-[#FFFDF9] p-2">
          <TabsTrigger value="egressos" className="flex-1 min-w-[180px]">
            1. Onde Atuam os Egressos (65% Executivo)
          </TabsTrigger>
          <TabsTrigger value="cientometria" className="flex-1 min-w-[180px]">
            2. Cientometria do Campo de Públicas
          </TabsTrigger>
          <TabsTrigger value="colegiado" className="flex-1 min-w-[180px]">
            3. Colegiado &amp; NDE (Outubro/2026)
          </TabsTrigger>
        </TabsList>

        {/* Aba 1: Pesquisa de Egressos */}
        <TabsContent value="egressos" className="mt-4">
          <Card className="bg-white">
            <CardHeader className="border-b-3 border-[#16181d] bg-[#FFFDF9]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <Badge variant="default" className="mb-2">
                    PESQUISA OFICIAL DE EGRESSOS • N = 89 DE 349 GRADUADOS
                  </Badge>
                  <CardTitle className="text-xl uppercase">
                    Setor de Ocupação de Egressos de Gestão Pública UFMG
                  </CardTitle>
                  <CardDescription className="text-xs font-medium text-[#57534E] mt-1">
                    Entre os respondentes que informaram local de trabalho, 65% atuam diretamente em órgãos do Poder Executivo (Estadual, Federal e Municipal).
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 flex justify-center">
                <DonutChart
                  data={EGRESSOS_DATA}
                  config={EGRESSOS_CONFIG}
                  innerRadius={55}
                  outerRadius={90}
                  centerContent={
                    <div className="text-center">
                      <span className="font-heading text-2xl font-black text-[#9E2424] block leading-none">
                        65%
                      </span>
                      <span className="font-mono text-[10px] font-bold uppercase text-[#16181d]">
                        Poder Executivo
                      </span>
                    </div>
                  }
                />
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EGRESSOS_DATA.map((item) => (
                  <div
                    key={item.name}
                    className="p-3.5 rounded-xl border-3 border-[#16181d] bg-white shadow-[3px_3px_0px_#16181d] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-4 h-4 rounded-md border-2 border-[#16181d] shrink-0"
                        style={{ backgroundColor: item.fill }}
                      />
                      <span className="font-heading text-xs font-extrabold uppercase text-[#16181d]">
                        {item.name}
                      </span>
                    </div>
                    <span className="font-mono text-base font-black text-[#16181d]">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba 2: Cientometria do Campo de Públicas */}
        <TabsContent value="cientometria" className="mt-4">
          <Card className="bg-white">
            <CardHeader className="border-b-3 border-[#16181d] bg-[#FFFDF9]">
              <Badge variant="secondary" className="mb-2 w-fit">
                ESTUDO CIENTOMÉTRICO • CLEMENTE ET AL. (2022) • REV. SOCIOLOGIA E POLÍTICA
              </Badge>
              <CardTitle className="text-xl uppercase">
                O Que se Ensina: Posicionamento da UFMG no Campo de Públicas
              </CardTitle>
              <CardDescription className="text-xs font-medium text-[#57534E] mt-1">
                Análise de redes bibliográficas dos PPCs de 14 bacharelados públicos brasileiros (DOI: 10.1590/1678-98732230e006).
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border-3 border-[#16181d] bg-[#5B2A86] text-white shadow-[4px_4px_0px_#16181d] space-y-2">
                <Badge variant="accent">CLUSTER DA UFMG • 4 CURSOS</Badge>
                <h4 className="font-heading text-base font-black uppercase">
                  Cluster Gestão de Políticas Públicas
                </h4>
                <p className="text-xs text-white/90 leading-relaxed">
                  A UFMG integra o núcleo conectado de <strong>Gestão de Políticas Públicas</strong> ao lado de <strong>USP, UFABC e UFRN</strong>, com forte ênfase em análise institucional, avaliação de políticas, ciência política e métodos quantitativos/qualitativos.
                </p>
              </div>

              <div className="p-4 rounded-xl border-3 border-[#16181d] bg-white shadow-[4px_4px_0px_#16181d] space-y-2">
                <Badge variant="default">CLUSTER ADMINISTRATIVO • 7 CURSOS</Badge>
                <h4 className="font-heading text-base font-black uppercase text-[#16181d]">
                  Administração Pública e Organizacional
                </h4>
                <p className="text-xs text-[#3F3C38] leading-relaxed">
                  Composto por FJP, UDESC (BC e FLP), UNIFAL, UNEAL, UFLA e UFCA, com foco predominante em teoria administrativa e gestão organizacional clássica.
                </p>
              </div>

              <div className="p-4 rounded-xl border-3 border-[#16181d] bg-white shadow-[4px_4px_0px_#16181d] space-y-2">
                <Badge variant="teal">CURSOS SINGULARES • 3 CURSOS</Badge>
                <h4 className="font-heading text-base font-black uppercase text-[#16181d]">
                  Perfis Regionais e Específicos
                </h4>
                <p className="text-xs text-[#3F3C38] leading-relaxed">
                  Integram nós específicos com recortes próprios: UNILAB (Integração Lusófona), UFRGS (Administração Pública e Social) e UFPR (Setor Litoral).
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba 3: Colegiado e NDE 2026 */}
        <TabsContent value="colegiado" className="mt-4">
          <Card className="bg-white">
            <CardHeader className="border-b-3 border-[#16181d] bg-[#FFFDF9]">
              <Badge variant="ufmg" className="mb-2 w-fit">
                COMPOSIÇÃO ATUALIZADA • OUTUBRO DE 2026 • SALA 2039 FAFICH
              </Badge>
              <CardTitle className="text-xl uppercase">
                Colegiado de Coordenação Didática &amp; Núcleo Docente Estruturante (NDE)
              </CardTitle>
              <CardDescription className="text-xs font-medium text-[#57534E] mt-1">
                Secretaria Presencial: Sala 2039 (Quartas-feiras, 13h às 19h • Secretários Wander Wenceslau Pereira e Ubirajara Dutra • Tel: 3409-3826). Protocolo Geral CEAG: Segunda a Sexta, 08h às 22h.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COLEGIADO_2026.map((m) => (
                  <div
                    key={m.nome}
                    className={`p-4 rounded-xl border-3 border-[#16181d] shadow-[3px_3px_0px_#16181d] ${
                      m.destaque ? 'bg-[#FFFDF9] border-l-8 border-l-[#9E2424]' : 'bg-white'
                    }`}
                  >
                    <span className="font-mono text-[10px] font-bold uppercase text-[#9E2424] block">
                      {m.cargo}
                    </span>
                    <h4 className="font-heading text-sm font-black uppercase text-[#16181d] mt-0.5">
                      {m.nome}
                    </h4>
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-2 text-xs">
                      <Badge variant="outline">{m.depto}</Badge>
                      <a
                        href={`mailto:${m.email}`}
                        className="font-mono text-[11px] font-bold text-[#5B2A86] hover:underline"
                      >
                        {m.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl border-3 border-[#16181d] bg-white shadow-[3px_3px_0px_#16181d] space-y-3">
                <h4 className="font-heading text-sm font-black uppercase text-[#16181d]">
                  Núcleo Docente Estruturante (NDE — 6 Docentes Permanentes)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {NDE_MEMBROS.map((nde) => (
                    <div
                      key={nde.nome}
                      className="p-2.5 rounded-lg border-2 border-[#16181d] bg-white shadow-[2px_2px_0px_#16181d]"
                    >
                      <span className="font-heading text-xs font-extrabold text-[#16181d] block">
                        {nde.nome}
                      </span>
                      <span className="font-mono text-[10px] text-[#57534E] block">
                        {nde.papel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};
