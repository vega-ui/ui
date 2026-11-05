# Listbox Styling

## Overview

`Listbox` has no variables of its own. The list is a plain scrolling surface styled with global tokens, and its rows are [Option](../option/) elements styled with the `--option-*` variables. Height, width and border are ordinary CSS on the list.

## Public CSS Variables

These variables belong to the option rows that `ListboxOption` renders.

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--option-height` | `ListboxOption` | Row height, set by `size` |
| `--option-br-ratio` | `ListboxOption` | Row radius as a share of its height |
| `--option-color` | `ListboxOption` | Text color |
| `--option-background-color` | `ListboxOption` | Default background |
| `--option-background-color-hover` | `ListboxOption` | Background on hover and for the active option |
| `--option-background-color-active` | `ListboxOption` | Background while pressed |

The list itself reads global tokens:

| Token | Used By | Purpose |
| --- | --- | --- |
| `--surface-secondary` | `Listbox` | List background |
| `--focus-color` | `Listbox` | Focus ring of the list |

## Part-Level Variables

### Listbox

Defined in `packages/ui/src/Listbox/style.module.css`. The list is a flex column with `padding: var(--spacing-4)`, `gap: var(--spacing-3)`, `border-radius: var(--spacing-8)` and `overflow: auto`. It has no border and no height limit: it grows with its options until you set `height` or `max-height`, then scrolls.

### ListboxGroup

A flex column with the same `gap: var(--spacing-3)` as the list, so grouped and ungrouped options keep one rhythm. It has no surface and no heading style; style your heading yourself.

### ListboxOption

`ListboxOption` defines all `--option-*` variables on the row itself, so values set on `Listbox` do not reach it. Override them with a selector that targets the rows, or with `style` on each option.

`size` on the list sets `--option-height` and the type scale of every row, and `size` on an option overrides it:

- `xs`: `var(--spacing-16)`
- `sm`: `var(--spacing-18)`
- `md`: `var(--spacing-21)`, the default
- `lg`: `var(--spacing-24)`
- `xl`: `var(--spacing-26)`

The height is fixed, so rows with two lines of content need `height: 'auto'`.

## State And Variant Interaction

- `aria-selected='true'` switches the row to the primary colors.
- `data-active='true'` marks the option the list points to with `aria-activedescendant` and gives it the hover background, so the keyboard position stays visible while the focus is on the list.
- `:focus-visible` on the list draws a 2px outline in `--focus-color`. Options never take the focus themselves.
- `aria-disabled='true'` on a row uses the disabled text color and a `not-allowed` cursor; `disabled` on the list sets it on every row.
- With `multiple`, adjacent selected rows join: their facing corners are squared and the gap between them is filled, so a run of choices reads as one block.

The size, selected and disabled values sit in `:where()`, which adds no specificity to the row class, so a selector of two classes or attributes on your side overrides them.

## Examples

### Selected rows in another color

A class on the list targets its rows and remaps the selected colors and the radius, leaving unselected rows as they are.

<!-- example: listbox/selected-rows-color.tsx -->
```tsx
import { Listbox, ListboxOption } from '@vega-ui/react';
import './examples.css';

export default function SelectedRowsColor() {
  return (
    <Listbox
      aria-label='Reminder before the meeting'
      defaultValue='10'
      className='listbox-accent'
      style={{ width: '100%', maxWidth: 280, border: '1px solid var(--separator-opaque)' }}
    >
      <ListboxOption value='0'>At the start time</ListboxOption>
      <ListboxOption value='5'>5 minutes before</ListboxOption>
      <ListboxOption value='10'>10 minutes before</ListboxOption>
      <ListboxOption value='30'>30 minutes before</ListboxOption>
    </Listbox>
  );
}
```
<!-- /example -->

```css
.listbox-accent [role='option'][aria-selected='true'] {
  --option-background-color: var(--color-green-accent-800);
  --option-background-color-hover: var(--color-green-accent-900);
  --option-background-color-active: var(--color-green-accent-1000);
}

.listbox-accent [role='option'] {
  --option-br-ratio: 0.5;
}
```

### Compact rows in a list of fixed height

`size='sm'` makes every row shorter, and `maxHeight` turns the list into a scrolling area that keeps the active option in view.

<!-- example: listbox/many-options.tsx -->
```tsx
import { Listbox, ListboxOption, Text } from '@vega-ui/react';
import { useState } from 'react';

const builds = Array.from({ length: 300 }, (_, index) => {
  const number = 1480 - index;
  const branch = index % 7 === 0 ? 'release/4.2' : 'main';
  return { value: number, label: `Build ${number}`, branch };
});

export default function ManyOptions() {
  const [build, setBuild] = useState<number | null>(1480);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: 320 }}>
      <Listbox
        aria-label='Build to deploy'
        value={build}
        onChangeValue={(next) => setBuild(next ?? null)}
        size='sm'
        style={{ maxHeight: 240, border: '1px solid var(--separator-opaque)' }}
      >
        {builds.map((item) => (
          <ListboxOption key={item.value} value={item.value} label={item.label}>
            {item.label}
            <span style={{ marginInlineStart: 'auto', opacity: 0.7 }}>{item.branch}</span>
          </ListboxOption>
        ))}
      </Listbox>
      <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{build === null ? 'No build selected.' : `Build ${build} will be deployed to staging.`}</Text>
    </div>
  );
}
```
<!-- /example -->

### Joined selected rows

With `multiple`, choose adjacent toppings to see the selected rows merge into one block.

<!-- example: listbox/several-choices.tsx -->
```tsx
import { Button, Listbox, ListboxOption, Text } from '@vega-ui/react';
import { useState } from 'react';

const toppings = [
  { value: 'cheese', label: 'Extra mozzarella', price: 1.5 },
  { value: 'mushrooms', label: 'Mushrooms', price: 1 },
  { value: 'olives', label: 'Black olives', price: 1 },
  { value: 'pepperoni', label: 'Pepperoni', price: 2 },
  { value: 'jalapenos', label: 'Jalapeños', price: 0.5 },
];

export default function SeveralChoices() {
  const [selected, setSelected] = useState<string[]>(['cheese']);
  const total = toppings
    .filter((item) => selected.includes(item.value))
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', width: '100%', maxWidth: 320 }}>
      <Listbox aria-label='Toppings' multiple value={selected} onChangeValue={setSelected} style={{ border: '1px solid var(--separator-opaque)' }}>
        {toppings.map((item) => (
          <ListboxOption key={item.value} value={item.value}>
            {item.label}
          </ListboxOption>
        ))}
      </Listbox>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          {selected.length} selected · +${total.toFixed(2)}
        </Text>
        <Button size='sm' variant='secondary' appearance='ghost' disabled={selected.length === 0} onClick={() => setSelected([])}>
          Clear
        </Button>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- the `outline` of the list on `:focus-visible`: it is the only focus indicator, because options never take the focus
- the background of `data-active='true'` rows: it is how keyboard users see where they are
- the selected colors in a way that makes selected and unselected rows look alike
- `overflow` on the list: without it a list with a height limit stops scrolling and the active option can leave the view
