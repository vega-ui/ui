# DayPicker Accessibility

## Labeling

- The surrounding calendar surface should explain what month and year the user is currently viewing.

## Keyboard Behavior

- Keyboard navigation is inherited from `DataGridPicker` and the grid item semantics.

## Focus Behavior

- Focus and active cell behavior should remain visible across selected, excluded, and disabled dates.

## Screen Reader Semantics

- Grid roles and state semantics come from the underlying picker/grid primitives.
- Weekday labels and period labels should stay synchronized with the rendered month.

## Form Semantics

- `DayPicker` is a picker subsystem, not native form input by itself.

## Accessibility Risks

- custom day rendering that hides focus or selection state
- scrollable month paging with unclear period announcements
