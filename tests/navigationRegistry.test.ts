import { describe, it, expect } from 'vitest';
import {
  AXIS_REGISTRY,
  getAxisById,
  getAxisByPath,
  getActiveItemId,
  normalizePathname,
} from '../src/lib/navigationRegistry';

describe('navigationRegistry — Catálogo Dinâmico dos 5 Eixos', () => {
  it('contém exatamente os 5 Eixos canônicos com numeração de 1 a 5', () => {
    expect(AXIS_REGISTRY).toHaveLength(5);
    expect(AXIS_REGISTRY.map((a) => a.number)).toEqual([1, 2, 3, 4, 5]);
    expect(AXIS_REGISTRY.map((a) => a.id)).toEqual(['hoje', 'curso', 'curriculo', 'acervo', 'cagp']);
  });

  it('normaliza caminhos relativos e remove index.html', () => {
    expect(normalizePathname('/')).toBe('/');
    expect(normalizePathname('/index.html')).toBe('/');
    expect(normalizePathname('/curso/index.html')).toBe('/curso');
    expect(normalizePathname('/percurso')).toBe('/percurso');
  });

  it('identifica corretamente o Eixo por rota', () => {
    expect(getAxisByPath('/')?.id).toBe('hoje');
    expect(getAxisByPath('/curso')?.id).toBe('curso');
    expect(getAxisByPath('/calouros')?.id).toBe('curso');
    expect(getAxisByPath('/pesquisa')?.id).toBe('curso');

    expect(getAxisByPath('/percurso')?.id).toBe('curriculo');
    expect(getAxisByPath('/acg')?.id).toBe('curriculo');
    expect(getAxisByPath('/estagio')?.id).toBe('curriculo');
    expect(getAxisByPath('/tcc')?.id).toBe('curriculo');
    expect(getAxisByPath('/optativas')?.id).toBe('curriculo');

    expect(getAxisByPath('/documentos')?.id).toBe('acervo');
    expect(getAxisByPath('/faq')?.id).toBe('acervo');

    expect(getAxisByPath('/sobre')?.id).toBe('cagp');
    expect(getAxisByPath('/gestao')?.id).toBe('cagp');
  });

  it('determina o item ativo correto dentro do Eixo', () => {
    const eixo3 = getAxisById('curriculo')!;
    expect(getActiveItemId(eixo3, '/acg')).toBe('curriculo-acg');
    expect(getActiveItemId(eixo3, '/estagio')).toBe('curriculo-estagio');
    expect(getActiveItemId(eixo3, '/percurso')).toBe('curriculo-overview');
  });

  it('todo eixo possui uma Visão Geral como primeiro item', () => {
    for (const axis of AXIS_REGISTRY) {
      expect(axis.items[0].isOverview).toBe(true);
      expect(axis.items[0].label).toBe('Visão Geral');
    }
  });
});
