---
title: "Image Card"
description: "A card component optimized for displaying images with captions."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/image-card"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"

---

# Image Card

> A card component optimized for displaying images with captions.

> 🔗 **Original Source Code**: [`components/ui/image-card.tsx`](../ui/image-card.tsx)

```tsx
import ImageCard from "@/components/ui/image-card"

export default function ImageCardDemo() {
  return (
    <ImageCard
      caption="Image"
      imageUrl="https://hips.hearstapps.com/hmg-prod/images/flowers-trees-and-bushes-reach-their-peak-of-full-bloom-in-news-photo-1678292967.jpg?resize=300:*"
    ></ImageCard>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/image-card.json"
```

### Component Source Code (`components/ui/image-card.tsx`)

```tsx
import { cn } from "@/lib/utils"

type Props = {
  imageUrl: string
  caption: string
  className?: string
}

export default function ImageCard({ imageUrl, caption, className }: Props) {
  return (
    <figure
      className={cn(
        "w-[250px] overflow-hidden rounded-base border-2 border-border bg-background font-base shadow-shadow",
        className,
      )}
    >
      <img className="w-full aspect-4/3" src={imageUrl} alt="image" />
      <figcaption className="border-t-2 text-foreground border-border p-4">
        {caption}
      </figcaption>
    </figure>
  )
}
```


## Usage

```ts
import ImageCard from '@/components/ui/image-card'
```

```tsx
<ImageCard
  caption="Image"
  imageUrl="https://hips.hearstapps.com/hmg-prod/images/flowers-trees-and-bushes-reach-their-peak-of-full-bloom-in-news-photo-1678292967.jpg?resize=300:*"
></ImageCard>
```
