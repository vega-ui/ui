# AvatarStack Examples

## Basic

### Basic: reviewers with an overflow count

The first three reviewers are shown and the rest collapse into a “+3” item computed from the list. The stack is a named `role='group'`, each item is a named `role='img'`, and the overflow item lists the hidden names in `title`.

<!-- example: avatar-stack/reviewers.tsx -->
```tsx
import { AvatarFallback, AvatarImage, AvatarStack, AvatarStackItem, Text } from '@vega-ui/react';

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

const reviewers = [
  { name: 'Maria Chen', initials: 'MC', photo: portrait(210) },
  { name: 'Omar Haddad', initials: 'OH', photo: portrait(28) },
  { name: 'Lena Fischer', initials: 'LF', photo: '' },
  { name: 'Kenji Watanabe', initials: 'KW', photo: portrait(150) },
  { name: 'Ana Souza', initials: 'AS', photo: '' },
  { name: 'Tom Becker', initials: 'TB', photo: '' },
];

const maxVisible = 3;

export default function Reviewers() {
  const visible = reviewers.slice(0, maxVisible);
  const hidden = reviewers.slice(maxVisible);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Reviewers</Text>
      <AvatarStack size='sm' role='group' aria-label={`${reviewers.length} reviewers`}>
        {visible.map((reviewer) => (
          <AvatarStackItem key={reviewer.name} role='img' aria-label={reviewer.name} title={reviewer.name}>
            {reviewer.photo && <AvatarImage src={reviewer.photo} alt='' />}
            <AvatarFallback>{reviewer.initials}</AvatarFallback>
          </AvatarStackItem>
        ))}
        {hidden.length > 0 && (
          <AvatarStackItem variant='secondary' role='img' aria-label={`and ${hidden.length} more`} title={hidden.map((reviewer) => reviewer.name).join(', ')}>
            <AvatarFallback>+{hidden.length}</AvatarFallback>
          </AvatarStackItem>
        )}
      </AvatarStack>
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: participants joining and leaving

The participant list lives in state; the stack and the summary next to it are derived from it. The summary is a `role='status'` region, so joins and leaves are announced, and the stack is removed entirely when nobody is left.

<!-- example: avatar-stack/call-participants.tsx -->
```tsx
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
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: participants in a dialog header

A compact `size='xs'` stack next to the dialog title is only a visual hint, so it is `aria-hidden`; the full attendee list below it carries the names. The title leaves room for the close button.

<!-- example: avatar-stack/participants-dialog.tsx -->
```tsx
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
```
<!-- /example -->

## Error

### Error: photos, failed images and anonymous members

Each item falls back on its own: a broken image shows the initials, a member without a photo shows initials directly, and an anonymous viewer gets an icon with `variant='secondary'`.

<!-- example: avatar-stack/mixed-sources.tsx -->
```tsx
import { AvatarFallback, AvatarIcon, AvatarImage, AvatarStack, AvatarStackItem } from '@vega-ui/react';
import { User } from '@vega-ui/icons';

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

export default function MixedSources() {
  return (
    <AvatarStack role='group' aria-label='Document editors'>
      <AvatarStackItem role='img' aria-label='Maria Chen'>
        <AvatarImage src={portrait(210)} alt='' />
        <AvatarFallback>MC</AvatarFallback>
      </AvatarStackItem>
      <AvatarStackItem role='img' aria-label='Omar Haddad'>
        <AvatarImage src='data:image/png;base64,broken' alt='' />
        <AvatarFallback>OH</AvatarFallback>
      </AvatarStackItem>
      <AvatarStackItem role='img' aria-label='Lena Fischer'>
        <AvatarFallback>LF</AvatarFallback>
      </AvatarStackItem>
      <AvatarStackItem role='img' aria-label='Anonymous viewer' variant='secondary'>
        <AvatarIcon><User /></AvatarIcon>
      </AvatarStackItem>
    </AvatarStack>
  );
}
```
<!-- /example -->

## Edge

### Edge: from one member to millions

Only four avatars are ever rendered; the remainder is formatted with `Intl.NumberFormat` compact notation (“+1.2K more”, “+2.4M more”). The group’s accessible name carries the exact total, so the shortened visual text is hidden from screen readers.

<!-- example: avatar-stack/large-team.tsx -->
```tsx
import { useState } from 'react';
import { AvatarFallback, AvatarStack, AvatarStackItem, Button, Text } from '@vega-ui/react';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
const maxVisible = 4;

export default function LargeTeam() {
  const [total, setTotal] = useState(1248);

  const visibleCount = Math.min(total, maxVisible);
  const rest = total - visibleCount;
  const members = Array.from({ length: visibleCount }, (_, index) => `${letters[index * 3]}${letters[index * 5 + 1]}`);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'start', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', minHeight: 40 }}>
        <AvatarStack size='sm' role='group' aria-label={`${total.toLocaleString('en-US')} members`}>
          {members.map((initials) => (
            <AvatarStackItem key={initials} aria-hidden='true'>
              <AvatarFallback>{initials}</AvatarFallback>
            </AvatarStackItem>
          ))}
        </AvatarStack>
        <Text size={2} aria-hidden='true' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{rest > 0 ? `+${compact.format(rest)} more` : ''}</Text>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap' }}>
        {[1, 4, 5, 87, 1248, 2400000].map((value) => (
          <Button key={value} size='sm' variant={value === total ? 'primary' : 'secondary'} appearance='ghost' onClick={() => setTotal(value)} style={{ fontVariantNumeric: 'tabular-nums' }}>
            {value.toLocaleString('en-US')}
          </Button>
        ))}
      </div>
    </div>
  );
}
```
<!-- /example -->
