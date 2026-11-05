import {
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
  Fieldset,
  FieldsetLegend,
} from '@vega-ui/react';

const addons = [
  { value: 'priority-support', title: 'Priority support', description: 'Replies within 1 business hour, 24/7 incident line.' },
  { value: 'audit-log', title: 'Audit log', description: 'Keep a 365-day history of every change in the workspace.' },
  { value: 'sso', title: 'Single sign-on', description: 'SAML and OIDC login through Okta, Entra ID or Google.' },
];

export default function PlanOptionTile() {
  return (
    <Fieldset style={{ width: '100%' }}>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Add-ons</FieldsetLegend>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)' }}>
        {addons.map((addon) => (
          <CheckboxCard key={addon.value}>
            <CheckboxCardContent>
              <CheckboxCardTitle>{addon.title}</CheckboxCardTitle>
              <CheckboxCardDescription>{addon.description}</CheckboxCardDescription>
            </CheckboxCardContent>
            <CheckboxCardControl>
              <CheckboxCardControlInput name='addons' value={addon.value} defaultChecked={addon.value === 'audit-log'} />
              <CheckboxIndicator>
                <CheckboxCardControlCheckedIcon />
                <CheckboxCardControlIndeterminateIcon />
              </CheckboxIndicator>
            </CheckboxCardControl>
          </CheckboxCard>
        ))}
      </div>
    </Fieldset>
  );
}
