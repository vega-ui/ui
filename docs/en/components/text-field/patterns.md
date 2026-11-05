# TextField Patterns

## Search Row

When to use:

- a field needs a trailing submit or search action

Composition notes:

- keep the input first and the action second
- match action size to the field size

Trade-offs:

- compact and practical
- adds more horizontal density than a plain field

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

## Counter Or Status Suffix

When to use:

- the current value needs lightweight inline feedback

Composition notes:

- keep suffix text short
- avoid pushing the input too narrow

Trade-offs:

- immediate feedback
- can reduce usable input width

<!-- example: text-field/character-counter-suffix.tsx -->
```tsx
import { Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useId, useState } from 'react';

const MAX_LENGTH = 60;

export default function CharacterCounterSuffix() {
  const id = useId();
  const counterId = `${id}-counter`;
  const [title, setTitle] = useState('Q3 roadmap review');
  const remaining = MAX_LENGTH - title.length;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Meeting title</Label>
      <TextField>
        <TextFieldInput
          id={id}
          value={title}
          maxLength={MAX_LENGTH}
          aria-describedby={counterId}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <Text
          id={counterId}
          size={2}
          style={{ paddingInlineEnd: 'var(--spacing-6)', whiteSpace: 'nowrap', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}
        >
          {remaining} left
        </Text>
      </TextField>
      <Text size={2} style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>
        Calendar preview: {title.trim() === '' ? 'Untitled meeting' : title.trim()}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Prefix And Suffix

When to use:

- fixed text belongs to the value, such as a protocol, a domain, or a unit

Composition notes:

- keep affixes out of the value and hide them from screen readers when the label or hint already says it
- let the input shrink (`minWidth: 0`) while affixes keep their width

Trade-offs:

- efficient for dense controls
- easier to overload than a plain field

<!-- example: text-field/subdomain-prefix-suffix.tsx -->
```tsx
import { HelperText, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useId, useState } from 'react';

const affixStyle = {
  flexShrink: 0,
  whiteSpace: 'nowrap',
  color: 'var(--label-secondary)',
} as const;

export default function SubdomainPrefixSuffix() {
  const id = useId();
  const hintId = `${id}-hint`;
  const [subdomain, setSubdomain] = useState('northwind-traders-international-logistics');

  const onChange = (value: string) => {
    setSubdomain(value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Workspace address</Label>
      <TextField>
        <Text size={3} aria-hidden style={{ ...affixStyle, paddingInlineStart: 'var(--spacing-6)' }}>https://</Text>
        <TextFieldInput
          id={id}
          name='subdomain'
          value={subdomain}
          spellCheck={false}
          aria-describedby={hintId}
          onChange={(event) => onChange(event.currentTarget.value)}
          style={{ minWidth: 0, paddingInline: 'var(--spacing-1)' }}
        />
        <Text size={3} aria-hidden style={{ ...affixStyle, paddingInlineEnd: 'var(--spacing-6)' }}>.vega.app</Text>
      </TextField>
      <HelperText id={hintId} style={{ overflowWrap: 'anywhere' }}>
        Lowercase letters, digits and hyphens. Full address: https://{subdomain === '' ? '…' : subdomain}.vega.app
      </HelperText>
    </div>
  );
}
```
<!-- /example -->
