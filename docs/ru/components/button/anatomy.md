# Button: анатомия

## Обзор

`Button` — единая поверхность действия на основе `ButtonBase`. Анатомия простая: один кликабельный корень с необязательным текстом, иконкой, спиннером или полиморфным дочерним содержимым.

## Обязательные части

### `Button`

Обязательна. Отвечает за размер, поведение ширины и визуальные пропсы `ButtonBase`, такие как `variant` и `appearance`.

## Необязательные части

`Button` не предоставляет публичных дочерних частей, но её часто комбинируют со `Spinner`, `Icon` или содержимым через `asChild`.

## Порядок композиции

1. `Button`
2. необязательная иконка, текст или спиннер

## Корректные варианты композиции

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

## Некорректные варианты композиции

### Чистая навигация, реализованная кнопкой

Если основная задача — навигация, предпочтите `Link` или `Button asChild` с настоящей ссылкой.

### Полиморфный дочерний элемент, не поддерживающий передаваемые пропсы

`asChild` хорошо работает, только если дочерний элемент принимает ожидаемые пропсы кнопки.
