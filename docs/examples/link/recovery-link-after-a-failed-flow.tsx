import { Button, HelperText, Link } from '@vega-ui/react';
import { useState } from 'react';

export default function RecoveryLinkAfterAFailedFlow() {
  const [declined, setDeclined] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-3)', width: '100%' }}>
      <Button type='button' aria-describedby={declined ? 'payment-error' : undefined} onClick={() => setDeclined(true)}>
        Pay $49.00
      </Button>
      {declined && (
        <HelperText id='payment-error' error role='alert'>
          Your card ending in 4242 was declined.{' '}
          <Link href='/billing/payment-methods'>Update your payment method</Link>{' '}
          and try again.
        </HelperText>
      )}
    </div>
  );
}
