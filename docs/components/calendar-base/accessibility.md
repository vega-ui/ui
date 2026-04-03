# CalendarBase Accessibility

## Labeling

- `CalendarBase` itself is a visual shell; real calendar labeling belongs to the higher-level calendar or picker composition.

## Keyboard Behavior

- Keyboard behavior belongs to the embedded picker content and shared buttons, not the shell itself.

## Focus Behavior

- Focus should move to actual interactive controls inside the shell.

## Screen Reader Semantics

- Week labels use `role='columnheader'` and week-label rows use `role='row'`.
- The shell itself does not create a full grid model by itself.

## Form Semantics

- `CalendarBase` is infrastructure for pickers, not a form control.

## Accessibility Risks

- using the shell without a coherent grid or navigation contract
- losing consistent labeling across derived calendar compositions
