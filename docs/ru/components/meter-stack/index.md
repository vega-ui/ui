# MeterStack

## Профиль документа

`compound`

## Кратко

`MeterStack` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для сегментированных индикаторов. Он показывает итоговое значение как несколько цветных сегментов вместо одной сплошной полосы, делая главным сообщением состав и распределение.

## Импорты

```tsx
import {
  MeterStack,
  MeterStackSegment,
  type MeterStackProps,
  type MeterStackSegmentProps,
  type MeterStackSize,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `MeterStackProps`
- `MeterStackSegmentProps`
- `MeterStackSize`

## Минимальная композиция

У самого `MeterStack` роли нет, а каждый `MeterStackSegment` рендерится с `role='meter'`. Задайте корню `role='group'` с доступным именем и подпишите каждый сегмент, иначе скринридер прочитает несколько безымянных индикаторов. Ширина сегмента — это `value / max`, поэтому `max` должен быть в той же шкале, что и значения сегментов.

<!-- example: meter-stack/minimal-composition.tsx -->
```tsx
import { MeterStack, MeterStackSegment } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <MeterStack value={0.8} max={1} role='group' aria-label='Disk usage' fullWidth>
      <MeterStackSegment value={0.5} aria-label='Apps' />
      <MeterStackSegment value={0.3} aria-label='Photos' />
    </MeterStack>
  );
}
```
<!-- /example -->

## Обязательные части

- `MeterStack`: корневая поверхность индикатора и общий контекст диапазона
- `MeterStackSegment`: один сегмент итогового значения

## Необязательные части

- собственные переопределения цвета каждого сегмента через переменные стилей

## Порядок композиции

1. `MeterStack`
2. повторяющиеся `MeterStackSegment`

## Варианты

- Размер: `sm`, `md`, `lg`
- Раскладка: фиксированная ширина или `fullWidth`
- Модель сегментов: любое число упорядоченных сегментов

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

- Порядок сегментов должен отражать реальный смысл.
- Очень маленьким сегментам могут понадобиться подписи или тултипы вне компонента.
- Сумма сегментов — забота потребителя, её нужно проверять в родительской функции.
- Если сегменты не кодируют реальный смысл, один сплошной `Meter` обычно менее шумный и честнее.

## Частые ошибки

- Сумма сегментов выходит за задуманный диапазон.
- Слишком много крошечных сегментов без внешних подписей.
- Цвета сегментов используются как произвольное украшение, а не как значимая кодировка.
