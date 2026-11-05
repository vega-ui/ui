import {
  Button,
  Label,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const columns = ['Customer', 'Country', 'Orders'];

const customers = [
  { name: 'Northwind Traders', country: 'Germany', orders: 42 },
  { name: 'Blue Harbor Cafe', country: 'Portugal', orders: 7 },
  { name: 'Lumen Labs', country: 'Canada', orders: 19 },
];

export default function EmptyStateRowWhenDataIsUnavailable() {
  const fieldId = useId();
  const [query, setQuery] = useState('zz');

  const matches = customers.filter((customer) => customer.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={fieldId}>Search customers</Label>
        <TextField>
          <TextFieldInput id={fieldId} type='search' value={query} onChange={(event) => setQuery(event.target.value)} />
        </TextField>
      </div>
      <div style={{ width: '100%', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
        <Table fullWidth edgePadded style={{ borderStyle: 'hidden' }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => <TableHeading key={column} scope='col'>{column}</TableHeading>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.length === 0 && (
              <TableRow>
                <TableData colSpan={columns.length} dataAlign='center'>
                  <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', paddingBlock: 'var(--spacing-8)' }}>
                    <Text size={2} style={{ color: 'var(--label-secondary)' }}>No customers match “{query}”.</Text>
                    <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setQuery('')}>Clear search</Button>
                  </div>
                </TableData>
              </TableRow>
            )}
            {matches.map((customer) => (
              <TableRow key={customer.name}>
                <TableData>{customer.name}</TableData>
                <TableData>{customer.country}</TableData>
                <TableData style={{ fontVariantNumeric: 'tabular-nums' }}>{customer.orders}</TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
