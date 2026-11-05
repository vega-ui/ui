import { Button, Link } from '@vega-ui/react';
import { useState } from 'react';

export default function UnavailableLinkAsText() {
  const [ready, setReady] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-6)', width: '100%' }}>
      <p style={{ margin: 0 }}>
        {ready && <Link href='/reports/2024-q4.pdf'>Download the Q4 report</Link>}
        {!ready && (
          <span style={{ color: 'var(--disable-text-color)' }}>
            Q4 report is being generated and will be available in about 5 minutes
          </span>
        )}
      </p>
      <Button type='button' size='sm' variant='secondary' appearance='ghost' disabled={ready} onClick={() => setReady(true)}>
        Finish generating
      </Button>
    </div>
  );
}
