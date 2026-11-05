import { Fieldset, FieldsetLegend, Radio, Text } from '@vega-ui/react';

const policies = [
  {
    value: 'anyone',
    label: 'Anyone with the link',
    description: 'People outside your organization can open shared documents without signing in.',
  },
  {
    value: 'organization',
    label: 'People in Acme Corp',
    description: 'Only signed-in members of your organization can open shared documents.',
  },
  {
    value: 'invited',
    label: 'Invited people only',
    description: 'Every document must be shared with each person by email. Existing links stop working.',
  },
];

export default function OptionsWithDescriptions() {
  return (
    <Fieldset style={{ width: '100%' }}>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Link sharing</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        {policies.map((policy) => (
          <div key={policy.value} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
            <Radio
              id={`sharing-${policy.value}`}
              name='sharing'
              value={policy.value}
              defaultChecked={policy.value === 'organization'}
              aria-describedby={`sharing-${policy.value}-description`}
              style={{ flexShrink: 0, marginBlockStart: 'var(--spacing-1)' }}
            />
            <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <label htmlFor={`sharing-${policy.value}`}>{policy.label}</label>
              <Text id={`sharing-${policy.value}-description`} size={2} style={{ color: 'var(--label-secondary)' }}>
                {policy.description}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </Fieldset>
  );
}
