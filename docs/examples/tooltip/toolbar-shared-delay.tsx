import {
  Icon,
  IconButton,
  Text,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';
import { BoldIcon, ItalicIcon, UnderlineIcon } from '@vega-ui/icons';

const tools = [
  { label: 'Bold', shortcut: '⌘B', icon: <BoldIcon /> },
  { label: 'Italic', shortcut: '⌘I', icon: <ItalicIcon /> },
  { label: 'Underline', shortcut: '⌘U', icon: <UnderlineIcon /> },
];

export default function ToolbarSharedDelay() {
  return (
    <div
      role='toolbar'
      aria-label='Formatting'
      style={{
        display: 'flex',
        gap: 'var(--spacing-1)',
        padding: 'var(--spacing-2)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {tools.map(({ label, shortcut, icon }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <IconButton aria-label={label} appearance='transparent' variant='secondary'>
              <Icon>{icon}</Icon>
            </IconButton>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            <Text size={2}>{`${label} ${shortcut}`}</Text>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
