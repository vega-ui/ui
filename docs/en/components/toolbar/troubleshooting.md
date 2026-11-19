# Toolbar Troubleshooting

## The Arrow Keys Skip A Control

### Symptom

The arrow keys never reach a button of the toolbar, and Tab stops on it as a separate stop.

### Likely Cause

The control is not inside a `ToolbarItem`, so the toolbar does not know it.

### How To Verify

- Inspect the control: an item has `tabindex="0"` or `tabindex="-1"`; a control without `ToolbarItem` has neither.

### Fix

- Wrap the control in `ToolbarItem` with `asChild`. The items of a `ToggleGroup` need no `ToolbarItem`.

## Tab Skips The Whole Toolbar

### Symptom

Tab moves past the toolbar without stopping on any item.

### Likely Cause

The item that holds the Tab stop is disabled on the child, like `<ToolbarItem asChild><Button square aria-label='Share' disabled /></ToolbarItem>`. The toolbar counts it as enabled, gives it `tabindex="0"`, and the browser cannot focus a disabled button.

### How To Verify

- Inspect the item with `tabindex="0"`: it has `disabled`, but its `ToolbarItem` has no `disabled` prop.

### Fix

- Move `disabled` to the `ToolbarItem`: `<ToolbarItem asChild disabled><Button square aria-label='Share' /></ToolbarItem>`. For a `ToggleGroup`, set `disabled` on the group or on its items.

## The Arrow Keys Stop At A Text Field

### Symptom

In a horizontal toolbar, the Left and Right arrows move the caret of a field, and the items after the field are out of reach.

### Likely Cause

A text field keeps the Left and Right arrows, Home and End for its caret, as it should.

### How To Verify

- Check the order of the items: the field is not the last one.

### Fix

- Put the field last in the toolbar, as in the [file browser example](./examples.md#edge-a-search-field-last-in-the-toolbar), or move it out of the toolbar.

## The Down Arrow Opens A Menu Instead Of Moving

### Symptom

In a vertical toolbar, the Down or Up arrow on a "More" button opens its menu, and the focus does not move to the next item.

### Likely Cause

A `MenuTrigger` opens its menu with the Down and Up arrows, as the menu button pattern asks, and these are also the arrow keys of a vertical toolbar.

### How To Verify

- Check `orientation` of the toolbar and whether the item is a `MenuTrigger`.

### Fix

- Use a horizontal toolbar for menus, or put the `MenuTrigger` at the end of the vertical toolbar, where Home moves the focus away from it.

## A ToggleGroup Lies In A Row In A Vertical Toolbar

### Symptom

In a toolbar with `orientation="vertical"`, the items of a `ToggleGroup` are laid out side by side.

### Likely Cause

`ToggleGroup` is an `inline-flex` row and has no orientation of its own; the toolbar lays out only its direct children in a column.

### How To Verify

- Inspect the `role="radiogroup"` or `role="group"` element: its `flex-direction` is `row`.

### Fix

- Pass `style={{ flexDirection: 'column' }}` or a class with `flex-direction: column` to the `ToggleGroup`, as in the [vertical palette example](./examples.md#layoutoverlay-vertical-tool-palette-beside-a-canvas).

## An Item Submits The Form Around The Toolbar

### Symptom

A click on a toolbar button submits the form the toolbar is in.

### Likely Cause

With `asChild`, the type of the button is the type of your child, and a `Button` with `asChild` has no default `type`: a `<button>` without `type` in a form is a submit button.

### How To Verify

- Inspect the button: it has no `type` attribute.

### Fix

- Pass `type='button'` to the child. The default `<button>` of `ToolbarItem`, a `Toggle` and a `ToggleGroupToggle` already have it.
