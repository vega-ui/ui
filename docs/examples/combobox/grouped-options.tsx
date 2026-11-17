import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, Label, ListboxGroup, ListboxOption, Text, TextField } from '@vega-ui/react';
import { useId, useState } from 'react';

const regions = [
  {
    name: 'Americas',
    zones: [
      { id: 'America/Los_Angeles', city: 'Los Angeles', offset: 'UTC−8' },
      { id: 'America/New_York', city: 'New York', offset: 'UTC−5' },
      { id: 'America/Sao_Paulo', city: 'São Paulo', offset: 'UTC−3' },
    ],
  },
  {
    name: 'Europe',
    zones: [
      { id: 'Europe/London', city: 'London', offset: 'UTC+0' },
      { id: 'Europe/Berlin', city: 'Berlin', offset: 'UTC+1' },
      { id: 'Europe/Helsinki', city: 'Helsinki', offset: 'UTC+2' },
    ],
  },
  {
    name: 'Asia',
    zones: [
      { id: 'Asia/Dubai', city: 'Dubai', offset: 'UTC+4' },
      { id: 'Asia/Singapore', city: 'Singapore', offset: 'UTC+8' },
      { id: 'Asia/Tokyo', city: 'Tokyo', offset: 'UTC+9' },
    ],
  },
];

export default function GroupedOptions() {
  const id = useId();
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLowerCase();
  const matches = regions
    .map((region) => ({ ...region, zones: region.zones.filter((zone) => zone.city.toLowerCase().includes(normalized)) }))
    .filter((region) => region.zones.length > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 300 }}>
      <Label htmlFor={id}>Time zone</Label>
      <Combobox>
        <TextField>
          <ComboboxInput id={id} placeholder='Search by city' value={query} onChange={(event) => setQuery(event.target.value)} />
          <ComboboxTrigger aria-label='Show time zones'>
            <ComboboxIcon />
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Time zones'>
          {matches.map((region) => (
            <ListboxGroup key={region.name} aria-labelledby={`${id}-${region.name}`}>
              <Text
                id={`${id}-${region.name}`}
                size={2}
                fontWeight={600}
                style={{ paddingInline: 'var(--spacing-10)', paddingBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}
              >
                {region.name}
              </Text>
              {region.zones.map((zone) => (
                <ListboxOption key={zone.id} value={zone.id} label={zone.city} style={{ gap: 'var(--spacing-8)' }}>
                  {zone.city}
                  <span style={{ marginInlineStart: 'auto', opacity: 0.7 }}>{zone.offset}</span>
                </ListboxOption>
              ))}
            </ListboxGroup>
          ))}
        </ComboboxListbox>
      </Combobox>
    </div>
  );
}
