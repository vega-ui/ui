# Meter API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `MeterSize` | `'md'` | No | Visual size of the meter component. Typically maps to predefined size tokens in a design system. |
| `variant` | `MeterVariant` | `'primary'` | No | Visual variant of the meter (e.g., for styling themes). |
| `max` | `number` | `1` | No | Maximum possible value of the meter. Default is 1. |
| `min` | `number` | `0` | No | Minimum possible value of the meter. Default is 0. |
| `value` | `number` | — | Yes | The current numeric value displayed by the meter. Required. Clamped between `min` and `max`. |
| `valueText` | `string` | — | No | Visually hidden accessible label for screen readers, describing the current value (e.g., "60% fuel"). |
| `fullWidth` | `boolean` | — | No | Whether the meter should expand to fill the width with its container. |
| `optimum` | `number` | — | No | The "optimal" value for the meter. Used to determine which region (low, high, optimum) is preferred. |
| `low` | `number` | — | No | The lower threshold for suboptimal values. If the value is below this, it may be considered "bad". |
| `high` | `number` | — | No | The upper threshold for suboptimal values. If the value is above this, it may be considered "bad" (if optimum is low). |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `MeterTrack`: visible measured-fill track.

### `MeterTrack`

<!-- AUTO-GENERATED:PART_API:MeterTrack:start -->
Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:MeterTrack:end -->

## Types

- `MeterProps`
- `MeterTrackProps`
- `MeterSize`
- `MeterVariant`

## State Model

- `Meter` is always value-driven rather than indeterminate.
- Threshold props can change semantic state from neutral to good, warn, or bad.
