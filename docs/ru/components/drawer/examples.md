# Drawer: примеры

## Базовый

### Базовый: инспектор заказа

Панель показывает подробности одной записи рядом со страницей. Заголовок даёт ей имя через `aria-labelledby`, круглая кнопка закрытия стоит в верхнем конечном углу; ещё её закрывают клик по подложке, `Escape` и свайп к краю на сенсорном экране.

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

## Контролируемый/с состоянием

### Контролируемый/с состоянием: одна панель для списка с переходом вперёд и назад

Родитель владеет `open` и выбранным обращением, поэтому любая строка открывает одну и ту же панель, а стрелки внутри листают список, не закрывая её. `aria-current` отмечает показанную строку.

<!-- example: drawer/controlled-open-state.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { ChevronDownIcon, ChevronUpIcon, XIcon } from '@vega-ui/icons';

const tickets = [
  { id: 'SUP-311', title: 'Export to CSV times out', requester: 'Maria Chen', priority: 'High' },
  { id: 'SUP-312', title: 'Invoice shows the wrong VAT number', requester: 'Tom Okafor', priority: 'Medium' },
  { id: 'SUP-313', title: 'Cannot invite members with a + in the email', requester: 'Lea Novak', priority: 'High' },
  { id: 'SUP-314', title: 'Dark mode resets after sign in', requester: 'Sam Rivera', priority: 'Low' },
];

export default function ControlledOpenState() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const ticket = tickets[index];

  const openTicket = (next: number) => {
    setIndex(next);
    setOpen(true);
  };

  return (
    <div
      style={{
        display: 'grid',
        boxSizing: 'border-box',
        width: '100%',
        padding: 'var(--spacing-2)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {tickets.map((item, itemIndex) => (
        <Button
          key={item.id}
          variant='secondary'
          appearance={open && itemIndex === index ? 'ghost' : 'transparent'}
          aria-current={open && itemIndex === index ? 'true' : undefined}
          style={{ justifyContent: 'flex-start', gap: 'var(--spacing-4)', minWidth: 0 }}
          onClick={() => openTicket(itemIndex)}
        >
          <span style={{ flexShrink: 0, color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{item.id}</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</span>
        </Button>
      ))}

      <Drawer open={open} onChangeOpen={setOpen}>
        <DrawerContent aria-labelledby={titleId} style={{ width: 380 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{ticket.id} · {index + 1} of {tickets.length}</Text>
              <Heading id={titleId} as='h2' size={4} fontWeight={600}>{ticket.title}</Heading>
            </div>
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
          <Text size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>Requested by {ticket.requester} · {ticket.priority} priority</Text>
          <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBlockStart: 'auto', paddingBlockStart: 'var(--spacing-12)' }}>
            <IconButton aria-label='Previous ticket' variant='secondary' appearance='ghost' disabled={index === 0} onClick={() => setIndex(index - 1)}>
              <Icon><ChevronUpIcon /></Icon>
            </IconButton>
            <IconButton aria-label='Next ticket' variant='secondary' appearance='ghost' disabled={index === tickets.length - 1} onClick={() => setIndex(index + 1)}>
              <Icon><ChevronDownIcon /></Icon>
            </IconButton>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: форма приглашения с нативной валидацией

`<form method="dialog">` с `type="email" multiple required`: браузер проверяет адреса, а валидная отправка читает их через `FormData` в `onSubmit` и закрывает панель. Под триггером страница показывает отправленные приглашения.

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

## Раскладка/оверлей

### Раскладка/оверлей: длинный прокручиваемый список

С `fullHeight` панель занимает всю высоту окна, а прокручивается только список: он забирает оставшееся место через `flex: 1` и `min-height: 0`, а `overscroll-behavior: contain` не пускает его прокрутку на страницу.

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

### Раскладка/оверлей: панель без подложки

`overlay={false}` и `blurred={false}` оставляют страницу видимой за инспектором, прижатым к верхнему конечному углу через `position='end-start'`. Панель при этом остаётся модальной: страница за ней неактивна, пока она не закроется.

<!-- example: drawer/drawer-without-overlay.tsx -->
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

const metrics = [
  { label: 'Source', value: 'Warehouse · orders_daily' },
  { label: 'Refresh', value: 'Every 15 minutes' },
  { label: 'Last updated', value: '14:45 UTC' },
  { label: 'Owner', value: 'Data team' },
];

export default function DrawerWithoutOverlay() {
  const titleId = useId();

  return (
    <Drawer position='end-start'>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Inspect revenue widget</Button>
      </DrawerTrigger>
      <DrawerContent shadowed overlay={false} blurred={false} aria-labelledby={titleId} style={{ width: 320 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Revenue widget</Heading>
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
        <dl style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 'var(--spacing-8) 0 0' }}>
          {metrics.map((metric) => (
            <div key={metric.label} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <dt><Text size={2} style={{ color: 'var(--label-secondary)' }}>{metric.label}</Text></dt>
              <dd style={{ margin: 0 }}><Text size={3}>{metric.value}</Text></dd>
            </div>
          ))}
        </dl>
      </DrawerContent>
    </Drawer>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: невалидный IBAN в форме внутри панели

Проверка идёт при отправке, поэтому у формы `noValidate`, а панель контролируемая: невалидный IBAN оставляет её открытой и показывает ошибку, связанную через `aria-describedby` и `aria-invalid`, валидный сохраняется и закрывает её. Измените цифру в предзаполненном IBAN, чтобы увидеть ошибку.

<!-- example: drawer/form-error.tsx -->
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
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const isValidIban = (value: string) => {
  const iban = value.replace(/\s/g, '').toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban)) return false;

  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const digits = rearranged.replace(/[A-Z]/g, (letter) => String(letter.charCodeAt(0) - 55));
  let remainder = 0;

  for (const digit of digits) {
    remainder = (remainder * 10 + Number(digit)) % 97;
  }

  return remainder === 1;
};

export default function FormError() {
  const titleId = useId();
  const ibanId = useId();
  const errorId = useId();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [payout, setPayout] = useState('Not set');

  const changeOpen = (next: boolean) => {
    setError('');
    setOpen(next);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const iban = String(new FormData(event.currentTarget).get('iban'));

    if (!isValidIban(iban)) {
      setError('This IBAN is not valid. Check the country code and the digits.');
      return;
    }
    setPayout(iban);
    setOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        padding: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <div style={{ display: 'grid', minWidth: 0 }}>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Payout account</Text>
        <Text size={3} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums', overflowWrap: 'anywhere' }}>{payout}</Text>
      </div>
      <Drawer open={open} onChangeOpen={changeOpen}>
        <DrawerTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost'>Edit</Button>
        </DrawerTrigger>
        <DrawerContent aria-labelledby={titleId} style={{ width: 420 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Payout account</Heading>
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
          <form noValidate onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-8)' }}>
            <Label htmlFor={ibanId}>IBAN</Label>
            <TextField error={error !== ''}>
              <TextFieldInput
                id={ibanId}
                name='iban'
                defaultValue='DE89 3704 0044 0532 0130 01'
                autoComplete='off'
                aria-invalid={error !== ''}
                aria-describedby={error ? errorId : undefined}
                onChange={() => setError('')}
              />
            </TextField>
            {error && <HelperText id={errorId} error>{error}</HelperText>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-9)' }}>
              <DrawerClose asChild>
                <Button type='button' variant='secondary' appearance='ghost'>Cancel</Button>
              </DrawerClose>
              <Button type='submit'>Save</Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: настройки только для чтения для не-администраторов

`<Fieldset disabled>` разом отключает все поля и кнопку «Сохранить» внутри, а `aria-describedby` на fieldset объясняет причину. Отметьте чекбокс, чтобы увидеть ту же панель глазами администратора.

<!-- example: drawer/read-only-settings.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Fieldset,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function ReadOnlySettings() {
  const titleId = useId();
  const nameId = useId();
  const domainId = useId();
  const noteId = useId();
  const [canEdit, setCanEdit] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'center', width: '100%' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput checked={canEdit} onChange={(event) => setCanEdit(event.currentTarget.checked)} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Signed in as a workspace admin
      </Checkbox>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Workspace settings</Button>
        </DrawerTrigger>
        <DrawerContent aria-labelledby={titleId} style={{ width: 400 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Workspace settings</Heading>
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
          <form method='dialog' style={{ display: 'grid', gap: 'var(--spacing-8)', marginBlockStart: 'var(--spacing-8)' }}>
            {!canEdit && <HelperText id={noteId}>Only workspace admins can change these settings.</HelperText>}
            <Fieldset disabled={!canEdit} aria-describedby={canEdit ? undefined : noteId} style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 0 }}>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor={nameId}>Workspace name</Label>
                <TextField>
                  <TextFieldInput id={nameId} name='name' defaultValue='Northwind Studio' />
                </TextField>
              </div>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor={domainId}>Allowed email domain</Label>
                <TextField>
                  <TextFieldInput id={domainId} name='domain' defaultValue='northwind.dev' />
                </TextField>
              </div>
              <Button type='submit' style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-4)' }}>Save</Button>
            </Fieldset>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: панель внутри панели

Форма адреса открывается во второй панели поверх заказа. `Escape` и подложка закрывают только верхнюю, а сохранение адреса возвращает к заказу с новым значением.

<!-- example: drawer/nested-drawers.tsx -->
```tsx
import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function NestedDrawers() {
  const orderTitleId = useId();
  const addressTitleId = useId();
  const streetId = useId();
  const cityId = useId();
  const [address, setAddress] = useState({ street: '41 Harbour Road', city: 'Bristol' });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    setAddress({ street: String(data.get('street')), city: String(data.get('city')) });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Order #10482</Button>
      </DrawerTrigger>
      <DrawerContent aria-labelledby={orderTitleId} style={{ width: 420 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={orderTitleId} as='h2' size={4} fontWeight={600}>Order #10482</Heading>
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)', marginBlockStart: 'var(--spacing-8)' }}>
          <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>Ship to</Text>
            <Text size={3}>{address.street}, {address.city}</Text>
          </div>
          <Drawer>
            <DrawerTrigger asChild>
              <Button size='sm' variant='secondary' appearance='ghost'>Change</Button>
            </DrawerTrigger>
            <DrawerContent aria-labelledby={addressTitleId} style={{ width: 360 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
                <Heading id={addressTitleId} as='h3' size={4} fontWeight={600}>Shipping address</Heading>
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
                  <Label htmlFor={streetId}>Street</Label>
                  <TextField>
                    <TextFieldInput id={streetId} name='street' defaultValue={address.street} required autoComplete='street-address' />
                  </TextField>
                </div>
                <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                  <Label htmlFor={cityId}>City</Label>
                  <TextField>
                    <TextFieldInput id={cityId} name='city' defaultValue={address.city} required autoComplete='address-level2' />
                  </TextField>
                </div>
                <Button type='submit' style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-4)' }}>Save address</Button>
              </form>
            </DrawerContent>
          </Drawer>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```
<!-- /example -->

### Пограничный случай: начальная сторона в тексте справа налево

`position='start'` следует направлению письма `DrawerContent`, как логические свойства CSS. Панель рендерится в `document.body`, поэтому берёт `dir` оттуда или из собственного пропа `dir`: здесь кнопка переключает её на арабский, и панель выезжает справа.

<!-- example: drawer/drawer-from-the-start-side.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const sections = {
  ltr: { title: 'Navigation', links: ['Inbox', 'Projects', 'Reports', 'Settings'], toggle: 'Switch to right-to-left' },
  rtl: { title: 'التنقل', links: ['البريد الوارد', 'المشاريع', 'التقارير', 'الإعدادات'], toggle: 'Switch to left-to-right' },
};

export default function DrawerFromTheStartSide() {
  const titleId = useId();
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');
  const [current, setCurrent] = useState(1);

  const section = sections[dir];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--spacing-4)', width: '100%' }}>
      <Drawer position='start'>
        <DrawerTrigger asChild>
          <Button>Open navigation</Button>
        </DrawerTrigger>
        <DrawerContent dir={dir} fullHeight aria-labelledby={titleId} style={{ width: 280 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>{section.title}</Heading>
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
          <nav aria-labelledby={titleId} style={{ display: 'grid', gap: 'var(--spacing-1)', marginBlockStart: 'var(--spacing-8)' }}>
            {section.links.map((link, index) => (
              <DrawerClose asChild key={link}>
                <Button
                  variant='secondary'
                  appearance={index === current ? 'ghost' : 'transparent'}
                  aria-current={index === current ? 'page' : undefined}
                  style={{ justifyContent: 'flex-start' }}
                  onClick={() => setCurrent(index)}
                >
                  {link}
                </Button>
              </DrawerClose>
            ))}
          </nav>
        </DrawerContent>
      </Drawer>
      <Button variant='secondary' appearance='ghost' onClick={() => setDir(dir === 'ltr' ? 'rtl' : 'ltr')}>{section.toggle}</Button>
    </div>
  );
}
```
<!-- /example -->
