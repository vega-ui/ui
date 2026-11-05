# IndexedSnapScroller: анатомия

## Обзор

`IndexedSnapScroller` оборачивает `SnapScroller` и генерирует движущееся окно логических индексов. Каждый отрендеренный дочерний элемент обёрнут в контекст, который сообщает его текущий виртуальный индекс.

## Обязательные части

### `IndexedSnapScroller`

Обязательна. Владеет генерацией окна индексов, логикой сдвига, синхронизацией контролируемого индекса и смещениями на границах.

### `IndexedSnapScrollerContent`

Обязательна в обычной композиции. Привязывает одну страницу с привязкой прокрутки к текущему виртуальному индексу из контекста.

## Необязательные части

### `apiRef`

Необязательна. Даёт доступ к императивному API скроллера с индексами.

## Порядок композиции

1. `IndexedSnapScroller`
2. один шаблон содержимого через `IndexedSnapScrollerContent`

## Корректные варианты композиции

Потомок — это компонент, а не разметка: он вызывает `useIndexedSnapScrollerContext` и оборачивает результат в `IndexedSnapScrollerContent`. Скроллер рендерит этот шаблон по одному разу для каждого индекса окна.

<!-- example: indexed-snap-scroller/minimal-composition.tsx -->
```tsx
import {
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  useIndexedSnapScrollerContext,
} from '@vega-ui/react';

const today = new Date();
const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });

function MonthPage() {
  const { index } = useIndexedSnapScrollerContext();
  const month = new Date(today.getFullYear(), today.getMonth() + index, 1);

  return (
    <IndexedSnapScrollerContent
      style={{
        width: '100%',
        padding: 'var(--spacing-10)',
        boxSizing: 'border-box',
        borderRadius: 'var(--radius-4)',
        background: 'var(--fills-secondary)',
      }}
    >
      {monthFormat.format(month)}
    </IndexedSnapScrollerContent>
  );
}

export default function MinimalComposition() {
  return (
    <IndexedSnapScroller
      defaultIndex={0}
      tabIndex={0}
      aria-label='Months'
      style={{ width: '100%', gap: 'var(--spacing-6)' }}
    >
      <MonthPage />
    </IndexedSnapScroller>
  );
}
```
<!-- /example -->

## Некорректные варианты композиции

### Дочернее содержимое как одна фиксированная страница

На самом деле дочерний элемент — это шаблон, переиспользуемый для нескольких логических индексов.

### Внешняя логика индекса, игнорирующая сбросы виртуального окна

Контролируемый индекс и видимое окно расходятся.

### Опора на стабильный физический порядок DOM для идентичности логической страницы

Сдвиги окна могут нарушить это предположение.
