# Combobox Styling

## Overview

`Combobox` styles only its list. The field is a [TextField](../text-field/) with its own size and variables, and the options are [Option](../option/) rows styled with the `--option-*` variables, the same as in [Listbox](../listbox/).

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--combobox-size` | root, `ComboboxListbox` | Base for the list radius, set by `size` |
| `--combobox-br-ratio` | root, `ComboboxListbox` | Shared radius ratio, `--br-ratio` by default |
| `--combobox-listbox-br-ratio` | `ComboboxListbox` | List-specific radius ratio override |
| `--combobox-icon-color` | `ComboboxIcon` | Chevron color, `--label-tertiary` by default |

The list also reads global tokens:

| Token | Used By | Purpose |
| --- | --- | --- |
| `--surface-secondary` | `ComboboxListbox` | List background |
| `--surface-shadow` | `ComboboxListbox` | List shadow |
| `--z-index-popover` | `ComboboxListbox` | Stacking order |

## Part-Level Variables

### Root

Defined in `packages/ui/src/Combobox/style.module.css`. `size` maps `--combobox-size`:

- `xs`: `var(--spacing-16)`
- `sm`: `var(--spacing-18)`
- `md`: `var(--spacing-21)`, the default
- `lg`: `var(--spacing-24)`
- `xl`: `var(--spacing-26)`

The same `size` sets the height of every `ListboxOption`. The field height comes from `size` on `TextField`, so set both to the same token.

### ComboboxListbox

The list is positioned under the root with CSS anchor positioning and flips above it when there is no room below. It is at least as wide as the root and grows with its content, has `padding: var(--spacing-4)`, `gap: var(--spacing-3)` and `max-height: 250px`, and scrolls past that height. Its radius is `--combobox-size` times `--combobox-listbox-br-ratio`, or `--combobox-br-ratio` when it is not set.

### ComboboxTrigger

An `IconButton` as tall and wide as the field (`--icon-button-size: var(--input-height)`), transparent, in the text color, with the quaternary fills on hover and press.

### ComboboxIcon

The chevron takes its size from the `TextField` size: `xs` for `xs` and `sm` fields, `sm` for `md`, `md` for `lg` and `xl`. Its color is `var(--combobox-icon-color, var(--label-tertiary))`, and it turns upside down while the list is shown.

### ListboxOption

Rows define all `--option-*` variables on themselves, so values set on the root or the list do not reach them. Override them with a selector that targets the rows, or with `style` on each option. Rows with two lines of content need `height: 'auto'`.

## State And Variant Interaction

- The list animates with `:popover-open`: it fades and scales in, and fades out before it is hidden. With `prefers-reduced-motion: reduce` it does not scale.
- `:hover` gives an option the light hover background without making it active.
- `aria-selected='true'` switches an option to the primary colors. It follows the active option while there is one, and stays on the option of the picked value otherwise.
- `data-open='true'` on the input and on `ComboboxIcon` while the list is shown; the icon rotates by 180 degrees.
- Invalid, disabled and read-only states of the field come from `TextField` and the input attributes, such as `aria-invalid` and `:user-invalid`.

## Examples

### List shape and height

Set the ratio on the root to round the list, and change its height with a selector or with `style` on `ComboboxListbox`.

```css
.rounded-combobox {
  --combobox-listbox-br-ratio: 0.5;
}

.rounded-combobox [role='listbox'] {
  max-height: 320px;
}
```

### Two-line options

Options with an avatar and a secondary line set `height: 'auto'` and their own padding, and keep the written text in `label`.

<!-- example: combobox/rich-option-content.tsx -->
```tsx
import { Avatar, AvatarFallback, Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, Label, ListboxOption, TextField } from '@vega-ui/react';
import { useId, useState } from 'react';

const people = [
  { id: 'amara', initials: 'AO', name: 'Amara Okafor', email: 'amara.okafor@northwind.example' },
  { id: 'boris', initials: 'BP', name: 'Boris Petrov', email: 'boris@northwind.example' },
  { id: 'chloe', initials: 'CL', name: 'Chloé Lefèvre-Durand', email: 'chloe.lefevre-durand.finance@northwind.example' },
  { id: 'dmitri', initials: 'DV', name: 'Dmitri Volkov', email: 'dmitri.volkov@northwind.example' },
  { id: 'elif', initials: 'EY', name: 'Elif Yılmaz', email: 'elif.yilmaz@northwind.example' },
];

export default function RichOptionContent() {
  const id = useId();
  const [query, setQuery] = useState('');
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const owner = people.find((person) => person.id === ownerId);
  const normalized = query.trim().toLowerCase();
  const matches = people.filter((person) => person.name.toLowerCase().includes(normalized) || person.email.includes(normalized));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Account owner</Label>
      <Combobox value={ownerId} onChangeValue={(next) => setOwnerId(next)}>
        <TextField>
          {owner && (
            <Avatar size='sm' aria-hidden='true' style={{ flexShrink: 0, marginInlineStart: 'var(--spacing-6)' }}>
              <AvatarFallback>{owner.initials}</AvatarFallback>
            </Avatar>
          )}
          <ComboboxInput id={id} placeholder='Name or email' value={query} onChange={(event) => setQuery(event.target.value)} />
          <ComboboxTrigger aria-label='Show people'>
            <ComboboxIcon />
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='People' style={{ maxWidth: 320 }}>
          {matches.map((person) => (
            <ListboxOption
              key={person.id}
              value={person.id}
              label={person.name}
              style={{ height: 'auto', paddingBlock: 'var(--spacing-5)', gap: 'var(--spacing-6)' }}
            >
              <Avatar size='md' aria-hidden='true'>
                <AvatarFallback>{person.initials}</AvatarFallback>
              </Avatar>
              <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                <span>{person.name}</span>
                <span style={{ fontSize: 'var(--font-size-2)', opacity: 0.7, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {person.email}
                </span>
              </span>
            </ListboxOption>
          ))}
        </ComboboxListbox>
      </Combobox>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- the `popover`, `inset` and anchor positioning of `ComboboxListbox`, which keep it under the field and in the top layer
- the `mousedown` handling of the list, which keeps the focus in the input
- the active option background, which is the only sign of the keyboard position
- the field and the options at different size tokens, which makes the list rows look unrelated to the field
