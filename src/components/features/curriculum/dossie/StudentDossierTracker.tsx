// src/components/features/curriculum/dossie/StudentDossierTracker.tsx — Termômetro de Integralização das 3.000h
import React, { useState, useEffect } from 'react';
import {
  getVaultItem,
  type CustomCourse,
} from '../../../../lib/storage/studentVault';

export const StudentDossierTracker: React.FC = () => {
  const [customCourses, setCustomCourses] = useState<CustomCourse[]>([]);
  const [calcData, setCalcData] = useState<Record<string, number>>({});
  const [completedMandatoryCount, setCompletedMandatoryCount] = useState<number>(0);

  const loadData = () => {
    const rawCurriculum = getVaultItem('cagp_custom_curriculum_v1');
    setCustomCourses(rawCurriculum?.assignedCourses || []);
    setCalcData(getVaultItem('cagp_calc_ext_aac_v1') || {});
    try {
      const savedGrade = getVaultItem('cagp_minha_grade_v1');
      if (savedGrade?.savedCourses) {
        setCompletedMandatoryCount(savedGrade.savedCourses.length);
      }
    } catch {}
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('cagp:vault-updated', handleUpdate);
    window.addEventListener('cagp-vault-updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('cagp:vault-updated', handleUpdate);
      window.removeEventListener('cagp-vault-updated', handleUpdate);
    };
  }, []);

  const mandatoryTotal = 1860;
  const mandatoryDone = Math.min(mandatoryTotal, completedMandatoryCount * 60);

  const optativasHours = customCourses.reduce((sum, c) => sum + (c.ch || 60), 0);
  const optativasCapped = Math.min(1020, optativasHours);

  const extKeys = ['ext_lab_a', 'ext_lab_b', 'ext_junior', 'ext_siex', 'ext_cursos'];
  const extDone = Math.min(300, extKeys.reduce((sum, k) => sum + (calcData[k] || 0), 0));

  const aacKeys = [
    'aac_pesquisa_inter', 'aac_monitoria', 'aac_eventos', 'aac_grupos_estudo',
    'aac_iniciacao_cientifica', 'aac_pesquisa_biblio', 'aac_trabalho_anais',
    'aac_artigo_periodico', 'aac_vivencia_prof'
  ];
  const aacDone = Math.min(300, aacKeys.reduce((sum, k) => sum + (calcData[k] || 0), 0));

  const totalCompleted = mandatoryDone + optativasCapped + extDone;
  const degreeTotal = 3000;
  const totalPct = Math.round((totalCompleted / degreeTotal) * 100);

  return (
    <div className="cagp-student-dossier p-6 bg-white border-[3px] border-border rounded-xl space-y-5 shadow-md select-none text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-border pb-3">
        <div>
          <span className="text-xs font-head uppercase font-bold tracking-wider text-secondary">
            Dossiê de Integralização Discente
          </span>
          <h3 className="font-head text-base sm:text-lg font-black text-foreground m-0">
            Termômetro das 3.000 Horas da Graduação
          </h3>
          <p className="font-body text-xs text-muted-foreground mt-0.5 m-0">
            Acompanhamento automatizado de créditos e cargas horárias do PPC 2020.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-mono text-muted-foreground uppercase font-bold block">Integralizado</span>
            <span className="text-base sm:text-lg font-mono font-bold text-secondary">
              {totalCompleted}h / {degreeTotal}h
            </span>
          </div>
          {totalCompleted >= degreeTotal ? (
            <span className="cagp-stamp-badge is-homologado text-xs py-1.5 px-3 border-3 border-border shadow-sm">
              APTO À COLAÇÃO
            </span>
          ) : (
            <span className="px-3 py-1.5 rounded-lg bg-foreground text-background text-white font-mono text-xs font-bold border border-border shadow-xs shrink-0">
              {totalPct}%
            </span>
          )}
        </div>
      </div>

      {/* Barra Principal Geral */}
      <div className="space-y-1.5">
        <div className="w-full bg-[#F3ECE0] border-3 border-border rounded-full h-4 overflow-hidden shadow-xs">
          <div
            className="bg-secondary h-full transition-all duration-500"
            style={{ width: `${Math.min(100, totalPct)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground font-mono font-bold">
          <span>0h</span>
          <span>{totalCompleted}h cumpridas ({Math.round(totalCompleted / 15)} créditos)</span>
          <span>3.000h</span>
        </div>
      </div>

      {/* Grid das 4 Dimensões Oficiais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
        <div className="p-3.5 bg-white border-2 border-border rounded-xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-head uppercase font-bold text-foreground">
              1. Obrigatórias
            </span>
            <span className="text-xs font-mono font-bold text-foreground">
              {mandatoryDone}/1.860h
            </span>
          </div>
          <div className="w-full bg-white border border-border rounded-full h-2 overflow-hidden">
            <div
              className="bg-foreground text-background h-full"
              style={{ width: `${Math.min(100, (mandatoryDone / mandatoryTotal) * 100)}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground block truncate font-body">
            27 matérias do núcleo
          </span>
        </div>

        <div className="p-3.5 bg-white border-2 border-border rounded-xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-head uppercase font-bold text-foreground">
              2. Optativas / Livre
            </span>
            <span className="text-xs font-mono font-bold text-secondary">
              {optativasCapped}/1.020h
            </span>
          </div>
          <div className="w-full bg-white border border-border rounded-full h-2 overflow-hidden">
            <div
              className="bg-secondary h-full"
              style={{ width: `${Math.min(100, (optativasCapped / 1020) * 100)}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground block truncate font-body">
            {customCourses.length} alocada{customCourses.length === 1 ? '' : 's'} no grafo
          </span>
        </div>

        <div className="p-3.5 bg-white border-2 border-border rounded-xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-head uppercase font-bold text-foreground">
              3. Extensão 300h
            </span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-mono font-bold text-[#266264]">
                {extDone}/300h
              </span>
              {extDone >= 300 && (
                <span className="cagp-stamp-badge is-teto text-xs py-0.5 px-1.5 rounded-md border border-border">
                  TETO
                </span>
              )}
            </div>
          </div>
          <div className="w-full bg-white border border-border rounded-full h-2 overflow-hidden">
            <div
              className="bg-teal-700 h-full"
              style={{ width: `${Math.min(100, (extDone / 300) * 100)}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground block truncate font-body">
            Resolução CEPE 10/19
          </span>
        </div>

        <div className="p-3.5 bg-white border-2 border-border rounded-xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-head uppercase font-bold text-foreground">
              4. AAC (Art. 15)
            </span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-mono font-bold text-accent">
                {aacDone}/300h
              </span>
              {aacDone >= 300 && (
                <span className="cagp-stamp-badge is-teto text-xs py-0.5 px-1.5 rounded-md border border-border">
                  TETO
                </span>
              )}
            </div>
          </div>
          <div className="w-full bg-white border border-border rounded-full h-2 overflow-hidden">
            <div
              className="bg-accent h-full"
              style={{ width: `${Math.min(100, (aacDone / 300) * 100)}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground block truncate font-body">
            Abate horas de optativas
          </span>
        </div>
      </div>
    </div>
  );
};
