---
title: "Multi-Step Form"
description: "A dependency-free form-state layer with per-step validation that composes with the Stepper. Forward navigation is gated on the current step's validator; submit fires only on the last step."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/multi-step-form"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
---

# Multi-Step Form

> A dependency-free form-state layer with per-step validation that composes with the Stepper. Forward navigation is gated on the current step's validator; submit fires only on the last step.

> 🔗 **Original Source Code**: [`components/ui/multi-step-form.tsx`](../ui/multi-step-form.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/multi-step-form.json"
```

### Component Source Code (`components/ui/multi-step-form.tsx`)

```tsx
/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'

/**
 * Multi-step form: a dependency-free form-state layer designed to sit on top of
 * the <Stepper /> UI. It owns values, per-field errors, touched state, and the
 * active step, and gates forward navigation on the current step's validator.
 * Stepper renders the indicator; this drives its `activeStep`.
 */

export type StepValidator<V> = (values: V) => Record<string, string> | null

export interface MultiStepFormStep<V> {
  id: string
  validate?: StepValidator<V>
}

interface MultiStepFormContextValue<V> {
  values: V
  setValue: <K extends keyof V>(name: K, value: V[K]) => void
  errors: Record<string, string>
  touched: Record<string, boolean>
  activeStep: number
  next: () => void
  back: () => void
  goTo: (step: number) => void
  canGoNext: boolean
  isStepValid: boolean
  isFirstStep: boolean
  isLastStep: boolean
  submit: () => void
}

// One context object reused for every value type; consumers read it through the
// typed useMultiStepForm<V>() hook below.
const MultiStepFormContext = React.createContext<MultiStepFormContextValue<unknown> | null>(null)

export interface MultiStepFormProps<V> {
  steps: MultiStepFormStep<V>[]
  initialValues: V
  onSubmit: (values: V) => void
  children: React.ReactNode
}

export function MultiStepForm<V>({
  steps,
  initialValues,
  onSubmit,
  children,
}: MultiStepFormProps<V>) {
  const [values, setValues] = React.useState<V>(initialValues)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})
  const [activeStep, setActiveStep] = React.useState(0)

  const totalSteps = steps.length
  const isFirstStep = activeStep === 0
  const isLastStep = activeStep === totalSteps - 1

  const setValue = React.useCallback(<K extends keyof V>(name: K, value: V[K]) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    setTouched((prev) => ({ ...prev, [name as string]: true }))
    setErrors((prev) => {
      if (!(name as string in prev)) return prev
      const next = { ...prev }
      delete next[name as string]
      return next
    })
  }, [])

  // Validate the current step against the latest values. Returns true when the
  // step has no validator or the validator returns null; otherwise publishes
  // the errors and returns false.
  const validateStep = React.useCallback(
    (step: number): boolean => {
      const validator = steps[step]?.validate
      if (!validator) {
        setErrors({})
        return true
      }
      const result = validator(values)
      setErrors(result ?? {})
      return result === null
    },
    [steps, values]
  )

  const isStepValid = React.useMemo(() => {
    const validator = steps[activeStep]?.validate
    return validator ? validator(values) === null : true
  }, [steps, activeStep, values])

  const goTo = React.useCallback(
    (step: number) => {
      if (step < 0 || step >= totalSteps) return
      // Backward navigation is unguarded; forward runs the current validator.
      if (step > activeStep) {
        if (!validateStep(activeStep)) return
      } else {
        setErrors({})
      }
      setActiveStep(step)
    },
    [activeStep, totalSteps, validateStep]
  )

  const next = React.useCallback(() => {
    if (isLastStep) return
    if (!validateStep(activeStep)) return
    setActiveStep((s) => Math.min(s + 1, totalSteps - 1))
  }, [activeStep, isLastStep, totalSteps, validateStep])

  const back = React.useCallback(() => {
    setErrors({})
    setActiveStep((s) => Math.max(s - 1, 0))
  }, [])

  const submit = React.useCallback(() => {
    if (!isLastStep) return
    if (!validateStep(activeStep)) return
    onSubmit(values)
  }, [activeStep, isLastStep, onSubmit, validateStep, values])

  const ctx: MultiStepFormContextValue<V> = {
    values,
    setValue,
    errors,
    touched,
    activeStep,
    next,
    back,
    goTo,
    canGoNext: isStepValid && !isLastStep,
    isStepValid,
    isFirstStep,
    isLastStep,
    submit,
  }

  return (
    <MultiStepFormContext.Provider value={ctx as MultiStepFormContextValue<unknown>}>
      {children}
    </MultiStepFormContext.Provider>
  )
}

export function useMultiStepForm<V>(): MultiStepFormContextValue<V> {
  const ctx = React.useContext(MultiStepFormContext)
  if (!ctx) {
    throw new Error('useMultiStepForm must be used within a <MultiStepForm />')
  }
  return ctx as MultiStepFormContextValue<V>
}
```

## Usage

```tsx
import { MultiStepForm, useMultiStepForm } from '@/components/ui/multi-step-form'

const steps = [
  { id: 'account', validate: (v) => (v.email.includes('@') ? null : { email: 'Invalid email' }) },
  { id: 'profile', validate: (v) => (v.name ? null : { name: 'Required' }) },
  { id: 'review' },
]

<MultiStepForm steps={steps} initialValues={{ email: '', name: '' }} onSubmit={handleSubmit}>
  <Wizard />
</MultiStepForm>

// inside <Wizard/>:
const { values, setValue, errors, activeStep, next, back, submit, isLastStep } = useMultiStepForm()
```

## Examples

No additional individual examples defined.
