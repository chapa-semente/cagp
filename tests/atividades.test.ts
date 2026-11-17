import { describe, it, expect, beforeEach } from 'vitest';
import { getVaultItem, setVaultItem } from '@/lib/storage/studentVault';
import { adicionarAtividade, atualizarAtividade, diasParaProtocolar, idDoCurso, lerAtividades, prazosAbertos, removerAtividade } from '@/lib/atividades';
import { contaDoCurso, liberadasParaOProximo, OBRIGATORIAS } from '@/lib/contaDoCurso';

const diasAtras = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString().slice(0, 10);

describe('Lista única de atividades (600h)', () => {
  beforeEach(() => localStorage.clear());

  it('migra os três registros antigos sem mudar o total de ninguém', () => {
    localStorage.setItem('cagp_calc_ext_aac_v1', JSON.stringify({ ext_lab_a: 90, aac_eventos_i: 45, aac_cursos: 40 }));
    localStorage.setItem(
      'cagp_aac_120d_certs_v1',
      JSON.stringify([
        { id: 'cert-1', title: 'Seminário de Orçamento', mod: 'Eventos & Congressos', date: diasAtras(100), hours: 30 },
        { id: 'curso-abc-1', title: 'Curso gêmeo', mod: 'Curso Livre (ENAP)', date: diasAtras(1), hours: 40 },
      ]),
    );
    localStorage.setItem(
      'cagp_cursos_enap_salvos_v1',
      JSON.stringify([{ id: 'abc', title: 'Gestão de Riscos', hours: 40, category: 'ENAP', addedAt: '2026-11-01T00:00:00.000Z' }]),
    );

    const estado = lerAtividades();
    expect(estado.migrado).toBe(true);
    expect(estado.base).toEqual({ ext_lab_a: 90, aac_eventos_i: 45 });
    // Certificado antigo vira atividade feita que não soma de novo; o gêmeo criado por /cursos some.
    expect(estado.itens.map((a) => [a.titulo, a.situacao, a.soma])).toEqual([
      ['Seminário de Orçamento', 'feita', false],
      ['Gestão de Riscos', 'quero', true],
    ]);
    // O espelho lido pela home, pelo perfil e pela formatura mantém os totais que contavam.
    const calc = getVaultItem('cagp_calc_ext_aac_v1');
    expect(calc.ext_lab_a).toBe(90);
    expect(calc.aac_eventos_i).toBe(45);
    // O prazo de 120 dias do certificado antigo continua correndo.
    expect(prazosAbertos(estado)[0].dias).toBe(20);
  });

  it('migra uma vez só', () => {
    lerAtividades();
    setVaultItem('cagp_aac_120d_certs_v1', [{ id: 'cert-2', title: 'Depois', mod: 'Eventos', date: diasAtras(3), hours: 10 }]);
    expect(lerAtividades().itens).toHaveLength(0);
  });

  it('soma só o que foi feito, respeita o teto da modalidade e atualiza o espelho', () => {
    adicionarAtividade({ titulo: 'Congresso A', mod: 'aac_eventos_i', horas: 40, situacao: 'feita', data: diasAtras(10) });
    adicionarAtividade({ titulo: 'Congresso B', mod: 'aac_eventos_i', horas: 40, situacao: 'protocolada' });
    adicionarAtividade({ id: idDoCurso('x'), titulo: 'Curso ENAP', mod: 'ext_ensino_inter', horas: 30, situacao: 'quero' });

    let calc = getVaultItem('cagp_calc_ext_aac_v1');
    expect(calc.aac_eventos_i).toBe(60); // teto de 60h, com 80h lançadas
    expect(calc.ext_ensino_inter).toBe(0); // "quero fazer" não soma

    atualizarAtividade(idDoCurso('x'), { situacao: 'feita', data: diasAtras(2) });
    calc = getVaultItem('cagp_calc_ext_aac_v1');
    expect(calc.ext_ensino_inter).toBe(30);

    removerAtividade(idDoCurso('x'));
    expect(getVaultItem('cagp_calc_ext_aac_v1').ext_ensino_inter).toBe(0);
  });

  it('não lança o mesmo curso do catálogo duas vezes', () => {
    const curso = { id: idDoCurso('y'), titulo: 'Curso', mod: 'ext_ensino_inter', horas: 20, situacao: 'quero' as const };
    adicionarAtividade(curso);
    expect(adicionarAtividade(curso).itens).toHaveLength(1);
  });

  it('conta os 120 dias só para atividade feita, com data e em modalidade com prazo', () => {
    const base = { id: 'a', titulo: 'T', horas: 10, soma: true, criadaEm: '' };
    expect(diasParaProtocolar({ ...base, mod: 'aac_eventos_i', situacao: 'feita', data: diasAtras(119) })).toBe(1);
    expect(diasParaProtocolar({ ...base, mod: 'aac_eventos_i', situacao: 'feita', data: diasAtras(125) })).toBe(-5);
    expect(diasParaProtocolar({ ...base, mod: 'aac_eventos_i', situacao: 'protocolada', data: diasAtras(10) })).toBeNull();
    expect(diasParaProtocolar({ ...base, mod: 'aac_eventos_i', situacao: 'feita' })).toBeNull();
    expect(diasParaProtocolar({ ...base, mod: 'aac_monitoria', situacao: 'feita', data: diasAtras(10) })).toBeNull();
  });
});

describe('Conta única das 3.000h', () => {
  const vazio = { cursadas: [], naGrade: [], horas: { optativasH: 0, livreH: 0 }, calc: {} };

  it('fecha em 3.000h com tudo cursado', () => {
    const conta = contaDoCurso({
      cursadas: OBRIGATORIAS.map((d) => d.code),
      naGrade: [],
      horas: { optativasH: 720, livreH: 120 },
      calc: { ext_lab_a: 90, ext_lab_b: 90, ext_ensino_inter: 120 },
    });
    expect(conta.cursado).toBe(3000);
    expect(conta.falta).toBe(0);
  });

  it('desconta a AAC da meta de optativas gerais', () => {
    expect(contaDoCurso(vazio).alvoOptativas).toBe(720);
    expect(contaDoCurso({ ...vazio, calc: { aac_monitoria: 45 } }).alvoOptativas).toBe(675);
  });

  it('soma a optativa da grade só depois de marcada como cursada', () => {
    const optativa = { id: '1', code: 'DCP 999', name: 'Optativa', dept: 'DCP', period: 4, ch: 60, category: 'optativa_catalogo' as const };
    const grupo = (cursadas: string[]) => contaDoCurso({ ...vazio, cursadas, naGrade: [optativa] }).grupos.find((g) => g.id === 'op')!.feito;
    expect(grupo([])).toBe(0);
    expect(grupo(['DCP 999'])).toBe(60);
  });

  it('libera para o próximo semestre só o que tem pré-requisito cursado ou em curso', () => {
    const comReq = liberadasParaOProximo([], []).map((l) => l.disciplina.code);
    const todas = OBRIGATORIAS.map((d) => d.code);
    // Com tudo cursado menos uma, só ela aparece; cursando não aparece.
    const ultima = todas[todas.length - 1];
    expect(liberadasParaOProximo(todas.slice(0, -1), []).map((l) => l.disciplina.code)).toEqual([ultima]);
    expect(liberadasParaOProximo(todas.slice(0, -1), [ultima])).toEqual([]);
    expect(comReq.length).toBeGreaterThan(0);
    expect(comReq.length).toBeLessThanOrEqual(todas.length);
  });
});
