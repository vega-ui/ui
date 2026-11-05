# Fieldset Examples

## Basic

### Basic: notification channels

`FieldsetLegend` is the first child, so it names the group, and screen readers announce "Payment failure alerts" before each checkbox. The description in `FieldsetHeader` is linked to the group with `aria-describedby`.

<!-- example: fieldset/notification-channels.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetHeader,
  FieldsetLegend,
  Text,
} from '@vega-ui/react';
import { useId } from 'react';

const CHANNELS = [
  { value: 'email', label: 'Email', checked: true },
  { value: 'slack', label: 'Slack #billing-alerts', checked: true },
  { value: 'sms', label: 'SMS to the account owner', checked: false },
];

export default function NotificationChannels() {
  const id = useId();

  return (
    <Fieldset appearance='outlined' aria-describedby={`${id}-description`} style={{ width: '100%' }}>
      <FieldsetLegend>Payment failure alerts</FieldsetLegend>
      <FieldsetHeader>
        <Text id={`${id}-description`} size={2} style={{ color: 'var(--label-secondary)' }}>
          Sent when a card is declined or an invoice is overdue.
        </Text>
      </FieldsetHeader>
      {CHANNELS.map((channel) => (
        <Checkbox key={channel.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <CheckboxInput name='alertChannels' value={channel.value} defaultChecked={channel.checked} />
          <CheckboxIndicator>
            <CheckboxCheckedIcon />
          </CheckboxIndicator>
          {channel.label}
        </Checkbox>
      ))}
    </Fieldset>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: choice reveals a dependent group

A radio group in a transparent fieldset holds the delivery method in state, and the matching address or pickup group renders below it. Each dependent group has its own legend.

<!-- example: fieldset/delivery-method.tsx -->
```tsx
import {
  Fieldset,
  FieldsetLegend,
  Label,
  Radio,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { useId, useState } from 'react';

type Method = 'courier' | 'pickup';

const radioRowStyle = { display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' };

export default function DeliveryMethod() {
  const id = useId();
  const [method, setMethod] = useState<Method>('courier');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend>Delivery method</FieldsetLegend>
        <Label fontWeight={400} style={radioRowStyle}>
          <Radio name='method' value='courier' checked={method === 'courier'} onChange={() => setMethod('courier')} />
          Courier to your door, $7.90
        </Label>
        <Label fontWeight={400} style={radioRowStyle}>
          <Radio name='method' value='pickup' checked={method === 'pickup'} onChange={() => setMethod('pickup')} />
          Pickup point, free
        </Label>
      </Fieldset>
      {method === 'courier' && (
        <Fieldset appearance='outlined' style={{ gap: 'var(--spacing-8)' }}>
          <FieldsetLegend>Courier address</FieldsetLegend>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor={`${id}-street`}>Street and house number</Label>
            <TextField>
              <TextFieldInput id={`${id}-street`} name='street' autoComplete='shipping street-address' />
            </TextField>
          </div>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor={`${id}-city`}>City</Label>
            <TextField>
              <TextFieldInput id={`${id}-city`} name='city' autoComplete='shipping address-level2' />
            </TextField>
          </div>
        </Fieldset>
      )}
      {method === 'pickup' && (
        <Fieldset appearance='outlined' style={{ gap: 'var(--spacing-8)' }}>
          <FieldsetLegend>Pickup point</FieldsetLegend>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor={`${id}-postal`}>Postal code to search near</Label>
            <TextField>
              <TextFieldInput id={`${id}-postal`} name='pickupPostalCode' inputMode='numeric' autoComplete='postal-code' />
            </TextField>
          </div>
        </Fieldset>
      )}
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: settings form in sections

Several outlined fieldsets split one form into named sections. `FormData` reads every field across all sections on submit, and reset restores the defaults.

<!-- example: fieldset/settings-form-sections.tsx -->
```tsx
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetLegend,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

const checkboxStyle = { display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' };

export default function SettingsFormSections() {
  const id = useId();
  const [payload, setPayload] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setPayload(JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={onSubmit} onReset={() => setPayload('')} style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Fieldset appearance='outlined' style={{ gap: 'var(--spacing-8)' }}>
        <FieldsetLegend>Profile</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={`${id}-name`}>Display name</Label>
          <TextField>
            <TextFieldInput id={`${id}-name`} name='displayName' defaultValue='Priya Raman' required />
          </TextField>
        </div>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={`${id}-email`}>Email</Label>
          <TextField>
            <TextFieldInput id={`${id}-email`} name='email' type='email' defaultValue='priya@northwind.io' required />
          </TextField>
        </div>
      </Fieldset>
      <Fieldset appearance='outlined'>
        <FieldsetLegend>Security</FieldsetLegend>
        <Checkbox style={checkboxStyle}>
          <CheckboxInput name='twoFactor' defaultChecked />
          <CheckboxIndicator>
            <CheckboxCheckedIcon />
          </CheckboxIndicator>
          Two-factor authentication
        </Checkbox>
        <Checkbox style={checkboxStyle}>
          <CheckboxInput name='newDeviceAlerts' />
          <CheckboxIndicator>
            <CheckboxCheckedIcon />
          </CheckboxIndicator>
          Email me about sign-ins from new devices
        </Checkbox>
      </Fieldset>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-4)' }}>
        <Button type='submit'>Save settings</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Discard changes</Button>
      </div>
      <Text size={2} role='status' style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', fontFamily: 'monospace', color: 'var(--label-secondary)' }}>{payload}</Text>
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: transparent group in a dialog

The dialog already draws the container, so `appearance='transparent'` keeps the group semantics without a second border. Each switch is named by its own `Label`.

<!-- example: fieldset/privacy-settings-in-dialog.tsx -->
```tsx
import type { CSSProperties } from 'react';
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
  Label,
  Switch,
  SwitchIndicator,
  SwitchInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { useId } from 'react';

const SETTINGS = [
  { name: 'showEmail', label: 'Show my email to teammates', checked: true },
  { name: 'showActivity', label: 'Show when I was last active', checked: false },
  { name: 'searchable', label: 'Let people find me by phone number', checked: false },
];

const rowStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' };

export default function PrivacySettingsInDialog() {
  const id = useId();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Privacy settings</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={`${id}-title`} style={{ width: 'min(440px, 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={`${id}-title`} as='h2' size={4} fontWeight={600}>Privacy</Heading>
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
        <form method='dialog' style={{ display: 'grid', gap: 'var(--spacing-10)', marginBlockStart: 'var(--spacing-8)' }}>
          <Fieldset appearance='transparent'>
            <FieldsetLegend>Profile visibility</FieldsetLegend>
            {SETTINGS.map((setting) => (
              <div key={setting.name} style={rowStyle}>
                <Label htmlFor={`${id}-${setting.name}`} fontWeight={400}>{setting.label}</Label>
                <Switch style={{ flexShrink: 0 }}>
                  <SwitchInput id={`${id}-${setting.name}`} name={setting.name} defaultChecked={setting.checked} />
                  <SwitchIndicator />
                </Switch>
              </div>
            ))}
          </Fieldset>
          <Button type='submit' style={{ justifySelf: 'end' }}>Done</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

## Error

### Error: at least one option required

The rule belongs to the group, not to one checkbox, so the message sits right after the legend and the fieldset references it with `aria-describedby`. It appears on submit and clears as soon as one channel is checked. `aria-invalid` is not valid on a group, so it is not used.

<!-- example: fieldset/at-least-one-channel.tsx -->
```tsx
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetLegend,
  HelperText,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

const CHANNELS = ['Email', 'Push', 'SMS'];

export default function AtLeastOneChannel() {
  const id = useId();
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const invalid = submitted && selected.length === 0;

  const toggle = (channel: string) => {
    if (selected.includes(channel)) {
      setSelected(selected.filter((item) => item !== channel));
      return;
    }
    setSelected([...selected, channel]);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <Fieldset
        appearance='outlined'
        aria-describedby={`${id}-message`}
        style={invalid ? { borderColor: 'var(--color-error)' } : undefined}
      >
        <FieldsetLegend>Two-factor codes</FieldsetLegend>
        <HelperText id={`${id}-message`} error={invalid}>
          {invalid ? 'Choose at least one way to receive codes.' : 'Pick one or more channels.'}
        </HelperText>
        {CHANNELS.map((channel) => (
          <Checkbox key={channel} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <CheckboxInput
              name='codeChannels'
              value={channel}
              checked={selected.includes(channel)}
              onChange={() => toggle(channel)}
            />
            <CheckboxIndicator>
              <CheckboxCheckedIcon />
            </CheckboxIndicator>
            {channel}
          </Checkbox>
        ))}
      </Fieldset>
      <Button type='submit' style={{ justifySelf: 'start' }}>Turn on two-factor</Button>
    </form>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: inherited by every control

`disabled` on `Fieldset` disables every descendant control at once — text fields, number steppers and buttons — without passing props to each. Disabled fields are left out of `FormData`; submit to see which fields arrive.

<!-- example: fieldset/use-organization-defaults.tsx -->
```tsx
import {
  Button,
  Fieldset,
  FieldsetLegend,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Switch,
  SwitchIndicator,
  SwitchInput,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function UseOrganizationDefaults() {
  const id = useId();
  const [useDefaults, setUseDefaults] = useState(true);
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const keys = Array.from(new FormData(event.currentTarget).keys());
    setSubmitted(keys.join(', '));
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Switch>
          <SwitchInput
            id={`${id}-defaults`}
            name='useDefaults'
            checked={useDefaults}
            onChange={(event) => setUseDefaults(event.currentTarget.checked)}
          />
          <SwitchIndicator />
        </Switch>
        <Label htmlFor={`${id}-defaults`}>Use organization defaults</Label>
      </div>
      <Fieldset appearance='outlined' disabled={useDefaults} style={{ gap: 'var(--spacing-8)' }}>
        <FieldsetLegend>Session policy</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={`${id}-timeout`}>Idle timeout, minutes</Label>
          <NumberField min={5} max={720} step={5} defaultValue={30}>
            <NumberFieldDecrementButton aria-label='Decrease by 5 minutes' />
            <NumberFieldInput id={`${id}-timeout`} name='idleTimeout' />
            <NumberFieldIncrementButton aria-label='Increase by 5 minutes' />
          </NumberField>
        </div>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={`${id}-ranges`}>Allowed IP ranges</Label>
          <TextField>
            <TextFieldInput id={`${id}-ranges`} name='ipRanges' defaultValue='10.0.0.0/8, 192.168.1.0/24' />
          </TextField>
        </div>
        <Button type='button' variant='secondary' appearance='ghost' style={{ alignSelf: 'flex-start' }}>
          Sign out all sessions
        </Button>
      </Fieldset>
      <Button type='submit' style={{ justifySelf: 'start', marginBlockStart: 'var(--spacing-4)' }}>Save</Button>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{submitted === '' ? '' : `Submitted fields: ${submitted}`}</Text>
    </form>
  );
}
```
<!-- /example -->

## Edge

### Edge: nested groups

An inner fieldset with its own legend names a sub-question inside a larger section; screen readers announce both legends. Nest only when the scopes are clearly different.

<!-- example: fieldset/nested-groups.tsx -->
```tsx
import {
  Fieldset,
  FieldsetLegend,
  Label,
  Radio,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { useId } from 'react';

const WINDOWS = [
  { value: 'morning', label: 'Morning, 8:00–12:00' },
  { value: 'afternoon', label: 'Afternoon, 12:00–17:00' },
  { value: 'evening', label: 'Evening, 17:00–21:00' },
];

export default function NestedGroups() {
  const id = useId();

  return (
    <Fieldset appearance='outlined' style={{ gap: 'var(--spacing-8)', width: '100%' }}>
      <FieldsetLegend>Delivery to the office</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-company`}>Company and floor</Label>
        <TextField>
          <TextFieldInput id={`${id}-company`} name='company' defaultValue='Northwind, 4th floor' />
        </TextField>
      </div>
      <Fieldset>
        <FieldsetLegend size={3}>Delivery window</FieldsetLegend>
        {WINDOWS.map((window) => (
          <Label key={window.value} fontWeight={400} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <Radio name='window' value={window.value} defaultChecked={window.value === 'morning'} />
            {window.label}
          </Label>
        ))}
      </Fieldset>
    </Fieldset>
  );
}
```
<!-- /example -->
