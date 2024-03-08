import { twMerge } from 'tailwind-merge';
import { default as NavLink } from 'next/link';
import { ButtonStyles } from '@/app/components/ui/button';

interface LinkProps {
    className?: string;
    href: string;
    variant?: LinkVariant,
    children: any;
}

type LinkVariant = 'link' | 'button';

export default function Link({
    className,
    href,
    variant = 'link',
    children,
}: LinkProps) {

    function generateClassName() {
        if (variant === 'button') {
            return twMerge(
                ButtonStyles,
                className
            )
        }

        return twMerge(
            'inline-flex justify-center font-medium text-gray-500',
            'hover:underline',
            'dark:text-gray-400',
            className
        )
    }

    return (
        <NavLink
            href={href}
            className={generateClassName()}
        >
            {children}
        </NavLink>
    )
}