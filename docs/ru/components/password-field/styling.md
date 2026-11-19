# PasswordField: стилизация

## Обзор

`PasswordField` использует контракт стилизации `TextField`. Его собственный визуальный слой — кнопка-переключатель, которая привязана к общей высоте поля ввода и токенам наведения.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--input-height` | кнопка-переключатель | сохраняет переключатель квадратным по высоте поля |
| `--text-color` | кнопка-переключатель | цвет иконок внутри |
| `--fills-quaternary-hover` | кнопка-переключатель | подложка при наведении |
| `--fills-quaternary-active` | кнопка-переключатель | подложка при нажатии |
| `--button-color` | `PasswordFieldToggle` | Цвет иконки кнопки. |
| `--button-color-hover` | `PasswordFieldToggle` | Цвет иконки кнопки при наведении. |
| `--button-color-active` | `PasswordFieldToggle` | Цвет иконки кнопки при нажатии. |
| `--button-background-color` | `PasswordFieldToggle` | Фон кнопки. |
| `--button-background-color-hover` | `PasswordFieldToggle` | Фон кнопки при наведении. |
| `--button-background-color-active` | `PasswordFieldToggle` | Фон кнопки при нажатии. |

## Переменные частей

### Корень

Корень наследует тот же контракт обёртки, что и `TextField`.

### Кнопка-переключатель

`PasswordFieldToggle` сопоставляет `--button-height` с `--input-height` и использует прозрачный фон до наведения или нажатия.

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
  PasswordFieldToggle,
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
        <PasswordFieldToggle square aria-label='Show passphrase'>
          <PasswordFieldShownIcon><LockIcon /></PasswordFieldShownIcon>
          <PasswordFieldHiddenIcon><LockOpenIcon /></PasswordFieldHiddenIcon>
        </PasswordFieldToggle>
      </PasswordField>
    </div>
  );
}
```
<!-- /example -->

## Не переопределяйте

- не делайте переключатель похожим на отдельное несвязанное действие
- не нарушайте общий размер `--input-height` у поля и переключателя
