// faltas.ts — A conta das faltas, uma só para o site (DESIGN.md › One Owner).
//
// Ideia de Luiz Carlos, do 4º período, em 23/11/2026: virou a proposta de estudante nº 2
// (/propostas/e2) e entrou no ar no dia seguinte, em /faltas.
//
// A regra é das Normas Gerais de Graduação da UFMG (Resolução Complementar CEPE nº 01/2018):
//   art. 11, § 1º      presença mínima de 75% da programação da disciplina, "vedado o abono de
//                      faltas, salvo nas situações previstas em lei";
//   art. 11, § 2º      quem não alcança é reprovado na disciplina;
//   art. 12, § 3º, VI  e o conceito é F, qualquer que seja a nota;
//   art. 15            exame especial só existe para conceito E, que exige presença suficiente;
//   art. 87, VI        infrequência em mais de 50% dos créditos do semestre desliga o estudante.
//
// A conta: cada hora da carga horária é uma aula, e o limite é um quarto delas, arredondado para
// baixo (60h → 15 faltas). Um dia de aula perdido vale as aulas daquele dia (2, no padrão do curso),
// então numa disciplina de 60h cabem 7 dias (14 faltas) e sobra 1 falta.
//
// Donos dos dados: as disciplinas em curso continuam em cagp_minha_grade_v1 (o mesmo "Cursando
// agora" de /meu-curso); aqui ficam só as faltas marcadas, as disciplinas de fora da grade e os
// ajustes de cada uma (cagp_faltas_v1). Só neste aparelho.
import { getVaultItem, setVaultItem, type VaultData } from '@/lib/storage/studentVault';
import { OBRIGATORIAS } from '@/lib/contaDoCurso';

export type EstadoFaltas = VaultData<'cagp_faltas_v1'>;

/** Parte da carga horária que se pode perder: o que sobra dos 75% de presença. */
export const FRACAO_DE_FALTAS = 0.25;
/** No curso noturno, um dia de aula de uma disciplina é um horário de duas aulas. */
export const AULAS_POR_DIA_PADRAO = 2;
export const AULAS_POR_DIA = [2, 4] as const;
/** Cargas horárias que existem na grade e no catálogo de optativas. */
export const CARGAS_HORARIAS = [15, 30, 45, 60, 75, 90, 120] as const;
/** Os dois estágios e o TCC não são aulas em sala: ficam fora da cartela. */
const SEM_CHAMADA = new Set(['DCP 135', 'DCP 136', 'DCP 137']);

export const NORMA_DAS_FALTAS = {
  nome: 'Normas Gerais de Graduação da UFMG',
  ato: 'Resolução Complementar CEPE nº 01/2018',
  /** A cópia que o site já guarda em Documentos. */
  arquivo: '/documentos/resolucao-cepe-01-2018-normas-gerais-graduacao.pdf',
  /** De onde ela veio: a página da Pró-Reitoria de Graduação. */
  origem: 'https://www.ufmg.br/prograd/normas-gerais-de-graduacao-e-resolucoes/',
  lidaEm: '24/11/2026',
} as const;

/** Faltas que cabem numa disciplina: um quarto da carga horária, sem arredondar para cima. */
export const limiteDeFaltas = (ch: number): number => Math.max(0, Math.floor(ch * FRACAO_DE_FALTAS));

export type SituacaoDeFaltas = 'tranquilo' | 'atencao' | 'limite' | 'estourou';

export interface ContaDeFaltas {
  /** Faltas que cabem na disciplina. */
  limite: number;
  /** Faltas marcadas até agora. */
  faltas: number;
  /** Faltas que ainda cabem (nunca negativo). */
  restam: number;
  /** Faltas além do limite. */
  passou: number;
  /** Dias inteiros de aula que cabem no limite. */
  diasCabem: number;
  /** Dias inteiros que ainda cabem. */
  diasRestam: number;
  /** Faltas avulsas que sobram depois dos dias inteiros que restam. */
  sobra: number;
  situacao: SituacaoDeFaltas;
}

/**
 * A conta de uma disciplina. Função pura: a tela, o resumo do painel e os testes fazem a mesma.
 * `marcas` é a lista de faltas lançadas, cada item com as aulas perdidas naquela vez.
 */
export function contaDeFaltas(ch: number, marcas: readonly number[] = [], aulasPorDia: number = AULAS_POR_DIA_PADRAO): ContaDeFaltas {
  const porDia = Math.max(1, Math.floor(aulasPorDia));
  const limite = limiteDeFaltas(ch);
  const faltas = marcas.reduce((a, n) => a + Math.max(0, Math.floor(n)), 0);
  const restam = Math.max(0, limite - faltas);
  const diasRestam = Math.floor(restam / porDia);
  const situacao: SituacaoDeFaltas =
    faltas > limite ? 'estourou' : diasRestam === 0 ? 'limite' : faltas * 3 >= limite * 2 ? 'atencao' : 'tranquilo';
  return {
    limite,
    faltas,
    restam,
    passou: Math.max(0, faltas - limite),
    diasCabem: Math.floor(limite / porDia),
    diasRestam,
    sobra: restam - diasRestam * porDia,
    situacao,
  };
}

export interface DisciplinaComFaltas {
  /** O código da obrigatória ("DCP 045") ou o id da disciplina de fora da grade ("x-…"). */
  id: string;
  codigo: string | null;
  nome: string;
  ch: number;
  /** Optativa, formação livre ou eletiva que a pessoa escreveu à mão. */
  extra: boolean;
  aulasPorDia: number;
  marcas: number[];
  conta: ContaDeFaltas;
}

/** "2026/2": de março a julho é o 1º semestre; de agosto a fevereiro, o 2º (janeiro e fevereiro ainda são do ano anterior). */
export function semestreDe(data: Date = new Date()): string {
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();
  if (mes <= 2) return `${ano - 1}/2`;
  return mes <= 7 ? `${ano}/1` : `${ano}/2`;
}

/** As disciplinas da cartela: as obrigatórias em curso (menos estágio, TCC e as que a pessoa tirou) e as de fora da grade. */
export function disciplinasDoSemestre(estado: EstadoFaltas, cursando: readonly string[]): DisciplinaComFaltas[] {
  const emCurso = new Set(cursando);
  const fora = new Set(estado.fora);
  const monta = (id: string, codigo: string | null, nome: string, ch: number, extra: boolean): DisciplinaComFaltas => {
    const aulasPorDia = estado.aulasPorDia[id] ?? AULAS_POR_DIA_PADRAO;
    const marcas = estado.marcas[id] ?? [];
    return { id, codigo, nome, ch, extra, aulasPorDia, marcas, conta: contaDeFaltas(ch, marcas, aulasPorDia) };
  };
  return [
    ...OBRIGATORIAS.filter((d) => emCurso.has(d.code) && !SEM_CHAMADA.has(d.code) && !fora.has(d.code)).map((d) =>
      monta(d.code, d.code, d.name, d.ch, false),
    ),
    ...estado.extras.map((e) => monta(e.id, null, e.nome, e.ch, true)),
  ];
}

/** Obrigatórias que ainda dá para pôr na cartela: nem cursadas, nem estágio ou TCC. Em ordem de período. */
export function obrigatoriasParaEscolher(cursadas: readonly string[]) {
  const feitas = new Set(cursadas);
  return OBRIGATORIAS.filter((d) => !feitas.has(d.code) && !SEM_CHAMADA.has(d.code));
}

const ORDEM: Record<SituacaoDeFaltas, number> = { estourou: 0, limite: 1, atencao: 2, tranquilo: 3 };

/** O resumo do semestre: a disciplina mais apertada primeiro. */
export function resumoDasFaltas(lista: readonly DisciplinaComFaltas[]) {
  const ordenadas = [...lista].sort(
    (a, b) => ORDEM[a.conta.situacao] - ORDEM[b.conta.situacao] || a.conta.diasRestam - b.conta.diasRestam || a.conta.restam - b.conta.restam,
  );
  const conta = (s: SituacaoDeFaltas) => lista.filter((d) => d.conta.situacao === s).length;
  return {
    total: lista.length,
    maisApertada: ordenadas[0] ?? null,
    comFalta: lista.filter((d) => d.conta.faltas > 0).length,
    estouradas: conta('estourou'),
    noLimite: conta('limite'),
    emAtencao: conta('atencao'),
  };
}

// ---- O cofre ---------------------------------------------------------------------------------

export const lerFaltas = (): EstadoFaltas => getVaultItem('cagp_faltas_v1');
const salvar = (estado: EstadoFaltas) => setVaultItem('cagp_faltas_v1', estado);

/** Lança uma falta: `aulas` é quantas aulas a pessoa perdeu naquela vez (um dia inteiro ou só uma). */
export function marcarFalta(id: string, aulas: number): void {
  const estado = lerFaltas();
  const n = Math.max(1, Math.min(8, Math.floor(aulas)));
  salvar({
    ...estado,
    semestre: estado.semestre || semestreDe(),
    marcas: { ...estado.marcas, [id]: [...(estado.marcas[id] ?? []), n] },
  });
}

/** Tira a última falta lançada na disciplina. */
export function desfazerFalta(id: string): void {
  const estado = lerFaltas();
  const atuais = estado.marcas[id] ?? [];
  if (atuais.length === 0) return;
  salvar({ ...estado, marcas: { ...estado.marcas, [id]: atuais.slice(0, -1) } });
}

export function definirAulasPorDia(id: string, aulas: number): void {
  const estado = lerFaltas();
  const aulasPorDia = { ...estado.aulasPorDia };
  if (aulas === AULAS_POR_DIA_PADRAO) delete aulasPorDia[id];
  else aulasPorDia[id] = Math.max(1, Math.min(8, Math.floor(aulas)));
  salvar({ ...estado, aulasPorDia });
}

/** Optativa, formação livre ou eletiva: entra só na cartela, com o nome e a carga horária que a pessoa disser. */
export function adicionarExtra(nome: string, ch: number): string | null {
  const limpo = nome.trim().replace(/\s+/g, ' ').slice(0, 80);
  if (limpo.length < 2) return null;
  const estado = lerFaltas();
  const id = `x-${Date.now().toString(36)}${Math.floor(Math.random() * 1296).toString(36)}`;
  salvar({
    ...estado,
    semestre: estado.semestre || semestreDe(),
    extras: [...estado.extras, { id, nome: limpo, ch: Math.max(15, Math.min(180, Math.floor(ch))) }],
  });
  return id;
}

const semChave = <T,>(mapa: Record<string, T>, chave: string): Record<string, T> => {
  const copia = { ...mapa };
  delete copia[chave];
  return copia;
};

/**
 * Tira uma disciplina da cartela. A de fora da grade some de vez; a obrigatória continua
 * "cursando" em /meu-curso e só deixa de aparecer aqui.
 */
export function tirarDaCartela(d: Pick<DisciplinaComFaltas, 'id' | 'extra'>): void {
  const estado = lerFaltas();
  salvar({
    ...estado,
    marcas: semChave(estado.marcas, d.id),
    aulasPorDia: semChave(estado.aulasPorDia, d.id),
    extras: d.extra ? estado.extras.filter((e) => e.id !== d.id) : estado.extras,
    fora: d.extra ? estado.fora : [...estado.fora.filter((c) => c !== d.id), d.id],
  });
}

/**
 * Marca ou desmarca uma obrigatória como "cursando agora". Escreve na grade (cagp_minha_grade_v1),
 * a mesma que o painel de /meu-curso usa, para as duas telas mostrarem as mesmas disciplinas.
 */
export function definirCursando(codigo: string, sim: boolean): void {
  const grade = getVaultItem('cagp_minha_grade_v1');
  const cursando = grade.cursando.filter((c) => c !== codigo);
  setVaultItem('cagp_minha_grade_v1', {
    savedCourses: sim ? grade.savedCourses.filter((c) => c !== codigo) : grade.savedCourses,
    cursando: sim ? [...cursando, codigo] : cursando,
  });
  // Quem volta a marcar uma disciplina que tinha tirado da cartela quer vê-la de novo.
  const estado = lerFaltas();
  if (sim && estado.fora.includes(codigo)) salvar({ ...estado, fora: estado.fora.filter((c) => c !== codigo) });
}

/** Zera as faltas e as disciplinas de fora da grade. A grade (o que está em curso) é do painel de /meu-curso. */
export function comecarSemestre(semestre: string = semestreDe()): void {
  salvar({ semestre, marcas: {}, aulasPorDia: {}, extras: [], fora: [] });
}

// ---- Como dizer ------------------------------------------------------------------------------

export const plural = (n: number, um: string, varios: string) => `${n} ${n === 1 ? um : varios}`;

export const ROTULO_DA_SITUACAO: Record<SituacaoDeFaltas, string> = {
  tranquilo: 'Tranquilo',
  atencao: 'Atenção',
  limite: 'No limite',
  estourou: 'Passou do limite',
};

/** A frase curta do resumo: "restam 5 dias", "só 1 falta", "passou 2 faltas". */
export function fraseDaConta(c: ContaDeFaltas): string {
  if (c.situacao === 'estourou') return `passou ${plural(c.passou, 'falta', 'faltas')}`;
  if (c.diasRestam === 0) return c.restam === 0 ? 'nenhuma falta sobrando' : `só ${plural(c.restam, 'falta', 'faltas')}`;
  return `${c.diasRestam === 1 ? 'resta' : 'restam'} ${plural(c.diasRestam, 'dia', 'dias')}`;
}
