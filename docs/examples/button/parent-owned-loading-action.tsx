import { Button, Spinner } from '@vega-ui/react';
import { useEffect, useState } from 'react';

export default function ParentOwnedLoadingAction() {
  const [saving, setSaving] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    if (!saving) return;

    const timer = setTimeout(() => {
      setSaving(false);
      setSavedCount((count) => count + 1);
    }, 1500);

    return () => clearTimeout(timer);
  }, [saving]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <Button type='button' disabled={saving} aria-busy={saving} onClick={() => setSaving(true)}>
        {saving && <Spinner size={3} aria-hidden='true' />}
        {saving ? 'Saving…' : 'Save changes'}
      </Button>
      <span role='status' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {savedCount === 0 ? 'No changes saved yet' : `Saved ${savedCount} ${savedCount === 1 ? 'time' : 'times'}`}
      </span>
    </div>
  );
}
