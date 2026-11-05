import {
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';
import { InfoIcon } from '@vega-ui/icons';

const names = ['Maria Chen', 'Tom Okafor', 'Lea Novak', 'Sam Rivera', 'Ana Silva'];

const members = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  name: names[index % names.length],
  role: index % 4 === 0 ? 'Admin' : 'Editor',
  lastSeen: `${index + 2} h ago`,
}));

export default function ScrollContainer() {
  return (
    <ul
      tabIndex={0}
      aria-label='Team members'
      style={{
        boxSizing: 'border-box',
        width: '100%',
        height: 220,
        overflow: 'auto',
        overscrollBehavior: 'contain',
        margin: 0,
        paddingBlock: 'var(--spacing-2)',
        paddingInline: 0,
        listStyle: 'none',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {members.map((member) => (
        <li key={member.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)', paddingInline: 'var(--spacing-8)', paddingBlock: 'var(--spacing-3)' }}>
          <Text size={3}>{member.name}</Text>
          <Popover role='dialog' placement='bottom-end'>
            <PopoverTrigger asChild>
              <IconButton aria-label={`Details for ${member.name}`} size='sm' variant='secondary' appearance='ghost'>
                <Icon size='xs'><InfoIcon /></Icon>
              </IconButton>
            </PopoverTrigger>
            <PopoverContent aria-label={`${member.name} details`}>
              <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 180 }}>
                <Text size={3} fontWeight={600}>{member.name}</Text>
                <Text size={2} style={{ color: 'var(--label-secondary)' }}>{member.role} · last seen {member.lastSeen}</Text>
              </div>
            </PopoverContent>
          </Popover>
        </li>
      ))}
    </ul>
  );
}
