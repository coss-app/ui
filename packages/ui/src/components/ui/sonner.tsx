"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-left"
      toastOptions={{
        classNames: {
          toast: "min-h-[50px] gap-2! px-4! py-3! shadow-float!",
          title: "text-base! font-semibold!",
          description: "text-toast-foreground/70!",
        },
      }}
      icons={{
        success: <CircleCheckIcon className="size-6 fill-brand text-toast" />,
        info: <InfoIcon className="size-6 text-info" />,
        warning: <TriangleAlertIcon className="size-6 text-warning-bright" />,
        error: <OctagonXIcon className="size-6 text-destructive" />,
        loading: <Loader2Icon className="size-6 animate-spin" />,
      }}
      style={
        {
          /* DESIGN.md「Toast」：碳黑底白字、10px 圓角；桌面左下 40px */
          "--normal-bg": "var(--toast)",
          "--normal-text": "var(--toast-foreground)",
          "--normal-border": "transparent",
          "--border-radius": "var(--radius)",
          "--offset": "40px",
          "--mobile-offset": "16px",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
