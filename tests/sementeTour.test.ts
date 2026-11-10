// Garante que o tour obrigatório cobre todos os integrantes e que cada spotlight tem alvo na página certa.
// Os alvos são lidos do código-fonte (o site é estático): se alguém renomear ou mover a ferramenta,
// este teste quebra antes do spotlight cair num recorte vazio.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { CHAPA_LEADERS } from '@/lib/chapaSementeData';
import { TOUR_ORDER, TOUR_STOPS, type TourLeaderId } from '@/lib/sementeTour';

const root = path.resolve(__dirname, '..');
const read = (p: string) => readFileSync(path.join(root, p), 'utf-8');

/** Onde o alvo de cada parada mora no código. */
const TARGET_SOURCES: Record<TourLeaderId, string> = {
  gabriel: 'src/components/features/guias/DocumentosMaisPedidos.astro',
  larissa: 'src/pages/ouvidoria.astro',
  livia: 'src/pages/formatura.astro',
  mariana: 'src/pages/pesquisa.astro',
  nilo: 'src/pages/pesquisa.astro',
  joao: 'src/pages/noticias/index.astro',
  vitoria: 'src/pages/permanencia.astro',
  klaus: 'src/pages/transparencia.astro',
  italo: 'src/components/features/cursos/CursosCatalogHub.tsx',
  lara: 'src/pages/estagio.astro',
  paloma: 'src/components/features/home/HomeCampusStatusWidget.tsx',
  alice: 'src/pages/calouros.astro',
};

describe('tour da Chapa Semente', () => {
  it('tem uma parada para cada integrante da chapa', () => {
    const ids = CHAPA_LEADERS.map((l) => l.id).sort();
    expect(Object.keys(TOUR_STOPS).sort()).toEqual(ids);
  });

  it('toda ordem por perfil passa por todas as pessoas, sem repetir', () => {
    for (const order of Object.values(TOUR_ORDER)) {
      expect(new Set(order).size).toBe(CHAPA_LEADERS.length);
      expect([...order].sort()).toEqual(CHAPA_LEADERS.map((l) => l.id).sort());
    }
  });

  it('cada alvo de spotlight existe no arquivo da página', () => {
    for (const [id, stop] of Object.entries(TOUR_STOPS) as [TourLeaderId, (typeof TOUR_STOPS)[TourLeaderId]][]) {
      expect(stop.target.includes(','), `${id}: um alvo por parada`).toBe(false);
      const src = read(TARGET_SOURCES[id]);
      const needle = stop.target.startsWith('#')
        ? `id="${stop.target.slice(1)}"`
        : stop.target.replace(/^\[/, '').replace(/\]$/, '');
      expect(src.includes(needle), `${id}: ${stop.target} em ${TARGET_SOURCES[id]}`).toBe(true);
    }
  });

  it('tem foto otimizada para cada integrante', () => {
    for (const id of Object.keys(TOUR_STOPS)) {
      expect(() => readFileSync(path.join(root, `public/images/chapa/tour/${id}.webp`))).not.toThrow();
      expect(() => readFileSync(path.join(root, `public/images/chapa/tour/${id}-thumb.webp`))).not.toThrow();
    }
  });

  it('mantém o texto curto (no máximo ~30 palavras entre dor e resposta)', () => {
    for (const stop of Object.values(TOUR_STOPS)) {
      const words = `${stop.hook} ${stop.answer}`.split(/\s+/).length;
      expect(words, stop.leaderId).toBeLessThanOrEqual(32);
    }
  });
});

describe('service worker', () => {
  it('trata o fetch de página do ClientRouter como página (rede primeiro), não como asset', () => {
    const sw = read('public/sw.js');
    expect(sw).toMatch(/function isPageRequest/);
    expect(sw).toMatch(/if \(!isFile && isPageRequest\(req, url\)\)/);
  });
});
