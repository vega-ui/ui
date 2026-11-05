# AvatarStack: паттерны

## Превью ревьюеров

Когда использовать:

- карточке или строке нужно компактное превью вовлечённых людей

Заметки о композиции:

- держите группу небольшой
- добавьте рядом подпись или счётчик, если важен точный состав

Компромиссы:

- быстрое визуальное узнавание
- менее явно, чем полные имена

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

## Группа из фото и запасных вариантов

Когда использовать:

- у одних пользователей есть фото профиля, у других только инициалы

Заметки о композиции:

- держите у всех элементов одинаковые размер и вариант
- задавайте разумный `alt` для изображений

Компромиссы:

- устойчиво к неполным данным профилей
- визуальный баланс может меняться в зависимости от сочетания фото и инициалов

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

## Участники в шапке модального окна

Когда использовать:

- шапке оверлея нужна компактная подсказка об участниках

Заметки о композиции:

- предпочитайте размеры `sm` или `md`
- держите группу визуально второстепенной по отношению к основному заголовку

Компромиссы:

- компактно и аккуратно
- легко перегрузить, если показать слишком много аватаров

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
