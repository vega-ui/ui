# Meter

## Doc Profile

`advanced interactive`

## Summary

`Meter` shows a bounded quantitative value, typically without the temporal progress semantics of a progress bar. It is the descriptive-measurement bar when the UI should read as level, score, capacity, or quality rather than task completion.

## Imports

```tsx
import {
  Meter,
  MeterTrack,
  type MeterProps,
  type MeterSize,
  type MeterVariant,
} from '@vega-ui/react';
```

## Exported Types

- `MeterProps`
- `MeterTrackProps`
- `MeterSize`
- `MeterVariant`

## Minimal Composition

```tsx
<Meter value={72}>
  <MeterTrack />
</Meter>
```

## Required Parts

- `Meter`: root meter surface
- `MeterTrack`: visible measured-fill track

## Optional Parts

- No extra public parts beyond root and track

## Composition Order

1. `Meter`
2. `MeterTrack`

## Variants

- Sizes: `sm`, `md`, `lg`
- Variants: `primary`, `secondary`
- States: neutral, good, warn, bad via thresholds

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- `Meter` is for bounded measurement, not async completion.
- Threshold props like `low`, `high`, and `optimum` can shift the semantic color state.
- Surrounding copy should explain the measured value and range.
- If the measurement is actually composed of several meaningful parts, `MeterStack` is usually clearer than one continuous bar.

## Common Mistakes

- Using `Meter` for loading or async work.
- Showing a value without explaining the range or meaning.
- Ignoring threshold semantics when they matter to interpretation.
