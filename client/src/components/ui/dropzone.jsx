import * as React from "react"
import { Upload } from "lucide-react"
import { cn } from "@/lib/utils"

const Dropzone = React.forwardRef(({ className, onDrop, children, ...props }, ref) => {
  const [isDragOver, setIsDragOver] = React.useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    onDrop?.(files)
  }

  return (
    <div
      ref={ref}
      className={cn(
        "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-colors cursor-pointer",
        isDragOver && "border-primary bg-primary/5",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      {...props}
    >
      {children || (
        <div>
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Drag and drop files here, or click to select</p>
          <p className="text-sm text-gray-500">PNG, JPG, JPEG up to 10MB</p>
        </div>
      )}
    </div>
  )
})
Dropzone.displayName = "Dropzone"

export { Dropzone }