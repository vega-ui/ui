# SnapScroller

## Профиль документа

`advanced interactive`

## Кратко

`SnapScroller` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для горизонтального постраничного пролистывания на основе CSS scroll-snap. Он предоставляет элементы прокрутки, колбэки привязки и императивный API для перехода назад и вперёд и прокрутки по ключу.

## Импорт

```tsx
import {
  SnapScroller,
  SnapScrollerContent,
  type SnapScrollerApiRef,
  type SnapScrollerContentProps,
  type SnapScrollerProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `SnapScrollerProps`
- `SnapScrollerContentProps`
- `SnapScrollerApiRef`

## Минимальная композиция

<!-- example: snap-scroller/minimal-composition.tsx -->
```tsx
import { SnapScroller, SnapScrollerContent } from '@vega-ui/react';
import type { CSSProperties } from 'react';

const pageStyle: CSSProperties = {
  width: '100%',
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function MinimalComposition() {
  return (
    <SnapScroller tabIndex={0} aria-label='Dashboard sections' style={{ width: '100%', gap: 'var(--spacing-6)' }}>
      <SnapScrollerContent index={0} style={pageStyle}>Overview</SnapScrollerContent>
      <SnapScrollerContent index={1} style={pageStyle}>Metrics</SnapScrollerContent>
      <SnapScrollerContent index={2} style={pageStyle}>Billing</SnapScrollerContent>
    </SnapScroller>
  );
}
```
<!-- /example -->

## Обязательные части

- `SnapScroller`: корневой контейнер прокрутки и координатор привязки
- `SnapScrollerContent`: один элемент с привязкой и стабильным `index`

## Необязательные части

- императивный `apiRef` для перехода назад и вперёд и прокрутки по ключу

## Порядок композиции

1. `SnapScroller`
2. повторяющиеся `SnapScrollerContent index={...}`

## Варианты

- Пассивная привязка с колбэками
- Императивное управление через `apiRef`
- Содержимое фиксированного размера или разной ширины, хотя разная ширина требует больше проверок

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

- Поведение привязки сильно зависит от стабильных размеров и порядка элементов.
- `defaultIndex` имеет смысл, только если элемент с таким ключом существует.
- Императивное управление должно опираться на тот же источник истины, что и подсвеченное состояние.

## Частые ошибки

- Управление `apiRef` по устаревшим индексам.
- Перестановка содержимого без пересмотра ключей привязки.
- Ожидание, что элементы разной ширины будут привязываться так же предсказуемо, как одинаковые страницы.
