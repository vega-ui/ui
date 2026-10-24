# YearPicker Accessibility

## Labeling

- The surrounding UI should explain what broader period the year grid represents.

## Keyboard Behavior

- Keyboard behavior is inherited from `DataGridPicker` and the year-grid items.

## Focus Behavior

- Without `defaultActive`, the tab stop is the visible `year`, which is always on the page in view
- Focus should remain visible as the year grid pages across larger ranges.

## Screen Reader Semantics

- Large year ranges are easier to understand when the visible decade/range is announced clearly in nearby text or picker labels.

## Form Semantics

- `YearPicker` is a picker subsystem, not native form input.

## Accessibility Risks

- paged year ranges with no clear visible range context
- custom layouts that obscure active, selected, or disabled states
