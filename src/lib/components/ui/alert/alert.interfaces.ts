import React from 'react';
import { VariantProps } from 'class-variance-authority';
import { alertVariants } from '@/lib/components/ui/alert/alert';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

export interface AlertWithDismissProps extends AlertProps {
    key: any;
    autoDismiss?: boolean;
    autoDismissTime?: number;
}

export type AlertType = 'default' | 'success' | 'info' | 'warning' | 'danger';