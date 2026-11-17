# Combobox Examples

## Basic

### Basic: search with a message when nothing matches

The text lives in state and the app renders only the languages that contain it. The list opens on typing and hides by itself while nothing matches, and the helper text next to the field says so. It is a `role='status'` element linked to the input through `aria-describedby`, so screen readers announce the change.

<!-- example: combobox/no-results-message.tsx -->
```tsx
import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, HelperText, Label, ListboxOption, TextField } from '@vega-ui/react';
import { useId, useState } from 'react';

const languages = [
  'Arabic', 'Bengali', 'Chinese', 'Dutch', 'English', 'French', 'German', 'Hindi', 'Indonesian', 'Italian',
  'Japanese', 'Korean', 'Polish', 'Portuguese', 'Russian', 'Spanish', 'Swahili', 'Turkish', 'Ukrainian', 'Vietnamese',
];

export default function NoResultsMessage() {
  const id = useId();
  const statusId = `${id}-status`;
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLowerCase();
  const matches = languages.filter((language) => language.toLowerCase().includes(normalized));
  const empty = normalized !== '' && matches.length === 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Subtitles</Label>
      <Combobox>
        <TextField>
          <ComboboxInput
            id={id}
            placeholder='Search languages'
            aria-describedby={statusId}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxTrigger aria-label='Show languages'>
            <ComboboxIcon />
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Languages'>
          {matches.map((language) => <ListboxOption key={language} value={language}>{language}</ListboxOption>)}
        </ComboboxListbox>
      </Combobox>
      <HelperText id={statusId} role='status'>
        {empty ? `No subtitles in “${query.trim()}” yet. Try another language.` : 'Subtitles are available in 20 languages.'}
      </HelperText>
    </div>
  );
}
```
<!-- /example -->

### Basic: inline completion

With `autocomplete='both'`, typing writes the first state that starts with the text, in its own casing, and selects the completed rest. `ArrowDown` and `ArrowUp` write the reached state into the field and select the part after what was typed. `Enter` or leaving the field accepts the completion, `Backspace` removes it, and `Escape` puts back what was typed. The app filters by the typed part, the text before the selected rest, which is the way to filter in `both` and `inline`: the other matching states stay in the list while the completion changes. With `autocomplete='inline'` the text is completed the same way, but typing leaves the list closed.

<!-- example: combobox/inline-completion.tsx -->
```tsx
import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, HelperText, Label, ListboxOption, TextField } from '@vega-ui/react';
import { ChangeEvent, useId, useState } from 'react';

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
];

export default function InlineCompletion() {
  const id = useId();
  const hintId = `${id}-hint`;
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [state, setState] = useState<string | null>(null);
  const matches = states.filter((name) => name.toLowerCase().startsWith(query.toLowerCase()));

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart, selectionEnd } = event.target;

    setText(value);
    setQuery(selectionEnd === value.length ? value.slice(0, selectionStart ?? undefined) : value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>State</Label>
      <Combobox autocomplete='both' value={state} onChangeValue={(next) => setState(next)}>
        <TextField>
          <ComboboxInput id={id} aria-describedby={hintId} value={text} onChange={onChange} />
          <ComboboxTrigger aria-label='Show states'>
            <ComboboxIcon />
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='States'>
          {matches.map((name) => <ListboxOption key={name} value={name}>{name}</ListboxOption>)}
        </ComboboxListbox>
      </Combobox>
      <HelperText id={hintId}>
        {state === null ? 'Type the first letters, then press Enter or Tab to accept.' : `Shipping rates for ${state}.`}
      </HelperText>
    </div>
  );
}
```
<!-- /example -->

### Basic: suggestions that do not filter

With `autocomplete='none'` the options stay the same whatever is typed, and the app renders all of them. The field takes any text: an option is a shortcut for a common one, and its label is written into the input when it is picked. Nothing is kept in state, because `name` submits the text.

<!-- example: combobox/fixed-suggestions.tsx -->
```tsx
import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, HelperText, Label, ListboxOption, TextField } from '@vega-ui/react';
import { useId } from 'react';

const lengths = ['15 minutes', '30 minutes', '45 minutes', '1 hour', '90 minutes', '2 hours'];

export default function FixedSuggestions() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Meeting length</Label>
      <Combobox autocomplete='none'>
        <TextField>
          <ComboboxInput id={id} name='length' placeholder='For example, 50 minutes' aria-describedby={hintId} />
          <ComboboxTrigger aria-label='Show lengths'>
            <ComboboxIcon />
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Common lengths'>
          {lengths.map((length) => <ListboxOption key={length} value={length}>{length}</ListboxOption>)}
        </ComboboxListbox>
      </Combobox>
      <HelperText id={hintId}>Pick a common length or type your own.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: value and text set by the app

The parent owns both the picked member and the text. "Assign to me" and "Clear" set the value and the text together, because a `value` from the parent never rewrites the input. Editing the text calls `onChangeValue(null)`, so the summary below shows "Unassigned" until an option is picked again.

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

## Form/Integration

### Form/Integration: text and value in a form

`name='country'` on the input submits the text, and `required` asks for it natively. The country code is mirrored into a hidden input rendered by the app, since the root renders none. `Enter` without an active option submits the form like in any text field.

<!-- example: combobox/native-form-participation.tsx -->
```tsx
import { Button, Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, Label, ListboxOption, Text, TextField } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

const countries = [
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'CZ', name: 'Czechia' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IT', name: 'Italy' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'PL', name: 'Poland' },
  { code: 'ES', name: 'Spain' },
];

export default function NativeFormParticipation() {
  const id = useId();
  const [query, setQuery] = useState('');
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState('');
  const matches = countries.filter((country) => country.name.toLowerCase().startsWith(query.trim().toLowerCase()));

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(`country=${data.get('country')}, countryCode=${data.get('countryCode') || '(none)'}`);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Ship to</Label>
      <Combobox value={countryCode} onChangeValue={(next) => setCountryCode(next)}>
        <TextField>
          <ComboboxInput
            id={id}
            name='country'
            required
            placeholder='Country'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxTrigger aria-label='Show countries'>
            <ComboboxIcon />
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Countries'>
          {matches.map((country) => <ListboxOption key={country.code} value={country.code}>{country.name}</ListboxOption>)}
        </ComboboxListbox>
      </Combobox>
      <input type='hidden' name='countryCode' value={countryCode ?? ''} />
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Continue</Button>
      {submitted && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
          Submitted: {submitted}
        </Text>
      )}
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: combobox inside a dialog

The list opens in the top layer above the modal dialog. `Escape` first closes the list, a second `Escape` clears the text, and only then does it reach the dialog and close it.

<!-- example: combobox/combobox-inside-dialog.tsx -->
```tsx
import type { CSSProperties, FormEvent } from 'react';
import {
  Button,
  Combobox,
  ComboboxIcon,
  ComboboxInput,
  ComboboxListbox,
  ComboboxTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Label,
  ListboxOption,
  Text,
  TextField,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const reviewers = ['Ana Silva', 'Kenji Watanabe', 'Lena Fischer', 'Omar Haddad', 'Priya Natarajan', 'Tomás Herrera'];

export default function ComboboxInsideDialog() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [reviewer, setReviewer] = useState<string | null>(null);
  const [requested, setRequested] = useState('');
  const matches = reviewers.filter((name) => name.toLowerCase().includes(query.trim().toLowerCase()));

  const onChangeOpen = (next: boolean) => {
    setOpen(next);
    if (!next) return;

    setQuery('');
    setReviewer(null);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (reviewer === null) return;

    setRequested(`Review requested from ${reviewer}.`);
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <Dialog open={open} onChangeOpen={onChangeOpen}>
        <DialogTrigger asChild>
          <Button>Request review</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={`${id}-title`}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={`${id}-title`} as='h2' size={4} fontWeight={600}>Request a review</Heading>
            <DialogClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          <form
            onSubmit={onSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-12)' }}
          >
            <Label htmlFor={id}>Reviewer</Label>
            <Combobox value={reviewer} onChangeValue={(next) => setReviewer(next)}>
              <TextField>
                <ComboboxInput id={id} placeholder='Search people' value={query} onChange={(event) => setQuery(event.target.value)} />
                <ComboboxTrigger aria-label='Show people'>
                  <ComboboxIcon />
                </ComboboxTrigger>
              </TextField>
              <ComboboxListbox aria-label='People'>
                {matches.map((name) => <ListboxOption key={name} value={name}>{name}</ListboxOption>)}
              </ComboboxListbox>
            </Combobox>
            <Button type='submit' disabled={reviewer === null} style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>
              Request
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {requested && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{requested}</Text>}
    </div>
  );
}
```
<!-- /example -->

### Layout/Overlay: grouped options

Each region is a `ListboxGroup` named by its heading, and a region is left out while none of its cities match. The arrow keys move across the groups as one list. `label` keeps the UTC offset out of the text written into the input.

<!-- example: combobox/grouped-options.tsx -->
```tsx
import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, Label, ListboxGroup, ListboxOption, Text, TextField } from '@vega-ui/react';
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
          <ComboboxTrigger aria-label='Show time zones'>
            <ComboboxIcon />
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

## Error

### Error: a typed text that was never picked

The form checks the picked value, not the text: an airport typed but not picked leaves `value` at `null`. On submit the input gets `aria-invalid`, the helper text turns into the error through `aria-describedby`, and the focus returns to the input. Picking an airport clears the error.

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

## Disabled

### Disabled: read-only and disabled fields

Neither list depends on the text, so both roots set `autocomplete='none'`. A read-only combobox keeps the input focusable and its text submits with the form, but the list stays closed. A disabled one disables the input, so it is skipped by `Tab` and left out of `FormData`. The trigger is disabled in both. Each field explains why it cannot be changed.

<!-- example: combobox/disabled-and-read-only.tsx -->
```tsx
import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, HelperText, Label, ListboxOption, TextField } from '@vega-ui/react';
import { useId } from 'react';

const regions = [
  { value: 'eu-central', label: 'Frankfurt (eu-central)' },
  { value: 'eu-west', label: 'Dublin (eu-west)' },
  { value: 'us-east', label: 'Virginia (us-east)' },
];

const owners = [
  { value: 'finance', label: 'Finance team' },
  { value: 'platform', label: 'Platform team' },
];

export default function DisabledAndReadOnly() {
  const id = useId();
  const regionId = `${id}-region`;
  const ownerId = `${id}-owner`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={regionId}>Data region</Label>
        <Combobox autocomplete='none' readOnly defaultValue='eu-central'>
          <TextField>
            <ComboboxInput id={regionId} name='region' defaultValue='Frankfurt (eu-central)' aria-describedby={`${regionId}-hint`} />
            <ComboboxTrigger aria-label='Show regions'>
              <ComboboxIcon />
            </ComboboxTrigger>
          </TextField>
          <ComboboxListbox aria-label='Regions'>
            {regions.map((region) => <ListboxOption key={region.value} value={region.value}>{region.label}</ListboxOption>)}
          </ComboboxListbox>
        </Combobox>
        <HelperText id={`${regionId}-hint`}>Fixed when the workspace was created. It still submits with the form.</HelperText>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={ownerId}>Cost owner</Label>
        <Combobox autocomplete='none' disabled defaultValue='finance'>
          <TextField>
            <ComboboxInput id={ownerId} name='owner' defaultValue='Finance team' aria-describedby={`${ownerId}-hint`} />
            <ComboboxTrigger aria-label='Show teams'>
              <ComboboxIcon />
            </ComboboxTrigger>
          </TextField>
          <ComboboxListbox aria-label='Teams'>
            {owners.map((owner) => <ListboxOption key={owner.value} value={owner.value}>{owner.label}</ListboxOption>)}
          </ComboboxListbox>
        </Combobox>
        <HelperText id={`${ownerId}-hint`}>Only workspace admins can change the cost owner.</HelperText>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: suggestions loaded from a server

The search starts after two letters and a short pause. While it runs, a spinner sits inside the field and the status below says so; the list itself only ever holds options, so it stays hidden until results arrive. After a pick no search is made, and editing the text starts a new one. The trigger reopens the results for the current text, for example after `Escape` closed the list.

<!-- example: combobox/async-suggestions.tsx -->
```tsx
import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, HelperText, Label, ListboxOption, Spinner, TextField } from '@vega-ui/react';
import { useEffect, useId, useState } from 'react';

interface City {
  id: string;
  name: string;
  country: string;
}

interface SearchResult {
  query: string;
  cities: City[];
}

const CITIES: City[] = [
  { id: 'ber', name: 'Berlin', country: 'Germany' },
  { id: 'bern', name: 'Bern', country: 'Switzerland' },
  { id: 'bil', name: 'Bilbao', country: 'Spain' },
  { id: 'bol', name: 'Bologna', country: 'Italy' },
  { id: 'bor', name: 'Bordeaux', country: 'France' },
  { id: 'bra', name: 'Bratislava', country: 'Slovakia' },
  { id: 'bru', name: 'Brussels', country: 'Belgium' },
  { id: 'bud', name: 'Budapest', country: 'Hungary' },
  { id: 'gen', name: 'Geneva', country: 'Switzerland' },
  { id: 'gla', name: 'Glasgow', country: 'United Kingdom' },
  { id: 'gra', name: 'Granada', country: 'Spain' },
  { id: 'ham', name: 'Hamburg', country: 'Germany' },
  { id: 'hel', name: 'Helsinki', country: 'Finland' },
  { id: 'kra', name: 'Kraków', country: 'Poland' },
  { id: 'lyo', name: 'Lyon', country: 'France' },
  { id: 'mal', name: 'Málaga', country: 'Spain' },
  { id: 'mar', name: 'Marseille', country: 'France' },
  { id: 'mil', name: 'Milan', country: 'Italy' },
  { id: 'por', name: 'Porto', country: 'Portugal' },
  { id: 'val', name: 'Valencia', country: 'Spain' },
];

const searchCities = (text: string) => new Promise<City[]>((resolve) => {
  setTimeout(() => resolve(CITIES.filter((city) => city.name.toLowerCase().startsWith(text)).slice(0, 6)), 700);
});

const labelOf = (city: City) => `${city.name}, ${city.country}`;

export default function AsyncSuggestions() {
  const id = useId();
  const statusId = `${id}-status`;
  const [query, setQuery] = useState('');
  const [cityId, setCityId] = useState<string | null>(null);
  const [result, setResult] = useState<SearchResult | null>(null);
  const normalized = query.trim().toLowerCase();
  const searching = cityId === null && normalized.length >= 2;

  useEffect(() => {
    if (!searching) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      searchCities(normalized).then((cities) => {
        if (!cancelled) setResult({ query: normalized, cities });
      });
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [normalized, searching]);

  const fresh = result !== null && result.query === normalized;
  const loading = searching && !fresh;
  const suggestions = searching && result !== null && fresh ? result.cities : [];
  const picked = CITIES.find((city) => city.id === cityId);

  let message = 'Type at least 2 letters, for example “br”.';
  if (loading) message = 'Searching…';
  if (searching && fresh) message = suggestions.length === 0 ? `No cities start with “${query.trim()}”.` : `${suggestions.length} cities found.`;
  if (picked) message = `Meeting point: ${labelOf(picked)}.`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Meeting city</Label>
      <Combobox value={cityId} onChangeValue={(next) => setCityId(next)}>
        <TextField>
          <ComboboxInput
            id={id}
            placeholder='Search cities'
            spellCheck={false}
            aria-describedby={statusId}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {loading && <Spinner size={3} aria-label='Searching cities' />}
          <ComboboxTrigger aria-label='Show cities'>
            <ComboboxIcon />
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Cities'>
          {suggestions.map((city) => (
            <ListboxOption key={city.id} value={city.id} label={labelOf(city)} style={{ gap: 'var(--spacing-8)' }}>
              {city.name}
              <span style={{ marginInlineStart: 'auto', opacity: 0.7 }}>{city.country}</span>
            </ListboxOption>
          ))}
        </ComboboxListbox>
      </Combobox>
      <HelperText id={statusId} aria-live='polite'>{message}</HelperText>
    </div>
  );
}
```
<!-- /example -->

### Edge: rich option content with a label

Options show an avatar and an email, and `label` gives the plain name that is written into the input when the option is picked. The app filters by the name and the email. The input holds only text, so the avatar of the picked person is rendered by the app next to it in the `TextField`, from the picked value: editing the text sets the value to `null` and the avatar goes away. It is `aria-hidden`, because the name in the input already says who is picked.

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
