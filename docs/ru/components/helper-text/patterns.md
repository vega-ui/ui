# HelperText: паттерны

## Встроенная подсказка к полю

Когда использовать:

- полю нужно одно короткое пояснение

Заметки о композиции:

- размещайте текст под полем
- формулируйте сообщение так, чтобы по нему можно было действовать

Компромиссы:

- повышает долю заполненных форм
- добавляет формам вертикальной плотности

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

## Локальное сообщение валидации

Когда использовать:

- ошибка относится к одному полю

Заметки о композиции:

- задавайте невалидное состояние и на самом поле
- формулируйте текст ошибки конкретно

Компромиссы:

- быстро считывается
- не должно заменять общую сводку ошибок формы, когда не проходят несколько полей

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

## Подсказка для группы

Когда использовать:

- нескольким связанным элементам нужна одна короткая инструкция

Заметки о композиции:

- размещайте вспомогательный текст рядом с подписью группы
- не повторяйте одно и то же сообщение для каждого дочернего элемента

Компромиссы:

- уменьшает дублирование
- может остаться незамеченным, если визуально оторван от группы

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
