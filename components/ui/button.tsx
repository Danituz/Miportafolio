import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold uppercase transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-indigo-600 text-indigo-50 hover:bg-indigo-500",
        outline:
          "border border-indigo-300/50 bg-transparent text-indigo-50 hover:border-indigo-200 hover:bg-indigo-500/10 dark:text-indigo-100",
        ghost:
          "text-indigo-50 hover:bg-indigo-500/10 dark:text-indigo-100",
        subtle:
          "bg-indigo-50/10 text-indigo-50 hover:bg-indigo-50/20 dark:text-indigo-100",
      },
      size: {
        default: "h-10 px-5 text-[0.7rem]",
        sm: "h-8 px-4 text-[0.65rem]",
        lg: "h-11 px-6 text-[0.75rem]",
        icon: "h-10 w-10 text-[0.65rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
