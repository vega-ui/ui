import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';
import { CheckIcon, MinusIcon } from '@vega-ui/icons';

export default function LongLabelWrapping() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Checkbox style={{ alignItems: 'flex-start' }}>
        <CheckboxInput name='data-processing' />
        <CheckboxIndicator style={{ marginBlockStart: 'var(--spacing-1)' }}>
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
          <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
        </CheckboxIndicator>
        I consent to the processing of my personal data by Acme Analytics GmbH and its sub-processors in the European Economic Area for the purposes described in the Data Processing Agreement.
      </Checkbox>
      <Checkbox style={{ alignItems: 'flex-start' }}>
        <CheckboxInput name='export-recipient' />
        <CheckboxIndicator style={{ marginBlockStart: 'var(--spacing-1)' }}>
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
          <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
        </CheckboxIndicator>
        <span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>
          Send the export to finance-reporting-quarterly-archive@northwind-traders.example.com
        </span>
      </Checkbox>
    </div>
  );
}
