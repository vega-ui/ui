# Progress API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `ProgressSize` | `'md'` | No | Visual size of the progress bar. |
| `variant` | `ProgressVariant` | `'primary'` | No | Visual style of the progress bar. Typically mapped to theme color variants. |
| `max` | `number` | `100` | No | Maximum value of the progress range. Default is 100. |
| `min` | `number` | `0` | No | Minimum value of the progress range. Default is 0. |
| `value` | `number` | — | No | Current value representing the progress completion. |
| `valueText` | `string` | — | No | Visually hidden accessible label for screen readers, describing the current value (e.g., "60% complete"). |
| `indeterminate` | `boolean` | — | No | — |
| `fullWidth` | `boolean` | — | No | Whether the progress bar should stretch to fill the container width. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `ProgressTrack`: visible fill track.

### `ProgressTrack`

<!-- AUTO-GENERATED:PART_API:ProgressTrack:start -->
Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:ProgressTrack:end -->

## Types

- `ProgressProps`
- `ProgressTrackProps`
- `ProgressSize`
- `ProgressVariant`

## State Model

- Determinate state uses `value`, `min`, and `max`.
- Indeterminate state ignores exact progress geometry and uses animation instead.
