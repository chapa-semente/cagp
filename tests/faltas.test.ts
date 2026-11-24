import { describe, it, expect, beforeEach } from 'vitest';
import { getVaultItem, setVaultItem } from '@/lib/storage/studentVault';
import {
  adicionarExtra,
  comecarSemestre,
  contaDeFaltas,
  definirAulasPorDia,
  definirCursando,
  desfazerFalta,
  disciplinasDoSemestre,
  fraseDaConta,
  lerFaltas,
  limiteDeFaltas,
  marcarFalta,
  obrigatoriasParaEscolher,
  resumoDasFaltas,
  semestreDe,
  tirarDaCartela,
} from '@/lib/faltas';
import { OBRIGATORIAS } from '@/lib/contaDoCurso';

const de60 = OBRIGATORIAS.filter((d) => d.ch === 60 && !d.estagio);

describe('Calculadora de faltas: a conta', () => {
  it('o limite é um quarto da carga horária, arredondado para baixo', () => {
    expect([15, 30, 45, 60, 75, 90].map(limiteDeFaltas)).toEqual([3, 7, 11, 15, 18, 22]);
  });

  it('em 60h cabem 15 faltas, que são 7 dias de aula e sobra 1 falta', () => {
    const c = contaDeFaltas(60);
    expect(c).toMatchObject({ limite: 15, faltas: 0, restam: 15, diasCabem: 7, diasRestam: 7, sobra: 1, situacao: 'tranquilo' });
  });

  it('com 4 aulas na mesma noite, 60h são 3 dias e sobram 3 faltas', () => {
    expect(contaDeFaltas(60, [], 4)).toMatchObject({ diasCabem: 3, diasRestam: 3, sobra: 3 });
  });

  it('30h e 90h com 2 aulas por dia', () => {
    expect(contaDeFaltas(30)).toMatchObject({ limite: 7, diasCabem: 3, sobra: 1 });
    expect(contaDeFaltas(90)).toMatchObject({ limite: 22, diasCabem: 11, sobra: 0 });
  });

  it('a situação muda nos pontos certos de uma disciplina de 60h', () => {
    const com = (dias: number, avulsas = 0) => contaDeFaltas(60, [...Array(dias).fill(2), ...Array(avulsas).fill(1)]);
    expect(com(4).situacao).toBe('tranquilo'); // 8 faltas, restam 3 dias
    expect(com(4, 1).situacao).toBe('tranquilo'); // 9 faltas, restam 3 dias
    expect(com(5).situacao).toBe('atencao'); // 10 faltas, restam 2 dias
    expect(com(6).situacao).toBe('atencao'); // 12 faltas, resta 1 dia
    expect(com(7)).toMatchObject({ faltas: 14, restam: 1, diasRestam: 0, sobra: 1, situacao: 'limite' });
    expect(com(7, 1)).toMatchObject({ faltas: 15, restam: 0, situacao: 'limite' });
    expect(com(8)).toMatchObject({ faltas: 16, passou: 1, restam: 0, situacao: 'estourou' });
  });

  it('diz a conta em uma frase curta', () => {
    expect(fraseDaConta(contaDeFaltas(60, [2, 2]))).toBe('restam 5 dias');
    expect(fraseDaConta(contaDeFaltas(60, Array(6).fill(2)))).toBe('resta 1 dia');
    expect(fraseDaConta(contaDeFaltas(60, Array(7).fill(2)))).toBe('só 1 falta');
    expect(fraseDaConta(contaDeFaltas(60, [...Array(7).fill(2), 1]))).toBe('nenhuma falta sobrando');
    expect(fraseDaConta(contaDeFaltas(60, Array(9).fill(2)))).toBe('passou 3 faltas');
  });

  it('o semestre sai da data: março a julho é o 1º, agosto a fevereiro é o 2º', () => {
    expect(semestreDe(new Date(2026, 10, 24))).toBe('2026/2');
    expect(semestreDe(new Date(2027, 0, 15))).toBe('2026/2');
    expect(semestreDe(new Date(2027, 2, 8))).toBe('2027/1');
    expect(semestreDe(new Date(2027, 6, 31))).toBe('2027/1');
  });
});

describe('Calculadora de faltas: a cartela', () => {
  beforeEach(() => localStorage.clear());

  it('mostra as obrigatórias em curso, sem o estágio, e as de fora da grade', () => {
    const [a, b] = de60;
    definirCursando(a.code, true);
    definirCursando(b.code, true);
    definirCursando('DCP 135', true);
    adicionarExtra('  Tópicos em   Políticas Públicas ', 30);
    const lista = disciplinasDoSemestre(lerFaltas(), getVaultItem('cagp_minha_grade_v1').cursando);
    expect(lista.map((d) => [d.codigo, d.ch, d.extra])).toEqual([
      [a.code, 60, false],
      [b.code, 60, false],
      [null, 30, true],
    ]);
    expect(lista[2].nome).toBe('Tópicos em Políticas Públicas');
    expect(obrigatoriasParaEscolher([]).some((d) => ['DCP 135', 'DCP 136', 'DCP 137'].includes(d.code))).toBe(false);
  });

  it('marca um dia, uma falta avulsa e desfaz a última', () => {
    const d = de60[0];
    definirCursando(d.code, true);
    marcarFalta(d.code, 2);
    marcarFalta(d.code, 1);
    expect(lerFaltas().marcas[d.code]).toEqual([2, 1]);
    expect(lerFaltas().semestre).toBe(semestreDe());
    desfazerFalta(d.code);
    expect(lerFaltas().marcas[d.code]).toEqual([2]);
    desfazerFalta(d.code);
    desfazerFalta(d.code);
    expect(lerFaltas().marcas[d.code]).toEqual([]);
  });

  it('respeita as aulas por dia de cada disciplina e volta ao padrão sem guardar nada', () => {
    const d = de60[0];
    definirCursando(d.code, true);
    definirAulasPorDia(d.code, 4);
    marcarFalta(d.code, 4);
    const [linha] = disciplinasDoSemestre(lerFaltas(), [d.code]);
    expect(linha.conta).toMatchObject({ faltas: 4, diasCabem: 3, diasRestam: 2, sobra: 3 });
    definirAulasPorDia(d.code, 2);
    expect(lerFaltas().aulasPorDia).toEqual({});
  });

  it('tirar uma obrigatória da cartela não mexe na grade; marcar de novo traz de volta', () => {
    const d = de60[0];
    definirCursando(d.code, true);
    marcarFalta(d.code, 2);
    tirarDaCartela({ id: d.code, extra: false });
    expect(getVaultItem('cagp_minha_grade_v1').cursando).toContain(d.code);
    expect(disciplinasDoSemestre(lerFaltas(), [d.code])).toHaveLength(0);
    expect(lerFaltas().marcas[d.code]).toBeUndefined();
    definirCursando(d.code, true);
    expect(disciplinasDoSemestre(lerFaltas(), [d.code])).toHaveLength(1);
  });

  it('marcar como cursando tira a disciplina das cursadas, como no painel', () => {
    const d = de60[0];
    setVaultItem('cagp_minha_grade_v1', { savedCourses: [d.code], cursando: [] });
    definirCursando(d.code, true);
    expect(getVaultItem('cagp_minha_grade_v1')).toEqual({ savedCourses: [], cursando: [d.code] });
  });

  it('o resumo põe a mais apertada na frente', () => {
    const [a, b, c] = de60;
    for (const d of [a, b, c]) definirCursando(d.code, true);
    for (let i = 0; i < 2; i++) marcarFalta(a.code, 2);
    for (let i = 0; i < 7; i++) marcarFalta(b.code, 2);
    const r = resumoDasFaltas(disciplinasDoSemestre(lerFaltas(), [a.code, b.code, c.code]));
    expect(r).toMatchObject({ total: 3, comFalta: 2, noLimite: 1, estouradas: 0, emAtencao: 0 });
    expect(r.maisApertada?.codigo).toBe(b.code);
  });

  it('começar o semestre zera as marcas e as disciplinas de fora, e deixa a grade como está', () => {
    const d = de60[0];
    definirCursando(d.code, true);
    marcarFalta(d.code, 2);
    adicionarExtra('Libras', 60);
    comecarSemestre('2027/1');
    expect(lerFaltas()).toEqual({ semestre: '2027/1', marcas: {}, aulasPorDia: {}, extras: [], fora: [] });
    expect(getVaultItem('cagp_minha_grade_v1').cursando).toEqual([d.code]);
  });
});
