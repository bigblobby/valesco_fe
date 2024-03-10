export interface ButtonProps {
    disabled?: boolean;
    showSpinnerOnDisabled?: boolean;
    className?: string;
    type?: ButtonType;
    fullWidth?: boolean;
    onClick?: () => any;
    children: any;
}

export type ButtonType = 'button' | 'submit';