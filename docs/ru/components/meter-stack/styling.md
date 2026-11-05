# MeterStack: стилизация

## Обзор

Стили `MeterStack` основаны на токенах и намеренно минимальны. Корень задаёт высоту дорожки, промежуток и фон, а каждый сегмент — собственную пропорциональную ширину и цвет.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--meter-stack-height` | корень | высота дорожки |
| `--meter-stack-br-ratio` | корень | коэффициент радиуса дорожки |
| `--meter-stack-gap-ratio` | корень | промежуток между сегментами |
| `--meter-stack-value` | корень | текущее итоговое значение |
| `--meter-stack-max` | корень и сегменты | расчёт пропорциональной ширины |
| `--meter-stack-segment-value` | сегмент | доля ширины сегмента |
| `--meter-stack-segment-color` | сегмент | цвет заливки сегмента |
| `--meter-stack-segment-br-ratio` | `MeterStackSegment` | Коэффициент радиуса сегмента. |

## Переменные уровня частей

### Корень

Корень переводит размер в высоту, применяет `--fills-secondary` как базовую дорожку и раскладывает сегменты через flex.

### Сегмент

Каждый сегмент вычисляет ширину из `value / max` и может переопределить свой цвет через `--meter-stack-segment-color`.

## Взаимодействие состояний и вариантов

- размер меняет высоту дорожки
- `fullWidth` задаёт ширину 100%
- цвет задаётся для каждого сегмента, а не для всего корня

## Примеры

### Собственная синяя шкала

<!-- example: meter-stack/custom-blue-scale.tsx -->
```tsx
import { MeterStack, MeterStackSegment } from '@vega-ui/react';
import { CSSProperties } from 'react';

export default function CustomBlueScale() {
  return (
    <MeterStack value={0.85} max={1} role='group' aria-label='Traffic by region' size='lg' fullWidth>
      <MeterStackSegment value={0.4} aria-label='Europe' style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-700)' } as CSSProperties} />
      <MeterStackSegment value={0.3} aria-label='North America' style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-500)' } as CSSProperties} />
      <MeterStackSegment value={0.15} aria-label='Asia' style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-300)' } as CSSProperties} />
    </MeterStack>
  );
}
```
<!-- /example -->

## Не переопределяйте

- не задавайте ширину сегментов, не отражающую реальные значения
- не убирайте контраст между базовой дорожкой и сегментами
