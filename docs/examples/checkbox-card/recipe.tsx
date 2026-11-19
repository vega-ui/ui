import {
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  type CheckboxCardControlInputProps,
} from '@vega-ui/react';
import { CheckIcon, MinusIcon } from '@vega-ui/icons';
import type { ReactNode } from 'react';

interface MyCheckboxCardProps extends CheckboxCardControlInputProps {
  description?: ReactNode
}

export function MyCheckboxCard({ description, children, ...props }: MyCheckboxCardProps) {
  return (
    <CheckboxCard>
      <CheckboxCardContent>
        <CheckboxCardTitle>{children}</CheckboxCardTitle>
        {description && <CheckboxCardDescription>{description}</CheckboxCardDescription>}
      </CheckboxCardContent>
      <CheckboxCardControl>
        <CheckboxCardControlInput {...props} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
          <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
        </CheckboxIndicator>
      </CheckboxCardControl>
    </CheckboxCard>
  );
}

export default function Recipe() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)', width: '100%' }}>
      <MyCheckboxCard name='addons' value='backups' description='Snapshots are kept for 30 days.' defaultChecked>
        Daily backups
      </MyCheckboxCard>
      <MyCheckboxCard name='addons' value='audit-log' description='A 365-day history of every change.'>
        Audit log
      </MyCheckboxCard>
    </div>
  );
}
