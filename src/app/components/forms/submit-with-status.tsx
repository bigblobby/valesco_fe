import { useFormStatus } from 'react-dom';
import SpinnerIcon from '@/app/components/icons/spinner-icon';
import Button from '@/app/components/ui/button';

interface SubmitWithStatusProps {
    fullWidth?: boolean;
    className?: string;
    children: any;
}

export function SubmitWithStatus({
    fullWidth,
    className,
    children
}: SubmitWithStatusProps) {
    const { pending } = useFormStatus();

    return (
        <Button className={className} fullWidth={fullWidth} disabled={pending} type="submit">
            {pending ? <SpinnerIcon /> : children}
        </Button>
    );
}