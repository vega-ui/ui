import { Button, Code, Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

export default function UnavailableCommandHint() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', justifyItems: 'start', width: '100%' }}>
      <Button disabled aria-describedby='deploy-blocked-reason'>Deploy to production</Button>
      <Text
        id='deploy-blocked-reason'
        size={2}
        style={{ '--t-color': 'var(--label-secondary)' } as CSSProperties}
      >
        Deploys are blocked until the <Code size={2}>main</Code> branch passes <Code size={2}>pnpm test</Code>.
      </Text>
    </div>
  );
}
