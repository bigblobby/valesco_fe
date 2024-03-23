import { cn } from '@/lib/utils/classname.util';

interface BadgeProps {
    className?: string;
    variant?: BadgeVariantTypes;
    color?: BadgeColorTypes;
    size?: BadgeSizeTypes;
    children: any;
}

type BadgeVariantTypes = 'outline' | 'solid';
type BadgeColorTypes = 'default' | 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange';
type BadgeSizeTypes = 'extra-small' | 'small' | 'default' | 'large';

export default function Badge({
    className,
    variant = 'outline',
    color = 'default',
    size = 'default',
    children
}: BadgeProps){

    function generateClassName() {
        let classNames = 'font-medium rounded-full border-2 ';

        if (size === 'extra-small') classNames += 'text-xs py-0.5 px-1 ';
        if (size === 'small') classNames += 'text-xs py-1 px-2 ';
        if (size === 'default') classNames += 'text-sm py-1 px-2 ';
        if (size === 'large') classNames += 'py-1 px-2 ';

        if (variant === 'outline') {
            if (color === 'default') classNames += 'border-black dark:border-white ';
            if (color === 'blue') classNames += 'border-blue-500 text-blue-500 dark:border-blue-600 dark:text-blue-600 ';
            if (color === 'green') classNames += 'border-green-500 text-green-500 dark:border-green-600 dark:text-green-600 ';
            if (color === 'red') classNames += 'border-red-600 text-red-600 dark:border-red-600 dark:text-red-600 ';
            if (color === 'yellow') classNames += 'border-yellow-500 text-yellow-500 dark:border-yellow-500 dark:text-yellow-500 ';
            if (color === 'purple') classNames += 'border-purple-500 text-purple-500 dark:border-purple-500 dark:text-purple-500 ';
            if (color === 'orange') classNames += 'border-orange-600 text-orange-600 dark:border-orange-600 dark:text-orange-600 ';
        }

        if (variant === 'solid') {
            if (color === 'default') classNames += 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black ';
            if (color === 'blue') classNames += 'border-blue-500 bg-blue-500 dark:border-blue-600 dark:bg-blue-600 text-white ';
            if (color === 'green') classNames += 'border-green-600 bg-green-600 dark:border-green-600 dark:bg-green-600 text-white ';
            if (color === 'red') classNames += 'border-red-600 bg-red-600 dark:border-red-600 dark:bg-red-600 text-white ';
            if (color === 'yellow') classNames += 'border-yellow-500 bg-yellow-500 dark:border-yellow-500 dark:bg-yellow-500 text-white ';
            if (color === 'purple') classNames += 'border-purple-500 bg-purple-500 dark:border-purple-500 dark:bg-purple-500 text-white ';
            if (color === 'orange') classNames += 'border-orange-600 bg-orange-600 dark:border-orange-600 dark:bg-orange-600 text-white ';
        }

        return cn(
            classNames,
            className,
        );
    }
    return (
        <span className={generateClassName()}>
            {children}
        </span>
    )
}