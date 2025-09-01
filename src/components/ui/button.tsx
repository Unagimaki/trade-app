import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium " +
    "transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 " +
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 " +
    "outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] " +
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-[#3b82f6] text-[#f8fafc] border-none shadow-xs hover:bg-[#2563eb] hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-[#dc2626] text-white border-none shadow-xs hover:bg-[#b91c1c] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border border-[#475569] bg-transparent text-[#f8fafc] shadow-xs hover:bg-[#334155] hover:border-[#3b82f6] dark:hover:bg-[#475569] hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-[#334155] text-[#f8fafc] border-none shadow-xs hover:bg-[#475569] hover:scale-[1.02] active:scale-[0.98]",
        ghost:
          "text-[#f8fafc] hover:bg-[#334155] dark:hover:bg-[#475569] hover:scale-[1.02] active:scale-[0.98]",
        link:
          "text-[#3b82f6] underline-offset-4 hover:underline",
        trading:
          "trading-button rounded-8px bg-[#3b82f6] text-[#f8fafc] border-none " +
          "hover:bg-[#2563eb] hover:transform hover:translate-y-[-1px] " +
          "active:transform active:translate-y-[1px] " +
          "disabled:bg-[#334155] disabled:transform-none",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }