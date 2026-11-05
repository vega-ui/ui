# Switch Comparison

## Quick Decision Rule

Use `Switch` for one immediate binary setting.

## `Switch` vs `Checkbox`

Use `Switch` when:

- the control represents one immediate on/off setting

Use `Checkbox` when:

- the control represents an independent selectable option in a form or list

Main trade-off: switches read as immediate state changes, while checkboxes read as selection.

## `Switch` vs `Radio`

Use `Switch` when:

- only one binary setting is involved

Use `Radio` when:

- the user must choose one option from a set

Main trade-off: switches toggle one setting; radios compare alternatives.

## `Switch` vs `SegmentedControl`

Use `Switch` when:

- the choice is binary and immediate

Use `SegmentedControl` when:

- several always-visible exclusive options should be compared side by side

Main trade-off: switch is a binary toggle; segmented control is an exclusive option selector.

## `Switch` vs `CheckboxCard`

Use `Switch` when:

- one binary feature should turn on or off immediately

Use `CheckboxCard` when:

- multiple rich options can be selected independently and the UI should read as option tiles

## Choose This Component When

- The feature is one immediate binary setting.
- The label describes a feature that is on or off.
- The UI should read as a toggle, not a form choice group.
- users should not have to compare several visible alternatives first

## Do Not Choose This Component When

- The user is choosing one option from several.
- Multiple independent options appear in a list.
- The state should feel like a deferred form choice instead of an immediate setting.
