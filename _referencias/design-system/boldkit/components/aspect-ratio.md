---
title: "Aspect Ratio"
description: "Displays content within a desired ratio, perfect for images and videos with consistent dimensions."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/aspect-ratio"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "radix-ui"
---

# Aspect Ratio

> Displays content within a desired ratio, perfect for images and videos with consistent dimensions.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/aspect-ratio.json"
```

### Component Source Code (`components/ui/aspect-ratio.tsx`)

```tsx
import { AspectRatio as AspectRatioPrimitive } from 'radix-ui'

const AspectRatio = AspectRatioPrimitive.Root

export { AspectRatio }
```

## Usage

```tsx
import { AspectRatio } from '@/components/ui/aspect-ratio'

export default function Example() {
  return (
    <AspectRatio ratio={16 / 9}>
      <img
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800"
        alt="Photo"
        className="h-full w-full object-cover"
      />
    </AspectRatio>
  )
}
```

## Examples

### 16:9 Ratio

Common widescreen video ratio.

```tsx
<AspectRatio ratio={16 / 9}>
  <img
    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800"
    alt="Widescreen"
    className="h-full w-full object-cover"
  />
</AspectRatio>
```

### 4:3 Ratio

Classic television and photo ratio.

```tsx
<AspectRatio ratio={4 / 3}>
  <img
    src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=600"
    alt="Classic ratio"
    className="h-full w-full object-cover"
  />
</AspectRatio>
```

### Square (1:1)

Perfect square ratio for profile pictures and thumbnails.

```tsx
<AspectRatio ratio={1}>
  <img
    src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=400"
    alt="Square"
    className="h-full w-full object-cover"
  />
</AspectRatio>
```

### Portrait (2:3)

Portrait orientation commonly used for posters and cards.

```tsx
<AspectRatio ratio={2 / 3}>
  <img
    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"
    alt="Portrait"
    className="h-full w-full object-cover"
  />
</AspectRatio>
```

### With Placeholder

Use a background color as placeholder while content loads.

```tsx
<AspectRatio ratio={16 / 9} className="bg-muted flex items-center justify-center">
  <span className="text-muted-foreground font-bold">16:9</span>
</AspectRatio>
```

