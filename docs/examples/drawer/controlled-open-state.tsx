import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { ChevronDownIcon, ChevronUpIcon, XIcon } from '@vega-ui/icons';

const tickets = [
  { id: 'SUP-311', title: 'Export to CSV times out', requester: 'Maria Chen', priority: 'High' },
  { id: 'SUP-312', title: 'Invoice shows the wrong VAT number', requester: 'Tom Okafor', priority: 'Medium' },
  { id: 'SUP-313', title: 'Cannot invite members with a + in the email', requester: 'Lea Novak', priority: 'High' },
  { id: 'SUP-314', title: 'Dark mode resets after sign in', requester: 'Sam Rivera', priority: 'Low' },
];

export default function ControlledOpenState() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const ticket = tickets[index];

  const openTicket = (next: number) => {
    setIndex(next);
    setOpen(true);
  };

  return (
    <div
      style={{
        display: 'grid',
        boxSizing: 'border-box',
        width: '100%',
        padding: 'var(--spacing-2)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {tickets.map((item, itemIndex) => (
        <Button
          key={item.id}
          variant='secondary'
          appearance={open && itemIndex === index ? 'ghost' : 'transparent'}
          aria-current={open && itemIndex === index ? 'true' : undefined}
          style={{ justifyContent: 'flex-start', gap: 'var(--spacing-4)', minWidth: 0 }}
          onClick={() => openTicket(itemIndex)}
        >
          <span style={{ flexShrink: 0, color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{item.id}</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</span>
        </Button>
      ))}

      <Drawer open={open} onChangeOpen={setOpen}>
        <DrawerContent aria-labelledby={titleId} style={{ width: 380 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{ticket.id} · {index + 1} of {tickets.length}</Text>
              <Heading id={titleId} as='h2' size={4} fontWeight={600}>{ticket.title}</Heading>
            </div>
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
          <Text size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>Requested by {ticket.requester} · {ticket.priority} priority</Text>
          <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBlockStart: 'auto', paddingBlockStart: 'var(--spacing-12)' }}>
            <IconButton aria-label='Previous ticket' variant='secondary' appearance='ghost' disabled={index === 0} onClick={() => setIndex(index - 1)}>
              <Icon><ChevronUpIcon /></Icon>
            </IconButton>
            <IconButton aria-label='Next ticket' variant='secondary' appearance='ghost' disabled={index === tickets.length - 1} onClick={() => setIndex(index + 1)}>
              <Icon><ChevronDownIcon /></Icon>
            </IconButton>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
