# Accordion: примеры

## Базовый

### Базовый: список FAQ

Аккордеон с одной открытой секцией, собранный из данных. Одна секция открыта по умолчанию, а `Separator` внутри каждого элемента, кроме последнего, визуально разделяет строки.

<!-- example: accordion/faq.tsx -->
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  Separator,
  Text,
} from '@vega-ui/react';

const questions = [
  {
    value: 'shipping',
    question: 'How long does shipping take?',
    answer: 'Orders placed before 2 p.m. ship the same day. Standard delivery takes 2–5 business days, express takes 1–2.',
  },
  {
    value: 'returns',
    question: 'Can I return an item?',
    answer: 'Unused items can be returned within 30 days. Start a return from the order page and print the prepaid label.',
  },
  {
    value: 'payment',
    question: 'Which payment methods do you accept?',
    answer: 'Visa, Mastercard, American Express, Apple Pay, Google Pay and bank transfer for business accounts.',
  },
  {
    value: 'warranty',
    question: 'What does the warranty cover?',
    answer: 'Two years of manufacturing defects, including free repair or replacement. Accidental damage is not covered.',
  },
];

export default function Faq() {
  return (
    <Accordion defaultOpened={['shipping']} style={{ width: '100%', maxWidth: 560 }}>
      {questions.map((item, index) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionHeader>
            <AccordionTrigger>
              {item.question}
              <AccordionIcon />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <Text size={3}>{item.answer}</Text>
          </AccordionContent>
          {index < questions.length - 1 && <Separator />}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: раскрыть и свернуть всё

Родитель владеет `opened`, поэтому кнопка над списком открывает или закрывает все секции сразу, а рядом видно, сколько секций открыто. `onChangeOpened` синхронизирует состояние, когда пользователь переключает отдельную секцию.

<!-- example: accordion/expand-all.tsx -->
```tsx
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  Button,
  Separator,
  Text,
} from '@vega-ui/react';

const sections = [
  { value: 'requirements', title: 'System requirements', body: 'Node.js 20 or later, 2 GB of free memory and outbound HTTPS access.' },
  { value: 'install', title: 'Installation', body: 'Run the installer, choose a workspace folder and sign in with your company account.' },
  { value: 'configure', title: 'Configuration', body: 'Set the region, connect a storage bucket and invite the first teammates.' },
  { value: 'upgrade', title: 'Upgrading', body: 'Back up the workspace folder, then install the new version over the old one.' },
];

export default function ExpandAll() {
  const [opened, setOpened] = useState<string[]>(['install']);

  const allOpen = opened.length === sections.length;

  const toggleAll = () => {
    if (allOpen) {
      setOpened([]);
      return;
    }
    setOpened(sections.map((section) => section.value));
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%', maxWidth: 560 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          {opened.length} of {sections.length} sections open
        </Text>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={toggleAll}>
          {allOpen ? 'Collapse all' : 'Expand all'}
        </Button>
      </div>
      <Accordion multiple opened={opened} onChangeOpened={(next) => setOpened(next ?? [])}>
        {sections.map((section, index) => (
          <AccordionItem key={section.value} value={section.value}>
            <AccordionHeader>
              <AccordionTrigger>
                {section.title}
                <AccordionIcon />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <Text size={3}>{section.body}</Text>
            </AccordionContent>
            {index < sections.length - 1 && <Separator />}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: форма настроек, разбитая на секции

Поля внутри свёрнутой секции получают `hidden`, и браузер не может сфокусировать их, когда срабатывает нативная валидация. Форма слушает событие `invalid` в фазе захвата и открывает секцию с невалидным полем; значения читаются через `FormData` при отправке.

<!-- example: accordion/settings-form.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  Button,
  Label,
  Separator,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';

export default function SettingsForm() {
  const [opened, setOpened] = useState<string[]>(['profile']);
  const [submitted, setSubmitted] = useState('');

  const openSectionOf = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLElement;
    const item = target.closest('li');
    if (!item) return;
    const section = item.dataset.section;
    if (!section) return;
    setOpened((current) => (current.includes(section) ? current : [...current, section]));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    setSubmitted(JSON.stringify(values, null, 2));
  };

  return (
    <form onSubmit={submit} onInvalidCapture={openSectionOf} onReset={() => setSubmitted('')} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 480 }}>
      <Accordion multiple opened={opened} onChangeOpened={(next) => setOpened(next ?? [])}>
        <AccordionItem value='profile' data-section='profile'>
          <AccordionHeader>
            <AccordionTrigger>
              Profile
              <AccordionIcon />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor='settings-name'>Display name</Label>
                <TextField>
                  <TextFieldInput id='settings-name' name='displayName' autoComplete='name' required />
                </TextField>
              </div>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor='settings-email'>Work email</Label>
                <TextField>
                  <TextFieldInput id='settings-email' name='email' type='email' autoComplete='email' required />
                </TextField>
              </div>
            </div>
          </AccordionContent>
          <Separator />
        </AccordionItem>
        <AccordionItem value='billing' data-section='billing'>
          <AccordionHeader>
            <AccordionTrigger>
              Billing
              <AccordionIcon />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor='settings-company'>Company name</Label>
                <TextField>
                  <TextFieldInput id='settings-company' name='company' autoComplete='organization' />
                </TextField>
              </div>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor='settings-vat'>VAT ID</Label>
                <TextField>
                  <TextFieldInput id='settings-vat' name='vatId' placeholder='DE123456789' pattern='[A-Z]{2}[0-9A-Z]{8,12}' required />
                </TextField>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save settings</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      {submitted && <pre style={{ margin: 0, fontSize: 'var(--font-size-2)', color: 'var(--label-secondary)', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{submitted}</pre>}
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: темы справки в выдвижной панели

Компактный аккордеон `size='sm'` внутри прокручиваемой выдвижной панели. Доступное имя панели берётся из заголовка через `aria-labelledby`, а заголовки аккордеона остаются `h3` под `h2` панели.

<!-- example: accordion/help-drawer.tsx -->
```tsx
import type { CSSProperties } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
  Separator,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const topics = [
  { value: 'invoices', title: 'Where do I find my invoices?', body: 'Open Billing → History. Every invoice can be downloaded as PDF or sent to a billing contact.' },
  { value: 'seats', title: 'How are seats counted?', body: 'A seat is any member who signed in during the billing period. Guests and deactivated members are free.' },
  { value: 'refunds', title: 'Can I get a refund?', body: 'Annual plans can be refunded within 14 days. Monthly plans stop renewing at the end of the period.' },
];

export default function HelpDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Billing help</Button>
      </DrawerTrigger>
      <DrawerContent shadowed fullHeight aria-labelledby='billing-help-title'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='billing-help-title' as='h2' size={4} fontWeight={600}>Billing help</Heading>
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
        <div style={{ overflow: 'auto', marginBlockStart: 'var(--spacing-8)' }}>
          <Accordion size='sm'>
            {topics.map((topic, index) => (
              <AccordionItem key={topic.value} value={topic.value}>
                <AccordionHeader as='h3'>
                  <AccordionTrigger>
                    {topic.title}
                    <AccordionIcon />
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent>
                  <Text size={2}>{topic.body}</Text>
                </AccordionContent>
                {index < topics.length - 1 && <Separator />}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: ошибка валидации видна на свёрнутой секции

IBAN проверяется при сохранении. Ошибка связана с полем через `aria-describedby`, а триггер дополнительно показывает «1 error», поэтому проблема заметна, даже когда секция свёрнута. Исправленное значение снимает ошибку.

<!-- example: accordion/section-errors.tsx -->
```tsx
import { ChangeEvent, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  Button,
  HelperText,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';

const ibanPattern = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/;

const validateIban = (value: string) => {
  const iban = value.replaceAll(' ', '').toUpperCase();
  if (iban === '') return 'Enter the IBAN of the payout account.';
  if (!ibanPattern.test(iban)) return 'IBAN must start with a country code and two check digits, e.g. DE89 3704 0044 0532 0130 00.';
  return '';
};

export default function SectionErrors() {
  const [iban, setIban] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const change = (event: ChangeEvent<HTMLInputElement>) => {
    setIban(event.target.value);
    setSaved(false);
    if (error) setError(validateIban(event.target.value));
  };

  const save = () => {
    const message = validateIban(iban);
    setError(message);
    setSaved(message === '');
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 480 }}>
      <Accordion>
        <AccordionItem value='payout'>
          <AccordionHeader>
            <AccordionTrigger>
              <span style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'baseline' }}>
                Payout details
                {error && <Text size={2} style={{ color: 'var(--color-error)' }}>1 error</Text>}
              </span>
              <AccordionIcon />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='payout-iban'>IBAN</Label>
              <TextField error={error !== ''}>
                <TextFieldInput
                  id='payout-iban'
                  value={iban}
                  onChange={change}
                  aria-invalid={error !== ''}
                  aria-describedby={error ? 'payout-iban-error' : undefined}
                />
              </TextField>
              {error && <HelperText id='payout-iban-error' error>{error}</HelperText>}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div style={{ display: 'flex', gap: 'var(--spacing-6)', alignItems: 'center' }}>
        <Button onClick={save}>Save payout</Button>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{saved ? 'Payout account saved.' : ''}</Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: секция недоступна на текущем тарифе

`AccordionTrigger` через `asChild` рендерит нативную кнопку, поэтому её можно сделать `disabled` и связать с объяснением через `aria-describedby`. Секция остаётся видимой, но не открывается.

<!-- example: accordion/disabled-section.tsx -->
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  Separator,
  Text,
} from '@vega-ui/react';

export default function DisabledSection() {
  return (
    <div style={{ width: '100%', maxWidth: 560 }}>
      <Accordion defaultOpened={['password']}>
        <AccordionItem value='password'>
          <AccordionHeader>
            <AccordionTrigger>
              Password sign-in
              <AccordionIcon />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <Text size={3}>Members sign in with an email and a password of at least 12 characters.</Text>
          </AccordionContent>
          <Separator />
        </AccordionItem>
        <AccordionItem value='sso'>
          <AccordionHeader>
            <AccordionTrigger asChild>
              <button type='button' disabled aria-describedby='sso-reason' style={{ cursor: 'not-allowed', color: 'var(--label-tertiary)' }}>
                SAML single sign-on
                <AccordionIcon />
              </button>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <Text size={3}>Connect Okta, Azure AD or any SAML 2.0 identity provider.</Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Text id='sso-reason' size={2} style={{ color: 'var(--label-secondary)' }}>
        Single sign-on is available on the Enterprise plan.
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: длинный текст триггера и содержимое, растущее в открытом состоянии

В строке версии нет пробелов, поэтому тексту триггера нужен `overflow-wrap: anywhere`, иначе он вытолкнет иконку. «Show more» добавляет строки в открытую секцию; высота пересчитывается, потому что содержимое перерисовывается вместе с новыми строками.

<!-- example: accordion/release-notes.tsx -->
```tsx
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  Button,
  Text,
} from '@vega-ui/react';

const changes = [
  'Faster cold start for workspaces with more than 10\u00a0000 files',
  'Search now matches file paths as well as file contents',
  'Keyboard shortcut to duplicate the current tab',
  'Fixed a crash when a folder was renamed during sync',
  'Fixed wrong time zone in exported activity reports',
  'Audit log entries can be filtered by actor',
  'Dark theme contrast improvements in the sidebar',
  'Drag and drop now works between split panes',
  'API tokens can be scoped to a single project',
  'Removed the legacy v1 webhooks endpoint',
  'Updated the bundled certificate store',
  'Large CSV imports run in the background',
];

const pageSize = 4;

export default function ReleaseNotes() {
  const [visible, setVisible] = useState(pageSize);

  const hiddenCount = changes.length - visible;

  return (
    <Accordion defaultOpened={['release']} style={{ width: '100%', maxWidth: 420 }}>
      <AccordionItem value='release'>
        <AccordionHeader>
          <AccordionTrigger>
            <span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>
              v4.12.0-rc.3+build.20261103.experimental-telemetry-pipeline
            </span>
            <AccordionIcon />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <ul style={{ margin: 0, paddingInlineStart: 'var(--spacing-10)', display: 'grid', gap: 'var(--spacing-2)' }}>
            {changes.slice(0, visible).map((change) => (
              <li key={change}>
                <Text size={2}>{change}</Text>
              </li>
            ))}
          </ul>
          {hiddenCount > 0 && (
            <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setVisible(visible + pageSize)} style={{ marginBlockStart: 'var(--spacing-6)' }}>
              Show {Math.min(pageSize, hiddenCount)} more of {hiddenCount}
            </Button>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```
<!-- /example -->

### Пограничный случай: вложенные аккордеоны и уровни заголовков

Внутренний аккордеон находится в открытой секции. Его заголовки используют `as='h4'`, чтобы структура страницы оставалась `h2 → h3 → h4`, а его состояние не зависит от внешнего аккордеона.

<!-- example: accordion/nested-sections.tsx -->
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  Heading,
  Separator,
  Text,
} from '@vega-ui/react';

const endpoints = [
  { value: 'list', title: 'GET /v1/invoices', body: 'Returns invoices sorted by creation date, newest first. Supports cursor pagination.' },
  { value: 'create', title: 'POST /v1/invoices', body: 'Creates a draft invoice. Line items can be added until the invoice is finalized.' },
  { value: 'void', title: 'POST /v1/invoices/:id/void', body: 'Voids a finalized invoice. Paid invoices must be refunded instead.' },
];

export default function NestedSections() {
  return (
    <section aria-labelledby='api-reference-title' style={{ width: '100%', maxWidth: 560 }}>
      <Heading id='api-reference-title' as='h2' size={5} fontWeight={600}>API reference</Heading>
      <Accordion defaultOpened={['invoices']}>
        <AccordionItem value='invoices'>
          <AccordionHeader as='h3'>
            <AccordionTrigger>
              Invoices
              <AccordionIcon />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <Accordion size='sm' multiple style={{ paddingInlineStart: 'var(--spacing-8)' }}>
              {endpoints.map((endpoint) => (
                <AccordionItem key={endpoint.value} value={endpoint.value}>
                  <AccordionHeader as='h4'>
                    <AccordionTrigger>
                      <code style={{ fontFamily: 'var(--code-font-family)', fontSize: 'var(--font-size-2)' }}>{endpoint.title}</code>
                      <AccordionIcon />
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <Text size={2}>{endpoint.body}</Text>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
          <Separator />
        </AccordionItem>
        <AccordionItem value='customers'>
          <AccordionHeader as='h3'>
            <AccordionTrigger>
              Customers
              <AccordionIcon />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <Text size={3}>Create, update and archive the customers that invoices are billed to.</Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
```
<!-- /example -->
