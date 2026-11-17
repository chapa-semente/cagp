import * as React from "react"
import { cn } from "@/lib/utils"

export interface ImageCardProps extends React.HTMLAttributes<HTMLElement> {
  imageUrl: string
  caption: string
  alt?: string
}

export function ImageCard({ imageUrl, caption, alt, className, ...props }: ImageCardProps) {
  return (
    <figure
      className={cn(
        "w-full max-w-[280px] overflow-hidden rounded-xl border-3 border-border bg-card font-sans shadow-md",
        className
      )}
      {...props}
    >
      <img
        className="w-full aspect-4/3 object-cover"
        src={imageUrl}
        alt={alt || caption || "Imagem institucional"}
        loading="lazy"
      />
      <figcaption className="border-t-3 border-border p-3.5 text-foreground text-xs font-semibold leading-snug">
        {caption}
      </figcaption>
    </figure>
  )
}

export default ImageCard
