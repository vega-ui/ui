# Progress API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `size` | `ProgressSize` | `'md'` | No | Visual size of the progress bar. |
| `variant` | `ProgressVariant` | `'primary'` | No | Visual style of the progress bar. |
| `max` | `number` | `100` | No | Maximum value of the progress range. |
| `min` | `number` | `0` | No | Minimum value of the progress range. |
| `value` | `number` | `—` | No | Current value representing the progress completion. |
| `valueText` | `string` | `—` | No | Visually hidden accessible label for screen readers, describing the current value (e.g., "60% complete"). |
| `indeterminate` | `boolean` | `—` | No | — |
| `fullWidth` | `boolean` | `—` | No | the progress bar should stretch to fill the container width. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `ProgressTrack`: visible fill track.

## Types

- `ProgressProps`
- `ProgressTrackProps`
- `ProgressSize`
- `ProgressVariant`

## State Model

- Determinate state uses `value`, `min`, and `max`.
- Indeterminate state ignores exact progress geometry and uses animation instead.
