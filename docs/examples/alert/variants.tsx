import { Alert, AlertContent, AlertIcon, AlertMain, AlertTitle } from '@vega-ui/react';

export default function Variants() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 560 }}>
      <Alert variant='info'>
        <AlertIcon />
        <AlertMain>
          <AlertTitle>Scheduled maintenance</AlertTitle>
          <AlertContent>The dashboard will be read-only on Sunday from 02:00 to 03:00 UTC.</AlertContent>
        </AlertMain>
      </Alert>
      <Alert variant='success'>
        <AlertIcon />
        <AlertMain>
          <AlertTitle>Domain verified</AlertTitle>
          <AlertContent>Emails from billing@northwind.io will now pass SPF and DKIM checks.</AlertContent>
        </AlertMain>
      </Alert>
      <Alert variant='warning'>
        <AlertIcon />
        <AlertMain>
          <AlertTitle>Storage almost full</AlertTitle>
          <AlertContent>You have used 46.2 GB of 50 GB. Uploads stop when the limit is reached.</AlertContent>
        </AlertMain>
      </Alert>
      <Alert variant='error' appearance='surface'>
        <AlertIcon />
        <AlertMain>
          <AlertTitle>Card declined</AlertTitle>
          <AlertContent>The payment for invoice INV-2048 was declined by the bank. Update the card to keep your plan.</AlertContent>
        </AlertMain>
      </Alert>
    </div>
  );
}
