import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';

export default function LongLabelWrapping() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
        <CheckboxInput name='data-processing' />
        <CheckboxIndicator style={{ flexShrink: 0, marginBlockStart: 'var(--spacing-1)' }}>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        I consent to the processing of my personal data by Acme Analytics GmbH and its sub-processors in the European Economic Area for the purposes described in the Data Processing Agreement.
      </Checkbox>
      <Checkbox style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
        <CheckboxInput name='export-recipient' />
        <CheckboxIndicator style={{ flexShrink: 0, marginBlockStart: 'var(--spacing-1)' }}>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        <span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>
          Send the export to finance-reporting-quarterly-archive@northwind-traders.example.com
        </span>
      </Checkbox>
    </div>
  );
}
