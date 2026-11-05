import { Heading, Icon, Link } from '@vega-ui/react';
import { ArrowRightIcon } from '@vega-ui/icons';
import './examples.css';

const invoices = [
  { id: 'INV-2041', amount: '$1,240.00' },
  { id: 'INV-2040', amount: '$860.50' },
  { id: 'INV-2039', amount: '$2,115.00' },
];

export default function StandaloneNavigationLink() {
  return (
    <section aria-labelledby='recent-invoices' style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%' }}>
      <Heading id='recent-invoices' as='h3' size={4} fontWeight={600}>Recent invoices</Heading>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {invoices.map((invoice) => (
          <li
            key={invoice.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 'var(--spacing-8)',
              paddingBlock: 'var(--spacing-4)',
              borderBlockEnd: '1px solid var(--separator-opaque)',
            }}
          >
            <span>{invoice.id}</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{invoice.amount}</span>
          </li>
        ))}
      </ul>
      <Link href='/billing/invoices' style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-2)', alignSelf: 'flex-start' }}>
        View all 48 invoices
        <Icon size='xs' className='directionalIcon'><ArrowRightIcon /></Icon>
      </Link>
    </section>
  );
}
