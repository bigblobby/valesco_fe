import { cn } from '@/lib/utils/classname.util';
import { cva } from 'class-variance-authority';
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { AlertProps, AlertType } from '@/lib/components/ui/alert/alert.interfaces';

export const alertVariants = cva(
    'flex align-center w-full rounded-sm p-2.5 sm:text-sm',
    {
        variants: {
            variant: {
                default: '',
                success: 'text-green-600 bg-green-50 dark:text-green-900 dark:bg-green-400',
                info: 'text-blue-600 bg-blue-50 dark:text-blue-900 dark:bg-blue-400',
                warning: 'text-yellow-600 bg-yellow-50 dark:text-yellow-900 dark:bg-yellow-400',
                danger: 'text-red-600 bg-red-50 dark:text-red-900 dark:bg-red-400',
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
);

export default function Alert({
    variant = 'info',
    className,
    children,
}: AlertProps) {
    function getIcon(type: AlertType | null) {
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
        <div className={cn(alertVariants({ variant, className }))}>
            <span className="mr-2">
                {getIcon(variant)}
            </span>
            {children}
        </div>
    )
}