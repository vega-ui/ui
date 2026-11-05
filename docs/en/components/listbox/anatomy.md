# Listbox Anatomy

## Overview

`Listbox` is a compound component. The root owns the selection, the active option, keyboard navigation and typeahead, and shares them with its parts through context. Options are read from the DOM on each key press, so they need no registration and can be filtered or added freely.

## Required Parts

### `Listbox`

Root of the composition and the element with `role='listbox'`.

- Required: yes
- Owns: `value`, `multiple`, `disabled`, `size`, `typeahead`, the active option and keyboard handling
- Must wrap every `ListboxOption` and `ListboxGroup`
- Needs a name through `aria-labelledby` or `aria-label`

### `ListboxOption`

A single choice, rendered as an [Option](../option/) with `role='option'`.

- Required: yes, one or more
- Must be rendered inside `Listbox`, directly or inside a `ListboxGroup`
- `value` is a `string` or a `number` and must be unique in the list: it builds the option `id`
- `label` gives typeahead plain text when the content is markup

## Optional Parts

### `ListboxGroup`

Groups related options like a native `optgroup` and renders `role='group'`.

- Required: no
- Place it inside `Listbox` and put `ListboxOption` children in it
- Name it with `aria-labelledby` pointing to your heading, or with `aria-label`

### Group heading

Any element of yours with an `id`, rendered inside the group and referenced by its `aria-labelledby`. The component does not export a heading part.

### Hidden inputs

`Listbox` does not submit a value. To send the selection with a form, render `<input type='hidden'>` elements from the same state next to the list.

## Composition Order

1. `Listbox`
2. optional `ListboxGroup` with its heading
3. `ListboxOption`

## Valid Composition Patterns

<!-- example: listbox/groups-and-a-scrolling-list.tsx -->
```tsx
import { Listbox, ListboxGroup, ListboxOption, Text } from '@vega-ui/react';
import { useId } from 'react';

const countries = [
  {
    name: 'France',
    airports: [
      { code: 'CDG', name: 'Paris Charles de Gaulle' },
      { code: 'ORY', name: 'Paris Orly' },
      { code: 'NCE', name: 'Nice Côte d’Azur' },
      { code: 'LYS', name: 'Lyon Saint-Exupéry' },
    ],
  },
  {
    name: 'Germany',
    airports: [
      { code: 'FRA', name: 'Frankfurt' },
      { code: 'MUC', name: 'Munich' },
      { code: 'BER', name: 'Berlin Brandenburg' },
    ],
  },
  {
    name: 'Japan',
    airports: [
      { code: 'HND', name: 'Tokyo Haneda' },
      { code: 'NRT', name: 'Tokyo Narita' },
      { code: 'KIX', name: 'Osaka Kansai' },
    ],
  },
];

export default function GroupsAndAScrollingList() {
  const id = useId();

  return (
    <Listbox aria-label='Departure airport' defaultValue='MUC' style={{ width: '100%', maxWidth: 320, maxHeight: 260, border: '1px solid var(--separator-opaque)' }}>
      {countries.map((country) => (
        <ListboxGroup key={country.name} aria-labelledby={`${id}-${country.name}`}>
          <Text
            id={`${id}-${country.name}`}
            size={2}
            fontWeight={600}
            style={{ paddingInline: 'var(--spacing-10)', paddingBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}
          >
            {country.name}
          </Text>
          {country.airports.map((airport) => (
            <ListboxOption key={airport.code} value={airport.code} label={airport.name} style={{ gap: 'var(--spacing-8)' }}>
              {airport.name}
              <span style={{ marginInlineStart: 'auto', opacity: 0.7 }}>{airport.code}</span>
            </ListboxOption>
          ))}
        </ListboxGroup>
      ))}
    </Listbox>
  );
}
```
<!-- /example -->

The list is named with `aria-label`, each group is named by its heading through `aria-labelledby`, and every option has a unique `value`. Options with markup pass `label`, so typeahead matches the airport name and not the code next to it.

## Invalid Composition Patterns

### `ListboxOption` outside `Listbox`

The row renders, but it has no list context: it never becomes selected and does not respond to the keyboard.

### `Option` instead of `ListboxOption`

A plain `Option` has `role='option'`, so the list reaches it with the arrow keys, but choosing it does not change the value.

### Two options with the same `value`

Both get the same `id`, so they are highlighted and selected together.

### Interactive controls inside an option

The focus stays on the list, so buttons, links or inputs inside an option cannot be reached with the keyboard and confuse screen readers.

### A group without a name

A `ListboxGroup` without `aria-labelledby` or `aria-label` is announced as an unnamed group.
