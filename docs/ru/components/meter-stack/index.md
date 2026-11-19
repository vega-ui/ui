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

`MeterStack` рендерится с `role='group'`, а каждый `MeterStackSegment` — с `role='meter'`. Назовите корень через `aria-label` или `aria-labelledby` и подпишите каждый сегмент, иначе скринридер прочитает несколько безымянных индикаторов. Ширина сегмента — это `value / max`, поэтому `max` должен быть в той же шкале, что и значения сегментов.

<!-- example: meter-stack/minimal-composition.tsx -->
```tsx
import { MeterStack, MeterStackSegment } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <MeterStack value={0.8} max={1} aria-label='Disk usage' fullWidth>
      <MeterStackSegment value={0.5} aria-label='Apps' />
      <MeterStackSegment value={0.3} aria-label='Photos' />
    </MeterStack>
  );
}
```
<!-- /example -->

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле и импортируйте этот компонент везде. `MyMeterStack` передаёт свои пропсы в `MeterStack`, рендерит `label` над полосой и называет им группу, показывает `summary` рядом с подписью, а сегменты и их легенду строит из `segments`. См. [Рецепты компонентов](../../recipes.md).

<!-- example: meter-stack/recipe.tsx -->
```tsx
import {
  MeterStack,
  MeterStackSegment,
  Text,
  type MeterStackProps,
} from '@vega-ui/react';
import { useId, type CSSProperties, type ReactNode } from 'react';

interface Segment {
  label: string
  value: number
  valueText: string
  color: string
}

interface MyMeterStackProps extends MeterStackProps {
  label: ReactNode
  summary: ReactNode
  segments: Segment[]
}

export function MyMeterStack({ label, summary, segments, ...props }: MyMeterStackProps) {
  const labelId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
          <Text id={labelId} size={2} fontWeight={500}>{label}</Text>
          <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{summary}</Text>
        </div>
        <MeterStack aria-labelledby={labelId} fullWidth {...props}>
          {segments.map((segment) => (
            <MeterStackSegment
              key={segment.label}
              value={segment.value}
              aria-label={segment.label}
              aria-valuetext={segment.valueText}
              style={{ '--meter-stack-segment-color': segment.color } as CSSProperties}
            />
          ))}
        </MeterStack>
      </div>
      <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--spacing-4) var(--spacing-8)', margin: 0, padding: 0, listStyle: 'none' }}>
        {segments.map((segment) => (
          <li key={segment.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <span aria-hidden='true' style={{ flexShrink: 0, width: 8, height: 8, borderRadius: '50%', background: segment.color }} />
            <Text size={2}>{segment.label}</Text>
            <Text size={2} style={{ marginInlineStart: 'auto', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{segment.valueText}</Text>
          </li>
        ))}
      </ul>
    </div>
  );
}

const categories = [
  { label: 'Apps', value: 82, valueText: '82 GB', color: 'var(--color-blue-500)' },
  { label: 'Photos', value: 64, valueText: '64 GB', color: 'var(--color-purple-500)' },
  { label: 'Messages', value: 18, valueText: '18 GB', color: 'var(--color-green-500)' },
  { label: 'System', value: 31, valueText: '31 GB', color: 'var(--color-gray-500)' },
];

export default function Recipe() {
  return (
    <MyMeterStack
      label='iPhone storage'
      summary='195 GB of 256 GB used'
      value={195}
      max={256}
      segments={categories}
    />
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
