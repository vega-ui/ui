import { Button, Heading, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import type { CSSProperties } from 'react';

export default function MutedConfigurationHeading() {
  return (
    <section aria-labelledby='legacy-webhooks-title' style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <Heading
          as='h3'
          size={4}
          id='legacy-webhooks-title'
          style={{ color: 'var(--disable-text-color)' }}
        >
        Legacy webhooks
        </Heading>
        <Text id='legacy-webhooks-note' size={2} style={{ '--t-color': 'var(--label-secondary)' } as CSSProperties}>
          Read-only since the v2 API. Move your endpoints to Event subscriptions.
        </Text>
      </div>
      <fieldset
        disabled
        aria-labelledby='legacy-webhooks-title'
        aria-describedby='legacy-webhooks-note'
        style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 0, padding: 0, border: 0 }}
      >
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='legacy-webhook-url'>Endpoint URL</Label>
          <TextField>
            <TextFieldInput id='legacy-webhook-url' name='url' defaultValue='https://hooks.acme.io/orders' />
          </TextField>
        </div>
        <Button variant='secondary' appearance='ghost' style={{ justifySelf: 'start' }}>Send test event</Button>
      </fieldset>
    </section>
  );
}
