# Card: анатомия

## Обзор

`Card` — единый контейнер-поверхность для группировки без публичных дочерних частей. Его анатомия — одна корневая поверхность плюс заголовки, основной текст, метрики или действия, которые размещает потребитель.

## Обязательные части

### `Card`

Обязательна. Владеет оформлением поверхности, внутренними отступами и необязательным полиморфным рендером через `asChild`.

## Необязательные части

`Card` не предоставляет публичных дочерних частей.

## Порядок композиции

1. `Card`
2. заголовок, текст, действия или дочерние элементы раскладки

## Допустимые варианты композиции

<!-- example: card/basic-usage.tsx -->
```tsx
import { Button, Card, Heading, Text } from '@vega-ui/react';

const features = ['Up to 25 members', '100 GB of storage', 'Priority email support', 'SAML single sign-on'];

export default function BasicUsage() {
  return (
    <Card aria-labelledby='plan-team-title' style={{ width: '100%', maxWidth: 320, gap: 'var(--spacing-6)' }}>
      <Heading id='plan-team-title' as='h3' size={4} fontWeight={600}>Team</Heading>
      <Text size={3}>
        <Text size={6} fontWeight={500}>$12</Text> per member / month
      </Text>
      <ul style={{ margin: 0, paddingInlineStart: 'var(--spacing-9)', display: 'grid', gap: 'var(--spacing-2)' }}>
        {features.map((feature) => (
          <li key={feature}><Text size={2} style={{ color: 'var(--label-secondary)' }}>{feature}</Text></li>
        ))}
      </ul>
      <Button fullWidth style={{ marginBlockStart: 'var(--spacing-6)' }}>Start 14-day trial</Button>
    </Card>
  );
}
```
<!-- /example -->

## Недопустимые варианты композиции

### Карточка как единственная семантическая структура

Поверхность не должна заменять заголовки, ориентиры или настоящую иерархию содержимого.

### Прозрачная карточка на низкоконтрастном фоне

Сгруппированное содержимое может полностью потерять визуальное отделение.
