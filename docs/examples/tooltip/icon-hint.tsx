import {
  Icon,
  IconButton,
  Text,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';
import { ArchiveIcon, ReplyIcon, Trash2Icon } from '@vega-ui/icons';

const actions = [
  { label: 'Reply', hint: 'Reply to Maria Chen', icon: <ReplyIcon /> },
  { label: 'Archive', hint: 'Move to Archive · E', icon: <ArchiveIcon /> },
  { label: 'Delete', hint: 'Move to Trash · #', icon: <Trash2Icon /> },
];

export default function IconHint() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
      {actions.map((action) => (
        <Tooltip key={action.label}>
          <TooltipTrigger asChild>
            <IconButton aria-label={action.label} variant='secondary' appearance='ghost'>
              <Icon>{action.icon}</Icon>
            </IconButton>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            <Text size={2}>{action.hint}</Text>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
