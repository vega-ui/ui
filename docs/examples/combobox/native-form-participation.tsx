import { Button, Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, Label, ListboxOption, Text, TextField } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

const countries = [
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'CZ', name: 'Czechia' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IT', name: 'Italy' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'PL', name: 'Poland' },
  { code: 'ES', name: 'Spain' },
];

export default function NativeFormParticipation() {
  const id = useId();
  const [query, setQuery] = useState('');
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState('');
  const matches = countries.filter((country) => country.name.toLowerCase().startsWith(query.trim().toLowerCase()));

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(`country=${data.get('country')}, countryCode=${data.get('countryCode') || '(none)'}`);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Ship to</Label>
      <Combobox value={countryCode} onChangeValue={(next) => setCountryCode(next)}>
        <TextField>
          <ComboboxInput
            id={id}
            name='country'
            required
            placeholder='Country'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxTrigger aria-label='Show countries'>
            <ComboboxIcon />
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Countries'>
          {matches.map((country) => <ListboxOption key={country.code} value={country.code}>{country.name}</ListboxOption>)}
        </ComboboxListbox>
      </Combobox>
      <input type='hidden' name='countryCode' value={countryCode ?? ''} />
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Continue</Button>
      {submitted && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
          Submitted: {submitted}
        </Text>
      )}
    </form>
  );
}
