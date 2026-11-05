import type { CSSProperties } from 'react';
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
import { Trash2Icon, XIcon } from '@vega-ui/icons';
import { useState } from 'react';

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function DialogConfirmationActions() {
  const [deleted, setDeleted] = useState(false);

  if (deleted) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
        <Text size={3}>Q3 report.pdf was deleted.</Text>
        <Button type='button' size='sm' variant='secondary' appearance='ghost' onClick={() => setDeleted(false)}>
          Undo
        </Button>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>
          <Icon size='sm'><Trash2Icon /></Icon>
          Delete file
        </Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='delete-file-title' aria-describedby='delete-file-description'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='delete-file-title' as='h2' size={4} fontWeight={600}>Delete Q3 report.pdf?</Heading>
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
        <Text id='delete-file-description' size={3}>
          The file is removed for everyone in the workspace. Shared links stop working.
        </Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
          <DialogClose asChild>
            <Button variant='secondary' appearance='ghost' autoFocus>Keep file</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button style={destructive} onClick={() => setDeleted(true)}>Delete file</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
