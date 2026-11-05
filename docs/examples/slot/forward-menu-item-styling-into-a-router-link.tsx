import type { AnchorHTMLAttributes, CSSProperties } from 'react';
import { Slot } from '@vega-ui/react';
import { useState } from 'react';

interface NavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
  active?: boolean
}

function NavItem({ asChild, active, children, ...props }: NavItemProps) {
  const style: CSSProperties = {
    display: 'block',
    padding: 'var(--spacing-3) var(--spacing-6)',
    borderRadius: 'var(--radius-2)',
    color: active ? 'var(--color-primary-500)' : 'var(--label-primary)',
    background: active ? 'var(--fills-secondary)' : 'transparent',
    textDecoration: 'none',
  };

  if (asChild) {
    return <Slot style={style} aria-current={active ? 'page' : undefined} {...props}>{children}</Slot>;
  }

  return <a style={style} aria-current={active ? 'page' : undefined} {...props}>{children}</a>;
}

const sections = ['Overview', 'Deployments', 'Logs', 'Settings'];

export default function ForwardMenuItemStylingIntoARouterLink() {
  const [current, setCurrent] = useState('Overview');

  return (
    <nav aria-label='Project' style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)', width: 220 }}>
      {sections.map((section) => (
        <NavItem key={section} asChild active={current === section}>
          <a
            href={`/project/${section.toLowerCase()}`}
            onClick={(event) => {
              event.preventDefault();
              setCurrent(section);
            }}
          >
            {section}
          </a>
        </NavItem>
      ))}
    </nav>
  );
}
