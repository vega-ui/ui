import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, Label, ListboxOption, TextField } from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const cities = ['Amsterdam', 'Athens', 'Berlin', 'Copenhagen', 'Dublin', 'Lisbon', 'London', 'Madrid', 'Oslo', 'Prague', 'Rome', 'Vienna'];

export default function MinimalComposition() {
  const id = useId();
  const [query, setQuery] = useState('');
  const matches = cities.filter((city) => city.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>City</Label>
      <Combobox>
        <TextField>
          <ComboboxInput id={id} placeholder='Start typing a city' value={query} onChange={(event) => setQuery(event.target.value)} />
          <ComboboxTrigger square aria-label='Show cities'>
            <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Cities'>
          {matches.map((city) => <ListboxOption key={city} value={city}>{city}</ListboxOption>)}
        </ComboboxListbox>
      </Combobox>
    </div>
  );
}
