# WheelPicker Comparison

## Quick Decision Rule

Use `WheelPicker` when a value is made of a few parts picked from short lists, like a duration, an amount with its unit or a birth date, and the user mostly swipes. A time or a timestamp in a form is a [TimeField](../time-field/) or a [DateTimeField](../date-time-field/) with their columns inside a `WheelPicker`. When the user types the value, use a field; when the options are few and visible at once, use [SegmentedControl](../segmented-control/) or [Select](../select/).

## `WheelPicker` vs `TimeField`

Use `WheelPicker` alone when:

- the value is not a time of day, like a duration or an amount with its unit
- the parts are your own lists, not hours and minutes of a field

Use `TimeField` when:

- the value is a time of day, typed, pasted or picked
- the time is swiped on a touch screen: put `TimeFieldColumn` wheels inside a `WheelPicker` of the field, and they follow its `min`, `max` and `step`

Main trade-off: a plain wheel holds any lists but owns no time rules, while a field keeps the time valid, submits itself and still lets the user swipe through its columns.

## `WheelPicker` vs `Select`

Use `WheelPicker` when:

- the value has several parts that turn side by side
- the list loops, like hours or minutes

Use `Select` when:

- the value is one choice from a list of labels
- the options need search, groups or descriptions

Main trade-off: a select hides its list until it opens and takes one choice, while a wheel stays open and turns part by part.

## `WheelPicker` vs `NumberField`

Use `WheelPicker` when:

- the number comes from a short range, like 1 to 30, next to a unit

Use `NumberField` when:

- the range is long or free, like a price or a quantity typed from the keyboard

Main trade-off: a wheel suits a short range on a touch screen, while a number field takes any number and a step.

## Choose This Component When

- A timer, an alarm or a reminder needs a time or a duration
- A value comes with its unit, like "2 weeks" or "5 ft 9 in"
- A mobile flow asks for a date of birth or a delivery slot

## Do Not Choose This Component When

- The value is typed or pasted: use [TimeField](../time-field/), [DateField](../date-field/) or [NumberField](../number-field/)
- The options are a few labels seen at once: use [SegmentedControl](../segmented-control/) or [RadioGroup](../radio/)
- The value is one choice from a long list of labels: use [Select](../select/) or [Combobox](../combobox/)
- The value is a point on a continuous range: use [Slider](../slider/)
