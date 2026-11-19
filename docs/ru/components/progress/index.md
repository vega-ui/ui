# Progress

## Профиль документа

`advanced interactive`

## Кратко

`Progress` сообщает о выполнении продолжающейся задачи или операции. Это полоса обратной связи во времени — для случаев, когда интерфейс должен показывать работу, движущуюся к завершению.

## Импорт

```tsx
import {
  Progress,
  ProgressTrack,
  type ProgressProps,
  type ProgressSize,
  type ProgressVariant,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `ProgressProps`
- `ProgressTrackProps`
- `ProgressSize`
- `ProgressVariant`

## Минимальная композиция

По умолчанию `max` равен `100`. Без `ProgressTrack` полоса рендерится пустой, а без `aria-label` или `aria-labelledby` у индикатора нет доступного имени.

<!-- example: progress/minimal-composition.tsx -->
```tsx
import { Progress, ProgressTrack } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Progress value={40} aria-label='Upload progress' fullWidth>
      <ProgressTrack />
    </Progress>
  );
}
```
<!-- /example -->

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле и импортируйте этот компонент везде. `MyProgress` передаёт свои пропсы в `Progress`, рендерит `label` над полосой и называет им progressbar, а `valueText` показывает рядом с подписью. См. [Рецепты компонентов](../../recipes.md).

<!-- example: progress/recipe.tsx -->
```tsx
import {
  Progress,
  ProgressTrack,
  Text,
  type ProgressProps,
} from '@vega-ui/react';
import { useId, type ReactNode } from 'react';

interface MyProgressProps extends ProgressProps {
  label: ReactNode
}

export function MyProgress({ label, valueText, ...props }: MyProgressProps) {
  const labelId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
        <Text id={labelId} size={2} fontWeight={500}>{label}</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{valueText}</Text>
      </div>
      <Progress valueText={valueText} aria-labelledby={labelId} fullWidth {...props}>
        <ProgressTrack />
      </Progress>
    </div>
  );
}

export default function Recipe() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-10)', width: '100%', maxWidth: 360 }}>
      <MyProgress label='quarterly-report.pdf' value={35} valueText='4.2 of 12 MB' size='sm' />
      <MyProgress label='team-offsite.mov' indeterminate valueText='Preparing…' size='sm' />
    </div>
  );
}
```
<!-- /example -->

## Обязательные части

- `Progress`: корневая поверхность progressbar
- `ProgressTrack`: видимая полоса заполнения

## Необязательные части

- Кроме корня и полосы, других публичных частей нет

## Порядок композиции

1. `Progress`
2. `ProgressTrack`

## Варианты

- Размеры: `sm`, `md`, `lg`
- Варианты: `primary`, `secondary`
- Состояния: определённое, неопределённое, на всю ширину

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

- Неопределённое и определённое состояния должны различаться в окружающем интерфейсе.
- Значения прогресса должны оставаться в ожидаемом диапазоне на стороне потребителя.
- Используйте поясняющий окружающий текст, когда пользователю нужно знать, что именно выполняется.
- Если значение на самом деле — оценка, уровень использования или индикатор ёмкости, обычно понятнее абстракция `Meter`.

## Частые ошибки

- Использовать стили прогресса для статичных оценок.
- Не давать текстового контекста о том, что выполняется.
- Передавать значения, которые не соответствуют отображаемому диапазону.
