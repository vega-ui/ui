import { Button, Icon } from '@vega-ui/react';
import { DownloadIcon } from '@vega-ui/icons';
import { useState } from 'react';

export default function DisabledLinkButton() {
  const [ready, setReady] = useState(false);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Button type='button' variant='secondary' appearance='ghost' disabled={ready} onClick={() => setReady(true)}>
        Generate CSV
      </Button>
      <Button asChild>
        <a
          href={ready ? '/exports/customers-2024.csv' : undefined}
          aria-disabled={ready ? undefined : 'true'}
          download
        >
          <Icon size='sm'><DownloadIcon /></Icon>
          Download CSV
        </a>
      </Button>
    </div>
  );
}
