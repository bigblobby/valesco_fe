import React from 'react';
import { cn } from '@/lib/utils/classname.util';
import SpinnerIcon from '@/lib/components/icons/spinner-icon';
import { ButtonProps } from '@/lib/components/ui/button/button.interfaces';
import { Slot, Slottable } from '@radix-ui/react-slot';

export const ButtonStyles = cn(
    'relative inline-flex justify-center font-medium text-white text-center text-sm bg-orange-400 rounded-sm px-5 py-2.5 transition-colors',
    'hover:bg-orange-500',
    'focus:ring-4 focus:outline-none focus:ring-orange-300',
    'dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-800',
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    asChild,
    disabled = false,
    showSpinnerOnDisabled = true,
    className,
    type = 'button',
    fullWidth = false,
    onClick = () => {},
    children,
    ...props
}, ref) => {
    function generateClassName() {
        return cn(
            ButtonStyles,
            fullWidth && 'w-full',
            className
        );
    }

    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            ref={ref}
            type={type}
            disabled={disabled}
            className={generateClassName()}
            onClick={onClick}
            {...props}
        >
            <Slottable>
                {children}
            </Slottable>
            {showSpinnerOnDisabled ? (
                <>
                    {disabled && <div className={`absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-orange-300 dark:bg-orange-400`}><SpinnerIcon /></div>}
                </>
            ) : null}
        </Comp>
    );
});

export default Button;