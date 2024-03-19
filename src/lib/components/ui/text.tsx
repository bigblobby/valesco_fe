import {createElement} from 'react';
import { cn } from '@/lib/utils/classname.util';

interface TextProps {
    children: any,
    as?: ComponentTypes;
    variant?: VariantTypes;
    className?: string;
    props?: any;
}

type ComponentTypes = 'p' | 'span' | 'div' | 'label';
type VariantTypes = ComponentTypes;

export default function Text({
    children,
    as = 'p',
    variant,
    className = '',
    ...props
}: TextProps) {

    function generateClassName() {
        let classes = '';
        const variation = variant || as;

        if (
            variation === 'p' ||
            variation === 'span' ||
            variation === 'div' ||
            variation === 'label'
        ) {
           classes += 'text-gray-600 dark:text-gray-400';
        }

        return cn(classes, className);
    }

    return createElement(
        as,
        {
            className: generateClassName(),
            ...props,
        },
        children
    );
}