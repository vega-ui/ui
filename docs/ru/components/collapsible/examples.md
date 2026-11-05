# Collapsible: примеры

## Базовый

### Базовый: расшифровка цены под итоговой суммой

Неконтролируемое раскрытие: итог всегда виден, а строки счёта скрыты, пока их не попросят показать. Триггер — `Button` через `asChild`, поэтому он сохраняет стили кнопки и при этом получает `aria-expanded` и `aria-controls`.

<!-- example: collapsible/price-breakdown.tsx -->
```tsx
import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger, Text } from '@vega-ui/react';

const lines = [
  { label: 'Team plan · 8 seats × $12', amount: '$96.00' },
  { label: 'Extra storage · 200 GB', amount: '$20.00' },
  { label: 'Annual discount −10%', amount: '−$11.60' },
  { label: 'VAT 19%', amount: '$19.84' },
];

export default function PriceBreakdown() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 360 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
        <Text size={3} fontWeight={500}>Total due today</Text>
        <Text size={3} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>$124.24</Text>
      </div>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost' style={{ justifySelf: 'start' }}>Price breakdown</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--spacing-4) var(--spacing-8)' }}>
            {lines.map((line) => (
              <div key={line.label} style={{ display: 'contents' }}>
                <dt><Text size={2} style={{ color: 'var(--label-secondary)' }}>{line.label}</Text></dt>
                <dd style={{ margin: 0, textAlign: 'end' }}><Text size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{line.amount}</Text></dd>
              </div>
            ))}
          </dl>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: расширенные фильтры со сводкой

Родитель владеет `open` и использует его для подписи триггера. Значения фильтров хранятся рядом, поэтому сводка под блоком показывает число активных фильтров, даже когда блок свёрнут.

<!-- example: collapsible/advanced-filters.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';

export default function AdvancedFilters() {
  const [open, setOpen] = useState(false);
  const [owner, setOwner] = useState('');
  const [tag, setTag] = useState('');

  const activeCount = [owner, tag].filter((value) => value.trim() !== '').length;

  let summary = 'No advanced filters applied';
  if (activeCount === 1) summary = '1 advanced filter applied';
  if (activeCount > 1) summary = `${activeCount} advanced filters applied`;

  const clear = () => {
    setOwner('');
    setTag('');
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 420 }}>
      <Collapsible open={open} onChangeOpen={setOpen}>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
          <CollapsibleTrigger asChild>
            <Button size='sm' variant='secondary' appearance='ghost'>
              {open ? 'Hide advanced filters' : 'Show advanced filters'}
            </Button>
          </CollapsibleTrigger>
          {activeCount > 0 && (
            <Button size='sm' variant='secondary' appearance='ghost' onClick={clear}>Clear</Button>
          )}
        </div>
        <CollapsibleContent>
          <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='filter-owner'>Owner</Label>
              <TextField>
                <TextFieldInput id='filter-owner' value={owner} onChange={(event) => setOwner(event.target.value)} />
              </TextField>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='filter-tag'>Tag</Label>
              <TextField>
                <TextFieldInput id='filter-tag' value={tag} onChange={(event) => setTag(event.target.value)} />
              </TextField>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {summary}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: необязательные реквизиты компании

Скрытое содержимое не отключено: его поля всё равно отправятся с формой, а `required` всё равно заблокирует отправку. `<fieldset disabled={!open}>` вокруг необязательных полей убирает их из `FormData` и из валидации, пока блок закрыт.

<!-- example: collapsible/invoice-details-form.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Label,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';

export default function InvoiceDetailsForm() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    setSubmitted(JSON.stringify(values, null, 2));
  };

  const reset = () => {
    setOpen(false);
    setSubmitted('');
  };

  return (
    <form onSubmit={submit} onReset={reset} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 420 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='invoice-email'>Receipt email</Label>
          <TextField>
            <TextFieldInput id='invoice-email' name='email' type='email' autoComplete='email' required />
          </TextField>
        </div>
        <Collapsible open={open} onChangeOpen={setOpen}>
          <CollapsibleTrigger asChild>
            <Button size='sm' variant='secondary' appearance='ghost' style={{ justifySelf: 'start' }}>
              {open ? 'Remove company details' : 'Add company details for the invoice'}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <fieldset disabled={!open} style={{ border: 0, margin: 0, padding: 0, display: 'grid', gap: 'var(--spacing-8)' }}>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor='invoice-company'>Company name</Label>
                <TextField>
                  <TextFieldInput id='invoice-company' name='company' autoComplete='organization' required />
                </TextField>
              </div>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor='invoice-vat'>VAT ID</Label>
                <TextField>
                  <TextFieldInput id='invoice-vat' name='vatId' required />
                </TextField>
              </div>
            </fieldset>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Pay $124.24</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      {submitted && <pre style={{ margin: 0, fontSize: 'var(--font-size-2)', color: 'var(--label-secondary)', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{submitted}</pre>}
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: технические подробности в диалоге

Диалог простыми словами объясняет сбой, а стек вызовов лежит в свёрнутом блоке со своей прокруткой, чтобы длинный стек не растягивал диалог.

<!-- example: collapsible/error-details-dialog.tsx -->
```tsx
import type { CSSProperties } from 'react';
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
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

const stackTrace = `ExportError: Request timed out after 30000 ms
    at fetchRows (exports/worker.ts:118:11)
    at async buildCsv (exports/csv.ts:42:20)
    at async runExport (exports/run.ts:77:5)
    at async Queue.process (queue/index.ts:203:9)
Request ID: 7f3c9a1e-52b4-4f0e-9d8a-0c61b2e4a913`;

export default function ErrorDetailsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Show failed export</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='export-error-title' aria-describedby='export-error-description' style={{ maxWidth: 480 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='export-error-title' as='h2' size={4} fontWeight={600}>Export failed</Heading>
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
        <Text id='export-error-description' size={3} asChild>
          <p style={{ marginBlock: 'var(--spacing-4) var(--spacing-6)', color: 'var(--label-secondary)' }}>The CSV export of 48 210 rows did not finish. Try again with a shorter date range.</p>
        </Text>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button size='sm' variant='secondary' appearance='ghost'>Technical details</Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <pre style={{ margin: 0, marginBlockStart: 'var(--spacing-4)', maxHeight: 160, overflow: 'auto', fontSize: 'var(--font-size-1)', lineHeight: 1.6, padding: 'var(--spacing-6)', borderRadius: 'var(--radius-3)', background: 'var(--fills-tertiary)', color: 'var(--label-secondary)' }}>
              {stackTrace}
            </pre>
          </CollapsibleContent>
        </Collapsible>
        <form method='dialog' style={{ display: 'flex', gap: 'var(--spacing-4)', justifyContent: 'flex-end', marginBlockStart: 'var(--spacing-12)' }}>
          <Button type='submit' variant='secondary' appearance='ghost'>Close</Button>
          <Button type='submit'>Try again</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: промокод со встроенной валидацией

Форма находится внутри содержимого. Неизвестный код показывает ошибку, связанную через `aria-describedby`, а ввод нового значения её снимает. Применённая скидка озвучивается через область `role='status'`, которая отрендерена всегда.

<!-- example: collapsible/promo-code.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  HelperText,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';

const codes: Record<string, number> = { WELCOME10: 10, TEAM25: 25 };

export default function PromoCode() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [discount, setDiscount] = useState(0);

  const apply = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = code.trim().toUpperCase();
    if (normalized === '') {
      setError('Enter a promo code.');
      return;
    }
    if (!(normalized in codes)) {
      setError(`“${normalized}” is not a valid or active promo code.`);
      return;
    }
    setError('');
    setDiscount(codes[normalized]);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 360 }}>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost' style={{ justifySelf: 'start' }}>Have a promo code?</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <form onSubmit={apply} style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor='promo-code'>Promo code</Label>
            <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
              <TextField error={error !== ''} style={{ flex: 1 }}>
                <TextFieldInput
                  id='promo-code'
                  placeholder='WELCOME10'
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value);
                    setError('');
                  }}
                  aria-invalid={error !== ''}
                  aria-describedby={error ? 'promo-code-error' : undefined}
                />
              </TextField>
              <Button type='submit' variant='secondary' appearance='ghost'>Apply</Button>
            </div>
            {error && <HelperText id='promo-code-error' error>{error}</HelperText>}
          </form>
        </CollapsibleContent>
      </Collapsible>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{discount > 0 ? `${discount}% discount applied` : ''}</Text>
    </div>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: триггер отключён родительским fieldset

`CollapsibleTrigger` рендерит нативную кнопку, поэтому `<fieldset disabled>` отключает её вместе с полями внутри. Причина связана с fieldset через `aria-describedby`. Если блок был открыт до блокировки, он остаётся открытым, но только для чтения.

<!-- example: collapsible/locked-order.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';

export default function LockedOrder() {
  const [locked, setLocked] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 420 }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-6)', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text size={3} fontWeight={500}>Order #10482</Text>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setLocked(!locked)}>
          {locked ? 'Unlock order' : 'Lock order'}
        </Button>
      </div>
      <fieldset disabled={locked} aria-describedby='order-lock-reason' style={{ border: 0, margin: 0, padding: 0, display: 'grid', gap: 'var(--spacing-6)' }}>
        <Text id='order-lock-reason' size={2} style={{ color: 'var(--label-secondary)' }}>
          {locked ? 'The order has shipped. Unlock it to change the delivery notes.' : 'Delivery notes can be edited.'}
        </Text>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button size='sm' variant='secondary' appearance='ghost' style={{ justifySelf: 'start' }}>Delivery notes</Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='order-notes'>Notes for the courier</Label>
              <TextField>
                <TextFieldInput id='order-notes' defaultValue='Leave at the reception desk' />
              </TextField>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </fieldset>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: остановить фоновую работу, когда содержимое скрыто

`onChangeHidden` срабатывает после окончания анимации закрытия, а не в момент нажатия на триггер. Лог опрашивает сервер только пока содержимое показано и останавливается, когда оно полностью скрыто.

<!-- example: collapsible/live-log.tsx -->
```tsx
import { useEffect, useState } from 'react';
import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger, Text } from '@vega-ui/react';

const routes = ['GET /api/health', 'POST /api/orders', 'GET /api/orders/10482', 'PATCH /api/users/42'];

export default function LiveLog() {
  const [hidden, setHidden] = useState(true);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (hidden) return;
    const timer = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      setLines((current) => {
        const route = routes[current.length % routes.length];
        return [...current.slice(-19), `${time}  ${route}  200`];
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [hidden]);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 480 }}>
      <Collapsible onChangeHidden={setHidden}>
        <div style={{ display: 'flex', gap: 'var(--spacing-6)', alignItems: 'center' }}>
          <CollapsibleTrigger asChild>
            <Button size='sm' variant='secondary' appearance='ghost'>Request log</Button>
          </CollapsibleTrigger>
          <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
            {hidden ? `Paused · ${lines.length} lines` : `Streaming · ${lines.length} lines`}
          </Text>
        </div>
        <CollapsibleContent>
          <pre aria-label='Request log' tabIndex={0} style={{ margin: 0, height: 160, overflow: 'auto', fontSize: 'var(--font-size-1)', lineHeight: 1.6, fontVariantNumeric: 'tabular-nums', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-3)', background: 'var(--fills-tertiary)', color: 'var(--label-secondary)' }}>
            {lines.join('\n')}
          </pre>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
```
<!-- /example -->
