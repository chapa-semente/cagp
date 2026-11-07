---
title: "Date Picker"
description: "A date picker component with calendar popup."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/date-picker"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/date-picker"
---

# Date Picker

> A date picker component with calendar popup.

> 📂 **Original Examples**: [`examples/ui/date-picker/`](../examples/date-picker/)

```tsx
"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="noShadow"
            className="w-[280px] justify-start text-left font-base"
          />
        }
      >
        <CalendarIcon />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto border-0! p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} autoFocus />
      </PopoverContent>
    </Popover>
  )
}
```

## Installation

The Date Picker is built using a composition of the `<Popover />` and the `<Calendar />` components.

See installation instructions for the <Link href="/docs/popover">Popover</Link> and the <Link href="/docs/calendar">Calendar</Link> components.

## Usage

```ts
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
```

```tsx
const [date, setDate] = React.useState<Date>()
```

```tsx
<Popover>
  <PopoverTrigger render={<Button variant="noShadow" className="w-[280px] justify-start text-left font-base" />}>
      <CalendarIcon />
      {date ? format(date, "PPP") : <span>Pick a date</span>}
    </PopoverTrigger>
  <PopoverContent className="w-auto border-0! p-0">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      autoFocus
    />
  </PopoverContent>
</Popover>
```

## Examples

### Default

```tsx
"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="noShadow"
            className="w-[280px] justify-start text-left font-base"
          />
        }
      >
        <CalendarIcon />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto border-0! p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} autoFocus />
      </PopoverContent>
    </Popover>
  )
}
```

### Basic

A basic date picker component paired with a [Field](/docs/field) label.

```tsx
"use client"

import { format } from "date-fns"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DatePickerBasicDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Field className="mx-auto w-44">
      <FieldLabel htmlFor="date-picker-simple">Date</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="noShadow"
              id="date-picker-simple"
              className="justify-start font-base"
            />
          }
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </PopoverTrigger>
        <PopoverContent className="w-auto border-0! p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
```

### Range Picker

A date picker component for selecting a range of dates.

```tsx
"use client"

import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DatePickerRangePickerDemo() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  })

  return (
    <Field className="mx-auto w-60">
      <FieldLabel htmlFor="date-picker-range">Date Picker Range</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="noShadow"
              id="date-picker-range"
              className="justify-start px-2.5 font-base"
            />
          }
        >
          <CalendarIcon />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-auto border-0! p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
```

### Date of Birth

A date picker component for selecting a date of birth. This component uses `captionLayout="dropdown"` for month and year selection.

```tsx
"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DatePickerDateOfBirthDemo() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <Field className="mx-auto w-44">
      <FieldLabel htmlFor="date-picker-dob">Date of birth</FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="noShadow"
              id="date-picker-dob"
              className="justify-start font-base"
            />
          }
        >
          {date ? date.toLocaleDateString() : "Select date"}
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden border-0! p-0"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
```

### Input

A date picker component with an [Input Group](/docs/input-group) field for typing a date.

```tsx
"use client"

import { CalendarIcon } from "lucide-react"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

export default function DatePickerInputDemo() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    new Date("2025-06-01"),
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [value, setValue] = React.useState(formatDate(date))

  return (
    <Field className="mx-auto w-48">
      <FieldLabel htmlFor="date-required">Subscription Date</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="date-required"
          value={value}
          placeholder="June 01, 2025"
          onChange={(e) => {
            const date = new Date(e.target.value)
            setValue(e.target.value)
            if (isValidDate(date)) {
              setDate(date)
              setMonth(date)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <InputGroupButton
                  id="date-picker"
                  size="icon-xs"
                  aria-label="Select date"
                />
              }
            >
              <CalendarIcon />
              <span className="sr-only">Select date</span>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden border-0! p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={date}
                month={month}
                onMonthChange={setMonth}
                onSelect={(date) => {
                  setDate(date)
                  setValue(formatDate(date))
                  setOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
```

### Time Picker

A date picker component with a time input field for selecting a time.

```tsx
"use client"

import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DatePickerTimePickerDemo() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <FieldGroup className="mx-auto max-w-xs flex-row">
      <Field>
        <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="noShadow"
                id="date-picker-optional"
                className="w-32 justify-between font-base"
              />
            }
          >
            {date ? format(date, "PPP") : "Select date"}
            <ChevronDownIcon />
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden border-0! p-0"
            align="start"
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              defaultMonth={date}
              onSelect={(date) => {
                setDate(date)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field className="w-32">
        <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
        <Input
          type="time"
          id="time-picker-optional"
          step="1"
          defaultValue="10:30:00"
          className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
    </FieldGroup>
  )
}
```
