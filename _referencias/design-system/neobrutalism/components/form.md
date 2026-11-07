---
title: "Form"
description: "Building forms with React Hook Form and Zod."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/form"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "@base-ui/react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/form"
---

# Form

> Building forms with React Hook Form and Zod.

> 🔗 **Original Source Code**: [`components/ui/form.tsx`](../ui/form.tsx)
> 📂 **Original Examples**: [`examples/ui/form/`](../examples/form/)

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function FormDemo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="ekmas" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/form.json"
```

### Component Source Code (`components/ui/form.tsx`)

```tsx
"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import * as React from "react"

import { Label } from "@/components/ui/label"

import { cn } from "@/lib/utils"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("font-heading", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

function FormControl({
  children,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  // Like Radix's `Slot`, the control merges its props into the single child
  // element (or the element passed to `render`).
  const renderElement =
    render ?? (React.isValidElement(children) ? children : undefined)

  return useRender({
    defaultTagName: "div",
    render: renderElement,
    props: mergeProps<"div">(
      {
        id: formItemId,
        "aria-describedby": !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`,
        "aria-invalid": !!error,
        children: renderElement ? undefined : children,
      },
      props,
    ),
    state: {
      slot: "form-control",
    },
  })
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-sm font-base text-foreground", className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-sm font-base text-red-500", className)}
      {...props}
    >
      {body}
    </p>
  )
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
```


## Usage

```ts
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
```

```ts
const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    username: "",
  },
});

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}
```

```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="ekmas" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>
```

## Examples

### Default

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function FormDemo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="ekmas" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

### Basic

A simple form with a text input and a textarea. On submit, the form data is validated against a Zod schema and any errors are displayed next to each field.

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { createToastManager, Toaster } from "@/components/ui/toast"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
})

const toastManager = createToastManager()

export default function FormBasicDemo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toastManager.add({
      title: "You submitted the following values:",
      description: (
        <code className="mt-2 block w-full overflow-x-auto rounded-base border-2 border-border bg-secondary-background p-3 text-xs whitespace-pre">
          {JSON.stringify(data, null, 2)}
        </code>
      ),
    })
  }

  return (
    <Toaster toastManager={toastManager}>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Bug Report</CardTitle>
          <CardDescription>
            Help us improve by reporting bugs you encounter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="form-basic"
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bug Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Login button not working on mobile"
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <InputGroup>
                      <FormControl>
                        <InputGroupTextarea
                          {...field}
                          placeholder="I'm having an issue with the login button on mobile."
                          rows={6}
                          className="min-h-24 resize-none"
                        />
                      </FormControl>
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.value.length}/100 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <FormDescription>
                      Include steps to reproduce, expected behavior, and what
                      actually happened.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="gap-2">
          <Button type="button" variant="neutral" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-basic">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </Toaster>
  )
}
```

### Input

For input fields, spread the `field` object onto the `<Input />` component. Wrapping it in `<FormControl />` wires up the `id`, `aria-describedby` and `aria-invalid` attributes, and `<FormMessage />` shows the validation error.

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createToastManager, Toaster } from "@/components/ui/toast"

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(10, "Username must be at most 10 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores.",
    ),
})

const toastManager = createToastManager()

export default function FormInputDemo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toastManager.add({
      title: "You submitted the following values:",
      description: (
        <code className="mt-2 block w-full overflow-x-auto rounded-base border-2 border-border bg-secondary-background p-3 text-xs whitespace-pre">
          {JSON.stringify(data, null, 2)}
        </code>
      ),
    })
  }

  return (
    <Toaster toastManager={toastManager}>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Update your profile information below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="form-input"
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-6"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="shadcn"
                        autoComplete="username"
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name. Must be between 3 and 10
                      characters. Must only contain letters, numbers, and
                      underscores.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="gap-2">
          <Button type="button" variant="neutral" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-input">
            Save
          </Button>
        </CardFooter>
      </Card>
    </Toaster>
  )
}
```

### Textarea

For textarea fields, spread the `field` object onto the `<Textarea />` component inside `<FormControl />`.

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { createToastManager, Toaster } from "@/components/ui/toast"

const formSchema = z.object({
  about: z
    .string()
    .min(10, "Please provide at least 10 characters.")
    .max(200, "Please keep it under 200 characters."),
})

const toastManager = createToastManager()

export default function FormTextareaDemo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      about: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toastManager.add({
      title: "You submitted the following values:",
      description: (
        <code className="mt-2 block w-full overflow-x-auto rounded-base border-2 border-border bg-secondary-background p-3 text-xs whitespace-pre">
          {JSON.stringify(data, null, 2)}
        </code>
      ),
    })
  }

  return (
    <Toaster toastManager={toastManager}>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Personalization</CardTitle>
          <CardDescription>
            Customize your experience by telling us more about yourself.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="form-textarea"
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-6"
            >
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>More about you</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="I'm a software engineer..."
                        className="min-h-[120px]"
                      />
                    </FormControl>
                    <FormDescription>
                      Tell us more about yourself. This will be used to help us
                      personalize your experience.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="gap-2">
          <Button type="button" variant="neutral" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-textarea">
            Save
          </Button>
        </CardFooter>
      </Card>
    </Toaster>
  )
}
```

### Select

For select components, use `field.value` and `field.onChange` on the `<Select />` component and wrap the `<SelectTrigger />` in `<FormControl />`. Pass `items` to `<Select />` so `<SelectValue />` renders the label instead of the raw value.

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createToastManager, Toaster } from "@/components/ui/toast"

const spokenLanguages = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
  { label: "Chinese", value: "zh" },
  { label: "Japanese", value: "ja" },
] as const

const languageItems = [{ label: "Auto", value: "auto" }, ...spokenLanguages]

const formSchema = z.object({
  language: z
    .string()
    .min(1, "Please select your spoken language.")
    .refine((val) => val !== "auto", {
      message:
        "Auto-detection is not allowed. Please select a specific language.",
    }),
})

const toastManager = createToastManager()

export default function FormSelectDemo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toastManager.add({
      title: "You submitted the following values:",
      description: (
        <code className="mt-2 block w-full overflow-x-auto rounded-base border-2 border-border bg-secondary-background p-3 text-xs whitespace-pre">
          {JSON.stringify(data, null, 2)}
        </code>
      ),
    })
  }

  return (
    <Toaster toastManager={toastManager}>
      <Card className="w-full sm:max-w-lg">
        <CardHeader>
          <CardTitle>Language Preferences</CardTitle>
          <CardDescription>
            Select your preferred spoken language.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="form-select"
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-6"
            >
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="grid gap-2">
                      <FormLabel>Spoken Language</FormLabel>
                      <FormDescription>
                        For best results, select the language you speak.
                      </FormDescription>
                      <FormMessage />
                    </div>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                      items={languageItems}
                    >
                      <FormControl>
                        <SelectTrigger className="min-w-[120px] sm:w-auto">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent alignItemWithTrigger>
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectSeparator />
                        {spokenLanguages.map((language) => (
                          <SelectItem
                            key={language.value}
                            value={language.value}
                          >
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="gap-2">
          <Button type="button" variant="neutral" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-select">
            Save
          </Button>
        </CardFooter>
      </Card>
    </Toaster>
  )
}
```

### Checkbox

For checkbox arrays, use `field.value` and `onCheckedChange` with array manipulation. Give each `<Checkbox />` its own `<FormItem />` and `<FormControl />` so its label and error state are wired up.

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { createToastManager, Toaster } from "@/components/ui/toast"

const tasks = [
  {
    id: "push",
    label: "Push notifications",
  },
  {
    id: "email",
    label: "Email notifications",
  },
] as const

const formSchema = z.object({
  responses: z.boolean(),
  tasks: z
    .array(z.string())
    .min(1, "Please select at least one notification type.")
    .refine(
      (value) => value.every((task) => tasks.some((t) => t.id === task)),
      {
        message: "Invalid notification type selected.",
      },
    ),
})

const toastManager = createToastManager()

export default function FormCheckboxDemo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      responses: true,
      tasks: [],
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toastManager.add({
      title: "You submitted the following values:",
      description: (
        <code className="mt-2 block w-full overflow-x-auto rounded-base border-2 border-border bg-secondary-background p-3 text-xs whitespace-pre">
          {JSON.stringify(data, null, 2)}
        </code>
      ),
    })
  }

  return (
    <Toaster toastManager={toastManager}>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage your notification preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="form-checkbox"
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-8"
            >
              <FormField
                control={form.control}
                name="responses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Responses</FormLabel>
                    <FormDescription>
                      Get notified for requests that take time, like research or
                      image generation.
                    </FormDescription>
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled
                        />
                      </FormControl>
                      <FormLabel className="font-base">
                        Push notifications
                      </FormLabel>
                    </FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tasks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tasks</FormLabel>
                    <FormDescription>
                      Get notified when tasks you&apos;ve created have updates.
                    </FormDescription>
                    {tasks.map((task) => (
                      <FormItem
                        key={task.id}
                        className="flex items-center gap-2"
                      >
                        <FormControl>
                          <Checkbox
                            name={field.name}
                            checked={field.value.includes(task.id)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...field.value, task.id]
                                : field.value.filter(
                                    (value) => value !== task.id,
                                  )
                              field.onChange(newValue)
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-base">
                          {task.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="gap-2">
          <Button type="button" variant="neutral" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-checkbox">
            Save
          </Button>
        </CardFooter>
      </Card>
    </Toaster>
  )
}
```

### Radio Group

For radio groups, use `field.value` and `onValueChange` on the `<RadioGroup />` component. Each `<RadioGroupItem />` gets its own `<FormItem />` and `<FormControl />`.

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { createToastManager, Toaster } from "@/components/ui/toast"

const plans = [
  {
    id: "starter",
    title: "Starter (100K tokens/month)",
    description: "For everyday use with basic features.",
  },
  {
    id: "pro",
    title: "Pro (1M tokens/month)",
    description: "For advanced AI usage with more features.",
  },
  {
    id: "enterprise",
    title: "Enterprise (Unlimited tokens)",
    description: "For large teams and heavy usage.",
  },
] as const

const formSchema = z.object({
  plan: z.string().min(1, "You must select a subscription plan to continue."),
})

const toastManager = createToastManager()

export default function FormRadioGroupDemo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toastManager.add({
      title: "You submitted the following values:",
      description: (
        <code className="mt-2 block w-full overflow-x-auto rounded-base border-2 border-border bg-secondary-background p-3 text-xs whitespace-pre">
          {JSON.stringify(data, null, 2)}
        </code>
      ),
    })
  }

  return (
    <Toaster toastManager={toastManager}>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            See pricing and features for each plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="form-radio-group"
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-6"
            >
              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan</FormLabel>
                    <FormDescription>
                      You can upgrade or downgrade your plan at any time.
                    </FormDescription>
                    <FormControl>
                      <RadioGroup
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                        className="gap-3"
                      >
                        {plans.map((plan) => (
                          <FormItem
                            key={plan.id}
                            className="flex items-start justify-between gap-4 rounded-base border-2 border-border bg-secondary-background p-4"
                          >
                            <div className="grid gap-1.5">
                              <FormLabel>{plan.title}</FormLabel>
                              <FormDescription>
                                {plan.description}
                              </FormDescription>
                            </div>
                            <FormControl>
                              <RadioGroupItem value={plan.id} />
                            </FormControl>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="gap-2">
          <Button type="button" variant="neutral" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-radio-group">
            Save
          </Button>
        </CardFooter>
      </Card>
    </Toaster>
  )
}
```

### Switch

For switches, use `field.value` and `onCheckedChange` on the `<Switch />` component.

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { createToastManager, Toaster } from "@/components/ui/toast"

const formSchema = z.object({
  twoFactor: z.boolean().refine((val) => val === true, {
    message: "It is highly recommended to enable two-factor authentication.",
  }),
})

const toastManager = createToastManager()

export default function FormSwitchDemo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twoFactor: false,
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toastManager.add({
      title: "You submitted the following values:",
      description: (
        <code className="mt-2 block w-full overflow-x-auto rounded-base border-2 border-border bg-secondary-background p-3 text-xs whitespace-pre">
          {JSON.stringify(data, null, 2)}
        </code>
      ),
    })
  }

  return (
    <Toaster toastManager={toastManager}>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Manage your account security preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="form-switch"
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-6"
            >
              <FormField
                control={form.control}
                name="twoFactor"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between gap-4">
                    <div className="grid gap-2">
                      <FormLabel>Multi-factor authentication</FormLabel>
                      <FormDescription>
                        Enable multi-factor authentication to secure your
                        account.
                      </FormDescription>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Switch
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="gap-2">
          <Button type="button" variant="neutral" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-switch">
            Save
          </Button>
        </CardFooter>
      </Card>
    </Toaster>
  )
}
```

### Complex Forms

Here is an example of a more complex form with multiple fields and validation.

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { createToastManager, Toaster } from "@/components/ui/toast"

const addons = [
  {
    id: "analytics",
    title: "Analytics",
    description: "Advanced analytics and reporting",
  },
  {
    id: "backup",
    title: "Backup",
    description: "Automated daily backups",
  },
  {
    id: "support",
    title: "Priority Support",
    description: "24/7 premium customer support",
  },
] as const

const billingPeriods = {
  monthly: "Monthly",
  yearly: "Yearly",
}

const formSchema = z.object({
  plan: z.enum(["basic", "pro"], {
    message: "Invalid plan selection. Please choose Basic or Pro",
  }),
  billingPeriod: z.string().min(1, "Please select a billing period"),
  addons: z
    .array(z.string())
    .min(1, "Please select at least one add-on")
    .max(3, "You can select up to 3 add-ons")
    .refine(
      (value) => value.every((addon) => addons.some((a) => a.id === addon)),
      {
        message: "You selected an invalid add-on",
      },
    ),
  emailNotifications: z.boolean(),
})

const toastManager = createToastManager()

export default function FormComplexDemo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: "basic",
      billingPeriod: "",
      addons: [],
      emailNotifications: false,
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toastManager.add({
      title: "You submitted the following values:",
      description: (
        <code className="mt-2 block w-full overflow-x-auto rounded-base border-2 border-border bg-secondary-background p-3 text-xs whitespace-pre">
          {JSON.stringify(data, null, 2)}
        </code>
      ),
    })
  }

  return (
    <Toaster toastManager={toastManager}>
      <Card className="w-full max-w-sm">
        <CardHeader className="border-b-2 border-border pb-6">
          <CardTitle>You&apos;re almost there!</CardTitle>
          <CardDescription>
            Choose your subscription plan and billing period.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="form-complex"
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-8"
            >
              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subscription Plan</FormLabel>
                    <FormDescription>
                      Choose your subscription plan.
                    </FormDescription>
                    <FormControl>
                      <RadioGroup
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                        className="gap-3"
                      >
                        <FormItem className="flex items-start justify-between gap-4 rounded-base border-2 border-border bg-secondary-background p-4">
                          <div className="grid gap-1.5">
                            <FormLabel>Basic</FormLabel>
                            <FormDescription>
                              For individuals and small teams
                            </FormDescription>
                          </div>
                          <FormControl>
                            <RadioGroupItem value="basic" />
                          </FormControl>
                        </FormItem>
                        <FormItem className="flex items-start justify-between gap-4 rounded-base border-2 border-border bg-secondary-background p-4">
                          <div className="grid gap-1.5">
                            <FormLabel>Pro</FormLabel>
                            <FormDescription>
                              For businesses with higher demands
                            </FormDescription>
                          </div>
                          <FormControl>
                            <RadioGroupItem value="pro" />
                          </FormControl>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billingPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Period</FormLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                      items={billingPeriods}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose how often you want to be billed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addons"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add-ons</FormLabel>
                    <FormDescription>
                      Select additional features you&apos;d like to include.
                    </FormDescription>
                    {addons.map((addon) => (
                      <FormItem
                        key={addon.id}
                        className="flex items-start gap-3"
                      >
                        <FormControl>
                          <Checkbox
                            name={field.name}
                            checked={field.value.includes(addon.id)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...field.value, addon.id]
                                : field.value.filter(
                                    (value) => value !== addon.id,
                                  )
                              field.onChange(newValue)
                              field.onBlur()
                            }}
                          />
                        </FormControl>
                        <div className="grid gap-1.5">
                          <FormLabel>{addon.title}</FormLabel>
                          <FormDescription>{addon.description}</FormDescription>
                        </div>
                      </FormItem>
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailNotifications"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between gap-4">
                    <div className="grid gap-2">
                      <FormLabel>Email Notifications</FormLabel>
                      <FormDescription>
                        Receive email updates about your subscription
                      </FormDescription>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Switch
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="border-t-2 border-border pt-6">
          <div className="grid w-full gap-2">
            <Button type="submit" form="form-complex">
              Save Preferences
            </Button>
            <Button
              type="button"
              variant="neutral"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Toaster>
  )
}
```

### Array Fields

React Hook Form provides a `useFieldArray` hook for managing dynamic array fields. This is useful when you need to add or remove fields dynamically.

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { XIcon } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { createToastManager, Toaster } from "@/components/ui/toast"

const formSchema = z.object({
  emails: z
    .array(
      z.object({
        address: z.string().email("Enter a valid email address."),
      }),
    )
    .min(1, "Add at least one email address.")
    .max(5, "You can add up to 5 email addresses."),
})

const toastManager = createToastManager()

export default function FormArrayDemo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emails: [{ address: "" }, { address: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "emails",
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toastManager.add({
      title: "You submitted the following values:",
      description: (
        <code className="mt-2 block w-full overflow-x-auto rounded-base border-2 border-border bg-secondary-background p-3 text-xs whitespace-pre">
          {JSON.stringify(data, null, 2)}
        </code>
      ),
    })
  }

  return (
    <Toaster toastManager={toastManager}>
      <Card className="w-full sm:max-w-md">
        <CardHeader className="border-b-2 border-border pb-6">
          <CardTitle>Contact Emails</CardTitle>
          <CardDescription>
            Manage your contact email addresses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="form-array"
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4"
            >
              <div className="grid gap-2">
                <FormLabel>Email Addresses</FormLabel>
                <p className="text-sm font-base text-foreground">
                  Add up to 5 email addresses where we can contact you.
                </p>
              </div>
              {fields.map((item, index) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name={`emails.${index}.address`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">
                        Email {index + 1}
                      </FormLabel>
                      <InputGroup>
                        <FormControl>
                          <InputGroupInput
                            {...field}
                            placeholder="name@example.com"
                            type="email"
                            autoComplete="email"
                          />
                        </FormControl>
                        {fields.length > 1 && (
                          <InputGroupAddon align="inline-end">
                            <InputGroupButton
                              type="button"
                              size="icon-xs"
                              onClick={() => remove(index)}
                              aria-label={`Remove email ${index + 1}`}
                            >
                              <XIcon />
                            </InputGroupButton>
                          </InputGroupAddon>
                        )}
                      </InputGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="neutral"
                size="sm"
                className="justify-self-start"
                onClick={() => append({ address: "" })}
                disabled={fields.length >= 5}
              >
                Add Email Address
              </Button>
              {form.formState.errors.emails?.root && (
                <p className="text-sm font-base text-red-500">
                  {form.formState.errors.emails.root.message}
                </p>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="gap-2 border-t-2 border-border pt-6">
          <Button type="button" variant="neutral" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-array">
            Save
          </Button>
        </CardFooter>
      </Card>
    </Toaster>
  )
}
```
