# Link Patterns

## Inline Reference Link

When to use:

- Navigation belongs naturally inside a sentence or help copy.

Composition notes:

- Keep the linked words descriptive.
- Do not break reading flow with vague or overly long linked phrases.

Trade-offs:

- Strong for documentation and secondary navigation.
- Weaker for primary actions.

<!-- example: link/basic-usage.tsx -->
```tsx
import { Link, Text } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <Text size={3} style={{ width: '100%' }}>
      Exports include every invoice from the selected period. Read how we calculate{' '}
      <Link href='/docs/billing/taxes'>VAT for EU customers</Link>{' '}
      before sharing the file with your accountant.
    </Text>
  );
}
```
<!-- /example -->

## Standalone Secondary Navigation

When to use:

- A page or panel needs one lightweight secondary navigation target.

Composition notes:

- Keep the link scannable and destination-oriented.
- Use surrounding copy when the destination context is not obvious.

Trade-offs:

- Light visual weight.
- Easier to overlook than a button.

<!-- example: link/standalone-navigation-link.tsx -->
```tsx
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
```
<!-- /example -->

## Router-Composed Link

When to use:

- The app uses a routing library and still wants VegaUI link styling.

Composition notes:

- Use `asChild` with a real router link component.
- Preserve navigation semantics at the rendered root.

Trade-offs:

- Keeps styling consistent across routing layers.
- Requires the child component to support the expected semantics.

<!-- example: link/router-composed-link.tsx -->
```tsx
import { type AnchorHTMLAttributes, type MouseEvent, useState } from 'react';
import { Link } from '@vega-ui/react';

interface RouterLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
  onNavigate(to: string): void
}

function RouterLink({ to, onNavigate, onClick, ...props }: RouterLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    event.preventDefault();
    onNavigate(to);
  };

  return <a href={to} onClick={handleClick} {...props} />;
}

const pages = [
  { to: '/settings/profile', label: 'Profile' },
  { to: '/settings/team', label: 'Team' },
  { to: '/settings/billing', label: 'Billing' },
];

export default function RouterComposedLink() {
  const [pathname, setPathname] = useState('/settings/profile');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%' }}>
      <nav aria-label='Settings'>
        <ul style={{ display: 'flex', gap: 'var(--spacing-10)', margin: 0, padding: 0, listStyle: 'none' }}>
          {pages.map((page) => {
            const current = pathname === page.to;

            return (
              <li key={page.to}>
                <Link asChild>
                  <RouterLink
                    to={page.to}
                    onNavigate={setPathname}
                    aria-current={current ? 'page' : undefined}
                    style={current ? { color: 'var(--label-primary)', textDecorationLine: 'none' } : undefined}
                  >
                    {page.label}
                  </RouterLink>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <p style={{ margin: 0, color: 'var(--label-secondary)' }}>Current route: {pathname}</p>
    </div>
  );
}
```
<!-- /example -->
