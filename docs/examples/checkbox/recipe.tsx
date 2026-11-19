import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  type CheckboxInputProps,
} from '@vega-ui/react';
import { CheckIcon, MinusIcon } from '@vega-ui/icons';

export function MyCheckbox({ children, ...props }: CheckboxInputProps) {
  return (
    <Checkbox>
      <CheckboxInput {...props} />
      <CheckboxIndicator>
        <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
        <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
      </CheckboxIndicator>
      {children}
    </Checkbox>
  );
}

export default function Recipe() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
      <MyCheckbox name='remember' defaultChecked>Remember me on this device</MyCheckbox>
      <MyCheckbox name='files' indeterminate>Some files are selected</MyCheckbox>
    </div>
  );
}
