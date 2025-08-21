import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { motion, AnimatePresence, Easing } from "framer-motion"

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

interface CollapsibleContentProps
  extends React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent> {
  /** Custom animation duration in seconds */
  animationDuration?: number
  /** Custom animation easing */
  animationEasing?: string | number[]
}

function CollapsibleContent({
  children,
  animationDuration = 0.3,
  animationEasing = [0.04, 0.62, 0.23, 0.98],
  ...props
}: CollapsibleContentProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const contentRef = React.useRef<HTMLDivElement>(null)

  // Listen for open state changes from the Radix Collapsible
  React.useEffect(() => {
    const element = contentRef.current
    if (!element) return

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-state') {
          const state = element.getAttribute('data-state')
          setIsOpen(state === 'open')
        }
      })
    })

    observer.observe(element, { attributes: true })
    
    // Set initial state
    const initialState = element.getAttribute('data-state')
    setIsOpen(initialState === 'open')

    return () => observer.disconnect()
  }, [])

  return (
    <CollapsiblePrimitive.CollapsibleContent
      ref={contentRef}
      data-slot="collapsible-content"
      forceMount
      {...props}
      style={{ 
        overflow: 'hidden',
        ...props.style 
      }}
    >
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ 
              height: 0,
              opacity: 0
            }}
            animate={{ 
              height: 'auto',
              opacity: 1
            }}
            exit={{ 
              height: 0,
              opacity: 0
            }}
            transition={{
              duration: animationDuration,
              ease: animationEasing as Easing,
              opacity: {
                duration: animationDuration * 0.5
              }
            }}
            style={{ overflow: 'hidden' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </CollapsiblePrimitive.CollapsibleContent>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }