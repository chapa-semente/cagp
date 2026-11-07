# Part 6: Subagent Swarm Playbook & Autonomous Code Orchestration

This document provides the operational playbook for **Autonomous Multi-Agent Swarms**, detailing how AI coding agents orchestrate **Impeccable's 4 specialized subagents** in tandem with `.agents/skills/apple-design` and `.agents/skills/neobrutalism-design-system` across the 4-way design ecosystem.

---

## Layer 2: Macro-Thematic Group Analysis

### 1. The Autonomous Multi-Agent Swarm Architecture
Rather than relying on a single monolithic LLM prompt to design, write, polish, and audit UI code, modern agentic frontend workflows partition responsibilities among specialized autonomous subagents:

```
                                [Parent Coding Agent]
                                          │
         ┌──────────────────┬─────────────┴──────────────┬──────────────────┐
         ▼                  ▼                            ▼                  ▼
  [Finish Reviewer]   [Documenter]               [Asset Producer]   [Edit Applier]
  • Pedantic polish   • Reverse-engineers        • Generates SVG    • Surgical code
  • HIG compliance      DESIGN.md from code        seals & stamps     diff execution
  • A11y & contrast   • Token drift check        • Brutalist marks  • Zero-loss edit
```

### 2. Tri-Skill Interconnection Architecture
The repository links three powerful skills together in a unified network:
1. **`apple-design`**: Audits platform fidelity against Apple's 124 HIG pages, checking touch targets, Apple Pay rules, and safe area compliance.
2. **`neobrutalism-design-system`**: Catalogs 148+ brutalist components, 20 layout blocks, 23 canvas shaders, and executes Shadcn CLI installations.
3. **`impeccable`**: Acts as the design director and taste arbiter, providing the 4 modes (`Persuade`, `Operate`, `Read`, `Experience`), the transformation engine (`bolder`/`quieter`), and the `craft-floor.md` quality gate.

---

## Layer 3: The 4 Specialized Subagent Technical Cards & Playbooks

### 6.1 `impeccable-finish-reviewer.md` — Impeccable Finish Reviewer

| Dimension | Technical Detail |
| :--- | :--- |
| **Subagent Spec** | [`agents/impeccable-finish-reviewer.md`](../../impeccable/skill/agents/impeccable-finish-reviewer.md) |
| **Apple HIG Correlation** | `_referencias/design-system/apple_design/skill/references/code-audit.md` |
| **BoldKit.dev Correlation** | `boldkit/components/ (tactile polish checks)` |
| **Neobrutalism Correlation** | `neobrutalism/ui/ (state checks)` |
| **Common Ground** | Rigorous inspection of interactive states, pixel alignment, and focus rings. |
| **Quadripartite Particularities** | Acts as the hostile design lead, rejecting unhandled hover states, blurry shadows, missing loading spinners, or sub-44pt mobile buttons. |

**Autonomous Swarm Execution Recipe**:
- Invoke with `invoke_subagent` passing the target component file and asking for a comprehensive review against `craft-floor.md` and Apple HIG rules.

---

### 6.2 `impeccable-documenter.md` — Impeccable Design System Documenter

| Dimension | Technical Detail |
| :--- | :--- |
| **Subagent Spec** | [`agents/impeccable-documenter.md`](../../impeccable/skill/agents/impeccable-documenter.md) |
| **Apple HIG Correlation** | `_referencias/design-system/apple_design/skill/references/hig-lookup.md` |
| **BoldKit.dev Correlation** | `boldkit/registry.json, styles/globals.css` |
| **Neobrutalism Correlation** | `neobrutalism/styling/globals.css` |
| **Common Ground** | Extracting and maintaining single-source-of-truth documentation for tokens and component variants. |
| **Quadripartite Particularities** | Scans codebase CSS variables, Tailwind `@theme` declarations, and CVA component variants to produce or update a structured `DESIGN.md`. |

**Autonomous Swarm Execution Recipe**:
- Run `npx impeccable document` or dispatch `impeccable-documenter` to reverse-engineer project styling into a formal design token catalog.

---

### 6.3 `impeccable-asset-producer.md` — Impeccable Asset Producer

| Dimension | Technical Detail |
| :--- | :--- |
| **Subagent Spec** | [`agents/impeccable-asset-producer.md`](../../impeccable/skill/agents/impeccable-asset-producer.md) |
| **Apple HIG Correlation** | `_referencias/design-system/apple_design/skill/references/hig/app-icons.md` |
| **BoldKit.dev Correlation** | `boldkit/extras/shapes.md (64 retro SVG shapes & stamps)` |
| **Neobrutalism Correlation** | `neobrutalism/ui/badge.tsx` |
| **Common Ground** | Creating scalable, accessible vector SVG assets, retro stamps, badges, and illustrations. |
| **Quadripartite Particularities** | Generates standalone SVG markup with 3px solid black strokes, multi-pointed starbursts, and custom brand marks. |

**Autonomous Swarm Execution Recipe**:
- Instruct `impeccable-asset-producer` to output clean SVG code with `stroke-foreground stroke-[3px] fill-primary` for immediate copy-pasting.

---

### 6.4 `impeccable-manual-edit-applier.md` — Impeccable Manual Edit Applier

| Dimension | Technical Detail |
| :--- | :--- |
| **Subagent Spec** | [`agents/impeccable-manual-edit-applier.md`](../../impeccable/skill/agents/impeccable-manual-edit-applier.md) |
| **Apple HIG Correlation** | `_referencias/design-system/apple_design/skill/references/cross-platform.md` |
| **BoldKit.dev Correlation** | `boldkit/blocks-code/ (surgical updates)` |
| **Neobrutalism Correlation** | `neobrutalism/ui/ (clean diffs)` |
| **Common Ground** | Executing surgical, zero-regression code changes across existing project files. |
| **Quadripartite Particularities** | Applies precise replacements without reformatting unrelated code, stripping developer comments, or altering imports unnecessarily. |

**Autonomous Swarm Execution Recipe**:
- Use `edit_file` to swap out CSS classes (e.g. converting `border-border` to `border-3 border-foreground shadow-[4px_4px_0px_#000]`).

---

## End-to-End Autonomous Swarm Workflow Example

```bash
# Step 1: Initialize product truth
npx impeccable init

# Step 2: Install primary layout blocks & UI primitives from BoldKit registry
npx shadcn@latest add "https://boldkit.dev/r/hero-section.json"
npx shadcn@latest add "https://boldkit.dev/r/pricing-section.json"

# Step 3: Run critique and audit against Apple HIG & Impeccable rules
npx impeccable critique src/components/Hero.tsx
npx impeccable audit --target src/components/Hero.tsx

# Step 4: Dial intensity (e.g. make buttons quieter or bolder based on mode)
npx impeccable bolder src/components/Hero.tsx
npx impeccable polish src/components/Hero.tsx
```