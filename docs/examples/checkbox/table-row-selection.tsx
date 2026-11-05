import { useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  Text,
} from '@vega-ui/react';

const invoices = [
  { id: 'INV-1042', customer: 'Northwind Traders', amount: '$1,240.00' },
  { id: 'INV-1043', customer: 'Contoso Ltd.', amount: '$860.50' },
  { id: 'INV-1044', customer: 'Fabrikam Inc.', amount: '$3,015.75' },
  { id: 'INV-1045', customer: 'Tailspin Toys', amount: '$420.00' },
];

export default function TableRowSelection() {
  const [selected, setSelected] = useState<string[]>([]);

  const allSelected = selected.length === invoices.length;
  const someSelected = selected.length > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      setSelected([]);
      return;
    }
    setSelected(invoices.map((invoice) => invoice.id));
  };

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
      return;
    }
    setSelected([...selected, id]);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
        <Text size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{selected.length} selected</Text>
        <Button size='sm' variant='secondary' appearance='ghost' disabled={selected.length === 0}>Download PDF</Button>
      </div>
      <Table fullWidth dataAlign='start' style={{ whiteSpace: 'nowrap' }}>
        <TableHead>
          <TableRow>
            <TableHeading style={{ width: 40 }}>
              <Checkbox size='sm'>
                <CheckboxInput aria-label='Select all invoices' checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
                <CheckboxIndicator>
                  <CheckboxCheckedIcon />
                  <CheckboxIndeterminateIcon />
                </CheckboxIndicator>
              </Checkbox>
            </TableHeading>
            <TableHeading>Invoice</TableHeading>
            <TableHeading>Customer</TableHeading>
            <TableHeading dataAlign='end'>Amount</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableData>
                <Checkbox size='sm'>
                  <CheckboxInput aria-label={`Select ${invoice.id}`} checked={selected.includes(invoice.id)} onChange={() => toggle(invoice.id)} />
                  <CheckboxIndicator>
                    <CheckboxCheckedIcon />
                    <CheckboxIndeterminateIcon />
                  </CheckboxIndicator>
                </Checkbox>
              </TableData>
              <TableData>{invoice.id}</TableData>
              <TableData>{invoice.customer}</TableData>
              <TableData dataAlign='end' style={{ fontVariantNumeric: 'tabular-nums' }}>{invoice.amount}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
