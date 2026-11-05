import { Listbox, ListboxOption, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useId, useState } from 'react';

const labels = [
  'bug', 'feature', 'documentation', 'design', 'performance', 'security',
  'accessibility', 'good first issue', 'help wanted', 'needs triage', 'wontfix', 'duplicate',
];

export default function FilteredOptions() {
  const id = useId();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>(['bug']);

  const matches = labels.filter((label) => label.includes(query.trim().toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: 300 }}>
      <TextField size='sm'>
        <TextFieldInput
          aria-label='Filter labels'
          aria-controls={id}
          placeholder='Filter labels'
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
      </TextField>
      <Listbox
        id={id}
        aria-label='Labels'
        multiple
        value={selected}
        onChangeValue={setSelected}
        style={{ display: matches.length === 0 ? 'none' : undefined, maxHeight: 220, border: '1px solid var(--separator-opaque)' }}
      >
        {matches.map((label) => (
          <ListboxOption key={label} value={label}>
            {label}
          </ListboxOption>
        ))}
      </Listbox>
      {matches.length === 0 && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>No labels match “{query}”.</Text>
      )}
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Selected: {selected.join(', ') || 'none'}</Text>
    </div>
  );
}
