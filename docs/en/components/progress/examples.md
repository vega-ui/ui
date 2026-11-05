# Progress Examples

## Basic

### Basic: file upload row

A determinate progress bar labelled by the file name through `aria-labelledby`. `valueText` gives a screen reader the same “percent and megabytes” summary that is shown next to the bar.

<!-- example: progress/upload-status-row.tsx -->
```tsx
import { Progress, ProgressTrack, Text } from '@vega-ui/react';
import { useId } from 'react';

export default function UploadStatusRow() {
  const nameId = useId();
  const uploadedMb = 4.2;
  const totalMb = 12;
  const percent = Math.round((uploadedMb / totalMb) * 100);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
        <Text id={nameId} size={2} fontWeight={500}>quarterly-report.pdf</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{uploadedMb} of {totalMb} MB</Text>
      </div>
      <Progress
        value={percent}
        valueText={`${percent}%, ${uploadedMb} of ${totalMb} MB`}
        aria-labelledby={nameId}
        size='sm'
        fullWidth
      >
        <ProgressTrack />
      </Progress>
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: upload with pause and cancel

The parent owns the percentage and a running flag; an effect advances the value only while the upload is running and stops at 100. Status changes go to a `role='status'` line, while the percentage itself updates silently, so a screen reader is not flooded with every tick.

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

## Form/Integration

### Form/Integration: attachment upload after submit

A real form with a required title and a required file input. The submit handler reads both with `FormData` and starts the upload; while it runs, a native `<fieldset disabled>` locks every field and the submit button, and the progress bar appears below the form.

<!-- example: progress/form-attachment-upload.tsx -->
```tsx
import { Button, HelperText, Label, Progress, ProgressTrack, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useEffect, useId, useState } from 'react';

export default function FormAttachmentUpload() {
  const titleId = useId();
  const fileId = useId();
  const progressLabelId = useId();
  const [fileName, setFileName] = useState('');
  const [percent, setPercent] = useState(0);

  const uploading = fileName !== '' && percent < 100;
  const done = fileName !== '' && percent === 100;

  useEffect(() => {
    if (!uploading) return;

    const timer = setInterval(() => {
      setPercent((current) => Math.min(current + 5, 100));
    }, 120);

    return () => clearInterval(timer);
  }, [uploading]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const file = data.get('attachment');
    if (!(file instanceof File)) return;

    setPercent(0);
    setFileName(`${data.get('title')} — ${file.name}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <fieldset disabled={uploading} style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 0, padding: 0, border: 'none' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={titleId}>Ticket title</Label>
          <TextField>
            <TextFieldInput id={titleId} name='title' required defaultValue='Checkout fails on Safari' />
          </TextField>
        </div>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={fileId}>Screen recording</Label>
          <input id={fileId} type='file' name='attachment' accept='video/*,image/*' required />
        </div>
        <Button type='submit' size='sm' style={{ justifySelf: 'start', marginBlockStart: 'var(--spacing-4)' }}>
          {uploading ? 'Uploading…' : 'Attach and send'}
        </Button>
      </fieldset>
      {fileName && (
        <div style={{ display: 'grid', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-12)' }}>
          <Text id={progressLabelId} size={2} style={{ overflowWrap: 'anywhere' }}>{fileName}</Text>
          <Progress value={percent} valueText={`${percent}%`} aria-labelledby={progressLabelId} size='sm' fullWidth>
            <ProgressTrack />
          </Progress>
          <HelperText role='status'>{done ? 'Attachment sent.' : ''}</HelperText>
        </div>
      )}
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: export inside a dialog

The dialog owns the running operation: opening it starts the export, closing it cancels. The progress uses a count-based `max` (invoices, not percent) and shares the dialog title as its accessible name.

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

## Error

### Error: upload stops with an error

The first attempt fails at 65%: the bar stays where the upload stopped, turns red through `--progress-track-color`, and an error `HelperText` is announced and linked with `aria-describedby`. Retry continues from the same point and completes.

<!-- example: progress/failed-progress-flow-with-stopped-completion.tsx -->
```tsx
import { Button, HelperText, Progress, ProgressTrack, Text } from '@vega-ui/react';
import { CSSProperties, useEffect, useId, useState } from 'react';

type Phase = 'idle' | 'uploading' | 'failed' | 'done';

export default function FailedProgressFlowWithStoppedCompletion() {
  const labelId = useId();
  const errorId = useId();
  const [phase, setPhase] = useState<Phase>('idle');
  const [percent, setPercent] = useState(0);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (phase !== 'uploading') return;

    const timer = setTimeout(() => {
      const next = Math.min(percent + 5, 100);
      if (attempt === 1 && next >= 65) {
        setPercent(65);
        setPhase('failed');
        return;
      }

      setPercent(next);
      if (next === 100) {
        setPhase('done');
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [phase, percent, attempt]);

  const start = () => {
    setAttempt(attempt + 1);
    setPhase('uploading');
  };

  const failed = phase === 'failed';
  const trackStyle = failed ? { '--progress-track-color': 'var(--color-red-500)' } as CSSProperties : undefined;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
          <Text id={labelId} size={2} fontWeight={500}>customers-2026.csv</Text>
          <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{percent}%</Text>
        </div>
        <Progress
          value={percent}
          valueText={failed ? `Failed at ${percent}%` : `${percent}%`}
          aria-labelledby={labelId}
          aria-describedby={failed ? errorId : undefined}
          style={trackStyle}
          fullWidth
        >
          <ProgressTrack />
        </Progress>
        {failed && (
          <HelperText id={errorId} error role='alert'>
            Connection lost at {percent}%. The uploaded part is kept — retry to continue.
          </HelperText>
        )}
        {phase === 'done' && <HelperText role='status'>Upload complete.</HelperText>}
      </div>
      <Button size='sm' style={{ justifySelf: 'start' }} onClick={start} disabled={phase === 'uploading' || phase === 'done'}>
        {failed ? 'Retry' : 'Upload'}
      </Button>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: unknown duration, then a known total

While the file is being read, the total is unknown, so the bar is `indeterminate` and has no `value`. As soon as the row count is known, the same bar switches to a determinate value with `max` equal to that count.

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
