# Switch: паттерны

## Переключатель настройки, применяемой сразу

Когда использовать:

- Одну настройку или функцию нужно напрямую включать и выключать.

Заметки о композиции:

- Пусть видимая метка описывает состояние.
- Задайте `SwitchInput` атрибут `name`, если настройка также живёт в нативной форме.

Компромиссы:

- Явная бинарная подсказка.
- Плохо подходит для групп взаимоисключающих вариантов.

<!-- example: switch/parent-owned-switch-state.tsx -->
```tsx
import { useState } from 'react';
import { Label, Switch, SwitchIndicator, SwitchInput, Text } from '@vega-ui/react';

export default function ParentOwnedSwitchState() {
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 420 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
        <Label htmlFor='maintenance-mode'>Maintenance mode</Label>
        <Switch>
          <SwitchInput
            id='maintenance-mode'
            checked={maintenance}
            onChange={(event) => setMaintenance(event.currentTarget.checked)}
          />
          <SwitchIndicator />
        </Switch>
      </div>
      <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>
        {maintenance ? 'Visitors see the maintenance page. Admins can still sign in.' : 'The site is live for everyone.'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Строка настроек с поясняющим текстом

Когда использовать:

- Экрану настроек нужен компактный переключатель и короткий поясняющий текст.

Заметки о композиции:

- Держите переключатель и основную метку в одной строке.
- Необязательный поясняющий текст размещайте ниже, а не внутри самой метки.

Компромиссы:

- Легко просматривать в панелях настроек.
- Может стать шумным, если каждая строка добавляет слишком много пояснений.

<!-- example: switch/settings-toggle.tsx -->
```tsx
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
```
<!-- /example -->

## Список переключателей в оверлее

Когда использовать:

- Выдвижная панель (Drawer) или шторка содержит короткий список бинарных настроек.

Заметки о композиции:

- Держите список коротким и явно ориентированным на состояния.
- Не смешивайте переключатели с паттернами взаимоисключающего выбора в одной визуальной группе.

Компромиссы:

- Хорошо работает для компактных панелей настроек.
- Сложнее просматривать, если сложено слишком много переключателей со слабыми метками.

<!-- example: switch/overlay-toggle-list.tsx -->
```tsx
import { CSSProperties } from 'react';
import {
  Button,
  Heading,
  Icon,
  IconButton,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Switch,
  SwitchIndicator,
  SwitchInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const options = [
  { id: 'sheet-autoplay', title: 'Autoplay next episode', checked: true },
  { id: 'sheet-subtitles', title: 'Always show subtitles', checked: false },
  { id: 'sheet-data-saver', title: 'Data saver on mobile networks', checked: true },
];

export default function OverlayToggleList() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Playback settings</Button>
      </SheetTrigger>
      <SheetContent aria-labelledby='playback-settings-title'>
        <SheetHandle aria-label='Resize sheet' />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='playback-settings-title' size={4} fontWeight={600} as='h2'>Playback settings</Heading>
          <SheetClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </SheetClose>
        </div>
        <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
          {options.map((option) => (
            <div key={option.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
              <Label htmlFor={option.id}>{option.title}</Label>
              <Switch style={{ flexShrink: 0 }}>
                <SwitchInput id={option.id} name={option.id} defaultChecked={option.checked} />
                <SwitchIndicator />
              </Switch>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
```
<!-- /example -->
