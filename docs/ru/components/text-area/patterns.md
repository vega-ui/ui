# TextArea: паттерны

## Развёрнутый отзыв

Когда использовать:

- пользователям нужно место для подробных комментариев

Заметки по композиции:

- держите видимую подпись над полем
- добавьте вспомогательный текст, если ожидаемое содержимое неочевидно

Компромиссы:

- позволяет более содержательный ввод
- занимает больше места в раскладке, чем однострочное поле

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

## Область заметок на всю ширину

Когда использовать:

- раскладка формы уже занимает широкую панель

Заметки по композиции:

- используйте `fullWidth`
- сохраняйте предсказуемые ограничения ширины вокруг

Компромиссы:

- длинный текст проще просматривать
- может доминировать в узких раскладках

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

## Компактная внутренняя заметка

Когда использовать:

- поле многострочное, но второстепенное

Заметки по композиции:

- уменьшите плотность с помощью `size='sm'`
- делайте подсказку лаконичной

Компромиссы:

- экономит место
- менее удобно для длинных ответов

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
