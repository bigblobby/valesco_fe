import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    disabled?: boolean;
    showSpinnerOnDisabled?: boolean;
    className?: string;
    type?: ButtonType;
    fullWidth?: boolean;
    onClick?: () => any;
    children: any;
}

export type ButtonType = 'button' | 'submit';