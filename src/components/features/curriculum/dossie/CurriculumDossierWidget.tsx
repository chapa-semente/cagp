// src/components/features/curriculum/dossie/CurriculumDossierWidget.tsx — Widget de Resumo do Dossiê 3.000h
import React, { useState, useEffect } from 'react';
import { getVaultItem, type CustomCourse } from '../../../../lib/storage/studentVault';

export const CurriculumDossierWidget: React.FC = () => {
  const [customList, setCustomList] = useState<CustomCourse[]>([]);
  const [calcData, setCalcData] = useState<Record<string, number>>({});

  useEffect(() => {
    const load = () => {
      const raw = getVaultItem('cagp_custom_curriculum_v1');
      setCustomList(raw?.assignedCourses || []);
      setCalcData(getVaultItem('cagp_calc_ext_aac_v1') || {});
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

  const optativasHours = customList.reduce((sum, c) => sum + (c.ch || 60), 0);
  const extTotal = Math.min(300, (calcData['ext_lab_a'] || 0) + (calcData['ext_lab_b'] || 0) + (calcData['ext_junior'] || 0) + (calcData['ext_siex'] || 0) + (calcData['ext_cursos'] || 0));

  return (
    <div className="cagp-card p-5 bg-white border-2 border-border rounded-xl flex flex-col justify-between h-full shadow hover:shadow-xs hover:translate-x-[1px] hover:translate-y-[1px] transition-all select-none">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-xl bg-secondary-tint text-secondary flex items-center justify-center text-lg border border-secondary shadow-xs">
              <i className="bi bi-mortarboard-fill" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-head font-bold text-sm text-foreground leading-tight m-0">
                Dossiê Discente
              </h3>
              <span className="text-xs text-muted-foreground font-mono">Meta de 3.000h</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-md font-head text-xs font-bold bg-secondary text-white border border-border shadow-xs">
            PPC 2020
          </span>
        </div>

        <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3.5">
          Termômetro com divisão entre 27 obrigatórias, optativas do curso, formação livre (120h) e extensão.
        </p>

        <div className="space-y-2 mb-4 text-xs">
          <div className="flex justify-between items-center text-muted-foreground p-2 bg-white border-3 border-border rounded-lg shadow-xs">
            <span className="font-medium">Optativas Vinculadas:</span>
            <span className="font-mono font-bold text-secondary">{optativasHours}h / 1.020h</span>
          </div>
          <div className="flex justify-between items-center text-muted-foreground p-2 bg-white border-3 border-border rounded-lg shadow-xs">
            <span className="font-medium">Extensão Curricular:</span>
            <span className="font-mono font-bold text-[#266264]">{extTotal}h / 300h</span>
          </div>
        </div>
      </div>

      <a
        href="#minha-grade"
        className="min-h-[44px] px-4 py-2.5 bg-foreground text-background hover:bg-secondary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-white rounded-xl font-head text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all no-underline border-3 border-border shadow-sm"
      >
        <span>Abrir Dossiê Completo</span>
        <i className="bi bi-arrow-right" aria-hidden="true" />
      </a>
    </div>
  );
};
