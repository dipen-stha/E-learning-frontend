import type React from "react"
import { cn } from "@/lib/utils"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Checkbox: React.FC<CheckboxProps> = ({ className, label, id, ...props }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id={id}
        className={cn(
          "h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 focus:ring-2",
          className,
        )}
        {...props}
      />
      {label && (
        <label htmlFor={id} className="text-sm text-gray-600 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  )
}

export { Checkbox }
