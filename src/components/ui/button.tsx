import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-lg font-sans font-semibold",
    "transition-all duration-200 ease-press",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "[&_svg]:transition-transform [&_svg]:duration-200",
    "hover:[&_svg:last-child]:translate-x-0.5",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-soft hover:bg-primary/90 hover:shadow-lift active:scale-[0.98]",
        accent:
          "bg-accent text-white shadow-soft hover:bg-accent/90 hover:shadow-lift active:scale-[0.98]",
        accentWarm:
          "bg-jaune text-encre shadow-soft hover:brightness-105 active:scale-[0.98]",
        outline:
          "border border-line bg-white text-encre hover:border-primary hover:text-primary",
        inverse:
          "border border-white/40 bg-transparent text-white hover:bg-white hover:text-primary",
        secondary:
          "bg-papier-deep text-encre hover:bg-line/60",
        ghost:
          "text-encre hover:text-primary underline-offset-4 hover:underline",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
      },
      size: {
        default: "h-11 px-5 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
