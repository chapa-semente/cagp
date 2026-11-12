---
target: pagina Chapa 2, entrada do tour das propostas e /gestao
total_score: 22
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 3
target_identity: "file:/home/gsathler/Nextcloud/Projects/cagp/src/pages/chapa-semente.astro"
target_fingerprint: "sha256:8d66f0de358969ad99433bc76aee13973920c8c5de47e0ddf078b2e40f0163ef"
target_path: /home/gsathler/Nextcloud/Projects/cagp/src/pages/chapa-semente.astro
timestamp: 2026-11-12T21-03-32Z
slug: src-pages-chapa-semente-astro
---
Method: dual-agent (A: design review · B: detector + medições no navegador)

Alvo: /chapa-semente, entrada do tour das propostas e /gestao (Eleição e como votar).

## Nota: 22/40 (/chapa-semente)
1 Estado 3 · 2 Linguagem 2 · 3 Controle 3 · 4 Consistência 1 · 5 Prevenção 3 · 6 Reconhecimento 2 · 7 Flexibilidade 2 · 8 Minimalismo 1 · 9 Recuperação 3 · 10 Ajuda 2

## Números
- /chapa-semente: 14.997 px (18,5 telas de celular), 1.562 palavras, 137 elementos tocáveis, 49 menores que 44 px; "Vote Chapa 2" 12 vezes.
- /gestao: aba Diretorias com 17.213 px (21 telas) e 30 links de e-mail para a mesma caixa; página inteira 35 telas.
- Detector: 2 avisos de raio em chapa-semente.astro:480 (forma de folha, falso positivo).

## Prioridades
- [P0] Entrada do tour das propostas invisível: dois controles "Ver as 14 propostas"; o do herói (chapa-semente.astro:82) só rola a página; o que abre o tour (PropostasTourButton.tsx:8) está a 5.680 px, 7 telas abaixo, em cima das 14 propostas já visíveis. Única outra entrada: ramo "indeciso" do tour da chapa.
- [P0] /gestao com informação errada: "David" e "Clarisse" não são da chapa (gestao.astro:72-83); faltam Klaus, Lara, Paloma e Alice; 6, 7, 9 e 12 "diretorias/pastas" para a mesma estrutura; RREO "Art. 30, V" (é XI); prazo em dias úteis/72h/dias letivos; CNPJ tratado como existente; "ouvidoria financeira e jurídica", "Lei de Acesso à Informação Discente" e Drive institucional sem fonte; "Chamada para Novos Assessores" com horas complementares; aba Contas sem rótulo de exemplo; cronograma sem a apuração; "entrega deste Superapp" explícita.
- [P1] /gestao repetitiva: data e hora da votação 6 vezes na aba Eleição; as 7 diretorias descritas 4 vezes; as pessoas da chapa 2 vezes (uma errada); regimento para baixar 4 vezes.
- [P1] Grade das 14 propostas (5.544 px) duplica o tour; "texto integral" não é integral (propostas 2, 3 e 10 diferem da carta).
- [P1] Links errados: "Ver o guia do site" do Gabriel vai para /transparencia; "Ver o guia do calouro" da Alice vai para /.
- [P2] "Leve documento com foto" não está no edital para eleitor (só na inscrição de chapa, art. 9 IV); aparece em 9 arquivos. Falta a regra do X numa chapa só (art. 22 §3).
- [P3] Textos velhos: JourneyNav "Hoje no campus", "14 rotas ativas".

## Estilo dos desenhos de referência (_referencias/desenhos)
Cartum à mão: contorno preto grosso e irregular, cor chapada, olhos em pílula, espiral rosa na bochecha, mão com gesto, estrela-explosão laranja com "Chapa" manuscrito; animação de poucos quadros (piscada + tracinhos de ênfase).
