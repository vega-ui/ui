# SnapScroller: анатомия

## Обзор

`SnapScroller` — контейнер прокрутки с поддержкой привязки, который регистрирует дочерние элементы по индексу и через хук scroll-snap вычисляет промежуточную и зафиксированную позиции привязки.

## Обязательные части

### `SnapScroller`

Обязательная. Владеет контейнером прокрутки, определением привязки, императивным API и реестром элементов.

### `SnapScrollerContent`

Обязательна в обычной композиции. Представляет один элемент с привязкой и регистрирует свой индекс в корне.

## Необязательные части

### `apiRef`

Необязательный императивный интерфейс для `prev()`, `next()`, прокрутки по ключу и измерений.

## Порядок композиции

1. `SnapScroller`
2. повторяющиеся `SnapScrollerContent index={...}`

## Корректные паттерны композиции

Каждый прямой потомок — `SnapScrollerContent` с последовательным `index`. С `asChild` элемент рендерит ваш собственный тег, здесь `<figure>` с подписью, и при этом остаётся элементом привязки.

<!-- example: snap-scroller/valid-composition-patterns.tsx -->
```tsx
import { SnapScroller, SnapScrollerContent, Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

const rooms = ['Reception', 'Meeting room', 'Quiet zone', 'Kitchen'];

const figureStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--spacing-4)',
  width: '100%',
  margin: 0,
};

const photoStyle: CSSProperties = {
  height: 120,
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function ValidCompositionPatterns() {
  return (
    <SnapScroller tabIndex={0} aria-label='Office photos' style={{ width: '100%', gap: 'var(--spacing-6)' }}>
      {rooms.map((room, index) => (
        <SnapScrollerContent key={room} index={index} asChild>
          <figure style={figureStyle}>
            <div role='img' aria-label={`${room} photo`} style={photoStyle} />
            <Text asChild size={2} style={{ color: 'var(--label-secondary)' }}>
              <figcaption>{room}</figcaption>
            </Text>
          </figure>
        </SnapScrollerContent>
      ))}
    </SnapScroller>
  );
}
```
<!-- /example -->

## Некорректные паттерны композиции

### Содержимое без стабильных индексов

Система привязки не может вычислить согласованные ключи.

### Порядок дочерних элементов меняется, а внешний код всё ещё рассчитывает на старые индексы

Императивная навигация и подсвеченное состояние расходятся.

### `SnapScrollerContent` как произвольная раскладка, не являющаяся страницей

Компонент ориентирован на страницы, а не на обычную строку с переполнением.
