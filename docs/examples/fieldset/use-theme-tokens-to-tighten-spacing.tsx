import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetLegend,
} from '@vega-ui/react';

const COLUMNS = ['Status', 'Owner', 'Due date', 'Priority', 'Last updated'];

export default function UseThemeTokensToTightenSpacing() {
  return (
    <Fieldset appearance='outlined' style={{ gap: 'var(--spacing-3)', padding: 'var(--spacing-8)', width: '100%', maxWidth: 260 }}>
      <FieldsetLegend size={3}>Visible columns</FieldsetLegend>
      {COLUMNS.map((column) => (
        <Checkbox key={column} size='sm' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <CheckboxInput name='columns' value={column} defaultChecked />
          <CheckboxIndicator>
            <CheckboxCheckedIcon />
          </CheckboxIndicator>
          {column}
        </Checkbox>
      ))}
    </Fieldset>
  );
}
