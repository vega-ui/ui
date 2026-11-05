import { Label, Switch, SwitchIndicator, SwitchInput } from '@vega-ui/react';

const settings = [
  { id: 'rtl-dark-mode', title: 'الوضع الداكن', checked: true },
  { id: 'rtl-notifications', title: 'الإشعارات', checked: false },
];

export default function RightToLeft() {
  return (
    <div dir='rtl' lang='ar' style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      {settings.map((setting) => (
        <div key={setting.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Label htmlFor={setting.id}>{setting.title}</Label>
          <Switch>
            <SwitchInput id={setting.id} defaultChecked={setting.checked} />
            <SwitchIndicator />
          </Switch>
        </div>
      ))}
    </div>
  );
}
