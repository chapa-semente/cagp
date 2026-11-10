---
target: tour chapa semente (primeira visita)
total_score: 15
max_score: 36
na_heuristics: 10
p0_count: 2
p1_count: 2
target_identity: "file:/home/gsathler/Nextcloud/Projects/cagp/src/components/features/semente/GlobalTourHost.tsx"
target_fingerprint: "sha256:f32f5c3d91bc13c62997a50ccc70076870f82325363f49ec9f211a89f555c20a"
target_path: /home/gsathler/Nextcloud/Projects/cagp/src/components/features/semente/GlobalTourHost.tsx
timestamp: 2026-11-10T14-29-56Z
slug: src-components-features-semente-globaltourhost-tsx
---
Method: dual-agent (A: revisão de design · B: detector + navegador)

Alvo: primeira visita centrada no tour da Chapa Semente (GlobalTourHost.tsx, ui/tour.tsx, CHAPA_TOUR_12_STOPS, SuperAppWelcomeModal, PwaElectionCredenciamentoModal, PwaCredenciamentoPill), avaliado contra a direção do dono: tour obrigatório sem pular, híbrido (telas por pessoa com fotos + spotlight da ferramenta de cada integrante), adaptado ao visitante, absorvendo o modal de credenciamento ("Sou Semente").

## Nota de design (Nielsen)
| # | Heurística | Nota | Problema |
|---|---|---|---|
| 1 | Visibilidade do status | 2 | barra listrada é timer do autoplay, não progresso; reload sem aviso |
| 2 | Mundo real | 2 | "Desafio & Demanda Discente", "Credenciamento", "Eleitor homologado" |
| 3 | Controle | 1 | autoplay 8s navega sozinho; pausa se perde no reload |
| 4 | Consistência | 1 | 3 onboardings; font-mono, font-black, 12px, bounce fora do DESIGN.md |
| 5 | Prevenção de erros | 2 | alvo ausente cai em silêncio no main |
| 6 | Reconhecimento | 2 | 12 paradas misturando pessoas e recursos; numeração duplicada |
| 7 | Flexibilidade | 1 | sem avanço rápido, sem memória de quem já viu |
| 8 | Estética | 1 | ~85 palavras por parada em miolo rolável de 213px |
| 9 | Recuperação | 3 | retomada da sessão funciona |
| 10 | Ajuda | n/a | superfície de persuasão |
| Total | | 15/36 | Ruim (42%) |

## Especificidade
Conteúdo autoral, forma intercambiável (tour SaaS genérico). Volume Cartaz e fotografia com dithering ausentes; a pessoa vira avatar de 32px.
Detector CLI: 3 avisos design-system-color (tour.tsx:180, tour.tsx:394, LeaderAvatar.tsx:82). Navegador: contraste 2,5:1 ("AGUARDANDO") e 2,4:1 ("OFFLINE VERIFICADO") no credenciamento. hard-offset-shadow e marquee = falsos positivos. O detector não pegou o spotlight quebrado.

## O que funciona
1. Trio dor → solução → ferramenta real em chapaSementeData.ts.
2. USER_ROLE_META e seletor de perfil prontos para a pergunta adaptativa.
3. Carimbo autoral como pico emocional disponível.

## Problemas prioritários
- [P0] Spotlight não destaca nada: getTargetElement (tour.tsx:74-77) usa querySelectorAll em ordem de documento e `main` sempre vence; 5 IDs alvo inexistentes (#cagp-home-banner-semente, #cagp-carreira-header, #cagp-pesquisa-header, #cagp-transparencia-header, #cagp-permanencia-header). Fix: resolver na ordem listada, mirar a ferramenta, teste de alvos por rota. Comando: harden.
- [P0] Cobertura/honestidade: Nilo ausente; Alice sem foto na parada 11; "ELEITOR HOMOLOGADO • FAFICH/UFMG" soa oficial; turno "26 TARDE 17h às 19h" incoerente com o edital (17h–22h30). Fix: 11 telas pessoais; vocabulário de lembrete; turnos do edital. Comando: clarify.
- [P1] Obrigatório sem pular contradiz PRODUCT.md e DESIGN.md ("nunca como pedágio"); GlobalTourHost.tsx:44-48 redireciona quem chega por link; sessionStorage repete o tour a cada link do WhatsApp. Fix: localStorage; deep link entrega o documento antes e o tour começa na 2ª página vista; toque para avançar sempre; duração na entrada; Esc pausa; atualizar PRODUCT/DESIGN. Comando: onboard.
- [P1] Autoplay ilegível e sequestrador (8s para ~85 palavras; pausa não persiste; reload por parada; WCAG 2.2.1). Fix: ≤25 palavras, segurar para pausar, nada de autoplay em spotlight, telas de pessoas numa sobreposição só. Comando: animate.
- [P2] Fora do sistema visual e 3 onboardings concorrentes; step row do credenciamento 535px em 347px; botões 41px, fechar 24×41; pílula + tour juntos no desktop; sem MotionConfig reduzido. Fix: um onboarding no volume Cartaz, alvos ≥44px. Comandos: bolder, polish.

## Personas
- Estudante noturno vindo de link de documento no WhatsApp: redirecionado para fora do PDF; tour repete a cada link.
- Jordan: abre com "Presidente" sem dizer que há eleição; dor do calouro só na parada 11.
- Casey: sheet de 44% da tela, timer corre durante a rolagem, reload por parada.
- Sam: página de trás não inert, passo não anunciado, marquee lido ~8x, credenciamento ignora Esc.

## Menores
Parada 7 vende /noticias simulado sem selo SIMULADO; parada 3 aponta #passaporte solto; jargão "Zero-Server"/"Soberania Discente"; três botões laranja no herói da home.

## Direção proposta
Abertura Cartaz com 11 rostos + duração + pergunta adaptativa (4 opções) → telas por pessoa (foto grande com dithering, ≤25 palavras, transição de bloco de cor) → spotlight da ferramenta → fechamento com data, agenda, instalar, convidar e carimbo "SEMENTE PLANTADA".

## Perguntas
1. Qual orçamento de segundos o tour pode gastar de quem saiu do trabalho às 22h?
2. Por que abrir com o presidente e não com a dor do perfil escolhido?
3. Qual tela fica na memória no dia 25?
