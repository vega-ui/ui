# Forms and validation

Vega UI fields are native form controls, so a plain `<form>` submits them, validates them and resets them without extra state.

## Native Inputs Do The Work

Every field part renders a real element: `TextFieldInput`, `PasswordFieldInput`, `NumberFieldInput`, `PhoneFieldInput`, `DateFieldInput` and `TimeFieldInput` are `<input>`, `TextArea` is a `<textarea>`, `Radio` is an `<input type="radio">`, and `CheckboxInput`, `SwitchInput`, `SegmentedControlItemInput` and `SliderThumbInput` are the inputs inside their components. `PinField` keeps the code in one visually hidden input behind its slots.

That gives forms the browser behavior for free:

- `name`, `value`, `required`, `pattern`, `min`, `max`, `minLength` and `autoComplete` go on the input part, exactly as on the native element
- `new FormData(form)` reads the values, and a submit without `preventDefault()` posts them like any HTML form
- `Button` has no default `type`, so inside a form it submits like a native `<button>`; pass `type='button'` for buttons that should not
- the browser autofill, password managers and the `form` attribute work on the inputs as usual

<!-- example: text-field/profile-form-submit.tsx -->
```tsx
import { Button, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function ProfileFormSubmit() {
  const id = useId();
  const [saved, setSaved] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaved(`${data.get('fullName')} <${data.get('email')}>`);
  };

  return (
    <form
      onSubmit={onSubmit}
      onReset={() => setSaved('')}
      style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}
    >
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-name`}>Full name</Label>
        <TextField>
          <TextFieldInput id={`${id}-name`} name='fullName' autoComplete='name' defaultValue='Ada Lovelace' required />
        </TextField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-email`}>Email</Label>
        <TextField>
          <TextFieldInput id={`${id}-email`} name='email' type='email' autoComplete='email' required />
        </TextField>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-4)' }}>
        <Button type='submit'>Save profile</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{saved === '' ? '' : `Saved: ${saved}`}</Text>
    </form>
  );
}
```
<!-- /example -->

## What Each Field Submits

A native input submits the text it shows. For most fields that is the value itself; a few components keep a different value on the root:

| Component | Submitted with `name` on the input | Value on the root |
| --- | --- | --- |
| `TextField`, `TextArea`, `PasswordField` | the typed text | — |
| `NumberField` | the formatted text, for example `2 500` | `value` / `defaultValue` as a number, `NaN` when empty |
| `DateField`, `DateRangeField`, `DateTimeField`, `TimeField` | the typed text in `format`, for example `15.01.2026` | ISO `value` / `defaultValue`, see [Dates and calendar systems](./i18n.md#date-values) |
| `Checkbox`, `Radio`, `Switch`, `SegmentedControl` | `value` of each checked input | — |
| `Slider` | each thumb value; `name` on the root applies to every thumb | `value` / `defaultValue` as an array |
| `Select` | the selected value, through `SelectHiddenSelect` with a `name` | `value` / `defaultValue` |

When the server expects the root value rather than the shown text, mirror it into a hidden input from `onChangeValue`. The [DateField example](./components/date-field/examples.md) submits the ISO day this way. `Listbox` has no form part at all: render one hidden input per selected value, as in [Listbox in a form](./components/listbox/examples.md).

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

## Constraint Validation

`required`, `pattern`, `type='email'`, `min` and `max` on the input parts block the submit and fill `input.validity`, the same as on native inputs. The browser shows its own message bubble unless you take over:

- listen to `onInvalid` on the input and call `event.preventDefault()` to hide the bubble, then read `event.currentTarget.validity` to pick your message
- or put `noValidate` on the form and check the values yourself in `onSubmit`

The error look is opt-in and never derived from validity. Pass `error` to the field root (`TextField`, `TextArea`, `NumberField`, `PinField`) and to `HelperText` to switch them to the error colors. The library does not set ARIA for you: set `aria-invalid` on the input and point `aria-describedby` at the `HelperText` that carries the message.

<!-- example: helper-text/native-validity-message.tsx -->
```tsx
import { Button, HelperText, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

const getMessage = (input: HTMLInputElement) => {
  if (input.validity.valueMissing) return 'Enter a postal code.';
  if (input.validity.patternMismatch) return 'Use 5 digits, for example 10115.';
  return '';
};

export default function NativeValidityMessage() {
  const id = useId();
  const [error, setError] = useState('');
  const invalid = error !== '';

  const onInvalid = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setError(getMessage(event.currentTarget));
  };

  const onInput = (event: FormEvent<HTMLInputElement>) => {
    if (!invalid) return;
    setError(getMessage(event.currentTarget));
  };

  return (
    <form onSubmit={(event) => event.preventDefault()} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Postal code</Label>
        <TextField error={invalid}>
          <TextFieldInput
            id={id}
            name='postalCode'
            inputMode='numeric'
            autoComplete='postal-code'
            required
            pattern='\d{5}'
            aria-invalid={invalid}
            aria-describedby={invalid ? `${id}-error ${id}-hint` : `${id}-hint`}
            onInvalid={onInvalid}
            onInput={onInput}
          />
        </TextField>
        {invalid && <HelperText id={`${id}-error`} error>{error}</HelperText>}
        <HelperText id={`${id}-hint`}>We deliver within Germany only.</HelperText>
      </div>
      <Button type='submit' style={{ justifySelf: 'start' }}>Check delivery</Button>
    </form>
  );
}
```
<!-- /example -->

Controls without a native constraint, such as a `Select` without a choice, are validated in `onSubmit`: keep the error in state, set `aria-invalid` on `SelectCombobox`, and move focus to it. See [Select required error](./components/select/examples.md).

## Disabling A Group

`Fieldset` renders a native `<fieldset>`, so `disabled` on it disables every control inside by browser rules: the inputs stop taking focus and input, and disabled controls are left out of `FormData`. Put a reason next to the group with `HelperText` instead of disabling silently.

<!-- example: checkbox/disabled-by-fieldset.tsx -->
```tsx
import { useState } from 'react';
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetLegend,
  HelperText,
} from '@vega-ui/react';

const channels = [
  { value: 'email', label: 'Email' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS' },
];

export default function DisabledByFieldset() {
  const [useDefaults, setUseDefaults] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput checked={useDefaults} onChange={(event) => setUseDefaults(event.currentTarget.checked)} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Use workspace defaults
      </Checkbox>
      <Fieldset disabled={useDefaults}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Delivery channels</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          {channels.map((channel) => (
            <Checkbox key={channel.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <CheckboxInput name='channels' value={channel.value} defaultChecked={channel.value === 'email'} />
              <CheckboxIndicator>
                <CheckboxCheckedIcon />
                <CheckboxIndeterminateIcon />
              </CheckboxIndicator>
              {channel.label}
            </Checkbox>
          ))}
          <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
            <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <CheckboxInput defaultChecked disabled aria-describedby='security-alerts-note' />
              <CheckboxIndicator>
                <CheckboxCheckedIcon />
                <CheckboxIndeterminateIcon />
              </CheckboxIndicator>
              Security alerts
            </Checkbox>
            <HelperText id='security-alerts-note' style={{ paddingInlineStart: 'var(--spacing-12)' }}>Required by your organization and cannot be turned off.</HelperText>
          </div>
        </div>
      </Fieldset>
    </div>
  );
}
```
<!-- /example -->

## Reset

A `<button type='reset'>` restores every uncontrolled field to its default:

- native parts return to `defaultValue` or `defaultChecked`
- `NumberField`, `PhoneField`, `PinField`, `DateField`, `DateRangeField`, `DateTimeField`, `TimeField` and `Slider` restore the `defaultValue` of their root, also for a form linked with the `form` attribute
- a controlled field keeps its `value`, because the parent owns it: reset that state in `onReset` on the form

`onReset` is also the place to clear submit results and error messages kept in state.

## Checklist

- Give every submitted input a `name`; a field without one is not in `FormData`.
- Keep validation rules on the input parts, so the browser, autofill and the server see the same constraints.
- Wire `aria-invalid` and `aria-describedby` yourself, and pass `error` only as the visual state.
- Use `Fieldset` with `disabled` for a group, not `disabled` on each control.
- Check the same rules on the server: client validation is a convenience, not a guarantee.
