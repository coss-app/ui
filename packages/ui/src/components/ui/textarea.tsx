import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-20 w-full rounded-lg border-[1.5px] border-transparent bg-muted px-3.5 py-2.5 text-sm leading-normal text-foreground transition-[background-color,border-color] outline-none placeholder:text-placeholder focus-visible:border-ring focus-visible:bg-card disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:bg-card",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
