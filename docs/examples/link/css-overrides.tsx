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
