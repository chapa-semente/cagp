// Garante integridade dos números consolidados do Plano de Execução e dos 14 resumos por proposta.
import { describe, expect, it } from 'vitest';
import { PLANO_PROPOSTAS, resumoExecucaoDaProposta } from '@/lib/planoExecucao';
import {
  PLANO_AUTOCRITICA,
  PLANO_CAIXA_MENSAL,
  PLANO_CALOURADA_CONJUNTA,
  PLANO_FUMP_40,
  PLANO_LINHA_TEMPO,
  PLANO_NUMEROS_DESTAQUE,
  PLANO_ORCAMENTO_CENARIOS,
  PLANO_ORCAMENTO_COMPARATIVO,
  PLANO_PRIORIDADES_CORTE,
  PLANO_REGRAS_EXECUCAO,
  PLANO_RESERVAS,
} from '@/lib/planoResumoData';

describe('resumo do Plano de Execução', () => {
  it('gera resumo completo para cada uma das 14 propostas', () => {
    expect(PLANO_PROPOSTAS).toHaveLength(14);
    for (let id = 1; id <= 14; id++) {
      const r = resumoExecucaoDaProposta(id);
      expect(r, `proposta ${id}`).toBeDefined();
      expect(r!.tituloPlano.length, `tituloPlano ${id}`).toBeGreaterThan(5);
      expect(r!.impacto.length, `impacto ${id}`).toBeGreaterThan(20);
      expect(r!.custo.length, `custo ${id}`).toBeGreaterThan(2);
      expect(r!.quemResponde.length, `quemResponde ${id}`).toBeGreaterThan(3);
      expect(r!.primeiraData.length, `primeiraData ${id}`).toBeGreaterThan(2);
      expect(r!.primeiraEntrega.length, `primeiraEntrega ${id}`).toBeGreaterThan(5);
      expect(r!.boletimPdf).toMatch(/\.pdf$/);
    }
  });

  it('mantém piso de caixa acima da reserva de funcionamento (R$ 4.500,00) em todos os meses do cenário regular', () => {
    expect(PLANO_CAIXA_MENSAL.length).toBeGreaterThanOrEqual(11);
    for (const mes of PLANO_CAIXA_MENSAL) {
      expect(mes.saldoNum, mes.mes).toBeGreaterThanOrEqual(4500);
    }
  });

  it('expõe os 3 cenários financeiros sem omitir receita, despesa ou saldo final', () => {
    expect(Object.keys(PLANO_ORCAMENTO_CENARIOS).sort()).toEqual(['otimista', 'pessimista', 'regular']);
    for (const cen of Object.values(PLANO_ORCAMENTO_CENARIOS)) {
      expect(cen.receitas).toMatch(/^R\$\s/);
      expect(cen.despesas).toMatch(/^R\$\s/);
      expect(cen.saldoFinal).toMatch(/^R\$\s/);
    }
  });

  it('trata calourada conjunta como possibilidade e preserva regra de 40% FUMP e autocrítica', () => {
    expect(PLANO_CALOURADA_CONJUNTA.tipo).toBe('possibilidade');
    expect(PLANO_CALOURADA_CONJUNTA.selo).toBe('Possibilidade');
    expect(PLANO_FUMP_40.desconto).toBe('40%');
    expect(PLANO_AUTOCRITICA.texto).toContain('6 das 14');
    expect(PLANO_NUMEROS_DESTAQUE).toHaveLength(3);
    expect(PLANO_LINHA_TEMPO.some((m) => m.cemDias)).toBe(true);
    expect(PLANO_ORCAMENTO_COMPARATIVO.length).toBeGreaterThanOrEqual(10);
    expect(PLANO_RESERVAS).toHaveLength(4);
    expect(PLANO_REGRAS_EXECUCAO).toHaveLength(7);
    expect(PLANO_PRIORIDADES_CORTE).toHaveLength(3);
  });
});
