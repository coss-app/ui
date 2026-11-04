import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@/lib/utils"

/* DESIGN.md「輸入框」：高 40、10px 圓角、淡霧灰填色無框；聚焦白底＋1.5px 深靛藍框；錯誤白底＋珊瑚紅框 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-lg border-[1.5px] border-transparent bg-muted px-3.5 py-1 text-sm text-foreground transition-[background-color,border-color] outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-semibold file:text-foreground placeholder:text-placeholder focus-visible:border-ring focus-visible:bg-card disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:bg-card",
        className
      )}
      {...props}
    />
  )
}

export { Input }
