---
title: "Combobox"
description: "Autocomplete input and command palette with a list of suggestions."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/combobox"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "lucide-react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/combobox"
---

# Combobox

> Autocomplete input and command palette with a list of suggestions.

> 🔗 **Original Source Code**: [`components/ui/combobox.tsx`](../ui/combobox.tsx)
> 📂 **Original Examples**: [`examples/ui/combobox/`](../examples/combobox/)

```tsx
"use client"

import { CheckIcon, ChevronsUpDown } from "lucide-react"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export default function FrameworkCombobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="noShadow"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between md:max-w-[200px]"
          />
        }
      >
        {value
          ? frameworks.find((framework) => framework.value === value)?.label
          : "Select framework..."}
        <ChevronsUpDown />
      </PopoverTrigger>
      <PopoverContent className="w-(--anchor-width) border-0 p-0">
        <Command className="**:data-[slot=command-input-wrapper]:h-11">
          <CommandInput placeholder="Search framework..." />
          <CommandList className="p-1">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

## Installation

The Combobox is built using a composition of the `<Popover />` and the `<Command />` components.

See installation instructions for the <Link href="/docs/popover">Popover</Link> and the <Link href="/docs/command">Command</Link> components.

## Examples

### Default

```tsx
"use client"

import { CheckIcon, ChevronsUpDown } from "lucide-react"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export default function FrameworkCombobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="noShadow"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between md:max-w-[200px]"
          />
        }
      >
        {value
          ? frameworks.find((framework) => framework.value === value)?.label
          : "Select framework..."}
        <ChevronsUpDown />
      </PopoverTrigger>
      <PopoverContent className="w-(--anchor-width) border-0 p-0">
        <Command className="**:data-[slot=command-input-wrapper]:h-11">
          <CommandInput placeholder="Search framework..." />
          <CommandList className="p-1">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

### Users

```tsx
"use client"

import { CheckIcon, ChevronsUpDown, PlusCircleIcon } from "lucide-react"

import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils"

const users = [
  {
    id: "1",
    username: "shadcn",
  },
  {
    id: "2",
    username: "leerob",
  },
  {
    id: "3",
    username: "evilrabbit",
  },
] as const

export default function UserCombobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("1")

  const selectedUser = React.useMemo(
    () => users.find((user) => user.id === value),
    [value],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="noShadow"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between px-2 md:max-w-[200px]"
          />
        }
      >
        {selectedUser ? (
          <div className="flex items-center gap-2">
            <Avatar className="size-5">
              <AvatarImage
                src={`https://github.com/${selectedUser.username}.png`}
              />
              <AvatarFallback>{selectedUser.username[0]}</AvatarFallback>
            </Avatar>
            {selectedUser.username}
          </div>
        ) : (
          "Select user..."
        )}
        <ChevronsUpDown className="text-foreground" />
      </PopoverTrigger>
      <PopoverContent className="w-(--anchor-width) border-0 p-0">
        <Command className="**:data-[slot=command-input-wrapper]:h-11">
          <CommandInput placeholder="Search user..." />
          <CommandList className="p-1">
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup className="[&_[cmdk-group-items]]:flex [&_[cmdk-group-items]]:flex-col [&_[cmdk-group-items]]:gap-1">
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Avatar className="size-5">
                    <AvatarImage
                      src={`https://github.com/${user.username}.png`}
                    />
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                  </Avatar>
                  {user.username}
                  <CheckIcon
                    className={cn(
                      "ml-auto",
                      value === user.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem>
                <PlusCircleIcon />
                Create user
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

### Timezones

```tsx
"use client"

import { CheckIcon, ChevronDownIcon, PlusCircleIcon } from "lucide-react"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const timezones = [
  {
    label: "Americas",
    timezones: [
      { value: "America/New_York", label: "(GMT-5) New York" },
      { value: "America/Los_Angeles", label: "(GMT-8) Los Angeles" },
      { value: "America/Chicago", label: "(GMT-6) Chicago" },
      { value: "America/Toronto", label: "(GMT-5) Toronto" },
      { value: "America/Vancouver", label: "(GMT-8) Vancouver" },
      { value: "America/Sao_Paulo", label: "(GMT-3) São Paulo" },
    ],
  },
  {
    label: "Europe",
    timezones: [
      { value: "Europe/London", label: "(GMT+0) London" },
      { value: "Europe/Paris", label: "(GMT+1) Paris" },
      { value: "Europe/Berlin", label: "(GMT+1) Berlin" },
      { value: "Europe/Rome", label: "(GMT+1) Rome" },
      { value: "Europe/Madrid", label: "(GMT+1) Madrid" },
      { value: "Europe/Amsterdam", label: "(GMT+1) Amsterdam" },
    ],
  },
  {
    label: "Asia/Pacific",
    timezones: [
      { value: "Asia/Tokyo", label: "(GMT+9) Tokyo" },
      { value: "Asia/Shanghai", label: "(GMT+8) Shanghai" },
      { value: "Asia/Singapore", label: "(GMT+8) Singapore" },
      { value: "Asia/Dubai", label: "(GMT+4) Dubai" },
      { value: "Australia/Sydney", label: "(GMT+11) Sydney" },
      { value: "Asia/Seoul", label: "(GMT+9) Seoul" },
    ],
  },
] as const

type Timezone = (typeof timezones)[number]

export default function TimezoneCombobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("America/New_York")

  const selectedGroup = React.useMemo(
    () =>
      timezones.find((group) =>
        group.timezones.some((tz) => tz.value === value),
      ),
    [value],
  )

  const selectedTimezoneLabel = React.useMemo(() => {
    if (!selectedGroup) return undefined
    for (const tz of selectedGroup.timezones) {
      if (tz.value === value) {
        return tz.label
      }
    }
    return undefined
  }, [value, selectedGroup])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="noShadow"
            className="h-12 w-full justify-between px-2.5 md:max-w-[200px]"
          />
        }
      >
        {selectedTimezoneLabel ? (
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-xs font-normal">{selectedGroup?.label}</span>
            <span>{selectedTimezoneLabel}</span>
          </div>
        ) : (
          "Select timezone"
        )}
        <ChevronDownIcon />
      </PopoverTrigger>
      <PopoverContent className="p-0 border-0" align="start">
        <Command className="**:data-[slot=command-input-wrapper]:h-11">
          <CommandInput placeholder="Search timezone..." />
          <CommandList className="scroll-pb-12">
            <CommandEmpty>No timezone found.</CommandEmpty>
            {timezones.map((region) => (
              <CommandGroup
                className="p-2"
                key={region.label}
                heading={region.label}
              >
                {region.timezones.map((timezone) => (
                  <CommandItem
                    key={timezone.value}
                    value={timezone.value}
                    onSelect={(currentValue) => {
                      setValue(
                        currentValue as Timezone["timezones"][number]["value"],
                      )
                      setOpen(false)
                    }}
                  >
                    {timezone.label}
                    <CheckIcon
                      className="ml-auto opacity-0 data-[selected=true]:opacity-100"
                      data-selected={value === timezone.value}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
            <CommandGroup className="bg-background border-t-2 p-2 border-t-border sticky bottom-0">
              <CommandItem>
                <PlusCircleIcon />
                Create timezone
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

### Multiselect

```tsx
"use client"

import { CheckIcon, ChevronsUpDown } from "lucide-react"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

type Framework = (typeof frameworks)[number]

export default function ComboboxWithCheckbox() {
  const [open, setOpen] = React.useState(false)
  const [selectedFrameworks, setSelectedFrameworks] = React.useState<
    Framework[]
  >([])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="noShadow"
            role="combobox"
            aria-expanded={open}
            className="w-fit min-w-[280px] justify-between"
          />
        }
      >
        {selectedFrameworks.length > 0
          ? selectedFrameworks.map((framework) => framework.label).join(", ")
          : "Select frameworks (multi-select)..."}
        <ChevronsUpDown className="text-foreground" />
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 border-0" align="start">
        <Command className="**:data-[slot=command-input-wrapper]:h-11">
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="p-2 [&_[cmdk-group-items]]:flex [&_[cmdk-group-items]]:flex-col [&_[cmdk-group-items]]:gap-1">
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setSelectedFrameworks(
                      selectedFrameworks.some((f) => f.value === currentValue)
                        ? selectedFrameworks.filter(
                            (f) => f.value !== currentValue,
                          )
                        : [...selectedFrameworks, framework],
                    )
                  }}
                >
                  <div
                    className="border-border pointer-events-none size-5 shrink-0 rounded-base border-2 transition-all select-none *:[svg]:opacity-0 data-[selected=true]:*:[svg]:opacity-100"
                    data-selected={selectedFrameworks.some(
                      (f) => f.value === framework.value,
                    )}
                  >
                    <CheckIcon className="size-4 text-current" />
                  </div>
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```
