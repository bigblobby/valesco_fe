import { twMerge } from 'tailwind-merge';

interface ButtonProps {
    disabled?: boolean;
    className?: string;
    type?: ButtonType;
    fullWidth?: boolean;
    onClick?: () => any;
    children: any;
}

type ButtonType = 'button' | 'submit';

export const ButtonStyles = twMerge(
    'inline-flex justify-center font-medium text-white text-center text-sm bg-orange-400 rounded-lg px-5 py-2.5 transition-colors',
    'hover:bg-orange-500',
    'focus:ring-4 focus:outline-none focus:ring-orange-300',
    'dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-800',
)

export default function Button({
    disabled = false,
    className,
    type = 'button',
    fullWidth = false,
    onClick = () => {},
    children,
}: ButtonProps) {

    function generateClassName() {
        return twMerge(
            ButtonStyles,
            fullWidth && 'w-full',
            className
        )
    }

    return (
        <button
            type={type}
            disabled={disabled}
            className={generateClassName()}
            onClick={onClick}
        >
            {children}
        </button>
    )
}