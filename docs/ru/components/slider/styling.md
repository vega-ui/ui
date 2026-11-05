# Slider: стилизация

## Обзор

`Slider` задаёт размер и цвета как CSS-переменные на корне; `SliderTrack`, `SliderRange`, `SliderThumbInput` и `SliderThumbIndicator` их читают. Положения бегунков и диапазона — это CSS-переменные, которые записывает слайдер, поэтому их могут использовать и собственные стили.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--slider-size` | дорожка, бегунок | базовый визуальный масштаб, толщина дорожки |
| `--slider-br-ratio` | дорожка | коэффициент скругления углов |
| `--slider-thumb-size` | корень, бегунок | размер бегунка, по умолчанию `--slider-size * 3`; также толщина корня |
| `--slider-range-color` | диапазон | цвет заполненной части дорожки |
| `--slider-thumb-color` | бегунок | цвет заливки бегунка |
| `--slider-thumb-border-color` | бегунок | рамка бегунка по умолчанию |
| `--slider-thumb-border-color-hover` | бегунок | рамка при наведении |
| `--slider-thumb-border-color-active` | бегунок | рамка при нажатии |
| `--focus-color` | фокус бегунка | обводка фокуса |
| `--slider-thumb-br-ratio` | `SliderThumbIndicator` | Коэффициент радиуса бегунка. |
| `--slider-thumb-bw-ratio` | `SliderThumbIndicator` | Толщина рамки бегунка относительно его размера. |

## Переменные на уровне частей

### Корень

Задаёт `--slider-range-start` и `--slider-range-end` — от `0` в точке `min` до `1` в точке `max`.

### Бегунок

`SliderThumb` задаёт `--slider-thumb-position` от `0` до `1` и `--slider-thumb-start`/`--slider-thumb-end` — участок дорожки, который покрывает его поле ввода; CSS-переменные в его `style` доходят до обеих частей. `SliderThumbIndicator` — видимый бегунок, он принимает любые `className`, `style` и содержимое. Меняйте размер бегунка через `--slider-thumb-size`, а не через `width`/`height` индикатора: нативный бегунок, который принимает указатель, использует эту переменную. `SliderThumbInput` невидим, растянут на свой участок дорожки и обрезан `clip-path` по серединам до соседей (`--slider-thumb-clip-start`/`--slider-thumb-clip-end`); он принимает указатель, а его состояния наведения, нажатия, фокуса и отключения меняют стили индикатора того же `SliderThumb`.

### Диапазон

`SliderRange` тянется от `--slider-range-start` до `--slider-range-end`.

## Взаимодействие состояний и вариантов

- `size` задаёт `--slider-size`
- варианты `primary` и `secondary` переопределяют цвета диапазона и рамки бегунка
- `disabled` переключает цвета диапазона и бегунка на токены отключённого состояния; отдельный отключённый бегунок делает то же для себя
- состояния наведения, нажатия, фокуса и отключения бегунка следуют его нативному полю ввода

## Примеры

### Слайдер в варианте secondary

<!-- example: slider/secondary-slider.tsx -->
```tsx
import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
} from '@vega-ui/react';

export default function SecondarySlider() {
  return (
    <Slider variant='secondary' defaultValue={25} style={{ width: '100%', maxWidth: 400 }}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb>
        <SliderThumbInput aria-label='Playback position' />
        <SliderThumbIndicator />
      </SliderThumb>
    </Slider>
  );
}
```
<!-- /example -->

## Что не переопределять

- не нарушайте соотношение размера дорожки и размера бегунка
- не убирайте стили фокуса с бегунка
- не делайте нативное поле ввода видимым и не меняйте его размер
