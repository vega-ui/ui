# Menu Comparison

## Quick Decision Rule

Use `Menu` when a button opens a short list of actions, or of view options that apply at once, and the user picks one of them.

## `Menu` vs `Select`

Use `Menu` when:

- each item runs an action, opens a page or changes a setting of the view at once
- the trigger keeps its own label, like "Edit" or "⋯"

Use `Select` when:

- the choice is a value of a form field, shown in the field and submitted with the form

Main trade-off: a menu is a menu button with `menuitem`s that do something, while a select is a combobox with `option`s that hold a value.

## `Menu` vs `Popover`

Use `Menu` when:

- the content is only a list of items
- users should move through it with the arrow keys and typeahead

Use `Popover` when:

- the content has text, fields, buttons or other controls, such as a filter form or a share dialog

Main trade-off: a menu gives its items the menu keyboard and closes when one runs, while a popover keeps the Tab order of its content and leaves closing to you.

## `Menu` vs buttons in a toolbar

Use `Menu` when:

- there are more actions than fit, or they are used rarely

Use visible `Button`s or `IconButton`s when:

- there are two or three frequent actions

Main trade-off: a menu saves space but takes an extra click and hides what is possible; keep the most frequent action visible next to the trigger.

## Choose This Component When

- A button opens a list of commands, like edit, row or account actions
- A toolbar offers view options as checkbox or radio items
- A few links to account or settings pages hang off one trigger

## Do Not Choose This Component When

- The choice is a form value: use [Select](../select/), [Combobox](../combobox/) or [Radio](../radio/)
- The floating content has fields or other controls: use [Popover](../popover/)
- The list is the main navigation of the site: use a `<nav>` with links
- You need submenus, a menubar or a context menu opened by a right click: they are not part of this version
