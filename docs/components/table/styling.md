# Table Styling

## Overview

`Table` styling is split across the root table element, row borders, and alignment-aware heading and data cells. The public contract is small and mostly semantic.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--border-color` | `TableRow` | Row separators. |

## Part-Level Variables

- `Table`: handles full-width and full-height layout flags.
- `TableRow`: applies row borders through `--border-color`.
- `TableHeading`: owns heading padding and alignment behavior.
- `TableData`: owns cell padding and alignment behavior.

## State And Variant Interaction

- `dataAlign` changes both heading and data cell alignment.
- `edgePadded={false}` removes first and last cell edge padding to align with surrounding layout.
- `fullWidth` and `fullHeight` affect layout but do not change the semantic structure.

## Examples

```css
.brandTable {
  --border-color: rgba(62, 68, 78, 0.18);
}
```

```css
.compactTable td,
.compactTable th {
  padding: 8px;
}
```

## Do Not Override

- Do not remove row separators without checking scanability.
- Do not rely only on visual alignment if semantic heading structure is already weak.
- Do not force table styling into grid-like interaction semantics that the component does not own.
