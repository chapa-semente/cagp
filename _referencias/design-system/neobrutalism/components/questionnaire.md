---
title: "Questionnaire"
description: "A multi-step form for asking questions with single choice, multiple choice and free-form answers."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/questionnaire"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "lucide-react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/questionnaire"
---

# Questionnaire

> A multi-step form for asking questions with single choice, multiple choice and free-form answers.

> 🔗 **Original Source Code**: [`components/ui/questionnaire.tsx`](../ui/questionnaire.tsx)
> 📂 **Original Examples**: [`examples/ui/questionnaire/`](../examples/questionnaire/)

```tsx
"use client"

import * as React from "react"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"

const items = [
  {
    name: "framework",
    choices: [{ value: "next" }, { value: "vite" }, { value: "astro" }],
    required: true,
  },
  {
    name: "features",
    choices: [{ value: "docs" }, { value: "registry" }, { value: "themes" }],
  },
  {
    name: "feedback",
  },
] as const

export default function QuestionnaireDemo() {
  const [answers, setAnswers] = React.useState<Record<
    string,
    string | string[]
  > | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setAnswers({
      framework: String(formData.get("framework") ?? ""),
      features: formData.getAll("features").map(String),
      feedback: String(formData.get("feedback") ?? ""),
    })
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="w-full">
        <Questionnaire
          items={items}
          shortcuts="letters"
          onSubmit={handleSubmit}
        >
          <QuestionnaireProgress />
          <QuestionnaireItem name="framework" required>
            <QuestionnaireTitle>Which framework do you use?</QuestionnaireTitle>
            <QuestionnaireDescription>
              Pick the one you use most of the time.
            </QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="next">
                Next.js
                <QuestionnaireChoiceDescription>
                  App router with React Server Components
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
              <QuestionnaireChoice value="vite">
                Vite
                <QuestionnaireChoiceDescription>
                  Single page application
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
              <QuestionnaireChoice value="astro">
                Astro
                <QuestionnaireChoiceDescription>
                  Content focused sites
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireItem name="features" multiple>
            <QuestionnaireTitle>
              What do you use from the library?
            </QuestionnaireTitle>
            <QuestionnaireDescription>
              Select all that apply, or skip this question.
            </QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="docs">
                Documentation
              </QuestionnaireChoice>
              <QuestionnaireChoice value="registry">
                Registry
              </QuestionnaireChoice>
              <QuestionnaireChoice value="themes">Themes</QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireItem name="feedback">
            <QuestionnaireTitle>Anything else?</QuestionnaireTitle>
            <QuestionnaireDescription>
              Tell us what you would like to see next.
            </QuestionnaireDescription>
            <QuestionnaireInput
              aria-label="Feedback"
              placeholder="Type your answer..."
            />
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireSkip />
            <QuestionnaireNext />
            <QuestionnaireSubmit />
          </QuestionnaireActions>
        </Questionnaire>
      </div>
      {answers ? (
        <pre className="w-full overflow-x-auto rounded-base border-2 border-border bg-secondary-background p-4 text-xs font-base">
          {JSON.stringify(answers, null, 2)}
        </pre>
      ) : null}
    </div>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/questionnaire.json"
```

### Component Source Code (`components/ui/questionnaire.tsx`)

```tsx
"use client"

import { Questionnaire as QuestionnairePrimitive } from "@shadcn/react/questionnaire"
import { CheckIcon } from "lucide-react"

import * as React from "react"

import { buttonVariants, type Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

function Questionnaire({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Root>) {
  return (
    <QuestionnairePrimitive.Root
      data-slot="questionnaire"
      className={cn("flex w-full min-w-0 flex-col gap-6", className)}
      {...props}
    />
  )
}

function QuestionnaireProgress({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Progress>) {
  return (
    <QuestionnairePrimitive.Progress
      data-slot="questionnaire-progress"
      className={cn(
        "min-h-[1lh] w-fit min-w-[14ch] text-xs font-base text-foreground tabular-nums",
        className,
      )}
      {...props}
    />
  )
}

function QuestionnaireItem({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Item>) {
  return (
    <QuestionnairePrimitive.Item
      data-slot="questionnaire-item"
      className={cn(
        "flex min-w-0 flex-col gap-5 border-0 p-0 outline-none",
        className,
      )}
      {...props}
    />
  )
}

function QuestionnaireTitle({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Title>) {
  return (
    <QuestionnairePrimitive.Title
      data-slot="questionnaire-title"
      className={cn(
        "text-base leading-snug font-heading text-foreground text-pretty [&:not(:has(~[data-slot=questionnaire-description]))]:mb-4",
        className,
      )}
      {...props}
    />
  )
}

function QuestionnaireDescription({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Description>) {
  return (
    <QuestionnairePrimitive.Description
      data-slot="questionnaire-description"
      className={cn("text-sm font-base text-pretty text-foreground", className)}
      {...props}
    />
  )
}

function QuestionnaireChoices({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Choices>) {
  return (
    <QuestionnairePrimitive.Choices
      data-slot="questionnaire-choices"
      className={cn(
        "group/questionnaire-choices grid min-w-0 gap-3",
        className,
      )}
      {...props}
    />
  )
}

function QuestionnaireChoice({
  children,
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Choice>) {
  return (
    <QuestionnairePrimitive.Choice
      data-slot="questionnaire-choice"
      className={cn(
        "group/questionnaire-choice relative flex min-h-11 cursor-pointer items-start gap-3 rounded-base border-2 border-border bg-secondary-background px-4 py-3 text-start text-sm font-base text-foreground transition-colors outline-none select-none has-[>input:focus-visible]:ring-2 has-[>input:focus-visible]:ring-black has-[>input:focus-visible]:ring-offset-2 data-checked:bg-background",
        "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <QuestionnairePrimitive.ChoiceInput
        data-slot="questionnaire-choice-input"
        className="absolute inset-0 z-10 size-full cursor-pointer opacity-0"
      />
      <span
        aria-hidden="true"
        data-slot="questionnaire-choice-indicator"
        className="pointer-events-none relative flex size-4 shrink-0 translate-y-[--spacing(0.45)] items-center justify-center rounded-base border-2 border-border bg-secondary-background text-main-foreground group-has-data-[slot=questionnaire-choice-description]/questionnaire-choice:translate-y-0.5 group-data-[type=radio]/questionnaire-choice:rounded-full group-data-checked/questionnaire-choice:bg-main group-data-checked/questionnaire-choice:group-data-[type=radio]/questionnaire-choice:bg-transparent"
      >
        <span
          data-slot="questionnaire-choice-indicator-dot"
          className="hidden size-2 rounded-full bg-current group-data-[type=checkbox]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block"
        />
        <CheckIcon
          data-slot="questionnaire-choice-indicator-check"
          className="hidden size-3.5 group-data-[type=radio]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block"
        />
      </span>
      <QuestionnairePrimitive.ChoiceLabel
        data-slot="questionnaire-choice-label"
        className="flex min-w-0 flex-1 flex-col gap-0.5 leading-snug"
      >
        {children}
      </QuestionnairePrimitive.ChoiceLabel>
      <QuestionnairePrimitive.ChoiceShortcut
        data-slot="questionnaire-choice-shortcut"
        className="pointer-events-none ms-auto hidden size-5 shrink-0 items-center justify-center rounded-full border-2 border-border bg-secondary-background text-xs leading-none font-base text-foreground group-data-checked/questionnaire-choice:bg-background group-data-[shortcut]/questionnaire-choice:inline-flex"
      />
    </QuestionnairePrimitive.Choice>
  )
}

function QuestionnaireChoiceDescription({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="questionnaire-choice-description"
      className={cn("text-foreground", className)}
      {...props}
    />
  )
}

function QuestionnaireInput({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Input>) {
  return (
    <div
      data-slot="questionnaire-input-wrapper"
      className="group/questionnaire-input relative w-full min-w-0"
    >
      <QuestionnairePrimitive.Input
        data-slot="questionnaire-input"
        className={cn(
          "flex h-10 min-h-10 w-full min-w-0 rounded-base border-2 border-border bg-secondary-background px-3 py-2 text-base font-base text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0 md:text-sm",
          "selection:bg-main selection:text-main-foreground placeholder:text-foreground/50",
          className,
        )}
        {...props}
      />
    </div>
  )
}

function QuestionnaireError({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Error>) {
  return (
    <QuestionnairePrimitive.Error
      data-slot="questionnaire-error"
      className={cn("mt-2 text-sm font-base text-red-500", className)}
      {...props}
    />
  )
}

function QuestionnaireActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="questionnaire-actions"
      className={cn(
        "grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 sm:min-h-8",
        className,
      )}
      {...props}
    />
  )
}

function QuestionnairePrevious({
  children,
  className,
  size = "sm",
  variant = "neutral",
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Previous> &
  Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
  return (
    <QuestionnairePrimitive.Previous
      data-slot="questionnaire-previous"
      data-size={size}
      data-variant={variant}
      className={cn(
        buttonVariants({ size, variant }),
        "col-start-1 row-start-1 min-h-11 justify-self-start sm:min-h-0",
        className,
      )}
      {...props}
    >
      {children ?? "Previous"}
    </QuestionnairePrimitive.Previous>
  )
}

function QuestionnaireSkip({
  children,
  className,
  size = "sm",
  variant = "neutral",
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Skip> &
  Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
  return (
    <QuestionnairePrimitive.Skip
      data-slot="questionnaire-skip"
      data-size={size}
      data-variant={variant}
      className={cn(
        buttonVariants({ size, variant }),
        "col-start-2 row-start-1 min-h-11 justify-self-end sm:min-h-0",
        className,
      )}
      {...props}
    >
      {children ?? "Skip"}
    </QuestionnairePrimitive.Skip>
  )
}

function QuestionnaireNext({
  children,
  className,
  size = "sm",
  variant = "default",
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Next> &
  Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
  return (
    <QuestionnairePrimitive.Next
      data-slot="questionnaire-next"
      data-size={size}
      data-variant={variant}
      className={cn(
        buttonVariants({ size, variant }),
        "col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0",
        className,
      )}
      {...props}
    >
      {children ?? "Next"}
    </QuestionnairePrimitive.Next>
  )
}

function QuestionnaireSubmit({
  children,
  className,
  size = "sm",
  variant = "default",
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Submit> &
  Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
  return (
    <QuestionnairePrimitive.Submit
      data-slot="questionnaire-submit"
      data-size={size}
      data-variant={variant}
      className={cn(
        buttonVariants({ size, variant }),
        "col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0",
        className,
      )}
      {...props}
    >
      {children ?? "Submit"}
    </QuestionnairePrimitive.Submit>
  )
}

export {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
}
```


## Usage

```ts
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from '@/components/ui/questionnaire'
```

```tsx
const items = [
  { name: "plan", choices: [{ value: "free" }, { value: "pro" }], required: true },
  { name: "notes" },
] as const

<Questionnaire items={items} onSubmit={handleSubmit}>
  <QuestionnaireProgress />
  <QuestionnaireItem name="plan" required>
    <QuestionnaireTitle>Choose a plan</QuestionnaireTitle>
    <QuestionnaireChoices>
      <QuestionnaireChoice value="free">Free</QuestionnaireChoice>
      <QuestionnaireChoice value="pro">Pro</QuestionnaireChoice>
    </QuestionnaireChoices>
    <QuestionnaireError />
  </QuestionnaireItem>
  <QuestionnaireItem name="notes">
    <QuestionnaireTitle>Anything else?</QuestionnaireTitle>
    <QuestionnaireInput placeholder="Type your answer..." />
  </QuestionnaireItem>
  <QuestionnaireActions>
    <QuestionnairePrevious />
    <QuestionnaireSkip />
    <QuestionnaireNext />
    <QuestionnaireSubmit />
  </QuestionnaireActions>
</Questionnaire>
```

`Questionnaire` renders a `form`. The `items` prop declares the steps (`name`, optional `choices` and `required`) and drives the progress, navigation and validation. Read the answers from the form's `FormData` in `onSubmit`. Add `multiple` to a `QuestionnaireItem` to allow several choices, and `shortcuts="letters"` or `shortcuts="numbers"` to the root to enable keyboard shortcuts for the choices.

## Examples

### Default

```tsx
"use client"

import * as React from "react"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"

const items = [
  {
    name: "framework",
    choices: [{ value: "next" }, { value: "vite" }, { value: "astro" }],
    required: true,
  },
  {
    name: "features",
    choices: [{ value: "docs" }, { value: "registry" }, { value: "themes" }],
  },
  {
    name: "feedback",
  },
] as const

export default function QuestionnaireDemo() {
  const [answers, setAnswers] = React.useState<Record<
    string,
    string | string[]
  > | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setAnswers({
      framework: String(formData.get("framework") ?? ""),
      features: formData.getAll("features").map(String),
      feedback: String(formData.get("feedback") ?? ""),
    })
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="w-full">
        <Questionnaire
          items={items}
          shortcuts="letters"
          onSubmit={handleSubmit}
        >
          <QuestionnaireProgress />
          <QuestionnaireItem name="framework" required>
            <QuestionnaireTitle>Which framework do you use?</QuestionnaireTitle>
            <QuestionnaireDescription>
              Pick the one you use most of the time.
            </QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="next">
                Next.js
                <QuestionnaireChoiceDescription>
                  App router with React Server Components
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
              <QuestionnaireChoice value="vite">
                Vite
                <QuestionnaireChoiceDescription>
                  Single page application
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
              <QuestionnaireChoice value="astro">
                Astro
                <QuestionnaireChoiceDescription>
                  Content focused sites
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireItem name="features" multiple>
            <QuestionnaireTitle>
              What do you use from the library?
            </QuestionnaireTitle>
            <QuestionnaireDescription>
              Select all that apply, or skip this question.
            </QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="docs">
                Documentation
              </QuestionnaireChoice>
              <QuestionnaireChoice value="registry">
                Registry
              </QuestionnaireChoice>
              <QuestionnaireChoice value="themes">Themes</QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireItem name="feedback">
            <QuestionnaireTitle>Anything else?</QuestionnaireTitle>
            <QuestionnaireDescription>
              Tell us what you would like to see next.
            </QuestionnaireDescription>
            <QuestionnaireInput
              aria-label="Feedback"
              placeholder="Type your answer..."
            />
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireSkip />
            <QuestionnaireNext />
            <QuestionnaireSubmit />
          </QuestionnaireActions>
        </Questionnaire>
      </div>
      {answers ? (
        <pre className="w-full overflow-x-auto rounded-base border-2 border-border bg-secondary-background p-4 text-xs font-base">
          {JSON.stringify(answers, null, 2)}
        </pre>
      ) : null}
    </div>
  )
}
```

### Validation

Free-text steps with `QuestionnaireInput`. Mark a step `required`, set the input `type`, and pass your own check to the `invalid` prop on `QuestionnaireItem`. `QuestionnaireError` shows its children as the message and blocks navigation until the answer is valid.

```tsx
"use client"

import * as React from "react"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"

const items = [
  { name: "name", required: true },
  { name: "email", required: true },
] as const

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function QuestionnaireValidationDemo() {
  const [email, setEmail] = React.useState("")
  const [result, setResult] = React.useState<{
    name: string
    email: string
  } | null>(null)

  const emailInvalid = email.length > 0 && !EMAIL_PATTERN.test(email)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setResult({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
    })
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Questionnaire items={items} onSubmit={handleSubmit}>
        <QuestionnaireProgress />
        <QuestionnaireItem name="name" required>
          <QuestionnaireTitle>What should we call you?</QuestionnaireTitle>
          <QuestionnaireInput
            aria-label="Name"
            placeholder="Your name"
            autoComplete="name"
          />
          <QuestionnaireError>Enter your name to continue.</QuestionnaireError>
        </QuestionnaireItem>
        <QuestionnaireItem name="email" required invalid={emailInvalid}>
          <QuestionnaireTitle>Where can we reach you?</QuestionnaireTitle>
          <QuestionnaireDescription>
            We only use this to send you the results.
          </QuestionnaireDescription>
          <QuestionnaireInput
            type="email"
            aria-label="Email"
            placeholder="you@example.com"
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <QuestionnaireError>
            {email
              ? "Enter a valid email address."
              : "Enter your email to continue."}
          </QuestionnaireError>
        </QuestionnaireItem>
        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireNext />
          <QuestionnaireSubmit />
        </QuestionnaireActions>
      </Questionnaire>
      {result ? (
        <p className="text-sm font-base text-foreground">
          Thanks {result.name}, we&apos;ll be in touch at {result.email}.
        </p>
      ) : null}
    </div>
  )
}
```

### Controlled

Control the active step with the `item` and `onItemChange` props on `Questionnaire` and drive any UI from it, like a [Progress](/docs/progress) bar.

```tsx
"use client"

import * as React from "react"

import { Progress, ProgressLabel } from "@/components/ui/progress"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"

const items = [
  {
    name: "role",
    choices: [
      { value: "designer" },
      { value: "developer" },
      { value: "founder" },
    ],
    required: true,
  },
  {
    name: "team",
    choices: [{ value: "solo" }, { value: "small" }, { value: "large" }],
    required: true,
  },
  {
    name: "usage",
    choices: [{ value: "side" }, { value: "work" }, { value: "both" }],
    required: true,
  },
] as const

export default function QuestionnaireControlledDemo() {
  const [item, setItem] = React.useState<string>(items[0].name)
  const [submitted, setSubmitted] = React.useState(false)

  const step = items.findIndex((entry) => entry.name === item) + 1

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Progress value={(step / items.length) * 100}>
        <ProgressLabel>
          Step {step} of {items.length}
        </ProgressLabel>
      </Progress>
      <Questionnaire
        items={items}
        item={item}
        onItemChange={setItem}
        onSubmit={handleSubmit}
      >
        <QuestionnaireItem name="role" required>
          <QuestionnaireTitle>What best describes you?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="designer">Designer</QuestionnaireChoice>
            <QuestionnaireChoice value="developer">
              Developer
            </QuestionnaireChoice>
            <QuestionnaireChoice value="founder">Founder</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireItem name="team" required>
          <QuestionnaireTitle>How big is your team?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="solo">Just me</QuestionnaireChoice>
            <QuestionnaireChoice value="small">
              2 to 10 people
            </QuestionnaireChoice>
            <QuestionnaireChoice value="large">
              More than 10 people
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireItem name="usage" required>
          <QuestionnaireTitle>Where will you use it?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="side">
              Side projects
            </QuestionnaireChoice>
            <QuestionnaireChoice value="work">At work</QuestionnaireChoice>
            <QuestionnaireChoice value="both">Both</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireNext />
          <QuestionnaireSubmit />
        </QuestionnaireActions>
      </Questionnaire>
      {submitted ? (
        <p className="text-sm font-base text-foreground">
          All done, thanks for your answers!
        </p>
      ) : null}
    </div>
  )
}
```

### Single Step

A single question with `shortcuts="numbers"`, a preselected choice via `defaultChecked` and a `disabled` choice. Only `QuestionnaireSubmit` is needed since there is nothing to navigate.

```tsx
"use client"

import * as React from "react"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"

const items = [
  {
    name: "indentation",
    choices: [
      { value: "tabs" },
      { value: "spaces" },
      { value: "both", disabled: true },
    ],
    required: true,
  },
] as const

export default function QuestionnaireSingleStepDemo() {
  const [vote, setVote] = React.useState<string | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setVote(String(formData.get("indentation") ?? ""))
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Questionnaire items={items} shortcuts="numbers" onSubmit={handleSubmit}>
        <QuestionnaireItem name="indentation" required>
          <QuestionnaireTitle>Tabs or spaces?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Use the number keys to pick an answer, then press Enter.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="tabs" defaultChecked>
              Tabs
            </QuestionnaireChoice>
            <QuestionnaireChoice value="spaces">Spaces</QuestionnaireChoice>
            <QuestionnaireChoice value="both" disabled>
              Both
              <QuestionnaireChoiceDescription>
                Not available in this poll.
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireActions>
          <QuestionnaireSubmit>Vote</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
      {vote ? (
        <p className="text-sm font-base text-foreground">
          You voted for {vote}.
        </p>
      ) : null}
    </div>
  )
}
```
