import { useId, type CSSProperties } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const people = ['Maria Chen', 'Tom Okafor', 'Lea Novak', 'Sam Rivera'];
const actions = ['commented on Homepage hero', 'moved Pricing table to Review', 'uploaded 3 files', 'resolved a thread', 'changed the due date'];

const events = Array.from({ length: 60 }, (_, index) => ({
  id: index,
  who: people[index % people.length],
  what: actions[(index * 2) % actions.length],
  when: index < 6 ? `${(index + 1) * 9} min ago` : `${Math.floor(index / 6)} d ago`,
}));

export default function ActivityPanel() {
  const titleId = useId();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Activity</Button>
      </DrawerTrigger>
      <DrawerContent fullHeight aria-labelledby={titleId} style={{ width: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Activity</Heading>
          <DrawerClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DrawerClose>
        </div>
        <ol
          tabIndex={0}
          aria-label='Recent activity'
          style={{
            display: 'grid',
            gap: 'var(--spacing-8)',
            flex: 1,
            minHeight: 0,
            overflow: 'auto',
            overscrollBehavior: 'contain',
            margin: 'var(--spacing-8) 0 0',
            padding: 0,
            listStyle: 'none',
          }}
        >
          {events.map((event) => (
            <li key={event.id} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <Text size={3}><b>{event.who}</b> {event.what}</Text>
              <Text size={2} style={{ color: 'var(--label-secondary)' }}>{event.when}</Text>
            </li>
          ))}
        </ol>
      </DrawerContent>
    </Drawer>
  );
}
