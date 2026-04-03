# Dialog Troubleshooting

## Focus Does Not Return To The Trigger

### Symptom

Closing the dialog leaves focus in an unexpected place or appears to lose focus entirely.

### Likely Cause

The real trigger flow was replaced with a custom wrapper or nested overlay composition.

### How To Verify

- open the dialog from the keyboard
- close it with `Escape` or the close button
- verify where focus lands

### Fix

- return to the standard `DialogTrigger` composition first
- retest the exact nested overlay stack

## Nested Dialogs Feel Unstable

### Symptom

Escape handling, stacking, or focus movement behaves inconsistently with multiple dialogs open.

### Likely Cause

Nested dialogs were treated like isolated overlays instead of a stack-level integration case.

### How To Verify

- open parent and nested dialogs
- close them in reverse order
- test focus restoration at each level

### Fix

- keep the standard `Dialog` part structure intact
- retest nested overlays as one integration flow

## Long Content Pushes Actions Off Screen

### Symptom

Users cannot reach actions easily when the dialog body grows.

### Likely Cause

The content container was not given a scroll strategy.

### How To Verify

- populate the dialog with long content
- test smaller viewport heights

### Fix

- make the inner content region scrollable
- keep the header and critical actions outside the scrolling body when possible

## The Dialog Opens But Feels Unlabeled

### Symptom

The dialog is visible, but users lack clear orientation.

### Likely Cause

`DialogTitle` is missing or too vague.

### How To Verify

- open the dialog without looking at the trigger
- check whether the modal purpose is still obvious

### Fix

- add a specific `DialogTitle`
- keep title wording task-oriented
