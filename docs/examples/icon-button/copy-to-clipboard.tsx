import { Icon, IconButton, VisuallyHidden } from '@vega-ui/react';
import { CheckIcon, CopyIcon } from '@vega-ui/icons';
import { useEffect, useState } from 'react';

const inviteLink = 'https://app.example.com/invite/7Fq2-K9xD';

export default function CopyToClipboard() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
  };

  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)', width: '100%' }}>
      <code
        style={{
          flex: 1,
          minWidth: 0,
          alignSelf: 'center',
          padding: 'var(--spacing-4) var(--spacing-6)',
          borderRadius: 'var(--radius-3)',
          background: 'var(--fills-tertiary)',
          fontSize: 'var(--font-size-2)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {inviteLink}
      </code>
      <IconButton type='button' size='sm' variant='secondary' appearance='ghost' aria-label='Copy invite link' onClick={copy}>
        <Icon>{copied ? <CheckIcon /> : <CopyIcon />}</Icon>
      </IconButton>
      <VisuallyHidden asChild>
        <span role='status'>{copied ? 'Copied' : ''}</span>
      </VisuallyHidden>
    </div>
  );
}
