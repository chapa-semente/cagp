import React, { useState, useEffect } from 'react';
import { DISCIPLINAS_GRAFO, TRACK_NAMES, type CourseNodeData } from '../../../curriculum/curriculumGraphData';
import {
  getVaultItem,
  setVaultItem,
  type CustomCourse,
} from '../../../../lib/storage/studentVault';
import { CustomCourseModal } from '../custom-course/CustomCourseModal';

interface Props {
  catalogOptions?: Array<{ code: string; name: string; dept: string; ch: number }>;
}

export const CurriculumGraphDynamic: React.FC<Props> = ({ catalogOptions = [] }) => {
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [customCourses, setCustomCourses] = useState<CustomCourse[]>([]);
  const [selectedNode, setSelectedNode] = useState<{
    code: string;
    name: string;
    period: number;
    ch: number;
    desc: string;
    dept: string;
    isCustom?: boolean;
    category?: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPeriod, setModalPeriod] = useState(4);
  const [activeTrack, setActiveTrack] = useState<string>('all');

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
      navigator.vibrate(12);
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

  // Cálculos de Horas
  const mandatoryDoneHours = Object.values(DISCIPLINAS_GRAFO)
    .filter((d) => completedCourses.includes(d.code))
    .reduce((acc, d) => acc + d.ch, 0);

  const customDoneHours = customCourses
    .filter((c) => completedCourses.includes(c.code))
    .reduce((acc, c) => acc + c.ch, 0);

  const totalDoneHours = mandatoryDoneHours + customDoneHours;
  const progressPct = Math.min(100, Math.round((totalDoneHours / 3000) * 100));

  // Agrupamento por período (1 a 10)
  const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="cagp-curriculum-graph-dynamic select-none space-y-6">
      {/* HUD Linear de Integralização da Matriz */}
      <div className="p-4 bg-white border border-[#DFDBD2] rounded-xl shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-[#8B1E2D] text-white flex items-center justify-center font-bold text-sm">
                <i className="bi bi-diagram-3" aria-hidden="true" />
              </span>
              <h3 className="font-['Oswald'] text-base uppercase font-bold text-[#0A0A0A] m-0">
                Grafo Curricular Dinâmico & 10 Períodos
              </h3>
            </div>
            <p className="text-xs text-gray-600 mt-0.5 m-0">
              27 obrigatórias com travas do SIGA + optativas e disciplinas livres vinculadas por você.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openAddModal(4)}
              className="min-h-[44px] px-3.5 py-2 bg-[#8B1E2D] text-white hover:bg-[#0A0A0A] rounded-lg font-['Oswald'] text-xs uppercase font-bold tracking-wider flex items-center gap-2 shadow-[2px_2px_0px_#0A0A0A] transition-all"
            >
              <i className="bi bi-plus-circle" aria-hidden="true" />
              <span>+ Adicionar Optativa / Matéria Livre</span>
            </button>
          </div>
        </div>

        {/* Barra de Progresso das 3.000h */}
        <div>
          <div className="flex justify-between text-xs font-mono text-gray-700 mb-1.5 flex-wrap gap-2">
            <div>
              <span>Obrigatórias: </span>
              <strong className="text-[#8B1E2D]">{mandatoryDoneHours}/1.860h</strong>
              <span className="text-gray-400 mx-2">•</span>
              <span>Optativas / Livres: </span>
              <strong className="text-[#15803D]">{customDoneHours}/1.140h</strong>
            </div>
            <div>
              <span>Total da Graduação: </span>
              <strong className="text-[#0A0A0A]">{totalDoneHours}/3.000h ({progressPct}%)</strong>
            </div>
          </div>
          <div className="w-full h-3 bg-[#DFDBD2] rounded-full overflow-hidden flex">
            <div
              className="h-full bg-[#8B1E2D] transition-all duration-300"
              style={{ width: `${Math.min(100, (mandatoryDoneHours / 3000) * 100)}%` }}
              title="Horas Obrigatórias"
            />
            <div
              className="h-full bg-[#15803D] transition-all duration-300"
              style={{ width: `${Math.min(100, (customDoneHours / 3000) * 100)}%` }}
              title="Horas Optativas e Livres"
            />
          </div>
        </div>
      </div>

      {/* Grade dos 10 Períodos em Colunas Responsivas */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1200px]">
          {periods.map((p) => {
            const periodMandatory = Object.values(DISCIPLINAS_GRAFO).filter((d) => d.period === p);
            const periodCustom = customCourses.filter((c) => c.period === p);

            return (
              <div
                key={p}
                className="w-72 bg-[#F7F5F0] border border-[#DFDBD2] rounded-xl p-3 flex flex-col justify-between shrink-0 shadow-xs"
              >
                <div>
                  {/* Cabeçalho do Período */}
                  <div className="flex items-center justify-between pb-2 mb-2.5 border-b-2 border-[#0A0A0A]">
                    <span className="font-['Oswald'] text-sm font-black uppercase text-[#0A0A0A]">
                      {p}º Período
                    </span>
                    <span className="text-[10px] font-mono text-gray-500 font-bold">
                      {periodMandatory.length + periodCustom.length} matérias
                    </span>
                  </div>

                  {/* Lista de Disciplinas Obrigatórias do Período */}
                  <div className="space-y-2 mb-2">
                    {periodMandatory.map((disc) => {
                      const isCompleted = completedCourses.includes(disc.code);
                      const isKey = disc.isKey;
                      const isFormalLock = disc.isFormalLock;

                      return (
                        <div
                          key={disc.code}
                          className={`p-2.5 rounded-lg border transition-all text-xs ${
                            isCompleted
                              ? 'bg-[#DCFCE7] border-[#15803D]'
                              : 'bg-white border-[#DFDBD2] hover:border-[#0A0A0A]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1.5 mb-1">
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedNode({
                                    code: disc.code,
                                    name: disc.name,
                                    period: disc.period,
                                    ch: disc.ch,
                                    desc: disc.desc,
                                    dept: disc.dept,
                                  })
                                }
                                className="font-mono font-black text-left text-[#8B1E2D] hover:underline"
                              >
                                {disc.code}
                              </button>
                              {isCompleted && (
                                <span className="cagp-stamp-badge is-feito text-[8px] font-black uppercase tracking-wider py-0 px-1 text-[#15803D] border-[#15803D] bg-[#DCFCE7]">
                                  FEITO ✓
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {isFormalLock && (
                                <span className="text-[10px] text-[#DC2626]" title="Trava Formal no SIGA">
                                  <i className="bi bi-lock-fill" aria-hidden="true" />
                                </span>
                              )}
                              <input
                                type="checkbox"
                                checked={isCompleted}
                                onChange={() => handleToggleCompleted(disc.code, disc.ch)}
                                className="w-4 h-4 rounded text-[#8B1E2D] accent-[#8B1E2D] cursor-pointer"
                                aria-label={`Marcar ${disc.code} como concluída`}
                              />
                            </div>
                          </div>

                          <p className="font-['Oswald'] font-bold text-xs text-[#0A0A0A] leading-tight m-0 mb-1">
                            {disc.name}
                          </p>

                          <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono">
                            <span>{disc.dept} • {disc.ch}h</span>
                            {disc.formalReqs.length > 0 && (
                              <span className="text-[#DC2626] font-bold">
                                Req: {disc.formalReqs.join(', ')}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* Disciplinas Optativas e Personalizadas Vinculadas ao Período */}
                    {periodCustom.map((cust) => {
                      const isCompleted = completedCourses.includes(cust.code);

                      return (
                        <div
                          key={cust.id}
                          className={`p-2.5 rounded-lg border-2 border-dashed transition-all text-xs ${
                            isCompleted
                              ? 'bg-[#DCFCE7] border-[#15803D]'
                              : 'bg-[#FFFBEB] border-[#B45309]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1 mb-1">
                            <div className="flex items-center gap-1">
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-['Oswald'] uppercase font-bold bg-[#B45309] text-white">
                                {cust.category === 'formacao_livre' ? 'LIVRE' : 'OPTATIVA'}
                              </span>
                              {isCompleted && (
                                <span className="cagp-stamp-badge is-feito text-[8px] font-black uppercase tracking-wider py-0 px-1 text-[#15803D] border-[#15803D] bg-[#DCFCE7]">
                                  FEITO ✓
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <input
                                type="checkbox"
                                checked={isCompleted}
                                onChange={() => handleToggleCompleted(cust.code, cust.ch)}
                                className="w-4 h-4 rounded accent-[#15803D] cursor-pointer"
                                aria-label={`Marcar ${cust.code} como concluída`}
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveCustomCourse(cust.id, cust.code)}
                                className="text-gray-400 hover:text-[#DC2626] text-xs"
                                title="Remover do Grafo"
                                aria-label="Remover do Grafo"
                              >
                                ✕
                              </button>
                            </div>
                          </div>

                          <span className="font-mono font-bold text-[#B45309] text-[11px] block">
                            {cust.code}
                          </span>
                          <p className="font-['Oswald'] font-bold text-xs text-[#0A0A0A] leading-tight m-0 mb-1">
                            {cust.name}
                          </p>

                          <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono">
                            <span>{cust.dept}</span>
                            <span className="font-bold text-[#B45309]">{cust.ch}h</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Botão de Adição no Período */}
                <button
                  type="button"
                  onClick={() => openAddModal(p)}
                  className="w-full py-2 bg-white hover:bg-[#EAE6DE] border border-dashed border-[#DFDBD2] hover:border-[#0A0A0A] rounded-lg text-[11px] font-['Oswald'] uppercase font-bold text-gray-600 flex items-center justify-center gap-1 transition-all mt-2"
                >
                  <i className="bi bi-plus" aria-hidden="true" />
                  <span>Adicionar no {p}ºP</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Drawer de Detalhes da Disciplina Selecionada */}
      {selectedNode && (
        <div className="p-4 bg-white border-2 border-[#0A0A0A] rounded-xl shadow-[3px_3px_0_#0A0A0A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="cagp-badge cagp-badge-red text-xs">{selectedNode.code}</span>
              <span className="text-xs text-gray-500 font-mono">{selectedNode.dept} • {selectedNode.period}º Período • {selectedNode.ch} horas</span>
            </div>
            <h4 className="font-['Oswald'] text-base font-bold uppercase text-[#0A0A0A] m-0">
              {selectedNode.name}
            </h4>
            <div className="pt-1.5 border-t border-[#DFDBD2]">
              <span className="text-[11px] font-['Oswald'] uppercase font-bold text-[#8B1E2D] block mb-0.5">
                Ementa Oficial (PPC 2020 / DCP UFMG):
              </span>
              <p className="text-xs text-gray-700 max-w-3xl leading-relaxed m-0 select-text">
                {selectedNode.desc}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedNode(null)}
            className="px-3 py-1.5 bg-[#F7F5F0] hover:bg-[#0A0A0A] hover:text-white border border-[#DFDBD2] rounded text-xs font-['Oswald'] uppercase font-bold transition-all shrink-0"
          >
            Fechar Detalhes
          </button>
        </div>
      )}

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
