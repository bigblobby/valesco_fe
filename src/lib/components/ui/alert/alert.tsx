import { twMerge } from 'tailwind-merge';
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { AlertProps, AlertType } from '@/lib/components/ui/alert/alert.interfaces';

export default function Alert({
    type = 'info',
    className,
    children,
}: AlertProps) {

    function generateClasses() {
        let classes = '';

        if (type === 'success') {
            classes += 'text-green-600 bg-green-50 dark:text-green-900 dark:bg-green-400';
        }

        if (type === 'info') {
            classes += 'text-blue-600 bg-blue-50 dark:text-blue-900 dark:bg-blue-400';
        }

        if (type === 'warning') {
            classes += 'text-yellow-600 bg-yellow-50 dark:text-yellow-900 dark:bg-yellow-400';
        }

        if (type === 'danger') {
            classes += 'text-red-600 bg-red-50 dark:text-red-900 dark:bg-red-400';
        }

        return twMerge(
            'flex align-center w-full rounded-sm p-2.5',
            'sm:text-sm',
            classes,
            className
        );
    }

    function getIcon(type: AlertType) {
        switch(type) {
            case 'success':
                return <CheckCircleIcon width={20} height={20} />;
            case 'info':
                return <InformationCircleIcon width={20} height={20} />;
            case 'warning':
                return <ExclamationTriangleIcon width={20} height={20} />
            case 'danger':
                return <ExclamationCircleIcon width={20} height={20} />;
        }
    }

    return (
        <div className={generateClasses()}>
            <span className="mr-2">
                {getIcon(type)}
            </span>
            {children}
        </div>
    )
}