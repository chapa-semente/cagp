---
title: "Calendar"
description: "A date field component that allows users to enter and edit date."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/calendar"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "lucide-react"
  - "react-day-picker"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/calendar"
---

# Calendar

> A date field component that allows users to enter and edit date.

```tsx
"use client"

import { useState } from "react"

import { Calendar } from "@/components/ui/calendar"

export default function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return <Calendar mode="single" selected={date} onSelect={setDate} />
}
```


## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/calendar.json"
```

### Component Source Code (`components/ui/calendar.tsx`)

```tsx
"use client"

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
} from "react-day-picker"

import * as React from "react"

import { buttonVariants } from "@/components/ui/button"

import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  formatters,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar rounded-base border-2 border-border bg-background p-3 font-heading text-foreground shadow-shadow",
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-2 sm:flex-row",
          defaultClassNames.months,
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: "noShadow" }),
          "size-7 bg-secondary-background p-0 text-foreground select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: "noShadow" }),
          "size-7 bg-secondary-background p-0 text-foreground select-none aria-disabled:opacity-50",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex h-7 w-full items-center justify-center px-8",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "flex h-7 w-full items-center justify-center gap-1.5 text-sm font-heading",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "relative rounded-base border-2 border-border bg-secondary-background",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn("absolute inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "font-heading select-none",
          captionLayout === "label"
            ? "text-sm"
            : "flex h-7 items-center gap-1 rounded-base px-2 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label,
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "w-9 rounded-base text-[0.8rem] font-base text-foreground select-none",
          defaultClassNames.weekday,
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-9 select-none",
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          "text-[0.8rem] font-base text-foreground select-none",
          defaultClassNames.week_number,
        ),
        day: cn(
          "group/day relative size-9 p-0 text-center text-sm select-none",
          defaultClassNames.day,
        ),
        range_start: cn(defaultClassNames.range_start),
        range_middle: cn(defaultClassNames.range_middle),
        range_end: cn(defaultClassNames.range_end),
        selected: cn(
          props.mode !== "range" && "rounded-base bg-main/50",
          defaultClassNames.selected,
        ),
        today: cn(defaultClassNames.today),
        outside: cn("opacity-50", defaultClassNames.outside),
        disabled: cn("opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeft className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRight className={cn("size-4", className)} {...props} />
            )
          }

          return <ChevronDown className={cn("size-4", className)} {...props} />
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-9 items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  const inRange =
    modifiers.range_start || modifiers.range_middle || modifiers.range_end
  const selectedSingle = modifiers.selected && !inRange

  return (
    <button
      ref={ref}
      data-day={day.date.toLocaleDateString()}
      data-selected-single={selectedSingle}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      data-today={modifiers.today}
      className={cn(
        buttonVariants({ variant: "noShadow" }),
        "size-9 bg-secondary-background p-0 font-base text-foreground",
        modifiers.today && "bg-transparent",
        (selectedSingle || inRange) && "bg-main text-main-foreground",
        // Days of a range share one border per row: a day drops the border
        // and radius on each side that faces another day of the range, and
        // pads that side by the border width so the number stays centred.
        inRange &&
          "[[data-selected]:not([data-hidden])+td>&]:rounded-l-none [[data-selected]:not([data-hidden])+td>&]:border-l-0 [[data-selected]:not([data-hidden])+td>&]:pl-0.5 [td:has(+[data-selected]:not([data-hidden]))>&]:rounded-r-none [td:has(+[data-selected]:not([data-hidden]))>&]:border-r-0 [td:has(+[data-selected]:not([data-hidden]))>&]:pr-0.5",
        defaultClassNames.day_button,
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
```


## About

The calendar is built on top of <a target="_blank" href="https://daypicker.dev/">React DayPicker</a> v9. Check out its docs for all the available props like `captionLayout`, `numberOfMonths`, `disabled` and `locale`.

If you are upgrading from React DayPicker v8, replace the `initialFocus` prop with `autoFocus` and rename any custom `classNames` keys to their v9 names (`day_selected` is now `selected`, `nav_button` is now `button_previous` / `button_next` and so on).

## Usage

```ts
import { useState } from 'react'

import { Calendar } from '@/components/ui/calendar'
```

```tsx
const [date, setDate] = useState<Date | undefined>(new Date())
```

```tsx
<Calendar mode="single" selected={date} onSelect={setDate} />
```

## Examples

### Default

```tsx
"use client"

import { useState } from "react"

import { Calendar } from "@/components/ui/calendar"

export default function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return <Calendar mode="single" selected={date} onSelect={setDate} />
}
```

### Range

```tsx
"use client"

import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export default function CalendarRangeDemo() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  })

  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      numberOfMonths={2}
      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
    />
  )
}
```
