# Select Troubleshooting

## Selected Value Is Not Submitted With The Form

### Symptom

The control renders and updates visually, but the selected value is missing from native form submission.

### Likely Cause

`SelectHiddenSelect` is missing from the composition.

### How To Verify

- submit the surrounding form
- inspect the resulting `FormData`
- confirm that the expected field name or value is absent

### Fix

Render `SelectHiddenSelect` with a `name` inside the root `Select`.

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

## The Select Works Visually But Keyboard Behavior Feels Broken In A Dialog

### Symptom

The select opens, but focus movement, close behavior, or keyboard navigation feels inconsistent inside an overlay.

### Likely Cause

The composed overlay behavior was validated in isolation but not retested inside `Dialog`, `Drawer`, or `Sheet`.

### How To Verify

- render the exact integration inside the real overlay
- test open, close, focus return, and option navigation from the keyboard

### Fix

- keep the standard `Select` composition intact
- retest with the real overlay stack
- avoid custom trigger or option structures that interfere with focus flow

## The Placeholder Never Appears

### Symptom

`placeholder` is configured, but the trigger always shows some other content.

### Likely Cause

An initial value is already selected, or custom `SelectValue` children always render content.

### How To Verify

- remove `value` and `defaultValue`
- remove custom children from `SelectValue`
- check whether the placeholder becomes visible

### Fix

- use `placeholder` only when no selected value is present
- ensure custom value rendering respects the empty state

## Clearing The Value Does Not Update The UI

### Symptom

The parent clears the value logically, but the UI still shows the old selection.

### Likely Cause

The parent sets the value to `undefined`. In `Select`, `undefined` means uncontrolled, so the component falls back to its own internal state, which still holds an old selection; `null` is the controlled empty value.

### How To Verify

- inspect the current `value` prop
- confirm whether `onChangeValue` updates the same source of truth

### Fix

Clear the controlled value with `null` and convert the `undefined` that `onChangeValue` can report: `onChangeValue={(next) => setValue(next ?? null)}`.

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

## Options Render Correctly But Selection Does Not Change

### Symptom

Options are visible and clickable, but the selected value does not update as expected.

### Likely Cause

`SelectOption` values do not match the expected scalar value model, or custom option composition broke the selectable row.

### How To Verify

- confirm each `SelectOption` has a `string` or `number` value
- check whether the whole option row remains the selectable unit

### Fix

- keep option values scalar
- avoid splitting one option into multiple competing interactive elements

## Read-Only And Disabled Behave Differently Than Expected

### Symptom

The control state looks right visually, but focusability or interaction does not match product expectations.

### Likely Cause

`readOnly` and `disabled` were treated as visual variants rather than behavior variants.

### How To Verify

- test focusability and interaction in both states
- confirm whether the control should still receive focus

### Fix

- use `disabled` when interaction must stop entirely
- use `readOnly` when the field should remain focusable but immutable

## Object Values Cause Type Or Behavior Problems

### Symptom

Type errors, unstable selection, or mismatched values appear when passing full objects as option values.

### Likely Cause

The public API is built for `string` and `number` values, not object payloads.

### How To Verify

- inspect the `value` passed to `Select`
- confirm whether `SelectOption value={...}` is scalar

### Fix

Store a scalar key in `Select` and resolve the full object in the parent layer.

## The Select Looks Correct But The Composition Still Feels Fragile

### Symptom

The component appears to work, but small customization changes keep breaking behavior.

### Likely Cause

Too much behavior was pushed into custom wrappers instead of the shipped parts.

### How To Verify

- compare the current composition to the standard layout in `index.md` and `anatomy.md`
- remove custom wrappers incrementally

### Fix

- return to the standard composition first
- reintroduce custom wrappers only where the built-in parts are insufficient
- use `useSelectContext` only for advanced cases
