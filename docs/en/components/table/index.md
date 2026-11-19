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

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own, with your icon set, and import that component everywhere. The repeated part here is a sortable column heading: `MyTableSortHeading` passes its props to `TableHeading`, picks the arrow from its `aria-sort`, and calls `onSort` from the button inside. See [Component recipes](../../recipes.md).

<!-- example: table/recipe.tsx -->
```tsx
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from '@vega-ui/icons';
import {
  Button,
  Icon,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  type TableHeadingProps,
} from '@vega-ui/react';
import { useState } from 'react';

interface MyTableSortHeadingProps extends TableHeadingProps {
  onSort(): void
}

export function MyTableSortHeading({ onSort, children, ...props }: MyTableSortHeadingProps) {
  let icon = <ArrowUpDownIcon />;
  if (props['aria-sort'] === 'ascending') icon = <ArrowUpIcon />;
  if (props['aria-sort'] === 'descending') icon = <ArrowDownIcon />;

  return (
    <TableHeading scope='col' {...props}>
      <Button size='xs' variant='secondary' appearance='transparent' style={{ display: 'inline-flex' }} onClick={onSort}>
        {children}
        <Icon size='xs'>{icon}</Icon>
      </Button>
    </TableHeading>
  );
}

type Invoice = { id: string, customer: string, amount: number };
type SortKey = 'customer' | 'amount';
type Direction = 'ascending' | 'descending';

const invoices: Invoice[] = [
  { id: 'INV-1042', customer: 'Northwind Traders', amount: 1240 },
  { id: 'INV-1043', customer: 'Acme Design', amount: 380 },
  { id: 'INV-1044', customer: 'Blue Harbor Cafe', amount: 96.5 },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function Recipe() {
  const [sortKey, setSortKey] = useState<SortKey>('amount');
  const [direction, setDirection] = useState<Direction>('descending');

  const sorted = [...invoices].sort((first, second) => {
    let result = first.amount - second.amount;
    if (sortKey === 'customer') result = first.customer.localeCompare(second.customer);
    return direction === 'ascending' ? result : -result;
  });

  const sortBy = (key: SortKey) => {
    if (key === sortKey) {
      setDirection(direction === 'ascending' ? 'descending' : 'ascending');
      return;
    }
    setSortKey(key);
    setDirection('ascending');
  };

  const sortOf = (key: SortKey) => {
    if (key !== sortKey) return undefined;
    return direction;
  };

  return (
    <div role='region' aria-label='Invoices' tabIndex={0} style={{ width: '100%', overflowX: 'auto', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
      <Table fullWidth edgePadded style={{ borderStyle: 'hidden' }}>
        <TableHead>
          <TableRow>
            <MyTableSortHeading aria-sort={sortOf('customer')} onSort={() => sortBy('customer')}>Customer</MyTableSortHeading>
            <MyTableSortHeading aria-sort={sortOf('amount')} onSort={() => sortBy('amount')}>Amount</MyTableSortHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableData>{invoice.customer}</TableData>
              <TableData style={{ whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{currency.format(invoice.amount)}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
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

- Reaching for `Grid` when semantic table markup is enough.
- Dropping semantic sections like `TableHead` just to simplify styling.
- Ignoring overflow behavior on smaller screens.
