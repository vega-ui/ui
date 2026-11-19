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

`max` defaults to `100`. Without `ProgressTrack` the bar renders empty, and without `aria-label` or `aria-labelledby` the progressbar has no accessible name.

<!-- example: progress/minimal-composition.tsx -->
```tsx
import { Progress, ProgressTrack } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Progress value={40} aria-label='Upload progress' fullWidth>
      <ProgressTrack />
    </Progress>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own and import that component everywhere. `MyProgress` passes its props to `Progress`, renders `label` above the bar and names the progressbar with it, and shows `valueText` next to the label. See [Component recipes](../../recipes.md).

<!-- example: progress/recipe.tsx -->
```tsx
import {
  Progress,
  ProgressTrack,
  Text,
  type ProgressProps,
} from '@vega-ui/react';
import { useId, type ReactNode } from 'react';

interface MyProgressProps extends ProgressProps {
  label: ReactNode
}

export function MyProgress({ label, valueText, ...props }: MyProgressProps) {
  const labelId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
        <Text id={labelId} size={2} fontWeight={500}>{label}</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{valueText}</Text>
      </div>
      <Progress valueText={valueText} aria-labelledby={labelId} fullWidth {...props}>
        <ProgressTrack />
      </Progress>
    </div>
  );
}

export default function Recipe() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-10)', width: '100%', maxWidth: 360 }}>
      <MyProgress label='quarterly-report.pdf' value={35} valueText='4.2 of 12 MB' size='sm' />
      <MyProgress label='team-offsite.mov' indeterminate valueText='Preparing…' size='sm' />
    </div>
  );
}
```
<!-- /example -->

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
