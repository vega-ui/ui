import { type ReactNode, useState } from 'react';
import { Button, Icon, Text, Tooltip, TooltipContent, TooltipTrigger } from '@vega-ui/react';
import { PrinterIcon, Redo2Icon, Undo2Icon } from '@vega-ui/icons';

const actions: { label: string, shortcut: string, icon: ReactNode }[] = [
  { label: 'Undo', shortcut: 'Ctrl+Z', icon: <Undo2Icon /> },
  { label: 'Redo', shortcut: 'Ctrl+Shift+Z', icon: <Redo2Icon /> },
  { label: 'Print', shortcut: 'Ctrl+P', icon: <PrinterIcon /> },
];

export default function SquareTooltipLabel() {
  const [lastAction, setLastAction] = useState('');

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-4)' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
        {actions.map((action) => (
          <Tooltip key={action.label}>
            <TooltipTrigger asChild>
              <Button
                type='button'
                size='sm'
                variant='secondary'
                appearance='transparent'
                square
                aria-label={action.label}
                onClick={() => setLastAction(action.label)}
              >
                <Icon>{action.icon}</Icon>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {action.label} · {action.shortcut}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {lastAction === '' ? 'Hover or focus a button to see its label' : `${lastAction} done`}
      </Text>
    </div>
  );
}
