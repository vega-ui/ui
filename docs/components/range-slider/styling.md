# RangeSlider Styling

## Overview

`RangeSlider` uses the same shared slider-base styling contract as `Slider`. Most styling behavior comes from `SliderBase`, `SliderBaseThumb`, and `SliderBaseProgress`.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--slider-size` | base track and thumbs | base visual scale |
| `--slider-base-progress-color` | progress | selected interval color |
| `--slider-base-thumb-color` | thumbs | thumb fill |
| `--slider-base-thumb-border-color` | thumbs | default border |
| `--slider-base-thumb-border-color-hover` | thumbs | hover border |
| `--slider-base-thumb-border-color-active` | thumbs | active border |

## Part-Level Variables

### Root

The root sets value, min, and max CSS variables used for thumb and progress positioning.

### Thumbs

Each thumb reads its own current value while sharing the same base size and border contract.

### Progress

Progress spans from the first thumb value to the second thumb value.

## State And Variant Interaction

- size affects both thumbs and track thickness
- disabled state remaps progress and thumb colors
- orientation changes layout calculations but not the token family

## Examples

### Secondary range indicator

```tsx
<RangeSlider data-variant='secondary'>
  <RangeSliderProgress />
  <RangeSliderThumb index={0} />
  <RangeSliderThumb index={1} />
</RangeSlider>
```

## Do Not Override

- making the two thumbs visually inconsistent without product intent
- removing focus visibility from either thumb
