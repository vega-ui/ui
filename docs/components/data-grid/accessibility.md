# DataGrid Accessibility

## Labeling

The grid should appear with surrounding context that explains what the cells represent.

## Keyboard Behavior

- users should be able to move between cells from the keyboard
- wrap mode should stay predictable
- excluded cells should not behave like normal navigation targets

## Focus Behavior

- active-cell movement should remain visible
- interactive content inside cells must not hide the current navigation state

## Screen Reader Semantics

- rows and cells should remain understandable as a grid structure
- custom cell content should not obscure the meaning of the current position

## Accessibility Risks

- using sparse visual layouts without matching exclusion behavior
- embedding complex controls that steal focus from the grid model
- using `DataGrid` where semantic `Table` would be clearer
