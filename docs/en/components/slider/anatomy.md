# Slider Anatomy

## Overview

`Slider` holds the values of all thumbs and the shared settings (`min`, `max`, `step`, `orientation`, `disabled`, `name`). Each `SliderThumb` groups a `SliderThumbInput`, a native `<input type="range">` laid over its part of the track between its neighbours, and a `SliderThumbIndicator` drawn at its value.

## Required Parts

### `Slider`

Required. Passes range settings to the thumbs and keeps neighbouring thumbs apart. A vertical slider needs a height from its parent.

### `SliderThumb`

Required. One handle: `index` picks its entry of the root `value` and the position variables are set for its parts.

### `SliderThumbInput`

Required, a direct child of `SliderThumb`. A controlled native range input: focus, keyboard, form value and accessibility come from the browser; its `min` and `max` are the neighbours.

## Optional Parts

### `SliderThumbIndicator`

The visual handle, a direct child of `SliderThumb`. It can hold any content: a value bubble, an icon, an image. It lets the pointer through to the native input under it.

### `SliderTrack`

The visible rail. Without it the thumbs still work over an invisible track.

### `SliderRange`

The filled part of the rail: from `min` to a single thumb, or between the first and the last thumbs.

## Composition Order

1. `Slider`
2. `SliderTrack` > `SliderRange`
3. `SliderThumb`, one per value
   1. `SliderThumbInput`
   2. `SliderThumbIndicator`

## Valid Composition Patterns

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

## Invalid Composition Patterns

### Root without thumbs

The track renders, but there is nothing to interact with or submit.

### Thumbs outside the root

`SliderThumb` reads its settings from the root and is positioned over the root track.

### Input or indicator outside `SliderThumb`

They read their `index` from `SliderThumb`; the hover, active, focus and disabled styles of the indicator follow the input of the same `SliderThumb`.

### Vertical slider without a height

The control renders, but the interaction space collapses.
