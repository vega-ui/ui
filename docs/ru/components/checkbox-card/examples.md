# CheckboxCard: примеры

## Базовый

### Базовый: выбор дополнений

Несколько независимых карточек внутри `Fieldset`. Вся карточка является подписью, поэтому клик в любом месте переключает её, а заголовок и описание становятся доступным именем. Контрол — `CheckboxCardControl` с `CheckboxCardControlInput` и `CheckboxIndicator`, в котором лежат иконки состояний.

<!-- example: checkbox-card/plan-option-tile.tsx -->
```tsx
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
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: выбор с вычисляемой суммой

Родитель хранит список выбранных опций и передаёт `checked` и `onChange` каждому `CheckboxCardControlInput`. Сумма в месяц вычисляется из того же состояния.

<!-- example: checkbox-card/parent-managed-checked-state.tsx -->
```tsx
import { useState } from 'react';
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
  Text,
} from '@vega-ui/react';

const extras = [
  { value: 'storage', title: 'Extra storage', description: '+500 GB for files and backups', price: 12 },
  { value: 'seats', title: '5 more seats', description: 'Invite contractors and guests', price: 40 },
  { value: 'analytics', title: 'Advanced analytics', description: 'Funnels and cohorts', price: 25 },
];

export default function ParentManagedCheckedState() {
  const [selected, setSelected] = useState<string[]>(['storage']);

  const toggle = (value: string, checked: boolean) => {
    if (checked) {
      setSelected([...selected, value]);
      return;
    }
    setSelected(selected.filter((item) => item !== value));
  };

  const total = extras
    .filter((extra) => selected.includes(extra.value))
    .reduce((sum, extra) => sum + extra.price, 0);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div role='group' aria-label='Extras' style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)' }}>
        {extras.map((extra) => (
          <CheckboxCard key={extra.value}>
            <CheckboxCardContent>
              <CheckboxCardTitle>{extra.title}</CheckboxCardTitle>
              <CheckboxCardDescription>{extra.description} · ${extra.price}/mo</CheckboxCardDescription>
            </CheckboxCardContent>
            <CheckboxCardControl>
              <CheckboxCardControlInput
                checked={selected.includes(extra.value)}
                onChange={(event) => toggle(extra.value, event.currentTarget.checked)}
              />
              <CheckboxIndicator>
                <CheckboxCardControlCheckedIcon />
                <CheckboxCardControlIndeterminateIcon />
              </CheckboxIndicator>
            </CheckboxCardControl>
          </CheckboxCard>
        ))}
      </div>
      <Text size={3} fontWeight={600} aria-live='polite' style={{ fontVariantNumeric: 'tabular-nums' }}>Extras total: ${total}/mo</Text>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: чтение значений через FormData

Карточки с одним `name` отправляют все отмеченные `value`, поэтому `FormData.getAll('include')` возвращает выбор. Сброс возвращает `defaultChecked` на каждой карточке.

<!-- example: checkbox-card/form-data-submission.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
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
  Text,
} from '@vega-ui/react';

const contents = [
  { value: 'projects', title: 'Projects', description: 'Boards, tasks and their history' },
  { value: 'files', title: 'Files', description: 'Attachments up to 2 GB each' },
  { value: 'members', title: 'Members', description: 'Names, roles and last activity' },
];

export default function FormDataSubmission() {
  const [result, setResult] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const included = new FormData(event.currentTarget).getAll('include');
    setResult(`include=${included.join(',')}`);
  };

  return (
    <form onSubmit={handleSubmit} onReset={() => setResult('')} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Export workspace data</FieldsetLegend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)' }}>
          {contents.map((content) => (
            <CheckboxCard key={content.value} size='sm'>
              <CheckboxCardContent>
                <CheckboxCardTitle>{content.title}</CheckboxCardTitle>
                <CheckboxCardDescription>{content.description}</CheckboxCardDescription>
              </CheckboxCardContent>
              <CheckboxCardControl>
                <CheckboxCardControlInput name='include' value={content.value} defaultChecked />
                <CheckboxIndicator>
                  <CheckboxCardControlCheckedIcon />
                  <CheckboxCardControlIndeterminateIcon />
                </CheckboxIndicator>
              </CheckboxCardControl>
            </CheckboxCard>
          ))}
        </div>
      </Fieldset>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Button type='submit'>Start export</Button>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        </div>
        <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>{result}</Text>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: горизонтальные карточки в списке настроек

`orientation='horizontal'` ставит контрол в конец строки — это подходит для вертикального списка настроек. `size='sm'` делает список плотнее.

<!-- example: checkbox-card/horizontal-settings-tile.tsx -->
```tsx
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
```
<!-- /example -->

## Ошибка

### Ошибка: нужна хотя бы одна карточка

Нативный `required` не умеет выразить «хотя бы один из группы», поэтому проверка выполняется при отправке. Ошибка связана с `Fieldset` через `aria-describedby`, поля получают `aria-invalid`, а отметка любой карточки убирает ошибку.

<!-- example: checkbox-card/at-least-one-required.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
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
  HelperText,
} from '@vega-ui/react';

const platforms = [
  { value: 'ios', title: 'iOS', description: 'App Store build, iPhone and iPad' },
  { value: 'android', title: 'Android', description: 'Google Play build, phones and tablets' },
  { value: 'web', title: 'Web', description: 'Progressive web app on your domain' },
];

export default function AtLeastOneRequired() {
  const [invalid, setInvalid] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selected = new FormData(event.currentTarget).getAll('platforms');
    if (selected.length === 0) {
      setInvalid(true);
      setMessage('');
      return;
    }
    setMessage(`Building for ${selected.join(', ')}.`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <Fieldset style={{ width: '100%' }} aria-describedby={invalid ? 'platforms-error' : undefined}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Target platforms</FieldsetLegend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)' }}>
          {platforms.map((platform) => (
            <CheckboxCard key={platform.value} size='sm'>
              <CheckboxCardContent>
                <CheckboxCardTitle>{platform.title}</CheckboxCardTitle>
                <CheckboxCardDescription>{platform.description}</CheckboxCardDescription>
              </CheckboxCardContent>
              <CheckboxCardControl>
                <CheckboxCardControlInput
                  name='platforms'
                  value={platform.value}
                  aria-invalid={invalid}
                  onChange={() => setInvalid(false)}
                />
                <CheckboxIndicator>
                  <CheckboxCardControlCheckedIcon />
                  <CheckboxCardControlIndeterminateIcon />
                </CheckboxIndicator>
              </CheckboxCardControl>
            </CheckboxCard>
          ))}
        </div>
        {invalid && <HelperText id='platforms-error' error>Choose at least one platform.</HelperText>}
      </Fieldset>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start' }}>
        <Button type='submit'>Start build</Button>
        {message && <HelperText aria-live='polite'>{message}</HelperText>}
      </div>
    </form>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: вариант, недоступный на текущем тарифе

Отключённое поле визуально отключает всю карточку. Описание получает `id`, а поле ссылается на него через `aria-describedby`, чтобы скринридер объяснил, почему вариант недоступен.

<!-- example: checkbox-card/blocked-upgrade-option.tsx -->
```tsx
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
} from '@vega-ui/react';

export default function BlockedUpgradeOption() {
  return (
    <div role='group' aria-label='Reports' style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)', width: '100%' }}>
      <CheckboxCard>
        <CheckboxCardContent>
          <CheckboxCardTitle>Weekly summary</CheckboxCardTitle>
          <CheckboxCardDescription>Key metrics every Monday at 9:00.</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput name='reports' value='weekly' defaultChecked />
          <CheckboxIndicator>
            <CheckboxCardControlCheckedIcon />
            <CheckboxCardControlIndeterminateIcon />
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
      <CheckboxCard>
        <CheckboxCardContent>
          <CheckboxCardTitle>Premium reports</CheckboxCardTitle>
          <CheckboxCardDescription id='premium-reports-note'>Available on the Enterprise plan. Contact sales to upgrade.</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput name='reports' value='premium' disabled aria-describedby='premium-reports-note' />
          <CheckboxIndicator>
            <CheckboxCardControlCheckedIcon />
            <CheckboxCardControlIndeterminateIcon />
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: карточка, обобщающая вложенный список

Карточка отмечена, когда включены все офисы, и `indeterminate`, когда только часть; клик по ней переключает все. Описание считает включённые офисы из того же состояния.

<!-- example: checkbox-card/indeterminate-aggregate-card.tsx -->
```tsx
import { useState } from 'react';
import {
  Checkbox,
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';

const offices = ['Berlin', 'Lisbon', 'Warsaw', 'Dublin', 'Madrid'];

export default function IndeterminateAggregateCard() {
  const [enabled, setEnabled] = useState<string[]>(['Berlin', 'Lisbon']);

  const allEnabled = enabled.length === offices.length;
  const someEnabled = enabled.length > 0 && !allEnabled;

  const toggleAll = () => {
    if (allEnabled) {
      setEnabled([]);
      return;
    }
    setEnabled(offices);
  };

  const toggle = (office: string) => {
    if (enabled.includes(office)) {
      setEnabled(enabled.filter((item) => item !== office));
      return;
    }
    setEnabled([...enabled, office]);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <CheckboxCard orientation='horizontal'>
        <CheckboxCardContent>
          <CheckboxCardTitle>European offices</CheckboxCardTitle>
          <CheckboxCardDescription style={{ fontVariantNumeric: 'tabular-nums' }}>{enabled.length} of {offices.length} offices use hybrid schedules</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput checked={allEnabled} indeterminate={someEnabled} onChange={toggleAll} />
          <CheckboxIndicator>
            <CheckboxCardControlCheckedIcon />
            <CheckboxCardControlIndeterminateIcon />
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
      <div role='group' aria-label='European offices' style={{ display: 'grid', gap: 'var(--spacing-5)', paddingInlineStart: 'var(--spacing-8)' }}>
        {offices.map((office) => (
          <Checkbox key={office} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <CheckboxInput checked={enabled.includes(office)} onChange={() => toggle(office)} />
            <CheckboxIndicator>
              <CheckboxCheckedIcon />
            </CheckboxIndicator>
            {office}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: длинные заголовки и описания

`CheckboxCardTitle` остаётся в одну строку и обрезается многоточием; полный текст остаётся в DOM, поэтому доступное имя целое, а `title` показывает его при наведении. Задайте заголовку `white-space: normal`, если он должен переноситься. Описания переносятся всегда.

<!-- example: checkbox-card/long-content.tsx -->
```tsx
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
} from '@vega-ui/react';

const title = 'Automatically archive inactive projects after 90 days without activity';
const description = 'Archived projects stay searchable and can be restored by any workspace admin. Integrations, webhooks and scheduled exports of archived projects are paused until the project is restored.';

export default function LongContent() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <CheckboxCard>
        <CheckboxCardContent>
          <CheckboxCardTitle title={title}>{title}</CheckboxCardTitle>
          <CheckboxCardDescription>{description}</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput name='archive' value='truncated' />
          <CheckboxIndicator>
            <CheckboxCardControlCheckedIcon />
            <CheckboxCardControlIndeterminateIcon />
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
      <CheckboxCard>
        <CheckboxCardContent style={{ minWidth: 0 }}>
          <CheckboxCardTitle style={{ whiteSpace: 'normal' }}>{title}</CheckboxCardTitle>
          <CheckboxCardDescription>{description}</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput name='archive' value='wrapped' />
          <CheckboxIndicator>
            <CheckboxCardControlCheckedIcon />
            <CheckboxCardControlIndeterminateIcon />
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
    </div>
  );
}
```
<!-- /example -->
