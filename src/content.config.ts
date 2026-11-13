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

// Guias da vida na UFMG (.md em /conteudo/ufmg/), reescritos a partir do Viver UFMG.
// Cada arquivo é uma página (o nome do arquivo é o endereço). Todo fato vem das páginas listadas em
// `fontes`; ao conferir de novo, troque `consultadoEm`. Não escreva aqui valor, prazo ou contato que a
// fonte não dá.
const ufmg = defineCollection({
  loader: glob({ pattern: '[!R]*.md', base: './conteudo/ufmg' }),
  schema: z.object({
    titulo: z.string(),
    /** Uma ou duas linhas sob o título. */
    resumo: z.string(),
    /** Descrição para buscadores e para a prévia do navegador. */
    descricao: z.string(),
    fontes: z.array(z.object({ nome: z.string(), url: z.string().url() })).min(1),
    /** Data em que as fontes foram lidas (AAAA-MM-DD). */
    consultadoEm: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    /** Contatos que viram botão de ligar ou de escrever. */
    contatos: z.array(z.object({
      nome: z.string(),
      detalhe: z.string().optional(),
      telefones: z.array(z.string()).default([]),
      email: z.string().optional(),
      url: z.string().url().optional(),
      urlRotulo: z.string().optional(),
    })).default([]),
    /** Onde os contatos aparecem: no alto (emergência) ou depois do texto. */
    contatosNoTopo: z.boolean().default(false),
    contatosTitulo: z.string().default('Com quem falar'),
    /** Vídeos do YouTube: só carregam quando a pessoa toca. */
    videos: z.array(z.object({ id: z.string(), titulo: z.string(), de: z.string() })).default([]),
    /** Imagens em public/images/ufmg/ (mapas). */
    imagens: z.array(z.object({ arquivo: z.string(), titulo: z.string(), alt: z.string(), original: z.string().url() })).default([]),
    /** Liga o campo de filtro sobre as listas da página (siglas, espaços culturais). */
    filtro: z.string().optional(),
    /** O que a lista filtrada conta ("siglas", "espaços"): aparece no adesivo da contagem. */
    filtroUnidade: z.string().default('itens'),
    /** As listas com "-" viram linhas de ficha (sigla à esquerda, nome à direita). */
    linhas: z.boolean().default(false),
    /** Uma palavra do título escrita na caneta. Deixe sem em assunto delicado. */
    caneta: z.string().optional(),
    /** As três linhas que abrem a página. Só o que o texto abaixo já diz. */
    resumoRapido: z.array(z.object({ rotulo: z.string(), texto: z.string() })).max(3).default([]),
    /** O cartão de abertura em camadas: um número grande ou uma frase, tirados do próprio texto da página.
     *  `numero: "lista"` conta sozinho os itens da maior lista da página (siglas, espaços). */
    destaque: z.object({
      rotulo: z.string().optional(),
      numero: z.string().optional(),
      unidade: z.string().optional(),
      frase: z.string(),
      etiquetasTitulo: z.string().optional(),
      etiquetas: z.array(z.string()).max(6).default([]),
      cor: z.enum(['roxo', 'petroleo']).default('roxo'),
    }).optional(),
    /** Os contatos sobem para logo depois do resumo (quando o contato é a própria ação). */
    acaoPrimeiro: z.boolean().default(false),
    /** Cada "## seção" vira uma aba (máx. 4), com estes rótulos curtos. O que vem depois de uma linha "***" fica fora das abas. */
    abas: z.array(z.string()).max(4).default([]),
    /** Páginas vizinhas mostradas no fim (endereços do site, ex.: "/carteirinha"). Até 3. */
    vejaTambem: z.array(z.string()).max(3).default([]),
    /** Uma frase a mais no bloco "De onde vem esta página" (ex.: o que a fonte não informa). */
    notaDaFonte: z.string().optional(),
  }),
});

export const collections = { disciplinas, noticias, normas, documentosOficiais, ufmg };
