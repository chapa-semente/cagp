---
title: "Error Boundary"
description: "Catches errors in child components and renders a neubrutalism fallback with reload and home actions. React uses componentDidCatch under the hood; Vue uses onErrorCaptured."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/error-boundary"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
---

# Error Boundary

> Catches errors in child components and renders a neubrutalism fallback with reload and home actions. React uses componentDidCatch under the hood; Vue uses onErrorCaptured.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/error-boundary.json"
```


## Usage

```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary'

export default function App() {
  return (
    <ErrorBoundary>
      <YourApp />
    </ErrorBoundary>
  )
}
```

## Examples

### Nested Boundaries

Wrap risky subtrees in their own boundary so one widget's crash doesn't take down the page.

```tsx

```

