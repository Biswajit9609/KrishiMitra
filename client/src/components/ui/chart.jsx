import * as React from "react"
import { cn } from "@/lib/utils"

// Simple chart components for demonstration
const ChartContainer = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full h-64 bg-gray-50 rounded-lg flex items-center justify-center", className)}
    {...props}
  >
    {children}
  </div>
))
ChartContainer.displayName = "ChartContainer"

const LineChart = ({ data, className, ...props }) => (
  <div className={cn("w-full h-full flex items-end justify-between px-4 pb-4", className)} {...props}>
    {data?.map((point, index) => (
      <div
        key={index}
        className="flex flex-col items-center"
      >
        <div
          className="w-2 bg-primary rounded-t"
          style={{ height: `${(point.value / Math.max(...data.map(d => d.value))) * 100}%` }}
        />
        <span className="text-xs mt-2 text-gray-600">{point.label}</span>
      </div>
    ))}
  </div>
)

export { ChartContainer, LineChart }