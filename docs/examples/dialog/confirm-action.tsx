import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function ConfirmAction() {
  const titleId = useId();
  const descriptionId = useId();
  const [deleted, setDeleted] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        minHeight: 72,
        padding: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {deleted ? (
        <>
          <Text size={3} role='status' style={{ color: 'var(--label-secondary)' }}>Q3 board deck.pdf moved to trash.</Text>
          <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setDeleted(false)}>Undo</Button>
        </>
      ) : (
        <>
          <div style={{ display: 'grid', minWidth: 0 }}>
            <Text size={3} fontWeight={500}>Q3 board deck.pdf</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>4.2 MB · Edited yesterday</Text>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size='sm' variant='secondary' appearance='ghost'>Delete</Button>
            </DialogTrigger>
            <DialogContent
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              onClose={(event) => setDeleted(event.currentTarget.returnValue === 'delete')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
                <Heading id={titleId} as='h2' size={4} fontWeight={600}>Delete Q3 board deck.pdf?</Heading>
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
              <Text id={descriptionId} size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
                The file stays in trash for 30 days. Shared links stop working right away.
              </Text>
              <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
                <Button type='submit' value='cancel' variant='secondary' appearance='ghost'>Cancel</Button>
                <Button type='submit' value='delete' style={destructive}>Delete file</Button>
              </form>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
