# IconButton Patterns

## Compact Toolbar Action

When to use:

- Dense toolbars or headers need compact actions.

Composition notes:

- Keep labels explicit through `aria-label`.
- Reserve icon-only treatment for familiar actions.

Trade-offs:

- Saves space.
- Less explicit than text buttons.

<!-- example: icon-button/basic-usage.tsx -->
```tsx
import { Icon, IconButton, Text } from '@vega-ui/react';
import { EllipsisIcon, PencilIcon, Share2Icon } from '@vega-ui/icons';
import { useState } from 'react';

export default function BasicUsage() {
  const [lastAction, setLastAction] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', width: '100%' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
        <Text size={4} fontWeight={600} style={{ flex: 1, minWidth: 0 }}>Brand guidelines</Text>
        <IconButton type='button' size='sm' variant='secondary' appearance='transparent' aria-label='Rename document' onClick={() => setLastAction('Rename')}>
          <Icon><PencilIcon /></Icon>
        </IconButton>
        <IconButton type='button' size='sm' variant='secondary' appearance='transparent' aria-label='Share document' onClick={() => setLastAction('Share')}>
          <Icon><Share2Icon /></Icon>
        </IconButton>
        <IconButton type='button' size='sm' variant='secondary' appearance='transparent' aria-label='More actions' onClick={() => setLastAction('More')}>
          <Icon><EllipsisIcon /></Icon>
        </IconButton>
      </header>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {lastAction === '' ? 'Updated 2 hours ago' : `Clicked: ${lastAction}`}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Inline Clear Action

When to use:

- A small local control clears or removes adjacent state.

Composition notes:

- Place the button close to the thing it affects.
- Keep the action narrowly scoped.

Trade-offs:

- Very compact.
- Easy to overuse in forms without enough context.

<!-- example: icon-button/inline-clear-action.tsx -->
```tsx
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
```
<!-- /example -->

## Navigational Icon Surface

When to use:

- Navigation needs icon-button visuals while preserving link semantics.

Composition notes:

- Use `asChild` with a real anchor.
- Keep the destination obvious from the surrounding context and accessible label.

Trade-offs:

- Strong visual consistency.
- Easy to misuse for ambiguous navigation.

<!-- example: icon-button/navigational-icon-surface.tsx -->
```tsx
import { Icon, IconButton } from '@vega-ui/react';
import { BookOpenIcon, LifeBuoyIcon, RssIcon } from '@vega-ui/icons';

const links = [
  { href: '/docs', label: 'Documentation', icon: <BookOpenIcon /> },
  { href: '/support', label: 'Help center', icon: <LifeBuoyIcon /> },
  { href: '/blog/rss.xml', label: 'Blog RSS feed', icon: <RssIcon /> },
];

export default function NavigationalIconSurface() {
  return (
    <nav aria-label='Resources'>
      <ul style={{ display: 'flex', gap: 'var(--spacing-4)', margin: 0, padding: 0, listStyle: 'none' }}>
        {links.map((link) => (
          <li key={link.href}>
            <IconButton asChild variant='secondary' appearance='ghost'>
              <a href={link.href} aria-label={link.label}>
                <Icon>{link.icon}</Icon>
              </a>
            </IconButton>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```
<!-- /example -->
