# Meter API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `size` | `MeterSize` | `'md'` | No | Visual size of the meter component. |
| `variant` | `MeterVariant` | `'primary'` | No | Visual variant of the meter (e.g., for styling themes). |
| `max` | `number` | `1` | No | Maximum possible value of the meter. |
| `min` | `number` | `0` | No | Minimum possible value of the meter. |
| `value` | `number` | `—` | Yes | current numeric value displayed by the meter. |
| `valueText` | `string` | `—` | No | Visually hidden accessible label for screen readers, describing the current value (e.g., "60% fuel"). |
| `fullWidth` | `boolean` | `—` | No | the meter should expand to fill the width with its container. |
| `optimum` | `number` | `—` | No | "optimal" value for the meter. |
| `low` | `number` | `—` | No | lower threshold for suboptimal values. |
| `high` | `number` | `—` | No | upper threshold for suboptimal values. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `MeterTrack`: visible measured-fill track.

## Types

- `MeterProps`
- `MeterTrackProps`
- `MeterSize`
- `MeterVariant`

## State Model

- `Meter` is always value-driven rather than indeterminate.
- Threshold props can change semantic state from neutral to good, warn, or bad.
