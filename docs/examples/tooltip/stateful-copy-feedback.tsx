import { useState } from 'react';
import {
  Icon,
  IconButton,
  Text,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';
import { CheckIcon, CopyIcon } from '@vega-ui/icons';

const inviteLink = 'https://northwind.dev/join/7KQ2-M9XA';

export default function StatefulCopyFeedback() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const changeOpen = (next: boolean) => {
    setOpen(next);
    if (!next) setCopied(false);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setOpen(true);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-4)',
        boxSizing: 'border-box',
        width: '100%',
        paddingBlock: 'var(--spacing-2)',
        paddingInlineStart: 'var(--spacing-8)',
        paddingInlineEnd: 'var(--spacing-2)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <Text size={3} style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>{inviteLink}</Text>
      <Tooltip delayOpen={0} open={open} onChangeOpen={changeOpen}>
        <TooltipTrigger asChild>
          <IconButton aria-label='Copy invite link' variant='secondary' appearance='ghost' style={{ flexShrink: 0 }} onClick={copy}>
            <Icon>{copied ? <CheckIcon /> : <CopyIcon />}</Icon>
          </IconButton>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipArrow />
          <Text size={2}>{copied ? 'Copied' : 'Copy invite link'}</Text>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
