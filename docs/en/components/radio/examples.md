# Radio Examples

## Basic

### Basic: choice group in a fieldset

`Radio` is a bare native `input[type='radio']`, so each one is wrapped in a `<label>` with its text. Radios with the same `name` form one group: only one can be checked, and arrow keys move between them. `Fieldset` with a legend names the group.

<!-- example: radio/labeled-radio-option.tsx -->
```tsx
import { Fieldset, FieldsetLegend, Radio } from '@vega-ui/react';

const methods = [
  { value: 'standard', label: 'Standard · 5–7 business days · Free' },
  { value: 'express', label: 'Express · 2–3 business days · $9.90' },
  { value: 'overnight', label: 'Overnight · next business day · $24.00' },
];

export default function LabeledRadioOption() {
  return (
    <Fieldset>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Shipping method</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        {methods.map((method) => (
          <label key={method.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <Radio name='shipping' value={method.value} defaultChecked={method.value === 'standard'} />
            {method.label}
          </label>
        ))}
      </div>
    </Fieldset>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: selected value in the parent

The parent stores the selected value and passes `checked={cycle === item.value}` to every radio; `onChange` reads `event.currentTarget.value`. The price below is computed from the same state.

<!-- example: radio/parent-owned-selected-plan.tsx -->
```tsx
import { useState } from 'react';
import { Fieldset, FieldsetLegend, Radio, Text } from '@vega-ui/react';

const cycles = [
  { value: 'monthly', label: 'Monthly', perMonth: 15 },
  { value: 'yearly', label: 'Yearly (2 months free)', perMonth: 12.5 },
];

export default function ParentOwnedSelectedPlan() {
  const [cycle, setCycle] = useState('yearly');

  const selected = cycles.find((item) => item.value === cycle) ?? cycles[0];
  const seats = 8;
  const total = selected.perMonth * seats;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Billing cycle</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          {cycles.map((item) => (
            <label key={item.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <Radio
                name='billing-cycle'
                value={item.value}
                checked={cycle === item.value}
                onChange={(event) => setCycle(event.currentTarget.value)}
              />
              {item.label}
            </label>
          ))}
        </div>
      </Fieldset>
      <Text size={3} aria-live='polite' style={{ fontVariantNumeric: 'tabular-nums' }}>
        {seats} seats × ${selected.perMonth.toFixed(2)} = <strong>${total.toFixed(2)}</strong> per month
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: required group and FormData

`required` on the radios makes the whole group required, so the browser blocks submit until one is chosen. `FormData.get('size')` returns the checked `value`; reset clears the selection.

<!-- example: radio/form-data-submission.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import { Button, Fieldset, FieldsetLegend, Radio, Text } from '@vega-ui/react';

const sizes = [
  { value: 's-2vcpu-4gb', label: '2 vCPU · 4 GB RAM · $24/mo' },
  { value: 's-4vcpu-8gb', label: '4 vCPU · 8 GB RAM · $48/mo' },
  { value: 's-8vcpu-16gb', label: '8 vCPU · 16 GB RAM · $96/mo' },
];

export default function FormDataSubmission() {
  const [result, setResult] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`size=${data.get('size')}`);
  };

  return (
    <form onSubmit={handleSubmit} onReset={() => setResult('')} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Server size</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          {sizes.map((size) => (
            <label key={size.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <Radio name='size' value={size.value} required />
              {size.label}
            </label>
          ))}
        </div>
      </Fieldset>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Button type='submit'>Create server</Button>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        </div>
        <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>{result}</Text>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: choice inside a dialog

The radios live in a `form method='dialog'`: saving reads `FormData`, updates the value outside and closes the dialog. Reopening starts from the saved value because the content remounts.

<!-- example: radio/radio-choice-in-overlays.tsx -->
```tsx
import { CSSProperties, FormEvent, useState } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Fieldset,
  FieldsetLegend,
  Heading,
  Icon,
  IconButton,
  Radio,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const environments = [
  { value: 'preview', label: 'Preview' },
  { value: 'staging', label: 'Staging' },
  { value: 'production', label: 'Production' },
];

export default function RadioChoiceInOverlays() {
  const [environment, setEnvironment] = useState('staging');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    setEnvironment(String(data.get('environment')));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)', width: '100%' }}>
      <Text size={3}>Deploy target: <strong>{environment}</strong></Text>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Change</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby='deploy-target-title'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id='deploy-target-title' as='h2' size={4} fontWeight={600}>Deploy target</Heading>
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
          <form method='dialog' onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}>
            <Fieldset>
              <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Environment</FieldsetLegend>
              <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
                {environments.map((item) => (
                  <label key={item.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                    <Radio name='environment' value={item.value} defaultChecked={item.value === environment} />
                    {item.label}
                  </label>
                ))}
              </div>
            </Fieldset>
            <Button type='submit'>Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```
<!-- /example -->

## Error

### Error: required group without a selection

The `invalid` event of the required radios replaces the browser bubble: the error is linked to the `Fieldset` through `aria-describedby`, the radios get `aria-invalid`, and focus moves to the first option. Choosing any option clears the error.

<!-- example: radio/missing-required-radio-selection.tsx -->
```tsx
import { FormEvent, useRef, useState } from 'react';
import { Button, Fieldset, FieldsetLegend, HelperText, Radio } from '@vega-ui/react';

const reasons = [
  { value: 'price', label: 'It is too expensive' },
  { value: 'features', label: 'It is missing features I need' },
  { value: 'switching', label: 'I am switching to another product' },
  { value: 'other', label: 'Other' },
];

export default function MissingRequiredRadioSelection() {
  const [invalid, setInvalid] = useState(false);
  const [done, setDone] = useState(false);
  const firstRef = useRef<HTMLInputElement>(null);

  const handleInvalid = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    firstRef.current?.focus();
    setInvalid(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDone(true);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <Fieldset style={{ width: '100%' }} aria-describedby={invalid ? 'cancel-reason-error' : undefined}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Why are you cancelling?</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          {reasons.map((reason, index) => (
            <label key={reason.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <Radio
                ref={index === 0 ? firstRef : undefined}
                name='reason'
                value={reason.value}
                required
                aria-invalid={invalid}
                onInvalid={handleInvalid}
                onChange={() => setInvalid(false)}
              />
              {reason.label}
            </label>
          ))}
        </div>
        {invalid && <HelperText id='cancel-reason-error' error>Choose a reason to continue.</HelperText>}
      </Fieldset>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start' }}>
        <Button type='submit'>Cancel subscription</Button>
        {done && <HelperText aria-live='polite'>Your subscription ends on the last day of this billing period.</HelperText>}
      </div>
    </form>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: disabled option and disabled group

A single unavailable option is `disabled` and explains why through `aria-describedby`. A `Fieldset disabled` disables every radio inside natively. The label text is dimmed by the example, because `Radio` only styles the input. Disabled radios are not submitted.

<!-- example: radio/disabled-option.tsx -->
```tsx
import { Fieldset, FieldsetLegend, HelperText, Radio } from '@vega-ui/react';

export default function DisabledOption() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Data region</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <Radio name='region' value='eu' defaultChecked />
            European Union (Frankfurt)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <Radio name='region' value='us' />
            United States (Virginia)
          </label>
          <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', color: 'var(--label-tertiary)' }}>
              <Radio name='region' value='au' disabled aria-describedby='region-au-note' />
              Australia (Sydney)
            </label>
            <HelperText id='region-au-note' style={{ paddingInlineStart: 'var(--spacing-12)' }}>Opens in Q3. Join the waitlist in Settings → Regions.</HelperText>
          </div>
        </div>
      </Fieldset>
      <Fieldset disabled aria-describedby='backups-note'>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-2)' }}>Backup frequency</FieldsetLegend>
        <HelperText id='backups-note'>Managed by your organization policy.</HelperText>
        <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', color: 'var(--label-tertiary)' }}>
            <Radio name='backups' value='daily' defaultChecked />
            Daily
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', color: 'var(--label-tertiary)' }}>
            <Radio name='backups' value='hourly' />
            Hourly
          </label>
        </div>
      </Fieldset>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: options with long descriptions

When each option has a description, the label is linked with `htmlFor`/`id`, the description through `aria-describedby`, and the radio is aligned to the first line with `flex-start` and `flex-shrink: 0` so long text does not squeeze it.

<!-- example: radio/options-with-descriptions.tsx -->
```tsx
import { Fieldset, FieldsetLegend, Radio, Text } from '@vega-ui/react';

const policies = [
  {
    value: 'anyone',
    label: 'Anyone with the link',
    description: 'People outside your organization can open shared documents without signing in.',
  },
  {
    value: 'organization',
    label: 'People in Acme Corp',
    description: 'Only signed-in members of your organization can open shared documents.',
  },
  {
    value: 'invited',
    label: 'Invited people only',
    description: 'Every document must be shared with each person by email. Existing links stop working.',
  },
];

export default function OptionsWithDescriptions() {
  return (
    <Fieldset style={{ width: '100%' }}>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Link sharing</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        {policies.map((policy) => (
          <div key={policy.value} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
            <Radio
              id={`sharing-${policy.value}`}
              name='sharing'
              value={policy.value}
              defaultChecked={policy.value === 'organization'}
              aria-describedby={`sharing-${policy.value}-description`}
              style={{ flexShrink: 0, marginBlockStart: 'var(--spacing-1)' }}
            />
            <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <label htmlFor={`sharing-${policy.value}`}>{policy.label}</label>
              <Text id={`sharing-${policy.value}-description`} size={2} style={{ color: 'var(--label-secondary)' }}>
                {policy.description}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </Fieldset>
  );
}
```
<!-- /example -->

### Edge: repeated groups need unique names

Every table row is its own group, so each row gets its own `name` built from the row id; a shared name would turn the whole table into one group. Radios without visible text get an `aria-label` that names both the row and the option.

<!-- example: radio/repeated-groups-unique-names.tsx -->
```tsx
import { useState } from 'react';
import { Radio, Table, TableBody, TableData, TableHead, TableHeading, TableRow } from '@vega-ui/react';

const members = [
  { id: 'u-201', name: 'Maya Chen' },
  { id: 'u-202', name: 'Lucas Ferreira' },
  { id: 'u-203', name: 'Aisha Okafor' },
];
const roles = ['viewer', 'editor', 'admin'];

export default function RepeatedGroupsUniqueNames() {
  const [assigned, setAssigned] = useState<Record<string, string>>({ 'u-201': 'admin', 'u-202': 'editor', 'u-203': 'viewer' });

  const assign = (memberId: string, role: string) => {
    setAssigned({ ...assigned, [memberId]: role });
  };

  return (
    <Table fullWidth>
      <TableHead>
        <TableRow>
          <TableHeading>Member</TableHeading>
          {roles.map((role) => (
            <TableHeading key={role} dataAlign='center' style={{ textTransform: 'capitalize' }}>{role}</TableHeading>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableData>{member.name}</TableData>
            {roles.map((role) => (
              <TableData key={role} dataAlign='center'>
                <Radio
                  name={`role-${member.id}`}
                  value={role}
                  aria-label={`${member.name}: ${role}`}
                  checked={assigned[member.id] === role}
                  onChange={() => assign(member.id, role)}
                />
              </TableData>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```
<!-- /example -->
