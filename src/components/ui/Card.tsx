import type React from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ className, children, ...props }) => (
  <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props}>
    {children}
  </div>
)

const CardHeader: React.FC<CardProps> = ({ className, children, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
    {children}
  </div>
)

const CardTitle: React.FC<CardProps> = ({ className, children, ...props }) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props}>
    {children}
  </h3>
)

const CardDescription: React.FC<CardProps> = ({ className, children, ...props }) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props}>
    {children}
  </p>
)

const CardContent: React.FC<CardProps> = ({ className, children, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props}>
    {children}
  </div>
)

const CardFooter: React.FC<CardProps> = ({ className, children, ...props }) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props}>
    {children}
  </div>
)

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
