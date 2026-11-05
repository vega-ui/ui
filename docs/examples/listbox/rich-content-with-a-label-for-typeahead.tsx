import { Avatar, AvatarFallback, Listbox, ListboxOption } from '@vega-ui/react';

const people = [
  { id: 'amara', initials: 'AO', name: 'Amara Okafor', email: 'amara.okafor@northwind-logistics.example' },
  { id: 'boris', initials: 'BP', name: 'Boris Petrov', email: 'boris@northwind-logistics.example' },
  { id: 'chloe', initials: 'CL', name: 'Chloé Lefèvre-Durand', email: 'chloe.lefevre-durand.finance@northwind-logistics.example' },
  { id: 'dmitri', initials: 'DV', name: 'Dmitri Volkov', email: 'dmitri.volkov@northwind-logistics.example' },
];

export default function RichContentWithALabelForTypeahead() {
  return (
    <Listbox aria-label='Assignee' style={{ width: '100%', maxWidth: 300, border: '1px solid var(--separator-opaque)' }}>
      {people.map((person) => (
        <ListboxOption
          key={person.id}
          value={person.id}
          label={person.name}
          style={{ height: 'auto', paddingBlock: 'var(--spacing-5)', gap: 'var(--spacing-6)' }}
        >
          <Avatar size='md' aria-hidden='true' style={{ flexShrink: 0 }}>
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
    </Listbox>
  );
}
