# Part 1B: Product Requirements Document & User Journeys (`00-product-spec-and-journeys.md`)

## Executive Summary

The **CAGP SuperApp** is organized around **5 Functional Pillars** serving **4 distinct Student Personas** throughout their academic lifecycle at FAFICH/UFMG. Designed for 100% static hosting on **GitHub Pages**, it operates completely client-side without external databases, guaranteeing total student privacy and zero server maintenance costs.

---

## 1. The 5 Functional Pillars

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CAGP SUPERAPP CORE                              │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ 1. Hoje & Campus  │ 2. Vida Acadêmica │ 3. Reta Final                  │
│ • Home Adaptada   │ • ACG Guardian    │ • Gerador TCE Estágio          │
│ • Status RU/Campus│ • Calculadora 600h│ • Protocolo Art. 41            │
│ • Notícias & Avisos│ • Grafo Curricular│ • Cronograma TCC               │
│ • Rotina Noturna  │ • Catálogo Optat. │ • Modalidades Monografia/Artigo│
├───────────────────┴───────────────────┴────────────────────────────────┤
│ 4. Transparência & Institucional      │ 5. Passaporte & Vault          │
│ • Caixa em Tempo Real                 │ • PWA Offline-First            │
│ • Estatuto & Regimento Interno        │ • studentVault (LocalStorage)  │
│ • Ouvidoria de Disciplinas            │ • Avatar Retrô Customizável    │
│ • Histórico da Chapa Semente          │ • Milestones & Gamificação     │
└────────────────────────────────────────────────────────────────────────┘
```

### Pillar 1: Hoje & Campus
- **Adaptive Home Dashboard (`src/pages/index.astro`)**: Reorders widgets dynamically based on the active student persona stored in `studentVault.ts`. Calouros see onboarding checklists; veteranos see graduation progress and deadlines.
- **Live Campus Status (`HomeCampusStatusWidget`)**: Real-time status of university restaurants (RU 18:15 alerts), library hours, and campus safety/bus circular (22:30) for night students.
- **Static Announcements & News Feed**: Filtered feed combining collegiate announcements, departmental notices, and student union initiatives driven by `public/announcements.json`.

### Pillar 2: Vida Acadêmica & Integralização (600h)
- **ACG Guardian (`src/components/features/acg/guardian/`)**: Warns students about the strict 120-day limit to submit certificates following activity completion (UFMG CEPE Norm).
- **600h Extension Calculator (`src/components/features/acg/calculator/`)**: Interactive breakdown across Research, Teaching, and Extension hours with dynamic progress bars styled in Verde Petróleo (`#134E4A`).
- **Interactive Curriculum Graph (`src/components/features/curriculum/graph/`)**: Visual dependency tree showing mandatory course prerequisites and optimal pathways.
- **Optativas Catalog (`src/pages/optativas.astro`)**: Searchable index of elective courses filterable by department (DCP, ECN, SOA, etc.).

### Pillar 3: Reta Final (Estágio & TCC)
- **Internship Agreement (TCE) Generator (`src/components/features/estagio/tce/`)**: Generates pre-filled normative documentation conforming to CEPE 02/2009.
- **Art. 41 Exemption Protocol (`src/components/features/estagio/art41/`)**: Streamlined workflow for students already working in public administration to waive mandatory internship credits.
- **TCC Defense Scheduler & Guidelines (`src/components/features/tcc/`)**: Timeline tracker for theme registration, advisor approval, and monograph vs. article track comparisons.

### Pillar 4: Transparência & Institucional
- **Live Cash Flow (`src/pages/transparencia.astro`)**: Transparent financial accounting showing income, expenditures, and treasury balances cent por cent.
- **Statutes & Regulations (`src/content/normas/`)**: Full-text searchable records of the CAGP internal regulations, collegiate decrees, and UFMG general norms.
- **Course Syllabus Grievance Channel**: Form to report outdated course curricula directly to student representatives on the Collegiate Board.

### Pillar 5: Passaporte Discente & Offline Vault
- **Zero-Backend Vault (`src/lib/storage/studentVault.ts`)**: Encrypted local-keyed storage for user profile, completed courses, ACG records, and personal notes.
- **Customizable Avatar (`src/components/passport/AvatarRenderer.tsx`)**: Retro pixel/neobrutalist avatar builder.
- **Candango Milestone Engine**: Gamified academic milestones celebrating progress from "Bixo FAFICH" to "Guardião das 600h" and "Candango Integralizado".

---

## 2. Onboarding Inicial Obrigatório & Dashboard Adaptativo

### 1. Modal de Bloqueio no 1º Acesso (`SuperAppWelcomeModal.tsx`)
Para evitar que o estudante caia em uma interface genérica descontextualizada, o primeiro acesso exibe um modal bloqueante obrigatório:

```
┌────────────────────────────────────────────────────────┐
│           🌱 BEM-VINDO AO CAGP SUPERAPP!              │
│    Selecione o seu momento atual na graduação:         │
├────────────────────────────────────────────────────────┤
│ [ 🐥 Sou Calouro(a)    ] -> 1º e 2º período            │
│ [ 📚 Sou Veterano(a)   ] -> 3º ao 7º período           │
│ [ 🎓 Sou Formando(a)   ] -> 8º ao 10º período          │
│ [ 🔍 Quero Ingressar   ] -> SiSU, Reopção & Transferência│
└────────────────────────────────────────────────────────┘
```

### 2. Auto-Preenchimento Inteligente com Ajuste de Irregularidade
Ao selecionar a Persona e o período correspondente (ex: *Veterano - 5º Período*):
1. O sistema **pré-marca automaticamente como concluídas** todas as disciplinas obrigatórias do 1º ao 4º período na grade curricular do cofre (`cagp_minha_grade_v1`).
2. O modal abre uma tela de confirmação rápida: *"Disciplinas obrigatórias até o 4º período marcadas. Reprovou ou atrasou alguma matéria?"*. O estudante pode desmarcar com 1 clique qualquer disciplina irregular.
3. Salva a configuração no `studentVault.ts` e libera o acesso à Home.

### 3. Reordenação Adaptativa da Home (`src/pages/index.astro`)
A Home reordena os blocos dinamicamente sem recarregar a página:
- **Calouro**:
  1. Banner de Acolhimento & Espaços FAFICH
  2. Checklist dos Primeiros 30 Dias
  3. Status do RU Noturno e Ônibus Circular 22:30
  4. Guia da FUMP e Carteirinha
- **Veterano**:
  1. Calculadora de 600h & Progresso ACG
  2. Alerta do ACG Guardian (Prazos de 120 dias)
  3. Grafo de Pré-requisitos & Catálogo de Optativas
  4. Feed de Editais de IC e Extensão
- **Formando**:
  1. Assistente de Dispensa de Estágio (Art. 41)
  2. Cronograma de TCC (Monografia vs Artigo)
  3. Calculadora de Integralização e Colação
  4. Banco de Currículos do CAGP
- **Ingressar**:
  1. Conheça a Carreira em Gestão Pública
  2. Formas de Ingresso (SiSU, Obtenção de Novo Título, Reopção)
  3. Grade Curricular Completa & Depoimentos de Egressos

---

## 3. Arquitetura Estática de Notificações no GitHub Pages

Para enviar comunicados, eventos e alertas sem servidor push backend:

### 1. Feed Estático via `public/announcements.json`
O Centro Acadêmico publica comunicados adicionando entradas em um arquivo JSON estático:
```json
[
  {
    "id": "notif-2026-11-25-eleicao",
    "title": "Eleições CAGP 2026: Votação Aberta!",
    "body": "As urnas na FAFICH estão abertas no turno da noite. Exerça seu voto e fortaleça a gestão do curso.",
    "category": "eleicao",
    "date": "2026-11-25T18:00:00",
    "link": "/chapa-semente",
    "calendarIcs": "/events/votacao-cagp.ics",
    "expiresAt": "2026-11-27T00:00:00"
  }
]
```

### 2. Service Worker PWA & Detecção Client-Side
- Ao carregar qualquer página ou ao ser ativado em segundo plano, o Service Worker efetua um `fetch('/announcements.json')`.
- Compara os IDs com a lista de anúncios já vistos salva no `localStorage` (`cagp_notification_seen_ids_v1`).
- Se houver novos itens:
  1. Dispara uma **Web Notification nativa** (se o discente concedeu permissão).
  2. Incrementa o contador do **badge vermelho no sino do cabeçalho** (`SuperAppHeader.astro`).
  3. Insere a notificação no **Histórico de Notificações Local** (`cagp_notification_history_v1`), permitindo leitura a qualquer momento no menu lateral.

### 3. Sincronização em 1 Clique com Calendário (.ics)
Para alertas críticos (Votação da Chapa Semente, Prazo de 120 dias do ACG, Entrega do TCC):
- Cada card de alerta contém o botão *"Salvar no meu Calendário"*.
- Gera dinamicamente ou faz download de um arquivo `.ics` compatível nativamente com **Google Calendar, Apple Calendar e Outlook**, garantindo que o estudante receba alarmes sonoros no celular mesmo com o navegador fechado e sem internet.

---

## 4. Blindagem de Privacidade do Cofre Discente (`studentVault.ts`)

Conforme acordado no planejamento de segurança:
1. **Zero Telemetria Eleitoral no Backup**: A função `exportVaultBackup()` filtra explicitamente todas as chaves eleitorais (`cagp_election_activation_v1`, `sementeSupporter`, `votedDateChoice`). O token de backup gerado contém **exclusivamente dados acadêmicos** (horas ACG, disciplinas cursadas, perfil de estudante e checklist de estágio).
2. **Purga Automática Pós-Eleição**: Após o encerramento do período eleitoral (determinado por `PUBLIC_ELECTION_ACTIVE=false`), o SuperApp purga automaticamente os dados locais de intenção de voto sem afetar o histórico acadêmico permanente.
