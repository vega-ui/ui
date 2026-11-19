import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, HelperText, Label, ListboxOption, Spinner, TextField } from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { useEffect, useId, useState } from 'react';

interface City {
  id: string;
  name: string;
  country: string;
}

interface SearchResult {
  query: string;
  cities: City[];
}

const CITIES: City[] = [
  { id: 'ber', name: 'Berlin', country: 'Germany' },
  { id: 'bern', name: 'Bern', country: 'Switzerland' },
  { id: 'bil', name: 'Bilbao', country: 'Spain' },
  { id: 'bol', name: 'Bologna', country: 'Italy' },
  { id: 'bor', name: 'Bordeaux', country: 'France' },
  { id: 'bra', name: 'Bratislava', country: 'Slovakia' },
  { id: 'bru', name: 'Brussels', country: 'Belgium' },
  { id: 'bud', name: 'Budapest', country: 'Hungary' },
  { id: 'gen', name: 'Geneva', country: 'Switzerland' },
  { id: 'gla', name: 'Glasgow', country: 'United Kingdom' },
  { id: 'gra', name: 'Granada', country: 'Spain' },
  { id: 'ham', name: 'Hamburg', country: 'Germany' },
  { id: 'hel', name: 'Helsinki', country: 'Finland' },
  { id: 'kra', name: 'Kraków', country: 'Poland' },
  { id: 'lyo', name: 'Lyon', country: 'France' },
  { id: 'mal', name: 'Málaga', country: 'Spain' },
  { id: 'mar', name: 'Marseille', country: 'France' },
  { id: 'mil', name: 'Milan', country: 'Italy' },
  { id: 'por', name: 'Porto', country: 'Portugal' },
  { id: 'val', name: 'Valencia', country: 'Spain' },
];

const searchCities = (text: string) => new Promise<City[]>((resolve) => {
  setTimeout(() => resolve(CITIES.filter((city) => city.name.toLowerCase().startsWith(text)).slice(0, 6)), 700);
});

const labelOf = (city: City) => `${city.name}, ${city.country}`;

export default function AsyncSuggestions() {
  const id = useId();
  const statusId = `${id}-status`;
  const [query, setQuery] = useState('');
  const [cityId, setCityId] = useState<string | null>(null);
  const [result, setResult] = useState<SearchResult | null>(null);
  const normalized = query.trim().toLowerCase();
  const searching = cityId === null && normalized.length >= 2;

  useEffect(() => {
    if (!searching) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      searchCities(normalized).then((cities) => {
        if (!cancelled) setResult({ query: normalized, cities });
      });
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [normalized, searching]);

  const fresh = result !== null && result.query === normalized;
  const loading = searching && !fresh;
  const suggestions = searching && result !== null && fresh ? result.cities : [];
  const picked = CITIES.find((city) => city.id === cityId);

  let message = 'Type at least 2 letters, for example “br”.';
  if (loading) message = 'Searching…';
  if (searching && fresh) message = suggestions.length === 0 ? `No cities start with “${query.trim()}”.` : `${suggestions.length} cities found.`;
  if (picked) message = `Meeting point: ${labelOf(picked)}.`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Meeting city</Label>
      <Combobox value={cityId} onChangeValue={(next) => setCityId(next)}>
        <TextField>
          <ComboboxInput
            id={id}
            placeholder='Search cities'
            spellCheck={false}
            aria-describedby={statusId}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {loading && <Spinner size={3} aria-label='Searching cities' />}
          <ComboboxTrigger square aria-label='Show cities'>
            <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Cities'>
          {suggestions.map((city) => (
            <ListboxOption key={city.id} value={city.id} label={labelOf(city)} style={{ gap: 'var(--spacing-8)' }}>
              {city.name}
              <span style={{ marginInlineStart: 'auto', opacity: 0.7 }}>{city.country}</span>
            </ListboxOption>
          ))}
        </ComboboxListbox>
      </Combobox>
      <HelperText id={statusId} aria-live='polite'>{message}</HelperText>
    </div>
  );
}
