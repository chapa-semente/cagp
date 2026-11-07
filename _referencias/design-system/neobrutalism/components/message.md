---
title: "Message"
description: "A message in a conversation, with an avatar, content, header and footer."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/message"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/message"
---

# Message

> A message in a conversation, with an avatar, content, header and footer.

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"

export default function MessageDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarImage src="https://github.com/ekmas.png" alt="@ekmas" />
            <AvatarFallback>EK</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              I checked the latest deployment and the build failed while
              installing dependencies. Can you share the error from the logs?
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble>
            <BubbleContent>
              Sure, sending it over now. It looks like a peer dependency issue.
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </div>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/message.json"
```

### Component Source Code (`components/ui/message.tsx`)

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function MessageGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-group"
      className={cn("flex min-w-0 flex-col gap-2", className)}
      {...props}
    />
  )
}

function Message({
  className,
  align = "start",
  ...props
}: React.ComponentProps<"div"> & { align?: "start" | "end" }) {
  return (
    <div
      data-slot="message"
      data-align={align}
      className={cn(
        "group/message relative flex w-full min-w-0 gap-2 text-sm font-base data-[align=end]:flex-row-reverse",
        className,
      )}
      {...props}
    />
  )
}

function MessageAvatar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-avatar"
      className={cn(
        "flex size-10 shrink-0 items-center justify-center self-start overflow-hidden rounded-full border-2 border-border bg-background [&_[data-slot=avatar]]:size-full [&_[data-slot=avatar]]:outline-0 [&_[data-slot=avatar-fallback]]:bg-background",
        className,
      )}
      {...props}
    />
  )
}

function MessageContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-content"
      className={cn(
        "flex w-full min-w-0 flex-col gap-2.5 wrap-break-word group-data-[align=end]/message:*:data-slot:self-end",
        className,
      )}
      {...props}
    />
  )
}

function MessageHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-header"
      className={cn(
        "flex max-w-full min-w-0 items-center px-3 text-xs font-base text-foreground group-has-data-[variant=ghost]/message:px-0",
        className,
      )}
      {...props}
    />
  )
}

function MessageFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-footer"
      className={cn(
        "flex max-w-full min-w-0 items-center px-3 text-xs font-base text-foreground group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end",
        className,
      )}
      {...props}
    />
  )
}

export {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
}
```


## Usage

```ts
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  MessageFooter,
  MessageGroup,
} from '@/components/ui/message'
```

```tsx
<Message>
  <MessageAvatar>
    <Avatar>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble>
      <BubbleContent>Hello there!</BubbleContent>
    </Bubble>
  </MessageContent>
</Message>
```

The message content is usually a <Link href="/docs/bubble">Bubble</Link>. Use `align="end"` to place the message on the right side of the conversation.

## Examples

### Default

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"

export default function MessageDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarImage src="https://github.com/ekmas.png" alt="@ekmas" />
            <AvatarFallback>EK</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              I checked the latest deployment and the build failed while
              installing dependencies. Can you share the error from the logs?
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble>
            <BubbleContent>
              Sure, sending it over now. It looks like a peer dependency issue.
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </div>
  )
}
```

### Group

Use `MessageGroup` to group consecutive messages from the same sender.

```tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
} from "@/components/ui/message"

export default function MessageGroupDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <MessageGroup>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarFallback>BF</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>I checked the registry addresses.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarFallback>EK</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>
                The component and example JSON now live under the UI registry.
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </MessageGroup>
      <MessageGroup>
        <Message align="end">
          <MessageContent>
            <Bubble>
              <BubbleContent>Nice, that is what we wanted.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <Bubble>
              <BubbleContent>Ship it.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </MessageGroup>
    </div>
  )
}
```

### Header and Footer

```tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@/components/ui/message"

export default function MessageHeaderFooterDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>EK</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Ekmas</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>
              The header shows who sent the message and the footer shows when.
            </BubbleContent>
          </Bubble>
          <MessageFooter>10:24 AM</MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>You</MessageHeader>
          <Bubble>
            <BubbleContent>Got it, thanks for the explanation.</BubbleContent>
          </Bubble>
          <MessageFooter>10:26 AM</MessageFooter>
        </MessageContent>
      </Message>
    </div>
  )
}
```

### With Actions

```tsx
import { CopyIcon, RefreshCwIcon, ThumbsUpIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"

export default function MessageWithActionsDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              Here is a summary of the changes: the registry was rebuilt, two
              stale routes were removed and the docs were updated.
            </BubbleContent>
          </Bubble>
          <div className="flex items-center gap-1">
            <Button
              variant="neutral"
              size="icon"
              className="size-8 shadow-none! hover:translate-x-0! hover:translate-y-0!"
              aria-label="Copy"
            >
              <CopyIcon />
            </Button>
            <Button
              variant="neutral"
              size="icon"
              className="size-8 shadow-none! hover:translate-x-0! hover:translate-y-0!"
              aria-label="Regenerate"
            >
              <RefreshCwIcon />
            </Button>
            <Button
              variant="neutral"
              size="icon"
              className="size-8 shadow-none! hover:translate-x-0! hover:translate-y-0!"
              aria-label="Like"
            >
              <ThumbsUpIcon />
            </Button>
          </div>
        </MessageContent>
      </Message>
    </div>
  )
}
```
