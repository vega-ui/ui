import { Separator, Text } from '@vega-ui/react';

export default function VerticalToolbarDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Edited 2 hours ago</Text>
      <Separator orientation='vertical' style={{ height: 'var(--spacing-6)' }} />
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>3 comments</Text>
      <Separator orientation='vertical' style={{ height: 'var(--spacing-6)' }} />
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Shared with team</Text>
    </div>
  );
}
