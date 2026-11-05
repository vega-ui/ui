# Spinner: паттерны

## Строка статуса

Когда использовать:

- одно действие выполняется, и текст рядом может это объяснить

Заметки по композиции:

- сочетайте спиннер с коротким текстом статуса
- используйте небольшой размер

Компромиссы:

- компактно и понятно
- смысл зависит от текста рядом

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

## Загрузчик по центру поверхности

Когда использовать:

- панель или секция загружается, а содержимое ещё не готово

Заметки по композиции:

- размещайте спиннер по центру зарезервированной области
- выбирайте размер больше, чем при встроенном использовании

Компромиссы:

- легко заметить
- на время загрузки скрывает детали содержимого

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

## Кнопка в состоянии ожидания

Когда использовать:

- действие выполняется, и кнопка временно отключена

Заметки по композиции:

- делайте спиннер компактным
- отключайте кнопку на время ожидания

Компромиссы:

- понятная мгновенная обратная связь
- если текст полностью исчезает, контекст может ослабнуть

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
