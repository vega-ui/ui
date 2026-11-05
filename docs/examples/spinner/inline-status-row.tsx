import { Spinner, Text } from '@vega-ui/react';
import { useId } from 'react';

export default function InlineStatusRow() {
  const labelId = useId();

  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
      <Spinner size={2} aria-labelledby={labelId} />
      <Text id={labelId} size={2}>Syncing 128 contacts from Google</Text>
    </div>
  );
}
