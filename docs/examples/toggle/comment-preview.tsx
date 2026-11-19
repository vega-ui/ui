import { useId, useState, type FormEvent } from 'react';
import { Button, Icon, Label, Text, TextArea, Toggle } from '@vega-ui/react';
import { EyeIcon } from '@vega-ui/icons';

export default function CommentPreview() {
  const fieldId = useId();
  const [comment, setComment] = useState('Looks good to me. **Ship it** after the docs land.');
  const [previewing, setPreviewing] = useState(false);
  const [posted, setPosted] = useState<string[]>([]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (comment.trim() === '') return;

    setPosted((current) => [...current, comment.trim()]);
    setComment('');
    setPreviewing(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: 'grid',
        gap: 'var(--spacing-4)',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 440,
        padding: 'var(--spacing-8)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
        background: 'var(--surface-primary)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Label htmlFor={fieldId} size='sm'>Comment</Label>
        <Toggle size='xs' pressed={previewing} onChangePressed={setPreviewing}>
          <Icon size='xs'><EyeIcon /></Icon>
          Preview
        </Toggle>
      </div>
      <TextArea
        id={fieldId}
        name='comment'
        size='sm'
        rows={3}
        fullWidth
        placeholder='Write a comment'
        value={comment}
        onChange={(event) => setComment(event.currentTarget.value)}
      />
      {previewing && (
        <Text
          size={3}
          style={{
            display: 'block',
            padding: 'var(--spacing-5) var(--spacing-6)',
            borderRadius: 'var(--radius-4)',
            background: 'var(--fills-quaternary)',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'anywhere',
          }}
        >
          {comment.trim() === '' ? 'Nothing to preview' : comment.split('**').map((part, index) => (index % 2 === 1 ? <strong key={index}>{part}</strong> : part))}
        </Text>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
          {posted.length === 0 ? 'No comments yet' : `${posted.length} posted`}
        </Text>
        <Button type='submit' size='sm'>Comment</Button>
      </div>
    </form>
  );
}
