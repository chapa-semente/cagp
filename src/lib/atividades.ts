// atividades.ts — Dono único das 600h (extensão + AAC), desde 12/11/2026.
//
// Antes, um curso feito se registrava em três lugares: salvo em /cursos, somado na calculadora de
// /acg e cadastrado como certificado com prazo. Agora é uma lista só (cagp_atividades_v1): cada
// atividade tem modalidade, horas, data e situação, e dela saem a soma e o prazo de 120 dias.
//
// cagp_calc_ext_aac_v1 continua existindo como ESPELHO dos totais por modalidade, porque a home,
// Seu perfil, a formatura e o mapa leem dali. Só este arquivo escreve nele.
import { EXTENSION_ITEMS, AAC_ITEMS, type AcgItemDef } from '@/components/features/acg/calculator/acgCatalog';
import { getVaultItem, setVaultItem, type Atividade, type VaultData } from '@/lib/storage/studentVault';

export type { Atividade };
export type Situacao = Atividade['situacao'];
export type EstadoAtividades = VaultData<'cagp_atividades_v1'>;

export const MODALIDADES: AcgItemDef[] = [...EXTENSION_ITEMS, ...AAC_ITEMS];
const POR_CHAVE = new Map(MODALIDADES.map((m) => [m.key, m]));
export const modalidade = (chave: string): AcgItemDef | undefined => POR_CHAVE.get(chave);

export const SITUACOES: { id: Situacao; nome: string }[] = [
  { id: 'quero', nome: 'Quero fazer' },
  { id: 'feita', nome: 'Feita' },
  { id: 'protocolada', nome: 'Protocolada' },
];

const DIA = 86_400_000;
const PRAZO_DIAS = 120;

/** Horas que contam por modalidade: o que foi digitado antes + atividades feitas, até o teto de cada uma. */
export function horasPorModalidade(estado: EstadoAtividades): Record<string, number> {
  const total: Record<string, number> = {};
  for (const m of MODALIDADES) {
    const lancadas = estado.itens
      .filter((a) => a.mod === m.key && a.soma && a.situacao !== 'quero')
      .reduce((s, a) => s + a.horas, 0);
    total[m.key] = Math.min(m.max, Math.max(0, (Number(estado.base[m.key]) || 0) + lancadas));
  }
  return total;
}

/** Dias que faltam para protocolar (negativo = venceu). null quando a atividade não tem prazo correndo. */
export function diasParaProtocolar(a: Atividade, hoje = new Date()): number | null {
  if (a.situacao !== 'feita' || !a.data || !modalidade(a.mod)?.has120dDeadline) return null;
  const emissao = new Date(`${a.data}T00:00:00`);
  if (Number.isNaN(emissao.getTime())) return null;
  const base = new Date(hoje);
  base.setHours(0, 0, 0, 0);
  return Math.ceil((emissao.getTime() + PRAZO_DIAS * DIA - base.getTime()) / DIA);
}

/** Atividades com prazo correndo, da mais urgente para a mais folgada. */
export function prazosAbertos(estado: EstadoAtividades, hoje = new Date()): { atividade: Atividade; dias: number }[] {
  return estado.itens
    .map((atividade) => ({ atividade, dias: diasParaProtocolar(atividade, hoje) }))
    .filter((p): p is { atividade: Atividade; dias: number } => p.dias !== null)
    .sort((a, b) => a.dias - b.dias);
}

function gravar(estado: EstadoAtividades): EstadoAtividades {
  setVaultItem('cagp_atividades_v1', estado);
  setVaultItem('cagp_calc_ext_aac_v1', horasPorModalidade(estado));
  return estado;
}

const novoId = () => `atv-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

/** Modalidade provável de um certificado da lista antiga, que só guardava um rótulo livre. */
function modalidadeDoRotulo(rotulo: string): string {
  if (/anais/i.test(rotulo)) return 'aac_anais';
  if (/curso|enap|escola/i.test(rotulo)) return 'ext_ensino_inter';
  return 'aac_eventos_i';
}

/**
 * Traz os três registros antigos para a lista, uma vez por aparelho, sem mudar o total de ninguém:
 * - totais digitados na calculadora viram `base` (horas lançadas antes);
 * - certificados com prazo viram atividades feitas que não somam de novo (`soma: false`);
 * - cursos salvos em /cursos viram "quero fazer" (o certificado gêmeo que /cursos criava é descartado,
 *   porque a data dele era a do dia em que a pessoa salvou o curso, não a do certificado).
 */
function migrar(): EstadoAtividades {
  const calc = getVaultItem('cagp_calc_ext_aac_v1');
  const base: Record<string, number> = {};
  for (const m of MODALIDADES) {
    const chave = [m.key, ...(m.aliases ?? [])].find((k) => calc[k] !== undefined);
    const v = chave ? Number(calc[chave]) || 0 : 0;
    if (v > 0) base[m.key] = Math.min(m.max, v);
  }

  const agora = new Date().toISOString();
  const itens: Atividade[] = [];
  for (const c of getVaultItem('cagp_aac_120d_certs_v1')) {
    if (c.id.startsWith('curso-')) continue;
    itens.push({
      id: novoId(),
      titulo: c.title,
      mod: modalidadeDoRotulo(c.mod),
      horas: Math.min(300, Math.max(0, c.hours)),
      data: c.date,
      situacao: 'feita',
      soma: false,
      criadaEm: agora,
    });
  }
  for (const c of getVaultItem('cagp_cursos_enap_salvos_v1')) {
    itens.push({
      id: `curso-${c.id}`,
      titulo: c.title,
      mod: 'ext_ensino_inter',
      horas: Math.min(300, Math.max(0, c.hours)),
      situacao: 'quero',
      soma: true,
      criadaEm: c.addedAt || agora,
    });
  }
  return gravar({ itens, base, migrado: true });
}

export function lerAtividades(): EstadoAtividades {
  const estado = getVaultItem('cagp_atividades_v1');
  if (typeof window === 'undefined' || estado.migrado) return estado;
  return migrar();
}

export function adicionarAtividade(nova: Omit<Atividade, 'id' | 'criadaEm' | 'soma'> & { id?: string }): EstadoAtividades {
  const estado = lerAtividades();
  const id = nova.id ?? novoId();
  if (estado.itens.some((a) => a.id === id)) return estado;
  const atividade: Atividade = { ...nova, id, soma: true, criadaEm: new Date().toISOString() };
  return gravar({ ...estado, itens: [atividade, ...estado.itens] });
}

export function atualizarAtividade(id: string, mudanca: Partial<Omit<Atividade, 'id' | 'criadaEm'>>): EstadoAtividades {
  const estado = lerAtividades();
  return gravar({ ...estado, itens: estado.itens.map((a) => (a.id === id ? { ...a, ...mudanca } : a)) });
}

export function removerAtividade(id: string): EstadoAtividades {
  const estado = lerAtividades();
  return gravar({ ...estado, itens: estado.itens.filter((a) => a.id !== id) });
}

/** Ajusta as horas lançadas antes (calculadora antiga) de uma modalidade. Zero apaga a linha. */
export function definirBase(chave: string, horas: number): EstadoAtividades {
  const estado = lerAtividades();
  const base = { ...estado.base };
  const teto = modalidade(chave)?.max ?? 300;
  const v = Math.min(teto, Math.max(0, Math.round(horas)));
  if (v > 0) base[chave] = v;
  else delete base[chave];
  return gravar({ ...estado, base });
}

/** Id estável de um curso do catálogo de /cursos na lista. */
export const idDoCurso = (cursoId: string) => `curso-${cursoId}`;
