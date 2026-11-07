---
title: "Calendar"
description: "A date field component that allows users to enter and edit date with neubrutalism styling."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/calendar"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "react-day-picker"
  - "date-fns"
---

# Calendar

> A date field component that allows users to enter and edit date with neubrutalism styling.

> 🔗 **Original Source Code**: [`components/ui/calendar.tsx`](../ui/calendar.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/calendar.json"
```

### Component Source Code (`components/ui/calendar.tsx`)

```tsx
import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'p-3 border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        className
      )}
      classNames={{
        months: 'relative flex flex-col sm:flex-row gap-4',
        month: 'flex flex-col gap-4',
        month_caption: 'flex justify-center pt-1 relative items-center px-10',
        caption_label: 'text-sm font-bold uppercase tracking-wide',
        nav: 'flex items-center gap-1',
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 absolute left-0 top-0 hover:translate-x-0 hover:translate-y-0 hover:scale-110'
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 absolute right-0 top-0 hover:translate-x-0 hover:translate-y-0 hover:scale-110'
        ),
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday: 'text-muted-foreground w-9 font-bold text-[0.8rem] uppercase',
        week: 'flex w-full mt-2',
        day: 'relative p-0 text-center text-sm focus-within:relative focus-within:z-20',
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-medium border-0 aria-selected:opacity-100'
        ),
        selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground border-2 border-foreground',
        today: 'bg-accent text-accent-foreground border-2 border-foreground',
        outside: 'text-muted-foreground opacity-50 aria-selected:opacity-30',
        disabled: 'text-muted-foreground opacity-50',
        range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === 'left' ? ChevronLeft : ChevronRight
          return <Icon className="h-4 w-4 stroke-[3]" />
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
```

## Usage

```tsx
import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'

export default function Example() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
    />
  )
}
```

## Examples

### Single Date

Select a single date.

```tsx
const [date, setDate] = useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>
```

### Date Range

Select a range of dates.

```tsx
const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>()

<Calendar
  mode="range"
  selected={dateRange}
  onSelect={setDateRange}
  numberOfMonths={2}
/>
```

### Multiple Dates

Select multiple dates.

```tsx
const [dates, setDates] = useState<Date[]>([])

<Calendar
  mode="multiple"
  selected={dates}
  onSelect={setDates}
/>
```

### Disabled Dates

Disable specific dates or date ranges.

```tsx
<Calendar
  mode="single"
  disabled={[
    new Date(2024, 0, 1),
    { from: new Date(2024, 0, 15), to: new Date(2024, 0, 20) },
  ]}
/>
```

