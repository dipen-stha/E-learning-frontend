import * as React from "react";
import { cn } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";
import { Button } from "./Button";
import { Input } from "./Input";
import { PaginationArgs } from "@/services/types/Extras";

interface TableBodyProps extends React.ComponentProps<"tbody"> {
  loading?: boolean;
  rows?: number;
  columns?: number;
}

interface PaginationProps {
  initialPage: number;
  totalPages: number;
  maxVisible?: number
  apiFunction?: (pagination?: PaginationArgs) => Promise<void>;
}

interface TableProps extends React.ComponentProps<"table"> {
  pagination?: PaginationProps;
}

function Table({ className, pagination, ...props }: TableProps) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
      {pagination && <TablePagination {...pagination} />}
    </div>
  );
}

function TablePagination({ totalPages, initialPage = 1, maxVisible = 10, apiFunction }: PaginationProps) {
  const [currentPage, setCurrentPage] = React.useState(initialPage)
  const [inputValue, setInputValue] = React.useState("")

  const goToPage = async (page: number) => {
    if (page === currentPage) return
    if (page >= 1 && page <= totalPages) {
      const newOffset = initialPage + (page * maxVisible) - maxVisible
      const newLimit = initialPage + (page * maxVisible)
      setCurrentPage(page)
      setInputValue("")
      await apiFunction?.({offset: newOffset, limit: newLimit, page: maxVisible})
    }
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []

    const half = Math.floor(maxVisible / 2)
    let start = Math.max(2, currentPage - half)
    let end = Math.min(totalPages - 1, currentPage + half)

    if (currentPage <= half) {
      start = 2
      end = Math.min(totalPages - 1, maxVisible)
    } else if (currentPage > totalPages - half) {
      start = Math.max(2, totalPages - maxVisible + 1)
      end = totalPages - 1
    }

    // Always include first
    pages.push(1)

    if (start > 2) pages.push("...")

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < totalPages - 1) pages.push("...")

    if (totalPages > 1) pages.push(totalPages)

    return pages
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const page = Number(inputValue)
    if (!isNaN(page)) {
      goToPage(page)
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 py-4 flex-wrap">
      <Button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </Button>

      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-2">
            ...
          </span>
        ) : (
          <Button
            key={idx}
            onClick={() => goToPage(page as number)}
            className={cn(
              "px-3 py-1 border rounded w-[40px]",
              currentPage === page && "bg-blue-500 text-white"
            )}
          >
            {page}
          </Button>
        )
      )}

      <Button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>

      {/* Jump to page input */}
      <form onSubmit={handleInputSubmit} className="flex items-center gap-1">
        <Input
          type="number"
          min={1}
          max={totalPages}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-16 px-2 py-1 border rounded text-center"
          placeholder="#"
        />
        <Button
          type="submit"
          className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
        >
          Go
        </Button>
      </form>
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableBody({
  className,
  loading = false,
  rows = 3,
  columns = 4,
  children,
  ...props
}: TableBodyProps) {
  return loading ? (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    >
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <tr key={rowIdx} className="border-gray-200">
          {Array.from({ length: columns }).map((_, colIdx) => (
            <td key={colIdx} className="px-3 py-5">
              <Skeleton height={20} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  ) : (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    >
      {children}
    </tbody>
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-gray-200 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
