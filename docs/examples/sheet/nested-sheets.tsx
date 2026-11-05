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
