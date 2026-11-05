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
