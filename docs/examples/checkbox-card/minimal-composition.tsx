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
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
          <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
        </CheckboxIndicator>
      </CheckboxCardControl>
    </CheckboxCard>
  );
}
