# Option

## Профиль документа

`primitive`

## Кратко

`Option` — презентационный примитив выбираемой строки, который переиспользуют спископодобные контролы. Это `div` с `role='option'` и состояниями выбора, активности, размера и отключения, но логикой выбора он сам не управляет. Для работающего списка используйте [Listbox](../listbox/) или [Select](../select/).

## Импорт

```tsx
import { Option, type OptionProps, type OptionSize } from '@vega-ui/react';
```

## Экспортируемые типы

- `OptionProps`
- `OptionSize`

## Базовое использование

<!-- example: option/basic-usage.tsx -->
```tsx
import { Option } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <div role='listbox' aria-label='Issue status' style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260, padding: 'var(--spacing-4)', borderRadius: 'var(--spacing-8)', background: 'var(--surface-secondary)', border: '1px solid var(--separator-opaque)', boxSizing: 'border-box' }}>
      <Option>Backlog</Option>
      <Option selected>In progress</Option>
      <Option>In review</Option>
      <Option>Done</Option>
    </div>
  );
}
```
<!-- /example -->

## Варианты

- Размер: `xs`, `sm`, `md`, `lg`, `xl`
- Состояние: выбранный, активный, отключённый
- Содержимое: простая метка или более богатая строка с иконкой и текстом

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

- `Option` — UI-примитив, а не полноценная система выбора или меню.
- Отключённый `Option` не вызывает `onClick`.
- Родительские контролы по-прежнему должны согласованно управлять активным вариантом, выбором и навигацией с клавиатуры.

## Частые ошибки

- Использовать `Option` отдельно и ждать от него управления состоянием выбора.
- Сочетать размер `Option` с несовпадающим размером родительского поля.
- Забывать согласовать `selected` и видимое активное состояние в родительской системе.
