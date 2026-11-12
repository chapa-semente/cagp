// MinhasHoras.tsx — O painel de /meu-curso: o registro único do curso de cada estudante.
//
// Quatro perguntas, uma tela (redesenho de 12/11/2026):
//   1. Quanto falta?            → o saldo das 3.000h (src/lib/contaDoCurso.ts, a única conta do site)
//   2. O que vence?             → prazos que saem dos dados da pessoa + link do calendário oficial
//   3. O que pego no próximo?   → obrigatórias liberadas pelos pré-requisitos do SIGA
//   4. Onde estão minhas horas? → a lista única de atividades (MinhasAtividades.tsx)
//
// Ideia da Liv (11/10/2026): marcar as obrigatórias cursadas e ver cursado × restante, como na
// planilha "Percurso Curricular", com espaço para notas e NSG.
//
// Donos dos dados (DESIGN.md › One Owner): disciplinas em cagp_minha_grade_v1 (o mesmo do mapa em
// /percurso), extensão e AAC em cagp_atividades_v1 e o resto em cagp_minhas_horas_v1. Só neste aparelho.
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getVaultItem, setVaultItem, type CustomCourse, type UserRole, type VaultData } from '@/lib/storage/studentVault';
import { atualizarAtividade, lerAtividades, prazosAbertos, type EstadoAtividades } from '@/lib/atividades';
import { OBRIGATORIAS, TOTAL_DO_CURSO, contaDoCurso, liberadasParaOProximo, type DisciplinaObrigatoria } from '@/lib/contaDoCurso';
import { RETA_FINAL_STEPS, etapaFeita } from '@/lib/retaFinal';
import { renderEstagioIlustra, ILUSTRA_CORES, type IlustraNivel } from '@/lib/estagioIlustra';
import { downloadAac120dIcs } from '@/lib/ics';
import { CagpIcon } from '@/components/ui/CagpIcon';
import { toast } from '@/lib/toast';
import { route } from '@/lib/paths';
import { MinhasAtividades } from './MinhasAtividades';

type Horas = VaultData<'cagp_minhas_horas_v1'>;
type Grade = VaultData<'cagp_minha_grade_v1'>;

const TOTAL = TOTAL_DO_CURSO;
const FMT = new Intl.NumberFormat('pt-BR');
const h = (n: number) => `${FMT.format(n)}h`;
const DIA = 86_400_000;
// Calendário escolar oficial (link da capa de ufmg.br, conferido em 12/11/2026): o site não copia
// datas da UFMG, só aponta para a fonte.
const CALENDARIO_UFMG = 'https://www.ufmg.br/a-universidade/calendario-escolar/';

export const MinhasHoras: React.FC = () => {
  const disciplinas = OBRIGATORIAS;
  const [grade, setGrade] = useState<Grade>({ savedCourses: [], cursando: [] });
  const [naGrade, setNaGrade] = useState<CustomCourse[]>([]);
  const [horas, setHoras] = useState<Horas>({ optativasH: 0, livreH: 0, notas: {}, nsg: [] });
  const [atividades, setAtividades] = useState<EstadoAtividades>({ itens: [], base: {}, migrado: true });
  const [calc, setCalc] = useState<Record<string, number>>({});
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [papel, setPapel] = useState<UserRole>('calouro');
  const [pronto, setPronto] = useState(false);
  const cursadas = grade.savedCourses;
  const cursando = grade.cursando;

  const carregar = useCallback(() => {
    setGrade(getVaultItem('cagp_minha_grade_v1'));
    setNaGrade(getVaultItem('cagp_custom_curriculum_v1').assignedCourses);
    setHoras(getVaultItem('cagp_minhas_horas_v1'));
    // lerAtividades migra os registros antigos na primeira vez e atualiza o espelho das horas.
    setAtividades(lerAtividades());
    setCalc(getVaultItem('cagp_calc_ext_aac_v1'));
    setChecks(getVaultItem('cagp_reta_final_checklist_v1'));
    setPapel(getVaultItem('cagp_user_role_v1'));
    setPronto(true);
  }, []);

  useEffect(() => {
    carregar();
    window.addEventListener('cagp:vault-updated', carregar);
    window.addEventListener('storage', carregar);
    return () => {
      window.removeEventListener('cagp:vault-updated', carregar);
      window.removeEventListener('storage', carregar);
    };
  }, [carregar]);

  const salvarHoras = (patch: Partial<Horas>) => setVaultItem('cagp_minhas_horas_v1', { ...horas, ...patch });

  /** Três estados por disciplina: falta → cursando → cursei. Um código nunca fica nos dois. */
  const marcar = (code: string, estado: 'falta' | 'cursando' | 'cursei') => {
    if ('vibrate' in navigator) navigator.vibrate(12);
    setVaultItem('cagp_minha_grade_v1', {
      savedCourses: estado === 'cursei' ? [...cursadas.filter((c) => c !== code), code] : cursadas.filter((c) => c !== code),
      cursando: estado === 'cursando' ? [...cursando.filter((c) => c !== code), code] : cursando.filter((c) => c !== code),
    });
  };

  const conta = useMemo(() => contaDoCurso({ cursadas, naGrade, horas, calc }), [cursadas, naGrade, horas, calc]);
  const liberadas = useMemo(() => liberadasParaOProximo(cursadas, cursando), [cursadas, cursando]);
  const prazos = useMemo(() => prazosAbertos(atividades), [atividades]);
  const emCurso = useMemo(() => disciplinas.filter((d) => cursando.includes(d.code)), [disciplinas, cursando]);

  // Reta final: a próxima etapa em aberto, só para quem já entrou nela (formando ou com etapa marcada).
  const proximaEtapa = useMemo(() => {
    const comecou = papel === 'formando' || RETA_FINAL_STEPS.some((s) => etapaFeita(s.id, checks, cursadas));
    return comecou ? RETA_FINAL_STEPS.find((s) => !etapaFeita(s.id, checks, cursadas)) : undefined;
  }, [papel, checks, cursadas]);

  const pct = conta.cursado / TOTAL;
  const nivel: IlustraNivel = pct >= 0.85 ? 5 : pct >= 0.5 ? 4 : pct >= 0.2 ? 3 : pct > 0 ? 2 : 1;
  const ilustra = useMemo(() => renderEstagioIlustra(nivel, ILUSTRA_CORES[4]), [nivel]);

  const periodos = useMemo(() => {
    const mapa = new Map<number, DisciplinaObrigatoria[]>();
    for (const d of disciplinas) mapa.set(d.period, [...(mapa.get(d.period) ?? []), d]);
    return [...mapa.entries()].sort((a, b) => a[0] - b[0]);
  }, [disciplinas]);
  // Abre sozinho o primeiro período que ainda tem disciplina por cursar.
  const periodoAberto = periodos.find(([, ds]) => ds.some((d) => !cursadas.includes(d.code)))?.[0];

  const nsgPreenchidos = horas.nsg.filter((n): n is number => typeof n === 'number');
  const nsgMedio = nsgPreenchidos.length ? nsgPreenchidos.reduce((a, b) => a + b, 0) / nsgPreenchidos.length : null;

  const mudarNota = (code: string, valor: string) => {
    const notas = { ...horas.notas };
    const n = Number(valor.replace(',', '.'));
    if (valor.trim() === '' || Number.isNaN(n)) delete notas[code];
    else notas[code] = Math.max(0, Math.min(100, n));
    salvarHoras({ notas });
  };
  const mudarNsg = (i: number, valor: string) => {
    const nsg: (number | null)[] = Array.from({ length: 10 }, (_, k) => horas.nsg[k] ?? null);
    const n = Number(valor.replace(',', '.'));
    nsg[i] = valor.trim() === '' || Number.isNaN(n) ? null : Math.max(0, Math.min(100, n));
    salvarHoras({ nsg });
  };

  return (
    <div className="mh" data-pronto={pronto || undefined}>
      {/* 1. O saldo: quanto falta, com a planta crescendo junto. */}
      <article className="sk-saldo mh-saldo" aria-labelledby="mh-saldo-t">
        <div className="sk-saldo-topo">
          <div>
            <p className="sk-saldo-rotulo" id="mh-saldo-t">
              {conta.falta === 0 ? 'Completo' : 'Faltam'}
            </p>
            <p className="sk-saldo-num">
              {FMT.format(conta.falta)}
              <span>h</span>
            </p>
            <p className="sk-saldo-sub">
              de {h(TOTAL)} para se formar · {h(conta.cursado)} cursadas
            </p>
          </div>
          <svg
            key={nivel}
            className="cagp-ilustra sk-saldo-art"
            viewBox="0 0 200 200"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: ilustra }}
          />
        </div>
        <div className="sk-saldo-papel">
          <ul className="sk-saldo-grupos" role="list">
            {conta.grupos.map((g) => (
              <li key={g.id} style={{ '--cor': g.cor } as React.CSSProperties}>
                <span className="sk-saldo-g-nome">{g.nome}</span>
                <span className="sk-saldo-g-val">
                  {FMT.format(g.feito)} / {h(g.total)}
                </span>
                <span className="sk-saldo-g-barra" aria-hidden="true">
                  <span style={{ width: `${g.total ? Math.min(100, (g.feito / g.total) * 100) : 0}%` }} data-vazio={g.feito === 0 || undefined} />
                </span>
              </li>
            ))}
          </ul>
          <p className="mh-nota-rodape">
            Conta do percurso Núcleo Geral. As optativas gerais são 720h menos o que você fizer de AAC. Salvo só neste
            celular.
          </p>
        </div>
      </article>

      <div className="mh-coluna">
        <nav className="mh-ir" aria-label="Partes do painel">
          <a href="#prazos">Prazos</a>
          <a href="#proximo">Próximo semestre</a>
          <a href="#grade">Grade</a>
          <a href="#atividades">Atividades</a>
        </nav>

        {/* 2. O que vence: só o que sai dos dados da pessoa. Datas da UFMG ficam na fonte oficial. */}
        <section aria-labelledby="mh-prazos-t" className="mh-bloco" id="prazos">
          <h2 id="mh-prazos-t">O que vence</h2>
          <div className="mh-ficha">
            {prazos.length === 0 && !proximaEtapa && (
              <p className="mh-vazio">
                Nenhum prazo correndo. Quando você lançar um certificado de evento ou de trabalho em anais, os 120 dias
                pra protocolar aparecem aqui.
              </p>
            )}
            {(prazos.length > 0 || proximaEtapa) && (
              <ul className="mh-prazos" role="list">
                {prazos.map(({ atividade: a, dias }) => {
                  const limite = new Date(new Date(`${a.data}T00:00:00`).getTime() + 120 * DIA);
                  return (
                    <li key={a.id} data-s={dias < 0 ? 'vencido' : dias <= 15 ? 'urgente' : 'prazo'}>
                      <p className="mh-prazo-dias">
                        {dias < 0 ? (
                          <strong>Venceu</strong>
                        ) : (
                          <>
                            <strong>{dias}</strong> {dias === 1 ? 'dia' : 'dias'}
                          </>
                        )}
                      </p>
                      <div className="mh-prazo-txt">
                        <p className="mh-atv-nome">{a.titulo}</p>
                        <p className="mh-atv-meta">
                          {dias < 0
                            ? `O prazo de 120 dias acabou em ${limite.toLocaleDateString('pt-BR')}. Fale com o Colegiado antes de desistir das horas.`
                            : `Protocole no Colegiado até ${limite.toLocaleDateString('pt-BR')}.`}
                        </p>
                        <div className="mh-atv-acoes">
                          <button
                            type="button"
                            className="mh-btn mh-btn-mini mh-btn-roxo"
                            onClick={() => {
                              atualizarAtividade(a.id, { situacao: 'protocolada' });
                              toast.success('Marcada como protocolada.');
                            }}
                          >
                            Já protocolei
                          </button>
                          {dias >= 0 && (
                            <button type="button" className="mh-btn mh-btn-mini" onClick={() => downloadAac120dIcs(a.titulo, limite)}>
                              <CagpIcon name="calendar" className="w-4 h-4" />
                              Lembrar no meu calendário
                            </button>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
                {proximaEtapa && (
                  <li data-s="etapa">
                    <p className="mh-prazo-dias">Reta final</p>
                    <div className="mh-prazo-txt">
                      <p className="mh-atv-nome">{proximaEtapa.title.replace(/^\d+\.\s*/, '')}</p>
                      <p className="mh-atv-meta">É a sua próxima etapa em aberto. Ela não tem data aqui: confira no calendário do Colegiado.</p>
                      <div className="mh-atv-acoes">
                        <a className="mh-btn mh-btn-mini" href={route('/formatura')}>
                          Abrir o checklist da formatura
                        </a>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            )}
            <a href={CALENDARIO_UFMG} target="_blank" rel="noopener noreferrer" className="mh-atalho">
              <span>
                <strong>Matrícula, trancamento e colação</strong>
                As datas estão no calendário escolar da UFMG
              </span>
              <CagpIcon name="arrow-up-right" className="w-5 h-5" />
            </a>
          </div>
        </section>

        {/* 3. Próximo semestre: o que está em curso e o que os pré-requisitos já liberam. */}
        <section aria-labelledby="mh-prox-t" className="mh-bloco" id="proximo">
          <h2 id="mh-prox-t">Pro próximo semestre</h2>
          <div className="mh-ficha">
            {emCurso.length > 0 && (
              <div className="mh-grupo">
                <h3>Cursando agora</h3>
                <ul className="mh-linhas" role="list">
                  {emCurso.map((d) => (
                    <li key={d.code}>
                      <span>
                        <strong>
                          {d.code} · {d.ch}h
                        </strong>
                        {d.name}
                      </span>
                      <button type="button" className="mh-btn mh-btn-mini mh-btn-roxo" onClick={() => marcar(d.code, 'cursei')}>
                        Passei
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mh-grupo">
              <h3>{liberadas.length > 0 ? 'Você já pode pegar' : 'Obrigatórias em dia'}</h3>
              {liberadas.length === 0 ? (
                <p className="mh-vazio">
                  {emCurso.length > 0
                    ? 'Tudo o que falta das obrigatórias você já está cursando.'
                    : 'Você marcou todas as obrigatórias. Falta conferir optativas, as 600h e a reta final.'}
                </p>
              ) : (
                <>
                  <ul className="mh-linhas" role="list">
                    {liberadas.slice(0, 6).map(({ disciplina: d, dependeDe }) => (
                      <LinhaLiberada key={d.code} d={d} dependeDe={dependeDe} aoCursar={() => marcar(d.code, 'cursando')} />
                    ))}
                  </ul>
                  {liberadas.length > 6 && (
                    <details className="mh-mais">
                      <summary>Mais {liberadas.length - 6} liberadas</summary>
                      <ul className="mh-linhas" role="list">
                        {liberadas.slice(6).map(({ disciplina: d, dependeDe }) => (
                          <LinhaLiberada key={d.code} d={d} dependeDe={dependeDe} aoCursar={() => marcar(d.code, 'cursando')} />
                        ))}
                      </ul>
                    </details>
                  )}
                </>
              )}
            </div>
            <p className="mh-nota-rodape">
              A lista segue os pré-requisitos formais do SIGA, não a oferta: o que abre em cada semestre sai na matrícula.{' '}
              <a href={route('/percurso')}>Ver o mapa de pré-requisitos</a> ou <a href={route('/optativas')}>escolher optativas</a>.
            </p>
          </div>
        </section>

        {/* 4. A grade: obrigatórias e estágio, por período, com três estados. */}
        <section aria-labelledby="mh-disc-t" className="mh-bloco" id="grade">
          <h2 id="mh-disc-t">Marque o que você já cursou</h2>
          {periodos.map(([periodo, ds]) => {
            const feitas = ds.filter((d) => cursadas.includes(d.code)).length;
            return (
              <details key={periodo} className="mh-periodo" open={periodo === periodoAberto || undefined}>
                <summary>
                  <span className="mh-periodo-nome">{periodo}º período</span>
                  <span className="mh-periodo-conta" data-cheio={feitas === ds.length || undefined}>
                    {feitas} de {ds.length}
                  </span>
                </summary>
                <ul role="list">
                  {ds.map((d) => {
                    const feita = cursadas.includes(d.code);
                    const agora = cursando.includes(d.code);
                    const idNota = `mh-nota-${d.code.replace(/\s+/g, '')}`;
                    return (
                      <li key={d.code}>
                        <label className="sk-check">
                          <input type="checkbox" checked={feita} onChange={() => marcar(d.code, feita ? 'falta' : 'cursei')} />
                          <span className="sk-check-txt">
                            <strong>
                              {d.code} · {d.ch}h
                            </strong>
                            {d.name}
                          </span>
                          <span className="sk-check-carimbo" aria-hidden="true">
                            Cursei
                          </span>
                        </label>
                        {!feita && (
                          <div className="mh-nota">
                            <button type="button" className="mh-agora" aria-pressed={agora} onClick={() => marcar(d.code, agora ? 'falta' : 'cursando')}>
                              {agora && <CagpIcon name="check" className="w-4 h-4" />}
                              {agora ? 'Cursando agora' : 'Estou cursando'}
                            </button>
                          </div>
                        )}
                        {feita && (
                          <div className="mh-nota">
                            <label htmlFor={idNota}>Nota (opcional)</label>
                            <input
                              id={idNota}
                              type="text"
                              inputMode="decimal"
                              autoComplete="off"
                              placeholder="0 a 100"
                              defaultValue={horas.notas[d.code] ?? ''}
                              onBlur={(e) => mudarNota(d.code, e.currentTarget.value)}
                            />
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </details>
            );
          })}
        </section>

        {/* 5. As 600h: uma lista só. */}
        <MinhasAtividades estado={atividades} ext={conta.ext} aac={conta.aac} />

        {/* 6. Optativas e formação livre: o que está na grade soma sozinho; o resto, à mão. */}
        <section aria-labelledby="mh-outras-t" className="mh-bloco" id="optativas">
          <h2 id="mh-outras-t">Optativas e formação livre</h2>
          <div className="mh-ficha">
            {[
              {
                id: 'optativasH' as const,
                nome: 'Optativas gerais',
                dica: `Meta: ${h(conta.alvoOptativas)}${conta.optativasGrade ? ` · ${h(conta.optativasGrade)} já vêm da sua grade` : ''}`,
                valor: horas.optativasH,
              },
              {
                id: 'livreH' as const,
                nome: 'Formação livre',
                dica: `Meta: 120h, em disciplinas de outros cursos${conta.livreGrade ? ` · ${h(conta.livreGrade)} já vêm da sua grade` : ''}`,
                valor: horas.livreH,
              },
            ].map((c) => (
              <div key={c.id} className="mh-passo">
                <div>
                  <p className="mh-passo-nome">{c.nome}</p>
                  <p className="mh-passo-dica">{c.dica}</p>
                </div>
                <div className="mh-passo-ctl" role="group" aria-label={`${c.nome}: horas cursadas fora da grade`}>
                  <button type="button" onClick={() => salvarHoras({ [c.id]: Math.max(0, c.valor - 60) })} disabled={c.valor <= 0} aria-label="Tirar 60 horas">
                    −
                  </button>
                  <output aria-live="polite">{h(c.valor)}</output>
                  <button type="button" onClick={() => salvarHoras({ [c.id]: c.valor + 60 })} aria-label="Somar 60 horas">
                    +
                  </button>
                </div>
              </div>
            ))}
            <p className="mh-nota-rodape">
              Os botões somam o que você cursou sem pôr na grade. Optativa escolhida no catálogo e marcada como cursada
              no mapa entra na conta sozinha.
            </p>
            <a href={route('/optativas')} className="mh-atalho">
              <span>
                <strong>Escolher optativas</strong>
                As 68 do PPC, por departamento
              </span>
              <CagpIcon name="arrow-right" className="w-5 h-5" />
            </a>
          </div>
        </section>

        {/* 7. NSG por semestre, como na planilha. */}
        <section aria-labelledby="mh-nsg-t" className="mh-bloco">
          <h2 id="mh-nsg-t">Seu NSG por semestre</h2>
          <div className="mh-ficha">
            <div className="mh-nsg">
              {Array.from({ length: 10 }, (_, i) => (
                <label key={i}>
                  <span>{i + 1}º</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="–"
                    defaultValue={horas.nsg[i] ?? ''}
                    key={`${i}-${pronto}`}
                    onBlur={(e) => mudarNsg(i, e.currentTarget.value)}
                  />
                </label>
              ))}
            </div>
            <p className="mh-nsg-media">
              <span>Média dos semestres preenchidos</span>
              <strong>{nsgMedio === null ? '–' : nsgMedio.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}</strong>
            </p>
            <p className="mh-nota-rodape">
              Copie o NSG de cada semestre do seu histórico no SIGA. A média aqui é simples; o número oficial é o do
              SIGA.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

const LinhaLiberada: React.FC<{ d: { code: string; name: string; ch: number; period: number }; dependeDe: string[]; aoCursar: () => void }> = ({
  d,
  dependeDe,
  aoCursar,
}) => (
  <li>
    <span>
      <strong>
        {d.code} · {d.ch}h · {d.period}º período
      </strong>
      {d.name}
      {dependeDe.length > 0 && <em>Só se você passar em {dependeDe.join(' e ')}</em>}
    </span>
    <button type="button" className="mh-btn mh-btn-mini" onClick={aoCursar}>
      Estou cursando
    </button>
  </li>
);
