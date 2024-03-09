export interface AlertProps {
    type?: AlertType;
    className?: string;
    children: any;
}

export interface AlertWithDismissProps extends AlertProps {
    key: any;
    autoDismiss?: boolean;
    autoDismissTime?: number;
}

export type AlertType = 'success' | 'info' | 'warning' | 'danger';