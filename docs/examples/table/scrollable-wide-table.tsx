import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  Text,
} from '@vega-ui/react';
import { CSSProperties, useId } from 'react';

const columns = ['Order', 'Customer', 'City', 'Items', 'Subtotal', 'Shipping', 'Status', 'Placed'];
const cities = ['Lisbon', 'Berlin', 'Toronto', 'Osaka', 'Austin'];
const statuses = ['Paid', 'Shipped', 'Delivered', 'Refunded'];

const rows = Array.from({ length: 200 }, (_, index) => [
  `#${20000 + index}`,
  `Customer ${index + 1}`,
  cities[index % cities.length],
  String(1 + (index % 6)),
  `$${(19 + ((index * 13) % 300)).toFixed(2)}`,
  index % 4 === 0 ? 'Free' : '$4.90',
  statuses[index % statuses.length],
  `Oct ${1 + (index % 31)}, 2026`,
]);

const stickyHeading: CSSProperties = {
  position: 'sticky',
  insetBlockStart: 0,
  background: 'var(--surface-primary)',
  whiteSpace: 'nowrap',
};

export default function ScrollableWideTable() {
  const captionId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Text id={captionId} size={2} fontWeight={500}>All orders ({rows.length})</Text>
      <div role='region' aria-labelledby={captionId} tabIndex={0} style={{ maxHeight: 320, overflow: 'auto', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
        <Table edgePadded style={{ borderStyle: 'hidden' }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => <TableHeading key={column} scope='col' style={stickyHeading}>{column}</TableHeading>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row[0]}>
                {row.map((cell, index) => <TableData key={columns[index]} style={{ whiteSpace: 'nowrap' }}>{cell}</TableData>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
