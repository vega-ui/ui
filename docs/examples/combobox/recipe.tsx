import {
  Combobox,
  ComboboxIcon,
  ComboboxInput,
  ComboboxListbox,
  ComboboxTrigger,
  Label,
  ListboxOption,
  TextField,
  type ComboboxProps,
} from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

interface MyComboboxProps<Value extends string | number = string> extends ComboboxProps<Value> {
  name?: string
  placeholder?: string
  text?: string
  onChangeText?(text: string): void
  triggerLabel: string
  listLabel: string
}

export function MyCombobox<Value extends string | number = string>({
  id,
  name,
  placeholder,
  text,
  onChangeText,
  triggerLabel,
  listLabel,
  children,
  ...props
}: MyComboboxProps<Value>) {
  return (
    <Combobox {...props}>
      <TextField>
        <ComboboxInput id={id} name={name} placeholder={placeholder} value={text} onChange={(event) => onChangeText?.(event.target.value)} />
        <ComboboxTrigger square aria-label={triggerLabel}>
          <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
        </ComboboxTrigger>
      </TextField>
      <ComboboxListbox aria-label={listLabel}>{children}</ComboboxListbox>
    </Combobox>
  );
}

const cities = ['Amsterdam', 'Athens', 'Berlin', 'Copenhagen', 'Dublin', 'Lisbon', 'London', 'Madrid', 'Oslo', 'Prague', 'Rome', 'Vienna'];

export default function Recipe() {
  const id = useId();
  const [query, setQuery] = useState('');
  const matches = cities.filter((city) => city.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Destination</Label>
      <MyCombobox
        id={id}
        name='destination'
        placeholder='Start typing a city'
        text={query}
        onChangeText={setQuery}
        triggerLabel='Show cities'
        listLabel='Cities'
      >
        {matches.map((city) => <ListboxOption key={city} value={city}>{city}</ListboxOption>)}
      </MyCombobox>
    </div>
  );
}
