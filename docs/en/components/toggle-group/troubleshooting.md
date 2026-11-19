# ToggleGroup Troubleshooting

## The Arrow Keys Do Not Press An Item

### Symptom

The arrow keys move the focus to another item, but the value does not change.

### Likely Cause

This is the intended behavior: the arrow keys only move the focus, and Space, Enter or a click presses the item, as in the WAI-ARIA toolbar example.

### How To Verify

- Press Space on the focused item: it becomes pressed and `onChangeValue` is called.

### Fix

- Nothing to fix. If the choice must follow the focus, as with native radios, use [SegmentedControl](../segmented-control/).

## The Pressed Item Cannot Be Released

### Symptom

In a group without `multiple`, a second press on the pressed item keeps it pressed.

### Likely Cause

A group with one pressed item acts as a radio group: a press presses an item, never releases one.

### How To Verify

- Check that the group has no `multiple`, and that `onChangeValue` is not called on the second press.

### Fix

- Offer a separate "Clear" button that sets the value to `null`, or use `multiple` when every item is independent.

## Items Of A Group Are Pressed Together

### Symptom

Pressing one item presses another too, or the arrow keys skip an item.

### Likely Cause

Two items share a `value`, so the group sees them as one item.

### How To Verify

- Check the `value` of every `ToggleGroupToggle` in the group.

### Fix

- Give every item its own `value`. A [Toggle](../toggle/) inside the group is not an item at all: replace it with `ToggleGroupToggle`.

## Tab Does Not Enter A Group On The Pressed Item

### Symptom

Inside a `Toolbar`, Tab enters on the first item of the toolbar, not on the pressed item of the group.

### Likely Cause

Inside a toolbar the group has no Tab stop of its own: the toolbar keeps one for all its items, on its first item or the one that had the focus last.

### How To Verify

- Check whether a `Toolbar` is around the group.

### Fix

- Nothing to fix: the toolbar pattern has one Tab stop. Take the group out of the toolbar if it must keep its own.

## The Value Of A Group Is Missing From The Form

### Symptom

The value of a `ToggleGroup` is missing from the data of a submitted form.

### Likely Cause

The items are buttons, and the group renders no hidden inputs.

### How To Verify

- Read `new FormData(form)`: there is no entry for the group.

### Fix

- Keep the value in state and add it to the data yourself, or use [SegmentedControl](../segmented-control/), [Radio](../radio/) or [Checkbox](../checkbox/) for a form value.
