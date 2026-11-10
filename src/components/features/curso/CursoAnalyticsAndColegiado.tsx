import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const EGRESSOS_DATA = [
  { name: 'Executivo Estadual', value: 37, fill: '#A85300', desc: 'Secretarias de Estado, EPPGG-MG e fundações' },
  { name: 'Executivo Federal', value: 15, fill: '#5B2A85', desc: 'Ministérios, agências reguladoras e autarquias' },
  { name: 'Executivo Municipal', value: 13, fill: '#266264', desc: 'Prefeituras (PBH e região metropolitana)' },
  { name: 'Consultoria Especializada', value: 12, fill: '#FE8812', desc: 'Empresas de assessoria governamental e projetos' },
  { name: 'Terceiro Setor / ONGs', value: 6, fill: '#166534', desc: 'Institutos sociais, fundações e advocacy' },
  { name: 'Outros Setores / Academia', value: 17, fill: '#57534E', desc: 'Pós-graduação, pesquisa acadêmica e setor privado' },
];

const FUNNEL_STAGES = [
  { stage: '1. Vagas SiSU / Ano', value: 80, percent: 100, fill: '#5B2A85', desc: '40 vagas no 1º semestre e 40 no 2º semestre via SiSU' },
  { stage: '2. Matrículas Confirmadas', value: 78, percent: 97.5, fill: '#A85300', desc: 'Taxa histórica de preenchimento e confirmação de matrícula' },
  { stage: '3. Ciclo Básico Concluído', value: 68, percent: 85, fill: '#FE8812', desc: 'Integralização dos primeiros 4 períodos interdisciplinares' },
  { stage: '4. Estágio Supervisionado', value: 56, percent: 70, fill: '#266264', desc: 'Atuação profissional em órgãos públicos ou terceiro setor' },
  { stage: '5. Bacharéis Diplomados', value: 48, percent: 60, fill: '#166534', desc: 'Colação de grau e obtenção do diploma de Gestor Público' },
];

const SALARY_RANGES = [
  { range: 'Mais de R$ 10.000', value: 24, fill: '#5B2A85', desc: 'Carreiras de Estado estruturadas (EPPGG Federal, EPPGG-MG e consultorias seniores)' },
  { range: 'R$ 7.000 a R$ 10.000', value: 32, fill: '#FE8812', desc: 'Cargos comissionados, coordenações estaduais e analistas plenos' },
  { range: 'R$ 4.500 a R$ 7.000', value: 28, fill: '#266264', desc: 'Analistas municipais, assessores de secretarias e analistas juniores' },
  { range: 'Até R$ 4.500', value: 16, fill: '#A85300', desc: 'Técnicos recém-formados, residentes de gestão e bolsas de pesquisa' },
];

const DEPARTAMENTOS_DATA = [
  { depto: 'DCP / FAFICH (Ciência Política)', horas: 1560, pct: 52, fill: '#5B2A85' },
  { depto: 'FACE / UFMG (Economia & Finanças)', horas: 360, pct: 12, fill: '#FE8812' },
  { depto: 'Extensão Universitária (SIEX Obrigatória)', horas: 300, pct: 10, fill: '#166534' },
  { depto: 'DSO / FAFICH (Sociologia & Políticas Sociais)', horas: 180, pct: 6, fill: '#A85300' },
  { depto: 'Faculdade de Direito (Direito Público)', horas: 180, pct: 6, fill: '#266264' },
  { depto: 'Cedeplar / IGC (Planejamento Urbano)', horas: 120, pct: 4, fill: '#D97706' },
  { depto: 'DACE / FAFICH (Metodologia Científica)', horas: 120, pct: 4, fill: '#4F46E5' },
  { depto: 'Formação Livre Externa (Qualquer Unidade UFMG)', horas: 120, pct: 4, fill: '#57534E' },
];

export const CursoAnalyticsAndColegiado: React.FC = () => {
  return (
    <section className="space-y-8 my-8 text-foreground" aria-label="Dados Analíticos, Egressos e Governança do Curso">
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
        <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-card p-2 border-2 border-border rounded-xl">
          <TabsTrigger value="egressos" className="flex-1 min-w-[180px] min-h-[44px] text-xs font-head font-bold uppercase">
            1. Onde Atuam os Egressos (65% Executivo)
          </TabsTrigger>
          <TabsTrigger value="cientometria" className="flex-1 min-w-[180px] min-h-[44px] text-xs font-head font-bold uppercase">
            2. Cientometria do Campo de Públicas
          </TabsTrigger>
          <TabsTrigger value="colegiado" className="flex-1 min-w-[180px] min-h-[44px] text-xs font-head font-bold uppercase">
            3. Colegiado &amp; Atendimento (Sala F-2039)
          </TabsTrigger>
        </TabsList>

        {/* Aba 1: Pesquisa de Egressos & Inserção Profissional */}
        <TabsContent value="egressos" className="mt-4">
          <Card className="bg-white border-3 border-border shadow-[5px_5px_0_0_#1F1F1F]">
            <CardHeader className="border-b-3 border-border bg-card">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <Badge variant="default" className="mb-2">
                    PESQUISA OFICIAL DE EGRESSOS • N = 89 DE 349 GRADUADOS
                  </Badge>
                  <CardTitle className="text-xl">
                    Setor de Ocupação de Egressos de Gestão Pública UFMG
                  </CardTitle>
                  <CardDescription className="text-xs font-medium text-muted-foreground mt-1">
                    Entre os respondentes que informaram local de trabalho, <strong>65% atuam diretamente no Poder Executivo</strong> (Estadual 37%, Federal 15% e Municipal 13%).
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Barra de Distribuição Proporcional Responsiva Mobile-First */}
              <div className="p-4 sm:p-5 rounded-xl border-2 border-border bg-[#ffffff] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-head text-xs font-black uppercase text-foreground tracking-wide">
                    Distribuição Proporcional por Setor (% do Total de Egressos)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-secondary text-white font-mono text-xs font-black">
                    65% Executivo Consolidado
                  </span>
                </div>

                <div
                  className="w-full h-7 rounded-lg border-2 border-[#1F1F1F] overflow-hidden flex bg-muted shadow-[2px_2px_0_0_#1F1F1F]"
                  role="progressbar"
                  aria-label="Distribuição percentual por setor de atuação"
                  aria-valuenow={100}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  {EGRESSOS_DATA.map((item) => (
                    <div
                      key={item.name}
                      style={{ width: `${item.value}%`, backgroundColor: item.fill }}
                      title={`${item.name}: ${item.value}%`}
                      className="h-full relative group transition-opacity hover:opacity-90 border-r border-[#1F1F1F] last:border-r-0"
                    />
                  ))}
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-mono font-medium text-gray-700">
                  {EGRESSOS_DATA.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full border border-[#1F1F1F]" style={{ backgroundColor: item.fill }} />
                      <span>{item.name}: <strong>{item.value}%</strong></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grade de 6 Setores Detalhados */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {EGRESSOS_DATA.map((item) => (
                  <div
                    key={item.name}
                    className="p-4 rounded-xl border-2 border-border bg-white shadow-[2px_2px_0_0_#1F1F1F] flex flex-col justify-between gap-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-md border-2 border-[#1F1F1F] shrink-0"
                          style={{ backgroundColor: item.fill }}
                        />
                        <span className="font-head text-xs font-black uppercase text-foreground">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-mono text-base font-black text-foreground">
                        {item.value}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-body font-medium leading-relaxed m-0">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Painel Duplo: Funil de Integralização & Faixas Salariais em Barras Responsivas */}
              <div className="border-t-3 border-border pt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. Funil de Integralização */}
                <div className="p-5 rounded-xl border-2 border-border bg-[#ffffff] space-y-4">
                  <div>
                    <span className="font-mono text-xs font-black uppercase text-[#5B2A85] block">
                      Taxas de Retenção &amp; Sucesso Discente
                    </span>
                    <h4 className="font-head text-base font-black text-foreground m-0">
                      Funil de Integralização (SiSU &rarr; Formatura)
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {FUNNEL_STAGES.map((st) => (
                      <div key={st.stage} className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-head font-bold uppercase text-foreground">
                            {st.stage}
                          </span>
                          <span className="font-mono font-black text-foreground">
                            {st.value} estudantes ({st.percent}%)
                          </span>
                        </div>
                        <div className="w-full h-3 rounded-md bg-muted border border-[#1F1F1F] overflow-hidden">
                          <div
                            className="h-full rounded-sm transition-all"
                            style={{ width: `${st.percent}%`, backgroundColor: st.fill }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground font-body font-medium m-0">
                          {st.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Faixas Salariais dos Egressos */}
                <div className="p-5 rounded-xl border-2 border-border bg-[#ffffff] space-y-4">
                  <div>
                    <span className="font-mono text-xs font-black uppercase text-secondary block">
                      Remuneração Média na Carreira Pública
                    </span>
                    <h4 className="font-head text-base font-black text-foreground m-0">
                      Faixas Salariais dos Egressos Diplomados
                    </h4>
                  </div>
                  <div className="space-y-3.5">
                    {SALARY_RANGES.map((sal) => (
                      <div key={sal.range} className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-head font-black uppercase text-foreground">
                            {sal.range}
                          </span>
                          <span className="font-mono font-black text-[#1F1F1F]">
                            {sal.value}% dos respondentes
                          </span>
                        </div>
                        <div className="w-full h-3 rounded-md bg-muted border border-[#1F1F1F] overflow-hidden">
                          <div
                            className="h-full rounded-sm transition-all"
                            style={{ width: `${sal.value * 2.5}%`, backgroundColor: sal.fill }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground font-body font-medium m-0">
                          {sal.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Informação Operacional de Turno Noturno & Horários */}
              <div className="p-5 rounded-xl border-2 border-border bg-white shadow-[2px_2px_0_0_#1F1F1F] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-border pb-2">
                  <span className="font-mono text-xs font-black uppercase text-secondary">
                    Grade Horária Oficial da FAFICH • Noturno
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#FEF3C7] text-[#1F1F1F] font-mono text-xs font-bold border border-[#1F1F1F]">
                    19h00 às 22h25
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#EFE7F6] border border-[#5B2A85]/30">
                    <strong className="block font-head font-black uppercase text-[#5B2A85]">1º Horário (Aulas 1 e 2)</strong>
                    <span className="text-muted-foreground font-body font-medium">19h00 às 20h35 (100 minutos de exposição teórica e metodológica).</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#EFE7F6] border border-[#5B2A85]/30">
                    <strong className="block font-head font-black uppercase text-[#5B2A85]">Intervalo Discente</strong>
                    <span className="text-muted-foreground font-body font-medium">20h35 às 20h50 (Acesso ao DA FAFICH, Cantina e Café da Filosofia).</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#EFE7F6] border border-[#5B2A85]/30">
                    <strong className="block font-head font-black uppercase text-[#5B2A85]">2º Horário (Aulas 3 e 4)</strong>
                    <span className="text-muted-foreground font-body font-medium">20h50 às 22h25 (Seminários, laboratórios computacionais e debates).</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba 2: Cientometria do Campo de Públicas */}
        <TabsContent value="cientometria" className="mt-4">
          <Card className="bg-white border-3 border-border shadow-[5px_5px_0_0_#1F1F1F]">
            <CardHeader className="border-b-3 border-border bg-card">
              <Badge variant="secondary" className="mb-2 w-fit">
                ESTUDO CIENTOMÉTRICO • CLEMENTE ET AL. (2022) • REV. SOCIOLOGIA E POLÍTICA
              </Badge>
              <CardTitle className="text-xl">
                O Que se Ensina: Posicionamento da UFMG no Campo de Públicas
              </CardTitle>
              <CardDescription className="text-xs font-medium text-muted-foreground mt-1">
                Análise bibliométrica das ementas e referências dos PPCs de 14 bacharelados públicos brasileiros (DOI: 10.1590/1678-98732230e006).
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border-2 border-border bg-primary text-white shadow-[3px_3px_0_0_#1F1F1F] space-y-2">
                  <Badge variant="accent">CLUSTER DA UFMG • 4 CURSOS</Badge>
                  <h4 className="font-heading text-base font-black">
                    Cluster Gestão de Políticas Públicas
                  </h4>
                  <p className="text-xs text-white leading-relaxed font-body font-medium">
                    A UFMG integra o núcleo conectado de <strong>Gestão de Políticas Públicas</strong> ao lado de <strong>USP, UFABC e UFRN</strong>, com forte ênfase em análise institucional, avaliação de políticas, ciência política e métodos quantitativos/qualitativos.
                  </p>
                </div>

                <div className="p-4 rounded-xl border-2 border-border bg-white shadow-[3px_3px_0_0_#1F1F1F] space-y-2">
                  <Badge variant="default">CLUSTER ADMINISTRATIVO • 7 CURSOS</Badge>
                  <h4 className="font-heading text-base font-black text-foreground">
                    Administração Pública e Organizacional
                  </h4>
                  <p className="text-xs text-[#3F3C38] leading-relaxed font-body font-medium">
                    Composto por FJP, UDESC (BC e FLP), UNIFAL, UNEAL, UFLA e UFCA, com foco predominante em teoria administrativa e gestão organizacional clássica de conformidade interna.
                  </p>
                </div>

                <div className="p-4 rounded-xl border-2 border-border bg-white shadow-[3px_3px_0_0_#1F1F1F] space-y-2">
                  <Badge variant="teal">CURSOS SINGULARES • 3 CURSOS</Badge>
                  <h4 className="font-heading text-base font-black text-foreground">
                    Perfis Regionais e Específicos
                  </h4>
                  <p className="text-xs text-[#3F3C38] leading-relaxed font-body font-medium">
                    Integram nós específicos com recortes próprios: UNILAB (Integração Lusófona), UFRGS (Administração Pública e Social) e UFPR (Setor Litoral).
                  </p>
                </div>
              </div>

              {/* Distribuição de Carga Horária por Departamento da UFMG */}
              <div className="p-5 rounded-xl border-2 border-border bg-[#ffffff] space-y-4">
                <div>
                  <span className="font-mono text-xs font-black uppercase text-primary block">
                    Grade Multidisciplinar Integrada (PPC 2020)
                  </span>
                  <h4 className="font-head text-base font-black text-foreground m-0">
                    Distribuição da Carga Horária Total (3.000h) por Departamento
                  </h4>
                </div>
                <div className="space-y-3">
                  {DEPARTAMENTOS_DATA.map((dep) => (
                    <div key={dep.depto} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-head font-bold uppercase text-foreground">
                          {dep.depto}
                        </span>
                        <span className="font-mono font-black text-foreground">
                          {dep.horas}h ({dep.pct}%)
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-md bg-muted border border-[#1F1F1F] overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${dep.pct}%`, backgroundColor: dep.fill }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba 3: Atendimento e Diretório do Colegiado */}
        <TabsContent value="colegiado" className="mt-4">
          <Card className="bg-white border-3 border-border shadow-[5px_5px_0_0_#1F1F1F]">
            <CardHeader className="border-b-3 border-border bg-card">
              <Badge variant="ufmg" className="mb-2 w-fit">
                GOVERNANÇA &amp; ATENDIMENTO • SALA 2039 FAFICH
              </Badge>
              <CardTitle className="text-xl">
                Secretaria do Colegiado &amp; Protocolo CEAG
              </CardTitle>
              <CardDescription className="text-xs font-medium text-muted-foreground mt-1">
                Orientações para atendimento presencial, requerimentos padrão do DRCA e contato com a coordenação didática.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border-2 border-border bg-[#ffffff] shadow-[3px_3px_0_0_#1F1F1F] space-y-2">
                  <span className="font-mono text-xs font-bold uppercase text-secondary block">
                    Secretaria Didática Presencial
                  </span>
                  <h4 className="font-heading text-base font-black text-foreground m-0">
                    Sala 2039 — FAFICH (2º Andar)
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed m-0 font-body font-medium">
                    Plantão presencial às <strong>quartas-feiras, das 13h às 19h</strong>.
                    Secretários: Wander Wenceslau Pereira e Ubirajara Dutra.
                    Telefone: <strong className="font-mono text-foreground">(31) 3409-3826</strong>.
                  </p>
                  <p className="text-xs text-muted-foreground m-0 font-body font-medium">
                    E-mail oficial: <a href="mailto:colgradgestaopublica@fafich.ufmg.br" className="font-mono font-bold text-primary underline">colgradgestaopublica@fafich.ufmg.br</a>
                  </p>
                </div>

                <div className="p-5 rounded-xl border-2 border-border bg-[#ffffff] shadow-[3px_3px_0_0_#1F1F1F] space-y-2">
                  <span className="font-mono text-xs font-bold uppercase text-primary block">
                    Protocolo Noturno Geral
                  </span>
                  <h4 className="font-heading text-base font-black text-foreground m-0">
                    CEAG — Centro de Apoio à Graduação
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed m-0 font-body font-medium">
                    Atendimento contínuo de <strong>segunda a sexta-feira, das 08h às 22h</strong>.
                    Entrega de atestados médicos, protocolo de requerimentos e documentos fora do horário da secretaria.
                  </p>
                  <p className="text-xs text-muted-foreground m-0 font-body font-medium">
                    Localização: FAFICH, 2º Andar (próximo à entrada principal).
                  </p>
                </div>
              </div>

              {/* Botão de Acesso ao Diretório Completo na Aba Colegiado */}
              <div className="p-4 rounded-xl bg-background border-2 border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h5 className="font-heading text-sm font-black uppercase text-foreground m-0">
                    Diretório Completo do Colegiado, NDE &amp; Resoluções Oficiais
                  </h5>
                  <p className="text-xs text-muted-foreground m-0 mt-0.5 font-body font-medium">
                    Consulte os 12 membros docentes por departamento, atas, resoluções e o PPC na aba dedicada ao Colegiado.
                  </p>
                </div>
                <a
                  href="#colegiado"
                  className="min-h-[44px] px-4 py-2 bg-primary hover:bg-[#4A216E] text-white rounded-lg font-heading text-xs uppercase font-extrabold tracking-wider inline-flex items-center justify-center gap-1.5 no-underline shrink-0 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  <span>Abrir Aba Colegiado &rarr;</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};
