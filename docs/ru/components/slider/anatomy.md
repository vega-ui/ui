# Slider: анатомия

## Обзор

`Slider` хранит значения всех бегунков и общие настройки (`min`, `max`, `step`, `orientation`, `disabled`, `name`). Каждый `SliderThumb` объединяет `SliderThumbInput` — нативный `<input type="range">`, наложенный на свой участок дорожки между соседями, — и `SliderThumbIndicator`, который рисуется в точке его значения.

## Обязательные части

### `Slider`

Обязательна. Передаёт бегункам настройки диапазона и не даёт соседним бегункам сблизиться. Вертикальному слайдеру нужна высота от родителя.

### `SliderThumb`

Обязательна. Один бегунок: `index` выбирает его элемент в `value` корня, а переменные положения задаются для его частей.

### `SliderThumbInput`

Обязательна, прямой потомок `SliderThumb`. Контролируемое нативное поле range: фокус, клавиатура, значение в форме и доступность обеспечивает браузер; его `min` и `max` — это соседи.

## Необязательные части

### `SliderThumbIndicator`

Визуальный бегунок, прямой потомок `SliderThumb`. Может содержать что угодно: пузырёк со значением, иконку, изображение. Пропускает указатель к нативному полю под ним.

### `SliderTrack`

Видимая дорожка. Без неё бегунки всё равно работают над невидимой дорожкой.

### `SliderRange`

Заполненная часть дорожки: от `min` до единственного бегунка или между первым и последним бегунками.

## Порядок композиции

1. `Slider`
2. `SliderTrack` > `SliderRange`
3. `SliderThumb` — по одному на значение
   1. `SliderThumbInput`
   2. `SliderThumbIndicator`

## Корректные варианты композиции

<!-- example: slider/range-slider.tsx -->
```tsx
import {
  Fieldset,
  FieldsetLegend,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
} from '@vega-ui/react';

export default function RangeSlider() {
  return (
    <Fieldset style={{ width: '100%', maxWidth: 400 }}>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Working hours</FieldsetLegend>
      <Slider min={0} max={24} defaultValue={[9, 18]} minStepsBetweenThumbs={1}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb index={0}>
          <SliderThumbInput name='start-hour' aria-label='Start time' />
          <SliderThumbIndicator />
        </SliderThumb>
        <SliderThumb index={1}>
          <SliderThumbInput name='end-hour' aria-label='End time' />
          <SliderThumbIndicator />
        </SliderThumb>
      </Slider>
    </Fieldset>
  );
}
```
<!-- /example -->

## Некорректные варианты композиции

### Корень без бегунков

Дорожка рендерится, но взаимодействовать и отправлять нечего.

### Бегунки вне корня

`SliderThumb` читает настройки из корня и позиционируется над дорожкой корня.

### Поле ввода или индикатор вне `SliderThumb`

Они читают свой `index` из `SliderThumb`; стили наведения, нажатия, фокуса и отключённого состояния индикатора следуют за полем ввода того же `SliderThumb`.

### Вертикальный слайдер без высоты

Элемент рендерится, но область взаимодействия схлопывается.
