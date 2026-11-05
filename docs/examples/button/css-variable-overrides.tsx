import type { CSSProperties } from 'react';
import { Button } from '@vega-ui/react';

const pill = {
  '--button-br-ratio': 0.5,
} as CSSProperties;

const compact = {
  '--button-height': '32px',
} as CSSProperties;

const success = {
  '--button-background-color': 'var(--color-green-accent-800)',
  '--button-background-color-hover': 'var(--color-green-accent-900)',
  '--button-background-color-active': 'var(--color-green-accent-1000)',
} as CSSProperties;

export default function CssVariableOverrides() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Button type='button' style={pill}>Follow</Button>
      <Button type='button' variant='secondary' appearance='ghost' style={compact}>Filter</Button>
      <Button type='button' style={success}>Approve</Button>
    </div>
  );
}
