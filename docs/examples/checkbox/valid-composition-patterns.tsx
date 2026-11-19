import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';
import { CheckIcon, MinusIcon } from '@vega-ui/icons';

export default function ValidCompositionPatterns() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
      <Checkbox>
        <CheckboxInput name='archived' />
        <CheckboxIndicator>
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
          <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
        </CheckboxIndicator>
        Show archived projects
      </Checkbox>
      <Checkbox>
        <CheckboxInput aria-label='Select Q3 marketing report' />
        <CheckboxIndicator>
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
        </CheckboxIndicator>
      </Checkbox>
    </div>
  );
}
