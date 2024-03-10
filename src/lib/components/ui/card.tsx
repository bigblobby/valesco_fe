import { twMerge } from 'tailwind-merge';

interface CardProps {
    className?: string;
    children: any;
}

export default function Card({
    className,
    children
}: CardProps){

    function generateClassName(){
        return twMerge(
            'w-full bg-white rounded-sm p-6 sm:p-8 shadow',
            'dark:bg-gray-800 dark:border-gray-700',
            className,
        );
    }

    return (
        <div className={generateClassName()}>
            {children}
        </div>
    )
}