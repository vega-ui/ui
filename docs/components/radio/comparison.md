# Radio Comparison

## Quick Decision Rule

Use `Radio` when exactly one option from a small visible set must be chosen.

## `Radio` vs `Checkbox`

Use `Radio` when:

- exactly one option should be selected

Use `Checkbox` when:

- options can be selected independently or in combination

Main trade-off: radios enforce exclusivity, while checkboxes support independent selection.

## `Radio` vs `Switch`

Use `Radio` when:

- the user is choosing one option from a set

Use `Switch` when:

- the control represents one immediate binary setting

Main trade-off: radios compare alternatives, while switches toggle one setting on or off.

## `Radio` vs `SegmentedControl`

Use `Radio` when:

- a simple visible group is enough
- native form semantics matter more than always-visible button-like presentation

Use `SegmentedControl` when:

- all options should stay visible as adjacent segments with a stronger selected-state treatment

Main trade-off: radios stay simpler and more form-like, while segmented controls are more visually explicit.

## `Radio` vs `CheckboxCard`

Use `Radio` when:

- exclusive options can stay compact and form-like

Use `CheckboxCard` when:

- the options are independent and each one needs richer descriptive content

## Choose This Component When

- One option from a small set must be selected.
- The group belongs naturally in a form.
- Native radio semantics are the right fit.
- the UI should read as exclusive choice rather than an immediate toggle

## Do Not Choose This Component When

- Options can be selected independently.
- The control is a single immediate binary setting.
- The feature needs a denser always-visible segmented UI.
