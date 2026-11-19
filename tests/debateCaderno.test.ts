// tests/debateCaderno.test.ts — Integridade dos 6 PDFs, somas auditadas, panorama macro, blindagem editorial e roteamento.
import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  DEBATE_BOLETINS,
  DEBATE_CARTA_2027_COMPARATIVO,
  DEBATE_DIVIDA_CREDORES,
  DEBATE_LEITURA_2025,
  DEBATE_PLACAR_2025,
  DEBATE_POSTS_ASSUNTO,
  DEBATE_RELATORIOS,
  DEBATE_RETORNO_23,
  DEBATE_TEMAS_MACRO,
} from '@/lib/debateCadernoData';
import { getItemByPath } from '@/lib/navigationRegistry';

const root = path.resolve(__dirname, '..');

describe('Análise da gestão (/chapa-semente/debate)', () => {
  it('publica os 6 PDFs não vazios em public/documentos/debate/', () => {
    const todos = [...DEBATE_BOLETINS, ...DEBATE_RELATORIOS];
    expect(todos).toHaveLength(6);
    for (const pdf of todos) {
      expect(pdf.href).toMatch(/^\/documentos\/debate\/[\w-]+\.pdf$/);
      const st = statSync(path.join(root, 'public', pdf.href.slice(1)));
      expect(st.size, pdf.href).toBeGreaterThan(10_000);
    }
  });

  it('mantém somas literais de promessas (33 / 39 / 23), posts (75) e dívida (R$ 4.505,50)', () => {
    const totalPlacar = DEBATE_PLACAR_2025.reduce((acc, r) => acc + r.quantas, 0);
    expect(totalPlacar).toBe(33);

    const totalLeitura = DEBATE_LEITURA_2025.reduce((acc, r) => acc + r.total, 0);
    expect(totalLeitura).toBe(33);
    for (const r of DEBATE_LEITURA_2025) {
      expect(r.fezMostrou + r.metade + r.dizFez + r.naoApareceu, r.leitura).toBe(r.total);
    }

    const totalPosts = DEBATE_POSTS_ASSUNTO.reduce((acc, p) => acc + p.valor, 0);
    expect(totalPosts).toBe(75);

    const total2025 = DEBATE_CARTA_2027_COMPARATIVO.reduce((acc, c) => acc + c.c2025, 0);
    const total2027 = DEBATE_CARTA_2027_COMPARATIVO.reduce((acc, c) => acc + c.c2027, 0);
    expect(total2025).toBe(33);
    expect(total2027).toBe(39);

    const totalRetorno = DEBATE_RETORNO_23.reduce((acc, r) => acc + r.quantas, 0);
    expect(totalRetorno).toBe(23);

    const totalDivida = DEBATE_DIVIDA_CREDORES.reduce((acc, c) => acc + c.valorNum, 0);
    expect(totalDivida).toBeCloseTo(4505.5, 2);

    const direcaoAtual = DEBATE_DIVIDA_CREDORES.filter((c) => c.cargo2026 !== 'Não integra a gestão').reduce(
      (acc, c) => acc + c.valorNum,
      0,
    );
    expect(direcaoAtual).toBeCloseTo(3505.5, 2);
    expect((direcaoAtual / totalDivida) * 100).toBeCloseTo(77.8, 1);
  });

  it('mantém panorama macro em 4 temas sem caderno de perguntas, sem registro interno e sem exposição pessoal', () => {
    expect(DEBATE_TEMAS_MACRO).toHaveLength(4);

    const rep = DEBATE_TEMAS_MACRO.find((item) => item.id === 'representacao');
    expect(rep).toBeDefined();
    const textoRep = `${rep!.titulo} ${rep!.dadoCurto} ${rep!.panorama} ${rep!.semente}`;
    expect(textoRep, 'representacao: sem nomes pessoais').not.toMatch(/nina|queirolo|guilherme|nunes|martins/i);
    expect(textoRep, 'representacao: sem print nem conversa privada').not.toMatch(/print|captura de tela|whatsapp privado/i);

    const dataSrc = readFileSync(path.join(root, 'src/lib/debateCadernoData.ts'), 'utf-8');
    const pageSrc = readFileSync(path.join(root, 'src/pages/chapa-semente/debate.astro'), 'utf-8');
    for (const [label, src] of [
      ['src/lib/debateCadernoData.ts', dataSrc],
      ['src/pages/chapa-semente/debate.astro', pageSrc],
    ] as const) {
      expect(src, `${label}: sem registro interno`).not.toMatch(/registro interno/i);
      expect(src, `${label}: sem relato de gestão`).not.toMatch(/relato de gestão/i);
      expect(src, `${label}: sem Caderno do Debate`).not.toMatch(/caderno do debate/i);
      expect(src, `${label}: sem 5 perguntas`).not.toMatch(/5 perguntas/i);
    }
  });

  it('registra /chapa-semente/debate na navegação, libera bypass de tour e cobre subpastas no aviso offline de PDF', () => {
    const found = getItemByPath('/chapa-semente/debate');
    expect(found?.axis.id).toBe('chapa');
    expect(found?.item.id).toBe('chapa-debate');

    const baseLayout = readFileSync(path.join(root, 'src/layouts/BaseLayout.astro'), 'utf-8');
    expect(baseLayout).toContain('var TOUR_V = 5;');
    expect(baseLayout).toMatch(/chapa-semente\\\/\(plano\|debate\)/);
    expect(baseLayout).toContain('/\\/documentos\\/.+\\.(?!html?$)[a-z0-9]+$/i');

    const swManifest = readFileSync(path.join(root, 'scripts/generate-sw-manifest.mjs'), 'utf-8');
    expect(swManifest).toContain('/^documentos\\/.+\\.[a-z0-9]+$/i');
  });
});
