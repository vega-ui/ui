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
