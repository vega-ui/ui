# MonthPicker API

## Root Props

| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| picker props | `DataGridPickerProps<number, S>` | - | no | Inherits selection, bounds, and variant behavior from `DataGridPicker`. |

## Child Parts

- `MonthPickerLayout`
- `MonthPickerRowGroup`
- `MonthPickerRow`
- `MonthPickerItem`

## Types

- `MonthPickerProps`
- `MonthPickerLayoutProps`
- `MonthPickerRowGroupProps`
- `MonthPickerRowProps`
- `MonthPickerItemProps`

## State Model

- Selection and bounds behavior are inherited from `DataGridPicker`.
- `MonthPickerLayout` maps visual month labels to numeric month values.
