import type { CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Icon,
  IconButton,
  VisuallyHidden,
} from '@vega-ui/react';
import { ImageIcon, XIcon } from '@vega-ui/icons';

export default function HiddenDialogCue() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>
          <Icon size='sm'><ImageIcon /></Icon>
          View floor plan
        </Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='floor-plan-title'>
        <VisuallyHidden asChild>
          <h2 id='floor-plan-title'>Floor plan, apartment 4B</h2>
        </VisuallyHidden>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
        <div
          role='img'
          aria-label='Two bedrooms, open kitchen, balcony facing south, 74 square meters'
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: 'var(--spacing-2)',
            height: 220,
            marginBlockStart: 'var(--spacing-8)',
          }}
        >
          <div style={{ background: 'var(--fills-secondary)', borderRadius: 'var(--radius-2)' }} />
          <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
            <div style={{ background: 'var(--fills-tertiary)', borderRadius: 'var(--radius-2)' }} />
            <div style={{ background: 'var(--fills-primary)', borderRadius: 'var(--radius-2)' }} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
