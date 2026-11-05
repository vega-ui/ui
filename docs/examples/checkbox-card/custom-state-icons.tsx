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
import { Diff, Rocket } from '@vega-ui/icons';

export default function CustomStateIcons() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)', width: '100%' }}>
      <CheckboxCard>
        <CheckboxCardContent>
          <CheckboxCardTitle>Deploy after merge</CheckboxCardTitle>
          <CheckboxCardDescription>Ship to production as soon as checks pass.</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput defaultChecked />
          <CheckboxIndicator>
            <CheckboxCardControlCheckedIcon>
              <Rocket />
            </CheckboxCardControlCheckedIcon>
            <CheckboxCardControlIndeterminateIcon />
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
      <CheckboxCard>
        <CheckboxCardContent>
          <CheckboxCardTitle>Review changed files</CheckboxCardTitle>
          <CheckboxCardDescription>3 of 12 files are already reviewed.</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput indeterminate />
          <CheckboxIndicator>
            <CheckboxCardControlCheckedIcon />
            <CheckboxCardControlIndeterminateIcon>
              <Diff />
            </CheckboxCardControlIndeterminateIcon>
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
    </div>
  );
}
