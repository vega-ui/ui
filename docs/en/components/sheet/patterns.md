# Sheet Patterns

## Mobile-Like Picker Surface

When to use:

- The flow benefits from bottom-sheet behavior.

Composition notes:

- Use snap points intentionally.
- Keep the first visible state large enough for the primary action or field group.

Trade-offs:

- Good touch ergonomics.
- More interaction complexity than a dialog.

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

## Long Scrollable Sheet

When to use:

- Content exceeds the comfortable viewport height.

Composition notes:

- Make the body an element with `overflow: auto`; as a flex item of `SheetContent` it shrinks on its own.
- Keep the header and close affordances stable while the body moves.

Trade-offs:

- Preserves the sheet framing.
- Requires viewport testing.

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

## Blocking Step Sheet

When to use:

- A mobile-first flow must be completed before leaving.

Composition notes:

- Use `closedBy='none'` on `SheetContent` only when the completion path is obvious; a submit button in a `<form method="dialog">` still closes the sheet.
- Keep the content short enough to work at every active snap point.

Trade-offs:

- Strong task guidance.
- Higher risk of trapping users in a confusing flow if copy is weak.

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
