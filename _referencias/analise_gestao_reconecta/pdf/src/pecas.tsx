// Peças do documento. Reaproveitam o que o site já tem: carimbos (stamps.css), tabela e gráficos
// (components/ui), a caneta da chapa (MarkerWord) e os desenhos originais (DesenhosDaChapa).
import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ReferenceLine, XAxis, YAxis } from 'recharts';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MarkerWord } from '@/components/ui/marker-word';
import { AdesivoDaProposta, type DesenhoDeProposta } from '@/components/features/semente/DesenhosDaChapa';
import { numero, puro, lerCsv } from './md';
import postsCsv from '../../posts_recontagem.csv?raw';

const POSTS = lerCsv(postsCsv);

// Imagens de comprovação, guardadas em ../imagens (reproduções de posts públicos, com a fonte na legenda).
const IMAGENS = import.meta.glob('../../imagens/*.jpg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

/** Uma ou mais imagens lado a lado: "::figura imagens:a.jpg,b.jpg | Título". */
export const Imagens: React.FC<{ arquivos: string[]; titulo: string }> = ({ arquivos, titulo }) => (
  <div className="doc-imagens">
    {arquivos.map((a) => <img key={a} src={IMAGENS[`../../imagens/${a}`]} alt={titulo} />)}
  </div>
);

const GRAFITE = '#1F1F1F';
const PETROLEO = '#266264';
const LARANJA = '#FE8812';
const ROXO = '#5B2A85';
const STATUS = { ok: '#166534', meio: '#92400E', diz: '#005A9C', nao: '#B91C1C' } as const;
type Situacao = keyof typeof STATUS | 'neutro';

/** Negrito, itálico, código e a caneta da chapa. */
export function fmt(texto: string, naCor = false): React.ReactNode[] {
  const partes = texto.split(/(\*\*.+?\*\*|\*.+?\*|`[^`]+`|==.+?==)/g).filter(Boolean);
  return partes.map((p, i) => {
    if (p.startsWith('**')) return <strong key={i}>{fmt(p.slice(2, -2), naCor)}</strong>;
    if (p.startsWith('==')) return <MarkerWord key={i} onColor={naCor}>{p.slice(2, -2)}</MarkerWord>;
    if (p.startsWith('*')) return <em key={i}>{p.slice(1, -1)}</em>;
    if (p.startsWith('`')) return <code key={i}>{p.slice(1, -1)}</code>;
    return <React.Fragment key={i}>{p.replace(/R\$ /g, 'R$ ')}</React.Fragment>;
  });
}

export function situacaoDe(texto: string): Situacao {
  const t = puro(texto).toLowerCase();
  if (t.startsWith('fez e mostrou')) return 'ok';
  if (t.startsWith('fez pela metade') || t.startsWith('pela metade')) return 'meio';
  if (t.startsWith('diz que fez')) return 'diz';
  if (t.startsWith('não apareceu')) return 'nao';
  return 'neutro';
}

// Os carimbos de estado do site: deferido, pendente, homologado, indeferido.
const CLASSE_CARIMBO: Record<Situacao, string> = { ok: 'is-deferido', meio: 'is-pendente', diz: 'is-homologado', nao: 'is-indeferido', neutro: 'is-visto' };

export const Carimbo: React.FC<{ texto: string }> = ({ texto }) => (
  <span className={`cagp-stamp-badge doc-carimbo ${CLASSE_CARIMBO[situacaoDe(texto)]}`}>{puro(texto)}</span>
);

export const Placar: React.FC<{ linhas: string[][] }> = ({ linhas }) => (
  <ul className="doc-placar">
    {linhas.map((l) => (
      <li key={l[0]} className={`doc-placar__item is-${situacaoDe(l[0])}`}>
        <span className="doc-placar__num">{puro(l[1])}</span>
        <Carimbo texto={l[0]} />
        <span className="doc-placar__desc">{fmt(l[2])}</span>
      </li>
    ))}
  </ul>
);

export const FluxoCarimbos: React.FC = () => {
  const perguntas: [string, string][] = [
    ['Tem registro no relatório da gestão ou no Instagram?', 'Não apareceu'],
    ['Entregou tudo, na frequência que prometeu?', 'Fez pela metade'],
    ['Foi divulgada em público, no Instagram?', 'Diz que fez, não mostrou'],
  ];
  return (
    <ol className="doc-fluxo">
      <li><span className="doc-fluxo__caixa is-inicio">Uma proposta da carta, com o prazo que ela mesma deu</span></li>
      {perguntas.map(([q, nao], i) => (
        <li key={q} data-via={i ? 'sim' : ''}>
          <span className="doc-fluxo__caixa">{q}</span>
          <span className="doc-fluxo__ramo"><b>Não</b><span aria-hidden="true">→</span><Carimbo texto={nao} /></span>
        </li>
      ))}
      <li data-via="sim"><span className="doc-fluxo__fim"><Carimbo texto="Fez e mostrou" /></span></li>
    </ol>
  );
};

const CRITERIOS: [string, string][] = [
  ['Festa (Desgovernados)', 'Lote, ingresso, open bar, atrações e contagem regressiva da calourada.'],
  ['Política nacional', 'Eleição presidencial, atos de rua e datas da política do país.'],
  ['Calouros e integração', 'Recepção, Manual do Calouro, SISU, Taça Di Pietro, Correio Elegante.'],
  ['Gestão do CA', 'Posse, dívida, lojinha, processo seletivo, assembleias internas, Empresa Júnior.'],
  ['Acadêmico', 'AACs, matrícula, planilha de oportunidades, visitas a órgãos públicos.'],
  ['Pauta estudantil', 'Passe livre, paralisação, veto a debates na UFMG, assembleia do DCE.'],
  ['Jornal do CAGP', 'As edições do jornal.'],
  ['Outros', 'Legenda sem assunto identificável.'],
];

export const FluxoAssuntos: React.FC = () => {
  const conta = (nome: string) => POSTS.filter((p) => p.assunto_recontagem === nome).length;
  return (
    <ol className="doc-fluxo">
      <li><span className="doc-fluxo__caixa is-inicio">Um post do perfil do CAGP, ou com ele como parceiro ({POSTS.length} no período)</span></li>
      <li data-via=""><span className="doc-fluxo__caixa">Qual é o assunto principal da legenda? Cada post recebe um só.</span></li>
      <li data-via="">
        <ul className="doc-assuntos">
          {CRITERIOS.map(([nome, regra]) => (
            <li key={nome} className={nome.startsWith('Festa') ? 'is-festa' : ''}>
              <span className="doc-assuntos__n">{conta(nome)}</span>
              <span className="doc-assuntos__nome">{nome}</span>
              <span className="doc-assuntos__regra">{regra}</span>
            </li>
          ))}
        </ul>
      </li>
    </ol>
  );
};

const eixoTexto = { fontFamily: 'Poppins, sans-serif', fontSize: 11, fill: GRAFITE };

/** Barras horizontais: um assunto por linha, a festa em laranja. */
export const GraficoBarras: React.FC<{ cab: string[]; linhas: string[][] }> = ({ cab, linhas }) => {
  const dados = linhas.map((l) => ({ nome: puro(l[0]), valor: numero(l[1]), rotulo: puro(l[1]) }));
  const config: ChartConfig = { valor: { label: puro(cab[1]), color: PETROLEO } };
  return (
    <ChartContainer config={config} variant="minimal" className="doc-grafico" style={{ height: (document.documentElement.dataset.tipo === 'boletim' ? 18 : 23) * dados.length + 14, aspectRatio: 'auto' }}
      aria-label={`${puro(cab[1])} por ${puro(cab[0]).toLowerCase()}: ${dados.map((d) => `${d.nome}, ${d.rotulo}`).join('; ')}`}>
      <BarChart data={dados} layout="vertical" margin={{ top: 4, right: 48, bottom: 4, left: 0 }} barCategoryGap={5}>
        <XAxis type="number" hide domain={[0, 'dataMax']} />
        <YAxis type="category" dataKey="nome" width={196} tickLine={false} axisLine={{ stroke: GRAFITE, strokeWidth: 1.5 }} tick={eixoTexto} interval={0} />
        <Bar dataKey="valor" stroke={GRAFITE} strokeWidth={1.5} radius={[0, 5, 5, 0]} isAnimationActive={false}>
          {dados.map((d) => <Cell key={d.nome} fill={d.nome.startsWith('Festa') ? LARANJA : PETROLEO} />)}
          <LabelList dataKey="rotulo" position="right" style={{ ...eixoTexto, fontWeight: 700, fontSize: 12 }} />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

/** Colunas por mês, com a parte de festa em laranja e a linha da média. */
export const GraficoMeses: React.FC<{ linhas: string[][] }> = ({ linhas }) => {
  const dados = linhas.map((l) => {
    const total = numero(l[1]);
    const festa = numero(l[2]);
    return { mes: puro(l[0]).split('/')[0], total, festa, outros: total - festa };
  });
  const media = dados.reduce((s, d) => s + d.total, 0) / dados.length;
  const mediaTxt = media.toFixed(1).replace('.', ',');
  const config: ChartConfig = { outros: { label: 'Outros assuntos', color: PETROLEO }, festa: { label: 'Festa', color: LARANJA } };
  return (
    <div>
      <ChartContainer config={config} variant="minimal" className="doc-grafico" style={{ height: 200, aspectRatio: 'auto' }}
        aria-label={`Posts por mês: ${dados.map((d) => `${d.mes}, ${d.total} (${d.festa} de festa)`).join('; ')}. Média de ${mediaTxt}.`}>
        <BarChart data={dados} margin={{ top: 18, right: 8, bottom: 0, left: 0 }} barCategoryGap="22%">
          <CartesianGrid vertical={false} stroke="#E7E3D8" />
          <XAxis dataKey="mes" tickLine={false} axisLine={{ stroke: GRAFITE, strokeWidth: 1.5 }} tick={eixoTexto} interval={0} />
          <YAxis width={26} tickLine={false} axisLine={false} tick={eixoTexto} allowDecimals={false} />
          <Bar dataKey="outros" stackId="a" fill={PETROLEO} stroke={GRAFITE} strokeWidth={1.5} isAnimationActive={false} />
          <Bar dataKey="festa" stackId="a" fill={LARANJA} stroke={GRAFITE} strokeWidth={1.5} radius={[4, 4, 0, 0]} isAnimationActive={false}>
            <LabelList dataKey="total" position="top" style={{ ...eixoTexto, fontWeight: 700, fontSize: 12, paintOrder: 'stroke', stroke: '#FFFFFF', strokeWidth: 4 }} />
          </Bar>
          <ReferenceLine y={media} stroke={ROXO} strokeWidth={1.5} strokeDasharray="6 4"
            label={{ value: `média ${mediaTxt}`, position: 'insideTopLeft', fill: ROXO, fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700 }} />
        </BarChart>
      </ChartContainer>
      <p className="doc-chave">
        <span className="doc-chave__cor" style={{ background: LARANJA }} /> festa
        <span className="doc-chave__cor" style={{ background: PETROLEO }} /> outros assuntos
        <span className="doc-chave__linha" /> média do período
      </p>
    </div>
  );
};

/** Situação das propostas por eixo: uma barra empilhada por linha. */
export const GraficoEixos: React.FC<{ cab: string[]; linhas: string[][] }> = ({ cab, linhas }) => {
  const chaves = cab.slice(1).map((c) => situacaoDe(c)) as (keyof typeof STATUS)[];
  const dados = linhas.map((l) => Object.fromEntries([['eixo', puro(l[0])], ...chaves.map((k, i) => [k, numero(l[i + 1])])]));
  const config: ChartConfig = Object.fromEntries(chaves.map((k, i) => [k, { label: puro(cab[i + 1]), color: STATUS[k] }]));
  return (
    <div>
      <ChartContainer config={config} variant="minimal" className="doc-grafico" style={{ height: 30 * dados.length + 12, aspectRatio: 'auto' }}
        aria-label={linhas.map((l) => `${puro(l[0])}: ${cab.slice(1).map((c, i) => `${puro(l[i + 1])} ${puro(c).toLowerCase()}`).join(', ')}`).join('; ')}>
        <BarChart data={dados} layout="vertical" margin={{ top: 4, right: 4, bottom: 4, left: 0 }} barCategoryGap={6}>
          <XAxis type="number" hide domain={[0, 'dataMax']} />
          <YAxis type="category" dataKey="eixo" width={236} tickLine={false} axisLine={false} tick={eixoTexto} interval={0} />
          {chaves.map((k) => (
            <Bar key={k} dataKey={k} stackId="a" fill={STATUS[k]} stroke={GRAFITE} strokeWidth={1.5} isAnimationActive={false}>
              <LabelList dataKey={k} position="center" formatter={(v: unknown) => (Number(v) ? String(v) : '')}
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 700, fill: '#FFFFFF' }} />
            </Bar>
          ))}
        </BarChart>
      </ChartContainer>
      <p className="doc-chave doc-chave--carimbos">{cab.slice(1).map((c) => <Carimbo key={c} texto={c} />)}</p>
    </div>
  );
};

const ARTES: [string, DesenhoDeProposta][] = [
  ['prestação de contas', 'contas'], ['comunicação que informa', 'comunicacao'], ['cursos livres', 'cursos'],
  ['reunião aberta', 'reunioes'], ['canal permanente', 'escuta'], ['empresa júnior', 'empresa'], ['site do curso', 'site'],
];

/** Quadro ou tabela, com a tabela do site. A coluna "Situação" vira carimbo. */
export const Quadro: React.FC<{ classe: 'quadro' | 'tabela'; cab: string[]; linhas: string[][] }> = ({ classe, cab, linhas }) => {
  const colSituacao = cab.findIndex((c) => puro(c).toLowerCase() === 'situação');
  const semente = puro(cab[cab.length - 1]).toLowerCase().startsWith('proposta da chapa semente');
  const numerica = (i: number) => classe === 'tabela' && i > 0 || /^valor$/i.test(puro(cab[i]));
  return (
    <Table className={`doc-tabela is-${classe}${semente ? ' is-semente' : ''}${colSituacao === 3 ? ' tem-situacao' : ''}${colSituacao === 2 ? ' tem-situacao3' : ''}`}>
      <TableHeader>
        <TableRow>
          {semente && <TableHead aria-hidden="true" />}
          {cab.map((c, i) => <TableHead key={i} className={numerica(i) ? 'is-num' : ''}>{fmt(c)}</TableHead>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {linhas.map((l, r) => {
          const baixo = puro(l[l.length - 1]).toLowerCase();
          const arte = semente ? ARTES.find(([chave]) => baixo.includes(chave))?.[1] ?? 'contas' : null;
          return (
            <TableRow key={r} className={puro(l[0]).toLowerCase().startsWith('total') ? 'is-total' : ''}>
              {arte && <TableCell className="doc-tabela__arte"><AdesivoDaProposta art={arte} delay={0} /></TableCell>}
              {l.map((c, i) => (
                <TableCell key={i} className={numerica(i) ? 'is-num' : ''}>
                  {i === colSituacao ? <Carimbo texto={c} /> : fmt(c)}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
