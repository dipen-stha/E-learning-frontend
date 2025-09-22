import { motion, AnimatePresence, Variants, Easing } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { CreateModalProps } from "@/services/types/Extras";

export function CreateModal({
  isOpen,
  onClose,
  actions,
  title,
  children,
  width,
}: CreateModalProps) {
  const widthClasses = {
    "sm": "w-sm",
    "md": "w-md",
    "lg": "w-lg",
    "xl": "w-xl",
    "2xl": "w-2xl",
    "3xl": "w-3xl",
    "4xl": "w-4xl",
    "full": "w-full mx-4",
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.25, ease: "easeOut" as Easing, delay: 0.05 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.15, ease: "easeIn" as Easing },
    },
  };

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.5,
      transition: { duration: 0.2, ease: "easeOut" as Easing },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.15, ease: "easeIn" as Easing },
    },
  };

  const buttonColorStatus = (variant: string | null) => {
    if (!variant) return "";
    if (variant === "primary") {
      return "bg-cyan-600 hover:bg-cyan-700 text-white";
    } else if (variant === "secondary") {
      return "bg-gray-900 hover:bg-gray-700 text-white";
    } else if (variant === "danger") {
      return "bg-red-600 hover:bg-red-700 text-white";
    } else if (variant === "default") {
      return "bg-gray-200 text-gray-900 hover:text-gray-400";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black z-40 h-full w-full"
            style={{ willChange: "opacity" }}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <motion.div
            className={cn(
              "fixed top-1/2 left-1/2 z-50 p-4 -translate-x-1/2 -translate-y-1/2",
              widthClasses[width ?? "4xl"]
            )}
            style={{ willChange: "opacity, transform" }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <div className="bg-white rounded-lg shadow-xl max-h-[90vh] border border-gray-200 flex flex-col">
              {/* Sticky Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="p-4 overflow-y-auto">{children}</div>
              {actions.length > 0 && (
                <div className="flex justify-end space-x-2 py-4 pr-4 border-t border-gray-200">
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      onClick={action.onAction}
                      className={buttonColorStatus(action?.variant)}
                    >
                      {action.title}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
