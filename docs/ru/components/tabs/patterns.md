# Tabs: паттерны

## Разделы одного объекта

Когда использовать:

- У проекта, клиента или заказа несколько равноправных представлений, например обзор, активность и настройки.

Заметки о композиции:

- Подписи — короткие существительные, которые говорят, что в панели.
- Передавайте `defaultValue`, чтобы первый рендер показывал нужную панель.

Компромиссы:

- Хорошо подходит для переключения представлений без ухода со страницы.
- Плохо подходит, когда нужно видеть два раздела одновременно.

<!-- example: tabs/minimal-composition.tsx -->
```tsx
import { Tabs, TabsList, TabsPanel, TabsTab, Text } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Tabs defaultValue='overview' style={{ width: '100%', maxWidth: 480 }}>
      <TabsList aria-label='Project'>
        <TabsTab value='overview'>Overview</TabsTab>
        <TabsTab value='activity'>Activity</TabsTab>
        <TabsTab value='settings'>Settings</TabsTab>
      </TabsList>
      <TabsPanel value='overview'>
        <Text size={3}>Spring release: 12 of 18 launch tasks are done.</Text>
      </TabsPanel>
      <TabsPanel value='activity'>
        <Text size={3}>Mira moved “Pricing page” to review two hours ago.</Text>
      </TabsPanel>
      <TabsPanel value='settings'>
        <Text size={3}>The project is visible to everyone in the workspace.</Text>
      </TabsPanel>
    </Tabs>
  );
}
```
<!-- /example -->

## Форма настроек, разбитая на вкладки

Когда использовать:

- Длинная форма настроек делится на несколько разделов, которые редактируют по отдельности.

Заметки о композиции:

- Оберните весь `Tabs` в одну форму; скрытые панели сохраняют свои поля и отправляют их.
- Контролируйте `value` и выбирайте вкладку первого невалидного поля из обработчика `invalid`.

Компромиссы:

- Экран короче, но ошибки на других вкладках находятся только благодаря этому обработчику.

<!-- example: tabs/account-settings-form.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import { Button, Label, Tabs, TabsList, TabsPanel, TabsTab, Text, TextField, TextFieldInput } from '@vega-ui/react';

export default function AccountSettingsForm() {
  const [tab, setTab] = useState('profile');
  const [saved, setSaved] = useState('');

  const showFirstInvalid = (event: FormEvent<HTMLFormElement>) => {
    const first = event.currentTarget.querySelector('input:invalid');
    if (event.target !== first) return;

    const section = first.closest<HTMLElement>('[data-section]')?.dataset.section;
    if (section) setTab(section);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filled = [...new FormData(event.currentTarget).values()].filter((value) => value !== '');
    setSaved(`Saved ${filled.length} fields from both tabs.`);
  };

  return (
    <form onSubmit={submit} onInvalidCapture={showFirstInvalid} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 480 }}>
      <Tabs value={tab} onChangeValue={setTab}>
        <TabsList aria-label='Account settings'>
          <TabsTab value='profile'>Profile</TabsTab>
          <TabsTab value='billing'>Billing</TabsTab>
        </TabsList>
        <TabsPanel value='profile' data-section='profile'>
          <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='account-name'>Display name</Label>
              <TextField>
                <TextFieldInput id='account-name' name='displayName' autoComplete='name' defaultValue='Mira Holt' required />
              </TextField>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='account-email'>Work email</Label>
              <TextField>
                <TextFieldInput id='account-email' name='email' type='email' autoComplete='email' required />
              </TextField>
            </div>
          </div>
        </TabsPanel>
        <TabsPanel value='billing' data-section='billing'>
          <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='account-company'>Company name</Label>
              <TextField>
                <TextFieldInput id='account-company' name='company' autoComplete='organization' required />
              </TextField>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='account-vat'>VAT ID</Label>
              <TextField>
                <TextFieldInput id='account-vat' name='vatId' />
              </TextField>
            </div>
          </div>
        </TabsPanel>
      </Tabs>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{saved}</Text>
        <Button type='submit'>Save changes</Button>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Навигация по настройкам в боковой колонке

Когда использовать:

- Много разделов настроек или подписи слишком длинные для строки вкладок.

Заметки о композиции:

- Используйте `orientation='vertical'` и не давайте списку сжиматься через `flexShrink: 0`.
- Положите панели в одну обёртку с `flex: 1`, чтобы показанная панель занимала оставшуюся ширину; не задавайте размеры и отступы самой `TabsPanel`.

Компромиссы:

- Вмещает больше разделов, чем горизонтальный список, но требует места по горизонтали; на узких экранах ставьте его над панелью или переходите на горизонтальный список.

<!-- example: tabs/vertical-settings.tsx -->
```tsx
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
```
<!-- /example -->

## Вкладки внутри оверлея

Когда использовать:

- Диалог предлагает два-три способа сделать одно дело, например пригласить по почте или поделиться ссылкой.

Заметки о композиции:

- Используйте `size='sm'` и держите ширину диалога одинаковой на всех вкладках.
- Держите действия диалога вне панелей, чтобы они оставались на месте.

Компромиссы:

- Компактно, но больше трёх вкладок в диалоге обычно значит, что это должна быть страница.

<!-- example: tabs/tabs-inside-dialog.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import { Button, Dialog, DialogClose, DialogContent, DialogTrigger, Heading, Icon, IconButton, Label, Tabs, TabsList, TabsPanel, TabsTab, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function TabsInsideDialog() {
  const titleId = useId();
  const emailId = useId();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Share project</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId} style={{ width: 'min(440px, 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)', marginBlockEnd: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Share “Spring release”</Heading>
          <DialogClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DialogClose>
        </div>
        <Tabs defaultValue='invite' size='sm'>
          <TabsList aria-label='Share with'>
            <TabsTab value='invite'>Invite people</TabsTab>
            <TabsTab value='link'>Public link</TabsTab>
          </TabsList>
          <TabsPanel value='invite'>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={emailId}>Email</Label>
              <TextField>
                <TextFieldInput id={emailId} type='email' placeholder='name@company.com' />
              </TextField>
            </div>
          </TabsPanel>
          <TabsPanel value='link'>
            <Text size={3} style={{ color: 'var(--label-secondary)' }}>Anyone with the link can view the project, but not edit it.</Text>
          </TabsPanel>
        </Tabs>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
          <DialogClose asChild>
            <Button variant='secondary' appearance='ghost'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Share</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->
