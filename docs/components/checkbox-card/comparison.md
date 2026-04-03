# CheckboxCard Comparison

## Quick Decision Rule

Choose `CheckboxCard` when each checkbox option needs a card-sized labeled surface. Choose `Checkbox`, `Radio`, or `SegmentedControl` when the UI can stay compact.

## `CheckboxCard` vs `Checkbox`

Use `CheckboxCard` when the option includes a title, description, or richer tile layout.

Use `Checkbox` when a compact inline label is enough.

## `CheckboxCard` vs `Radio`

Use `CheckboxCard` for independent multi-select options.

Use `Radio` when the group is mutually exclusive.

## `CheckboxCard` vs `Switch`

Use `CheckboxCard` when:

- multiple rich options can be selected independently

Use `Switch` when:

- one immediate binary setting should toggle on or off

## `CheckboxCard` vs `SegmentedControl`

Use `CheckboxCard` when content is descriptive and card-like.

Use `SegmentedControl` when options should stay short, dense, and always visible.

## Choose This Component When

- the whole card should be the selection target
- the option needs title and description content
- multi-select semantics still apply
- richer option content matters more than density

## Do Not Choose This Component When

- the group is single-select
- the option content is short enough for a normal checkbox
- the UI needs high-density controls instead of tiles
