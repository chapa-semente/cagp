/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type Table as TanstackTable,
} from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown, Search, Settings2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// DataTable Context
interface DataTableContextValue<TData> {
  table: TanstackTable<TData>
}

const DataTableContext = React.createContext<DataTableContextValue<unknown> | null>(null)

function useDataTable<TData>() {
  const context = React.useContext(DataTableContext)
  if (!context) {
    throw new Error('DataTable components must be used within a <DataTable />')
  }
  return context as DataTableContextValue<TData>
}

// Column Header with sorting
interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: import('@tanstack/react-table').Column<TData, TValue>
  title: string
}

function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn('-ml-3 h-8 data-[state=open]:bg-accent', className)}
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      <span>{title}</span>
      {column.getIsSorted() === 'desc' ? (
        <ArrowDown className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === 'asc' ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  )
}

// Toolbar
interface DataTableToolbarProps<TData> {
  table: TanstackTable<TData>
  filterPlaceholder?: string
  filterColumn?: string
  showColumnVisibility?: boolean
}

function DataTableToolbar<TData>({
  table,
  filterPlaceholder = 'Filtrar...',
  filterColumn,
  showColumnVisibility = true,
}: DataTableToolbarProps<TData>) {
  const column = filterColumn ? table.getColumn(filterColumn) : null

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3">
      <div className="flex flex-1 items-center space-x-2 min-w-[200px]">
        {column && (
          <div className="relative w-full sm:w-auto flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5B2A85]" />
            <Input
              placeholder={filterPlaceholder}
              value={String(column.getFilterValue() ?? '')}
              onChange={(event) => column.setFilterValue(event.target.value)}
              className="min-h-[44px] h-11 w-full pl-10 rounded-xl border-3 border-[#1F1F1F] bg-white font-sans shadow-[3px_3px_0_0_#1F1F1F] focus-visible:ring-3 focus-visible:ring-[#5B2A85] focus-visible:border-[#5B2A85]"
            />
          </div>
        )}
      </div>
      {showColumnVisibility && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto min-h-[44px] h-11 rounded-xl border-3 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F] font-heading font-extrabold uppercase text-xs">
              <Settings2 className="mr-2 h-4 w-4" />
              Colunas
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

// Pagination
interface DataTablePaginationProps<TData> {
  table: TanstackTable<TData>
  pageSizeOptions?: number[]
}

function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 50],
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3">
      <div className="text-xs font-mono font-bold text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <>
            {table.getFilteredSelectedRowModel().rows.length} de{' '}
            {table.getFilteredRowModel().rows.length} selecionada(s).
          </>
        ) : (
          <span>Total: {table.getFilteredRowModel().rows.length} registro(s)</span>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:gap-6">
        <div className="flex items-center space-x-2">
          <p className="text-xs font-heading font-bold uppercase text-foreground m-0">Por pág.</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="min-h-[44px] h-11 w-[88px] rounded-xl border-3 border-[#1F1F1F] bg-white font-mono font-bold">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-xs font-mono font-bold text-foreground px-2">
          Pág. {table.getState().pagination.pageIndex + 1} de{' '}
          {Math.max(1, table.getPageCount())}
        </div>
        <Pagination className="mx-0 w-auto">
          <PaginationContent className="gap-2">
            <PaginationItem>
              <PaginationPrevious
                role="button"
                tabIndex={table.getCanPreviousPage() ? 0 : -1}
                size="sm"
                onClick={(e) => {
                  e.preventDefault()
                  if (table.getCanPreviousPage()) table.previousPage()
                }}
                className={cn(
                  'min-h-[44px] px-3 rounded-xl border-3 border-[#1F1F1F] bg-white font-heading font-extrabold uppercase text-xs shadow-[2px_2px_0_0_#1F1F1F] cursor-pointer select-none',
                  !table.getCanPreviousPage() && 'pointer-events-none opacity-45'
                )}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                role="button"
                tabIndex={table.getCanNextPage() ? 0 : -1}
                size="sm"
                onClick={(e) => {
                  e.preventDefault()
                  if (table.getCanNextPage()) table.nextPage()
                }}
                className={cn(
                  'min-h-[44px] px-3 rounded-xl border-3 border-[#1F1F1F] bg-white font-heading font-extrabold uppercase text-xs shadow-[2px_2px_0_0_#1F1F1F] cursor-pointer select-none',
                  !table.getCanNextPage() && 'pointer-events-none opacity-45'
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

// Main DataTable component
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]

  // Features
  enableSorting?: boolean
  enableFiltering?: boolean
  enableColumnVisibility?: boolean
  enableRowSelection?: boolean
  enablePagination?: boolean

  // Pagination
  pageSize?: number
  pageSizeOptions?: number[]

  // Search
  filterColumn?: string
  filterPlaceholder?: string

  // Empty/Loading
  emptyMessage?: string
  isLoading?: boolean

  // Callbacks
  onRowSelectionChange?: (selectedRows: TData[]) => void
}

function DataTable<TData, TValue>({
  columns,
  data,
  enableSorting = true,
  enableFiltering = true,
  enableColumnVisibility = true,
  enableRowSelection = false,
  enablePagination = true,
  pageSize = 10,
  pageSizeOptions = [10, 20, 30, 50],
  filterColumn,
  filterPlaceholder = 'Filter...',
  emptyMessage = 'No results.',
  isLoading = false,
  onRowSelectionChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // Add selection column if row selection is enabled
  const tableColumns = React.useMemo(() => {
    if (!enableRowSelection) return columns

    const selectionColumn: ColumnDef<TData, unknown> = {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    }

    return [selectionColumn, ...columns]
  }, [columns, enableRowSelection])

  const table = useReactTable({
    data,
    columns: tableColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    ...(enablePagination && { getPaginationRowModel: getPaginationRowModel() }),
    ...(enableSorting && { getSortedRowModel: getSortedRowModel() }),
    ...(enableFiltering && { getFilteredRowModel: getFilteredRowModel() }),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  // Keep the latest callback in a ref so an inline `onRowSelectionChange` prop
  // does not re-run the effect on every render (which can loop if the parent
  // setStates from it).
  const onRowSelectionChangeRef = React.useRef(onRowSelectionChange)
  React.useEffect(() => {
    onRowSelectionChangeRef.current = onRowSelectionChange
  })

  // Notify parent of selection changes
  React.useEffect(() => {
    const notify = onRowSelectionChangeRef.current
    if (notify) {
      const selectedRows = table.getFilteredSelectedRowModel().rows.map((row) => row.original)
      notify(selectedRows)
    }
  }, [rowSelection, table])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(
    () => ({ table: table as TanstackTable<unknown> }),
    [table]
  )

  return (
    <DataTableContext.Provider value={contextValue}>
      <div className="space-y-4">
        {/* Toolbar */}
        {(enableFiltering || enableColumnVisibility) && (
          <DataTableToolbar
            table={table}
            filterPlaceholder={filterPlaceholder}
            filterColumn={filterColumn}
            showColumnVisibility={enableColumnVisibility}
          />
        )}

        {/* Table */}
        <div className="scroll-mask-x overflow-x-auto rounded-xl border-2 border-[#1F1F1F] bg-card shadow-[6px_6px_0_0_#1F1F1F]">
          <Table>
            <TableHeader className="border-b-3 border-[#1F1F1F] bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-b-2 border-[#1F1F1F]">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="font-heading font-extrabold uppercase tracking-wider text-foreground">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={tableColumns.length}
                    className="h-24 text-center"
                  >
                    <div className="flex items-center justify-center">
                      <div className="h-6 w-6 animate-spin border-3 border-[#1F1F1F] border-t-transparent" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className="border-b-2 border-[#1F1F1F]/20 hover:bg-accent-tint transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tableColumns.length}
                    className="h-24 text-center font-heading font-bold uppercase text-muted-foreground"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {enablePagination && (
          <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />
        )}
      </div>
    </DataTableContext.Provider>
  )
}

export {
  DataTable,
  DataTableColumnHeader,
  DataTableToolbar,
  DataTablePagination,
  useDataTable,
  type ColumnDef,
}
