import { Spinner, Text } from '@vega-ui/react';
import { useId } from 'react';

export default function SecondaryLoadingIndicator() {
  const labelId = useId();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Spinner size={5} variant='secondary' aria-labelledby={labelId} />
      <Text id={labelId} size={5}>Generating preview</Text>
    </div>
  );
}
