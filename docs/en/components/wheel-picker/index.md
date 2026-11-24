# WheelPicker

## Doc Profile

`advanced interactive`

## Summary

`WheelPicker` lays out columns of options that turn like wheels around one selection band, for a time, a duration or a value with its unit. Each `WheelPickerColumn` is a [spinbutton](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/) over its `WheelPickerOption` children, like a `select` over its options: it keeps its own value, turns with a swipe, the wheel of the mouse or the keys, and with `loop` goes on past the last option to the first one. The columns scroll with native scroll snapping, so a swipe keeps the momentum of the platform. Use it where a wheel reads better than a list, mostly on touch screens; for a value typed from the keyboard use [TimeField](../time-field/), [DateField](../date-field/) or [NumberField](../number-field/).

## Imports

```tsx
import { WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '@vega-ui/react';
```

## Exported Types

- `WheelPickerProps`
- `WheelPickerColumnProps`
- `WheelPickerFaceProps`
- `WheelPickerOptionProps`
- `WheelPickerSize`

## Minimal Composition

<!-- example: wheel-picker/minimal-composition.tsx -->
```tsx
import { WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '@vega-ui/react';

const hours = Array.from({ length: 24 }, (_, hour) => hour);
const minutes = Array.from({ length: 60 }, (_, minute) => minute);
const pad = (value: number) => String(value).padStart(2, '0');

export default function MinimalComposition() {
  return (
    <WheelPicker aria-label='Alarm time'>
      <WheelPickerColumn aria-label='Hours' loop defaultValue={7}>
        {hours.map((hour) => <WheelPickerOption key={hour} value={hour}><WheelPickerFace>{pad(hour)}</WheelPickerFace></WheelPickerOption>)}
      </WheelPickerColumn>
      <WheelPickerColumn aria-label='Minutes' loop defaultValue={30}>
        {minutes.map((minute) => <WheelPickerOption key={minute} value={minute}><WheelPickerFace>{pad(minute)}</WheelPickerFace></WheelPickerOption>)}
      </WheelPickerColumn>
    </WheelPicker>
  );
}
```
<!-- /example -->

## Required Parts

- `WheelPicker`: the group of columns, its visible rows and the selection band
- `WheelPickerColumn`: one wheel, a spinbutton with its own value
- `WheelPickerOption`: one option of a column, with its `value`
- `WheelPickerFace`: what the option shows, turning with the wheel

## Optional Parts

- Text between the columns, like a unit or a word of a sentence: any element inside `WheelPicker`, hidden from assistive technology when the column names already say it
- [Popover](../popover/) or [Sheet](../sheet/) around the picker, opened from a button that shows the value

## Composition Order

1. `WheelPicker`
2. `WheelPickerColumn`, one per part of the value
3. `WheelPickerOption`, one per option, in the order of the wheel
4. `WheelPickerFace`, one in each option

## Variants

- Uncontrolled through `defaultValue`, or controlled through `value` and `onChangeValue`, per column
- Looped through `loop`, or bounded, where the wheel stops at the first and the last option
- Visible rows through `rows` on `WheelPicker`, 5 by default; use an odd number
- Size through `size` on `WheelPicker`, `xs` to `xl` and `md` by default: the rows and the text follow the height and the text of the fields of the same size
- Disabled options through `disabled` on `WheelPickerOption`, skipped by the wheel and the keys
- Read-only and disabled columns through `readOnly` and `disabled` on `WheelPickerColumn`

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)
- [SnapScroller](../snap-scroller/)

## Edge Cases

- `onChangeValue` runs once a scroll stops on an option, not while the wheel turns; a key reports at once.
- A scroll that stops on a disabled option moves on to the nearest enabled one and reports that one.
- A column without `value` or `defaultValue` starts at its first enabled option, and reports nothing until the user turns it.
- When the parent sets another `value`, the column turns to it: smoothly when it is near, at once when it is far. In a looped column it takes the shorter way.
- When an option the parent selected becomes disabled, like the 31st after a switch to February, the column keeps it until the parent sets another value: clamp the value in the parent.
- When the parent removes the selected option, the column moves to the option that took its place, or to the last one, and reports it. When the number of options changes, the selected option stays in the band.
- No column renders a form input. Mirror the values into `<input type="hidden">` yourself when a form submits them.

## Common Mistakes

- Leaving the picker or a column without a name: the components never set a label themselves. Name `WheelPicker` and each `WheelPickerColumn` with `aria-label` or `aria-labelledby`.
- Rich content in an option without `label`: typeahead and `aria-valuetext` read the text of the option, and an icon has none, so they fall back to the raw `value`.
- Using a wheel for a long free value, like a price or a year range typed from the keyboard: use [NumberField](../number-field/) or [DateField](../date-field/). Every row of a column is animated, so keep a column within a few hundred options.
- Expecting `onChangeValue` on every row the wheel passes: it reports where the wheel stops.
