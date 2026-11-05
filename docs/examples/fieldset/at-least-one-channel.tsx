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
