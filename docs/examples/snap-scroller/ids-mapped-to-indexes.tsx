import {
  Button,
  SnapScroller,
  SnapScrollerContent,
  Text,
  type SnapScrollerApiRef,
} from '@vega-ui/react';
import { useRef, useState, type CSSProperties } from 'react';

const invoices = [
  { id: 'INV-1038', customer: 'Northwind Traders', total: '$1,240.00' },
  { id: 'INV-1041', customer: 'Blue Yonder Airlines', total: '$860.50' },
  { id: 'INV-1043', customer: 'Fabrikam', total: '$3,115.00' },
  { id: 'INV-1050', customer: 'Tailspin Toys', total: '$412.75' },
];

const linkedInvoiceId = 'INV-1043';

const slideStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--spacing-2)',
  width: '100%',
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function IdsMappedToIndexes() {
  const api = useRef<SnapScrollerApiRef>(null);
  const initialIndex = invoices.findIndex((invoice) => invoice.id === linkedInvoiceId);
  const [current, setCurrent] = useState(initialIndex);

  const showInvoice = (id: string) => {
    const index = invoices.findIndex((invoice) => invoice.id === id);
    if (index === -1) return;

    api.current?.scrollToElementByKey(index);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-4)' }}>
        {invoices.map((invoice) => (
          <Button
            key={invoice.id}
            size='sm'
            variant={invoices[current].id === invoice.id ? 'primary' : 'secondary'}
            appearance='ghost'
            aria-pressed={invoices[current].id === invoice.id}
            onClick={() => showInvoice(invoice.id)}
          >
            {invoice.id}
          </Button>
        ))}
      </div>
      <SnapScroller
        apiRef={api}
        defaultIndex={initialIndex}
        tabIndex={0}
        aria-label='Invoices'
        onScrollSnapChange={(_, index) => setCurrent(index)}
        style={{ gap: 'var(--spacing-6)' }}
      >
        {invoices.map((invoice, index) => (
          <SnapScrollerContent key={invoice.id} index={index} data-invoice-id={invoice.id} style={slideStyle}>
            <Text size={3} fontWeight={500}>{invoice.id}</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>{invoice.customer}</Text>
            <Text size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{invoice.total}</Text>
          </SnapScrollerContent>
        ))}
      </SnapScroller>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => api.current?.prev()}>
          Previous
        </Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => api.current?.next()}>
          Next
        </Button>
      </div>
    </div>
  );
}
