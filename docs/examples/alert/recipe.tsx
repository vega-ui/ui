import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertMain,
  AlertTitle,
  type AlertProps,
} from '@vega-ui/react';
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon } from '@vega-ui/icons';
import type { ReactNode } from 'react';

const icons: Record<string, ReactNode> = {
  info: <InfoIcon />,
  success: <CircleCheckIcon />,
  warning: <TriangleAlertIcon />,
  error: <CircleAlertIcon />,
};

export function MyAlert({ variant = 'info', children, ...props }: AlertProps) {
  return (
    <Alert variant={variant} {...props}>
      <AlertIcon>{icons[variant]}</AlertIcon>
      {children}
    </Alert>
  );
}

export default function Recipe() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <MyAlert>
        <AlertMain>
          <AlertTitle>Scheduled maintenance</AlertTitle>
          <AlertContent>The dashboard is read-only on Sunday from 02:00 to 03:00 UTC.</AlertContent>
        </AlertMain>
      </MyAlert>
      <MyAlert variant='success'>
        <AlertMain>
          <AlertTitle>Domain verified</AlertTitle>
          <AlertContent>Emails from billing@northwind.io now pass SPF and DKIM checks.</AlertContent>
        </AlertMain>
      </MyAlert>
      <MyAlert variant='warning'>
        <AlertMain>
          <AlertTitle>Storage almost full</AlertTitle>
          <AlertContent>You have used 46.2 GB of 50 GB.</AlertContent>
        </AlertMain>
      </MyAlert>
      <MyAlert variant='error'>
        <AlertMain>
          <AlertTitle>Card declined</AlertTitle>
          <AlertContent>Update the card to keep your plan.</AlertContent>
        </AlertMain>
      </MyAlert>
    </div>
  );
}
