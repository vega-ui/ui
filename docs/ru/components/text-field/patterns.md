# TextField: паттерны

## Строка поиска

Когда использовать:

- полю нужно действие отправки или поиска в конце

Заметки о композиции:

- сначала инпут, затем действие
- размер действия должен совпадать с размером поля

Компромиссы:

- компактно и практично
- горизонтальная плотность выше, чем у простого поля

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

## Суффикс со счётчиком или статусом

Когда использовать:

- текущему значению нужна лёгкая обратная связь прямо в строке

Заметки о композиции:

- текст суффикса должен быть коротким
- не сужайте инпут слишком сильно

Компромиссы:

- мгновенная обратная связь
- может уменьшить полезную ширину ввода

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

## Префикс и суффикс

Когда использовать:

- фиксированный текст — часть значения: протокол, домен или единица измерения

Заметки о композиции:

- держите аффиксы вне значения и скрывайте их от скринридера, если лейбл или подсказка уже это говорят
- инпут должен сжиматься (`minWidth: 0`), а аффиксы — сохранять ширину

Компромиссы:

- эффективно для плотных элементов управления
- перегрузить легче, чем простое поле

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
