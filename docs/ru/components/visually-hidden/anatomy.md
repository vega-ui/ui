# VisuallyHidden: анатомия

## Обзор

`VisuallyHidden` — примитив из одной части, который применяет к своему содержимому стандартный CSS-паттерн визуального скрытия.

## Обязательные части

### `VisuallyHidden`

Обязательна. Отвечает за рендер, при котором содержимое скрыто визуально, но остаётся доступным.

## Необязательные части

Экспортируемых дочерних частей нет.

## Порядок композиции

1. `VisuallyHidden`
2. скрытое содержимое

## Допустимые паттерны композиции

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

## Недопустимые паттерны композиции

### Скрытый текст по умолчанию вместо видимой подписи

Интерфейсом становится труднее пользоваться зрячим пользователям.

### Скрытое содержимое не синхронизировано с видимым состоянием

Пользователи вспомогательных технологий получают устаревшую информацию.
