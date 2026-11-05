# Listbox Patterns

## Filterable List

When to use:

- the list is long, but the options should stay visible while the user narrows them down
- several choices are made from the same set, such as labels or tags

Composition notes:

- render a `TextField` above the list and point it at the list with `aria-controls`
- filter the rendered `ListboxOption` elements from your own state: the list reads options from the DOM, so nothing needs to be registered
- keep the selection outside the filter, so choices hidden by the query stay selected
- when nothing matches, hide the list and show a message with `role='status'` instead of an empty box

Trade-offs:

- the filter and the list are two tab stops, so arrow keys work only after the user tabs into the list
- the list needs a `maxHeight`, or it grows with every option the filter lets through

<!-- example: listbox/filtered-options.tsx -->
```tsx
import { Listbox, ListboxOption, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useId, useState } from 'react';

const labels = [
  'bug', 'feature', 'documentation', 'design', 'performance', 'security',
  'accessibility', 'good first issue', 'help wanted', 'needs triage', 'wontfix', 'duplicate',
];

export default function FilteredOptions() {
  const id = useId();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>(['bug']);

  const matches = labels.filter((label) => label.includes(query.trim().toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: 300 }}>
      <TextField size='sm'>
        <TextFieldInput
          aria-label='Filter labels'
          aria-controls={id}
          placeholder='Filter labels'
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
      </TextField>
      <Listbox
        id={id}
        aria-label='Labels'
        multiple
        value={selected}
        onChangeValue={setSelected}
        style={{ display: matches.length === 0 ? 'none' : undefined, maxHeight: 220, border: '1px solid var(--separator-opaque)' }}
      >
        {matches.map((label) => (
          <ListboxOption key={label} value={label}>
            {label}
          </ListboxOption>
        ))}
      </Listbox>
      {matches.length === 0 && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>No labels match “{query}”.</Text>
      )}
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Selected: {selected.join(', ') || 'none'}</Text>
    </div>
  );
}
```
<!-- /example -->

## Selection Submitted With A Form

When to use:

- the always visible list is part of a form that posts its data
- the form has a reset button that should restore the initial choice

Composition notes:

- keep the value in state with `value` and `onChangeValue`
- render one `<input type='hidden'>` per selected value with the field `name`
- restore the initial state in the form `onReset`, because the list does not listen to the form

Trade-offs:

- the form reads the same state the list shows, so the two cannot drift apart
- every list in a form needs this wiring; for a compact field that submits by itself, use [Select](../select/) with `SelectHiddenSelect`

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

## Required Choice

When to use:

- the form must not continue until one option is chosen
- the list starts without a selection

Composition notes:

- start from `value={null}` and check it in the form `onSubmit`
- set `aria-invalid` on the list and link the message with `aria-describedby` only while the error is shown
- clear the error in `onChangeValue`, as soon as the user chooses

Trade-offs:

- the message is announced together with the list name when the user returns to it
- the list has no error style of its own, so the message carries the error

<!-- example: listbox/explain-an-empty-required-choice.tsx -->
```tsx
import { Button, HelperText, Listbox, ListboxOption, Text } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function ExplainAnEmptyRequiredChoice() {
  const id = useId();
  const errorId = `${id}-error`;
  const [plan, setPlan] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);
  const [done, setDone] = useState(false);

  const onChangeValue = (next: string | undefined) => {
    setPlan(next ?? null);
    setInvalid(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (plan === null) {
      setInvalid(true);
      return;
    }

    setDone(true);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Text id={`${id}-label`} size={3} fontWeight={500}>Workspace plan</Text>
      <Listbox
        aria-labelledby={`${id}-label`}
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
        value={plan}
        onChangeValue={onChangeValue}
        style={{ border: '1px solid var(--separator-opaque)' }}
      >
        <ListboxOption value='free'>Free, up to 3 members</ListboxOption>
        <ListboxOption value='team'>Team, $12 per member</ListboxOption>
        <ListboxOption value='business'>Business, $24 per member</ListboxOption>
      </Listbox>
      {invalid && <HelperText id={errorId} error>Choose a plan to create the workspace.</HelperText>}
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Create workspace</Button>
      {done && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-4)' }}>
          Workspace created on the {plan} plan.
        </Text>
      )}
    </form>
  );
}
```
<!-- /example -->

## Grouped Scrolling List

When to use:

- options fall into categories the user scans by, such as countries or teams
- the list is too long to show in full

Composition notes:

- wrap each category in `ListboxGroup` and name it with `aria-labelledby` pointing at its heading
- give the list a `maxHeight`: it scrolls by itself and keeps the active option in view
- pass `label` to options with extra markup, so typeahead matches the name

Trade-offs:

- headings make long lists easier to scan
- headings are not options, so arrow keys skip them and typeahead does not match them

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

## List Controlled By Another Setting

When to use:

- the choice only matters when another setting allows it, such as a manual override of an automatic default

Composition notes:

- pass `disabled` from the state of the other control
- keep the value while the list is disabled, so turning the setting off restores the previous choice

Trade-offs:

- users see the choices they would get, even while they cannot pick one
- a disabled list leaves the tab order, so it cannot be focused to read its options with the keyboard

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
