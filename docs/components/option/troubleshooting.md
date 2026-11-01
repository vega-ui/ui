# Option Troubleshooting

## The Row Looks Selectable But Selection Does Not Persist

### Symptom

Clicking the row changes nothing durable in the UI.

### Likely Cause

`Option` was rendered without a parent selection model.

### How To Verify

- inspect whether `selected` is driven from parent state

### Fix

Move selection logic into the parent control and pass the resulting state into each option.

## The Keyboard Does Not Reach The Options

### Symptom

The arrows do nothing and no option looks active.

### Likely Cause

`Option` does not take focus or handle keys, and nothing owns the list.

### How To Verify

- check that a parent has the focus, sets `aria-activedescendant`, and passes `active` to one option

### Fix

Use [Listbox](../listbox/) or [Select](../select/), which do this for you.

## Disabled Rows Still Need Explanation

### Symptom

Users can see a disabled option but do not know why it is unavailable.

### Likely Cause

The row is disabled visually without surrounding explanatory copy.

### How To Verify

- test the flow with a user who has not seen the business rule before

### Fix

Keep the row disabled and surface the reason nearby through helper text or explanatory copy.
