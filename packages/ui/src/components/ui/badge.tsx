import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/* DESIGN.md「標籤」：膠囊、高 20、左右 9px、13/600，淡底配深色字 */
const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-[9px] text-[13px] leading-none font-semibold whitespace-nowrap transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        /* 中性／分類 */
        default: "bg-muted text-muted-foreground [a]:hover:bg-border",
        secondary: "bg-muted text-muted-foreground [a]:hover:bg-border",
        /* 進行中／資訊 */
        info: "bg-info-muted text-info [a]:hover:bg-stat-soft",
        /* 成功／啟用 */
        success: "bg-success-muted text-success-foreground",
        /* 待處理／警示 */
        warning: "bg-warning-muted text-warning",
        /* 錯誤／逾期 */
        destructive: "bg-destructive-muted text-destructive-foreground",
        outline: "border-border-strong text-muted-foreground [a]:hover:bg-muted",
        ghost: "text-muted-foreground hover:bg-muted",
        link: "text-info underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
