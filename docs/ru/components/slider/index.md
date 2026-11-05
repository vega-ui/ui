# Slider

## Профиль документа

`advanced interactive`

## Кратко

`Slider` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для выбора одного или нескольких чисел из ограниченного диапазона. Каждый `SliderThumbInput` — это нативный `<input type="range">`, наложенный на один `SliderTrack`, поэтому клавиатура, фокус, отправка и сброс формы и вспомогательные технологии работают как с нативным элементом. Два бегунка превращают слайдер в слайдер диапазона.

## Импорт

```tsx
import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbInput,
  SliderThumbIndicator,
  SliderTrack,
  useSliderContext,
  useSliderThumbContext,
  type SliderOrientation,
  type SliderProps,
  type SliderRangeProps,
  type SliderSize,
  type SliderThumbProps,
  type SliderThumbInputProps,
  type SliderThumbIndicatorProps,
  type SliderTrackProps,
  type SliderVariant,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `SliderProps`
- `SliderTrackProps`
- `SliderRangeProps`
- `SliderThumbProps`
- `SliderThumbInputProps`
- `SliderThumbIndicatorProps`
- `SliderSize`
- `SliderVariant`
- `SliderOrientation`

## Минимальная композиция

<!-- example: slider/minimal-composition.tsx -->
```tsx
import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Slider defaultValue={50} style={{ width: '100%', maxWidth: 400 }}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb>
        <SliderThumbInput aria-label='Zoom' />
        <SliderThumbIndicator />
      </SliderThumb>
    </Slider>
  );
}
```
<!-- /example -->

## Обязательные части

- `Slider`: корень, значения всех бегунков и общие настройки диапазона
- `SliderThumb`: один бегунок на каждое значение
- `SliderThumbInput`: нативное поле range у бегунка

## Необязательные части

- `SliderTrack`: видимая дорожка
- `SliderRange`: заполненная часть дорожки внутри `SliderTrack`
- `SliderThumbIndicator`: визуальный бегунок; без него бегунок невидим

## Порядок композиции

1. `Slider`
2. `SliderTrack` > `SliderRange`
3. `SliderThumb` — по одному на значение, `index` по порядку от `min` к `max`, внутри `SliderThumbInput` и `SliderThumbIndicator`

## Варианты

- Размер: `sm`, `md`, `lg`
- Вариант: `primary`, `secondary`
- Ориентация: `horizontal` или `vertical`
- Бегунки: одно значение или диапазон из нескольких
- Модель значения: контролируемая или неконтролируемая на корне, число для одного бегунка или массив для нескольких
- Шаг: числовой шаг или `'any'`

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

- Попасть в точное значение слайдером труднее, чем набрать его в поле.
- Вертикальным слайдерам нужна явная высота.
- Бегунки не могут обогнать друг друга; `minStepsBetweenThumbs` сохраняет промежуток между ними.
- Без `value` или `defaultValue` у слайдера один бегунок посередине, как у `<input type="range">`.

## Частые ошибки

- Слайдер используют там, где главное — точный ввод числа.
- Забывают показать видимое значение в сценариях, где важна точность.
- Оставляют бегунки без `aria-label` или `aria-labelledby`.
- Рендерят число `SliderThumb`, отличное от числа значений, или дают двум бегункам одинаковый `index`.
