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

export default function MinimalComposition() {
  return (
    <CheckboxCard>
      <CheckboxCardContent>
        <CheckboxCardTitle>Daily backups</CheckboxCardTitle>
        <CheckboxCardDescription>Snapshots are kept for 30 days.</CheckboxCardDescription>
      </CheckboxCardContent>
      <CheckboxCardControl>
        <CheckboxCardControlInput name='backups' />
        <CheckboxIndicator>
          <CheckboxCardControlCheckedIcon />
          <CheckboxCardControlIndeterminateIcon />
        </CheckboxIndicator>
      </CheckboxCardControl>
    </CheckboxCard>
  );
}
