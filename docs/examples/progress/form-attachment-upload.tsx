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
