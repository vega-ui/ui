# Sheet Examples

## Basic

### Basic: share sheet with heading and close button

The sheet fits its content and closes with the round button, a swipe down, a backdrop click or `Escape`. The heading names it through `aria-labelledby`, the address describes it through `aria-describedby`, and the copy result is announced through a `role="status"` line.

<!-- example: sheet/sheet-with-heading-and-close-button.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Heading,
  Icon,
  IconButton,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Text,
} from '@vega-ui/react';
import { CopyIcon, MailIcon, MessageCircleIcon, XIcon } from '@vega-ui/icons';

const link = 'https://maps.example.com/p/blue-harbor-cafe';

export default function SheetWithHeadingAndCloseButton() {
  const titleId = useId();
  const descriptionId = useId();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
  };

  return (
    <Sheet onChangeOpen={() => setCopied(false)}>
      <SheetTrigger asChild>
        <Button>Share place</Button>
      </SheetTrigger>
      <SheetContent aria-labelledby={titleId} aria-describedby={descriptionId}>
        <SheetHandle aria-label='Resize sheet' />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Share Blue Harbor Cafe</Heading>
          <SheetClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </SheetClose>
        </div>
        <Text id={descriptionId} size={3} style={{ color: 'var(--label-secondary)' }}>12 Quay Street · Open until 22:00</Text>
        <div style={{ display: 'grid', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-4)' }}>
          <Button variant='secondary' appearance='ghost' style={{ justifyContent: 'flex-start' }} onClick={copy}>
            <Icon size='sm'><CopyIcon /></Icon>
            Copy link
          </Button>
          <Button variant='secondary' appearance='ghost' style={{ justifyContent: 'flex-start' }} asChild>
            <a href={`mailto:?subject=Blue%20Harbor%20Cafe&body=${encodeURIComponent(link)}`}>
              <Icon size='sm'><MailIcon /></Icon>
              Send by email
            </a>
          </Button>
          <Button variant='secondary' appearance='ghost' style={{ justifyContent: 'flex-start' }} asChild>
            <a href={`sms:?&body=${encodeURIComponent(link)}`}>
              <Icon size='sm'><MessageCircleIcon /></Icon>
              Send as message
            </a>
          </Button>
        </div>
        <Text size={2} role='status' style={{ minHeight: '1lh', color: 'var(--label-secondary)' }}>{copied ? 'The link is on your clipboard.' : ''}</Text>
      </SheetContent>
    </Sheet>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: snap point in your state

With `activeSnapPoint` and `onChangeActiveSnapPoint` the snap point lives in your state, so the Peek, Half and Full buttons move the sheet and a drag updates the pressed button. `height: 100%` makes the sheet as tall as the viewport, so all three snap points apply.

<!-- example: sheet/controlled-snap-point.tsx -->
```tsx
import { useId, useState } from 'react';
import {
  Button,
  Heading,
  Sheet,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Text,
} from '@vega-ui/react';

const snapPoints: Array<`${number}px` | number> = ['180px', 0.5, 1];
const snapLabels = ['Peek', 'Half', 'Full'];

const stops = ['Central Station', 'Market Square', 'Harbour Bridge', 'Old Town', 'University', 'Science Park', 'Airport'];

export default function ControlledSnapPoint() {
  const titleId = useId();
  const [snapPoint, setSnapPoint] = useState(0);

  return (
    <Sheet snapPoints={snapPoints} activeSnapPoint={snapPoint} onChangeActiveSnapPoint={setSnapPoint} onChangeOpen={() => setSnapPoint(0)}>
      <SheetTrigger asChild>
        <Button>Bus 42 route</Button>
      </SheetTrigger>
      <SheetContent aria-labelledby={titleId} style={{ height: '100%' }}>
        <SheetHandle aria-label='Resize sheet' />
        <Heading id={titleId} as='h2' size={4} fontWeight={600}>Bus 42 · next in 4 min</Heading>
        <div role='group' aria-label='Sheet height' style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          {snapLabels.map((label, index) => (
            <Button
              key={label}
              size='sm'
              variant={index === snapPoint ? 'primary' : 'secondary'}
              appearance='ghost'
              aria-pressed={index === snapPoint}
              onClick={() => setSnapPoint(index)}
            >
              {label}
            </Button>
          ))}
        </div>
        <ol style={{ display: 'grid', gap: 'var(--spacing-6)', margin: 0, padding: 0, listStyle: 'none', overflow: 'auto', overscrollBehavior: 'contain' }}>
          {stops.map((stop, index) => (
            <li key={stop} style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
              <Text size={3}>{stop}</Text>
              <Text size={3} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{4 + index * 3} min</Text>
            </li>
          ))}
        </ol>
      </SheetContent>
    </Sheet>
  );
}
```
<!-- /example -->

### Controlled/Stateful: picker that closes on choice

The sheet's `open` is controlled, so choosing a delivery slot stores it and closes the sheet in one handler. The trigger shows the current choice, and `aria-pressed` marks it inside the sheet.

<!-- example: sheet/mobile-like-picker-surface.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Heading,
  Icon,
  IconButton,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const slots = [
  { id: 'asap', label: 'As soon as possible', detail: '25–35 min · $2.99' },
  { id: '1830', label: 'Today, 18:30–19:00', detail: '$1.99' },
  { id: '1900', label: 'Today, 19:00–19:30', detail: '$1.99' },
  { id: '1930', label: 'Today, 19:30–20:00', detail: 'Free' },
];

export default function MobileLikePickerSurface() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState(slots[0]);

  const choose = (next: typeof slots[number]) => {
    setSlot(next);
    setOpen(false);
  };

  return (
    <Sheet open={open} onChangeOpen={setOpen}>
      <SheetTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Delivery: {slot.label}</Button>
      </SheetTrigger>
      <SheetContent aria-labelledby={titleId}>
        <SheetHandle aria-label='Resize sheet' />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Delivery time</Heading>
          <SheetClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </SheetClose>
        </div>
        <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
          {slots.map((item) => (
            <Button
              key={item.id}
              variant='secondary'
              appearance={item.id === slot.id ? 'ghost' : 'transparent'}
              aria-pressed={item.id === slot.id}
              style={{ justifyContent: 'space-between' }}
              onClick={() => choose(item)}
            >
              <span>{item.label}</span>
              <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{item.detail}</Text>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: feedback form

A `<form method="dialog">` with a number field limited by `min`, `max` and `step` and an optional note. The browser validates the tip, a valid submit is read with `FormData` and closes the sheet; on phones the sheet rises above the on-screen keyboard.

<!-- example: sheet/sheet-with-form-content.tsx -->
```tsx
import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Button,
  Heading,
  Icon,
  IconButton,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Text,
  TextArea,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function SheetWithFormContent() {
  const titleId = useId();
  const tipId = useId();
  const noteId = useId();
  const [summary, setSummary] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const note = String(data.get('note')).trim();

    setSummary(`Tip $${data.get('tip')}${note ? ` · “${note}”` : ''}`);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Rate your courier</Button>
        </SheetTrigger>
        <SheetContent aria-labelledby={titleId}>
          <SheetHandle aria-label='Resize sheet' />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>How was your delivery?</Heading>
            <SheetClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </SheetClose>
          </div>
          <form method='dialog' onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={tipId}>Tip for Daniel, $</Label>
              <TextField>
                <TextFieldInput id={tipId} name='tip' type='number' inputMode='decimal' min={0} max={50} step={0.5} defaultValue={2} required />
              </TextField>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={noteId}>Note (optional)</Label>
              <TextArea id={noteId} name='note' rows={3} maxLength={200} fullWidth />
            </div>
            <Button type='submit' style={{ marginBlockStart: 'var(--spacing-4)' }}>Send</Button>
          </form>
        </SheetContent>
      </Sheet>
      <Text size={2} style={{ minHeight: '1lh', textAlign: 'center', overflowWrap: 'anywhere', color: 'var(--label-secondary)' }}>{summary ? `Sent: ${summary}` : ''}</Text>
    </div>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: long list with snap points

Forty places make the sheet as tall as the viewport, so it rests at 160 px, half and full height. The list is the scrollable element with `overscroll-behavior: contain`; it scrolls once the sheet reaches the top, and dragging down at its top moves the sheet.

<!-- example: sheet/long-scrollable-sheet.tsx -->
```tsx
import { useId } from 'react';
import {
  Button,
  Heading,
  Sheet,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Text,
} from '@vega-ui/react';

const names = ['Blue Harbor Cafe', 'Little Fern', 'Kiln & Co', 'Northside Roasters', 'The Daily Grind', 'Saltwater Bakery'];

const places = Array.from({ length: 40 }, (_, index) => ({
  id: index,
  name: names[index % names.length],
  distance: `${(index + 1) * 90} m`,
  rating: (4.9 - (index % 7) * 0.1).toFixed(1),
}));

export default function LongScrollableSheet() {
  const titleId = useId();

  return (
    <Sheet snapPoints={['160px', 0.5, 1]}>
      <SheetTrigger asChild>
        <Button>Coffee nearby</Button>
      </SheetTrigger>
      <SheetContent aria-labelledby={titleId}>
        <SheetHandle aria-label='Resize sheet' />
        <Heading id={titleId} as='h2' size={4} fontWeight={600}>Coffee nearby · {places.length} places</Heading>
        <ul
          tabIndex={0}
          aria-labelledby={titleId}
          style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 0, padding: 0, listStyle: 'none', overflow: 'auto', overscrollBehavior: 'contain' }}
        >
          {places.map((place) => (
            <li key={place.id} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <Text size={3} fontWeight={500}>{place.name}</Text>
              <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{place.distance} · ★ {place.rating}</Text>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
```
<!-- /example -->

### Layout/Overlay: sheet over a sheet

The place sheet opens a second sheet for choosing a list. Each list is a submit button in a `<form method="dialog">`, so a choice closes only the inner sheet and the place shows where it was saved.

<!-- example: sheet/nested-sheets.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Heading,
  Icon,
  IconButton,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const lists = ['Weekend brunch', 'Work-friendly', 'Visit with Ana'];

export default function NestedSheets() {
  const placeTitleId = useId();
  const listTitleId = useId();
  const [savedTo, setSavedTo] = useState('');

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Blue Harbor Cafe</Button>
      </SheetTrigger>
      <SheetContent aria-labelledby={placeTitleId}>
        <SheetHandle aria-label='Resize sheet' />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={placeTitleId} as='h2' size={4} fontWeight={600}>Blue Harbor Cafe</Heading>
          <SheetClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </SheetClose>
        </div>
        <Text size={3}>120 m · Open until 22:00 · ★ 4.8</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>{savedTo ? `Saved to ${savedTo}` : 'Not saved yet'}</Text>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='secondary' appearance='ghost' style={{ marginBlockStart: 'var(--spacing-6)' }}>Save to list</Button>
          </SheetTrigger>
          <SheetContent aria-labelledby={listTitleId}>
            <SheetHandle aria-label='Resize sheet' />
            <Heading id={listTitleId} as='h3' size={4} fontWeight={600}>Save to list</Heading>
            <form method='dialog' style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
              {lists.map((list) => (
                <Button key={list} type='submit' value={list} variant='secondary' appearance='ghost' style={{ justifyContent: 'flex-start' }} onClick={() => setSavedTo(list)}>{list}</Button>
              ))}
            </form>
          </SheetContent>
        </Sheet>
      </SheetContent>
    </Sheet>
  );
}
```
<!-- /example -->

## Error

### Error: invalid promo code

The code is checked on submit, so the form prevents the default and the sheet is controlled: an unknown code keeps the sheet open with an error linked through `aria-describedby` and `aria-invalid`, a known one (`WELCOME10`, `FRIDAY20`) applies the discount and closes it.

<!-- example: sheet/form-error.tsx -->
```tsx
import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Button,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const codes: Record<string, number> = { WELCOME10: 10, FRIDAY20: 20 };

export default function FormError() {
  const titleId = useId();
  const codeId = useId();
  const errorId = useId();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [discount, setDiscount] = useState(0);

  const changeOpen = (next: boolean) => {
    setError('');
    setOpen(next);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const code = String(new FormData(event.currentTarget).get('code')).trim().toUpperCase();
    const percent = codes[code];

    if (percent === undefined) {
      setError(`${code} is not a valid code or has expired.`);
      return;
    }
    setDiscount(percent);
    setOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        padding: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <div style={{ display: 'grid', minWidth: 0 }}>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>{discount > 0 ? `Total · −${discount}%` : 'Total'}</Text>
        <Text size={4} fontWeight={600} style={{ fontVariantNumeric: 'tabular-nums' }}>${(48 * (100 - discount) / 100).toFixed(2)}</Text>
      </div>
      <Sheet open={open} onChangeOpen={changeOpen}>
        <SheetTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost'>Add promo code</Button>
        </SheetTrigger>
        <SheetContent aria-labelledby={titleId}>
          <SheetHandle aria-label='Resize sheet' />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Promo code</Heading>
            <SheetClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </SheetClose>
          </div>
          <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor={codeId}>Code</Label>
            <TextField error={error !== ''}>
              <TextFieldInput
                id={codeId}
                name='code'
                defaultValue='SUMMER5'
                required
                autoCapitalize='characters'
                aria-invalid={error !== ''}
                aria-describedby={error ? errorId : undefined}
                onChange={() => setError('')}
              />
            </TextField>
            {error && <HelperText id={errorId} error>{error}</HelperText>}
            <Button type='submit' style={{ marginBlockStart: 'var(--spacing-9)' }}>Apply</Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: trigger disabled while the cart is empty

The Review order trigger is disabled until the cart has an item, and the hint below it is linked with `aria-describedby` while it is disabled. Add a flat white to enable it.

<!-- example: sheet/disabled-trigger.tsx -->
```tsx
import { useId, useState } from 'react';
import {
  Button,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Sheet,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Text,
} from '@vega-ui/react';
import { MinusIcon, PlusIcon } from '@vega-ui/icons';

const price = 4.2;

export default function DisabledTrigger() {
  const titleId = useId();
  const hintId = useId();
  const [count, setCount] = useState(0);

  const empty = count === 0;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--spacing-6)',
          padding: 'var(--spacing-8)',
          background: 'var(--surface-primary)',
          border: '1px solid var(--separator-opaque)',
          borderRadius: 'var(--radius-5)',
        }}
      >
        <div style={{ display: 'grid', minWidth: 0 }}>
          <Text size={3} fontWeight={500}>Flat white</Text>
          <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>${price.toFixed(2)}</Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <IconButton aria-label='Remove one flat white' size='sm' variant='secondary' appearance='ghost' disabled={empty} onClick={() => setCount(count - 1)}>
            <Icon size='xs'><MinusIcon /></Icon>
          </IconButton>
          <Text size={3} aria-live='polite' style={{ minWidth: '2ch', textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{count}</Text>
          <IconButton aria-label='Add one flat white' size='sm' variant='secondary' appearance='ghost' onClick={() => setCount(count + 1)}>
            <Icon size='xs'><PlusIcon /></Icon>
          </IconButton>
        </div>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button disabled={empty} aria-describedby={empty ? hintId : undefined}>Review order</Button>
        </SheetTrigger>
        <SheetContent aria-labelledby={titleId}>
          <SheetHandle aria-label='Resize sheet' />
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Your order</Heading>
          <Text size={3} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{count} × Flat white · ${(count * price).toFixed(2)}</Text>
          <form method='dialog' style={{ display: 'grid', marginBlockStart: 'var(--spacing-6)' }}>
            <Button type='submit' value='pay'>Pay ${(count * price).toFixed(2)}</Button>
          </form>
        </SheetContent>
      </Sheet>
      <HelperText id={hintId} style={{ minHeight: '1lh', textAlign: 'center' }}>{empty ? 'Add at least one item to review the order.' : ''}</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: stepped snap points

With `steppedSnapPoints` a drag or flick moves the sheet one snap point at a time, however fast it is, through quarter steps of the screen. The line under the heading follows `onChangeActiveSnapPoint`.

<!-- example: sheet/stepped-snap-points.tsx -->
```tsx
import { useId, useState } from 'react';
import {
  Button,
  Heading,
  Sheet,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Text,
} from '@vega-ui/react';

const snapPoints: Array<`${number}px` | number> = [0.25, 0.5, 0.75, 1];
const snapLabels = ['a quarter', 'half', 'three quarters', 'all'];

const steps = [
  'Head north on Quay Street',
  'Turn right onto Harbour Bridge',
  'Continue for 400 m',
  'Turn left at Market Square',
  'Keep right at the fork',
  'Arrive at Central Station',
];

export default function SteppedSnapPoints() {
  const titleId = useId();
  const [snapPoint, setSnapPoint] = useState(0);

  return (
    <Sheet snapPoints={snapPoints} steppedSnapPoints onChangeActiveSnapPoint={setSnapPoint} onChangeOpen={() => setSnapPoint(0)}>
      <SheetTrigger asChild>
        <Button>Walking directions</Button>
      </SheetTrigger>
      <SheetContent aria-labelledby={titleId} style={{ height: '100%' }}>
        <SheetHandle aria-label='Resize sheet' />
        <Heading id={titleId} as='h2' size={4} fontWeight={600}>12 min · 950 m</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Showing {snapLabels[snapPoint]} of the screen</Text>
        <ol style={{ display: 'grid', gap: 'var(--spacing-6)', margin: 0, paddingInlineStart: 'var(--spacing-10)', overflow: 'auto', overscrollBehavior: 'contain' }}>
          {steps.map((step) => <li key={step}><Text size={3}>{step}</Text></li>)}
        </ol>
      </SheetContent>
    </Sheet>
  );
}
```
<!-- /example -->

### Edge: step that must be answered

With `closedBy='none'` a swipe, a backdrop click or `Escape` does not close the sheet, and there is no close button; only the two answers in the `<form method="dialog">` do. The page reads the chosen `returnValue` in `onClose`.

<!-- example: sheet/blocking-step-sheet.tsx -->
```tsx
import { useId, useState } from 'react';
import {
  Button,
  Heading,
  Sheet,
  SheetContent,
  SheetTrigger,
  Text,
} from '@vega-ui/react';

export default function BlockingStepSheet() {
  const titleId = useId();
  const descriptionId = useId();
  const [answer, setAnswer] = useState('');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Place order</Button>
        </SheetTrigger>
        <SheetContent
          closedBy='none'
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          onClose={(event) => setAnswer(event.currentTarget.returnValue)}
        >
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Allow substitutions?</Heading>
          <Text id={descriptionId} size={3} style={{ color: 'var(--label-secondary)' }}>
            If an item is out of stock, the store can replace it with a similar one. You can change this later in settings.
          </Text>
          <form method='dialog' style={{ display: 'grid', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-6)' }}>
            <Button type='submit' value='allow'>Allow substitutions</Button>
            <Button type='submit' value='refund' variant='secondary' appearance='ghost'>Refund missing items</Button>
          </form>
        </SheetContent>
      </Sheet>
      <Text size={2} style={{ color: 'var(--label-secondary)', minHeight: '1lh' }}>{answer ? `returnValue: ${answer}` : ''}</Text>
    </div>
  );
}
```
<!-- /example -->
