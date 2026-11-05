# TextField Anatomy

## Overview

`TextField` is a [compound component](../../glossary.md#compound-component) with a small composition contract. The wrapper coordinates sizing and visual state, and `TextFieldInput` provides the real form control.

## Required Parts

### `TextField`

Required. Owns shared size, error state, and the visual container.

### `TextFieldInput`

Required. Renders the native `<input>` and receives actual input props.

## Optional Parts

### Prefix Or Suffix Children

Optional. Buttons, icons, counters, or status text can be placed before or after the input.

## Composition Order

1. `TextField`
2. optional prefix child
3. `TextFieldInput`
4. optional suffix child

## Valid Composition Patterns

<!-- example: text-field/search-with-clear-and-submit.tsx -->
```tsx
import type { CSSProperties, FormEvent } from 'react';
import { Button, Icon, IconButton, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { SearchIcon, XIcon } from '@vega-ui/icons';
import { useRef, useState } from 'react';
import './examples.css';

export default function SearchWithClearAndSubmit() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearched(query.trim());
  };

  const clear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <form role='search' onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <TextField>
        <Icon size='sm' aria-hidden style={{ flexShrink: 0, marginInlineStart: 'var(--spacing-6)', color: 'var(--label-secondary)' }}>
          <SearchIcon />
        </Icon>
        <TextFieldInput
          ref={inputRef}
          className='searchInput'
          type='search'
          name='q'
          aria-label='Search invoices'
          placeholder='Invoice or customer'
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
        {query !== '' && (
          <IconButton
            type='button'
            aria-label='Clear search'
            variant='secondary'
            appearance='ghost'
            onClick={clear}
            style={{ '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5, flexShrink: 0 } as CSSProperties}
          >
            <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
          </IconButton>
        )}
        <Button type='submit' size='sm' style={{ flexShrink: 0, marginInlineStart: 'var(--spacing-2)', marginInlineEnd: 'var(--spacing-3)' }}>Search</Button>
      </TextField>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>
        {searched === '' ? 'Showing all invoices' : `Results for “${searched}”`}
      </Text>
    </form>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Wrapper without `TextFieldInput`

The component renders, but there is no actual form control.

### Input props passed to the wrapper

This breaks form behavior because the wrapper is only a `<div>`.

### Too many competing controls around the input

The field becomes visually dense and hard to use.
