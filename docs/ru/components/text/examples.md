# Text: примеры

## Базовый

### Базовый: текст статьи

По умолчанию `Text` рендерит `<span>`; абзацы используют `asChild` с `<p>`, чтобы сохранить семантику абзаца. Вложенный `Text` с `fontWeight` выделяет фрагмент, а подпись автора приглушена через `--t-color`.

<!-- example: text/body-copy.tsx -->
```tsx
import { Heading, Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

export default function BodyCopy() {
  return (
    <article style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: '60ch' }}>
      <header style={{ display: 'grid', gap: 'var(--spacing-2)', marginBlockEnd: 'var(--spacing-2)' }}>
        <Heading as='h3' size={6}>Scheduled maintenance on March 18</Heading>
        <Text size={2} style={{ '--t-color': 'var(--label-secondary)' } as CSSProperties}>
          Posted by the Platform team
        </Text>
      </header>
      <Text asChild size={3}>
        <p>
          We are upgrading the primary database cluster. The dashboard stays available, but exports and
          webhooks are paused for <Text fontWeight={500}>up to 30 minutes</Text> starting at 02:00 UTC.
        </p>
      </Text>
      <Text asChild size={3}>
        <p>Queued webhooks are delivered automatically once the upgrade finishes. No action is needed.</p>
      </Text>
    </article>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: текст из состояния

Фраза вычисляется из числа мест через `Intl.PluralRules` и на нуле сменяется другим сообщением. `aria-live='polite'` озвучивает изменение после каждого клика, не перемещая фокус.

<!-- example: text/dynamic-helper-copy.tsx -->
```tsx
import { Button, Text } from '@vega-ui/react';
import { useState } from 'react';

const totalSeats = 5;
const plural = new Intl.PluralRules('en-US');

export default function DynamicHelperCopy() {
  const [assigned, setAssigned] = useState(3);
  const remaining = totalSeats - assigned;
  const seatWord = plural.select(remaining) === 'one' ? 'seat' : 'seats';

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Text size={3} aria-live='polite' style={{ fontVariantNumeric: 'tabular-nums' }}>
        {remaining === 0 ? 'All seats are taken. Upgrade to invite more people.' : `${remaining} ${seatWord} left on the Team plan.`}
      </Text>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button size='sm' disabled={remaining === 0} onClick={() => setAssigned(assigned + 1)}>
          Assign a seat
        </Button>
        <Button
          size='sm'
          variant='secondary'
          appearance='ghost'
          disabled={assigned === 0}
          onClick={() => setAssigned(assigned - 1)}
        >
          Free a seat
        </Button>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: подсказка и счётчик символов

И подсказка, и живой счётчик — элементы `Text`, на которые поле ссылается через `aria-describedby`, поэтому скринридер читает их вместе с полем. Значение отправляется через `FormData`, а сброс очищает счётчик вместе с полем.

<!-- example: text/helper-text-below-a-field.tsx -->
```tsx
import { Button, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useState, type CSSProperties, type FormEvent } from 'react';

const maxLength = 40;

export default function HelperTextBelowAField() {
  const [headline, setHeadline] = useState('');
  const [saved, setSaved] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaved(`Saved headline: ${data.get('headline')}`);
  };

  const onReset = () => {
    setHeadline('');
    setSaved('');
  };

  return (
    <form onSubmit={onSubmit} onReset={onReset} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='profile-headline'>Profile headline</Label>
        <TextField>
          <TextFieldInput
            id='profile-headline'
            name='headline'
            maxLength={maxLength}
            value={headline}
            aria-describedby='profile-headline-hint profile-headline-count'
            onChange={(event) => setHeadline(event.target.value)}
            required
          />
        </TextField>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
          <Text id='profile-headline-hint' size={2} style={{ '--t-color': 'var(--label-secondary)' } as CSSProperties}>
            Shown under your name in comments.
          </Text>
          <Text
            id='profile-headline-count'
            size={2}
            style={{ '--t-color': 'var(--label-tertiary)', fontVariantNumeric: 'tabular-nums', flexShrink: 0 } as CSSProperties}
          >
            {headline.length}/{maxLength}
          </Text>
        </div>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
          <Button type='submit'>Save</Button>
        </div>
        {saved && <Text size={2} role='status' style={{ '--t-color': 'var(--label-secondary)', overflowWrap: 'anywhere' } as CSSProperties}>{saved}</Text>}
      </div>
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: описание в диалоге

Диалог получает доступное имя из заголовка, а описание — из абзаца `Text` через `aria-labelledby` и `aria-describedby`, поэтому скринридер сообщает о последствиях сразу при открытии.

<!-- example: text/descriptive-copy-in-a-dialog.tsx -->
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

export default function DescriptiveCopyInADialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Transfer ownership</Button>
      </DialogTrigger>
      <DialogContent
        aria-labelledby='transfer-title'
        aria-describedby='transfer-description'
        style={{ display: 'grid', gap: 'var(--spacing-12)' }}
      >
        <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading as='h2' size={5} id='transfer-title'>Transfer ownership?</Heading>
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
          <Text asChild id='transfer-description' size={3} style={{ '--t-color': 'var(--label-secondary)' } as CSSProperties}>
            <p>
              Dana Novak becomes the owner of the Acme workspace and gets access to billing. You stay an admin
              and can be removed by the new owner.
            </p>
          </Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
          <DialogClose asChild>
            <Button variant='secondary' appearance='ghost'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Transfer</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: встроенное сообщение валидации

Купон проверяется при отправке. Неизвестный код показывает сообщение `Text` цветом ошибки, связывает его через `aria-describedby` и выставляет `aria-invalid`; правка поля снимает ошибку. Цвет — не единственный сигнал: само сообщение объясняет, что не так.

<!-- example: text/inline-validation-copy.tsx -->
```tsx
import { Button, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useState, type CSSProperties, type FormEvent } from 'react';

const validCodes = ['SPRING20', 'WELCOME10'];

export default function InlineValidationCopy() {
  const [error, setError] = useState('');
  const [applied, setApplied] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const code = String(data.get('coupon')).trim().toUpperCase();

    if (!validCodes.includes(code)) {
      setApplied('');
      setError(`${code === '' ? 'This code' : code} is not valid or has expired.`);
      return;
    }

    setError('');
    setApplied(`${code} applied to your order.`);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor='coupon-code'>Coupon code</Label>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <TextField error={error !== ''} style={{ flex: 1, minWidth: 0 }}>
          <TextFieldInput
            id='coupon-code'
            name='coupon'
            autoComplete='off'
            aria-invalid={error !== ''}
            aria-describedby={error ? 'coupon-code-error' : undefined}
            onChange={() => setError('')}
          />
        </TextField>
        <Button type='submit' variant='secondary' appearance='ghost'>Apply</Button>
      </div>
      {error && (
        <Text id='coupon-code-error' size={2} style={{ '--t-color': 'var(--color-error)' } as CSSProperties}>
          {error}
        </Text>
      )}
      {applied && <Text size={2} role='status' style={{ '--t-color': 'var(--color-green-accent-600)' } as CSSProperties}>{applied}</Text>}
    </form>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: пояснение к отключённому разделу

Весь `Fieldset` отключён, а приглушённый `Text` объясняет почему. Пояснение связано с группой через `aria-describedby`: отключённые элементы не получают фокус, и заметку рядом легко пропустить.

<!-- example: text/muted-explanatory-text.tsx -->
```tsx
import { Button, Fieldset, FieldsetLegend, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import type { CSSProperties } from 'react';

export default function MutedExplanatoryText() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Fieldset disabled aria-describedby='export-locked-note' style={{ display: 'grid', gap: 'var(--spacing-12)' }}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-8)' }}>Scheduled exports</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='export-email'>Send CSV to</Label>
          <TextField>
            <TextFieldInput id='export-email' name='exportEmail' type='email' defaultValue='finance@acme.io' />
          </TextField>
        </div>
        <Button style={{ justifySelf: 'end' }}>Save schedule</Button>
      </Fieldset>
      <Text
        id='export-locked-note'
        size={2}
        style={{ '--t-color': 'var(--label-secondary)' } as CSSProperties}
      >
        Scheduled exports are available on the Business plan.
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: переводы строк в данных

`Text` использует `white-space: pre-line`: переводы строк в строке становятся разрывами, что удобно для адреса. Текст из CMS с жёсткими переносами отрисуется так же, поэтому переопределяйте это через `whiteSpace: 'normal'`, когда переводы строк не несут смысла.

<!-- example: text/multiline-content.tsx -->
```tsx
import { Text } from '@vega-ui/react';

const address = 'Acme GmbH\nTorstraße 140\n10119 Berlin\nGermany';
const description = 'Soft merino wool sweater with a relaxed fit,\nribbed cuffs and a crew neck.\nMachine washable at 30\u00a0°C.';

export default function MultilineContent() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Text size={3}>{address}</Text>
      <Text size={3} style={{ whiteSpace: 'normal' }}>{description}</Text>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: длинный текст в узкой колонке

Для обрезки нужен блочный бокс: `Text` — строчный `<span>`, поэтому `textOverflow: 'ellipsis'` работает только вместе с `display: 'block'`, `overflow: 'hidden'` и `whiteSpace: 'nowrap'`; `title` оставляет полное имя доступным. Длинные строки без пробелов, например адреса почты, переносятся через `overflowWrap: 'anywhere'`.

<!-- example: text/long-text-overflow.tsx -->
```tsx
import { Text } from '@vega-ui/react';

const files = [
  'Q1-2026-board-presentation-final-v7-approved-by-legal.pdf',
  'customer-interviews-transcripts-berlin-and-lisbon.docx',
  'logo.svg',
];

export default function LongTextOverflow() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%' }}>
      {files.map((file) => (
        <Text
          key={file}
          size={2}
          title={file}
          style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {file}
        </Text>
      ))}
      <Text size={2} style={{ overflowWrap: 'anywhere' }}>
        Invoices are sent to accounts-payable.emea-region@northwind-traders.example.com
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: имена справа налево внутри фразы

Имена на иврите или арабском внутри английской фразы могут переставить соседние числа и знаки препинания. Обёртка имени в `<bdi>` через `asChild` изолирует его направление.

<!-- example: text/bidi-user-content.tsx -->
```tsx
import { Text } from '@vega-ui/react';

const comments = [
  { author: 'Maya Cohen', handle: 'מאיה כהן', count: 3 },
  { author: 'Omar Haddad', handle: 'عمر حداد', count: 12 },
];

export default function BidiUserContent() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
      {comments.map((comment) => (
        <Text key={comment.author} size={3}>
          <Text asChild fontWeight={500}>
            <bdi>{comment.handle}</bdi>
          </Text>{' '}
          left {comment.count} comments
        </Text>
      ))}
    </div>
  );
}
```
<!-- /example -->
