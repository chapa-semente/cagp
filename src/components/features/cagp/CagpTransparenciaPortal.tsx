import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import {
  SIMULATED_TRANSPARENCY,
  SIMULATION_NOTICE,
  SIMULATION_BADGE_TEXT,
} from '@/lib/simulatedData';
import { CagpIcon } from '@/components/ui/CagpIcon';
import { StatCard } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { Sticker } from '@/components/ui/sticker';
import { DonutChart } from '@/components/boldkit/charts/donut-chart';
import { GaugeChart } from '@/components/boldkit/charts/gauge-chart';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/boldkit/charts/chart';
import { InvoiceSummary } from '@/components/boldkit/blocks/invoice';
import {
  ItemGroup,
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemHeader,
} from '@/components/ui/item';
import { route } from '@/lib/paths';
import { tactileSpring } from '@/lib/motion';

const BUDGET_ALLOCATION_DATA = [
  { name: 'Semana Acadêmica & Debates', value: 42, fill: '#9E2424' },
  { name: 'Acolhimento Calouros', value: 28, fill: '#5B2A85' },
  { name: 'Manutenção Sede F-4000', value: 18, fill: '#FE8812' },
  { name: 'Fundo de Reserva', value: 12, fill: '#266264' },
];

const BUDGET_CHART_CONFIG = {
  value: { label: 'Percentual (%)' },
};

const RREO_BAR_DATA = [
  { mes: 'Mai/26', receitas: 3200, despesas: 2150 },
  { mes: 'Jun/26', receitas: 2800, despesas: 2420 },
  { mes: 'Jul/26', receitas: 1950, despesas: 1680 },
  { mes: 'Ago/26', receitas: 3450, despesas: 2730 },
  { mes: 'Set/26', receitas: 3450, despesas: 2450 },
];

const RREO_CHART_CONFIG: ChartConfig = {
  receitas: { label: 'Entradas (R$)', color: '#15803D' },
  despesas: { label: 'Saídas (R$)', color: '#9E2424' },
};

type EntryFilterType = 'todos' | 'receita' | 'despesa';

export const CagpTransparenciaPortal: React.FC = () => {
  const [filterType, setFilterType] = useState<EntryFilterType>('todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');

  const categories = [
    'todas',
    ...Array.from(new Set(SIMULATED_TRANSPARENCY.entries.map((e) => e.category))),
  ];

  const filteredEntries = SIMULATED_TRANSPARENCY.entries.filter((entry) => {
    const matchesType = filterType === 'todos' ? true : entry.type === filterType;
    const matchesCategory =
      selectedCategory === 'todas' ? true : entry.category === selectedCategory;
    return matchesType && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-8 font-body">
      {/* Aviso Obrigatório de Simulação */}
      <div
        role="note"
        className="p-4 rounded-xl bg-[#FEF3C7] border-3 border-[#16181d] shadow-[4px_4px_0_0_#16181d] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-foreground"
      >
        <div className="space-y-1">
          <strong className="font-head uppercase font-extrabold text-[#78350F] block text-xs">
            Livro-Caixa Aberto (Proposta 1 Materializada) — Prestação de Contas Demonstrativa
          </strong>
          <p className="m-0 text-foreground font-medium leading-relaxed">
            {SIMULATION_NOTICE} As regras estatutárias abaixo (Regimento Interno aprovado em{' '}
            {SIMULATED_TRANSPARENCY.statuteDate}) são 100% oficiais; os valores monetários e
            lançamentos contábeis são demonstrativos (<code className="font-mono bg-white px-1 py-0.5 rounded border border-border">simulated: true</code>).
          </p>
        </div>
        <span className="font-mono text-[10px] font-bold uppercase bg-white px-2.5 py-1 rounded-lg border-3 border-border shadow-sm text-[#78350F] shrink-0 self-start sm:self-center">
          {SIMULATION_BADGE_TEXT}
        </span>
      </div>

      {/* Bloco 1: Indicadores Financeiros Consolidados + Carimbo Institucional */}
      <section
        aria-labelledby="heading-balancete-kpis"
        className="bg-white rounded-xl border-[3px] border-[#16181d] p-5 sm:p-6 shadow-[6px_6px_0_0_#16181d] space-y-5"
      >
        <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b-2 border-border">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-[#5B2A85] text-white font-mono text-[10px] font-black uppercase">
                PROPOSTA 1 • EIXO 1 SEMENTE
              </span>
              <span className="font-mono text-[10px] font-bold uppercase text-secondary">
                ART. 30, V DO ESTATUTO CAGP
              </span>
            </div>
            <h2
              id="heading-balancete-kpis"
              className="font-head text-lg sm:text-xl font-extrabold uppercase text-foreground m-0 tracking-tight"
            >
              Livro-Caixa Aberto • Balancete Financeiro Consolidado
            </h2>
            <p className="text-xs font-mono text-foreground mt-1 m-0 font-bold">
              {SIMULATED_TRANSPARENCY.referencePeriod} • Diretoria de Finanças e Patrimônio (Art. 30)
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8F5E9] text-success font-mono text-[11px] font-bold uppercase rounded-lg border-3 border-border shadow-sm">
            <CagpIcon name="stamp" className="w-3.5 h-3.5" />
            <span>CONSELHO FISCAL • ART. 36</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Saldo Disponível (Simulado)"
            value={SIMULATED_TRANSPARENCY.balance}
            subtitle="Conta-caixa auditada semestralmente"
            colorScheme="primary"
            icon={<CagpIcon name="shield" className="w-5 h-5" />}
          />

          <StatCard
            title="Entradas Acumuladas"
            value={SIMULATED_TRANSPARENCY.totalIn}
            subtitle="Kits discentes, eventos e repasses"
            colorScheme="success"
            icon={<CagpIcon name="check" className="w-5 h-5" />}
          />

          <StatCard
            title="Saídas Executadas"
            value={SIMULATED_TRANSPARENCY.totalOut}
            subtitle="Acolhimento, seminários e sede"
            colorScheme="secondary"
            icon={<CagpIcon name="calculator" className="w-5 h-5" />}
          />

          <StatCard
            title="Cota de Reserva Discente"
            value={SIMULATED_TRANSPARENCY.reserveFund}
            subtitle="Fundo de transição entre gestões"
            colorScheme="teal"
            icon={<CagpIcon name="stamp" className="w-5 h-5" />}
          />
        </div>

        {/* Painel Visual BoldKit Charts: DonutChart + BarChart Recharts + GaugeChart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-4 border-t-3 border-border">
          <div className="p-4 sm:p-5 rounded-xl border-3 border-[#16181d] bg-white shadow-[4px_4px_0_0_#16181d] space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-heading text-xs sm:text-sm font-extrabold uppercase text-foreground">
                Alocação por Eixo (%)
              </span>
              <Sticker variant="secondary" size="sm" rotation="slight">
                DONUT CHART
              </Sticker>
            </div>
            <DonutChart
              data={BUDGET_ALLOCATION_DATA}
              config={BUDGET_CHART_CONFIG}
              variant="separated"
              showLabels="inside"
              centerContent={
                <div className="text-center">
                  <div className="text-lg font-heading font-black">100%</div>
                  <div className="text-[11px] font-mono text-muted-foreground">Auditado</div>
                </div>
              }
              className="mx-auto max-h-[210px]"
            />
            <div className="flex flex-wrap justify-center gap-1.5 pt-1">
              {BUDGET_ALLOCATION_DATA.map((item) => (
                <Badge key={item.name} variant="outline" className="text-[10px]">
                  <span
                    className="w-2.5 h-2.5 rounded-sm border border-border inline-block"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span>{item.name}: {item.value}%</span>
                </Badge>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl border-3 border-[#16181d] bg-white shadow-[4px_4px_0_0_#16181d] flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-heading text-xs sm:text-sm font-extrabold uppercase text-foreground">
                Fluxo Mensal Entradas vs Saídas
              </span>
              <Sticker variant="default" size="sm" rotation="slight">
                RECHARTS RREO
              </Sticker>
            </div>
            <ChartContainer config={RREO_CHART_CONFIG} className="min-h-[200px] w-full">
              <BarChart data={RREO_BAR_DATA} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mes" tickLine={false} axisLine={false} className="text-[10px] font-mono font-bold" />
                <YAxis tickLine={false} axisLine={false} className="text-[10px] font-mono" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="receitas" fill="#15803D" radius={[4, 4, 0, 0]} stroke="#16181d" strokeWidth={2} />
                <Bar dataKey="despesas" fill="#9E2424" radius={[4, 4, 0, 0]} stroke="#16181d" strokeWidth={2} />
              </BarChart>
            </ChartContainer>
            <p className="text-[11px] font-mono text-muted-foreground text-center m-0 font-bold">
              Comparativo mensal auditado pelo Conselho Fiscal (R$)
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl border-3 border-[#16181d] bg-white shadow-[4px_4px_0_0_#16181d] flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-heading text-xs sm:text-sm font-extrabold uppercase text-foreground">
                Conformidade Fiscal
              </span>
              <Sticker variant="default" size="sm" rotation="slight-right">
                META 100%
              </Sticker>
            </div>
            <div className="py-2 flex items-center justify-center">
              <GaugeChart
                value={94}
                min={0}
                max={100}
                size="md"
                variant="semicircle"
                label="Comprovantes Homologados (Art. 36)"
                valueFormatter={(v) => `${v}%`}
                zones={[
                  { from: 0, to: 50, color: '#9E2424', label: 'Atenção' },
                  { from: 50, to: 80, color: '#FE8812', label: 'Em Análise' },
                  { from: 80, to: 100, color: '#15803D', label: 'Regular' },
                ]}
              />
            </div>
            <p className="text-xs font-sans text-muted-foreground text-center m-0">
              Todos os recibos e notas fiscais permanecem arquivados na pasta digital aberta à Assembleia Geral.
            </p>
          </div>
        </div>
      </section>

      {/* Bloco 2: Livro-Razão de Lançamentos */}
      <section
        aria-labelledby="heading-lancamentos"
        className="bg-white rounded-xl border-[3px] border-border p-5 sm:p-6 shadow-md space-y-4"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b-2 border-border">
          <div>
            <h2
              id="heading-lancamentos"
              className="font-head text-lg font-extrabold uppercase text-foreground m-0 tracking-tight"
            >
              Livro-Razão de Receitas e Despesas (Demonstrativo)
            </h2>
            <p className="text-xs text-foreground mt-0.5 m-0 font-medium">
              Filtre por natureza da movimentação ou rubrica orçamentária do Centro Acadêmico.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: 'todos', label: 'Todos' },
                { id: 'receita', label: 'Entradas (+)' },
                { id: 'despesa', label: 'Saídas (-)' },
              ] as { id: EntryFilterType; label: string }[]
            ).map((btn) => {
              const active = filterType === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setFilterType(btn.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-head uppercase font-extrabold border-3 border-border cursor-pointer transition-all ${
                    active
                      ? 'bg-secondary text-white shadow-sm'
                      : 'bg-white hover:bg-muted text-foreground shadow-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}

            <select
              aria-label="Filtrar por rubrica ou categoria"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-xs font-head font-bold bg-white border-3 border-border text-foreground shadow-sm cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'todas' ? 'Todas as rubricas' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="divide-y-2 divide-[#0A0A0A]">
          <AnimatePresence mode="popLayout">
            {filteredEntries.map((entry) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={tactileSpring}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] font-bold bg-foreground text-background text-white px-2 py-0.5 rounded border border-border">
                      {entry.code}
                    </span>
                    <span className="font-mono text-[11px] text-foreground font-bold">{entry.date}</span>
                    <span className="text-[10px] font-head font-bold uppercase bg-white border border-border text-foreground px-2 py-0.5 rounded-lg shadow-xs">
                      {entry.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-success bg-[#E8F5E9] border border-border px-2 py-0.5 rounded-lg">
                      {entry.status}
                    </span>
                  </div>
                  <p className="font-head font-bold text-sm text-foreground m-0">{entry.description}</p>
                  <span className="text-[11px] font-mono text-foreground block">
                    Comprovante: <span className="font-bold">{entry.documentRef}</span>
                  </span>
                </div>

                <div className="sm:text-right shrink-0">
                  <span
                    className={`font-head text-base sm:text-lg font-black tabular-nums ${
                      entry.type === 'receita' ? 'text-success' : 'text-secondary'
                    }`}
                  >
                    {entry.amount}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Cartões de Balancete estilo Invoice (InvoiceSummary) */}
        <div className="pt-4 border-t-2 border-border space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="font-heading text-xs font-black uppercase text-foreground">
              Comprovantes &amp; Balancetes Homologados (Invoice Ledger)
            </span>
            <span className="font-mono text-[10px] font-bold text-muted-foreground">
              Auditados pelo Conselho Fiscal (Art. 36)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InvoiceSummary
              invoiceNumber="BAL-2026-Q3"
              clientName="Conselho Fiscal CAGP"
              issueDate="01/10/2026"
              dueDate="15/10/2026"
              amount={3420.0}
              status="paid"
            />
            <InvoiceSummary
              invoiceNumber="SEM-ACAD-2026"
              clientName="Comissão Organizadora GP"
              issueDate="12/09/2026"
              dueDate="20/09/2026"
              amount={3820.0}
              status="paid"
            />
            <InvoiceSummary
              invoiceNumber="FUNDO-RES-2026"
              clientName="Reserva Estatutária CAGP"
              issueDate="05/08/2026"
              dueDate="30/11/2026"
              amount={1500.0}
              status="paid"
            />
          </div>
        </div>
      </section>

      {/* Bloco 3: RREO Mensal (Art. 30, V) + Atas e Pareceres (Art. 29, VII) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* RREO Mensal */}
        <section
          aria-labelledby="heading-rreo"
          className="lg:col-span-7 bg-white rounded-xl border-[3px] border-border p-5 sm:p-6 shadow-md space-y-4"
        >
          <div>
            <h2
              id="heading-rreo"
              className="font-head text-base sm:text-lg font-extrabold uppercase text-foreground m-0 tracking-tight"
            >
              Execução Orçamentária Mensal (RREO • Art. 30, V)
            </h2>
            <p className="text-xs text-foreground mt-1 m-0 font-medium">
              Acompanhamento mensal de entradas, saídas e saldo acumulado (dados simulados).
            </p>
          </div>

          <div className="overflow-x-auto border-3 border-border rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-border bg-muted/60 text-[10px] font-mono font-bold uppercase text-foreground">
                  <th className="py-2.5 px-3">Competência</th>
                  <th className="py-2.5 px-2 text-right">Entradas</th>
                  <th className="py-2.5 px-2 text-right">Saídas</th>
                  <th className="py-2.5 px-2 text-right">Saldo Final</th>
                  <th className="py-2.5 px-3 text-right">Situação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0A0A0A] tabular-nums font-body">
                {SIMULATED_TRANSPARENCY.rreoMonthly.map((row) => (
                  <tr key={row.id} className="hover:bg-muted/40 transition-colors">
                    <td className="py-2.5 px-3 font-head font-bold text-foreground">{row.month}</td>
                    <td className="py-2.5 px-2 text-right font-mono text-success font-bold">
                      {row.inflow}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono text-secondary font-bold">
                      {row.outflow}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono font-black text-foreground">
                      {row.endingBalance}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="text-[10px] font-mono font-bold bg-white border border-border px-2 py-0.5 rounded-lg text-foreground shadow-xs">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Atas, Pareceres e Inventário */}
        <section
          aria-labelledby="heading-atas-pareceres"
          className="lg:col-span-5 bg-white rounded-xl border-[3px] border-border p-5 sm:p-6 shadow-md space-y-4"
        >
          <div>
            <h2
              id="heading-atas-pareceres"
              className="font-head text-base sm:text-lg font-extrabold uppercase text-foreground m-0 tracking-tight"
            >
              Atas, Pareceres &amp; Patrimônio
            </h2>
            <p className="text-xs text-foreground mt-1 m-0 font-medium">
              Registros demonstrativos de controle social (Arts. 29, VII e 30, VII).
            </p>
          </div>

          <ItemGroup className="space-y-3">
            {SIMULATED_TRANSPARENCY.governanceRecords.map((rec) => (
              <Item
                key={rec.id}
                className="p-3.5 rounded-xl bg-white border-3 border-border shadow-sm flex-col items-start gap-1.5"
              >
                <ItemHeader className="text-[10px] font-mono font-bold text-foreground">
                  <span className="text-secondary">{rec.code}</span>
                  <span>
                    {rec.date} • {rec.organ}
                  </span>
                </ItemHeader>
                <ItemContent className="space-y-1">
                  <ItemTitle className="text-xs font-head font-bold uppercase text-foreground m-0">
                    {rec.title}
                  </ItemTitle>
                  <ItemDescription className="text-[11px] text-foreground m-0 leading-relaxed font-medium">
                    {rec.summary}
                  </ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        </section>
      </div>

      {/* Bloco 4: Base Normativa Real do Estatuto */}
      <section
        aria-labelledby="heading-estatuto-transparencia"
        className="bg-white rounded-xl border-[3px] border-border p-5 sm:p-6 shadow-md space-y-4"
      >
        <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b-2 border-border">
          <div>
            <h2
              id="heading-estatuto-transparencia"
              className="font-head text-base sm:text-lg font-extrabold uppercase text-foreground m-0 tracking-tight"
            >
              Garantias Estatutárias de Transparência (Regimento de 14/10/2024 — Dados Oficiais)
            </h2>
            <p className="text-xs text-foreground mt-1 m-0 font-medium">
              Dispositivos vigentes do Estatuto do Centro Acadêmico de Gestão Pública da UFMG.
            </p>
          </div>
          <a
            href={route('/documentos/estatuto-cagp-2024.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary text-white text-xs font-head font-extrabold uppercase tracking-wider no-underline inline-flex items-center gap-1.5 border-3 border-border shadow hover:shadow-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            <CagpIcon name="thesis" className="w-4 h-4" />
            <span>Baixar Estatuto Oficial (PDF)</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border-3 border-border shadow-sm space-y-2">
            <span className="text-[11px] font-mono font-bold text-secondary block">
              Art. 8º, Parágrafo Único
            </span>
            <h3 className="text-xs font-head font-extrabold uppercase text-foreground m-0">
              Vedação de Distribuição de Lucros
            </h3>
            <p className="text-xs text-foreground m-0 leading-relaxed font-medium">
              O CAGP não distribui lucros, bonificações ou vantagens a dirigentes ou membros; toda
              receita é integralmente aplicada nas finalidades estudantis e acadêmicas.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border-3 border-border shadow-sm space-y-2">
            <span className="text-[11px] font-mono font-bold text-secondary block">Art. 15, Inciso V</span>
            <h3 className="text-xs font-head font-extrabold uppercase text-foreground m-0">
              Prazo de 3 Dias Úteis para Informações
            </h3>
            <p className="text-xs text-foreground m-0 leading-relaxed font-medium">
              Qualquer estudante de Gestão Pública tem direito de solicitar esclarecimentos, atas e
              documentos financeiros, devendo a Diretoria responder em até <strong>3 dias úteis</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border-3 border-border shadow-sm space-y-2">
            <span className="text-[11px] font-mono font-bold text-secondary block">
              Arts. 30 e 36 do Estatuto
            </span>
            <h3 className="text-xs font-head font-extrabold uppercase text-foreground m-0">
              Dupla Checagem &amp; Conselho Fiscal
            </h3>
            <p className="text-xs text-foreground m-0 leading-relaxed font-medium">
              A Diretoria de Finanças e Patrimônio elabora os balancetes e o inventário semestral,
              submetidos à auditoria independente do Conselho Fiscal e Consultivo.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t-2 border-border flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-foreground font-medium">
            Deseja protocolar um pedido de acesso a atas ou documentos contábeis nos termos do Art. 15, V?
          </span>
          <a
            href="mailto:cagp@fafich.ufmg.br?subject=Pedido%20de%20Informa%C3%A7%C3%A3o%20-%20Art.%2015%20V%20do%20Estatuto%20CAGP"
            className="font-head font-bold uppercase text-secondary hover:underline no-underline inline-flex items-center gap-1.5"
          >
            <span>Solicitar por e-mail (cagp@fafich.ufmg.br)</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </section>
    </div>
  );
};
