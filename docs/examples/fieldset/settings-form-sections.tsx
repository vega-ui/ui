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
