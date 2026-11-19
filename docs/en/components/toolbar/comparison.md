# Toolbar Comparison

## Quick Decision Rule

Use `Toolbar` for a set of three or more controls that act on one thing, like the text of an editor, when the page should reach them with one Tab stop and the arrow keys.

## `Toolbar` vs a row of buttons

Use `Toolbar` when:

- the controls belong together and act on the same object, like formatting buttons
- the page has many Tab stops, and the set should take only one

Use a row of buttons when:

- there are one or two actions, like "Cancel" and "Save"
- each action is independent, and users expect to reach it with Tab

Main trade-off: a toolbar shortens the Tab order but asks the user for the arrow keys, while plain buttons are each one Tab stop and need nothing to learn.

## `Toolbar` vs `Menu`

Use `Toolbar` when:

- the controls should stay visible and be one click away

Use `Menu` when:

- the actions are many or rare, and can hide behind one button

Main trade-off: a toolbar shows every control at the cost of space, while a menu saves the space at the cost of a click. Combine them: a "More" `Menu` as the last item of the toolbar.

## `Toolbar` vs `ToggleGroup`

Use `Toolbar` when:

- the set mixes toggles with buttons, menus or a field

Use `ToggleGroup` alone when:

- every control is a toggle of the same choice, like the alignment

Main trade-off: a standalone `ToggleGroup` has its own Tab stop and arrow keys; inside a `Toolbar`, it joins the navigation of the toolbar.

## `Toolbar` vs `Tabs`

Use `Toolbar` when:

- the controls act on content, like formatting or tools

Use `Tabs` when:

- each control shows its own panel of content

Main trade-off: both move the focus with the arrow keys, but a tab list switches panels, while a toolbar runs actions and sets states.

## Choose This Component When

- An editor has formatting controls above its text
- A canvas or a board offers a palette of tools
- A list or a table has view, sort and search controls above it
- A media player has playback controls in one row

## Do Not Choose This Component When

- There are only one or two controls: use [Button](../button/), with text or `square`
- The controls are links to other pages: use [Link](../link/) in a `<nav>`
- Each control shows a panel: use [Tabs](../tabs/)
- The set is one exclusive choice in a form: use [SegmentedControl](../segmented-control/) or [Radio](../radio/)
