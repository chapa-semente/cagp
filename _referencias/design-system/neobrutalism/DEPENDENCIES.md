# Neobrutalism.com — Dependências Oficiais de Referência

Este documento registra as dependências, ferramentas de compilação e versões originais especificadas pelo autor de [Neobrutalism.com](https://neobrutalism.com).

## Runtime Dependencies

| Pacote | Versão | Propósito |
| :--- | :--- | :--- |
| `@base-ui/react` | `^1.8.0` | Core runtime / UI primitive |
| `@devnomic/marquee` | `^1.0.2` | Core runtime / UI primitive |
| `@hookform/resolvers` | `^3.3.4` | Core runtime / UI primitive |
| `@ianvs/prettier-plugin-sort-imports` | `^4.2.1` | Core runtime / UI primitive |
| `@mdx-js/loader` | `^3.1.0` | Core runtime / UI primitive |
| `@mdx-js/react` | `^3.1.0` | Core runtime / UI primitive |
| `@next/mdx` | `^15.2.1` | Core runtime / UI primitive |
| `@shadcn/react` | `^0.3.1` | Core runtime / UI primitive |
| `@shikijs/compat` | `^2.5.0` | Core runtime / UI primitive |
| `@stefanprobst/rehype-extract-toc` | `^2.2.1` | Core runtime / UI primitive |
| `@tailwindcss/postcss` | `^4.3.3` | Core runtime / UI primitive |
| `@tailwindcss/typography` | `^0.5.11` | Core runtime / UI primitive |
| `@tanstack/react-table` | `^9.2.4` | Core runtime / UI primitive |
| `@types/mdx` | `^2.0.13` | Core runtime / UI primitive |
| `@types/node` | `20.4.5` | Core runtime / UI primitive |
| `@types/react` | `19.0.10` | Core runtime / UI primitive |
| `@types/react-dom` | `19.0.4` | Core runtime / UI primitive |
| `class-variance-authority` | `^0.7.1` | Core runtime / UI primitive |
| `clsx` | `^2.1.1` | Core runtime / UI primitive |
| `cmdk` | `^1.1.1` | Core runtime / UI primitive |
| `date-fns` | `^4.4.0` | Core runtime / UI primitive |
| `embla-carousel-react` | `^8.6.0` | Core runtime / UI primitive |
| `eslint` | `8.45.0` | Core runtime / UI primitive |
| `eslint-config-next` | `15.2.0` | Core runtime / UI primitive |
| `eslint-config-prettier` | `^8.8.0` | Core runtime / UI primitive |
| `fs` | `^0.0.1-security` | Core runtime / UI primitive |
| `input-otp` | `^1.5.0` | Core runtime / UI primitive |
| `lucide-react` | `^1.42.0` | Core runtime / UI primitive |
| `next` | `15.2.8` | Core runtime / UI primitive |
| `path` | `^0.12.7` | Core runtime / UI primitive |
| `postcss` | `8.4.27` | Core runtime / UI primitive |
| `prettier` | `^3.4.2` | Core runtime / UI primitive |
| `prettier-plugin-tailwindcss` | `^0.6.11` | Core runtime / UI primitive |
| `react` | `19.0.0` | Core runtime / UI primitive |
| `react-day-picker` | `^9.14.0` | Core runtime / UI primitive |
| `react-dom` | `19.0.0` | Core runtime / UI primitive |
| `react-hook-form` | `^7.87.0` | Core runtime / UI primitive |
| `react-resizable-panels` | `^4.12.4` | Core runtime / UI primitive |
| `recharts` | `^3.10.1` | Core runtime / UI primitive |
| `rehype-pretty-code` | `^0.14.0` | Core runtime / UI primitive |
| `rehype-slug` | `^6.0.0` | Core runtime / UI primitive |
| `remark-code-import` | `^1.2.0` | Core runtime / UI primitive |
| `shadcn` | `2.3.0` | Core runtime / UI primitive |
| `shiki` | `^1.29.2` | Core runtime / UI primitive |
| `tailwind-merge` | `^3.6.0` | Core runtime / UI primitive |
| `tailwindcss` | `4.3.3` | Core runtime / UI primitive |
| `tsx` | `^4.19.2` | Core runtime / UI primitive |
| `tw-animate-css` | `^1.4.0` | Core runtime / UI primitive |
| `typescript` | `5.1.6` | Core runtime / UI primitive |
| `unist-util-visit` | `^5.0.0` | Core runtime / UI primitive |
| `velite` | `^0.2.2` | Core runtime / UI primitive |
| `zod` | `^3.25.76` | Core runtime / UI primitive |

## Dev Dependencies & Build Tools

| Pacote | Versão |
| :--- | :--- |


## Compatibilidade com Nosso Projeto

- **React 19 / Astro 7**: Os componentes utilizam primitives padrão de Radix UI / Base UI, compativel com nosso `@astrojs/react`.
- **Tailwind CSS v4**: Utilizam classes utilitárias clássicas com sombras deslocadas (`shadow-shadow`, `border-border`) parametrizáveis via variáveis CSS.
