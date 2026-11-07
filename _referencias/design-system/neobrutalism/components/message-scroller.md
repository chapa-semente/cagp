---
title: "Message Scroller"
description: "A scroll container for chat messages with auto scroll and a scroll-to-end button."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/message-scroller"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "lucide-react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/message-scroller"
---

# Message Scroller

> A scroll container for chat messages with auto scroll and a scroll-to-end button.

> 🔗 **Original Source Code**: [`components/ui/message-scroller.tsx`](../ui/message-scroller.tsx)
> 📂 **Original Examples**: [`examples/ui/message-scroller/`](../examples/message-scroller/)

```tsx
import { RotateCwIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"

const messages = [
  { from: "me", text: "Deploying to prod real quick." },
  { from: "them", text: "It's 4:55 PM. On a Friday." },
  { from: "me", text: "Ship it." },
  { from: "them", text: "Did the registry build go through?" },
  { from: "me", text: "Yes, one stale route showed up though." },
  { from: "them", text: "Which one?" },
  { from: "me", text: "The old toast page, still in the sidebar." },
  { from: "them", text: "Remove it and rebuild." },
  { from: "me", text: "Done. Lint and tsc are clean." },
  { from: "them", text: "Charts render fine with recharts 3?" },
  { from: "me", text: "They do. Pushing the fix now." },
  { from: "them", text: "Perfect, that is exactly what I had in mind." },
]

export default function MessageScrollerDemo() {
  return (
    <div className="flex h-[360px] w-full max-w-md flex-col overflow-hidden rounded-base border-2 border-border bg-secondary-background text-foreground">
      <div className="flex items-center gap-3 p-4">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-sm">
          <span className="truncate font-heading">New Chat</span>
          <span className="truncate font-base">How can I help you today?</span>
        </div>
        <Button
          variant="neutral"
          size="icon"
          className="size-9 shadow-none!"
          aria-label="Reset chat"
        >
          <RotateCwIcon />
        </Button>
      </div>
      <div className="h-0.5 w-full shrink-0 bg-border" />
      <MessageScrollerProvider>
        <MessageScroller className="p-4">
          <MessageScrollerViewport>
            <MessageScrollerContent className="gap-4">
              {messages.map((message, index) => (
                <MessageScrollerItem key={index} messageId={`message-${index}`}>
                  <Message align={message.from === "me" ? "end" : "start"}>
                    <MessageAvatar>
                      <Avatar>
                        <AvatarFallback>BF</AvatarFallback>
                      </Avatar>
                    </MessageAvatar>
                    <MessageContent>
                      <Bubble
                        variant={message.from === "me" ? "default" : "muted"}
                      >
                        <BubbleContent>{message.text}</BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  )
}
```

## Installation

The component depends on the `@shadcn/react` package. Install it first:

```bash
pnpm add @shadcn/react
```

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/message-scroller.json"
```

### Component Source Code (`components/ui/message-scroller.tsx`)

```tsx
"use client"

import {
  MessageScroller as MessageScrollerPrimitive,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@shadcn/react/message-scroller"
import { ArrowDownIcon } from "lucide-react"

import * as React from "react"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

function MessageScrollerProvider(
  props: React.ComponentProps<typeof MessageScrollerPrimitive.Provider>,
) {
  return <MessageScrollerPrimitive.Provider {...props} />
}

function MessageScroller({
  className,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Root>) {
  return (
    <MessageScrollerPrimitive.Root
      data-slot="message-scroller"
      className={cn(
        "group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden",
        className,
      )}
      {...props}
    />
  )
}

function MessageScrollerViewport({
  className,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Viewport>) {
  return (
    <MessageScrollerPrimitive.Viewport
      data-slot="message-scroller-viewport"
      className={cn(
        "size-full min-h-0 min-w-0 overflow-y-auto overscroll-contain data-pending-scroll:invisible",
        className,
      )}
      {...props}
    />
  )
}

function MessageScrollerContent({
  className,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Content>) {
  return (
    <MessageScrollerPrimitive.Content
      data-slot="message-scroller-content"
      className={cn("flex h-max min-h-full flex-col gap-6", className)}
      {...props}
    />
  )
}

function MessageScrollerItem({
  className,
  scrollAnchor = false,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Item>) {
  return (
    <MessageScrollerPrimitive.Item
      data-slot="message-scroller-item"
      scrollAnchor={scrollAnchor}
      className={cn(
        "min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]",
        className,
      )}
      {...props}
    />
  )
}

function MessageScrollerButton({
  direction = "end",
  className,
  children,
  render,
  variant = "neutral",
  size = "icon",
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Button> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <MessageScrollerPrimitive.Button
      data-slot="message-scroller-button"
      data-direction={direction}
      data-variant={variant}
      data-size={size}
      direction={direction}
      className={cn(
        "absolute inset-s-1/2 size-8 rounded-full! -translate-x-1/2 transition-[translate,scale,opacity] duration-200 shadow-none! hover:-translate-x-1/2! hover:translate-y-0! data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full rtl:translate-x-1/2 rtl:hover:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180",
        className,
      )}
      render={render ?? <Button variant={variant} size={size} />}
      {...props}
    >
      {children ?? (
        <>
          <ArrowDownIcon />
          <span className="sr-only">
            {direction === "end" ? "Scroll to end" : "Scroll to start"}
          </span>
        </>
      )}
    </MessageScrollerPrimitive.Button>
  )
}

export {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
}
```


## Usage

```ts
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
} from '@/components/ui/message-scroller'
```

```tsx
<MessageScrollerProvider>
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        {messages.map((message) => (
          <MessageScrollerItem key={message.id} messageId={message.id}>
            <Message>...</Message>
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>
```

The scroller needs a parent with a fixed height. Use the `useMessageScroller` hook inside the provider to scroll programmatically (`scrollToEnd`, `scrollToStart`, `scrollToMessage`).

## Examples

### Default

```tsx
import { RotateCwIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"

const messages = [
  { from: "me", text: "Deploying to prod real quick." },
  { from: "them", text: "It's 4:55 PM. On a Friday." },
  { from: "me", text: "Ship it." },
  { from: "them", text: "Did the registry build go through?" },
  { from: "me", text: "Yes, one stale route showed up though." },
  { from: "them", text: "Which one?" },
  { from: "me", text: "The old toast page, still in the sidebar." },
  { from: "them", text: "Remove it and rebuild." },
  { from: "me", text: "Done. Lint and tsc are clean." },
  { from: "them", text: "Charts render fine with recharts 3?" },
  { from: "me", text: "They do. Pushing the fix now." },
  { from: "them", text: "Perfect, that is exactly what I had in mind." },
]

export default function MessageScrollerDemo() {
  return (
    <div className="flex h-[360px] w-full max-w-md flex-col overflow-hidden rounded-base border-2 border-border bg-secondary-background text-foreground">
      <div className="flex items-center gap-3 p-4">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-sm">
          <span className="truncate font-heading">New Chat</span>
          <span className="truncate font-base">How can I help you today?</span>
        </div>
        <Button
          variant="neutral"
          size="icon"
          className="size-9 shadow-none!"
          aria-label="Reset chat"
        >
          <RotateCwIcon />
        </Button>
      </div>
      <div className="h-0.5 w-full shrink-0 bg-border" />
      <MessageScrollerProvider>
        <MessageScroller className="p-4">
          <MessageScrollerViewport>
            <MessageScrollerContent className="gap-4">
              {messages.map((message, index) => (
                <MessageScrollerItem key={index} messageId={`message-${index}`}>
                  <Message align={message.from === "me" ? "end" : "start"}>
                    <MessageAvatar>
                      <Avatar>
                        <AvatarFallback>BF</AvatarFallback>
                      </Avatar>
                    </MessageAvatar>
                    <MessageContent>
                      <Bubble
                        variant={message.from === "me" ? "default" : "muted"}
                      >
                        <BubbleContent>{message.text}</BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  )
}
```

### Add Messages

New messages are scrolled into view automatically when the viewport is already at the end.

```tsx
"use client"

import { RotateCwIcon } from "lucide-react"

import * as React from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
} from "@/components/ui/message-scroller"

type ChatMessage = { from: "me" | "them"; text: string }

const initialMessages: ChatMessage[] = [
  { from: "them", text: "Hey, are you around?" },
  { from: "me", text: "Yes, what is up?" },
  { from: "them", text: "I need a review on the message scroller." },
]

const replies = [
  "Sounds good to me.",
  "Can you double check the build output?",
  "Done, everything looks clean.",
  "Let us ship it then.",
  "Pushing now.",
]

function AddMessageButton({ onAdd }: { onAdd: () => void }) {
  const { scrollToEnd } = useMessageScroller()

  return (
    <Button
      onClick={() => {
        onAdd()
        requestAnimationFrame(() => scrollToEnd({ behavior: "smooth" }))
      }}
    >
      Add message
    </Button>
  )
}

export default function MessageScrollerAddMessagesDemo() {
  const [messages, setMessages] = React.useState(initialMessages)

  function addMessage() {
    setMessages((current) => {
      const last = current[current.length - 1]
      const added = current.length - initialMessages.length

      return [
        ...current,
        {
          from: last?.from === "me" ? "them" : "me",
          text: replies[added % replies.length],
        },
      ]
    })
  }

  return (
    <MessageScrollerProvider>
      <div className="flex w-full max-w-md flex-col gap-4">
        <div className="flex h-[360px] w-full flex-col overflow-hidden rounded-base border-2 border-border bg-secondary-background text-foreground">
          <div className="flex items-center gap-3 p-4">
            <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-sm">
              <span className="truncate font-heading">New Chat</span>
              <span className="truncate font-base">
                How can I help you today?
              </span>
            </div>
            <Button
              variant="neutral"
              size="icon"
              className="size-9 shadow-none!"
              aria-label="Reset chat"
              onClick={() => setMessages(initialMessages)}
            >
              <RotateCwIcon />
            </Button>
          </div>
          <div className="h-0.5 w-full shrink-0 bg-border" />
          <MessageScroller className="p-4">
            <MessageScrollerViewport>
              <MessageScrollerContent className="gap-4">
                {messages.map((message, index) => (
                  <MessageScrollerItem
                    key={index}
                    messageId={`message-${index}`}
                  >
                    <Message align={message.from === "me" ? "end" : "start"}>
                      <MessageAvatar>
                        <Avatar>
                          <AvatarFallback>BF</AvatarFallback>
                        </Avatar>
                      </MessageAvatar>
                      <MessageContent>
                        <Bubble
                          variant={message.from === "me" ? "default" : "muted"}
                        >
                          <BubbleContent>{message.text}</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                ))}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </div>
        <div className="flex justify-end">
          <AddMessageButton onAdd={addMessage} />
        </div>
      </div>
    </MessageScrollerProvider>
  )
}
```
