# Slider Styling

## Overview

`Slider` sets its size and colors as CSS variables on the root; `SliderTrack`, `SliderRange`, `SliderThumbInput` and `SliderThumbIndicator` read them. Thumb and range positions are CSS variables written by the slider, so custom styles can use them too.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--slider-size` | track, thumb | base visual scale, the track thickness |
| `--slider-br-ratio` | track | border-radius ratio |
| `--slider-thumb-size` | root, thumb | thumb size, `--slider-size * 3` by default; also the root thickness |
| `--slider-range-color` | range | filled track color |
| `--slider-thumb-color` | thumb | thumb fill color |
| `--slider-thumb-border-color` | thumb | default thumb border |
| `--slider-thumb-border-color-hover` | thumb | hover border |
| `--slider-thumb-border-color-active` | thumb | active border |
| `--focus-color` | thumb focus | focus outline |

## Part-Level Variables

### Root

Sets `--slider-range-start` and `--slider-range-end`, from `0` at `min` to `1` at `max`.

### Thumb

`SliderThumb` sets `--slider-thumb-position`, from `0` to `1`, and `--slider-thumb-start`/`--slider-thumb-end`, the part of the track its input covers; CSS variables set in its `style` reach both parts. `SliderThumbIndicator` is the visible handle and takes any `className`, `style` and content. Change the thumb size with `--slider-thumb-size`, not `width`/`height` of the indicator: the native thumb that takes the pointer uses the variable. `SliderThumbInput` is invisible, stretched over its part of the track and cut by `clip-path` at the midpoints to its neighbours (`--slider-thumb-clip-start`/`--slider-thumb-clip-end`); it takes the pointer, and its hover, active, focus and disabled states restyle the indicator of the same `SliderThumb`.

### Range

`SliderRange` spans from `--slider-range-start` to `--slider-range-end`.

## State And Variant Interaction

- `size` maps to `--slider-size`
- `primary` and `secondary` variants remap range and thumb border colors
- `disabled` remaps range and thumb colors to disabled tokens; a disabled thumb alone does the same for its thumb
- hover, active, focus and disabled states of a thumb follow its native input

## Examples

### Secondary slider

```tsx
<Slider variant='secondary'>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb>
    <SliderThumbInput aria-label='Value' />
    <SliderThumbIndicator />
  </SliderThumb>
</Slider>
```

## Do Not Override

- breaking the relationship between track size and thumb size
- removing focus styling from the thumb
- making the native input visible or changing its size
