import React from 'react';
import { cn } from '@/lib/utils/classname.util';
import SpinnerIcon from '@/lib/components/icons/spinner-icon';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
    "relative inline-flex items-center justify-center whitespace-nowrap rounded-sm transition-colors text-sm text-center border-2 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "text-white bg-primary border-primary hover:bg-primary-dark hover:border-primary-dark dark:focus:ring-orange-800",
                destructive: "text-white bg-destructive border-destructive hover:bg-destructive-dark hover:border-destructive-dark dark:focus:ring-orange-800",
                outline: "border-2 border-black bg-transparent text-black hover:text-white hover:bg-black",
                link: "text-gray-500 border-none",
            },
            size: {
                default: "px-5 py-2.5",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    showSpinnerOnDisabled?: boolean;
    disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    asChild = false,
    className,
    variant,
    size,
    showSpinnerOnDisabled = true,
    disabled,
    children,
    ...props
}, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        >
            <Slottable>
                {children}
            </Slottable>
            {showSpinnerOnDisabled ? (
                <>
                    {disabled && <div className={`absolute -top-[2px] -left-[2px] -right-[2px] -bottom-[2px] flex justify-center items-center rounded-sm bg-orange-300 dark:bg-orange-400`}><SpinnerIcon /></div>}
                </>
            ) : null}
        </Comp>
    )
})

Button.displayName = "Button";

export { Button, buttonVariants }