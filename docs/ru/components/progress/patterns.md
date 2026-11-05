# Progress: паттерны

## Прогресс асинхронной задачи

Когда использовать:

- Задача со временем продвигается к завершению.

Заметки по композиции:

- Сопровождайте полосу поясняющим текстом.
- Используйте определённые значения, только когда они отражают реальное состояние задачи.

Компромиссы:

- Явное ощущение продвижения.
- Вводит в заблуждение, если значения лишь угаданы.

<!-- example: progress/parent-owned-upload-progress.tsx -->
```tsx
import { Button, Progress, ProgressTrack, Text } from '@vega-ui/react';
import { useEffect, useId, useState } from 'react';

export default function ParentOwnedUploadProgress() {
  const labelId = useId();
  const [percent, setPercent] = useState(0);
  const [running, setRunning] = useState(false);

  const done = percent === 100;
  const uploading = running && !done;

  useEffect(() => {
    if (!uploading) return;

    const timer = setInterval(() => {
      setPercent((current) => Math.min(current + 4, 100));
    }, 200);

    return () => clearInterval(timer);
  }, [uploading]);

  let status = 'Ready to upload';
  if (done) {
    status = 'Upload complete';
  } else if (uploading) {
    status = 'Uploading…';
  } else if (percent > 0) {
    status = `Paused at ${percent}%`;
  }

  const reset = () => {
    setRunning(false);
    setPercent(0);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
          <Text id={labelId} size={2} fontWeight={500}>product-demo.mp4 · 48 MB</Text>
          <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{percent}%</Text>
        </div>
        <Progress value={percent} valueText={`${percent}%`} aria-labelledby={labelId} fullWidth>
          <ProgressTrack />
        </Progress>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{status}</Text>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button size='sm' onClick={() => setRunning(!uploading)} disabled={done}>
          {uploading ? 'Pause' : 'Upload'}
        </Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={reset} disabled={percent === 0}>
          {done ? 'Upload another' : 'Cancel'}
        </Button>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Неопределённая операция

Когда использовать:

- Работа идёт, но степень выполнения неизвестна.

Заметки по композиции:

- Чётко отличайте это состояние от определённого прогресса.
- Текст рядом должен прямо говорить о выполняющейся операции.

Компромиссы:

- Лучше, чем выдуманные проценты.
- Менее информативно, чем определённый прогресс.

<!-- example: progress/indeterminate-progress.tsx -->
```tsx
import { Button, Progress, ProgressTrack, Text } from '@vega-ui/react';
import { useEffect, useId, useState } from 'react';

type Phase = 'idle' | 'preparing' | 'importing' | 'done';

export default function IndeterminateProgress() {
  const labelId = useId();
  const [phase, setPhase] = useState<Phase>('idle');
  const [total, setTotal] = useState(0);
  const [imported, setImported] = useState(0);

  useEffect(() => {
    if (phase !== 'preparing') return;

    const timer = setTimeout(() => {
      setTotal(3482);
      setImported(0);
      setPhase('importing');
    }, 1800);

    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'importing') return;

    const timer = setTimeout(() => {
      const next = Math.min(imported + 211, total);
      setImported(next);
      if (next === total) setPhase('done');
    }, 100);

    return () => clearTimeout(timer);
  }, [phase, imported, total]);

  const preparing = phase === 'preparing';
  let status = 'Import contacts from contacts.vcf';
  if (preparing) {
    status = 'Reading file…';
  } else if (phase === 'importing') {
    status = `Importing ${imported} of ${total} contacts`;
  } else if (phase === 'done') {
    status = `${total} contacts imported`;
  }

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Text id={labelId} size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{status}</Text>
        <Progress
          indeterminate={preparing}
          value={preparing ? undefined : imported}
          max={preparing ? undefined : Math.max(total, 1)}
          valueText={preparing ? 'Reading file' : `${imported} of ${total} contacts`}
          aria-labelledby={labelId}
          aria-busy={preparing}
          fullWidth
        >
          <ProgressTrack />
        </Progress>
      </div>
      <Button
        size='sm'
        style={{ justifySelf: 'start' }}
        onClick={() => setPhase('preparing')}
        disabled={phase === 'preparing' || phase === 'importing'}
      >
        {phase === 'done' ? 'Import again' : 'Import'}
      </Button>
    </div>
  );
}
```
<!-- /example -->

## Прогресс внутри оверлеев

Когда использовать:

- Диалог или шторка (Sheet) управляет выполняющейся операцией.

Заметки по композиции:

- Держите прогресс рядом с задачей, которой он принадлежит.
- Используйте полную ширину, когда раскладка оверлея это позволяет.

Компромиссы:

- Обратная связь остаётся рядом с выполняющейся операцией.
- Может выглядеть визуально тяжело, если рядом слишком много индикаторов статуса.

<!-- example: progress/progress-inside-a-dialog.tsx -->
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
  Progress,
  ProgressTrack,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { CSSProperties, useEffect, useId, useState } from 'react';

const total = 1240;

export default function ProgressInsideADialog() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [exported, setExported] = useState(0);

  const running = open && exported < total;

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setExported((current) => Math.min(current + 62, total));
    }, 150);

    return () => clearInterval(timer);
  }, [running]);

  const changeOpen = (next: boolean) => {
    setOpen(next);
    if (next) setExported(0);
  };

  return (
    <Dialog open={open} onChangeOpen={changeOpen}>
      <DialogTrigger asChild>
        <Button>Export invoices</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId} style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Exporting invoices</Heading>
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
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Progress
            value={exported}
            max={total}
            valueText={`${exported} of ${total} invoices`}
            aria-labelledby={titleId}
            fullWidth
          >
            <ProgressTrack />
          </Progress>
          <Text size={2} role='status' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
            {running ? `${exported} of ${total} invoices exported` : 'invoices-2026-q3.csv is ready'}
          </Text>
        </div>
        <DialogClose asChild>
          <Button variant='secondary' appearance='ghost' style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-4)' }}>
            {running ? 'Cancel export' : 'Done'}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->
