import {
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
} from '@vega-ui/react';

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
            <CheckboxCardControlCheckedIcon />
            <CheckboxCardControlIndeterminateIcon />
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
            <CheckboxCardControlCheckedIcon />
            <CheckboxCardControlIndeterminateIcon />
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
    </div>
  );
}
