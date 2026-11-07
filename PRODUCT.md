# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience: Undergraduate students of Public Administration (Gestão Pública) at FAFICH / UFMG (Universidade Federal de Minas Gerais), navigating academic bureaucracy, night-shift transit logistics, mandatory internships, and degree completion.

Segmented into 4 academic lifecycle personas:
- **Calouros (1º e 2º períodos)**: First-time arrivals needing orientation on campus spaces (FAFICH), FUMP socio-economic grants and food vouchers, night-shift safety and transit (Circular 22:30), and 30-day survival checklists.
- **Veteranos (3º ao 7º períodos)**: Students managing intermediate coursework needing tracking for 600h ACG (Research, Teaching, Extension), 120-day certificate submission alerts (ACG Guardian), prerequisite trees, and elective course reviews.
- **Formandos (8º ao 10º períodos)**: Graduating seniors requiring internship waiver via Art. 41 CEPE, TCE contract generation, TCC timeline guidance (monograph vs. article track), graduation checklists, and the CAGP CV bank.
- **Ingressantes / Futuros Discentes**: Prospective students and transfer applicants evaluating the Public Administration career, curriculum structure, and admission pathways (SiSU, Reopção, Obtenção de Novo Título).

Secondary audience: Faculty, collegiate board representatives, and future student union leadership managing institutional memory and transparency.

## Product Purpose

The CAGP SuperApp fulfills a dual mandate:
1. **Immediate Electoral Campaign Vehicle**: Serve as the high-impact operational platform for **Chapa Semente** in the CAGP student union election, proving leadership competence through immediate utility and finished software rather than paper flyers.
2. **Permanent Institutional Infrastructure**: Deliver an offline-first, client-side digital home for all UFMG Gestão Pública students that endures on GitHub Pages regardless of election outcomes, preventing institutional amnesia across student union terms.

Success means broad student adoption of utility tools (600h calculator, ACG Guardian, TCE generator), zero onboarding friction (no mandatory account creation or tracking), high electoral trust and vote mobilization for Chapa Semente, and autonomous maintenance via Markdown and Git.

## Positioning

*"Radical proof of competence through execution: Não é promessa, é entrega."*

Unlike conventional student political campaigning based on abstract promises, or standard university portals burdened by fragmented PDFs and clunky legacy interfaces, the CAGP SuperApp provides instant, client-side utility with zero login barriers, client-side encryption, and active financial/regulatory transparency from day zero.

## Operating Context

- **Physical & Digital Environments**: FAFICH hallways and auditoriums, university restaurant (RU) queues during meal shifts, evening campus bus stops (Circular 22:30), student smartphones on mobile data, and desktop browsers during UFMG enrollment periods (matrícula).
- **University Rituals & Regulatory Bodies**: UFMG CEPE resolutions (CEPE 02/2009 for internships, 120-day limits for ACG protocols), FAFICH Collegiate Board meetings, FUMP assistance deadlines, student union assemblies, and annual election voting.
- **Tools & Workflows**: Generation of normative PDF/doc paperwork (TCE agreements, Art. 41 petitions), .ics calendar integration for academic dates, and offline LocalStorage persistence for course tracking.

## Capabilities and Constraints

### Capabilities
- **Persona-Adaptive Home Dashboard**: Dynamically surfaces relevant widgets based on the user's selected academic moment (Calouro, Veterano, Formando, Ingressante).
- **600h ACG Calculator**: Real-time allocation across Research, Teaching, and Extension categories with visual progress tracking.
- **ACG Guardian**: Deadline countdowns alerting students before the 120-day post-activity certificate window expires.
- **Curriculum Prerequisite Graph**: Visual dependency tree illustrating mandatory paths and course requirements.
- **TCE Internship Generator & Art. 41 Assistant**: Generates pre-filled CEPE-compliant documentation for internship approvals and credit exemptions.
- **Transparency Portal (`/transparencia`)**: Real-time cash flow accounting showing student union revenues, expenditures, and treasury balance.
- **Chapa Semente Leadership Tour (BoldKit `Tour`)**: Guided interactive tour highlighting the 9 union directorates and the tangible tools delivered by each candidate.
- **Student Passport & Offline Vault (`studentVault.ts`)**: Client-side encrypted profile, customizable retro avatar, and academic milestone tracking.

### Constraints
- **Zero-Backend Architecture**: 100% static site hosted on GitHub Pages; no runtime Node server, serverless functions, or external database.
- **Strict Client-Side Privacy**: Student records, completed courses, and ACG certificates are stored solely in browser storage (`localStorage`) and never transmitted to external servers.
- **Offline-First PWA**: Service Worker caching guarantees full functionality of calculators, guides, and curriculum references without internet connectivity.
- **Modo Claro Exclusivo (Light Mode Only)**: A interface opera estritamente e exclusivamente em Modo Claro (base Papel Creme `#F4F0EA`, cards brancos e traço Preto Tinta `#16181D`). Não há suporte nem alternância para modo escuro, preservando a identidade tátil editorial e a legibilidade impressa.

## Brand Commitments

- **Entity & Campaign**: Centro Acadêmico de Gestão Pública (CAGP FAFICH/UFMG) & Chapa Semente.
- **Tetra-Layer Palette**:
  - *Roxo Semente (`#5B2A86`)*: Institutional governance, leadership, and campaign vision.
  - *Laranja Germinar (`#FF8811`)*: Action, high-conversion CTAs, and student mobilization.
  - *Verde Petróleo (`#134E4A`)*: Academic success, 600h ACG progress, internship validation, and financial transparency.
  - *Vermelho CAGP (`#9E2424`)*: UFMG student struggle, FAFICH identity, and critical deadline alerts.
  - *Papel Creme (`#F4F0EA`)*: Warm, glare-free light mode canvas background.
  - *Preto Tinta (`#16181D`)*: High-contrast 3px strokes and crisp unblurred offset shadows.
- **Aesthetic Direction**: Neobrutalist tactile ergonomics (BoldKit + Neobrutalism.com) balanced with Apple HIG accessibility (44x44pt touch targets, safe-area insets, dynamic scale).
- **Tone of Voice**: Student-to-student, direct, politically lucid, technically rigorous, and devoid of bureaucratic paternalism.

## Evidence on Hand

- **Official Campaign Briefing**: Candidate profiles, directorate responsibilities, and official statements in `_referencias/documentos-oficiais/briefing_do_site.md`.
- **Institutional & Pedagogical Documents**: Full curriculum regulations and bylaws in `_referencias/documentos-oficiais/regimento-interno-cagp-ufmg.md`, `regulamento-gestao-publica-ufmg.md`, `ppc-gestao-publica-ufmg.md`, and `ementario-gestao-publica-ufmg.md`.
- **Visual Identity Manuals**: Brand assets and guidelines in `_referencias/documentos-oficiais/manual_identidade_visual_chapa_semente.md` and `manual-de-identidade-visual-cagp-ufmg.md`.
- **Design System Blueprint**: Canonical Quadripartite blueprints and component catalogs in `_referencias/design-system/matrix/cagp-astro/`.
- **Media & Logos**: Vector marks and candidate imagery in `logos/` and `public/`.

## Product Principles

1. **Entrega Antes da Promessa (Proof Through Execution)**: Build and deliver working tools that solve real student friction before soliciting political support.
2. **Soberania Discente e Privacidade Absoluta (Zero-Backend Privacy)**: The student's academic history belongs exclusively to them; zero tracking, zero mandatory auth, 100% client-side persistence.
3. **Clareza Radical Contra o Labirinto Burocrático (Accessible Ergonomics)**: Deconstruct dense university resolutions into clear calculators, visual dependency graphs, and step-by-step actionable guides.
4. **Perenidade Institucional (Git-Backed Longevity)**: The digital infrastructure is designed to outlive any single student administration through free, static, open-source hosting.

## Accessibility & Inclusion

- **WCAG AA/AAA Contrast**: High-contrast ratios maintained across the exclusive light theme (Papel Creme canvas `#F4F0EA`, white cards, and deep ink `#16181D`).
- **Physical Touch Target Minimum**: 44x44pt minimum interactable surface area for all buttons and interactive controls on touchscreens.
- **Focus Rings**: High-visibility 3px solid borders with active tactile depression (2px translation) on press.
- **Night-Shift Readability**: Non-glare warm paper canvas (Papel Creme `#F4F0EA`) engineered for visual comfort and high contrast during night shifts at FAFICH, without requiring dark mode inversion.
