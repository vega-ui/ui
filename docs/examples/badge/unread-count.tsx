import { useState } from 'react';
import { Badge, Button, Text, VisuallyHidden } from '@vega-ui/react';

const max = 99;

export default function UnreadCount() {
  const [count, setCount] = useState(7);

  let shown = String(count);
  if (count > max) shown = `${max}+`;

  let label = `${count} unread messages`;
  if (count === 1) label = '1 unread message';

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'start', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Text size={3} fontWeight={500}>Inbox</Text>
        {count > 0 && (
          <Badge size='xs' variant='error' appearance='fill' style={{ fontVariantNumeric: 'tabular-nums' }}>
            <span aria-hidden='true'>{shown}</span>
            <VisuallyHidden>{label}</VisuallyHidden>
          </Badge>
        )}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setCount(0)}>Mark all read</Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setCount(count + 1)}>+1 message</Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setCount(count + 100)}>+100 messages</Button>
      </div>
    </div>
  );
}
