# Progress

## Doc Profile

`advanced interactive`

## Summary

`Progress` communicates completion of an ongoing task or operation. It is the temporal-feedback bar when the UI should read as work moving toward completion.

## Imports

```tsx
import {
  Progress,
  ProgressTrack,
  type ProgressProps,
  type ProgressSize,
  type ProgressVariant,
} from '@vega-ui/react';
```

## Exported Types

- `ProgressProps`
- `ProgressTrackProps`
- `ProgressSize`
- `ProgressVariant`

## Minimal Composition

```tsx
<Progress value={40}>
  <ProgressTrack />
</Progress>
```

## Required Parts

- `Progress`: root progressbar surface
- `ProgressTrack`: visible fill track

## Optional Parts

- No extra public parts beyond root and track

## Composition Order

1. `Progress`
2. `ProgressTrack`

## Variants

- Sizes: `sm`, `md`, `lg`
- Variants: `primary`, `secondary`
- States: determinate, indeterminate, full-width

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

- Indeterminate and determinate states should be distinguished in surrounding UI.
- Progress values must stay within the expected range at the consumer layer.
- Use descriptive surrounding copy when users need to know what is progressing.
- If the value is actually a score, usage level, or capacity indicator, `Meter` is usually the clearer abstraction.

## Common Mistakes

- Using progress styling for static scores.
- Omitting text context for what is progressing.
- Feeding values that do not match the displayed range.
