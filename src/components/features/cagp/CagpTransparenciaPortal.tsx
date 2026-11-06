import React, { useState } from 'react';
import {
  SIMULATED_TRANSPARENCY,
  SIMULATION_NOTICE,
  SIMULATION_BADGE_TEXT,
} from '../../../lib/simulatedData';
import { CagpIcon } from '../../ui/CagpIcon';
import { route } from '../../../lib/paths';

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
    <div className="space-y-6 pb-8">
      {/* Navegação Interna da Seção O CAGP (Eixo 5) */}
      <nav
        aria-label="Subseções do Eixo 5 — O CAGP"
        className="bg-white rounded-2xl border border-[#DFDBD2] p-2 flex flex-wrap items-center gap-1.5 shadow-2xs"
      >
        <a
          href={route('/sobre')}
          className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#292524] hover:bg-[#FBF8F3] hover:text-[#8B1E2D] no-underline transition-colors"
        >
          Visão Geral &amp; Estatuto
        </a>
        <a
          href={route('/transparencia')}
          aria-current="page"
          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#8B1E2D] text-white no-underline shadow-2xs"
        >
          Portal da Transparência
        </a>
        <a
          href={route('/gestao')}
          className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#292524] hover:bg-[#FBF8F3] hover:text-[#8B1E2D] no-underline transition-colors"
        >
          Diretorias &amp; Gestão
        </a>
      </nav>

      {/* Aviso Obrigatório de Simulação (PRODUCT.md) */}
      <div
        role="note"
        className="p-4 rounded-2xl bg-[#FEF3C7]/85 border border-[#F59E0B]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#78350F]"
      >
        <div className="space-y-1">
          <strong className="font-bold text-[#78350F] block">
            Aviso de Simulação — Prestação de Contas Demonstrativa
          </strong>
          <p className="m-0 text-[#78350F] leading-relaxed">
            {SIMULATION_NOTICE} As regras estatutárias abaixo (Regimento Interno aprovado em{' '}
            {SIMULATED_TRANSPARENCY.statuteDate}) são 100% oficiais; os valores monetários e
            lançamentos contábeis são demonstrativos (<code>simulated: true</code>).
          </p>
        </div>
        <span className="font-mono text-[10px] font-bold uppercase bg-white px-2.5 py-1 rounded-full border border-[#F59E0B]/40 shrink-0 self-start sm:self-center">
          {SIMULATION_BADGE_TEXT}
        </span>
      </div>

      {/* Bloco 1: Indicadores Financeiros Consolidados + Carimbo Institucional */}
      <section
        aria-labelledby="heading-balancete-kpis"
        className="bg-white rounded-3xl border border-[#DFDBD2] p-5 sm:p-6 shadow-2xs space-y-5"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2
              id="heading-balancete-kpis"
              className="font-['Oswald'] text-lg sm:text-xl font-bold uppercase text-[#0A0A0A] m-0"
            >
              Balancete Financeiro Consolidado • CAGP
            </h2>
            <p className="text-xs text-[#57534E] mt-1 m-0">
              {SIMULATED_TRANSPARENCY.referencePeriod} • Diretoria de Finanças e Patrimônio (Art. 30)
            </p>
          </div>

          <span className="cagp-stamp-badge is-deferido">
            <CagpIcon name="stamp" className="w-3.5 h-3.5" />
            <span>CONSELHO FISCAL • ART. 36</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#DFDBD2]">
            <span className="text-[11px] font-mono uppercase text-[#57534E] block">
              Saldo Disponível (Simulado)
            </span>
            <strong className="font-['Oswald'] text-2xl font-bold text-[#0A0A0A] block mt-1 tabular-nums">
              {SIMULATED_TRANSPARENCY.balance}
            </strong>
            <span className="text-[11px] text-[#57534E] block mt-1">
              Conta-caixa auditada semestralmente
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#DFDBD2]">
            <span className="text-[11px] font-mono uppercase text-[#57534E] block">
              Entradas Acumuladas
            </span>
            <strong className="font-['Oswald'] text-2xl font-bold text-[#15803D] block mt-1 tabular-nums">
              {SIMULATED_TRANSPARENCY.totalIn}
            </strong>
            <span className="text-[11px] text-[#57534E] block mt-1">
              Kits discentes, eventos e repasses
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#DFDBD2]">
            <span className="text-[11px] font-mono uppercase text-[#57534E] block">
              Saídas Executadas
            </span>
            <strong className="font-['Oswald'] text-2xl font-bold text-[#8B1E2D] block mt-1 tabular-nums">
              {SIMULATED_TRANSPARENCY.totalOut}
            </strong>
            <span className="text-[11px] text-[#57534E] block mt-1">
              Acolhimento, seminários e sede
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#DFDBD2]">
            <span className="text-[11px] font-mono uppercase text-[#57534E] block">
              Cota de Reserva Discente
            </span>
            <strong className="font-['Oswald'] text-2xl font-bold text-[#005A9C] block mt-1 tabular-nums">
              {SIMULATED_TRANSPARENCY.reserveFund}
            </strong>
            <span className="text-[11px] text-[#57534E] block mt-1">
              Fundo de transição entre gestões
            </span>
          </div>
        </div>
      </section>

      {/* Bloco 2: Livro-Razão de Lançamentos (Com Filtros por Tipo e Rubrica) */}
      <section
        aria-labelledby="heading-lancamentos"
        className="bg-white rounded-3xl border border-[#DFDBD2] p-5 sm:p-6 shadow-2xs space-y-4"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <h2
              id="heading-lancamentos"
              className="font-['Oswald'] text-lg font-bold uppercase text-[#0A0A0A] m-0"
            >
              Livro-Razão de Receitas e Despesas (Demonstrativo)
            </h2>
            <p className="text-xs text-[#57534E] mt-0.5 m-0">
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
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer transition-colors ${
                    active
                      ? 'bg-[#8B1E2D] text-white border-[#8B1E2D]'
                      : 'bg-[#FBF8F3] hover:bg-[#F4F1EA] text-[#292524] border-[#DFDBD2]'
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
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FBF8F3] border border-[#DFDBD2] text-[#292524]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'todas' ? 'Todas as rubricas' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="divide-y divide-[#DFDBD2] border-t border-b border-[#DFDBD2]">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] font-bold bg-[#F4F1EA] text-[#44403C] px-2 py-0.5 rounded">
                    {entry.code}
                  </span>
                  <span className="font-mono text-[11px] text-[#57534E]">{entry.date}</span>
                  <span className="text-[10px] font-semibold bg-[#FBF8F3] border border-[#DFDBD2] text-[#292524] px-2 py-0.5 rounded-full">
                    {entry.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                    {entry.status}
                  </span>
                </div>
                <p className="font-bold text-sm text-[#0A0A0A] m-0">{entry.description}</p>
                <span className="text-[11px] font-mono text-[#57534E] block">
                  Comprovante de referência: {entry.documentRef}
                </span>
              </div>

              <div className="sm:text-right shrink-0">
                <span
                  className={`font-['Oswald'] text-base sm:text-lg font-bold tabular-nums ${
                    entry.type === 'receita' ? 'text-[#15803D]' : 'text-[#8B1E2D]'
                  }`}
                >
                  {entry.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bloco 3: RREO Mensal (Art. 30, V) + Atas e Pareceres (Art. 29, VII) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* RREO Mensal */}
        <section
          aria-labelledby="heading-rreo"
          className="lg:col-span-7 bg-white rounded-3xl border border-[#DFDBD2] p-5 sm:p-6 shadow-2xs space-y-4"
        >
          <div>
            <h2
              id="heading-rreo"
              className="font-['Oswald'] text-base sm:text-lg font-bold uppercase text-[#0A0A0A] m-0"
            >
              Execução Orçamentária Mensal (RREO • Art. 30, V)
            </h2>
            <p className="text-xs text-[#57534E] mt-1 m-0">
              Acompanhamento mensal de entradas, saídas e saldo acumulado (dados simulados).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#DFDBD2] text-[10px] font-mono uppercase text-[#57534E]">
                  <th className="py-2 pr-3">Competência</th>
                  <th className="py-2 px-2 text-right">Entradas</th>
                  <th className="py-2 px-2 text-right">Saídas</th>
                  <th className="py-2 px-2 text-right">Saldo Final</th>
                  <th className="py-2 pl-2 text-right">Situação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F1EA] tabular-nums">
                {SIMULATED_TRANSPARENCY.rreoMonthly.map((row) => (
                  <tr key={row.id}>
                    <td className="py-2.5 pr-3 font-bold text-[#0A0A0A]">{row.month}</td>
                    <td className="py-2.5 px-2 text-right font-mono text-[#15803D] font-semibold">
                      {row.inflow}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono text-[#8B1E2D] font-semibold">
                      {row.outflow}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono font-bold text-[#0A0A0A]">
                      {row.endingBalance}
                    </td>
                    <td className="py-2.5 pl-2 text-right">
                      <span className="text-[10px] font-mono bg-[#FBF8F3] border border-[#DFDBD2] px-2 py-0.5 rounded-full text-[#44403C]">
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
          className="lg:col-span-5 bg-white rounded-3xl border border-[#DFDBD2] p-5 sm:p-6 shadow-2xs space-y-4"
        >
          <div>
            <h2
              id="heading-atas-pareceres"
              className="font-['Oswald'] text-base sm:text-lg font-bold uppercase text-[#0A0A0A] m-0"
            >
              Atas, Pareceres &amp; Patrimônio
            </h2>
            <p className="text-xs text-[#57534E] mt-1 m-0">
              Registros demonstrativos de controle social (Arts. 29, VII e 30, VII).
            </p>
          </div>

          <div className="space-y-2.5">
            {SIMULATED_TRANSPARENCY.governanceRecords.map((rec) => (
              <div
                key={rec.id}
                className="p-3.5 rounded-2xl bg-[#FBF8F3] border border-[#DFDBD2] space-y-1"
              >
                <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-[#57534E]">
                  <span className="font-bold text-[#8B1E2D]">{rec.code}</span>
                  <span>
                    {rec.date} • {rec.organ}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-[#0A0A0A] m-0">{rec.title}</h3>
                <p className="text-[11px] text-[#57534E] m-0 leading-relaxed">{rec.summary}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bloco 4: Base Normativa Real do Estatuto (14/10/2024) + Canal de Pedido de Informação */}
      <section
        aria-labelledby="heading-estatuto-transparencia"
        className="bg-white rounded-3xl border border-[#DFDBD2] p-5 sm:p-6 shadow-2xs space-y-4"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2
              id="heading-estatuto-transparencia"
              className="font-['Oswald'] text-base sm:text-lg font-bold uppercase text-[#0A0A0A] m-0"
            >
              Garantias Estatutárias de Transparência (Regimento de 14/10/2024 — Dados Oficiais)
            </h2>
            <p className="text-xs text-[#57534E] mt-1 m-0">
              Dispositivos vigentes do Estatuto do Centro Acadêmico de Gestão Pública da UFMG.
            </p>
          </div>
          <a
            href={route('/documentos/estatuto-cagp-2024.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-[#8B1E2D] hover:bg-[#6E1420] text-white text-xs font-bold no-underline inline-flex items-center gap-1.5"
          >
            <CagpIcon name="thesis" className="w-4 h-4" />
            <span>Baixar Estatuto Oficial (PDF)</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#DFDBD2] space-y-1.5">
            <span className="text-[11px] font-mono font-bold text-[#8B1E2D]">
              Art. 8º, Parágrafo Único
            </span>
            <h3 className="text-xs font-bold text-[#0A0A0A] m-0">
              Vedação de Distribuição de Lucros
            </h3>
            <p className="text-xs text-[#57534E] m-0 leading-relaxed">
              O CAGP não distribui lucros, bonificações ou vantagens a dirigentes ou membros; toda
              receita é integralmente aplicada nas finalidades estudantis e acadêmicas.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#DFDBD2] space-y-1.5">
            <span className="text-[11px] font-mono font-bold text-[#8B1E2D]">Art. 15, Inciso V</span>
            <h3 className="text-xs font-bold text-[#0A0A0A] m-0">
              Prazo de 3 Dias Úteis para Informações
            </h3>
            <p className="text-xs text-[#57534E] m-0 leading-relaxed">
              Qualquer estudante de Gestão Pública tem direito de solicitar esclarecimentos, atas e
              documentos financeiros, devendo a Diretoria responder em até <strong>3 dias úteis</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#DFDBD2] space-y-1.5">
            <span className="text-[11px] font-mono font-bold text-[#8B1E2D]">
              Arts. 30 e 36 do Estatuto
            </span>
            <h3 className="text-xs font-bold text-[#0A0A0A] m-0">
              Dupla Checagem &amp; Conselho Fiscal
            </h3>
            <p className="text-xs text-[#57534E] m-0 leading-relaxed">
              A Diretoria de Finanças e Patrimônio elabora os balancetes e o inventário semestral,
              submetidos à auditoria independente do Conselho Fiscal e Consultivo.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-[#DFDBD2] flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-[#57534E]">
            Deseja protocolar um pedido de acesso a atas ou documentos contábeis nos termos do Art. 15, V?
          </span>
          <a
            href="mailto:cagp@fafich.ufmg.br?subject=Pedido%20de%20Informa%C3%A7%C3%A3o%20-%20Art.%2015%20V%20do%20Estatuto%20CAGP"
            className="font-bold text-[#8B1E2D] hover:underline no-underline inline-flex items-center gap-1"
          >
            <span>Solicitar por e-mail (cagp@fafich.ufmg.br)</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </section>
    </div>
  );
};
