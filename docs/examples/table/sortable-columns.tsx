import { ArrowDown, ArrowUp, ArrowUpDown } from '@vega-ui/icons';
import {
  Button,
  Icon,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
} from '@vega-ui/react';
import { useState } from 'react';

type Invoice = { id: string, customer: string, issued: string, amount: number };
type SortKey = 'customer' | 'issued' | 'amount';
type Direction = 'ascending' | 'descending';

const invoices: Invoice[] = [
  { id: 'INV-1042', customer: 'Northwind Traders', issued: '2026-10-02', amount: 1240 },
  { id: 'INV-1043', customer: 'Acme Design', issued: '2026-09-18', amount: 380 },
  { id: 'INV-1044', customer: 'Blue Harbor Cafe', issued: '2026-10-21', amount: 96.5 },
  { id: 'INV-1045', customer: 'Lumen Labs', issued: '2026-08-30', amount: 4210 },
];

const columns: { key: SortKey, label: string }[] = [
  { key: 'customer', label: 'Customer' },
  { key: 'issued', label: 'Issued' },
  { key: 'amount', label: 'Amount' },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' });

export const layout = 'wide';

export default function SortableColumns() {
  const [sortKey, setSortKey] = useState<SortKey>('issued');
  const [direction, setDirection] = useState<Direction>('descending');

  const sorted = [...invoices].sort((a, b) => {
    let result = 0;
    if (sortKey === 'amount') {
      result = a.amount - b.amount;
    } else {
      result = a[sortKey].localeCompare(b[sortKey]);
    }
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

  return (
    <div role='region' aria-label='Invoices' tabIndex={0} style={{ width: '100%', overflowX: 'auto', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
      <Table fullWidth edgePadded style={{ borderStyle: 'hidden' }}>
        <TableHead>
          <TableRow>
            <TableHeading scope='col'>Invoice</TableHeading>
            {columns.map((column) => {
              const active = column.key === sortKey;
              let icon = <ArrowUpDown />;
              if (active) {
                icon = direction === 'ascending' ? <ArrowUp /> : <ArrowDown />;
              }

              return (
                <TableHeading key={column.key} scope='col' aria-sort={active ? direction : undefined}>
                  <Button size='sm' variant='secondary' appearance='transparent' onClick={() => sortBy(column.key)}>
                    {column.label}
                    <Icon size='xs' aria-hidden='true'>{icon}</Icon>
                  </Button>
                </TableHeading>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableData style={{ whiteSpace: 'nowrap' }}>{invoice.id}</TableData>
              <TableData style={{ whiteSpace: 'nowrap' }}>{invoice.customer}</TableData>
              <TableData style={{ whiteSpace: 'nowrap' }}>{date.format(new Date(invoice.issued))}</TableData>
              <TableData style={{ whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{currency.format(invoice.amount)}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
