# HelperText: примеры

## Базовый

### Базовый: подсказка, связанная с полем

Дайте `HelperText` `id` и укажите его в `aria-describedby` инпута — иначе скринридер не свяжет подсказку с полем. Подсказка зачитывается после подписи, когда инпут получает фокус.

<!-- example: helper-text/field-hint.tsx -->
```tsx
import { HelperText, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function FieldHint() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Recovery email</Label>
      <TextField>
        <TextFieldInput id={id} type='email' autoComplete='email' aria-describedby={hintId} />
      </TextField>
      <HelperText id={hintId}>Used only if you lose access to your main inbox.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: оставшиеся символы

Счётчик вычисляется из значения на каждое нажатие и на лимите переходит в тон ошибки. Озвучивать каждое нажатие было бы шумно, поэтому отдельная скрытая статусная область говорит только на последних десяти символах.

<!-- example: helper-text/remaining-characters.tsx -->
```tsx
import { HelperText, Label, TextField, TextFieldInput, VisuallyHidden } from '@vega-ui/react';
import { useId, useState } from 'react';

const MAX_LENGTH = 50;

export default function RemainingCharacters() {
  const id = useId();
  const [subject, setSubject] = useState('Your March invoice is ready');
  const remaining = MAX_LENGTH - subject.length;
  const message = remaining === 1 ? '1 character left' : `${remaining} characters left`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Email subject</Label>
      <TextField>
        <TextFieldInput
          id={id}
          value={subject}
          maxLength={MAX_LENGTH}
          aria-describedby={`${id}-count`}
          onChange={(event) => setSubject(event.currentTarget.value)}
        />
      </TextField>
      <HelperText id={`${id}-count`} error={remaining === 0} style={{ fontVariantNumeric: 'tabular-nums' }}>{message}</HelperText>
      <VisuallyHidden>
        <div role='status'>{remaining <= 10 ? message : ''}</div>
      </VisuallyHidden>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: подсказка для группы контролов

Одна подсказка для нескольких чекбоксов относится к группе: `Fieldset` ссылается на неё через `aria-describedby`. При отправке `FormData.getAll` собирает все отмеченные каналы.

<!-- example: helper-text/group-hint.tsx -->
```tsx
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetLegend,
  HelperText,
  Text,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

const CHANNELS = ['Email', 'Slack', 'SMS'];

export default function GroupHint() {
  const id = useId();
  const [saved, setSaved] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const channels = new FormData(event.currentTarget).getAll('channels');
    setSaved(channels.length === 0 ? 'Alerts turned off' : `Alerts via ${channels.join(', ')}`);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <Fieldset aria-describedby={`${id}-hint`}>
        <FieldsetLegend>Incident alerts</FieldsetLegend>
        <HelperText id={`${id}-hint`}>We send each alert to every channel you pick.</HelperText>
        {CHANNELS.map((channel) => (
          <Checkbox key={channel} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <CheckboxInput name='channels' value={channel} defaultChecked={channel === 'Email'} />
            <CheckboxIndicator>
              <CheckboxCheckedIcon />
            </CheckboxIndicator>
            {channel}
          </Checkbox>
        ))}
      </Fieldset>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Button type='submit'>Save</Button>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{saved}</Text>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: зарезервированное место под сообщение

Место под сообщение держит `minHeight` в две строки, поэтому появившаяся ошибка не сдвигает следующую строку и не ломает выравнивание соседних полей.

<!-- example: helper-text/reserved-message-space.tsx -->
```tsx
import { HelperText, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId, useState } from 'react';

export default function ReservedMessageSpace() {
  const id = useId();
  const [code, setCode] = useState('');
  const invalid = code !== '' && !/^[A-Z]{3}-\d{4}$/.test(code);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)', alignContent: 'start' }}>
        <Label htmlFor={`${id}-code`}>Booking code</Label>
        <TextField error={invalid}>
          <TextFieldInput
            id={`${id}-code`}
            value={code}
            placeholder='ABC-1234'
            aria-invalid={invalid}
            aria-describedby={`${id}-message`}
            onChange={(event) => setCode(event.currentTarget.value.toUpperCase())}
          />
        </TextField>
        <HelperText id={`${id}-message`} error={invalid} style={{ minHeight: '2lh' }}>
          {invalid ? 'Three letters, a hyphen and four digits.' : ''}
        </HelperText>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)', alignContent: 'start' }}>
        <Label htmlFor={`${id}-name`}>Last name</Label>
        <TextField>
          <TextFieldInput id={`${id}-name`} autoComplete='family-name' />
        </TextField>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: сообщение из нативной валидности

`onInvalid` превращает флаги `validity` браузера в конкретное сообщение и подавляет нативный пузырь. Ошибка идёт первой в `aria-describedby`, перед постоянной подсказкой, и перепроверяется при вводе, пока не исчезнет.

<!-- example: helper-text/native-validity-message.tsx -->
```tsx
import { Button, HelperText, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

const getMessage = (input: HTMLInputElement) => {
  if (input.validity.valueMissing) return 'Enter a postal code.';
  if (input.validity.patternMismatch) return 'Use 5 digits, for example 10115.';
  return '';
};

export default function NativeValidityMessage() {
  const id = useId();
  const [error, setError] = useState('');
  const invalid = error !== '';

  const onInvalid = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setError(getMessage(event.currentTarget));
  };

  const onInput = (event: FormEvent<HTMLInputElement>) => {
    if (!invalid) return;
    setError(getMessage(event.currentTarget));
  };

  return (
    <form onSubmit={(event) => event.preventDefault()} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Postal code</Label>
        <TextField error={invalid}>
          <TextFieldInput
            id={id}
            name='postalCode'
            inputMode='numeric'
            autoComplete='postal-code'
            required
            pattern='\d{5}'
            aria-invalid={invalid}
            aria-describedby={invalid ? `${id}-error ${id}-hint` : `${id}-hint`}
            onInvalid={onInvalid}
            onInput={onInput}
          />
        </TextField>
        {invalid && <HelperText id={`${id}-error`} error>{error}</HelperText>}
        <HelperText id={`${id}-hint`}>We deliver within Germany only.</HelperText>
      </div>
      <Button type='submit' style={{ justifySelf: 'start' }}>Check delivery</Button>
    </form>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: объясните, почему поле заблокировано

Отключённый инпут нельзя сфокусировать, поэтому причина должна быть видимым текстом, а не тултипом. Подсказка объясняет, почему поле заблокировано, и ведёт к решению.

<!-- example: helper-text/explain-disabled-field.tsx -->
```tsx
import { HelperText, Label, Link, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function ExplainDisabledField() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id} style={{ color: 'var(--label-tertiary)' }}>Custom domain</Label>
      <TextField>
        <TextFieldInput id={id} placeholder='docs.northwind.io' disabled aria-describedby={`${id}-hint`} />
      </TextField>
      <HelperText id={`${id}-hint`}>
        Custom domains are available on the Business plan. <Link href='#pricing'>Compare plans</Link>
      </HelperText>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: длинный неразрывный текст в узкой колонке

`HelperText` — `inline-block`, поэтому длинный URL вылезет за узкую колонку. `overflowWrap: 'anywhere'` позволяет переносить его в любом месте.

<!-- example: helper-text/long-unbroken-hint.tsx -->
```tsx
import { HelperText, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function LongUnbrokenHint() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 240 }}>
      <Label htmlFor={id}>Webhook URL</Label>
      <TextField>
        <TextFieldInput id={id} type='url' aria-describedby={`${id}-hint`} />
      </TextField>
      <HelperText id={`${id}-hint`} style={{ overflowWrap: 'anywhere' }}>
        Default: https://hooks.northwind-logistics.example.com/v2/events/shipments/status-changed
      </HelperText>
    </div>
  );
}
```
<!-- /example -->
