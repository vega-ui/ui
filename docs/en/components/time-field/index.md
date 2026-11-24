# TimeField

## Doc Profile

`advanced interactive`

## Summary

`TimeField` is a [compound component](../../glossary.md#compound-component) for masked time entry. It builds on `TextField` and adds format, min/max, and step constraints for time strings when the product value is time-only.

## Imports

```tsx
import {
  TimeField,
  TimeFieldColumn,
  TimeFieldInput,
  TimeFieldOption,
  TimeFieldTrigger,
  useTimeFieldOptionContext,
  type TimeFieldColumnProps,
  type TimeFieldInputProps,
  type TimeFieldOptionContextData,
  type TimeFieldOptionProps,
  type TimeFieldProps,
  type TimeFieldTriggerProps,
  type TimeFieldUnit,
} from '@vega-ui/react';
```

## Exported Types

- `TimeFieldProps`
- `TimeFieldInputProps`
- `TimeFieldTriggerProps`
- `TimeFieldColumnProps`
- `TimeFieldOptionProps`
- `TimeFieldOptionContextData`
- `TimeFieldUnit`

## Minimal Composition

<!-- example: time-field/minimal-composition.tsx -->
```tsx
import { TimeField, TimeFieldInput } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <TimeField>
      <TimeFieldInput aria-label='Reminder time' placeholder='hh:mm' />
    </TimeField>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own, with your icon set, and import that component everywhere. `MyTimeField` passes its props to `TimeField`, its `id` and `name` to the input, and takes the names of the clock button and the time columns as props; the seconds column follows `format`. See [Component recipes](../../recipes.md).

<!-- example: time-field/recipe.tsx -->
```tsx
import {
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TimeField,
  TimeFieldColumn,
  TimeFieldInput,
  TimeFieldOption,
  TimeFieldTrigger,
  WheelPicker,
  WheelPickerFace,
  type TimeFieldProps,
} from '@vega-ui/react';
import { ClockIcon } from '@vega-ui/icons';
import { useId } from 'react';

interface MyTimeFieldProps extends TimeFieldProps {
  name?: string
  pickerLabel: string
  hoursLabel: string
  minutesLabel: string
  secondsLabel?: string
}

export function MyTimeField({ id, name, pickerLabel, hoursLabel, minutesLabel, secondsLabel, ...props }: MyTimeFieldProps) {
  const seconds = props.format === 'HH:mm:ss';

  return (
    <TimeField {...props}>
      <TimeFieldInput id={id} name={name} />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <TimeFieldTrigger square aria-label={pickerLabel}><Icon><ClockIcon /></Icon></TimeFieldTrigger>
        </PopoverTrigger>
        <PopoverContent role='dialog' aria-label={pickerLabel} style={{ padding: 'var(--spacing-6)' }}>
          <WheelPicker aria-label={pickerLabel}>
            <TimeFieldColumn unit='hour' aria-label={hoursLabel} autoFocus><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
            <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>
            <TimeFieldColumn unit='minute' aria-label={minutesLabel}><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
            {seconds && <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>}
            {seconds && <TimeFieldColumn unit='second' aria-label={secondsLabel}><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>}
          </WheelPicker>
        </PopoverContent>
      </Popover>
    </TimeField>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260 }}>
      <Label htmlFor={id}>Alarm</Label>
      <MyTimeField
        id={id}
        name='alarmAt'
        step={5}
        defaultValue='07:00'
        pickerLabel='Choose alarm time'
        hoursLabel='Hours'
        minutesLabel='Minutes'
      />
    </div>
  );
}
```
<!-- /example -->

## Required Parts

- `TimeField`: root time constraints and format provider
- `TimeFieldInput`: masked text input

## Optional Parts

- `TimeFieldTrigger`: the button that opens a [Popover](../popover/) with the wheels
- `TimeFieldColumn`: a [WheelPicker](../wheel-picker/) column of the hours, the minutes by `step` or the seconds, by `unit`, which writes the time it turns to into the input
- `TimeFieldOption`: the required template of the options of a time column, a `WheelPickerOption` for your own class, style or content

## Composition Order

1. `TimeField`
2. `TimeFieldInput`
3. Optional `Popover` with `TimeFieldTrigger` in `PopoverTrigger` and a `WheelPicker` of the time columns, each with a `TimeFieldOption` template, in `PopoverContent`

## Variants

- Format: `HH:mm` or `HH:mm:ss`
- Bounds: optional `min` and `max`
- State: controlled or uncontrolled `value` on the root, `disabled` and `readOnly` on the root lock the input, the trigger and the wheels

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

- Format, `min`, and `max` must agree with each other.
- Partial typed values should not be treated as complete times too early.
- Users need clear 24-hour format expectations in product copy.
- The wheels disable the times outside `min` and `max`, and a turn that would leave them stops at the bound.
- If the feature really stores a timestamp, `DateTimeField` is usually the clearer abstraction than splitting date and time policy ad hoc.

## Common Mistakes

- Assuming locale formatting instead of documenting the expected mask.
- Passing format-specific bounds that do not match the chosen format.
- Treating incomplete masked text as valid submission data.
