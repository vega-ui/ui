# Combobox Troubleshooting

## The List Does Not Open

### Symptom

Typing or pressing `ArrowDown` in the input shows no list, and `aria-expanded` stays `false`.

### Likely Cause

The list is shown only while it has options. The app renders none for the current text, the options are not `ListboxOption`, or the combobox is `disabled` or `readOnly`.

### How To Verify

- count the `role='option'` elements inside `ComboboxListbox` after typing
- check that they are `ListboxOption`, not `Option` or plain elements
- check the `disabled` and `readOnly` props on `Combobox`

### Fix

Render `ListboxOption` elements for the current text, and show a message next to the field when none match. Remove `disabled` or `readOnly` when the field should be editable.

## Setting The Value Does Not Change The Text

### Symptom

The parent sets `value`, and the matching option is marked as selected, but the input still shows the old text.

### Likely Cause

The text belongs to the input. A `value` set by the parent never rewrites it; only a pick by the user writes the label.

### How To Verify

- set `value` from a button and look at the input
- check whether the input text is in state

### Fix

Control the text with `value` and `onChange` on `ComboboxInput`, and set the text and the value together.

<!-- example: combobox/controlled-value-and-text.tsx -->
```tsx
import { Button, Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, Label, ListboxOption, Text, TextField } from '@vega-ui/react';
import { useId, useState } from 'react';

const CURRENT_USER = 'ana';

const members = [
  { id: 'ana', name: 'Ana Silva' },
  { id: 'kenji', name: 'Kenji Watanabe' },
  { id: 'lena', name: 'Lena Fischer' },
  { id: 'omar', name: 'Omar Haddad' },
  { id: 'priya', name: 'Priya Natarajan' },
  { id: 'tomas', name: 'Tomás Herrera' },
];

const nameOf = (memberId: string | null) => members.find((member) => member.id === memberId)?.name ?? '';

export default function ControlledValueAndText() {
  const id = useId();
  const [assignee, setAssignee] = useState<string | null>('lena');
  const [query, setQuery] = useState(nameOf('lena'));
  const matches = members.filter((member) => member.name.toLowerCase().includes(query.trim().toLowerCase()));

  const assign = (memberId: string | null) => {
    setAssignee(memberId);
    setQuery(nameOf(memberId));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Label htmlFor={id}>Assignee</Label>
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          <Button size='xs' variant='secondary' appearance='ghost' disabled={assignee === CURRENT_USER} onClick={() => assign(CURRENT_USER)}>
            Assign to me
          </Button>
          <Button size='xs' variant='secondary' appearance='ghost' disabled={assignee === null && query === ''} onClick={() => assign(null)}>
            Clear
          </Button>
        </div>
      </div>
      <Combobox value={assignee} onChangeValue={(next) => setAssignee(next)}>
        <TextField>
          <ComboboxInput id={id} placeholder='Search people' value={query} onChange={(event) => setQuery(event.target.value)} />
          <ComboboxTrigger aria-label='Show team members'>
            <ComboboxIcon />
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Team members'>
          {matches.map((member) => <ListboxOption key={member.id} value={member.id}>{member.name}</ListboxOption>)}
        </ComboboxListbox>
      </Combobox>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {assignee === null ? 'Unassigned: pick someone from the list.' : `Assigned to ${nameOf(assignee)}.`}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## The Value Turns Into Null While Typing

### Symptom

`onChangeValue` is called with `null` after an option was picked.

### Likely Cause

Editing or clearing the text drops the picked value, so the value never belongs to a text that no longer matches it. This is the intended behavior.

### How To Verify

- pick an option, then type or delete one character
- log the calls of `onChangeValue`

### Fix

Treat `null` as "nothing picked yet". When the form needs an option, check the value on submit and ask the user to pick one.

## The Typed Text Stays After Leaving The Field

### Symptom

The user types text that matches no option, moves the focus away, and the text stays in the input.

### Likely Cause

Like a native `datalist`, the combobox does not revert or complete the text on blur. The app decides what a text without a picked option means.

### How To Verify

- type a partial text and press `Tab`
- check that `value` is `null`

### Fix

Validate the picked value on submit, or clear or restore the text yourself in `onBlur` when the product needs it.

<!-- example: combobox/pick-required-error.tsx -->
```tsx
import { Button, Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, HelperText, Label, ListboxOption, Text, TextField } from '@vega-ui/react';
import { FormEvent, useId, useRef, useState } from 'react';

const airports = [
  { code: 'AMS', name: 'Amsterdam Schiphol' },
  { code: 'BCN', name: 'Barcelona El Prat' },
  { code: 'CDG', name: 'Paris Charles de Gaulle' },
  { code: 'FCO', name: 'Rome Fiumicino' },
  { code: 'FRA', name: 'Frankfurt' },
  { code: 'LHR', name: 'London Heathrow' },
  { code: 'LIS', name: 'Lisbon Humberto Delgado' },
  { code: 'MUC', name: 'Munich' },
];

export default function PickRequiredError() {
  const id = useId();
  const messageId = `${id}-message`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [airport, setAirport] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);
  const [booked, setBooked] = useState('');
  const normalized = query.trim().toLowerCase();
  const matches = airports.filter((item) => item.name.toLowerCase().includes(normalized) || item.code.toLowerCase().startsWith(normalized));

  const onChangeValue = (next: string | null) => {
    setAirport(next);
    if (next !== null) setInvalid(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (airport === null) {
      setInvalid(true);
      inputRef.current?.focus();
      return;
    }

    setBooked(`Searching flights from ${airport}.`);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>From</Label>
      <Combobox value={airport} onChangeValue={onChangeValue}>
        <TextField>
          <ComboboxInput
            id={id}
            ref={inputRef}
            placeholder='City or airport code'
            aria-invalid={invalid}
            aria-describedby={messageId}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxTrigger aria-label='Show airports'>
            <ComboboxIcon />
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Airports'>
          {matches.map((item) => (
            <ListboxOption key={item.code} value={item.code} label={item.name} style={{ gap: 'var(--spacing-8)' }}>
              {item.name}
              <span style={{ marginInlineStart: 'auto', opacity: 0.7 }}>{item.code}</span>
            </ListboxOption>
          ))}
        </ComboboxListbox>
      </Combobox>
      <HelperText id={messageId} invalid={invalid}>
        {invalid ? 'Pick an airport from the list.' : 'Type a city or a three-letter code.'}
      </HelperText>
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Search flights</Button>
      {booked && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
          {booked}
        </Text>
      )}
    </form>
  );
}
```
<!-- /example -->

## The Picked Value Is Missing From The Submitted Form

### Symptom

`FormData` has the text of the field, but not the id of the picked option.

### Likely Cause

`name` on `ComboboxInput` submits the text. The root renders no hidden input for the value.

### How To Verify

- submit the form and inspect `FormData`
- look for an input that holds the value

### Fix

Render `<input type='hidden'>` with the picked value from your state next to `Combobox`.

## The List Opens Below The Helper Text

### Symptom

The list appears lower than the input, or wider than it, with a gap that grows with the content under the field.

### Likely Cause

The list is positioned under the root `Combobox` and is at least as wide as it. A `Label`, `HelperText` or another element inside the root makes the root larger than the field.

### How To Verify

- inspect the root element and compare its box with the `TextField`
- check what else is rendered inside `Combobox`

### Fix

Keep only `TextField` and `ComboboxListbox` inside `Combobox`, and put the label and helper text around it.

## Picking An Option Writes The Wrong Text

### Symptom

The input receives the email, the code or the badge text of an option along with its name.

### Likely Cause

Without `label`, the written text is the whole text content of the option.

### How To Verify

- inspect the text content of the option
- check whether `ListboxOption` has a `label`

### Fix

Pass `label` with the plain text that should be written into the input.

## Enter Submits The Form Instead Of Picking

### Symptom

Pressing `Enter` in an open list submits the surrounding form.

### Likely Cause

No option is active. Typing opens the list without an active option, and `Enter` then behaves as in any text field.

### How To Verify

- check whether the input has `aria-activedescendant` before `Enter`

### Fix

Press `ArrowDown` to reach an option first. When submitting without a pick must not happen, disable the submit button or check the value on submit.

## The Trigger Opens A List Of One Option

### Symptom

After a pick, `ComboboxTrigger` opens a list with only the picked option.

### Likely Cause

The text is now the label of the picked option, and the app filters by it. This is the intended behavior and matches the WAI-ARIA examples: the list matches the text.

### How To Verify

- pick an option, press the trigger and count the options

### Fix

Clear the text to see every option, for example with `Escape` twice. An app may render every option while the picked value is not `null`, at the cost of a list that no longer matches the text.

## Completion Leaves Only One Option In The List

### Symptom

With `autocomplete='both'`, typing a letter completes the text, but the list shows only the completed option and `ArrowDown` has nowhere to go, or the list changes as the arrows move.

### Likely Cause

The app filters by the whole text of the input, which now includes the completed rest, written by typing or by the arrow keys.

### How To Verify

- log `event.target.value` and the selection in `onChange` after typing one letter or pressing `ArrowDown`

### Fix

Filter by the typed part, the way to filter in `both` and `inline`: when the selection runs to the end of the text, use the text before `selectionStart`.

```tsx
import type { ChangeEvent } from 'react';

const onChange = (event: ChangeEvent<HTMLInputElement>) => {
  const { value, selectionStart, selectionEnd } = event.target;

  setText(value);
  setQuery(selectionEnd === value.length ? value.slice(0, selectionStart ?? undefined) : value);
};
```

 See [Basic: inline completion](./examples.md#basic-inline-completion).
