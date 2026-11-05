# PasswordField: паттерны

## Строка пароля при входе

Когда использовать:

- пользователи вводят пароль от существующего аккаунта

Заметки о композиции:

- задайте `autoComplete='current-password'`
- держите переключатель видимым и рядом с полем ввода

Компромиссы:

- привычный паттерн
- возможность показать пароль добавляет в строку ещё одно действие

<!-- example: password-field/sign-in-password.tsx -->
```tsx
import {
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
} from '@vega-ui/react';
import { useId } from 'react';

export default function SignInPassword() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Password</Label>
      <PasswordField>
        <PasswordFieldInput id={id} name='password' autoComplete='current-password' />
        <PasswordFieldToggleIconButton aria-label='Show password'>
          <PasswordFieldShownIcon />
          <PasswordFieldHiddenIcon />
        </PasswordFieldToggleIconButton>
      </PasswordField>
    </div>
  );
}
```
<!-- /example -->

## Создание нового пароля

Когда использовать:

- пользователи создают или сбрасывают пароль

Заметки о композиции:

- задайте `autoComplete='new-password'`
- сопроводите поле текстом подсказки или рекомендациями по надёжности

Компромиссы:

- делает онбординг и сброс пароля понятнее
- может приучить слишком полагаться на визуальные подсказки о надёжности

<!-- example: password-field/new-password-checklist.tsx -->
```tsx
import {
  Icon,
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
  Text,
} from '@vega-ui/react';
import { CheckIcon, CircleIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const RULES = [
  { label: 'At least 12 characters', test: (value: string) => value.length >= 12 },
  { label: 'Upper and lower case letters', test: (value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value) },
  { label: 'At least one number', test: (value: string) => /\d/.test(value) },
  { label: 'At least one symbol', test: (value: string) => /[^A-Za-z0-9]/.test(value) },
];

export default function NewPasswordChecklist() {
  const id = useId();
  const rulesId = `${id}-rules`;
  const [password, setPassword] = useState('');
  const passed = RULES.filter((rule) => rule.test(password)).length;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>New password</Label>
        <PasswordField>
          <PasswordFieldInput
            id={id}
            name='newPassword'
            autoComplete='new-password'
            value={password}
            aria-describedby={rulesId}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <PasswordFieldToggleIconButton aria-label='Show password'>
            <PasswordFieldShownIcon />
            <PasswordFieldHiddenIcon />
          </PasswordFieldToggleIconButton>
        </PasswordField>
      </div>
      <ul id={rulesId} style={{ display: 'grid', gap: 'var(--spacing-3)', margin: 0, padding: 0, listStyle: 'none' }}>
        {RULES.map((rule) => {
          const ok = rule.test(password);
          return (
            <li
              key={rule.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-4)',
                color: ok ? 'var(--label-primary)' : 'var(--label-tertiary)',
              }}
            >
              <Icon size='xs' aria-hidden style={{ flexShrink: 0 }}>
                {ok ? <CheckIcon strokeWidth={2.5} /> : <CircleIcon />}
              </Icon>
              <Text size={2} style={{ color: 'inherit' }}>{rule.label}</Text>
            </li>
          );
        })}
      </ul>
      <Text size={2} fontWeight={500} role='status' style={{ fontVariantNumeric: 'tabular-nums' }}>
        {passed} of {RULES.length} requirements met
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Собственные иконки видимости

Когда использовать:

- язык продукта требует собственных иконок безопасности

Заметки о композиции:

- оставляйте доступное имя кнопки общим и понятным
- меняйте иконки внутри готовой части-переключателя

Компромиссы:

- соответствует языку продукта
- легко переборщить со стилями, если иконки доминируют над полем

<!-- example: password-field/custom-visibility-icons.tsx -->
```tsx
import {
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
} from '@vega-ui/react';
import { LockIcon, LockOpenIcon } from '@vega-ui/icons';
import { useId } from 'react';

export default function CustomVisibilityIcons() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Vault passphrase</Label>
      <PasswordField>
        <PasswordFieldInput id={id} autoComplete='current-password' />
        <PasswordFieldToggleIconButton aria-label='Show passphrase'>
          <PasswordFieldShownIcon><LockIcon /></PasswordFieldShownIcon>
          <PasswordFieldHiddenIcon><LockOpenIcon /></PasswordFieldHiddenIcon>
        </PasswordFieldToggleIconButton>
      </PasswordField>
    </div>
  );
}
```
<!-- /example -->
