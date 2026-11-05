# Heading: примеры

## Базовый

### Базовый: структура документа

Сначала выбирайте `as` по структуре документа. Без `size` каждый уровень получает свой визуальный размер по умолчанию (`h1` → 11, `h2` → 10, `h3` → 8), поэтому обычной структуре дополнительные пропсы не нужны.

<!-- example: heading/document-outline.tsx -->
```tsx
import { Heading, Text } from '@vega-ui/react';

export default function DocumentOutline() {
  return (
    <article style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: '60ch' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Heading as='h1'>Getting started</Heading>
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>Set up your workspace in three steps.</Text>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Heading as='h2'>Invite your team</Heading>
        <Text size={3}>Members get access to every public project.</Text>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Heading as='h3'>Roles and permissions</Heading>
        <Text size={3}>Admins manage billing; editors can create projects.</Text>
      </div>
    </article>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: счётчик в заголовке раздела

Заголовок показывает текущее число участников и подписывает `section` через `aria-labelledby`, поэтому имя региона обновляется вместе со списком. У каждой кнопки удаления имя с именем участника, а пустое состояние заменяет список.

<!-- example: heading/heading-with-dynamic-count.tsx -->
```tsx
import { Button, Heading, Text } from '@vega-ui/react';
import { useState } from 'react';

const candidates = ['Alicia Gómez', 'Ben Carter', 'Chen Wei', 'Dana Novak', 'Emeka Obi'];

export default function HeadingWithDynamicCount() {
  const [members, setMembers] = useState(candidates.slice(0, 2));
  const nextCandidate = candidates.find((name) => !members.includes(name));

  const addMember = () => {
    if (nextCandidate === undefined) return;
    setMembers([...members, nextCandidate]);
  };

  return (
    <section aria-labelledby='members-title' style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%' }}>
      <Heading as='h3' size={5} id='members-title' style={{ fontVariantNumeric: 'tabular-nums', marginBlockEnd: 'var(--spacing-2)' }}>
        Members ({members.length})
      </Heading>
      {members.map((name) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
          <Text size={3}>{name}</Text>
          <Button
            size='sm'
            variant='secondary'
            appearance='ghost'
            aria-label={`Remove ${name}`}
            onClick={() => setMembers(members.filter((member) => member !== name))}
          >
            Remove
          </Button>
        </div>
      ))}
      {members.length === 0 && <Text size={2} style={{ color: 'var(--label-secondary)' }}>No members yet.</Text>}
      <Button
        size='sm'
        variant='secondary'
        appearance='ghost'
        disabled={nextCandidate === undefined}
        onClick={addMember}
        style={{ justifySelf: 'start', marginBlockStart: 'var(--spacing-4)' }}
      >
        Add member
      </Button>
    </section>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: заголовок, дающий имя форме

Форма получает доступное имя из `Heading` через `aria-labelledby` и становится именованным ориентиром. Группы внутри используют `FieldsetLegend`, а не новые заголовки, а отправка читает значения через `FormData`.

<!-- example: heading/fieldset-section-title.tsx -->
```tsx
import {
  Button,
  Fieldset,
  FieldsetLegend,
  Heading,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { useState, type FormEvent } from 'react';

export default function FieldsetSectionTitle() {
  const [saved, setSaved] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaved(`Invoices for ${data.get('company')} go to ${data.get('billingEmail')}.`);
  };

  return (
    <form
      aria-labelledby='billing-form-title'
      onSubmit={onSubmit}
      onReset={() => setSaved('')}
      style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}
    >
      <Heading as='h2' size={6} id='billing-form-title'>Billing details</Heading>
      <Fieldset style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-6)' }}>Company</FieldsetLegend>
        <Label htmlFor='billing-company-name'>Legal name</Label>
        <TextField>
          <TextFieldInput id='billing-company-name' name='company' autoComplete='organization' required />
        </TextField>
      </Fieldset>
      <Fieldset style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-6)' }}>Invoices</FieldsetLegend>
        <Label htmlFor='billing-invoice-email'>Send invoices to</Label>
        <TextField>
          <TextFieldInput id='billing-invoice-email' name='billingEmail' type='email' autoComplete='email' required />
        </TextField>
      </Fieldset>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
          <Button type='submit'>Save</Button>
        </div>
        {saved && <Text size={2} role='status' style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{saved}</Text>}
      </div>
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: иерархия внутри диалога

Заголовок диалога — `h2`, связанный через `aria-labelledby`, а его разделы используют `h3`, так что у диалога своя структура под страницей. Кнопка закрытия стоит в углу на логических отступах.

<!-- example: heading/dialog-title-hierarchy.tsx -->
```tsx
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import type { CSSProperties } from 'react';

export default function DialogTitleHierarchy() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Review plan change</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='plan-change-title' style={{ display: 'grid', gap: 'var(--spacing-12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading as='h2' size={6} id='plan-change-title'>Switch to the Business plan</Heading>
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
        <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
          <section style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
            <Heading as='h3' size={4}>What changes</Heading>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>SSO, audit log and priority support are enabled immediately.</Text>
          </section>
          <section style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
            <Heading as='h3' size={4}>Billing</Heading>
            <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>You pay a prorated $36.40 today, then $79 per month from April 1.</Text>
          </section>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
          <DialogClose asChild>
            <Button variant='secondary' appearance='ghost'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Upgrade</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: сводка ошибок с фокусом

При неудачной отправке над формой появляется сводка ошибок, и её `Heading` получает фокус через `tabIndex={-1}`, поэтому скринридер сразу озвучивает число проблем. Каждое сообщение ссылается на своё поле, а поля помечены `aria-invalid`.

<!-- example: heading/error-summary-heading.tsx -->
```tsx
import { Button, Heading, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';

interface FieldError {
  id: string
  message: string
}

export default function ErrorSummaryHeading() {
  const summaryHeading = useRef<HTMLHeadingElement>(null);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [attempt, setAttempt] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (attempt === 0) return;
    summaryHeading.current?.focus();
  }, [attempt]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: FieldError[] = [];

    if (String(data.get('name')).trim() === '') {
      nextErrors.push({ id: 'contact-name', message: 'Enter your name' });
    }

    if (!String(data.get('email')).includes('@')) {
      nextErrors.push({ id: 'contact-email', message: 'Enter an email address like name@example.com' });
    }

    setErrors(nextErrors);
    setSent(nextErrors.length === 0);

    if (nextErrors.length > 0) setAttempt(attempt + 1);
  };

  const hasError = (id: string) => errors.some((error) => error.id === id);

  return (
    <form noValidate onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      {errors.length > 0 && (
        <div
          style={{
            display: 'grid',
            gap: 'var(--spacing-3)',
            padding: 'var(--spacing-8)',
            borderRadius: 'var(--radius-3)',
            border: '1px solid var(--color-error)',
          }}
        >
          <Heading as='h2' size={4} ref={summaryHeading} tabIndex={-1}>
            There {errors.length === 1 ? 'is 1 problem' : `are ${errors.length} problems`} with your request
          </Heading>
          {errors.map((error) => (
            <Text key={error.id} asChild size={2} style={{ '--t-color': 'var(--color-error)' } as CSSProperties}>
              <a href={`#${error.id}`}>{error.message}</a>
            </Text>
          ))}
        </div>
      )}
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='contact-name'>Name</Label>
        <TextField error={hasError('contact-name')}>
          <TextFieldInput id='contact-name' name='name' autoComplete='name' aria-invalid={hasError('contact-name')} />
        </TextField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='contact-email'>Email</Label>
        <TextField error={hasError('contact-email')}>
          <TextFieldInput
            id='contact-email'
            name='email'
            type='email'
            autoComplete='email'
            aria-invalid={hasError('contact-email')}
          />
        </TextField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)', marginBlockStart: 'var(--spacing-4)' }}>
        <Button type='submit' style={{ justifySelf: 'end' }}>Request demo</Button>
        {sent && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>Thanks, we will reply within one business day.</Text>}
      </div>
    </form>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: заголовок раздела только для чтения

Раздел остаётся `h3` с прежним уровнем; приглушён только цвет. Элементы управления отключены через нативный `fieldset`, который подписан заголовком и описан заметкой с объяснением причины.

<!-- example: heading/muted-configuration-heading.tsx -->
```tsx
import { Button, Heading, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import type { CSSProperties } from 'react';

export default function MutedConfigurationHeading() {
  return (
    <section aria-labelledby='legacy-webhooks-title' style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <Heading
          as='h3'
          size={4}
          id='legacy-webhooks-title'
          style={{ color: 'var(--disable-text-color)' }}
        >
        Legacy webhooks
        </Heading>
        <Text id='legacy-webhooks-note' size={2} style={{ '--t-color': 'var(--label-secondary)' } as CSSProperties}>
          Read-only since the v2 API. Move your endpoints to Event subscriptions.
        </Text>
      </div>
      <fieldset
        disabled
        aria-labelledby='legacy-webhooks-title'
        aria-describedby='legacy-webhooks-note'
        style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 0, padding: 0, border: 0 }}
      >
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='legacy-webhook-url'>Endpoint URL</Label>
          <TextField>
            <TextFieldInput id='legacy-webhook-url' name='url' defaultValue='https://hooks.acme.io/orders' />
          </TextField>
        </div>
        <Button variant='secondary' appearance='ghost' style={{ justifySelf: 'start' }}>Send test event</Button>
      </fieldset>
    </section>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: маленький размер при верном уровне

Заголовки разделов боковой панели — `h2` в структуре, но с `size={2}`: `as` и `size` независимы, поэтому плотная раскладка не вынуждает выбирать неверный уровень.

<!-- example: heading/visual-size-smaller-than-semantic-level.tsx -->
```tsx
import { Heading, Text } from '@vega-ui/react';

const sections = [
  { title: 'Recent activity', items: ['Invoice #4821 paid', 'Dana joined the workspace'] },
  { title: 'Pinned projects', items: ['Website redesign', 'Mobile onboarding'] },
];

export default function VisualSizeSmallerThanSemanticLevel() {
  return (
    <aside aria-label='Sidebar' style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 240 }}>
      {sections.map((section) => (
        <section key={section.title} style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Heading as='h2' size={2} fontWeight={500} style={{ color: 'var(--label-secondary)' }}>{section.title}</Heading>
          {section.items.map((item) => (
            <Text key={item} size={3}>{item}</Text>
          ))}
        </section>
      ))}
    </aside>
  );
}
```
<!-- /example -->

### Пограничный случай: длинные заголовки в узкой колонке

`Heading` переносится как обычный текст. `textWrap: 'balance'` выравнивает строки длинного заголовка, а `overflowWrap: 'anywhere'` позволяет разорвать длинное составное слово, а не вылезти за колонку.

<!-- example: heading/long-heading-wrap.tsx -->
```tsx
import { Heading } from '@vega-ui/react';

export default function LongHeadingWrap() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <Heading as='h3' size={6} style={{ textWrap: 'balance' }}>
        Quarterly revenue report for the Europe, Middle East and Africa region
      </Heading>
      <Heading as='h3' size={6} style={{ overflowWrap: 'anywhere' }}>
        Datenschutzgrundverordnungskonformität
      </Heading>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: уровень по глубине вложенности

Рекурсивный компонент вычисляет `as` из глубины и ограничивает его `h6`, потому что глубже уровней в HTML нет. Визуальный `size` уменьшается с глубиной отдельно от уровня.

<!-- example: heading/nested-heading-levels.tsx -->
```tsx
import { Heading, Text, type HeadingAs } from '@vega-ui/react';

interface Topic {
  title: string
  children?: Topic[]
}

const guide: Topic = {
  title: 'Admin guide',
  children: [
    {
      title: 'Security',
      children: [
        {
          title: 'Single sign-on',
          children: [
            {
              title: 'SAML setup',
              children: [
                {
                  title: 'Okta',
                  children: [
                    { title: 'Group mapping', children: [{ title: 'Nested groups' }] },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    { title: 'Billing' },
  ],
};

const levels: HeadingAs[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

function TopicSection({ topic, depth }: { topic: Topic, depth: number }) {
  const level = levels[Math.min(depth, levels.length - 1)];

  return (
    <section style={{ display: 'grid', gap: 'var(--spacing-4)', paddingInlineStart: depth === 0 ? 0 : 'var(--spacing-6)' }}>
      <Heading as={level} size={Math.max(7 - depth, 2)}>{topic.title}</Heading>
      {depth >= levels.length && <Text size={1} style={{ color: 'var(--label-tertiary)' }}>Deeper than h6, shown at the h6 level</Text>}
      {topic.children?.map((child) => (
        <TopicSection key={child.title} topic={child} depth={depth + 1} />
      ))}
    </section>
  );
}

export default function NestedHeadingLevels() {
  return <TopicSection topic={guide} depth={0} />;
}
```
<!-- /example -->
