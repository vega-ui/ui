# VisuallyHidden: стилизация

## Обзор

`VisuallyHidden` использует стандартный CSS-паттерн доступного скрытия.

## Публичные CSS-переменные

В текущей реализации нет локальных CSS-переменных компонента.

## Переменные частей

### Корень

Корень использует абсолютное позиционирование, размер 1px, обрезку (clip) и скрытие переполнения, чтобы убрать содержимое из визуальной раскладки, сохранив его в дереве доступности.

## Взаимодействие состояний и вариантов

- `asChild` меняет отрендеренный элемент, но не поведение стилей скрытия

## Примеры

### Скрытая подпись только для доступности

В компактном поиске в шапке нет места для видимой подписи, поэтому настоящий `<label>` скрыт через `VisuallyHidden asChild`. Плейсхолдер её не заменяет: он исчезает при вводе и не является надёжным доступным именем.

<!-- example: visually-hidden/hidden-accessibility-only-label.tsx -->
```tsx
import { Icon, TextField, TextFieldInput, VisuallyHidden } from '@vega-ui/react';
import { SearchIcon } from '@vega-ui/icons';

export default function HiddenAccessibilityOnlyLabel() {
  return (
    <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <strong>Acme Docs</strong>
      <form role='search' action='/search' style={{ flex: 1, minWidth: 0 }}>
        <VisuallyHidden asChild>
          <label htmlFor='docs-search'>Search documentation</label>
        </VisuallyHidden>
        <TextField size='sm' style={{ paddingInlineStart: 'var(--spacing-5)' }}>
          <Icon size='xs' style={{ flexShrink: 0, color: 'var(--label-secondary)' }}><SearchIcon /></Icon>
          <TextFieldInput id='docs-search' name='q' type='search' placeholder='Search' />
        </TextField>
      </form>
    </header>
  );
}
```
<!-- /example -->

## Не переопределяйте

- не меняйте правила обрезки так, что содержимое неожиданно снова становится видимым
- не используйте класс как универсальную утилиту раскладки, не связанную с доступностью
