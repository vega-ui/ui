import {
  Label,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';
import { useId } from 'react';

const slots = Array.from({ length: 24 * 12 }, (_, index) => {
  const hours = String(Math.floor(index / 12)).padStart(2, '0');
  const minutes = String((index % 12) * 5).padStart(2, '0');
  return `${hours}:${minutes}`;
});

export default function LongScrollableOptionList() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 200 }}>
      <Label htmlFor={id}>Send the reminder at</Label>
      <Select defaultValue='09:00'>
        <SelectHiddenSelect name='reminderTime' />
        <SelectCombobox id={id}>
          <SelectValue />
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          {slots.map((slot) => (
            <SelectOption key={slot} value={slot}>
              {slot}
            </SelectOption>
          ))}
        </SelectListbox>
      </Select>
    </div>
  );
}
