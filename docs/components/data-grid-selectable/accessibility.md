# DataGridSelectable Accessibility

## Labeling

- The grid should have an external label or surrounding context that explains the selection task.
- Cell labels should remain meaningful when read individually.

## Keyboard Behavior

- Arrow-key navigation depends on the underlying `DataGrid`.
- `Shift` plus arrows can expand a range when `selection='range'` and `expandable` is enabled.
- Wrapped navigation changes how focus moves at edges.

## Focus Behavior

- One cell is active at a time.
- Disabled or excluded cells should not become the active destination when product rules forbid them.
- Real flows should test focus after range expansion and pointer dragging.

## Screen Reader Semantics

- The final semantics depend on the composed grid and cell layer.
- Higher-level consumers should preserve clear announcements for active, selected, and unavailable cells.

## Accessibility Risks

- hiding active or selected state visually
- using unstable cell labels that make grid navigation confusing
- shipping a dense selection matrix without contextual instructions
