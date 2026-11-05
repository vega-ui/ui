# Separator Examples

## Basic

### Basic: order summary divider

A horizontal `Separator` stretches to the width of its container and sets the total apart from the line items. Spacing comes from the parent `gap`, not from the separator.

<!-- example: separator/horizontal-section-divider.tsx -->
```tsx
import { Separator, Text } from '@vega-ui/react';

const items = [
  { name: 'Wireless keyboard', price: '$89.00' },
  { name: 'USB-C hub, 7 ports', price: '$45.00' },
  { name: 'Shipping', price: '$6.50' },
];

export default function HorizontalSectionDivider() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      {items.map((item) => (
        <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>{item.name}</Text>
          <Text size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{item.price}</Text>
        </div>
      ))}
      <Separator />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
        <Text size={3} fontWeight={500}>Total</Text>
        <Text size={3} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>$140.50</Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: dividers between visible groups only

Separators are rendered between groups and never before the first one, so filtering a group out cannot leave a doubled or dangling line. Each group stays a `section` labelled by its heading, so the structure does not rely on the line.

<!-- example: separator/conditional-divider.tsx -->
```tsx
import { Button, Heading, Separator, Text } from '@vega-ui/react';
import { Fragment, useState } from 'react';

const projects = [
  { name: 'Website redesign', status: 'active' },
  { name: 'Mobile onboarding', status: 'active' },
  { name: 'Q3 pricing test', status: 'paused' },
  { name: 'Legacy API migration', status: 'archived' },
  { name: 'Holiday campaign', status: 'archived' },
];

const groups = [
  { status: 'active', title: 'Active' },
  { status: 'paused', title: 'Paused' },
  { status: 'archived', title: 'Archived' },
];

export default function ConditionalDivider() {
  const [showArchived, setShowArchived] = useState(false);

  const visibleGroups = [];

  for (const group of groups) {
    if (group.status === 'archived' && !showArchived) continue;

    const items = projects.filter((project) => project.status === group.status);
    if (items.length === 0) continue;

    visibleGroups.push({ ...group, items });
  }

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Button
        size='sm'
        variant='secondary'
        appearance='ghost'
        aria-pressed={showArchived}
        onClick={() => setShowArchived(!showArchived)}
        style={{ justifySelf: 'start' }}
      >
        Show archived
      </Button>
      {visibleGroups.map((group, index) => (
        <Fragment key={group.status}>
          {index > 0 && <Separator />}
          <section aria-labelledby={`projects-${group.status}`} style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Heading as='h3' size={2} id={`projects-${group.status}`} style={{ color: 'var(--label-secondary)' }}>{group.title}</Heading>
            {group.items.map((project) => (
              <Text key={project.name} size={3}>{project.name}</Text>
            ))}
          </section>
        </Fragment>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: divider between field groups

Two `Fieldset` groups with their own legends, separated by a line. The separator is only visual: the legends give the groups their accessible names, and the submit reads both groups with `FormData`.

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

## Layout/Overlay

### Layout/Overlay: vertical dividers in a toolbar

Vertical separators split a `role='toolbar'` into formatting, list and alignment groups. A vertical separator takes `height: 100%`, so the toolbar has an explicit height; every icon button gets its own `aria-label`.

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

## Error

### Error: divider before the danger zone

The separator sets the destructive form apart from regular settings. The confirmation is checked on submit: a mismatch marks the field invalid and links the `HelperText` with `aria-describedby`, and typing clears the error.

<!-- example: separator/divider-before-destructive-section.tsx -->
```tsx
import {
  Button,
  Heading,
  HelperText,
  Label,
  Separator,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { useState, type CSSProperties, type FormEvent } from 'react';

const workspaceName = 'acme-marketing';

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function DividerBeforeDestructiveSection() {
  const [error, setError] = useState('');
  const [deleted, setDeleted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get('confirmation') !== workspaceName) {
      setError(`Type ${workspaceName} exactly to confirm.`);
      return;
    }

    setDeleted(true);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4}>Workspace name</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>{workspaceName}</Text>
      </div>
      <Separator />
      <form onSubmit={onSubmit} aria-labelledby='danger-zone-title' style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <Heading as='h3' size={4} id='danger-zone-title'>Delete workspace</Heading>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>All projects, files and billing history are removed permanently.</Text>
        </div>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='delete-confirmation'>Type {workspaceName} to confirm</Label>
          <TextField error={error !== ''}>
            <TextFieldInput
              id='delete-confirmation'
              name='confirmation'
              autoComplete='off'
              aria-invalid={error !== ''}
              aria-describedby={error ? 'delete-confirmation-error' : undefined}
              onChange={() => setError('')}
            />
          </TextField>
          {error && <HelperText id='delete-confirmation-error' error>{error}</HelperText>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', flexWrap: 'wrap' }}>
          <Button type='submit' style={destructive}>Delete workspace</Button>
          {deleted && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>Workspace scheduled for deletion.</Text>}
        </div>
      </form>
    </div>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: separator in a disabled fieldset

`Separator` has no disabled state: it sits inside a `Fieldset` that is disabled as a whole, and the explanation is linked to the fieldset with `aria-describedby`. The toggle shows the same layout in both states.

<!-- example: separator/muted-section-break-in-disabled-panel.tsx -->
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
import { useState } from 'react';

export default function MutedSectionBreakInDisabledPanel() {
  const [locked, setLocked] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Fieldset disabled={locked} aria-describedby='smtp-lock-note' style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-8)' }}>Outgoing mail</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='smtp-host'>SMTP host</Label>
          <TextField>
            <TextFieldInput id='smtp-host' name='host' defaultValue='smtp.acme.io' />
          </TextField>
        </div>
        <Separator />
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='smtp-port'>Port</Label>
          <TextField>
            <TextFieldInput id='smtp-port' name='port' inputMode='numeric' defaultValue='587' />
          </TextField>
        </div>
      </Fieldset>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
        <Text id='smtp-lock-note' size={2} style={{ color: 'var(--label-secondary)' }}>
          {locked ? 'Managed by your IT team.' : 'Changes apply to new messages only.'}
        </Text>
        <Button
          size='sm'
          variant='secondary'
          appearance='ghost'
          aria-pressed={!locked}
          onClick={() => setLocked(!locked)}
          style={{ flexShrink: 0 }}
        >
          {locked ? 'Unlock settings' : 'Lock settings'}
        </Button>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: vertical divider without a fixed height

`height: 100%` collapses to zero when the parent has no definite height. In a row whose height comes from its content, override it with `height: 'auto'` and `alignSelf: 'stretch'` so the line takes the height of the row.

<!-- example: separator/constrained-vertical-divider.tsx -->
```tsx
import { Separator, Text } from '@vega-ui/react';

const stats = [
  { label: 'Revenue', value: '$12.4k' },
  { label: 'Orders', value: '318' },
  { label: 'Refunds', value: '4' },
];

export default function ConstrainedVerticalDivider() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-10)' }}>
      {stats.map((stat, index) => (
        <div key={stat.label} style={{ display: 'flex', gap: 'var(--spacing-10)' }}>
          {index > 0 && <Separator orientation='vertical' style={{ height: 'auto', alignSelf: 'stretch' }} />}
          <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>{stat.label}</Text>
            <Text size={5} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>{stat.value}</Text>
          </div>
        </div>
      ))}
    </div>
  );
}
```
<!-- /example -->

### Edge: decorative divider

Inside a list every `role='separator'` is announced between the items. When the line is purely decorative, pass `aria-hidden` so screen readers hear only the list items.

<!-- example: separator/decorative-divider.tsx -->
```tsx
import { Separator, Text } from '@vega-ui/react';

const posts = [
  { title: 'Release notes 3.2', date: 'Mar 12' },
  { title: 'Dark mode for charts', date: 'Mar 5' },
  { title: 'Faster CSV exports', date: 'Feb 26' },
];

export default function DecorativeDivider() {
  return (
    <ul style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', margin: 0, padding: 0, listStyle: 'none' }}>
      {posts.map((post, index) => (
        <li key={post.title} style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          {index > 0 && <Separator aria-hidden />}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
            <Text size={2}>{post.title}</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{post.date}</Text>
          </div>
        </li>
      ))}
    </ul>
  );
}
```
<!-- /example -->
