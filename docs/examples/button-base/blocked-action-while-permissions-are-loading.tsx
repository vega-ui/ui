import { ButtonBase, Spinner } from '@vega-ui/react';
import { useEffect, useState } from 'react';

export default function BlockedActionWhilePermissionsAreLoading() {
  const [canTransfer, setCanTransfer] = useState<boolean | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setCanTransfer(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const loading = canTransfer === null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <ButtonBase
        type='button'
        variant='secondary'
        appearance='ghost'
        disabled={!canTransfer}
        style={{
          flexShrink: 0,
          padding: 'var(--spacing-3) var(--spacing-8)',
          borderRadius: 'var(--radius-3)',
          fontSize: 'var(--font-size-2)',
        }}
      >
        Transfer ownership
      </ButtonBase>
      <span role='status' style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-3)',
          minWidth: 0,
          color: 'var(--label-secondary)',
          fontSize: 'var(--font-size-2)',
        }}>
        {loading && <Spinner size={2} aria-hidden='true' />}
        {loading ? 'Checking permissions…' : 'You own this workspace'}
      </span>
    </div>
  );
}
