# DataGridPicker Troubleshooting

## The Picker Scrolls But Focus Restores To The Wrong Page

### Symptom

After paging, focus jumps to an unexpected item or the first item on the wrong page.

### Likely Cause

Paged row groups do not provide stable `scope`, so the grid cannot distinguish one page from another.

### How To Verify

- inspect the row-group props in the paged composition
- compare behavior with and without explicit scope values

### Fix

Provide stable `scope` for each `DataGridPickerRowGroup` in scroller-based layouts.

## Selected And Active States Are Hard To Distinguish

### Symptom

Users can focus or select items, but the visual states look too similar.

### Likely Cause

Custom item rendering hides the picker item semantics.

### How To Verify

- inspect the final picker item DOM and classes
- compare the custom render with the default item treatment

### Fix

Preserve the picker item layer and ensure active, selected, and disabled states remain visibly distinct.

## The Picker Feels Like A Table Instead Of A Picker

### Symptom

The UI works technically, but it reads as a generic data grid rather than a selection control.

### Likely Cause

The composition uses table-like content and custom cell styling that ignores the picker semantics.

### How To Verify

- compare the product rendering with the shipped picker stories
- inspect whether `DataGridPickerItem` still owns the selection surface

### Fix

Lean on the picker item layer or move back to `DataGridSelectable` if a fully custom visual system is the real goal.
