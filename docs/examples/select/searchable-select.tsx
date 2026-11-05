import {
  Label,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { KeyboardEvent, useId, useRef, useState } from 'react';

const countries = [
  { code: 'AR', name: 'Argentina' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BR', name: 'Brazil' },
  { code: 'CA', name: 'Canada' },
  { code: 'CL', name: 'Chile' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IN', name: 'India' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IT', name: 'Italy' },
  { code: 'JP', name: 'Japan' },
  { code: 'MX', name: 'Mexico' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NO', name: 'Norway' },
  { code: 'PT', name: 'Portugal' },
  { code: 'ES', name: 'Spain' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
];

export default function SearchableSelect() {
  const id = useId();
  const comboboxRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const matches = countries.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase()));
  const selected = countries.find((item) => item.code === country);

  const changeOpen = (next: boolean) => {
    setOpen(next);
    if (!next) setQuery('');
  };

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;

    event.preventDefault();
    const first = matches[0];
    if (!first) return;

    setCountry(first.code);
    changeOpen(false);
    comboboxRef.current?.focus();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Country of residence</Label>
      <Select
        typeahead={false}
        open={open}
        onChangeOpen={changeOpen}
        value={country}
        onChangeValue={(next) => setCountry(next ?? null)}
      >
        <SelectHiddenSelect name='country' />
        <SelectCombobox id={id} ref={comboboxRef}>
          <SelectValue placeholder='Choose a country'>{selected?.name}</SelectValue>
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox style={{ minWidth: 260 }}>
          <TextField size='sm'>
            <TextFieldInput
              aria-label='Search countries'
              placeholder='Search'
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              onKeyDown={onSearchKeyDown}
            />
          </TextField>
          {matches.map((item) => (
            <SelectOption key={item.code} value={item.code}>
              {item.name}
            </SelectOption>
          ))}
          {matches.length === 0 && (
            <Text size={2} role='status' style={{ padding: 'var(--spacing-6)', color: 'var(--label-secondary)' }}>
              No countries match “{query}”.
            </Text>
          )}
        </SelectListbox>
      </Select>
    </div>
  );
}
