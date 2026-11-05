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
