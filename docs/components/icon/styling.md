# Icon Styling

## Overview

`Icon` styling is size-driven and relies on `currentColor` for most color behavior.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--icon-size` | root | computed token size |

## Part-Level Variables

### Root

The root maps `data-size` values to a single `--icon-size` and applies that value to both width and height.

## State And Variant Interaction

- token sizing is used only when explicit width and height are not provided
- icon color follows `currentColor`

## Examples

### Large semantic icon

```tsx
<Icon size='xl' color='var(--color-green-accent-500)'>
  <HeartPlus />
</Icon>
```

## Do Not Override

- hardcoding icon colors where surrounding text color should drive the result
- mixing explicit width/height overrides unpredictably across one control family
