// src/components/features/carreira/FormandoRetaFinalHub.tsx — Painel Visual Unificado para a Persona Formando (Estágio 300h + TCC 180h + Colação de Grau)
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  getVaultItem,
  setVaultItem,
  type VaultData,
  type UserRole,
} from '@/lib/storage/studentVault';
import { asset, route } from '@/lib/paths';
import { tactileSpring, bounceSpring, staggerContainer, staggerItem } from '@/lib/motion';
import { toast } from '@/lib/toast';
import { EXTENSION_ITEMS, AAC_ITEMS } from '@/components/features/acg/calculator/acgCatalog';

import { ETAPA_DISCIPLINA, RETA_FINAL_STEPS } from '@/lib/retaFinal';

const somaHoras = (itens: { key: string }[], dados: Record<string, number>) =>
  itens.reduce((acc, it) => acc + (Number(dados[it.key]) || 0), 0);

export const FormandoRetaFinalHub: React.FC = () => {
  const [checks, setChecks] = useState<VaultData<'cagp_reta_final_checklist_v1'>>({});
  const [art41Checks, setArt41Checks] = useState<VaultData<'cagp_art41_checklist_v1'>>({});
  const [userRole, setUserRole] = useState<UserRole>('formando');
  // O que o site já sabe: disciplinas marcadas em Meu curso e horas da lista de atividades.
  const [cursadas, setCursadas] = useState<string[]>([]);
  const [calc, setCalc] = useState<Record<string, number>>({});
  const [activeFilter, setActiveFilter] = useState<'all' | 'estagio' | 'tcc' | 'colacao'>('all');

  useEffect(() => {
    const loadVault = () => {
      setChecks(getVaultItem('cagp_reta_final_checklist_v1') || {});
      setArt41Checks(getVaultItem('cagp_art41_checklist_v1') || {});
      setUserRole(getVaultItem('cagp_user_role_v1') || 'formando');
      setCursadas(getVaultItem('cagp_minha_grade_v1')?.savedCourses ?? []);
      setCalc(getVaultItem('cagp_calc_ext_aac_v1') ?? {});
    };
    loadVault();
    window.addEventListener('cagp:vault-updated', loadVault);
    window.addEventListener('storage', loadVault);
    return () => {
      window.removeEventListener('cagp:vault-updated', loadVault);
      window.removeEventListener('storage', loadVault);
    };
  }, []);

  const toggleStep = (id: string) => {
    const next = { ...checks, [id]: !checks[id] };
    setChecks(next);
    setVaultItem('cagp_reta_final_checklist_v1', next);
  };

  const activateFormandoPersona = () => {
    setVaultItem('cagp_user_role_v1', 'formando');
    setUserRole('formando');
    toast.success('Modo "Sou Formando(a)" ativado no seu Passaporte Discente!');
  };

  const markCategoryDone = (category: 'estagio' | 'tcc' | 'colacao') => {
    const next = { ...checks };
    RETA_FINAL_STEPS.filter((s) => s.category === category).forEach((s) => {
      next[s.id] = true;
    });
    setChecks(next);
    setVaultItem('cagp_reta_final_checklist_v1', next);
    toast.success('Pronto: etapas marcadas como feitas.');
  };

  // Feita = marcada aqui OU já marcada na grade de Meu curso (um dado, um dono).
  const naGrade = (id: string) => Boolean(ETAPA_DISCIPLINA[id] && cursadas.includes(ETAPA_DISCIPLINA[id]));
  const feita = (id: string) => Boolean(checks[id]) || naGrade(id);
  const extH = Math.min(300, somaHoras(EXTENSION_ITEMS, calc));
  const aacH = Math.min(300, somaHoras(AAC_ITEMS, calc));

  const completedTotal = RETA_FINAL_STEPS.filter((s) => feita(s.id)).length;
  const totalSteps = RETA_FINAL_STEPS.length;
  const progressPct = Math.round((completedTotal / totalSteps) * 100);
  const isGradReady = completedTotal === totalSteps;

  const estagioDone = RETA_FINAL_STEPS.filter((s) => s.category === 'estagio' && feita(s.id)).length;
  const tccDone = RETA_FINAL_STEPS.filter((s) => s.category === 'tcc' && feita(s.id)).length;
  const colacaoDone = RETA_FINAL_STEPS.filter((s) => s.category === 'colacao' && feita(s.id)).length;
  const art41Count = Object.values(art41Checks).filter(Boolean).length;

  const filteredSteps =
    activeFilter === 'all'
      ? RETA_FINAL_STEPS
      : RETA_FINAL_STEPS.filter((s) => s.category === activeFilter);

  return (
    <div className="cagp-formando-reta-final-hub space-y-6 select-none text-foreground font-sans">
      {/* Cockpit Superior da Persona Formando */}
      <div className="p-5 sm:p-6 rounded-xl border-2 border-border bg-white shadow-md space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b-3 border-border pb-4">
          <div className="space-y-1.5">
            <h2 className="font-heading text-lg sm:text-2xl font-black text-foreground m-0">
              Checklist da reta final e da colação de grau
            </h2>
            <p className="m-0 mt-1 text-sm text-muted-foreground">Para quem está do 8º ao 10º período.</p>
            <p className="font-sans text-xs sm:text-sm text-muted-foreground m-0 max-w-3xl leading-relaxed">
              Acompanhe em uma única tela suas obrigações de <strong>Estágio Supervisionado (300h / Art. 41)</strong>, <strong>TCC (180h / Art. 19)</strong> e <strong>Colação de Grau no DRCA</strong>. Fica tudo salvo neste celular.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {userRole !== 'formando' ? (
              <motion.button
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 2, y: 2 }}
                transition={tactileSpring}
                type="button"
                onClick={activateFormandoPersona}
                className="min-h-[44px] px-4 py-2.5 rounded-xl border-3 border-border bg-accent hover:bg-accent-hover text-foreground font-heading text-xs font-black uppercase shadow-sm cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Ativar Modo Formando no App
              </motion.button>
            ) : (
              <span className="min-h-[44px] px-3.5 py-2 rounded-xl border-3 border-border bg-success-tint text-petroleo-deep font-mono text-xs font-bold inline-flex items-center gap-1.5 shadow-xs">
                <i className="bi bi-check-circle-fill text-emerald-600" aria-hidden="true" />
                <span>Perfil Formando Ativo</span>
              </span>
            )}
          </div>
        </div>

        {/* 3 Cards de Status Integrados (Estágio 300h, TCC 180h, Colação & 600h) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border-2 border-border bg-card shadow-sm flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-mono text-xs font-bold uppercase text-petroleo-deep">
                  PILAR 1 • ESTÁGIO 300h
                </span>
                <span className="px-2 py-0.5 rounded bg-white border-2 border-border font-mono text-xs font-bold">
                  {estagioDone}/3 Marcos
                </span>
              </div>
              <h3 className="font-heading text-sm font-black text-foreground m-0">
                DCP 135 + DCP 136 ou Art. 41
              </h3>
              <p className="font-sans text-xs text-muted-foreground mt-1 m-0">
                Aproveitamento Servidor: <strong>{art41Count}/5 requisitos</strong> marcados no simulador.
              </p>
            </div>
            <div className="flex items-center justify-between gap-2 pt-2 border-t-2 border-border">
              <a
                href={route('/estagio')}
                className="min-h-[44px] px-3 py-2 rounded-lg border-2 border-border bg-white hover:bg-muted text-foreground font-heading text-xs font-bold uppercase no-underline inline-flex items-center gap-1.5 shadow-2xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 transition-all"
              >
                <span>Ir para Estágio</span>
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => markCategoryDone('estagio')}
                className="min-h-[44px] px-2.5 py-1.5 rounded-lg border-2 border-border bg-petroleo-deep hover:bg-petroleo-deep text-white font-mono text-xs font-bold uppercase cursor-pointer shadow-2xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroleo-deep focus-visible:ring-offset-1 transition-all"
              >
                Concluir 3/3
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl border-2 border-border bg-card shadow-sm flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-mono text-xs font-bold uppercase text-secondary">
                  PILAR 2 • TCC 180h (ART. 19)
                </span>
                <span className="px-2 py-0.5 rounded bg-white border-2 border-border font-mono text-xs font-bold">
                  {tccDone}/4 Marcos
                </span>
              </div>
              <h3 className="font-heading text-sm font-black text-foreground m-0">
                Projeto (DCP 089) &amp; Defesa (DCP 137)
              </h3>
              <p className="font-sans text-xs text-muted-foreground mt-1 m-0">
                Termo de Aceite + escolha entre Monografia, Artigo, Intervenção ou IC.
              </p>
            </div>
            <div className="flex items-center justify-between gap-2 pt-2 border-t-2 border-border">
              <a
                href={route('/tcc')}
                className="min-h-[44px] px-3 py-2 rounded-lg border-2 border-border bg-white hover:bg-muted text-foreground font-heading text-xs font-bold uppercase no-underline inline-flex items-center gap-1.5 shadow-2xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 transition-all"
              >
                <span>Ir para Manual TCC</span>
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => markCategoryDone('tcc')}
                className="min-h-[44px] px-2.5 py-1.5 rounded-lg border-2 border-border bg-secondary hover:bg-secondary-hover text-white font-mono text-xs font-bold uppercase cursor-pointer shadow-2xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1 transition-all"
              >
                Concluir 4/4
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl border-2 border-border bg-card shadow-sm flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-mono text-xs font-bold uppercase text-primary">
                  PILAR 3 • COLAÇÃO &amp; CARREIRA
                </span>
                <span className="px-2 py-0.5 rounded bg-white border-2 border-border font-mono text-xs font-bold">
                  {colacaoDone}/3 Marcos
                </span>
              </div>
              <h3 className="font-heading text-sm font-black text-foreground m-0">
                600h, Nada Consta &amp; Diploma
              </h3>
              <p className="font-sans text-xs text-muted-foreground mt-1 m-0">
                Protocolo final das 600h, regularidade no ENADE e Banco de Talentos GP.
              </p>
            </div>
            <div className="flex items-center justify-between gap-2 pt-2 border-t-2 border-border">
              <a
                href={route('/carreira/talentos')}
                className="min-h-[44px] px-3 py-2 rounded-lg border-2 border-border bg-white hover:bg-muted text-foreground font-heading text-xs font-bold uppercase no-underline inline-flex items-center gap-1.5 shadow-2xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 transition-all"
              >
                <span>Banco de Talentos</span>
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => markCategoryDone('colacao')}
                className="min-h-[44px] px-2.5 py-1.5 rounded-lg border-2 border-border bg-primary hover:bg-primary-hover text-white font-mono text-xs font-bold uppercase cursor-pointer shadow-2xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 transition-all"
              >
                Concluir 3/3
              </button>
            </div>
          </div>
        </div>

        {/* Barra de Progresso Geral Animada com Delight */}
        <div className="p-4 sm:p-5 rounded-xl border-2 border-border bg-white shadow-sm space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-heading text-xs sm:text-sm font-black uppercase text-foreground">
              Progresso Geral Rumo à Colação de Grau: {completedTotal} de {totalSteps} Etapas Concluídas
            </span>
            <motion.span
              key={progressPct}
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              transition={bounceSpring}
              className={`px-3 py-1 rounded-lg border-2 border-border font-mono text-xs font-black shadow-2xs ${
                isGradReady
                  ? 'bg-petroleo-deep text-white'
                  : 'bg-accent text-foreground'
              }`}
            >
              {isGradReady ? '100% PRONTO P/ FORMATURA' : `${progressPct}% INTEGRALIZADO`}
            </motion.span>
          </div>
          <div className="w-full h-4 bg-muted rounded-lg border-2 border-border overflow-hidden p-0.5">
            <motion.div
              className={`h-full rounded transition-colors ${isGradReady ? 'bg-emerald-600' : 'bg-petroleo-deep'}`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={tactileSpring}
            />
          </div>

          {/* Delight: Momento de Celebração de Formaturo quando 10/10 concluído */}
          {isGradReady && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-lg bg-emerald-50 border-2 border-emerald-600 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5">
                <i className="bi bi-mortarboard-fill text-xl" aria-hidden="true" />
                <p className="text-xs font-sans font-bold m-0 leading-tight">
                  <strong>Parabéns! Todos os 10 requisitos de Estágio, TCC e Colação estão homologados.</strong>
                  <span className="block font-medium text-emerald-800 text-xs mt-0.5">
                    Certifique-se de assinar a ata de formatura na Seção de Ensino da FAFICH e cadastrar seu currículo no Banco de Talentos.
                  </span>
                </p>
              </div>
              <a
                href={route('/carreira/talentos')}
                className="min-h-[36px] px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-heading text-xs font-black uppercase no-underline inline-flex items-center justify-center gap-1.5 shrink-0 shadow-2xs"
              >
                <span>Exportar Currículo</span>
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </a>
            </motion.div>
          )}
        </div>
      </div>

      {/* Filtros de Categoria e Lista Interativa Animada */}
      <div className="p-5 sm:p-6 rounded-xl border-2 border-border bg-white shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-3 border-border pb-4">
          <div>
            <h3 className="font-heading text-base sm:text-lg font-black text-foreground m-0">
              Checklist Completo de Formatura (10 Marcos Regimentais)
            </h3>
            <p className="font-sans text-xs text-muted-foreground m-0 mt-0.5">
              Toque em cada requisito quando concluir: ele ganha o carimbo.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scroll-mask-x">
            {[
              { id: 'all', label: `Todas (${totalSteps})` },
              { id: 'estagio', label: `Estágio 300h (${estagioDone}/3)` },
              { id: 'tcc', label: `TCC 180h (${tccDone}/4)` },
              { id: 'colacao', label: `Colação (${colacaoDone}/3)` },
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`min-h-[44px] px-3.5 py-2 rounded-xl border-2 border-border font-heading text-xs font-extrabold uppercase shrink-0 cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 active:translate-x-0.5 active:translate-y-0.5 ${
                    isActive
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-white text-foreground hover:bg-muted'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div className="space-y-3.5">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredSteps.map((step) => {
              const auto = naGrade(step.id);
              const isDone = feita(step.id);
              return (
                <motion.div
                  layout
                  key={step.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={tactileSpring}
                  className={`p-4 sm:p-5 rounded-xl border-2 border-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                    isDone ? 'bg-success-tint' : 'bg-white'
                  }`}
                >
                  <label className="flex items-start gap-3.5 cursor-pointer flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={isDone}
                      disabled={auto}
                      onChange={() => toggleStep(step.id)}
                      className="mt-1 w-5 h-5 accent-[#134E4A] rounded border-2 border-border cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-border text-white font-mono text-xs font-bold uppercase">
                          {step.categoryLabel}
                        </span>
                        <span className="font-mono text-xs font-bold text-secondary">
                          {step.periodTag}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground font-medium">
                          • {step.normativeRef}
                        </span>
                      </div>
                      <h4
                        className={`font-heading text-sm font-black m-0 leading-snug ${
                          isDone ? 'line-through text-content-secondary' : 'text-foreground'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="font-sans text-xs text-muted-foreground leading-relaxed m-0 font-medium">
                        {step.desc}
                      </p>
                      {auto && (
                        <p className="font-sans text-xs text-foreground leading-relaxed m-0 font-bold">
                          {ETAPA_DISCIPLINA[step.id]} já está marcada em{' '}
                          <a href={route('/meu-curso')} className="text-primary underline underline-offset-2">Meu curso</a>. Pra desfazer, desmarque lá.
                        </p>
                      )}
                      {step.id === 'rf_colacao_600h' && (
                        <p className="font-sans text-xs text-foreground leading-relaxed m-0 font-bold tabular-nums">
                          Nas suas atividades: {extH} de 300h de extensão e {aacH}h de AAC.{' '}
                          <a href={route('/meu-curso') + '#atividades'} className="text-primary underline underline-offset-2">Abrir minhas atividades</a>
                        </p>
                      )}
                    </div>
                  </label>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0 pl-8 md:pl-0">
                    {isDone && (
                      <motion.span
                        initial={{ scale: 0.6, rotate: -8 }}
                        animate={{ scale: 1, rotate: -2 }}
                        transition={bounceSpring}
                        className="px-2.5 py-1.5 rounded-lg border-2 border-border bg-petroleo-deep text-white font-mono text-xs font-black uppercase shadow-2xs"
                      >
                        {auto ? 'NA SUA GRADE' : 'HOMOLOGADO'}
                      </motion.span>
                    )}
                    {step.actionHref && (
                      <a
                        href={step.actionHref}
                        download={step.isDownload ? true : undefined}
                        className="min-h-[44px] px-3.5 py-2 rounded-xl border-2 border-border bg-white hover:bg-muted text-foreground font-heading text-xs font-extrabold uppercase no-underline inline-flex items-center gap-1.5 shadow-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                      >
                        <span>{step.actionLabel}</span>
                        <i
                          className={`bi ${step.isDownload ? 'bi-download' : 'bi-arrow-right'} text-xs`}
                          aria-hidden="true"
                        />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Kit Rápido de Downloads para Formandos & Chamada Eleitoral Chapa Semente */}
      <div className="p-5 sm:p-6 rounded-xl border-2 border-border bg-card shadow-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <h4 className="font-heading text-base sm:text-lg font-black text-foreground m-0 pt-1">
            Formar sem burocracia é direito de todo estudante do noturno
          </h4>
          <p className="font-sans text-xs text-content-secondary leading-relaxed m-0 font-medium">
            A <strong>Chapa Semente</strong> construiu esta tela antes mesmo da eleição para que nenhum formando perca prazos de TCE, Aproveitamento Servidor (Art. 41) ou depósito de TCC.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto">
          <a
            href={route('/carreira')}
            className="min-h-[44px] flex-1 lg:flex-none px-4 py-2.5 rounded-xl border-3 border-border bg-white hover:bg-muted text-foreground font-heading text-xs font-black uppercase no-underline inline-flex items-center justify-center gap-2 shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
          >
            <i className="bi bi-briefcase-fill text-primary" aria-hidden="true" />
            <span>Carreira</span>
          </a>
          <a
            href={route('/chapa-semente')}
            className="min-h-[44px] flex-1 lg:flex-none px-4 py-2.5 rounded-xl border-3 border-border bg-primary hover:bg-primary-hover text-white font-heading text-xs font-black uppercase no-underline inline-flex items-center justify-center gap-2 shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
          >
            <span>Conhecer as 14 Propostas</span>
            <i className="bi bi-arrow-right" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};
