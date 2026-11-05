# Tooltip: паттерны

## Подсказка к иконке

Когда использовать:

- Иконке или компактному триггеру нужно короткое пояснение.

Заметки о композиции:

- Дайте триггеру собственную метку.
- Держите содержимое тултипа короче, чем понадобилось бы поповеру.

Компромиссы:

- Справка без лишних усилий.
- Плохо подходит для обязательных инструкций.

<!-- example: tooltip/icon-hint.tsx -->
```tsx
import {
  Icon,
  IconButton,
  Text,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';
import { ArchiveIcon, ReplyIcon, Trash2Icon } from '@vega-ui/icons';

const actions = [
  { label: 'Reply', hint: 'Reply to Maria Chen', icon: <ReplyIcon /> },
  { label: 'Archive', hint: 'Move to Archive · E', icon: <ArchiveIcon /> },
  { label: 'Delete', hint: 'Move to Trash · #', icon: <Trash2Icon /> },
];

export default function IconHint() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
      {actions.map((action) => (
        <Tooltip key={action.label}>
          <TooltipTrigger asChild>
            <IconButton aria-label={action.label} variant='secondary' appearance='ghost'>
              <Icon>{action.icon}</Icon>
            </IconButton>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            <Text size={2}>{action.hint}</Text>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Справка к полю

Когда использовать:

- Полю нужен необязательный фоновый контекст.

Заметки о композиции:

- Держите основную метку вне тултипа.
- Используйте тултип только для необязательного пояснения, а не для валидации.

Компромиссы:

- Формы остаются чистыми.
- Легко злоупотребить для обязательных инструкций.

<!-- example: tooltip/field-helper.tsx -->
```tsx
import { useId, useState, type FormEvent } from 'react';
import {
  Button,
  Icon,
  IconButton,
  Label,
  Text,
  TextField,
  TextFieldInput,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';
import { InfoIcon } from '@vega-ui/icons';

export default function FieldHelper() {
  const fieldId = useId();
  const [saved, setSaved] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(String(new FormData(event.currentTarget).get('vat')));
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
        <Label htmlFor={fieldId}>VAT number (optional)</Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton aria-label='About the VAT number' size='xs' variant='secondary' appearance='ghost'>
              <Icon size='xs'><InfoIcon /></Icon>
            </IconButton>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            <Text size={2}>Printed on invoices for EU business customers</Text>
          </TooltipContent>
        </Tooltip>
      </div>
      <TextField>
        <TextFieldInput id={fieldId} name='vat' placeholder='DE123456789' pattern='[A-Z]{2}[A-Z0-9]{8,12}' />
      </TextField>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', marginBlockStart: 'var(--spacing-9)' }}>
        <Button type='submit' style={{ flexShrink: 0 }}>Save billing details</Button>
        <Text size={2} role='status' style={{ minWidth: 0, color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{saved ? `Saved ${saved}` : ''}</Text>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Подсказка в плотных данных

Когда использовать:

- Таблицам, метрикам или компактным строкам настроек нужно очень короткое пояснение.

Заметки о композиции:

- Текст должен быть описательным и легко просматриваться.
- Предпочитайте одно предложение многошаговым инструкциям.

Компромиссы:

- Помогает сохранить плотную раскладку.
- Быстро перестаёт работать, если пояснение превращается в руководство по сценарию.

<!-- example: tooltip/dense-data-hint.tsx -->
```tsx
import {
  Icon,
  IconButton,
  Text,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';
import { InfoIcon } from '@vega-ui/icons';

const metrics = [
  { label: 'MRR', value: '$48,210', hint: 'Monthly recurring revenue from active subscriptions, excluding one-off charges' },
  { label: 'Churn', value: '2.4%', hint: 'Share of customers who cancelled in the last 30 days' },
  { label: 'Conversion', value: '6.8%', hint: 'Trials that became paid plans. Updated every 15 minutes' },
];

export default function DenseDataHint() {
  return (
    <dl
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 'var(--spacing-8)',
        boxSizing: 'border-box',
        width: '100%',
        margin: 0,
        padding: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {metrics.map((metric) => (
        <div key={metric.label} style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
          <dt style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-1)' }}>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>{metric.label}</Text>
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton aria-label={`About ${metric.label}`} size='xs' variant='secondary' appearance='ghost'>
                  <Icon size='xs'><InfoIcon /></Icon>
                </IconButton>
              </TooltipTrigger>
              <TooltipContent>
                <TooltipArrow />
                <Text size={2} style={{ display: 'block', maxWidth: 240 }}>{metric.hint}</Text>
              </TooltipContent>
            </Tooltip>
          </dt>
          <dd style={{ margin: 0 }}><Text size={6} fontWeight={600} style={{ fontVariantNumeric: 'tabular-nums' }}>{metric.value}</Text></dd>
        </div>
      ))}
    </dl>
  );
}
```
<!-- /example -->
