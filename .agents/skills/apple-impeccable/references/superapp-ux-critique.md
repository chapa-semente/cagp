# Guia de Crítica de UX & Arquitetura de Informação para Super Apps Universais

> **Propósito**: Estabelecer os princípios, padrões de distribuição espacial e o protocolo consultivo para avaliar, redistribuir e elevar a experiência do usuário (UX) em Super Apps multiplataforma (Android, Linux, iOS, macOS e Windows), garantindo harmonia visual, acessibilidade natural e paridade tátil entre os motores Chromium e WebKit/Safari.

---

## 1. Filosofia Consultiva: A Abordagem Não Ditatorial

> [!IMPORTANT]
> **Postura Consultiva (Não Impositiva)**:
> A skill `apple-impeccable` **não dita dogmas nem impõe soluções unilaterais**. O papel do agente de design é atuar como um conselheiro sênior de UX:
> 1. Apontar atritos ergonômicos e gargalos de densidade com empatia e justificativa técnica.
> 2. Sugerir realocações estruturais e reorganizações espaciais.
> 3. Fornecer exemplos concretos e prontos para uso vinculados aos tokens semânticos do projeto (`--app-accent`, `--app-surface-card`, etc.).
> 4. Discutir abertamente as vantagens e desvantagens (*trade-offs*) de cada abordagem.
> 5. Deixar a decisão final nas mãos do usuário e do raciocínio conjunto com a IA.

### Estrutura Padronizada de Devolutiva Consultiva

Ao realizar uma crítica de interface, estruture cada recomendação no seguinte formato:

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
   - *Recomendação*: Manter no topo estritamente a identidade, estado discente e busca global. Mover ações operacionais recorrentes para a base.
2. **Quick Action Dock (Dock Inferior de Serviços)**:
   - Aloque as ações de maior frequência (ex: Carteirinha/Passaporte, Horário do Dia, Mural, Restaurante Universitário) em um dock flutuante ou barra de navegação inferior com altura tátil segura (`min-height: 48px`, alvos `44x44px` ou `48x48px`).
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

---

## 4. Engenharia de Onboarding e Redução de Atrito

Um Super App bem-sucedido não exige cadastro complexo antes de demonstrar seu valor real.

### 4.1 Princípio do "Valor Antes da Autenticação" (*Value-First*)

1. **Acesso Público Imediato**:
   - Permita que o usuário explore o guia de serviços, cardápio, notícias e calendário sem exigir login institucional imediato.
   - Solicite autenticação apenas quando o recurso exigir armazenamento de estado privado (ex: sincronização de notas, emissão de atestados, cofre discente).
2. **Revelação Progressiva (*Progressive Disclosure*)**:
   - Não sobrecarregue a primeira inicialização com um tutorial longo de 10 passos estáticos que todos pulam.
   - Apresente dicas contextuais no momento em que a ação for relevante (ex: ao favoritar o primeiro serviço, ensinar onde os atalhos ficam salvos).
3. **Telas de Acolhimento e Primeiro Acesso**:
   - Forneça ilustrações semânticas leves, proposição de valor em 1 a 2 frases claras e um CTA direto ("Explorar Serviços").
   - Trate o estado vazio (*Empty State*) de maneira acolhedora, fornecendo um botão imediato para adicionar ou explorar itens.

---

## 5. Ergonomia de Botões, Docks & Microinterações

### 5.1 Hierarquia de Ações

1. **CTA Primário de Ação Rápida**:
   - Deve ser visualmente destacado com a cor semântica primária do projeto (`--app-accent`), preenchimento sólido e alvo físico generoso (`min-height: 44px`).
2. **Ações Secundárias e Terciárias**:
   - Botões com fundo transparente e borda sutil (*Outline* ou *Tinted*) para ações secundárias.
   - Botões apenas texto (*Plain*) para ações de cancelamento ou dispensa.
3. **Ações Destrutivas**:
   - Sempre sinalizadas em tom de perigo semântico (`--app-color-danger` ou equivalente) e exigindo confirmação explícita em dois passos antes da execução irreversível.
4. **Física de Compressão Tátil**:
   - Todos os botões interativos devem responder instantaneamente com feedback elástico de compressão (`scale(0.965)` em `:active`) e vibração tátil sutil em dispositivos móveis (`navigator.vibrate(8)`).

---

## 6. Inspeção Visual ao Vivo no Navegador (`/browser`)

Ao analisar a interface em execução via URL local (ex: `http://localhost:4321`):

1. **Modo Dual Automático**:
   - **Mobile (390x844)**: Simula o uso com uma única mão em smartphones Android e iOS, verificando:
     - Itens dentro da Thumb Zone (área entre Y: 500px e Y: 844px).
     - Alvos de toque com área real computada de pelo menos 44x44px.
     - Altura de cabeçalhos e barras de status respeitando `safe-area-inset`.
   - **Desktop (1440x900)**: Simula visualização widescreen em laptops Linux e macOS, verificando:
     - Aproveitamento de espaço sem linhas de texto excessivamente longas (limite ideal: 65 a 80 caracteres por linha).
     - Comportamento de docks flutuantes migrando para barras laterais ou cabeçalhos amplos com atalhos de teclado visíveis.
2. **Métricas de Contraste Computadas**:
   - Avaliação direta das cores de texto renderizadas sobre planos de fundo dinâmicos com `window.getComputedStyle`.

---

## 7. Roteiro Prático de Crítica (Checklist Rápido)

Ao revisar uma tela ou fluxo com esta skill, responda mentalmente:

- [ ] **Thumb Zone**: O botão de ação mais importante da tela pode ser tocado sem esticar o polegar até o canto superior?
- [ ] **Densidade Visual**: Há mais de 7 itens disputando a atenção primária no primeiro scroll? Se sim, quais podem virar agrupamentos colapsáveis ou sheets?
- [ ] **Fluid Glass**: O texto que passa por trás da barra de vidro permanece 100% legível em modo claro e alto contraste?
- [ ] **Atrito de Onboarding**: O usuário consegue entender o benefício da tela sem precisar ler um manual ou criar conta imediatamente?
- [ ] **Paridade Multiplataforma**: A experiência no Chrome para Android ou no Firefox para Linux é tão fluida e tátil quanto no Safari para iOS?
- [ ] **Tom Consultivo**: Minha devolutiva propõe alternativas com prós/contras em vez de ditar ordens imperativas?
