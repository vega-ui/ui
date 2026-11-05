import { SnapScroller, SnapScrollerContent } from '@vega-ui/react';
import type { CSSProperties } from 'react';

const pageStyle: CSSProperties = {
  width: '100%',
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function MinimalComposition() {
  return (
    <SnapScroller tabIndex={0} aria-label='Dashboard sections' style={{ width: '100%', gap: 'var(--spacing-6)' }}>
      <SnapScrollerContent index={0} style={pageStyle}>Overview</SnapScrollerContent>
      <SnapScrollerContent index={1} style={pageStyle}>Metrics</SnapScrollerContent>
      <SnapScrollerContent index={2} style={pageStyle}>Billing</SnapScrollerContent>
    </SnapScroller>
  );
}
