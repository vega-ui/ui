import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

const initialComments = [
  { id: 1, author: 'Tom Okafor', text: 'Can we try the darker blue for the header?' },
  { id: 2, author: 'Lea Novak', text: 'Typo in the second paragraph: “recieve”.' },
];

export default function DestructiveConfirmInAPopover() {
  const [comments, setComments] = useState(initialComments);

  return (
    <div
      style={{
        display: 'grid',
        boxSizing: 'border-box',
        width: '100%',
        minHeight: 160,
        alignContent: 'start',
        paddingInline: 'var(--spacing-8)',
        paddingBlock: 'var(--spacing-2)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {comments.map((comment, index) => (
        <div
          key={comment.id}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 'var(--spacing-6)',
            paddingBlock: 'var(--spacing-6)',
            borderBlockStart: index > 0 ? '1px solid var(--separator-opaque)' : undefined,
          }}
        >
          <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
            <Text size={3} fontWeight={500}>{comment.author}</Text>
            <Text size={3} style={{ color: 'var(--label-secondary)' }}>{comment.text}</Text>
          </div>
          <DeleteComment onDelete={() => setComments(comments.filter((item) => item.id !== comment.id))} />
        </div>
      ))}
      {comments.length === 0 && <Text size={3} style={{ paddingBlock: 'var(--spacing-6)', color: 'var(--label-secondary)' }}>No comments yet.</Text>}
    </div>
  );
}

function DeleteComment({ onDelete }: { onDelete: () => void }) {
  const textId = useId();
  const [open, setOpen] = useState(false);

  return (
    <Popover role='dialog' placement='bottom-end' open={open} onChangeOpen={setOpen}>
      <PopoverTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>Delete</Button>
      </PopoverTrigger>
      <PopoverContent aria-labelledby={textId}>
        <div style={{ display: 'grid', gap: 'var(--spacing-8)', maxWidth: 240 }}>
          <Text id={textId} size={3}>Delete this comment? It cannot be restored.</Text>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
            <Button size='sm' variant='secondary' appearance='ghost' autoFocus onClick={() => setOpen(false)}>Keep</Button>
            <Button size='sm' style={destructive} onClick={onDelete}>Delete</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
