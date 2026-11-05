import { useId, type CSSProperties } from 'react';
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

export default function MinimalComposition() {
  const titleId = useId();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Order summary</Button>
      </SheetTrigger>
      <SheetContent aria-labelledby={titleId}>
        <SheetHandle aria-label='Resize sheet' />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Order summary</Heading>
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
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>2 × Flat white, 1 × Almond croissant · $13.40</Text>
        <form method='dialog' style={{ display: 'grid', marginBlockStart: 'var(--spacing-6)' }}>
          <Button type='submit' value='pay'>Pay $13.40</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
