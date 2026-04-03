# CheckboxCard Accessibility

## Labeling

- The visible title and description should provide a clear checkbox label.
- Because the card renders as a labeled surface, the whole card should contribute to the accessible name and intent.

## Keyboard Behavior

- Keyboard behavior follows checkbox semantics.
- The whole card should remain understandable when focused through the actual checkbox control.

## Focus Behavior

- Focus should remain visible on the interactive card surface or control.
- Disabled cards should not appear focusable.

## Screen Reader Semantics

- The final semantics are checkbox semantics, not generic card semantics.
- `indeterminate` should remain perceivable as a mixed state.

## Accessibility Risks

- making only the visual indicator discoverable while the surrounding content feels inert
- using checkbox cards for single-select flows
- hiding the checkbox meaning behind decorative marketing content
