import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { bounceSpring, tactileSpring, staggerContainer, staggerItem } from '@/lib/motion';
import { asset, route } from '@/lib/paths';

interface FumpLevelMeta {
  level: string;
  tag: string;
  badge: string;
  accentBg: string;
  accentText: string;
  ruPrice: number;
  ruDiscount: string;
  housing: string;
  transport: string;
  maintenance: string;
  health: string;
  monthlyAidEstimate: number;
}

const FUMP_LEVELS: FumpLevelMeta[] = [
  {
    level: 'Nível I',
    tag: 'PRIORIDADE MÁXIMA • PORTARIA PRAE 1.286/2026',
    badge: 'Isenção 100% RU + Moradia',
    accentBg: 'bg-[#15803D]',
    accentText: 'text-white',
    ruPrice: 0,
    ruDiscount: '100% Gratuito — Café da manhã (Setorial I), Almoço e Jantar (R$ 0,00)',
    housing: 'Vaga nas Moradias Universitárias (Ouro Preto I, II e III) ou Auxílio Moradia mensal em espécie',
    transport: 'Auxílio Transporte Urbano integral + Circular Interno gratuito até 22h45',
    maintenance: 'Bolsa Manutenção Socioeconômica prioritária + Auxílio Material Didático e Creche',
    health: 'Assistência médica, odontológica (DAST) e psicossocial (DASE/PRAE) integral com prioridade',
    monthlyAidEstimate: 650,
  },
  {
    level: 'Nível II',
    tag: 'ALTA VULNERABILIDADE • SUBSÍDIO AMPLIADO',
    badge: 'Isenção RU + Auxílios',
    accentBg: 'bg-[#5B2A86]',
    accentText: 'text-white',
    ruPrice: 0,
    ruDiscount: 'Isenção / Subsídio máximo no Almoço, Jantar e Café da Manhã no RU',
    housing: 'Auxílio Financeiro à Moradia ou vaga conforme disponibilidade de edital FUMP',
    transport: 'Auxílio Transporte Urbano mensal + Circular Interno gratuito',
    maintenance: 'Bolsa de Apoio Acadêmico, prioridade em PIBIC/Extensão/Monitoria e Empréstimo de Notebook',
    health: 'Atendimento médico, odontológico e escuta psicológica gratuita no campus',
    monthlyAidEstimate: 450,
  },
  {
    level: 'Nível III',
    tag: 'MÉDIA VULNERABILIDADE • SUBSÍDIO PARCIAL',
    badge: 'RU R$ 1,00 / Refeição',
    accentBg: 'bg-[#FF8811]',
    accentText: 'text-[#16181d]',
    ruPrice: 1.0,
    ruDiscount: 'Tarifa reduzida de R$ 1,00 por refeição (Almoço, Jantar e Café da Manhã)',
    housing: 'Apoio habitacional em casos extraordinários mediante parecer de assistente social',
    transport: 'Elegível a auxílios emergenciais de deslocamento e Circular gratuito',
    maintenance: 'Elegível a bolsas acadêmicas institucionais (Pronoturno, Monitoria, Extensão PROEX)',
    health: 'Acesso integral aos ambulatórios da DAST/FUMP e acolhimento DASE',
    monthlyAidEstimate: 200,
  },
  {
    level: 'Geral UFMG',
    tag: 'COMUNIDADE DISCENTE • SEM CADASTRO FUMP',
    badge: 'Tarifa Discente Subsidiada',
    accentBg: 'bg-[#16181d]',
    accentText: 'text-white',
    ruPrice: 5.6,
    ruDiscount: 'Acesso regular ao Almoço (Setorial I e II) e Jantar (Setorial II) com tarifa subsidiada pela UFMG',
    housing: 'Elegível a editais gerais de intercâmbio e programas universais da UFMG',
    transport: 'Uso livre de todas as linhas do Ônibus Circular Interno no Campus Pampulha',
    maintenance: 'Bolsas de mérito acadêmico (PIBIC CNPq/FAPEMIG, PET, Extensão e Estágios)',
    health: 'Atendimento de urgência, campanhas de vacinação e escuta inicial DASE/PRAE',
    monthlyAidEstimate: 0,
  },
];

const FUMP_STEPS = [
  {
    step: 1,
    code: 'ETAPA 01 • PORTAL SINAE',
    title: 'Acesso à Área do Aluno (fump.ufmg.br)',
    desc: 'Entre em fump.ufmg.br → Área do Aluno usando seu login e senha do minhaUFMG e selecione "Questionário Socioeconômico — Estudantes da Graduação".',
    tip: 'Dica Chapa Semente: Você pode preencher mesmo já estando matriculado em qualquer período!',
  },
  {
    step: 2,
    code: 'ETAPA 02 • GRUPO FAMILIAR & RENDA',
    title: 'Anexo Digital de Comprovantes',
    desc: 'Envie pelo próprio sistema os comprovantes de renda do núcleo familiar (contracheques, CadÚnico, declaração de autônomo ou desemprego) e despesas de moradia.',
    tip: 'Se faltar algum documento, o assistente social da FUMP abre prazo complementar sem cancelar seu pedido.',
  },
  {
    step: 3,
    code: 'ETAPA 03 • AVALIAÇÃO SOCIAL',
    title: 'Análise Técnica & Entrevista Social',
    desc: 'A equipe de Serviço Social da FUMP analisa o perfil socioeconômico conforme a Portaria PRAE nº 1.286/2026 e agenda entrevista (presencial ou remota) se necessário.',
    tip: 'Dúvidas no preenchimento? Acione o WhatsApp Oficial da FUMP: (31) 97537-0115 ou peça ajuda ao CAGP!',
  },
  {
    step: 4,
    code: 'ETAPA 04 • HOMOLOGAÇÃO IMEDIATA',
    title: 'Ativação na Carteirinha do RU & Bolsas',
    desc: 'Assim que o nível (I, II ou III) é homologado no SINAE, o desconto/isenção no RU II é ativado automaticamente no código de barras da sua Carteirinha UFMG.',
    tip: 'Com o nível ativo, inscreva-se nos editais contínuos de Auxílio Moradia, Transporte e Manutenção!',
  },
];

export const PermanenciaInteractiveHub: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const [mealsPerMonth, setMealsPerMonth] = useState<number>(44); // 2 por dia útil ~ 22 dias
  const [hasTransport, setHasTransport] = useState<boolean>(true);
  const [includeHousingAid, setIncludeHousingAid] = useState<boolean>(true);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  const currentMeta = FUMP_LEVELS[selectedLevel];

  // Valor refeição inteira base estudante ~ R$ 5,60 (custo real > R$ 16,00)
  const costWithoutFump = mealsPerMonth * 5.6;
  const costWithFump = mealsPerMonth * currentMeta.ruPrice;
  const savingsMeals = Math.max(0, costWithoutFump - costWithFump);
  const savingsTransport = hasTransport ? (selectedLevel === 0 ? 240 : selectedLevel === 1 ? 180 : selectedLevel === 2 ? 110 : 0) : 0;
  const housingAndMaintenance = includeHousingAid ? currentMeta.monthlyAidEstimate : 0;
  const totalMonthlyImpact = savingsMeals + savingsTransport + housingAndMaintenance;

  const toggleStep = (step: number) => {
    setCompletedSteps((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    );
  };

  return (
    <div className="space-y-8 text-foreground select-none">
      {/* 1. Cards BoldKit de Leitura Rápida: Níveis da FUMP */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs sm:text-sm font-head font-black uppercase tracking-wider text-[#16181d] block">
            1. Selecione o Nível FUMP para Comparar Direitos (Portaria PRAE 1.286/2026)
          </label>
          <span className="font-mono text-xs font-bold text-secondary">
            Toque nos cards para simular →
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" role="tablist" aria-label="Níveis de Classificação FUMP">
          {FUMP_LEVELS.map((f, idx) => {
            const isSelected = selectedLevel === idx;
            return (
              <motion.button
                key={f.level}
                type="button"
                role="tab"
                aria-selected={isSelected}
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 2, y: 2 }}
                transition={tactileSpring}
                onClick={() => setSelectedLevel(idx)}
                className={`p-4 rounded-xl border-3 border-[#16181d] text-left transition-colors min-h-[140px] cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#FFFDF9] shadow-[6px_6px_0px_#16181d] ring-3 ring-[#5B2A86]'
                    : 'bg-white hover:bg-[#f4f0ea] shadow-[4px_4px_0px_#16181d]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-head font-black text-lg text-[#16181d] uppercase">
                      {f.level}
                    </span>
                    <span className={`text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-md border-2 border-[#16181d] shadow-[2px_2px_0_0_#16181d] ${f.accentBg} ${f.accentText}`}>
                      {f.badge}
                    </span>
                  </div>
                  <p className="text-xs font-body font-medium text-gray-800 leading-relaxed m-0">
                    {f.ruDiscount}
                  </p>
                </div>
                <div className="text-[10px] font-mono font-bold text-[#5B2A86] mt-3 pt-2 border-t-2 border-[#16181d]/20 flex items-center justify-between">
                  <span>{isSelected ? '✓ Nível Selecionado' : 'Ver garantias'}</span>
                  <span>→</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 2. Quadro BoldKit de Garantias: Alimentação, Moradia, Transporte e Bolsas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMeta.level}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={tactileSpring}
          className="p-5 sm:p-6 rounded-2xl bg-white border-3 border-[#16181d] shadow-[6px_6px_0px_#16181d] space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-3 border-[#16181d]">
            <div>
              <span className="font-mono text-[10px] font-black uppercase text-secondary block">
                {currentMeta.tag}
              </span>
              <h3 className="font-head font-black text-lg sm:text-xl uppercase text-[#16181d] m-0">
                Quadro de Direitos &amp; Benefícios — {currentMeta.level}
              </h3>
            </div>
            <span className={`text-xs font-mono font-black uppercase px-3 py-1.5 rounded-lg border-2 border-[#16181d] shadow-[2px_2px_0_0_#16181d] ${currentMeta.accentBg} ${currentMeta.accentText}`}>
              {currentMeta.badge}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-[#16181d]">
            <div className="p-4 rounded-xl bg-[#FFFDF9] border-3 border-[#16181d] shadow-[3px_3px_0_0_#16181d] space-y-1.5">
              <span className="px-2 py-0.5 rounded bg-[#FF8811] text-[#16181d] font-mono text-[10px] font-black uppercase border border-[#16181d] inline-block">
                1. ALIMENTAÇÃO (RU)
              </span>
              <strong className="block text-[#16181d] font-head font-black uppercase text-sm">
                Restaurantes Setorial I &amp; II
              </strong>
              <p className="text-gray-800 font-body font-medium leading-relaxed m-0">
                {currentMeta.ruDiscount}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FFFDF9] border-3 border-[#16181d] shadow-[3px_3px_0_0_#16181d] space-y-1.5">
              <span className="px-2 py-0.5 rounded bg-[#5B2A86] text-white font-mono text-[10px] font-black uppercase border border-[#16181d] inline-block">
                2. MORADIA ESTUDANTIL
              </span>
              <strong className="block text-[#16181d] font-head font-black uppercase text-sm">
                Moradia &amp; Auxílio Aluguel
              </strong>
              <p className="text-gray-800 font-body font-medium leading-relaxed m-0">
                {currentMeta.housing}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FFFDF9] border-3 border-[#16181d] shadow-[3px_3px_0_0_#16181d] space-y-1.5">
              <span className="px-2 py-0.5 rounded bg-[#15803D] text-white font-mono text-[10px] font-black uppercase border border-[#16181d] inline-block">
                3. BOLSAS &amp; MANUTENÇÃO
              </span>
              <strong className="block text-[#16181d] font-head font-black uppercase text-sm">
                Apoio Financeiro &amp; IC
              </strong>
              <p className="text-gray-800 font-body font-medium leading-relaxed m-0">
                {currentMeta.maintenance}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FFFDF9] border-3 border-[#16181d] shadow-[3px_3px_0_0_#16181d] space-y-1.5">
              <span className="px-2 py-0.5 rounded bg-[#9E2424] text-white font-mono text-[10px] font-black uppercase border border-[#16181d] inline-block">
                4. TRANSPORTE &amp; SAÚDE
              </span>
              <strong className="block text-[#16181d] font-head font-black uppercase text-sm">
                Deslocamento, DAST &amp; DASE
              </strong>
              <p className="text-gray-800 font-body font-medium leading-relaxed m-0">
                {currentMeta.transport}. {currentMeta.health}.
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 3. Simulador Interativo Animado de Retorno da Assistência Estudantil */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#DCFCE7] text-[#16181d] border-3 border-[#16181d] shadow-[6px_6px_0px_#16181d] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-[#16181d] pb-3">
          <div>
            <span className="font-mono text-[10px] font-black uppercase text-[#15803D] block">
              CALCULADORA INTERATIVA DE PERMANÊNCIA • FUMP/UFMG
            </span>
            <h3 className="font-head font-black text-lg sm:text-xl uppercase tracking-tight text-[#16181d] m-0">
              Simulador de Impacto Mensal no Orçamento do Estudante
            </h3>
            <p className="text-xs text-gray-800 font-body font-medium mt-0.5 m-0">
              Calcule sua economia direta com refeições no RU II, auxílio transporte e bolsa moradia/manutenção no <strong>{currentMeta.level}</strong>:
            </p>
          </div>
          <span className="px-3 py-1 rounded-lg bg-[#16181d] text-[#FEF08A] font-mono text-xs font-black uppercase">
            Simulação Real-Time
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 bg-white rounded-xl border-3 border-[#16181d] shadow-[3px_3px_0_0_#16181d] space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="ru-meals-slider" className="text-xs font-head font-black uppercase tracking-wider text-[#16181d]">
                  Refeições no RU por Mês (Almoço / Jantar):
                </label>
                <span className="px-2.5 py-0.5 rounded bg-[#5B2A86] text-white font-mono text-xs font-black">
                  {mealsPerMonth} refeições/mês
                </span>
              </div>
              <input
                id="ru-meals-slider"
                type="range"
                min={10}
                max={60}
                step={2}
                value={mealsPerMonth}
                onChange={(e) => setMealsPerMonth(Number(e.target.value))}
                className="w-full h-3 accent-[#5B2A86] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono font-bold text-gray-700">
                <span>10 ref (2x/sem)</span>
                <span>22 ref (Jantar diário)</span>
                <span>44 ref (Almoço + Jantar)</span>
                <span>60 ref</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setHasTransport(!hasTransport)}
                className={`min-h-[48px] p-3.5 rounded-xl border-3 border-[#16181d] text-left flex items-center gap-3 cursor-pointer transition-all ${
                  hasTransport
                    ? 'bg-white shadow-[3px_3px_0_0_#16181d]'
                    : 'bg-white/60 opacity-80'
                }`}
              >
                <span className={`w-7 h-7 rounded-lg border-2 border-[#16181d] flex items-center justify-center font-mono text-xs font-black shrink-0 ${
                  hasTransport ? 'bg-[#15803D] text-white' : 'bg-white text-transparent'
                }`}>
                  ✓
                </span>
                <span className="text-xs font-head font-black uppercase text-[#16181d] leading-tight">
                  Incluir Auxílio Transporte Urbano
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIncludeHousingAid(!includeHousingAid)}
                className={`min-h-[48px] p-3.5 rounded-xl border-3 border-[#16181d] text-left flex items-center gap-3 cursor-pointer transition-all ${
                  includeHousingAid
                    ? 'bg-white shadow-[3px_3px_0_0_#16181d]'
                    : 'bg-white/60 opacity-80'
                }`}
              >
                <span className={`w-7 h-7 rounded-lg border-2 border-[#16181d] flex items-center justify-center font-mono text-xs font-black shrink-0 ${
                  includeHousingAid ? 'bg-[#5B2A86] text-white' : 'bg-white text-transparent'
                }`}>
                  ✓
                </span>
                <span className="text-xs font-head font-black uppercase text-[#16181d] leading-tight">
                  Incluir Auxílio Moradia / Manutenção
                </span>
              </button>
            </div>
          </div>

          {/* Resultado Animado do Simulador */}
          <div className="lg:col-span-5 p-5 bg-white rounded-xl border-3 border-[#16181d] shadow-[5px_5px_0_0_#16181d] space-y-4">
            <div>
              <span className="text-[11px] font-mono font-black uppercase tracking-wider text-gray-600 block">
                Benefício Econômico Estimado ({currentMeta.level})
              </span>
              <motion.div
                key={totalMonthlyImpact}
                initial={{ scale: 1.15, color: '#5B2A86' }}
                animate={{ scale: 1, color: '#15803D' }}
                transition={bounceSpring}
                className="text-3xl sm:text-4xl font-head font-black text-[#15803D] my-1"
              >
                R$ {totalMonthlyImpact.toFixed(2).replace('.', ',')} <span className="text-sm font-mono text-[#16181d]">/ mês</span>
              </motion.div>
              <span className="text-[11px] font-mono font-bold text-gray-700 block">
                Equivalente a R$ {(totalMonthlyImpact * 12).toFixed(0)} por ano de proteção estudantil
              </span>
            </div>

            <div className="space-y-1.5 pt-2 border-t-2 border-[#16181d] text-xs font-mono">
              <div className="flex justify-between">
                <span>Subsídio Direto RU ({mealsPerMonth} ref):</span>
                <strong className="text-[#15803D]">+ R$ {savingsMeals.toFixed(2).replace('.', ',')}</strong>
              </div>
              <div className="flex justify-between">
                <span>Auxílio Transporte Estimado:</span>
                <strong className="text-[#15803D]">+ R$ {savingsTransport.toFixed(2).replace('.', ',')}</strong>
              </div>
              <div className="flex justify-between">
                <span>Moradia / Bolsa Manutenção:</span>
                <strong className="text-[#5B2A86]">+ R$ {housingAndMaintenance.toFixed(2).replace('.', ',')}</strong>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href="https://www.fump.ufmg.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex-1 px-4 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white font-head font-black text-xs uppercase rounded-xl border-3 border-[#16181d] shadow-[3px_3px_0px_#16181d] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer inline-flex items-center justify-center gap-2 no-underline"
              >
                <span>Portal SINAE / FUMP</span>
                <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Passo a Passo Interativo Animado para Cadastro na FUMP + Molduras Fotográficas Ampliadas */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border-3 border-[#16181d] shadow-[6px_6px_0px_#16181d] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-[#16181d] pb-3">
          <div>
            <span className="font-mono text-[10px] font-black uppercase text-[#5B2A86] block">
              PASSO A PASSO INTERATIVO • ROTEIRO MASTIGADO PELA CHAPA SEMENTE
            </span>
            <h3 className="font-head font-black text-lg sm:text-xl uppercase text-[#16181d] m-0">
              Como Solicitar seu Nível FUMP sem Perder Prazos (4 Etapas)
            </h3>
          </div>
          <span className="px-3 py-1 rounded-lg bg-[#FEF08A] text-[#16181d] font-mono text-xs font-black border-2 border-[#16181d]">
            {completedSteps.length}/4 Etapas Conferidas
          </span>
        </div>

        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {FUMP_STEPS.map((st) => {
            const isChecked = completedSteps.includes(st.step);
            return (
              <motion.div
                key={st.step}
                variants={staggerItem}
                onClick={() => toggleStep(st.step)}
                className={`p-4 sm:p-5 rounded-xl border-3 border-[#16181d] cursor-pointer transition-all flex flex-col justify-between gap-3 ${
                  isChecked
                    ? 'bg-[#F0FDF4] shadow-[4px_4px_0_0_#15803D]'
                    : 'bg-[#FFFDF9] hover:bg-white shadow-[4px_4px_0_0_#16181d]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-[#16181d] text-white font-mono text-[10px] font-black uppercase">
                      {st.code}
                    </span>
                    <motion.span
                      animate={isChecked ? { scale: [1, 1.2, 1], rotate: -2 } : { scale: 1, rotate: 0 }}
                      transition={bounceSpring}
                      className={`px-2.5 py-0.5 rounded-md font-mono text-[10px] font-black uppercase border-2 border-[#16181d] ${
                        isChecked ? 'bg-[#15803D] text-white' : 'bg-white text-[#16181d]'
                      }`}
                    >
                      {isChecked ? '✓ CONFERIDO' : 'MARCAR ETAPA'}
                    </motion.span>
                  </div>
                  <h4 className="font-head text-base font-black uppercase text-[#16181d] m-0">
                    {st.title}
                  </h4>
                  <p className="text-xs text-gray-800 font-body font-medium leading-relaxed m-0">
                    {st.desc}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-white border-2 border-[#16181d] text-[11px] font-mono font-bold text-[#5B2A86]">
                  💡 {st.tip}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Galeria Visual Ampliada da Campanha Permanecer FUMP & Passo a Passo Oficial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div className="space-y-2">
            <div className="cagp-photo-frame relative aspect-[16/10] min-h-[240px] w-full rounded-xl border-3 border-[#16181d] shadow-[6px_6px_0_0_#16181d] overflow-hidden bg-[#f4f0ea]">
              <img
                src={asset('/imagens/campanha-permanecer-fump.png')}
                alt="Campanha Institucional Permanecer é Direito — FUMP e UFMG"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="font-mono text-[11px] font-bold text-[#16181d] block">
              [CARTILHA VISUAL 01] Campanha Institucional de Permanência Estudantil FUMP/UFMG.
            </span>
          </div>

          <div className="space-y-2">
            <div className="cagp-photo-frame relative aspect-[16/10] min-h-[240px] w-full rounded-xl border-3 border-[#16181d] shadow-[6px_6px_0_0_#16181d] overflow-hidden bg-[#f4f0ea]">
              <img
                src={asset('/imagens/dast-novo-bh.jpg')}
                alt="Divisão de Atenção à Saúde do Estudante (DAST / FUMP) no Campus Pampulha"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="font-mono text-[11px] font-bold text-[#16181d] block">
              [CARTILHA VISUAL 02] Atendimento médico, odontológico e psicossocial gratuito (DAST &amp; DASE/PRAE).
            </span>
          </div>
        </div>
      </div>

      {/* 5. Botão Direto de Acolhimento pelo CA & Compromisso Eleitoral Chapa Semente */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#5B2A86] text-white border-3 border-[#16181d] shadow-[8px_8px_0px_#16181d] flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF8811] text-[#16181d] border-2 border-[#16181d] font-mono text-xs font-black uppercase shadow-[2px_2px_0_0_#16181d]">
            <i className="bi bi-heart-fill" aria-hidden="true"></i>
            <span>ACOLHIMENTO DIRETO PELO CAGP • CHAPA SEMENTE</span>
          </div>
          <h3 className="font-head text-xl sm:text-2xl font-black uppercase tracking-tight m-0">
            Travou no Cadastro da FUMP ou Precisa de Apoio Urgente?
          </h3>
          <p className="text-xs sm:text-sm text-white/95 font-body font-medium leading-relaxed m-0">
            Nenhum estudante de Gestão Pública ficará desamparado. Acione diretamente o canal de acolhimento sigiloso do Centro Acadêmico para orientação no preenchimento do SINAE, recursos de bolsa ou demandas do turno noturno.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href={route('/ouvidoria')}
            className="min-h-[48px] px-5 py-3 bg-[#FF8811] hover:bg-[#e67300] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none text-[#16181d] rounded-xl font-head text-xs sm:text-sm uppercase font-black tracking-wider inline-flex items-center justify-center gap-2 transition-all no-underline border-3 border-[#16181d] shadow-[4px_4px_0_0_#16181d]"
          >
            <i className="bi bi-chat-heart-fill text-base" aria-hidden="true"></i>
            <span>Pedir Acolhimento Direto ao CA →</span>
          </a>
          <a
            href={route('/chapa-semente')}
            className="min-h-[48px] px-5 py-3 bg-white hover:bg-[#f4f0ea] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none text-[#16181d] rounded-xl font-head text-xs sm:text-sm uppercase font-black tracking-wider inline-flex items-center justify-center gap-2 transition-all no-underline border-3 border-[#16181d] shadow-[4px_4px_0_0_#16181d]"
          >
            <i className="bi bi-check2-circle text-base text-[#5B2A86]" aria-hidden="true"></i>
            <span>Votar Chapa Semente (25 e 26/11)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
