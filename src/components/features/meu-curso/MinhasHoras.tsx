// MinhasHoras.tsx — O painel de /meu-curso: quanto falta para se formar, grupo a grupo.
//
// Ideia da Liv (11/10/2026): além das 600h, marcar as obrigatórias cursadas e ver cursado × restante,
// como na planilha "Percurso Curricular", com espaço para notas e NSG.
//
// Os totais são os do quadro de integralização do percurso Bacharelado/Núcleo Geral
// (_referencias/documentos-oficiais/percurso-bacharelado-nucleo-geral.md):
//   Obrigatórias 1.560h · Estágio obrigatório 300h · Formação livre 120h ·
//   Optativas 1.020h = Extensão 300h + AAC (até 300h) + Optativas gerais (420 a 720h)   → 3.000h
//
// Donos dos dados (DESIGN.md › One Owner): disciplinas marcadas em cagp_minha_grade_v1 (o mesmo do
// mapa em /percurso), extensão e AAC em cagp_calc_ext_aac_v1 (a calculadora de /acg) e o resto em
// cagp_minhas_horas_v1. Tudo fica só neste aparelho.
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getVaultItem, setVaultItem, type VaultData } from '@/lib/storage/studentVault';
import { EXTENSION_ITEMS, AAC_ITEMS } from '@/components/features/acg/calculator/acgCatalog';
import { renderEstagioIlustra, ILUSTRA_CORES, type IlustraNivel } from '@/lib/estagioIlustra';
import { route } from '@/lib/paths';

export interface DisciplinaObrigatoria {
  code: string;
  name: string;
  period: number;
  ch: number;
  /** Estágio curricular obrigatório (grupo próprio de 300h). */
  estagio: boolean;
}

type Horas = VaultData<'cagp_minhas_horas_v1'>;

const TOTAL = 3000;
const FMT = new Intl.NumberFormat('pt-BR');
const h = (n: number) => `${FMT.format(n)}h`;
const soma = (itens: { key: string }[], dados: Record<string, number>) =>
  itens.reduce((acc, it) => acc + (Number(dados[it.key]) || 0), 0);

export const MinhasHoras: React.FC<{ disciplinas: DisciplinaObrigatoria[] }> = ({ disciplinas }) => {
  const [cursadas, setCursadas] = useState<string[]>([]);
  const [horas, setHoras] = useState<Horas>({ optativasH: 0, livreH: 0, notas: {}, nsg: [] });
  const [calc, setCalc] = useState<Record<string, number>>({});
  const [pronto, setPronto] = useState(false);

  const carregar = useCallback(() => {
    setCursadas(getVaultItem('cagp_minha_grade_v1').savedCourses);
    setHoras(getVaultItem('cagp_minhas_horas_v1'));
    setCalc(getVaultItem('cagp_calc_ext_aac_v1'));
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

  const marcar = (code: string) => {
    if ('vibrate' in navigator) navigator.vibrate(12);
    const feita = cursadas.includes(code);
    setVaultItem('cagp_minha_grade_v1', {
      savedCourses: feita ? cursadas.filter((c) => c !== code) : [...cursadas, code],
    });
  };

  const conta = useMemo(() => {
    const feitas = new Set(cursadas);
    const doGrupo = (estagio: boolean) => disciplinas.filter((d) => d.estagio === estagio);
    const total = (ds: DisciplinaObrigatoria[]) => ds.reduce((a, d) => a + d.ch, 0);
    const feito = (ds: DisciplinaObrigatoria[]) => ds.filter((d) => feitas.has(d.code)).reduce((a, d) => a + d.ch, 0);

    const ext = Math.min(300, soma(EXTENSION_ITEMS, calc));
    const aac = Math.min(300, soma(AAC_ITEMS, calc));
    // O grupo Optativas (1.020h) fecha com extensão (300h) + AAC (até 300h) + optativas gerais.
    const alvoOptativas = 720 - aac;
    const grupos = [
      { id: 'ob', nome: 'Obrigatórias', feito: feito(doGrupo(false)), total: total(doGrupo(false)), cor: '#5B2A85' },
      { id: 'est', nome: 'Estágio obrigatório', feito: feito(doGrupo(true)), total: total(doGrupo(true)), cor: '#8A4B2A' },
      { id: 'op', nome: 'Optativas gerais', feito: Math.min(alvoOptativas, horas.optativasH), total: alvoOptativas, cor: '#FE8812' },
      { id: 'ext', nome: 'Extensão', feito: ext, total: 300, cor: '#6DB33F' },
      { id: 'aac', nome: 'AAC (até 300h)', feito: aac, total: 300, cor: '#FFC83D', opcional: true },
      { id: 'fl', nome: 'Formação livre', feito: Math.min(120, horas.livreH), total: 120, cor: '#266264' },
    ];
    const cursado = grupos.reduce((a, g) => a + g.feito, 0);
    return { grupos, cursado, falta: Math.max(0, TOTAL - cursado), aac, alvoOptativas };
  }, [cursadas, disciplinas, calc, horas.optativasH, horas.livreH]);

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
        {/* 2. Disciplinas obrigatórias e estágio, por período. */}
        <section aria-labelledby="mh-disc-t" className="mh-bloco">
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
                    const idNota = `mh-nota-${d.code.replace(/\s+/g, '')}`;
                    return (
                      <li key={d.code}>
                        <label className="sk-check">
                          <input type="checkbox" checked={feita} onChange={() => marcar(d.code)} />
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

        {/* 3. O que não é disciplina fixa. */}
        <section aria-labelledby="mh-outras-t" className="mh-bloco">
          <h2 id="mh-outras-t">Optativas, formação livre e as 600h</h2>
          <div className="mh-ficha">
            {[
              { id: 'optativasH' as const, nome: 'Optativas gerais', dica: `Meta: ${h(conta.alvoOptativas)}`, valor: horas.optativasH },
              { id: 'livreH' as const, nome: 'Formação livre', dica: 'Meta: 120h (disciplinas de outros cursos)', valor: horas.livreH },
            ].map((c) => (
              <div key={c.id} className="mh-passo">
                <div>
                  <p className="mh-passo-nome">{c.nome}</p>
                  <p className="mh-passo-dica">{c.dica}</p>
                </div>
                <div className="mh-passo-ctl" role="group" aria-label={`${c.nome}: horas cursadas`}>
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
            <a href={route('/acg') + '#calculadora'} className="mh-atalho">
              <span>
                <strong>Extensão e AAC</strong>
                Somadas na calculadora das 600h
              </span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* 4. NSG por semestre, como na planilha. */}
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
