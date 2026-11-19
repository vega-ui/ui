# Combobox Anatomy

## Overview

`Combobox` is a compound component. The root owns the picked value, the open state and the active option, and handles the keyboard in the input. The input text is a plain input value owned by the input or by your state. Options are `ListboxOption` elements from [Listbox](../listbox/): they register in the root on mount, so filtering them is a matter of rendering fewer.

## Required Parts

### `Combobox`

Root of the composition and the anchor the list is positioned under.

- Required: yes
- Owns: `value`, `open`, the active option, `disabled`, `readOnly`, `size`
- Must wrap `ComboboxInput` and `ComboboxListbox`
- Holds only the field and the list: the list opens under the whole root, so a label or helper text inside it pushes the list down

### `TextField`

The field surface around the input, from [TextField](../text-field/).

- Required: yes, as the visual field
- Its `size` sets the field height and is separate from the `size` of `Combobox`
- Can hold `ComboboxTrigger`, icons, a spinner or buttons next to the input

### `ComboboxInput`

The text input with `role="combobox"`, rendered as a `TextFieldInput`.

- Required: yes
- Must be inside `TextField` and inside `Combobox`
- Keeps the focus all the time; the active option is announced through `aria-activedescendant`
- Takes every `<input>` attribute: `value`, `onChange`, `name`, `required`, `placeholder`
- Needs a name through a `Label` or `aria-label`

### `ComboboxListbox`

The list with `role="listbox"`, a native `popover="manual"` element in the top layer.

- Required: yes
- Shown while the combobox is open and has at least one option
- A press inside it keeps the focus in the input
- Name it with `aria-label` or `aria-labelledby`

### `ListboxOption`

One suggestion, the same option `Listbox` and `Select` use.

- Required: yes, zero or more at a time
- `value` is a `string` or a `number`, unique in the list
- `label` is the text written into the input when the content is markup; without it the text content is used

## Optional Parts

### `ComboboxTrigger`

A button inside the `TextField`, after the input, that opens and closes the list. It is how pointer and touch users reach the options without typing. It renders a `Button` with no content of its own: put `ComboboxIcon` inside with `square` and an `aria-label` or `aria-labelledby`, or a text like "Show all", or render your own button with `asChild`.

- Required: no, recommended when users may not know what to type
- For an icon alone, put `ComboboxIcon` inside, add `square` and name the button with `aria-label`
- Out of the tab order; a press keeps the focus in the input
- Disabled while the combobox is `disabled` or `readOnly`

### `ComboboxIcon`

The icon inside `ComboboxTrigger`. It draws no icon of its own: pass one as its children, such as a chevron.

- Required: no, but the trigger needs some icon
- Sized by the `TextField` and turned upside down while the list is shown
- Takes the icon as `children`, from any icon set or your own SVG

### `ListboxGroup`

Groups related options like a native `optgroup` and renders `role="group"`.

- Required: no
- Place it inside `ComboboxListbox` and put `ListboxOption` children in it
- Name it with `aria-labelledby` pointing to your heading, or with `aria-label`
- Leave out a group when filtering removes all its options

### Field content outside the root

`Label`, `HelperText`, status messages and a hidden input that mirrors the value are your own elements next to `Combobox`, not parts of it.

## Composition Order

1. `Combobox`
2. `TextField`
3. `ComboboxInput`
4. optional `ComboboxTrigger` with `ComboboxIcon`
5. `ComboboxListbox`
6. optional `ListboxGroup` with its heading
7. `ListboxOption`

## Valid Composition Patterns

The root holds only the field and the list, so the list opens right under the input, and the `Label` names the input through its `id` from outside the root.

<!-- example: combobox/grouped-options.tsx -->
```tsx
import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, Label, ListboxGroup, ListboxOption, Text, TextField } from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const regions = [
  {
    name: 'Americas',
    zones: [
      { id: 'America/Los_Angeles', city: 'Los Angeles', offset: 'UTC−8' },
      { id: 'America/New_York', city: 'New York', offset: 'UTC−5' },
      { id: 'America/Sao_Paulo', city: 'São Paulo', offset: 'UTC−3' },
    ],
  },
  {
    name: 'Europe',
    zones: [
      { id: 'Europe/London', city: 'London', offset: 'UTC+0' },
      { id: 'Europe/Berlin', city: 'Berlin', offset: 'UTC+1' },
      { id: 'Europe/Helsinki', city: 'Helsinki', offset: 'UTC+2' },
    ],
  },
  {
    name: 'Asia',
    zones: [
      { id: 'Asia/Dubai', city: 'Dubai', offset: 'UTC+4' },
      { id: 'Asia/Singapore', city: 'Singapore', offset: 'UTC+8' },
      { id: 'Asia/Tokyo', city: 'Tokyo', offset: 'UTC+9' },
    ],
  },
];

export default function GroupedOptions() {
  const id = useId();
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLowerCase();
  const matches = regions
    .map((region) => ({ ...region, zones: region.zones.filter((zone) => zone.city.toLowerCase().includes(normalized)) }))
    .filter((region) => region.zones.length > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 300 }}>
      <Label htmlFor={id}>Time zone</Label>
      <Combobox>
        <TextField>
          <ComboboxInput id={id} placeholder='Search by city' value={query} onChange={(event) => setQuery(event.target.value)} />
          <ComboboxTrigger square aria-label='Show time zones'>
            <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Time zones'>
          {matches.map((region) => (
            <ListboxGroup key={region.name} aria-labelledby={`${id}-${region.name}`}>
              <Text
                id={`${id}-${region.name}`}
                size={2}
                fontWeight={600}
                style={{ paddingInline: 'var(--spacing-10)', paddingBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}
              >
                {region.name}
              </Text>
              {region.zones.map((zone) => (
                <ListboxOption key={zone.id} value={zone.id} label={zone.city} style={{ gap: 'var(--spacing-8)' }}>
                  {zone.city}
                  <span style={{ marginInlineStart: 'auto', opacity: 0.7 }}>{zone.offset}</span>
                </ListboxOption>
              ))}
            </ListboxGroup>
          ))}
        </ComboboxListbox>
      </Combobox>
    </div>
  );
}
```
<!-- /example -->

Groups are rendered only while they have matching options, and each one is named by its heading through `aria-labelledby`. Options with markup pass `label`, so picking one writes the city and not the offset next to it.

## Invalid Composition Patterns

### `ComboboxInput` outside `TextField`

The input loses the field surface, focus outline and size of `TextField`.

### `ComboboxTrigger` outside `TextField`

The button loses the field size and sits apart from the input it belongs to. Keep it inside the field, after the input.

### Parts outside `Combobox`

`ComboboxInput`, `ComboboxTrigger`, `ComboboxIcon` and `ComboboxListbox` read the root context. Outside it the input is not connected to the list and the keyboard does nothing.

### A `Label` or `HelperText` inside `Combobox`

The list is positioned under the root and at least as wide as it, so it opens below the helper text instead of under the input.

### `Option` instead of `ListboxOption`

A plain `Option` has `role="option"`, but it does not register in the root, so it is never active and picking it does nothing.

### A "no results" row inside `ComboboxListbox`

A listbox holds only options and groups. The list also hides while it has no options, so a message inside it is never seen when nothing matches. Put the message next to the field.

### Interactive controls inside an option

The focus stays in the input, so buttons or links inside an option cannot be reached with the keyboard.
