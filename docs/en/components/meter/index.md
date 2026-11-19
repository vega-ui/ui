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

`max` defaults to `1`, so a fraction like `0.72` needs no `max`; pass `max` for any other scale (`value={36} max={50}`). The meter has no visible label of its own: give it `aria-label` or `aria-labelledby`.

<!-- example: meter/minimal-composition.tsx -->
```tsx
import { Meter, MeterTrack } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Meter value={0.72} valueText='72%' aria-label='Disk usage' fullWidth>
      <MeterTrack />
    </Meter>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own and import that component everywhere. `MyMeter` passes its props to `Meter`, renders `label` above the bar and names the meter with it, and shows `valueText` next to the label. See [Component recipes](../../recipes.md).

<!-- example: meter/recipe.tsx -->
```tsx
import {
  Card,
  Heading,
  Meter,
  MeterTrack,
  Text,
  type MeterProps,
} from '@vega-ui/react';
import { useId, type ReactNode } from 'react';

interface MyMeterProps extends MeterProps {
  label: ReactNode
}

export function MyMeter({ label, valueText, ...props }: MyMeterProps) {
  const labelId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
        <Text id={labelId} size={2}>{label}</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{valueText}</Text>
      </div>
      <Meter valueText={valueText} aria-labelledby={labelId} fullWidth {...props}>
        <MeterTrack />
      </Meter>
    </div>
  );
}

export default function Recipe() {
  return (
    <Card size='sm' style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Heading as='h3' size={4} fontWeight={600}>Pro plan usage</Heading>
      <MyMeter label='Seats' value={18} max={20} low={15} high={18} optimum={0} valueText='18 of 20 seats' size='sm' />
      <MyMeter label='Storage' value={412} max={500} low={375} high={450} optimum={0} valueText='412 of 500 GB' size='sm' />
      <MyMeter label='Build minutes' value={1240} max={3000} low={2250} high={2700} optimum={0} valueText='1,240 of 3,000 min' size='sm' />
    </Card>
  );
}
```
<!-- /example -->

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
