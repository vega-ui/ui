import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetLegend,
} from '@vega-ui/react';

const options = [
  { value: 'mentions', label: 'Someone mentions me in a comment', checked: true },
  { value: 'assigned', label: 'A task is assigned to me', checked: true },
  { value: 'digest', label: 'Weekly project digest', checked: false },
];

export default function LabeledCheckbox() {
  return (
    <Fieldset>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Email me when</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        {options.map((option) => (
          <Checkbox key={option.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <CheckboxInput name='notifications' value={option.value} defaultChecked={option.checked} />
            <CheckboxIndicator>
              <CheckboxCheckedIcon />
              <CheckboxIndeterminateIcon />
            </CheckboxIndicator>
            {option.label}
          </Checkbox>
        ))}
      </div>
    </Fieldset>
  );
}
