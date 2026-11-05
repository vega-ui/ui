import type { CSSProperties } from 'react';
import { Heading, Icon, Text } from '@vega-ui/react';
import { InboxIcon } from '@vega-ui/icons';

export default function CustomIconSize() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%', textAlign: 'center' }}>
      <Icon strokeWidth={1.25} style={{ '--icon-size': '64px', color: 'var(--label-tertiary)' } as CSSProperties}>
        <InboxIcon />
      </Icon>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4} fontWeight={600}>Inbox zero</Heading>
        <Text size={3} style={{ color: 'var(--label-secondary)', textWrap: 'balance' }}>New requests from your team show up here.</Text>
      </div>
    </div>
  );
}
