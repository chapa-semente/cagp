// src/components/features/acg/calculator/AcgCalculatorWidget.tsx — Widget de Resumo das 600h
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { bounceSpring } from '@/lib/motion';
import { getVaultItem } from '../../../../lib/storage/studentVault';
import { route } from '../../../../lib/paths';

const EXT_KEYS = ['ext_lab_a', 'ext_lab_b', 'ext_junior', 'ext_siex', 'ext_cursos'];
const AAC_KEYS = [
  'aac_pesquisa_inter',
  'aac_monitoria',
  'aac_eventos',
  'aac_grupos_estudo',
  'aac_iniciacao_cientifica',
  'aac_pesquisa_biblio',
  'aac_trabalho_anais',
  'aac_artigo_periodico',
  'aac_vivencia_prof',
];

export const AcgCalculatorWidget: React.FC = () => {
  const [data, setData] = useState<Record<string, number>>({});

  useEffect(() => {
    const load = () => {
      setData(getVaultItem('cagp_calc_ext_aac_v1') || {});
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

  const extTotal = Math.min(
    300,
    EXT_KEYS.reduce((sum, k) => sum + (data[k] || 0), 0)
  );
  const aacTotal = Math.min(
    300,
    AAC_KEYS.reduce((sum, k) => sum + (data[k] || 0), 0)
  );
  const total = extTotal + aacTotal;
  const pct = Math.round((total / 600) * 100);

  return (
    <div className="cagp-card p-5 bg-white border-2 border-border rounded-xl flex flex-col justify-between h-full shadow hover:shadow-xs hover:translate-x-[1px] hover:translate-y-[1px] transition-all select-none">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-xl bg-secondary-tint text-secondary flex items-center justify-center text-lg border border-secondary shadow-xs">
              <i className="bi bi-calculator-fill" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-head font-bold text-sm text-foreground leading-tight m-0">
                Calculadora 600h
              </h3>
              <span className="text-xs text-muted-foreground font-mono">Extensão 300h + AAC 300h</span>
            </div>
          </div>
          <span
            className={`px-2.5 py-1 rounded-md font-head text-xs font-bold border border-border shadow-xs ${
              total >= 600
                ? 'bg-teal-700 text-white'
                : total > 0
                ? 'bg-secondary text-white'
                : 'bg-white text-foreground'
            }`}
          >
            {total >= 600 ? '100% Concluído' : `${pct}% Integralizado`}
          </span>
        </div>

        <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3.5">
          Simulador com trava automática dos tetos do Art. 15 e cálculo em blocos de 15h (1 crédito).
        </p>

        {/* Barras Lineares de Progresso com Mola */}
        <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-1">
              <span className="text-secondary uppercase font-head">Extensão Obrigatória</span>
              <span className="font-mono text-foreground">{extTotal}/300h ({Math.round(extTotal / 15)} cr)</span>
            </div>
            <div className="w-full bg-surface-hover border-3 border-border rounded-full h-3 overflow-hidden shadow-xs">
              <motion.div
                initial={false}
                animate={{ width: `${Math.min(100, (extTotal / 300) * 100)}%` }}
                transition={bounceSpring}
                className="bg-secondary h-full"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-1">
              <span className="text-secondary uppercase font-head">Atividades Complementares (AAC)</span>
              <span className="font-mono text-foreground">{aacTotal}/300h ({Math.round(aacTotal / 15)} cr)</span>
            </div>
            <div className="w-full bg-surface-hover border-3 border-border rounded-full h-3 overflow-hidden shadow-xs">
              <motion.div
                initial={false}
                animate={{ width: `${Math.min(100, (aacTotal / 300) * 100)}%` }}
                transition={bounceSpring}
                className="bg-teal-700 h-full"
              />
            </div>
          </div>
        </div>
      </div>

      <a
        href={route('/acg') + '#calculadora'}
        className="min-h-[44px] px-4 py-2.5 bg-primary text-white hover:bg-primary-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-white rounded-xl font-head text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all no-underline border-3 border-border shadow-sm"
      >
        <span>Simular Horas</span>
        <i className="bi bi-arrow-right" aria-hidden="true" />
      </a>
    </div>
  );
};
