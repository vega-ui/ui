# Checkbox Patterns

## Independent Settings List

When to use:

- Several options can be enabled independently in the same form.

Composition notes:

- Keep each checkbox and its text in one label row.
- Give each `CheckboxInput` a `name` when the form submits natively.

Trade-offs:

- Strong form semantics.
- Can feel visually repetitive in long settings lists.

<!-- example: checkbox/labeled-checkbox.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetLegend,
} from '@vega-ui/react';

const options = [
  { value: 'mentions', label: 'Someone mentions me in a comment', checked: true },
  { value: 'assigned', label: 'A task is assigned to me', checked: true },
  { value: 'digest', label: 'Weekly project digest', checked: false },
];

export default function LabeledCheckbox() {
  return (
    <Fieldset>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Email me when</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        {options.map((option) => (
          <Checkbox key={option.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <CheckboxInput name='notifications' value={option.value} defaultChecked={option.checked} />
            <CheckboxIndicator>
              <CheckboxCheckedIcon />
              <CheckboxIndeterminateIcon />
            </CheckboxIndicator>
            {option.label}
          </Checkbox>
        ))}
      </div>
    </Fieldset>
  );
}
```
<!-- /example -->

## Parent Selection With Indeterminate State

When to use:

- A parent item summarizes partial child selection.

Composition notes:

- Treat indeterminate as visual partial state, not a separate persisted value.
- Align parent and child selection logic before wiring the UI.

Trade-offs:

- Good for nested selection models.
- Easy to misuse if the data model does not really support partial selection.

<!-- example: checkbox/indeterminate-parent-selector.tsx -->
```tsx
import { useState } from 'react';
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Text,
} from '@vega-ui/react';

const permissions = ['View invoices', 'Download invoices', 'Edit payment methods', 'Cancel subscription'];

export default function IndeterminateParentSelector() {
  const [selected, setSelected] = useState<string[]>(['View invoices', 'Download invoices']);

  const allSelected = selected.length === permissions.length;
  const someSelected = selected.length > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      setSelected([]);
      return;
    }
    setSelected(permissions);
  };

  const toggle = (permission: string) => {
    if (selected.includes(permission)) {
      setSelected(selected.filter((item) => item !== permission));
      return;
    }
    setSelected([...selected, permission]);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', fontWeight: 600 }}>
        <CheckboxInput checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Billing
      </Checkbox>
      <div role='group' aria-label='Billing permissions' style={{ display: 'grid', gap: 'var(--spacing-6)', paddingInlineStart: 'var(--spacing-12)' }}>
        {permissions.map((permission) => (
          <Checkbox key={permission} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <CheckboxInput checked={selected.includes(permission)} onChange={() => toggle(permission)} />
            <CheckboxIndicator>
              <CheckboxCheckedIcon />
              <CheckboxIndeterminateIcon />
            </CheckboxIndicator>
            {permission}
          </Checkbox>
        ))}
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {selected.length} of {permissions.length} permissions granted
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Agreement Checkbox

When to use:

- A single independent confirmation is required before submit.

Composition notes:

- Keep validation explicit.
- Do not confuse agreement semantics with a switch-like settings toggle.

Trade-offs:

- Clear form convention.
- Weak fit for immediate preference toggles.

<!-- example: checkbox/required-agreement-checkbox.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  HelperText,
} from '@vega-ui/react';

export default function RequiredAgreementCheckbox() {
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const invalid = error !== '';

  const handleInvalid = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.currentTarget.focus();
    setError('Accept the Terms of Service to create your workspace.');
  };

  const handleChange = () => {
    setError('');
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <CheckboxInput
            name='terms'
            required
            aria-invalid={invalid}
            aria-describedby={invalid ? 'terms-error' : undefined}
            onInvalid={handleInvalid}
            onChange={handleChange}
          />
          <CheckboxIndicator>
            <CheckboxCheckedIcon />
            <CheckboxIndeterminateIcon />
          </CheckboxIndicator>
          I agree to the Terms of Service
        </Checkbox>
        {invalid && <HelperText id='terms-error' error style={{ paddingInlineStart: 'var(--spacing-12)' }}>{error}</HelperText>}
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start' }}>
        <Button type='submit'>Create workspace</Button>
        {submitted && <HelperText>Workspace created.</HelperText>}
      </div>
    </form>
  );
}
```
<!-- /example -->
