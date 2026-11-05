# VisuallyHidden

## Профиль документа

`primitive`

## Кратко

`VisuallyHidden` оставляет содержимое доступным для вспомогательных технологий, убирая его из визуальной раскладки. Поддерживает нативную обёртку или композицию через `asChild` с помощью `Slot`.

## Импорт

```tsx
import { VisuallyHidden, type VisuallyHiddenProps } from '@vega-ui/react';
```

## Экспортируемые типы

- `VisuallyHiddenProps`

## Базовое использование

<!-- example: visually-hidden/basic-usage.tsx -->
```tsx
import { Heading, Link, Text, VisuallyHidden } from '@vega-ui/react';

const plans = [
  { name: 'Starter', price: '$0', slug: 'starter' },
  { name: 'Team', price: '$12', slug: 'team' },
  { name: 'Enterprise', price: 'Custom', slug: 'enterprise' },
];

export default function BasicUsage() {
  return (
    <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'var(--spacing-4)', width: '100%', margin: 0, padding: 0, listStyle: 'none' }}>
      {plans.map((plan) => (
        <li
          key={plan.slug}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-2)',
            padding: 'var(--spacing-6)',
            border: '1px solid var(--separator-opaque)',
            borderRadius: 'var(--radius-4)',
            background: 'var(--surface-primary)',
          }}
        >
          <Heading as='h3' size={3} fontWeight={600}>{plan.name}</Heading>
          <Text size={3} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{plan.price}</Text>
          <Link href={`/pricing/${plan.slug}`} style={{ marginBlockStart: 'var(--spacing-4)', fontSize: 'var(--font-size-2)' }}>
            Learn more
            <VisuallyHidden asChild>
              <span> about the {plan.name} plan</span>
            </VisuallyHidden>
          </Link>
        </li>
      ))}
    </ul>
  );
}
```
<!-- /example -->

## Варианты

- Рендер: обёртка по умолчанию или `asChild`
- Применение: скрытая подпись, описание или текст статуса

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

- Скрытый текст должен оставаться синхронизированным с видимым состоянием интерфейса.
- `VisuallyHidden` по умолчанию не заменяет видимые подписи.
- `asChild` сохраняет стили скрытия, но меняет нижележащий элемент.

## Частые ошибки

- Скрытый текст устаревает, когда меняется видимое состояние.
- Скрытый текст маскирует плохие видимые подписи.
- Скрыто содержимое, которое на самом деле должно быть видно большинству пользователей.
