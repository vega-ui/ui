# Slider: API

## Пропсы корня


<!-- AUTO-GENERATED:ROOT_API:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `value` | `V` | — | Нет | Контролируемое значение: число для одного бегунка или массив с одним элементом на каждый `SliderThumb` по его `index`. |
| `defaultValue` | `V` | — | Нет | Начальное значение для неконтролируемого использования: число для одного бегунка или массив с одним элементом на каждый `SliderThumb` по его `index`. По умолчанию — середина диапазона, как у `<input type="range">`. |
| `onChangeValue` | `(value: NoInfer<V>) => void` | — | Нет | Вызывается при изменении бегунка с числом или массивом — в форме `value` или `defaultValue`. |
| `min` | `number` | `0` | Нет | Минимально допустимое значение. По умолчанию `0`. |
| `max` | `number` | `100` | Нет | Максимально допустимое значение. По умолчанию `100`. |
| `step` | `number \| 'any'` | `1` | Нет | Шаг значений: число или `'any'`. По умолчанию `1`. |
| `minStepsBetweenThumbs` | `number` | `0` | Нет | Минимальное расстояние между соседними бегунками в шагах. По умолчанию `0`. Не действует при `step='any'`, где нет шага для отсчёта; чтобы сохранить зазор, используйте небольшой числовой шаг, например `0.01`. |
| `orientation` | `SliderOrientation` | `'horizontal'` | Нет | `'horizontal'` (по умолчанию) или `'vertical'`, который растёт снизу. |
| `size` | `SliderSize` | `'md'` | Нет | Визуальный размер слайдера. |
| `variant` | `SliderVariant` | `'primary'` | Нет | Вариант визуальной стилизации. |
| `disabled` | `boolean` | — | Нет | Отключает все бегунки. |
| `name` | `string` | — | Нет | Имя поля формы для бегунков, если бегунок не задаёт собственное. |
| `ref` | `Ref<HTMLDivElement>` | — | Нет | Ref на корневой элемент. |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Дочерние части

- `SliderTrack`: дорожка, `div`.
- `SliderRange`: заполненная часть дорожки, `div` внутри `SliderTrack`.
- `SliderThumb`: один бегунок, `div` с `display: contents`, объединяющий поле ввода и индикатор.
  - `index`: его элемент в `value` корня, по умолчанию `0`
  - задаёт переменные положения; CSS-переменные в его `style` доходят до обеих частей
- `SliderThumbInput`: нативный `<input type="range">` внутри `SliderThumb`. Все его пропсы (`name`, `disabled`, `list`, `aria-*`, `onChange`, `ref`…) уходят в поле ввода; `min`, `max`, `step` и `value` приходят из корня.
- `SliderThumbIndicator`: визуальный бегунок внутри `SliderThumb`, `div` с любым содержимым. Он `aria-hidden` и пропускает указатель к полю ввода.

### `SliderTrack`

<!-- AUTO-GENERATED:PART_API:SliderTrack:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | Нет | — |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:SliderTrack:end -->

### `SliderRange`

<!-- AUTO-GENERATED:PART_API:SliderRange:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | Нет | — |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:SliderRange:end -->

### `SliderThumb`

<!-- AUTO-GENERATED:PART_API:SliderThumb:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `index` | `number` | `0` | Нет | Позиция бегунка среди бегунков `Slider` — его элемент в корневом `value`. По умолчанию `0`. |
| `ref` | `Ref<HTMLDivElement>` | — | Нет | Ref на элемент бегунка. |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:SliderThumb:end -->

### `SliderThumbInput`

<!-- AUTO-GENERATED:PART_API:SliderThumbInput:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLInputElement>` | — | Нет | Ref на нативный `<input type="range">`. |

Также принимает все атрибуты `<input>`.
<!-- AUTO-GENERATED:PART_API:SliderThumbInput:end -->

### `SliderThumbIndicator`

<!-- AUTO-GENERATED:PART_API:SliderThumbIndicator:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | Нет | Ref на элемент индикатора. |

Также принимает все атрибуты `<div>`.
<!-- AUTO-GENERATED:PART_API:SliderThumbIndicator:end -->

## Хуки

Продвинутые хуки для собственных частей внутри `Slider`. Используйте их, только когда экспортируемых частей недостаточно.

### `useSliderContext`

Состояние корня, доступное в любом месте внутри `Slider`:

| Поле | Тип | Примечания |
| --- | --- | --- |
| `min` | `number` | `min` корня. |
| `max` | `number` | `max` корня. |
| `step` | `number \| 'any'` | `step` корня. |
| `gap` | `number` | Минимальное расстояние между соседними бегунками: `minStepsBetweenThumbs * step`, `0` при `step='any'`. |
| `orientation` | `SliderOrientation` | `orientation` корня. |
| `disabled` | `boolean \| undefined` | `disabled` корня. |
| `name` | `string \| undefined` | `name` корня. |
| `values` | `number[]` | Текущие значения всех бегунков по `index`, приведённые к сетке шага и отсортированные; массив даже для одного бегунка. |
| `changeThumb(index, value)` | `(index: number, value: number) => void` | Задаёт значение бегунка с индексом `index`, удерживая его между соседями; сообщает об изменении через `onChangeValue`. |

### `useSliderThumbContext`

Окружающий `SliderThumb`:

| Поле | Тип | Примечания |
| --- | --- | --- |
| `index` | `number` | `index` бегунка. |
| `low` | `number` | Наименьшее значение, которое может принять бегунок: предыдущий бегунок плюс `gap` или `min`. |
| `high` | `number` | Наибольшее значение, которое может принять бегунок: следующий бегунок минус `gap` или `max`. |

Пузырёк со значением, который работает и без `value` на корне:

<!-- example: slider/usesliderthumbcontext.tsx -->
```tsx
import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
  useSliderContext,
  useSliderThumbContext,
} from '@vega-ui/react';

function ThumbValue() {
  const { values } = useSliderContext();
  const { index } = useSliderThumbContext();

  return (
    <span
      style={{
        position: 'absolute',
        insetBlockEnd: 'calc(100% + var(--spacing-3))',
        insetInlineStart: '50%',
        width: 0,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Text size={1} fontWeight={600} style={{ whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
        {values[index]}°C
      </Text>
    </span>
  );
}

export default function Usesliderthumbcontext() {
  return (
    <Slider min={16} max={28} defaultValue={[19, 23]} minStepsBetweenThumbs={1} style={{ width: '100%', maxWidth: 400, marginBlockStart: 'var(--spacing-16)' }}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb index={0}>
        <SliderThumbInput aria-label='Night temperature' />
        <SliderThumbIndicator>
          <ThumbValue />
        </SliderThumbIndicator>
      </SliderThumb>
      <SliderThumb index={1}>
        <SliderThumbInput aria-label='Day temperature' />
        <SliderThumbIndicator>
          <ThumbValue />
        </SliderThumbIndicator>
      </SliderThumb>
    </Slider>
  );
}
```
<!-- /example -->

## Типы

- `SliderProps`
- `SliderTrackProps`
- `SliderRangeProps`
- `SliderThumbProps`
- `SliderThumbInputProps`
- `SliderThumbIndicatorProps`
- `SliderSize`
- `SliderVariant`
- `SliderOrientation`

## Модель состояния

`Slider` владеет значениями своих бегунков. Форма значения следует `value` или `defaultValue`: число для одного бегунка, массив с одним элементом на каждый `SliderThumb` по его `index` — для нескольких. `onChangeValue` получает ту же форму.

- Неконтролируемый: `defaultValue` задаёт начальное значение; сброс формы бегунков восстанавливает его, в том числе для формы, связанной через атрибут `form`. Без `value` и `defaultValue` у слайдера один бегунок посередине диапазона и он сообщает числа, как `<input type="range">`.
- Контролируемый: `value` вместе с `onChangeValue`. Изменение, которое родитель не применил, откатывается, как у контролируемого поля ввода.
- Каждый бегунок — контролируемое нативное поле: указатель, клавиатуру, фокус, формы и вспомогательные технологии обеспечивает браузер, а `onChange` на бегунке срабатывает при каждом изменении.
- Значения вне сетки шага или за пределами `min`/`max` приводятся так же, как это делает `<input type="range">`, без вызова `onChangeValue`.
- Форма фиксируется первым значением: переключение между числом и массивом на лету не поддерживается.

<!-- example: slider/controlled-brightness.tsx -->
```tsx
import { useState } from 'react';
import {
  Label,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';

export default function ControlledBrightness() {
  const [brightness, setBrightness] = useState(60);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 400 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
          <Label htmlFor='screen-brightness'>Screen brightness</Label>
          <Text size={3} aria-hidden style={{ fontVariantNumeric: 'tabular-nums' }}>{brightness}%</Text>
        </div>
        <Slider value={brightness} onChangeValue={setBrightness}>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb>
            <SliderThumbInput id='screen-brightness' aria-valuetext={`${brightness}%`} />
            <SliderThumbIndicator />
          </SliderThumb>
        </Slider>
      </div>
      <div
        aria-hidden
        style={{
          height: 64,
          borderRadius: 'var(--radius-2)',
          background: 'var(--color-primary-500)',
          filter: `brightness(${0.2 + brightness / 100})`,
        }}
      />
    </div>
  );
}
```
<!-- /example -->

<!-- example: slider/controlled-range.tsx -->
```tsx
import { useState } from 'react';
import {
  Fieldset,
  FieldsetLegend,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';

const products = [
  { name: 'Trail runner', price: 89 },
  { name: 'Rain shell', price: 149 },
  { name: 'Down jacket', price: 279 },
  { name: 'Wool beanie', price: 25 },
  { name: 'Hiking boots', price: 189 },
  { name: 'Day pack', price: 65 },
  { name: 'Fleece vest', price: 79 },
  { name: 'Expedition parka', price: 540 },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function ControlledRange() {
  const [price, setPrice] = useState([50, 200]);

  const matching = products.filter((product) => product.price >= price[0] && product.price <= price[1]);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 400 }}>
      <Fieldset>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Price</FieldsetLegend>
        <Text size={3} aria-hidden style={{ fontVariantNumeric: 'tabular-nums' }}>{currency.format(price[0])} – {currency.format(price[1])}</Text>
        <Slider min={0} max={600} step={10} minStepsBetweenThumbs={5} value={price} onChangeValue={setPrice}>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0}>
            <SliderThumbInput aria-label='Minimum price' aria-valuetext={currency.format(price[0])} />
            <SliderThumbIndicator />
          </SliderThumb>
          <SliderThumb index={1}>
            <SliderThumbInput aria-label='Maximum price' aria-valuetext={currency.format(price[1])} />
            <SliderThumbIndicator />
          </SliderThumb>
        </Slider>
      </Fieldset>
      <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>
        {matching.length} of {products.length} products{matching.length > 0 ? `: ${matching.map((product) => product.name).join(', ')}` : ''}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Ограничения бегунков

- Каждое поле бегунка получает собственные нативные `min` и `max`: значения соседей с отступом `minStepsBetweenThumbs * step` или `min` и `max` корня на краях. Браузер удерживает бегунок между ними при перетаскивании и нажатии клавиш, а `aria-valuemin`/`aria-valuemax` объявляют реальные пределы.
- При `step='any'` шаг считать не из чего, поэтому `minStepsBetweenThumbs` не действует и бегунки могут сойтись; чтобы сохранить промежуток, используйте маленький числовой шаг, например `0.01`.
- Значения, переданные не по порядку, сортируются и разводятся на `minStepsBetweenThumbs` шагов без вызова `onChangeValue`, чтобы бегунки, поля ввода и отправляемые значения совпадали.

## Поведение

- Как и у `<input type="range">`, шаги отсчитываются от `min`, а значение остаётся между `min` и последним шагом, который помещается в `max`.
- Поля ввода соседних бегунков обрезаются по середине между их значениями, поэтому клик по дорожке нативно двигает ближайший бегунок. Бегунки, стоящие друг на друге, делятся по центру: левая половина двигает нижний, правая — верхний.
- Отключённый бегунок сохраняет свою половину дорожки: клик по ней ничего не делает.
- На сенсорных экранах горизонтальный слайдер оставляет жесты браузеру, как `<input type="range">`; вертикальный задаёт `touch-action: pan-x pinch-zoom`, поэтому вертикальный свайп двигает бегунок, а не прокручивает страницу.
- `<datalist>`, подключённый через `list`, нативно примагничивает указатель; его деления не видны — рисуйте свои.
