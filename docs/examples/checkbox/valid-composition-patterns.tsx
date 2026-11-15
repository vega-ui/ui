import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
      <Checkbox>
        <CheckboxInput name='archived' />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Show archived projects
      </Checkbox>
      <Checkbox>
        <CheckboxInput aria-label='Select Q3 marketing report' />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
        </CheckboxIndicator>
      </Checkbox>
    </div>
  );
}
