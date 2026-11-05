# Icon: стилизация

## Обзор

Стилизация `Icon` определяется размером, а цвет в основном задаётся через `currentColor`.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--icon-size` | корень | вычисленный размер из токена |

## Переменные на уровне частей

### Корень

Корень сопоставляет значения `data-size` с одной переменной `--icon-size` и применяет её и к ширине, и к высоте.

## Взаимодействие состояний и вариантов

- размер из токена используется, только если явные ширина и высота не заданы
- цвет иконки следует `currentColor`

## Примеры

### Крупная смысловая иконка

Задавайте цвет иконки через CSS-свойство `color` (здесь через `style`): глиф рисуется цветом `currentColor`, поэтому токены темы работают напрямую. Более тонкий `strokeWidth` не даёт крупным глифам выглядеть тяжёлыми.

<!-- example: icon/large-semantic-icon.tsx -->
```tsx
import { Heading, Icon, Text } from '@vega-ui/react';
import { CircleCheckBigIcon } from '@vega-ui/icons';

export default function LargeSemanticIcon() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%', textAlign: 'center' }}>
      <Icon size='xl' strokeWidth={1.5} style={{ color: 'var(--color-green-accent-500)' }}>
        <CircleCheckBigIcon />
      </Icon>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4} fontWeight={600}>Payment received</Heading>
        <Text size={3} style={{ color: 'var(--label-secondary)', textWrap: 'balance' }}>We emailed the receipt to finance@acme.com.</Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Что не переопределять

- не задавайте жёсткие цвета иконок там, где результат должен определять цвет окружающего текста
- не смешивайте непредсказуемо явные переопределения ширины и высоты в одном семействе элементов управления
