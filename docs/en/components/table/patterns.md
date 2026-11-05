# Table Patterns

## Pricing Or Comparison Table

When to use:

- A small set of rows and clear columns should stay semantically tabular.

Composition notes:

- Keep column labels explicit in `TableHead`.
- Prefer `fullWidth` when the table should read as a primary content block.

Trade-offs:

- Strong semantic clarity.
- Requires a consumer-owned overflow strategy on small screens.

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

## Summary Table With Footer Totals

When to use:

- The table needs aggregated totals or summary values.

Composition notes:

- Keep summaries in `TableFoot` rather than inventing ad-hoc footer rows.
- Align numeric columns consistently between body and footer.

Trade-offs:

- Keeps totals semantically tied to the table.
- Can feel heavy if the table contains only one or two rows.

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

## Table Inside Review Overlays

When to use:

- A dialog or drawer needs a compact tabular summary.

Composition notes:

- Keep the table narrow and scannable.
- Do not let the overlay become dependent on horizontal scrolling unless the layout is designed for it.

Trade-offs:

- Good for summaries and invoice breakdowns.
- Less robust for wide multi-column datasets.

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
