// MinhasAtividades.tsx — A lista única das 600h dentro do painel de /meu-curso.
//
// Cada atividade (curso, evento, monitoria, projeto) entra uma vez, com modalidade, horas, data e
// situação. A soma de extensão e AAC e o prazo de 120 dias saem daqui (src/lib/atividades.ts).
// O arquivo do comprovante não fica no site: a pessoa cola o link de onde guardou.
import React, { useId, useMemo, useState } from 'react';
import { EXTENSION_ITEMS, AAC_ITEMS } from '@/components/features/acg/calculator/acgCatalog';
import {
  SITUACOES,
  adicionarAtividade,
  atualizarAtividade,
  definirBase,
  diasParaProtocolar,
  modalidade,
  removerAtividade,
  type Atividade,
  type EstadoAtividades,
  type Situacao,
} from '@/lib/atividades';
import { CagpIcon } from '@/components/ui/CagpIcon';
import { toast } from '@/lib/toast';
import { route } from '@/lib/paths';

const FMT = new Intl.NumberFormat('pt-BR');
const dataCurta = (iso: string) => {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};
const hojeIso = () => new Date().toISOString().slice(0, 10);

interface Rascunho {
  id?: string;
  titulo: string;
  mod: string;
  horas: string;
  situacao: Situacao;
  data: string;
  link: string;
}
const VAZIO: Rascunho = { titulo: '', mod: 'aac_eventos_i', horas: '', situacao: 'feita', data: '', link: '' };

/** Ordem da lista: prazo correndo primeiro (o mais curto no topo), depois feitas, planejadas e protocoladas. */
function ordenar(itens: Atividade[]): Atividade[] {
  const peso = (a: Atividade) => {
    const dias = diasParaProtocolar(a);
    if (dias !== null) return dias - 1000;
    return a.situacao === 'feita' ? 0 : a.situacao === 'quero' ? 1 : 2;
  };
  return [...itens].sort((a, b) => peso(a) - peso(b) || b.criadaEm.localeCompare(a.criadaEm));
}

export const MinhasAtividades: React.FC<{ estado: EstadoAtividades; ext: number; aac: number }> = ({ estado, ext, aac }) => {
  const uid = useId();
  const [rascunho, setRascunho] = useState<Rascunho | null>(null);
  const [erro, setErro] = useState<{ campo: keyof Rascunho; texto: string } | null>(null);
  const [apagando, setApagando] = useState<string | null>(null);

  const itens = useMemo(() => ordenar(estado.itens), [estado.itens]);
  const base = Object.entries(estado.base).filter(([, v]) => v > 0);

  // Modalidades em que o lançado passa do teto: só o teto conta, e a pessoa precisa saber.
  const estouros = useMemo(() => {
    const bruto = new Map<string, number>();
    for (const [k, v] of base) bruto.set(k, v);
    for (const a of estado.itens) {
      if (a.soma && a.situacao !== 'quero') bruto.set(a.mod, (bruto.get(a.mod) ?? 0) + a.horas);
    }
    return [...bruto.entries()]
      .map(([k, v]) => ({ m: modalidade(k), v }))
      .filter((e): e is { m: NonNullable<ReturnType<typeof modalidade>>; v: number } => Boolean(e.m) && e.v > e.m!.max);
  }, [estado]);

  const mod = rascunho ? modalidade(rascunho.mod) : undefined;
  const campo = (c: keyof Rascunho | 'erro') => `${uid}-${c}`;
  const mudar = (patch: Partial<Rascunho>) => {
    setRascunho((r) => (r ? { ...r, ...patch } : r));
    setErro(null);
  };

  const editar = (a: Atividade) => {
    setErro(null);
    setRascunho({ id: a.id, titulo: a.titulo, mod: a.mod, horas: String(a.horas), situacao: a.situacao, data: a.data ?? '', link: a.link ?? '' });
  };

  const salvar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rascunho) return;
    const titulo = rascunho.titulo.trim();
    const horas = Number(rascunho.horas.replace(',', '.'));
    const link = rascunho.link.trim();
    if (!titulo) return setErro({ campo: 'titulo', texto: 'Escreva o nome da atividade, como está no certificado.' });
    if (!Number.isFinite(horas) || horas <= 0 || horas > 300) return setErro({ campo: 'horas', texto: 'Informe as horas do certificado, de 1 a 300.' });
    if (rascunho.data && rascunho.data > hojeIso() && rascunho.situacao !== 'quero')
      return setErro({ campo: 'data', texto: 'Essa data ainda não chegou. Se a atividade não aconteceu, marque "Quero fazer".' });
    if (link && !/^https?:\/\//i.test(link)) return setErro({ campo: 'link', texto: 'Cole o endereço completo, começando com https://' });

    const dados = {
      titulo,
      mod: rascunho.mod,
      horas: Math.round(horas),
      situacao: rascunho.situacao,
      data: rascunho.situacao === 'quero' ? undefined : rascunho.data || undefined,
      link: link || undefined,
    };
    if (rascunho.id) atualizarAtividade(rascunho.id, { ...dados, soma: true });
    else adicionarAtividade(dados);
    toast.success(rascunho.id ? 'Atividade atualizada.' : 'Atividade lançada. Salva só neste celular.');
    setRascunho(null);
  };

  const formulario = rascunho && (
    <form className="mh-form" onSubmit={salvar} noValidate aria-label={rascunho.id ? 'Editar atividade' : 'Lançar atividade'}>
      <div className="mh-campo">
        <label htmlFor={campo('titulo')}>Nome da atividade</label>
        <input
          id={campo('titulo')}
          type="text"
          autoComplete="off"
          value={rascunho.titulo}
          onChange={(e) => mudar({ titulo: e.currentTarget.value })}
          aria-invalid={erro?.campo === 'titulo' || undefined}
          aria-describedby={erro?.campo === 'titulo' ? campo('erro') : undefined}
          autoFocus
        />
      </div>
      <div className="mh-campo">
        <label htmlFor={campo('mod')}>Modalidade</label>
        <select id={campo('mod')} value={rascunho.mod} onChange={(e) => mudar({ mod: e.currentTarget.value })}>
          <optgroup label="Extensão (300h)">
            {EXTENSION_ITEMS.map((m) => (
              <option key={m.key} value={m.key}>
                {m.label} · até {m.max}h
              </option>
            ))}
          </optgroup>
          <optgroup label="AAC (até 300h)">
            {AAC_ITEMS.map((m) => (
              <option key={m.key} value={m.key}>
                {m.label} · até {m.max}h
              </option>
            ))}
          </optgroup>
        </select>
        <p className="mh-ajuda">
          Não sabe qual é? <a href={route('/acg') + '#atividades'}>Veja o que cada modalidade aceita</a>.
        </p>
      </div>
      <div className="mh-campo-par">
        <div className="mh-campo">
          <label htmlFor={campo('horas')}>Horas</label>
          <input
            id={campo('horas')}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={rascunho.horas}
            onChange={(e) => mudar({ horas: e.currentTarget.value })}
            aria-invalid={erro?.campo === 'horas' || undefined}
            aria-describedby={erro?.campo === 'horas' ? campo('erro') : undefined}
          />
        </div>
        <div className="mh-campo">
          <label htmlFor={campo('situacao')}>Situação</label>
          <select id={campo('situacao')} value={rascunho.situacao} onChange={(e) => mudar({ situacao: e.currentTarget.value as Situacao })}>
            {SITUACOES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nome}
              </option>
            ))}
          </select>
        </div>
      </div>
      {rascunho.situacao !== 'quero' && (
        <div className="mh-campo">
          <label htmlFor={campo('data')}>Data do certificado</label>
          <input
            id={campo('data')}
            type="date"
            max={hojeIso()}
            value={rascunho.data}
            onChange={(e) => mudar({ data: e.currentTarget.value })}
            aria-invalid={erro?.campo === 'data' || undefined}
            aria-describedby={erro?.campo === 'data' ? campo('erro') : undefined}
          />
          {mod?.has120dDeadline && rascunho.situacao === 'feita' && (
            <p className="mh-ajuda">Esta modalidade tem 120 dias pra protocolar. Com a data, o painel conta o prazo pra você.</p>
          )}
        </div>
      )}
      <div className="mh-campo">
        <label htmlFor={campo('link')}>Onde está o comprovante (opcional)</label>
        <input
          id={campo('link')}
          type="url"
          inputMode="url"
          autoComplete="off"
          placeholder="https://drive.google.com/…"
          value={rascunho.link}
          onChange={(e) => mudar({ link: e.currentTarget.value })}
          aria-invalid={erro?.campo === 'link' || undefined}
          aria-describedby={erro?.campo === 'link' ? campo('erro') : undefined}
        />
        <p className="mh-ajuda">O arquivo continua no seu Drive ou e-mail. Aqui fica só o link.</p>
      </div>
      {erro && (
        <p className="mh-erro" id={campo('erro')} role="alert">
          {erro.texto}
        </p>
      )}
      <div className="mh-form-acoes">
        <button type="submit" className="mh-btn mh-btn-roxo">
          {rascunho.id ? 'Salvar mudanças' : 'Lançar atividade'}
        </button>
        <button type="button" className="mh-btn" onClick={() => setRascunho(null)}>
          Cancelar
        </button>
      </div>
    </form>
  );

  return (
    <section aria-labelledby="mh-atv-t" className="mh-bloco" id="atividades">
      <h2 id="mh-atv-t">Atividades e comprovantes</h2>
      <div className="mh-ficha">
        <p className="mh-resumo-600">
          <span>
            Extensão <strong>{FMT.format(ext)} / 300h</strong>
          </span>
          <span>
            AAC <strong>{FMT.format(aac)} / 300h</strong>
          </span>
        </p>

        {!rascunho && (
          <button type="button" className="mh-btn mh-btn-roxo mh-btn-largo" onClick={() => { setErro(null); setRascunho(VAZIO); }}>
            <CagpIcon name="plus" className="w-5 h-5" />
            Lançar atividade
          </button>
        )}
        {rascunho && !rascunho.id && formulario}

        {itens.length === 0 && !rascunho && (
          <p className="mh-vazio">
            Nada lançado ainda. Fez um curso, um evento ou uma monitoria? Lance aqui uma vez só: o painel soma as
            horas e avisa do prazo.
          </p>
        )}

        {itens.length > 0 && (
          <ul className="mh-atvs" role="list">
            {itens.map((a) => {
              if (rascunho?.id === a.id) return <li key={a.id}>{formulario}</li>;
              const m = modalidade(a.mod);
              const dias = diasParaProtocolar(a);
              const selo =
                dias !== null
                  ? dias < 0
                    ? { t: 'Prazo vencido', s: 'vencido' }
                    : { t: dias === 0 ? 'Vence hoje' : `${dias} ${dias === 1 ? 'dia' : 'dias'}`, s: dias <= 15 ? 'urgente' : 'prazo' }
                  : { t: SITUACOES.find((s) => s.id === a.situacao)!.nome, s: a.situacao };
              return (
                <li key={a.id} className="mh-atv">
                  <div className="mh-atv-topo">
                    <p className="mh-atv-nome">{a.titulo}</p>
                    <span className="mh-selo" data-s={selo.s}>
                      {selo.t}
                    </span>
                  </div>
                  <p className="mh-atv-meta">
                    <strong>{FMT.format(a.horas)}h</strong>
                    {m ? ` · ${m.group === 'ext' ? 'Extensão' : 'AAC'} · ${m.code}` : ''}
                    {a.data ? ` · ${dataCurta(a.data)}` : ''}
                  </p>
                  {!a.soma && a.situacao !== 'quero' && (
                    <p className="mh-ajuda">
                      Veio da sua lista antiga de certificados e ainda não soma, pra não contar duas vezes.{' '}
                      <button type="button" className="mh-link" onClick={() => atualizarAtividade(a.id, { soma: true })}>
                        Somar estas horas
                      </button>
                    </p>
                  )}
                  {a.situacao === 'feita' && !a.data && m?.has120dDeadline && (
                    <p className="mh-ajuda">Sem a data do certificado, o prazo de 120 dias não é contado.</p>
                  )}
                  <div className="mh-atv-acoes">
                    {a.situacao === 'quero' && (
                      <button type="button" className="mh-btn mh-btn-mini mh-btn-roxo" onClick={() => editar({ ...a, situacao: 'feita', data: a.data ?? hojeIso() })}>
                        Já fiz
                      </button>
                    )}
                    {a.situacao === 'feita' && (
                      <button type="button" className="mh-btn mh-btn-mini mh-btn-roxo" onClick={() => { atualizarAtividade(a.id, { situacao: 'protocolada' }); toast.success('Marcada como protocolada.'); }}>
                        Já protocolei
                      </button>
                    )}
                    {a.link && (
                      <a className="mh-btn mh-btn-mini" href={a.link} target="_blank" rel="noopener noreferrer">
                        Abrir comprovante
                        <CagpIcon name="arrow-up-right" className="w-4 h-4" />
                      </a>
                    )}
                    <button type="button" className="mh-btn mh-btn-mini" onClick={() => editar(a)}>
                      Editar
                    </button>
                    {apagando === a.id ? (
                      <>
                        <button type="button" className="mh-btn mh-btn-mini mh-btn-perigo" onClick={() => { removerAtividade(a.id); setApagando(null); }}>
                          Apagar mesmo
                        </button>
                        <button type="button" className="mh-btn mh-btn-mini" onClick={() => setApagando(null)}>
                          Manter
                        </button>
                      </>
                    ) : (
                      <button type="button" className="mh-btn mh-btn-mini" onClick={() => setApagando(a.id)}>
                        Apagar
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {estouros.length > 0 && (
          <ul className="mh-estouros" role="list">
            {estouros.map(({ m, v }) => (
              <li key={m.key}>
                <strong>{m.code}</strong> tem {FMT.format(v)}h lançadas, mas só {FMT.format(m.max)}h contam nessa modalidade.
              </li>
            ))}
          </ul>
        )}

        {base.length > 0 && (
          <details className="mh-base">
            <summary>
              Horas lançadas antes
              <span>{FMT.format(base.reduce((s, [, v]) => s + v, 0))}h</span>
            </summary>
            <p className="mh-ajuda">
              São os totais que você digitou na calculadora antiga. Continuam valendo. Se for lançar essas atividades
              uma a uma, zere a linha aqui pra não contar duas vezes.
            </p>
            <ul role="list">
              {base.map(([chave, v]) => {
                const m = modalidade(chave);
                const id = `${uid}-base-${chave}`;
                return (
                  <li key={chave}>
                    <label htmlFor={id}>
                      <strong>{m?.code ?? chave}</strong>
                      {m?.label ?? ''}
                    </label>
                    <input
                      id={id}
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      defaultValue={v}
                      key={v}
                      onBlur={(e) => {
                        const n = Number(e.currentTarget.value.replace(',', '.'));
                        definirBase(chave, Number.isFinite(n) ? n : v);
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </details>
        )}

        <p className="mh-nota-rodape">
          Procurando o que fazer? <a href={route('/cursos')}>Cursos gratuitos que contam horas</a>. Pra protocolar no
          Colegiado, <a href={route('/acg')}>siga o passo a passo das 600h</a>.
        </p>
      </div>
    </section>
  );
};
