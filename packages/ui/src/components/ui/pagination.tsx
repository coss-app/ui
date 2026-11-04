import * as React from "react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="分頁"
      data-slot="pagination"
      className={cn("flex h-10 w-full items-center justify-between gap-4", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      aria-disabled={props["aria-disabled"]}
      size={size}
      className={cn(className)}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  )
}

/* DESIGN.md「分頁」：上一頁／下一頁各 40×40 圓形白底；箭頭石板藍，停用灰藍 */
const paginationArrowClass =
  "bg-card text-muted-foreground hover:bg-muted aria-disabled:pointer-events-none aria-disabled:text-placeholder"

function PaginationPrevious({
  className,
  text = "上一頁",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label={text}
      size="icon"
      className={cn(paginationArrowClass, className)}
      {...props}
    >
      <ChevronLeftIcon />
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  text = "下一頁",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label={text}
      size="icon"
      className={cn(paginationArrowClass, className)}
      {...props}
    >
      <ChevronRightIcon />
    </PaginationLink>
  )
}

/** 左側資訊文字，例如「1 - 15 of 19」 */
function PaginationInfo({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="pagination-info"
      className={cn("text-sm font-semibold text-placeholder tabular-nums", className)}
      {...props}
    />
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-10 items-center justify-center text-placeholder [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon
      />
      <span className="sr-only">更多頁</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationInfo,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
