import {
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
} from '@vega-ui/react';
import { CheckIcon, MinusIcon } from '@vega-ui/icons';

export default function BlockedUpgradeOption() {
  return (
    <div role='group' aria-label='Reports' style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)', width: '100%' }}>
      <CheckboxCard>
        <CheckboxCardContent>
          <CheckboxCardTitle>Weekly summary</CheckboxCardTitle>
          <CheckboxCardDescription>Key metrics every Monday at 9:00.</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput name='reports' value='weekly' defaultChecked />
          <CheckboxIndicator>
            <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
            <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
      <CheckboxCard>
        <CheckboxCardContent>
          <CheckboxCardTitle>Premium reports</CheckboxCardTitle>
          <CheckboxCardDescription id='premium-reports-note'>Available on the Enterprise plan. Contact sales to upgrade.</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput name='reports' value='premium' disabled aria-describedby='premium-reports-note' />
          <CheckboxIndicator>
            <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
            <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
    </div>
  );
}
