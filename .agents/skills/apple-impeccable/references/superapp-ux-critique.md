# Guia de Crítica de UX & Arquitetura de Informação para Super Apps Universais

> **Propósito**: Estabelecer os princípios de arquitetura de informação, distribuição espacial, física de movimento, temas universais e o **Protocolo Consultivo Yoda / Grill Me** para avaliar, redistribuir e elevar a experiência do usuário (UX) em Super Apps multiplataforma (Android, Linux, iOS, macOS e Windows), garantindo harmonia visual, acessibilidade natural e paridade tátil entre os motores Chromium e WebKit/Safari.

---

## 1. Filosofia Consultiva: A Postura Yoda & Protocolo `/grill-me`

> [!IMPORTANT]
> **Postura Yoda: Orientadora, Empática e Jamais Impositiva**:
> A skill `apple-impeccable` **não dita regras autoritárias nem impõe soluções dogmáticas**. O papel do agente de design é atuar como um mentor sábio e experiente (estilo mestre Yoda):
> 1. Guia o raciocínio através de **perguntas socráticas e reflexões construtivas** antes de propor mudanças radicais.
> 2. Diagnostica pontos de atrito ergonômico, saturação cognitiva e quebras de consistência com justificativa física e fisiológica.
> 3. Sugere realocações estruturais e reorganizações espaciais acompanhadas de **exemplos práticos com código pronto** utilizando os design tokens do projeto (`--app-accent`, `--app-surface-card`, etc.).
> 4. Apresenta de forma transparente os **trade-offs (prós e contras)** de cada caminho.
> 5. A decisão final pertence sempre ao **usuário e ao raciocínio conjunto com a IA**.

### 1.1 O Roteiro Socrático `/grill-me` (Alinhamento Prévio de Decisões)

Quando o usuário solicitar uma crítica de tela, refatoração de fluxo ou ao executar `run-audit.sh critique`, a IA deve utilizar a dinâmica `/grill-me` para alinhar as decisões estruturais antes de aplicar mudanças pesadas:

```markdown
### 🧠 Alinhamento Consultivo Yoda / Grill Me

Antes de aplicarmos refatorações estruturais nesta tela, aqui estão 2 a 3 pontos fundamentais de trade-off para sua avaliação:

#### Questão 1: Ergonomia da Doca de Ações vs Área Útil da Viewport
- **Opção A (Doca Flutuante Fixa na Base - Recomendada)**:
  - *Prós*: Atalhos vitais alcançáveis com 1 toque no polegar em qualquer dispositivo móvel; consistência visual com o dock do desktop.
  - *Contras*: Ocupa ~60px de altura útil na viewport inferior.
- **Opção B (Gatilho Discreto + Bottom Sheet Sob Demanda)**:
  - *Prós*: Libera 100% da viewport para o miolo de conteúdo e leitura contínua.
  - *Contras*: Requer 2 toques para acionar qualquer serviço secundário (micro-atrito).

#### Questão 2: Densidade de Conteúdo e Nível de Detalhe Inicial
- **Opção A (Progressive Disclosure com Cards Colapsáveis - Recomendada)**:
  - *Prós*: 1ª dobra limpa, reduz carga cognitiva em 60%, foco imediato nas ações do dia.
  - *Contras*: Oculta detalhes aprofundados que exigem clique para expandir.
- **Opção B (Exposição Contínua em Feed Aberto)**:
  - *Prós*: Todo o conteúdo é descoberto apenas com scroll vertical.
  - *Contras*: Saturação visual e fadiga muscular em telas mobile extensas.

> **Qual direção melhor atende ao momento do projeto?** O prompt do usuário e o raciocínio conjunto determinarão a escolha final.
```

### 1.2 Estrutura Padronizada de Devolutiva Consultiva

Toda crítica pontual deve seguir rigorosamente a estrutura de 5 passos:

```markdown
### [Nome da Seção ou Componente Avaliado]

- **Diagnóstico**: O que foi observado na disposição atual (ex: excesso de 8 botões prioritários no topo, forçando alcance desconfortável com uma mão).
- **Por Que Importa**: Fundamentação ergonômica ou cognitiva (ex: a Lei de Fitts e o mapa da Thumb Zone mostram que usuários em trânsito no Android/iOS sofrem 3x mais fadiga muscular ao alcançar o terço superior).
- **Sugestão de Realocação**: Como redistribuir o conteúdo (ex: migrar os 4 serviços mais frequentes para um *Floating Action Dock* inferior e consolidar os demais em um *Bottom Sheet* com busca rápida).
- **Exemplo Prático (Código com Tokens)**: Snippet modular e testado utilizando variáveis do projeto.
- **Alternativas & Trade-offs**:
  - *Opção A (Dock Fixo)*: Acesso instantâneo com um toque, mas consome 64px de viewport vertical.
  - *Opção B (Gatilho + Sheet)*: Zero consumo de tela cheia, mas adiciona um toque extra (micro-atrito).
```

---

## 2. Distribuição Espacial de Super Apps: Thumb Zone vs Eye Zone

Em um Super App, dezenas de mini-apps, módulos e serviços convivem no mesmo ecossistema. A distribuição física deve respeitar o hardware e a fisiologia da mão humana, tanto em telas sensíveis ao toque (smartphones Android, iPhones) quanto em telas desktop (Linux, macOS, Windows).

### 2.1 O Mapa Espacial Universal

```
+---------------------------------------------------+
| [EYE ZONE / STATUS]                               |
| Topo da tela: Status, Títulos, Notificações,      |
| Perfil Discente, Indicadores de Conexão.          |
| -> Zona de Leitura Passiva e Baixa Interação Freq.|
+---------------------------------------------------+
| [CONTENT & SERVICE MATRIX]                        |
| Miolo da tela: Feed de Avisos, Cards de Módulos,  |
| Gráficos, Horários, Calendário, Carrosséis.       |
| -> Navegação por rolagem contínua fluida.         |
+---------------------------------------------------+
| [NATURAL THUMB ZONE / ACTION DOCK]                |
| Base da tela (últimos 35% da altura):             |
| CTAs Primários, Dock de Atalhos, Ações de Apoio,  |
| Gatilhos de Bottom Sheet e Navegação Principal.   |
| -> Zona de Alcance sem Esforço (Touch sem Fadiga) |
+---------------------------------------------------+
```

### 2.2 Recomendações de Realocação Espacial

1. **Desafogar o Cabeçalho (Header Cleansing)**:
   - *Problema comum*: Acúmulo de mais de 4 ícones no topo (Spotlight, Notificações, Perfil, Modo Escuro, Ajuda, Configurações).
   - *Recomendação*: Manter no topo estritamente a identidade, estado do usuário e busca global. Mover ações operacionais recorrentes para a base.
2. **Quick Action Dock (Dock Inferior de Serviços)**:
   - Aloque as ações de maior frequência em um dock flutuante ou barra de navegação inferior com altura tátil segura (`min-height: 48px`, alvos `44x44px` ou `48x48px`).
3. **Cards Colapsáveis e Seções Progressivas**:
   - Para telas com mais de 5 seções temáticas, priorize as duas mais relevantes do dia e apresente as demais em cartões recolhíveis com sumário visual (ex: badge numérica ou progresso percentual).

---

## 3. Dinâmica de Fluid Glass, Materiais e Profundidade

O design de materiais translúcidos (Liquid Glass / Frosted Glass) confere profundidade hierárquica a Super Apps, permitindo que o usuário mantenha o senso de contexto espacial ao abrir modais e docks flutuantes.

### 3.1 Pilares de Legibilidade sobre Vidro Dinâmico

1. **Contraste Dinâmico Universal**:
   - A opacidade de fundo do material nunca deve comprometer a razão de contraste WCAG 2.1 AA (mínimo 4.5:1 para texto normal e 3:1 para títulos/ícones).
   - Quando o conteúdo rolar por trás de uma barra translúcida, a camada deve saturar (`saturate(180%)` a `190%`) e aplicar blur suficiente (`blur(20px)` ou mais) para que formas de alta frequência não causem ilusão de borrão na tipografia.
2. **Iluminação Especular e Borda Hairline**:
   - Para destacar o plano de vidro sem recorrer a sombras pesadas ou artificiais, aplique uma borda de meio pixel (`0.5px` ou `1px`) com luz direcional simulada via gradiente sutil:
     ```css
     .liquid-glass-dock {
       background: color-mix(in srgb, var(--app-surface-canvas, #ffffff) 82%, transparent);
       -webkit-backdrop-filter: blur(20px) saturate(190%);
       backdrop-filter: blur(20px) saturate(190%);
       border: 0.5px solid color-mix(in srgb, var(--app-border-hairline, #000000) 12%, transparent);
       box-shadow: 0 8px 32px -8px rgba(0, 0, 0, 0.12);
       isolation: isolate;
       transform: translateZ(0);
     }
     ```
3. **Prevenção do "Efeito Névoa"**:
   - Evite empilhar múltiplos níveis de `backdrop-filter` simultâneos (ex: dock de vidro sobre card de vidro sobre modal de vidro). Isso gera sobrecarga de composição na GPU e degrada a taxa de quadros (FPS) em aparelhos Android e distribuições Linux com drivers integrados.
4. **Respeito à Transparência Reduzida**:
   - Quando o sistema solicitar transparência reduzida, o vidro deve converter-se em superfície sólida opaca sem perda de contraste:
     ```css
     @media (prefers-reduced-transparency: reduce) {
       .liquid-glass-dock {
         background: var(--app-surface-elevated, #ffffff);
         -webkit-backdrop-filter: none;
         backdrop-filter: none;
       }
     }
     ```

---

## 4. Dinâmica de Animações & Física de Molas (Springs)

Animações de alta fidelidade comunicam causalidade física e conferem naturalidade intuitiva tanto em touchscreens Android quanto em janelas desktop Linux/macOS.

### 4.1 Curvas Orgânicas vs Easing Linear

1. **Curvas de Mola Apple (Spring Physics)**:
   - Substitua transições lineares ou `ease-in-out` robóticas por curvas de mola naturais:
     ```css
     /* Mola Apple padrão: resposta rápida inicial com amortecimento suave */
     --spring-smooth: cubic-bezier(0.25, 1, 0.5, 1);
     /* Mola elástica com leve overshoot para microinterações táteis */
     --spring-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
     ```
2. **Compressão Tátil `:active` com Retorno Imediato**:
   - Botões, cards e abas devem responder instantaneamente ao toque com leve compressão física (`scale(0.965)`) sem atrasos de 300ms:
     ```css
     .btn-tactile {
       transition: transform 0.16s var(--spring-smooth), filter 0.12s ease;
       touch-action: manipulation;
     }
     .btn-tactile:active {
       transform: scale(0.965);
       filter: brightness(0.94);
     }
     ```
3. **Paridade 60fps / 120fps (Zero Stutter no Android e Linux)**:
   - Anime exclusivamente propriedades tratadas pela GPU: `transform` e `opacity`.
   - Evite animar `height`, `width`, `top`, `margin` ou `filter` contínuos durante scrolls.
4. **Acessibilidade de Movimento (`prefers-reduced-motion`)**:
   - Garanta que todas as animações decorativas sejam instantâneas ou convertidas em cross-fades sutis quando solicitado:
     ```css
     @media (prefers-reduced-motion: reduce) {
       *, *::before, *::after {
         animation-duration: 0.01ms !important;
         animation-iteration-count: 1 !important;
         transition-duration: 0.01ms !important;
       }
     }
     ```

---

## 5. Engenharia de Onboarding e Redução de Atrito

Um Super App bem-sucedido não exige cadastro complexo antes de demonstrar seu valor real.

### 5.1 Princípio do "Valor Antes da Autenticação" (*Value-First*)

1. **Acesso Público Imediato**:
   - Permita que o usuário explore o guia de serviços, cardápio, notícias e calendário sem exigir login institucional imediato.
   - Solicite autenticação apenas quando o recurso exigir armazenamento de estado privado (ex: sincronização de notas, emissão de atestados, cofre discente).
2. **Revelação Progressiva (*Progressive Disclosure*)**:
   - Não sobrecarregue a primeira inicialização com um tutorial longo de 10 passos estáticos que todos pulam.
   - Apresente dicas contextuais no momento em que a ação for relevante (estilo Apple TipKit).
3. **Telas de Acolhimento e Primeiro Acesso**:
   - Forneça ilustrações semânticas leves, proposição de valor em 1 a 2 frases claras e um CTA direto ("Explorar Serviços").
   - Trate o estado vazio (*Empty State*) de maneira acolhedora, fornecendo um botão imediato para adicionar ou explorar itens.

---

## 6. Ergonomia de Botões, Docks & Microinterações

### 6.1 Hierarquia de Ações

1. **CTA Primário de Ação Rápida**:
   - Deve ser visualmente destacado com a cor semântica primária do projeto (`--app-accent`), preenchimento sólido e alvo físico generoso (`min-height: 44px`).
2. **Ações Secundárias e Terciárias**:
   - Botões com fundo transparente e borda sutil (*Outline* ou *Tinted*) para ações secundárias.
   - Botões apenas texto (*Plain*) para ações de cancelamento ou dispensa.
3. **Ações Destrutivas**:
   - Sempre sinalizadas em tom de perigo semântico (`--app-color-danger` ou equivalente) e exigindo confirmação explícita em dois passos antes da execução irreversível.
4. **Física de Compressão Tátil & Feedback Háptico**:
   - Todos os botões interativos devem responder com vibração tátil sutil em dispositivos móveis (`navigator.vibrate(8)`) e clique acústico sutil opcional via Web Audio API.

---

## 7. Arquitetura de Temas & Acessibilidade Visual Universal

Um Super App universal precisa acolher diversos contextos de uso: estudantes e profissionais utilizando o app em salas escuras à noite, em trânsito sob sol forte, ou usuários com baixa acuidade visual.

### 7.1 Os Três Modos de Tema Universais

1. **Modo Claro Natural (Light Canvas)**:
   - Superfície clara com bom espaçamento, fundos quentes ou neutros (`--app-surface-canvas`), tipografia de alto contraste (#0A0A0A ou equivalente).
2. **Modo Noturno / Dark Mode Semântico**:
   - Essencial para turnos noturnos e economia de energia em telas OLED/AMOLED (Android e iPhone).
   - Fundo profundo grafite/nanquim (`#0d0d0d` a `#121214`), superfícies elevadas levemente iluminadas (`#1a1a1e`) e textos em branco suave (`#f2f2f7`), evitando o contraste branco puro sobre preto puro que gera efeito estroboscópico.
3. **Modo Alto Contraste AAA (A11y)**:
   - Ativado via `html[data-a11y-contrast="high"]` ou `@media (prefers-contrast: more)`.
   - Elimina transparências, gradientes e sombras sutis, adotando bordas sólidas nítidas (1.5px a 2px) e contraste de cor superior a 7:1.

---

## 8. Inspeção Visual ao Vivo no Navegador (`/browser`)

Ao analisar a interface em execução via URL local (ex: `http://localhost:4321`):

1. **Modo Dual Automático**:
   - **Mobile (390x844)**: Simula o uso com uma única mão em smartphones Android e iOS, verificando:
     - Itens dentro da Thumb Zone (área entre Y: 500px e Y: 844px).
     - Alvos de toque com área real computada de pelo menos 44x44px.
     - Altura de cabeçalhos e barras de status respeitando `safe-area-inset`.
   - **Desktop (1440x900)**: Simula visualização widescreen em laptops Linux e macOS, verificando:
     - Aproveitamento de espaço sem linhas de texto excessivamente longas (limite ideal: 65 a 80 caracteres por linha).
     - Comportamento de docks flutuantes migrando para barras laterais ou cabeçalhos amplos com atalhos de teclado visíveis.
2. **Métricas de Contraste e Layout Shifts**:
   - Avaliação direta das cores de texto renderizadas sobre planos de fundo dinâmicos com `window.getComputedStyle`.
   - Detecção de elementos que causam deslocamento cumulativo de layout (CLS) durante o carregamento de fontes ou imagens.

---

## 9. Roteiro Prático de Crítica (Checklist Yoda)

Ao revisar uma tela ou fluxo com esta skill, responda mentalmente:

- [ ] **Alinhamento Yoda / Grill Me**: Formulei 2 a 3 perguntas socráticas de trade-off para que o usuário guie as decisões de arquitetura?
- [ ] **Thumb Zone**: O botão de ação mais importante da tela pode ser tocado sem esticar o polegar até o topo?
- [ ] **Densidade Visual**: Há mais de 7 itens disputando a atenção primária no primeiro scroll? Se sim, quais podem virar agrupamentos colapsáveis ou sheets?
- [ ] **Animações & Molas**: As transições usam curvas de mola naturais (`--spring-smooth`) com fallback para `prefers-reduced-motion`?
- [ ] **Fluid Glass**: O texto que passa por trás da barra de vidro permanece 100% legível em modo claro e modo escuro?
- [ ] **Atrito de Onboarding**: O usuário consegue entender o benefício da tela sem precisar ler um manual ou criar conta imediatamente?
- [ ] **Paridade Multiplataforma**: A experiência no Chrome para Android ou no Firefox para Linux é tão fluida e tátil quanto no Safari para iOS?
- [ ] **Arquitetura de Temas**: O sistema responde a preferências de modo noturno e alto contraste sem quebrar o contraste do texto?
- [ ] **Tom Consultivo**: Minha devolutiva propõe alternativas com prós/contras em vez de ditar ordens imperativas?
