---
title: "Collapsible"
description: "An interactive component that expands/collapses a panel."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/collapsible"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "@base-ui/react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/collapsible"
---

# Collapsible

> An interactive component that expands/collapses a panel.

> 🔗 **Original Source Code**: [`components/ui/collapsible.tsx`](../ui/collapsible.tsx)
> 📂 **Original Examples**: [`examples/ui/collapsible/`](../examples/collapsible/)

```tsx
"use client"

import { ChevronsUpDown } from "lucide-react"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export default function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="rounded-base flex items-center justify-between space-x-4 border-2 border-border text-foreground bg-background px-4 py-2">
        <h4 className="text-sm font-heading">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger
          render={
            <Button
              variant="noShadow"
              size="sm"
              className="w-9 bg-secondary-background text-foreground p-0"
            />
          }
        >
          <ChevronsUpDown className="size-4" />
          <span className="sr-only">Toggle</span>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-base border-2 border-border bg-background px-4 py-3 font-mono font-base text-foreground text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2 text-foreground font-base">
        <div className="rounded-base border-2 border-border bg-background px-4 py-3 font-mono text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-base border-2 border-border bg-background px-4 py-3 font-mono text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/collapsible.json"
```

### Component Source Code (`components/ui/collapsible.tsx`)

```tsx
"use client"

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

import * as React from "react"

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  )
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Panel>) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
```


## Usage

```ts
import { ChevronsUpDown } from "lucide-react"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
```

```tsx
const [isOpen, setIsOpen] = React.useState(false)
```


```tsx
<Collapsible
  open={isOpen}
  onOpenChange={setIsOpen}
  className="w-[350px] space-y-2"
>
  <div className="rounded-base flex items-center justify-between space-x-4 border-2 border-border text-foreground bg-background px-4 py-2">
    <h4 className="text-sm font-heading">
      @peduarte starred 3 repositories
    </h4>
    <CollapsibleTrigger render={<Button variant="noShadow" size="sm" className="w-9 bg-secondary-background text-foreground p-0" />}>
        <ChevronsUpDown className="size-4" />
        <span className="sr-only">Toggle</span>
      </CollapsibleTrigger>
  </div>
  <div className="rounded-base border-2 border-border bg-background px-4 py-3 font-mono font-base text-foreground text-sm">
    @radix-ui/primitives
  </div>
  <CollapsibleContent className="space-y-2 text-foreground font-base">
    <div className="rounded-base border-2 border-border bg-background px-4 py-3 font-mono text-sm">
      @radix-ui/colors
    </div>
    <div className="rounded-base border-2 border-border bg-background px-4 py-3 font-mono text-sm">
      @stitches/react
    </div>
  </CollapsibleContent>
</Collapsible>
```

## Examples

### Default

```tsx
"use client"

import { ChevronsUpDown } from "lucide-react"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export default function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="rounded-base flex items-center justify-between space-x-4 border-2 border-border text-foreground bg-background px-4 py-2">
        <h4 className="text-sm font-heading">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger
          render={
            <Button
              variant="noShadow"
              size="sm"
              className="w-9 bg-secondary-background text-foreground p-0"
            />
          }
        >
          <ChevronsUpDown className="size-4" />
          <span className="sr-only">Toggle</span>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-base border-2 border-border bg-background px-4 py-3 font-mono font-base text-foreground text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2 text-foreground font-base">
        <div className="rounded-base border-2 border-border bg-background px-4 py-3 font-mono text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-base border-2 border-border bg-background px-4 py-3 font-mono text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
```

### Basic

A basic collapsible inside a [Card](/docs/card). The trigger is rendered as a `Button` and the chevron rotates using the `data-panel-open` attribute.

```tsx
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export default function CollapsibleBasicDemo() {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent>
        <Collapsible>
          <CollapsibleTrigger
            render={
              <Button
                variant="noShadow"
                className="group w-full bg-secondary-background text-foreground"
              />
            }
          >
            Product details
            <ChevronDownIcon className="ml-auto transition-transform group-data-panel-open:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 flex flex-col items-start gap-2 rounded-base border-2 border-border bg-secondary-background p-4 text-sm">
            <div>
              This panel can be expanded or collapsed to reveal additional
              content.
            </div>
            <Button size="sm">Learn More</Button>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
```

### Settings Panel

Use a trigger button to reveal additional settings.

```tsx
"use client"

import { MaximizeIcon, MinimizeIcon } from "lucide-react"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function CollapsibleSettingsPanelDemo() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Card className="mx-auto w-full max-w-xs">
      <CardHeader>
        <CardTitle>Radius</CardTitle>
        <CardDescription>Set the corner radius of the element.</CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="flex items-start gap-2"
        >
          <FieldGroup className="grid w-full grid-cols-2 gap-2">
            <Field>
              <FieldLabel htmlFor="radius-top-left" className="sr-only">
                Radius top left
              </FieldLabel>
              <Input id="radius-top-left" placeholder="0" defaultValue={0} />
            </Field>
            <Field>
              <FieldLabel htmlFor="radius-top-right" className="sr-only">
                Radius top right
              </FieldLabel>
              <Input id="radius-top-right" placeholder="0" defaultValue={0} />
            </Field>
            <CollapsibleContent className="col-span-full grid grid-cols-subgrid gap-2">
              <Field>
                <FieldLabel htmlFor="radius-bottom-left" className="sr-only">
                  Radius bottom left
                </FieldLabel>
                <Input
                  id="radius-bottom-left"
                  placeholder="0"
                  defaultValue={0}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="radius-bottom-right" className="sr-only">
                  Radius bottom right
                </FieldLabel>
                <Input
                  id="radius-bottom-right"
                  placeholder="0"
                  defaultValue={0}
                />
              </Field>
            </CollapsibleContent>
          </FieldGroup>
          <CollapsibleTrigger
            render={
              <Button
                variant="noShadow"
                size="icon"
                className="bg-secondary-background text-foreground"
              />
            }
          >
            {isOpen ? <MinimizeIcon /> : <MaximizeIcon />}
          </CollapsibleTrigger>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
```
