# Checkbox: примеры

## Базовый

### Базовый: группа независимых вариантов

`Fieldset` с легендой группирует несколько независимых вариантов. Каждый `Checkbox` сам является `<label>`, поэтому текст внутри становится доступным именем, а кликабельна вся строка. Все поля используют один `name` и свой `value`.

<!-- example: checkbox/labeled-checkbox.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetLegend,
} from '@vega-ui/react';

const options = [
  { value: 'mentions', label: 'Someone mentions me in a comment', checked: true },
  { value: 'assigned', label: 'A task is assigned to me', checked: true },
  { value: 'digest', label: 'Weekly project digest', checked: false },
];

export default function LabeledCheckbox() {
  return (
    <Fieldset>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Email me when</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        {options.map((option) => (
          <Checkbox key={option.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <CheckboxInput name='notifications' value={option.value} defaultChecked={option.checked} />
            <CheckboxIndicator>
              <CheckboxCheckedIcon />
              <CheckboxIndeterminateIcon />
            </CheckboxIndicator>
            {option.label}
          </Checkbox>
        ))}
      </div>
    </Fieldset>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: родительский чекбокс с неопределённым состоянием

Состояние родителя вычисляется из дочерних: отмечен, когда выданы все права, и `indeterminate`, когда только часть. Клик по нему выбирает или снимает всю группу, а счётчик ниже читает то же состояние.

<!-- example: checkbox/indeterminate-parent-selector.tsx -->
```tsx
import { useState } from 'react';
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Text,
} from '@vega-ui/react';

const permissions = ['View invoices', 'Download invoices', 'Edit payment methods', 'Cancel subscription'];

export default function IndeterminateParentSelector() {
  const [selected, setSelected] = useState<string[]>(['View invoices', 'Download invoices']);

  const allSelected = selected.length === permissions.length;
  const someSelected = selected.length > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      setSelected([]);
      return;
    }
    setSelected(permissions);
  };

  const toggle = (permission: string) => {
    if (selected.includes(permission)) {
      setSelected(selected.filter((item) => item !== permission));
      return;
    }
    setSelected([...selected, permission]);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', fontWeight: 600 }}>
        <CheckboxInput checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Billing
      </Checkbox>
      <div role='group' aria-label='Billing permissions' style={{ display: 'grid', gap: 'var(--spacing-6)', paddingInlineStart: 'var(--spacing-12)' }}>
        {permissions.map((permission) => (
          <Checkbox key={permission} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <CheckboxInput checked={selected.includes(permission)} onChange={() => toggle(permission)} />
            <CheckboxIndicator>
              <CheckboxCheckedIcon />
              <CheckboxIndeterminateIcon />
            </CheckboxIndicator>
            {permission}
          </Checkbox>
        ))}
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {selected.length} of {permissions.length} permissions granted
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: чтение значений через FormData

Отмеченные поля с одним `name` отправляются повторяющимися записями, поэтому `FormData.getAll('topics')` возвращает все выбранные `value`. Одиночный чекбокс отправляет `value`, только когда отмечен, — неотмеченного в данных формы нет. Кнопка сброса возвращает `defaultChecked`.

<!-- example: checkbox/form-data-submission.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetLegend,
  Text,
} from '@vega-ui/react';

const topics = [
  { value: 'releases', label: 'Product releases' },
  { value: 'security', label: 'Security advisories' },
  { value: 'events', label: 'Webinars and events' },
];

export default function FormDataSubmission() {
  const [result, setResult] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const selected = data.getAll('topics');
    const summary = data.get('summary') === 'weekly' ? 'weekly summary' : 'no summary';
    const topicList = selected.length > 0 ? selected.join(', ') : 'none';
    setResult(`topics: ${topicList}; ${summary}`);
  };

  return (
    <form onSubmit={handleSubmit} onReset={() => setResult('')} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <Fieldset>
          <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Subscriptions</FieldsetLegend>
          <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
            {topics.map((topic) => (
              <Checkbox key={topic.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                <CheckboxInput name='topics' value={topic.value} defaultChecked={topic.value === 'security'} />
                <CheckboxIndicator>
                  <CheckboxCheckedIcon />
                  <CheckboxIndeterminateIcon />
                </CheckboxIndicator>
                {topic.label}
              </Checkbox>
            ))}
          </div>
        </Fieldset>
        <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <CheckboxInput name='summary' value='weekly' />
          <CheckboxIndicator>
            <CheckboxCheckedIcon />
            <CheckboxIndeterminateIcon />
          </CheckboxIndicator>
          Weekly summary instead of single emails
        </Checkbox>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Button type='submit'>Save preferences</Button>
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

### Раскладка/оверлей: список фильтров в выдвижной панели

Чекбоксы находятся в `form method='dialog'` внутри `Drawer`: отправка читает `FormData`, применяет фильтры и закрывает панель. Триггер показывает число применённых фильтров, а при повторном открытии панель стартует с применённых значений.

<!-- example: checkbox/checkbox-list-inside-a-drawer.tsx -->
```tsx
import { CSSProperties, FormEvent, useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Fieldset,
  FieldsetLegend,
  Heading,
  Icon,
  IconButton,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const statuses = [
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'in-review', label: 'In review' },
  { value: 'done', label: 'Done' },
];

export default function CheckboxListInsideADrawer() {
  const [applied, setApplied] = useState<string[]>(['open', 'in-progress']);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    setApplied(data.getAll('status').map(String));
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Filters ({applied.length})</Button>
      </DrawerTrigger>
      <DrawerContent shadowed aria-labelledby='issue-filters-title'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='issue-filters-title' as='h2' size={4} fontWeight={600}>Filter issues</Heading>
          <DrawerClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DrawerClose>
        </div>
        <form method='dialog' onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}>
          <Fieldset>
            <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Status</FieldsetLegend>
            <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
              {statuses.map((status) => (
                <Checkbox key={status.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                  <CheckboxInput name='status' value={status.value} defaultChecked={applied.includes(status.value)} />
                  <CheckboxIndicator>
                    <CheckboxCheckedIcon />
                    <CheckboxIndeterminateIcon />
                  </CheckboxIndicator>
                  {status.label}
                </Checkbox>
              ))}
            </div>
          </Fieldset>
          <Button type='submit'>Apply filters</Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
```
<!-- /example -->

### Раскладка/оверлей: выбор строк в таблице

У чекбоксов в ячейках таблицы нет видимого текста, поэтому каждый `CheckboxInput` получает `aria-label` с названием своей строки. Чекбокс в заголовке выбирает все строки и становится неопределённым при частичном выборе; действие на панели реагирует на выбор.

<!-- example: checkbox/table-row-selection.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  Text,
} from '@vega-ui/react';

const invoices = [
  { id: 'INV-1042', customer: 'Northwind Traders', amount: '$1,240.00' },
  { id: 'INV-1043', customer: 'Contoso Ltd.', amount: '$860.50' },
  { id: 'INV-1044', customer: 'Fabrikam Inc.', amount: '$3,015.75' },
  { id: 'INV-1045', customer: 'Tailspin Toys', amount: '$420.00' },
];

export default function TableRowSelection() {
  const [selected, setSelected] = useState<string[]>([]);

  const allSelected = selected.length === invoices.length;
  const someSelected = selected.length > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      setSelected([]);
      return;
    }
    setSelected(invoices.map((invoice) => invoice.id));
  };

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
      return;
    }
    setSelected([...selected, id]);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
        <Text size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{selected.length} selected</Text>
        <Button size='sm' variant='secondary' appearance='ghost' disabled={selected.length === 0}>Download PDF</Button>
      </div>
      <Table fullWidth dataAlign='start' style={{ whiteSpace: 'nowrap' }}>
        <TableHead>
          <TableRow>
            <TableHeading style={{ width: 40 }}>
              <Checkbox size='sm'>
                <CheckboxInput aria-label='Select all invoices' checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
                <CheckboxIndicator>
                  <CheckboxCheckedIcon />
                  <CheckboxIndeterminateIcon />
                </CheckboxIndicator>
              </Checkbox>
            </TableHeading>
            <TableHeading>Invoice</TableHeading>
            <TableHeading>Customer</TableHeading>
            <TableHeading dataAlign='end'>Amount</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableData>
                <Checkbox size='sm'>
                  <CheckboxInput aria-label={`Select ${invoice.id}`} checked={selected.includes(invoice.id)} onChange={() => toggle(invoice.id)} />
                  <CheckboxIndicator>
                    <CheckboxCheckedIcon />
                    <CheckboxIndeterminateIcon />
                  </CheckboxIndicator>
                </Checkbox>
              </TableData>
              <TableData>{invoice.id}</TableData>
              <TableData>{invoice.customer}</TableData>
              <TableData dataAlign='end' style={{ fontVariantNumeric: 'tabular-nums' }}>{invoice.amount}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: обязательное согласие

Поле нативно `required`. Событие `invalid` заменяет всплывающую подсказку браузера на `HelperText`, связанный через `aria-describedby`, и выставляет `aria-invalid`; отметка чекбокса убирает ошибку.

<!-- example: checkbox/required-agreement-checkbox.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  HelperText,
} from '@vega-ui/react';

export default function RequiredAgreementCheckbox() {
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const invalid = error !== '';

  const handleInvalid = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.currentTarget.focus();
    setError('Accept the Terms of Service to create your workspace.');
  };

  const handleChange = () => {
    setError('');
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <CheckboxInput
            name='terms'
            required
            aria-invalid={invalid}
            aria-describedby={invalid ? 'terms-error' : undefined}
            onInvalid={handleInvalid}
            onChange={handleChange}
          />
          <CheckboxIndicator>
            <CheckboxCheckedIcon />
            <CheckboxIndeterminateIcon />
          </CheckboxIndicator>
          I agree to the Terms of Service
        </Checkbox>
        {invalid && <HelperText id='terms-error' error style={{ paddingInlineStart: 'var(--spacing-12)' }}>{error}</HelperText>}
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start' }}>
        <Button type='submit'>Create workspace</Button>
        {submitted && <HelperText>Workspace created.</HelperText>}
      </div>
    </form>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: отключение через fieldset

Пока отмечен «Use workspace defaults», `Fieldset` отключён, и все чекбоксы внутри нативно наследуют это. Вариант security alerts отключён всегда и объясняет причину через `aria-describedby`. Отключённые поля не отправляются с формой.

<!-- example: checkbox/disabled-by-fieldset.tsx -->
```tsx
import { useState } from 'react';
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetLegend,
  HelperText,
} from '@vega-ui/react';

const channels = [
  { value: 'email', label: 'Email' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS' },
];

export default function DisabledByFieldset() {
  const [useDefaults, setUseDefaults] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput checked={useDefaults} onChange={(event) => setUseDefaults(event.currentTarget.checked)} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Use workspace defaults
      </Checkbox>
      <Fieldset disabled={useDefaults}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Delivery channels</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          {channels.map((channel) => (
            <Checkbox key={channel.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <CheckboxInput name='channels' value={channel.value} defaultChecked={channel.value === 'email'} />
              <CheckboxIndicator>
                <CheckboxCheckedIcon />
                <CheckboxIndeterminateIcon />
              </CheckboxIndicator>
              {channel.label}
            </Checkbox>
          ))}
          <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
            <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <CheckboxInput defaultChecked disabled aria-describedby='security-alerts-note' />
              <CheckboxIndicator>
                <CheckboxCheckedIcon />
                <CheckboxIndeterminateIcon />
              </CheckboxIndicator>
              Security alerts
            </Checkbox>
            <HelperText id='security-alerts-note' style={{ paddingInlineStart: 'var(--spacing-12)' }}>Required by your organization and cannot be turned off.</HelperText>
          </div>
        </div>
      </Fieldset>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: длинные подписи в узкой колонке

Длинный текст переносится, а индикатор остаётся на первой строке: выровняйте строку по `flex-start` и задайте `CheckboxIndicator` `flex-shrink: 0`, иначе flex сожмёт квадрат. Неразрывным строкам вроде email-адресов нужен `overflow-wrap: anywhere`.

<!-- example: checkbox/long-label-wrapping.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';

export default function LongLabelWrapping() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
        <CheckboxInput name='data-processing' />
        <CheckboxIndicator style={{ flexShrink: 0, marginBlockStart: 'var(--spacing-1)' }}>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        I consent to the processing of my personal data by Acme Analytics GmbH and its sub-processors in the European Economic Area for the purposes described in the Data Processing Agreement.
      </Checkbox>
      <Checkbox style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
        <CheckboxInput name='export-recipient' />
        <CheckboxIndicator style={{ flexShrink: 0, marginBlockStart: 'var(--spacing-1)' }}>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        <span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>
          Send the export to finance-reporting-quarterly-archive@northwind-traders.example.com
        </span>
      </Checkbox>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: сотни вариантов с выбором всех

240 вариантов в прокручиваемой группе; выбранные значения хранятся в `Set`, чтобы переключение оставалось дешёвым. Чекбокс «выбрать все» вычисляет отмеченное и неопределённое состояние из размера множества.

<!-- example: checkbox/many-options-with-select-all.tsx -->
```tsx
import { useState } from 'react';
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Text,
} from '@vega-ui/react';

const teams = ['billing', 'search', 'auth', 'checkout', 'payments', 'catalog', 'inventory', 'shipping', 'reviews', 'ads', 'email', 'reports'];
const services = ['api', 'worker', 'web', 'gateway', 'scheduler'];
const regions = ['eu-west-1', 'eu-central-1', 'us-east-1', 'ap-south-1'];

const deployments = teams.flatMap((team) => services.flatMap((service) => regions.map((region) => `${team}-${service} · ${region}`)));

export default function ManyOptionsWithSelectAll() {
  const [selected, setSelected] = useState<Set<string>>(() => new Set());

  const allSelected = selected.size === deployments.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
      return;
    }
    setSelected(new Set(deployments));
  };

  const toggle = (deployment: string) => {
    const next = new Set(selected);
    if (next.has(deployment)) {
      next.delete(deployment);
    } else {
      next.add(deployment);
    }
    setSelected(next);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', fontWeight: 600 }}>
        <CheckboxInput checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Restart all deployments
      </Checkbox>
      <div
        role='group'
        aria-label='Deployments'
        style={{
          display: 'grid',
          gap: 'var(--spacing-4)',
          maxHeight: 240,
          overflowY: 'auto',
          padding: 'var(--spacing-4)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-2)',
        }}
      >
        {deployments.map((deployment) => (
          <Checkbox key={deployment} size='sm' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <CheckboxInput checked={selected.has(deployment)} onChange={() => toggle(deployment)} />
            <CheckboxIndicator>
              <CheckboxCheckedIcon />
              <CheckboxIndeterminateIcon />
            </CheckboxIndicator>
            {deployment}
          </Checkbox>
        ))}
      </div>
      <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {selected.size} of {deployments.length} selected
      </Text>
    </div>
  );
}
```
<!-- /example -->
