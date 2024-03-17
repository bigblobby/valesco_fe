import React from 'react';
import { cn } from '@/lib/utils/classname.util';
import { default as NavLink } from 'next/link';
import { ButtonStyles } from '@/lib/components/ui/button/button';

interface LinkProps {
    className?: string;
    href: string;
    variant?: LinkVariant,
    asWrapper?: boolean;
    children: any;
    [key: string]: any;
}

type LinkVariant = 'link' | 'button';

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({
    className,
    href,
    variant = 'link',
    asWrapper = false,
    children,
    ...props
}, ref) => {
    function generateClassName() {

        if (asWrapper) {
            return cn(
                className,
            );
        }

        if (variant === 'button') {
            return cn(
                ButtonStyles,
                className
            )
        }

        return cn(
            'inline-flex justify-center font-medium text-gray-500',
            'hover:underline',
            'dark:text-gray-400',
            className
        )
    }

    return (
        <NavLink
            ref={ref}
            href={href}
            className={generateClassName()}
            {...props}
        >
            {children}
        </NavLink>
    )
});

export default Link;