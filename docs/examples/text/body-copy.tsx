import { Heading, Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

export default function BodyCopy() {
  return (
    <article style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: '60ch' }}>
      <header style={{ display: 'grid', gap: 'var(--spacing-2)', marginBlockEnd: 'var(--spacing-2)' }}>
        <Heading as='h3' size={6}>Scheduled maintenance on March 18</Heading>
        <Text size={2} style={{ '--t-color': 'var(--label-secondary)' } as CSSProperties}>
          Posted by the Platform team
        </Text>
      </header>
      <Text asChild size={3}>
        <p>
          We are upgrading the primary database cluster. The dashboard stays available, but exports and
          webhooks are paused for <Text fontWeight={500}>up to 30 minutes</Text> starting at 02:00 UTC.
        </p>
      </Text>
      <Text asChild size={3}>
        <p>Queued webhooks are delivered automatically once the upgrade finishes. No action is needed.</p>
      </Text>
    </article>
  );
}
