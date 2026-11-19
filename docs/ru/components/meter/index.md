# Meter

## Профиль документа

`advanced interactive`

## Кратко

`Meter` показывает ограниченное количественное значение, как правило без семантики прогресса во времени, свойственной индикатору выполнения. Это полоса описательного измерения для случаев, когда интерфейс должен читаться как уровень, оценка, ёмкость или качество, а не как выполнение задачи.

## Импорт

```tsx
import {
  Meter,
  MeterTrack,
  type MeterProps,
  type MeterSize,
  type MeterVariant,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `MeterProps`
- `MeterTrackProps`
- `MeterSize`
- `MeterVariant`

## Минимальная композиция

По умолчанию `max` равен `1`, поэтому дробному значению вроде `0.72` `max` не нужен; для любой другой шкалы передайте `max` (`value={36} max={50}`). Своей видимой подписи у индикатора нет: задайте `aria-label` или `aria-labelledby`.

<!-- example: meter/minimal-composition.tsx -->
```tsx
import { Meter, MeterTrack } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Meter value={0.72} valueText='72%' aria-label='Disk usage' fullWidth>
      <MeterTrack />
    </Meter>
  );
}
```
<!-- /example -->

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле и импортируйте этот компонент везде. `MyMeter` передаёт свои пропсы в `Meter`, рендерит `label` над полосой и называет им meter, а `valueText` показывает рядом с подписью. См. [Рецепты компонентов](../../recipes.md).

<!-- example: meter/recipe.tsx -->
```tsx
import {
  Card,
  Heading,
  Meter,
  MeterTrack,
  Text,
  type MeterProps,
} from '@vega-ui/react';
import { useId, type ReactNode } from 'react';

interface MyMeterProps extends MeterProps {
  label: ReactNode
}

export function MyMeter({ label, valueText, ...props }: MyMeterProps) {
  const labelId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
        <Text id={labelId} size={2}>{label}</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{valueText}</Text>
      </div>
      <Meter valueText={valueText} aria-labelledby={labelId} fullWidth {...props}>
        <MeterTrack />
      </Meter>
    </div>
  );
}

export default function Recipe() {
  return (
    <Card size='sm' style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Heading as='h3' size={4} fontWeight={600}>Pro plan usage</Heading>
      <MyMeter label='Seats' value={18} max={20} low={15} high={18} optimum={0} valueText='18 of 20 seats' size='sm' />
      <MyMeter label='Storage' value={412} max={500} low={375} high={450} optimum={0} valueText='412 of 500 GB' size='sm' />
      <MyMeter label='Build minutes' value={1240} max={3000} low={2250} high={2700} optimum={0} valueText='1,240 of 3,000 min' size='sm' />
    </Card>
  );
}
```
<!-- /example -->

## Обязательные части

- `Meter`: корневая поверхность индикатора
- `MeterTrack`: видимая дорожка заполнения

## Необязательные части

- Помимо корня и дорожки, других публичных частей нет

## Порядок композиции

1. `Meter`
2. `MeterTrack`

## Варианты

- Размеры: `sm`, `md`, `lg`
- Варианты: `primary`, `secondary`
- Состояния: нейтральное, хорошее, предупреждающее, плохое — через пороги

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [Паттерны](./patterns.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- `Meter` предназначен для ограниченного измерения, а не для асинхронного выполнения.
- Пропсы порогов, такие как `low`, `high` и `optimum`, могут менять семантическое цветовое состояние.
- Окружающий текст должен объяснять измеряемое значение и диапазон.
- Если измерение на самом деле складывается из нескольких значимых частей, `MeterStack` обычно понятнее одной сплошной полосы.

## Частые ошибки

- Использование `Meter` для загрузки или асинхронной работы.
- Значение без объяснения диапазона или смысла.
- Игнорирование семантики порогов, когда она важна для интерпретации.
