---
target: tour da primeira visita, propostas e moldura
total_score: 25
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 3
target_identity: "file:/home/gsathler/Nextcloud/Projects/cagp/src/components/features/semente"
timestamp: 2026-11-12T20-04-19Z
slug: src-components-features-semente
---
Method: dual-agent (A: design review · B: detector + medições no navegador)

Alvo: tour da primeira visita (TourPanfletagem, SementeTour), tour das propostas (PropostasTour), /chapa-semente e a ligação com a carteirinha.

## Design Health Score: 25/40

| # | Heurística | Nota | Problema principal |
|---|---|---|---|
| 1 | Visibilidade do estado | 3 | Vídeo sem duração na interface |
| 2 | Linguagem do mundo real | 3 | "Carta-Programa", "eixo"; "Veterano" na carteirinha x "Estou no meio do curso" no tour |
| 3 | Controle e liberdade | 2 | "Pular" no vídeo pula o tour inteiro; "Ainda estou decidindo" não é saída |
| 4 | Consistência | 2 | Sete rótulos de saída; o canto muda de significado |
| 5 | Prevenção de erro | 2 | Pular demais; links de prova fecham o tour das propostas; agenda baixa na hora |
| 6 | Reconhecimento | 3 | Rostos e nomes se repetem bem |
| 7 | Flexibilidade | 2 | Formato de stories sem toque/arrasto |
| 8 | Minimalismo | 2 | Votação com 5–6 ações; moldura com 10 controles |
| 9 | Recuperação de erro | 3 | Fallbacks do vídeo e da moldura são bons |
| 10 | Ajuda | 3 | Dica de instalar no iOS é específica |

## Especificidade
Tour da chapa é autoral (rostos em folha, caneta, bloco de cor que vira cartão, carimbo). Tour das propostas é carrossel genérico (pictograma, título, corpo, citação, próximo). Detector: 2 avisos de raio em chapa-semente.astro:480 (forma de folha, falso positivo); nada em features/semente.

## Números
- Caminho padrão: 12 telas, 11 toques, ~500 palavras + 19 s de vídeo. "Cerca de 2 minutos" é otimista.
- Tour das propostas: 16 toques, ~800 palavras.
- /chapa-semente: 1.432 palavras, ~18 telas de celular, "Vote Chapa 2" 12 vezes.

## Problemas prioritários
- [P0] Indeciso e quem pula caem num pedido maior: "Ainda estou decidindo" leva à moldura (com "Gostosas com Chapa 2" pré-selecionada); "Pular" cai numa tela cujo botão principal é "Vou votar na Chapa 2"; o debate de 24/11 não aparece. (SementeTour.tsx:1109-1128, 1240)
- [P1] "Pular" no vídeo pula o tour inteiro e cobre o contador "2/10" queimado no vídeo; sete rótulos de saída; "Fechar a carta" é o Próximo da proposta 14, sob um X "Fechar o tour". (SementeTour.tsx:370-377, 634-653; PropostasTour.tsx:486)
- [P1] Foto da moldura é beco sem saída: molduraDeApoio.ts não grava nada; a carteirinha usa cagp_student_profile_v1.photoDataUrl, escrito só pelo TalentBankEditor. O texto do iOS promete guardar a "foto".
- [P1] Tour das propostas fora de tom: pictogramas genéricos, quatro mundos de cor, falas que não casam (propostas 4, 11, 13), nome diferente do cartão da página.
- [P2] Spotlight enfraquece a prova: captura traz o cabeçalho do site (botões falsos sob o "Pular", duas setas de voltar), recortes cortados no meio da frase.
- [P2] Moldura: barra fixa cobre a 3ª fileira de molduras e o link das propostas; canvas touch-none impede rolar; 6 molduras antes de existir foto.

## Conflitos de controle medidos
- X e Pular nunca coexistem (Pular na 1ª visita, X ao rever; votação e moldura sem nenhum).
- "1 de 3" a 2,9 px do Pular; Fechar a 12 px da borda no desktop e Pular a 24 px.
- "Conhecer os outros 9" a 6 px dos botões de cima.
- Fechar + navegar em menos de 0,5 s deixa o tour "ativo" e ele reabre (finish grava "done" só após 520 ms).
- Sem erros no console; nenhum alvo real menor que 44 px.

## Jornada emocional
Pico: telas de pessoa e o carimbo "Semente plantada". Vales: meme antes de saber o que é o site; spotlight que parece clicável; moldura logo após o compromisso. Final: o último gesto da maioria é "Agora não", uma recusa.

## Personas
- Trabalhador às 22h: veio pelo RU/ônibus, recebe meme + 11 toques; a saída em 2 toques termina num botão de compromisso.
- Indeciso cético: alfinetada antes da prova, sem debate, moldura com gíria por padrão.
- Calouro: "Carta-Programa", "eixo", "Art. 41" sem explicação.
