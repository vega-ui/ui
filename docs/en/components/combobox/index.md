# Combobox

## Doc Profile

`advanced interactive`

## Summary

`Combobox` is a text input with a list of suggestions: typing opens the list, the arrow keys move through it, and picking an option writes its label into the input. It follows the WAI-ARIA combobox pattern, with list autocomplete and manual selection by default, so the focus always stays in the input and the active option is announced through `aria-activedescendant`. The app owns the options and filters them itself; with `autocomplete='both'` or `'inline'` the input also completes the typed text, and `ComboboxTrigger` opens the list without typing.

## Imports

```tsx
import {
  Combobox,
  ComboboxIcon,
  ComboboxInput,
  ComboboxListbox,
  ComboboxTrigger,
  ListboxGroup,
  ListboxOption,
  TextField,
  type ComboboxAutocomplete,
  type ComboboxIconProps,
  type ComboboxInputProps,
  type ComboboxListboxProps,
  type ComboboxProps,
  type ComboboxSize,
  type ComboboxTriggerProps,
} from '@vega-ui/react';
```

## Exported Types

- `ComboboxProps<Value extends string | number = string>`
- `ComboboxInputProps`
- `ComboboxListboxProps`
- `ComboboxTriggerProps`
- `ComboboxIconProps`
- `ComboboxAutocomplete = 'none' | 'list' | 'both' | 'inline'`
- `ComboboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string`

## Minimal Composition

<!-- example: combobox/minimal-composition.tsx -->
```tsx
import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, Label, ListboxOption, TextField } from '@vega-ui/react';
import { useId, useState } from 'react';

const cities = ['Amsterdam', 'Athens', 'Berlin', 'Copenhagen', 'Dublin', 'Lisbon', 'London', 'Madrid', 'Oslo', 'Prague', 'Rome', 'Vienna'];

export default function MinimalComposition() {
  const id = useId();
  const [query, setQuery] = useState('');
  const matches = cities.filter((city) => city.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>City</Label>
      <Combobox>
        <TextField>
          <ComboboxInput id={id} placeholder='Start typing a city' value={query} onChange={(event) => setQuery(event.target.value)} />
          <ComboboxTrigger aria-label='Show cities'>
            <ComboboxIcon />
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Cities'>
          {matches.map((city) => <ListboxOption key={city} value={city}>{city}</ListboxOption>)}
        </ComboboxListbox>
      </Combobox>
    </div>
  );
}
```
<!-- /example -->

## Required Parts

- `Combobox`: root that holds the picked value and the open state
- `TextField`: the field surface around the input
- `ComboboxInput`: the text input with `role="combobox"`
- `ComboboxListbox`: the list with `role="listbox"`
- `ListboxOption`: one suggestion

## Optional Parts

- `ComboboxTrigger`: a button in the field that opens the list without typing, for pointer and touch users
- `ComboboxIcon`: the chevron inside `ComboboxTrigger`, sized by the field
- `ListboxGroup`: a named group of options, like `optgroup`
- `Label`, `HelperText` and other field content, placed outside the root

## Composition Order

Typical composition:

1. `Combobox`
2. `TextField`
3. `ComboboxInput`
4. `ComboboxTrigger` (optional)
5. `ComboboxIcon`
6. `ComboboxListbox`
7. `ListboxGroup` (optional)
8. `ListboxOption`

## Variants

- Size: `xs`, `sm`, `md`, `lg`, `xl` on the root for the options and the list corners; the field takes its own `size` on `TextField`
- Autocomplete: `list` (default) when the app filters by the text, `none` when the options do not depend on it, `both` to complete the text inline as well, `inline` to complete it without opening the list while typing
- Text: uncontrolled, or controlled with `value` and `onChange` on `ComboboxInput`
- Value: [controlled](../../glossary.md#controlled) with `value` or [uncontrolled](../../glossary.md#uncontrolled) with `defaultValue` on `Combobox`
- State: [disabled](../../glossary.md#disabled), [read-only](../../glossary.md#read-only)

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)
- [Listbox](../listbox/)
- [Select](../select/)
- [TextField](../text-field/)

## Edge Cases

- There is no built-in filtering. The app renders the options that match the text, and the list hides by itself while it has none.
- `ComboboxTrigger` opens the list with whatever options the app renders. After a pick the text is the option label, so a list filtered by the text holds the picked option, as in the WAI-ARIA examples. Clearing the text, for example with `Escape` twice, brings the other options back.
- With `autocomplete='both'` or `'inline'` the completed text, from typing or from the arrow keys, reaches `onChange` like typed text, and leaving the input picks the completed option. Filter by the text before the selection, as in [Basic: inline completion](./examples.md#basic-inline-completion).
- Picking an option writes its label into the input and fires `input`, so `onChange` receives it. Editing or clearing the text after that calls `onChangeValue(null)`.
- The text is not reverted on blur, like a native `<datalist>`: text that matches no option stays in the input with `value` set to `null`.
- A `value` changed by the parent does not rewrite the text. Set the text yourself when you set the value.
- `name` on `ComboboxInput` submits the text. The root renders no hidden input; mirror the picked value into the form yourself when the server needs it.
- A "no results" message does not belong in the list, which holds only options. Show it next to the field.

## Common Mistakes

- Leaving the input or `ComboboxTrigger` without a `Label` or `aria-label`.
- Putting `Label` or `HelperText` inside `Combobox`: the list is positioned under the whole root, so it opens below them.
- Expecting `Combobox` to filter the options or to restore the text on blur.
- Setting `value` from the parent and forgetting to set the input text.
- Using `Combobox` for a short fixed set of options that users should not type into; use [Select](../select/).
