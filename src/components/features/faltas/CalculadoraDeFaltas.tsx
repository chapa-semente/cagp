// CalculadoraDeFaltas.tsx — A ferramenta de /faltas (DESIGN.md › Arquétipo 3, Ferramenta).
//
// Ideia de Luiz Carlos, 4º período (23/11/2026), proposta de estudante nº 2.
//
// Uma pergunta por tela: "quantos dias ainda dá pra faltar?". A resposta sai em dias, que é a
// decisão de quem estuda à noite (vou ou não vou hoje), com as faltas em letra menor. Cada
// disciplina tem uma cartela: um quadro por dia de aula que cabe no limite; falta marcada é um X,
// como no diário de classe.
//
// A conta e os dados moram em src/lib/faltas.ts. As disciplinas são as mesmas "Cursando agora" do
// painel de /meu-curso (cagp_minha_grade_v1): marcar aqui marca lá.
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { getVaultItem, type VaultData } from '@/lib/storage/studentVault';
import {
  AULAS_POR_DIA,
  AULAS_POR_DIA_PADRAO,
  CARGAS_HORARIAS,
  ROTULO_DA_SITUACAO,
  adicionarExtra,
  comecarSemestre,
  contaDeFaltas,
  definirAulasPorDia,
  definirCursando,
  desfazerFalta,
  disciplinasDoSemestre,
  fraseDaConta,
  lerFaltas,
  marcarFalta,
  obrigatoriasParaEscolher,
  plural,
  resumoDasFaltas,
  semestreDe,
  tirarDaCartela,
  type ContaDeFaltas,
  type DisciplinaComFaltas,
  type EstadoFaltas,
  type SituacaoDeFaltas,
} from '@/lib/faltas';
import { CagpIcon } from '@/components/ui/CagpIcon';
import { route } from '@/lib/paths';

type Grade = VaultData<'cagp_minha_grade_v1'>;

/** A tinta de cada situação: broto, fruto e folha do ciclo, e o vermelho de estado só para quem passou. */
const TINTA: Record<SituacaoDeFaltas, string> = {
  tranquilo: 'var(--color-broto)',
  atencao: 'var(--color-fruto)',
  limite: 'var(--color-accent)',
  estourou: 'var(--color-destructive)',
};
/** O selo do kit (.mh-selo) que corresponde a cada situação. */
const SELO: Record<SituacaoDeFaltas, string> = { tranquilo: 'feita', atencao: 'urgente', limite: 'urgente', estourou: 'vencido' };
const VAZIO: EstadoFaltas = { semestre: '', marcas: {}, aulasPorDia: {}, extras: [], fora: [] };
const ancora = (id: string) => `ft-${id.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`;
/** A regra em quatro cargas horárias, para quem ainda não montou a cartela. */
const EXEMPLOS = [30, 45, 60, 90].map((ch) => ({ ch, conta: contaDeFaltas(ch) }));

/**
 * A cartela: um quadro por dia de aula que cabe no limite e, se sobrar, um quadro mais estreito
 * com as faltas avulsas. O quadro enche de baixo para cima e ganha o X quando o dia inteiro foi.
 */
const Quadros: React.FC<{ conta: ContaDeFaltas; aulasPorDia: number; cor: string; x?: string; rotulo: string }> = ({ conta, aulasPorDia, cor, x = '#fff', rotulo }) => {
  const tamanhos = [...Array(conta.diasCabem).fill(aulasPorDia), ...(conta.limite % aulasPorDia ? [conta.limite % aulasPorDia] : [])];
  let resto = Math.min(conta.faltas, conta.limite);
  return (
    <div className="ft-quadros" role="img" aria-label={rotulo} style={{ '--cor': cor, '--x': x } as React.CSSProperties}>
      {tamanhos.map((tamanho, i) => {
        const cheias = Math.min(tamanho, resto);
        resto -= cheias;
        return (
          <span
            key={i}
            className="ft-q"
            data-cheio={cheias === tamanho || undefined}
            data-avulso={tamanho < aulasPorDia || undefined}
            style={{ '--l': tamanho / aulasPorDia, '--p': cheias / tamanho } as React.CSSProperties}
          >
            <span className="ft-q-tinta" />
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </span>
        );
      })}
      {conta.passou > 0 && <span className="ft-q-mais">+{conta.passou}</span>}
    </div>
  );
};

/**
 * Faz a mudança sem a tela pular: o que a pessoa tocou continua debaixo do dedo. Marcar uma disciplina
 * faz o cartão do resultado e as cartelas crescerem acima da lista, e o Safari não ancora a rolagem.
 */
function semPulo(el: HTMLElement | null, mudar: () => void) {
  const antes = el?.getBoundingClientRect().top;
  flushSync(mudar);
  if (!el || antes === undefined || !el.isConnected) return;
  const pulo = el.getBoundingClientRect().top - antes;
  if (Math.abs(pulo) > 1) window.scrollBy({ top: pulo, behavior: 'instant' });
}

const rotuloDosQuadros = (c: ContaDeFaltas) =>
  `${plural(c.faltas, 'falta marcada', 'faltas marcadas')} de ${c.limite} que cabem. ${
    c.situacao === 'estourou' ? `Passou ${plural(c.passou, 'falta', 'faltas')} do limite.` : `Ainda ${plural(c.diasRestam, 'dia inteiro livre', 'dias inteiros livres')}.`
  }`;

export const CalculadoraDeFaltas: React.FC = () => {
  const [estado, setEstado] = useState<EstadoFaltas>(VAZIO);
  const [grade, setGrade] = useState<Grade>({ savedCourses: [], cursando: [] });
  const [periodoDoPerfil, setPeriodoDoPerfil] = useState<number | null>(null);
  const [pronto, setPronto] = useState(false);
  const [vivo, setVivo] = useState(false);
  const [aviso, setAviso] = useState('');
  const [confirmando, setConfirmando] = useState(false);
  const [nome, setNome] = useState('');
  const [ch, setCh] = useState(60);
  const [erroNome, setErroNome] = useState(false);
  const tituloDasCartelas = useRef<HTMLHeadingElement>(null);
  const tituloDaEscolha = useRef<HTMLHeadingElement>(null);

  const carregar = useCallback(() => {
    setEstado(lerFaltas());
    setGrade(getVaultItem('cagp_minha_grade_v1'));
    const perfil = getVaultItem('cagp_student_profile_v1');
    const n = Number(perfil.period.match(/\d+/)?.[0]);
    // Perfil em rascunho ainda diz "1º período" por padrão: não vale como informação.
    setPeriodoDoPerfil(!perfil.rascunho && n >= 1 && n <= 10 ? n : null);
    setPronto(true);
  }, []);

  useEffect(() => {
    carregar();
    window.addEventListener('cagp:vault-updated', carregar);
    window.addEventListener('storage', carregar);
    // O carimbo só bate em falta marcada agora, não nas que já estavam salvas.
    const t = window.setTimeout(() => setVivo(true), 400);
    return () => {
      window.removeEventListener('cagp:vault-updated', carregar);
      window.removeEventListener('storage', carregar);
      window.clearTimeout(t);
    };
  }, [carregar]);

  const lista = useMemo(() => disciplinasDoSemestre(estado, grade.cursando), [estado, grade.cursando]);
  const resumo = useMemo(() => resumoDasFaltas(lista), [lista]);
  const paraEscolher = useMemo(() => obrigatoriasParaEscolher(grade.savedCourses), [grade.savedCourses]);
  const naCartela = useMemo(() => new Set(lista.map((d) => d.id)), [lista]);
  const periodos = useMemo(() => {
    const mapa = new Map<number, typeof paraEscolher>();
    for (const d of paraEscolher) mapa.set(d.period, [...(mapa.get(d.period) ?? []), d]);
    return [...mapa.entries()].sort((a, b) => a[0] - b[0]);
  }, [paraEscolher]);
  // Abre o período do perfil; sem perfil, o primeiro que ainda tem disciplina por cursar.
  const periodoAberto = periodos.some(([p]) => p === periodoDoPerfil) ? periodoDoPerfil : periodos[0]?.[0];

  const semestreAtual = semestreDe();
  const semestre = estado.semestre || semestreAtual;
  const temMarca = lista.some((d) => d.conta.faltas > 0);
  const semestreVelho = Boolean(estado.semestre) && estado.semestre !== semestreAtual && temMarca;
  const vibrar = () => {
    if ('vibrate' in navigator) navigator.vibrate(12);
  };

  const marcar = (d: DisciplinaComFaltas, aulas: number) => {
    vibrar();
    marcarFalta(d.id, aulas);
    const depois = contaDeFaltas(d.ch, [...d.marcas, aulas], d.aulasPorDia);
    setAviso(`${plural(aulas, 'falta marcada', 'faltas marcadas')} em ${d.nome}: ${fraseDaConta(depois)}.`);
  };
  const desfazer = (d: DisciplinaComFaltas) => {
    vibrar();
    desfazerFalta(d.id);
    setAviso(`Última falta de ${d.nome} desfeita: ${fraseDaConta(contaDeFaltas(d.ch, d.marcas.slice(0, -1), d.aulasPorDia))}.`);
  };
  const adicionar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nome.trim().length < 2) {
      setErroNome(true);
      return;
    }
    semPulo(e.currentTarget, () => {
      adicionarExtra(nome, ch);
      setAviso(`${nome.trim()} entrou na sua cartela.`);
      setNome('');
      setErroNome(false);
    });
  };
  /** Quando o controle que tinha o foco some da tela, o foco vai para o título mais próximo. */
  const tirar = (d: DisciplinaComFaltas) => {
    flushSync(() => {
      tirarDaCartela(d);
      setAviso(`${d.nome} saiu da cartela.`);
    });
    (tituloDasCartelas.current ?? tituloDaEscolha.current)?.focus();
  };
  const zerar = () => {
    flushSync(() => {
      comecarSemestre();
      setConfirmando(false);
      setAviso(`Cartela zerada. Semestre ${semestreAtual}.`);
    });
    (tituloDasCartelas.current ?? tituloDaEscolha.current)?.focus();
  };

  const apertada = resumo.maisApertada;
  const topo = !apertada
    ? null
    : apertada.conta.situacao === 'estourou'
      ? { rotulo: 'Passou do limite', numero: `+${apertada.conta.passou}`, unidade: apertada.conta.passou === 1 ? 'falta' : 'faltas' }
      : apertada.conta.situacao === 'limite'
        ? { rotulo: 'No limite', numero: '0', unidade: 'dias' }
        : {
            rotulo: resumo.comFalta === 0 ? 'Nenhuma falta marcada' : lista.length === 1 ? 'Ainda dá pra faltar' : 'Na mais apertada',
            numero: String(apertada.conta.diasRestam),
            unidade: apertada.conta.diasRestam === 1 ? 'dia' : 'dias',
          };

  return (
    <div className="ft" data-pronto={pronto || undefined} data-vivo={vivo || undefined}>
      <p className="sr-only" role="status" aria-live="polite">
        {aviso}
      </p>

      {/* O resultado: a regra para quem chega, a disciplina mais apertada para quem já marcou. */}
      <article className="sk-saldo ft-saldo" aria-labelledby="ft-saldo-t">
        {!topo || !apertada ? (
          <>
            <div className="ft-saldo-topo">
              <p className="sk-saldo-rotulo" id="ft-saldo-t">
                Matéria de 60h
              </p>
              <p className="sk-saldo-num ft-num">
                7<span>dias</span>
              </p>
              <p className="sk-saldo-sub">É o que dá pra faltar. O limite é de 15 faltas, e cada dia de aula perdido conta 2.</p>
              <Quadros conta={EXEMPLOS[2].conta} aulasPorDia={AULAS_POR_DIA_PADRAO} cor={TINTA.atencao} x="#1f1f1f" rotulo="Sete quadros de um dia e um quadro menor: a falta que sobra." />
              <p className="ft-saldo-legenda">Sete dias inteiros, e sobra 1 falta.</p>
            </div>
            <div className="sk-saldo-papel">
              <table className="ft-regra">
                <caption>Em outras cargas horárias, com 2 aulas por dia</caption>
                <thead>
                  <tr>
                    <th scope="col">Disciplina</th>
                    <th scope="col">Limite</th>
                    <th scope="col">Dá pra faltar</th>
                  </tr>
                </thead>
                <tbody>
                  {EXEMPLOS.map(({ ch: horas, conta }) => (
                    <tr key={horas}>
                      <th scope="row">{horas}h</th>
                      <td>{conta.limite} faltas</td>
                      <td>
                        <strong>{plural(conta.diasCabem, 'dia', 'dias')}</strong>
                        {conta.sobra > 0 && ` + ${plural(conta.sobra, 'falta', 'faltas')}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <a className="mh-btn mh-btn-roxo mh-btn-largo" href="#escolher">
                Montar minha cartela
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="ft-saldo-topo">
              <p className="sk-saldo-rotulo" id="ft-saldo-t">
                {topo.rotulo}
              </p>
              <p className="sk-saldo-num ft-num">
                {topo.numero}
                <span>{topo.unidade}</span>
              </p>
              <p className="sk-saldo-sub">
                {resumo.comFalta > 0
                  ? `${apertada.nome}: ${plural(apertada.conta.faltas, 'falta', 'faltas')} de ${apertada.conta.limite}.`
                  : lista.every((d) => d.conta.diasRestam === apertada.conta.diasRestam)
                    ? `É o que dá pra faltar ${lista.length === 1 ? `em ${apertada.nome}` : `em cada uma das suas ${lista.length} disciplinas`}. Marque na cartela quando faltar.`
                    : `É o que dá pra faltar em ${apertada.nome}, a de menor carga horária. Marque na cartela quando faltar.`}
              </p>
              <Quadros
                conta={apertada.conta}
                aulasPorDia={apertada.aulasPorDia}
                cor={TINTA[apertada.conta.situacao]}
                x={apertada.conta.situacao === 'estourou' ? '#fff' : '#1f1f1f'}
                rotulo={rotuloDosQuadros(apertada.conta)}
              />
            </div>
            <div className="sk-saldo-papel">
              <ul className="sk-saldo-grupos ft-lista" role="list">
                {lista.map((d) => (
                  <li key={d.id} style={{ '--cor': TINTA[d.conta.situacao] } as React.CSSProperties}>
                    <a className="sk-saldo-g-nome" href={`#${ancora(d.id)}`}>
                      {d.nome}
                    </a>
                    <span className="sk-saldo-g-val">{fraseDaConta(d.conta)}</span>
                    <span className="sk-saldo-g-barra" aria-hidden="true">
                      <span style={{ width: `${Math.min(100, (d.conta.faltas / Math.max(1, d.conta.limite)) * 100)}%` }} data-vazio={d.conta.faltas === 0 || undefined} />
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mh-nota-rodape">A barra enche com as faltas marcadas. Salvo só neste celular.</p>
            </div>
          </>
        )}
      </article>

      <div className="ft-coluna">
        {lista.length > 0 && (
          <section aria-labelledby="ft-disc-t" className="mh-bloco" id="cartelas">
            <h2 id="ft-disc-t" ref={tituloDasCartelas} tabIndex={-1}>
              Suas disciplinas em {semestre}
            </h2>
            {semestreVelho && (
              <div className="ft-virada">
                <p>
                  Estas faltas são de {estado.semestre}. Se o semestre {semestreAtual} já começou, zere a cartela antes de marcar.
                </p>
                <a className="mh-btn mh-btn-mini" href="#semestre">
                  Ir pra virada de semestre
                </a>
              </div>
            )}
            <div className="ft-cartelas">
              {lista.map((d) => {
                const c = d.conta;
                const cor = c.situacao === 'estourou' ? TINTA.estourou : 'var(--color-primary)';
                return (
                  <article key={d.id} id={ancora(d.id)} className="ft-cartela" data-s={c.situacao} aria-labelledby={`${ancora(d.id)}-t`}>
                    <header className="ft-cabeca">
                      <div>
                        <h3 id={`${ancora(d.id)}-t`}>{d.nome}</h3>
                        <p className="ft-cod">
                          {d.codigo ? `${d.codigo} · ` : ''}
                          {d.ch}h
                        </p>
                      </div>
                      <span className="mh-selo" data-s={SELO[c.situacao]}>
                        {ROTULO_DA_SITUACAO[c.situacao]}
                      </span>
                    </header>

                    <div className="ft-corpo">
                    <p className="ft-resta">
                      <strong>{c.situacao === 'estourou' ? `+${c.passou}` : c.diasRestam}</strong>
                      <span>
                        <b>{c.situacao === 'estourou' ? (c.passou === 1 ? 'falta' : 'faltas') : c.diasRestam === 1 ? 'dia' : 'dias'}</b>{' '}
                        {c.situacao === 'estourou' ? `além das ${c.limite} que cabem` : c.diasRestam === 0 ? 'não cabe mais nenhum' : 'ainda dá pra faltar'}
                      </span>
                    </p>
                    <div className="ft-marcas">
                      <Quadros conta={c} aulasPorDia={d.aulasPorDia} cor={cor} rotulo={rotuloDosQuadros(c)} />
                      <div className="ft-legenda">
                        <p>
                          {c.faltas} de {c.limite} faltas
                        </p>
                        {c.faltas > 0 && (
                          <button type="button" className="mh-link" onClick={() => desfazer(d)}>
                            Desfazer a última
                          </button>
                        )}
                      </div>
                    </div>
                    </div>

                    {c.situacao === 'limite' && (
                      <p className="ft-alerta" data-s="limite">
                        {c.restam === 0
                          ? 'O limite está cheio: a próxima falta passa.'
                          : `${c.restam === 1 ? 'Sobra 1 falta' : `Sobram ${c.restam} faltas`}. Mais um dia de aula perdido passa do limite.`}
                      </p>
                    )}
                    {c.situacao === 'estourou' && (
                      <p className="ft-alerta" data-s="estourou">
                        Pela norma, passar do limite reprova por frequência, com qualquer nota. Antes de desistir da disciplina, confira o diário com o
                        professor: é o registro dele que vale.
                      </p>
                    )}

                    <div className="ft-acoes">
                      <button type="button" className="mh-btn mh-btn-roxo" onClick={() => marcar(d, d.aulasPorDia)}>
                        Faltei um dia
                      </button>
                      <button type="button" className="mh-btn" onClick={() => marcar(d, 1)}>
                        Só 1 falta
                      </button>
                    </div>

                    <details className="ft-ajuste">
                      <summary>Ajustar esta disciplina</summary>
                      <div className="ft-ajuste-corpo">
                        <div role="group" aria-labelledby={`${ancora(d.id)}-apd`} className="ft-apd">
                          <p id={`${ancora(d.id)}-apd`}>Quantas aulas tem num dia dessa matéria?</p>
                          <div>
                            {AULAS_POR_DIA.map((n) => (
                              <button key={n} type="button" className="mh-agora" aria-pressed={d.aulasPorDia === n} onClick={() => definirAulasPorDia(d.id, n)}>
                                {d.aulasPorDia === n && <CagpIcon name="check" className="w-4 h-4" />}
                                {n === 2 ? '2 aulas (um horário)' : '4 aulas (a noite toda)'}
                              </button>
                            ))}
                          </div>
                        </div>
                        <button type="button" className="mh-link" onClick={() => tirar(d)}>
                          Tirar da cartela
                        </button>
                      </div>
                    </details>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Montar a cartela: as obrigatórias vêm da grade; optativa entra à mão. */}
        <section aria-labelledby="ft-esc-t" className="mh-bloco" id="escolher">
          <h2 id="ft-esc-t" ref={tituloDaEscolha} tabIndex={-1}>
            {lista.length === 0 ? 'Quais disciplinas você está cursando?' : 'Adicionar disciplina'}
          </h2>
          {periodos.length > 0 && (
            <div className="ft-periodos">
              {periodos.map(([periodo, ds]) => {
                const marcadas = ds.filter((d) => naCartela.has(d.code)).length;
                return (
                  <details key={periodo} className="mh-periodo" open={periodo === periodoAberto || marcadas > 0 || undefined}>
                    <summary>
                      <span className="mh-periodo-nome">{periodo}º período</span>
                      {marcadas > 0 && <span className="mh-periodo-conta">{marcadas} na cartela</span>}
                    </summary>
                    <ul role="list" className="ft-escolhas">
                      {ds.map((d) => {
                        const dentro = naCartela.has(d.code);
                        return (
                          <li key={d.code}>
                            <label className="sk-check">
                              <input
                                type="checkbox"
                                checked={dentro}
                                onChange={(e) => {
                                  vibrar();
                                  semPulo(e.currentTarget.closest('label'), () => {
                                    definirCursando(d.code, !dentro);
                                    setAviso(dentro ? `${d.name} saiu da cartela.` : `${d.name} entrou na cartela.`);
                                  });
                                }}
                              />
                              <span className="sk-check-txt">
                                <strong>
                                  {d.code} · {d.ch}h
                                </strong>
                                {d.name}
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                );
              })}
            </div>
          )}
          <form className="mh-form ft-form" onSubmit={adicionar} noValidate>
            <p className="ft-form-t">Optativa ou disciplina de outro curso</p>
            <div className="ft-form-campos">
              <div className="mh-campo">
                <label htmlFor="ft-nome">Nome da disciplina</label>
                <input
                  id="ft-nome"
                  type="text"
                  autoComplete="off"
                  maxLength={80}
                  value={nome}
                  aria-invalid={erroNome || undefined}
                  aria-describedby={erroNome ? 'ft-nome-erro' : undefined}
                  onChange={(e) => {
                    setNome(e.currentTarget.value);
                    if (erroNome) setErroNome(false);
                  }}
                />
              </div>
              <div className="mh-campo">
                <label htmlFor="ft-ch">Carga horária</label>
                <select id="ft-ch" value={ch} onChange={(e) => setCh(Number(e.currentTarget.value))}>
                  {CARGAS_HORARIAS.map((h) => (
                    <option key={h} value={h}>
                      {h}h
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {erroNome && (
              <p className="mh-erro" id="ft-nome-erro">
                Escreva o nome da disciplina, com pelo menos 2 letras.
              </p>
            )}
            <button type="submit" className="mh-btn">
              <CagpIcon name="plus" className="w-4 h-4" />
              Pôr na cartela
            </button>
          </form>
          <p className="mh-nota-rodape">
            As obrigatórias marcadas aqui também aparecem em "Cursando agora", no painel de <a href={route('/meu-curso')}>Meu curso</a>. Estágio e TCC ficam de fora: não são
            aulas em sala.
          </p>
        </section>

        {/* Virada de semestre: zera as marcas, e só elas. Só aparece quando há o que zerar. */}
        {(temMarca || estado.extras.length > 0) && (
        <section aria-labelledby="ft-sem-t" className="mh-bloco" id="semestre">
          <h2 id="ft-sem-t">Virou o semestre?</h2>
          <div className="mh-ficha">
            <p className="mh-vazio">
              A cartela é de um semestre só. Ao começar outro, as faltas marcadas e as disciplinas adicionadas à mão são apagadas. O que você está
              cursando continua no painel de Meu curso.
            </p>
            {!confirmando ? (
              <div className="mh-form-acoes">
                <button type="button" className="mh-btn" onClick={() => setConfirmando(true)}>
                  Começar semestre novo
                </button>
              </div>
            ) : (
              <div className="ft-confirma" role="group" aria-label="Confirmar a virada de semestre">
                <p>Apagar as faltas de {semestre}? Não dá pra desfazer.</p>
                <div className="mh-form-acoes">
                  <button type="button" className="mh-btn mh-btn-perigo" onClick={zerar}>
                    Apagar e começar
                  </button>
                  {/* O foco entra na saída segura: Enter por engano não apaga nada. */}
                  <button type="button" className="mh-btn" autoFocus onClick={() => setConfirmando(false)}>
                    Deixar como está
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
        )}
      </div>
    </div>
  );
};
