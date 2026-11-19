# PasswordField: анатомия

## Обзор

`PasswordField` расширяет контракт композиции `TextField` одной дополнительной моделью состояния: показан ли пароль сейчас или скрыт.

## Обязательные части

### `PasswordField`

Обязательная. Владеет состоянием видимости и передаёт контекст дочерним частям.

### `PasswordFieldInput`

Обязательная. Переключается между `type='password'` и `type='text'` в зависимости от контекста.

### `PasswordFieldToggle`

Обязательная в обычной композиции. Переключает видимость. Рендерит `Button` без собственного содержимого: положите внутрь `PasswordFieldShownIcon` и `PasswordFieldHiddenIcon` с вашими иконками вместе с `square` и `aria-label` или `aria-labelledby`, текст вроде «Show» или свою кнопку через `asChild`.

## Необязательные части

### `PasswordFieldShownIcon`

Показывает свои дочерние элементы, пока пароль скрыт, как иконку действия, которое его показывает. Своей иконки у неё нет: передайте иконку из любого набора, например глаз.

### `PasswordFieldHiddenIcon`

Показывает свои дочерние элементы, пока пароль показан, как иконку действия, которое его скрывает. Своей иконки у неё нет: передайте иконку из любого набора, например перечёркнутый глаз.

## Порядок композиции

1. `PasswordField`
2. `PasswordFieldInput`
3. `PasswordFieldToggle`
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
  PasswordFieldToggle,
} from '@vega-ui/react';
import { EyeIcon, EyeOffIcon } from '@vega-ui/icons';
import { useId } from 'react';

export default function SignInPassword() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Password</Label>
      <PasswordField>
        <PasswordFieldInput id={id} name='password' autoComplete='current-password' />
        <PasswordFieldToggle square aria-label='Show password'>
          <PasswordFieldShownIcon><EyeIcon /></PasswordFieldShownIcon>
          <PasswordFieldHiddenIcon><EyeOffIcon /></PasswordFieldHiddenIcon>
        </PasswordFieldToggle>
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
