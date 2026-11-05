# SnapScroller: стилизация

## Обзор

Стили `SnapScroller` в основном структурные: раскладка контейнера прокрутки, поведение привязки и скрытые полосы прокрутки. `SnapScrollerContent` добавляет выравнивание привязки и поведение сжатия.

## Публичные CSS-переменные

В текущей реализации нет локальных CSS-переменных компонента.

## Переменные частей

### Корень

Корень использует flex-раскладку, `scroll-snap-type: x mandatory`, плавную прокрутку и скрытые полосы прокрутки.

### Содержимое

Каждый элемент содержимого использует `scroll-snap-align: start`, `scroll-snap-stop: always` и `flex-shrink: 0`.

## Взаимодействие состояний и вариантов

- Встроенных визуальных вариантов нет.
- Поведение раскладки зависит от ширины контейнера, промежутка и ширины каждого элемента содержимого.

## Примеры

### Выглядывающая следующая карточка

Карточки уже области просмотра, поэтому следующая выглядывает из-за края. `paddingInline` на скроллере задаёт отступ ряда, а такой же `scrollPaddingInline` выравнивает привязку по этому отступу; хук привязки учитывает scroll padding, поэтому зафиксированный индекс остаётся верным.

<!-- example: snap-scroller/peek-next-card.tsx -->
```tsx
import { Heading, SnapScroller, SnapScrollerContent, Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

const articles = [
  { title: 'Migrating to v3', minutes: 6 },
  { title: 'Theming with tokens', minutes: 4 },
  { title: 'Building a date range form', minutes: 9 },
  { title: 'Testing overlays in the browser', minutes: 7 },
];

const cardStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--spacing-4)',
  width: 'calc(100% - var(--spacing-32))',
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function PeekNextCard() {
  return (
    <SnapScroller
      tabIndex={0}
      aria-label='Guides'
      style={{
        width: '100%',
        gap: 'var(--spacing-6)',
        paddingInline: 'var(--spacing-8)',
        scrollPaddingInline: 'var(--spacing-8)',
        boxSizing: 'border-box',
      }}
    >
      {articles.map((article, index) => (
        <SnapScrollerContent key={article.title} index={index} style={cardStyle}>
          <Heading as='h3' size={4}>{article.title}</Heading>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>{article.minutes} min read</Text>
        </SnapScrollerContent>
      ))}
    </SnapScroller>
  );
}
```
<!-- /example -->

## Не переопределяйте

- не меняйте выравнивание привязки мимоходом, не перепроверив поведение навигации
- не полагайтесь на нестабильную ширину элементов, если нужна точная привязка
