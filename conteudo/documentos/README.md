# Documentos Oficiais do Curso — Transcrições

Transcrições em Markdown dos documentos normativos oficiais do curso de Gestão Pública (FAFICH/UFMG) e do CAGP. Elas existem para **consulta rápida por pessoas e agentes** ao redigir o conteúdo do site.

> [!IMPORTANT]
> A **fonte oficial é sempre o PDF** publicado em `documentos/` (raiz do projeto). Em caso de divergência, o PDF prevalece. Ao citar um documento numa página, linke o PDF (`documentos/<nome>.pdf`), nunca o `.md`.

## Correspondência transcrição ↔ PDF

| Transcrição (`.md`) | PDF publicado (`documentos/`) | Nome original do arquivo da UFMG |
| :--- | :--- | :--- |
| `regulamento-gestao-publica-ufmg.md` | `regulamento-gestao-publica-ufmg.pdf` | Regulamento do Curso de Graduação em Gestão Pública |
| `ppc-gestao-publica-ufmg.md` | `ppc-gestao-publica-ufmg.pdf` | Projeto Pedagógico do Curso |
| `ementario-gestao-publica-ufmg.md` | `ementario-gestao-publica-ufmg.pdf` | Ementário do Curso de Gestão Pública |
| `regimento-interno-cagp-ufmg.md` | `regimento-interno-cagp-ufmg.pdf` | Regimento Interno do Centro Acadêmico de Gestão Pública (CAGP) |
| `percurso-bacharelado-nucleo-geral.md` | `percurso-bacharelado-nucleo-geral.pdf` | Relatório de Percurso Curricular — Bacharelado Núcleo Geral |
| `percurso-bacharelado-nucleo-complementar.md` | `percurso-bacharelado-nucleo-complementar.pdf` | Relatório de Percurso Curricular — Bacharelado Núcleo Geral + Núcleo Complementar |
| `percurso-bacharelado-nucleo-avancado.md` | `percurso-bacharelado-nucleo-avancado.pdf` | Relatório de Percurso Curricular — Bacharelado Núcleo Geral + Núcleo Avançado |

O `documentos/termo-aceite-orientador-tcc.pdf` é um formulário e não tem transcrição.

## Adicionando um documento novo

1. Salve o PDF em `documentos/` com nome em kebab-case, sem acentos (ex.: `resolucao-aac-2025.pdf`).
2. Salve a transcrição aqui com o **mesmo nome-base** (`resolucao-aac-2025.md`).
3. Acrescente uma linha na tabela acima e linke o PDF na página correspondente (`documentos.qmd`).
