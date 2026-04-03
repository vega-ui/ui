# PinField Troubleshooting

## Typing Does Not Update The Visible Slots

### Symptom

The segmented UI renders, but typed characters do not appear in the slots.

### Likely Cause

`PinFieldHiddenInput` is missing from the composition.

### How To Verify

- inspect the rendered composition
- confirm the hidden input is present inside the root

### Fix

Add `PinFieldHiddenInput` inside `PinField`.

## Slot Order Feels Wrong Or Caret Movement Is Confusing

### Symptom

Arrow keys or typing appear to target the wrong slot.

### Likely Cause

Slot indexes are not rendered in ascending order.

### How To Verify

- inspect the slot sequence
- compare it with `maxLength`

### Fix

Render `PinFieldSlot` items in ascending index order and keep them aligned with the intended code length.

## The Backend Rejects Codes That Look Valid In The UI

### Symptom

Users can type the code, but submission fails due to format mismatch.

### Likely Cause

The frontend `mask` does not match backend expectations.

### How To Verify

- compare the current mask with the accepted backend format

### Fix

Update the mask and placeholders so they represent the real accepted code format.
