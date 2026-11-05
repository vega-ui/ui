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
