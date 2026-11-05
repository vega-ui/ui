import { Label, Switch, SwitchIndicator, SwitchInput, Text } from '@vega-ui/react';

const settings = [
  { id: 'auto-updates', title: 'Automatic updates', description: 'Install security patches overnight.', checked: true },
  { id: 'usage-data', title: 'Share usage data', description: 'Help us improve with anonymous diagnostics.', checked: false },
  { id: 'beta-features', title: 'Beta features', description: 'Try new tools before they are released.', checked: false },
];

export default function SettingsToggle() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      {settings.map((setting) => (
        <div key={setting.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
            <Label htmlFor={setting.id}>{setting.title}</Label>
            <Text id={`${setting.id}-description`} size={2} style={{ color: 'var(--label-secondary)' }}>
              {setting.description}
            </Text>
          </div>
          <Switch style={{ flexShrink: 0 }}>
            <SwitchInput id={setting.id} defaultChecked={setting.checked} aria-describedby={`${setting.id}-description`} />
            <SwitchIndicator />
          </Switch>
        </div>
      ))}
    </div>
  );
}
