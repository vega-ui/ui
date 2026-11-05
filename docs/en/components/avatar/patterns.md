# Avatar Patterns

## User Identity Row

When to use:

- A list or settings view needs quick visual identity context.

Composition notes:

- Pair the avatar with visible name text.
- Keep fallback initials short and stable.

Trade-offs:

- Strong scanability for people and entities.
- Weak fit when identity is not important to the task.

<!-- example: avatar/member-list.tsx -->
```tsx
import { Avatar, AvatarFallback, AvatarImage, Text } from '@vega-ui/react';

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

const members = [
  { name: 'Maria Chen', email: 'maria@northwind.io', initials: 'MC', photo: portrait(210), active: true },
  { name: 'Omar Haddad', email: 'omar@northwind.io', initials: 'OH', photo: portrait(28), active: true },
  { name: 'Lena Fischer', email: 'lena@northwind.io', initials: 'LF', photo: '', active: true },
  { name: 'Tom Becker', email: 'tom@northwind.io', initials: 'TB', photo: '', active: false },
];

export default function MemberList() {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 360 }}>
      {members.map((member) => (
        <li key={member.email} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
          <Avatar size='sm' variant={member.active ? 'primary' : 'secondary'} aria-hidden='true'>
            {member.photo && <AvatarImage src={member.photo} alt='' />}
            <AvatarFallback>{member.initials}</AvatarFallback>
          </Avatar>
          <div style={{ display: 'grid', minWidth: 0 }}>
            <Text size={2} fontWeight={500}>{member.name}</Text>
            <Text size={1} style={{ color: 'var(--label-secondary)' }}>
              {member.active ? member.email : 'Deactivated'}
            </Text>
          </div>
        </li>
      ))}
    </ul>
  );
}
```
<!-- /example -->

## Image-First Avatar With Safe Fallback

When to use:

- A profile image is available but should fail safely.

Composition notes:

- Always pair `AvatarImage` with fallback content.
- Keep fallback text concise for the chosen size.

Trade-offs:

- Strong resilience when images fail.
- Requires good alt and fallback strategy.

<!-- example: avatar/image-fallbacks.tsx -->
```tsx
import { Avatar, AvatarFallback, AvatarImage, Text } from '@vega-ui/react';

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

const photo = portrait(150);
const placeholder = portrait(220);
const broken = 'data:image/png;base64,broken';

const cases = [
  { label: 'Image loads', name: 'Priya Nair', initials: 'PN', src: photo, fallbackSrc: undefined },
  { label: 'Image fails → initials', name: 'Diego Alvarez', initials: 'DA', src: broken, fallbackSrc: undefined },
  { label: 'Image fails → fallbackSrc', name: 'Sara Lindqvist', initials: 'SL', src: broken, fallbackSrc: placeholder },
];

export default function ImageFallbacks() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'var(--spacing-8)', width: '100%' }}>
      {cases.map((item) => (
        <figure key={item.label} style={{ margin: 0, display: 'grid', gap: 'var(--spacing-4)', justifyItems: 'center', alignContent: 'start', textAlign: 'center' }}>
          <Avatar size='lg' role='img' aria-label={item.name}>
            <AvatarImage src={item.src} fallbackSrc={item.fallbackSrc} alt='' />
            <AvatarFallback>{item.initials}</AvatarFallback>
          </Avatar>
          <figcaption><Text size={1} style={{ color: 'var(--label-secondary)' }}>{item.label}</Text></figcaption>
        </figure>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Generic Entity Avatar

When to use:

- The represented item is not a specific person or image-backed entity.

Composition notes:

- Use `AvatarIcon` when initials or images would be misleading.
- Keep surrounding labels explicit about the represented entity.

Trade-offs:

- Clear generic representation.
- Less personalized than image or initials.

<!-- example: avatar/generic-entities.tsx -->
```tsx
import { Avatar, AvatarIcon, Text } from '@vega-ui/react';
import { Bot, Building2, Users } from '@vega-ui/icons';

export default function GenericEntities() {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Avatar size='sm' variant='secondary' aria-hidden='true'>
          <AvatarIcon><Bot /></AvatarIcon>
        </Avatar>
        <Text size={3}>Release bot merged 3 pull requests</Text>
      </li>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Avatar size='sm' variant='secondary' aria-hidden='true'>
          <AvatarIcon><Users /></AvatarIcon>
        </Avatar>
        <Text size={3}>Design team was mentioned in “Q4 roadmap”</Text>
      </li>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Avatar size='sm' variant='secondary' aria-hidden='true'>
          <AvatarIcon><Building2 /></AvatarIcon>
        </Avatar>
        <Text size={3}>Northwind Traders</Text>
      </li>
    </ul>
  );
}
```
<!-- /example -->
