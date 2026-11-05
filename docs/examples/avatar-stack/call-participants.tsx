import { useState } from 'react';
import { AvatarFallback, AvatarStack, AvatarStackItem, Button, Text } from '@vega-ui/react';

const people = [
  { name: 'Maria Chen', initials: 'MC' },
  { name: 'Omar Haddad', initials: 'OH' },
  { name: 'Lena Fischer', initials: 'LF' },
  { name: 'Kenji Watanabe', initials: 'KW' },
  { name: 'Ana Souza', initials: 'AS' },
];

export default function CallParticipants() {
  const [count, setCount] = useState(2);

  const participants = people.slice(0, count);

  let summary = 'Nobody is in the call';
  if (count === 1) summary = `${participants[0].name} is in the call`;
  if (count > 1) summary = `${count} people are in the call`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'start', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', minHeight: 40 }}>
        {count > 0 && (
          <AvatarStack size='sm' role='group' aria-label='Call participants'>
            {participants.map((person) => (
              <AvatarStackItem key={person.name} role='img' aria-label={person.name}>
                <AvatarFallback>{person.initials}</AvatarFallback>
              </AvatarStackItem>
            ))}
          </AvatarStack>
        )}
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{summary}</Text>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
        <Button size='sm' disabled={count === people.length} onClick={() => setCount(count + 1)}>Someone joins</Button>
        <Button size='sm' variant='secondary' appearance='ghost' disabled={count === 0} onClick={() => setCount(count - 1)}>Someone leaves</Button>
      </div>
    </div>
  );
}
