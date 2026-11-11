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
import { tactileSpring } from '@/lib/motion';

const BUDGET_ALLOCATION_DATA = [
  { name: 'Semana Acadêmica & Debates', value: 42, fill: '#A85300' },
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
  receitas: { label: 'Entradas (R$)', color: '#166534' },
  despesas: { label: 'Saídas (R$)', color: '#A85300' },
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
      {/* Aviso de simulação: repetido aqui porque o bloco abaixo é inteiro fictício */}
      <div
        role="note"
        className="p-4 rounded-xl bg-warning-tint border-2 border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-foreground"
      >
        <div className="space-y-1">
          <strong className="font-heading font-bold text-warning block text-sm">
            Daqui para baixo, tudo é exemplo
          </strong>
          <p className="m-0 text-sm leading-relaxed">
            Saldos, gráficos, lançamentos, comprovantes e atas abaixo são fictícios. {SIMULATION_NOTICE}
          </p>
        </div>
        <span className="font-heading text-xs font-bold uppercase tracking-[0.04em] tabular-nums bg-white px-2.5 py-1 rounded-md border-2 border-border text-foreground shrink-0 self-start sm:self-center">
          {SIMULATION_BADGE_TEXT}
        </span>
      </div>

      {/* Bloco 1: Indicadores Financeiros Consolidados + Carimbo Institucional */}
      <section
        aria-labelledby="heading-balancete-kpis"
        className="bg-white rounded-xl border-[3px] border-border p-5 sm:p-6 shadow-xl space-y-5"
      >
        <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b-2 border-border">
          <div>
            <h2
              id="heading-balancete-kpis"
              className="font-head text-lg sm:text-xl font-extrabold text-foreground m-0"
            >
              Livro-Caixa Aberto • Balancete Financeiro Consolidado
            </h2>
            <p className="m-0 mt-1 text-sm text-muted-foreground">Proposta 1 da chapa, no formato do Regimento, art. 30, XI e XII.</p>
            <p className="text-xs font-mono text-foreground mt-1 m-0 font-bold">
              {SIMULATED_TRANSPARENCY.referencePeriod} • Diretoria Financeira (Art. 30)
            </p>
          </div>

          <span className="inline-flex items-center px-2 py-1 bg-warning-tint text-foreground font-heading text-xs font-bold uppercase tracking-[0.04em] rounded-md border-2 border-border">
            Simulado
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Saldo Disponível (Simulado)"
            value={SIMULATED_TRANSPARENCY.balance}
            subtitle="Valor fictício de exemplo"
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
          <div className="p-4 sm:p-5 rounded-xl border-2 border-border bg-white shadow-md space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-heading text-xs sm:text-sm font-extrabold uppercase text-foreground">
                Alocação por Eixo (%)
              </span>
            </div>
            <DonutChart
              data={BUDGET_ALLOCATION_DATA}
              config={BUDGET_CHART_CONFIG}
              variant="separated"
              showLabels="inside"
              centerContent={
                <div className="text-center">
                  <div className="text-lg font-heading font-black">100%</div>
                  <div className="text-xs font-heading font-bold uppercase text-muted-foreground">Exemplo</div>
                </div>
              }
              className="mx-auto max-h-[210px]"
            />
            <div className="flex flex-wrap justify-center gap-1.5 pt-1">
              {BUDGET_ALLOCATION_DATA.map((item) => (
                <Badge key={item.name} variant="outline" className="text-xs">
                  <span
                    className="w-2.5 h-2.5 rounded-sm border border-border inline-block"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span>{item.name}: {item.value}%</span>
                </Badge>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl border-2 border-border bg-white shadow-md flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-heading text-xs sm:text-sm font-extrabold uppercase text-foreground">
                Quanto entrou e quanto saiu, mês a mês
              </span>
              <Badge variant="outline">Simulado</Badge>
            </div>
            <ChartContainer config={RREO_CHART_CONFIG} className="min-h-[200px] w-full">
              <BarChart data={RREO_BAR_DATA} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mes" tickLine={false} axisLine={false} className="text-xs font-mono font-bold" />
                <YAxis tickLine={false} axisLine={false} className="text-xs font-mono" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="receitas" fill="#166534" radius={[4, 4, 0, 0]} stroke="#1F1F1F" strokeWidth={2} />
                <Bar dataKey="despesas" fill="#A85300" radius={[4, 4, 0, 0]} stroke="#1F1F1F" strokeWidth={2} />
              </BarChart>
            </ChartContainer>
            <p className="text-xs font-mono text-muted-foreground text-center m-0 font-bold">
              Comparativo mensal fictício (R$)
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl border-2 border-border bg-white shadow-md flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-heading text-xs sm:text-sm font-extrabold uppercase text-foreground">
                Conformidade Fiscal
              </span>
              <Badge variant="secondary">Meta 100%</Badge>
            </div>
            <div className="py-2 flex items-center justify-center">
              <GaugeChart
                value={94}
                min={0}
                max={100}
                size="md"
                variant="semicircle"
                label="Comprovantes arquivados (exemplo)"
                valueFormatter={(v) => `${v}%`}
                zones={[
                  { from: 0, to: 50, color: '#A85300', label: 'Atenção' },
                  { from: 50, to: 80, color: '#FE8812', label: 'Em Análise' },
                  { from: 80, to: 100, color: '#166534', label: 'Regular' },
                ]}
              />
            </div>
            <p className="text-xs font-sans text-muted-foreground text-center m-0">
              Na proposta, recibos e notas ficam numa pasta digital que qualquer estudante pode consultar (Art. 15, V).
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
              className="font-head text-lg font-extrabold text-foreground m-0"
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

        <div className="divide-y-2 divide-border">
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
                    <span className="font-mono text-xs font-bold bg-foreground text-background text-white px-2 py-0.5 rounded border border-border">
                      {entry.code}
                    </span>
                    <span className="font-mono text-xs text-foreground font-bold">{entry.date}</span>
                    <span className="text-xs font-head font-bold uppercase bg-white border border-border text-foreground px-2 py-0.5 rounded-lg shadow-xs">
                      {entry.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-success bg-success-tint border border-border px-2 py-0.5 rounded-lg">
                      {entry.status}
                    </span>
                  </div>
                  <p className="font-head font-bold text-sm text-foreground m-0">{entry.description}</p>
                  <span className="text-xs font-mono text-foreground block">
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
              Comprovantes e balancetes
            </span>
            <span className="font-heading text-xs font-bold uppercase tracking-[0.04em] bg-warning-tint px-2 py-0.5 rounded-md border-2 border-border text-foreground">
              Simulado
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InvoiceSummary
              invoiceNumber="BAL-2026-Q3"
              clientName="Assembleia Geral (exemplo)"
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

      {/* Bloco 3: RREO Mensal (Art. 30, XI) + Atas e Pareceres (Art. 29, VII) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* RREO Mensal */}
        <section
          aria-labelledby="heading-rreo"
          className="lg:col-span-7 bg-white rounded-xl border-[3px] border-border p-5 sm:p-6 shadow-md space-y-4"
        >
          <div>
            <h2
              id="heading-rreo"
              className="font-head text-base sm:text-lg font-extrabold text-foreground m-0"
            >
              Execução Orçamentária Mensal (RREO • Art. 30, XI)
            </h2>
            <p className="text-xs text-foreground mt-1 m-0 font-medium">
              Acompanhamento mensal de entradas, saídas e saldo acumulado (dados simulados).
            </p>
          </div>

          <div className="overflow-x-auto border-2 border-border rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-border bg-muted text-xs font-mono font-bold uppercase text-foreground">
                  <th className="py-2.5 px-3">Competência</th>
                  <th className="py-2.5 px-2 text-right">Entradas</th>
                  <th className="py-2.5 px-2 text-right">Saídas</th>
                  <th className="py-2.5 px-2 text-right">Saldo Final</th>
                  <th className="py-2.5 px-3 text-right">Situação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border tabular-nums font-body">
                {SIMULATED_TRANSPARENCY.rreoMonthly.map((row) => (
                  <tr key={row.id} className="hover:bg-background transition-colors">
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
                      <span className="text-xs font-mono font-bold bg-white border border-border px-2 py-0.5 rounded-lg text-foreground shadow-xs">
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
              className="font-head text-base sm:text-lg font-extrabold text-foreground m-0"
            >
              Atas, Pareceres &amp; Patrimônio
            </h2>
            <p className="text-xs text-foreground mt-1 m-0 font-medium">
              Registros fictícios, no formato de arquivo de atas do Art. 29, VII.
            </p>
          </div>

          <ItemGroup className="space-y-3">
            {SIMULATED_TRANSPARENCY.governanceRecords.map((rec) => (
              <Item
                key={rec.id}
                className="p-3.5 rounded-xl bg-white border-2 border-border shadow-sm flex-col items-start gap-1.5"
              >
                <ItemHeader className="text-xs font-mono font-bold text-foreground">
                  <span className="text-secondary">{rec.code}</span>
                  <span>
                    {rec.date} • {rec.organ}
                  </span>
                </ItemHeader>
                <ItemContent className="space-y-1">
                  <ItemTitle className="text-xs font-head font-bold uppercase text-foreground m-0">
                    {rec.title}
                  </ItemTitle>
                  <ItemDescription className="text-xs text-foreground m-0 leading-relaxed font-medium">
                    {rec.summary}
                  </ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        </section>
      </div>

    </div>
  );
};
