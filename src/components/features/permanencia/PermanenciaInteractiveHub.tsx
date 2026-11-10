// PermanenciaInteractiveHub.tsx — Ilhas da página /permanencia, uma por aba:
// <PermanenciaNiveis /> (o que cada nível garante), <PermanenciaSimulador /> (estimativa ilustrativa)
// e <PermanenciaPedido /> (as 4 etapas do pedido + ajuda do CAGP).
// Regras: nenhuma escolha é feita pelo estudante sem ele tocar; valores em R$ são simulados e rotulados.
import React, { useId, useState } from 'react';
import { asset, route } from '@/lib/paths';
import { SIMULATION_NOTICE, SIMULATION_BADGE_TEXT } from '@/lib/simulatedData';

interface FumpLevelMeta {
  id: string;
  level: string;
  resumo: string;
  ruDiscount: string;
  housing: string;
  transport: string;
  maintenance: string;
  health: string;
  /** Valores ilustrativos do simulador (sem fonte oficial). */
  sim: { ruPrice: number; transporte: number; moradia: number };
}

const FUMP_LEVELS: FumpLevelMeta[] = [
  {
    id: 'geral',
    level: 'Sem nível FUMP',
    resumo: 'Todo estudante da UFMG',
    ruDiscount: 'Almoço nos RUs Setorial I e II e jantar no Setorial II com a tarifa subsidiada padrão da UFMG.',
    housing: 'Editais gerais da UFMG (intercâmbio e programas universais).',
    transport: 'Circular interno gratuito em todas as linhas do Campus Pampulha.',
    maintenance: 'Bolsas por mérito acadêmico: PIBIC (CNPq/FAPEMIG), PET, extensão e estágios.',
    health: 'Urgência, campanhas de vacinação e escuta inicial na DASE/PRAE.',
    sim: { ruPrice: 5.6, transporte: 0, moradia: 0 },
  },
  {
    id: 'n3',
    level: 'Nível III',
    resumo: 'Média vulnerabilidade',
    ruDiscount: 'Subsídio parcial: tarifa reduzida no almoço, no jantar e no café da manhã.',
    housing: 'Apoio habitacional só em casos extraordinários, com parecer da assistência social.',
    transport: 'Auxílios emergenciais de deslocamento e circular gratuito.',
    maintenance: 'Bolsas acadêmicas institucionais (Pronoturno, monitoria, extensão PROEX).',
    health: 'Ambulatórios da DAST/FUMP e acolhimento da DASE.',
    sim: { ruPrice: 1, transporte: 110, moradia: 200 },
  },
  {
    id: 'n2',
    level: 'Nível II',
    resumo: 'Alta vulnerabilidade',
    ruDiscount: 'Subsídio ampliado de alimentação no RU.',
    housing: 'Auxílio financeiro à moradia ou vaga, conforme edital da FUMP.',
    transport: 'Auxílio transporte urbano mensal e circular gratuito.',
    maintenance: 'Bolsa de apoio acadêmico, prioridade em PIBIC, extensão e monitoria, empréstimo de notebook.',
    health: 'Atendimento médico, odontológico e escuta psicológica gratuita no campus.',
    sim: { ruPrice: 0, transporte: 180, moradia: 450 },
  },
  {
    id: 'n1',
    level: 'Nível I',
    resumo: 'Extrema vulnerabilidade',
    ruDiscount: 'Isenção total de alimentação: café da manhã (Setorial I), almoço e jantar.',
    housing: 'Vaga nas moradias universitárias ou auxílio moradia mensal.',
    transport: 'Auxílio transporte urbano e circular gratuito.',
    maintenance: 'Prioridade máxima em bolsas e auxílios, incluindo material didático e creche.',
    health: 'Assistência médica, odontológica (DAST) e psicossocial (DASE/PRAE) com prioridade.',
    sim: { ruPrice: 0, transporte: 240, moradia: 650 },
  },
];

const CATEGORIAS: Array<{ key: keyof Pick<FumpLevelMeta, 'ruDiscount' | 'housing' | 'maintenance' | 'transport' | 'health'>; label: string }> = [
  { key: 'ruDiscount', label: 'Alimentação' },
  { key: 'housing', label: 'Moradia' },
  { key: 'maintenance', label: 'Bolsas' },
  { key: 'transport', label: 'Transporte' },
  { key: 'health', label: 'Saúde' },
];

const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const cardClass = 'rounded-xl border-3 border-border bg-card shadow-lg';

/** Seletor de nível como grupo de rádio (2x2 no celular, 4 colunas no desktop). */
function LevelPicker({
  value,
  onChange,
  options,
  label,
}: {
  value: string | null;
  onChange: (id: string) => void;
  options: FumpLevelMeta[];
  label: string;
}) {
  const name = useId();
  return (
    <fieldset className="m-0 p-0 border-0">
      <legend className="font-heading font-bold text-sm mb-2">{label}</legend>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {options.map((opt) => {
          const checked = value === opt.id;
          return (
            <label
              key={opt.id}
              className={`relative flex flex-col justify-center min-h-[64px] px-3 py-2.5 rounded-lg border-3 border-border cursor-pointer transition-[transform,box-shadow,background-color] duration-150 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary has-[:focus-visible]:outline-offset-2 ${
                checked ? 'bg-primary text-primary-foreground shadow-sm -translate-y-0.5' : 'bg-card hover:bg-muted shadow-xs'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt.id}
                checked={checked}
                onChange={() => onChange(opt.id)}
                className="sr-only"
              />
              <span className="font-heading font-extrabold uppercase text-sm leading-tight">{opt.level}</span>
              <span className={`text-xs leading-snug mt-0.5 ${checked ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
                {opt.resumo}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ───────────────────────── Aba "Níveis" ───────────────────────── */

export const PermanenciaNiveis: React.FC = () => {
  // Começa no que todo estudante já tem: nenhuma suposição sobre o nível de quem lê.
  const [selected, setSelected] = useState<string>('geral');
  const meta = FUMP_LEVELS.find((l) => l.id === selected) ?? FUMP_LEVELS[0];

  return (
    <div className="space-y-5">
      <LevelPicker
        value={selected}
        onChange={setSelected}
        options={FUMP_LEVELS}
        label="Compare o que cada nível garante"
      />

      <section className={cardClass} aria-live="polite" aria-labelledby="niveis-quadro-titulo">
        <h3 id="niveis-quadro-titulo" className="font-heading font-extrabold text-base sm:text-lg leading-tight m-0 px-4 pt-4 pb-3 border-b-3 border-border">
          {meta.level}: o que você recebe
        </h3>
        <dl className="m-0 divide-y-2 divide-border/15">
          {CATEGORIAS.map((c) => (
            <div key={c.key} className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-x-4 gap-y-0.5 px-4 py-3">
              <dt className="font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground pt-0.5">{c.label}</dt>
              <dd className="m-0 text-base leading-relaxed text-pretty">{meta[c.key]}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="text-sm text-muted-foreground m-0">
        O nível é definido pela FUMP depois da análise socioeconômica (Portaria PRAE nº 1.286/2026). Veja na aba{' '}
        <a href="#pedir" className="font-bold text-foreground underline underline-offset-4 decoration-2 decoration-primary">Pedir</a>{' '}
        como solicitar.
      </p>
    </div>
  );
};

/* ───────────────────────── Aba "Simular" ───────────────────────── */

export const PermanenciaSimulador: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  // Padrão do estudante noturno: só o jantar nos dias úteis.
  const [meals, setMeals] = useState<number>(22);
  const [hasTransport, setHasTransport] = useState<boolean>(true);
  const [includeHousing, setIncludeHousing] = useState<boolean>(true);
  const sliderId = useId();

  const meta = FUMP_LEVELS.find((l) => l.id === selected) ?? null;
  const base = FUMP_LEVELS[0].sim.ruPrice;
  const ru = meta ? Math.max(0, meals * base - meals * meta.sim.ruPrice) : 0;
  const transporte = meta && hasTransport ? meta.sim.transporte : 0;
  const moradia = meta && includeHousing ? meta.sim.moradia : 0;
  const total = ru + transporte + moradia;

  const toggleClass = (on: boolean) =>
    `flex items-center gap-3 min-h-[48px] px-3.5 py-2.5 rounded-lg border-3 border-border text-left cursor-pointer transition-[transform,box-shadow] duration-150 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
      on ? 'bg-card shadow-sm' : 'bg-muted'
    }`;

  return (
    <div className="space-y-5">
      <div role="note" className="flex flex-col sm:flex-row gap-1.5 sm:gap-3 sm:items-start rounded-xl border-3 border-border bg-accent px-4 py-3">
        <span className="font-mono text-xs font-bold uppercase sm:whitespace-nowrap sm:pt-0.5">{SIMULATION_BADGE_TEXT}</span>
        <p className="text-sm leading-snug m-0">
          {SIMULATION_NOTICE} Os valores em R$ são ilustrativos e não vêm de edital: confirme sempre no{' '}
          <a href="https://www.fump.ufmg.br/" target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-4 decoration-2">
            portal da FUMP
          </a>
          .
        </p>
      </div>

      <LevelPicker
        value={selected}
        onChange={setSelected}
        options={FUMP_LEVELS.slice(1)}
        label="1. Escolha um nível para simular"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className={`${cardClass} lg:col-span-7 p-4 space-y-4`}>
          <div className="space-y-2">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <label htmlFor={sliderId} className="font-heading font-bold text-sm">
                2. Refeições no RU por mês
              </label>
              <output htmlFor={sliderId} className="font-mono text-sm font-bold tabular-nums">
                {meals} refeições
              </output>
            </div>
            <input
              id={sliderId}
              type="range"
              min={4}
              max={60}
              step={2}
              value={meals}
              onChange={(e) => setMeals(Number(e.target.value))}
              className="w-full h-11 accent-primary cursor-pointer"
              aria-describedby={`${sliderId}-hint`}
            />
            <p id={`${sliderId}-hint`} className="text-xs text-muted-foreground m-0">
              22 = jantar em todos os dias úteis · 44 = almoço e jantar
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button type="button" aria-pressed={hasTransport} onClick={() => setHasTransport(!hasTransport)} className={toggleClass(hasTransport)}>
              <span aria-hidden="true" className={`w-6 h-6 rounded-md border-2 border-border shrink-0 flex items-center justify-center ${hasTransport ? 'bg-success text-white' : 'bg-card'}`}>
                {hasTransport && <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5 9-10" /></svg>}
              </span>
              <span className="font-heading font-bold text-sm leading-tight">Incluir auxílio transporte</span>
            </button>
            <button type="button" aria-pressed={includeHousing} onClick={() => setIncludeHousing(!includeHousing)} className={toggleClass(includeHousing)}>
              <span aria-hidden="true" className={`w-6 h-6 rounded-md border-2 border-border shrink-0 flex items-center justify-center ${includeHousing ? 'bg-success text-white' : 'bg-card'}`}>
                {includeHousing && <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5 9-10" /></svg>}
              </span>
              <span className="font-heading font-bold text-sm leading-tight">Incluir moradia e manutenção</span>
            </button>
          </div>
        </div>

        <section className={`${cardClass} lg:col-span-5 p-4`} aria-live="polite" aria-labelledby="sim-resultado-titulo">
          <h3 id="sim-resultado-titulo" className="font-heading font-bold text-sm m-0">
            {meta ? `Estimativa ilustrativa · ${meta.level}` : 'Estimativa ilustrativa'}
          </h3>
          {meta ? (
            <>
              <p className="font-heading font-extrabold text-3xl sm:text-4xl tabular-nums tracking-tight my-2">
                {brl(total)}
                <span className="font-mono text-sm font-bold text-muted-foreground"> /mês</span>
              </p>
              <dl className="m-0 space-y-1.5 pt-3 border-t-2 border-border font-mono text-sm tabular-nums">
                <div className="flex justify-between gap-3"><dt>Economia no RU</dt><dd className="m-0 font-bold">{brl(ru)}</dd></div>
                <div className="flex justify-between gap-3"><dt>Transporte</dt><dd className="m-0 font-bold">{brl(transporte)}</dd></div>
                <div className="flex justify-between gap-3"><dt>Moradia e manutenção</dt><dd className="m-0 font-bold">{brl(moradia)}</dd></div>
              </dl>
            </>
          ) : (
            <p className="text-sm text-muted-foreground mt-2 mb-0">Escolha um nível acima para ver a estimativa.</p>
          )}
        </section>
      </div>
    </div>
  );
};

/* ───────────────────────── Aba "Pedir" ───────────────────────── */

const FUMP_STEPS = [
  {
    title: 'Entre na Área do Aluno da FUMP',
    desc: 'Em fump.ufmg.br, entre com o login da UFMG e abra "Questionário Socioeconômico — Estudantes da Graduação".',
    tip: 'Pode preencher em qualquer período do curso, não só no 1º.',
  },
  {
    title: 'Envie os comprovantes do grupo familiar',
    desc: 'Comprovantes de renda de todos da família (contracheque, CadÚnico, declaração de autônomo ou desemprego), comprovante de residência e despesas de moradia.',
    tip: 'Faltou documento? A assistência social abre prazo complementar sem cancelar o pedido.',
  },
  {
    title: 'Análise e entrevista social',
    desc: 'O Serviço Social da FUMP analisa o perfil (Portaria PRAE nº 1.286/2026) e pode marcar entrevista presencial ou remota.',
    tip: 'Dúvida no preenchimento: WhatsApp oficial da FUMP (31) 97537-0115.',
  },
  {
    title: 'Homologação e ativação',
    desc: 'Com o nível homologado, o desconto ou a isenção no RU passa a valer na sua carteirinha UFMG.',
    tip: 'Com o nível ativo, inscreva-se nos editais de auxílio moradia, transporte e manutenção.',
  },
];

export const PermanenciaPedido: React.FC = () => {
  const [done, setDone] = useState<number[]>([]);
  const toggle = (i: number) => setDone((prev) => (prev.includes(i) ? prev.filter((s) => s !== i) : [...prev, i]));

  return (
    <div className="space-y-6">
      <section className={`${cardClass} overflow-hidden`} aria-labelledby="pedido-titulo">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-4 pb-3 border-b-3 border-border">
          <h3 id="pedido-titulo" className="font-heading font-extrabold text-base sm:text-lg leading-tight m-0">
            Como pedir seu nível na FUMP
          </h3>
          <span className="font-mono text-sm font-bold tabular-nums" aria-live="polite">
            {done.length}/{FUMP_STEPS.length} feitas
          </span>
        </div>
        <ol className="m-0 p-0 list-none divide-y-2 divide-border/15">
          {FUMP_STEPS.map((st, i) => {
            const isDone = done.includes(i);
            return (
              <li key={st.title} className="grid grid-cols-[auto_1fr] gap-x-3 px-4 py-4">
                <span
                  aria-hidden="true"
                  className={`w-9 h-9 rounded-lg border-3 border-border flex items-center justify-center font-mono font-bold tabular-nums ${isDone ? 'bg-success text-white' : 'bg-muted'}`}
                >
                  {isDone ? <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5 9-10" /></svg> : i + 1}
                </span>
                <div className="min-w-0 space-y-1.5">
                  <h4 className="font-heading font-bold text-base leading-snug m-0">{st.title}</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground m-0 text-pretty">{st.desc}</p>
                  <p className="text-sm leading-relaxed m-0 text-pretty">
                    <span className="font-mono text-xs font-bold uppercase">Dica · </span>
                    {st.tip}
                  </p>
                  <button
                    type="button"
                    aria-pressed={isDone}
                    onClick={() => toggle(i)}
                    className={`mt-1 inline-flex items-center gap-2 min-h-[44px] px-3 rounded-lg border-2 border-border font-heading font-bold text-sm cursor-pointer transition-[transform,box-shadow] duration-150 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 active:translate-x-0.5 active:translate-y-0.5 ${
                      isDone ? 'bg-success text-white' : 'bg-card shadow-xs hover:bg-muted'
                    }`}
                  >
                    {isDone ? 'Etapa feita' : 'Marcar como feita'}
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
        <a
          href="https://www.fump.ufmg.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-2 min-h-[48px] px-4 py-3 border-t-3 border-border bg-primary text-primary-foreground font-heading font-extrabold uppercase text-sm tracking-tight no-underline hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
        >
          <span>Abrir a Área do Aluno da FUMP</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9" /></svg>
          <span className="sr-only">(abre em nova aba)</span>
        </a>
      </section>

      <section className="rounded-xl border-2 border-border bg-secondary text-secondary-foreground shadow-lg p-4 sm:p-5 space-y-3" aria-labelledby="pedido-ajuda-titulo">
        <h3 id="pedido-ajuda-titulo" className="font-heading font-extrabold text-lg sm:text-xl leading-tight m-0">
          Travou no cadastro?
        </h3>
        <p className="text-base leading-relaxed m-0 max-w-2xl text-pretty">
          O Centro Acadêmico ajuda no preenchimento do questionário, em recursos de bolsa e em demandas do turno noturno, com sigilo.
        </p>
        <a
          href={route('/ouvidoria')}
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 rounded-xl border-3 border-border bg-accent text-accent-foreground font-heading font-extrabold uppercase text-sm tracking-tight no-underline shadow-md hover:bg-accent-hover active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-[transform,box-shadow] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          Pedir ajuda ao CAGP
        </a>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <figure className="m-0 space-y-2">
          <div className="aspect-[16/10] w-full rounded-xl border-2 border-border shadow-lg overflow-hidden bg-muted">
            <img src={asset('/imagens/campanha-permanecer-fump.png')} alt="Cartaz da campanha institucional Permanecer é Direito, da FUMP e da UFMG" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <figcaption className="text-sm text-muted-foreground">Campanha institucional de permanência da FUMP/UFMG.</figcaption>
        </figure>
        <figure className="m-0 space-y-2">
          <div className="aspect-[16/10] w-full rounded-xl border-2 border-border shadow-lg overflow-hidden bg-muted">
            <img src={asset('/imagens/dast-novo-bh.jpg')} alt="Prédio da Divisão de Atenção à Saúde do Estudante (DAST/FUMP) no Campus Pampulha" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <figcaption className="text-sm text-muted-foreground">DAST e DASE/PRAE: atendimento médico, odontológico e psicossocial gratuito.</figcaption>
        </figure>
      </div>
    </div>
  );
};

/** Compatibilidade: versão de página única (todas as seções em sequência). */
export const PermanenciaInteractiveHub: React.FC = () => (
  <div className="space-y-10">
    <PermanenciaNiveis />
    <PermanenciaSimulador />
    <PermanenciaPedido />
  </div>
);
