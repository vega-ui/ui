# Slot Styling

## Overview

`Slot` does not own a visual contract. It merges props into one valid child element and leaves all rendering, tokens, and CSS behavior to that child and the parent component that composes `Slot`.

## Public CSS Variables

There are no `--slot-*` public CSS variables in the current implementation.

## Part-Level Variables

### Root

`Slot` has no DOM of its own unless the chosen child renders one.

### Child Element

Styling comes entirely from the slotted child and the parent component that injects props through `asChild`.

## State And Variant Interaction

- `Slot` has no visual variants of its own.
- State classes, data attributes, and inline styles are passed through to the child element.
- Visual drift usually comes from changing the child element semantics, not from any `Slot` CSS layer.

## Examples

### Preserve button styling on a link element

`Button asChild` passes its classes and data attributes to the anchor, so the link looks like a secondary button while it keeps link semantics.

<!-- example: slot/styled-link-action.tsx -->
```tsx
import { Button, Icon } from '@vega-ui/react';
import { BookOpenIcon } from '@vega-ui/icons';

export default function StyledLinkAction() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Button type='button'>Create API key</Button>
      <Button asChild variant='secondary' appearance='ghost'>
        <a href='/docs/api/authentication'>
          <Icon size='sm'><BookOpenIcon /></Icon>
          Read the API guide
        </a>
      </Button>
    </div>
  );
}
```
<!-- /example -->

### Forward navigation styling into a router link

A local `NavItem` owns the look and passes `style` and `aria-current` through `Slot` to whatever link the router renders. The child's own `onClick` still runs, because handlers are chained.

<!-- example: slot/forward-menu-item-styling-into-a-router-link.tsx -->
```tsx
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
```
<!-- /example -->

## Do Not Override

- inventing a standalone `Slot` token API
- treating `Slot` as if it were a styled wrapper
- relying on `Slot` to fix semantic or accessibility issues caused by the chosen child element
