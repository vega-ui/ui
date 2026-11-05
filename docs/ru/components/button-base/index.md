# ButtonBase

## Профиль документа

`primitive`

## Кратко

`ButtonBase` — низкоуровневый примитив действия, на котором построены `Button` и `IconButton`. Он отвечает за общий контракт стилей кнопок, оформление фокуса и композицию через `asChild`, не добавляя правил продуктовой раскладки более высокого уровня.

## Импорт

```tsx
import {
  ButtonBase,
  type ButtonBaseAppearance,
  type ButtonBaseProps,
  type ButtonBaseVariant,
} from '@vega-ui/react/ButtonBase';
```

## Экспортируемые типы

- `ButtonBaseProps`
- `ButtonBaseVariant = 'primary' | 'secondary' | string`
- `ButtonBaseAppearance = 'fill' | 'outline' | 'ghost' | 'transparent' | string`

## Базовое использование

<!-- example: button-base/basic-usage.tsx -->
```tsx
import { ButtonBase } from '@vega-ui/react';
import { useState } from 'react';

export default function BasicUsage() {
  const [likes, setLikes] = useState(24);

  return (
    <ButtonBase
      type='button'
      variant='secondary'
      appearance='ghost'
      onClick={() => setLikes(likes + 1)}
      style={{
        padding: 'var(--spacing-3) var(--spacing-8)',
        borderRadius: 'var(--radius-3)',
        fontSize: 'var(--font-size-2)',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      Like · {likes}
    </ButtonBase>
  );
}
```
<!-- /example -->

## Варианты

- Вариант: `primary`, `secondary`
- Оформление: `fill`, `outline`, `ghost`, `transparent`
- Режим рендера: нативная кнопка или `asChild`

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

- Для действий в формах задавайте `type` явно.
- При `asChild` дочерний элемент должен принимать пробрасываемые пропсы и сохранять корректную семантику.
- Содержимому только из иконки всё равно нужно доступное имя.

## Частые ошибки

- Использовать `ButtonBase` там, где `Button` или `IconButton` были бы понятнее.
- Забывать, что под `asChild` семантика ссылки остаётся семантикой ссылки.
- Считать, что для неподдерживаемых строк варианта уже есть CSS.
