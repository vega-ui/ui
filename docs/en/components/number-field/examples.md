# NumberField Examples

## Basic

### Basic: seat count with bounds

`min`, `max` and `defaultValue` live on the root; `id`, `name` and `aria-describedby` go on `NumberFieldInput`. The stepper buttons have no built-in name, so each gets an `aria-label`, and they disable themselves at the bounds.

<!-- example: number-field/seat-count.tsx -->
```tsx
import {
  HelperText,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { useId } from 'react';

export default function SeatCount() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 240 }}>
      <Label htmlFor={id}>Seats</Label>
      <NumberField min={1} max={50} defaultValue={5}>
        <NumberFieldDecrementButton aria-label='Remove a seat' />
        <NumberFieldInput id={id} name='seats' aria-describedby={hintId} />
        <NumberFieldIncrementButton aria-label='Add a seat' />
      </NumberField>
      <HelperText id={hintId}>From 1 to 50 seats on the Team plan.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: quantity drives the order total

`value` and `onChangeValue` work with numbers, not strings. An emptied field reports `NaN`, so the total checks `Number.isNaN` before formatting, and the buttons below set the value from outside, including clearing it.

<!-- example: number-field/order-total.tsx -->
```tsx
import {
  Button,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Text,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const UNIT_PRICE = 24.5;
export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function OrderTotal({ locale = 'en-US' }: { locale?: string }) {
  const currency = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' });

  const id = useId();
  const [quantity, setQuantity] = useState(2);
  const empty = Number.isNaN(quantity);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 240 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Notebooks, {currency.format(UNIT_PRICE)} each</Label>
        <NumberField min={0} max={99} value={quantity} onChangeValue={setQuantity}>
          <NumberFieldDecrementButton aria-label='Decrease quantity' />
          <NumberFieldInput id={id} />
          <NumberFieldIncrementButton aria-label='Increase quantity' />
        </NumberField>
      </div>
      <Text size={3} fontWeight={500} role='status' style={{ fontVariantNumeric: 'tabular-nums' }}>
        Total: {empty ? '—' : currency.format(quantity * UNIT_PRICE)}
      </Text>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setQuantity(10)}>Bulk: 10</Button>
        <Button size='sm' variant='secondary' appearance='transparent' onClick={() => setQuantity(NaN)}>Clear</Button>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: submit and reset in a form

Put `name` on `NumberFieldInput`. `FormData` returns the field text, which contains thousands separators, so strip whitespace before converting it to a number. Reset restores `defaultValue`.

<!-- example: number-field/form-submit-and-reset.tsx -->
```tsx
import {
  Button,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Text,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function FormSubmitAndReset() {
  const id = useId();
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const raw = String(new FormData(event.currentTarget).get('monthlyBudget'));
    const budget = Number(raw.replace(/\s/g, ''));
    setSubmitted(`Field text “${raw}” → number ${budget}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      onReset={() => setSubmitted('')}
      style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 280 }}
    >
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Monthly budget, USD</Label>
        <NumberField min={0} max={1000000} step={500} defaultValue={2500} maximumFractionDigits={0}>
          <NumberFieldDecrementButton aria-label='Decrease budget by 500' />
          <NumberFieldInput id={id} name='monthlyBudget' required />
          <NumberFieldIncrementButton aria-label='Increase budget by 500' />
        </NumberField>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{submitted}</Text>
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: quantities in a cart

Compact `size='sm'` steppers in repeated rows. Every input and button gets an `aria-label` that names its product, because "Quantity" alone is ambiguous when there are several rows. The subtotal skips emptied rows.

<!-- example: number-field/cart-line-items.tsx -->
```tsx
import {
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

interface LineItem {
  sku: string;
  name: string;
  price: number;
  quantity: number;
}

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function CartLineItems() {
  const [items, setItems] = useState<LineItem[]>([
    { sku: 'KB-01', name: 'Mechanical keyboard', price: 129, quantity: 1 },
    { sku: 'MS-02', name: 'Wireless mouse', price: 49, quantity: 2 },
    { sku: 'HB-07', name: 'USB-C hub, 7 ports', price: 64.9, quantity: 1 },
  ]);

  const changeQuantity = (sku: string, quantity: number) => {
    setItems((current) => current.map((item) => (item.sku === sku ? { ...item, quantity } : item)));
  };

  const total = items.reduce((sum, item) => {
    if (Number.isNaN(item.quantity)) return sum;
    return sum + item.price * item.quantity;
  }, 0);

  return (
    <div
      style={{
        display: 'grid',
        gap: 'var(--spacing-8)',
        width: '100%',
        padding: 'var(--spacing-8)',
        boxSizing: 'border-box',
        borderRadius: 'var(--radius-5)',
        border: '1px solid var(--separator-opaque)',
        background: 'var(--surface-primary)',
      }}
    >
      {items.map((item) => (
        <div key={item.sku} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 132px', alignItems: 'center', gap: 'var(--spacing-6)' }}>
          <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
            <Text size={3} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{currency.format(item.price)}</Text>
          </div>
          <NumberField size='sm' min={0} max={20} value={item.quantity} onChangeValue={(quantity) => changeQuantity(item.sku, quantity)}>
            <NumberFieldDecrementButton aria-label={`Remove one ${item.name}`} />
            <NumberFieldInput aria-label={`Quantity of ${item.name}`} />
            <NumberFieldIncrementButton aria-label={`Add one ${item.name}`} />
          </NumberField>
        </div>
      ))}
      <div
        role='status'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          paddingBlockStart: 'var(--spacing-8)',
          borderBlockStart: '1px solid var(--separator-opaque)',
        }}
      >
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>Subtotal</Text>
        <Text size={3} fontWeight={600} style={{ fontVariantNumeric: 'tabular-nums' }}>{currency.format(total)}</Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Error

### Error: below a business minimum

The mask keeps the value inside `min`/`max`, but rules like "not fewer seats than active members" are yours. The error is derived from the value, set with `error` on the root and `aria-invalid` on the input, and it clears once the value is valid again.

<!-- example: number-field/seats-below-active-members.tsx -->
```tsx
import {
  HelperText,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const ACTIVE_MEMBERS = 12;

const getSeatsError = (seats: number) => {
  if (Number.isNaN(seats)) return 'Enter the number of seats.';
  if (seats < ACTIVE_MEMBERS) return `You have ${ACTIVE_MEMBERS} active members. Remove members first or keep at least ${ACTIVE_MEMBERS} seats.`;
  return '';
};

export default function SeatsBelowActiveMembers() {
  const id = useId();
  const messageId = `${id}-message`;
  const [seats, setSeats] = useState(10);
  const error = getSeatsError(seats);
  const invalid = error !== '';

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Seats after renewal</Label>
      <NumberField min={1} max={200} value={seats} onChangeValue={setSeats} error={invalid}>
        <NumberFieldDecrementButton aria-label='Remove a seat' />
        <NumberFieldInput id={id} aria-invalid={invalid} aria-describedby={messageId} />
        <NumberFieldIncrementButton aria-label='Add a seat' />
      </NumberField>
      <HelperText id={messageId} error={invalid}>
        {invalid ? error : `Covers all ${ACTIVE_MEMBERS} active members.`}
      </HelperText>
    </div>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: locked until an override is checked

`disabled` on the root disables the input and both buttons. A checkbox unlocks the field, and the hint explains why it is locked.

<!-- example: number-field/locked-until-override.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  HelperText,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { useId, useState } from 'react';

export default function LockedUntilOverride() {
  const id = useId();
  const [override, setOverride] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 280 }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput checked={override} onChange={(event) => setOverride(event.currentTarget.checked)} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
        </CheckboxIndicator>
        Override the default rate limit
      </Checkbox>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Requests per minute</Label>
        <NumberField min={60} max={6000} step={60} defaultValue={600} disabled={!override}>
          <NumberFieldDecrementButton aria-label='Decrease by 60' />
          <NumberFieldInput id={id} name='rateLimit' aria-describedby={`${id}-hint`} />
          <NumberFieldIncrementButton aria-label='Increase by 60' />
        </NumberField>
        <HelperText id={`${id}-hint`}>
          {override ? 'From 60 to 6,000, in steps of 60.' : 'Uses the plan default of 600.'}
        </HelperText>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: fractional step with a unit suffix

`step={0.5}` with `maximumFractionDigits={1}` steps without floating-point noise. The `%` suffix sits between the input and the increment button and is hidden from screen readers; the derived price below is linked with `aria-describedby`.

<!-- example: number-field/discount-percentage.tsx -->
```tsx
import {
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Text,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const LIST_PRICE = 1290;
export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function DiscountPercentage({ locale = 'en-US' }: { locale?: string }) {
  const currency = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' });

  const id = useId();
  const [discount, setDiscount] = useState(12.5);
  const price = Number.isNaN(discount) ? LIST_PRICE : LIST_PRICE * (1 - discount / 100);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260 }}>
      <Label htmlFor={id}>Discount</Label>
      <NumberField min={0} max={100} step={0.5} maximumFractionDigits={1} value={discount} onChangeValue={setDiscount}>
        <NumberFieldDecrementButton aria-label='Decrease discount by 0.5%' />
        <NumberFieldInput id={id} aria-describedby={`${id}-price`} />
        <Text size={3} aria-hidden style={{ color: 'var(--label-secondary)' }}>%</Text>
        <NumberFieldIncrementButton aria-label='Increase discount by 0.5%' />
      </NumberField>
      <Text id={`${id}-price`} size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        Annual plan: {currency.format(price)} instead of {currency.format(LIST_PRICE)}
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Edge: large amounts without wheel changes

Large values get thousands separators as you type. `changeOnWheel={false}` stops the mouse wheel from changing a focused amount when people scroll a long form.

<!-- example: number-field/large-amount-no-wheel.tsx -->
```tsx
import {
  HelperText,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });

export default function LargeAmountNoWheel() {
  const id = useId();
  const [limit, setLimit] = useState(2500000);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Annual spend limit, USD</Label>
      <NumberField
        min={0}
        max={50000000}
        step={10000}
        maximumFractionDigits={0}
        changeOnWheel={false}
        value={limit}
        onChangeValue={setLimit}
      >
        <NumberFieldDecrementButton aria-label='Decrease by 10,000' />
        <NumberFieldInput id={id} aria-describedby={`${id}-hint`} />
        <NumberFieldIncrementButton aria-label='Increase by 10,000' />
      </NumberField>
      <HelperText id={`${id}-hint`} style={{ fontVariantNumeric: 'tabular-nums' }}>
        {Number.isNaN(limit) ? 'No limit set.' : `About ${compact.format(limit)}. Max 50M.`}
      </HelperText>
    </div>
  );
}
```
<!-- /example -->
