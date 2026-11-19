import {
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
  Fieldset,
  FieldsetLegend,
} from '@vega-ui/react';
import { CheckIcon, MinusIcon } from '@vega-ui/icons';

const alerts = [
  { value: 'sms', title: 'SMS alerts', description: 'Critical incidents only, by text message' },
  { value: 'email', title: 'Email alerts', description: 'All incidents and weekly uptime reports' },
  { value: 'slack', title: 'Slack alerts', description: 'Posts to #ops-incidents in the Acme workspace' },
];

export default function HorizontalSettingsTile() {
  return (
    <Fieldset style={{ width: '100%' }}>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Incident alerts</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
        {alerts.map((alert) => (
          <CheckboxCard key={alert.value} orientation='horizontal' size='sm'>
            <CheckboxCardContent>
              <CheckboxCardTitle>{alert.title}</CheckboxCardTitle>
              <CheckboxCardDescription>{alert.description}</CheckboxCardDescription>
            </CheckboxCardContent>
            <CheckboxCardControl>
              <CheckboxCardControlInput name='alerts' value={alert.value} defaultChecked={alert.value !== 'sms'} />
              <CheckboxIndicator>
                <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
                <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
              </CheckboxIndicator>
            </CheckboxCardControl>
          </CheckboxCard>
        ))}
      </div>
    </Fieldset>
  );
}
