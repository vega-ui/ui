import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationItem,
  PaginationListItem,
  PaginationTriggerIconButton,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

const customers = ['Maya Chen', 'Omar Haddad', 'Lena Fischer', 'Tomás Ruiz', 'Aiko Tanaka', 'Priya Nair', 'Jonas Berg'];

const orders = Array.from({ length: 47 }, (_, index) => ({
  id: `#${10500 + index}`,
  customer: customers[index % customers.length],
  total: 24 + ((index * 37) % 180),
}));

const pageSize = 10;

export const layout = 'wide';

export default function PaginatedOrderList() {
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(orders.length / pageSize);
  const start = (page - 1) * pageSize;
  const visible = orders.slice(start, start + pageSize);
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ width: '100%', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
        <Table fullWidth edgePadded style={{ borderStyle: 'hidden' }}>
          <TableHead>
            <TableRow>
              <TableHeading scope='col'>Order</TableHeading>
              <TableHeading scope='col' dataAlign='start'>Customer</TableHeading>
              <TableHeading scope='col'>Total</TableHeading>
            </TableRow>
          </TableHead>
          <TableBody>
            {visible.map((order) => (
              <TableRow key={order.id}>
                <TableData>{order.id}</TableData>
                <TableData dataAlign='start'>{order.customer}</TableData>
                <TableData style={{ fontVariantNumeric: 'tabular-nums' }}>${order.total}.00</TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-4)' }}>
        <nav aria-label='Orders pages'>
          <Pagination size='sm'>
            <PaginationListItem>
              <PaginationTriggerIconButton aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
                <Icon><ChevronLeft /></Icon>
              </PaginationTriggerIconButton>
            </PaginationListItem>
            {pages.map((item) => (
              <PaginationListItem key={item}>
                <PaginationItem current={item === page} aria-label={`Page ${item}`} onClick={() => setPage(item)}>
                  {item}
                </PaginationItem>
              </PaginationListItem>
            ))}
            <PaginationListItem>
              <PaginationTriggerIconButton aria-label='Next page' disabled={page === pageCount} onClick={() => setPage(page + 1)}>
                <Icon><ChevronRight /></Icon>
              </PaginationTriggerIconButton>
            </PaginationListItem>
          </Pagination>
        </nav>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          Showing {start + 1}–{start + visible.length} of {orders.length} orders
        </Text>
      </div>
    </div>
  );
}
