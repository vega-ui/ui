import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const invoices = [
  { number: 'INV-2041', customer: 'Acme Logistics', amount: '$12,480.00', due: 'Nov 14, 2026' },
  { number: 'INV-2042', customer: 'Blue Harbor Cafe', amount: '$860.50', due: 'Nov 21, 2026' },
  { number: 'INV-2043', customer: 'Kestrel Robotics', amount: '$4,125.00', due: 'Dec 1, 2026' },
];

export default function ControlledOpenState() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(invoices[0]);

  const openInvoice = (invoice: typeof invoices[number]) => {
    setSelected(invoice);
    setOpen(true);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <ul
        style={{
          display: 'grid',
          margin: 0,
          padding: 'var(--spacing-2) var(--spacing-8)',
          listStyle: 'none',
          background: 'var(--surface-primary)',
          border: '1px solid var(--separator-opaque)',
          borderRadius: 'var(--radius-5)',
        }}
      >
        {invoices.map((invoice, index) => (
          <li
            key={invoice.number}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--spacing-6)',
              paddingBlock: 'var(--spacing-5)',
              borderBlockStart: index > 0 ? '1px solid var(--separator-opaque)' : undefined,
            }}
          >
            <div style={{ display: 'grid', minWidth: 0 }}>
              <Text size={3} fontWeight={500}>{invoice.customer}</Text>
              <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{invoice.number} · {invoice.amount}</Text>
            </div>
            <Button size='sm' variant='secondary' appearance='ghost' onClick={() => openInvoice(invoice)}>View</Button>
          </li>
        ))}
      </ul>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Dialog: {open ? `open, showing ${selected.number}` : 'closed'}
      </Text>

      <Dialog open={open} onChangeOpen={setOpen}>
        <DialogContent aria-labelledby={titleId}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>{selected.number}</Heading>
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
          <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--spacing-4) var(--spacing-12)', margin: 'var(--spacing-8) 0 0' }}>
            <dt><Text size={3} style={{ color: 'var(--label-secondary)' }}>Customer</Text></dt>
            <dd style={{ margin: 0 }}><Text size={3}>{selected.customer}</Text></dd>
            <dt><Text size={3} style={{ color: 'var(--label-secondary)' }}>Amount</Text></dt>
            <dd style={{ margin: 0 }}><Text size={3} style={{ fontVariantNumeric: 'tabular-nums' }}>{selected.amount}</Text></dd>
            <dt><Text size={3} style={{ color: 'var(--label-secondary)' }}>Due</Text></dt>
            <dd style={{ margin: 0 }}><Text size={3}>{selected.due}</Text></dd>
          </dl>
        </DialogContent>
      </Dialog>
    </div>
  );
}
