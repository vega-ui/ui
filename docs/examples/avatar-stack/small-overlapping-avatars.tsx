import { AvatarFallback, AvatarStack, AvatarStackItem, Text } from '@vega-ui/react';

const sizes = ['xs', 'sm', 'md', 'lg'];
const people = [
  { name: 'Maria Chen', initials: 'MC' },
  { name: 'Omar Haddad', initials: 'OH' },
  { name: 'Lena Fischer', initials: 'LF' },
];

export default function SmallOverlappingAvatars() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
      {sizes.map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
          <Text size={2} style={{ width: 'var(--spacing-12)', color: 'var(--label-secondary)' }}>{size}</Text>
          <AvatarStack size={size} role='group' aria-label={`Team members, size ${size}`}>
            {people.map((person) => (
              <AvatarStackItem key={person.name} role='img' aria-label={person.name}>
                <AvatarFallback>{person.initials}</AvatarFallback>
              </AvatarStackItem>
            ))}
          </AvatarStack>
        </div>
      ))}
    </div>
  );
}
