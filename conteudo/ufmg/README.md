# Guias da vida na UFMG

Cada arquivo `.md` desta pasta é uma página do site (o nome do arquivo é o endereço: `carteirinha.md` vira `/carteirinha`).
Este LEIA-ME não vira página.

- O conteúdo foi reescrito a partir do **Viver UFMG** (https://www.ufmg.br/viverufmg/) e do portal da UFMG, lidos em **13/11/2026**.
- **Não invente.** Valor, prazo, telefone e e-mail só entram se estiverem na fonte. Onde a UFMG não diz, o site também não diz.
- Ao conferir uma página de novo, troque `consultadoEm` no cabeçalho e ajuste o texto.
- O jantar do RU continua como Setorial II (decisão do curso); não mude isso a partir do Viver UFMG.

## Como escrever

- `## Título` abre uma seção. Lista numerada (`1.`) vira passo a passo. Lista com `-` vira lista comum.
- `> texto` vira um aviso em destaque.
- Link para outra página do site: `[Estágio](/estagio)`. Link de fora: o endereço completo.
- `***` numa linha sozinha separa o que fica fora das abas e do sumário.
- No cabeçalho: `resumoRapido` são as três linhas que abrem a página (só o que o texto já diz); `destaque` é o cartão colorido do alto, com um número grande (`numero`, `unidade`) ou só uma `frase`, um `rotulo` e até seis `etiquetas`; use só número que o próprio texto da página traz, e `numero: "lista"` para o site contar sozinho os itens da maior lista; `caneta` é uma palavra do título escrita à mão (deixe sem em assunto delicado); `acaoPrimeiro: true` sobe os contatos para o alto; `abas` transforma cada seção em aba; `linhas: true` mostra as listas como linhas de ficha; `vejaTambem` lista até três páginas vizinhas; `notaDaFonte` acrescenta uma frase ao bloco da fonte.
- `contatos` viram botões de ligar e escrever; `videos` são do YouTube (só o código do vídeo); `imagens` ficam em `public/images/ufmg/`; `filtro` liga a busca sobre a maior lista da página.

Para a página aparecer no menu e na busca, ela também precisa de uma linha em `src/lib/navigationRegistry.ts` e de uma prévia em `src/data/compartilhamento.json`.
