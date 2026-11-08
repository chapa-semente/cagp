import React from 'react';
import { motion } from 'motion/react';
import { CagpIcon } from '@/components/ui/CagpIcon';
import { route } from '@/lib/paths';

export const ART41_PREVIEW_STEPS = [
  {
    id: 'art41-vinculo',
    label: 'Atuação comprovada na administração pública ou terceiro setor correlato',
    norm: 'Art. 41, I',
  },
  {
    id: 'art41-tempo',
    label: 'Tempo mínimo exigido pelo Regulamento de Estágio (DCP 135 / DCP 136)',
    norm: '300h equiv.',
  },
  {
    id: 'art41-relatorio',
    label: 'Relatório de atividades profissionais e requerimento assinado no SEI',
    norm: 'Processo SEI',
  },
];

export const UFMG_SYSTEMS = [
  { name: 'SIGA UFMG', desc: 'Matrícula e Histórico', href: 'https://siga.ufmg.br', color: '#9E2424' },
  { name: 'MinhaUFMG', desc: 'E-mail e Serviços', href: 'https://minha.ufmg.br', color: '#005A9C' },
  { name: 'Moodle Virtual', desc: 'Salas de Aula', href: 'https://virtual.ufmg.br', color: '#B45309' },
  { name: 'SEI UFMG', desc: 'Processos Oficiais', href: 'https://sei.ufmg.br', color: '#15803D' },
];

interface Props {
  art41Checklist: Record<string, boolean>;
  toggleArt41Step: (id: string) => void;
}

export const HomeAcademicTools: React.FC<Props> = ({ art41Checklist, toggleArt41Step }) => {
  return (
    <div className="space-y-6 font-sans">
      {/* Bloco Art. 41 Preview para Veteranos / Formandos */}
      <section
        aria-labelledby="heading-art41-preview"
        className="bg-white rounded-xl border-[3px] border-border p-5 sm:p-6 shadow-md space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-success text-white border-2 border-black shadow-xs flex items-center justify-center shrink-0">
              <CagpIcon name="shield" className="w-5 h-5" />
            </span>
            <div>
              <h2
                id="heading-art41-preview"
                className="font-heading text-base sm:text-lg font-extrabold uppercase text-foreground m-0"
              >
                Dispensa de Estágio • Art. 41
              </h2>
              <p className="text-xs text-muted-foreground font-medium m-0">
                Aproveitamento de atuação profissional para estudantes trabalhadores
              </p>
            </div>
          </div>

          <a
            href={route('/estagio') + '#art41'}
            className="min-h-[44px] px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold text-secondary hover:bg-muted border-2 border-transparent hover:border-border no-underline inline-flex items-center gap-1 transition-all"
          >
            <span>Simulador completo</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <div className="space-y-2">
          {ART41_PREVIEW_STEPS.map((step) => {
            const checked = Boolean(art41Checklist[step.id]);
            return (
              <motion.button
                key={step.id}
                type="button"
                onClick={() => toggleArt41Step(step.id)}
                aria-pressed={checked}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-3 rounded-xl border-3 border-border shadow-sm text-left cursor-pointer flex items-center justify-between gap-3 min-h-[48px] ${
                  checked
                    ? 'bg-success/20 text-foreground'
                    : 'bg-white hover:bg-muted text-foreground'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 border-2 border-black text-xs font-mono font-bold ${
                      checked
                        ? 'bg-success text-white'
                        : 'bg-white'
                    }`}
                  >
                    {checked && <CagpIcon name="check" className="w-3.5 h-3.5" />}
                  </span>
                  <span
                    className={`text-xs font-medium leading-snug truncate ${
                      checked ? 'line-through text-success' : 'text-foreground'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-foreground bg-white px-2 py-0.5 rounded border border-black shadow-xs shrink-0">
                  {step.norm}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Acesso Rápido aos Sistemas Oficiais da UFMG */}
      <section
        aria-labelledby="heading-sistemas-ufmg"
        className="bg-white rounded-xl border-[3px] border-border shadow-md overflow-hidden"
      >
        <div className="px-5 py-3.5 border-b-[3px] border-border bg-white flex items-center justify-between">
          <h3
            id="heading-sistemas-ufmg"
            className="font-heading text-xs sm:text-sm font-extrabold uppercase text-foreground m-0"
          >
            Sistemas Oficiais UFMG
          </h3>
          <span className="text-xs font-mono font-bold text-muted-foreground">Acesso Direto</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y-3 sm:divide-y-0 sm:divide-x-3 divide-[#16181d]">
          {UFMG_SYSTEMS.map((sys) => (
            <a
              key={sys.name}
              href={sys.href}
              target="_blank"
              rel="noopener noreferrer"
              data-context-type="tool"
              data-context-data={JSON.stringify({ name: sys.name, href: sys.href })}
              className="p-4 bg-card hover:bg-muted text-foreground no-underline flex items-center justify-between gap-2 transition-all active:translate-x-0.5 active:translate-y-0.5 min-h-[64px]"
            >
              <div className="min-w-0">
                <span className="text-xs font-heading font-extrabold text-foreground flex items-center gap-2 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black shrink-0"
                    style={{ backgroundColor: sys.color }}
                    aria-hidden="true"
                  />
                  <span className="truncate">{sys.name}</span>
                </span>
                <span className="text-xs text-muted-foreground font-medium block truncate mt-0.5">{sys.desc}</span>
              </div>
              <CagpIcon name="arrow-up-right" className="w-4 h-4 text-secondary shrink-0" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
