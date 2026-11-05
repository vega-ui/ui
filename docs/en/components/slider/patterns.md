# Slider Patterns

## Volume Or Brightness Control

When to use:

- users adjust one bounded setting quickly

Composition notes:

- show the current value nearby when precision matters
- keep the slider wide enough for comfortable dragging

Trade-offs:

- fast and tactile
- less exact than typed entry

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

## Price Range Filter

When to use:

- users pick a lower and an upper bound

Composition notes:

- label both thumbs
- set `minStepsBetweenThumbs` when the bounds must not meet

Trade-offs:

- one control for two related values
- thumbs close together are harder to grab; a click on the track moves the nearest one

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

## Vertical Control

When to use:

- the layout is narrow and a vertical control reads better

Composition notes:

- set `orientation='vertical'`
- provide a real height

Trade-offs:

- efficient in certain dense layouts
- easier to render incorrectly than the horizontal default

<!-- example: slider/vertical-slider.tsx -->
```tsx
import { useState } from 'react';
import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';

export default function VerticalSlider() {
  const [level, setLevel] = useState(70);

  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 'var(--spacing-12)' }}>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-4)' }}>
        <Slider orientation='vertical' value={level} onChangeValue={setLevel} style={{ height: 200 }}>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb>
            <SliderThumbInput aria-label='Master volume' aria-valuetext={`${level}%`} />
            <SliderThumbIndicator />
          </SliderThumb>
        </Slider>
        <Text size={1} fontWeight={600} style={{ fontVariantNumeric: 'tabular-nums' }}>{level}%</Text>
      </div>
      <Text size={2} style={{ maxWidth: 220, color: 'var(--label-secondary)' }}>
        A vertical slider needs an explicit height. Arrow Up and Arrow Right raise the value, Page Up and Page Down jump by a tenth.
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Value Label On Thumb

When to use:

- the exact value matters while dragging, and there is no room for a separate readout

Composition notes:

- control the value and render it inside `SliderThumbIndicator`, so the label moves with the thumb
- hide the bubble from assistive technology; the input already announces the value

Trade-offs:

- the value stays next to the pointer
- the bubble needs free space above the track

<!-- example: slider/value-label-on-thumb.tsx -->
```tsx
import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

export default function ValueLabelOnThumb() {
  const [volume, setVolume] = useState(40);

  return (
    <Slider value={volume} onChangeValue={setVolume} style={{ width: '100%', maxWidth: 400, marginBlockStart: 'var(--spacing-16)' }}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb>
        <SliderThumbInput aria-label='Volume' />
        <SliderThumbIndicator>
          <span
            aria-hidden
            style={{
              position: 'absolute',
              insetBlockEnd: 'calc(100% + var(--spacing-3))',
              insetInlineStart: '50%',
              width: 0,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Text
              size={1}
              fontWeight={600}
              style={{
                paddingBlock: 'var(--spacing-1)',
                paddingInline: 'var(--spacing-3)',
                borderRadius: 'var(--radius-2)',
                color: 'var(--color-white)',
                background: 'var(--color-primary-500)',
                fontVariantNumeric: 'tabular-nums',
                whiteSpace: 'nowrap',
              }}
            >
              {volume}
            </Text>
          </span>
        </SliderThumbIndicator>
      </SliderThumb>
    </Slider>
  );
}
```
<!-- /example -->

## Discrete Steps With Labels

When to use:

- the value is one of a few named options, such as plans or tiers

Composition notes:

- map indexes to labels: `min={0}`, `max` is the last index, `step={1}`
- pass the label as `aria-valuetext`, so screen readers announce the option, not the index

Trade-offs:

- every option is visible at a glance
- works only for a short list; long labels collide under the track

<!-- example: slider/discrete-steps-with-labels.tsx -->
```tsx
import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

const plans = ['1 GB', '5 GB', '20 GB', '100 GB', '1 TB'];
const last = plans.length - 1;

export default function DiscreteStepsWithLabels() {
  const [plan, setPlan] = useState(2);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%', maxWidth: 400 }}>
      <Slider min={0} max={last} step={1} value={plan} onChangeValue={setPlan}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb>
          <SliderThumbInput aria-label='Storage' aria-valuetext={plans[plan]} />
          <SliderThumbIndicator />
        </SliderThumb>
      </Slider>
      <div aria-hidden style={{ position: 'relative', height: 'var(--spacing-10)' }}>
        {plans.map((label, index) => (
          <div
            key={label}
            style={{
              position: 'absolute',
              insetInlineStart: `${index / last * 100}%`,
              width: 0,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Text size={1} style={{ whiteSpace: 'nowrap', color: index === plan ? 'var(--label-primary)' : 'var(--label-secondary)' }}>
              {label}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
```
<!-- /example -->
