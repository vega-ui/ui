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

```tsx
<MeterStack value={1}>
  <MeterStackSegment value={0.3} />
  <MeterStackSegment value={0.7} />
</MeterStack>
```

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
