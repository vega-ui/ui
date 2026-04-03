# DataGridPicker Accessibility

## Labeling

- The picker should have a visible label or contextual heading that explains the choice set.
- Item content should be meaningful when announced one cell at a time.

## Keyboard Behavior

- Keyboard movement and selection inherit from the selectable grid layer.
- Wrapped navigation and range selection should be tested in the actual picker shape.
- Paged scroller pickers should preserve predictable focus after page changes.

## Focus Behavior

- One item is active at a time.
- Focus should remain visually visible even when the picker is dense.
- Page changes in scroller mode should not silently lose the active cell context.

## Screen Reader Semantics

- Announcements depend on the final item content and the grid semantics provided by the composed picker parts.
- Domain-specific wrappers such as `DayPicker` should add stronger date semantics where needed.

## Accessibility Risks

- dense grids without surrounding instructions
- page changes that hide the active context
- custom item rendering that removes the visible selected or disabled state
