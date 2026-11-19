import type { ReactNode } from 'react';
import {
  Button,
  Icon,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  type TooltipProps,
} from '@vega-ui/react';
import { ArchiveIcon, ReplyIcon, Trash2Icon } from '@vega-ui/icons';

interface MyTooltipProps extends TooltipProps {
  content: ReactNode
}

export function MyTooltip({ content, children, ...props }: MyTooltipProps) {
  return (
    <Tooltip {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <Text size={2}>{content}</Text>
      </TooltipContent>
    </Tooltip>
  );
}

export default function Recipe() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
      <MyTooltip content='Reply to Maria Chen'>
        <Button square aria-label='Reply' variant='secondary' appearance='ghost'><Icon><ReplyIcon /></Icon></Button>
      </MyTooltip>
      <MyTooltip content='Move to Archive · E'>
        <Button square aria-label='Archive' variant='secondary' appearance='ghost'><Icon><ArchiveIcon /></Icon></Button>
      </MyTooltip>
      <MyTooltip content='Move to Trash · #'>
        <Button square aria-label='Delete' variant='secondary' appearance='ghost'><Icon><Trash2Icon /></Icon></Button>
      </MyTooltip>
    </div>
  );
}
