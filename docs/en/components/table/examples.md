# Table Examples

## Basic

### Basic: plan comparison with row headers

A caption names the table, column headings use `scope='col'` and the first cell of every row is a `TableHeading` with `scope='row'`, so a screen reader announces “Single sign-on, Team” for each value. Check and dash icons are hidden and paired with visually hidden “Included” / “Not included” text.

<!-- example: table/plan-comparison-table.tsx -->
```tsx
import { Check, Minus } from '@vega-ui/icons';
import {
  Icon,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  VisuallyHidden,
} from '@vega-ui/react';

const plans = ['Starter', 'Team', 'Enterprise'];

const features: { name: string, values: (string | boolean)[] }[] = [
  { name: 'Price per seat', values: ['$9', '$29', 'Custom'] },
  { name: 'Projects', values: ['5', 'Unlimited', 'Unlimited'] },
  { name: 'Storage', values: ['10 GB', '1 TB', '5 TB'] },
  { name: 'Single sign-on', values: [false, true, true] },
  { name: 'Audit log', values: [false, false, true] },
];

export const layout = 'wide';

export default function PlanComparisonTable() {
  return (
    <div role='region' aria-label='Compare plans' tabIndex={0} style={{ width: '100%', overflowX: 'auto', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
      <Table fullWidth edgePadded dataAlign='center' style={{ borderStyle: 'hidden' }}>
        <caption style={{ captionSide: 'top', textAlign: 'start', padding: 'var(--spacing-6)', paddingBlockEnd: 0, fontWeight: 600 }}>
          Compare plans
        </caption>
        <TableHead>
          <TableRow>
            <TableHeading scope='col' dataAlign='start'>Feature</TableHeading>
            {plans.map((plan) => <TableHeading key={plan} scope='col'>{plan}</TableHeading>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.name}>
              <TableHeading scope='row' dataAlign='start' style={{ fontWeight: 400, whiteSpace: 'nowrap' }}>{feature.name}</TableHeading>
              {feature.values.map((value, index) => {
                if (typeof value === 'string') {
                  return <TableData key={plans[index]}>{value}</TableData>;
                }

                return (
                  <TableData key={plans[index]}>
                    <Icon size='sm' aria-hidden='true'>{value ? <Check /> : <Minus />}</Icon>
                    <VisuallyHidden>{value ? 'Included' : 'Not included'}</VisuallyHidden>
                  </TableData>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```
<!-- /example -->

### Basic: line items with computed totals

Subtotal, tax and total are computed from the line items and placed in `TableFoot`. The labels are row headings spanning two columns, so each total stays tied to its label.

<!-- example: table/summary-table-with-footer-totals.tsx -->
```tsx
import {
  Table,
  TableBody,
  TableData,
  TableFoot,
  TableHead,
  TableHeading,
  TableRow,
} from '@vega-ui/react';

const lines = [
  { item: 'Team plan · 12 seats', quantity: 12, unitPrice: 29 },
  { item: 'Extra storage · 500 GB', quantity: 1, unitPrice: 40 },
  { item: 'Priority support', quantity: 1, unitPrice: 99 },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function SummaryTableWithFooterTotals() {
  const subtotal = lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
  const tax = subtotal * 0.2;

  return (
    <div style={{ width: '100%', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
      <Table fullWidth edgePadded style={{ borderStyle: 'hidden' }}>
        <TableHead>
          <TableRow>
            <TableHeading scope='col'>Item</TableHeading>
            <TableHeading scope='col'>Qty</TableHeading>
            <TableHeading scope='col'>Amount</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {lines.map((line) => (
            <TableRow key={line.item}>
              <TableData>{line.item}</TableData>
              <TableData>{line.quantity}</TableData>
              <TableData style={{ fontVariantNumeric: 'tabular-nums' }}>{currency.format(line.quantity * line.unitPrice)}</TableData>
            </TableRow>
          ))}
        </TableBody>
        <TableFoot>
          <TableRow>
            <TableHeading scope='row' colSpan={2} dataAlign='start' style={{ fontWeight: 400 }}>Subtotal</TableHeading>
            <TableData style={{ fontVariantNumeric: 'tabular-nums' }}>{currency.format(subtotal)}</TableData>
          </TableRow>
          <TableRow>
            <TableHeading scope='row' colSpan={2} dataAlign='start' style={{ fontWeight: 400 }}>VAT 20%</TableHeading>
            <TableData style={{ fontVariantNumeric: 'tabular-nums' }}>{currency.format(tax)}</TableData>
          </TableRow>
          <TableRow>
            <TableHeading scope='row' colSpan={2} dataAlign='start'>Total due</TableHeading>
            <TableData style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{currency.format(subtotal + tax)}</TableData>
          </TableRow>
        </TableFoot>
      </Table>
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: sortable columns

The sort column and direction live in state; each sortable heading contains a real button and exposes the current order with `aria-sort`. Amounts sort numerically and dates by their ISO value, while the cells show formatted text.

<!-- example: table/sortable-columns.tsx -->
```tsx
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
```
<!-- /example -->

## Form/Integration

### Form/Integration: selecting rows for a bulk action

Every row has a named checkbox (`name='member'`, `value` = row id), and the header checkbox selects all rows or shows the indeterminate state for a partial selection. On submit the handler collects the selected ids with `FormData.getAll`.

<!-- example: table/row-selection-form.tsx -->
```tsx
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  HelperText,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
} from '@vega-ui/react';
import { FormEvent, useState } from 'react';

const members = [
  { id: 'u-17', name: 'Maya Chen', email: 'maya@acme.io' },
  { id: 'u-23', name: 'Omar Haddad', email: 'omar@acme.io' },
  { id: 'u-31', name: 'Lena Fischer', email: 'lena@acme.io' },
  { id: 'u-42', name: 'Tomás Ruiz', email: 'tomas@acme.io' },
];

export default function RowSelectionForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const allSelected = selected.length === members.length;
  const someSelected = selected.length > 0 && !allSelected;

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
      return;
    }
    setSelected([...selected, id]);
  };

  const toggleAll = () => {
    setSelected(allSelected ? [] : members.map((member) => member.id));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ids = new FormData(event.currentTarget).getAll('member');
    setMessage(`Sent a reminder to ${ids.length} ${ids.length === 1 ? 'member' : 'members'}: ${ids.join(', ')}.`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div role='region' aria-label='Members' tabIndex={0} style={{ width: '100%', overflowX: 'auto', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
        <Table fullWidth edgePadded dataAlign='start' style={{ borderStyle: 'hidden' }}>
          <TableHead>
            <TableRow>
              <TableHeading scope='col' style={{ width: 40 }}>
                <Checkbox>
                  <CheckboxInput aria-label='Select all members' checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
                  <CheckboxIndicator>
                    <CheckboxCheckedIcon />
                    <CheckboxIndeterminateIcon />
                  </CheckboxIndicator>
                </Checkbox>
              </TableHeading>
              <TableHeading scope='col'>Name</TableHeading>
              <TableHeading scope='col'>Email</TableHeading>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableData>
                  <Checkbox>
                    <CheckboxInput
                      name='member'
                      value={member.id}
                      aria-label={`Select ${member.name}`}
                      checked={selected.includes(member.id)}
                      onChange={() => toggle(member.id)}
                    />
                    <CheckboxIndicator>
                      <CheckboxCheckedIcon />
                    </CheckboxIndicator>
                  </Checkbox>
                </TableData>
                <TableData style={{ whiteSpace: 'nowrap' }}>{member.name}</TableData>
                <TableData style={{ whiteSpace: 'nowrap' }}>{member.email}</TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
        <Button type='submit' size='sm' disabled={selected.length === 0} style={{ flexShrink: 0 }}>Send reminder</Button>
        <HelperText role='status'>{message || `${selected.length} selected`}</HelperText>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: scrollable table inside a dialog

A long list of charges inside a dialog scrolls in its own focusable region instead of stretching the dialog. The header cells are sticky and get the dialog surface color, so rows do not show through them.

<!-- example: table/billing-table-inside-a-dialog.tsx -->
```tsx
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { CSSProperties, useId } from 'react';

const charges = Array.from({ length: 18 }, (_, index) => ({
  date: `Oct ${index + 1}`,
  description: index % 3 === 0 ? 'Build minutes overage' : 'API requests',
  amount: 4 + ((index * 7) % 23),
}));

export default function BillingTableInsideADialog() {
  const titleId = useId();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>View October charges</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId} style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>October usage charges</Heading>
          <DialogClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DialogClose>
        </div>
        <div role='region' aria-labelledby={titleId} tabIndex={0} style={{ maxHeight: 280, overflowY: 'auto' }}>
          <Table fullWidth>
            <TableHead>
              <TableRow>
                <TableHeading scope='col' style={{ position: 'sticky', insetBlockStart: 0, background: 'var(--surface-primary)' }}>Date</TableHeading>
                <TableHeading scope='col' style={{ position: 'sticky', insetBlockStart: 0, background: 'var(--surface-primary)' }}>Description</TableHeading>
                <TableHeading scope='col' style={{ position: 'sticky', insetBlockStart: 0, background: 'var(--surface-primary)' }}>Amount</TableHeading>
              </TableRow>
            </TableHead>
            <TableBody>
              {charges.map((charge) => (
                <TableRow key={charge.date}>
                  <TableData>{charge.date}</TableData>
                  <TableData>{charge.description}</TableData>
                  <TableData style={{ fontVariantNumeric: 'tabular-nums' }}>${charge.amount}.00</TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

## Error

### Error: rows failed to load

Loading, error and data states share the same table: the loading and error rows span every column via `colSpan={columns.length}`. The error is announced with `role='alert'` and Retry loads the rows on the second attempt.

<!-- example: table/failed-to-load-rows.tsx -->
```tsx
import {
  Button,
  HelperText,
  Spinner,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
} from '@vega-ui/react';
import { useEffect, useState } from 'react';

type Status = 'loading' | 'error' | 'ready';

const columns = ['Deploy', 'Branch', 'Duration'];

const deploys = [
  { id: '#4182', branch: 'main', duration: '3m 12s' },
  { id: '#4181', branch: 'fix/invoice-rounding', duration: '2m 47s' },
  { id: '#4180', branch: 'main', duration: '3m 05s' },
];

export default function FailedToLoadRows() {
  const [status, setStatus] = useState<Status>('loading');
  const [attempt, setAttempt] = useState(1);

  useEffect(() => {
    if (status !== 'loading') return;

    const timer = setTimeout(() => setStatus(attempt === 1 ? 'error' : 'ready'), 1000);

    return () => clearTimeout(timer);
  }, [status, attempt]);

  const retry = () => {
    setAttempt(attempt + 1);
    setStatus('loading');
  };

  return (
    <div style={{ width: '100%', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
      <Table fullWidth edgePadded aria-busy={status === 'loading'} style={{ borderStyle: 'hidden' }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => <TableHeading key={column} scope='col'>{column}</TableHeading>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {status === 'loading' && (
            <TableRow>
              <TableData colSpan={columns.length} dataAlign='center' style={{ height: 'var(--spacing-52)' }}>
                <Spinner size={3} aria-label='Loading deploys' style={{ marginInline: 'auto' }} />
              </TableData>
            </TableRow>
          )}
          {status === 'error' && (
            <TableRow>
              <TableData colSpan={columns.length} dataAlign='center' style={{ height: 'var(--spacing-52)' }}>
                <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center' }}>
                  <HelperText error role='alert'>Could not load deploys: the request timed out.</HelperText>
                  <Button size='sm' variant='secondary' appearance='ghost' onClick={retry}>Retry</Button>
                </div>
              </TableData>
            </TableRow>
          )}
          {status === 'ready' && deploys.map((deploy) => (
            <TableRow key={deploy.id}>
              <TableData>{deploy.id}</TableData>
              <TableData>{deploy.branch}</TableData>
              <TableData>{deploy.duration}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: archived rows with locked actions

Archived rows use a secondary text color and an “Archived” badge, so the state is not conveyed by color alone, and their row actions are disabled. Each action button has an accessible name that includes its project.

<!-- example: table/visually-subdued-archived-rows.tsx -->
```tsx
import {
  Badge,
  Button,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
} from '@vega-ui/react';

const projects = [
  { id: 'p1', name: 'Mobile app redesign', owner: 'Maya Chen', archived: false },
  { id: 'p2', name: 'Spring campaign 2025', owner: 'Omar Haddad', archived: true },
  { id: 'p3', name: 'Billing migration', owner: 'Lena Fischer', archived: false },
  { id: 'p4', name: 'Legacy API docs', owner: 'Tomás Ruiz', archived: true },
];

export const layout = 'wide';

export default function VisuallySubduedArchivedRows() {
  return (
    <div role='region' aria-label='Projects' tabIndex={0} style={{ width: '100%', overflowX: 'auto', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
      <Table fullWidth edgePadded style={{ borderStyle: 'hidden' }}>
        <TableHead>
          <TableRow>
            <TableHeading scope='col'>Project</TableHeading>
            <TableHeading scope='col'>Owner</TableHeading>
            <TableHeading scope='col'>Actions</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id} style={project.archived ? { color: 'var(--label-secondary)' } : undefined}>
              <TableData>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                  {project.name}
                  {project.archived && <Badge size='sm' appearance='surface'>Archived</Badge>}
                </span>
              </TableData>
              <TableData style={{ whiteSpace: 'nowrap' }}>{project.owner}</TableData>
              <TableData>
                <Button size='sm' variant='secondary' appearance='ghost' disabled={project.archived} aria-label={`Edit ${project.name}`}>
                  Edit
                </Button>
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: empty result after filtering

When the search matches nothing, the body renders one row spanning all columns with an explanation and a way out. The headers stay in place, so the table does not collapse.

<!-- example: table/empty-state-row-when-data-is-unavailable.tsx -->
```tsx
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
```
<!-- /example -->

### Edge: 200 rows and 8 columns in a scroll container

The table keeps its natural width and scrolls in both directions inside a `role='region'` with `tabIndex={0}`, so keyboard users can scroll it too. The header row sticks to the top while scrolling.

<!-- example: table/scrollable-wide-table.tsx -->
```tsx
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
```
<!-- /example -->

### Edge: long unbreakable text

With `table-layout: fixed` and column widths in a `colgroup`, a long file name wraps anywhere (`overflow-wrap: anywhere`), while an email is truncated with an ellipsis and keeps the full value in `title`. Short columns never get squeezed.

<!-- example: table/long-cell-content.tsx -->
```tsx
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
} from '@vega-ui/react';

const files = [
  { name: 'q3-board-presentation-final-v7-reviewed-by-legal-and-finance-DO-NOT-SHARE.pdf', owner: 'maya.chen@northwind-traders-international.example.com', size: '18.4 MB' },
  { name: 'logo.svg', owner: 'li@acme.io', size: '4 KB' },
  { name: 'Отчёт_о_продажах_за_третий_квартал_по_регионам.xlsx', owner: 'ivan.petrov@example.ru', size: '2.1 MB' },
];

export const layout = 'wide';

export default function LongCellContent() {
  return (
    <div style={{ width: '100%', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
      <Table fullWidth edgePadded style={{ tableLayout: 'fixed', borderStyle: 'hidden' }}>
        <colgroup>
          <col />
          <col style={{ width: '35%' }} />
          <col style={{ width: 88 }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableHeading scope='col'>File</TableHeading>
            <TableHeading scope='col'>Owner</TableHeading>
            <TableHeading scope='col'>Size</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.name}>
              <TableData style={{ overflowWrap: 'anywhere' }}>{file.name}</TableData>
              <TableData title={file.owner} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {file.owner}
              </TableData>
              <TableData style={{ whiteSpace: 'nowrap' }}>{file.size}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```
<!-- /example -->

### Edge: flush edges inside a card

By default `edgePadded` is `false`: the first and last cells lose their outer padding so the text lines up with the card heading. Toggle the prop to compare it with padded edges.

<!-- example: table/flush-edges-without-extra-padding.tsx -->
```tsx
import {
  Button,
  Card,
  Heading,
  Table,
  TableBody,
  TableData,
  TableRow,
} from '@vega-ui/react';
import { useState } from 'react';

const details = [
  ['Plan', 'Team'],
  ['Billing cycle', 'Yearly'],
  ['Next invoice', '1 December 2026'],
];

export default function FlushEdgesWithoutExtraPadding() {
  const [edgePadded, setEdgePadded] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'start', width: '100%' }}>
      <Button size='sm' variant='secondary' appearance='ghost' aria-pressed={edgePadded} onClick={() => setEdgePadded(!edgePadded)}>
        edgePadded: {String(edgePadded)}
      </Button>
      <Card appearance='outline' size='sm' style={{ alignItems: 'stretch', width: '100%', maxWidth: 360 }}>
        <Heading as='h3' size={4} fontWeight={600}>Subscription</Heading>
        <Table fullWidth edgePadded={edgePadded}>
          <TableBody>
            {details.map(([label, value]) => (
              <TableRow key={label}>
                <TableData>{label}</TableData>
                <TableData>{value}</TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
```
<!-- /example -->
