import type * as React from "react";
import { useState, useEffect, useCallback } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

interface DropdownMenuContentProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Content> {
  className?: string;
  sideOffset?: number;
  autoPosition?: boolean;
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  children,
  autoPosition = true,
  ...props
}: DropdownMenuContentProps) {
  const [side, setSide] = useState<"top" | "right" | "bottom" | "left">("bottom");
  const [align, setAlign] = useState<"start" | "center" | "end">("start");

  const calculatePosition = useCallback(() => {
    if (!autoPosition) return;

    const trigger = document.querySelector('[data-slot="dropdown-menu-trigger"]');
    if (!trigger) return;

    const triggerRect = trigger.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Estimated dropdown dimensions (you can adjust these based on your typical content)
    const dropdownWidth = 200;
    const dropdownHeight = 300;
    const padding = 16; // Buffer space from viewport edges

    // Calculate available space in each direction
    const spaceBelow = viewportHeight - triggerRect.bottom - padding;
    const spaceAbove = triggerRect.top - padding;
    const spaceRight = viewportWidth - triggerRect.right - padding;
    const spaceLeft = triggerRect.left - padding;

    // Prioritize top/bottom positioning first (default behavior)
    let newSide: typeof side = "bottom";
    
    // Only change from bottom if there's insufficient space below AND more space above
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow && spaceAbove >= dropdownHeight) {
      newSide = "top";
    }
    // Only use left/right if both top and bottom don't have enough space
    else if (spaceBelow < dropdownHeight && spaceAbove < dropdownHeight) {
      if (spaceRight >= dropdownWidth) {
        newSide = "right";
      } else if (spaceLeft >= dropdownWidth) {
        newSide = "left";
      }
      // If no side has enough space, keep default bottom and let it scroll
    }

    // Determine alignment based on the chosen side
    let newAlign: typeof align = "start";

    if (newSide === "top" || newSide === "bottom") {
      // For top/bottom positioning, adjust horizontal alignment
      const triggerCenter = triggerRect.left + triggerRect.width / 2;
      const dropdownLeftEdge = triggerRect.left;
      const dropdownRightEdge = triggerRect.left + dropdownWidth;
      const dropdownCenterLeftEdge = triggerCenter - dropdownWidth / 2;
      const dropdownCenterRightEdge = triggerCenter + dropdownWidth / 2;

      if (dropdownRightEdge <= viewportWidth - padding) {
        // Enough space for start alignment
        newAlign = "start";
      } else if (dropdownCenterRightEdge <= viewportWidth - padding && dropdownCenterLeftEdge >= padding) {
        // Enough space for center alignment
        newAlign = "center";
      } else {
        // Use end alignment
        newAlign = "end";
      }
    } else {
      // For left/right positioning, adjust vertical alignment
      const triggerMiddle = triggerRect.top + triggerRect.height / 2;
      const dropdownTopEdge = triggerRect.top;
      const dropdownBottomEdge = triggerRect.top + dropdownHeight;
      const dropdownCenterTopEdge = triggerMiddle - dropdownHeight / 2;
      const dropdownCenterBottomEdge = triggerMiddle + dropdownHeight / 2;

      if (dropdownBottomEdge <= viewportHeight - padding) {
        // Enough space for start alignment (top-aligned)
        newAlign = "start";
      } else if (dropdownCenterBottomEdge <= viewportHeight - padding && dropdownCenterTopEdge >= padding) {
        // Enough space for center alignment
        newAlign = "center";
      } else {
        // Use end alignment (bottom-aligned)
        newAlign = "end";
      }
    }

    setSide(newSide);
    setAlign(newAlign);
  }, [autoPosition]);

  useEffect(() => {
    calculatePosition();
    
    // Recalculate on scroll and resize
    const handleReposition = () => {
      calculatePosition();
    };

    window.addEventListener('scroll', handleReposition, { passive: true });
    window.addEventListener('resize', handleReposition, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleReposition);
      window.removeEventListener('resize', handleReposition);
    };
  }, [calculatePosition]);

  // Animation variants based on side
  const getAnimationVariants = () => {
    const baseVariants = {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 }
    };

    switch (side) {
      case "top":
        return {
          ...baseVariants,
          initial: { ...baseVariants.initial, y: 10 },
          animate: { ...baseVariants.animate, y: 0 },
          exit: { ...baseVariants.exit, y: 10 }
        };
      case "bottom":
        return {
          ...baseVariants,
          initial: { ...baseVariants.initial, y: -10 },
          animate: { ...baseVariants.animate, y: 0 },
          exit: { ...baseVariants.exit, y: -10 }
        };
      case "left":
        return {
          ...baseVariants,
          initial: { ...baseVariants.initial, x: 10 },
          animate: { ...baseVariants.animate, x: 0 },
          exit: { ...baseVariants.exit, x: 10 }
        };
      case "right":
        return {
          ...baseVariants,
          initial: { ...baseVariants.initial, x: -10 },
          animate: { ...baseVariants.animate, x: 0 },
          exit: { ...baseVariants.exit, x: -10 }
        };
      default:
        return baseVariants;
    }
  };

  const variants = getAnimationVariants();

  return (
    <DropdownMenuPrimitive.Portal>
      <AnimatePresence>
        <DropdownMenuPrimitive.Content
          data-slot="dropdown-menu-content"
          side={side}
          align={align}
          sideOffset={sideOffset}
          asChild
          {...props}
        >
          <motion.div
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ 
              duration: 0.2, 
              ease: [0.16, 1, 0.3, 1] // Custom easing for smooth feel
            }}
            className={cn(
              "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md bg-white dark:bg-gray-800",
              className
            )}
            style={{ 
              transformOrigin: side === "top" ? "bottom" : side === "bottom" ? "top" : side === "left" ? "right" : "left"
            }}
          >
            {children}
          </motion.div>
        </DropdownMenuPrimitive.Content>
      </AnimatePresence>
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

interface DropdownMenuItemProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Item> {
  className?: string;
  inset?: boolean;
  variant?: "default" | "destructive";
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground cursor-pointer data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

interface DropdownMenuCheckboxItemProps extends React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> {
  className?: string;
  children?: React.ReactNode;
  checked?: boolean;
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

interface DropdownMenuRadioItemProps extends React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> {
  className?: string;
  children?: React.ReactNode;
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

interface DropdownMenuLabelProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Label> {
  className?: string;
  inset?: boolean;
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  );
}

interface DropdownMenuSeparatorProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Separator> {
  className?: string;
}

function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-gray-200 dark:bg-gray-600 -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

interface DropdownMenuShortcutProps extends React.ComponentProps<"span"> {
  className?: string;
}

function DropdownMenuShortcut({
  className,
  ...props
}: DropdownMenuShortcutProps) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

interface DropdownMenuSubTriggerProps extends React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> {
  className?: string;
  inset?: boolean;
  children?: React.ReactNode;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: DropdownMenuSubTriggerProps) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

interface DropdownMenuSubContentProps extends React.ComponentProps<typeof DropdownMenuPrimitive.SubContent> {
  className?: string;
}

function DropdownMenuSubContent({
  className,
  children,
  ...props
}: DropdownMenuSubContentProps) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      asChild
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, x: -10 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.95, x: -10 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className={cn(
          "bg-white dark:bg-gray-800 text-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg",
          className
        )}
        style={{ transformOrigin: "left" }}
      >
        {children}
      </motion.div>
    </DropdownMenuPrimitive.SubContent>
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};