import { Alert } from '@/lib/components/ui/alert/index';
import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { AlertWithDismissProps } from '@/lib/components/ui/alert/alert.interfaces';

/**
 * YOU MUST PROVIDE A KEY WHEN USING THIS COMPONENT
 * THIS WILL FORCE THE COMPONENT TO RERENDER WHICH
 * NEEDS TO HAPPEN TO RESET THE VISIBLE PROPERTY.
 * (Allowing for the alert to display again once it has been dismissed)
 *
 * CHANGING THE KEY WILL FORCE A RERENDER, WE CAN
 * USE Date.now() AS THIS WORKS IN MOST CASES.
 */
export default function AlertWithDismiss({
    variant = 'info',
    className,
    autoDismiss = false,
    autoDismissTime = 5000,
    children,
}: AlertWithDismissProps){
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        if (autoDismiss && visible) {
            const timer = setTimeout(() => {
                removeAlert();
            }, autoDismissTime);

            return () => clearTimeout(timer);
        }
    }, []);

    function removeAlert() {
        setVisible(false);
    }

    return (
        <>
            {visible && (
                <div className="relative" onClick={removeAlert}>
                    <Alert className={className} variant={variant}>{children}</Alert>

                    <span className="absolute top-2.5 right-2 inline-block ml-auto text-gray-600 cursor-pointer">
                        <XMarkIcon width={20} height={20} />
                    </span>
                </div>
            )}
        </>
    )
}