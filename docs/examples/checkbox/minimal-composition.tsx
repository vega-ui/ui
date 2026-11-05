import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <CheckboxInput name='remember' />
      <CheckboxIndicator>
        <CheckboxCheckedIcon />
        <CheckboxIndeterminateIcon />
      </CheckboxIndicator>
      Remember me on this device
    </Checkbox>
  );
}
