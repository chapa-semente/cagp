# Part 1A: Strategic Briefing & Electoral Campaign Guide (`00-briefing-and-vision.md`)

## Executive Summary & Strategic Context

The **CAGP SuperApp** is an Astro 7 web application and Progressive Web App (PWA) operating under a unique dual mandate:
1. **Immediate Electoral Platform**: A high-impact campaign vehicle for **Chapa Semente** contesting the student union election for the **Centro Acadêmico de Gestão Pública (CAGP FAFICH/UFMG)**.
2. **Permanent Institutional Legacy**: An independent, self-contained, offline-first digital infrastructure for all Public Administration students at UFMG, designed to survive and function on **GitHub Pages** regardless of electoral outcomes.

The core campaign premise of Chapa Semente is **radical proof of competence through execution**: rather than promising reforms on paper flyers, the campaign delivers a fully functioning, production-ready SuperApp before voting commences.

---

## 1. Macro Electoral Objectives & Vote Capture Funnel

```
[Discovery / Social Media / QR Codes no Campus]
                    ↓
        [High-Utility Student Tool]
  (Calculadora 600h, Guia de Estágio Art. 41, ACG Guardian)
                    ↓
        [Immediate Value Realization]
  (Zero barreiras de login, cálculo instantâneo, cofre local)
                    ↓
        [Political Attribution & Credibility]
  ("Construído pela Chapa Semente: Não é promessa, é entrega")
                    ↓
        [Interactive Leadership Tour (BoldKit Tour)]
  (Conheça as 9 diretorias e a solução que cada uma construiu)
                    ↓
        [Vote Pledge / Credenciamento / Share]
  (Modal de Credenciamento, Sincronização de Calendário .ics, WhatsApp Card)
```

### Strategic Tenets
- **Utility-First Campaigning**: Students do not vote for abstract slogans; they vote for the team that solved their 120-day ACG deadline anxiety, demystified the FAFICH night shift, and made internship contracts straightforward.
- **Zero-Barrier Access**: No mandatory central account, no tracking cookies, no Google login. The app loads instantly and works offline via Service Worker on GitHub Pages.
- **Radical Transparency as Proof**: Financial transparency is not an agenda item—it is live on day one in `/transparencia`, showing every cent and budget category.

---

## 2. Directorate Mapping: Student Pains to Technical Solutions

Based on the official campaign briefing (`_referencias/documentos-oficiais/briefing_do_site.md`):

| Directorate & Lead | Core Student Pain | Technical Solution in `src/` | Campaign Slogan & Attribution |
| :--- | :--- | :--- | :--- |
| **Presidência**<br>*(Gabriel Sathler)* | Institutional amnesia; every new board resets records and tools. | Markdown-based data architecture, git-backed perenidade, offline PWA. | *"Menos improviso de diretoria, mais legado para os estudantes."* |
| **Assessoria da Presidência**<br>*(Lívia Martins)* | Bureaucratic maze of UFMG ("Como se Formar"), visual clutter. | Neobrutalist high-contrast UX, simplified step-by-step guides, CV bank. | *"A burocracia do curso explicada de estudante para estudante."* |
| **Vice-Presidência**<br>*(Larissa Prado)* | Lack of student voice and continuous grievance reporting. | Continuous listening channel ("Reclame Aqui"), student talent exchange. | *"Representação viva: sua voz e suas demandas ouvidas o ano todo."* |
| **Diretoria Acadêmica**<br>*(Mariana Presti)* | Scientific initiation and research hidden in static spreadsheets. | Live research directory (`src/components/features/pesquisa/`), real-time lab calls. | *"Pesquisa e extensão fora das gavetas: oportunidades ao seu alcance."* |
| **Marketing e Comunicação**<br>*(João Pedro Fragoso)* | Center seen only as party organizers; outdated course syllabi. | Formal syllabus grievance channel, academic newsfeed, Reels walkthroughs. | *"Menos ruído, mais seriedade: o portal oficial do estudante de Gestão Pública."* |
| **Diretoria Financeira**<br>*(Vitória Moraes)* | Opaque bank accounts and missed FUMP socioeconomic grant deadlines. | Real-time Transparency Portal (`src/pages/transparencia.astro`), FUMP onboarding wizard. | *"Transparência ativa: cada entrada e saída do caixa acessível em tempo real."* |
| **Articulação Política**<br>*(Ítalo de Morais)* | Dependence on paid platforms; political isolation. | Free open-source stack, cooperative student hosting, political debate tribuna. | *"Independência política com eficiência técnica: debate ao alcance de todos."* |
| **Diretoria Jurídica**<br>*(Lara Soares)* | Despair over stalled internship contracts (TCE) and lost ACG credits. | Automated TCE term generator, ACG protocol guides, Art. 41 exemption. | *"Segurança burocrática: seu contrato de estágio sem travas e sem atrasos."* |
| **Cultura & Acolhimento**<br>*(Paloma Correia & Alice Maurício)* | Events scheduled at hours incompatible with working night students. | Night-shift survival guide (`src/components/features/calouros/noturno/`), unified calendar. | *"Cultura e integração no horário de quem trabalha."* |

---

## 3. O Tour Interativo da Chapa Semente (BoldKit `Tour`)

Para engajar os estudantes e demonstrar a autoria de cada funcionalidade sem ser invasivo, o SuperApp integra o componente **`Tour` do BoldKit** (`src/components/boldkit/ui/tour.tsx`). Cada parada do tour destaca um elemento real da interface, acompanhado pela foto, nome, cargo e depoimento oficial da liderança da Chapa Semente:

### Paradas do Tour Guiado (9 Etapas)

1. **Etapa 1: Presidência — Gabriel Sathler**
   - **Elemento Destacado**: Cabeçalho do SuperApp e Seção de Governança
   - **Foto**: `/images/chapa/gabriel-sathler.jpg`
   - **Dor Solucionada**: O improviso e a terra arrasada a cada troca de mandato.
   - **Fala Oficial**:
     > *"Centro Acadêmico não pode ser terra arrasada a cada troca de mandato. O site que construímos é a garantia de que as informações do curso, os tutoriais e o histórico da nossa graduação pertencem a todos os estudantes, não a uma diretoria. Ele já está no ar, opera com alimentação simples em Markdown e é um compromisso firmado em carta: o portal fica para Gestão Pública, independentemente do resultado das urnas."*
   - **Botão de Ação**: *"Ver Carta-Compromisso"*

2. **Etapa 2: Assessoria da Presidência — Lívia Martins**
   - **Elemento Destacado**: Seletor de Percurso e Guia "Como se Formar"
   - **Foto**: `/images/chapa/livia-martins.jpg`
   - **Dor Solucionada**: A burocracia inacessível das normas da UFMG e o visual carregado dos portais tradicionais.
   - **Fala Oficial**:
     > *"Não adianta ter uma montanha de documentos se ninguém entende o que precisa fazer para se formar. Estruturamos o site com base nas dores reais que enfrentamos na graduação: guias mastigados, visual limpo em Neobrutalismo e a facilidade de consultar tudo no celular sem perder horas decifrando resoluções truncadas."*
   - **Botão de Ação**: *"Explorar Guia Como se Formar"*

3. **Etapa 3: Vice-Presidência — Larissa Prado**
   - **Elemento Destacado**: Canal de Ouvidoria Contínua ("Reclame Aqui do Discente")
   - **Foto**: `/images/chapa/larissa-prado.jpg`
   - **Dor Solucionada**: A ausência de um canal permanente de escuta discente entre as assembleias.
   - **Fala Oficial**:
     > *"A representação estudantil precisa ser ativa e contínua. Criamos o canal de ouvidoria para que qualquer discente possa registrar reclamações sobre salas, demandas estruturais da FAFICH e sugestões para o colegiado com retorno documentado."*
   - **Botão de Ação**: *"Acessar Canal de Escuta"*

4. **Etapa 4: Diretoria Acadêmica — Mariana Presti**
   - **Elemento Destacado**: Painel de Pesquisa e Extensão (`/pesquisa`)
   - **Foto**: `/images/chapa/mariana-presti.jpg`
   - **Dor Solucionada**: O isolamento da pesquisa e a falta de visibilidade de editais de Iniciação Científica (IC).
   - **Fala Oficial**:
     > *"A pesquisa em Gestão Pública é vibrante, mas ficava escondida em planilhas esquecidas. No portal, centralizamos todos os laboratórios, grupos de estudo e editais de bolsas em tempo real. Oportunidade acadêmica tem que ser pública e acessível a todos."*
   - **Botão de Ação**: *"Ver Editais de IC e Bolsas"*

5. **Etapa 5: Marketing e Comunicação — João Pedro Fragoso**
   - **Elemento Destacado**: Feed de Notícias e Canal de Denúncia de Ementas Defasadas
   - **Foto**: `/images/chapa/joao-pedro-fragoso.jpg`
   - **Dor Solucionada**: A percepção de que CA só organiza festas; ementas curriculares desatualizadas.
   - **Fala Oficial**:
     > *"Comunicação de Centro Acadêmico é muito mais do que postar convite de festa no Instagram. Gestão Pública pede profundidade, seriedade e diálogo. O site é a nossa âncora: o espaço onde você encontra artigos, oportunidades e o canal de escuta para reportar disciplinas defasadas diretamente ao colegiado."*
   - **Botão de Ação**: *"Conhecer o Mural de Notícias"*

6. **Etapa 6: Diretoria Financeira — Vitória Moraes**
   - **Elemento Destacado**: Portal da Transparência Orçamentária (`/transparencia`) e Guia FUMP
   - **Foto**: `/images/chapa/vitoria-moraes.jpg`
   - **Dor Solucionada**: Caixas opacos e falta de orientação sobre auxílios socioeconômicos.
   - **Fala Oficial**:
     > *"O estudante trabalhador e o fumpista sustentam a universidade no dia a dia e precisam de retorno concreto. Pelo Portal da Transparência, cada centavo do CA poderá ser consultado publicamente. Além disso, mastigamos os tutoriais para que ninguém perca prazos de auxílios da FUMP por falta de informação."*
   - **Botão de Ação**: *"Auditar Caixa em Tempo Real"*

7. **Etapa 7: Articulação Política — Ítalo de Morais**
   - **Elemento Destacado**: Seção de Cursos Livres e Infraestrutura GitHub Pages
   - **Foto**: `/images/chapa/italo-morais.jpg`
   - **Dor Solucionada**: Gastos desnecessários com serviços terceirizados e dependência partidária.
   - **Fala Oficial**:
     > *"Autonomia e articulação política começam na capacidade de resolver os problemas do curso sem gastar rios de dinheiro com terceiros. O site é mantido em infraestrutura aberta e gratuita, fruto da cooperação estudantil, servindo de tribuna para a formação crítica independente."*
   - **Botão de Ação**: *"Conhecer Cursos Livres"*

8. **Etapa 8: Diretoria Jurídica — Lara Soares**
   - **Elemento Destacado**: Assistente de Estágio (TCE) e Dispensa Art. 41 (`/estagio`)
   - **Foto**: `/images/chapa/lara-soares.jpg`
   - **Dor Solucionada**: Desespero burocrático e atraso na assinatura de contratos de estágio na UFMG.
   - **Fala Oficial**:
     > *"Poucas coisas causam tanto estresse na graduação quanto conseguir uma vaga de estágio e ver o contrato parado porque você não sabe para quem enviar ou como preencher os termos. Estruturamos modelos prontos e o roteiro formal esquematizado para que você não perca tempo nem direitos."*
   - **Botão de Ação**: *"Gerar Termo de Estágio"*

9. **Etapa 9: Diretoria de Cultura — Paloma Correia & Alice Maurício**
   - **Elemento Destacado**: Guia do Turno Noturno e Calendário Unificado
   - **Foto**: `/images/chapa/paloma-alice.jpg`
   - **Dor Solucionada**: Eventos universitários em horários excludentes para estudantes que trabalham.
   - **Fala Oficial**:
     > *"Gestão Pública é um curso noturno, feito por quem trabalha o dia inteiro e não pode comparecer a eventos às duas da tarde. No site, você encontra o calendário unificado de eventos culturais e acolhimento pensado especificamente para integrar sem excluir quem estuda à noite."*
   - **Botão de Ação**: *"Ver Calendário Cultural Noturno"*

---

## 4. Campaign Non-Negotiables & Technical Quality Floors

1. **Zero Broken Links**: An error 404 during campaign season directly undermines the credibility narrative. All links must resolve or fail gracefully with contextual fallback.
2. **Touch Targets >= 44x44pt**: Over 85% of student traffic arrives via smartphones on campus Wi-Fi or mobile data. Touch accessibility is a democratic requirement.
3. **Instant Interactive Feedback**: Buttons must feature tactile Neobrutalist active translations (`active:translate-x-0.5 active:translate-y-0.5`) and immediate visual feedback.
4. **Data Sovereignty & Privacy**: The student's academic progress data stays strictly in their browser (`LocalStorage` / `studentVault.ts`). No remote backend surveillance, and zero election preference data exported in backup files.
