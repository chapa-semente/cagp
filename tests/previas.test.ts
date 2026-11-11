// tests/previas.test.ts — Toda rota do site tem prévia de link (título, descrição, mensagem e banner gerado).
// Se este teste falhar por falta de imagem, rode `node scripts/generate-og.mjs`.
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import dados from '@/data/compartilhamento.json';
import { CHAPA_LEADERS } from '@/lib/chapaSementeData';
import { assinatura, faseDaEleicao, montarMensagem } from '@/lib/compartilhar';
import { AXIS_REGISTRY, normalizePathname } from '@/lib/navigationRegistry';
import { DOCUMENTOS_PEDIDOS, falaCurta, previaDaRota } from '@/lib/previas';
import { PROPOSTA_STOPS } from '@/lib/propostasTour';

const OG = join(process.cwd(), 'public/og');
const banner = (nome: string) => join(OG, `${nome}.jpg`);
// Páginas de apoio que usam o banner padrão de propósito.
const SEM_BANNER_PROPRIO = new Set(['/mais', '/configuracoes', '/mapa-do-site']);

const rotasDoRegistro = [...new Set(AXIS_REGISTRY.flatMap((a) => a.items.map((i) => normalizePathname(i.href.split('#')[0]))))];
const rotasNovas = [
  ...DOCUMENTOS_PEDIDOS.map((d) => `/doc/${d.id}`),
  ...PROPOSTA_STOPS.map((p) => `/propostas/${p.id}`),
  ...CHAPA_LEADERS.map((l) => `/chapa-semente/${l.id}`),
  ...Object.keys(dados.normas).map((slug) => `/documentos/${slug}`),
];

describe('prévias de link', () => {
  it.each([...rotasDoRegistro, ...rotasNovas])('%s tem título, descrição e banner gerado', (rota) => {
    const p = previaDaRota(rota);
    expect(p.titulo.length).toBeGreaterThan(10);
    expect(p.titulo.length).toBeLessThanOrEqual(75);
    expect(p.descricao.length).toBeGreaterThan(20);
    expect(p.mensagem.length).toBeGreaterThan(10);
    expect(existsSync(banner(p.imagem)), `falta public/og/${p.imagem}.jpg`).toBe(true);
    if (!SEM_BANNER_PROPRIO.has(rota)) expect(p.imagem, `${rota} caiu no banner padrão`).not.toBe('padrao');
  });

  it('nenhuma prévia de link passa de 300 KB (o WhatsApp descarta imagem pesada)', () => {
    const pesados = readdirSync(OG)
      .filter((f) => f.endsWith('.jpg'))
      .filter((f) => statSync(join(OG, f)).size > 300 * 1024);
    expect(pesados).toEqual([]);
  });

  it('o kit tem a arte do voto e uma arte de feed por proposta', () => {
    expect(existsSync(banner('kit/story-voto'))).toBe(true);
    for (const p of PROPOSTA_STOPS) expect(existsSync(banner(`kit/feed-proposta-${p.id}`))).toBe(true);
  });

  it('toda pessoa da chapa tem cargo curto e foco da foto para o banner', () => {
    for (const l of CHAPA_LEADERS) expect(dados.pessoas, `falta ${l.id}`).toHaveProperty(l.id);
  });

  it('o gancho de cada banner de página tem no máximo uma palavra na caneta', () => {
    for (const [rota, p] of Object.entries(dados.paginas)) {
      const gancho = ('gancho' in p.banner ? p.banner.gancho : []) as string[];
      const marcadas = gancho.join(' ').match(/\{[^}]+\}/g) ?? [];
      expect(marcadas.length, rota).toBeLessThanOrEqual(1);
    }
  });

  it('conteúdo de exemplo sai marcado como modelo', () => {
    for (const rota of ['/noticias', '/transparencia']) {
      const p = (dados.paginas as Record<string, { titulo: string; banner: { modelo?: boolean } }>)[rota];
      expect(p.banner.modelo, rota).toBe(true);
      expect(p.titulo.toLowerCase(), rota).toContain('modelo');
    }
    // Notícia de exemplo não ganha banner próprio.
    expect(previaDaRota('/noticias/qualquer-noticia').imagem).toBe('p-noticias');
  });

  it('a fala entre aspas da pessoa é a fala literal que o tour das propostas já usa', () => {
    for (const l of CHAPA_LEADERS) {
      const fala = falaCurta(l.id);
      const mensagem = previaDaRota(`/chapa-semente/${l.id}`).mensagem;
      if (fala) expect(mensagem).toContain(`“${fala}”`);
      else expect(mensagem).not.toContain('“');
    }
  });
});

describe('textos de compartilhar', () => {
  const ANTES = Date.parse('2026-11-11T12:00:00-03:00');
  const VESPERA = Date.parse('2026-11-25T08:00:00-03:00');
  const DEPOIS = Date.parse('2026-11-27T08:00:00-03:00');

  it('a mensagem é corpo, link e a chamada de voto, nessa ordem', () => {
    const linhas = montarMensagem({ corpo: '📄 *TCE com convênio*', url: 'https://exemplo.test/doc/tce', tom: 'util' }, 'antes', ANTES).split('\n');
    expect(linhas.slice(0, 3)).toEqual(['📄 *TCE com convênio*', 'https://exemplo.test/doc/tce', '']);
    expect(linhas[3]).toContain('feito pela Chapa 2 · Semente');
    expect(linhas[4]).toContain('Vote Chapa 2! Faz o S!');
  });

  it('antes da eleição toda mensagem chama pro voto, com o número, a data e o lugar', () => {
    expect(faseDaEleicao(ANTES)).toBe('antes');
    for (const tom of ['util', 'convite', 'voto'] as const) {
      const fim = assinatura(tom, 'antes', ANTES);
      expect(fim).toContain('Vote Chapa 2! Faz o S!');
      expect(fim).toContain('25 e 26/11');
      expect(fim).toContain('sala do CAGP');
    }
  });

  it('o debate de 24/11 aparece até o dia do debate e some depois', () => {
    expect(assinatura('util', 'antes', ANTES)).toContain('Debate das chapas: 24/11');
    expect(assinatura('util', 'antes', VESPERA)).not.toContain('Debate');
  });

  it('depois da eleição nenhum texto pede voto nem cita a data', () => {
    expect(faseDaEleicao(DEPOIS)).toBe('depois');
    for (const tom of ['util', 'convite', 'voto'] as const) {
      const fim = assinatura(tom, 'depois', DEPOIS);
      expect(fim).not.toMatch(/25 e 26|vot|Chapa 2|Faz o S|Debate/i);
    }
  });

  it('nenhuma assinatura diz que o site fica "mesmo se a chapa perder"', () => {
    for (const fase of ['antes', 'dia', 'depois'] as const)
      for (const tom of ['util', 'convite', 'voto'] as const)
        expect(assinatura(tom, fase, ANTES)).not.toMatch(/perder|independente|código aberto|github/i);
  });

  it('a mensagem de cada página abre com o emoji do assunto; título e descrição da prévia ficam sem emoji', () => {
    const EMOJI = /\p{Extended_Pictographic}/u;
    for (const rota of Object.keys(dados.paginas)) {
      const p = previaDaRota(rota);
      expect(EMOJI.test(p.mensagem), rota).toBe(true);
      expect(EMOJI.test(p.titulo + p.descricao), rota).toBe(false);
    }
  });
});
