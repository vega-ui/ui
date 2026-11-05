# Slot Anatomy

## Overview

`Slot` is a single-part low-level utility. It clones its only child and merges the passed props into that element.

## Required Parts

### `Slot`

Required. Owns the merge-and-clone behavior.

## Optional Parts

There are no exported child parts.

## Composition Order

1. `Slot`
2. one valid React element child

## Valid Composition Patterns

<!-- example: slot/basic-usage.tsx -->
```tsx
import type { HTMLAttributes } from 'react';
import { Slot } from '@vega-ui/react';

interface TagProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean
}

const tagStyle = {
  display: 'inline-flex',
  padding: 'var(--spacing-1) var(--spacing-5)',
  border: 'none',
  borderRadius: 999,
  background: 'var(--fills-secondary)',
  color: 'var(--label-primary)',
  font: 'inherit',
  fontSize: 'var(--font-size-2)',
  textDecoration: 'none',
  cursor: 'pointer',
};

function Tag({ asChild, children, ...props }: TagProps) {
  if (asChild) {
    return <Slot style={tagStyle} {...props}>{children}</Slot>;
  }

  return <span style={tagStyle} {...props}>{children}</span>;
}

export default function BasicUsage() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
      <Tag>Design</Tag>
      <Tag asChild>
        <a href='/tags/accessibility'>Accessibility</a>
      </Tag>
      <Tag asChild>
        <button type='button' onClick={() => alert('Filtering by React')}>React</button>
      </Tag>
    </div>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### More than one child

`Children.only` will reject the composition.

### Non-element child

Plain text or invalid nodes cannot be cloned.
