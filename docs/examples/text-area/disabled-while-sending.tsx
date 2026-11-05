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
