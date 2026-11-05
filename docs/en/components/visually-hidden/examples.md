# VisuallyHidden Examples

## Basic

### Basic: unique names for repeated links

Three "Learn more" links sound identical in a links list. Hidden text completes each name ("Learn more about the Team plan") without changing the layout.

<!-- example: visually-hidden/basic-usage.tsx -->
```tsx
import { Heading, Link, Text, VisuallyHidden } from '@vega-ui/react';

const plans = [
  { name: 'Starter', price: '$0', slug: 'starter' },
  { name: 'Team', price: '$12', slug: 'team' },
  { name: 'Enterprise', price: 'Custom', slug: 'enterprise' },
];

export default function BasicUsage() {
  return (
    <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'var(--spacing-4)', width: '100%', margin: 0, padding: 0, listStyle: 'none' }}>
      {plans.map((plan) => (
        <li
          key={plan.slug}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-2)',
            padding: 'var(--spacing-6)',
            border: '1px solid var(--separator-opaque)',
            borderRadius: 'var(--radius-4)',
            background: 'var(--surface-primary)',
          }}
        >
          <Heading as='h3' size={3} fontWeight={600}>{plan.name}</Heading>
          <Text size={3} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{plan.price}</Text>
          <Link href={`/pricing/${plan.slug}`} style={{ marginBlockStart: 'var(--spacing-4)', fontSize: 'var(--font-size-2)' }}>
            Learn more
            <VisuallyHidden asChild>
              <span> about the {plan.name} plan</span>
            </VisuallyHidden>
          </Link>
        </li>
      ))}
    </ul>
  );
}
```
<!-- /example -->

### Basic: icon-only button with a text name

Hidden text inside the button becomes its accessible name and can include data the visual badge shows only as a number. The badge itself is `aria-hidden` so the count is not read twice. `asChild` renders a `<span>`, because the default `<div>` is not valid inside a button.

<!-- example: visually-hidden/icon-only-control-label.tsx -->
```tsx
import { Icon, IconButton, VisuallyHidden } from '@vega-ui/react';
import { BellIcon } from '@vega-ui/icons';
import { useState } from 'react';

export default function IconOnlyControlLabel() {
  const [unread, setUnread] = useState(4);

  return (
    <IconButton type='button' variant='secondary' appearance='ghost' onClick={() => setUnread(0)} style={{ position: 'relative' }}>
      <Icon><BellIcon /></Icon>
      <VisuallyHidden asChild>
        <span>Notifications, {unread} unread</span>
      </VisuallyHidden>
      {unread > 0 && (
        <span
          aria-hidden='true'
          style={{
            position: 'absolute',
            insetBlockStart: 'var(--spacing-1)',
            insetInlineEnd: 'var(--spacing-1)',
            minWidth: 'var(--spacing-8)',
            paddingInline: 'var(--spacing-2)',
            boxSizing: 'border-box',
            borderRadius: 999,
            background: 'var(--color-error)',
            color: 'var(--color-white)',
            fontSize: 'var(--font-size-1)',
            lineHeight: 'var(--spacing-8)',
            textAlign: 'center',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {unread}
        </span>
      )}
    </IconButton>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: live announcement for a visual counter

The cart counter changes silently for screen readers. A hidden `role='status'` region receives a full sentence on every change, and the visual counter stays `aria-hidden`.

<!-- example: visually-hidden/hidden-status-text.tsx -->
```tsx
import { Button, Icon, VisuallyHidden } from '@vega-ui/react';
import { ShoppingCartIcon } from '@vega-ui/icons';
import { useState } from 'react';

const products = ['Linen shirt', 'Canvas tote', 'Wool socks'];

export default function HiddenStatusText() {
  const [cart, setCart] = useState<string[]>([]);
  const [announcement, setAnnouncement] = useState('');

  const add = (product: string) => {
    const next = [...cart, product];
    setCart(next);
    setAnnouncement(`${product} added. Cart has ${next.length} items.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
        {products.map((product) => (
          <Button key={product} type='button' size='sm' variant='secondary' appearance='ghost' onClick={() => add(product)}>
            Add {product}
          </Button>
        ))}
      </div>
      <span aria-hidden='true' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', fontVariantNumeric: 'tabular-nums' }}>
        <Icon size='sm'><ShoppingCartIcon /></Icon>
        {cart.length}
      </span>
      <VisuallyHidden asChild>
        <p role='status'>{announcement}</p>
      </VisuallyHidden>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: hidden description for a visual adornment

The `$` prefix is visual only. A hidden description linked with `aria-describedby` tells screen reader users the currency; the value is read with `FormData` on submit. `VisuallyHidden` does not accept `id`, so the id goes on the `asChild` span.

<!-- example: visually-hidden/hidden-helper-description.tsx -->
```tsx
import { Button, Label, TextField, TextFieldInput, VisuallyHidden } from '@vega-ui/react';
import { FormEvent, useState } from 'react';

export default function HiddenHelperDescription() {
  const [budget, setBudget] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBudget(String(new FormData(event.currentTarget).get('budget')));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor='monthly-budget'>Monthly budget</Label>
      <TextField style={{ paddingInlineStart: 'var(--spacing-8)', gap: 'var(--spacing-2)' }}>
        <span aria-hidden='true' style={{ color: 'var(--label-secondary)' }}>$</span>
        <TextFieldInput
          id='monthly-budget'
          name='budget'
          type='number'
          min={0}
          step={50}
          defaultValue={500}
          aria-describedby='monthly-budget-currency'
          required
          style={{ paddingInlineStart: 0, fontVariantNumeric: 'tabular-nums' }}
        />
      </TextField>
      <VisuallyHidden asChild>
        <span id='monthly-budget-currency'>Amount in US dollars</span>
      </VisuallyHidden>
      <Button type='submit' style={{ alignSelf: 'flex-start', marginBlockStart: 'var(--spacing-9)' }}>Save budget</Button>
      <output style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {budget === '' ? '' : `Budget set to $${budget}`}
      </output>
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: hidden dialog title

A lightbox has no visible heading, but the dialog still needs a name. A hidden `<h2>` is referenced with `aria-labelledby`, so the dialog is announced as "Floor plan, apartment 4B".

<!-- example: visually-hidden/hidden-dialog-cue.tsx -->
```tsx
import type { CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Icon,
  IconButton,
  VisuallyHidden,
} from '@vega-ui/react';
import { ImageIcon, XIcon } from '@vega-ui/icons';

export default function HiddenDialogCue() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>
          <Icon size='sm'><ImageIcon /></Icon>
          View floor plan
        </Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='floor-plan-title'>
        <VisuallyHidden asChild>
          <h2 id='floor-plan-title'>Floor plan, apartment 4B</h2>
        </VisuallyHidden>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <DialogClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DialogClose>
        </div>
        <div
          role='img'
          aria-label='Two bedrooms, open kitchen, balcony facing south, 74 square meters'
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: 'var(--spacing-2)',
            height: 220,
            marginBlockStart: 'var(--spacing-8)',
          }}
        >
          <div style={{ background: 'var(--fills-secondary)', borderRadius: 'var(--radius-2)' }} />
          <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
            <div style={{ background: 'var(--fills-tertiary)', borderRadius: 'var(--radius-2)' }} />
            <div style={{ background: 'var(--fills-primary)', borderRadius: 'var(--radius-2)' }} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

## Error

### Error: spoken prefix for an error message

The error is shown with color and an icon. A hidden "Error:" prefix gives the same signal to screen reader users when they reach the message through `aria-describedby`.

<!-- example: visually-hidden/hidden-validation-cue.tsx -->
```tsx
import { Button, HelperText, Icon, Label, TextField, TextFieldInput, VisuallyHidden } from '@vega-ui/react';
import { CircleAlertIcon } from '@vega-ui/icons';
import { FormEvent, useState } from 'react';

export default function HiddenValidationCue() {
  const [error, setError] = useState('');
  const [saved, setSaved] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const domain = String(new FormData(event.currentTarget).get('domain'));

    if (!domain.includes('.')) {
      setError('Add a top-level domain, for example acme.com');
      setSaved('');
      return;
    }

    setError('');
    setSaved(domain);
  };

  return (
    <form noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor='custom-domain'>Custom domain</Label>
      <TextField error={error !== ''}>
        <TextFieldInput
          id='custom-domain'
          name='domain'
          defaultValue='acme'
          aria-invalid={error !== ''}
          aria-describedby={error === '' ? undefined : 'custom-domain-error'}
        />
      </TextField>
      {error !== '' && (
        <HelperText id='custom-domain-error' error style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
          <Icon size='xs' style={{ flexShrink: 0 }}><CircleAlertIcon /></Icon>
          <VisuallyHidden asChild>
            <span>Error:</span>
          </VisuallyHidden>
          {error}
        </HelperText>
      )}
      <Button type='submit' style={{ alignSelf: 'flex-start', marginBlockStart: 'var(--spacing-9)' }}>Connect domain</Button>
      <output style={{ color: 'var(--label-secondary)' }}>{saved === '' ? '' : `Connected ${saved}`}</output>
    </form>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: why an option is unavailable

Sold-out sizes are disabled and struck through. The strike-through is visual only, so hidden text adds ", sold out" to the button name, which screen readers still read in browse mode.

<!-- example: visually-hidden/hidden-disabled-explanation.tsx -->
```tsx
import { Button, VisuallyHidden } from '@vega-ui/react';
import { useState } from 'react';

const sizes = [
  { label: 'S', inStock: true },
  { label: 'M', inStock: true },
  { label: 'L', inStock: false },
  { label: 'XL', inStock: false },
];

export default function HiddenDisabledExplanation() {
  const [selected, setSelected] = useState('M');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', width: '100%' }}>
      <div role='group' aria-label='Size' style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        {sizes.map((size) => (
          <Button
            key={size.label}
            type='button'
            size='sm'
            variant={selected === size.label ? 'primary' : 'secondary'}
            appearance='ghost'
            aria-pressed={selected === size.label}
            disabled={!size.inStock}
            onClick={() => setSelected(size.label)}
            style={{ textDecoration: size.inStock ? 'none' : 'line-through' }}
          >
            {size.label}
            {!size.inStock && (
              <VisuallyHidden asChild>
                <span>, sold out</span>
              </VisuallyHidden>
            )}
          </Button>
        ))}
      </div>
      <p style={{ margin: 0, color: 'var(--label-secondary)' }}>Selected size: {selected}</p>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: text alternative for a symbol rating

Star characters are read as "black star" one by one. They are hidden with `aria-hidden`, and a hidden span inside the paragraph reads "Rated 3 out of 5". `asChild` keeps a `<span>` inside the `<p>`, where a `<div>` is not allowed.

<!-- example: visually-hidden/slotted-hidden-element.tsx -->
```tsx
import { Text, VisuallyHidden } from '@vega-ui/react';

const reviews = [
  { author: 'Maria K.', rating: 5, text: 'Arrived in two days, fits perfectly.' },
  { author: 'Tom B.', rating: 3, text: 'Good fabric, but the sleeves run long.' },
];

export default function SlottedHiddenElement() {
  return (
    <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%', margin: 0, padding: 0, listStyle: 'none' }}>
      {reviews.map((review) => (
        <li key={review.author} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
          <Text size={3} fontWeight={500}>{review.author}</Text>
          <p style={{ margin: 0 }}>
            <span aria-hidden='true' style={{ color: 'var(--color-primary-500)', letterSpacing: 'var(--spacing-1)' }}>
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </span>
            <VisuallyHidden asChild>
              <span>Rated {review.rating} out of 5</span>
            </VisuallyHidden>
          </p>
          <Text size={3} style={{ color: 'var(--label-secondary)' }}>{review.text}</Text>
        </li>
      ))}
    </ul>
  );
}
```
<!-- /example -->

### Edge: empty-looking table header

An actions column often has no visible header, yet an empty `<th>` leaves the cells without context. A hidden "Actions" header fixes that while the column stays visually empty.

<!-- example: visually-hidden/hidden-table-header.tsx -->
```tsx
import { Icon, IconButton, VisuallyHidden } from '@vega-ui/react';
import { PencilIcon } from '@vega-ui/icons';
import { useState } from 'react';

const members = [
  { name: 'Jane Cooper', role: 'Owner' },
  { name: 'Wade Warren', role: 'Editor' },
  { name: 'Esther Howard', role: 'Viewer' },
];

export default function HiddenTableHeader() {
  const [editing, setEditing] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', width: '100%' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th scope='col' style={{ paddingBlock: 'var(--spacing-3)', borderBlockEnd: '1px solid var(--separator-opaque)', textAlign: 'start' }}>Name</th>
            <th scope='col' style={{ paddingBlock: 'var(--spacing-3)', borderBlockEnd: '1px solid var(--separator-opaque)', textAlign: 'start' }}>Role</th>
            <th scope='col' style={{ paddingBlock: 'var(--spacing-3)', borderBlockEnd: '1px solid var(--separator-opaque)' }}>
              <VisuallyHidden>Actions</VisuallyHidden>
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.name}>
              <td style={{ paddingBlock: 'var(--spacing-3)', borderBlockEnd: '1px solid var(--separator-opaque)' }}>{member.name}</td>
              <td style={{ paddingBlock: 'var(--spacing-3)', borderBlockEnd: '1px solid var(--separator-opaque)', color: 'var(--label-secondary)' }}>{member.role}</td>
              <td style={{ paddingBlock: 'var(--spacing-3)', borderBlockEnd: '1px solid var(--separator-opaque)', textAlign: 'end' }}>
                <IconButton
                  style={{ display: 'inline-flex' }}
                  type='button'
                  size='xs'
                  variant='secondary'
                  appearance='transparent'
                  aria-label={`Edit ${member.name}`}
                  onClick={() => setEditing(member.name)}
                >
                  <Icon><PencilIcon /></Icon>
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ margin: 0, color: 'var(--label-secondary)' }}>{editing === '' ? '' : `Editing ${editing}`}</p>
    </div>
  );
}
```
<!-- /example -->
