# Link Styling

## Overview

`Link` styling is concentrated in one text-level surface with color, underline, underline offset, and focus behavior.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--focus-color` | `Link` | Focus outline color. |
| `--transition-state-delay` | `Link` | Hover and focus transition timing. |

## Part-Level Variables

- `Link`: owns color, underline, underline offset, hover, and focus styling.

## State And Variant Interaction

- Hover changes color and underline offset.
- Focus-visible adds an outline.
- `asChild` preserves the same styling while delegating rendering.

## Examples

`Link` sets its color directly rather than through a variable, so an inline `color` replaces it in every state, hover included. Here footer links are muted while the underline offset still animates on hover.

<!-- example: link/css-overrides.tsx -->
```tsx
import type { CSSProperties } from 'react';
import { Link } from '@vega-ui/react';

const muted: CSSProperties = {
  color: 'var(--label-secondary)',
  textDecorationColor: 'var(--separator-opaque)',
};

export default function CssOverrides() {
  return (
    <footer style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4) var(--spacing-10)', fontSize: 'var(--font-size-2)' }}>
      <span style={{ color: 'var(--label-secondary)' }}>© 2025 Acme Inc.</span>
      <Link href='/legal/terms' style={muted}>Terms</Link>
      <Link href='/legal/privacy' style={muted}>Privacy</Link>
      <Link href='/status' style={muted}>Status</Link>
    </footer>
  );
}
```
<!-- /example -->

## Do Not Override

- Do not remove focus visibility without a replacement.
- Do not suppress underline or hover feedback until the element stops reading like a link.
- Do not use link styling as a substitute for button semantics.
