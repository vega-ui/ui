# SliderBase Styling

## Overview

`SliderBase` owns the base track tokens and exposes CSS variables for track size, progress color, thumb border color, and current numeric position.

## Public CSS Variables

| Variable | Purpose |
| --- | --- |
| `--slider-base-value` | current slider value |
| `--slider-base-max` | maximum value |
| `--slider-base-min` | minimum value |
| `--slider-base-progress-color` | active track fill color |
| `--slider-base-thumb-border-color` | thumb border color |
| `--slider-base-thumb-border-color-hover` | thumb hover border color |
| `--slider-base-thumb-border-color-active` | thumb active border color |
| `--slider-base-thumb-color` | thumb fill color |

## Part-Level Variables

### Root

The root `.slider` element sets orientation, track thickness, background fill, and the numeric variables used by child parts.

### Progress

`SliderBaseProgress` reads the root variables to render the filled segment.

### Thumb

`SliderBaseThumb` reads the same root variables to position and style the handle.

## State And Variant Interaction

- `data-size='sm' | 'md' | 'lg'` maps to different `--slider-size` values.
- `data-variant='primary' | 'secondary'` switches progress and thumb colors.
- `data-disabled='true'` remaps colors to disabled theme tokens.
- `data-orientation='horizontal' | 'vertical'` changes geometry rather than the token family.

## Examples

### Local height override for a vertical shell

```tsx
<SliderBase orientation='vertical' value={40} style={{ height: 280 }}>
  <SliderBaseProgress orientation='vertical' />
  <SliderBaseThumb orientation='vertical' />
</SliderBase>
```

## Do Not Override

- inventing unsupported variant names
- styling root and parts with mismatched orientation assumptions
- replacing the numeric CSS variables with unrelated design tokens
