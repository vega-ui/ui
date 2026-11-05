import { Badge, Table, TableBody, TableData, TableHead, TableHeading, TableRow, Text } from '@vega-ui/react';

const statusVariant: Record<string, string> = {
  Paid: 'success',
  Overdue: 'error',
  Draft: 'info',
  'Partially paid': 'warning',
};

const invoices = [
  { id: 'INV-2051', customer: 'Northwind Traders', amount: '$4,200.00', status: 'Paid' },
  { id: 'INV-2050', customer: 'Contoso Pharmaceuticals International', amount: '$12,980.50', status: 'Overdue' },
  { id: 'INV-2049', customer: 'Fabrikam', amount: '$860.00', status: 'Partially paid' },
  { id: 'INV-2048', customer: 'Adventure Works', amount: '$1,315.75', status: 'Draft' },
];

export default function InvoicesTable() {
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <Table aria-label='Recent invoices' fullWidth dataAlign='start'>
        <TableHead>
          <TableRow>
            <TableHeading><Text size={2} style={{ color: 'var(--label-secondary)' }}>Customer</Text></TableHeading>
            <TableHeading dataAlign='end'><Text size={2} style={{ color: 'var(--label-secondary)' }}>Amount</Text></TableHeading>
            <TableHeading dataAlign='end'><Text size={2} style={{ color: 'var(--label-secondary)' }}>Status</Text></TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableData>
                <Text size={2} fontWeight={500} asChild><div>{invoice.customer}</div></Text>
                <Text size={1} style={{ color: 'var(--label-secondary)' }}>{invoice.id}</Text>
              </TableData>
              <TableData dataAlign='end'>
                <Text size={2} style={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{invoice.amount}</Text>
              </TableData>
              <TableData dataAlign='end'>
                <Badge size='sm' variant={statusVariant[invoice.status]}>{invoice.status}</Badge>
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
