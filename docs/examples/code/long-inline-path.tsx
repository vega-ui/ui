import { Code, Text } from '@vega-ui/react';

export default function LongInlinePath() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <Text asChild size={2}>
        <p>
          Edit <Code size={2} style={{ overflowWrap: 'anywhere' }}>packages/ui/src/DataGrid/components/DataGridColumnHeader/DataGridColumnHeader.tsx</Code>{' '}
          to change the sort icon.
        </p>
      </Text>
      <Text asChild size={2}>
        <p>
          Deployed commit <Code size={2} style={{ overflowWrap: 'anywhere' }}>9f3c2a7e4b1d08c6f5a2e9d7b3c1f0a8e6d4b2c9</Code>
        </p>
      </Text>
    </div>
  );
}
