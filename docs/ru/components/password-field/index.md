# PasswordField

## Профиль документа

`advanced interactive`

## Кратко

`PasswordField` — [составной компонент](../../glossary.md#составной-компонент-compound-component) на основе `TextField`. Он добавляет состояние видимости пароля, кнопку-переключатель и части-иконки, сохраняя нативное поле ввода. Это слой для ввода секретов, когда проверка скрытого значения входит в контракт поля.

## Импорт

```tsx
import {
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggle,
  type PasswordFieldHiddenIconProps,
  type PasswordFieldInputProps,
  type PasswordFieldProps,
  type PasswordFieldShownIconProps,
  type PasswordFieldToggleProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `PasswordFieldProps`
- `PasswordFieldInputProps`
- `PasswordFieldToggleProps`
- `PasswordFieldShownIconProps`
- `PasswordFieldHiddenIconProps`

## Минимальная композиция

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

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле, со своим набором иконок, и импортируйте этот компонент везде. `MyPasswordField` передаёт свои пропсы нативному `PasswordFieldInput`, а переключатель получает имя из `toggleLabel`. См. [Рецепты компонентов](../../recipes.md).

<!-- example: password-field/recipe.tsx -->
```tsx
import {
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggle,
  type PasswordFieldInputProps,
} from '@vega-ui/react';
import { EyeIcon, EyeOffIcon } from '@vega-ui/icons';
import { useId } from 'react';

interface MyPasswordFieldProps extends PasswordFieldInputProps {
  toggleLabel: string
}

export function MyPasswordField({ toggleLabel, ...props }: MyPasswordFieldProps) {
  return (
    <PasswordField>
      <PasswordFieldInput {...props} />
      <PasswordFieldToggle square aria-label={toggleLabel}>
        <PasswordFieldShownIcon><EyeIcon /></PasswordFieldShownIcon>
        <PasswordFieldHiddenIcon><EyeOffIcon /></PasswordFieldHiddenIcon>
      </PasswordFieldToggle>
    </PasswordField>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Password</Label>
      <MyPasswordField id={id} name='password' autoComplete='current-password' toggleLabel='Show password' />
    </div>
  );
}
```
<!-- /example -->

## Обязательные части

- `PasswordField`: корневой контейнер состояния
- `PasswordFieldInput`: нативное поле ввода пароля
- `PasswordFieldToggle`: переключатель видимости

## Необязательные части

- `PasswordFieldShownIcon`: показывает переданную иконку, например глаз, пока пароль скрыт
- `PasswordFieldHiddenIcon`: показывает переданную иконку, например перечёркнутый глаз, пока пароль показан

## Порядок композиции

1. `PasswordField`
2. `PasswordFieldInput`
3. `PasswordFieldToggle`
4. части-иконки «показан» и «скрыт»

## Варианты

- Размер: наследуется от `TextField`
- Состояние: пароль скрыт или показан, отключённое состояние — через пропсы корневого поля, невалидное — через `aria-invalid` или `:user-invalid` на `PasswordFieldInput`
- Композиция: иконки из любого набора внутри частей «показан» и «скрыт» или переключатель с текстом

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Паттерны](./patterns.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- Переключение видимости должно сохранять фокус на поле ввода.
- Поведение менеджеров паролей и автозаполнения нужно проверять в настоящих браузерах.
- Показ пароля помогает проверить ввод, но сам по себе не является мерой безопасности.
- Политика валидации, подсказки о надёжности и показ пароля должны оставаться чётко разделёнными в модели продукта.

## Типичные ошибки

- Переключатель без доступного имени.
- Предположение, что подсказки о надёжности пароля — то же самое, что настоящая политика валидации.
- Замена частей составного компонента собственными обёртками до того, как заработает базовая композиция.
