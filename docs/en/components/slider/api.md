# Slider API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `V` | — | No | Controlled value: a number for one thumb, or an array with one entry per `SliderThumb` by its `index`. |
| `defaultValue` | `V` | — | No | Initial value for uncontrolled usage: a number for one thumb, or an array with one entry per `SliderThumb` by its `index`. Defaults to the middle of the range, like `<input type="range">`. |
| `onChangeValue` | `(value: NoInfer<V>) => void` | — | No | Called when a thumb changes, with a number or an array, in the shape of `value` or `defaultValue`. |
| `min` | `number` | `0` | No | The minimum allowed value. Defaults to `0`. |
| `max` | `number` | `100` | No | The maximum allowed value. Defaults to `100`. |
| `step` | `number \| 'any'` | `1` | No | The granularity of the values, a number or `'any'`. Defaults to `1`. |
| `minStepsBetweenThumbs` | `number` | `0` | No | The minimum distance between neighbouring thumbs, in steps. Defaults to `0`. Has no effect with `step='any'`, which has no step to count; use a small numeric step such as `0.01` to keep a gap. |
| `orientation` | `SliderOrientation` | `'horizontal'` | No | `'horizontal'` (default) or `'vertical'`, which grows from the bottom. |
| `size` | `SliderSize` | `'md'` | No | Visual size of the slider. |
| `variant` | `SliderVariant` | `'primary'` | No | Visual styling variant. |
| `disabled` | `boolean` | — | No | Disables all thumbs. |
| `name` | `string` | — | No | Form field name of the thumbs, unless a thumb sets its own. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the root element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `SliderTrack`: the rail, a `div`.
- `SliderRange`: the filled part of the rail, a `div` inside `SliderTrack`.
- `SliderThumb`: one handle, a `div` with `display: contents` that groups its input and indicator.
  - `index`: its entry of the root `value`, `0` by default
  - sets the position variables; CSS variables in its `style` reach both parts
- `SliderThumbInput`: the native `<input type="range">` inside `SliderThumb`. All its props (`name`, `disabled`, `list`, `aria-*`, `onChange`, `ref`…) go to the input; `min`, `max`, `step` and `value` come from the root.
- `SliderThumbIndicator`: the visual handle inside `SliderThumb`, a `div` with any content. It is `aria-hidden` and lets the pointer through to the input.

### `SliderTrack`

<!-- AUTO-GENERATED:PART_API:SliderTrack:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | — |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:SliderTrack:end -->

### `SliderRange`

<!-- AUTO-GENERATED:PART_API:SliderRange:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | — |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:SliderRange:end -->

### `SliderThumb`

<!-- AUTO-GENERATED:PART_API:SliderThumb:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `index` | `number` | `0` | No | Position of the thumb among the thumbs of the `Slider`, its entry of the root `value`. Defaults to `0`. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the thumb element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:SliderThumb:end -->

### `SliderThumbInput`

<!-- AUTO-GENERATED:PART_API:SliderThumbInput:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLInputElement>` | — | No | Ref to the native `<input type="range">`. |

Also accepts all `<input>` attributes.
<!-- AUTO-GENERATED:PART_API:SliderThumbInput:end -->

### `SliderThumbIndicator`

<!-- AUTO-GENERATED:PART_API:SliderThumbIndicator:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the indicator element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:SliderThumbIndicator:end -->

## Hooks

Advanced hooks for custom parts inside `Slider`. Use them only when the exported parts are not enough.

### `useSliderContext`

Root state, available anywhere inside `Slider`:

| Field | Type | Notes |
| --- | --- | --- |
| `min` | `number` | Root `min`. |
| `max` | `number` | Root `max`. |
| `step` | `number \| 'any'` | Root `step`. |
| `gap` | `number` | Minimum distance between neighbouring thumbs: `minStepsBetweenThumbs * step`, `0` with `step='any'`. |
| `orientation` | `SliderOrientation` | Root `orientation`. |
| `disabled` | `boolean \| undefined` | Root `disabled`. |
| `name` | `string \| undefined` | Root `name`. |
| `values` | `number[]` | Current values of all thumbs by `index`, snapped to the step grid and sorted, an array even for one thumb. |
| `changeThumb(index, value)` | `(index: number, value: number) => void` | Sets the value of the thumb at `index`, kept between its neighbours; reports through `onChangeValue`. |

### `useSliderThumbContext`

The surrounding `SliderThumb`:

| Field | Type | Notes |
| --- | --- | --- |
| `index` | `number` | `index` of the thumb. |
| `low` | `number` | Lowest value the thumb may take: the previous thumb plus `gap`, or `min`. |
| `high` | `number` | Highest value the thumb may take: the next thumb minus `gap`, or `max`. |

A value bubble that also works without `value` on the root:

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

## Types

- `SliderProps`
- `SliderTrackProps`
- `SliderRangeProps`
- `SliderThumbProps`
- `SliderThumbInputProps`
- `SliderThumbIndicatorProps`
- `SliderSize`
- `SliderVariant`
- `SliderOrientation`

## State Model

`Slider` owns the values of its thumbs. The shape follows `value` or `defaultValue`: a number for one thumb, an array with one entry per `SliderThumb` by its `index` for several. `onChangeValue` receives the same shape.

- Uncontrolled: `defaultValue` sets the start; a reset of the form of the thumbs restores it, including a form linked with the `form` attribute. Without `value` and `defaultValue` the slider has one thumb in the middle of the range and reports numbers, like `<input type="range">`.
- Controlled: `value` with `onChangeValue`. A change the parent does not apply is rolled back, like a controlled input.
- Each thumb is a controlled native input: pointer, keyboard, focus, forms and assistive technologies come from the browser, and `onChange` on a thumb fires for every change.
- Values off the step grid or outside `min`/`max` are snapped like `<input type="range">` does, without calling `onChangeValue`.
- The shape is fixed by the first value: switching between a number and an array on the fly is not supported.

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

## Thumb Constraints

- Each thumb input gets its own native `min` and `max`: the neighbours' values, `minStepsBetweenThumbs * step` away, or the root `min` and `max` at the ends. The browser keeps the thumb between them for dragging and keys, and `aria-valuemin`/`aria-valuemax` announce the real limits.
- With `step='any'` there is no step to count, so `minStepsBetweenThumbs` has no effect and thumbs may meet; use a small numeric step such as `0.01` to keep a gap.
- Values given out of order are sorted and kept `minStepsBetweenThumbs` steps apart, without calling `onChangeValue`, so the thumbs, the inputs and the submitted values agree.

## Behavior

- Like `<input type="range">`, steps count from `min` and the value stays within `min` and the last step that fits in `max`.
- The inputs of neighbouring thumbs are cut at the midpoint between their values, so a click on the track moves the nearest thumb natively. Stacked thumbs are split at their centre: the left half moves the lower one, the right half the upper one.
- A disabled thumb keeps its half of the track: a click there does nothing.
- On touch screens a horizontal slider leaves gestures to the browser like `<input type="range">`; a vertical one sets `touch-action: pan-x pinch-zoom`, so a vertical swipe moves the thumb instead of scrolling the page.
- A `<datalist>` connected through `list` snaps the pointer natively; its tick marks are not visible, draw your own.
