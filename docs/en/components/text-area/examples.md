# TextArea Examples

## Basic

### Basic: issue description with a hint

`TextArea` is the native `<textarea>` itself, so `id`, `name` and `rows` go straight on it. A `Label` points at it with `htmlFor`, and the hint is linked with `aria-describedby`.

<!-- example: text-area/issue-description.tsx -->
```tsx
import { HelperText, Label, TextArea } from '@vega-ui/react';
import { useId } from 'react';

export default function IssueDescription() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>What went wrong?</Label>
      <TextArea
        id={id}
        name='description'
        rows={4}
        fullWidth
        placeholder='Steps to reproduce, what you expected and what happened instead'
        aria-describedby={hintId}
      />
      <HelperText id={hintId}>Include the page URL and the time it happened, if you know it.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: counter and live preview

The parent owns the value: the counter and the changelog preview below are derived from it on every keystroke. `maxLength` is a hard limit, so typing stops at 280 characters.

<!-- example: text-area/release-notes-counter.tsx -->
```tsx
import { Label, Text, TextArea } from '@vega-ui/react';
import { useId, useState } from 'react';

const MAX_LENGTH = 280;

export default function ReleaseNotesCounter() {
  const id = useId();
  const counterId = `${id}-counter`;
  const [notes, setNotes] = useState('Faster search across archived invoices.\nDark mode for the billing portal.');
  const lines = notes.split('\n').filter((line) => line.trim() !== '');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Release highlights</Label>
        <TextArea
          id={id}
          rows={4}
          fullWidth
          value={notes}
          maxLength={MAX_LENGTH}
          aria-describedby={counterId}
          onChange={(event) => setNotes(event.currentTarget.value)}
        />
        <Text id={counterId} size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          {notes.length} / {MAX_LENGTH} characters
        </Text>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
        <Text size={2} fontWeight={500} style={{ color: 'var(--label-secondary)' }}>Changelog preview</Text>
        <ul style={{ display: 'grid', gap: 'var(--spacing-2)', margin: 0, paddingInlineStart: 'var(--spacing-10)' }}>
          {lines.map((line, index) => (
            <li key={index}><Text size={2} style={{ overflowWrap: 'anywhere' }}>{line}</Text></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: support request with a send shortcut

`required` and `minLength` use native validation, and `FormData` reads the message on submit. Ctrl+Enter or ⌘+Enter calls `requestSubmit()`, so the shortcut runs the same validation as the button.

<!-- example: text-area/support-request-form.tsx -->
```tsx
import { Button, HelperText, Label, Text, TextArea } from '@vega-ui/react';
import { FormEvent, KeyboardEvent, useId, useState } from 'react';

export default function SupportRequestForm() {
  const id = useId();
  const [sent, setSent] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = String(new FormData(event.currentTarget).get('message'));
    setSent(`Sent ${message.length} characters`);
    event.currentTarget.reset();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter') return;
    if (!event.metaKey && !event.ctrlKey) return;

    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Message to support</Label>
        <TextArea
          id={id}
          name='message'
          rows={5}
          fullWidth
          required
          minLength={20}
          aria-describedby={`${id}-hint`}
          onKeyDown={onKeyDown}
        />
        <HelperText id={`${id}-hint`}>At least 20 characters. Press Ctrl+Enter or ⌘+Enter to send.</HelperText>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Button type='submit'>Send request</Button>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{sent}</Text>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: feedback form in a dialog

A `fullWidth` textarea fills the dialog, and `autoFocus` puts the caret in it on open. Enter adds a new line instead of submitting; Escape still closes the dialog.

<!-- example: text-area/feedback-in-dialog.tsx -->
```tsx
import type { CSSProperties, FormEvent } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  Text,
  TextArea,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

export default function FeedbackInDialog() {
  const id = useId();
  const [status, setStatus] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const feedback = String(new FormData(event.currentTarget).get('feedback'));
    setStatus(`Thanks! We received ${feedback.length} characters of feedback.`);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Send feedback</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={`${id}-title`} style={{ width: 'min(480px, 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={`${id}-title`} as='h2' size={4} fontWeight={600}>Send feedback</Heading>
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
          <form method='dialog' onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={id}>What could be better?</Label>
              <TextArea id={id} name='feedback' rows={6} fullWidth required autoFocus aria-describedby={`${id}-hint`} />
              <HelperText id={`${id}-hint`}>Escape closes the dialog; Enter adds a new line.</HelperText>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
              <DialogClose asChild>
                <Button type='button' variant='secondary' appearance='ghost'>Cancel</Button>
              </DialogClose>
              <Button type='submit'>Send</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)', textAlign: 'center' }}>{status}</Text>
    </div>
  );
}
```
<!-- /example -->

### Layout/Overlay: compact note composer

`size='sm'` with two rows keeps a secondary input small next to the content it annotates. The `Label` uses the matching `size='sm'`.

<!-- example: text-area/compact-internal-note.tsx -->
```tsx
import { Button, Label, Text, TextArea } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

interface Note {
  id: number;
  text: string;
}

export default function CompactInternalNote() {
  const id = useId();
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, text: 'Customer asked to move the renewal to March.' },
  ]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const text = String(new FormData(form).get('note')).trim();
    if (text === '') return;

    setNotes((current) => [...current, { id: Date.now(), text }]);
    form.reset();
  };

  return (
    <div
      style={{
        display: 'grid',
        gap: 'var(--spacing-8)',
        width: '100%',
        padding: 'var(--spacing-8)',
        boxSizing: 'border-box',
        borderRadius: 'var(--radius-5)',
        border: '1px solid var(--separator-opaque)',
        background: 'var(--surface-primary)',
      }}
    >
      <ul style={{ display: 'grid', gap: 'var(--spacing-4)', margin: 0, padding: 0, listStyle: 'none' }}>
        {notes.map((note) => (
          <li key={note.id}><Text size={2} style={{ overflowWrap: 'anywhere' }}>{note.text}</Text></li>
        ))}
      </ul>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id} size='sm'>Internal note</Label>
        <TextArea id={id} name='note' size='sm' rows={2} fullWidth placeholder='Visible to your team only' />
        <Button type='submit' size='sm' variant='secondary' appearance='ghost' style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-1)' }}>Add note</Button>
      </form>
    </div>
  );
}
```
<!-- /example -->

## Error

### Error: soft character limit

Unlike `maxLength`, a soft limit lets people paste a long text and then trim it. Past the limit the field gets `error` and `aria-invalid`, the hint switches to an error, and submit is blocked.

<!-- example: text-area/soft-limit-error.tsx -->
```tsx
import { Button, HelperText, Label, TextArea } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

const LIMIT = 160;

export default function SoftLimitError() {
  const id = useId();
  const messageId = `${id}-message`;
  const [bio, setBio] = useState(
    'Product designer at Northwind. I work on billing, onboarding and everything in between, and I spend weekends restoring old film cameras and hiking the coastal trails near Porto.',
  );
  const over = bio.length - LIMIT;
  const invalid = over > 0;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Short bio</Label>
        <TextArea
          id={id}
          rows={6}
          fullWidth
          value={bio}
          error={invalid}
          aria-invalid={invalid}
          aria-describedby={messageId}
          onChange={(event) => setBio(event.currentTarget.value)}
        />
        <HelperText id={messageId} error={invalid}>
          {invalid ? `${over} characters over the ${LIMIT}-character limit.` : `${LIMIT - bio.length} characters left.`}
        </HelperText>
      </div>
      <Button type='submit' disabled={invalid} style={{ justifySelf: 'start' }}>Save bio</Button>
    </form>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: locked while sending

A `Fieldset` with `disabled` disables the textarea and the button together while the request is in flight, so nothing can change or be sent twice. The form clears once the comment is posted.

<!-- example: text-area/disabled-while-sending.tsx -->
```tsx
import { Button, Fieldset, Label, Text, TextArea } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function DisabledWhileSending() {
  const id = useId();
  const [sending, setSending] = useState(false);
  const [comments, setComments] = useState<string[]>([]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const comment = String(new FormData(form).get('comment')).trim();
    if (comment === '') return;

    setSending(true);
    setTimeout(() => {
      setComments((current) => [...current, comment]);
      setSending(false);
      form.reset();
    }, 1200);
  };

  return (
    <form onSubmit={onSubmit} aria-busy={sending} style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Fieldset disabled={sending} style={{ display: 'grid', gap: 'var(--spacing-12)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={id}>Comment</Label>
          <TextArea id={id} name='comment' rows={3} fullWidth placeholder='Reply to the reviewer' />
        </div>
        <Button type='submit' style={{ justifySelf: 'start' }}>{sending ? 'Posting…' : 'Post comment'}</Button>
      </Fieldset>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
        {comments.length === 1 ? '1 comment posted' : `${comments.length} comments posted`}
      </Text>
    </form>
  );
}
```
<!-- /example -->

## Edge

### Edge: grows with its content

`field-sizing: content` lets the textarea grow with its text, and `maxHeight` caps it, after which it scrolls. Browsers without `field-sizing` keep the height from `rows`.

<!-- example: text-area/auto-growing-notes.tsx -->
```tsx
import type { CSSProperties } from 'react';
import { HelperText, Label, TextArea } from '@vega-ui/react';
import { useId } from 'react';

export default function AutoGrowingNotes() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Rollout notes</Label>
      <TextArea
        id={id}
        rows={2}
        fullWidth
        aria-describedby={`${id}-hint`}
        defaultValue={'Enable the new checkout for 10% of EU traffic on Monday.\nWatch the payment error rate for 24 hours before going to 50%.'}
        style={{ fieldSizing: 'content', maxHeight: 240, resize: 'none' } as CSSProperties}
      />
      <HelperText id={`${id}-hint`}>
        Grows with its content up to 240 px, then scrolls. Browsers without field-sizing keep two rows.
      </HelperText>
    </div>
  );
}
```
<!-- /example -->
