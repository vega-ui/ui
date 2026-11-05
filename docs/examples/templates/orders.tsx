import { useId, useState } from 'react';
import {
  Badge,
  Button,
  Heading,
  Icon,
  Label,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationListItem,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
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
import { Search } from '@vega-ui/icons';

type Status = 'paid' | 'fulfilled' | 'pending' | 'refunded';

type PageItem = number | 'start' | 'end';

const statuses: Record<Status, { label: string, variant: string }> = {
  paid: { label: 'Paid', variant: 'info' },
  fulfilled: { label: 'Fulfilled', variant: 'success' },
  pending: { label: 'Pending', variant: 'warning' },
  refunded: { label: 'Refunded', variant: 'error' },
};

const periods = [
  { value: '7', label: '7 days' },
  { value: '30', label: '30 days' },
  { value: '90', label: '90 days' },
];

const customers = [
  { name: 'Maya Chen', email: 'maya.chen@hey.com' },
  { name: 'Omar Haddad', email: 'omar@haddad.studio' },
  { name: 'Lena Fischer', email: 'lena.fischer@posteo.de' },
  { name: 'Tomás Ruiz', email: 'tomas.ruiz@gmail.com' },
  { name: 'Aiko Tanaka', email: 'aiko@tanaka.jp' },
  { name: 'Priya Nair', email: 'priya.nair@outlook.com' },
  { name: 'Jonas Berg', email: 'jonas@bergdesign.se' },
  { name: 'Grace Okafor', email: 'grace.okafor@icloud.com' },
];

const statusCycle: Status[] = ['fulfilled', 'paid', 'fulfilled', 'pending', 'fulfilled', 'paid', 'refunded'];

const TODAY = Date.UTC(2026, 10, 3);
const PAGE_SIZE = 8;

const orders = Array.from({ length: 64 }, (_, index) => ({
  id: `#${10482 - index}`,
  customer: customers[(index * 5) % customers.length],
  daysAgo: Math.floor(index * 1.4),
  status: statusCycle[index % statusCycle.length],
  total: 18 + ((index * 47) % 260) + ((index * 13) % 100) / 100,
}));

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const date = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

const getPageItems = (page: number, total: number): PageItem[] => {
  if (total <= 5) return Array.from({ length: total }, (_, index) => index + 1);
  if (page <= 3) return [1, 2, 3, 'end', total];
  if (page >= total - 2) return [1, 'start', total - 2, total - 1, total];

  return [1, 'start', page, 'end', total];
};

const field = { display: 'grid', gap: 'var(--spacing-3)', alignContent: 'start' } as const;
const nowrap = { whiteSpace: 'nowrap' } as const;

export default function Orders() {
  const id = useId();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string | null>('all');
  const [period, setPeriod] = useState('30');
  const [page, setPage] = useState(1);

  const needle = query.trim().toLowerCase();
  const matches = orders.filter((order) => {
    if (order.daysAgo > Number(period)) return false;
    if (status !== 'all' && order.status !== status) return false;
    if (needle === '') return true;

    return order.id.includes(needle) || order.customer.name.toLowerCase().includes(needle) || order.customer.email.includes(needle);
  });

  const pageCount = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * PAGE_SIZE;
  const visible = matches.slice(start, start + PAGE_SIZE);
  const pages = getPageItems(current, pageCount);

  const filter = (update: () => void) => {
    update();
    setPage(1);
  };

  const clearFilters = () => filter(() => {
    setQuery('');
    setStatus('all');
    setPeriod('90');
  });

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 960, marginInline: 'auto' }}>
      <header style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading id={`${id}-title`} as='h1' size={7} fontWeight={700}>Orders</Heading>
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>Track payments, fulfilment and refunds across your store.</Text>
      </header>

      <div role='search' aria-label='Filter orders' style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 'var(--spacing-8)' }}>
        <div style={{ ...field, flex: '999 1 240px' }}>
          <Label htmlFor={`${id}-search`}>Search</Label>
          <TextField size='sm'>
            <Icon size='sm' aria-hidden='true' style={{ flexShrink: 0, marginInlineStart: 'var(--spacing-6)', color: 'var(--label-tertiary)' }}><Search /></Icon>
            <TextFieldInput
              id={`${id}-search`}
              type='search'
              value={query}
              placeholder='Order number, name or email'
              onChange={(event) => filter(() => setQuery(event.currentTarget.value))}
            />
          </TextField>
        </div>
        <div style={{ ...field, flex: '1 1 160px' }}>
          <Label htmlFor={`${id}-status`}>Status</Label>
          <Select size='sm' value={status} onChangeValue={(next) => filter(() => setStatus(next ?? 'all'))}>
            <SelectCombobox id={`${id}-status`}>
              <SelectValue />
              <SelectIcon />
            </SelectCombobox>
            <SelectListbox>
              <SelectOption value='all'>All statuses</SelectOption>
              {Object.entries(statuses).map(([value, item]) => (
                <SelectOption key={value} value={value}>{item.label}</SelectOption>
              ))}
            </SelectListbox>
          </Select>
        </div>
        <div style={{ ...field, flex: '0 0 auto' }}>
          <Label id={`${id}-period`}>Period</Label>
          <SegmentedControl
            size='sm'
            name={`${id}-period`}
            role='radiogroup'
            aria-labelledby={`${id}-period`}
            value={period}
            onChange={(event) => filter(() => setPeriod(event.target.value))}
          >
            {periods.map((item) => (
              <SegmentedControlItem key={item.value} value={item.value}>
                <SegmentedControlItemInput />
                {item.label}
              </SegmentedControlItem>
            ))}
            <SegmentedControlIndicator />
          </SegmentedControl>
        </div>
      </div>

      <div
        role='region'
        aria-labelledby={`${id}-title`}
        tabIndex={0}
        style={{ minWidth: 0, overflowX: 'auto', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}
      >
        <Table fullWidth edgePadded style={{ borderStyle: 'hidden' }}>
          <TableHead>
            <TableRow>
              <TableHeading scope='col' dataAlign='start'>Order</TableHeading>
              <TableHeading scope='col' dataAlign='start'>Customer</TableHeading>
              <TableHeading scope='col' dataAlign='start'>Date</TableHeading>
              <TableHeading scope='col' dataAlign='start'>Status</TableHeading>
              <TableHeading scope='col' dataAlign='end'>Total</TableHeading>
            </TableRow>
          </TableHead>
          <TableBody>
            {visible.length === 0 && (
              <TableRow>
                <TableData colSpan={5} dataAlign='center'>
                  <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', paddingBlock: 'var(--spacing-16)' }}>
                    <div style={{ display: 'grid', gap: 'var(--spacing-2)', justifyItems: 'center' }}>
                      <Text size={3} fontWeight={700}>No orders found</Text>
                      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Try another search or widen the period.</Text>
                    </div>
                    <Button size='xs' variant='secondary' appearance='ghost' onClick={clearFilters}>Clear filters</Button>
                  </div>
                </TableData>
              </TableRow>
            )}
            {visible.map((order) => (
              <TableRow key={order.id}>
                <TableData dataAlign='start' style={{ ...nowrap, fontVariantNumeric: 'tabular-nums' }}>{order.id}</TableData>
                <TableData dataAlign='start'>
                  <span style={{ display: 'grid' }}>
                    <Text size={3} fontWeight={500} style={nowrap}>{order.customer.name}</Text>
                    <Text size={2} style={{ ...nowrap, color: 'var(--label-secondary)' }}>{order.customer.email}</Text>
                  </span>
                </TableData>
                <TableData dataAlign='start' style={{ ...nowrap, fontVariantNumeric: 'tabular-nums' }}>{date.format(TODAY - order.daysAgo * 86_400_000)}</TableData>
                <TableData dataAlign='start'>
                  <Badge size='sm' variant={statuses[order.status].variant}>{statuses[order.status].label}</Badge>
                </TableData>
                <TableData dataAlign='end' style={{ ...nowrap, fontVariantNumeric: 'tabular-nums' }}>{currency.format(order.total)}</TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          {matches.length === 0 ? 'No results' : `Showing ${start + 1}–${start + visible.length} of ${matches.length} orders`}
        </Text>
        <nav aria-label='Orders pages'>
          <Pagination size='xs' style={{ flexWrap: 'wrap', margin: 0, paddingInlineStart: 0 }}>
            <PaginationListItem>
              <Button size='xs' variant='secondary' appearance='ghost' disabled={current === 1} onClick={() => setPage(current - 1)}>Previous</Button>
            </PaginationListItem>
            {pages.map((item) => {
              if (typeof item === 'string') {
                return <PaginationListItem key={item}><PaginationEllipsis /></PaginationListItem>;
              }

              return (
                <PaginationListItem key={item}>
                  <PaginationItem current={item === current} aria-label={`Page ${item}`} onClick={() => setPage(item)}>
                    {item}
                  </PaginationItem>
                </PaginationListItem>
              );
            })}
            <PaginationListItem>
              <Button size='xs' variant='secondary' appearance='ghost' disabled={current === pageCount} onClick={() => setPage(current + 1)}>Next</Button>
            </PaginationListItem>
          </Pagination>
        </nav>
      </div>
    </div>
  );
}
