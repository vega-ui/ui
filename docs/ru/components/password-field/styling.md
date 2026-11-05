# PasswordField: стилизация

## Обзор

`PasswordField` использует контракт стилизации `TextField`. Его собственный визуальный слой — кнопка-переключатель с иконкой, которая привязана к общей высоте поля ввода и токенам наведения.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--input-height` | кнопка-переключатель | сохраняет переключатель квадратным по высоте поля |
| `--text-color` | кнопка-переключатель | цвет иконки по умолчанию |
| `--fills-quaternary-hover` | кнопка-переключатель | подложка при наведении |
| `--fills-quaternary-active` | кнопка-переключатель | подложка при нажатии |
| `--button-color` | `PasswordFieldToggleIconButton` | Цвет иконки кнопки. |
| `--button-color-hover` | `PasswordFieldToggleIconButton` | Цвет иконки кнопки при наведении. |
| `--button-color-active` | `PasswordFieldToggleIconButton` | Цвет иконки кнопки при нажатии. |
| `--button-background-color` | `PasswordFieldToggleIconButton` | Фон кнопки. |
| `--button-background-color-hover` | `PasswordFieldToggleIconButton` | Фон кнопки при наведении. |
| `--button-background-color-active` | `PasswordFieldToggleIconButton` | Фон кнопки при нажатии. |

## Переменные частей

### Корень

Корень наследует тот же контракт обёртки, что и `TextField`.

### Кнопка-переключатель

`PasswordFieldToggleIconButton` сопоставляет `--icon-button-size` с `--input-height` и использует прозрачный фон до наведения или нажатия.

## Взаимодействие состояний и вариантов

- размер приходит от корня `TextField`
- отключённое состояние наследуется через поле ввода и контекст
- состояние «показан/скрыт» влияет на отображение иконки, а не на поверхность обёртки

## Примеры

### Собственные иконки видимости

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

## Не переопределяйте

- не делайте переключатель похожим на отдельное несвязанное действие
- не нарушайте общий размер `--input-height` у поля и переключателя
