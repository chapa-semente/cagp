// Monta o documento a partir do Markdown: capa, resumo e sumário (relatório) ou cabeçalho (boletim),
// corpo com figuras, quadros e tabelas numerados, e a assinatura.
import React from 'react';
import { AdesivoChapa } from '@/components/features/semente/DesenhosDaChapa';
import { ARTISTA_DOS_DESENHOS } from '@/lib/creditos';
import logoCor from '../../../../public/logos/semente/semente-horizontal.webp';
import logoBranco from '../../../../public/logos/semente/semente-horizontal-branco.webp';
import { ler, puro, type Bloco } from './md';
import { fmt, FluxoAssuntos, FluxoCarimbos, GraficoBarras, GraficoEixos, GraficoMeses, Imagens, Placar, Quadro, situacaoDe } from './pecas';
import { numero } from './md';

type Elemento = Extract<Bloco, { t: 'elemento' }>;
const ROTULO = { figura: 'Figura', quadro: 'Quadro', tabela: 'Tabela' } as const;

/** Texto invisível que gerar-pdf.mjs procura para saber em que página cada seção caiu. */
const Marca: React.FC<{ id: string }> = ({ id }) => <span className="doc-marca" aria-hidden="true">§§{id}§§</span>;

const Credito: React.FC = () => (
  <>Desenhos de {ARTISTA_DOS_DESENHOS.nome}, {ARTISTA_DOS_DESENHOS.quem} · {ARTISTA_DOS_DESENHOS.instagram}</>
);

function conteudo(e: Elemento) {
  if (e.tipo.startsWith('imagens:')) return <Imagens arquivos={e.tipo.slice(8).split(',').map((s) => s.trim())} titulo={e.titulo} />;
  switch (e.tipo) {
    case 'placar': return <Placar linhas={e.linhas} />;
    case 'eixos': return <GraficoEixos cab={e.cab} linhas={e.linhas} />;
    case 'barras': return <GraficoBarras cab={e.cab} linhas={e.linhas} />;
    case 'colunas-mes': return <GraficoMeses linhas={e.linhas} />;
    case 'fluxo-carimbos': return <FluxoCarimbos />;
    case 'fluxo-assuntos': return <FluxoAssuntos />;
    default: return <Quadro classe={e.classe === 'tabela' ? 'tabela' : 'quadro'} cab={e.cab} linhas={e.linhas} />;
  }
}

interface Secao { id: string; nivel: 2 | 3; num: string; titulo: string }

/** "4.1 Eixo 1: Gestão" → número e título; títulos sem número (Resumo, Referências) ficam sem. */
function secao(texto: string, nivel: 2 | 3): Secao {
  const m = texto.match(/^(\d+(?:\.\d+)?) (.*)$/);
  return m ? { id: m[1], nivel, num: m[1], titulo: m[2] } : { id: puro(texto).toLowerCase(), nivel, num: '', titulo: texto };
}

function Corpo({ blocos, conta }: { blocos: Bloco[]; conta: Record<string, number> }) {
  let refs = false;
  return (
    <>
      {blocos.map((b, i) => {
        if (b.t === 'h' && b.n === 2) {
          const s = secao(b.texto, 2);
          refs = s.titulo.toLowerCase().startsWith('referências');
          return (
            <h2 key={i} className={`doc-h2${s.num ? '' : ' is-sem-numero'}`}>
              {s.num && <span className="doc-h2__n">{s.num}</span>}
              <span>{fmt(s.titulo)}</span>
              <Marca id={s.id} />
            </h2>
          );
        }
        if (b.t === 'h') {
          const s = secao(b.texto, 3);
          return <h3 key={i} className="doc-h3">{s.num && <span className="doc-h3__n">{s.num}</span>}{fmt(s.titulo)}<Marca id={s.id} /></h3>;
        }
        if (b.t === 'p') return <p key={i} className={refs ? 'doc-ref' : undefined}>{fmt(b.texto)}</p>;
        if (b.t === 'lista') {
          const L = b.ord ? 'ol' : 'ul';
          return <L key={i} className="doc-lista">{b.itens.map((it, j) => <li key={j}>{fmt(it)}</li>)}</L>;
        }
        if (b.t === 'nota') return <aside key={i} className="doc-nota">{fmt(b.texto)}</aside>;
        if (b.t === 'meta' && b.chave === 'palavras-chave') return <p key={i} className="doc-palavras"><strong>Palavras-chave:</strong> {b.valor}</p>;
        if (b.t === 'elemento') {
          conta[b.classe] = (conta[b.classe] ?? 0) + 1;
          const longo = b.linhas.length > 5 && b.classe !== 'figura';
          return (
            <figure key={i} className={`doc-elemento is-${b.classe}${longo ? ' is-longo' : ''}`}>
              <figcaption className="doc-legenda"><strong>{ROTULO[b.classe]} {conta[b.classe]}</strong> – {fmt(b.titulo)}</figcaption>
              {conteudo(b)}
              {b.fonte && <p className="doc-fonte">Fonte: {fmt(b.fonte)}</p>}
            </figure>
          );
        }
        return null;
      })}
    </>
  );
}

const Assinatura: React.FC = () => (
  <div className="doc-assinatura" style={{ position: 'relative' }}>
    <img src={logoCor} alt="Chapa Semente" />
    <p><Credito /></p>
    {/* Segura o evento "load" por alguns segundos (vite.config.mjs atende /espera com atraso): é quando o
        Chrome imprime, e gráficos e adesivos precisam ter terminado. Fica dentro da última seção para não
        abrir uma página nova. */}
    <img src="/espera" alt="" width={1} height={1} style={{ position: 'absolute', opacity: 0 }} />
  </div>
);

/** Título com dois-pontos: a primeira parte vira o letreiro, a segunda a linha de apoio. */
function titulos(texto: string): [string, string] {
  const i = texto.indexOf(':');
  if (i < 0) return [texto, ''];
  const resto = texto.slice(i + 1).trim();
  return [texto.slice(0, i).trim(), resto.charAt(0).toUpperCase() + resto.slice(1)];
}

export interface DocumentoProps { doc: 'boletim' | 'relatorio'; md: string; paginas: Record<string, number>; rascunho: boolean }

export const Documento: React.FC<DocumentoProps> = ({ doc, md, paginas, rascunho }) => {
  const todos = ler(md);
  const partes: Bloco[][] = [[]];
  for (const b of todos) {
    if (b.t === 'hr') partes.push([]);
    else partes[partes.length - 1].push(b);
  }
  const [primeira, ...outras] = partes;
  const titulo = (primeira.find((b) => b.t === 'h' && b.n === 1) as Extract<Bloco, { t: 'h' }>).texto;
  const sub = puro((primeira.find((b) => b.t === 'p') as Extract<Bloco, { t: 'p' }>).texto);
  const meta = (k: string) => (primeira.find((b) => b.t === 'meta' && b.chave === k) as Extract<Bloco, { t: 'meta' }> | undefined)?.valor ?? '';
  const iSub = primeira.findIndex((b) => b.t === 'p');
  const resto = primeira.slice(iSub + 1).filter((b) => !(b.t === 'meta' && (b.chave === 'local' || b.chave === 'data')));
  const conta: Record<string, number> = {};
  const [letreiro, apoio] = titulos(titulo);
  const selo = rascunho ? <span className="sk-adesivo doc-rascunho">Rascunho · 13/11</span> : null;

  if (doc === 'boletim') {
    return (
      <>
        <section className="doc-texto">
          <header className="doc-cabeca">
            {selo}
            <div>
              <img className="doc-cabeca__logo" src={logoBranco} alt="Chapa Semente" />
              <h1 className="doc-cabeca__titulo">{fmt(titulo, true)}</h1>
              <p className="doc-cabeca__sub">{sub}</p>
              <p className="doc-cabeca__data">{meta('local')} · {meta('data')}</p>
            </div>
            <AdesivoChapa className="doc-cabeca__adesivo" />
          </header>
          <Corpo blocos={resto} conta={conta} />
          {outras.length === 0 && <Assinatura />}
        </section>
        {outras.map((p, k) => {
          const h = p.find((b) => b.t === 'h' && b.n === 1) as Extract<Bloco, { t: 'h' }>;
          const iP = p.findIndex((b) => b.t === 'p');
          return (
            <section key={k} className="doc-texto doc-parte">
              <h1 className="doc-parte__titulo">{h.texto}</h1>
              <p className="doc-parte__sub">{puro((p[iP] as Extract<Bloco, { t: 'p' }>).texto)}</p>
              <Corpo blocos={p.slice(iP + 1)} conta={conta} />
              <Assinatura />
            </section>
          );
        })}
      </>
    );
  }

  // Relatório: o Resumo vai para a página pré-textual; o sumário lista as seções numeradas e as referências.
  const iPrimeiraSecao = resto.findIndex((b) => b.t === 'h' && b.n === 2 && /^\d/.test(b.texto));
  const resumo = resto.slice(0, iPrimeiraSecao).filter((b) => !(b.t === 'h'));
  const corpo = resto.slice(iPrimeiraSecao);
  const secoes = corpo.filter((b): b is Extract<Bloco, { t: 'h' }> => b.t === 'h').map((b) => secao(b.texto, b.n === 2 ? 2 : 3));

  // "Em uma olhada", sob o resumo: os totais saem da figura por eixo e os critérios do quadro de situações.
  const elementos = corpo.filter((b): b is Elemento => b.t === 'elemento');
  const porEixo = elementos.find((e) => e.tipo === 'eixos');
  const criterios = elementos.find((e) => puro(e.cab[0] ?? '') === 'Situação' && puro(e.cab[1] ?? '') === 'Critério');
  const olhada = porEixo && criterios
    ? criterios.linhas.map((l) => {
        const col = porEixo.cab.findIndex((c, i) => i > 0 && situacaoDe(c) === situacaoDe(l[0]));
        const total = porEixo.linhas.reduce((s, r) => s + numero(r[col]), 0);
        return [l[0], String(total), l[1]];
      })
    : null;

  return (
    <>
      <section className="doc-capa">
        <div className="doc-capa__bloco">
          {selo}
          <img className="doc-capa__logo" src={logoBranco} alt="Chapa Semente" />
          <h1 className="doc-capa__titulo">{letreiro}</h1>
          {apoio && <p className="doc-capa__linha">{fmt(apoio, true)}</p>}
          <p className="doc-capa__sub">{sub}</p>
        </div>
        <AdesivoChapa className="doc-capa__adesivo" />
        <p className="doc-capa__credito"><Credito /></p>
        <p className="doc-capa__pe">{meta('local')}<br />{meta('data')}</p>
      </section>

      <section className="doc-pre">
        <h2 className="doc-h2 is-sem-numero"><span>Resumo</span></h2>
        <Corpo blocos={resumo} conta={conta} />
        {olhada && (
          <div className="doc-olhada">
            <p className="doc-olhada__titulo">As 33 propostas da carta, em uma olhada</p>
            <Placar linhas={olhada} />
          </div>
        )}
      </section>

      <section className="doc-pre">
        <h2 className="doc-h2 is-sem-numero"><span>Sumário</span></h2>
        <ol className="doc-sumario">
          {secoes.map((s) => (
            <li key={s.id} className={`is-n${s.nivel}${s.num ? '' : ' is-sem-numero'}`}>
              <span className="doc-sumario__num">{s.num}</span>
              <span className="doc-sumario__titulo">{puro(s.titulo)}</span>
              <span className="doc-sumario__pontos" />
              <span className="doc-sumario__pag">{paginas[s.id] ?? ''}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="doc-texto">
        <Corpo blocos={corpo} conta={conta} />
        <Assinatura />
      </section>
    </>
  );
};
