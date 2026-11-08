# Popover: анатомия

## Обзор

`Popover` управляет состоянием открытия и координирует плавающий слой между триггером и содержимым. По умолчанию он немодальный, поэтому контракт композиции касается привязки и контекстного содержимого, а не изоляции.

## Обязательные части

### `Popover`

Обязательна. Управляет состоянием открытия и координацией привязки.

### `PopoverTrigger`

Обязательна при открытии через триггер. Переключает поповер через нативный `popovertarget`, поэтому должна быть кнопкой; с `asChild` дочерний элемент должен рендерить `<button>`.

### `PopoverContent`

Обязательна. Рендерит плавающую поверхность содержимого как нативный элемент `popover="auto"` в верхнем слое (top layer), поэтому отдельная часть-портал не нужна. Она рендерится всегда и скрыта, пока поповер закрыт; её дочерние элементы рендерятся, только пока он открыт.

## Необязательные части

### `PopoverAnchor`

Необязательна. Помечает элемент, от которого позиционируется содержимое вместо триггера, например всё поле вокруг маленькой кнопки внутри него. Открытие, `aria-*` и возврат фокуса остаются на триггере. Рендерит `div`; с `asChild` использует дочерний элемент.

### `PopoverClose`

Необязательна. Кнопка внутри `PopoverContent`, которая закрывает поповер через `onChangeOpen(false)`, так что состояние `open` не нужно. Своих стилей у неё нет: положите внутрь свою кнопку через `asChild`.

Для затемнённой подложки используйте `Dialog` или `Sheet`.

## Порядок композиции

1. `Popover`
2. `PopoverAnchor` (необязательна), оборачивает элемент с `PopoverTrigger`
3. `PopoverTrigger`
4. `PopoverContent`
5. `PopoverClose` (необязательна), внутри `PopoverContent`

## Допустимые варианты композиции

<!-- example: popover/minimal-composition.tsx -->
```tsx
import { useId } from 'react';
import {
  Button,
  Heading,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

export default function MinimalComposition() {
  const titleId = useId();

  return (
    <Popover role='dialog'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Storage · 82% used</Button>
      </PopoverTrigger>
      <PopoverContent aria-labelledby={titleId}>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)', maxWidth: 280 }}>
          <Heading id={titleId} as='h3' size={5} fontWeight={600}>16.4 GB of 20 GB used</Heading>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>Videos take 11.2 GB. Old exports are removed after 90 days.</Text>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```
<!-- /example -->

## Недопустимые варианты композиции

### Критическая модальная задача внутри `PopoverContent`

Если сценарий блокирует продвижение или требует строгой ловушки фокуса, используйте `Dialog`, `Drawer` или `Sheet`.

### Крупная раскладка, похожая на страницу, внутри поповера

Это размывает контекстную природу компонента и обычно говорит о неверно выбранном паттерне оверлея.

### Триггер и содержимое, разнесённые между несвязанными владельцами состояния

Так о состоянии открытия и расположении рассуждать сложнее, чем при едином дереве поповера.
