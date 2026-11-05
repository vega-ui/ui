# IconButton

## Профиль документа

`primitive`

## Кратко

`IconButton` — вариант действия только с иконкой, построенный на той же основе, что и `Button`. Это компактный слой действий для случаев, когда видимый текст добавил бы шум, а не ясность.

## Импорты

```tsx
import {
  IconButton,
  type IconButtonProps,
  type IconButtonSize,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `IconButtonProps`
- `IconButtonSize`

## Базовое использование

<!-- example: icon-button/basic-usage.tsx -->
```tsx
import { Icon, IconButton, Text } from '@vega-ui/react';
import { EllipsisIcon, PencilIcon, Share2Icon } from '@vega-ui/icons';
import { useState } from 'react';

export default function BasicUsage() {
  const [lastAction, setLastAction] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', width: '100%' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
        <Text size={4} fontWeight={600} style={{ flex: 1, minWidth: 0 }}>Brand guidelines</Text>
        <IconButton type='button' size='sm' variant='secondary' appearance='transparent' aria-label='Rename document' onClick={() => setLastAction('Rename')}>
          <Icon><PencilIcon /></Icon>
        </IconButton>
        <IconButton type='button' size='sm' variant='secondary' appearance='transparent' aria-label='Share document' onClick={() => setLastAction('Share')}>
          <Icon><Share2Icon /></Icon>
        </IconButton>
        <IconButton type='button' size='sm' variant='secondary' appearance='transparent' aria-label='More actions' onClick={() => setLastAction('More')}>
          <Icon><EllipsisIcon /></Icon>
        </IconButton>
      </header>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {lastAction === '' ? 'Updated 2 hours ago' : `Clicked: ${lastAction}`}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Варианты

- Размеры: `xs`, `sm`, `md`, `lg`, `xl`
- Варианты и оформления, унаследованные от основы кнопки
- Композиция: кнопка по умолчанию или `asChild`

## Связанные документы

- [Примеры](./examples.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Паттерны](./patterns.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- Всегда задавайте `aria-label`, потому что видимого текста обычно нет.
- Соблюдайте визуальный баланс размера глифа иконки и токена размера кнопки.
- Используйте обычный `Button`, когда видимый текст сделал бы действие понятнее.
- Если смысл иконки слишком сильно зависит от окружающего контекста, текстовая кнопка обычно надёжнее.

## Частые ошибки

- Пропущен `aria-label`.
- Длинный текст помещается внутрь `IconButton`.
- Действия только с иконкой используются там, где их смысл неузнаваем.
