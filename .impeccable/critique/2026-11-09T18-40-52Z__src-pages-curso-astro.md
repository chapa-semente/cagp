---
target: eixo Acolhimento (curso, calouros, permanencia, pesquisa)
total_score: 21
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 4
target_identity: "file:/home/gsathler/Nextcloud/Projects/cagp/src/pages/curso.astro"
target_fingerprint: "sha256:b4e1c2d707a013cce5e02d2cb3e459189a8b96d5a557ebde2b4e32028e8be5cc"
target_path: /home/gsathler/Nextcloud/Projects/cagp/src/pages/curso.astro
timestamp: 2026-11-09T18-40-52Z
slug: src-pages-curso-astro
---
# Critique + Audit — Eixo Acolhimento (/curso, /calouros, /permanencia, /pesquisa)

Method: dual-agent (A: design review · B: detector + browser)

## Nielsen 21/40 (Acceptable)
1 Status 2 (abas não sticky em painéis de 4–6,8 mil px) · 2 Mundo real 2 ("Eixo 2" ambíguo, StudentVault) · 3 Controle 2 (showAxisNav=false nas 4 páginas) · 4 Consistência 1 · 5 Prevenção 2 (simulador pré-seleciona Nível I) · 6 Reconhecimento 2 (rótulos truncados) · 7 Eficiência 3 · 8 Minimalismo 1 · 9 Recuperação 3 · 10 Ajuda 3

## Audit 8/20 (Poor)
A11y 2 · Performance 2 · Theming 1 · Responsive 2 · Integrity 1

## Priority issues
- [P0] Real × simulado: simulador FUMP sem SIMULATION_NOTICE, "Simulação Real-Time", valores R$ não oficiais (PermanenciaInteractiveHub.tsx:34,124,274); "PROPOSTA MATERIALIZADA #07" (CalouroCentralOverview.astro:130); "materializa… Livro-Caixa Aberto" (CursoCandangosAndTimeline.tsx:69).
- [P1] Abas sem nome acessível no celular (SegmentedControl.astro:51-52 + global.css:414-415).
- [P1] Navegação do eixo: showAxisNav=false nas 4 páginas; AxisOverview no fim de /curso (y≈6100) e sem link para /permanencia; abas não sticky; activeId divergente do registry.
- [P1] Esqueleto inconsistente: /permanencia sem abas (9.297px, H1→H3); /pesquisa começa em v1; numeração mista nos rótulos.
- [P1] /curso Geral abre com vitrine (pilares 2000px, egressos repetidos 3x) em vez de utilidade.
- [P2] ~740 hex fixos (473× #16181d), 3 famílias de card, 3 conjuntos de tokens de sombra, badge 'red'→destructive para info neutra (PageHeader.astro:69), ícones bi + lucide.
- [P2] Info noturna duplicada em 5 lugares com divergência ("RU II às 18h15", "atrás da FAFICH").
- [P2] Gráfico de egressos cortado em 375px (x até 454 num card de 351px); 20 links de 43px em /pesquisa; placeholder 3.4:1; títulos pulam nível em calouros/permanencia/pesquisa.
- [P3] Código morto ~1.100 linhas (CalouroFumpCore, CalouroNoturnoCore, CalouroNoturnoPlanner, CalourosOnboardingGuide); client:load onde client:visible bastaria; vibrate sem gesto; rodapé 1.939px no celular.
