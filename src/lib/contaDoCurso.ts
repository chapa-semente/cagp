// contaDoCurso.ts — A conta das 3.000h, uma só para o site inteiro (DESIGN.md › One Owner).
//
// Totais do quadro de integralização do percurso Bacharelado/Núcleo Geral
// (_referencias/documentos-oficiais/percurso-bacharelado-nucleo-geral.md):
//   Obrigatórias 1.560h · Estágio obrigatório 300h · Formação livre 120h ·
//   Optativas 1.020h = Extensão 300h + AAC (opcional) + Optativas gerais (420 a 720h)   → 3.000h
// O teto de 300h de AAC vale para todas as AAC juntas, inclusive as de extensão (somaDasHoras).
//
// Função pura: quem chama lê o cofre e passa os dados. Assim o painel, a formatura e os testes
// fazem exatamente a mesma conta.
import { somaDasHoras, HORAS_EXTENSAO } from '@/components/features/acg/calculator/acgCatalog';
import { DISCIPLINAS_GRAFO, type CourseNodeData } from '@/components/features/curriculum/graph/curriculumGraphData';
import type { CustomCourse, VaultData } from '@/lib/storage/studentVault';

export interface DisciplinaObrigatoria {
  code: string;
  name: string;
  period: number;
  ch: number;
  /** Estágio curricular obrigatório (grupo próprio de 300h). */
  estagio: boolean;
}

export const TOTAL_DO_CURSO = 3000;
const ESTAGIOS = new Set(['DCP 135', 'DCP 136']);

/** As 27 obrigatórias do percurso (25 disciplinas + os dois estágios), em ordem de período. */
export const OBRIGATORIAS: DisciplinaObrigatoria[] = Object.values(DISCIPLINAS_GRAFO)
  .map((d) => ({ code: d.code, name: d.name, period: d.period, ch: d.ch, estagio: ESTAGIOS.has(d.code) }))
  .sort((a, b) => a.period - b.period || a.code.localeCompare(b.code));

export interface EntradaConta {
  cursadas: string[];
  /** Optativas e formação livre que a pessoa pôs na grade (/optativas e o mapa de /percurso). */
  naGrade: CustomCourse[];
  horas: Pick<VaultData<'cagp_minhas_horas_v1'>, 'optativasH' | 'livreH'>;
  /** Totais de extensão e AAC por modalidade (espelho de src/lib/atividades.ts). */
  calc: Record<string, number>;
}

export interface GrupoDaConta {
  id: 'ob' | 'est' | 'op' | 'ext' | 'aac' | 'fl';
  nome: string;
  feito: number;
  total: number;
  cor: string;
  opcional?: boolean;
}

export function contaDoCurso({ cursadas, naGrade, horas, calc }: EntradaConta) {
  const feitas = new Set(cursadas);
  const doGrupo = (estagio: boolean) => OBRIGATORIAS.filter((d) => d.estagio === estagio);
  const total = (ds: DisciplinaObrigatoria[]) => ds.reduce((a, d) => a + d.ch, 0);
  const feito = (ds: DisciplinaObrigatoria[]) => ds.filter((d) => feitas.has(d.code)).reduce((a, d) => a + d.ch, 0);

  // Disciplina da grade só conta depois de marcada como cursada.
  const daGrade = (livre: boolean) =>
    naGrade
      .filter((c) => (c.category !== 'optativa_catalogo') === livre && feitas.has(c.code))
      .reduce((a, c) => a + c.ch, 0);
  const optativasGrade = daGrade(false);
  const livreGrade = daGrade(true);

  const { extensao: ext, aac, sobraDeAac } = somaDasHoras(calc);
  // O grupo Optativas (1.020h) fecha com extensão (300h) + AAC (opcional) + optativas gerais.
  const alvoOptativas = 720 - aac;

  const grupos: GrupoDaConta[] = [
    { id: 'ob', nome: 'Obrigatórias', feito: feito(doGrupo(false)), total: total(doGrupo(false)), cor: '#5B2A85' },
    { id: 'est', nome: 'Estágio obrigatório', feito: feito(doGrupo(true)), total: total(doGrupo(true)), cor: '#8A4B2A' },
    { id: 'op', nome: 'Optativas gerais', feito: Math.min(alvoOptativas, horas.optativasH + optativasGrade), total: alvoOptativas, cor: '#FE8812' },
    { id: 'ext', nome: 'Extensão', feito: ext, total: HORAS_EXTENSAO, cor: '#6DB33F' },
    // AAC é opcional: o total é o que ainda cabe no teto, já descontadas as AAC de extensão.
    { id: 'aac', nome: 'AAC (opcional)', feito: aac, total: aac + sobraDeAac, cor: '#FFC83D', opcional: true },
    { id: 'fl', nome: 'Formação livre', feito: Math.min(120, horas.livreH + livreGrade), total: 120, cor: '#266264' },
  ];
  const cursado = grupos.reduce((a, g) => a + g.feito, 0);
  return {
    grupos,
    cursado,
    falta: Math.max(0, TOTAL_DO_CURSO - cursado),
    ext,
    aac,
    sobraDeAac,
    alvoOptativas,
    optativasGrade,
    livreGrade,
  };
}

export interface Liberada {
  disciplina: CourseNodeData;
  /** Pré-requisitos que a pessoa ainda está cursando: só libera se passar neles. */
  dependeDe: string[];
}

/**
 * Obrigatórias que a pessoa pode pegar no próximo semestre: ainda não cursadas nem em curso, com todo
 * pré-requisito formal do SIGA cursado ou em curso. Em ordem de período.
 */
export function liberadasParaOProximo(cursadas: string[], cursando: string[]): Liberada[] {
  const feitas = new Set(cursadas);
  const emCurso = new Set(cursando);
  const codigo = (chave: string) => DISCIPLINAS_GRAFO[chave]?.code ?? chave;
  return Object.values(DISCIPLINAS_GRAFO)
    .filter((d) => !feitas.has(d.code) && !emCurso.has(d.code))
    .map((d) => {
      const reqs = d.formalReqs.map(codigo);
      if (!reqs.every((r) => feitas.has(r) || emCurso.has(r))) return null;
      return { disciplina: d, dependeDe: reqs.filter((r) => !feitas.has(r)) };
    })
    .filter((l): l is Liberada => l !== null)
    .sort((a, b) => a.disciplina.period - b.disciplina.period || a.disciplina.code.localeCompare(b.disciplina.code));
}
