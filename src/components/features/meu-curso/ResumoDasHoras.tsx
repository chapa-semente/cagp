// ResumoDasHoras.tsx — O que sobrou da calculadora em /acg: um resumo que abre o painel.
// A soma e o prazo de 120 dias têm um dono só, a lista de atividades de /meu-curso
// (DESIGN.md › One Owner). Abrir esta página também traz os registros antigos para a lista.
import React, { useEffect, useState } from 'react';
import { EXTENSION_ITEMS, AAC_ITEMS } from '@/components/features/acg/calculator/acgCatalog';
import { horasPorModalidade, lerAtividades, prazosAbertos, type EstadoAtividades } from '@/lib/atividades';
import { route } from '@/lib/paths';

const FMT = new Intl.NumberFormat('pt-BR');

export const ResumoDasHoras: React.FC = () => {
  const [estado, setEstado] = useState<EstadoAtividades>({ itens: [], base: {}, migrado: true });

  useEffect(() => {
    const carregar = () => setEstado(lerAtividades());
    carregar();
    window.addEventListener('cagp:vault-updated', carregar);
    window.addEventListener('storage', carregar);
    return () => {
      window.removeEventListener('cagp:vault-updated', carregar);
      window.removeEventListener('storage', carregar);
    };
  }, []);

  const porMod = horasPorModalidade(estado);
  const soma = (itens: { key: string }[]) => Math.min(300, itens.reduce((s, it) => s + (porMod[it.key] ?? 0), 0));
  const grupos = [
    { nome: 'Extensão', feito: soma(EXTENSION_ITEMS), cor: '#6DB33F' },
    { nome: 'AAC (até 300h)', feito: soma(AAC_ITEMS), cor: '#FFC83D' },
  ];
  const prazo = prazosAbertos(estado)[0];
  const lancadas = estado.itens.length;

  return (
    <div className="mh-ficha">
      <h2 className="m-0 font-heading font-bold text-xl">Suas horas até agora</h2>
      <ul className="sk-saldo-grupos" role="list">
        {grupos.map((g) => (
          <li key={g.nome} style={{ '--cor': g.cor } as React.CSSProperties}>
            <span className="sk-saldo-g-nome">{g.nome}</span>
            <span className="sk-saldo-g-val">{FMT.format(g.feito)} / 300h</span>
            <span className="sk-saldo-g-barra" aria-hidden="true">
              <span style={{ width: `${Math.min(100, (g.feito / 300) * 100)}%` }} data-vazio={g.feito === 0 || undefined} />
            </span>
          </li>
        ))}
      </ul>
      <p className="mh-vazio">
        {lancadas === 0
          ? 'Nenhuma atividade lançada ainda.'
          : `${lancadas} ${lancadas === 1 ? 'atividade na sua lista' : 'atividades na sua lista'}.`}{' '}
        {prazo
          ? prazo.dias < 0
            ? `O prazo de "${prazo.atividade.titulo}" venceu.`
            : `Prazo mais curto: ${prazo.dias} ${prazo.dias === 1 ? 'dia' : 'dias'} pra protocolar "${prazo.atividade.titulo}".`
          : 'Nenhum prazo de 120 dias correndo.'}
      </p>
      <div className="mh-form-acoes">
        <a className="mh-btn mh-btn-roxo" href={route('/meu-curso') + '#atividades'}>
          Lançar atividade
        </a>
        <a className="mh-btn" href={route('/meu-curso') + '#prazos'}>
          Ver meus prazos
        </a>
      </div>
      <p className="mh-nota-rodape">
        A soma e o prazo agora ficam numa lista só, no painel de Meu curso. O que você já tinha lançado aqui continua
        valendo. Fica salvo só neste celular.
      </p>
    </div>
  );
};
