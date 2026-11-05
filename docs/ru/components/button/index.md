# Button

## Профиль документа

`primitive`

## Кратко

`Button` — основной компонент действия на базе `ButtonBase` с поддержкой размеров и растягивания на всю ширину для типовых действий в продукте. Это выбор по умолчанию, когда интерфейсу нужна видимая поверхность действия с текстом.

## Импорты

```tsx
import { Button, type ButtonProps, type ButtonSize } from '@vega-ui/react';
```

## Экспортируемые типы

- `ButtonProps`
- `ButtonSize`

## Базовое использование

<!-- example: button/basic-usage.tsx -->
```tsx
import { Button, Icon } from '@vega-ui/react';
import { PlusIcon } from '@vega-ui/icons';
import { useState } from 'react';

export default function BasicUsage() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <Button type='button' onClick={() => setCount(count + 1)}>
        <Icon size='sm'><PlusIcon /></Icon>
        New project
      </Button>
      <span style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Projects: {count}</span>
    </div>
  );
}
```
<!-- /example -->

## Варианты

- Размеры: `xs`, `sm`, `md`, `lg`, `xl`
- Варианты: `primary`, `secondary`
- Оформление: `fill`, `outline`, `ghost`, `transparent`
- Раскладка: обычная ширина или `fullWidth`
- Композиция: обычная кнопка или `asChild`

## Связанные документы

- [Примеры](./examples.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Паттерны](./patterns.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- У `type` нет значения по умолчанию: внутри формы `Button` отправляет её, как нативный `<button>`. С `asChild` дочернему элементу `type` не передаётся.
- `asChild` подменяет нижележащий элемент, сохраняя стили кнопки VegaUI.
- Кастомные строки для размера, варианта или оформления требуют соответствующей поддержки в CSS.
- Если взаимодействие — в первую очередь навигация или смысл уже понятен по иконке, `Link` или `IconButton` могут лучше передать намерение.

## Частые ошибки

- Рассчитывать на отправку формы, не задав `type='submit'`.
- Стилизовать под кнопку чистую навигацию, когда лучше подходит семантическая ссылка.
- Передавать неподдерживаемые кастомные строки варианта без соответствующего CSS.
