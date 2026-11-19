import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';
import { CheckIcon, MinusIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <Checkbox>
      <CheckboxInput name='remember' />
      <CheckboxIndicator>
        <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
        <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
      </CheckboxIndicator>
      Remember me on this device
    </Checkbox>
  );
}
