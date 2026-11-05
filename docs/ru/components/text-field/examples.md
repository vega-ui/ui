# TextField: примеры

## Базовый

### Базовый: рабочий email с подсказкой

Видимый `Label` указывает на `TextFieldInput` через `htmlFor`, а подсказка связана через `aria-describedby`. Все атрибуты инпута — `type`, `name`, `autoComplete` — ставятся на `TextFieldInput`, а не на обёртку. Id берутся из `useId`, поэтому несколько полей на одной странице не конфликтуют.

<!-- example: text-field/work-email-field.tsx -->
```tsx
import { HelperText, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function WorkEmailField() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Work email</Label>
      <TextField>
        <TextFieldInput
          id={id}
          type='email'
          name='email'
          autoComplete='email'
          placeholder='maria.lopez@northwind.io'
          aria-describedby={hintId}
        />
      </TextField>
      <HelperText id={hintId}>Invoices and security alerts are sent here.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: счётчик символов в суффиксе

Значением владеет родитель, поэтому счётчик в суффиксе и превью ниже обновляются с каждым нажатием. `maxLength` останавливает ввод на лимите, а счётчик связан с инпутом через `aria-describedby`.

<!-- example: text-field/character-counter-suffix.tsx -->
```tsx
import { Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useId, useState } from 'react';

const MAX_LENGTH = 60;

export default function CharacterCounterSuffix() {
  const id = useId();
  const counterId = `${id}-counter`;
  const [title, setTitle] = useState('Q3 roadmap review');
  const remaining = MAX_LENGTH - title.length;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Meeting title</Label>
      <TextField>
        <TextFieldInput
          id={id}
          value={title}
          maxLength={MAX_LENGTH}
          aria-describedby={counterId}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <Text
          id={counterId}
          size={2}
          style={{ paddingInlineEnd: 'var(--spacing-6)', whiteSpace: 'nowrap', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}
        >
          {remaining} left
        </Text>
      </TextField>
      <Text size={2} style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>
        Calendar preview: {title.trim() === '' ? 'Untitled meeting' : title.trim()}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: форма профиля и FormData

Неконтролируемые инпуты с `name` и `defaultValue` читаются через `FormData` при отправке. `required` и `type='email'` включают нативную валидацию, а кнопка сброса возвращает значения по умолчанию.

<!-- example: text-field/profile-form-submit.tsx -->
```tsx
import { Button, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function ProfileFormSubmit() {
  const id = useId();
  const [saved, setSaved] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaved(`${data.get('fullName')} <${data.get('email')}>`);
  };

  return (
    <form
      onSubmit={onSubmit}
      onReset={() => setSaved('')}
      style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}
    >
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-name`}>Full name</Label>
        <TextField>
          <TextFieldInput id={`${id}-name`} name='fullName' autoComplete='name' defaultValue='Ada Lovelace' required />
        </TextField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-email`}>Email</Label>
        <TextField>
          <TextFieldInput id={`${id}-email`} name='email' type='email' autoComplete='email' required />
        </TextField>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-4)' }}>
        <Button type='submit'>Save profile</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{saved === '' ? '' : `Saved: ${saved}`}</Text>
    </form>
  );
}
```
<!-- /example -->

### Форма/интеграция: поиск с очисткой и отправкой

Форма с `role='search'`: иконка в начале, кнопка очистки, которая возвращает фокус в инпут, и кнопка отправки — всё внутри одного `TextField`. Видимого лейбла нет, поэтому у инпута есть `aria-label`.

<!-- example: text-field/search-with-clear-and-submit.tsx -->
```tsx
import type { CSSProperties, FormEvent } from 'react';
import { Button, Icon, IconButton, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { SearchIcon, XIcon } from '@vega-ui/icons';
import { useRef, useState } from 'react';
import './examples.css';

export default function SearchWithClearAndSubmit() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearched(query.trim());
  };

  const clear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <form role='search' onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <TextField>
        <Icon size='sm' aria-hidden style={{ flexShrink: 0, marginInlineStart: 'var(--spacing-6)', color: 'var(--label-secondary)' }}>
          <SearchIcon />
        </Icon>
        <TextFieldInput
          ref={inputRef}
          className='searchInput'
          type='search'
          name='q'
          aria-label='Search invoices'
          placeholder='Invoice or customer'
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
        {query !== '' && (
          <IconButton
            type='button'
            aria-label='Clear search'
            variant='secondary'
            appearance='ghost'
            onClick={clear}
            style={{ '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5, flexShrink: 0 } as CSSProperties}
          >
            <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
          </IconButton>
        )}
        <Button type='submit' size='sm' style={{ flexShrink: 0, marginInlineStart: 'var(--spacing-2)', marginInlineEnd: 'var(--spacing-3)' }}>Search</Button>
      </TextField>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>
        {searched === '' ? 'Showing all invoices' : `Results for “${searched}”`}
      </Text>
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: переименование в диалоге

Форма с `method='dialog'` закрывает диалог при отправке, а `onSubmit` читает новое имя через `FormData`. `autoFocus` ставит курсор в поле сразу после открытия диалога.

<!-- example: text-field/rename-in-dialog.tsx -->
```tsx
import type { CSSProperties, FormEvent } from 'react';
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
import { useId, useState } from 'react';

export default function RenameInDialog() {
  const id = useId();
  const [name, setName] = useState('Mobile app redesign');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const next = String(new FormData(event.currentTarget).get('projectName')).trim();
    if (next !== '') setName(next);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <Text size={3} fontWeight={500} style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</Text>
      <Dialog>
        <DialogTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost'>Rename</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={`${id}-title`} style={{ width: 'min(400px, 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={`${id}-title`} as='h2' size={4} fontWeight={600}>Rename project</Heading>
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
          <form method='dialog' onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={`${id}-name`}>Project name</Label>
              <TextField>
                <TextFieldInput id={`${id}-name`} name='projectName' defaultValue={name} maxLength={80} required autoFocus />
              </TextField>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
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

## Ошибка

### Ошибка: проверка email при потере фокуса и отправке

Ошибка появляется при потере фокуса или отправке и, пока видна, перепроверяется на каждое нажатие — поэтому исчезает, как только адрес становится корректным. `error` только красит обёртку; состояние до скринридера доносят `aria-invalid` и `aria-describedby` на инпуте.

<!-- example: text-field/email-validation-error.tsx -->
```tsx
import { Button, HelperText, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

const getEmailError = (value: string) => {
  if (value.trim() === '') return 'Enter an email address to send the invite.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Use the full address, like dana@northwind.io.';
  return '';
};

export default function EmailValidationError() {
  const id = useId();
  const messageId = `${id}-message`;
  const [email, setEmail] = useState('dana@northwind');
  const [error, setError] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(getEmailError(email));
  };

  const onChange = (value: string) => {
    setEmail(value);
    if (error !== '') setError(getEmailError(value));
  };

  const invalid = error !== '';

  return (
    <form noValidate onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Invite a teammate</Label>
        <TextField error={invalid}>
          <TextFieldInput
            id={id}
            type='email'
            value={email}
            aria-invalid={invalid}
            aria-describedby={messageId}
            onChange={(event) => onChange(event.currentTarget.value)}
            onBlur={() => setError(getEmailError(email))}
          />
        </TextField>
        <HelperText id={messageId} error={invalid}>
          {invalid ? error : 'We will email them a link to join the workspace.'}
        </HelperText>
      </div>
      <Button type='submit' style={{ justifySelf: 'start' }}>Send invite</Button>
    </form>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: только для чтения и отключённое поле

Поле только для чтения остаётся фокусируемым и отправляется с формой; отключённое пропускается фокусом и не попадает в `FormData`. Отправьте форму, чтобы увидеть, какие поля пришли.

<!-- example: text-field/read-only-and-disabled.tsx -->
```tsx
import { Button, HelperText, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function ReadOnlyAndDisabled() {
  const id = useId();
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const keys = Array.from(new FormData(event.currentTarget).keys());
    setSubmitted(keys.join(', '));
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-workspace`}>Workspace ID</Label>
        <TextField>
          <TextFieldInput
            id={`${id}-workspace`}
            name='workspaceId'
            defaultValue='ws_8f2c41d9'
            readOnly
            aria-describedby={`${id}-workspace-hint`}
          />
        </TextField>
        <HelperText id={`${id}-workspace-hint`}>Read-only: focusable, selectable and submitted.</HelperText>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-billing`}>Billing email</Label>
        <TextField>
          <TextFieldInput
            id={`${id}-billing`}
            name='billingEmail'
            defaultValue='finance@northwind.io'
            disabled
            aria-describedby={`${id}-billing-hint`}
          />
        </TextField>
        <HelperText id={`${id}-billing-hint`}>Disabled: only the account owner can change it. Not submitted.</HelperText>
      </div>
      <Button type='submit' style={{ justifySelf: 'start', marginBlockStart: 'var(--spacing-4)' }}>Submit</Button>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{submitted === '' ? '' : `Submitted fields: ${submitted}`}</Text>
    </form>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: асинхронная проверка доступности

Проверка запускается через 600 мс после последнего нажатия, а очистка эффекта отменяет устаревшие таймеры. Пока идёт проверка, в суффиксе крутится `Spinner`, а подсказка — вежливая live-область, поэтому результат озвучивается.

<!-- example: text-field/async-username-check.tsx -->
```tsx
import { HelperText, Icon, Label, Spinner, TextField, TextFieldInput } from '@vega-ui/react';
import { CheckIcon } from '@vega-ui/icons';
import { useEffect, useId, useState } from 'react';

const TAKEN = ['admin', 'support', 'maria', 'billing'];

interface CheckResult {
  username: string;
  available: boolean;
}

export default function AsyncUsernameCheck() {
  const id = useId();
  const statusId = `${id}-status`;
  const [username, setUsername] = useState('');
  const [result, setResult] = useState<CheckResult | null>(null);
  const normalized = username.trim().toLowerCase();

  useEffect(() => {
    if (normalized.length < 3) return;

    const timer = setTimeout(() => {
      setResult({ username: normalized, available: !TAKEN.includes(normalized) });
    }, 600);

    return () => clearTimeout(timer);
  }, [normalized]);

  const tooShort = normalized.length < 3;
  const checking = !tooShort && result?.username !== normalized;
  const taken = !tooShort && !checking && result?.available === false;
  const available = !tooShort && !checking && result?.available === true;

  let message = 'At least 3 characters. Try “maria” to see a taken name.';
  if (checking) message = 'Checking availability…';
  if (available) message = `@${normalized} is available.`;
  if (taken) message = `@${normalized} is already taken.`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Username</Label>
      <TextField error={taken}>
        <TextFieldInput
          id={id}
          value={username}
          autoComplete='username'
          spellCheck={false}
          aria-invalid={taken}
          aria-describedby={statusId}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
        <span style={{ display: 'flex', paddingInlineEnd: 'var(--spacing-6)' }}>
          {checking && <Spinner size={3} aria-label='Checking username' />}
          {available && <Icon size='sm' aria-hidden><CheckIcon /></Icon>}
        </span>
      </TextField>
      <HelperText id={statusId} error={taken} aria-live='polite'>{message}</HelperText>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: длинное значение между префиксом и суффиксом

Статичные аффиксы сохраняют ширину, а инпут сжимается (`minWidth: 0`) и прокручивает длинное значение. Аффиксы скрыты от скринридера, потому что подсказка проговаривает адрес целиком.

<!-- example: text-field/subdomain-prefix-suffix.tsx -->
```tsx
import { HelperText, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useId, useState } from 'react';

const affixStyle = {
  flexShrink: 0,
  whiteSpace: 'nowrap',
  color: 'var(--label-secondary)',
} as const;

export default function SubdomainPrefixSuffix() {
  const id = useId();
  const hintId = `${id}-hint`;
  const [subdomain, setSubdomain] = useState('northwind-traders-international-logistics');

  const onChange = (value: string) => {
    setSubdomain(value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Workspace address</Label>
      <TextField>
        <Text size={3} aria-hidden style={{ ...affixStyle, paddingInlineStart: 'var(--spacing-6)' }}>https://</Text>
        <TextFieldInput
          id={id}
          name='subdomain'
          value={subdomain}
          spellCheck={false}
          aria-describedby={hintId}
          onChange={(event) => onChange(event.currentTarget.value)}
          style={{ minWidth: 0, paddingInline: 'var(--spacing-1)' }}
        />
        <Text size={3} aria-hidden style={{ ...affixStyle, paddingInlineEnd: 'var(--spacing-6)' }}>.vega.app</Text>
      </TextField>
      <HelperText id={hintId} style={{ overflowWrap: 'anywhere' }}>
        Lowercase letters, digits and hyphens. Full address: https://{subdomain === '' ? '…' : subdomain}.vega.app
      </HelperText>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: раскладка справа налево

При `dir='rtl'` иконка переезжает вправо, потому что поле использует логические отступы. Инпут email сохраняет `dir='ltr'`: адреса всегда пишутся слева направо.

<!-- example: text-field/rtl-field.tsx -->
```tsx
import { HelperText, Icon, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { SearchIcon } from '@vega-ui/icons';
import { useId } from 'react';

export default function RtlField() {
  const id = useId();

  return (
    <div dir='rtl' lang='he' style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <TextField>
        <Icon size='sm' aria-hidden style={{ flexShrink: 0, marginInlineStart: 'var(--spacing-6)', color: 'var(--label-secondary)' }}>
          <SearchIcon />
        </Icon>
        <TextFieldInput type='search' aria-label='חיפוש לקוחות' placeholder='שם לקוח או מספר הזמנה' />
      </TextField>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-email`}>דוא״ל לחשבוניות</Label>
        <TextField>
          <TextFieldInput
            id={`${id}-email`}
            type='email'
            dir='ltr'
            defaultValue='finance@northwind.co.il'
            aria-describedby={`${id}-hint`}
          />
        </TextField>
        <HelperText id={`${id}-hint`}>כתובות דוא״ל נכתבות תמיד משמאל לימין.</HelperText>
      </div>
    </div>
  );
}
```
<!-- /example -->
