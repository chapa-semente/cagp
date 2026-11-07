import React from 'react';
import { CagpIcon } from '../../ui/CagpIcon';
import { route } from '../../../lib/paths';

export const CALOURO_STEPS = [
  {
    id: 'step-minhaufmg',
    title: 'Ativar MinhaUFMG e Carteirinha Digital',
    detail: 'Passaporte acadêmico, e-mail institucional e acesso às catracas do RU II.',
  },
  {
    id: 'step-eduroam',
    title: 'Configurar Wi-Fi eduroam no celular',
    detail: 'Conexão automática nos 4 andares da FAFICH e bibliotecas da UFMG.',
  },
  {
    id: 'step-fump',
    title: 'Questionário Socioeconômico da FUMP',
    detail: 'Classificação nos níveis I a IV para desconto ou isenção no Bandejão.',
  },
  {
    id: 'step-salas',
    title: 'Localizar salas no 3º andar e Colegiado (F-2039)',
    detail: 'Secretaria no 2º andar (Norma Guedes) e salas noturnas no 3º andar.',
  },
  {
    id: 'step-aproveitamento',
    title: 'Conferir prazo de Aproveitamento de Estudos',
    detail: 'Dispensa de disciplinas anteriores encerra no 2º período (Res. CEPE 06/19).',
  },
  {
    id: 'step-cagp',
    title: 'Participar da Recepção Discente do CAGP',
    detail: 'Integração noturna com Os Candangos, apadrinhamento e horas AAC.',
  },
];

interface Props {
  checklist: Record<string, boolean>;
  toggleStep: (id: string) => void;
}

export const HomeCalouroGuide: React.FC<Props> = ({ checklist, toggleStep }) => {
  const doneCount = CALOURO_STEPS.filter((s) => checklist[s.id]).length;
  const allDone = doneCount === CALOURO_STEPS.length;
  const pct = Math.round((doneCount / CALOURO_STEPS.length) * 100);

  return (
    <section
      aria-labelledby="heading-role-calouro"
      className="bg-white rounded-xl border-[3px] border-[#0A0A0A] p-5 sm:p-6 shadow-[4px_4px_0_0_#0A0A0A] space-y-4 font-sans"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2
            id="heading-role-calouro"
            className="font-heading text-base sm:text-lg font-extrabold uppercase text-[#0A0A0A] m-0"
          >
            Primeiros 30 Dias na FAFICH • Dossiê de Ingresso
          </h2>
          <p className="text-xs text-[#57534E] font-medium mt-1 m-0">
            Marque cada visto concluído. Seu progresso fica salvo neste dispositivo, sem login.
          </p>
        </div>

        {/* Carimbo Neobrutalista que reage ao progresso */}
        <span
          key={`calouro-stamp-${doneCount}`}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border-2 border-black font-heading font-extrabold text-xs uppercase shadow-[2px_2px_0_0_#0A0A0A] ${
            allDone
              ? 'bg-[#DCFCE7] text-[#15803D]'
              : doneCount > 0
              ? 'bg-[#FEF08A] text-[#854D0E]'
              : 'bg-white text-[#0A0A0A]'
          } tabular-nums`}
        >
          <CagpIcon name="stamp" className="w-3.5 h-3.5" />
          <span>
            {allDone
              ? 'ACOLHIMENTO HOMOLOGADO'
              : `${doneCount}/${CALOURO_STEPS.length} VISTOS`}
          </span>
        </span>
      </div>

      {/* Barra de Progresso do Acolhimento */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs tabular-nums">
          <span className="font-bold text-[#0A0A0A]">Progresso de ambientação noturna</span>
          <span className="font-mono font-bold text-[#9E2424]">{pct}%</span>
        </div>
        <div className="h-3 w-full bg-[#EFE9E0] rounded-md border-2 border-[#0A0A0A] overflow-hidden">
          <div
            className={`h-full transition-[width,background-color] duration-300 ${
              allDone ? 'bg-[#15803D]' : 'bg-[#9E2424]'
            }`}
            style={{ width: `${Math.max(4, pct)}%` }}
          />
        </div>
      </div>

      {/* Lista de Vistos Neobrutalistas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CALOURO_STEPS.map((step, idx) => {
          const checked = Boolean(checklist[step.id]);
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => toggleStep(step.id)}
              aria-pressed={checked}
              className={`p-3.5 rounded-xl border-[2.5px] border-[#0A0A0A] shadow-[2.5px_2.5px_0_0_#0A0A0A] hover:shadow-[4px_4px_0_0_#0A0A0A] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-left transition-all cursor-pointer flex flex-col justify-between min-h-[96px] ${
                checked
                  ? 'bg-[#DCFCE7] text-[#0A0A0A]'
                  : 'bg-white hover:bg-muted text-[#0A0A0A]'
              }`}
            >
              <div className="flex items-start gap-2.5 mb-2">
                <span
                  className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 border-2 border-black text-xs font-mono font-bold transition-colors tabular-nums ${
                    checked
                      ? 'bg-[#15803D] text-white'
                      : 'bg-white text-[#0A0A0A]'
                  }`}
                >
                  {checked ? <CagpIcon name="check" className="w-3.5 h-3.5" /> : idx + 1}
                </span>
                <span
                  className={`text-xs font-heading font-extrabold block leading-snug ${
                    checked ? 'line-through text-[#15803D]' : 'text-[#0A0A0A]'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              <span className="text-[11px] font-sans font-medium text-[#57534E] block leading-relaxed">
                {step.detail}
              </span>
            </button>
          );
        })}
      </div>

      {/* Delight: Chancela ao completar 6/6 vistos */}
      {allDone && (
        <div
          role="status"
          className="pt-3 border-t-[2.5px] border-[#0A0A0A] flex flex-wrap items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-[#15803D] text-white border-2 border-black shadow-[1.5px_1.5px_0_0_#0A0A0A] flex items-center justify-center shrink-0">
              <CagpIcon name="check" className="w-5 h-5" />
            </span>
            <div>
              <strong className="text-xs font-heading font-extrabold text-[#15803D] uppercase block">
                Vistos de Ingresso Concluídos
              </strong>
              <span className="text-xs text-[#57534E] font-medium">
                Parabéns! Você concluiu a ambientação. Agora avance para a Matriz Curricular.
              </span>
            </div>
          </div>
          <a
            href={route('/percurso')}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#9E2424] hover:bg-[#8B1E2D] text-white text-xs font-heading font-extrabold uppercase border-[2.5px] border-black shadow-[2.5px_2.5px_0_0_#0A0A0A] inline-flex items-center gap-1.5 no-underline transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <span>Explorar Matriz Curricular</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      )}
    </section>
  );
};
