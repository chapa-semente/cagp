# Arquitetura de Conteúdo Desacoplada: Guia Editorial & Manutenção

> **Como gerenciar notícias, comunicados, ementas e documentos oficiais em arquivos Markdown (`.md`) sem tocar no código do site.**  
> **Destinatários:** Membros da Gestão do CAGP, Redatores, Representantes Discentes e Agentes de IA  
> **Localização:** [`docs/playbooks/01-CONTENT-ARCHITECTURE-MIGRATION.md`](file:///home/gsathler/Nextcloud/Projects/cagp/docs/playbooks/01-CONTENT-ARCHITECTURE-MIGRATION.md)

---

## 1. Por Que Conteúdo Separado de Código?

No modelo anterior, adicionar uma notícia ou alterar uma regra curricular exigia editar arrays dentro de arquivos TypeScript (`src/lib/simulatedData.ts`) ou componentes `.astro`. Isso gerava risco de quebra de sintaxe e exigia conhecimento de programação.

Com a nova arquitetura do **Astro 7 Content Layer**, todo o conteúdo textual do Super App reside na pasta raiz [`/conteudo/`](file:///home/gsathler/Nextcloud/Projects/cagp/conteudo/):

```
conteudo/
├── noticias/       # Avisos, convocações de assembleia, editais de estágio, calourada
├── documentos/     # Estatuto do CAGP, Regimento Interno, PPC 2020, Regulamento
└── disciplinas/    # As 95 disciplinas curriculares (27 obrigatórias + 68 optativas)
```

Qualquer alteração em um arquivo Markdown nessa pasta é validada automaticamente por contratos Zod e compilada para o site estático instantaneamente.

---

## 2. Como Publicar uma Nova Notícia

Para publicar uma notícia ou comunicado, basta criar um novo arquivo `.md` dentro de `conteudo/noticias/` com o nome no formato `slug-da-noticia.md`.

### Modelo Completo de Notícia (`conteudo/noticias/exemplo-noticia.md`)

```markdown
---
title: "Título da Notícia com Chamada Objetiva"
slug: "titulo-da-noticia-com-chamada-objetiva"
category: "assembleia" # Opções: assembleia | estagio | academico | eventos
tag: "Assembleia Geral • Extraordinária"
tagColor: "burgundy"   # Opções: burgundy | gold | green | blue
summary: "Resumo em duas frases que aparecerá nos cartões do mural e nas redes sociais."
author: "Diretoria Executiva do CAGP"
readingTime: "3 min de leitura"
meta: "Auditório B102 • 18h30"
dateLabel: "Convocação • Gestão 2024-2025"
ctaLabel: "Acessar Pauta e Formulário"
ctaHref: "/sobre#governanca"
motif: "assembleia"     # Opções: assembleia | carreiras | calourada | congresso
highlights:
  - "Horário de início: 18h30 em primeira chamada e 18h45 em segunda."
  - "Pauta prioritária: Avaliação da fila do RU Noturno e transporte."
  - "Presença garante horas de Atividades Complementares (AAC)."
relatedLinks:
  - label: "Estatuto do CAGP"
    href: "/sobre#governanca"
  - label: "Portal da Transparência"
    href: "/transparencia"
relevantRoles:
  - "calouro"
  - "veterano"
  - "formando"
---

Aqui começa o texto completo da notícia. Você pode escrever livremente em Markdown:

### Primeiro Ponto de Pauta
Escreva parágrafos normais, use listas, links e destaques em negrito.

### Encaminhamentos Finais
Informações sobre como participar e onde enviar dúvidas.
```

---

## 3. Como Atualizar Documentos Oficiais (Regimento, PPC, Estatuto)

Os documentos oficiais com valor institucional vivem em `conteudo/documentos/`. Quando a Assembleia aprovar uma nova reforma do estatuto ou o Colegiado publicar uma resolução, siga este fluxo:

1. Localize o arquivo correspondente (ex: `conteudo/documentos/regimento-interno-cagp-ufmg.md`).
2. Atualize o cabeçalho (*frontmatter*) com a nova data de aprovação e órgão:
```yaml
---
titulo: "Regimento Interno do Centro Acadêmico de Gestão Pública (CAGP)"
instituicao: "Universidade Federal de Minas Gerais"
unidade_academica: "Faculdade de Filosofia e Ciências Humanas"
curso: "Gestão Pública"
entidade: "Centro Acadêmico de Gestão Pública (CAGP)"
data_aprovacao: "15 de Março de 2027"
documentos_revogados:
  - "Regimento Interno de 14 de outubro de 2024"
---
```
3. Edite os artigos, incisos e parágrafos diretamente no corpo do documento em Markdown.
4. O leitor editorial de documentos do site (`/documentos/[slug]`) gerará o sumário interativo (*Table of Contents*) automaticamente a partir dos títulos `#`, `##` e `###`.

---

## 4. Como Adicionar ou Modificar Disciplinas da Grade

As 95 disciplinas do curso estão em `conteudo/disciplinas/`.

### Modelo de Disciplina (`conteudo/disciplinas/dcp-032.md`)

```markdown
---
codigo: "DCP 032"
nome: "Fundamentos Da Analise Politica"
natureza: "obrigatoria" # Opções: obrigatoria | optativa
periodo: 1              # Obrigatório para disciplinas obrigatórias (1 a 10)
ch: 60                  # Carga horária em horas (ex: 30, 60, 90, 150)
modulo: "Geral"         # Módulo curricular (ex: Geral, Formação Básica, Setoriais)
preRequisitos: []       # Lista de códigos ou vazio: ["DCP 032", "EST 057"]
ementa: "Política, Poder, Estado e Mercado. Definição procedimental de Democracia..."
---

## Ementa Oficial

Política, Poder, Estado e Mercado. Definição procedimental de Democracia: custos internos, riscos externos, contextos decisórios...

### Bibliografia Básica
- SARTORI, Giovanni. A Teoria da Democracia Revisitada.
- PRZEWORSKI, Adam. Estado e Mercado.
```

---

## 5. Como Testar e Validar as Alterações

Após editar qualquer arquivo em `conteudo/`, você pode verificar se todos os campos estão corretos executando:

```bash
# 1. Checa tipos e contratos
npm run typecheck

# 2. Compila as páginas estáticas e confirma a criação das rotas
npm run build
```

Se algum campo obrigatório estiver faltando ou tiver um formato inválido (ex: carga horária como texto em vez de número), o Astro avisará com uma mensagem clara indicando o arquivo e a linha exata.
