import React, { createElement } from 'react';
import { cn } from '@/lib/utils/classname.util';
import { cva, VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';

const headingVariants = cva(
    'font-bold text-gray-700 dark:text-gray-300',
    {
        variants: {
            variant: {
                default: 'text-4xl',
                h1: 'text-5xl',
                h2: 'text-4xl',
                h3: 'text-3xl',
                h4: 'text-2xl',
                h5: 'text-xl',
                h6: 'text-lg',
                span: 'text-base'
            }
        },
        defaultVariants: {
            variant: 'default',
        }
    }
);

type ComponentTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

export interface TextProps extends React.HTMLAttributes<any>, VariantProps<typeof headingVariants> {
    asChild?: boolean;
    as?: ComponentTypes;
}

export default function Heading({
    asChild,
    as = 'h2',
    variant = 'default',
    className = '',
    children,
    ...props
}: TextProps) {
    const Comp = asChild ? Slot : as;

    return createElement(
        Comp,
        {
            className: cn(headingVariants({ variant, className })),
            ...props,
        },
        children
    );
}