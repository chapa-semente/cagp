# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Usuário primário: o **estudante noturno de Gestão Pública no celular**. Em geral é trabalhador, está entre o emprego e a aula e precisa resolver rápido um trâmite (estágio, ACG/600h, auxílio FUMP, requerimentos, prazos) sem depender de um colega que "sabe o caminho".

Outros públicos confirmados, atendidos pelo mesmo site:

- **Calouro perdido:** primeiras semanas na UFMG, sem conhecer ninguém; precisa de mapa do campus, guia da recepção e de saber a quem recorrer.
- **Eleitor indeciso:** estudante avaliando a Chapa Semente antes da eleição do CAGP em **25–26/11/2026**.
- **Formando:** TCC, fechamento das 600h, colação de grau.

O site atende o estudante e, até a eleição de 25–26/11/2026, também precisa converter voto: a Chapa Semente tem aba própria na navegação e o herói da home apresenta os integrantes de forma pessoal. A utilidade continua sendo a prova, e a campanha nunca bloqueia um trâmite.

## Product Purpose

Portal funcional do curso de Gestão Pública (FAFICH/UFMG) que também serve de **prova e vitrine da Chapa Semente** na campanha pelo CAGP. Traduz a burocracia da UFMG em guias práticos (como se formar, estágio, ACG, assistência estudantil, documentos, optativas, pesquisa) e propõe as funções do Super App que a chapa se compromete a entregar.

Status: **protótipo de campanha**. O papel do site depois da eleição (canal oficial do CAGP, legado entregue ao curso ou reconstrução) será decidido depois. O código anuncia a versão final do Super App para **fim de fevereiro de 2027**.

Sucesso: estudantes resolvem de fato seus trâmites pelo site, e o site convence eleitores de que a Chapa Semente entrega o que promete.

## Positioning

O argumento da chapa é que a proposta já existe: um site no ar, feito pelo próprio presidente da chapa. Nenhuma outra chapa pode dizer isso com verdade. Ele responde à "terra arrasada" de cada troca de diretoria do CA: informação que pertence aos estudantes, não a uma diretoria, alimentada por Markdown simples e em código aberto.

## Operating Context

- Gestão Pública é um **curso noturno**: o público é de estudantes trabalhadores, muitas vezes no celular e com pouco tempo.
- Contexto institucional: CAGP (Centro Acadêmico de Gestão Pública), FAFICH, UFMG; trâmites de colegiado, DRCA e secretaria; FUMP (assistência estudantil), RU, SIGA/MinhaUFMG.
- Calendário: eleição do CAGP em 25–26/11/2026 (edital em `documentos/`).
- Campanha: a Diretoria de Marketing grava vídeos/Reels mostrando o site em uso.

## Capabilities and Constraints

- **Stack:** Astro 7 (saída estática) + ilhas React 19, Tailwind 4, MDX/content collections. Deploy no GitHub Pages / Netlify. PWA (service worker, manifest).
- **Sem backend.** Tudo é estático. A ouvidoria e os pedidos de informação saem por `mailto:`/link externo; dados pessoais (cofre, preferências) ficam no navegador.
- Navegação por **tarefa** (`src/lib/navigationRegistry.ts`, fonte única): Hoje, Guias, Chapa, Meu curso, Mais.
- **Contato:** o CAGP ainda não tem e-mail público. Contatos do site usam `chapa.semente.gp@gmail.com`, sempre identificado como e-mail da Chapa. A ouvidoria não envia demandas (só salva e copia o texto) até existir um canal oficial.
- Conteúdo mantido em Markdown/JSON (`src/content/`, `conteudo/`) para que pessoas que não programam possam manter.
- **Real × simulado** (deve continuar explícito na tela):
  - *Real:* guias e tutoriais (ACG, estágio, FUMP, calouro), documentos oficiais e normas, disciplinas e optativas, cursos da ENAP (derivados de `_referencias/catalogo_enap.csv`), história do curso, informações de colegiado e secretarias, núcleos de pesquisa e os 11 integrantes da chapa.
  - *Simulado:* mural de notícias, vagas e editais, banco de talentos e os lançamentos contábeis do Portal da Transparência. Esses trechos levam o `SIMULATION_NOTICE` (`src/lib/simulatedData.ts`).
- Em aberto: o papel do site após a eleição e a origem dos dados reais de transparência.

## Brand Commitments

- **Hierarquia de marca:** a identidade da **Chapa Semente** é a base do site; o **CAGP** aparece como selo/assinatura institucional.
- Chapa Semente (autoridade: `_referencias/identidade_visual_chapa_semente/manual_identidade_visual_chapa_semente.md`; assets em `_referencias/identidade_visual_chapa_semente/` e `public/logos/semente/`):
  - Lema: *"Toda mudança começa pequena."* Pilares: IDEIA · PARTICIPAÇÃO · FUTURO. Assinatura: `CHAPA GESTÃO PÚBLICA · SEMENTE`.
  - O wordmark SEMENTE nunca é redigitado em fonte; usa-se sempre o asset oficial.
  - Cores chapadas, sem degradês. Laranja vibrante nunca em texto de leitura.
- CAGP (autoridade: `_referencias/documentos-oficiais/manual-de-identidade-visual-cagp-ufmg.md`; assets em `public/logos/cagp/`): símbolo baseado em *Os Candangos* (Bruno Giorgi).
- Logos de terceiros (UFMG, FUMP, SIGA, MinhaUFMG) seguem os próprios manuais em `_referencias/documentos-oficiais/`.
- Voz: direta, séria, sem enrolação; traduz burocracia em passos. Apartidária e combativa ("articulado, transparente e combativo"). As falas da chapa por diretoria estão em `_referencias/briefing_do_site.md`.

## Evidence on Hand

- Briefing com dores, soluções e textos de campanha de cada diretoria: `_referencias/briefing_do_site.md`.
- Os 11 integrantes da chapa, com cargos, falas e fotos: `src/lib/chapaSementeData.ts`.
- Documentos oficiais do curso (PPC, regulamento, ementário, percursos, estágio, assistência, colegiado/NDE, regimento do CAGP): `_referencias/documentos-oficiais/` e PDFs em `documentos/`.
- Catálogo ENAP: `_referencias/catalogo_enap.csv` → `src/data/curatedEnapCourses.json`.
- Imagens de contexto (mapas do campus, FUMP, UFMG): `_referencias/imagens-contexto/`.
- **Não fabricar:** depoimentos, apoios, números financeiros reais, vagas reais, métricas de uso ou adesão, nem integrantes além dos 11. Conteúdo simulado continua rotulado como tal.

## Product Principles

1. **A utilidade é a campanha.** Cada página precisa resolver um trâmite real; o voto vem da prova, não do discurso.
2. **Rápido no celular, à noite.** O estudante trabalhador encontra o passo, o formulário ou o contato em segundos, em tela pequena e com sinal ruim.
3. **Honesto sobre o que é proposta.** Real e simulado sempre sinalizados; nada prometido aparece como se já funcionasse.
4. **Legado, não propriedade de diretoria.** O conteúdo fica em formatos simples que qualquer pessoa consegue manter depois do mandato.
5. **Aberto a todas as turmas, não a uma panelinha.** Linguagem e caminhos não pressupõem contatos prévios no CA nem na UFMG.

## Accessibility & Inclusion

Não há padrão formal exigido. O site já oferece um painel de acessibilidade e a fonte OpenDyslexic. A inclusão também passa pelo horário do estudante trabalhador do noturno e pelo calouro sem referências.
