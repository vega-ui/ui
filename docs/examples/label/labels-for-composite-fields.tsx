import {
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  TextArea,
} from '@vega-ui/react';
import { useId } from 'react';

export default function LabelsForCompositeFields() {
  const id = useId();

  return (
    <form style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-region`}>Data region</Label>
        <Select defaultValue='eu-central'>
          <SelectHiddenSelect name='region' />
          <SelectCombobox id={`${id}-region`}>
            <SelectValue placeholder='Choose a region' />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='eu-central'>Frankfurt (eu-central)</SelectOption>
            <SelectOption value='us-east'>Virginia (us-east)</SelectOption>
            <SelectOption value='ap-south'>Mumbai (ap-south)</SelectOption>
          </SelectListbox>
        </Select>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-replicas`}>Read replicas</Label>
        <NumberField min={0} max={5} defaultValue={1}>
          <NumberFieldDecrementButton aria-label='Remove a replica' />
          <NumberFieldInput id={`${id}-replicas`} name='replicas' />
          <NumberFieldIncrementButton aria-label='Add a replica' />
        </NumberField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-notes`}>Notes for the on-call team</Label>
        <TextArea id={`${id}-notes`} name='notes' rows={3} fullWidth />
      </div>
    </form>
  );
}
