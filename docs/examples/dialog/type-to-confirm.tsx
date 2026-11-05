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
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const workspace = 'northwind-studio';

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function TypeToConfirm() {
  const titleId = useId();
  const descriptionId = useId();
  const fieldId = useId();
  const [typed, setTyped] = useState('');

  const confirmed = typed === workspace;

  return (
    <Dialog onChangeOpen={() => setTyped('')}>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Delete workspace</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId} aria-describedby={descriptionId}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Delete {workspace}?</Heading>
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
          This permanently deletes 14 projects, 312 files and the billing history. Members lose access immediately.
        </Text>
        <form method='dialog' style={{ display: 'grid', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-10)' }}>
          <Label htmlFor={fieldId}>Type <b>{workspace}</b> to confirm</Label>
          <TextField>
            <TextFieldInput
              id={fieldId}
              value={typed}
              autoComplete='off'
              spellCheck={false}
              onChange={(event) => setTyped(event.currentTarget.value)}
            />
          </TextField>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-9)' }}>
            <DialogClose asChild>
              <Button type='button' variant='secondary' appearance='ghost'>Cancel</Button>
            </DialogClose>
            <Button type='submit' value='delete' disabled={!confirmed} style={confirmed ? destructive : undefined}>Delete workspace</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
