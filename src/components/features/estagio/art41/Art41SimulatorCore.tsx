// src/components/features/estagio/art41/Art41SimulatorCore.tsx — Simulador Completo de Dispensa pelo Art. 41 (Padrão Dossiê Tátil)
import React, { useState, useEffect } from 'react';
import { getVaultItem, setVaultItem, type VaultData } from '../../../../lib/storage/studentVault';
import { CagpIcon, type CagpIconName } from '../../../ui/CagpIcon';

interface Art41Criterion {
  id: string;
  label: string;
  iconName: CagpIconName;
}

const ART41_CRITERIA: Art41Criterion[] = [
  {
    id: 'crit_vinculo',
    label: 'Vínculo profissional em órgão público (administração direta ou indireta) ou entidade do terceiro setor com atuação em políticas públicas (Art. 41, caput)',
    iconName: 'briefcase',
  },
  {
    id: 'crit_matricula',
    label: 'Matrícula regular em Estágio Curricular A (DCP 135, 180h) e/ou Estágio Curricular B (DCP 136, 120h) no período letivo vigente (Art. 41, § 1º, I)',
    iconName: 'curso',
  },
  {
    id: 'crit_fase1',
    label: 'Início do Período: Apresentação de Requerimento com Declaração da chefia imediata atestando vínculo, período e atividades exercidas (Art. 41, § 1º, II)',
    iconName: 'file-text',
  },
  {
    id: 'crit_horas',
    label: 'Carga horária acumulada no exercício profissional igual ou superior à da disciplina requerida (≥ 180h Estágio A / ≥ 120h Estágio B) (Art. 41, § 1º, III)',
    iconName: 'clock',
  },
  {
    id: 'crit_fase2',
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

  useEffect(() => {
    const raw = getVaultItem('cagp_art41_checklist_v1') || {};
    setChecks(raw);
  }, []);

  const toggleCheck = (id: string) => {
    const next = { ...checks, [id]: !checks[id] };
    setChecks(next);
    setVaultItem('cagp_art41_checklist_v1', next);
  };

  const checkedCount = ART41_CRITERIA.filter((c) => checks[c.id]).length;
  const isFullyEligible = checkedCount === ART41_CRITERIA.length;

  return (
    <div className="cagp-art41-simulator space-y-6 select-none text-[#0A0A0A]">
      {/* Cabeçalho do Simulador em Folha Contínua */}
      <div className="p-5 sm:p-6 bg-white border border-[#DFDBD2] rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <span className="text-[11px] font-['Oswald'] uppercase font-bold tracking-wider text-[#8B1E2D]">
            Regulamento do Curso • Capítulo VII
          </span>
          <h3 className="font-['Oswald'] text-base sm:text-lg font-bold uppercase text-[#0A0A0A] m-0">
            Simulador de Dispensa por Atuação Profissional (Art. 41)
          </h3>
          <p className="text-xs text-[#57534E] mt-0.5 m-0">
            Verifique se sua experiência profissional permite a dispensa das 300h de estágio obrigatório.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1.5 rounded-full font-['Oswald'] text-xs font-bold uppercase tracking-wider ${
              isFullyEligible
                ? 'bg-[#15803D] text-white shadow-xs'
                : 'bg-[#FBF8F3] text-[#57534E] border border-[#DFDBD2]'
            }`}
          >
            {checkedCount} de {ART41_CRITERIA.length} Requisitos
          </span>
        </div>
      </div>

      {/* Seleção do Tipo de Vínculo */}
      <div className="space-y-2.5">
        <span className="text-xs font-['Oswald'] uppercase font-bold text-[#292524] block">
          1. Selecione seu Vínculo Profissional:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {EMPLOYMENT_MODES.map((m) => {
            const isSelected = selectedMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMode(m.id)}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all min-h-[80px] cursor-pointer ${
                  isSelected
                    ? 'bg-[#8B1E2D] text-white border-[#8B1E2D] shadow-xs'
                    : 'bg-white text-[#0A0A0A] border-[#DFDBD2] hover:bg-[#FBF8F3]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <CagpIcon
                    name={m.iconName}
                    className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#8B1E2D]'}`}
                  />
                  <span className="font-['Oswald'] text-xs font-bold uppercase tracking-wide">{m.label}</span>
                </div>
                <span className={`text-[11px] leading-tight ${isSelected ? 'text-white/85' : 'text-[#57534E]'}`}>
                  {m.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Checklist dos 5 Critérios Normativos */}
      <div className="p-5 sm:p-6 bg-white border border-[#DFDBD2] rounded-3xl space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#DFDBD2] pb-3">
          <span className="text-xs font-['Oswald'] uppercase font-bold text-[#0A0A0A]">
            2. Critérios Normativos para Deferimento do Colegiado:
          </span>
          <span className="text-[11px] text-[#57534E] font-mono">Art. 41, §§ 1º a 3º</span>
        </div>

        <div className="space-y-2.5">
          {ART41_CRITERIA.map((crit) => {
            const isChecked = !!checks[crit.id];
            return (
              <label
                key={crit.id}
                className={`p-4 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-[#F0FDF4] border-[#15803D]/50'
                    : 'bg-[#FBF8F3] border-[#DFDBD2] hover:bg-[#F4F1EA]'
                }`}
              >
                <input
                  type="checkbox"
                  id={`art41-${crit.id}`}
                  name={`art41-${crit.id}`}
                  checked={isChecked}
                  onChange={() => toggleCheck(crit.id)}
                  className="mt-0.5 w-5 h-5 text-[#15803D] accent-[#15803D] rounded border-gray-300 focus:ring-0 cursor-pointer shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-xs text-[#292524] leading-relaxed font-medium block">
                    {crit.label}
                  </span>
                </div>
                {isChecked && (
                  <span className="cagp-stamp-badge is-deferido text-[10px] py-0.5 px-2.5 shrink-0">
                    <span className="inline-flex items-center gap-1">
                      <CagpIcon name="check" className="w-3 h-3 inline" />
                      <span>ATENDIDO</span>
                    </span>
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* Banner de Resultado e Parecer */}
      <div
        className={`p-5 sm:p-6 rounded-3xl border shadow-xs transition-all ${
          isFullyEligible
            ? 'bg-[#DCFCE7]/70 border-[#15803D]'
            : 'bg-[#FEF3C7]/60 border-[#B45309]'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <span
              className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-xs ${
                isFullyEligible
                  ? 'bg-[#15803D] text-white'
                  : 'bg-[#B45309] text-white'
              }`}
            >
              <CagpIcon
                name={isFullyEligible ? 'check' : 'info'}
                className="w-5 h-5"
              />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-['Oswald'] text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white border border-current">
                  {isFullyEligible ? 'Parecer: Totalmente Elegível' : 'Pendências Identificadas'}
                </span>
              </div>
              <h4 className="font-['Oswald'] text-sm sm:text-base font-bold uppercase text-[#0A0A0A] m-0 mb-1">
                {isFullyEligible
                  ? 'Você Cumpre Todos os Requisitos do Art. 41!'
                  : `Faltam ${ART41_CRITERIA.length - checkedCount} Critério(s) para Solicitar a Dispensa`}
              </h4>
              <p className="text-xs text-[#292524] leading-relaxed m-0">
                {isFullyEligible
                  ? 'Você pode requerer a dispensa integral das disciplinas DCP 135 (180h) e DCP 136 (120h). Providencie a Declaração de sua chefia e protocole no início do semestre letivo com o professor orientador de estágio do DCP.'
                  : 'Para obter a dispensa de estágio, é necessário cumprir todos os requisitos formais. Caso trabalhe no setor privado em atividades não correlatas à gestão pública, consulte as opções de cumprimento de estágio nas férias (Art. 31).'}
              </p>
            </div>
          </div>

          {isFullyEligible && (
            <div className="cagp-big-stamp shrink-0 scale-90 sm:scale-100 self-center sm:self-auto shadow-xs">
              <span className="cagp-big-stamp-title">★ DISPENSA DEFERÍVEL</span>
              <span className="cagp-big-stamp-sub">ART. 41 REGULAMENTO N-20229</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
