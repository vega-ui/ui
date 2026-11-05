import { Card, Heading, Text } from '@vega-ui/react';
import './examples.css';

const destinations = [
  { href: '#billing', title: 'Billing', description: 'Plan, invoices and payment methods.' },
  { href: '#members', title: 'Members', description: '18 members, 3 pending invitations.' },
  { href: '#security', title: 'Security', description: 'Two-factor authentication, sessions and SSO.' },
];

export default function LinkCards() {
  return (
    <nav aria-label='Workspace settings' style={{ width: '100%' }}>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: 'var(--spacing-6)' }}>
        {destinations.map((destination) => (
          <li key={destination.href} style={{ display: 'grid' }}>
            <Card asChild size='sm' className='linkCard'>
              <a href={destination.href} style={{ color: 'inherit', textDecoration: 'none', gap: 'var(--spacing-2)' }}>
                <Heading as='h3' size={3} fontWeight={600}>{destination.title}</Heading>
                <Text size={2} style={{ color: 'var(--label-secondary)' }}>{destination.description}</Text>
              </a>
            </Card>
          </li>
        ))}
      </ul>
    </nav>
  );
}
