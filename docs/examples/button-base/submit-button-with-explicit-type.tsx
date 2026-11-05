import { ButtonBase, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useState } from 'react';

const actionStyle = {
  flexShrink: 0,
  paddingInline: 'var(--spacing-8)',
  borderRadius: 'var(--radius-3)',
  fontSize: 'var(--font-size-2)',
};

export default function SubmitButtonWithExplicitType() {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearched(String(new FormData(event.currentTarget).get('q')));
  };

  return (
    <form role='search' onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <TextField style={{ flex: 1, minWidth: 0 }}>
          <TextFieldInput
            name='q'
            type='search'
            aria-label='Search invoices'
            placeholder='Invoice or customer'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            required
          />
        </TextField>
        <ButtonBase type='button' variant='secondary' appearance='ghost' style={actionStyle} onClick={() => setQuery('')}>
          Clear
        </ButtonBase>
        <ButtonBase type='submit' style={actionStyle}>
          Search
        </ButtonBase>
      </div>
      <output style={{ color: 'var(--label-secondary)', fontSize: 'var(--font-size-2)', overflowWrap: 'anywhere' }}>
        {searched === '' ? 'Nothing searched yet' : `Results for “${searched}”`}
      </output>
    </form>
  );
}
