import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Checkbox>
      <CheckboxInput name='remember' />
      <CheckboxIndicator>
        <CheckboxCheckedIcon />
        <CheckboxIndeterminateIcon />
      </CheckboxIndicator>
      Remember me on this device
    </Checkbox>
  );
}
