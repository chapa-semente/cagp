// src/components/features/calouros/checklist/CalouroChecklistCore.tsx — Checklist Interativo dos Primeiros 30 Dias (Padrão Dossiê Tátil + Motion Expressivo)
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getVaultItem, setVaultItem, type VaultData } from '../../../../lib/storage/studentVault';
import { asset, route } from '../../../../lib/paths';
import { CagpIcon, type CagpIconName } from '@/components/ui/CagpIcon';
import { bounceSpring, tactileSpring, staggerContainer, staggerItem } from '@/lib/motion';

interface ChecklistItem {
  id: string;
  category: 'acesso' | 'documento' | 'espaco' | 'academico';
  title: string;
  desc: string;
  iconName: CagpIconName;
  link?: { label: string; url: string; ext?: boolean };
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'chk_minhaufmg',
    category: 'acesso',
    title: '1. Ativar MinhaUFMG e App SIGA UFMG',
    desc: 'Cadastre sua senha inicial no portal sistemas.ufmg.br utilizando a folha NIPs entregue no registro acadêmico do DRCA.',
    iconName: 'sliders',
    link: { label: 'Sistemas da UFMG, passo a passo', url: route('/sistemas'), ext: false },
  },
  {
    id: 'chk_eduroam',
    category: 'acesso',
    title: '2. Conectar à Rede Wi-Fi eduroam',
    desc: 'Conecte celular e computador à rede mundial acadêmica eduroam usando seu login institucional completo (seulogin@ufmg.br).',
    iconName: 'bolt',
    link: { label: 'Guia Wi-Fi DTI (PDF)', url: asset('/documentos/dti-office365-criacao-conta.pdf'), ext: false },
  },
  {
    id: 'chk_carteirinha',
    category: 'documento',
    title: '3. Emitir Carteirinha de Estudante da UFMG',
    desc: 'Necessária para acesso às catracas do RU II Setorial e empréstimo de livros na Biblioteca Baeta Neves (1º andar da FAFICH).',
    iconName: 'passport',
  },
  {
    id: 'chk_fump',
    category: 'documento',
    title: '4. Questionário Socioeconômico da FUMP',
    desc: 'Estudantes que demandam assistência devem preencher o cadastro para classificação nos níveis I a III para isenção e auxílios.',
    iconName: 'heart',
    link: { label: 'Área do Aluno FUMP', url: 'https://www.fump.ufmg.br/', ext: true },
  },
  {
    id: 'chk_secretaria',
    category: 'espaco',
    title: '5. Conhecer a Secretaria Sala F-2039',
    desc: 'Localize a secretaria do Colegiado no 2º andar da FAFICH para atendimento presencial às quartas-feiras (13h às 19h).',
    iconName: 'door-open',
  },
  {
    id: 'chk_ceag',
    category: 'espaco',
    title: '6. Conhecer o CEAG FAFICH (2º Andar)',
    desc: 'Central de Atendimento à Graduação no 2º andar (em frente aos caixas eletrônicos), aberta das 08h às 22h para atestados, trancamentos e requerimentos.',
    iconName: 'building',
  },
  {
    id: 'chk_ru',
    category: 'espaco',
    title: '7. Almoçar ou Jantar no RU II Setorial',
    desc: 'Jantar no RU Setorial II, perto do ICB (subida a partir da FAFICH), das 17h10 às 19h30. Chegando às 18h30, vá direto.',
    iconName: 'utensils',
  },
  {
    id: 'chk_matricula',
    category: 'academico',
    title: '8. Entender a Matrícula Automática do 1º Período',
    desc: 'No 1º semestre, sua matrícula é automática nas 5 obrigatórias (300h): DCP 124, DCP 032, SOA 048, DCP 123 e DCP 033.',
    iconName: 'curriculo',
  },
  {
    id: 'chk_cagp',
    category: 'academico',
    title: '9. Conhecer a Sala do CAGP (1º andar, ao lado da rampa) & Grupos de Turma',
    desc: 'Visite a sede do Centro Acadêmico e participe da Recepção de Calouros (Proposta 7 da Chapa Semente com TEMAS, SENATUS e Atlética).',
    iconName: 'users',
    link: { label: 'Conhecer Proposta 7 (Semente)', url: route('/chapa-semente#propostas'), ext: false },
  },
  {
    id: 'chk_transporte',
    category: 'acesso',
    title: '10. Mapear as Linhas do Circular Interno',
    desc: 'Linhas gratuitas 1, 2, 3 e 4 para circulação no campus Pampulha. Última saída da FAFICH às 22h45.',
    iconName: 'bus',
  },
];

const CONFETTI_PARTICLES = [
  { dx: -38, dy: -28, rot: -45, color: '#5B2A85' },
  { dx: -18, dy: -42, rot: 25, color: '#FE8812' },
  { dx: 12, dy: -38, rot: -20, color: '#A85300' },
  { dx: 36, dy: -26, rot: 40, color: '#166534' },
  { dx: -32, dy: 18, rot: 35, color: '#FE8812' },
  { dx: 32, dy: 20, rot: -35, color: '#5B2A85' },
];

export const CalouroChecklistCore: React.FC = () => {
  const [checks, setChecks] = useState<VaultData<'cagp_calouro_checklist_v1'>>({});
  const [filter, setFilter] = useState<string>('todos');
  const [justCheckedId, setJustCheckedId] = useState<string | null>(null);

  useEffect(() => {
    const load = () => {
      const raw = getVaultItem('cagp_calouro_checklist_v1') || {};
      setChecks(raw);
    };
    load();
    window.addEventListener('cagp:vault-updated', load);
    window.addEventListener('storage', load);
    return () => {
      window.removeEventListener('cagp:vault-updated', load);
      window.removeEventListener('storage', load);
    };
  }, []);

  const toggleCheck = (id: string) => {
    const willBeChecked = !checks[id];
    const next = { ...checks, [id]: willBeChecked };
    setChecks(next);
    setVaultItem('cagp_calouro_checklist_v1', next);

    if (willBeChecked) {
      setJustCheckedId(id);
      window.setTimeout(() => {
        setJustCheckedId((curr) => (curr === id ? null : curr));
      }, 900);
    }
  };

  const completedCount = CHECKLIST_ITEMS.filter((item) => checks[item.id]).length;
  const pct = Math.round((completedCount / CHECKLIST_ITEMS.length) * 100);

  const filteredItems = CHECKLIST_ITEMS.filter((item) => {
    if (filter === 'todos') return true;
    return item.category === filter;
  });

  return (
    <div className="cagp-calouro-checklist space-y-6 select-none text-foreground">
      {/* Painel de Progresso Animado com Persistência no studentVault */}
      <div className="p-5 sm:p-6 bg-white border-2 border-border rounded-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xl">
        <div>
          <h3 className="font-head text-lg sm:text-xl font-black text-foreground m-0">
            Checklist dos primeiros 30 dias
          </h3>
          <p className="text-xs text-gray-700 mt-1 m-0 font-body font-medium">
            Toque em cada etapa para carimbar. O progresso fica salvo neste aparelho.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full lg:w-auto">
          <div className="space-y-1.5 flex-1 sm:w-64">
            <div className="flex justify-between items-center text-xs font-mono text-foreground font-black">
              <span>PROGRESSO 30 DIAS</span>
              <motion.span
                key={pct}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={bounceSpring}
                className="text-secondary font-black"
              >
                {completedCount} de {CHECKLIST_ITEMS.length} ({pct}%)
              </motion.span>
            </div>
            <div
              className="w-full bg-background border-3 border-border rounded-full h-4 overflow-hidden p-0.5 shadow-sm"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progresso do Checklist de 30 dias do Calouro"
            >
              <motion.div
                initial={false}
                animate={{ width: `${pct}%` }}
                transition={bounceSpring}
                className="bg-accent h-full rounded-full"
              />
            </div>
          </div>

          <AnimatePresence>
            {completedCount === CHECKLIST_ITEMS.length && (
              <motion.span
                initial={{ scale: 2, rotate: -14, opacity: 0 }}
                animate={{ scale: 1, rotate: -2, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={bounceSpring}
                className="cagp-stamp-badge is-homologado text-xs py-1.5 px-3 shadow-md shrink-0 font-head uppercase font-black tracking-wider"
              >
                <span className="inline-flex items-center gap-1">
                  <CagpIcon name="stamp" className="w-3.5 h-3.5 inline" />
                  <span>INTEGRALIZADO</span>
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Filtros por Categoria com Alvos Táteis 44x44pt */}
      <div className="flex flex-nowrap items-center gap-2 overflow-x-auto scrollbar-none -mx-1 px-1 py-1" role="tablist" aria-label="Filtrar itens do checklist">
        {[
          { id: 'todos', label: 'Todos' },
          { id: 'acesso', label: 'Acessos' },
          { id: 'documento', label: 'Documentos' },
          { id: 'espaco', label: 'Espaços' },
          { id: 'academico', label: 'Curso' },
        ].map((f) => (
          <motion.button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            whileHover={{ y: -2 }}
            whileTap={{ x: 2, y: 2 }}
            transition={tactileSpring}
            onClick={() => setFilter(f.id)}
            className={`shrink-0 min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-head uppercase font-black tracking-wider transition-colors cursor-pointer border-3 border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
              filter === f.id
                ? 'bg-secondary text-white shadow-md'
                : 'bg-white text-foreground hover:bg-background shadow-sm'
            }`}
          >
            {f.label}
          </motion.button>
        ))}
      </div>

      {/* Lista de Passos do Checklist com Carimbo e Confete Tátil (bounceSpring) */}
      <motion.div
        variants={staggerContainer(0.04)}
        initial="hidden"
        animate="show"
        className="bg-white border-2 border-border rounded-xl divide-y-3 divide-border shadow-xl overflow-hidden"
      >
        {filteredItems.map((item) => {
          const isDone = !!checks[item.id];
          const isBursting = justCheckedId === item.id;

          return (
            <motion.div
              key={item.id}
              variants={staggerItem}
              layout
              className={`relative p-4 sm:p-5 flex items-start gap-4 transition-colors ${
                isDone ? 'bg-success-tint' : 'bg-white hover:bg-white'
              }`}
            >
              {/* Botão / Checkbox Tátil 44x44pt com Confete Explosivo */}
              <div className="relative shrink-0">
                <motion.button
                  type="button"
                  role="checkbox"
                  aria-checked={isDone}
                  aria-label={`Marcar passo: ${item.title}`}
                  onClick={() => toggleCheck(item.id)}
                  whileTap={{ scale: 0.85 }}
                  animate={isDone ? { scale: [1, 1.22, 1], rotate: [0, -6, 0] } : { scale: 1, rotate: 0 }}
                  transition={bounceSpring}
                  className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border-3 border-border flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    isDone
                      ? 'bg-success text-white shadow-md'
                      : 'bg-white text-foreground hover:bg-background shadow-md'
                  }`}
                >
                  {isDone ? (
                    <CagpIcon name="check" className="w-5 h-5 text-white" />
                  ) : (
                    <span className="font-mono text-xs font-black text-gray-500"><i className="bi bi-check-lg" aria-hidden="true" /></span>
                  )}
                </motion.button>

                {/* Explosão de Confete Tátil ao Carimbar */}
                <AnimatePresence>
                  {isBursting && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-20" aria-hidden="true">
                      {CONFETTI_PARTICLES.map((p, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
                          animate={{
                            x: p.dx,
                            y: p.dy,
                            scale: [0, 1.25, 0.8],
                            rotate: p.rot,
                            opacity: [1, 1, 0],
                          }}
                          exit={{ opacity: 0 }}
                          transition={bounceSpring}
                          style={{ backgroundColor: p.color }}
                          className="absolute w-3 h-3 rounded-sm border-2 border-border"
                        />
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <button
                    type="button"
                    onClick={() => toggleCheck(item.id)}
                    className={`text-left font-head text-sm sm:text-base font-black uppercase leading-tight m-0 tracking-wide cursor-pointer bg-transparent border-0 p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded ${
                      isDone ? 'line-through text-gray-500' : 'text-foreground'
                    }`}
                  >
                    {item.title}
                  </button>

                  <div className="flex items-center gap-2 shrink-0">
                    <AnimatePresence mode="popLayout">
                      {isDone && (
                        <motion.span
                          key="stamp-done"
                          initial={{ scale: 2.2, rotate: -16, opacity: 0 }}
                          animate={{ scale: 1, rotate: -2, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          transition={bounceSpring}
                          className="cagp-stamp-badge is-feito text-xs py-1 px-2.5 shadow-sm"
                        >
                          <span className="inline-flex items-center gap-1 font-head font-black uppercase tracking-wider">
                            <CagpIcon name="stamp" className="w-3 h-3 inline" />
                            <span>CARIMBADO</span>
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <span className={`w-8 h-8 rounded-lg border-2 border-border flex items-center justify-center ${
                      isDone ? 'bg-success-tint text-success' : 'bg-background text-foreground'
                    }`}>
                      <CagpIcon name={item.iconName} className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-800 leading-relaxed m-0 mb-2.5 font-body font-medium">
                  {item.desc}
                </p>

                {item.link && (
                  <a
                    href={item.link.url}
                    target={item.link.ext ? '_blank' : undefined}
                    rel={item.link.ext ? 'noopener noreferrer' : undefined}
                    className="min-h-[44px] px-3.5 py-2 rounded-xl border-2 border-border bg-white hover:bg-accent active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 text-foreground shadow-sm inline-flex items-center gap-1.5 text-xs font-head font-black uppercase tracking-wider no-underline transition-all"
                  >
                    <span>{item.link.label}</span>
                    <CagpIcon name="arrow-up-right" className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Banner de Celebração Animado quando 100% Concluído */}
      <AnimatePresence>
        {completedCount === CHECKLIST_ITEMS.length && completedCount > 0 && (
          <motion.div
            initial={{ scale: 0.9, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={bounceSpring}
            className="p-5 sm:p-6 rounded-xl bg-success-tint border-2 border-border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start mb-1.5">
                <span className="cagp-stamp-badge is-homologado shadow-sm">100% CONCLUÍDO</span>
                <span className="font-head font-black text-base uppercase text-success tracking-wide">
                  Todos os 30 Dias Ativados!
                </span>
              </div>
              <p className="text-xs text-foreground font-body font-bold m-0">
                Parabéns! Você configurou todos os sistemas, acessos e rotinas da UFMG.
              </p>
            </div>
            <div className="cagp-big-stamp shrink-0 scale-90 sm:scale-100 shadow">
              <span className="cagp-big-stamp-title">CALOURO INTEGRALIZADO</span>
              <span className="cagp-big-stamp-sub">FAFICH / UFMG • CHAPA SEMENTE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
