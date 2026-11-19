import { Avatar, AvatarFallback, Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, Label, ListboxOption, TextField } from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const people = [
  { id: 'amara', initials: 'AO', name: 'Amara Okafor', email: 'amara.okafor@northwind.example' },
  { id: 'boris', initials: 'BP', name: 'Boris Petrov', email: 'boris@northwind.example' },
  { id: 'chloe', initials: 'CL', name: 'Chloé Lefèvre-Durand', email: 'chloe.lefevre-durand.finance@northwind.example' },
  { id: 'dmitri', initials: 'DV', name: 'Dmitri Volkov', email: 'dmitri.volkov@northwind.example' },
  { id: 'elif', initials: 'EY', name: 'Elif Yılmaz', email: 'elif.yilmaz@northwind.example' },
];

export default function RichOptionContent() {
  const id = useId();
  const [query, setQuery] = useState('');
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const owner = people.find((person) => person.id === ownerId);
  const normalized = query.trim().toLowerCase();
  const matches = people.filter((person) => person.name.toLowerCase().includes(normalized) || person.email.includes(normalized));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Account owner</Label>
      <Combobox value={ownerId} onChangeValue={(next) => setOwnerId(next)}>
        <TextField>
          {owner && (
            <Avatar size='sm' aria-hidden='true' style={{ flexShrink: 0, marginInlineStart: 'var(--spacing-6)' }}>
              <AvatarFallback>{owner.initials}</AvatarFallback>
            </Avatar>
          )}
          <ComboboxInput id={id} placeholder='Name or email' value={query} onChange={(event) => setQuery(event.target.value)} />
          <ComboboxTrigger square aria-label='Show people'>
            <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='People' style={{ maxWidth: 320 }}>
          {matches.map((person) => (
            <ListboxOption
              key={person.id}
              value={person.id}
              label={person.name}
              style={{ height: 'auto', paddingBlock: 'var(--spacing-5)', gap: 'var(--spacing-6)' }}
            >
              <Avatar size='md' aria-hidden='true'>
                <AvatarFallback>{person.initials}</AvatarFallback>
              </Avatar>
              <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                <span>{person.name}</span>
                <span style={{ fontSize: 'var(--font-size-2)', opacity: 0.7, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {person.email}
                </span>
              </span>
            </ListboxOption>
          ))}
        </ComboboxListbox>
      </Combobox>
    </div>
  );
}
