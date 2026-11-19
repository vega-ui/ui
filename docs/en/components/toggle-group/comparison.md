# ToggleGroup Comparison

## Quick Decision Rule

Use `ToggleGroup` for a few toggles that form one choice or one set of filters and apply at once, like an alignment, a view mode or priorities. For one state on its own, use [Toggle](../toggle/comparison.md).

## `ToggleGroup` vs `SegmentedControl`

Use `ToggleGroup` when:

- the choice changes the view or the content at once, like alignment or a view mode
- the items should look like toolbar buttons, or sit in a [Toolbar](../toolbar/)
- several items can be pressed together, with `multiple`

Use `SegmentedControl` when:

- the choice is a value of a form, submitted with it
- the options should look like one control with a sliding indicator

Main trade-off: `SegmentedControl` is a form control on native radios, while `ToggleGroup` is a set of buttons with toolbar-style navigation that never takes part in a form.

## `ToggleGroup` vs `Radio`

Use `ToggleGroup` when:

- the options are short and fit in one row of buttons, often icons
- the arrow keys should move the focus and leave the press to Space or Enter

Use `Radio` when:

- the options need a label or a description each, in a list
- the arrow keys should select, and a form should submit the value

Main trade-off: a radio group is a form value with a selection that follows the focus, while a toggle group is a row of buttons that apply when pressed.

## `ToggleGroup` vs `Tabs`

Use `ToggleGroup` when:

- the choice changes how the same content is shown

Use `Tabs` when:

- each choice shows a different panel of content

Main trade-off: tabs link each control to a panel, while the group only keeps a value for you to use.

## `ToggleGroup` vs separate `Toggle`

Use `ToggleGroup` when:

- the toggles form one choice, or one set of filters read as an array
- one Tab stop and the arrow keys should move between them

Use separate `Toggle` components when:

- every state is independent, like mute and captions in a call bar

Main trade-off: the group keeps one value and one Tab stop for all its items, while separate toggles keep a state and a Tab stop each.

## Choose This Component When

- An editor offers alignment, or bold, italic and underline together
- A list switches between views, or is filtered by a few values that combine
- A player offers a few qualities or speeds to pick from at once

## Do Not Choose This Component When

- The value belongs to a form: use [SegmentedControl](../segmented-control/), [Radio](../radio/) or [Checkbox](../checkbox/)
- The options are many or long: use [Select](../select/) or [Listbox](../listbox/)
- Each option shows its own panel: use [Tabs](../tabs/)
- There is only one state to turn on and off: use [Toggle](../toggle/)
