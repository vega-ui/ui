# MeterStack Styling

## Overview

`MeterStack` styling is token-driven and intentionally small. The root defines track height, gap, and background, while each segment defines its own proportional width and color.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--meter-stack-height` | root | track height |
| `--meter-stack-br-ratio` | root | track radius ratio |
| `--meter-stack-gap-ratio` | root | gap between segments |
| `--meter-stack-value` | root | current aggregate value |
| `--meter-stack-max` | root and segments | proportional width calculations |
| `--meter-stack-segment-value` | segment | segment width share |
| `--meter-stack-segment-color` | segment | segment fill color |

## Part-Level Variables

### Root

The root maps size to height, applies `--fills-secondary` as the base track, and uses flex layout for the segments.

### Segment

Each segment computes width from `value / max` and can override its color with `--meter-stack-segment-color`.

## State And Variant Interaction

- size changes the track height
- `fullWidth` sets width to 100%
- segment color is per-item rather than root-wide

## Examples

### Custom blue scale

```tsx
<MeterStack value={1}>
  <MeterStackSegment value={0.15} style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-100)' } as React.CSSProperties} />
  <MeterStackSegment value={0.35} style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-300)' } as React.CSSProperties} />
</MeterStack>
```

## Do Not Override

- using segment widths that do not reflect real values
- removing contrast between the base track and segments
