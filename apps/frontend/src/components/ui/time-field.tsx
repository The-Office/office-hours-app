import * as React from "react"
import { cn } from "@/lib/utils"

interface TimeFieldProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

const TimeField = React.forwardRef<HTMLDivElement, TimeFieldProps>(
  ({ value, onChange, className }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          className
        )}
      >
        <input
          type="time"
          step="300"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border-0 bg-transparent p-0 focus:outline-none"
        />
      </div>
    )
  }
)
TimeField.displayName = "TimeField"

export { TimeField }
export type { TimeFieldProps }