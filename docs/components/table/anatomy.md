# Table Anatomy

## Overview

`Table` owns shared alignment and edge-padding context for a semantic table structure. It is a [compound component](../../glossary.md#compound-component) because root and section parts cooperate through one data-display contract.

## Required Parts

### `Table`

Required. Owns alignment, edge padding, and full-width or full-height layout flags.

### `TableRow`

Required. Defines row structure inside header, body, or footer sections.

### `TableHeading` or `TableData`

Required. Provide the actual semantic cells for a row.

## Optional Parts

### `TableHead`

Recommended for column labels and accessible column structure.

### `TableBody`

Recommended for data rows.

### `TableFoot`

Optional footer for totals, summaries, or aggregated values.

## Composition Order

1. `Table`
2. `TableHead`
3. `TableBody`
4. `TableFoot`
5. `TableRow`
6. `TableHeading`
7. `TableData`

## Valid Composition Patterns

```tsx
<Table fullWidth>
  <TableHead>
    <TableRow>
      <TableHeading>Plan</TableHeading>
      <TableHeading>Price</TableHeading>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableData>Starter</TableData>
      <TableData>$9</TableData>
    </TableRow>
  </TableBody>
</Table>
```

## Invalid Composition Patterns

### Visual table layout without semantic table parts

This weakens native table meaning and often hurts accessibility.

### Mixing heading and data roles arbitrarily

Column labels should stay in `TableHeading` rather than becoming styled data cells.

### Treating `Table` like an interactive data grid

If the feature needs cell navigation, selection models, or richer grid behavior, choose `DataGrid` instead.
