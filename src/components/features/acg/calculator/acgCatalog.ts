// acgCatalog.ts — As formas de integralizar extensão e AAC, só com o que os documentos dizem.
//
// Fontes (documentos/): Regulamento do curso N-20229, arts. 13, 15, 33 e 59 a 63 · PPC, seções 2.3 a
// 2.7 · anexo do requerimento de atividade integralizadora (N-20229) · slides da Coordenação na
// recepção de ingressantes 2024/2 · relatório de percurso do SIGA (pré-requisitos dos Laboratórios).
//
// Revisão de 24/11/2026: saíram as listas "conta / não conta" sem fonte. Cada modalidade agora
// traz o que o Regulamento define, o que apresentar ao Colegiado e de onde isso saiu.

export interface AcgItemDef {
  key: string;
  aliases?: string[];
  group: 'ext' | 'aac';
  /** Disciplina regular (os dois Laboratórios) ou AAC, que entra por requerimento e gasta o teto global. */
  tipo: 'disciplina' | 'aac';
  code: string;
  label: string;
  /** Nome que aparece no anexo do requerimento, quando o rótulo da página é mais simples. */
  nomeOficial?: string;
  /** O que o documento define como sendo a atividade. */
  oQueE: string;
  /** Exemplo citado em documento do curso. */
  exemplo?: string;
  /** O que apresentar ao Colegiado. */
  comprova: string;
  /** Regra extra da própria modalidade (teto conjunto, período mínimo, escala de créditos). */
  nota?: string;
  fonte: string;
  step: number;
  /** Teto da modalidade, em horas. */
  max: number;
  has120dDeadline?: boolean;
}

/** Mínimo obrigatório de Formação em Extensão (Regulamento, art. 13). */
export const HORAS_EXTENSAO = 300;
/**
 * Teto de TODAS as AAC juntas, as que contam como extensão e as que não contam
 * (Regulamento, art. 15; anexo do requerimento). Os Laboratórios ficam fora: são disciplinas.
 */
export const TETO_AAC = 300;
/** Eventos I e II somam no máximo 4 créditos (anexo do requerimento). */
export const TETO_EVENTOS = 60;

const RELATORIO =
  'Relatório final assinado por você e pelo responsável, com as ações, a carga horária e a avaliação do seu desempenho.';

export const EXTENSION_ITEMS: AcgItemDef[] = [
  {
    key: 'ext_lab_a',
    group: 'ext',
    tipo: 'disciplina',
    code: 'DCP 195',
    label: 'Laboratório de Gestão e Políticas Públicas A',
    oQueE: 'Disciplina optativa de 90h (6 créditos), uma das duas do curso que contam como extensão.',
    comprova: 'Nada a protocolar: é disciplina regular e as horas entram com a aprovação.',
    nota: 'Pede Planejamento Público (DCP 182) e Formulação e Implementação de Programas e Projetos (DCP 183). Não gasta o teto de AAC.',
    fonte: 'Regulamento, art. 13, § 1º · percurso curricular do SIGA',
    step: 90,
    max: 90,
  },
  {
    key: 'ext_lab_b',
    group: 'ext',
    tipo: 'disciplina',
    code: 'DCP 196',
    label: 'Laboratório de Gestão e Políticas Públicas B',
    oQueE: 'Disciplina optativa de 90h (6 créditos), a outra do curso que conta como extensão.',
    comprova: 'Nada a protocolar: é disciplina regular e as horas entram com a aprovação.',
    nota: 'Pede Planejamento Público (DCP 182) e Formulação e Implementação de Programas e Projetos (DCP 183). Não gasta o teto de AAC.',
    fonte: 'Regulamento, art. 13, § 1º · percurso curricular do SIGA',
    step: 90,
    max: 90,
  },
  {
    key: 'ext_ensino_inter',
    aliases: ['ext_inter', 'ext_cursos'],
    group: 'ext',
    tipo: 'aac',
    code: 'DCP 193/194',
    label: 'Cursos em outras instituições',
    nomeOficial: 'Atividades Interinstitucionais de Ensino A e B',
    oQueE:
      'Disciplinas, seminários, laboratórios, oficinas e cursos de outras instituições, presenciais ou a distância, voltados para Gestão Pública ou áreas afins.',
    exemplo: 'Cursos da ENAP.',
    comprova: 'Documento que comprove a conclusão e a carga horária, de preferência com a nota final.',
    nota: 'Curso de idioma e cursinho para concurso não são AAC.',
    fonte: 'Regulamento, art. 13, § 2º, I · slides da Coordenação',
    step: 15,
    max: 120,
  },
  {
    key: 'ext_eventos_ii',
    aliases: ['ext_eventos'],
    group: 'ext',
    tipo: 'aac',
    code: 'DCP 187',
    label: 'Organizar evento ou ser debatedor',
    nomeOficial: 'Participação em Eventos II',
    oQueE: 'Participar de comissão organizadora ou comitê técnico-científico, ou atuar como debatedor ou moderador em evento.',
    comprova: 'Comprovação de participação, em até 120 dias depois do evento.',
    nota: 'Vale 2 créditos (30h). Somando com evento como ouvinte, o teto é de 60h.',
    fonte: 'Regulamento, art. 13, § 2º, II · PPC, Quadro 8',
    step: 30,
    max: 30,
    has120dDeadline: true,
  },
  {
    key: 'ext_ufmg',
    aliases: ['ext_proex', 'ext_siex_proj'],
    group: 'ext',
    tipo: 'aac',
    code: 'DCP 197',
    label: 'Extensão na UFMG',
    nomeOficial: 'Atividades de Extensão na UFMG',
    oQueE: 'Projeto ou programa de extensão desenvolvido na UFMG, voltado para Gestão Pública ou áreas afins.',
    comprova: RELATORIO,
    fonte: 'Regulamento, art. 13, § 2º, IV',
    step: 30,
    max: 90,
  },
  {
    key: 'ext_inter_equalitas',
    aliases: ['ext_equalitas'],
    group: 'ext',
    tipo: 'aac',
    code: 'DCP 199/200',
    label: 'Extensão em outras instituições',
    nomeOficial: 'Atividades Interinstitucionais de Extensão A e B',
    oQueE: 'Atividades de extensão em outras instituições, voltadas para Gestão Pública ou áreas afins.',
    exemplo: 'Projetos e programas da empresa júnior Equalitas UFMG Consultoria Jr.',
    comprova: RELATORIO,
    fonte: 'Regulamento, art. 13, § 2º, III',
    step: 15,
    max: 90,
  },
];

export const AAC_ITEMS: AcgItemDef[] = [
  {
    key: 'aac_pesquisa_inter',
    aliases: ['aac_1'],
    group: 'aac',
    tipo: 'aac',
    code: 'DCP 201/202',
    label: 'Pesquisa em outras instituições',
    nomeOficial: 'Atividades Interinstitucionais de Pesquisa A e B',
    oQueE: 'Atividades de pesquisa em outras instituições, voltadas para Gestão Pública ou áreas afins.',
    comprova: RELATORIO,
    fonte: 'Regulamento, art. 15, § 4º, I',
    step: 15,
    max: 75,
  },
  {
    key: 'aac_monitoria',
    aliases: ['aac_2'],
    group: 'aac',
    tipo: 'aac',
    code: 'DCP 203',
    label: 'Monitoria',
    oQueE: 'Monitoria em disciplinas relacionadas à Gestão Pública ou áreas afins.',
    comprova: 'Relatório final assinado por você e pelo responsável pela disciplina, com as ações, a carga horária e a avaliação do seu desempenho.',
    fonte: 'Regulamento, art. 15, § 4º, II',
    step: 15,
    max: 45,
  },
  {
    key: 'aac_eventos_i',
    aliases: ['aac_3', 'aac_eventos'],
    group: 'aac',
    tipo: 'aac',
    code: 'DCP 186',
    label: 'Evento como ouvinte',
    nomeOficial: 'Participação em Eventos I',
    oQueE: 'Participar de evento relevante para a Gestão Pública ou áreas conexas, aberto ao público externo.',
    comprova: 'Comprovação de participação, em até 120 dias depois do evento.',
    nota: 'Cada 15h valem 1 crédito, e dá pra juntar certificados até fechar 15h. O teto de 60h é dividido com quem organiza evento. O prazo de 120 dias não vale para atividade do Calendário Acadêmico.',
    fonte: 'Regulamento, art. 15, § 4º, III · slides da Coordenação',
    step: 15,
    max: 60,
    has120dDeadline: true,
  },
  {
    key: 'aac_grupos_estudo',
    aliases: ['aac_4'],
    group: 'aac',
    tipo: 'aac',
    code: 'DCP 204',
    label: 'Grupo de estudos',
    nomeOficial: 'Participação em Grupos de Estudo',
    oQueE: 'Participar de grupo de estudos relacionado à Gestão Pública ou áreas afins.',
    comprova: RELATORIO,
    fonte: 'Regulamento, art. 15, § 4º, IV',
    step: 15,
    max: 30,
  },
  {
    key: 'aac_pesquisa_ufmg',
    aliases: ['aac_5', 'aac_ic'],
    group: 'aac',
    tipo: 'aac',
    code: 'DCP 198',
    label: 'Pesquisa na UFMG',
    nomeOficial: 'Atividades de Pesquisa na UFMG',
    oQueE: 'Atividade de pesquisa desenvolvida na UFMG.',
    exemplo: 'Iniciação científica.',
    comprova: RELATORIO,
    fonte: 'Regulamento, art. 15, § 4º, V · slides da Coordenação',
    step: 30,
    max: 90,
  },
  {
    key: 'aac_pesquisa_bib',
    aliases: ['aac_6'],
    group: 'aac',
    tipo: 'aac',
    code: 'DCP 205',
    label: 'Pesquisa bibliográfica',
    oQueE: 'Aprofundamento teórico em tema de uma disciplina, orientado pelo docente dela e diferente do TCC.',
    comprova: 'Texto científico assinado por você e pelo responsável, com a avaliação do docente.',
    fonte: 'Regulamento, art. 15, § 4º, VI',
    step: 15,
    max: 30,
  },
  {
    key: 'aac_anais',
    aliases: ['aac_7'],
    group: 'aac',
    tipo: 'aac',
    code: 'DCP 206',
    label: 'Trabalho apresentado ou publicado em anais',
    oQueE: 'Apresentar trabalho (escrito, oral ou pôster) em evento científico de Gestão Pública ou áreas afins.',
    comprova: 'Comprovação de participação, em até 120 dias depois do evento.',
    fonte: 'Regulamento, art. 15, § 4º, VII',
    step: 15,
    max: 30,
    has120dDeadline: true,
  },
  {
    key: 'aac_periodico',
    aliases: ['aac_8', 'aac_publicacoes'],
    group: 'aac',
    tipo: 'aac',
    code: 'DCP 207',
    label: 'Artigo publicado em periódico científico',
    nomeOficial: 'Trabalho Publicado em Periódico Científico',
    oQueE: 'Publicar artigo em revista reconhecida no meio acadêmico, em Gestão Pública ou áreas afins.',
    comprova: 'Cópia da publicação ou a correspondência que comprova o aceite.',
    fonte: 'Regulamento, art. 15, § 4º, VIII',
    step: 15,
    max: 60,
  },
  {
    key: 'aac_vivencia',
    aliases: ['aac_9'],
    group: 'aac',
    tipo: 'aac',
    code: 'DCP 208',
    label: 'Estágio não obrigatório',
    nomeOficial: 'Vivência Profissional Complementar',
    oQueE: 'Atividades de gestão em órgãos públicos ou organizações não governamentais, como estágio de enriquecimento curricular.',
    comprova: 'Os documentos que autorizaram a atividade e o relatório final assinado por você e pelo responsável.',
    nota: 'A partir do 5º período. De 50 a 99h vale 1 crédito; de 100 a 149h, 2; de 150 a 199h, 3; acima de 200h, 4.',
    fonte: 'Regulamento, art. 15, § 4º, IX, e art. 33',
    step: 15,
    max: 60,
  },
  {
    key: 'aac_mobilidade',
    aliases: ['aac_10'],
    group: 'aac',
    tipo: 'aac',
    code: 'DCP 108 a 111',
    label: 'Intercâmbio',
    nomeOficial: 'Atividades de Mobilidade Estudantil I a IV',
    oQueE: 'Estudos feitos em intercâmbio com instituição conveniada com a UFMG, no Brasil ou fora, quando não equivalem a uma disciplina do curso.',
    comprova: 'Comprovante das atividades na instituição de destino, com carga horária e avaliação de desempenho.',
    nota: 'O afastamento precisa de autorização do Colegiado antes da viagem.',
    fonte: 'Regulamento, arts. 59 a 63 · PPC, seção 2.7',
    step: 15,
    max: 300,
  },
];

export interface SomaDasHoras {
  /** Horas que contam para a Formação em Extensão, até 300. */
  extensao: number;
  /** Horas das AAC que não contam como extensão, já dentro do teto global. */
  aac: number;
  /** Quanto das AAC de extensão entrou nas 300h de extensão (o que gasta o teto global). */
  aacDeExtensao: number;
  /** Quanto ainda cabe de AAC, de qualquer tipo, no teto global. */
  sobraDeAac: number;
  /** Horas dos dois Laboratórios, que não gastam o teto. */
  laboratorios: number;
}

/**
 * A soma de extensão e AAC, uma só para o site inteiro. Recebe os totais por modalidade
 * (o espelho cagp_calc_ext_aac_v1) e aplica as três regras que valem acima do teto de cada uma:
 *  1. Eventos I e II somam no máximo 60h (4 créditos);
 *  2. as 300h de extensão fecham com Laboratórios + AAC de extensão;
 *  3. todas as AAC juntas cabem em 300h, e as de extensão têm prioridade porque são obrigatórias.
 */
export function somaDasHoras(calc: Record<string, number>): SomaDasHoras {
  const h = (item: AcgItemDef) => Math.min(item.max, Math.max(0, Number(calc[item.key]) || 0));
  const eventosII = h(EXTENSION_ITEMS.find((i) => i.key === 'ext_eventos_ii')!);

  const laboratorios = EXTENSION_ITEMS.filter((i) => i.tipo === 'disciplina').reduce((s, i) => s + h(i), 0);
  const aacExt = EXTENSION_ITEMS.filter((i) => i.tipo === 'aac').reduce((s, i) => s + h(i), 0);
  const aacDeExtensao = Math.min(aacExt, HORAS_EXTENSAO - laboratorios, TETO_AAC);
  const extensao = laboratorios + aacDeExtensao;

  const demais = AAC_ITEMS.reduce(
    (s, i) => s + (i.key === 'aac_eventos_i' ? Math.min(h(i), TETO_EVENTOS - eventosII) : h(i)),
    0,
  );
  const aac = Math.min(demais, TETO_AAC - aacDeExtensao);
  return { extensao, aac, aacDeExtensao, sobraDeAac: TETO_AAC - aacDeExtensao - aac, laboratorios };
}
