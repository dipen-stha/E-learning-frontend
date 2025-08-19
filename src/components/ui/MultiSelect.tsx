import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/Command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"

interface MultiSelectProps<T> {
  label: keyof T;
  value: keyof T;
  options: T[]
  selected: Array<T[keyof T]>
  onChange: (selected: Array<T[keyof T]>) => void
  placeholder?: string
  className?: string
}

export function MultiSelect<T>({
  label,
  value,
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  className,
}: MultiSelectProps<T>) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item: T[keyof T]) => {
    onChange(selected.filter((i) => i !== item))
  }

  const handleSelect = (item: T[keyof T]) => {
    if (selected.includes(item)) {
      handleUnselect(item)
    } else {
      onChange([...selected, item])
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between bg-white border-gray-300 hover:bg-gray-50 h-auto min-h-[2.5rem] py-2",
            className,
          )}
        >
          <div className="flex gap-1 flex-wrap flex-1 mr-2">
            {selected.length > 0 ? (
              selected.map((item) => {
                const option = options.find((opt) => opt[value] === item);
                return (
                  <Badge
                    variant="secondary"
                    key={String(item)}
                    className="bg-cyan-100 text-cyan-800 mr-1 flex items-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleUnselect(item)
                    }}
                  >
                    {option ? String(option[label]): ""}
                    <button
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUnselect(item)
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleUnselect(item)
                      }}
                    >
                      <X className="h-3 w-3 text-gray-600 hover:text-gray-800" />
                    </button>
                  </Badge>
                )
              })
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50 self-start mt-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem key={String(option[value])} onSelect={() => handleSelect(option[value])}>
                  <Check
                    className={cn("mr-2 h-4 w-4", selected.includes(option[value]) ? "opacity-100" : "opacity-0")}
                  />
                  {String(option[label])}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
