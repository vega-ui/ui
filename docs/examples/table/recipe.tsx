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
