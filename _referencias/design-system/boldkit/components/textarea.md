---
title: "Textarea"
description: "A multi-line text input field with bold neubrutalism styling."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/textarea"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
---

# Textarea

> A multi-line text input field with bold neubrutalism styling.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/textarea.json"
```

### Component Source Code (`components/ui/textarea.tsx`)

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[100px] w-full border-3 border-input bg-background px-4 py-3 text-base shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:translate-x-[4px] focus-visible:translate-y-[4px] focus-visible:shadow-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
```

## Usage

```tsx
import { Textarea } from '@/components/ui/textarea'

export default function Example() {
  return <Textarea placeholder="Type your message here." />
}
```

## Examples

### With Label

Textarea with an associated label.

```tsx
<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Your Message</Label>
  <Textarea placeholder="Type your message here." id="message" />
</div>
```

### With Helper Text

Textarea with descriptive helper text below.

```tsx
<div className="grid w-full gap-1.5">
  <Label htmlFor="bio">Bio</Label>
  <Textarea placeholder="Tell us about yourself" id="bio" />
  <p className="text-sm text-muted-foreground">
    Your bio will be visible to other users.
  </p>
</div>
```

### Disabled

A disabled textarea that cannot be edited.

```tsx
<Textarea placeholder="This textarea is disabled" disabled />
```

### Default Value

Textarea with a pre-filled default value.

```tsx
<Textarea defaultValue="This is the default value for the textarea." />
```

### Custom Height

Textarea with custom number of visible rows.

```tsx
<Textarea placeholder="This textarea has 6 rows" rows={6} />
```

