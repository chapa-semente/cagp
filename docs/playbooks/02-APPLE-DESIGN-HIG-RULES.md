# Guia de Implementação: Apple HIG no Super App CAGP

> **Tradução das Diretrizes de Interface Humana da Apple (HIG) para Astro + Tailwind CSS v4**  
> **Destinatários:** Agentes de IA e Desenvolvedores de Frontend  
> **Localização:** [`docs/playbooks/02-APPLE-DESIGN-HIG-RULES.md`](file:///home/gsathler/Nextcloud/Projects/cagp/docs/playbooks/02-APPLE-DESIGN-HIG-RULES.md)

---

## 1. Princípios Apple HIG Fundamentais

O Super App CAGP segue as Human Interface Guidelines da Apple adaptadas para a web moderna:

1. **Clareza (*Clarity*):** O texto é perfeitamente legível em qualquer escala de tamanho, os ícones são precisos e autoexplicativos, as decorações não disputam atenção com o conteúdo principal.
2. **Deferência (*Deference*):** A interface recua para que o foco seja a experiência do estudante (acompanhar seu percurso acadêmico, calcular horas, ler comunicados). Elementos de navegação e botões são discretos e consistentes.
3. **Profundidade & Superfícies Sólidas:** Camadas visuais limpas com fundos sólidos (`bg-white` e `bg-[#FBF8F3]`), bordas estruturais de 1px (`border-[#DFDBD2]`) e elevação suave comunicam hierarquia espacial clara, **sem recorrer a vidro ou transparências (*Liquid Glass*) e sem modo escuro**.

---

## 2. Checklist Técnico Obrigatório (Apple HIG)

Ao refinar qualquer componente ou página, passe por este checklist:

| Diretriz HIG | Implementação em Tailwind CSS v4 | Regra de Aceitação |
| :--- | :--- | :--- |
| **Alvos de Toque (44pt)** | `min-h-[44px] min-w-[44px] inline-flex items-center justify-center` | **Absoluta:** Todo botão, link de menu ou controle interativo deve ter no mínimo 44px de altura/largura clicável. |
| **Superfícies Sólidas & Opacas** | `bg-white border border-[#DFDBD2] shadow-2xs` | **Sem Liquid Glass:** Cabeçalhos, menus e cartões são 100% opacos, com contraste nítido e borda de 1px. |
| **Cantos Arredondados Contínuos** | `rounded-2xl` (16px) e `rounded-3xl` (24px) | A curvatura contínua estilo *squircle* da Apple é aplicada em todos os cartões, folhas e caixas de diálogo. |
| **Folhas Deslizantes (Sheets)** | `fixed inset-x-0 bottom-0 rounded-t-3xl max-h-[90dvh]` | No mobile, modais sobem a partir da borda inferior com fundo branco sólido e puxador (`w-12 h-1.5 rounded-full bg-[#DFDBD2]`). |
| **Áreas Seguras (Safe Area)** | `pb-[calc(1rem+env(safe-area-inset-bottom))]` | Evita que botões fiquem colados na barra de gestos inferior do iPhone ou no topo do notch. |
| **Alturas Dinâmicas** | Usar sempre `dvh` em vez de `vh` (`h-dvh`, `max-h-[85dvh]`) | Previne quebras e cortes de tela quando a barra de endereços do Safari/Chrome se expande ou retrai. |
| **Controles Segmentados** | `bg-[#F4F1EA] p-1 rounded-xl` + botão ativo `bg-white shadow-2xs font-bold` | Para seleção de filtros ou alternância de abas de exibição. |

---

## 3. Padrões de Código Prontos para Uso

### 1. Barra Superior Sólida & Estável (Sem Liquid Glass)
```astro
<header class="sticky top-0 z-40 w-full bg-white border-b border-[#DFDBD2] shadow-2xs transition-all">
  <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
    <!-- Logotipo & Ações -->
  </div>
</header>
```

### 2. Botão de Toque Conforme HIG (Mínimo 44px)
```astro
<!-- Botão Primário (Vinho Institucional) -->
<button
  type="button"
  class="min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-xl bg-[#8B1E2D] hover:bg-[#0A0A0A] active:scale-[0.98] text-white font-['Oswald'] text-xs font-bold uppercase tracking-wider transition-all duration-150 inline-flex items-center justify-center gap-2 shadow-xs cursor-pointer select-none"
>
  <slot />
</button>
```

### 3. Controle Segmentado (Segmented Control)
```astro
<div
  role="tablist"
  class="bg-[#F4F1EA] p-1 rounded-xl border border-[#DFDBD2] inline-flex items-center gap-1 shadow-inner"
>
  <button
    role="tab"
    aria-selected="true"
    class="min-h-[40px] px-3.5 py-1.5 rounded-lg bg-white text-[#0A0A0A] font-['Oswald'] text-xs font-bold uppercase tracking-wide shadow-2xs transition-all cursor-pointer"
  >
    Aba Ativa
  </button>
  <button
    role="tab"
    aria-selected="false"
    class="min-h-[40px] px-3.5 py-1.5 rounded-lg text-[#57534E] hover:text-[#0A0A0A] font-['Oswald'] text-xs font-bold uppercase tracking-wide transition-all cursor-pointer"
  >
    Aba Secundária
  </button>
</div>
```

### 4. Puxador de Folha Deslizante (*Bottom Sheet Grabber*)
```tsx
{/* Indicador de gesto tátil para mobile */}
<div className="md:hidden flex justify-center pt-2 pb-3">
  <div className="w-12 h-1.5 rounded-full bg-[#DFDBD2] select-none pointer-events-none" />
</div>
```

---

## 4. Anti-Padrões a Evitar (Diretrizes Negativas)

- ❌ **Evitar Liquid Glass / Transparências:** Não usar desfoques de vidro (`backdrop-blur`), efeitos translúcidos ou reflexos. Todas as superfícies devem ser opacas, sólidas e com alto contraste.
- ❌ **Evitar Modo Escuro (*Dark Mode*):** O sistema não possui nem deve receber tema escuro. O design é 100% calibrado para o modo claro com fundo Papel Envelhecido (`#FBF8F3`) e cartões brancos (`#FFFFFF`).
- ❌ **Evitar botões menores que 44px:** Links ou botões de 28px ou 32px causam frustração e cliques incorretos no celular.
- ❌ **Evitar modais centrais no celular:** Em telas pequenas, modais centrais cortam o conteúdo; use sempre *Bottom Sheets*.
- ❌ **Evitar linhas de texto longas sem limite:** Nunca deixe parágrafos expandirem pela tela inteira; limite a `max-w-[70ch]`.
