# Menu Troubleshooting

## The Menu Closes Before The Action Is Done

### Symptom

An item should be pressed several times, or should show a result inside the menu, but every press closes the menu.

### Likely Cause

Running an item closes the menu by default: a click, Enter, or Space on a plain item.

### How To Verify

- Check whether the `onClick` of the item calls `event.preventDefault()`.

### Fix

- Call `event.preventDefault()` in the `onClick` of the item to keep the menu open, as in the [zoom example](./examples.md#edge-keeping-the-menu-open-with-preventdefault).
- For a setting that is toggled, use `MenuCheckboxItem` or `MenuRadioItem`: Space toggles it and keeps the menu open.

## A Disabled Item Still Gets The Focus

### Symptom

The arrow keys and typeahead stop on a disabled item, and `:disabled` styles do not apply to it.

### Likely Cause

This is the menu pattern: disabled menu items use `aria-disabled="true"` and stay focusable, so keyboard and screen reader users can find them. They never run, and their `onClick` is not called.

### How To Verify

- Inspect the item: it has `aria-disabled="true"` and no `disabled` attribute.

### Fix

- Style `[aria-disabled="true"]` instead of `:disabled`.
- Remove the item instead of disabling it when the user can never use it in this context.

## The Menu Has No Name

### Symptom

A screen reader announces the trigger as "button" and the menu as "menu" without a name.

### Likely Cause

The trigger has no text, like an icon-only `IconButton`, and no `aria-label`. The menu is named by the trigger, so it has no name either.

### How To Verify

- Inspect the trigger in the accessibility tree of the browser's dev tools: its name is empty.

### Fix

- Add an `aria-label` to the trigger that names the object, like "Actions for Q3 report.pdf".
- Pass `aria-label` to `MenuContent` when the menu needs a different name from its trigger.

## The Controlled Menu Does Not Follow `open`

### Symptom

Setting `open` from the parent does nothing, or the parent's `open` says the menu is closed while it is shown.

### Likely Cause

`onChangeOpen` does not store the value it receives. Opens from the trigger and closes made by the menu or the browser are final, and the menu follows `open` again only when the parent changes it: a parent that still holds `open={false}` after the user opened the menu changes nothing by setting `false` again.

### How To Verify

- Log `onChangeOpen` and check that the parent stores the value it receives.

### Fix

- Store the value: `onChangeOpen={setOpen}`.
- When several controlled menus share one state, as in the [file list example](./examples.md#controlledstateful-row-highlighted-while-its-menu-is-open), clear the state on close only when it still points at the closing menu.

## The Menu Is Not Next To Its Trigger

### Symptom

The menu opens in a corner of the page or over other content instead of next to the trigger.

### Likely Cause

The browser does not support CSS anchor positioning: Chrome and Edge before 129, Safari before 26, Firefox before 147. The menu still opens, closes and moves the focus, but it has nothing to position against.

### How To Verify

- Check `CSS.supports('anchor-name', '--a')` in the browser.

### Fix

- Ask the users to update the browser; the library has no script fallback for positioning.
