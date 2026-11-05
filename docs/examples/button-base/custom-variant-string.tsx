import type { CSSProperties } from 'react';
import { ButtonBase } from '@vega-ui/react';
import { useState } from 'react';

const danger = {
  '--button-color': 'var(--color-white)',
  '--button-color-hover': 'var(--color-white)',
  '--button-color-active': 'var(--color-white)',
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
  padding: 'var(--spacing-3) var(--spacing-8)',
  borderRadius: 'var(--radius-3)',
  fontSize: 'var(--font-size-2)',
  flexShrink: 0,
} as CSSProperties;

export default function CustomVariantString() {
  const [revoked, setRevoked] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <ButtonBase type='button' variant='danger' style={danger} onClick={() => setRevoked(true)}>
        Revoke all sessions
      </ButtonBase>
      <span style={{ minWidth: 0, color: 'var(--label-secondary)', fontSize: 'var(--font-size-2)' }}>
        {revoked ? 'All devices were signed out' : '3 active devices'}
      </span>
    </div>
  );
}
