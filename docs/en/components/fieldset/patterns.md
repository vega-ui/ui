# Fieldset Patterns

## Settings Section

When to use:

- a settings screen contains several related toggles
- the group should read as one preference area

Composition notes:

- keep `FieldsetLegend` short and stable
- use `FieldsetHeader` for extra guidance
- render the actual toggles directly after the header

Trade-offs:

- improves semantic grouping and scanability
- adds more vertical structure than a loose list of controls

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

## Transparent Group In Existing Panel

When to use:

- the parent layout already provides the visible container
- only the grouping semantics are missing

Composition notes:

- switch to `appearance='transparent'`
- keep the legend even when border and padding are removed

Trade-offs:

- preserves semantics without duplicating containers
- makes the group boundary depend on surrounding layout

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

## Grouped Validation Copy

When to use:

- several related controls fail one business rule
- the error belongs to the group rather than a single input

Composition notes:

- keep the legend as the stable group name
- place the message right after the legend and reference it from the fieldset with `aria-describedby`
- let child controls still render their own local state if needed

Trade-offs:

- clarifies group-level validation
- can become noisy if every child control also repeats the same message

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

## Header With Action

When to use:

- the group has an action that affects all of its fields, such as autofill or reset

Composition notes:

- keep `FieldsetLegend` the first child, so it names the group
- put the helper copy and the `Button` in `FieldsetHeader`, with `type='button'` so it does not submit the form

Trade-offs:

- the action sits next to the fields it changes
- a disabled fieldset disables the action too

<!-- example: fieldset/header-with-action.tsx -->
```tsx
import {
  Button,
  Fieldset,
  FieldsetHeader,
  FieldsetLegend,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const BILLING = { street: 'Unter den Linden 21', city: 'Berlin', postalCode: '10117' };

export default function HeaderWithAction() {
  const id = useId();
  const [address, setAddress] = useState({ street: '', city: '', postalCode: '' });

  const change = (field: keyof typeof address, value: string) => {
    setAddress({ ...address, [field]: value });
  };

  return (
    <Fieldset appearance='outlined' style={{ gap: 'var(--spacing-8)', width: '100%' }}>
      <FieldsetLegend>Shipping address</FieldsetLegend>
      <FieldsetHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
        <Text size={2} style={{ flex: 1, minWidth: 0, color: 'var(--label-secondary)' }}>Where should we send the hardware?</Text>
        <Button type='button' size='xs' variant='secondary' appearance='ghost' onClick={() => setAddress(BILLING)} style={{ flexShrink: 0 }}>
          Copy billing address
        </Button>
      </FieldsetHeader>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-street`}>Street</Label>
        <TextField>
          <TextFieldInput
            id={`${id}-street`}
            name='street'
            autoComplete='shipping street-address'
            value={address.street}
            onChange={(event) => change('street', event.currentTarget.value)}
          />
        </TextField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-city`}>City</Label>
        <TextField>
          <TextFieldInput
            id={`${id}-city`}
            name='city'
            autoComplete='shipping address-level2'
            value={address.city}
            onChange={(event) => change('city', event.currentTarget.value)}
          />
        </TextField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-postal`}>Postal code</Label>
        <TextField>
          <TextFieldInput
            id={`${id}-postal`}
            name='postalCode'
            autoComplete='shipping postal-code'
            value={address.postalCode}
            onChange={(event) => change('postalCode', event.currentTarget.value)}
          />
        </TextField>
      </div>
    </Fieldset>
  );
}
```
<!-- /example -->
