# Card Examples

## Basic

### Basic: pricing plan

`Card` renders an `article`, named by its heading through `aria-labelledby`. Content stacks in a column; spacing between children comes from `gap` on the card.

<!-- example: card/basic-usage.tsx -->
```tsx
import { Button, Card, Heading, Text } from '@vega-ui/react';

const features = ['Up to 25 members', '100 GB of storage', 'Priority email support', 'SAML single sign-on'];

export default function BasicUsage() {
  return (
    <Card aria-labelledby='plan-team-title' style={{ width: '100%', maxWidth: 320, gap: 'var(--spacing-6)' }}>
      <Heading id='plan-team-title' as='h3' size={4} fontWeight={600}>Team</Heading>
      <Text size={3}>
        <Text size={6} fontWeight={500}>$12</Text> per member / month
      </Text>
      <ul style={{ margin: 0, paddingInlineStart: 'var(--spacing-9)', display: 'grid', gap: 'var(--spacing-2)' }}>
        {features.map((feature) => (
          <li key={feature}><Text size={2} style={{ color: 'var(--label-secondary)' }}>{feature}</Text></li>
        ))}
      </ul>
      <Button fullWidth style={{ marginBlockStart: 'var(--spacing-6)' }}>Start 14-day trial</Button>
    </Card>
  );
}
```
<!-- /example -->

### Basic: whole card as a link

With `asChild` the card styles move onto an `<a>`, so the entire surface is one link with one accessible name. Keep the content of a link card non-interactive: no buttons or nested links inside.

<!-- example: card/link-cards.tsx -->
```tsx
import { Card, Heading, Text } from '@vega-ui/react';
import './examples.css';

const destinations = [
  { href: '#billing', title: 'Billing', description: 'Plan, invoices and payment methods.' },
  { href: '#members', title: 'Members', description: '18 members, 3 pending invitations.' },
  { href: '#security', title: 'Security', description: 'Two-factor authentication, sessions and SSO.' },
];

export default function LinkCards() {
  return (
    <nav aria-label='Workspace settings' style={{ width: '100%' }}>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: 'var(--spacing-6)' }}>
        {destinations.map((destination) => (
          <li key={destination.href} style={{ display: 'grid' }}>
            <Card asChild size='sm' className='linkCard'>
              <a href={destination.href} style={{ color: 'inherit', textDecoration: 'none', gap: 'var(--spacing-2)' }}>
                <Heading as='h3' size={3} fontWeight={600}>{destination.title}</Heading>
                <Text size={2} style={{ color: 'var(--label-secondary)' }}>{destination.description}</Text>
              </a>
            </Card>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: metric card with refresh

The value, the timestamp and the loading flag live in state. While refreshing, the card is `aria-busy`, the spinner has its own accessible name and the button is disabled.

<!-- example: card/metrics-card.tsx -->
```tsx
import { useState } from 'react';
import { Button, Card, Heading, Spinner, Text } from '@vega-ui/react';

const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function MetricsCard() {
  const [revenue, setRevenue] = useState(48210.4);
  const [updatedAt, setUpdatedAt] = useState('09:00');
  const [loading, setLoading] = useState(false);

  const refresh = () => {
    setLoading(true);
    setTimeout(() => {
      const now = new Date();
      setRevenue((current) => current + Math.round(Math.random() * 90000) / 100);
      setUpdatedAt(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
      setLoading(false);
    }, 900);
  };

  return (
    <Card aria-labelledby='revenue-title' aria-busy={loading} style={{ width: '100%', maxWidth: 300, gap: 'var(--spacing-2)' }}>
      <Heading id='revenue-title' as='h3' size={2} fontWeight={500} style={{ color: 'var(--label-secondary)' }}>Revenue this month</Heading>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', minHeight: 36 }}>
        <Text size={7} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>{formatter.format(revenue)}</Text>
        {loading && <Spinner size={3} aria-label='Refreshing revenue' />}
      </div>
      <Text size={2} style={{ color: 'var(--label-tertiary)', fontVariantNumeric: 'tabular-nums' }}>Updated at {updatedAt}</Text>
      <Button size='sm' variant='secondary' appearance='ghost' disabled={loading} onClick={refresh} style={{ marginBlockStart: 'var(--spacing-6)' }}>Refresh</Button>
    </Card>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: the card is the form

`asChild` renders the card as a `<form>`, named by its heading. Values are read with `FormData` on submit, native `required` and `pattern` validate the fields, and reset clears the status message.

<!-- example: card/settings-form-card.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import { Button, Card, Heading, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';

export default function SettingsFormCard() {
  const [saved, setSaved] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaved(`Saved “${data.get('workspace')}” at ${data.get('slug')}.vega.app`);
  };

  return (
    <Card asChild style={{ width: '100%', maxWidth: 420, gap: 'var(--spacing-12)' }}>
      <form aria-labelledby='workspace-card-title' onSubmit={submit} onReset={() => setSaved('')}>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <Heading id='workspace-card-title' as='h3' size={4} fontWeight={600}>Workspace</Heading>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>Shown in invitations and in the browser tab.</Text>
        </div>
        <div style={{ display: 'grid', gap: 'var(--spacing-8)', alignSelf: 'stretch' }}>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor='workspace-card-name'>Name</Label>
            <TextField>
              <TextFieldInput id='workspace-card-name' name='workspace' defaultValue='Northwind Studio' required />
            </TextField>
          </div>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor='workspace-card-slug'>URL</Label>
            <TextField>
              <TextFieldInput id='workspace-card-slug' name='slug' defaultValue='northwind' pattern='[a-z0-9-]{3,32}' required />
            </TextField>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-4)', alignSelf: 'stretch' }}>
          <Button type='submit' size='sm'>Save</Button>
          <Button type='reset' size='sm' variant='secondary' appearance='ghost'>Reset</Button>
          <Text size={2} role='status' style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{saved}</Text>
        </div>
      </form>
    </Card>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: responsive grid with aligned actions

`auto-fill` with `minmax(min(220px, 100%), 1fr)` gives as many columns as fit without overflowing on phones. Grid rows stretch the cards to equal height, and `margin-block-start: auto` keeps every button at the bottom regardless of text length.

<!-- example: card/responsive-grid.tsx -->
```tsx
import { Button, Card, Heading, Text } from '@vega-ui/react';

const integrations = [
  { id: 'slack', name: 'Slack', description: 'Post deployment and incident updates to channels.' },
  { id: 'github', name: 'GitHub', description: 'Link pull requests to releases and show build status on every commit, including drafts and forks.' },
  { id: 'pagerduty', name: 'PagerDuty Incident Response Orchestration', description: 'Page the on-call engineer.' },
];

export default function ResponsiveGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 'var(--spacing-6)', width: '100%' }}>
      {integrations.map((integration) => (
        <Card key={integration.id} size='sm' aria-labelledby={`integration-${integration.id}`} style={{ gap: 'var(--spacing-4)' }}>
          <Heading id={`integration-${integration.id}`} as='h3' size={3} fontWeight={600}>{integration.name}</Heading>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>{integration.description}</Text>
          <Button size='sm' variant='secondary' appearance='ghost' aria-describedby={`integration-${integration.id}`} style={{ marginBlockStart: 'auto' }}>
            Connect
          </Button>
        </Card>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Error

### Error: data failed to load

The card keeps its heading and explains the failure in a `role='alert'` region with a retry action. The retry shows a loading state before the data appears.

<!-- example: card/load-error-card.tsx -->
```tsx
import { useState } from 'react';
import { Button, Card, Heading, Spinner, Text } from '@vega-ui/react';

type State = 'failed' | 'loading' | 'loaded';

export default function LoadErrorCard() {
  const [state, setState] = useState<State>('failed');

  const retry = () => {
    setState('loading');
    setTimeout(() => setState('loaded'), 900);
  };

  return (
    <Card aria-labelledby='usage-card-title' aria-busy={state === 'loading'} style={{ width: '100%', maxWidth: 340, gap: 'var(--spacing-4)' }}>
      <Heading id='usage-card-title' as='h3' size={3} fontWeight={600}>API usage</Heading>
      {state === 'loading' && <Spinner size={3} aria-label='Loading API usage' />}
      {state === 'failed' && (
        <div role='alert' style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start' }}>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>Usage could not be loaded: the metrics service timed out.</Text>
          <Button size='sm' variant='secondary' appearance='ghost' onClick={retry}>Try again</Button>
        </div>
      )}
      {state === 'loaded' && (
        <Text size={3}>1.82 M of 2 M requests used this month</Text>
      )}
    </Card>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: read-only details for non-owners

`Card` has no disabled state of its own. A `<fieldset disabled>` inside it disables every field at once, and the explanation is linked with `aria-describedby`.

<!-- example: card/read-only-billing.tsx -->
```tsx
import { Card, Heading, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';

export default function ReadOnlyBilling() {
  return (
    <Card aria-labelledby='billing-contact-title' style={{ width: '100%', maxWidth: 420, gap: 'var(--spacing-12)' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading id='billing-contact-title' as='h3' size={4} fontWeight={600}>Billing contact</Heading>
        <Text id='billing-contact-note' size={2} style={{ color: 'var(--label-secondary)' }}>
          Only workspace owners can change billing details. Ask Maria Chen to update them.
        </Text>
      </div>
      <fieldset disabled aria-describedby='billing-contact-note' style={{ border: 0, margin: 0, padding: 0, display: 'grid', gap: 'var(--spacing-8)', alignSelf: 'stretch' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='billing-contact-name'>Name</Label>
          <TextField>
            <TextFieldInput id='billing-contact-name' defaultValue='Maria Chen' />
          </TextField>
        </div>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='billing-contact-email'>Email</Label>
          <TextField>
            <TextFieldInput id='billing-contact-email' type='email' defaultValue='billing@northwind.io' />
          </TextField>
        </div>
      </fieldset>
    </Card>
  );
}
```
<!-- /example -->

## Edge

### Edge: empty state and hundreds of items

The same card handles zero and 240 items. The empty state explains what to do next; the long list scrolls inside the card, and the scroll area is focusable and named so keyboard users can scroll it.

<!-- example: card/empty-and-many.tsx -->
```tsx
import { useState } from 'react';
import { Button, Card, Heading, Text } from '@vega-ui/react';

const allKeys = Array.from({ length: 240 }, (_, index) => `sk_live_${String(index + 1).padStart(4, '0')}`);

export default function EmptyAndMany() {
  const [keys, setKeys] = useState<string[]>([]);

  const toggle = () => {
    if (keys.length === 0) {
      setKeys(allKeys);
      return;
    }
    setKeys([]);
  };

  return (
    <Card aria-labelledby='api-keys-title' style={{ width: '100%', maxWidth: 360, gap: 'var(--spacing-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)', alignSelf: 'stretch' }}>
        <Heading id='api-keys-title' as='h3' size={3} fontWeight={600} style={{ fontVariantNumeric: 'tabular-nums' }}>API keys ({keys.length})</Heading>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={toggle}>
          {keys.length === 0 ? 'Load 240 keys' : 'Clear'}
        </Button>
      </div>
      {keys.length === 0 && (
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>No API keys yet. Create one to call the API from your servers.</Text>
      )}
      {keys.length > 0 && (
        <ul
          tabIndex={0}
          aria-label='API keys'
          style={{ margin: 0, padding: 0, listStyle: 'none', maxHeight: 200, overflowY: 'auto', alignSelf: 'stretch' }}
        >
          {keys.map((key) => (
            <li key={key} style={{ paddingBlock: 'var(--spacing-2)' }}>
              <Text size={2} style={{ fontFamily: 'var(--code-font-family)' }}>{key}</Text>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
```
<!-- /example -->
