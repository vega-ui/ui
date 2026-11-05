# IndexedSnapScroller

## Профиль документа

`advanced interactive`

## Кратко

`IndexedSnapScroller` — [составной компонент](../../glossary.md#составной-компонент-compound-component) на основе `SnapScroller` для виртуализированного постраничного пролистывания по окну индексов. Он поддерживает скользящую последовательность логических индексов и может сдвигать окно, когда пользователь доходит до границы прокрутки.

## Импорт

```tsx
import {
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  type IndexedSnapScrollerApiRef,
  type IndexedSnapScrollerContentProps,
  type IndexedSnapScrollerProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `IndexedSnapScrollerProps`
- `IndexedSnapScrollerContentProps`
- `IndexedSnapScrollerApiRef`

## Минимальная композиция

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

## Обязательные части

- `IndexedSnapScroller`: корневая система постраничного пролистывания по индексам
- `IndexedSnapScrollerContent`: содержимое страницы, привязанное к текущему виртуальному индексу

## Необязательные части

- `apiRef` для императивного управления окном индексов

## Порядок композиции

1. `IndexedSnapScroller`
2. один дочерний шаблон `IndexedSnapScrollerContent`

## Варианты

- Контролируемый логический `index`
- Неконтролируемое пролистывание по окну с `defaultIndex`
- Настраиваемые `size`, `shift`, `start` и `startDir`

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

- Контролируемый `index` и сбросы виртуального окна должны оставаться синхронизированными.
- `preserveScroll` меняет ощущение от сдвигов окна индексов.
- Дочерние элементы рендерятся заново для каждого виртуального индекса, поэтому состояние с ключами внутри содержимого страницы должно быть продуманным.

## Частые ошибки

- Предположение, что порядок дочерних элементов статичен, хотя виртуальное окно сдвигается.
- Забывают, что один шаблон содержимого рендерится несколько раз с разными индексами в контексте.
- Внешняя логика контролируемого индекса смешивается с самодельными предположениями о внутреннем смещении.
