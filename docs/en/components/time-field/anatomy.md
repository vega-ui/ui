# TimeField Anatomy

## Overview

`TimeField` is a small compound wrapper around `TextField`. The root provides format and bound context, `TimeFieldInput` applies the masking behavior, and optional wheel columns pick the time in a popover.

## Required Parts

### `TimeField`

Required. Owns `format`, `min`, `max`, and `step` context, and `disabled` and `readOnly` of the input, the trigger and the wheels.

### `TimeFieldInput`

Required. Renders the actual masked input.

## Optional Parts

### `TimeFieldTrigger`

Renders a `Button` with `aria-haspopup="dialog"`, disabled with the field. Put it in `PopoverTrigger asChild` and give it the icon and an `aria-label`.

### `TimeFieldColumn`

Renders a [WheelPickerColumn](../wheel-picker/) of the part of the time its required `unit` names: `hour`, the hours 00 to 23, or `minute` and `second`, the minutes and the seconds by `step`, also the minute of a typed time off the step. A column shows the time of the field, or `min` of an empty one, disables the options outside `min` and `max`, and writes the time it turns to into the input with `input` and `change`, keeping it within the bounds. `unit='second'` goes with `format='HH:mm:ss'`. The columns loop by default. Place them in a `WheelPicker` and name each with `aria-label`; `autoFocus` on the first one moves the focus into the popover when it opens.

The children of a column are required: the template of an option, rendered once per option, usually `<TimeFieldOption><WheelPickerFace /></TimeFieldOption>`. Read the option with `useTimeFieldOptionContext()`: its `unit`, its two-digit `value` and whether it is `disabled`. The column still announces and matches the two-digit value.

### `TimeFieldOption`

Renders a [WheelPickerOption](../wheel-picker/) with the value and the disabled state of the option around it: `className`, `style`, `ref` and any attribute reach the row. Put a `WheelPickerFace` in it: without children the face shows the two-digit value, with children it shows them instead. A template of a time column must render it as the row.

## Composition Order

1. `TimeField`
2. `TimeFieldInput`
3. Optional `Popover` > `PopoverTrigger` > `TimeFieldTrigger`, and `PopoverContent` > `WheelPicker` > the time columns > `TimeFieldOption`

## Valid Composition Patterns

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

<!-- example: time-field/wheels-in-a-popover.tsx -->
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
} from '@vega-ui/react';
import { ClockIcon } from '@vega-ui/icons';

export default function WheelsInAPopover() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260 }}>
      <Label htmlFor='pickup-time'>Pickup time</Label>
      <TimeField defaultValue='12:30' min='09:00' max='21:00' step={15}>
        <TimeFieldInput id='pickup-time' name='pickupTime' placeholder='hh:mm' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <TimeFieldTrigger square aria-label='Choose pickup time'><Icon><ClockIcon /></Icon></TimeFieldTrigger>
          </PopoverTrigger>
          <PopoverContent role='dialog' aria-label='Choose pickup time' style={{ padding: 'var(--spacing-6)' }}>
            <WheelPicker aria-label='Pickup time'>
              <TimeFieldColumn unit='hour' aria-label='Hours' autoFocus><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
              <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>
              <TimeFieldColumn unit='minute' aria-label='Minutes'><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
            </WheelPicker>
          </PopoverContent>
        </Popover>
      </TimeField>
    </div>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Bounds that do not match the format

Example: `format='HH:mm'` with a seconds-based `max`.

### A time column without `TimeFieldOption`

The column renders its children as the row of each option; without `TimeFieldOption` among them it has no rows to turn.

### A seconds column without seconds in the format

With `format='HH:mm'` the value has no seconds, so a `TimeFieldColumn` with `unit='second'` turns but writes nothing. Add it only with `format='HH:mm:ss'`.

### Time columns outside `TimeField` or `WheelPicker`

A column reads the time from `TimeField` and the rows from `WheelPicker`, and outside either it does not work: without the field it turns a time no field holds, and without the picker it loses its row height and its drum.

### Wrapper without `TimeFieldInput`

The root renders, but there is no masked control.
