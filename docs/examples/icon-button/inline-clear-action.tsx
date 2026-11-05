import type { CSSProperties } from 'react';
import { Icon, IconButton, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { SearchIcon, XIcon } from '@vega-ui/icons';
import { FormEvent, useRef, useState } from 'react';

export default function InlineClearAction() {
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('quarterly report');
  const [submitted, setSubmitted] = useState('');

  const clear = () => {
    setQuery('');
    input.current?.focus();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get('q')));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor='file-search'>Search files</Label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <TextField style={{ flex: 1, minWidth: 0, paddingInlineEnd: 'var(--spacing-5)' }}>
          <TextFieldInput
            ref={input}
            id='file-search'
            name='q'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query !== '' && (
            <IconButton
              type='button'
              variant='secondary'
              appearance='ghost'
              aria-label='Clear search'
              onClick={clear}
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          )}
        </TextField>
        <IconButton type='submit' aria-label='Search'>
          <Icon><SearchIcon /></Icon>
        </IconButton>
      </div>
      <output style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>
        {submitted === '' ? 'Press Enter or the search button' : `Searched for “${submitted}”`}
      </output>
    </form>
  );
}
