import { ReactNode, forwardRef } from "react"

interface ButtonProps {
  children: ReactNode
  className?: string
  variant?: "default" | "outline"
  asChild?: boolean
  onClick?: () => void
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = "", variant = "default", asChild, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
    const variantClasses = variant === "outline" 
      ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      : "bg-primary text-primary-foreground hover:bg-primary/90"
    
    return asChild ? (
      <div className={`${baseClasses} ${variantClasses} ${className}`}>
        {children}
      </div>
    ) : (
      <button ref={ref} className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"