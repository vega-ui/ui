# DataGrid Styling

## Overview

`DataGrid` styling is intentionally minimal. Most complexity lives in behavior and composition, not in a large component-local variable surface.

## Public CSS Variables

The current root implementation does not expose a stable `--data-grid-*` variable set. Styling mostly comes from cell and row content plus surrounding layout.

| Variable | Used By | Purpose |
| --- | --- | --- |
| grid layout properties | root grid | overall row flow |
| cell-level local styles | `DataGridCell` | width, height, local spacing |

## Part-Level Variables

### Root

The root [DataGrid style](../../../packages/ui/src/DataGrid/style.module.css) only declares the base grid layout.

### Cells

Most visual tuning happens at the cell level through local styles or custom child content rather than documented root-level variables.

## State And Variant Interaction

- wrap and exclusion are behavior contracts, not styling variants
- active-cell visibility depends more on content and focus styling than on root tokens

## Examples

### Cell-size tuning at usage site

```tsx
<DataGridRow row={0}>
  <DataGridCell col={0} style={{ width: 42, height: 42 }}>A1</DataGridCell>
</DataGridRow>
```

## Do Not Override

- do not invent undocumented `--data-grid-*` hooks as if they were public API
- do not restyle cells so aggressively that active-cell visibility disappears
