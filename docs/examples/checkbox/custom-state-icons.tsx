import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';
import { Diff, Rocket } from '@vega-ui/icons';

export default function CustomStateIcons() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-12)' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput defaultChecked />
        <CheckboxIndicator>
          <CheckboxCheckedIcon>
            <Rocket />
          </CheckboxCheckedIcon>
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Deploy after merge
      </Checkbox>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput indeterminate />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon>
            <Diff />
          </CheckboxIndeterminateIcon>
        </CheckboxIndicator>
        Files with changes
      </Checkbox>
    </div>
  );
}
