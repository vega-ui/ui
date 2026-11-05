import { useId, type CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const people = ['Ada Lovelace', 'Grace Hopper', 'Linus Torvalds', 'Margaret Hamilton', 'Alan Kay'];
const actions = ['changed the plan to Pro', 'invited a member', 'exported invoices', 'rotated the API key', 'updated billing details'];

const events = Array.from({ length: 40 }, (_, index) => {
  const minutes = 18 * 60 + 55 - index * 7;
  const time = `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`;

  return { id: index, time, text: `${people[index % people.length]} ${actions[(index * 3) % actions.length]}` };
});

export default function ScrollableContentDialog() {
  const titleId = useId();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Activity log</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Activity log</Heading>
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
        <ol
          tabIndex={0}
          aria-label='Events, newest first'
          style={{
            display: 'grid',
            gap: 'var(--spacing-6)',
            maxHeight: '50vh',
            overflow: 'auto',
            overscrollBehavior: 'contain',
            margin: 'var(--spacing-8) 0 0',
            paddingBlock: 'var(--spacing-6)',
            paddingInline: 0,
            borderBlock: '1px solid var(--separator-opaque)',
            listStyle: 'none',
          }}
        >
          {events.map((event) => (
            <li key={event.id} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-6)' }}>
              <Text size={2} style={{ flexShrink: 0, minWidth: '5ch', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{event.time}</Text>
              <Text size={3}>{event.text}</Text>
            </li>
          ))}
        </ol>
        <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', marginBlockStart: 'var(--spacing-12)' }}>
          <Button type='submit'>Done</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
