import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-[#f8fafc] placeholder:text-[#94a3b8] selection:bg-[#3b82f6] selection:text-[#f8fafc] flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base transition-all duration-150 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        // Наши стили trading-input
        "trading-input border-[#475569] bg-[#0f172a] text-[#f8fafc]",
        "hover:border-[#3b82f6]",
        "focus:border-[#3b82f6] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)]",
        "aria-invalid:border-[#dc2626] aria-invalid:ring-[#dc2626]/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }