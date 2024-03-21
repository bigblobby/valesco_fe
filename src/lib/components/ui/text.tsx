import React, { createElement } from 'react';
import { cn } from '@/lib/utils/classname.util';
import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';

const textVariants = cva(
    'text-gray-600 dark:text-gray-400',
    {
        variants: {
            variant: {
                default: ''
            }
        },
        defaultVariants: {
            variant: 'default',
        }
    }
);

type ComponentTypes = 'p' | 'span' | 'div' | 'label';

export interface TextProps extends React.HTMLAttributes<any>, VariantProps<typeof textVariants> {
    asChild?: boolean;
    as?: ComponentTypes;
}

export default function Text({
    asChild,
    as = 'p',
    variant = 'default',
    className = '',
    children,
    ...props
}: TextProps) {
    const Comp = asChild ? Slot : as;

    return createElement(
        Comp,
        {
            className: cn(textVariants({ variant, className })),
            ...props,
        },
        children
    );
}