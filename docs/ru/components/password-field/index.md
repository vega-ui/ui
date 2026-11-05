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
  PasswordFieldToggleIconButton,
  type PasswordFieldHiddenIconProps,
  type PasswordFieldInputProps,
  type PasswordFieldProps,
  type PasswordFieldShownIconProps,
  type PasswordFieldToggleIconButtonProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `PasswordFieldProps`
- `PasswordFieldInputProps`
- `PasswordFieldToggleIconButtonProps`
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

## Обязательные части

- `PasswordField`: корневой контейнер состояния
- `PasswordFieldInput`: нативное поле ввода пароля
- `PasswordFieldToggleIconButton`: переключатель видимости

## Необязательные части

- `PasswordFieldShownIcon`: иконка состояния «показан»
- `PasswordFieldHiddenIcon`: иконка состояния «скрыт»

## Порядок композиции

1. `PasswordField`
2. `PasswordFieldInput`
3. `PasswordFieldToggleIconButton`
4. части-иконки «показан» и «скрыт»

## Варианты

- Размер: наследуется от `TextField`
- Состояние: пароль скрыт или показан, отключённое состояние и ошибка — через пропсы корневого поля
- Композиция: стандартные иконки или собственное содержимое иконок

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
