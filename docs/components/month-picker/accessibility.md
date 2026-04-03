# MonthPicker Accessibility

## Labeling

- The surrounding UI should explain what year or broader period the month grid applies to.

## Keyboard Behavior

- Keyboard behavior is inherited from `DataGridPicker` and the month-item grid primitives.

## Focus Behavior

- Focus should remain visible on the current month item, including custom layouts.

## Screen Reader Semantics

- Month labels should be localized consistently with the rest of the app.

## Form Semantics

- `MonthPicker` is a picker subsystem, not native form input.

## Accessibility Risks

- hardcoded locale-specific labels
- custom layouts that obscure active, selected, or disabled state
