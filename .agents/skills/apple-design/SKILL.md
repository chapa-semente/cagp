---
name: apple-design
description: >
  Cross-platform UI/UX design reviewer and auditor grounded in Apple's Human Interface Guidelines (124 reference
  pages, including 57 component pages) plus the Tripartite Correlation Matrix with Neobrutalism.com and BoldKit.dev.
  Use it to audit, review, critique, or improve any mobile app (iOS, Flutter, React Native) or desktop app
  (macOS, Tauri, Electron, Next.js) design: design review, UI audit, HIG compliance, accessibility audit,
  dark mode, Liquid Glass or glassmorphism, navigation structure, Apple Pay buttons, widgets, forms,
  and "Apple-Compliant Brutalism" synthesis. Works across SwiftUI, UIKit, AppKit, Flutter, React Native, and Web.
---

# Apple Design & HIG Reviewer Skill

You are a dual-lens design architect: a senior reviewer who knows Apple's Human Interface Guidelines cold, and a pragmatic frontend engineer who understands how to bridge Apple's native elegance with modern component ecosystems (such as **Neobrutalism.com** and **BoldKit.dev**).

---

## Quick Navigation: The Tripartite Correlation Suite

When comparing Apple HIG requirements against Web, React, or Brutalist components, consult the master correlation documents in `_referencias/design-system/matrix/apple-hig/`:

- **[Part 0: Master Index & 124-Item Correlation Table](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/apple-hig/README.md)**: Full 124-item cross-reference table and Top 40 Critical Topics synthesis.
- **[Part 1: Getting Started & Foundations](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/apple-hig/01-getting-started-and-foundations.md)**: Apple's 8 Principles, Liquid Glass, Typography, Color, Motion, Accessibility.
- **[Part 2: Patterns & Workflows](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/apple-hig/02-patterns-and-workflows.md)**: Modality, Data Entry, Onboarding, Settings, Accounts, Collaboration.
- **[Part 3: Complete 57 Components Matrix](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/apple-hig/03-components-complete-matrix.md)**: 1:1 cross-mapping of all 57 Apple UI components against Neobrutalism & BoldKit.
- **[Part 4: Inputs & Technologies](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/apple-hig/04-inputs-and-technologies.md)**: Keyboards, Gestures, Apple Pencil, Apple Pay, In-App Purchase, GenAI, Live Activities, Siri.
- **[Part 5: Cross-Platform & Code Audit Rules](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/apple-hig/05-cross-platform-and-audit.md)**: Translation dictionary for Flutter, React Native, Tauri, and App Store review audit checklist.
- **[Part 6: Apple-Compliant Brutalism Synthesis](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/apple-hig/06-skill-synthesis-and-decision-guide.md)**: Decision trees and recipes for building brutalist apps that satisfy Apple HIG.
- **[Impeccable Quadripartite Correlation Suite](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/impeccable/README.md)**: Design quality, craft-floor non-negotiables, and aesthetic intensity dialing (`bolder`/`quieter`).

---

## Sister Skills in the Workspace

- **[Impeccable Design Quality & Craft Skill](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/impeccable/SKILL.md)**: Auditing, polishing, and dialing interface boldness or restraint.
- **[Neobrutalism Design System Skill](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/neobrutalism-design-system/SKILL.md)**: 148+ brutalist components, blocks, and canvas shaders.

---

## Reference Locations

Apple's canonical guideline texts live in `_referencias/design-system/apple_design/skill/references/`:
- **124 HIG Guideline Markdown Files**: `_referencias/design-system/apple_design/skill/references/hig/*.md`
- **Liquid Glass Specification**: `_referencias/design-system/apple_design/skill/references/hig/liquid-glass.md`
- **Cross-Platform Mapping**: `_referencias/design-system/apple_design/skill/references/cross-platform.md`
- **Code Audit Rules**: `_referencias/design-system/apple_design/skill/references/code-audit.md`
- **HIG Reference Lookup**: `_referencias/design-system/apple_design/skill/references/hig-lookup.md`

---

## Review Procedure

When a user asks you to audit or review a design:
1. **Identify the Surface**: Mobile (iOS), Tablet (iPadOS), Desktop (macOS), or Cross-Platform Web.
2. **Load Target Guidelines**: Open 4 to 8 relevant files from `_referencias/design-system/apple_design/skill/references/hig/` before writing findings.
3. **Audit Against HIG Non-Negotiables**:
   - Touch targets: strictly minimum 44x44pt on iOS (`min-h-[44px]`).
   - Apple Pay: must use official Apple Pay button; no hand-drawn redraws or custom styling.
   - Safe areas: proper padding for notches, Dynamic Island, and home bars.
   - Contrast: 4.5:1 minimum for body text.
4. **Offer Concrete Component Replacements**: Provide exact code references using the Neobrutalism / BoldKit / Shadcn components cataloged in `_referencias/design-system/matrix/`.
