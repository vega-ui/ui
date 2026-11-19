# MeterStack

## Doc Profile

`compound`

## Summary

`MeterStack` is a [compound component](../../glossary.md#compound-component) for segmented meter displays. It shows an aggregate value as multiple colored segments instead of one continuous bar, making composition and distribution the primary message.

## Imports

```tsx
import {
  MeterStack,
  MeterStackSegment,
  type MeterStackProps,
  type MeterStackSegmentProps,
  type MeterStackSize,
} from '@vega-ui/react';
```

## Exported Types

- `MeterStackProps`
- `MeterStackSegmentProps`
- `MeterStackSize`

## Minimal Composition

`MeterStack` renders `role='group'` and every `MeterStackSegment` renders `role='meter'`. Name the root with `aria-label` or `aria-labelledby` and name each segment, otherwise a screen reader hears several unnamed meters. Segment widths are `value / max`, so `max` must be on the same scale as the segment values.

<!-- example: meter-stack/minimal-composition.tsx -->
```tsx
import { MeterStack, MeterStackSegment } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <MeterStack value={0.8} max={1} aria-label='Disk usage' fullWidth>
      <MeterStackSegment value={0.5} aria-label='Apps' />
      <MeterStackSegment value={0.3} aria-label='Photos' />
    </MeterStack>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own and import that component everywhere. `MyMeterStack` passes its props to `MeterStack`, renders `label` above the bar and names the group with it, shows `summary` next to the label, and builds the segments and their legend from `segments`. See [Component recipes](../../recipes.md).

<!-- example: meter-stack/recipe.tsx -->
```tsx
import {
  MeterStack,
  MeterStackSegment,
  Text,
  type MeterStackProps,
} from '@vega-ui/react';
import { useId, type CSSProperties, type ReactNode } from 'react';

interface Segment {
  label: string
  value: number
  valueText: string
  color: string
}

interface MyMeterStackProps extends MeterStackProps {
  label: ReactNode
  summary: ReactNode
  segments: Segment[]
}

export function MyMeterStack({ label, summary, segments, ...props }: MyMeterStackProps) {
  const labelId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
          <Text id={labelId} size={2} fontWeight={500}>{label}</Text>
          <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{summary}</Text>
        </div>
        <MeterStack aria-labelledby={labelId} fullWidth {...props}>
          {segments.map((segment) => (
            <MeterStackSegment
              key={segment.label}
              value={segment.value}
              aria-label={segment.label}
              aria-valuetext={segment.valueText}
              style={{ '--meter-stack-segment-color': segment.color } as CSSProperties}
            />
          ))}
        </MeterStack>
      </div>
      <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--spacing-4) var(--spacing-8)', margin: 0, padding: 0, listStyle: 'none' }}>
        {segments.map((segment) => (
          <li key={segment.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <span aria-hidden='true' style={{ flexShrink: 0, width: 8, height: 8, borderRadius: '50%', background: segment.color }} />
            <Text size={2}>{segment.label}</Text>
            <Text size={2} style={{ marginInlineStart: 'auto', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{segment.valueText}</Text>
          </li>
        ))}
      </ul>
    </div>
  );
}

const categories = [
  { label: 'Apps', value: 82, valueText: '82 GB', color: 'var(--color-blue-500)' },
  { label: 'Photos', value: 64, valueText: '64 GB', color: 'var(--color-purple-500)' },
  { label: 'Messages', value: 18, valueText: '18 GB', color: 'var(--color-green-500)' },
  { label: 'System', value: 31, valueText: '31 GB', color: 'var(--color-gray-500)' },
];

export default function Recipe() {
  return (
    <MyMeterStack
      label='iPhone storage'
      summary='195 GB of 256 GB used'
      value={195}
      max={256}
      segments={categories}
    />
  );
}
```
<!-- /example -->

## Required Parts

- `MeterStack`: root meter surface and shared range context
- `MeterStackSegment`: one segment of the aggregate

## Optional Parts

- custom color overrides on each segment through style variables

## Composition Order

1. `MeterStack`
2. repeated `MeterStackSegment`

## Variants

- Size: `sm`, `md`, `lg`
- Layout: fixed width or `fullWidth`
- Segment model: any number of ordered segments

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Patterns](./patterns.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Segment ordering should reflect real meaning.
- Very small segments may need labels or tooltips outside the component.
- Segment totals are a consumer concern and should be validated in the parent feature.
- If the segments do not encode real meaning, one continuous `Meter` is usually less noisy and more honest.

## Common Mistakes

- Letting segment totals exceed the intended range.
- Using too many tiny segments with no external labeling.
- Treating segment colors as arbitrary decoration instead of meaningful encoding.
