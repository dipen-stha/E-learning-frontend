import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SelectProps extends React.ComponentProps<typeof SelectPrimitive.Root> {}

function Select({ ...props }: SelectProps) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

interface SelectGroupProps extends React.ComponentProps<typeof SelectPrimitive.Group> {
  className?: string;
  children?: React.ReactNode;
}

function SelectGroup({ className, children, ...props }: SelectGroupProps) {
  return (
    <SelectPrimitive.Group data-slot="select-group" className={className} {...props}>
      {children}
    </SelectPrimitive.Group>
  );
}

interface SelectValueProps extends React.ComponentProps<typeof SelectPrimitive.Value> {
  className?: string;
  children?: React.ReactNode;
}

function SelectValue({ className, children, ...props }: SelectValueProps) {
  return (
    <SelectPrimitive.Value data-slot="select-value" className={className} {...props}>
      {children}
    </SelectPrimitive.Value>
  );
}

interface SelectTriggerProps extends React.ComponentProps<typeof SelectPrimitive.Trigger> {
  className?: string;
  children?: React.ReactNode;
  size?: "sm" | "default";
}

function SelectTrigger({ className, size = "default", children, ...props }: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

interface SelectContentProps extends React.ComponentProps<typeof SelectPrimitive.Content> {
  className?: string;
  children?: React.ReactNode;
  position?: "popper" | "item-aligned";
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

function SelectContent({
  className,
  children,
  position = "popper",
  side = "bottom",
  align = "center",
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <AnimatePresence>
        <SelectPrimitive.Content
          position={position}
          side={side}
          align={align}
          sideOffset={4}
          asChild
          {...props}
        >
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            data-slot="select-content"
            className={cn(
              "bg-popover text-popover-foreground relative z-50 min-w-[8rem] max-h-[var(--radix-select-content-available-height)] overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
              position === "popper" && "w-[var(--radix-select-trigger-width)]",
              className
            )}
            style={{ transformOrigin: "top" }}
          >
            {/* <SelectScrollUpButton /> */}
            <SelectPrimitive.Viewport
              className={cn(
                "p-1",
                position === "popper" &&
                  "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
              )}
            >
              {children}
            </SelectPrimitive.Viewport>
            {/* <SelectScrollDownButton /> */}
          </motion.div>
        </SelectPrimitive.Content>
      </AnimatePresence>
    </SelectPrimitive.Portal>
  );
}

interface SelectLabelProps extends React.ComponentProps<typeof SelectPrimitive.Label> {
  className?: string;
  children?: React.ReactNode;
}

function SelectLabel({ className, children, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    >
      {children}
    </SelectPrimitive.Label>
  );
}

interface SelectItemProps extends React.ComponentProps<typeof SelectPrimitive.Item> {
  className?: string;
  children?: React.ReactNode;
  value: string;
}

function SelectItem({ className, children, value, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      value={value}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

interface SelectSeparatorProps extends React.ComponentProps<typeof SelectPrimitive.Separator> {
  className?: string;
}

function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

interface SelectScrollUpButtonProps extends React.ComponentProps<typeof SelectPrimitive.ScrollUpButton> {
  className?: string;
}

function SelectScrollUpButton({ className, ...props }: SelectScrollUpButtonProps) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

interface SelectScrollDownButtonProps extends React.ComponentProps<typeof SelectPrimitive.ScrollDownButton> {
  className?: string;
}

function SelectScrollDownButton({ className, ...props }: SelectScrollDownButtonProps) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};