import { useId, useState } from 'react';
import {
  Badge,
  Heading,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';
import { BellIcon } from '@vega-ui/icons';

const notifications = [
  { id: 1, text: 'Tom Okafor mentioned you in Pricing table', time: '4 min ago' },
  { id: 2, text: 'Export of Q3 invoices is ready', time: '1 h ago' },
  { id: 3, text: 'Lea Novak shared Homepage hero with you', time: 'Yesterday' },
];

export default function ControlledOpenState() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(notifications.length);

  const changeOpen = (next: boolean) => {
    setOpen(next);
    if (next) setUnread(0);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        padding: 'var(--spacing-4)',
        paddingInlineEnd: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <Popover role='dialog' placement='bottom-start' open={open} onChangeOpen={changeOpen}>
        <PopoverTrigger asChild>
          <IconButton aria-label={unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'} variant='secondary' appearance='ghost'>
            <Icon><BellIcon /></Icon>
          </IconButton>
        </PopoverTrigger>
        <PopoverContent aria-labelledby={titleId}>
          <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: 280 }}>
            <Heading id={titleId} as='h3' size={5} fontWeight={600}>Notifications</Heading>
            {notifications.map((item) => (
              <div key={item.id} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
                <Text size={3}>{item.text}</Text>
                <Text size={2} style={{ color: 'var(--label-secondary)' }}>{item.time}</Text>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {unread > 0 && <Badge variant='info' size='sm'>{unread} new</Badge>}
      <Text size={2} style={{ marginInlineStart: 'auto', color: 'var(--label-secondary)' }}>Popover is {open ? 'open' : 'closed'}</Text>
    </div>
  );
}
