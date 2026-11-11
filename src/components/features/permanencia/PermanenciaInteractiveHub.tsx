// PermanenciaInteractiveHub.tsx — Ilhas da página /permanencia:
// <PermanenciaSimulador /> (quanto o RU custa por mês em cada nível, com a tabela real da FUMP) e
// <PermanenciaPedido /> (as etapas do pedido + ajuda do CAGP). Os programas e os níveis são estáticos
// (FumpProgramas.astro). Nada aqui é estimativa de auxílio: a FUMP só define por nível o preço do RU
// (src/data/fumpProgramas.json); moradia e suportes financeiros saem por chamada, sem valor fixo.
import React, { useId, useState } from 'react';
import { asset, route } from '@/lib/paths';
import fump from '@/data/fumpProgramas.json';

type NivelRu = (typeof fump.precosRu.niveis)[number];
const NIVEIS: NivelRu[] = fump.precosRu.niveis;
/** O que paga quem não tem nível: é a base da comparação. */
const SEM_NIVEL = NIVEIS.find((n) => n.id === 'geral')!;
const COM_NIVEL = NIVEIS.filter((n) => n.id !== 'geral');

const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const cardClass = 'rounded-xl border-3 border-border bg-card shadow-lg';

/** Seletor de nível como grupo de rádio. */
function LevelPicker({
  value,
  onChange,
  options,
  label,
}: {
  value: string | null;
  onChange: (id: string) => void;
  options: NivelRu[];
  label: string;
}) {
  const name = useId();
  return (
    <fieldset className="m-0 p-0 border-0">
      <legend className="font-heading font-bold text-sm mb-2">{label}</legend>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
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
              <span className="font-heading font-bold uppercase text-sm leading-tight">{opt.nivel}</span>
              <span className={`text-xs leading-snug mt-0.5 tabular-nums ${checked ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                {opt.preco === 0 ? 'Gratuito' : `${brl(opt.preco)} por refeição`}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ───────────────────────── Aba "Simular" ───────────────────────── */

export const PermanenciaSimulador: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  // Padrão do estudante noturno: só o jantar nos dias úteis.
  const [meals, setMeals] = useState<number>(22);
  const sliderId = useId();

  const nivel = COM_NIVEL.find((l) => l.id === selected) ?? null;
  const semNivel = meals * SEM_NIVEL.preco;
  const comNivel = nivel ? meals * nivel.preco : 0;

  return (
    <div className="space-y-5">
      <p className="text-base leading-relaxed m-0 max-w-[68ch]">
        Veja quanto o almoço e o jantar no RU custam por mês em cada nível. Os preços são os da tabela da FUMP ({fump.precosRu.norma}).
      </p>

      <LevelPicker value={selected} onChange={setSelected} options={COM_NIVEL} label="1. Escolha um nível" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className={`${cardClass} lg:col-span-7 p-4 space-y-2`}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <label htmlFor={sliderId} className="font-heading font-bold text-sm">
              2. Refeições no RU por mês
            </label>
            <output htmlFor={sliderId} className="font-heading text-sm font-bold tabular-nums">
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
          <p id={`${sliderId}-hint`} className="text-sm text-muted-foreground m-0">
            22 = jantar em todos os dias úteis · 44 = almoço e jantar
          </p>
        </div>

        <section className={`${cardClass} lg:col-span-5 p-4`} aria-live="polite" aria-labelledby="sim-resultado-titulo">
          <h3 id="sim-resultado-titulo" className="font-heading font-bold text-sm m-0">
            {nivel ? `RU por mês · ${nivel.nivel}` : 'RU por mês'}
          </h3>
          {nivel ? (
            <>
              <p className="font-heading font-bold text-3xl sm:text-4xl tabular-nums my-2">
                {comNivel === 0 ? 'Gratuito' : brl(comNivel)}
              </p>
              <dl className="m-0 space-y-1.5 pt-3 border-t-2 border-border text-sm tabular-nums">
                <div className="flex justify-between gap-3"><dt>Sem nível FUMP</dt><dd className="m-0 font-bold">{brl(semNivel)}</dd></div>
                <div className="flex justify-between gap-3"><dt>Você deixa de pagar</dt><dd className="m-0 font-bold">{brl(semNivel - comNivel)}</dd></div>
                {nivel.cafe && (
                  <div className="flex justify-between gap-3"><dt>Café da manhã</dt><dd className="m-0 font-bold">Gratuito</dd></div>
                )}
              </dl>
            </>
          ) : (
            <p className="text-sm text-muted-foreground mt-2 mb-0">Escolha um nível acima para ver a conta.</p>
          )}
        </section>
      </div>

      <p className="text-sm text-muted-foreground m-0 max-w-[68ch]">
        A conta vale só para o RU. Moradia e suportes financeiros não têm valor fixo por nível: saem por chamada da PRAE e da FUMP.
      </p>
    </div>
  );
};

/* ───────────────────────── Aba "Pedir" ───────────────────────── */

const FUMP_STEPS = [
  {
    title: 'Preencha o Questionário Socioeconômico',
    desc: 'Com a matrícula ativa num curso presencial, entre na Área do Aluno da FUMP e preencha o questionário, escolhendo a opção do seu curso.',
    tip: 'Errou uma resposta? O questionário não volta de página: conclua e envie mesmo assim. A correção é feita na análise dos documentos.',
  },
  {
    title: 'Espere o e-mail com a lista de documentos',
    desc: 'A FUMP manda por e-mail os documentos que você precisa apresentar. A lista depende do que você respondeu no questionário.',
    tip: 'Não responda o e-mail com os documentos: eles são enviados pela Área do Aluno.',
  },
  {
    title: 'Envie os documentos pela Área do Aluno',
    desc: 'Faça o envio de cada documento pela Área do Aluno, no portal da FUMP. O Serviço Social analisa e define o seu nível (Portaria PRAE nº 1.286/2026).',
    tip: 'Dúvida no preenchimento: WhatsApp da FUMP em Belo Horizonte, (31) 97537-0115.',
  },
  {
    title: 'Com o nível, acompanhe as chamadas',
    desc: 'O preço do RU passa a valer conforme o seu nível. Moradia e suportes financeiros saem por chamada: acompanhe os portais da FUMP e da PRAE e manifeste interesse na Área do Aluno dentro do prazo.',
    tip: 'Ter nível não garante o suporte: a seleção depende dos critérios da chamada e do orçamento.',
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
          href={fump.areaDoAluno}
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

