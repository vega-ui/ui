# Table

## Doc Profile

`advanced interactive`

## Summary

`Table` is a [compound component](../../glossary.md#compound-component) for semantic tabular data where native table structure matters more than grid-like keyboard interaction.

## Imports

```tsx
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeading,
  TableData,
  TableFoot,
  type TableProps,
} from '@vega-ui/react';
```

## Exported Types

- `TableProps`
- `TableHeadProps`
- `TableBodyProps`
- `TableRowProps`
- `TableHeadingProps`
- `TableDataProps`
- `TableFootProps`

## Minimal Composition

<!-- example: table/minimal-composition.tsx -->
```tsx
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeading scope='col'>Plan</TableHeading>
          <TableHeading scope='col'>Price</TableHeading>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableData>Starter</TableData>
          <TableData>$9 / month</TableData>
        </TableRow>
        <TableRow>
          <TableData>Team</TableData>
          <TableData>$29 / month</TableData>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```
<!-- /example -->

## Required Parts

- `Table`: root semantic table and alignment owner
- `TableRow`: row structure for sections
- `TableHeading` or `TableData`: cell-level content

## Optional Parts

- `TableHead`: header section for column labels
- `TableBody`: body section for data rows
- `TableFoot`: footer section for summaries or totals

## Composition Order

1. `Table`
2. `TableHead`
3. `TableBody`
4. `TableFoot`
5. `TableRow`
6. `TableHeading`
7. `TableData`

## Variants

- Data alignment through `dataAlign`
- `fullWidth` and `fullHeight` layout variants
- Edge-padded versus flush edge treatment through `edgePadded`

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- `Table` is a poor fit when the UI needs cell-level keyboard navigation or complex selection models.
- Small screens need explicit overflow or stacked-layout treatment in the consumer.
- Alignment choices should stay consistent across heading and data cells.

## Common Mistakes

- Reaching for `DataGrid` when semantic table markup is enough.
- Dropping semantic sections like `TableHead` just to simplify styling.
- Ignoring overflow behavior on smaller screens.
