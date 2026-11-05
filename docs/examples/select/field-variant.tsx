import {
  Label,
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';
import { useId } from 'react';

const teams = [
  { value: 'billing', label: 'Billing' },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'platform', label: 'Platform reliability' },
  { value: 'security', label: 'Security & compliance' },
  { value: 'success', label: 'Customer success' },
];

export default function FieldVariant() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Route the ticket to</Label>
      <Select>
        <SelectCombobox id={id}>
          <SelectValue placeholder='Choose a team' />
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          {teams.map((team) => (
            <SelectOption key={team.value} value={team.value}>
              {team.label}
            </SelectOption>
          ))}
        </SelectListbox>
      </Select>
    </div>
  );
}
