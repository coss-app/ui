import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/* DESIGN.md「按鈕」：主要動作膠囊形、高 40、14/600；停用主要鈕換淡綠，其他 50% 透明 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow,opacity,translate] outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        /* 主要：品牌深綠底白字 */
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover disabled:bg-primary-disabled disabled:opacity-100",
        /* 次要 outline：綠框綠字 */
        outline:
          "border-primary bg-card text-primary hover:bg-success-muted aria-expanded:bg-success-muted",
        /* 輔助（上傳、附件）：淡霧灰底 */
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-border aria-expanded:bg-border",
        /* 中性（列表列上的動作）：白底、霧藍紫框、7px 圓角、14/400 */
        neutral:
          "rounded-[7px] border-border-strong bg-card font-normal text-foreground hover:bg-muted aria-expanded:bg-muted",
        /* ghost 圖示鈕：hover 時淡霧灰底 */
        ghost:
          "text-foreground hover:bg-muted aria-expanded:bg-muted",
        destructive:
          "bg-destructive-muted text-destructive-foreground hover:bg-destructive hover:text-white focus-visible:ring-destructive/30",
        /* 文字連結：資訊藍 */
        link: "h-auto! px-0! text-info underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-2.5 px-5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xs: "h-6 gap-1 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 gap-1.5 px-3.5 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 gap-2.5 px-6 text-base",
        /* 卡片內滿寬表單送出：10px 圓角 */
        block: "h-10 w-full gap-2.5 rounded-lg px-5",
        icon: "size-10",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "size-12",
      },
    },
    compoundVariants: [
      /* 中性鈕高約 32、左右內距 10 */
      { variant: "neutral", size: "default", className: "h-8 gap-1.5 px-2.5" },
      {
        variant: "neutral",
        size: ["icon", "icon-sm"],
        className: "size-8",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
