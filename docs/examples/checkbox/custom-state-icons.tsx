import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';
import { CheckIcon, DiffIcon, MinusIcon, RocketIcon } from '@vega-ui/icons';

export default function CustomStateIcons() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-12)' }}>
      <Checkbox>
        <CheckboxInput defaultChecked />
        <CheckboxIndicator>
          <CheckboxCheckedIcon>
            <RocketIcon />
          </CheckboxCheckedIcon>
          <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
        </CheckboxIndicator>
        Deploy after merge
      </Checkbox>
      <Checkbox>
        <CheckboxInput indeterminate />
        <CheckboxIndicator>
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
          <CheckboxIndeterminateIcon>
            <DiffIcon />
          </CheckboxIndeterminateIcon>
        </CheckboxIndicator>
        Files with changes
      </Checkbox>
    </div>
  );
}
