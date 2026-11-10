// src/components/features/curriculum/graph/CurriculumGraphWidget.tsx — Widget de Resumo do Grafo Dinâmico 10P
import React, { useState, useEffect } from 'react';
import { getVaultItem, type CustomCourse } from '../../../../lib/storage/studentVault';

export const CurriculumGraphWidget: React.FC = () => {
  const [customList, setCustomList] = useState<CustomCourse[]>([]);

  useEffect(() => {
    const load = () => {
      const raw = getVaultItem('cagp_custom_curriculum_v1');
      setCustomList(raw?.assignedCourses || []);
    };
    load();
    const handleUpdate = () => load();
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('cagp-vault-updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('cagp-vault-updated', handleUpdate);
    };
  }, []);

  return (
    <div className="cagp-card p-5 bg-white border-2 border-border rounded-xl flex flex-col justify-between h-full shadow hover:shadow-xs hover:translate-x-[1px] hover:translate-y-[1px] transition-all select-none">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-xl bg-teal-700/10 text-[#266264] flex items-center justify-center text-lg border border-[#266264] shadow-xs">
              <i className="bi bi-diagram-3-fill" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-head font-bold text-sm text-foreground leading-tight m-0">
                Grafo Dinâmico 10P
              </h3>
              <span className="text-xs text-muted-foreground font-mono">10 Semestres Noturno</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-md font-head text-xs font-bold bg-teal-700 text-white border border-border shadow-xs">
            {customList.length} optativa{customList.length === 1 ? '' : 's'}
          </span>
        </div>

        <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3.5">
          Grafo interativo com 27 disciplinas obrigatórias e slots customizáveis para simular seu fluxo de matrícula no SIGA.
        </p>

        <div className="p-3 bg-white border-2 border-border rounded-lg mb-4 flex items-center justify-between text-xs shadow-xs">
          <span className="text-muted-foreground font-medium">Matérias Obrigatórias:</span>
          <span className="font-mono font-bold text-foreground">27 (1.860h)</span>
        </div>
      </div>

      <a
        href="#grafo"
        className="min-h-[44px] px-4 py-2.5 bg-foreground text-background hover:bg-teal-700 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-white rounded-xl font-head text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all no-underline border-3 border-border shadow-sm"
      >
        <span>Explorar Grafo Vivo</span>
        <i className="bi bi-arrow-right" aria-hidden="true" />
      </a>
    </div>
  );
};
