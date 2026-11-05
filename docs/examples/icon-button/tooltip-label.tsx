import { Icon, IconButton, Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '@vega-ui/react';
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from '@vega-ui/icons';
import { type ReactNode, useState } from 'react';

const alignments: { value: string, label: string, shortcut: string, icon: ReactNode }[] = [
  { value: 'left', label: 'Align left', shortcut: 'Ctrl+Shift+L', icon: <AlignLeftIcon /> },
  { value: 'center', label: 'Align center', shortcut: 'Ctrl+Shift+E', icon: <AlignCenterIcon /> },
  { value: 'right', label: 'Align right', shortcut: 'Ctrl+Shift+R', icon: <AlignRightIcon /> },
];

export default function TooltipLabel() {
  const [alignment, setAlignment] = useState('left');

  return (
    <div
      role='toolbar'
      aria-label='Paragraph alignment'
      style={{
        display: 'flex',
        gap: 'var(--spacing-2)',
        padding: 'var(--spacing-2)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-4)',
        background: 'var(--surface-primary)',
      }}
    >
      {alignments.map((item) => (
        <Tooltip key={item.value}>
          <TooltipTrigger asChild>
            <IconButton
              type='button'
              size='sm'
              variant='secondary'
              appearance={alignment === item.value ? 'ghost' : 'transparent'}
              aria-label={item.label}
              aria-pressed={alignment === item.value}
              onClick={() => setAlignment(item.value)}
            >
              <Icon>{item.icon}</Icon>
            </IconButton>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            {item.label} · {item.shortcut}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
