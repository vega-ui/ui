import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetLegend,
} from '@vega-ui/react';
import { CheckIcon } from '@vega-ui/icons';

const COLUMNS = ['Status', 'Owner', 'Due date', 'Priority', 'Last updated'];

export default function UseThemeTokensToTightenSpacing() {
  return (
    <Fieldset appearance='outlined' style={{ gap: 'var(--spacing-3)', padding: 'var(--spacing-8)', width: '100%', maxWidth: 260 }}>
      <FieldsetLegend>Visible columns</FieldsetLegend>
      {COLUMNS.map((column) => (
        <Checkbox key={column} size='sm'>
          <CheckboxInput name='columns' value={column} defaultChecked />
          <CheckboxIndicator>
            <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
          </CheckboxIndicator>
          {column}
        </Checkbox>
      ))}
    </Fieldset>
  );
}
