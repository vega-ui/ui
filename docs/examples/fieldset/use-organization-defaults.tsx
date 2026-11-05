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
