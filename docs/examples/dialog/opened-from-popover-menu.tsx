import { useId, useRef, useState, type CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  Heading,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';
import { EllipsisIcon, XIcon } from '@vega-ui/icons';

export default function OpenedFromPopoverMenu() {
  const titleId = useId();
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [archived, setArchived] = useState(false);

  const openArchiveDialog = () => {
    setMenuOpen(false);
    setDialogOpen(true);
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
        <Text size={3} fontWeight={500}>Website redesign</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>{archived ? 'Archived · read-only' : '12 tasks · updated today'}</Text>
      </div>
      <Popover placement='bottom-end' open={menuOpen} onChangeOpen={setMenuOpen}>
        <PopoverTrigger asChild ref={menuTrigger}>
          <IconButton aria-label='Project actions' variant='secondary' appearance='ghost'>
            <Icon><EllipsisIcon /></Icon>
          </IconButton>
        </PopoverTrigger>
        <PopoverContent style={{ padding: 'var(--spacing-2)' }}>
          <div style={{ display: 'grid', minWidth: 160 }}>
            <Button appearance='transparent' variant='secondary' style={{ justifyContent: 'flex-start' }} onClick={() => setMenuOpen(false)}>Duplicate</Button>
            <Button appearance='transparent' variant='secondary' style={{ justifyContent: 'flex-start' }} onClick={openArchiveDialog} disabled={archived}>Archive…</Button>
          </div>
        </PopoverContent>
      </Popover>

      <Dialog open={dialogOpen} onChangeOpen={setDialogOpen}>
        <DialogContent aria-labelledby={titleId} onClose={() => menuTrigger.current?.focus()}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Archive Website redesign?</Heading>
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
            Archived projects are read-only and hidden from the sidebar.
          </Text>
          <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
            <Button type='submit' value='cancel' variant='secondary' appearance='ghost'>Cancel</Button>
            <Button type='submit' value='archive' onClick={() => setArchived(true)}>Archive</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
