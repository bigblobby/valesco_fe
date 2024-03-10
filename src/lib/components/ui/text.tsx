import {createElement} from 'react';
import { twMerge } from 'tailwind-merge';

interface TextProps {
    children: any,
    component?: ComponentTypes;
    variant?: VariantTypes;
    className?: string;
    props?: any;
}

type ComponentTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
type VariantTypes = ComponentTypes;

export default function Text({
    children,
    component = 'p',
    variant,
    className = '',
    ...props
}: TextProps) {

    function generateClassName() {
        let classes = '';
        const variation = variant || component;

        if (variation === 'h1') {
            classes += 'text-5xl font-bold text-gray-700 dark:text-gray-300';
        }

        if (variation === 'h2') {
            classes += 'text-4xl font-bold text-gray-700 dark:text-gray-300';
        }

        if (variation === 'h3') {
            classes += 'text-3xl font-bold text-gray-700 dark:text-gray-300';
        }

        if (variation === 'h4') {
            classes += 'text-2xl font-bold text-gray-700 dark:text-gray-300';
        }

        if (variation === 'h5') {
            classes += 'text-xl font-bold text-gray-700 dark:text-gray-300';
        }

        if (variation === 'h6') {
            classes += 'text-lg font-bold text-gray-700 dark:text-gray-300';
        }

        if (variation === 'p') {
           classes += 'text-gray-500 dark:text-gray-400';
        }

        return twMerge(classes, className);
    }

    return createElement(
        component,
        {
            className: generateClassName(),
            ...props,
        },
        children
    );
}