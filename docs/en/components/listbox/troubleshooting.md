# Listbox Troubleshooting

## The Selection Is Missing From The Submitted Form

### Symptom

The list shows the chosen options, but the form data has no field for them.

### Likely Cause

`Listbox` is not a form control. It renders a `div` with `role='listbox'`, which has no `name` and does not take part in form submission.

### How To Verify

- submit the form and inspect `new FormData(form)`
- look for an element with the expected `name` inside the form

### Fix

Keep the value in state and render one `<input type='hidden'>` per selected value. Restore the initial state in the form `onReset`.

<!-- example: listbox/listbox-in-form.tsx -->
```tsx
import { Button, Listbox, ListboxOption, Text } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

const initialChannels = ['email'];

export default function ListboxInForm() {
  const labelId = useId();
  const [channels, setChannels] = useState<string[]>(initialChannels);
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(data.getAll('channel').join(', ') || 'nothing');
  };

  const onReset = () => {
    setChannels(initialChannels);
    setSubmitted('');
  };

  return (
    <form
      onSubmit={onSubmit}
      onReset={onReset}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}
    >
      <Text id={labelId} size={3} fontWeight={500}>Notify me about new orders by</Text>
      <Listbox aria-labelledby={labelId} multiple value={channels} onChangeValue={setChannels} style={{ border: '1px solid var(--separator-opaque)' }}>
        <ListboxOption value='email'>Email</ListboxOption>
        <ListboxOption value='sms'>SMS</ListboxOption>
        <ListboxOption value='push'>Push notification</ListboxOption>
        <ListboxOption value='slack'>Slack</ListboxOption>
      </Listbox>
      {channels.map((channel) => (
        <input key={channel} type='hidden' name='channel' value={channel} />
      ))}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-9)' }}>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        <Button type='submit'>Save</Button>
      </div>
      {submitted && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-4)' }}>
          Saved channels: {submitted}
        </Text>
      )}
    </form>
  );
}
```
<!-- /example -->

## A Disabled Fieldset Does Not Disable The List

### Symptom

Inputs inside `<fieldset disabled>` are locked, but the list can still be focused and changed.

### Likely Cause

The browser disables only form controls inside a fieldset, and the list is not one.

### How To Verify

- tab through the disabled fieldset and check whether the list takes the focus
- inspect the list: it has no `aria-disabled`

### Fix

Pass `disabled` to `Listbox` from the same state that disables the fieldset. It disables every option and removes the list from the tab order.

<!-- example: listbox/disabled-list.tsx -->
```tsx
import { Label, Listbox, ListboxOption, Switch, SwitchIndicator, SwitchInput } from '@vega-ui/react';
import { useId, useState } from 'react';

export default function DisabledList() {
  const switchId = useId();
  const [automatic, setAutomatic] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Switch>
          <SwitchInput
            id={switchId}
            checked={automatic}
            onChange={(event) => setAutomatic(event.currentTarget.checked)}
          />
          <SwitchIndicator />
        </Switch>
        <Label htmlFor={switchId}>Pick the region automatically</Label>
      </div>
      <Listbox aria-label='Server region' disabled={automatic} defaultValue='eu-central' style={{ border: '1px solid var(--separator-opaque)' }}>
        <ListboxOption value='us-east'>US East (Virginia)</ListboxOption>
        <ListboxOption value='eu-central'>EU Central (Frankfurt)</ListboxOption>
        <ListboxOption value='ap-northeast'>Asia Pacific (Tokyo)</ListboxOption>
      </Listbox>
    </div>
  );
}
```
<!-- /example -->

## Typing Does Not Find Options With Rich Content

### Symptom

Typing the first letters of a name does not move to the option, although the name is shown.

### Likely Cause

Typeahead matches the start of the option text. Without `label`, that text is all the text content of the option, so an avatar's initials or an icon label in front of the name come first.

### How To Verify

- check the option's `textContent` in the developer tools
- check whether the option has a `data-label` attribute

### Fix

Pass the plain name as `label` on each `ListboxOption`.

<!-- example: listbox/rich-content-with-a-label-for-typeahead.tsx -->
```tsx
import { Avatar, AvatarFallback, Listbox, ListboxOption } from '@vega-ui/react';

const people = [
  { id: 'amara', initials: 'AO', name: 'Amara Okafor', email: 'amara.okafor@northwind-logistics.example' },
  { id: 'boris', initials: 'BP', name: 'Boris Petrov', email: 'boris@northwind-logistics.example' },
  { id: 'chloe', initials: 'CL', name: 'Chloé Lefèvre-Durand', email: 'chloe.lefevre-durand.finance@northwind-logistics.example' },
  { id: 'dmitri', initials: 'DV', name: 'Dmitri Volkov', email: 'dmitri.volkov@northwind-logistics.example' },
];

export default function RichContentWithALabelForTypeahead() {
  return (
    <Listbox aria-label='Assignee' style={{ width: '100%', maxWidth: 300, border: '1px solid var(--separator-opaque)' }}>
      {people.map((person) => (
        <ListboxOption
          key={person.id}
          value={person.id}
          label={person.name}
          style={{ height: 'auto', paddingBlock: 'var(--spacing-5)', gap: 'var(--spacing-6)' }}
        >
          <Avatar size='md' aria-hidden='true' style={{ flexShrink: 0 }}>
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
    </Listbox>
  );
}
```
<!-- /example -->

## Clearing The Value Does Not Clear The List

### Symptom

After a reset button sets the value to `undefined`, an option stays selected.

### Likely Cause

`undefined` makes the list uncontrolled, so it shows its own internal selection instead of an empty one. A single list is cleared with `null`, a list with `multiple` with an empty array.

### How To Verify

- log the value passed to `value` after the reset
- check whether `onChangeValue` writes `undefined` into your state

### Fix

Store `null` for an empty single choice, and map an `undefined` from `onChangeValue` to `null` with `next ?? null`.

<!-- example: listbox/value-with-a-reset.tsx -->
```tsx
import { Button, Listbox, ListboxOption, Text } from '@vega-ui/react';
import { useState } from 'react';

const fonts = [
  { value: 'serif', label: 'Serif', family: 'Georgia, serif' },
  { value: 'sans', label: 'Sans-serif', family: 'system-ui, sans-serif' },
  { value: 'mono', label: 'Monospace', family: 'ui-monospace, monospace' },
];

export default function ValueWithAReset() {
  const [font, setFont] = useState<string | null>('serif');
  const current = fonts.find((item) => item.value === font);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <Listbox aria-label='Reading font' value={font} onChangeValue={(next) => setFont(next ?? null)} style={{ border: '1px solid var(--separator-opaque)' }}>
        {fonts.map((item) => (
          <ListboxOption key={item.value} value={item.value}>
            {item.label}
          </ListboxOption>
        ))}
      </Listbox>
      <Text size={3} style={{ fontFamily: current?.family, minHeight: 'calc(var(--line-height-3) * 2)' }}>
        The quick brown fox jumps over the lazy dog.
      </Text>
      <Button size='sm' variant='secondary' appearance='ghost' style={{ alignSelf: 'flex-end' }} disabled={font === null} onClick={() => setFont(null)}>
        Use the site default
      </Button>
    </div>
  );
}
```
<!-- /example -->

## Two Options Are Highlighted And Selected Together

### Symptom

Choosing one option selects another one too, and the arrow keys highlight both.

### Likely Cause

The options share the same `value`. The option `id` is built from the value, and selection compares values, so the list cannot tell them apart.

### How To Verify

- inspect the options and look for duplicate `id` attributes
- check the data the options are rendered from for repeated keys

### Fix

Give every `ListboxOption` a unique `value`, such as a record id, and keep the visible text separate.

## Switching `multiple` Breaks The List

### Symptom

After `multiple` changes on a mounted list, a click throws a `TypeError` or the selection looks wrong.

### Likely Cause

The value keeps the shape of the old mode: a single value where the list now expects an array, or the other way round.

### How To Verify

- log the value right after `multiple` changes and check whether it is an array

### Fix

Remount the list when the mode changes with `key={String(multiple)}`, and convert the value yourself: wrap a single value in an array, or take one item of the array.

## The List Grows Taller Than The Layout

### Symptom

With many options the list pushes the content below it far down the page.

### Likely Cause

The list has no height limit by default and grows with its options.

### How To Verify

- inspect the list and check that it has no `height` or `max-height`

### Fix

Set `maxHeight` on the list. It scrolls by itself and keeps the active option in view while the user moves with the arrow keys. A smaller `size` fits more rows in the same space.

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
