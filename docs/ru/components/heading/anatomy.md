# Heading: анатомия

## Обзор

`Heading` — примитив из одной части. Корень отвечает за семантический уровень заголовка, визуальный размер и насыщенность шрифта.

## Обязательные части

### `Heading`

Обязательная. Рендерит элемент заголовка и применяет типографику заголовков VegaUI.

## Необязательные части

Экспортируемых дочерних частей нет.

## Порядок композиции

1. `Heading`
2. содержимое заголовка

## Допустимые паттерны композиции

У заголовка есть `id`, и `section`, которую он озаглавливает, ссылается на него через `aria-labelledby`, поэтому регион получает то же имя, что и видимый заголовок.

<!-- example: heading/valid-composition-patterns.tsx -->
```tsx
import { Heading, Text } from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <section aria-labelledby='billing-contacts-title' style={{ display: 'grid', gap: 'var(--spacing-2)', width: '100%' }}>
      <Heading as='h3' size={5} id='billing-contacts-title'>Billing contacts</Heading>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Invoices are sent to finance@acme.io and the workspace owner.</Text>
    </section>
  );
}
```
<!-- /example -->

## Недопустимые паттерны композиции

### Уровень заголовка выбран только по визуальному размеру

Это ломает структуру документа.

### Основной текст стилизован под структуру разделов

Это скрывает навигационную семантику от вспомогательных технологий.
