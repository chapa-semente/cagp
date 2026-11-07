import React, { useState, useEffect } from 'react';
import {
  DISCIPLINAS_GRAFO,
  TRACK_NAMES,
  type CourseNodeData,
} from '../../../curriculum/curriculumGraphData';
import { CurriculumSvgMap } from '../../../curriculum/CurriculumSvgMap';
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { List, Copy, Trash2 } from 'lucide-react';
import { CagpIcon } from '../../../ui/CagpIcon';

interface Props {
  catalogOptions?: Array<{ code: string; name: string; dept: string; ch: number }>;
}

export const CurriculumGraphDynamic: React.FC<Props> = ({ catalogOptions = [] }) => {
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [customCourses, setCustomCourses] = useState<CustomCourse[]>([]);
  const [selectedNode, setSelectedNode] = useState<CourseDetailNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPeriod, setModalPeriod] = useState(4);
  const [activeTrack, setActiveTrack] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'columns' | 'svg' | 'list'>('columns');

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
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border-2 border-border">
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
            {/* Alternador de Modo: Colunas 10P vs Mapa SVG vs Lista Móvel */}
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
                className={`min-h-[38px] px-3 py-1 rounded-lg font-heading text-xs uppercase font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
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
                className={`min-h-[38px] px-3 py-1 rounded-lg font-heading text-xs uppercase font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
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
                className={`min-h-[38px] px-3 py-1 rounded-lg font-heading text-xs uppercase font-extrabold transition-all flex items-center gap-1.5 cursor-pointer md:hidden ${
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
              className="min-h-[40px] font-heading font-extrabold text-xs uppercase tracking-wide"
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
          <div className="w-full h-3.5 bg-muted rounded-full overflow-hidden flex border-2 border-border shadow-xs">
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

      {/* MODO 1: Grade dos 10 Períodos em Colunas Responsivas */}
      {viewMode === 'columns' && (
        <div className="space-y-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono font-bold text-muted-foreground flex items-center gap-1.5">
              <span>↔</span> Arraste lateralmente ou clique com botão direito para ações rápidas
            </span>
          </div>

          <div className="overflow-x-auto pb-4 scrollbar-none [mask-image:linear-gradient(to_right,transparent_0px,black_16px,black_calc(100%-16px),transparent_100%)]">
            <div className="flex gap-4 min-w-[1240px] px-2 py-1">
              {periods.map((p) => {
                const periodMandatory = Object.values(DISCIPLINAS_GRAFO).filter((d) => d.period === p);
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

                          return (
                            <ContextMenu key={disc.code}>
                              <ContextMenuTrigger asChild>
                                <div
                                  className={`p-2.5 rounded-lg border-2 transition-all text-xs cursor-pointer ${
                                    isCompleted
                                      ? 'bg-[#DCFCE7] border-[#15803D]'
                                      : 'bg-white border-border hover:shadow-xs'
                                  }`}
                                  onClick={() => handleSelectDiscipline(disc)}
                                >
                                  <div className="flex items-start justify-between gap-1.5 mb-1">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-mono font-black text-left text-primary hover:underline">
                                        {disc.code}
                                      </span>
                                      {isCompleted && (
                                        <span className="text-[10px] font-bold uppercase py-0.5 px-1.5 rounded text-[#15803D] bg-[#DCFCE7] border border-[#15803D]">
                                          FEITO ✓
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
                                        className="min-w-[40px] min-h-[40px] -my-2 -mr-1 flex items-center justify-center cursor-pointer"
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
                                </div>
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
                                      ? 'bg-[#DCFCE7] border-[#15803D]'
                                      : 'bg-[#FFFBEB] border-[#B45309]'
                                  }`}
                                  onClick={() => handleSelectCustomCourse(cust)}
                                >
                                  <div className="flex items-start justify-between gap-1 mb-1">
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-heading uppercase font-extrabold bg-[#B45309] text-white">
                                      {cust.category === 'formacao_livre' ? 'LIVRE' : 'OPTATIVA'}
                                    </span>
                                    <div className="flex items-center">
                                      <label
                                        htmlFor={`chk-custom-${cust.id}`}
                                        className="min-w-[40px] min-h-[40px] -my-2 flex items-center justify-center cursor-pointer"
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
                                        className="min-w-[36px] min-h-[36px] -my-2 -mr-1 flex items-center justify-center text-muted-foreground hover:text-destructive text-sm cursor-pointer"
                                        title="Remover do Grafo"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  </div>

                                  <span className="font-mono font-bold text-[#B45309] text-[11px] block">
                                    {cust.code}
                                  </span>
                                  <p className="font-heading font-extrabold text-xs text-foreground leading-tight m-0 mb-1">
                                    {cust.name}
                                  </p>

                                  <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                                    <span>{cust.dept}</span>
                                    <span className="font-bold text-[#B45309]">{cust.ch}h</span>
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
                      className="w-full min-h-[44px] py-2 bg-white hover:bg-[#F4F1EA] border-2 border-dashed border-border rounded-xl text-xs font-heading uppercase font-extrabold text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 transition-all mt-3 cursor-pointer shadow-xs active:translate-x-0.5 active:translate-y-0.5"
                    >
                      <CagpIcon name="plus" className="w-4 h-4" />
                      <span>Adicionar no {p}ºP</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODO 2: Mapa Cartográfico SVG & Trilhas */}
      {viewMode === 'svg' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {/* Filtro por Trilhas Temáticas */}
          <div className="flex flex-wrap items-center gap-1.5 p-3 bg-card border-3 border-border rounded-xl shadow-xs">
            <span className="text-xs font-heading uppercase font-black text-foreground mr-1 flex items-center gap-1.5">
              <CagpIcon name="filter" className="w-3.5 h-3.5 text-primary" />
              Filtrar Trilha:
            </span>
            {Object.entries(TRACK_NAMES).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTrack(key)}
                className={`min-h-[38px] px-3 py-1 rounded-lg text-xs font-heading font-extrabold uppercase border-2 transition-all cursor-pointer ${
                  activeTrack === key
                    ? 'bg-primary text-primary-foreground border-border shadow-xs'
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
              Toque em um nó para abrir o Drawer de detalhes
            </span>
          </div>

          {/* Viewport do Grafo SVG */}
          <div className="overflow-x-auto pb-4 scrollbar-none [mask-image:linear-gradient(to_right,transparent_0px,black_16px,black_calc(100%-16px),transparent_100%)]">
            <div className="cagp-grafo-viewport border-3 border-border rounded-xl bg-card overflow-hidden min-w-[980px] shadow-md">
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
            </div>
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
                          isCompleted ? 'bg-[#DCFCE7] border-[#15803D]' : 'bg-white border-border'
                        }`}
                        onClick={() => handleSelectDiscipline(disc)}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-black text-xs text-primary">{disc.code}</span>
                            {isCompleted && (
                              <span className="text-[9px] font-bold uppercase px-1 py-0.5 rounded bg-[#DCFCE7] text-[#15803D] border border-[#15803D]">
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
