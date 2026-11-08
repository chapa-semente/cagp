import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { tactileSpring, bounceSpring } from '@/lib/motion';
import {
  DISCIPLINAS_GRAFO,
  TRACK_NAMES,
  type CourseNodeData,
} from './curriculumGraphData';
import { CurriculumSvgMap } from './CurriculumSvgMap';
import {
  getVaultItem,
  setVaultItem,
  type CustomCourse,
} from '../../../../lib/storage/studentVault';
import { CustomCourseModal } from '../custom-course/CustomCourseModal';
import { CourseDetailDrawer, type CourseDetailNode } from '@/components/ui/CourseDetailDrawer';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import { Skeleton } from '@/components/ui/skeleton';
import { MathCurveLoader } from '@/components/ui/math-curve-loader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { List, Copy, Trash2, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { CagpIcon } from '@/components/ui/CagpIcon';

interface Props {
  catalogOptions?: Array<{ code: string; name: string; dept: string; ch: number }>;
}

export const CurriculumGraphDynamic: React.FC<Props> = ({ catalogOptions = [] }) => {
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [customCourses, setCustomCourses] = useState<CustomCourse[]>([]);
  const [selectedNode, setSelectedNode] = useState<CourseDetailNode | null>(null);
  const [focusedCode, setFocusedCode] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPeriod, setModalPeriod] = useState(4);
  const [activeTrack, setActiveTrack] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'locked' | 'pending' | 'done'>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'columns' | 'svg' | 'list'>('columns');
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const loadVaultData = () => {
    try {
      const gradeVault = getVaultItem('cagp_minha_grade_v1');
      if (gradeVault?.savedCourses) {
        setCompletedCourses(gradeVault.savedCourses);
      }
      const customVault = getVaultItem('cagp_custom_curriculum_v1');
      if (customVault?.assignedCourses) {
        setCustomCourses(customVault.assignedCourses);
      }
    } catch (e) {
      console.warn('[Grafo Dinâmico] Erro ao carregar dados:', e);
    }
  };

  useEffect(() => {
    loadVaultData();

    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent;
      if (
        custom.detail?.key === 'cagp_minha_grade_v1' ||
        custom.detail?.key === 'cagp_custom_curriculum_v1'
      ) {
        loadVaultData();
      }
    };

    window.addEventListener('cagp:vault-updated', handleUpdate);
    return () => window.removeEventListener('cagp:vault-updated', handleUpdate);
  }, []);

  const handleToggleCompleted = (code: string, ch: number) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(15);
    }
    const isDone = completedCourses.includes(code);
    const updated = isDone
      ? completedCourses.filter((c) => c !== code)
      : [...completedCourses, code];

    setCompletedCourses(updated);
    setVaultItem('cagp_minha_grade_v1', { savedCourses: updated });

    (window as any).cagpToast?.(
      isDone ? `${code} desmarcada da sua grade.` : `✓ ${code} marcada como integralizada (${ch}h)!`,
      isDone ? 'bi-dash-circle' : 'bi-check2-circle'
    );
  };

  const handleRemoveCustomCourse = (id: string, code: string) => {
    const updated = customCourses.filter((c) => c.id !== id);
    setCustomCourses(updated);
    setVaultItem('cagp_custom_curriculum_v1', { assignedCourses: updated });

    if (completedCourses.includes(code)) {
      const updatedDone = completedCourses.filter((c) => c !== code);
      setCompletedCourses(updatedDone);
      setVaultItem('cagp_minha_grade_v1', { savedCourses: updatedDone });
    }

    (window as any).cagpToast?.(`Disciplina ${code} removida do Grafo.`, 'bi-trash');
  };

  const openAddModal = (p: number) => {
    setModalPeriod(p);
    setIsModalOpen(true);
  };

  const handleSelectDiscipline = (disc: CourseNodeData) => {
    setFocusedCode(disc.code);
    setSelectedNode({
      code: disc.code,
      name: disc.name,
      period: disc.period,
      ch: disc.ch,
      desc: disc.desc,
      dept: disc.dept,
      isFormalLock: disc.isFormalLock,
      isKey: disc.isKey,
      formalReqs: disc.formalReqs,
      suggestedReqs: disc.suggestedReqs,
      formalUnlocks: disc.formalUnlocks,
      suggestedUnlocks: disc.suggestedUnlocks,
      trackLabel: disc.trackLabel,
    });
  };

  // Resolve active prerequisite/unlock chains for focused or selected course
  const activeChainSourceCode = focusedCode || selectedNode?.code || null;
  const activeChainEntry = activeChainSourceCode
    ? Object.entries(DISCIPLINAS_GRAFO).find(
        ([k, v]) => k === activeChainSourceCode || v.code === activeChainSourceCode
      )
    : undefined;
  const activeChainId = activeChainEntry ? activeChainEntry[0] : null;
  const activeChainData = activeChainEntry ? activeChainEntry[1] : null;

  const activePrereqCodes = new Set<string>();
  const activeUnlockCodes = new Set<string>();
  if (activeChainData) {
    [...activeChainData.formalReqs, ...activeChainData.suggestedReqs].forEach((reqId) => {
      const target = DISCIPLINAS_GRAFO[reqId];
      if (target) activePrereqCodes.add(target.code);
      activePrereqCodes.add(reqId);
    });
    [...activeChainData.formalUnlocks, ...activeChainData.suggestedUnlocks].forEach((unlId) => {
      const target = DISCIPLINAS_GRAFO[unlId];
      if (target) activeUnlockCodes.add(target.code);
      activeUnlockCodes.add(unlId);
    });
  }

  const handlePanHorizontal = (delta: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: delta, behavior: 'smooth' });
    }
  };

  const handleSelectSvgNode = (id: string | null) => {
    if (!id) {
      setSelectedNode(null);
      return;
    }
    const disc = DISCIPLINAS_GRAFO[id];
    if (disc) {
      handleSelectDiscipline(disc);
    }
  };

  const handleSelectCustomCourse = (cust: CustomCourse) => {
    setSelectedNode({
      code: cust.code,
      name: cust.name,
      period: cust.period,
      ch: cust.ch,
      desc: 'Disciplina optativa / formação livre vinculada ao seu percurso.',
      dept: cust.dept || 'UFMG',
      isCustom: true,
      category: cust.category,
    });
  };

  // Cálculos de Horas
  const mandatoryDoneHours = Object.values(DISCIPLINAS_GRAFO)
    .filter((d) => completedCourses.includes(d.code))
    .reduce((acc, d) => acc + d.ch, 0);

  const customDoneHours = customCourses
    .filter((c) => completedCourses.includes(c.code))
    .reduce((acc, c) => acc + c.ch, 0);

  const totalDoneHours = mandatoryDoneHours + customDoneHours;
  const progressPct = Math.min(100, Math.round((totalDoneHours / 3000) * 100));

  const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="cagp-curriculum-graph-dynamic select-none space-y-6">
      {/* HUD Linear de Integralização da Matriz */}
      <div className="p-4 sm:p-5 bg-card border-3 border-border rounded-xl shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border-3 border-border">
                <CagpIcon name="curriculo" className="w-4 h-4" />
              </span>
              <h3 className="font-heading text-base sm:text-lg uppercase font-black text-foreground m-0">
                Grafo Curricular Dinâmico & 10 Períodos
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mt-1 m-0">
              27 obrigatórias com travas do SIGA + optativas e disciplinas livres vinculadas por você.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="cagp-stamp-badge is-semente text-[10px] py-0.5 px-2 hidden xl:inline-flex">
              ✦ Ferramenta Criada pela Chapa Semente
            </span>
            {/* Alternador de Modo: Colunas 10P vs Mapa SVG vs Lista Móvel (44x44pt Touch Targets) */}
            <div
              className="inline-flex rounded-xl border-3 border-border p-1 bg-white shadow-xs"
              role="radiogroup"
              aria-label="Modo de visualização do grafo"
            >
              <button
                type="button"
                role="radio"
                aria-checked={viewMode === 'columns'}
                onClick={() => setViewMode('columns')}
                className={`min-h-[44px] px-3 py-1.5 rounded-lg font-heading text-xs uppercase font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'columns'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <CagpIcon name="kanban" className="w-3.5 h-3.5" />
                <span>Colunas 10P</span>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={viewMode === 'svg'}
                onClick={() => setViewMode('svg')}
                className={`min-h-[44px] px-3 py-1.5 rounded-lg font-heading text-xs uppercase font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'svg'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <CagpIcon name="curriculo" className="w-3.5 h-3.5" />
                <span>Mapa SVG</span>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={viewMode === 'list'}
                onClick={() => setViewMode('list')}
                className={`min-h-[44px] px-3 py-1.5 rounded-lg font-heading text-xs uppercase font-extrabold transition-all flex items-center gap-1.5 cursor-pointer md:hidden ${
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Lista</span>
              </button>
            </div>

            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={() => openAddModal(4)}
              className="min-h-[44px] font-heading font-extrabold text-xs uppercase tracking-wide"
            >
              <CagpIcon name="plus" className="w-4 h-4 mr-1" />
              <span>Adicionar Disciplina</span>
            </Button>
          </div>
        </div>

        {/* Barra de Progresso das 3.000h */}
        <div>
          <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1.5 flex-wrap gap-2">
            <div>
              <span>Obrigatórias: </span>
              <strong className="text-secondary">{mandatoryDoneHours}/1.860h</strong>
              <span className="text-muted-foreground/60 mx-2">•</span>
              <span>Optativas / Livres: </span>
              <strong className="text-success">{customDoneHours}/1.140h</strong>
            </div>
            <div>
              <span>Total da Graduação: </span>
              <strong className="text-foreground">{totalDoneHours}/3.000h ({progressPct}%)</strong>
            </div>
          </div>
          <div className="w-full h-3.5 bg-muted rounded-full overflow-hidden flex border-3 border-border shadow-xs">
            <div
              className="h-full bg-secondary transition-all duration-300"
              style={{ width: `${Math.min(100, (mandatoryDoneHours / 3000) * 100)}%` }}
              title="Horas Obrigatórias"
            />
            <div
              className="h-full bg-success transition-all duration-300"
              style={{ width: `${Math.min(100, (customDoneHours / 3000) * 100)}%` }}
              title="Horas Optativas e Livres"
            />
          </div>
        </div>
      </div>

      {periods.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 border-3 border-border rounded-xl bg-card gap-4">
          <MathCurveLoader curve="lissajous" size="lg" headColor="#5B2A86" trackColor="#FF8811" />
          <span className="font-mono text-xs font-bold uppercase text-muted-foreground">
            Calculando topologia e travas regimentais do grafo 10P...
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full mt-2">
            <Skeleton className="h-44 rounded-xl" />
            <Skeleton className="h-44 rounded-xl" />
            <Skeleton className="h-44 rounded-xl" />
            <Skeleton className="h-44 rounded-xl" />
          </div>
        </div>
      )}

      {/* Barra Tátil de Filtros Rápidos, Zoom e Navegação 44x44pt (Mobile, Tablet & Desktop) */}
      <div className="p-3 bg-white border-3 border-border rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="scroll-mask-x flex items-center gap-1.5 pb-1 sm:pb-0 max-w-full">
          {[
            { id: 'all', label: 'Todas (27)' },
            { id: 'locked', label: '🔒 Com Trava SIGA' },
            { id: 'pending', label: 'Pendentes' },
            { id: 'done', label: 'Concluídas ✓' },
          ].map((flt) => (
            <button
              key={flt.id}
              type="button"
              onClick={() => setStatusFilter(flt.id as any)}
              className={`min-h-[44px] px-3 py-1.5 rounded-xl font-heading text-xs uppercase font-extrabold border-2 transition-all shrink-0 cursor-pointer ${
                statusFilter === flt.id
                  ? 'bg-[#5B2A86] text-white border-[#16181d] shadow-[2px_2px_0_0_#16181d]'
                  : 'bg-white text-foreground border-border hover:bg-muted'
              }`}
            >
              {flt.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          <button
            type="button"
            onClick={() => handlePanHorizontal(-320)}
            className="min-h-[44px] min-w-[44px] px-2.5 rounded-xl bg-white hover:bg-muted border-2 border-border text-foreground font-heading text-xs font-extrabold flex items-center justify-center gap-1 shadow-xs active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
            title="Rolar para períodos anteriores"
            aria-label="Rolar para períodos anteriores"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Anteriores</span>
          </button>
          <button
            type="button"
            onClick={() => handlePanHorizontal(320)}
            className="min-h-[44px] min-w-[44px] px-2.5 rounded-xl bg-white hover:bg-muted border-2 border-border text-foreground font-heading text-xs font-extrabold flex items-center justify-center gap-1 shadow-xs active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
            title="Rolar para próximos períodos"
            aria-label="Rolar para próximos períodos"
          >
            <span className="hidden sm:inline">Próximos</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center rounded-xl border-2 border-border bg-card p-0.5">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(0.75, Number((z - 0.1).toFixed(2))))}
              className="min-h-[44px] min-w-[44px] rounded-lg hover:bg-white text-foreground flex items-center justify-center cursor-pointer"
              title="Diminuir Zoom"
              aria-label="Diminuir Zoom"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              className="min-h-[44px] px-2 font-mono text-xs font-bold text-foreground hover:bg-white rounded-lg flex items-center justify-center gap-1 cursor-pointer"
              title="Restaurar Zoom (100%)"
              aria-label="Restaurar Zoom 100%"
            >
              <span>{Math.round(zoomLevel * 100)}%</span>
              {zoomLevel !== 1 && <RotateCcw className="w-3 h-3 text-primary" />}
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(1.25, Number((z + 0.1).toFixed(2))))}
              className="min-h-[44px] min-w-[44px] rounded-lg hover:bg-white text-foreground flex items-center justify-center cursor-pointer"
              title="Aumentar Zoom"
              aria-label="Aumentar Zoom"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Painel Animado de Cadeia de Pré-Requisitos Ativa */}
      <AnimatePresence>
        {activeChainData && (
          <motion.div
            key={activeChainData.code}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={bounceSpring}
            className="p-3.5 bg-[#FAF5FF] border-3 border-[#16181d] rounded-xl shadow-[4px_4px_0_0_#5B2A86] flex flex-wrap items-center justify-between gap-3 text-xs"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-[#5B2A86] text-white font-mono font-bold border-2 border-[#16181d]">
                FOCO: {activeChainData.code} ({activeChainData.name})
              </span>
              {activePrereqCodes.size > 0 ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FEE2E2] text-[#9E2424] font-mono font-bold border-2 border-[#9E2424]">
                  ⬅ Exige Pré-Req: {Array.from(activePrereqCodes).join(', ')}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white text-muted-foreground font-mono border border-border">
                  ✓ Sem trava prévia
                </span>
              )}
              {activeUnlockCodes.size > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#DCFCE7] text-[#15803D] font-mono font-bold border-2 border-[#15803D]">
                  Libera ➡ {Array.from(activeUnlockCodes).join(', ')}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setFocusedCode(null)}
              className="min-h-[44px] px-3 py-1 rounded-lg bg-white hover:bg-muted border-2 border-[#16181d] font-heading font-extrabold uppercase text-xs cursor-pointer"
            >
              Limpar Destaque ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODO 1: Grade dos 10 Períodos em Colunas Responsivas */}
      {viewMode === 'columns' && (
        <div className="space-y-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between px-1 flex-wrap gap-2">
            <span className="text-xs font-mono font-bold text-muted-foreground flex items-center gap-1.5">
              <span>↔</span> Arraste para ver os 10 períodos ou toque em uma disciplina para destacar a cadeia de travas SIGA
            </span>
          </div>

          <div
            ref={scrollContainerRef}
            className="scroll-mask-x overflow-x-auto pb-4 scrollbar-none"
          >
            <motion.div
              animate={{ scale: zoomLevel }}
              transition={tactileSpring}
              style={{ transformOrigin: 'top left' }}
              className="flex gap-4 min-w-[1240px] px-2 py-1"
            >
              {periods.map((p) => {
                const periodMandatory = Object.values(DISCIPLINAS_GRAFO).filter((d) => {
                  if (d.period !== p) return false;
                  if (statusFilter === 'locked') return Boolean(d.isFormalLock || d.formalReqs.length > 0);
                  if (statusFilter === 'pending') return !completedCourses.includes(d.code);
                  if (statusFilter === 'done') return completedCourses.includes(d.code);
                  return true;
                });
                const periodCustom = customCourses.filter((c) => c.period === p);

                return (
                  <div
                    key={p}
                    className="w-72 bg-white border-3 border-border rounded-xl p-3 flex flex-col justify-between shrink-0 shadow-md"
                  >
                    <div>
                      {/* Cabeçalho do Período */}
                      <div className="flex items-center justify-between pb-2 mb-2.5 border-b-2 border-border">
                        <span className="font-heading text-sm font-black uppercase text-foreground">
                          {p}º Período
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground font-bold">
                          {periodMandatory.length + periodCustom.length} matérias
                        </span>
                      </div>

                      {/* Lista de Disciplinas do Período */}
                      <div className="space-y-2">
                        {periodMandatory.map((disc) => {
                          const isCompleted = completedCourses.includes(disc.code);
                          const isFormalLock = disc.isFormalLock;
                          const isCurrentFocus = activeChainData?.code === disc.code;
                          const isPrereqChain = activePrereqCodes.has(disc.code);
                          const isUnlockChain = activeUnlockCodes.has(disc.code);
                          const isDimmedByChain =
                            Boolean(activeChainData) &&
                            !isCurrentFocus &&
                            !isPrereqChain &&
                            !isUnlockChain;

                          return (
                            <ContextMenu key={disc.code}>
                              <ContextMenuTrigger asChild>
                                <motion.div
                                  layout="position"
                                  onMouseEnter={() => setFocusedCode(disc.code)}
                                  onMouseLeave={() => setFocusedCode(null)}
                                  animate={{
                                    scale: isCurrentFocus || isPrereqChain || isUnlockChain ? 1.02 : 1,
                                    opacity: isDimmedByChain ? 0.45 : 1,
                                  }}
                                  transition={tactileSpring}
                                  className={`p-2.5 rounded-lg border-2 transition-colors text-xs cursor-pointer ${
                                    isCurrentFocus
                                      ? 'bg-[#FAF5FF] border-[#5B2A86] shadow-[4px_4px_0_0_#5B2A86]'
                                      : isPrereqChain
                                      ? 'bg-[#FFF5F5] border-[#9E2424] shadow-[4px_4px_0_0_#9E2424]'
                                      : isUnlockChain
                                      ? 'bg-[#F0FDF4] border-[#15803D] shadow-[4px_4px_0_0_#15803D]'
                                      : isCompleted
                                      ? 'bg-success/20 border-success'
                                      : 'bg-white border-border hover:shadow-xs'
                                  }`}
                                  onClick={() => handleSelectDiscipline(disc)}
                                >
                                  <div className="flex items-start justify-between gap-1.5 mb-1">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="font-mono font-black text-left text-primary hover:underline">
                                        {disc.code}
                                      </span>
                                      {isCompleted && (
                                        <span className="text-[10px] font-bold uppercase py-0.5 px-1.5 rounded text-success bg-success/20 border border-success">
                                          FEITO ✓
                                        </span>
                                      )}
                                      {isPrereqChain && (
                                        <span className="text-[9px] font-mono font-black uppercase py-0.5 px-1.5 rounded bg-[#9E2424] text-white">
                                          ⬅ PRÉ-REQ
                                        </span>
                                      )}
                                      {isUnlockChain && (
                                        <span className="text-[9px] font-mono font-black uppercase py-0.5 px-1.5 rounded bg-[#15803D] text-white">
                                          LIBERA ➡
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      {isFormalLock && (
                                        <span className="text-[10px] text-destructive" title="Trava Formal no SIGA">
                                          <CagpIcon name="lock" className="w-3.5 h-3.5 text-destructive" />
                                        </span>
                                      )}
                                      <label
                                        htmlFor={`chk-course-${disc.code}`}
                                        className="min-w-[44px] min-h-[44px] -my-2 -mr-1 flex items-center justify-center cursor-pointer"
                                        title={isCompleted ? `Desmarcar ${disc.code}` : `Marcar ${disc.code} como concluída`}
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <input
                                          id={`chk-course-${disc.code}`}
                                          name={`course_${disc.code}`}
                                          type="checkbox"
                                          checked={isCompleted}
                                          onChange={() => handleToggleCompleted(disc.code, disc.ch)}
                                          className="w-4 h-4 rounded accent-primary cursor-pointer"
                                          aria-label={`Marcar ${disc.code} como concluída`}
                                        />
                                      </label>
                                    </div>
                                  </div>

                                  <p className="font-heading font-extrabold text-xs text-foreground leading-tight m-0 mb-1 hover:text-primary">
                                    {disc.name}
                                  </p>

                                  <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                                    <span>{disc.dept} • {disc.ch}h</span>
                                    {disc.formalReqs.length > 0 && (
                                      <span className="text-destructive font-bold">
                                        Req: {disc.formalReqs.join(', ')}
                                      </span>
                                    )}
                                  </div>
                                </motion.div>
                              </ContextMenuTrigger>

                              <ContextMenuContent>
                                <ContextMenuItem onClick={() => handleSelectDiscipline(disc)}>
                                  <CagpIcon name="file-text" className="w-4 h-4 mr-2" />
                                  Ver Ementa & Detalhes
                                </ContextMenuItem>
                                <ContextMenuItem onClick={() => handleToggleCompleted(disc.code, disc.ch)}>
                                  <CagpIcon name={isCompleted ? 'check' : 'plus'} className="w-4 h-4 mr-2" />
                                  {isCompleted ? 'Desmarcar Conclusão' : 'Marcar como Concluída'}
                                </ContextMenuItem>
                                <ContextMenuSeparator />
                                <ContextMenuItem onClick={() => navigator.clipboard.writeText(disc.code)}>
                                  <Copy className="w-4 h-4 mr-2" />
                                  Copiar Código ({disc.code})
                                </ContextMenuItem>
                              </ContextMenuContent>
                            </ContextMenu>
                          );
                        })}

                        {/* Disciplinas Optativas e Personalizadas */}
                        {periodCustom.map((cust) => {
                          const isCompleted = completedCourses.includes(cust.code);

                          return (
                            <ContextMenu key={cust.id}>
                              <ContextMenuTrigger asChild>
                                <div
                                  className={`p-2.5 rounded-lg border-2 border-dashed transition-all text-xs cursor-pointer ${
                                    isCompleted
                                      ? 'bg-success/20 border-success'
                                      : 'bg-[#FFFBEB] border-warning'
                                  }`}
                                  onClick={() => handleSelectCustomCourse(cust)}
                                >
                                  <div className="flex items-start justify-between gap-1 mb-1">
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-heading uppercase font-extrabold bg-warning text-white">
                                      {cust.category === 'formacao_livre' ? 'LIVRE' : 'OPTATIVA'}
                                    </span>
                                    <div className="flex items-center">
                                      <label
                                        htmlFor={`chk-custom-${cust.id}`}
                                        className="min-w-[44px] min-h-[44px] -my-2 flex items-center justify-center cursor-pointer"
                                        title={isCompleted ? `Desmarcar ${cust.code}` : `Marcar ${cust.code} como concluída`}
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <input
                                          id={`chk-custom-${cust.id}`}
                                          name={`custom_course_${cust.code}`}
                                          type="checkbox"
                                          checked={isCompleted}
                                          onChange={() => handleToggleCompleted(cust.code, cust.ch)}
                                          className="w-4 h-4 rounded accent-primary cursor-pointer"
                                          aria-label={`Marcar ${cust.code} como concluída`}
                                        />
                                      </label>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleRemoveCustomCourse(cust.id, cust.code);
                                        }}
                                        className="min-w-[44px] min-h-[44px] -my-2 -mr-1 flex items-center justify-center text-muted-foreground hover:text-destructive text-sm cursor-pointer"
                                        title="Remover do Grafo"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  </div>

                                  <span className="font-mono font-bold text-warning text-[11px] block">
                                    {cust.code}
                                  </span>
                                  <p className="font-heading font-extrabold text-xs text-foreground leading-tight m-0 mb-1">
                                    {cust.name}
                                  </p>

                                  <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                                    <span>{cust.dept}</span>
                                    <span className="font-bold text-warning">{cust.ch}h</span>
                                  </div>
                                </div>
                              </ContextMenuTrigger>

                              <ContextMenuContent>
                                <ContextMenuItem onClick={() => handleSelectCustomCourse(cust)}>
                                  <CagpIcon name="file-text" className="w-4 h-4 mr-2" />
                                  Ver Detalhes
                                </ContextMenuItem>
                                <ContextMenuItem onClick={() => handleToggleCompleted(cust.code, cust.ch)}>
                                  <CagpIcon name={isCompleted ? 'check' : 'plus'} className="w-4 h-4 mr-2" />
                                  {isCompleted ? 'Desmarcar Conclusão' : 'Marcar como Concluída'}
                                </ContextMenuItem>
                                <ContextMenuSeparator />
                                <ContextMenuItem onClick={() => handleRemoveCustomCourse(cust.id, cust.code)}>
                                  <Trash2 className="w-4 h-4 mr-2 text-destructive" />
                                  Remover do Grafo
                                </ContextMenuItem>
                              </ContextMenuContent>
                            </ContextMenu>
                          );
                        })}
                      </div>
                    </div>

                    {/* Botão de Adição no Período */}
                    <button
                      type="button"
                      onClick={() => openAddModal(p)}
                      className="w-full min-h-[44px] py-2 bg-white hover:bg-background border-2 border-dashed border-border rounded-xl text-xs font-heading uppercase font-extrabold text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 transition-all mt-3 cursor-pointer shadow-xs active:translate-x-0.5 active:translate-y-0.5"
                    >
                      <CagpIcon name="plus" className="w-4 h-4" />
                      <span>Adicionar no {p}ºP</span>
                    </button>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      )}

      {/* MODO 2: Mapa Cartográfico SVG & Trilhas */}
      {viewMode === 'svg' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {/* Filtro por Trilhas Temáticas */}
          <div className="flex items-center gap-1.5 p-3 bg-card border-3 border-border rounded-xl shadow-[3px_3px_0_0_#16181d] overflow-x-auto scroll-mask-x scrollbar-none">
            <span className="text-xs font-heading uppercase font-black text-foreground mr-1 flex items-center gap-1.5 shrink-0">
              <CagpIcon name="filter" className="w-3.5 h-3.5 text-primary" />
              Filtrar Trilha:
            </span>
            {Object.entries(TRACK_NAMES).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTrack(key)}
                className={`min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-heading font-extrabold uppercase border-2 transition-all cursor-pointer shrink-0 ${
                  activeTrack === key
                    ? 'bg-primary text-primary-foreground border-border shadow-[2px_2px_0_0_#16181d]'
                    : 'bg-white text-foreground border-border hover:bg-muted'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Legenda Cartográfica */}
          <div className="p-3 bg-white border-3 border-border rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-destructive inline-block" />
                <span className="font-bold text-destructive">Trava Formal SIGA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-muted-foreground border-t border-dashed inline-block" />
                <span className="text-muted-foreground">Encadeamento Sugerido</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-success inline-block" />
                <span className="text-success font-bold">Integralizada ✓</span>
              </div>
            </div>
            <span className="text-muted-foreground font-mono text-[11px]">
              Toque em um nó para destacar a cadeia e abrir o Drawer
            </span>
          </div>

          {/* Viewport do Grafo SVG com Painel Redimensionável Neobrutalista e .scroll-mask-x */}
          <div className="overflow-x-auto pb-4 scroll-mask-x scrollbar-none">
            <motion.div
              animate={{ scale: zoomLevel }}
              transition={tactileSpring}
              style={{ transformOrigin: 'top left' }}
              className="cagp-grafo-viewport border-3 border-border rounded-xl bg-card overflow-hidden min-w-[980px] shadow-[4px_4px_0_0_#16181d]"
            >
              <ResizablePanelGroup direction="horizontal" className="min-h-[580px]">
                <ResizablePanel defaultSize={selectedNode ? 72 : 100} minSize={50} className="overflow-x-auto">
                  <CurriculumSvgMap
                    selectedNodeId={
                      selectedNode
                        ? Object.keys(DISCIPLINAS_GRAFO).find(
                            (k) => DISCIPLINAS_GRAFO[k].code === selectedNode.code
                          ) || null
                        : null
                    }
                    activeTrack={activeTrack}
                    completedCourses={completedCourses}
                    onSelectNode={handleSelectSvgNode}
                  />
                </ResizablePanel>
                {selectedNode && (
                  <>
                    <ResizableHandle withHandle className="bg-border" />
                    <ResizablePanel defaultSize={28} minSize={20} className="p-4 bg-white overflow-y-auto space-y-3">
                      <div className="flex items-center justify-between border-b-2 border-border pb-2">
                        <span className="font-mono text-xs font-bold text-secondary">{selectedNode.code}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedNode(null)}
                          className="min-h-[44px] px-3 text-xs"
                        >
                          ✕ Fechar
                        </Button>
                      </div>
                      <h4 className="font-heading font-black text-sm uppercase text-foreground m-0">
                        {selectedNode.name}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed m-0">
                        {selectedNode.desc || 'Disciplina integrante da estrutura curricular formal de Gestão Pública UFMG.'}
                      </p>
                      <div className="p-2.5 bg-muted/40 rounded-lg border border-border text-xs font-mono space-y-1">
                        <div><strong>Departamento:</strong> {selectedNode.dept}</div>
                        <div><strong>Carga Horária:</strong> {selectedNode.ch}h ({Math.round(selectedNode.ch / 15)} cr)</div>
                        <div><strong>Período Sugerido:</strong> {selectedNode.period}º Período</div>
                      </div>
                    </ResizablePanel>
                  </>
                )}
              </ResizablePanelGroup>
            </motion.div>
          </div>
        </div>
      )}

      {/* MODO 3: Lista Compacta por Semestre (Perfeita para Mobile) */}
      {viewMode === 'list' && (
        <div className="space-y-3 animate-in fade-in duration-150 md:hidden">
          {periods.map((p) => {
            const periodMandatory = Object.values(DISCIPLINAS_GRAFO).filter((d) => d.period === p);
            const periodCustom = customCourses.filter((c) => c.period === p);

            return (
              <details
                key={p}
                className="group border-3 border-border rounded-xl bg-card overflow-hidden shadow-xs"
                open={p <= 2}
              >
                <summary className="p-3.5 bg-white flex items-center justify-between cursor-pointer font-heading font-black uppercase text-sm border-b-2 border-border select-none">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-primary text-white flex items-center justify-center text-xs font-mono">
                      {p}
                    </span>
                    <span>{p}º Período</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-muted-foreground">
                    {periodMandatory.length + periodCustom.length} disciplinas
                  </span>
                </summary>

                <div className="p-3 space-y-2">
                  {periodMandatory.map((disc) => {
                    const isCompleted = completedCourses.includes(disc.code);

                    return (
                      <div
                        key={disc.code}
                        className={`p-3 rounded-lg border-2 flex items-center justify-between gap-2 ${
                          isCompleted ? 'bg-success/20 border-success' : 'bg-white border-border'
                        }`}
                        onClick={() => handleSelectDiscipline(disc)}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-black text-xs text-primary">{disc.code}</span>
                            {isCompleted && (
                              <span className="text-[9px] font-bold uppercase px-1 py-0.5 rounded bg-success/20 text-success border border-success">
                                FEITO ✓
                              </span>
                            )}
                          </div>
                          <p className="font-heading font-extrabold text-xs text-foreground truncate m-0 mt-0.5">
                            {disc.name}
                          </p>
                        </div>

                        <label
                          htmlFor={`chk-list-${disc.code}`}
                          className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            id={`chk-list-${disc.code}`}
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => handleToggleCompleted(disc.code, disc.ch)}
                            className="w-5 h-5 rounded accent-primary"
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </div>
      )}

      {/* DRAWER ESTILO APPLE: Detalhes da Disciplina com Gesto Tátil de Arrasto */}
      <CourseDetailDrawer
        node={selectedNode}
        isOpen={Boolean(selectedNode)}
        isCompleted={selectedNode ? completedCourses.includes(selectedNode.code) : false}
        onClose={() => setSelectedNode(null)}
        onToggleCompleted={handleToggleCompleted}
        onDeleteCustom={
          selectedNode?.isCustom
            ? (code) => {
                const target = customCourses.find((c) => c.code === code);
                if (target) handleRemoveCustomCourse(target.id, code);
              }
            : undefined
        }
      />

      {/* Modal de Construtor de Optativas & Disciplinas Livres */}
      <CustomCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultPeriod={modalPeriod}
        catalogOptions={catalogOptions}
      />
    </div>
  );
};
