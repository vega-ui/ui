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
