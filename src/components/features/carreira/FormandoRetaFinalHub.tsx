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
import { toast } from 'sonner';

interface RetaFinalStep {
  id: string;
  category: 'estagio' | 'tcc' | 'colacao';
  categoryLabel: string;
  periodTag: string;
  title: string;
  desc: string;
  normativeRef: string;
  actionHref?: string;
  actionLabel?: string;
  isDownload?: boolean;
}

const RETA_FINAL_STEPS: RetaFinalStep[] = [
  {
    id: 'rf_estagio_plano',
    category: 'estagio',
    categoryLabel: 'Estágio 300h',
    periodTag: '7º Período • DCP 135',
    title: '1. Homologar TCE + Plano de Atividades ou Protocolar Aproveitamento Servidor (Art. 41)',
    desc: 'Submeter via Google Forms do Colegiado o Termo de Compromisso assinado ou o Requerimento de Aproveitamento Servidor com declaração da chefia.',
    normativeRef: 'Arts. 29 e 41 • Regulamento N-20229',
    actionHref: route('/estagio') + '#art41',
    actionLabel: 'Simular Art. 41',
  },
  {
    id: 'rf_estagio_dcp135',
    category: 'estagio',
    categoryLabel: 'Estágio 300h',
    periodTag: '7º Período • 180h',
    title: '2. Integralizar Estágio Supervisionado A (DCP 135 — 180h / 12 créditos)',
    desc: 'Entregar o Relatório Parcial/Semestral ou Memorial de Experiência Profissional no Moodle para fechamento da nota de DCP 135.',
    normativeRef: 'Resolução GP nº 01/2019',
    actionHref: asset('/documentos/estagio-modelo-relatorio-semestral.docx'),
    actionLabel: 'Modelo Relatório (.DOCX)',
    isDownload: true,
  },
  {
    id: 'rf_estagio_dcp136',
    category: 'estagio',
    categoryLabel: 'Estágio 300h',
    periodTag: '8º Período • 120h',
    title: '3. Integralizar Estágio Supervisionado B (DCP 136 — 120h / 8 créditos)',
    desc: 'Concluir as 300h obrigatórias com a aprovação do Relatório Final de Estágio ou Relatório de Atividades do Art. 41.',
    normativeRef: 'Total: 300h (20 créditos)',
    actionHref: asset('/documentos/estagio-modelo-relatorio-final.docx'),
    actionLabel: 'Relatório Final (.DOCX)',
    isDownload: true,
  },
  {
    id: 'rf_tcc_orientador',
    category: 'tcc',
    categoryLabel: 'TCC 180h',
    periodTag: 'Pré-9º Período',
    title: '4. Colher Assinatura no Termo de Aceite de Orientador(a) de TCC',
    desc: 'Formalizar o aceite com docente do DCP (respeitando o limite de 4 orientandos por professor) e entregar na Secretaria (Sala F-2039) antes da matrícula em DCP 089.',
    normativeRef: 'Arts. 21 e 22 • Obrigatório para DCP 089',
    actionHref: asset('/documentos/termo-aceite-orientador-tcc.pdf'),
    actionLabel: 'Modelo de Aceite (PDF)',
    isDownload: true,
  },
  {
    id: 'rf_tcc_dcp089',
    category: 'tcc',
    categoryLabel: 'TCC 180h',
    periodTag: '9º Período • 60h',
    title: '5. Aprovação no Projeto de TCC (DCP 089 — 60h / 4 créditos)',
    desc: 'Definir uma das 4 modalidades do Art. 19 (Monografia, Artigo Científico, Intervenção Governamental ou IC) e qualificar o projeto.',
    normativeRef: 'Art. 19 • 4 Modalidades',
    actionHref: route('/tcc') + '#modalidades',
    actionLabel: 'Comparar Modalidades',
  },
  {
    id: 'rf_tcc_banca',
    category: 'tcc',
    categoryLabel: 'TCC 180h',
    periodTag: '10º Período • 120h',
    title: '6. Defesa Pública perante Banca Examinadora (DCP 137 — 120h / 8 créditos)',
    desc: 'Depositar a versão de defesa até 15 dias antes da sessão pública e obter nota igual ou superior a 60 pontos perante a banca (orientador + avaliador).',
    normativeRef: 'Arts. 24 a 27 • Regulamento N-20229',
    actionHref: route('/tcc') + '#cronograma',
    actionLabel: 'Ver Linha do Tempo',
  },
  {
    id: 'rf_tcc_deposito',
    category: 'tcc',
    categoryLabel: 'TCC 180h',
    periodTag: 'Pós-Defesa • F-2039',
    title: '7. Depósito da Versão Final em PDF e Ficha Catalográfica',
    desc: 'Incorporar as recomendações da banca e enviar o PDF definitivo à Secretaria do Colegiado para emissão da ata de conclusão.',
    normativeRef: 'Art. 28 • Homologação Final',
    actionHref: route('/tcc') + '#termo-aceite',
    actionLabel: 'Regras de Depósito',
  },
  {
    id: 'rf_colacao_600h',
    category: 'colacao',
    categoryLabel: 'Colação & DRCA',
    periodTag: 'Até o 9º/10º Período',
    title: '8. Protocolar 300h de Extensão + 300h de AAC (Respeitando os 120 Dias)',
    desc: 'Confirmar que todos os certificados de formação livre, eventos e extensão foram lançados no SIGA sem prescrição pelo Art. 15.',
    normativeRef: '600h Flexíveis • PPC 2020',
    actionHref: route('/acg'),
    actionLabel: 'Abrir Calculadora 600h',
  },
  {
    id: 'rf_colacao_enade',
    category: 'colacao',
    categoryLabel: 'Colação & DRCA',
    periodTag: 'Semestre de Formatura',
    title: '9. Regularidade no ENADE, Nada Consta da Biblioteca e Quitação Eleitoral',
    desc: 'Verificar ausência de pendências no Sistema de Bibliotecas UFMG, Questionário do Estudante ENADE (se ano de ciclo) e dados civis no SIGA.',
    normativeRef: 'Exigência DRCA / UFMG',
    actionHref: route('/documentos'),
    actionLabel: 'Ver Prazos DRCA',
  },
  {
    id: 'rf_colacao_assinatura',
    category: 'colacao',
    categoryLabel: 'Colação & DRCA',
    periodTag: 'Solenidade FAFICH',
    title: '10. Requerimento de Colação de Grau na Seção de Ensino & Cadastro no Banco de Talentos',
    desc: 'Assinar a lista oficial de prováveis formandos da FAFICH e cadastrar seu currículo no Banco de Talentos de Gestão Pública.',
    normativeRef: 'Diploma de Bacharel em Gestão Pública',
    actionHref: route('/carreira') + '#talentos',
    actionLabel: 'Cadastrar Currículo',
  },
];

export const FormandoRetaFinalHub: React.FC = () => {
  const [checks, setChecks] = useState<VaultData<'cagp_reta_final_checklist_v1'>>({});
  const [art41Checks, setArt41Checks] = useState<VaultData<'cagp_art41_checklist_v1'>>({});
  const [userRole, setUserRole] = useState<UserRole>('formando');
  const [activeFilter, setActiveFilter] = useState<'all' | 'estagio' | 'tcc' | 'colacao'>('all');

  useEffect(() => {
    const loadVault = () => {
      setChecks(getVaultItem('cagp_reta_final_checklist_v1') || {});
      setArt41Checks(getVaultItem('cagp_art41_checklist_v1') || {});
      setUserRole(getVaultItem('cagp_user_role_v1') || 'formando');
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
    toast.success('Etapas marcadas como concluídas no cofre local!');
  };

  const completedTotal = RETA_FINAL_STEPS.filter((s) => checks[s.id]).length;
  const totalSteps = RETA_FINAL_STEPS.length;
  const progressPct = Math.round((completedTotal / totalSteps) * 100);
  const isGradReady = completedTotal === totalSteps;

  const estagioDone = RETA_FINAL_STEPS.filter((s) => s.category === 'estagio' && checks[s.id]).length;
  const tccDone = RETA_FINAL_STEPS.filter((s) => s.category === 'tcc' && checks[s.id]).length;
  const colacaoDone = RETA_FINAL_STEPS.filter((s) => s.category === 'colacao' && checks[s.id]).length;
  const art41Count = Object.values(art41Checks).filter(Boolean).length;

  const filteredSteps =
    activeFilter === 'all'
      ? RETA_FINAL_STEPS
      : RETA_FINAL_STEPS.filter((s) => s.category === activeFilter);

  return (
    <div className="cagp-formando-reta-final-hub space-y-6 select-none text-foreground">
      {/* Cockpit Superior da Persona Formando */}
      <div className="p-5 sm:p-6 rounded-xl border-3 border-[#16181d] bg-white shadow-[6px_6px_0_0_#16181d] space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b-3 border-[#16181d] pb-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md border-2 border-[#16181d] bg-primary text-white font-mono text-[11px] font-bold uppercase shadow-[2px_2px_0_0_#16181d]">
                Persona: Formando (8º ao 10º Período)
              </span>
              <span className="px-2.5 py-1 rounded-md border-2 border-[#16181d] bg-[#134E4A] text-white font-mono text-[11px] font-bold uppercase">
                Estágio 300h + TCC 180h + Colação
              </span>
            </div>
            <h2 className="font-head text-lg sm:text-2xl font-black uppercase text-foreground m-0">
              Checklist Reta Final &amp; Painel Integrado de Colação de Grau
            </h2>
            <p className="font-body text-xs sm:text-sm text-muted-foreground m-0 max-w-3xl">
              Acompanhe em uma única tela suas obrigações de <strong>Estágio Supervisionado (300h / Art. 41)</strong>, <strong>TCC (180h / Art. 19)</strong> e <strong>Colação de Grau no DRCA</strong>, com salvamento automático no cofre local.
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
                className="min-h-[44px] px-4 py-2.5 rounded-xl border-3 border-[#16181d] bg-[#FF8811] text-[#16181d] font-head text-xs font-black uppercase shadow-[3px_3px_0_0_#16181d] cursor-pointer"
              >
                Ativar Modo Formando no App
              </motion.button>
            ) : (
              <span className="min-h-[44px] px-3.5 py-2 rounded-xl border-3 border-[#16181d] bg-[#F0FDF4] text-[#134E4A] font-mono text-xs font-bold inline-flex items-center gap-1.5 shadow-[3px_3px_0_0_#16181d]">
                <i className="bi bi-check-circle-fill" aria-hidden="true" />
                <span>Perfil Formando Ativo</span>
              </span>
            )}
          </div>
        </div>

        {/* 3 Cards de Status Integrados (Estágio 300h, TCC 180h, Colação & 600h) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border-3 border-[#16181d] bg-[#f4f0ea] shadow-[4px_4px_0_0_#16181d] flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-mono text-[11px] font-bold uppercase text-[#134E4A]">
                  PILAR 1 • ESTÁGIO 300h
                </span>
                <span className="px-2 py-0.5 rounded bg-white border-2 border-[#16181d] font-mono text-xs font-bold">
                  {estagioDone}/3 Marcos
                </span>
              </div>
              <h3 className="font-head text-sm font-black uppercase text-foreground m-0">
                DCP 135 + DCP 136 ou Art. 41
              </h3>
              <p className="font-body text-xs text-muted-foreground mt-1 m-0">
                Aproveitamento Servidor: <strong>{art41Count}/5 requisitos</strong> marcados no simulador.
              </p>
            </div>
            <div className="flex items-center justify-between gap-2 pt-2 border-t-2 border-[#16181d]/20">
              <a
                href={route('/estagio')}
                className="min-h-[44px] px-3 py-2 rounded-lg border-2 border-[#16181d] bg-white hover:bg-muted text-foreground font-head text-xs font-bold uppercase no-underline inline-flex items-center gap-1.5 shadow-[2px_2px_0_0_#16181d]"
              >
                <span>Ir para Estágio</span>
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => markCategoryDone('estagio')}
                className="min-h-[44px] px-2.5 py-1.5 rounded-lg border-2 border-[#16181d] bg-[#134E4A] text-white font-mono text-[11px] font-bold uppercase cursor-pointer"
              >
                Concluir 3/3
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl border-3 border-[#16181d] bg-[#f4f0ea] shadow-[4px_4px_0_0_#16181d] flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-mono text-[11px] font-bold uppercase text-secondary">
                  PILAR 2 • TCC 180h (ART. 19)
                </span>
                <span className="px-2 py-0.5 rounded bg-white border-2 border-[#16181d] font-mono text-xs font-bold">
                  {tccDone}/4 Marcos
                </span>
              </div>
              <h3 className="font-head text-sm font-black uppercase text-foreground m-0">
                Projeto (DCP 089) &amp; Defesa (DCP 137)
              </h3>
              <p className="font-body text-xs text-muted-foreground mt-1 m-0">
                Termo de Aceite + escolha entre Monografia, Artigo, Intervenção ou IC.
              </p>
            </div>
            <div className="flex items-center justify-between gap-2 pt-2 border-t-2 border-[#16181d]/20">
              <a
                href={route('/tcc')}
                className="min-h-[44px] px-3 py-2 rounded-lg border-2 border-[#16181d] bg-white hover:bg-muted text-foreground font-head text-xs font-bold uppercase no-underline inline-flex items-center gap-1.5 shadow-[2px_2px_0_0_#16181d]"
              >
                <span>Ir para Manual TCC</span>
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => markCategoryDone('tcc')}
                className="min-h-[44px] px-2.5 py-1.5 rounded-lg border-2 border-[#16181d] bg-secondary text-white font-mono text-[11px] font-bold uppercase cursor-pointer"
              >
                Concluir 4/4
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl border-3 border-[#16181d] bg-[#f4f0ea] shadow-[4px_4px_0_0_#16181d] flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-mono text-[11px] font-bold uppercase text-primary">
                  PILAR 3 • COLAÇÃO &amp; CARREIRA
                </span>
                <span className="px-2 py-0.5 rounded bg-white border-2 border-[#16181d] font-mono text-xs font-bold">
                  {colacaoDone}/3 Marcos
                </span>
              </div>
              <h3 className="font-head text-sm font-black uppercase text-foreground m-0">
                600h, Nada Consta &amp; Diploma
              </h3>
              <p className="font-body text-xs text-muted-foreground mt-1 m-0">
                Protocolo final das 600h, regularidade no ENADE e Banco de Talentos GP.
              </p>
            </div>
            <div className="flex items-center justify-between gap-2 pt-2 border-t-2 border-[#16181d]/20">
              <a
                href={route('/carreira')}
                className="min-h-[44px] px-3 py-2 rounded-lg border-2 border-[#16181d] bg-white hover:bg-muted text-foreground font-head text-xs font-bold uppercase no-underline inline-flex items-center gap-1.5 shadow-[2px_2px_0_0_#16181d]"
              >
                <span>Banco de Talentos</span>
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => markCategoryDone('colacao')}
                className="min-h-[44px] px-2.5 py-1.5 rounded-lg border-2 border-[#16181d] bg-primary text-white font-mono text-[11px] font-bold uppercase cursor-pointer"
              >
                Concluir 3/3
              </button>
            </div>
          </div>
        </div>

        {/* Barra de Progresso Geral Animada */}
        <div className="p-4 rounded-xl border-3 border-[#16181d] bg-white shadow-[4px_4px_0_0_#16181d] space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-head text-xs sm:text-sm font-black uppercase text-foreground">
              Progresso Geral Rumo à Colação de Grau: {completedTotal} de {totalSteps} Etapas Concluídas
            </span>
            <motion.span
              key={progressPct}
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              transition={bounceSpring}
              className={`px-3 py-1 rounded-lg border-2 border-[#16181d] font-mono text-xs font-black ${
                isGradReady
                  ? 'bg-[#134E4A] text-white'
                  : 'bg-[#FF8811] text-[#16181d]'
              }`}
            >
              {progressPct}% INTEGRALIZADO
            </motion.span>
          </div>
          <div className="w-full h-4 bg-[#f4f0ea] rounded-lg border-2 border-[#16181d] overflow-hidden p-0.5">
            <motion.div
              className="h-full rounded bg-[#134E4A]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={tactileSpring}
            />
          </div>
        </div>
      </div>

      {/* Filtros de Categoria e Lista Interativa Animada */}
      <div className="p-5 sm:p-6 rounded-xl border-3 border-[#16181d] bg-white shadow-[4px_4px_0_0_#16181d] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-3 border-[#16181d] pb-4">
          <div>
            <h3 className="font-head text-base sm:text-lg font-black uppercase text-foreground m-0">
              Ver Checklist Completo de Formatura (10 Passos)
            </h3>
            <p className="font-body text-xs text-muted-foreground m-0 mt-0.5">
              Toque em cada requisito para carimbar sua conclusão no Cofre Local Discente.
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
                  className={`min-h-[44px] px-3.5 py-2 rounded-xl border-2 border-[#16181d] font-head text-xs font-extrabold uppercase shrink-0 cursor-pointer transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-[3px_3px_0_0_#16181d]'
                      : 'bg-white text-foreground hover:bg-muted'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          className="space-y-3.5"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredSteps.map((step) => {
              const isDone = !!checks[step.id];
              return (
                <motion.div
                  layout
                  key={step.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={tactileSpring}
                  className={`p-4 sm:p-5 rounded-xl border-3 border-[#16181d] shadow-[4px_4px_0_0_#16181d] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                    isDone ? 'bg-[#F0FDF4]' : 'bg-white'
                  }`}
                >
                  <label className="flex items-start gap-3.5 cursor-pointer flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggleStep(step.id)}
                      className="mt-1 w-5 h-5 accent-[#134E4A] rounded border-3 border-[#16181d] cursor-pointer shrink-0"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#16181d] text-white font-mono text-[10px] font-bold uppercase">
                          {step.categoryLabel}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-secondary">
                          {step.periodTag}
                        </span>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          • {step.normativeRef}
                        </span>
                      </div>
                      <h4
                        className={`font-head text-sm font-black uppercase m-0 leading-snug ${
                          isDone ? 'line-through text-foreground/75' : 'text-foreground'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed m-0">
                        {step.desc}
                      </p>
                    </div>
                  </label>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0 pl-8 md:pl-0">
                    {isDone && (
                      <motion.span
                        initial={{ scale: 0.6, rotate: -8 }}
                        animate={{ scale: 1, rotate: -2 }}
                        transition={bounceSpring}
                        className="px-2.5 py-1.5 rounded-lg border-2 border-[#16181d] bg-[#134E4A] text-white font-mono text-[10px] font-black uppercase shadow-[2px_2px_0_0_#16181d]"
                      >
                        ★ HOMOLOGADO
                      </motion.span>
                    )}
                    {step.actionHref && (
                      <a
                        href={step.actionHref}
                        download={step.isDownload ? true : undefined}
                        className="min-h-[44px] px-3.5 py-2 rounded-xl border-2 border-[#16181d] bg-white hover:bg-muted text-foreground font-head text-xs font-extrabold uppercase no-underline inline-flex items-center gap-1.5 shadow-[2px_2px_0_0_#16181d] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
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
      <div className="p-5 sm:p-6 rounded-xl border-3 border-[#16181d] bg-[#f4f0ea] shadow-[6px_6px_0_0_#16181d] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <span className="px-2.5 py-0.5 rounded bg-[#FF8811] text-[#16181d] border-2 border-[#16181d] font-mono text-[10px] font-black uppercase">
            PROPOSTA DA CHAPA SEMENTE MATERIALIZADA • 25 E 26/11
          </span>
          <h4 className="font-head text-base sm:text-lg font-black uppercase text-foreground m-0 pt-1">
            Formar sem burocracia é direito de todo estudante do noturno
          </h4>
          <p className="font-body text-xs text-foreground/85 leading-relaxed m-0">
            A <strong>Chapa Semente</strong> construiu este Hub Integrador antes mesmo da eleição para que nenhum formando perca prazos de TCE, Aproveitamento Servidor (Art. 41) ou depósito de TCC. Vote na chapa que já trabalha por você!
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto">
          <a
            href={route('/carreira')}
            className="min-h-[44px] flex-1 lg:flex-none px-4 py-2.5 rounded-xl border-3 border-[#16181d] bg-white hover:bg-muted text-foreground font-head text-xs font-black uppercase no-underline inline-flex items-center justify-center gap-2 shadow-[3px_3px_0_0_#16181d]"
          >
            <i className="bi bi-briefcase-fill text-primary" aria-hidden="true" />
            <span>Ir para Carreira &amp; Vagas</span>
          </a>
          <a
            href={route('/chapa-semente')}
            className="min-h-[44px] flex-1 lg:flex-none px-4 py-2.5 rounded-xl border-3 border-[#16181d] bg-primary hover:bg-[#49216C] text-white font-head text-xs font-black uppercase no-underline inline-flex items-center justify-center gap-2 shadow-[3px_3px_0_0_#16181d]"
          >
            <span>Conhecer as 14 Propostas</span>
            <i className="bi bi-arrow-right" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};
