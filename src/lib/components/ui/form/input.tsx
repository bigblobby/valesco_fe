import React from 'react';
import { cn } from '@/lib/utils/classname.util';
import { Button } from '@/lib/components/ui/button';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelText?: string;
    labelClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
    labelText,
    labelClassName,
    id,
    className,
    type = 'text',
    ...props
}, ref) => {
    function generateInputClassNames(){
        return cn(
            'block w-full text-gray-900 rounded-lg border p-2.5',
            'sm:text-sm',
            'focus:ring-primary-600 focus:border-primary-600',
            'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
            className
        );
    }

    function generateLabelClassNames() {
        return cn(
            'block mb-2 text-sm font-medium text-gray-800',
            'dark:text-white',
            labelClassName
        );
    }

    return (
        <>
            {labelText && (
                <label
                    htmlFor={id}
                    className={generateLabelClassNames()}
                >
                    {labelText}
                </label>
            )}

            <input
                ref={ref}
                type={type}
                id={id}
                className={generateInputClassNames()}
                {...props}
            />
        </>
    )
});

Button.displayName = "Input";

export default Input;