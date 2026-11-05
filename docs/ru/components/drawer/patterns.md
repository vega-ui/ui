# Drawer: паттерны

## Боковой инспектор

Когда использовать:

- Пользователю нужны контекстные детали без ухода со страницы.

Заметки по композиции:

- Содержимое должно относиться к текущему выбору.
- Дайте панели имя через заголовок, на который ссылается `aria-labelledby`, чтобы назначение инспектора оставалось очевидным.

Компромиссы:

- Сохраняет контекст.
- Хуже подходит для строго модальных решений.

<!-- example: drawer/side-inspector.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import {
  Badge,
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const details = [
  { term: 'Customer', value: 'Kestrel Robotics' },
  { term: 'Placed', value: 'Nov 2, 2026, 14:08' },
  { term: 'Items', value: '3 × Sensor kit, 1 × Charging dock' },
  { term: 'Total', value: '$1,284.00' },
  { term: 'Ship to', value: '41 Harbour Road, Bristol BS1 5TY' },
];

export default function SideInspector() {
  const titleId = useId();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Order #10482</Button>
      </DrawerTrigger>
      <DrawerContent aria-labelledby={titleId} style={{ width: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Order #10482</Heading>
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
        <div style={{ marginBlockStart: 'var(--spacing-4)' }}>
          <Badge variant='warning' size='sm'>Awaiting payment</Badge>
        </div>
        <dl style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 'var(--spacing-12) 0 0' }}>
          {details.map((detail) => (
            <div key={detail.term} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <dt><Text size={2} style={{ color: 'var(--label-secondary)' }}>{detail.term}</Text></dt>
              <dd style={{ margin: 0 }}><Text size={3}>{detail.value}</Text></dd>
            </div>
          ))}
        </dl>
      </DrawerContent>
    </Drawer>
  );
}
```
<!-- /example -->

## Короткая форма

Когда использовать:

- Небольшой сценарий редактирования или приглашения должен оставаться привязанным к странице.

Заметки по композиции:

- Держите действия доступными внизу.
- Не позволяйте короткой форме незаметно разрастись в полностраничный сценарий.

Компромиссы:

- Прерывает работу меньше, чем диалог.
- Её проще перегрузить содержимым.

<!-- example: drawer/short-form-flow.tsx -->
```tsx
import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  Text,
  TextArea,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function ShortFormFlow() {
  const titleId = useId();
  const emailsId = useId();
  const emailsHintId = useId();
  const messageId = useId();
  const [invited, setInvited] = useState<string[]>([]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const emails = String(data.get('emails')).split(',').map((email) => email.trim());

    setInvited([...invited, ...emails]);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Invite members</Button>
        </DrawerTrigger>
        <DrawerContent aria-labelledby={titleId} style={{ width: 420 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Invite members</Heading>
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
          <form method='dialog' onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-8)', marginBlockStart: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={emailsId}>Emails</Label>
              <TextField>
                <TextFieldInput
                  id={emailsId}
                  name='emails'
                  type='email'
                  multiple
                  required
                  autoFocus
                  placeholder='maria@northwind.dev, tom@northwind.dev'
                  aria-describedby={emailsHintId}
                />
              </TextField>
              <HelperText id={emailsHintId}>Separate several addresses with commas.</HelperText>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={messageId}>Personal note (optional)</Label>
              <TextArea id={messageId} name='message' rows={3} fullWidth />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-4)' }}>
              <DrawerClose asChild>
                <Button type='button' variant='secondary' appearance='ghost'>Cancel</Button>
              </DrawerClose>
              <Button type='submit'>Send invites</Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>
      <Text size={2} style={{ minHeight: '1lh', textAlign: 'center', overflowWrap: 'anywhere', color: 'var(--label-secondary)' }}>
        {invited.length > 0 ? `Pending invites: ${invited.join(', ')}` : ''}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Панель активности

Когда использовать:

- Содержимое длинное и второстепенное.

Заметки по композиции:

- Используйте внутреннюю прокрутку.
- Заголовок и действия должны оставаться на месте, пока прокручивается тело.

Компромиссы:

- Хорошо подходит для логов и таймлайнов.
- Требует тщательной проверки на разных вьюпортах.

<!-- example: drawer/activity-panel.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const people = ['Maria Chen', 'Tom Okafor', 'Lea Novak', 'Sam Rivera'];
const actions = ['commented on Homepage hero', 'moved Pricing table to Review', 'uploaded 3 files', 'resolved a thread', 'changed the due date'];

const events = Array.from({ length: 60 }, (_, index) => ({
  id: index,
  who: people[index % people.length],
  what: actions[(index * 2) % actions.length],
  when: index < 6 ? `${(index + 1) * 9} min ago` : `${Math.floor(index / 6)} d ago`,
}));

export default function ActivityPanel() {
  const titleId = useId();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Activity</Button>
      </DrawerTrigger>
      <DrawerContent fullHeight aria-labelledby={titleId} style={{ width: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Activity</Heading>
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
        <ol
          tabIndex={0}
          aria-label='Recent activity'
          style={{
            display: 'grid',
            gap: 'var(--spacing-8)',
            flex: 1,
            minHeight: 0,
            overflow: 'auto',
            overscrollBehavior: 'contain',
            margin: 'var(--spacing-8) 0 0',
            padding: 0,
            listStyle: 'none',
          }}
        >
          {events.map((event) => (
            <li key={event.id} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <Text size={3}><b>{event.who}</b> {event.what}</Text>
              <Text size={2} style={{ color: 'var(--label-secondary)' }}>{event.when}</Text>
            </li>
          ))}
        </ol>
      </DrawerContent>
    </Drawer>
  );
}
```
<!-- /example -->
