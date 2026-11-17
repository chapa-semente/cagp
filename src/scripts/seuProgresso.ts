// seuProgresso.ts — Preenche a faixa "seu progresso" dos guias (SeuProgresso.astro) com a conta do
// painel de /meu-curso. Lê o cofre direto do localStorage, sem zod nem React, para o guia não
// carregar nada pesado só por causa de uma linha (PRODUCT.md › Leveza).
import { contaDoCurso } from '@/lib/contaDoCurso';
import type { CustomCourse } from '@/lib/storage/studentVault';

const FMT = new Intl.NumberFormat('pt-BR');

function ler(chave: string): unknown {
  try {
    const cru = localStorage.getItem(chave);
    return cru ? JSON.parse(cru) : null;
  } catch {
    return null;
  }
}
const lista = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []);
const numeros = (v: unknown): Record<string, number> => {
  const saida: Record<string, number> = {};
  if (v && typeof v === 'object' && !Array.isArray(v)) {
    for (const [k, n] of Object.entries(v)) if (typeof n === 'number' && Number.isFinite(n)) saida[k] = n;
  }
  return saida;
};

function textoDe(tema: string): string | null {
  const grade = (ler('cagp_minha_grade_v1') ?? {}) as { savedCourses?: unknown; cursando?: unknown };
  const cursadas = lista(grade.savedCourses);
  const cursando = lista(grade.cursando);
  const custom = (ler('cagp_custom_curriculum_v1') ?? {}) as { assignedCourses?: unknown };
  const naGrade = (Array.isArray(custom.assignedCourses) ? custom.assignedCourses : []).filter(
    (c): c is CustomCourse => Boolean(c) && typeof c.code === 'string' && typeof c.ch === 'number',
  );
  const horasCruas = numeros(ler('cagp_minhas_horas_v1'));
  const calc = numeros(ler('cagp_calc_ext_aac_v1'));
  const conta = contaDoCurso({
    cursadas,
    naGrade,
    horas: { optativasH: horasCruas.optativasH ?? 0, livreH: horasCruas.livreH ?? 0 },
    calc,
  });
  const grupo = (id: string) => conta.grupos.find((g) => g.id === id)!;
  const situacao = (codigo: string) => (cursadas.includes(codigo) ? 'cursada' : cursando.includes(codigo) ? 'em curso' : 'falta');

  switch (tema) {
    case 'horas':
      return conta.ext + conta.aac > 0 ? `Extensão: ${FMT.format(conta.ext)} de 300h. AAC: ${FMT.format(conta.aac)} de 300h.` : null;
    case 'estagio': {
      const g = grupo('est');
      if (g.feito === 0 && !cursando.some((c) => c === 'DCP 135' || c === 'DCP 136')) return null;
      return `Estágio obrigatório: ${FMT.format(g.feito)} de ${FMT.format(g.total)}h. DCP 135 ${situacao('DCP 135')}, DCP 136 ${situacao('DCP 136')}.`;
    }
    case 'tcc': {
      if (situacao('DCP 089') === 'falta' && situacao('DCP 137') === 'falta') return null;
      return `Projeto do TCC (DCP 089): ${situacao('DCP 089')}. TCC (DCP 137): ${situacao('DCP 137')}.`;
    }
    case 'optativas': {
      const g = grupo('op');
      return g.feito > 0 ? `Optativas gerais: ${FMT.format(g.feito)} de ${FMT.format(g.total)}h.` : null;
    }
    case 'grade': {
      if (conta.cursado === 0 && cursando.length === 0) return null;
      const ob = cursadas.filter((c) => /^[A-Z]{3} \d{3}$/.test(c)).length;
      return `${ob} ${ob === 1 ? 'disciplina marcada' : 'disciplinas marcadas'}${cursando.length ? `, ${cursando.length} em curso` : ''}. Faltam ${FMT.format(conta.falta)}h pra se formar.`;
    }
    default:
      return null;
  }
}

function preencher(): void {
  document.querySelectorAll<HTMLElement>('[data-seu-progresso]').forEach((faixa) => {
    const alvo = faixa.querySelector<HTMLElement>('[data-sp-texto]');
    if (!alvo) return;
    alvo.dataset.spConvite ??= alvo.textContent ?? '';
    alvo.textContent = textoDe(faixa.dataset.seuProgresso ?? '') ?? alvo.dataset.spConvite;
  });
}

preencher();
document.addEventListener('astro:page-load', preencher);
window.addEventListener('cagp:vault-updated', preencher);
