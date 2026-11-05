# Spinner: примеры

## Базовый

### Базовый: строка статуса с видимой подписью

Спиннер берёт доступное имя из видимого текста рядом через `aria-labelledby`, поэтому текст на экране и зачитываемое имя не расходятся.

<!-- example: spinner/inline-status-row.tsx -->
```tsx
import { Spinner, Text } from '@vega-ui/react';
import { useId } from 'react';

export default function InlineStatusRow() {
  const labelId = useId();

  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
      <Spinner size={2} aria-labelledby={labelId} />
      <Text id={labelId} size={2}>Syncing 128 contacts from Google</Text>
    </div>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: загрузка раздела по запросу

Флаг `loading` в состоянии решает, что показывает раздел — спиннер или загруженный список. Пока идёт загрузка, раздел помечен `aria-busy` и сохраняет минимальную высоту, так что кнопка и содержимое ниже не прыгают.

<!-- example: spinner/conditional-async-state.tsx -->
```tsx
import { Button, Spinner, Text } from '@vega-ui/react';
import { useEffect, useState } from 'react';

const activity = [
  'Maya Chen merged “Fix invoice rounding”',
  'Deploy #4182 finished in 3m 12s',
  'Omar Haddad commented on “Pricing page copy”',
];

export default function ConditionalAsyncState() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      setItems(activity);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [loading]);

  const load = () => {
    setItems([]);
    setLoading(true);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Button size='sm' variant='secondary' appearance='ghost' onClick={load} disabled={loading} style={{ justifySelf: 'start' }}>
        {items.length > 0 ? 'Refresh activity' : 'Load activity'}
      </Button>
      <section
        aria-label='Recent activity'
        aria-busy={loading}
        style={{
          display: 'grid',
          alignContent: 'center',
          minHeight: 132,
          padding: 'var(--spacing-8)',
          border: '1px solid var(--separator-opaque)',
          borderRadius: 'var(--radius-4)',
          background: 'var(--surface-primary)',
        }}
      >
        {!loading && items.length === 0 && (
          <Text size={2} style={{ color: 'var(--label-tertiary)', textAlign: 'center' }}>No activity loaded yet</Text>
        )}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-4)' }}>
            <Spinner size={3} aria-label='Loading activity' />
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>Loading…</Text>
          </div>
        )}
        {!loading && items.length > 0 && (
          <ul style={{ display: 'grid', gap: 'var(--spacing-5)', margin: 0, paddingInlineStart: 'var(--spacing-8)' }}>
            {items.map((item) => <li key={item}><Text size={2}>{item}</Text></li>)}
          </ul>
        )}
      </section>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: кнопка отправки в ожидании

Обработчик отправки читает значение через `FormData` и переводит форму в ожидание: `<fieldset disabled>` блокирует поле и кнопку, а кнопка показывает спиннер и «Saving…». Спиннер помечен `aria-hidden`, потому что текст кнопки уже говорит, что происходит, а `--spinner-color: currentColor` оставляет его видимым на залитой кнопке.

<!-- example: spinner/button-pending-state.tsx -->
```tsx
import { Button, HelperText, Label, Spinner, TextField, TextFieldInput } from '@vega-ui/react';
import { CSSProperties, FormEvent, useId, useState } from 'react';

export default function ButtonPendingState() {
  const fieldId = useId();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const workspace = String(data.get('workspace'));

    setPending(true);
    setMessage('');
    setTimeout(() => {
      setPending(false);
      setMessage(`Workspace renamed to “${workspace}”.`);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <fieldset disabled={pending} style={{ display: 'grid', gap: 'var(--spacing-12)', margin: 0, padding: 0, border: 'none' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={fieldId}>Workspace name</Label>
          <TextField>
            <TextFieldInput id={fieldId} name='workspace' required defaultValue='Acme Design' />
          </TextField>
          <HelperText role='status' style={{ minHeight: '1lh' }}>{message}</HelperText>
        </div>
        <Button type='submit' style={{ justifySelf: 'start' }}>
          {pending && <Spinner size={2} aria-hidden='true' style={{ '--spinner-color': 'currentColor' } as CSSProperties} />}
          {pending ? 'Saving…' : 'Save'}
        </Button>
      </fieldset>
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: загрузка содержимого в диалоге

Диалог открывается сразу и подгружает данные уже после открытия. Спиннер стоит по центру области с зарезервированной высотой, поэтому диалог не меняет размер дважды, когда данные приходят.

<!-- example: spinner/dialog-content-loader.tsx -->
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
  Spinner,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { CSSProperties, useEffect, useId, useState } from 'react';

export default function DialogContentLoader() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!open || loaded) return;

    const timer = setTimeout(() => setLoaded(true), 1200);

    return () => clearTimeout(timer);
  }, [open, loaded]);

  const changeOpen = (next: boolean) => {
    setOpen(next);
    if (!next) setLoaded(false);
  };

  return (
    <Dialog open={open} onChangeOpen={changeOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Order #10482</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Order #10482</Heading>
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
        <div aria-busy={!loaded} style={{ display: 'grid', minHeight: 120, marginBlockStart: 'var(--spacing-8)' }}>
          {!loaded && (
            <Spinner size={6} aria-label='Loading order details' style={{ placeSelf: 'center' }} />
          )}
          {loaded && (
            <div style={{ display: 'grid', gap: 'var(--spacing-3)', alignContent: 'start' }}>
              <Text size={3}>2 × Linen shirt, 1 × Canvas tote</Text>
              <Text size={2} style={{ color: 'var(--label-secondary)' }}>Shipped on 28 October via DHL Express</Text>
              <Text size={3} fontWeight={600}>Total $148.00</Text>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: неудачный запрос и повтор

Спиннер не должен крутиться после того, как запрос упал. Первая попытка заканчивается ошибкой, которую объявляет `role='alert'`, и кнопкой Retry; повтор снова показывает спиннер с обновлённой подписью и завершается успешно.

<!-- example: spinner/retry-row-still-pending.tsx -->
```tsx
import { Button, HelperText, Spinner, Text } from '@vega-ui/react';
import { useEffect, useId, useState } from 'react';

type Status = 'syncing' | 'failed' | 'synced';

export default function RetryRowStillPending() {
  const labelId = useId();
  const [status, setStatus] = useState<Status>('syncing');
  const [attempt, setAttempt] = useState(1);

  useEffect(() => {
    if (status !== 'syncing') return;

    const timer = setTimeout(() => {
      setStatus(attempt === 1 ? 'failed' : 'synced');
    }, 1500);

    return () => clearTimeout(timer);
  }, [status, attempt]);

  const retry = () => {
    setAttempt(attempt + 1);
    setStatus('syncing');
  };

  const restart = () => {
    setAttempt(1);
    setStatus('syncing');
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      {status === 'syncing' && (
        <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
          <Spinner size={2} aria-labelledby={labelId} />
          <Text id={labelId} size={2}>{attempt === 1 ? 'Syncing calendar…' : `Retrying (attempt ${attempt})…`}</Text>
        </div>
      )}
      {status === 'failed' && (
        <>
          <HelperText error role='alert'>Calendar sync failed: the server did not respond in time.</HelperText>
          <Button size='sm' variant='secondary' appearance='ghost' onClick={retry} style={{ justifySelf: 'start' }}>
            Retry
          </Button>
        </>
      )}
      {status === 'synced' && (
        <>
          <HelperText role='status'>Calendar synced after {attempt} attempts.</HelperText>
          <Button size='sm' variant='secondary' appearance='ghost' onClick={restart} style={{ justifySelf: 'start' }}>
            Run again
          </Button>
        </>
      )}
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: спиннер с задержкой для быстрых ответов

Спиннер появляется, только если запрос идёт дольше 400 мс. Быстрый поиск завершается без мелькания индикатора, медленный всё равно показывает, что работа идёт.

<!-- example: spinner/delayed-spinner.tsx -->
```tsx
import { Button, Spinner, Text } from '@vega-ui/react';
import { useEffect, useState } from 'react';

export default function DelayedSpinner() {
  const [pending, setPending] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    if (!pending) return;

    const timer = setTimeout(() => setShowSpinner(true), 400);

    return () => clearTimeout(timer);
  }, [pending]);

  const search = (latency: number) => {
    setPending(true);
    setShowSpinner(false);
    setResult('');
    setTimeout(() => {
      setPending(false);
      setShowSpinner(false);
      setResult(`Found 24 results in ${latency} ms`);
    }, latency);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => search(150)} disabled={pending}>
          Fast search (150 ms)
        </Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => search(2000)} disabled={pending}>
          Slow search (2 s)
        </Button>
      </div>
      <div aria-live='polite' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', minHeight: 'var(--spacing-12)' }}>
        {showSpinner && <Spinner size={3} aria-label='Searching' />}
        {showSpinner && <Text size={2} style={{ color: 'var(--label-secondary)' }}>Searching…</Text>}
        {result && <Text size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{result}</Text>}
      </div>
    </div>
  );
}
```
<!-- /example -->
