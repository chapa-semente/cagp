// src/lib/noticias.ts — Do Markdown (conteudo/noticias/*.md) para o mural, a página e o alerta do início.
//
// O mural nasceu só com exemplos. Desde 17/11/2026 uma notícia pode ser de verdade: basta `real: true`
// no cabeçalho do Markdown. Quem lista notícia passa por aqui, para a real nunca sair com o rótulo de
// simulada e o exemplo nunca sair sem ele.
import type { CollectionEntry } from 'astro:content';
import type { SimulatedNewsItem } from './simulatedData';
import type { UserRole } from './storage/studentVault';
import { asset, route } from './paths';

export type Noticia = CollectionEntry<'noticias'>;

/** Link do próprio site ganha o caminho-base; link de fora passa como veio. */
const destino = (href: string) => (/^https?:\/\//.test(href) ? href : route(href));

export function itemDoMural(doc: Noticia): SimulatedNewsItem {
  const d = doc.data;
  return {
    id: doc.id,
    slug: d.slug,
    simulated: !d.real,
    category: d.category,
    tag: d.tag,
    tagColor: d.tagColor,
    title: d.title,
    summary: d.summary,
    body: d.summary,
    fullContent: d.highlights,
    highlights: d.highlights,
    author: d.author,
    readingTime: d.readingTime,
    meta: d.meta,
    dateLabel: d.dateLabel,
    ctaLabel: d.ctaLabel,
    ctaHref: d.ctaHref ? destino(d.ctaHref) : undefined,
    relatedLinks: d.relatedLinks.map((l) => ({ label: l.label, href: destino(l.href) })),
    relevantRoles: d.relevantRoles as UserRole[],
    motif: d.motif,
    capa: d.capa ? asset(d.capa) : undefined,
  };
}

/** Notícia de verdade vem antes dos exemplos; entre as reais, a mais nova primeiro. */
export function ordenarMural(docs: Noticia[]): Noticia[] {
  return [...docs].sort(
    (a, b) =>
      Number(b.data.real) - Number(a.data.real) ||
      (b.data.publicadoEm ?? '').localeCompare(a.data.publicadoEm ?? ''),
  );
}

/** A notícia que vira alerta no alto do início: real, com `alerta` e um evento que ainda não acabou. */
export function alertaDoDia(docs: Noticia[], agora = Date.now()): Noticia | undefined {
  return ordenarMural(docs).find(
    (d) => d.data.real && d.data.alerta && d.data.evento && Date.parse(d.data.evento.fim) > agora,
  );
}
