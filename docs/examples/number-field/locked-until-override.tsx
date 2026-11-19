import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  HelperText,
  Icon,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { CheckIcon, MinusIcon, PlusIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

export default function LockedUntilOverride() {
  const id = useId();
  const [override, setOverride] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 280 }}>
      <Checkbox>
        <CheckboxInput checked={override} onChange={(event) => setOverride(event.currentTarget.checked)} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
        </CheckboxIndicator>
        Override the default rate limit
      </Checkbox>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Requests per minute</Label>
        <NumberField min={60} max={6000} step={60} defaultValue={600} disabled={!override}>
          <NumberFieldDecrementButton square aria-label='Decrease by 60'><Icon><MinusIcon /></Icon></NumberFieldDecrementButton>
          <NumberFieldInput id={id} name='rateLimit' aria-describedby={`${id}-hint`} />
          <NumberFieldIncrementButton square aria-label='Increase by 60'><Icon><PlusIcon /></Icon></NumberFieldIncrementButton>
        </NumberField>
        <HelperText id={`${id}-hint`}>
          {override ? 'From 60 to 6,000, in steps of 60.' : 'Uses the plan default of 600.'}
        </HelperText>
      </div>
    </div>
  );
}
