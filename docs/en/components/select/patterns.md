# Select Patterns

## Searchable Select

When to use:

- the option list is long
- users need text filtering before making a choice
- keeping the field compact still matters

Composition notes:

- render a text input inside `SelectListbox`
- disable built-in typeahead with `typeahead={false}`
- filter the rendered `SelectOption` list from external state
- pass the selected label to `SelectValue` as children: a filtered-out option is not rendered, so there is nothing to copy
- handle Enter in the search field yourself (here it picks the first match), because arrow keys and Enter on the list only work while the trigger has focus

Trade-offs:

- improves discoverability for long lists
- increases keyboard complexity compared with a plain select

<!-- example: select/searchable-select.tsx -->
```tsx
import {
  Label,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { KeyboardEvent, useId, useRef, useState } from 'react';

const countries = [
  { code: 'AR', name: 'Argentina' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BR', name: 'Brazil' },
  { code: 'CA', name: 'Canada' },
  { code: 'CL', name: 'Chile' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IN', name: 'India' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IT', name: 'Italy' },
  { code: 'JP', name: 'Japan' },
  { code: 'MX', name: 'Mexico' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NO', name: 'Norway' },
  { code: 'PT', name: 'Portugal' },
  { code: 'ES', name: 'Spain' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
];

export default function SearchableSelect() {
  const id = useId();
  const comboboxRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const matches = countries.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase()));
  const selected = countries.find((item) => item.code === country);

  const changeOpen = (next: boolean) => {
    setOpen(next);
    if (!next) setQuery('');
  };

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;

    event.preventDefault();
    const first = matches[0];
    if (!first) return;

    setCountry(first.code);
    changeOpen(false);
    comboboxRef.current?.focus();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Country of residence</Label>
      <Select
        typeahead={false}
        open={open}
        onChangeOpen={changeOpen}
        value={country}
        onChangeValue={(next) => setCountry(next ?? null)}
      >
        <SelectHiddenSelect name='country' />
        <SelectCombobox id={id} ref={comboboxRef}>
          <SelectValue placeholder='Choose a country'>{selected?.name}</SelectValue>
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox style={{ minWidth: 260 }}>
          <TextField size='sm'>
            <TextFieldInput
              aria-label='Search countries'
              placeholder='Search'
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              onKeyDown={onSearchKeyDown}
            />
          </TextField>
          {matches.map((item) => (
            <SelectOption key={item.code} value={item.code}>
              {item.name}
            </SelectOption>
          ))}
          {matches.length === 0 && (
            <Text size={2} role='status' style={{ padding: 'var(--spacing-6)', color: 'var(--label-secondary)' }}>
              No countries match “{query}”.
            </Text>
          )}
        </SelectListbox>
      </Select>
    </div>
  );
}
```
<!-- /example -->

## Clearable Controlled Select

When to use:

- the selected value can be reset
- the field must sync with URL state, filters, or external form logic

Composition notes:

- store selection in React state
- pass `value` and `onChangeValue`
- provide a separate clear action that sets `null`, not `undefined`

Trade-offs:

- keeps state explicit and predictable
- adds parent-state complexity compared with uncontrolled usage

<!-- example: select/controlled-value-with-clear-action.tsx -->
```tsx
import {
  Button,
  Label,
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const priorities = [
  { value: 'low', label: 'Low', response: 'within 3 business days' },
  { value: 'normal', label: 'Normal', response: 'within 1 business day' },
  { value: 'urgent', label: 'Urgent', response: 'within 1 hour' },
];

export default function ControlledValueWithClearAction() {
  const id = useId();
  const [priority, setPriority] = useState<string | null>('normal');
  const current = priorities.find((item) => item.value === priority);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 340 }}>
      <Label htmlFor={id}>Priority</Label>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Select style={{ flex: 1 }} value={priority} onChangeValue={(next) => setPriority(next ?? null)}>
          <SelectCombobox id={id}>
            <SelectValue placeholder='Not set' />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            {priorities.map((item) => (
              <SelectOption key={item.value} value={item.value}>
                {item.label}
              </SelectOption>
            ))}
          </SelectListbox>
        </Select>
        <Button
          variant='secondary'
          appearance='ghost'
          disabled={priority === null}
          onClick={() => setPriority(null)}
        >
          Clear
        </Button>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-2)' }}>
        {current ? `First response ${current.response}.` : 'No priority: the ticket waits in the general queue.'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Select Inside Overlay

When to use:

- a modal, drawer, or sheet contains a single-choice field
- the listbox must coexist with another overlay system

Composition notes:

- render `Select` normally inside the overlay content
- no portal is needed: the listbox renders in the top layer above the overlay
- retest focus restoration and dismissal in the real overlay

Trade-offs:

- preserves normal field behavior inside overlays
- requires more integration testing than isolated component usage

<!-- example: select/select-inside-dialog.tsx -->
```tsx
import type { CSSProperties, FormEvent } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Label,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

export default function SelectInsideDialog() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [exported, setExported] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setExported(`Exporting the Q3 report as ${data.get('format')}.`);
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <Dialog open={open} onChangeOpen={setOpen}>
        <DialogTrigger asChild>
          <Button>Export report</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={`${id}-title`}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={`${id}-title`} as='h2' size={4} fontWeight={600}>Export Q3 report</Heading>
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
            <Label htmlFor={id}>File format</Label>
            <Select defaultValue='xlsx'>
              <SelectHiddenSelect name='format' />
              <SelectCombobox id={id}>
                <SelectValue />
                <SelectIcon />
              </SelectCombobox>
              <SelectListbox>
                <SelectOption value='xlsx'>Excel workbook (.xlsx)</SelectOption>
                <SelectOption value='csv'>Comma-separated values (.csv)</SelectOption>
                <SelectOption value='pdf'>PDF document (.pdf)</SelectOption>
              </SelectListbox>
            </Select>
            <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Export</Button>
          </form>
        </DialogContent>
      </Dialog>
      {exported && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{exported}</Text>}
    </div>
  );
}
```
<!-- /example -->

## Inline Sentence Select

When to use:

- the control belongs inside readable sentence-like copy
- the choice is lightweight and should feel embedded

Composition notes:

- use `variant='inline'`
- surround the field with meaningful text
- avoid using inline variant without context
- give the trigger its own `aria-label`: the sentence around it is not a label

Trade-offs:

- feels lightweight and embedded
- depends on surrounding copy for clarity and labeling

<!-- example: select/inline-variant-inside-sentence-like-ui.tsx -->
```tsx
import {
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
} from '@vega-ui/react';

export default function InlineVariantInsideSentenceLikeUi() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', flexWrap: 'wrap', width: '100%' }}>
      <Text size={3}>Email me a digest</Text>
      <Select variant='inline' defaultValue='weekly'>
        <SelectHiddenSelect name='digest' />
        <SelectCombobox aria-label='Summary frequency'>
          <SelectValue />
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          <SelectOption value='daily'>every day</SelectOption>
          <SelectOption value='weekly'>every Monday</SelectOption>
          <SelectOption value='monthly'>on the 1st of the month</SelectOption>
          <SelectOption value='never'>never</SelectOption>
        </SelectListbox>
      </Select>
    </div>
  );
}
```
<!-- /example -->

## Rich Option Content

When to use:

- options need iconography or secondary copy
- visual scanning matters more than minimal row density

Composition notes:

- keep the `value` scalar
- make the whole option row the selectable unit
- do not split the option into multiple interactive controls
- pass `label` so typeahead matches the name, and a short `SelectValue` child so the trigger does not copy the whole row
- options have a fixed height, so multi-line content needs `height: 'auto'` on the option

Trade-offs:

- improves scanability for complex choices
- increases row height and semantic complexity

<!-- example: select/rich-option-content.tsx -->
```tsx
import {
  Label,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const plans = [
  { value: 'starter', name: 'Starter', price: '$0', description: 'Up to 3 projects and 1 GB of storage' },
  { value: 'team', name: 'Team', price: '$12 per seat', description: 'Unlimited projects, shared workspaces' },
  { value: 'enterprise', name: 'Enterprise', price: 'Custom', description: 'SSO, audit log and a dedicated manager' },
];

export default function RichOptionContent() {
  const id = useId();
  const [plan, setPlan] = useState<string | null>('team');
  const selected = plans.find((item) => item.value === plan);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 340 }}>
      <Label htmlFor={id}>Plan</Label>
      <Select value={plan} onChangeValue={(next) => setPlan(next ?? null)}>
        <SelectHiddenSelect name='plan' />
        <SelectCombobox id={id}>
          <SelectValue placeholder='Choose a plan'>{selected?.name}</SelectValue>
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          {plans.map((item) => (
            <SelectOption
              key={item.value}
              value={item.value}
              label={item.name}
              style={{ height: 'auto', paddingBlock: 'var(--spacing-6)' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
                <Text size={3} fontWeight={500}>
                  {item.name} · {item.price}
                </Text>
                <Text size={2} style={{ opacity: 0.75 }}>{item.description}</Text>
              </div>
            </SelectOption>
          ))}
        </SelectListbox>
      </Select>
    </div>
  );
}
```
<!-- /example -->

## Native Form Select

When to use:

- the selected value should be submitted through normal form mechanisms
- the integration relies on `FormData`

Composition notes:

- include `SelectHiddenSelect`
- keep the select inside the form boundary

Trade-offs:

- improves native form interoperability
- adds one more required part to the composition

<!-- example: select/native-form-participation.tsx -->
```tsx
import {
  Button,
  Label,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function NativeFormParticipation() {
  const planId = useId();
  const cycleId = useId();
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(`plan=${data.get('plan')}, cycle=${data.get('cycle')}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={planId}>Plan</Label>
        <Select defaultValue='team'>
          <SelectHiddenSelect name='plan' />
          <SelectCombobox id={planId}>
            <SelectValue />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='starter'>Starter</SelectOption>
            <SelectOption value='team'>Team</SelectOption>
            <SelectOption value='enterprise'>Enterprise</SelectOption>
          </SelectListbox>
        </Select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={cycleId}>Billing cycle</Label>
        <Select defaultValue='yearly'>
          <SelectHiddenSelect name='cycle' />
          <SelectCombobox id={cycleId}>
            <SelectValue />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='monthly'>Monthly</SelectOption>
            <SelectOption value='yearly'>Yearly, 2 months free</SelectOption>
          </SelectListbox>
        </Select>
      </div>
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-4)' }}>Continue to payment</Button>
      {submitted && (
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>
          Submitted: {submitted}
        </Text>
      )}
    </form>
  );
}
```
<!-- /example -->

Notes:

- without `SelectHiddenSelect`, the control may still render correctly but the native form contract is weaker

## Custom Icon

When to use:

- the trigger icon should hint at the kind of value, not only at the list
- the default chevron does not fit the surrounding UI

Composition notes:

- pass your icon as children of `SelectIcon`; they replace the default chevron
- keep `SelectIcon` inside `SelectCombobox`, after `SelectValue`

Trade-offs:

- adds meaning to the trigger at a glance
- a non-chevron icon makes it less obvious that the field opens a list

<!-- example: select/custom-icon.tsx -->
```tsx
import {
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';
import { GlobeIcon } from '@vega-ui/icons';

export default function CustomIcon() {
  return (
    <Select defaultValue='en' style={{ width: 180 }}>
      <SelectCombobox aria-label='Language'>
        <SelectValue />
        <SelectIcon>
          <GlobeIcon />
        </SelectIcon>
      </SelectCombobox>
      <SelectListbox>
        <SelectOption value='en'>English</SelectOption>
        <SelectOption value='fr'>French</SelectOption>
        <SelectOption value='ja'>Japanese</SelectOption>
      </SelectListbox>
    </Select>
  );
}
```
<!-- /example -->
