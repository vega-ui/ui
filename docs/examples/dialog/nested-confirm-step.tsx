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

export default function NestedConfirmStep() {
  const memberTitleId = useId();
  const confirmTitleId = useId();
  const [memberOpen, setMemberOpen] = useState(false);
  const [removed, setRemoved] = useState(false);

  const remove = () => {
    setRemoved(true);
    setMemberOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        padding: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <div style={{ display: 'grid', minWidth: 0 }}>
        <Text size={3} fontWeight={500}>Grace Hopper</Text>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
          {removed ? 'Removed from the team' : 'Admin · grace@northwind.dev'}
        </Text>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        {removed && <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setRemoved(false)}>Undo</Button>}
        <Dialog open={memberOpen} onChangeOpen={setMemberOpen}>
          <DialogTrigger asChild>
            <Button size='sm' variant='secondary' appearance='ghost'>Manage</Button>
          </DialogTrigger>
          <DialogContent aria-labelledby={memberTitleId}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
              <Heading id={memberTitleId} as='h2' size={4} fontWeight={600}>Grace Hopper</Heading>
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
            <Text size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
              grace@northwind.dev · Admin since March 2024
            </Text>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='secondary' appearance='ghost'>Remove from team…</Button>
                </DialogTrigger>
                <DialogContent aria-labelledby={confirmTitleId}>
                  <Heading id={confirmTitleId} as='h2' size={4} fontWeight={600}>Remove Grace Hopper?</Heading>
                  <Text size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
                    She loses access to all team projects. Her files stay in the workspace.
                  </Text>
                  <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
                    <Button type='submit' value='cancel' variant='secondary' appearance='ghost'>Keep</Button>
                    <Button type='submit' value='remove' style={destructive} onClick={remove}>Remove</Button>
                  </form>
                </DialogContent>
              </Dialog>
              <DialogClose asChild>
                <Button>Done</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
