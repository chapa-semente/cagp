---
title: "Data Table"
description: "Powerful table and datagrids built using TanStack Table."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/data-table"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "lucide-react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/data-table"
---

# Data Table

> Powerful table and datagrids built using TanStack Table.

> 🔗 **Original Source Code**: [`components/ui/data-table.tsx`](../ui/data-table.tsx)

```tsx
import DataTableDemo from "@/components/ui/data-table"

export default function DateTableDemo() {
  return <DataTableDemo />
}
```

## Installation

The data table is built with the <Link href="/docs/table">Table</Link>, <Link href="/docs/button">Button</Link>, <Link href="/docs/checkbox">Checkbox</Link>, <Link href="/docs/dropdown-menu">Dropdown Menu</Link> and <Link href="/docs/input">Input</Link> components and <a target="_blank" href="https://tanstack.com/table/latest">TanStack Table</a> v9.

<br />

```bash
pnpm add @tanstack/react-table
```

Go to the <a target="_blank" href="https://ui.shadcn.com/docs/components/data-table">shadcn/ui docs</a> for a full guide on building your own data table. When you're done, you can copy the demo below and paste it inside your project:

<br />

```tsx file=<rootDir>/src/components/ui/data-table.tsx
```

## About

TanStack Table v9 is modular. Instead of `useReactTable` with `getCoreRowModel()`, `getSortedRowModel()` and so on, you declare the features you need with `tableFeatures` and pass them to `useTable`. Columns are created with `createColumnHelper` and rendered with `table.FlexRender`. Read the <a target="_blank" href="https://tanstack.com/table/latest/docs/guide/migrating">TanStack Table migration guide</a> if you are upgrading from v8.

## Usage

```ts
import DataTableDemo from '@/components/ui/data-table'
```

```tsx
<DataTableDemo />
```
