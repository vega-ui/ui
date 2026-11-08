# Select Examples

## Basic

### Basic: field variant with a visible label

A visible `Label` points at the `SelectCombobox` by `id`, which gives the trigger its accessible name. Options are rendered from data, and the placeholder shows until the user picks a team.

<!-- example: select/field-variant.tsx -->
```tsx
import {
  Label,
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';
import { useId } from 'react';

const teams = [
  { value: 'billing', label: 'Billing' },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'platform', label: 'Platform reliability' },
  { value: 'security', label: 'Security & compliance' },
  { value: 'success', label: 'Customer success' },
];

export default function FieldVariant() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Route the ticket to</Label>
      <Select>
        <SelectCombobox id={id}>
          <SelectValue placeholder='Choose a team' />
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          {teams.map((team) => (
            <SelectOption key={team.value} value={team.value}>
              {team.label}
            </SelectOption>
          ))}
        </SelectListbox>
      </Select>
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: controlled value with clear action

The parent owns the priority and derives the response time from it. Clearing sets the value to `null`: `undefined` would switch the select to uncontrolled mode and keep the old selection.

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

### Controlled/Stateful: controlled open state

`open` and `onChangeOpen` let another control open the list. The button moves focus to the trigger first, so arrow keys and Enter work right away, and a hint is shown only while the list is open.

<!-- example: select/controlled-open-state.tsx -->
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
import { useId, useRef, useState } from 'react';

export default function ControlledOpenState() {
  const id = useId();
  const comboboxRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [reviewer, setReviewer] = useState<string | null>(null);

  const chooseReviewer = () => {
    comboboxRef.current?.focus();
    setOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Reviewer</Label>
      <Select
        open={open}
        onChangeOpen={setOpen}
        value={reviewer}
        onChangeValue={(next) => setReviewer(next ?? null)}
      >
        <SelectCombobox id={id} ref={comboboxRef}>
          <SelectValue placeholder='Nobody assigned' />
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          <SelectOption value='amara'>Amara Okafor</SelectOption>
          <SelectOption value='lucas'>Lucas Moreau</SelectOption>
          <SelectOption value='mei'>Mei Tanaka</SelectOption>
        </SelectListbox>
      </Select>
      {reviewer === null && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-2)' }}>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>Needs one review.</Text>
          <Button size='sm' variant='secondary' appearance='ghost' onClick={chooseReviewer} style={{ flexShrink: 0 }}>
            Choose reviewer
          </Button>
        </div>
      )}
      {open && (
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>
          Arrow keys move through the list, Enter picks, Escape closes.
        </Text>
      )}
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: native form participation

`SelectHiddenSelect` with a `name` puts each value into `FormData`, so the submit handler reads the selects like native fields. Each trigger keeps its own `Label`.

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

## Layout/Overlay

### Layout/Overlay: inline variant inside sentence-like UI

`variant='inline'` makes the select part of a sentence. The surrounding text is not a label, so the trigger gets its own `aria-label`.

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

### Layout/Overlay: select inside dialog

The list opens in the top layer above the modal dialog, so no portal is needed. The form inside the dialog reads the value with `FormData` and closes the dialog on submit.

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

### Layout/Overlay: one select per table row

Each row has its own select that updates one member in the parent state. Every trigger is named after its row, so a screen reader announces "Role of Mei Tanaka" instead of a list of identical "Role" fields.

<!-- example: select/select-in-table-rows.tsx -->
```tsx
import {
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

const initialMembers = [
  { id: 'u1', name: 'Amara Okafor', email: 'amara@northwind.io', role: 'owner' },
  { id: 'u2', name: 'Lucas Moreau', email: 'lucas@northwind.io', role: 'editor' },
  { id: 'u3', name: 'Mei Tanaka', email: 'mei@northwind.io', role: 'viewer' },
];

export default function SelectInTableRows() {
  const [members, setMembers] = useState(initialMembers);

  const changeRole = (id: string, role: string | null) => {
    if (role === null) return;
    setMembers((current) => current.map((member) => (member.id === id ? { ...member, role } : member)));
  };

  return (
    <Table fullWidth dataAlign='start'>
      <TableHead>
        <TableRow>
          <TableHeading>Member</TableHeading>
          <TableHeading>Role</TableHeading>
        </TableRow>
      </TableHead>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableData>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Text size={3}>{member.name}</Text>
                <Text size={2} style={{ color: 'var(--label-secondary)' }}>{member.email}</Text>
              </div>
            </TableData>
            <TableData>
              <Select
                size='sm'
                style={{ minWidth: 140 }}
                value={member.role}
                onChangeValue={(role) => changeRole(member.id, role)}
              >
                <SelectCombobox aria-label={`Role of ${member.name}`}>
                  <SelectValue />
                  <SelectIcon />
                </SelectCombobox>
                <SelectListbox>
                  <SelectOption value='owner'>Owner</SelectOption>
                  <SelectOption value='editor'>Editor</SelectOption>
                  <SelectOption value='viewer'>Viewer</SelectOption>
                </SelectListbox>
              </Select>
            </TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```
<!-- /example -->

## Error

### Error: required choice with a linked message

The form checks the value on submit, marks the trigger with `aria-invalid`, links the message through `aria-describedby` and moves focus back to the field. Picking any option clears the error.

<!-- example: select/select-required-error.tsx -->
```tsx
import {
  Button,
  HelperText,
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
import { FormEvent, useId, useRef, useState } from 'react';

export default function SelectRequiredError() {
  const id = useId();
  const errorId = `${id}-error`;
  const comboboxRef = useRef<HTMLButtonElement>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);
  const [sent, setSent] = useState(false);

  const onChangeValue = (next: string | null) => {
    setReason(next);
    setInvalid(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (reason === null) {
      setInvalid(true);
      comboboxRef.current?.focus();
      return;
    }

    setSent(true);
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}
    >
      <Label htmlFor={id}>Why are you cancelling?</Label>
      <Select value={reason} onChangeValue={onChangeValue}>
        <SelectHiddenSelect name='reason' />
        <SelectCombobox
          id={id}
          ref={comboboxRef}
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
        >
          <SelectValue placeholder='Choose a reason' />
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          <SelectOption value='price'>It is too expensive</SelectOption>
          <SelectOption value='features'>Missing features I need</SelectOption>
          <SelectOption value='switching'>Switching to another tool</SelectOption>
          <SelectOption value='other'>Something else</SelectOption>
        </SelectListbox>
      </Select>
      {invalid && (
        <HelperText id={errorId} error>
          Choose a reason so we can route your feedback.
        </HelperText>
      )}
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>
        Cancel subscription
      </Button>
      {sent && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-4)' }}>
          Your subscription ends on the last day of the billing period.
        </Text>
      )}
    </form>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: inherited from a fieldset

The trigger is a native button, so a disabled `Fieldset` disables it and its hidden select together: the field cannot be opened and is left out of `FormData`. The switch toggles that state.

<!-- example: select/fully-disabled-field.tsx -->
```tsx
import {
  Fieldset,
  Label,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Switch,
  SwitchIndicator,
  SwitchInput,
} from '@vega-ui/react';
import { useId, useState } from 'react';

export default function FullyDisabledField() {
  const switchId = useId();
  const selectId = useId();
  const [useDefault, setUseDefault] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Switch>
          <SwitchInput
            id={switchId}
            checked={useDefault}
            onChange={(event) => setUseDefault(event.currentTarget.checked)}
          />
          <SwitchIndicator />
        </Switch>
        <Label htmlFor={switchId}>Use workspace calendar settings</Label>
      </div>
      <Fieldset
        disabled={useDefault}
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}
      >
        <Label htmlFor={selectId}>Week starts on</Label>
        <Select defaultValue='monday'>
          <SelectHiddenSelect name='weekStart' />
          <SelectCombobox id={selectId}>
            <SelectValue />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='saturday'>Saturday</SelectOption>
            <SelectOption value='sunday'>Sunday</SelectOption>
            <SelectOption value='monday'>Monday</SelectOption>
          </SelectListbox>
        </Select>
      </Fieldset>
    </div>
  );
}
```
<!-- /example -->

### Disabled: read-only value with an explanation

`readOnly` keeps the trigger focusable and the value submitted, but the list does not open. The reason is linked to the trigger with `aria-describedby`.

<!-- example: select/read-only-field.tsx -->
```tsx
import {
  HelperText,
  Label,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';
import { useId } from 'react';

export default function ReadOnlyField() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Billing currency</Label>
      <Select readOnly defaultValue='eur'>
        <SelectHiddenSelect name='currency' />
        <SelectCombobox id={id} aria-describedby={hintId}>
          <SelectValue />
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          <SelectOption value='usd'>US dollar (USD)</SelectOption>
          <SelectOption value='eur'>Euro (EUR)</SelectOption>
          <SelectOption value='gbp'>Pound sterling (GBP)</SelectOption>
        </SelectListbox>
      </Select>
      <HelperText id={hintId}>
        Locked after the first invoice. Contact support to change it.
      </HelperText>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: hundreds of options

288 time slots in five-minute steps. The list scrolls by itself, opens on the selected option, and typeahead jumps to a slot: type "14" to reach 14:00.

<!-- example: select/long-scrollable-option-list.tsx -->
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
} from '@vega-ui/react';
import { useId } from 'react';

const slots = Array.from({ length: 24 * 12 }, (_, index) => {
  const hours = String(Math.floor(index / 12)).padStart(2, '0');
  const minutes = String((index % 12) * 5).padStart(2, '0');
  return `${hours}:${minutes}`;
});

export default function LongScrollableOptionList() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 200 }}>
      <Label htmlFor={id}>Send the reminder at</Label>
      <Select defaultValue='09:00'>
        <SelectHiddenSelect name='reminderTime' />
        <SelectCombobox id={id}>
          <SelectValue />
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          {slots.map((slot) => (
            <SelectOption key={slot} value={slot}>
              {slot}
            </SelectOption>
          ))}
        </SelectListbox>
      </Select>
    </div>
  );
}
```
<!-- /example -->

### Edge: short value text for long options

Without children `SelectValue` copies the selected option on the client. Children replace that copy, so long options can keep a short trigger, and they also render on the server; the placeholder still shows while nothing is selected.

<!-- example: select/custom-value-text.tsx -->
```tsx
import {
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';
import { useState } from 'react';

export default function CustomValueText() {
  const [currency, setCurrency] = useState<string | null>('EUR');

  return (
    <Select style={{ width: 120 }} value={currency} onChangeValue={(next) => setCurrency(next ?? null)}>
      <SelectCombobox aria-label='Currency'>
        <SelectValue placeholder='Currency'>{currency}</SelectValue>
        <SelectIcon />
      </SelectCombobox>
      <SelectListbox>
        <SelectOption value='USD'>United States dollar (USD)</SelectOption>
        <SelectOption value='EUR'>Euro (EUR)</SelectOption>
        <SelectOption value='JPY'>Japanese yen (JPY)</SelectOption>
        <SelectOption value='CHF'>Swiss franc (CHF)</SelectOption>
      </SelectListbox>
    </Select>
  );
}
```
<!-- /example -->

### Edge: options loaded when the list opens

The projects are fetched on the first open, with `aria-busy` and a spinner while they load. The saved selection is not among the rendered options yet, so its name is passed to `SelectValue` as children.

<!-- example: select/async-options.tsx -->
```tsx
import {
  Label,
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Spinner,
  Text,
} from '@vega-ui/react';
import { useId, useState } from 'react';

interface Project {
  id: string;
  name: string;
}

const fetchProjects = () => new Promise<Project[]>((resolve) => {
  setTimeout(() => resolve([
    { id: 'apollo', name: 'Apollo website' },
    { id: 'borealis', name: 'Borealis mobile app' },
    { id: 'cobalt', name: 'Cobalt billing API' },
    { id: 'delta', name: 'Delta data warehouse' },
  ]), 1200);
});

export default function AsyncOptions() {
  const id = useId();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<Project | null>({ id: 'apollo', name: 'Apollo website' });

  const onChangeOpen = (open: boolean) => {
    if (!open || projects !== null || loading) return;

    setLoading(true);
    fetchProjects().then((result) => {
      setProjects(result);
      setLoading(false);
    });
  };

  const onChangeValue = (next: string | null) => {
    const found = projects?.find((item) => item.id === next);
    setProject(found ?? null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Move the task to</Label>
      <Select value={project?.id ?? null} onChangeValue={onChangeValue} onChangeOpen={onChangeOpen}>
        <SelectCombobox id={id}>
          <SelectValue placeholder='Choose a project'>{project?.name}</SelectValue>
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox aria-busy={loading}>
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', padding: 'var(--spacing-6)' }}>
              <Spinner size={2} aria-label='Loading projects' />
              <Text size={2}>Loading projects…</Text>
            </div>
          )}
          {projects?.map((item) => (
            <SelectOption key={item.id} value={item.id}>
              {item.name}
            </SelectOption>
          ))}
        </SelectListbox>
      </Select>
    </div>
  );
}
```
<!-- /example -->
