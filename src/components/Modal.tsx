import React from "react";
import { motion, AnimatePresence, Variants, Easing } from "framer-motion";
import { cn } from "@/lib/utils";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
}

export function CreateModal({
  isOpen,
  onClose,
  title,
  children,
  width,
}: CreateModalProps) {
  const widthClasses = {
    sm: "min-w-sm",
    md: "min-w-md",
    lg: "min-w-lg",
    xl: "min-w-xl",
    "2xl": "min-w-2xl",
    "3xl": "min-w-3xl",
    "4xl": "min-w-4xl",
    full: "min-w-full mx-4",
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
            <div className="bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
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
              <div className="p-4">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
