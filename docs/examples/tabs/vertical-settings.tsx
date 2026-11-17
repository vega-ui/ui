import { useId } from 'react';
import { Label, Switch, SwitchIndicator, SwitchInput, Tabs, TabsList, TabsPanel, TabsTab } from '@vega-ui/react';

const sections = [
  { value: 'notifications', label: 'Notifications', settings: [{ name: 'mentions', label: 'Mentions and replies', checked: true }, { name: 'digest', label: 'Weekly digest', checked: false }] },
  { value: 'privacy', label: 'Privacy', settings: [{ name: 'status', label: 'Show my online status', checked: true }, { name: 'search', label: 'Appear in member search', checked: true }] },
  { value: 'security', label: 'Security', settings: [{ name: 'twoFactor', label: 'Two-step verification', checked: false }, { name: 'alerts', label: 'Sign-in alerts', checked: true }] },
];

export default function VerticalSettings() {
  const id = useId();

  return (
    <Tabs defaultValue='notifications' orientation='vertical' style={{ width: '100%', maxWidth: 560 }}>
      <TabsList aria-label='Preferences' style={{ flexShrink: 0 }}>
        {sections.map((section) => <TabsTab key={section.value} value={section.value}>{section.label}</TabsTab>)}
      </TabsList>
      <div style={{ flex: 1, minWidth: 0 }}>
        {sections.map((section) => (
          <TabsPanel key={section.value} value={section.value}>
            <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
              {section.settings.map((setting) => (
                <div key={setting.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
                  <Label htmlFor={`${id}-${setting.name}`}>{setting.label}</Label>
                  <Switch style={{ flexShrink: 0 }}>
                    <SwitchInput id={`${id}-${setting.name}`} name={setting.name} defaultChecked={setting.checked} />
                    <SwitchIndicator />
                  </Switch>
                </div>
              ))}
            </div>
          </TabsPanel>
        ))}
      </div>
    </Tabs>
  );
}
