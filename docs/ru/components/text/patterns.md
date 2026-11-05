# Text: паттерны

## Поясняющий текст под полем

Когда использовать:

- полю нужен короткий поясняющий текст

Заметки по композиции:

- делайте поясняющий текст второстепенным по тону
- размещайте его рядом со связанным полем

Компромиссы:

- повышает понятность
- увеличивает вертикальную плотность

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

## Текст статуса

Когда использовать:

- поверхности интерфейса нужен краткий текст состояния

Заметки по композиции:

- делайте текст коротким
- выбирайте цвет по семантике состояния

Компромиссы:

- быстро читается
- передачи смысла только цветом всё равно следует избегать

<!-- example: text/status-copy.tsx -->
```tsx
import { Button, Text } from '@vega-ui/react';
import { useEffect, useState, type CSSProperties } from 'react';

const relative = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });

export default function StatusCopy() {
  const [lastSync, setLastSync] = useState(() => Date.now() - 4 * 60 * 1000);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 15000);
    return () => window.clearInterval(timer);
  }, []);

  const minutes = Math.round((lastSync - now) / 60000);

  const syncNow = () => {
    const time = Date.now();
    setLastSync(time);
    setNow(time);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)', width: '100%' }}>
      <Text size={2} style={{ '--t-color': 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' } as CSSProperties}>
        Last synced{' '}
        <time dateTime={new Date(lastSync).toISOString()}>{relative.format(minutes, 'minute')}</time>
      </Text>
      <Button size='sm' variant='secondary' appearance='ghost' onClick={syncNow}>Sync now</Button>
    </div>
  );
}
```
<!-- /example -->

## Многострочное описание

Когда использовать:

- содержимое содержит намеренные переносы строк

Заметки по композиции:

- `Text` использует `white-space: pre-line`
- переносы строк должны быть осмысленными, а не декоративными

Компромиссы:

- сохраняет авторскую структуру текста
- неожиданные переносы строк в данных тоже будут отрендерены

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
