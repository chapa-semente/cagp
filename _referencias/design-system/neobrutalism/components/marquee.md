---
title: "Marquee"
description: "A scrolling text component that animates horizontally."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/marquee"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"

---

# Marquee

> A scrolling text component that animates horizontally.

> 🔗 **Original Source Code**: [`components/ui/marquee.tsx`](../ui/marquee.tsx)

```tsx
import Marquee from "@/components/ui/marquee"

export default function MarqueeDemo() {
  const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]

  return <Marquee items={items} />
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/marquee.json"
```

### Component Source Code (`components/ui/marquee.tsx`)

```tsx
export default function Marquee({ items }: { items: string[] }) {
  return (
    <div className="relative flex w-full overflow-x-hidden border-b-2 border-t-2 border-border bg-secondary-background text-foreground font-base">
      <div className="animate-marquee whitespace-nowrap py-12">
        {items.map((item) => {
          return (
            <span key={item} className="mx-4 text-4xl">
              {item}
            </span>
          )
        })}
      </div>

      <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-12">
        {items.map((item) => {
          return (
            <span key={item} className="mx-4 text-4xl">
              {item}
            </span>
          )
        })}
      </div>

      {/* must have both of these in order to work */}
    </div>
  )
}
```


## Before using

You'll have to add this to `@theme inline` section inside your styling:

<br />

```css
--animate-marquee: marquee 5s linear infinite;
--animate-marquee2: marquee2 5s linear infinite;

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes marquee2 {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}
```

Make sure there is enough content in items so it loops perfectly.

Visit <a target="_blank" href="https://jackwhiting.co.uk/posts/creating-a-marquee-with-tailwind/">this article</a> to learn more.

## Usage

```ts
import Marquee from '@/components/ui/marquee'
```

```ts
const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
```

```tsx
<Marquee items={items} />
```
