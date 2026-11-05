# Separator Patterns

## Toolbar Divider

When to use:

- adjacent actions need a subtle visual boundary

Composition notes:

- use `orientation='vertical'`
- give the parent a real height

Trade-offs:

- low visual weight
- depends on parent sizing

<!-- example: separator/vertical-divider-in-toolbar.tsx -->
```tsx
import { Icon, IconButton, Separator } from '@vega-ui/react';
import { AlignCenter, AlignLeft, Bold, Italic, Link, List, ListOrdered } from '@vega-ui/icons';

export default function VerticalDividerInToolbar() {
  return (
    <div
      role='toolbar'
      aria-label='Text formatting'
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-2)',
        padding: 'var(--spacing-2)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-3)',
        background: 'var(--surface-primary)',
      }}
    >
      <IconButton aria-label='Bold' variant='secondary' appearance='transparent'>
        <Icon><Bold /></Icon>
      </IconButton>
      <IconButton aria-label='Italic' variant='secondary' appearance='transparent'>
        <Icon><Italic /></Icon>
      </IconButton>
      <IconButton aria-label='Insert link' variant='secondary' appearance='transparent'>
        <Icon><Link /></Icon>
      </IconButton>
      <Separator orientation='vertical' style={{ height: 'var(--spacing-10)', marginInline: 'var(--spacing-2)' }} />
      <IconButton aria-label='Bulleted list' variant='secondary' appearance='transparent'>
        <Icon><List /></Icon>
      </IconButton>
      <IconButton aria-label='Numbered list' variant='secondary' appearance='transparent'>
        <Icon><ListOrdered /></Icon>
      </IconButton>
      <Separator orientation='vertical' style={{ height: 'var(--spacing-10)', marginInline: 'var(--spacing-2)' }} />
      <IconButton aria-label='Align left' variant='secondary' appearance='transparent'>
        <Icon><AlignLeft /></Icon>
      </IconButton>
      <IconButton aria-label='Align center' variant='secondary' appearance='transparent'>
        <Icon><AlignCenter /></Icon>
      </IconButton>
    </div>
  );
}
```
<!-- /example -->

## Section Break Inside A Panel

When to use:

- a panel has two related but distinct regions

Composition notes:

- keep the separator between already-labeled regions
- add spacing with layout, not with the separator itself

Trade-offs:

- keeps the surface clean
- does not explain the reason for the separation

<!-- example: separator/section-break-inside-a-panel.tsx -->
```tsx
import { Card, Heading, Separator, Text } from '@vega-ui/react';

export default function SectionBreakInsideAPanel() {
  return (
    <Card style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <section aria-labelledby='plan-usage-title' style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4} id='plan-usage-title'>Usage this month</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>7,420 of 10,000 API requests used.</Text>
      </section>
      <Separator />
      <section aria-labelledby='plan-billing-title' style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4} id='plan-billing-title'>Next invoice</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>$49.00 on April 1, charged to Visa ending in 4242.</Text>
      </section>
    </Card>
  );
}
```
<!-- /example -->

## Dense Form Break

When to use:

- one form surface contains several short groups

Composition notes:

- use `Separator` together with explicit labels or legends
- avoid relying on the line alone

Trade-offs:

- keeps large forms readable
- still needs semantic section labeling nearby

<!-- example: separator/divider-between-field-groups.tsx -->
```tsx
import {
  Button,
  Fieldset,
  FieldsetLegend,
  Label,
  Separator,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { useState, type FormEvent } from 'react';

export default function DividerBetweenFieldGroups() {
  const [saved, setSaved] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaved(`Saved ${data.get('fullName')} <${data.get('email')}>, ${data.get('company')}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      onReset={() => setSaved('')}
      style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}
    >
      <Fieldset style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-8)' }}>Personal details</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='billing-name'>Full name</Label>
          <TextField>
            <TextFieldInput id='billing-name' name='fullName' autoComplete='name' required />
          </TextField>
        </div>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='billing-email'>Email</Label>
          <TextField>
            <TextFieldInput id='billing-email' name='email' type='email' autoComplete='email' required />
          </TextField>
        </div>
      </Fieldset>
      <Separator />
      <Fieldset style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-8)' }}>Company</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='billing-company'>Company name</Label>
          <TextField>
            <TextFieldInput id='billing-company' name='company' autoComplete='organization' />
          </TextField>
        </div>
      </Fieldset>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
          <Button type='submit'>Save</Button>
        </div>
        {saved && <Text size={2} role='status' style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{saved}</Text>}
      </div>
    </form>
  );
}
```
<!-- /example -->
