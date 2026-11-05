import { Code, Icon, IconButton, Text } from '@vega-ui/react';
import { Check, Copy } from '@vega-ui/icons';
import { useEffect, useState } from 'react';

const command = 'npx @vega-ui/cli init --template dashboard';

type CopyStatus = 'idle' | 'copied' | 'failed';

export default function CopyCommand() {
  const [status, setStatus] = useState<CopyStatus>('idle');

  useEffect(() => {
    if (status === 'idle') return;

    const timer = window.setTimeout(() => setStatus('idle'), 2000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Code style={{ flex: 1, minWidth: 0, overflowX: 'auto', whiteSpace: 'nowrap', paddingBlock: 'var(--spacing-3)' }}>
          {command}
        </Code>
        <IconButton aria-label='Copy command' variant='secondary' appearance='ghost' onClick={copy}>
          <Icon>{status === 'copied' ? <Check /> : <Copy />}</Icon>
        </IconButton>
      </div>
      <Text size={2} role='status' style={{ minHeight: 'var(--line-height-2)', color: 'var(--label-secondary)' }}>
        {status === 'copied' && 'Copied to clipboard'}
        {status === 'failed' && 'Copy failed. Select the command and copy it manually.'}
      </Text>
    </div>
  );
}
