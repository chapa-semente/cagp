import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Coleção de 95 Disciplinas Curriculares do PPC 2020 (Arquivos .md em /conteudo/disciplinas/)
const disciplinas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './conteudo/disciplinas' }),
  schema: z.object({
    codigo: z.string(),
    nome: z.string(),
    natureza: z.enum(['obrigatoria', 'optativa']),
    periodo: z.number().optional(),
    ch: z.number(),
    ementa: z.string(),
    preRequisitos: z.array(z.string()).default([]),
    modulo: z.string().optional(),
  }),
});

// Coleção Editorial de Notícias, Editais e Avisos (.md em /conteudo/noticias/)
const noticias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './conteudo/noticias' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.enum(['assembleia', 'estagio', 'academico', 'eventos']),
    tag: z.string(),
    tagColor: z.enum(['burgundy', 'gold', 'green', 'blue']),
    summary: z.string(),
    author: z.string(),
    readingTime: z.string(),
    meta: z.string(),
    dateLabel: z.string(),
    ctaLabel: z.string(),
    ctaHref: z.string().optional(),
    motif: z.enum(['assembleia', 'carreiras', 'calourada', 'congresso']),
    highlights: z.array(z.string()).default([]),
    relatedLinks: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
      })
    ).default([]),
    relevantRoles: z.array(z.string()).default([]),
  }),
});

// Normas e Atos Institucionais (.json em src/content/normas/)
const normas = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/normas' }),
  schema: z.object({
    titulo: z.string(),
    orgao: z.string(),
    ano: z.number(),
    resumo: z.string(),
    arquivo: z.string().optional(),
  }),
});

// Documentos Oficiais Transcritos (.md em /conteudo/documentos/)
const documentosOficiais = defineCollection({
  loader: glob({ pattern: '[!R]*.md', base: './conteudo/documentos' }),
  schema: z.record(z.string(), z.any()),
});

export const collections = { disciplinas, noticias, normas, documentosOficiais };
