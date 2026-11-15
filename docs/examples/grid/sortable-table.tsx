import { useState } from 'react';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from '@vega-ui/icons';
import {
  Button,
  Grid,
  GridCell,
  GridColumnHeader,
  GridRow,
  GridRowGroup,
  GridRowHeader,
  Icon,
} from '@vega-ui/react';
import './examples.css';

type Column = 'customer' | 'amount' | 'due';
type Direction = 'ascending' | 'descending';

const invoices = [
  { customer: 'Northwind', amount: 1240, due: '2026-11-14' },
  { customer: 'Globex', amount: 860, due: '2026-11-03' },
  { customer: 'Initech', amount: 3120, due: '2026-11-21' },
  { customer: 'Umbrella', amount: 455, due: '2026-11-09' },
];

const columns: { key: Column, label: string, numeric?: boolean }[] = [
  { key: 'customer', label: 'Customer' },
  { key: 'amount', label: 'Amount', numeric: true },
  { key: 'due', label: 'Due' },
];

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const date = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

export const layout = 'wide';

export default function SortableTable() {
  const [sort, setSort] = useState<{ column: Column, direction: Direction }>({ column: 'due', direction: 'ascending' });

  const sorted = [...invoices].sort((a, b) => {
    const order = a[sort.column] < b[sort.column] ? -1 : 1;

    return sort.direction === 'ascending' ? order : -order;
  });

  const sortBy = (column: Column) => {
    if (sort.column !== column) {
      setSort({ column, direction: 'ascending' });
      return;
    }

    setSort({ column, direction: sort.direction === 'ascending' ? 'descending' : 'ascending' });
  };

  const sortIcon = (column: Column) => {
    if (sort.column !== column) return <ArrowUpDownIcon />;
    if (sort.direction === 'ascending') return <ArrowUpIcon />;

    return <ArrowDownIcon />;
  };

  return (
    <Grid asChild aria-label='Open invoices' defaultActive='-1:0' className='gridSheet gridTable'>
      <table>
        <GridRowGroup asChild>
          <thead>
            <GridRow row={-1} asChild>
              <tr>
                {columns.map((column, col) => (
                  <GridColumnHeader
                    key={column.key}
                    col={col}
                    asChild
                    aria-sort={sort.column === column.key ? sort.direction : undefined}
                  >
                    <th className={column.numeric ? 'gridNumeric' : undefined}>
                      <Button size='xs' variant='secondary' appearance='ghost' onClick={() => sortBy(column.key)}>
                        {column.label}
                        <Icon size='xs'>{sortIcon(column.key)}</Icon>
                      </Button>
                    </th>
                  </GridColumnHeader>
                ))}
              </tr>
            </GridRow>
          </thead>
        </GridRowGroup>
        <GridRowGroup asChild>
          <tbody>
            {sorted.map((invoice, row) => (
              <GridRow key={invoice.customer} row={row} asChild>
                <tr>
                  <GridRowHeader col={0} asChild>
                    <th scope='row'>{invoice.customer}</th>
                  </GridRowHeader>
                  <GridCell col={1} asChild>
                    <td className='gridNumeric'>{money.format(invoice.amount)}</td>
                  </GridCell>
                  <GridCell col={2} asChild>
                    <td>{date.format(new Date(invoice.due))}</td>
                  </GridCell>
                </tr>
              </GridRow>
            ))}
          </tbody>
        </GridRowGroup>
      </table>
    </Grid>
  );
}
