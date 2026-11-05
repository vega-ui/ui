# TextField: анатомия

## Обзор

`TextField` — [составной компонент](../../glossary.md#составной-компонент-compound-component) с небольшим контрактом композиции. Обёртка координирует размер и визуальное состояние, а `TextFieldInput` предоставляет настоящий элемент формы.

## Обязательные части

### `TextField`

Обязательная. Владеет общим размером, состоянием ошибки и визуальным контейнером.

### `TextFieldInput`

Обязательная. Рендерит нативный `<input>` и получает настоящие пропсы инпута.

## Необязательные части

### Дочерние элементы префикса или суффикса

Необязательные. До или после инпута можно разместить кнопки, иконки, счётчики или текст статуса.

## Порядок композиции

1. `TextField`
2. необязательный дочерний элемент префикса
3. `TextFieldInput`
4. необязательный дочерний элемент суффикса

## Допустимые паттерны композиции

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

## Недопустимые паттерны композиции

### Обёртка без `TextFieldInput`

Компонент рендерится, но настоящего элемента формы нет.

### Пропсы инпута переданы обёртке

Это ломает поведение формы, потому что обёртка — просто `<div>`.

### Слишком много конкурирующих элементов управления вокруг инпута

Поле становится визуально перегруженным и неудобным.
