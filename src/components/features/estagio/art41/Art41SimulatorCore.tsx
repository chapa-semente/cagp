// src/components/features/estagio/art41/Art41SimulatorCore.tsx — Simulador Completo de Aproveitamento Servidor pelo Art. 41 (Padrão Dossiê Tátil + Motion Expressivo)
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getVaultItem, setVaultItem, type VaultData } from '../../../../lib/storage/studentVault';
import { CagpIcon, type CagpIconName } from '@/components/ui/CagpIcon';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { asset } from '@/lib/paths';
import { tactileSpring, bounceSpring, staggerContainer, staggerItem } from '@/lib/motion';
import type { DateRange } from 'react-day-picker';

interface Art41Criterion {
  id: string;
  shortTitle: string;
  question: string;
  normativeRef: string;
  label: string;
  iconName: CagpIconName;
}

const ART41_CRITERIA: Art41Criterion[] = [
  {
    id: 'crit_vinculo',
    shortTitle: '1. Vínculo na Gestão Pública',
    question: 'Você possui vínculo ativo em órgão público (administração direta/indireta) ou entidade do terceiro setor (OSC) com atuação em políticas públicas?',
    normativeRef: 'Art. 41, caput • Regulamento N-20229',
    label: 'Vínculo profissional em órgão público (administração direta ou indireta) ou entidade do terceiro setor com atuação em políticas públicas (Art. 41, caput)',
    iconName: 'briefcase',
  },
  {
    id: 'crit_matricula',
    shortTitle: '2. Matrícula Regular no SIGA',
    question: 'Você está regularmente matriculado(a) em Estágio Curricular A (DCP 135, 180h) e/ou Estágio Curricular B (DCP 136, 120h) no semestre vigente?',
    normativeRef: 'Art. 41, § 1º, I • Matrícula Obrigatória',
    label: 'Matrícula regular em Estágio Curricular A (DCP 135, 180h) e/ou Estágio Curricular B (DCP 136, 120h) no período letivo vigente (Art. 41, § 1º, I)',
    iconName: 'curso',
  },
  {
    id: 'crit_fase1',
    shortTitle: '3. Requerimento + Declaração da Chefia',
    question: 'Você possui (ou pode emitir no início do período) a Declaração da chefia imediata atestando seu vínculo, período e atribuições correlatas?',
    normativeRef: 'Art. 41, § 1º, II • Protocolo Inicial',
    label: 'Início do Período: Apresentação de Requerimento com Declaração da chefia imediata atestando vínculo, período e atividades exercidas (Art. 41, § 1º, II)',
    iconName: 'file-text',
  },
  {
    id: 'crit_horas',
    shortTitle: '4. Carga Horária Mínima Acumulada',
    question: 'Sua carga horária acumulada no exercício profissional é igual ou superior à exigida pela disciplina (≥ 180h para DCP 135 / ≥ 120h para DCP 136)?',
    normativeRef: 'Art. 41, § 1º, III • Equivalência de Horas',
    label: 'Carga horária acumulada no exercício profissional igual ou superior à da disciplina requerida (≥ 180h Estágio A / ≥ 120h Estágio B) (Art. 41, § 1º, III)',
    iconName: 'clock',
  },
  {
    id: 'crit_fase2',
    shortTitle: '5. Memorial / Relatório Final de Atividades',
    question: 'Suas atividades laborais guardam consonância com o Projeto Pedagógico do Curso (PPC) para entrega do Relatório Final no Moodle?',
    normativeRef: 'Art. 41, § 1º, III • Avaliação Final',
    label: 'Final do Período: Relatório de Atividades circunstanciado com atesto da chefia demonstrando consonância com as competências do PPC (Art. 41, § 1º, III)',
    iconName: 'stamp',
  },
];

interface EmploymentMode {
  id: string;
  label: string;
  iconName: CagpIconName;
  desc: string;
}

const EMPLOYMENT_MODES: EmploymentMode[] = [
  { id: 'efetivo', label: 'Servidor Público Efetivo', iconName: 'shield', desc: 'Concursado federal, estadual ou municipal' },
  { id: 'comissao', label: 'Cargo em Comissão / DAD', iconName: 'passport', desc: 'Direção, chefia ou assessoramento em órgão público' },
  { id: 'clt_publico', label: 'Empregado Público (CLT)', iconName: 'file-text', desc: 'Empresas públicas e sociedades de economia mista' },
  { id: 'terceiro_setor', label: 'ONG / OSC de Interesse Público', iconName: 'building', desc: 'Atuação comprovada na gestão de projetos públicos' },
];

export const Art41SimulatorCore: React.FC = () => {
  const [checks, setChecks] = useState<VaultData<'cagp_art41_checklist_v1'>>({});
  const [selectedMode, setSelectedMode] = useState<string>('efetivo');
  const [serviceRange, setServiceRange] = useState<DateRange | undefined>(undefined);
  const [viewMode, setViewMode] = useState<'step' | 'list'>('step');
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);

  useEffect(() => {
    const raw = getVaultItem('cagp_art41_checklist_v1') || {};
    setChecks(raw);
  }, []);

  const setCheckValue = (id: string, val: boolean) => {
    const next = { ...checks, [id]: val };
    setChecks(next);
    setVaultItem('cagp_art41_checklist_v1', next);
  };

  const toggleCheck = (id: string) => {
    setCheckValue(id, !checks[id]);
  };

  const handleStepAnswer = (id: string, val: boolean) => {
    setCheckValue(id, val);
    if (activeQuestionIdx < ART41_CRITERIA.length - 1) {
      setActiveQuestionIdx((prev) => prev + 1);
    }
  };

  const checkedCount = ART41_CRITERIA.filter((c) => checks[c.id]).length;
  const isFullyEligible = checkedCount === ART41_CRITERIA.length;
  const progressPercent = Math.round((checkedCount / ART41_CRITERIA.length) * 100);
  const currentQuestion = ART41_CRITERIA[activeQuestionIdx];

  return (
    <div className="cagp-art41-simulator space-y-6 select-none text-foreground">
      {/* Cabeçalho do Simulador em Folha Contínua */}
      <div className="p-5 sm:p-6 bg-white border-3 border-border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-[#134E4A] text-white text-xs font-mono font-bold uppercase border border-border">
              Aproveitamento Servidor
            </span>
            <span className="text-xs font-heading uppercase font-bold tracking-wider text-secondary">
              Regulamento N-20229 • Art. 41
            </span>
          </div>
          <h3 className="font-heading text-base sm:text-lg font-black text-foreground m-0">
            Simulador de Aproveitamento Servidor (Dispensa Art. 41)
          </h3>
          <p className="font-sans text-xs text-muted-foreground mt-0.5 m-0 max-w-prose">
            Responda às 5 perguntas regimentais para verificar sua elegibilidade à dispensa das 300h (DCP 135 e DCP 136) e baixar os requerimentos oficiais.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <motion.span
            key={`${checkedCount}-${isFullyEligible}`}
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={bounceSpring}
            className={`px-3.5 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider tabular-nums border-2 border-border shadow-xs ${
              isFullyEligible
                ? 'bg-[#134E4A] text-white'
                : 'bg-white text-foreground'
            }`}
          >
            {checkedCount} de {ART41_CRITERIA.length} Requisitos ({progressPercent}%)
          </motion.span>
        </div>
      </div>

      {/* Seleção do Tipo de Vínculo com Física de Mola */}
      <div className="space-y-3">
        <span className="text-xs font-heading uppercase font-bold text-foreground block">
          1. Selecione seu Vínculo Profissional no Setor Público / OSC:
        </span>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
        >
          {EMPLOYMENT_MODES.map((m) => {
            const isSelected = selectedMode === m.id;
            return (
              <motion.button
                key={m.id}
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 2, y: 2 }}
                transition={tactileSpring}
                type="button"
                onClick={() => setSelectedMode(m.id)}
                aria-pressed={isSelected}
                className={`p-4 rounded-xl border-2 border-border text-left flex flex-col justify-between transition-colors min-h-[88px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'bg-[#134E4A] text-white shadow-sm'
                    : 'bg-white text-foreground hover:bg-muted shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <CagpIcon
                      name={m.iconName}
                      className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-[#134E4A]'}`}
                    />
                    <span className="font-heading text-xs font-bold uppercase tracking-wide">{m.label}</span>
                  </div>
                  {isSelected && (
                    <span className="px-1.5 py-0.5 rounded bg-white text-[#134E4A] font-mono text-xs font-black border border-border">
                      ATIVO
                    </span>
                  )}
                </div>
                <span className={`font-sans text-xs leading-tight ${isSelected ? 'text-white' : 'text-muted-foreground'}`}>
                  {m.desc}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Seletor de Período de Exercício (DateRangePicker) — Contêiner Aplanado Sem Sombra Concorrente */}
        <div className="p-4 bg-background border-2 border-border rounded-xl space-y-2">
          <label className="block text-xs font-heading font-bold uppercase text-foreground">
            Período de Exercício no Órgão (Início e Término na Declaração Funcional):
          </label>
          <DateRangePicker
            value={serviceRange}
            onChange={setServiceRange}
            placeholder="Selecione o intervalo de datas da declaração funcional..."
            className="w-full justify-start text-left font-sans bg-white border-2 border-border focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]"
          />
        </div>
      </div>

      {/* Checklist Interativo com Transições de Mola entre Perguntas */}
      <div className="p-5 sm:p-6 bg-white border-3 border-border rounded-xl space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-border pb-3 gap-3">
          <div>
            <span className="text-xs font-heading uppercase font-black text-foreground block">
              2. Verificação de Elegibilidade — Aproveitamento Servidor (Art. 41, §§ 1º a 3º):
            </span>
            <span className="text-xs text-muted-foreground font-mono font-bold">
              Progresso salvo automaticamente no seu Cofre Discente local
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('step')}
              className={`min-h-[44px] px-3 py-1.5 rounded-lg border-2 border-border font-heading text-xs font-extrabold uppercase cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
                viewMode === 'step'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white text-foreground hover:bg-muted'
              }`}
            >
              Passo a Passo
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`min-h-[44px] px-3 py-1.5 rounded-lg border-2 border-border font-heading text-xs font-extrabold uppercase cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
                viewMode === 'list'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white text-foreground hover:bg-muted'
              }`}
            >
              Lista Completa ({checkedCount}/5)
            </button>
          </div>
        </div>

        {/* Barra de Progresso Animada com Mola */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span>Progresso de Elegibilidade Art. 41</span>
            <span className="text-[#134E4A] tabular-nums">{progressPercent}% concluído</span>
          </div>
          <div className="w-full h-3.5 bg-[#f4f5f7] rounded-lg border-2 border-border overflow-hidden p-0.5">
            <motion.div
              className="h-full rounded bg-[#134E4A]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={tactileSpring}
            />
          </div>
        </div>

        {/* Navegador de Passos (Pílulas Táteis 44pt) */}
        {viewMode === 'step' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scroll-mask-x">
              {ART41_CRITERIA.map((crit, idx) => {
                const isCurrent = idx === activeQuestionIdx;
                const isDone = !!checks[crit.id];
                return (
                  <button
                    key={crit.id}
                    type="button"
                    onClick={() => setActiveQuestionIdx(idx)}
                    className={`min-h-[44px] px-3 py-1.5 rounded-xl border-2 border-border font-mono text-xs font-bold shrink-0 flex items-center gap-1.5 cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
                      isCurrent
                        ? 'bg-foreground text-background text-white shadow-xs'
                        : isDone
                        ? 'bg-[#134E4A] text-white'
                        : 'bg-white text-foreground hover:bg-muted'
                    }`}
                  >
                    <span>P{idx + 1}</span>
                    {isDone && <CagpIcon name="check" className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 24, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -24, scale: 0.98 }}
                transition={tactileSpring}
                className="p-5 rounded-xl border-2 border-border bg-[#f4f5f7] space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-white border-2 border-border font-mono text-xs font-bold uppercase text-foreground">
                    Pergunta {activeQuestionIdx + 1} de {ART41_CRITERIA.length} • {currentQuestion.normativeRef}
                  </span>
                  {checks[currentQuestion.id] && (
                    <motion.span
                      initial={{ scale: 0.7, rotate: -6 }}
                      animate={{ scale: 1, rotate: -2 }}
                      transition={bounceSpring}
                      className="px-2.5 py-1 rounded-md bg-[#134E4A] text-white font-mono text-xs font-bold uppercase border border-border shadow-xs"
                    >
                      REQUISITO ATENDIDO
                    </motion.span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-heading text-base sm:text-lg font-black text-foreground m-0">
                    {currentQuestion.shortTitle}
                  </h4>
                  <p className="font-sans text-sm text-foreground font-medium leading-relaxed m-0 max-w-prose">
                    {currentQuestion.question}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <motion.button
                    whileHover={{ x: -2, y: -2 }}
                    whileTap={{ x: 2, y: 2 }}
                    transition={tactileSpring}
                    type="button"
                    onClick={() => handleStepAnswer(currentQuestion.id, true)}
                    className={`min-h-[44px] px-4 py-2.5 rounded-xl border-2 border-border font-heading text-xs font-black uppercase tracking-wider cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      checks[currentQuestion.id]
                        ? 'bg-[#134E4A] text-white shadow-sm'
                        : 'bg-white text-foreground hover:bg-[#134E4A] hover:text-white shadow-xs'
                    }`}
                  >
                    <CagpIcon name="check" className="w-4 h-4" />
                    <span>Sim, cumpro este requisito</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ x: -2, y: -2 }}
                    whileTap={{ x: 2, y: 2 }}
                    transition={tactileSpring}
                    type="button"
                    onClick={() => handleStepAnswer(currentQuestion.id, false)}
                    className={`min-h-[44px] px-4 py-2.5 rounded-xl border-2 border-border font-heading text-xs font-black uppercase tracking-wider cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      !checks[currentQuestion.id]
                        ? 'bg-secondary text-white shadow-xs'
                        : 'bg-white text-foreground hover:bg-muted shadow-xs'
                    }`}
                  >
                    Ainda pendente
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className="min-h-[44px] px-3 py-2 ml-auto text-xs font-mono font-bold underline text-foreground hover:text-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                  >
                    Ver todos os 5 requisitos de uma vez
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Lista Completa dos 5 Critérios Normativos */}
        {viewMode === 'list' && (
          <motion.div
            className="space-y-3"
          >
            {ART41_CRITERIA.map((crit) => {
              const isChecked = !!checks[crit.id];
              return (
                <motion.label
                  key={crit.id}
                  whileTap={{ scale: 0.99 }}
                  className={`p-4 rounded-xl border-2 border-border flex items-start gap-3.5 cursor-pointer transition-colors shadow-xs ${
                    isChecked
                      ? 'bg-[#F0FDF4]'
                      : 'bg-white hover:bg-muted'
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`art41-${crit.id}`}
                    name={`art41-${crit.id}`}
                    checked={isChecked}
                    onChange={() => toggleCheck(crit.id)}
                    className="mt-0.5 w-5 h-5 accent-[#134E4A] rounded border-2 border-border cursor-pointer shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="font-heading text-xs font-black uppercase text-foreground block mb-0.5">
                      {crit.shortTitle}
                    </span>
                    <span className="font-sans text-xs text-foreground leading-relaxed font-medium block">
                      {crit.label}
                    </span>
                  </div>
                  <AnimatePresence>
                    {isChecked && (
                      <motion.span
                        initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
                        animate={{ scale: 1, opacity: 1, rotate: -2 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={bounceSpring}
                        className="px-2.5 py-1 rounded-lg bg-[#134E4A] text-white text-xs shrink-0 border border-border shadow-xs"
                      >
                        <span className="inline-flex items-center gap-1 font-mono font-bold text-white">
                          <CagpIcon name="check" className="w-3.5 h-3.5 inline text-white" />
                          <span>ATENDIDO</span>
                        </span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.label>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Banner de Resultado, Carimbo Verde Petróleo (#134E4A) & Download Direto dos Modelos */}
      <motion.div
        layout
        transition={tactileSpring}
        className={`p-5 sm:p-6 rounded-xl border-3 border-border shadow-md space-y-5 ${
          isFullyEligible
            ? 'bg-[#F0FDF4]'
            : 'bg-[#FFFBEB]'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <span
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 border-2 border-border shadow-xs ${
                isFullyEligible
                  ? 'bg-[#134E4A] text-white'
                  : 'bg-[#FE8812] text-foreground'
              }`}
            >
              <CagpIcon
                name={isFullyEligible ? 'check' : 'info'}
                className="w-6 h-6"
              />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="font-heading text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-md bg-white border border-border shadow-2xs">
                  {isFullyEligible ? 'Parecer: Aproveitamento Servidor Apto' : 'Simulação em Andamento'}
                </span>
                <span className="font-mono text-xs font-bold text-foreground">
                  Modalidade: {EMPLOYMENT_MODES.find((m) => m.id === selectedMode)?.label}
                </span>
              </div>
              <h4 className="font-heading text-base sm:text-lg font-black text-foreground m-0 mb-1">
                {isFullyEligible
                  ? 'Você Cumpre Todos os Requisitos do Aproveitamento Servidor (Art. 41)!'
                  : `Faltam ${ART41_CRITERIA.length - checkedCount} Critério(s) para o Aproveitamento Servidor (Art. 41)`}
              </h4>
              <p className="font-sans text-xs text-content-secondary leading-relaxed m-0 max-w-prose">
                {isFullyEligible
                  ? 'Você pode requerer a dispensa integral das 300h de estágio supervisionado (DCP 135 — 180h e DCP 136 — 120h). Baixe abaixo os modelos oficiais de Requerimento e Relatório de Atividades e protocole via Google Forms do Colegiado.'
                  : 'Marque os 5 critérios acima conforme reunir sua documentação funcional. Você já pode baixar os modelos oficiais de Requerimento e Relatório do Art. 41 abaixo para providenciar o atesto da sua chefia imediata.'}
              </p>
            </div>
          </div>

          {/* Carimbo de resultado: momento autoral (DESIGN.md › Carimbos). O key remonta e o impacto toca a cada mudança de estado. */}
          <div
            key={isFullyEligible ? 'stamp-eligible' : 'stamp-pending'}
            role="status"
            className={`cagp-big-stamp shrink-0 self-start sm:self-center text-center ${isFullyEligible ? '' : 'is-pendente'}`}
          >
            <span className="cagp-big-stamp-title">
              {isFullyEligible ? 'Dispensa deferível · 300h' : 'Requisitos pendentes'}
            </span>
            <span className="cagp-big-stamp-sub">Aproveitamento servidor · Art. 41</span>
          </div>
        </div>

        {/* Download Direto dos Modelos de Requerimento e Relatório Art. 41 — Painéis Aplanados Sem Cards Aninhados */}
        <div className="pt-4 border-t-2 border-border space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-heading text-xs font-black uppercase text-foreground flex items-center gap-1.5">
              <i className="bi bi-file-earmark-arrow-down-fill text-[#134E4A]" aria-hidden="true" />
              <span>Download Direto dos Modelos Oficiais — Aproveitamento Servidor (Art. 41):</span>
            </span>
            <span className="font-mono text-xs font-bold text-[#134E4A]">
              Arquivos Editáveis (.DOCX e .PDF)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border-2 border-border bg-white flex flex-col justify-between gap-2.5">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#134E4A] block">
                  FASE 1 • INÍCIO DO SEMESTRE
                </span>
                <h5 className="font-heading text-xs font-black uppercase text-foreground m-0">
                  Requerimento de Aproveitamento (Art. 41)
                </h5>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={asset('/documentos/estagio-requerimento-integralizacao-experiencia-profissional.docx')}
                  download
                  className="min-h-[44px] flex-1 px-3 py-2 rounded-lg border-2 border-border bg-[#134E4A] hover:bg-[#0f3d39] text-white font-mono text-xs font-bold no-underline inline-flex items-center justify-center gap-1.5 shadow-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
                >
                  <i className="bi bi-file-earmark-word" aria-hidden="true" />
                  <span>Baixar .DOCX</span>
                </a>
                <a
                  href={asset('/documentos/estagio-requerimento-integralizacao-experiencia-profissional.pdf')}
                  download
                  className="min-h-[44px] px-3 py-2 rounded-lg border-2 border-border bg-white hover:bg-muted text-foreground font-mono text-xs font-bold no-underline inline-flex items-center justify-center gap-1.5 shadow-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
                >
                  <i className="bi bi-file-earmark-pdf text-secondary" aria-hidden="true" />
                  <span>.PDF</span>
                </a>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border-2 border-border bg-white flex flex-col justify-between gap-2.5">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-primary block">
                  FASE 2 • FINAL DO SEMESTRE (MOODLE)
                </span>
                <h5 className="font-heading text-xs font-black uppercase text-foreground m-0">
                  Relatório de Atividades Profissionais
                </h5>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={asset('/documentos/estagio-relatorio-atividades-experiencia-profissional.docx')}
                  download
                  className="min-h-[44px] flex-1 px-3 py-2 rounded-lg border-2 border-border bg-primary hover:bg-[#49216C] text-white font-mono text-xs font-bold no-underline inline-flex items-center justify-center gap-1.5 shadow-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
                >
                  <i className="bi bi-file-earmark-word" aria-hidden="true" />
                  <span>Baixar .DOCX</span>
                </a>
                <a
                  href={asset('/documentos/estagio-relatorio-atividades-experiencia-profissional.pdf')}
                  download
                  className="min-h-[44px] px-3 py-2 rounded-lg border-2 border-border bg-white hover:bg-muted text-foreground font-mono text-xs font-bold no-underline inline-flex items-center justify-center gap-1.5 shadow-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
                >
                  <i className="bi bi-file-earmark-pdf text-secondary" aria-hidden="true" />
                  <span>.PDF</span>
                </a>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border-2 border-border bg-white flex flex-col justify-between gap-2.5">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-secondary block">
                  PROTOCOLO ELETRÔNICO COLEGIADO
                </span>
                <h5 className="font-heading text-xs font-black uppercase text-foreground m-0">
                  Submissão Oficial via Google Forms
                </h5>
              </div>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdIGMGFzJMsnyLTvkDTDVPQddU37S_OO1ABuQbMv5F3wElKLA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] w-full px-3 py-2 rounded-lg border-2 border-border bg-[#FE8812] hover:bg-[#e67600] text-foreground font-heading text-xs font-black uppercase no-underline inline-flex items-center justify-center gap-1.5 shadow-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
              >
                <span>Protocolar Requerimento ↗</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
