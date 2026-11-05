# Card

## Профиль документа

`primitive`

## Кратко

`Card` — контейнер-поверхность для сгруппированного содержимого: панелей настроек, блоков дашборда и встроенных сводок. Это поверхность для раскладки и группировки, а не примитив обратной связи или статуса.

## Импорты

```tsx
import {
  Card,
  type CardProps,
  type CardSize,
  type CardAppearance,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `CardProps`
- `CardSize`
- `CardAppearance`

## Базовое использование

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

## Варианты

- Размеры: `sm`, `md`, `lg`
- Оформление: `outline`, `transparent`
- Композиция: `article` по умолчанию или `asChild`

## Связанные документы

- [Примеры](./examples.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Паттерны](./patterns.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- `Card` — поверхность раскладки, а не семантическая замена заголовков или разделов.
- Прозрачные карточки работают, только когда контраст уже даёт родительская поверхность.
- Внутренние отступы по-прежнему определяет раскладка дочерних элементов.
- Если интерфейс пытается сообщить статус или срочность, а не сгруппировать содержимое, обычно понятнее подходят `Alert` или `Badge`.

## Частые ошибки

- Ожидать, что `Card` автоматически обеспечит все внутренние отступы раскладки.
- Использовать прозрачные карточки на визуально шумных фонах.
- Передавать иерархию только через оформление карточки.
