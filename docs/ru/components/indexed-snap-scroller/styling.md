# IndexedSnapScroller: стилизация

## Обзор

`IndexedSnapScroller` наследует контракт стилизации от `SnapScroller` и `SnapScrollerContent`. Собственного локального CSS у него нет, поэтому большинство решений по стилям принимается на уровне базового скроллера или отрендеренного содержимого страниц.

## Публичные CSS-переменные

В текущей реализации нет отдельных локальных CSS-переменных компонента.

Общие рекомендации по темам — в разделах [Темы](../../styling/themes.md) и [CSS-переменные](../../styling/css-variables.md).

## Переменные на уровне частей

### Корень

Использует контейнер прокрутки с привязкой `SnapScroller` и его поведение прокрутки, промежутков и привязки.

### Содержимое

Использует поведение `SnapScrollerContent` через `IndexedSnapScrollerContent`.

Любая визуальная оболочка внутри страницы по-прежнему относится к отрендеренному дочернему поддереву, а не к самому `IndexedSnapScroller`.

## Взаимодействие состояний и вариантов

- Стилизация структурная и наследуется от базового скроллера с привязкой.
- Поведение с индексами меняет идентичность содержимого и пролистывание, но не визуальный контракт.
- `preserveScroll`, `size` и `shift` влияют на поведение пролистывания, а не открывают новые дизайн-токены.

## Примеры

### Три страницы в области просмотра

Каждая страница занимает треть области просмотра за вычетом промежутков. Когда видно сразу несколько страниц, увеличьте `size`, чтобы окно всегда выходило за видимые страницы с обеих сторон.

<!-- example: indexed-snap-scroller/three-days-per-view.tsx -->
```tsx
import {
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  Text,
  useIndexedSnapScrollerContext,
} from '@vega-ui/react';

const today = new Date();
const dayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short', day: 'numeric' });

function ForecastDay() {
  const { index } = useIndexedSnapScrollerContext();
  const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + index);
  const temperature = 14 + Math.abs(index * 5) % 9;

  return (
    <IndexedSnapScrollerContent
      style={{
        display: 'grid',
        justifyItems: 'center',
        gap: 'var(--spacing-2)',
        width: 'calc((100% - 2 * var(--spacing-4)) / 3)',
        paddingBlock: 'var(--spacing-8)',
        borderRadius: 'var(--radius-4)',
        background: index === 0 ? 'var(--fills-primary)' : 'var(--fills-secondary)',
      }}
    >
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>{index === 0 ? 'Today' : dayFormat.format(day)}</Text>
      <Text size={5} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>{temperature}°</Text>
    </IndexedSnapScrollerContent>
  );
}

export default function ThreeDaysPerView() {
  return (
    <IndexedSnapScroller
      defaultIndex={0}
      size={9}
      tabIndex={0}
      aria-label='Forecast'
      style={{ width: '100%', gap: 'var(--spacing-4)' }}
    >
      <ForecastDay />
    </IndexedSnapScroller>
  );
}
```
<!-- /example -->

## Что не переопределять

- не придумывайте CSS-API скроллера с индексами, которого нет в исходном коде
- не делайте компонент визуально отличным от базового скроллера без продуктовой необходимости
