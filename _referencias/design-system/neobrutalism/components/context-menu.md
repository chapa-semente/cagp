---
title: "Context Menu"
description: "Displays a menu to the user — such as a set of actions or functions."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/context-menu"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "@base-ui/react"
  - "lucide-react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/context-menu"
---

# Context Menu

> Displays a menu to the user — such as a set of actions or functions.

> 🔗 **Original Source Code**: [`components/ui/context-menu.tsx`](../ui/context-menu.tsx)
> 📂 **Original Examples**: [`examples/ui/context-menu/`](../examples/context-menu/)

```tsx
import { Code2Icon, PlusIcon, TrashIcon } from "lucide-react"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-base border border-border border-dashed text-sm font-base">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem inset>
              Save Page...
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              <PlusIcon />
              Create Shortcut...
            </ContextMenuItem>
            <ContextMenuItem inset>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <Code2Icon />
              Developer Tools
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <TrashIcon />
              Delete
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks Bar
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="pedro">
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuRadioItem value="pedro">
            Pedro Duarte
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/context-menu.json"
```

### Component Source Code (`components/ui/context-menu.tsx`)

```tsx
"use client"

import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import * as React from "react"

import { cn } from "@/lib/utils"

// Base UI's GroupLabel must live inside a Group or RadioGroup. Track that so a
// standalone label (like Radix allowed) still renders instead of throwing.
const ContextMenuGroupContext = React.createContext(false)

function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}

function ContextMenuTrigger({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={cn("select-none", className)}
      {...props}
    />
  )
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuGroupContext.Provider value={true}>
      <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
    </ContextMenuGroupContext.Provider>
  )
}

function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  )
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubmenuRoot>) {
  return (
    <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
  )
}

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  return (
    <ContextMenuGroupContext.Provider value={true}>
      <ContextMenuPrimitive.RadioGroup
        data-slot="context-menu-radio-group"
        {...props}
      />
    </ContextMenuGroupContext.Provider>
  )
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubmenuTrigger> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default select-none items-center rounded-base border-2 border-transparent px-2 py-1.5 text-sm font-base outline-hidden data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:bg-main hover:text-main-foreground hover:border-border focus:bg-main focus:text-main-foreground focus:border-border data-highlighted:bg-main data-highlighted:text-main-foreground data-highlighted:border-border data-popup-open:bg-main data-popup-open:text-main-foreground data-popup-open:border-border",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto" />
    </ContextMenuPrimitive.SubmenuTrigger>
  )
}

const contextMenuPopupClassName =
  "z-50 min-w-[8rem] overflow-hidden rounded-base border-2 border-border bg-background p-1 font-base text-foreground outline-none origin-(--transform-origin) data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2"

function ContextMenuSubContent({
  className,
  align,
  alignOffset,
  side,
  sideOffset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Popup> &
  Pick<
    React.ComponentProps<typeof ContextMenuPrimitive.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-sub-content"
          className={cn(contextMenuPopupClassName, className)}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  )
}

function ContextMenuContent({
  className,
  align,
  alignOffset,
  side,
  sideOffset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Popup> &
  Pick<
    React.ComponentProps<typeof ContextMenuPrimitive.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          className={cn(contextMenuPopupClassName, className)}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  )
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-base border-2 border-transparent px-2 py-1.5 gap-2 text-sm outline-none hover:bg-main hover:text-main-foreground hover:border-border focus:bg-main focus:text-main-foreground focus:border-border data-highlighted:bg-main data-highlighted:text-main-foreground data-highlighted:border-border data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-[variant=destructive]:text-red-500 data-[variant=destructive]:hover:bg-red-500 data-[variant=destructive]:hover:text-white data-[variant=destructive]:focus:bg-red-500 data-[variant=destructive]:focus:text-white data-[variant=destructive]:data-highlighted:bg-red-500 data-[variant=destructive]:data-highlighted:text-white",
        className,
      )}
      {...props}
    />
  )
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-base border-2 border-transparent py-1.5 pl-8 pr-2 gap-2 text-sm font-base outline-hidden hover:bg-main hover:text-main-foreground hover:border-border focus:bg-main focus:text-main-foreground focus:border-border data-highlighted:bg-main data-highlighted:text-main-foreground data-highlighted:border-border data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <Check className="h-4 w-4" />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-base border-2 border-transparent py-1.5 pl-8 pr-2 gap-2 text-sm font-base outline-hidden hover:bg-main hover:text-main-foreground hover:border-border focus:bg-main focus:text-main-foreground focus:border-border data-highlighted:bg-main data-highlighted:text-main-foreground data-highlighted:border-border data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.RadioItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.GroupLabel> & {
  inset?: boolean
}) {
  const inGroup = React.useContext(ContextMenuGroupContext)
  const labelClassName = cn(
    "px-2 py-1.5 text-sm font-base border-2 border-transparent data-inset:pl-8",
    className,
  )

  // Outside a group, Base UI's GroupLabel has no context and throws, so fall
  // back to a plain element (which is what Radix rendered anyway).
  if (!inGroup) {
    return (
      <div
        data-slot="context-menu-label"
        data-inset={inset}
        className={labelClassName}
        {...(props as React.ComponentProps<"div">)}
      />
    )
  }

  return (
    <ContextMenuPrimitive.GroupLabel
      data-slot="context-menu-label"
      data-inset={inset}
      className={labelClassName}
      {...props}
    />
  )
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("-mx-1 my-1 h-0.5 bg-border", className)}
      {...props}
    />
  )
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn("ml-auto text-xs font-base tracking-widest", className)}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
```


## Usage

```ts
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
```

```tsx
<ContextMenu>
  <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-text border-dashed text-sm font-base">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent className="w-64">
    <ContextMenuItem inset>
      Back
      <ContextMenuShortcut>⌘[</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem inset disabled>
      Forward
      <ContextMenuShortcut>⌘]</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem inset>
      Reload
      <ContextMenuShortcut>⌘R</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSub>
      <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
      <ContextMenuSubContent className="w-48">
        <ContextMenuItem>
          Save Page As...
          <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>Create Shortcut...</ContextMenuItem>
        <ContextMenuItem>Name Window...</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Developer Tools</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem checked>
      Show Bookmarks Bar
      <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
    </ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
    <ContextMenuSeparator />
    <ContextMenuRadioGroup value="pedro">
      <ContextMenuLabel inset>People</ContextMenuLabel>
      <ContextMenuSeparator />
      <ContextMenuRadioItem value="pedro">
        Pedro Duarte
      </ContextMenuRadioItem>
      <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuContent>
</ContextMenu>
```

## Examples

### Default

```tsx
import { Code2Icon, PlusIcon, TrashIcon } from "lucide-react"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-base border border-border border-dashed text-sm font-base">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem inset>
              Save Page...
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              <PlusIcon />
              Create Shortcut...
            </ContextMenuItem>
            <ContextMenuItem inset>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <Code2Icon />
              Developer Tools
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <TrashIcon />
              Delete
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks Bar
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="pedro">
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuRadioItem value="pedro">
            Pedro Duarte
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

### Basic

A simple context menu with a few actions.

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function ContextMenuBasicDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-base border-2 border-dashed border-border text-sm font-base">
        <span className="hidden pointer-fine:inline-block">
          Right click here
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Long press here
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>Back</ContextMenuItem>
          <ContextMenuItem disabled>Forward</ContextMenuItem>
          <ContextMenuItem>Reload</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

### Submenu

Use `ContextMenuSub` to nest secondary actions.

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function ContextMenuSubmenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-base border-2 border-dashed border-border text-sm font-base">
        <span className="hidden pointer-fine:inline-block">
          Right click here
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Long press here
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Cut
            <ContextMenuShortcut>⌘X</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSub>
          <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuGroup>
              <ContextMenuItem>Save Page...</ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

### Shortcuts

Add `ContextMenuShortcut` to show keyboard hints.

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function ContextMenuShortcutsDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-base border-2 border-dashed border-border text-sm font-base">
        <span className="hidden pointer-fine:inline-block">
          Right click here
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Long press here
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>
            Save
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Save As...
            <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

### Groups

Group related actions and separate them with dividers.

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function ContextMenuGroupsDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-base border-2 border-dashed border-border text-sm font-base">
        <span className="hidden pointer-fine:inline-block">
          Right click here
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Long press here
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>File</ContextMenuLabel>
          <ContextMenuItem>
            New File
            <ContextMenuShortcut>⌘N</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Open File
            <ContextMenuShortcut>⌘O</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Save
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Edit</ContextMenuLabel>
          <ContextMenuItem>
            Undo
            <ContextMenuShortcut>⌘Z</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Redo
            <ContextMenuShortcut>⇧⌘Z</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>
            Cut
            <ContextMenuShortcut>⌘X</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Paste
            <ContextMenuShortcut>⌘V</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem variant="destructive">
            Delete
            <ContextMenuShortcut>⌫</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

### Icons

Combine icons with labels for quick scanning.

```tsx
import {
  ClipboardPasteIcon,
  CopyIcon,
  ScissorsIcon,
  TrashIcon,
} from "lucide-react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function ContextMenuIconsDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-base border-2 border-dashed border-border text-sm font-base">
        <span className="hidden pointer-fine:inline-block">
          Right click here
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Long press here
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            <CopyIcon />
            Copy
          </ContextMenuItem>
          <ContextMenuItem>
            <ScissorsIcon />
            Cut
          </ContextMenuItem>
          <ContextMenuItem>
            <ClipboardPasteIcon />
            Paste
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem variant="destructive">
            <TrashIcon />
            Delete
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

### Checkboxes

Use `ContextMenuCheckboxItem` for toggles.

```tsx
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function ContextMenuCheckboxesDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-base border-2 border-dashed border-border text-sm font-base">
        <span className="hidden pointer-fine:inline-block">
          Right click here
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Long press here
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuCheckboxItem defaultChecked>
            Show Bookmarks Bar
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem defaultChecked>
            Show Developer Tools
          </ContextMenuCheckboxItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

### Radio

Use `ContextMenuRadioItem` for exclusive choices.

```tsx
"use client"

import * as React from "react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function ContextMenuRadioDemo() {
  const [user, setUser] = React.useState("pedro")
  const [theme, setTheme] = React.useState("light")

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-base border-2 border-dashed border-border text-sm font-base">
        <span className="hidden pointer-fine:inline-block">
          Right click here
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Long press here
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>People</ContextMenuLabel>
          <ContextMenuRadioGroup value={user} onValueChange={setUser}>
            <ContextMenuRadioItem value="pedro">
              Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Theme</ContextMenuLabel>
          <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
            <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
            <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
            <ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

### Destructive

Use `variant="destructive"` to style the menu item as destructive.

```tsx
import { PencilIcon, ShareIcon, TrashIcon } from "lucide-react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function ContextMenuDestructiveDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-base border-2 border-dashed border-border text-sm font-base">
        <span className="hidden pointer-fine:inline-block">
          Right click here
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Long press here
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            <PencilIcon />
            Edit
          </ContextMenuItem>
          <ContextMenuItem>
            <ShareIcon />
            Share
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem variant="destructive">
            <TrashIcon />
            Delete
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

### Sides

Control menu placement with the `side` and `align` props.

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function ContextMenuSidesDemo() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-4">
      <ContextMenu>
        <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-base border-2 border-dashed border-border text-sm font-base">
          <span className="hidden pointer-fine:inline-block">
            Right click (top)
          </span>
          <span className="hidden pointer-coarse:inline-block">
            Long press (top)
          </span>
        </ContextMenuTrigger>
        <ContextMenuContent side="top">
          <ContextMenuGroup>
            <ContextMenuItem>Back</ContextMenuItem>
            <ContextMenuItem>Forward</ContextMenuItem>
            <ContextMenuItem>Reload</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
      <ContextMenu>
        <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-base border-2 border-dashed border-border text-sm font-base">
          <span className="hidden pointer-fine:inline-block">
            Right click (right)
          </span>
          <span className="hidden pointer-coarse:inline-block">
            Long press (right)
          </span>
        </ContextMenuTrigger>
        <ContextMenuContent side="right">
          <ContextMenuGroup>
            <ContextMenuItem>Back</ContextMenuItem>
            <ContextMenuItem>Forward</ContextMenuItem>
            <ContextMenuItem>Reload</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
      <ContextMenu>
        <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-base border-2 border-dashed border-border text-sm font-base">
          <span className="hidden pointer-fine:inline-block">
            Right click (bottom)
          </span>
          <span className="hidden pointer-coarse:inline-block">
            Long press (bottom)
          </span>
        </ContextMenuTrigger>
        <ContextMenuContent side="bottom">
          <ContextMenuGroup>
            <ContextMenuItem>Back</ContextMenuItem>
            <ContextMenuItem>Forward</ContextMenuItem>
            <ContextMenuItem>Reload</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
      <ContextMenu>
        <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-base border-2 border-dashed border-border text-sm font-base">
          <span className="hidden pointer-fine:inline-block">
            Right click (left)
          </span>
          <span className="hidden pointer-coarse:inline-block">
            Long press (left)
          </span>
        </ContextMenuTrigger>
        <ContextMenuContent side="left">
          <ContextMenuGroup>
            <ContextMenuItem>Back</ContextMenuItem>
            <ContextMenuItem>Forward</ContextMenuItem>
            <ContextMenuItem>Reload</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}
```
