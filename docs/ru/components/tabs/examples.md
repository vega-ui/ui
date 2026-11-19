# Tabs: примеры

## Базовый

### Базовый: описание товара

Три вкладки с текстовыми панелями. `defaultValue` выбирает вкладку, показанную первой, а `TabsList` подписан через `aria-label`.

<!-- example: tabs/product-details.tsx -->
```tsx
import { Tabs, TabsList, TabsPanel, TabsTab, Text } from '@vega-ui/react';

export default function ProductDetails() {
  return (
    <Tabs defaultValue='description' style={{ width: '100%', maxWidth: 480 }}>
      <TabsList aria-label='Product details'>
        <TabsTab value='description'>Description</TabsTab>
        <TabsTab value='specs'>Specs</TabsTab>
        <TabsTab value='shipping'>Shipping</TabsTab>
      </TabsList>
      <TabsPanel value='description'>
        <Text size={3}>A merino wool sweater with a relaxed fit and ribbed cuffs.</Text>
      </TabsPanel>
      <TabsPanel value='specs'>
        <Text size={3}>100% merino wool, 280 g/m², machine wash at 30 °C.</Text>
      </TabsPanel>
      <TabsPanel value='shipping'>
        <Text size={3}>Free delivery in 3–5 days, free returns within 30 days.</Text>
      </TabsPanel>
    </Tabs>
  );
}
```
<!-- /example -->

### Базовый: счётчики во вкладках

Призрачный `Badge` внутри `TabsTab` показывает, сколько элементов ждёт в каждой вкладке. Вкладка выравнивает подпись и бейдж с отступом, а число входит в имя вкладки, поэтому скринридер объявит «Open 12».

<!-- example: tabs/issue-counts.tsx -->
```tsx
import { Badge, Tabs, TabsList, TabsPanel, TabsTab, Text } from '@vega-ui/react';

export default function IssueCounts() {
  return (
    <Tabs defaultValue='open' style={{ width: '100%', maxWidth: 480 }}>
      <TabsList aria-label='Issues'>
        <TabsTab value='open'>Open <Badge size='xs' variant='info' appearance='ghost'>12</Badge></TabsTab>
        <TabsTab value='review'>In review <Badge size='xs' variant='warning' appearance='ghost'>3</Badge></TabsTab>
        <TabsTab value='closed'>Closed</TabsTab>
      </TabsList>
      <TabsPanel value='open'>
        <Text size={3}>12 issues need an owner.</Text>
      </TabsPanel>
      <TabsPanel value='review'>
        <Text size={3}>3 pull requests wait for a review.</Text>
      </TabsPanel>
      <TabsPanel value='closed'>
        <Text size={3}>Closed issues from the last 30 days.</Text>
      </TabsPanel>
    </Tabs>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: шаги оформления заказа с кнопками «Назад» и «Далее»

Родитель хранит шаг в `value`, поэтому вкладки и кнопки «Назад» и «Далее» меняют одно состояние, а счётчик шагов ниже следует за обоими.

<!-- example: tabs/controlled-steps.tsx -->
```tsx
import { useState } from 'react';
import { Button, Tabs, TabsList, TabsPanel, TabsTab, Text } from '@vega-ui/react';

const steps = [
  { value: 'shipping', label: 'Shipping', text: 'Deliver to 14 Harbour Street, Lisbon, by courier in 2–3 days.' },
  { value: 'payment', label: 'Payment', text: 'Pay with the Visa card ending in 4242.' },
  { value: 'review', label: 'Review', text: 'Two items, €148.00 including VAT and delivery.' },
];

export default function ControlledSteps() {
  const [step, setStep] = useState('shipping');
  const position = steps.findIndex((item) => item.value === step);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 480 }}>
      <Tabs value={step} onChangeValue={setStep}>
        <TabsList aria-label='Checkout'>
          {steps.map((item) => <TabsTab key={item.value} value={item.value}>{item.label}</TabsTab>)}
        </TabsList>
        {steps.map((item) => (
          <TabsPanel key={item.value} value={item.value}>
            <Text size={3}>{item.text}</Text>
          </TabsPanel>
        ))}
      </Tabs>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Step {position + 1} of {steps.length}</Text>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Button size='sm' variant='secondary' appearance='ghost' disabled={position === 0} onClick={() => setStep(steps[position - 1].value)}>Back</Button>
          <Button size='sm' disabled={position === steps.length - 1} onClick={() => setStep(steps[position + 1].value)}>Next</Button>
        </div>
      </div>
    </div>
  );
}
```
<!-- /example -->

### Контролируемый/с состоянием: ручная активация для панелей с загрузкой

При `activation='manual'` стрелки только переносят фокус, поэтому проход по вкладке не запускает её загрузку. Enter, пробел или щелчок показывают вкладку, `onChangeValue` запускает запрос, а панель показывает `Spinner` со своей подписью, пока данные не придут. Загруженные панели остаются смонтированными и при следующем переходе показываются сразу.

<!-- example: tabs/manual-activation-loading.tsx -->
```tsx
import { useState } from 'react';
import { Spinner, Tabs, TabsList, TabsPanel, TabsTab, Text } from '@vega-ui/react';

const reports: Record<string, { label: string, rows: string[] }> = {
  invoices: { label: 'Invoices', rows: ['INV-2041 · €1,240.00 · Paid', 'INV-2042 · €310.50 · Due 30 Nov'] },
  payouts: { label: 'Payouts', rows: ['14 Nov · €3,980.00 to IBAN •• 7731', '07 Nov · €2,415.20 to IBAN •• 7731'] },
  disputes: { label: 'Disputes', rows: ['No open disputes in the last 90 days.'] },
};

export default function ManualActivationLoading() {
  const [loaded, setLoaded] = useState<string[]>(['invoices']);

  const load = (value: string) => {
    if (loaded.includes(value)) return;
    setTimeout(() => setLoaded((current) => [...current, value]), 900);
  };

  return (
    <Tabs defaultValue='invoices' activation='manual' onChangeValue={load} style={{ width: '100%', maxWidth: 480 }}>
      <TabsList aria-label='Finance reports'>
        {Object.entries(reports).map(([value, report]) => <TabsTab key={value} value={value}>{report.label}</TabsTab>)}
      </TabsList>
      {Object.entries(reports).map(([value, report]) => (
        <TabsPanel key={value} value={value}>
          <div style={{ display: 'grid', gap: 'var(--spacing-4)', minHeight: 'calc(2lh + var(--spacing-4))', alignContent: 'start' }}>
            {loaded.includes(value)
              ? report.rows.map((row) => <Text key={row} size={3} style={{ fontVariantNumeric: 'tabular-nums' }}>{row}</Text>)
              : <Spinner size={3} aria-label={`Loading ${report.label.toLowerCase()}`} />}
          </div>
        </TabsPanel>
      ))}
    </Tabs>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: настройки аккаунта, разбитые на вкладки

Одна форма охватывает обе вкладки. Скрытые панели остаются смонтированными, поэтому введённые значения переживают переключение вкладок и отправляются все поля. Вкладки контролируемые, чтобы обработчик `invalid` мог показать вкладку первого невалидного поля до того, как браузер переведёт на него фокус.

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

## Раскладка/оверлей

### Раскладка/оверлей: вертикальные разделы настроек

`orientation='vertical'` ставит список рядом с панелями, а переключают вкладки стрелки вверх и вниз. Панели лежат в одной обёртке с `flex: 1`, которая занимает оставшуюся ширину; `flex: 1` на каждой `TabsPanel` отдал бы свою долю и скрытым панелям.

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

### Раскладка/оверлей: вкладки внутри диалога

Вкладки в `Dialog` используют малый размер. Диалог переносит фокус внутрь; Tab доходит до списка, затем до показанной панели.

<!-- example: tabs/tabs-inside-dialog.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import { Button, Dialog, DialogClose, DialogContent, DialogTrigger, Heading, Icon, Label, Tabs, TabsList, TabsPanel, TabsTab, Text, TextField, TextFieldInput } from '@vega-ui/react';
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
            <Button
              square
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </Button>
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

## Отключённый

### Отключённый: вкладка недоступна на текущем тарифе

Нативно отключённую вкладку `disabled` стрелки пропускают, и по ней нельзя щёлкнуть. `aria-describedby` указывает на `HelperText`, который объясняет причину.

<!-- example: tabs/plan-limited-tab.tsx -->
```tsx
import { useId } from 'react';
import { HelperText, Tabs, TabsList, TabsPanel, TabsTab, Text } from '@vega-ui/react';

export default function PlanLimitedTab() {
  const reasonId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 480 }}>
      <Tabs defaultValue='members'>
        <TabsList aria-label='Workspace'>
          <TabsTab value='members'>Members</TabsTab>
          <TabsTab value='roles'>Roles</TabsTab>
          <TabsTab value='audit' disabled aria-describedby={reasonId}>Audit log</TabsTab>
        </TabsList>
        <TabsPanel value='members'>
          <Text size={3}>8 members, 2 pending invitations.</Text>
        </TabsPanel>
        <TabsPanel value='roles'>
          <Text size={3}>Admins manage billing; members create projects.</Text>
        </TabsPanel>
        <TabsPanel value='audit'>
          <Text size={3}>Sign-ins and permission changes for the last 12 months.</Text>
        </TabsPanel>
      </Tabs>
      <HelperText id={reasonId}>The audit log is available on the Business plan.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: поиск по странице показывает скрытую вкладку

Скрытые панели используют `hidden="until-found"`. Поиск по странице и ссылки на фрагмент текста находят их текст; браузер раскрывает его, и выбирается вкладка этой панели.

<!-- example: tabs/find-in-page.tsx -->
```tsx
import { Tabs, TabsList, TabsPanel, TabsTab, Text } from '@vega-ui/react';

export default function FindInPage() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 480 }}>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Press Ctrl+F or ⌘F and search for “rollback window”: the browser finds it in a hidden tab and shows that tab.
      </Text>
      <Tabs defaultValue='builds'>
        <TabsList aria-label='Release notes'>
          <TabsTab value='builds'>Builds</TabsTab>
          <TabsTab value='deploys'>Deploys</TabsTab>
        </TabsList>
        <TabsPanel value='builds'>
          <Text size={3}>Builds now cache dependencies between branches.</Text>
        </TabsPanel>
        <TabsPanel value='deploys'>
          <Text size={3}>Every deploy keeps a 30-minute rollback window.</Text>
        </TabsPanel>
      </Tabs>
    </div>
  );
}
```
<!-- /example -->
