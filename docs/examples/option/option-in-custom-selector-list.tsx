import { Button, Label, Option, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, KeyboardEvent, useId, useState } from 'react';

const people = ['Amara Okafor', 'Boris Petrov', 'Chloé Lefèvre', 'Dmitri Volkov', 'Elena Rossi', 'Farah Haddad'];

export default function OptionInCustomSelectorList() {
  const id = useId();
  const listId = `${id}-list`;
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [submitted, setSubmitted] = useState('');

  const matches = people.filter((person) => person.toLowerCase().includes(query.trim().toLowerCase()));
  const open = query.trim() !== '' && !people.includes(query);

  const choose = (person: string) => {
    setQuery(person);
    setActive(0);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!open || matches.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive(Math.min(active + 1, matches.length - 1));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive(Math.max(active - 1, 0));
      return;
    }

    if (event.key !== 'Enter') return;

    event.preventDefault();
    choose(matches[active]);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get('assignee')));
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 300 }}>
      <Label htmlFor={id}>Assignee</Label>
      <TextField>
        <TextFieldInput
          id={id}
          name='assignee'
          role='combobox'
          autoComplete='off'
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && matches.length > 0 ? `${listId}-${active}` : undefined}
          placeholder='Start typing a name'
          value={query}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
        />
      </TextField>
      <div
        role='listbox'
        id={listId}
        aria-label='Matching people'
        hidden={!open}
        style={{ display: open ? 'flex' : 'none', flexDirection: 'column', gap: 'var(--spacing-3)', padding: 'var(--spacing-4)', borderRadius: 'var(--spacing-8)', background: 'var(--surface-secondary)', border: '1px solid var(--separator-opaque)', boxSizing: 'border-box' }}
      >
        {matches.map((person, index) => (
          <Option
            key={person}
            id={`${listId}-${index}`}
            size='sm'
            active={index === active}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => choose(person)}
          >
            {person}
          </Option>
        ))}
        {matches.length === 0 && (
          <Text size={2} style={{ padding: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>Nobody matches “{query}”.</Text>
        )}
      </div>
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Assign</Button>
      {submitted && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-4)' }}>
          Assigned to {submitted}.
        </Text>
      )}
    </form>
  );
}
