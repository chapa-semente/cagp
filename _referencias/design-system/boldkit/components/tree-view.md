---
title: "Tree View"
description: "A hierarchical tree view component with expand/collapse, selection, checkboxes, and keyboard navigation."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/tree-view"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "radix-ui"
  - "lucide-react"
---

# Tree View

> A hierarchical tree view component with expand/collapse, selection, checkboxes, and keyboard navigation.

> 🔗 **Original Source Code**: [`components/ui/tree-view.tsx`](../ui/tree-view.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/tree-view.json"
```

### Component Source Code (`components/ui/tree-view.tsx`)

```tsx
/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { ChevronRight, Folder, File, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Collapsible,
  CollapsibleContent,
} from '@/components/ui/collapsible'

export interface TreeNode {
  id: string
  label: string
  icon?: React.ReactNode
  children?: TreeNode[]
  disabled?: boolean
}

export interface TreeViewProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TreeNode[]
  expandedIds?: string[]
  onExpandedChange?: (ids: string[]) => void
  selectedIds?: string[]
  onSelectedChange?: (ids: string[]) => void
  selectionMode?: 'none' | 'single' | 'multiple'
  showCheckboxes?: boolean
  showIcons?: boolean
  defaultExpandedIds?: string[]
  defaultSelectedIds?: string[]
}

// Context
interface TreeViewContextValue {
  expandedIds: Set<string>
  toggleExpanded: (id: string) => void
  selectedIds: Set<string>
  toggleSelected: (id: string) => void
  selectionMode: 'none' | 'single' | 'multiple'
  showCheckboxes: boolean
  showIcons: boolean
  /** The single tabbable node. ARIA trees are ONE tab stop, not one per node. */
  focusedId: string | null
  setFocusedId: (id: string) => void
  /** Visible nodes in render order, for Up/Down/Home/End navigation. */
  visibleIds: string[]
}

const TreeViewContext = React.createContext<TreeViewContextValue | null>(null)

function useTreeView() {
  const context = React.useContext(TreeViewContext)
  if (!context) {
    throw new Error('TreeView components must be used within a <TreeView />')
  }
  return context
}

const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      data,
      expandedIds: controlledExpandedIds,
      onExpandedChange,
      selectedIds: controlledSelectedIds,
      onSelectedChange,
      selectionMode = 'none',
      showCheckboxes = false,
      showIcons = true,
      defaultExpandedIds = [],
      defaultSelectedIds = [],
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledExpandedIds, setUncontrolledExpandedIds] = React.useState<Set<string>>(
      new Set(defaultExpandedIds)
    )
    const [uncontrolledSelectedIds, setUncontrolledSelectedIds] = React.useState<Set<string>>(
      new Set(defaultSelectedIds)
    )

    const isExpandedControlled = controlledExpandedIds !== undefined
    const isSelectedControlled = controlledSelectedIds !== undefined

    // Memoize Set objects to prevent useCallback dependencies from changing on every render
    const expandedIds = React.useMemo(
      () => (isExpandedControlled ? new Set(controlledExpandedIds) : uncontrolledExpandedIds),
      [isExpandedControlled, controlledExpandedIds, uncontrolledExpandedIds]
    )

    const selectedIds = React.useMemo(
      () => (isSelectedControlled ? new Set(controlledSelectedIds) : uncontrolledSelectedIds),
      [isSelectedControlled, controlledSelectedIds, uncontrolledSelectedIds]
    )

    const toggleExpanded = React.useCallback(
      (id: string) => {
        const newExpandedIds = new Set(expandedIds)
        if (newExpandedIds.has(id)) {
          newExpandedIds.delete(id)
        } else {
          newExpandedIds.add(id)
        }

        if (!isExpandedControlled) {
          setUncontrolledExpandedIds(newExpandedIds)
        }
        onExpandedChange?.(Array.from(newExpandedIds))
      },
      [expandedIds, isExpandedControlled, onExpandedChange]
    )

    const toggleSelected = React.useCallback(
      (id: string) => {
        if (selectionMode === 'none') return

        let newSelectedIds: Set<string>

        if (selectionMode === 'single') {
          newSelectedIds = selectedIds.has(id) ? new Set() : new Set([id])
        } else {
          newSelectedIds = new Set(selectedIds)
          if (newSelectedIds.has(id)) {
            newSelectedIds.delete(id)
          } else {
            newSelectedIds.add(id)
          }
        }

        if (!isSelectedControlled) {
          setUncontrolledSelectedIds(newSelectedIds)
        }
        onSelectedChange?.(Array.from(newSelectedIds))
      },
      [selectedIds, selectionMode, isSelectedControlled, onSelectedChange]
    )

    // Flattened visible order — what ArrowUp/ArrowDown/Home/End walk.
    const visibleIds = React.useMemo(() => {
      const out: string[] = []
      const walk = (nodes: TreeNode[]) => {
        for (const node of nodes) {
          out.push(node.id)
          if (node.children?.length && expandedIds.has(node.id)) walk(node.children)
        }
      }
      walk(data)
      return out
    }, [data, expandedIds])

    // An ARIA tree is a single tab stop: exactly one node carries tabIndex=0
    // and the arrow keys move between nodes. Every node being tabbable made a
    // 200-node tree cost 200 Tab presses to get past.
    const [focusedId, setFocusedId] = React.useState<string | null>(null)
    const activeId = focusedId && visibleIds.includes(focusedId) ? focusedId : visibleIds[0] ?? null

    return (
      <TreeViewContext.Provider
        value={{
          expandedIds,
          toggleExpanded,
          selectedIds,
          toggleSelected,
          selectionMode,
          showCheckboxes,
          showIcons,
          focusedId: activeId,
          setFocusedId,
          visibleIds,
        }}
      >
        <div
          ref={ref}
          role="tree"
          className={cn(
            'border-3 border-foreground bg-background p-2',
            'shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
            className
          )}
          {...props}
        >
          {data.map((node) => (
            <TreeNodeItem key={node.id} node={node} level={0} />
          ))}
        </div>
      </TreeViewContext.Provider>
    )
  }
)
TreeView.displayName = 'TreeView'

// Tree Node Component
interface TreeNodeProps {
  node: TreeNode
  level: number
}

function TreeNodeItem({ node, level }: TreeNodeProps) {
  const {
    expandedIds,
    toggleExpanded,
    selectedIds,
    toggleSelected,
    selectionMode,
    showCheckboxes,
    showIcons,
    focusedId,
    setFocusedId,
    visibleIds,
  } = useTreeView()

  const hasChildren = node.children && node.children.length > 0
  const isExpanded = expandedIds.has(node.id)
  const isSelected = selectedIds.has(node.id)
  const isFocused = focusedId === node.id
  const itemRef = React.useRef<HTMLDivElement>(null)

  // Move DOM focus to whichever node holds the roving tabindex, otherwise the
  // focus ring stops tracking arrow-key navigation.
  React.useEffect(() => {
    if (isFocused && document.activeElement !== itemRef.current) {
      const tree = itemRef.current?.closest('[role="tree"]')
      if (tree?.contains(document.activeElement)) itemRef.current?.focus()
    }
  }, [isFocused])

  const moveFocus = (delta: number | 'first' | 'last') => {
    if (!visibleIds.length) return
    const current = Math.max(0, visibleIds.indexOf(node.id))
    const next =
      delta === 'first'
        ? 0
        : delta === 'last'
          ? visibleIds.length - 1
          : Math.min(visibleIds.length - 1, Math.max(0, current + delta))
    setFocusedId(visibleIds[next])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // A treeitem contains its descendants' group, so a key pressed on a child
    // also bubbles to every ancestor treeitem. Without this, the outermost
    // handler runs last and overwrites the focus the child just moved.
    if (e.target !== e.currentTarget) return

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (selectionMode !== 'none') {
          toggleSelected(node.id)
        } else if (hasChildren) {
          toggleExpanded(node.id)
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        moveFocus(1)
        break
      case 'ArrowUp':
        e.preventDefault()
        moveFocus(-1)
        break
      case 'Home':
        e.preventDefault()
        moveFocus('first')
        break
      case 'End':
        e.preventDefault()
        moveFocus('last')
        break
      case 'ArrowRight':
        e.preventDefault()
        // APG: expand a collapsed parent, else move into it.
        if (hasChildren && !isExpanded) toggleExpanded(node.id)
        else if (hasChildren) moveFocus(1)
        break
      case 'ArrowLeft':
        e.preventDefault()
        // APG: collapse an expanded parent, else move out to the parent.
        if (hasChildren && isExpanded) toggleExpanded(node.id)
        else moveFocus(-1)
        break
    }
  }

  // The treeitem owns its own group, so every treeitem's nearest role-bearing
  // ancestor is `tree` or `group` (axe `aria-required-parent`). It used to be
  // wrapped in a CollapsibleTrigger, which both broke that and made the row a
  // button containing other buttons (axe `nested-interactive`).
  return (
    <div
      ref={itemRef}
      role="treeitem"
      // Pin the name to the label: the group of descendants lives inside this
      // element, and would otherwise be concatenated into its accessible name.
      aria-label={typeof node.label === 'string' ? node.label : undefined}
      // Only advertise selection where selection is actually possible.
      aria-selected={selectionMode === 'none' ? undefined : isSelected}
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-disabled={node.disabled}
      tabIndex={isFocused && !node.disabled ? 0 : -1}
      onKeyDown={handleKeyDown}
      onFocus={(e) => {
        if (e.target === e.currentTarget) setFocusedId(node.id)
      }}
      onClick={(e) => {
        if (node.disabled) return
        // A treeitem owns its descendants' group, so a click inside a child
        // must not also activate this node.
        e.stopPropagation()
        setFocusedId(node.id)
        if (hasChildren) {
          toggleExpanded(node.id)
        }
        if (selectionMode !== 'none') {
          toggleSelected(node.id)
        }
      }}
      className="focus:outline-none"
    >
      <div
        className={cn(
          'flex items-center gap-2 px-2 py-1.5 cursor-pointer transition-colors',
          'hover:bg-muted',
          isFocused && 'bg-muted',
          isSelected && 'bg-accent',
          node.disabled && 'opacity-50 cursor-not-allowed'
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {/* Expand/collapse affordance. Presentational, not a button: the row
            already toggles on click and ArrowLeft/ArrowRight do it from the
            keyboard, and a real button here would be interactive content
            nested inside the treeitem. */}
        {hasChildren ? (
          <ChevronRight
            aria-hidden="true"
            className={cn(
              'h-4 w-4 shrink-0 stroke-[3] transition-transform duration-200',
              isExpanded && 'rotate-90'
            )}
          />
        ) : (
          <span className="w-4 shrink-0" />
        )}

        {/* Checkbox — drawn, not a real control. `aria-selected` on the
            treeitem already conveys the state, and Radix's Checkbox renders a
            <button>, which inside a treeitem is an axe `nested-interactive`
            violation however it is tabindexed. */}
        {showCheckboxes && selectionMode !== 'none' && (
          <span
            aria-hidden="true"
            className={cn(
              'flex h-5 w-5 shrink-0 items-center justify-center border-2 border-foreground',
              isSelected && 'bg-primary shadow-[2px_2px_0px_hsl(var(--shadow-color))]'
            )}
          >
            {isSelected && <Check className="h-3.5 w-3.5 stroke-[4]" />}
          </span>
        )}

        {/* Icon */}
        {showIcons && (
          <span className="shrink-0" aria-hidden="true">
            {node.icon || (hasChildren ? (
              <Folder className="h-4 w-4" />
            ) : (
              <File className="h-4 w-4" />
            ))}
          </span>
        )}

        {/* Label */}
        <span className="text-sm truncate">{node.label}</span>
      </div>

      {hasChildren && (
        <Collapsible open={isExpanded}>
          <CollapsibleContent>
            <div role="group">
              {(node.children ?? []).map((child) => (
                <TreeNodeItem key={child.id} node={child} level={level + 1} />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  )
}

export { TreeView, useTreeView }
```

## Usage

```tsx
import { TreeView } from '@/components/ui/tree-view'

const data = [
  {
    id: 'root',
    label: 'Documents',
    children: [
      { id: 'doc1', label: 'File 1.txt' },
      { id: 'doc2', label: 'File 2.txt' },
    ],
  },
]

export default function Example() {
  return <TreeView data={data} />
}
```

## Examples

### File Explorer

A file explorer with custom icons for different file types.

```tsx
const data = [
  {
    id: '1',
    label: 'src',
    icon: <Folder className="h-4 w-4 text-yellow-500" />,
    children: [
      { id: '1-1', label: 'Button.tsx', icon: <Code className="h-4 w-4 text-blue-500" /> },
      // ...
    ],
  },
]

<TreeView data={data} defaultExpandedIds={['1', '1-1']} />
```

### Single Selection

Allow selecting a single item.

```tsx
const [selectedIds, setSelectedIds] = useState<string[]>([])

<TreeView
  data={data}
  selectionMode="single"
  selectedIds={selectedIds}
  onSelectedChange={setSelectedIds}
/>
```

### Multiple Selection

Allow selecting multiple items with checkboxes.

```tsx
<TreeView
  data={data}
  selectionMode="multiple"
  showCheckboxes
/>
```

### Controlled Expansion

Control which nodes are expanded.

```tsx
const [expandedIds, setExpandedIds] = useState(['1', '1-1'])

<TreeView
  data={data}
  expandedIds={expandedIds}
  onExpandedChange={setExpandedIds}
/>
```

### Without Icons

Hide icons for a simpler look.

```tsx
<TreeView data={data} showIcons={false} />
```

### Disabled Items

Disable specific items in the tree.

```tsx
const data = [
  {
    id: '1',
    label: 'Available',
    children: [
      { id: '1-1', label: 'Option A' },
      { id: '1-2', label: 'Option B (disabled)', disabled: true },
    ],
  },
]

<TreeView data={data} selectionMode="single" />
```

