import type { CSSProperties } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarStack,
  AvatarStackItem,
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

const attendees = [
  { name: 'Maria Chen', initials: 'MC', role: 'Organizer' },
  { name: 'Omar Haddad', initials: 'OH', role: 'Engineering' },
  { name: 'Lena Fischer', initials: 'LF', role: 'Design' },
  { name: 'Kenji Watanabe', initials: 'KW', role: 'Product' },
  { name: 'Ana Souza', initials: 'AS', role: 'Support' },
];

export default function ParticipantsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Sprint review</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='sprint-review-title' style={{ maxWidth: 420 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
            <Heading id='sprint-review-title' as='h2' size={4} fontWeight={600}>Sprint review</Heading>
            <AvatarStack size='xs' aria-hidden='true'>
              {attendees.slice(0, 3).map((person) => (
                <AvatarStackItem key={person.name}>
                  <AvatarFallback>{person.initials}</AvatarFallback>
                </AvatarStackItem>
              ))}
            </AvatarStack>
          </div>
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
        <Text size={2} style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-2)' }}>Thursday, 15:00–16:00 · {attendees.length} attendees</Text>
        <ul aria-label='Attendees' style={{ listStyle: 'none', margin: 0, marginBlockStart: 'var(--spacing-10)', padding: 0, display: 'grid', gap: 'var(--spacing-6)', maxHeight: 220, overflowY: 'auto' }}>
          {attendees.map((person) => (
            <li key={person.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
              <Avatar size='xs' aria-hidden='true' style={{ flexShrink: 0 }}>
                <AvatarFallback>{person.initials}</AvatarFallback>
              </Avatar>
              <Text size={2} fontWeight={500} style={{ flex: 1 }}>{person.name}</Text>
              <Text size={2} style={{ color: 'var(--label-secondary)' }}>{person.role}</Text>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
