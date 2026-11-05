# PasswordField: анатомия

## Обзор

`PasswordField` расширяет контракт композиции `TextField` одной дополнительной моделью состояния: показан ли пароль сейчас или скрыт.

## Обязательные части

### `PasswordField`

Обязательная. Владеет состоянием видимости и передаёт контекст дочерним частям.

### `PasswordFieldInput`

Обязательная. Переключается между `type='password'` и `type='text'` в зависимости от контекста.

### `PasswordFieldToggleIconButton`

Обязательная в обычной композиции. Переключает видимость.

## Необязательные части

### `PasswordFieldShownIcon`

Необязательная иконка для состояния «показан».

### `PasswordFieldHiddenIcon`

Необязательная иконка для состояния «скрыт».

## Порядок композиции

1. `PasswordField`
2. `PasswordFieldInput`
3. `PasswordFieldToggleIconButton`
4. `PasswordFieldShownIcon`
5. `PasswordFieldHiddenIcon`

## Корректные паттерны композиции

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

## Некорректные паттерны композиции

### Переключатель без поля ввода

Контрол рендерит кнопку, но самого поля пароля нет.

### Собственная кнопка без сохранения контракта переключателя

Корневое состояние есть, но пользователь теряет стандартный элемент «показать/скрыть».

### Иконки состояний, отрендеренные вне переключателя

Иконки должны оставаться частью одного кликабельного контрола.
