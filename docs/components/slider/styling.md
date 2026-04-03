# Slider Styling

## Overview

`Slider` styling is inherited from `SliderBase` and its shared thumb/progress parts. The public-looking contract is mostly `--slider-base-*` and shared size variables rather than `--slider-*` component-local tokens.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--slider-size` | base track and thumb sizing | base visual scale |
| `--slider-br-ratio` | base track | border-radius ratio |
| `--slider-base-progress-color` | progress | filled track color |
| `--slider-base-thumb-color` | thumb | thumb fill color |
| `--slider-base-thumb-border-color` | thumb | default thumb border |
| `--slider-base-thumb-border-color-hover` | thumb | hover border |
| `--slider-base-thumb-border-color-active` | thumb | active border |
| `--focus-color` | thumb focus | focus outline |

## Part-Level Variables

### Root

`SliderBase` sets size, orientation, current value CSS variables, and default progress/thumb colors by variant.

### Thumb

`SliderBaseThumb` maps thumb size to the shared slider size and positions itself using `--slider-base-value`.

### Progress

`SliderBaseProgress` uses `from` and `to` values to compute the filled span.

## State And Variant Interaction

- size maps to `--slider-size`
- primary and secondary variants remap progress and thumb border colors
- disabled remaps progress and thumb colors to disabled tokens

## Examples

### Secondary slider

```tsx
<Slider data-variant='secondary'>
  <SliderProgress />
  <SliderThumb />
</Slider>
```

## Do Not Override

- breaking the relationship between base track size and thumb size
- removing focus styling from the thumb
- inventing slider-specific CSS variables that do not exist in source
