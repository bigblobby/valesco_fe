import { useFormStatus } from 'react-dom';

interface SubmitWithStatusProps {
    children: string;
}

export function SubmitWithStatus({ children }: SubmitWithStatusProps) {
    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            type="submit"
            className="w-full text-white bg-orange-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
            {pending ? 'SPINNER' : children}
        </button>
    );
}