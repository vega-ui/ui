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

export default function DisabledActionReason() {
  const [verified, setVerified] = useState(false);
  const [invited, setInvited] = useState(0);

  const invite = () => {
    if (!verified) return;
    setInvited(invited + 1);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'center', width: '100%' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput checked={verified} onChange={(event) => setVerified(event.currentTarget.checked)} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Billing verified
      </Checkbox>
      <Tooltip>
          <TooltipTrigger asChild>
            <Button aria-disabled={!verified} onClick={invite}>Invite members</Button>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            <Text size={2}>{verified ? 'Send invites to your team' : 'Verify billing to invite more than 5 members'}</Text>
          </TooltipContent>
        </Tooltip>
      <Text size={2} role='status' style={{ minHeight: '1lh', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {invited > 0 ? `Invites sent: ${invited}` : ''}
      </Text>
    </div>
  );
}
