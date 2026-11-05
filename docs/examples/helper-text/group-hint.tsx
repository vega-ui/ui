import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetLegend,
  HelperText,
  Text,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

const CHANNELS = ['Email', 'Slack', 'SMS'];

export default function GroupHint() {
  const id = useId();
  const [saved, setSaved] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const channels = new FormData(event.currentTarget).getAll('channels');
    setSaved(channels.length === 0 ? 'Alerts turned off' : `Alerts via ${channels.join(', ')}`);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <Fieldset aria-describedby={`${id}-hint`}>
        <FieldsetLegend>Incident alerts</FieldsetLegend>
        <HelperText id={`${id}-hint`}>We send each alert to every channel you pick.</HelperText>
        {CHANNELS.map((channel) => (
          <Checkbox key={channel} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <CheckboxInput name='channels' value={channel} defaultChecked={channel === 'Email'} />
            <CheckboxIndicator>
              <CheckboxCheckedIcon />
            </CheckboxIndicator>
            {channel}
          </Checkbox>
        ))}
      </Fieldset>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Button type='submit'>Save</Button>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{saved}</Text>
      </div>
    </form>
  );
}
