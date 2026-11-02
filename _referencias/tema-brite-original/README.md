# Tema Bootswatch Brite 5.3.8 — Original (Referência)

Cópia **original e intocada** do tema [Bootswatch Brite](https://bootswatch.com/brite/) (Bootstrap 5.3.8), que serve de base visual para o portal do CAGP.

> [!IMPORTANT]
> **Para agentes e skills (impeccable, brand-yml, quarto-authoring, alt-text):** use estes arquivos como **referência obrigatória da linguagem visual Brite** ao criar ou ajustar qualquer componente do site — bordas pretas sólidas, sombras duras deslocadas (sem desfoque), contraste alto, botões "carimbados" e navbar com borda. Antes de inventar um estilo novo, verifique como o Brite resolve aquele elemento aqui e adapte-o à identidade do CAGP (`_brand.yml`, `DESIGN.md`).

## Regras

1. **Não editar** nenhum arquivo desta pasta. Ela é o "original de comparação".
2. **Não importar** estes arquivos no build. O Quarto **não** os usa: a pasta começa com `_` e não está em `_quarto.yml`.
3. Toda adaptação do projeto vai em:
   - `../../_variables.scss` — variáveis (`scss:defaults`) e regras (`scss:rules`) do Brite **já adaptadas** à paleta e tipografia do CAGP;
   - `../../styles.css` — componentes próprios do CAGP (`.cagp-card`, `.cagp-doc-card`, `.cagp-form-item`, callouts etc.).

## Arquivos

| Arquivo | Conteúdo | Onde foi adaptado no projeto |
| :--- | :--- | :--- |
| `_variables.scss` | Variáveis padrão do Brite (cores, fontes, bordas, espaçamentos) | Seção `/*-- scss:defaults --*/` de `_variables.scss` (cores CAGP `#9E2424`/`#0A0A0A`, Inter + Oswald, `$black: #0a0a0a`) |
| `_bootswatch.scss` | Regras e mixins do Brite (`btn-shadow`, borda de 2px em navbar, tabelas, cards, badges, form-controls) | Seção `/*-- scss:rules --*/` de `_variables.scss` |
| `bootstrap.css` | CSS compilado completo do Brite (consulta rápida de seletores finais) | — (apenas consulta) |
| `bootstrap.rtl.css` | Versão RTL do CSS compilado | — (apenas consulta) |

## Atualizando o tema

Ao atualizar o Brite para uma versão nova: substitua os arquivos desta pasta pela nova versão, faça `diff` contra `_variables.scss` da raiz e porte apenas as mudanças relevantes, preservando as adaptações CAGP.
