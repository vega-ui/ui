import { useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Text,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';

export default function ControlledOpenState() {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'center', width: '100%' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput checked={pinned} onChange={(event) => setPinned(event.currentTarget.checked)} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Keep the hint open
      </Checkbox>
      <Tooltip open={pinned || open} onChangeOpen={setOpen}>
        <TooltipTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Save draft</Button>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipArrow />
          <Text size={2}>Drafts are saved automatically every minute</Text>
        </TooltipContent>
      </Tooltip>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Hover or focus requests: {open ? 'open' : 'closed'} · shown: {pinned || open ? 'yes' : 'no'}
      </Text>
    </div>
  );
}
