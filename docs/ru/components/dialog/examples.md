# Dialog: примеры

## Базовый

### Базовый: подтверждение удаления файла

Кнопки «Отмена» и «Удалить» лежат в `<form method="dialog">`, поэтому любая из них закрывает диалог, а её `value` становится `returnValue` диалога. Страница читает его в `onClose`, после анимации закрытия, и только тогда удаляет файл; `Escape` и кнопка закрытия оставляют `returnValue` пустым.

<!-- example: dialog/confirm-action.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
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

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function ConfirmAction() {
  const titleId = useId();
  const descriptionId = useId();
  const [deleted, setDeleted] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        minHeight: 72,
        padding: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {deleted ? (
        <>
          <Text size={3} role='status' style={{ color: 'var(--label-secondary)' }}>Q3 board deck.pdf moved to trash.</Text>
          <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setDeleted(false)}>Undo</Button>
        </>
      ) : (
        <>
          <div style={{ display: 'grid', minWidth: 0 }}>
            <Text size={3} fontWeight={500}>Q3 board deck.pdf</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>4.2 MB · Edited yesterday</Text>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size='sm' variant='secondary' appearance='ghost'>Delete</Button>
            </DialogTrigger>
            <DialogContent
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              onClose={(event) => setDeleted(event.currentTarget.returnValue === 'delete')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
                <Heading id={titleId} as='h2' size={4} fontWeight={600}>Delete Q3 board deck.pdf?</Heading>
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
              <Text id={descriptionId} size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
                The file stays in trash for 30 days. Shared links stop working right away.
              </Text>
              <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
                <Button type='submit' value='cancel' variant='secondary' appearance='ghost'>Cancel</Button>
                <Button type='submit' value='delete' style={destructive}>Delete file</Button>
              </form>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: один диалог для многих строк

Каждая строка открывает один и тот же контролируемый диалог со своим счётом. Родитель владеет и `open`, и выбранной строкой, а нативный `<dialog>` возвращает фокус на кнопку, которая его открыла.

<!-- example: dialog/controlled-open-state.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const invoices = [
  { number: 'INV-2041', customer: 'Acme Logistics', amount: '$12,480.00', due: 'Nov 14, 2026' },
  { number: 'INV-2042', customer: 'Blue Harbor Cafe', amount: '$860.50', due: 'Nov 21, 2026' },
  { number: 'INV-2043', customer: 'Kestrel Robotics', amount: '$4,125.00', due: 'Dec 1, 2026' },
];

export default function ControlledOpenState() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(invoices[0]);

  const openInvoice = (invoice: typeof invoices[number]) => {
    setSelected(invoice);
    setOpen(true);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <ul
        style={{
          display: 'grid',
          margin: 0,
          padding: 'var(--spacing-2) var(--spacing-8)',
          listStyle: 'none',
          background: 'var(--surface-primary)',
          border: '1px solid var(--separator-opaque)',
          borderRadius: 'var(--radius-5)',
        }}
      >
        {invoices.map((invoice, index) => (
          <li
            key={invoice.number}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--spacing-6)',
              paddingBlock: 'var(--spacing-5)',
              borderBlockStart: index > 0 ? '1px solid var(--separator-opaque)' : undefined,
            }}
          >
            <div style={{ display: 'grid', minWidth: 0 }}>
              <Text size={3} fontWeight={500}>{invoice.customer}</Text>
              <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{invoice.number} · {invoice.amount}</Text>
            </div>
            <Button size='sm' variant='secondary' appearance='ghost' onClick={() => openInvoice(invoice)}>View</Button>
          </li>
        ))}
      </ul>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Dialog: {open ? `open, showing ${selected.number}` : 'closed'}
      </Text>

      <Dialog open={open} onChangeOpen={setOpen}>
        <DialogContent aria-labelledby={titleId}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>{selected.number}</Heading>
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
          <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--spacing-4) var(--spacing-12)', margin: 'var(--spacing-8) 0 0' }}>
            <dt><Text size={3} style={{ color: 'var(--label-secondary)' }}>Customer</Text></dt>
            <dd style={{ margin: 0 }}><Text size={3}>{selected.customer}</Text></dd>
            <dt><Text size={3} style={{ color: 'var(--label-secondary)' }}>Amount</Text></dt>
            <dd style={{ margin: 0 }}><Text size={3} style={{ fontVariantNumeric: 'tabular-nums' }}>{selected.amount}</Text></dd>
            <dt><Text size={3} style={{ color: 'var(--label-secondary)' }}>Due</Text></dt>
            <dd style={{ margin: 0 }}><Text size={3}>{selected.due}</Text></dd>
          </dl>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```
<!-- /example -->

### Контролируемый/с состоянием: диалог не закрывается, пока есть несохранённые изменения

Каждый запрос на закрытие (`Escape`, кнопка закрытия, «Отмена») проходит через `onChangeOpen(false)`. Пока в заметке есть несохранённые правки, родитель отвечает на первый запрос предупреждением, а не закрытием; второй запрос отбрасывает черновик.

<!-- example: dialog/unsaved-changes-guard.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  Text,
  TextArea,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function UnsavedChangesGuard() {
  const titleId = useId();
  const fieldId = useId();
  const warningId = useId();
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState('Call back after the Friday standup.');
  const [draft, setDraft] = useState(saved);
  const [confirming, setConfirming] = useState(false);

  const dirty = draft !== saved;

  const changeOpen = (next: boolean) => {
    if (next) {
      setDraft(saved);
      setConfirming(false);
      setOpen(true);
      return;
    }
    if (dirty && !confirming) {
      setConfirming(true);
      return;
    }
    setOpen(false);
  };

  const save = () => {
    setSaved(draft);
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
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Note for Maria Chen</Text>
        <Text size={3} style={{ overflowWrap: 'anywhere' }}>{saved}</Text>
      </div>
      <Dialog open={open} onChangeOpen={changeOpen}>
        <DialogTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost'>Edit</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={titleId}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Note for Maria Chen</Heading>
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
          <div style={{ display: 'grid', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-8)' }}>
            <Label htmlFor={fieldId}>Note</Label>
            <TextArea
              id={fieldId}
              rows={4}
              fullWidth
              value={draft}
              aria-describedby={confirming ? warningId : undefined}
              onChange={(event) => {
                setDraft(event.currentTarget.value);
                setConfirming(false);
              }}
            />
            {confirming && (
              <HelperText id={warningId} role='status'>You have unsaved changes. Close again to discard them.</HelperText>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
            <DialogClose asChild>
              <Button variant='secondary' appearance='ghost'>{confirming ? 'Discard' : 'Cancel'}</Button>
            </DialogClose>
            <Button disabled={!dirty} onClick={save}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: форма переименования с нативной валидацией

`<form method="dialog">` с полями `required` и `pattern`: браузер не пропускает невалидную отправку, а валидная вызывает `onSubmit` (значения читаются через `FormData`) и затем закрывает диалог. «Отмена» — это `DialogClose` вокруг кнопки с `type="button"`, поэтому она не отправляет форму.

<!-- example: dialog/form-in-modal.tsx -->
```tsx
import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
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

export default function FormInModal() {
  const titleId = useId();
  const nameId = useId();
  const slugId = useId();
  const slugHintId = useId();
  const [project, setProject] = useState({ name: 'Mobile banking app', slug: 'mobile-banking' });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    setProject({ name: String(data.get('name')), slug: String(data.get('slug')) });
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
        <Text size={3} fontWeight={500} style={{ overflowWrap: 'anywhere' }}>{project.name}</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>vega.app/{project.slug}</Text>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost'>Rename</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={titleId}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Rename project</Heading>
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
          <form method='dialog' onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-8)', marginBlockStart: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={nameId}>Project name</Label>
              <TextField>
                <TextFieldInput id={nameId} name='name' defaultValue={project.name} required maxLength={60} autoFocus />
              </TextField>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={slugId}>URL</Label>
              <TextField>
                <TextFieldInput
                  id={slugId}
                  name='slug'
                  defaultValue={project.slug}
                  required
                  pattern='[a-z0-9-]+'
                  aria-describedby={slugHintId}
                />
              </TextField>
              <HelperText id={slugHintId}>Lowercase letters, digits and hyphens.</HelperText>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-4)' }}>
              <DialogClose asChild>
                <Button type='button' variant='secondary' appearance='ghost'>Cancel</Button>
              </DialogClose>
              <Button type='submit'>Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: ошибка серверной проверки

Если проверка происходит после отправки, используйте обычную форму и закрывайте диалог сами: `onSubmit` отменяет действие по умолчанию, ждёт проверку и либо показывает ошибку, связанную через `aria-describedby` и `aria-invalid`, либо ставит `open` в `false`. Отправьте предзаполненный адрес — он уже занят. Правка поля сбрасывает ошибку.

<!-- example: dialog/server-validation-error.tsx -->
```tsx
import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
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

const takenEmails = ['ada@northwind.dev', 'grace@northwind.dev'];

const checkEmail = (email: string) => new Promise<boolean>((resolve) => {
  setTimeout(() => resolve(!takenEmails.includes(email.toLowerCase())), 600);
});

export default function ServerValidationError() {
  const titleId = useId();
  const emailId = useId();
  const errorId = useId();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('linus@northwind.dev');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const changeOpen = (next: boolean) => {
    setError('');
    setOpen(next);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = String(new FormData(event.currentTarget).get('email'));

    setPending(true);
    const available = await checkEmail(next);
    setPending(false);

    if (!available) {
      setError(`${next} already belongs to another account.`);
      return;
    }
    setEmail(next);
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
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Sign-in email</Text>
        <Text size={3} fontWeight={500} style={{ overflowWrap: 'anywhere' }}>{email}</Text>
      </div>
      <Dialog open={open} onChangeOpen={changeOpen}>
        <DialogTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost'>Change</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={titleId}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Change sign-in email</Heading>
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
          <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-8)' }}>
            <Label htmlFor={emailId}>New email</Label>
            <TextField error={error !== ''}>
              <TextFieldInput
                id={emailId}
                name='email'
                type='email'
                defaultValue='grace@northwind.dev'
                required
                aria-invalid={error !== ''}
                aria-describedby={error ? errorId : undefined}
                onChange={() => setError('')}
              />
            </TextField>
            {error && <HelperText id={errorId} error>{error}</HelperText>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-9)' }}>
              <DialogClose asChild>
                <Button type='button' variant='secondary' appearance='ghost'>Cancel</Button>
              </DialogClose>
              <Button type='submit' disabled={pending} style={{ minWidth: '11ch' }}>{pending ? 'Checking…' : 'Save email'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: необратимое действие отключено, пока не введено имя

Кнопка «Удалить» отключена, пока поле не совпадёт с именем рабочего пространства, поэтому ни клик, ни `Enter` в поле не подтвердят действие случайно. «Отмена» не является кнопкой отправки, так что `Enter` её тоже не нажмёт.

<!-- example: dialog/type-to-confirm.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const workspace = 'northwind-studio';

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function TypeToConfirm() {
  const titleId = useId();
  const descriptionId = useId();
  const fieldId = useId();
  const [typed, setTyped] = useState('');

  const confirmed = typed === workspace;

  return (
    <Dialog onChangeOpen={() => setTyped('')}>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Delete workspace</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId} aria-describedby={descriptionId}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Delete {workspace}?</Heading>
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
        <Text id={descriptionId} size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
          This permanently deletes 14 projects, 312 files and the billing history. Members lose access immediately.
        </Text>
        <form method='dialog' style={{ display: 'grid', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-10)' }}>
          <Label htmlFor={fieldId}>Type <b>{workspace}</b> to confirm</Label>
          <TextField>
            <TextFieldInput
              id={fieldId}
              value={typed}
              autoComplete='off'
              spellCheck={false}
              onChange={(event) => setTyped(event.currentTarget.value)}
            />
          </TextField>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-9)' }}>
            <DialogClose asChild>
              <Button type='button' variant='secondary' appearance='ghost'>Cancel</Button>
            </DialogClose>
            <Button type='submit' value='delete' disabled={!confirmed} style={confirmed ? destructive : undefined}>Delete workspace</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: длинное прокручиваемое содержимое

Прокручивается только список: у него `max-height`, `overflow: auto` и `overscroll-behavior: contain`, а заголовок и кнопка «Готово» остаются на месте. Прокручиваемый список фокусируемый и имеет имя, поэтому его можно прокрутить и с клавиатуры.

<!-- example: dialog/scrollable-content-dialog.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import {
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

const people = ['Ada Lovelace', 'Grace Hopper', 'Linus Torvalds', 'Margaret Hamilton', 'Alan Kay'];
const actions = ['changed the plan to Pro', 'invited a member', 'exported invoices', 'rotated the API key', 'updated billing details'];

const events = Array.from({ length: 40 }, (_, index) => {
  const minutes = 18 * 60 + 55 - index * 7;
  const time = `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`;

  return { id: index, time, text: `${people[index % people.length]} ${actions[(index * 3) % actions.length]}` };
});

export default function ScrollableContentDialog() {
  const titleId = useId();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Activity log</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Activity log</Heading>
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
        <ol
          tabIndex={0}
          aria-label='Events, newest first'
          style={{
            display: 'grid',
            gap: 'var(--spacing-6)',
            maxHeight: '50vh',
            overflow: 'auto',
            overscrollBehavior: 'contain',
            margin: 'var(--spacing-8) 0 0',
            paddingBlock: 'var(--spacing-6)',
            paddingInline: 0,
            borderBlock: '1px solid var(--separator-opaque)',
            listStyle: 'none',
          }}
        >
          {events.map((event) => (
            <li key={event.id} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-6)' }}>
              <Text size={2} style={{ flexShrink: 0, minWidth: '5ch', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{event.time}</Text>
              <Text size={3}>{event.text}</Text>
            </li>
          ))}
        </ol>
        <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', marginBlockStart: 'var(--spacing-12)' }}>
          <Button type='submit'>Done</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

### Отключённый: диалог, открытый из меню в поповере

Пункт меню в одном обработчике закрывает поповер и открывает контролируемый диалог. К закрытию диалога пункта меню уже нет в DOM, поэтому `onClose` возвращает фокус на триггер меню.

<!-- example: dialog/opened-from-popover-menu.tsx -->
```tsx
import { useId, useRef, useState, type CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  Heading,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';
import { EllipsisIcon, XIcon } from '@vega-ui/icons';

export default function OpenedFromPopoverMenu() {
  const titleId = useId();
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [archived, setArchived] = useState(false);

  const openArchiveDialog = () => {
    setMenuOpen(false);
    setDialogOpen(true);
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
        <Text size={3} fontWeight={500}>Website redesign</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>{archived ? 'Archived · read-only' : '12 tasks · updated today'}</Text>
      </div>
      <Popover placement='bottom-end' open={menuOpen} onChangeOpen={setMenuOpen}>
        <PopoverTrigger asChild ref={menuTrigger}>
          <IconButton aria-label='Project actions' variant='secondary' appearance='ghost'>
            <Icon><EllipsisIcon /></Icon>
          </IconButton>
        </PopoverTrigger>
        <PopoverContent style={{ padding: 'var(--spacing-2)' }}>
          <div style={{ display: 'grid', minWidth: 160 }}>
            <Button appearance='transparent' variant='secondary' style={{ justifyContent: 'flex-start' }} onClick={() => setMenuOpen(false)}>Duplicate</Button>
            <Button appearance='transparent' variant='secondary' style={{ justifyContent: 'flex-start' }} onClick={openArchiveDialog} disabled={archived}>Archive…</Button>
          </div>
        </PopoverContent>
      </Popover>

      <Dialog open={dialogOpen} onChangeOpen={setDialogOpen}>
        <DialogContent aria-labelledby={titleId} onClose={() => menuTrigger.current?.focus()}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Archive Website redesign?</Heading>
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
          <Text size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
            Archived projects are read-only and hidden from the sidebar.
          </Text>
          <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
            <Button type='submit' value='cancel' variant='secondary' appearance='ghost'>Cancel</Button>
            <Button type='submit' value='archive' onClick={() => setArchived(true)}>Archive</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: вложенный шаг подтверждения

Диалог участника открывает диалог подтверждения из своего содержимого. `Escape` закрывает только верхний; подтверждение закрывает оба, потому что обработчик ещё и ставит внешнему `open` значение `false`.

<!-- example: dialog/nested-confirm-step.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
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

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function NestedConfirmStep() {
  const memberTitleId = useId();
  const confirmTitleId = useId();
  const [memberOpen, setMemberOpen] = useState(false);
  const [removed, setRemoved] = useState(false);

  const remove = () => {
    setRemoved(true);
    setMemberOpen(false);
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
        <Text size={3} fontWeight={500}>Grace Hopper</Text>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
          {removed ? 'Removed from the team' : 'Admin · grace@northwind.dev'}
        </Text>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        {removed && <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setRemoved(false)}>Undo</Button>}
        <Dialog open={memberOpen} onChangeOpen={setMemberOpen}>
          <DialogTrigger asChild>
            <Button size='sm' variant='secondary' appearance='ghost'>Manage</Button>
          </DialogTrigger>
          <DialogContent aria-labelledby={memberTitleId}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
              <Heading id={memberTitleId} as='h2' size={4} fontWeight={600}>Grace Hopper</Heading>
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
            <Text size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
              grace@northwind.dev · Admin since March 2024
            </Text>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='secondary' appearance='ghost'>Remove from team…</Button>
                </DialogTrigger>
                <DialogContent aria-labelledby={confirmTitleId}>
                  <Heading id={confirmTitleId} as='h2' size={4} fontWeight={600}>Remove Grace Hopper?</Heading>
                  <Text size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
                    She loses access to all team projects. Her files stay in the workspace.
                  </Text>
                  <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
                    <Button type='submit' value='cancel' variant='secondary' appearance='ghost'>Keep</Button>
                    <Button type='submit' value='remove' style={destructive} onClick={remove}>Remove</Button>
                  </form>
                </DialogContent>
              </Dialog>
              <DialogClose asChild>
                <Button>Done</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: диалог, который закрывается только своими действиями

С `closedBy='none'` ни `Escape`, ни клик по подложке не закрывают диалог, поэтому кнопки закрытия тоже нет: выйти можно только одним из двух ответов. `autoFocus` ставит фокус на безопасный ответ, а выбранный `returnValue` показан под триггером.

<!-- example: dialog/blocking-dialog.tsx -->
```tsx
import { useId, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Heading,
  Text,
} from '@vega-ui/react';

export default function BlockingDialog() {
  const titleId = useId();
  const descriptionId = useId();
  const [choice, setChoice] = useState('');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Simulate session timeout</Button>
        </DialogTrigger>
        <DialogContent
          closedBy='none'
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          onClose={(event) => setChoice(event.currentTarget.returnValue)}
        >
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Your session is about to expire</Heading>
          <Text id={descriptionId} size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
            You have been inactive for 25 minutes. Unsaved changes in the editor will be lost when you sign out.
          </Text>
          <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
            <Button type='submit' value='sign-out' variant='secondary' appearance='ghost'>Sign out</Button>
            <Button type='submit' value='stay' autoFocus>Stay signed in</Button>
          </form>
        </DialogContent>
      </Dialog>
      <Text size={2} style={{ color: 'var(--label-secondary)', minHeight: '1lh' }}>{choice ? `returnValue: ${choice}` : ''}</Text>
    </div>
  );
}
```
<!-- /example -->
