import { useFormStatus } from 'react-dom';
import SpinnerIcon from '@/lib/components/icons/spinner-icon';
import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils/classname.util';

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
        <Button className={cn(className, fullWidth && 'w-full')} disabled={pending} type="submit">
            {pending ? <SpinnerIcon /> : children}
        </Button>
    );
}