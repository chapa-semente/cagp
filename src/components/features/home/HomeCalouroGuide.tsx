import React from 'react';
import { motion } from 'motion/react';
import { CagpIcon } from '@/components/ui/CagpIcon';
import { route } from '@/lib/paths';

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
      className="bg-white rounded-xl border-2 border-border p-5 sm:p-6 shadow-md space-y-4 font-sans"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2
            id="heading-role-calouro"
            className="font-heading text-base sm:text-lg font-extrabold text-foreground m-0"
          >
            Primeiros 30 Dias na FAFICH • Dossiê de Ingresso
          </h2>
          <p className="text-xs text-muted-foreground font-medium mt-1 m-0 max-w-prose">
            Marque cada visto concluído. Seu progresso fica salvo neste dispositivo, sem login.
          </p>
        </div>

        {/* Carimbo Neobrutalista que reage ao progresso */}
        <span
          key={`calouro-stamp-${doneCount}`}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border-2 border-border font-heading font-extrabold text-xs uppercase tracking-wide shadow-sm ${
            allDone
              ? 'bg-success-tint text-success'
              : doneCount > 0
              ? 'bg-[#FEF3C7] text-[#854D0E]'
              : 'bg-white text-foreground'
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
          <span className="font-bold text-foreground">Progresso de ambientação noturna</span>
          <span className="font-mono font-bold text-secondary">{pct}%</span>
        </div>
        <div className="h-3 w-full bg-[#E7E3D8] rounded-md border-3 border-border overflow-hidden">
          <div
            className={`h-full transition-[width,background-color] duration-300 ${
              allDone ? 'bg-success' : 'bg-secondary'
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
            <motion.button
              key={step.id}
              type="button"
              onClick={() => toggleStep(step.id)}
              aria-pressed={checked}
              whileHover={{ y: -2, x: -1 }}
              whileTap={{ y: 2, x: 2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className={`p-3.5 rounded-xl border-2 border-border shadow text-left cursor-pointer flex flex-col justify-between min-h-[96px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed ${
                checked
                  ? 'bg-success-tint text-foreground'
                  : 'bg-white hover:bg-muted text-foreground'
              }`}
            >
              <div className="flex items-start gap-2.5 mb-2">
                <span
                  className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 border-2 border-border text-xs font-mono font-bold transition-colors tabular-nums ${
                    checked
                      ? 'bg-success text-white'
                      : 'bg-white text-foreground'
                  }`}
                >
                  {checked ? <CagpIcon name="check" className="w-3.5 h-3.5" /> : idx + 1}
                </span>
                <span
                  className={`text-xs font-heading font-extrabold tracking-tight block leading-snug ${
                    checked ? 'line-through text-success' : 'text-foreground'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              <span className="text-xs font-sans font-medium text-muted-foreground block leading-relaxed">
                {step.detail}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Delight: Chancela ao completar 6/6 vistos */}
      {allDone && (
        <div
          role="status"
          className="pt-3 border-t-2 border-border flex flex-wrap items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-success text-white border-2 border-border shadow-xs flex items-center justify-center shrink-0">
              <CagpIcon name="check" className="w-5 h-5" />
            </span>
            <div>
              <strong className="text-xs font-heading font-extrabold tracking-wide text-success uppercase block">
                Vistos de Ingresso Concluídos
              </strong>
              <span className="text-xs text-muted-foreground font-medium max-w-prose">
                Parabéns! Você concluiu a ambientação. Agora avance para a Matriz Curricular.
              </span>
            </div>
          </div>
          <a
            href={route('/percurso')}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-secondary hover:bg-secondary-hover text-white text-xs font-heading font-extrabold uppercase tracking-wide border-2 border-border shadow-sm inline-flex items-center gap-1.5 no-underline transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span>Explorar Matriz Curricular</span>
            <i className="bi bi-arrow-right" aria-hidden="true" />
          </a>
        </div>
      )}
    </section>
  );
};
