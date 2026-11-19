# Toggle Comparison

## Quick Decision Rule

Use `Toggle` for a button whose pressed state applies at once and stays visible, like bold, mute or a shown ruler. For a few such buttons that form one choice or one set of filters, use [ToggleGroup](../toggle-group/comparison.md).

## `Toggle` vs `Switch`

Use `Toggle` when:

- the control sits among buttons, like in a toolbar or a player
- the state is a mode of the current view, named by a verb or a noun: "Bold", "Mute"

Use `Switch` when:

- the control is a setting with a visible on and off, often in a list of settings
- the value belongs to a form

Main trade-off: a toggle button looks and acts like a button, while a switch reads as a setting and is a native checkbox that a form submits.

## `Toggle` vs `Checkbox`

Use `Toggle` when:

- the state applies at once and the control is compact

Use `Checkbox` when:

- the choice is part of a form that is submitted later, or one of a list of options

Main trade-off: a checkbox is a form value with a label beside it, while a toggle is an action surface.

## `Toggle` vs `ToggleGroup`

Use `Toggle` when:

- every state is independent, like mute and captions in a call bar
- the toggles stand among other buttons, each with its own Tab stop

Use `ToggleGroup` when:

- the toggles form one choice, like an alignment, or one set of filters
- one Tab stop and the arrow keys should move between them

Main trade-off: separate toggles keep a state each, while a [ToggleGroup](../toggle-group/) keeps one value for all of them.

## `Toggle` vs `Button` with `aria-pressed`

Use `Toggle` when:

- you want the pressed state kept, reported and styled for you

Use a `Button` with `aria-pressed` when:

- the button needs a look of its own that the toggle does not offer, like a `fill` variant

Main trade-off: `Toggle` gives one look and the state handling, while a plain `Button` leaves both to you.

## Choose This Component When

- A formatting mark, a view mode or a tool turns on and off at once
- A player or a call has mute, captions or similar switches among its buttons
- A card has a save, star or pin state

## Do Not Choose This Component When

- The action runs once, like "Save" or "Delete": use [Button](../button/)
- The value belongs to a form: use [Switch](../switch/) or [Checkbox](../checkbox/)
- Several toggles form one choice, like an alignment or a view: use [ToggleGroup](../toggle-group/)
- The control opens a menu or a popover: use [Menu](../menu/) or [Popover](../popover/)
