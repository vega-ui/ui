import { Button, Icon, Separator } from '@vega-ui/react';
import { AlignCenterIcon, AlignLeftIcon, BoldIcon, ItalicIcon, LinkIcon, ListIcon, ListOrderedIcon } from '@vega-ui/icons';

export default function VerticalDividerInToolbar() {
  return (
    <div
      role='toolbar'
      aria-label='Text formatting'
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-2)',
        padding: 'var(--spacing-2)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-3)',
        background: 'var(--surface-primary)',
      }}
    >
      <Button square aria-label='Bold' variant='secondary' appearance='transparent'>
        <Icon><BoldIcon /></Icon>
      </Button>
      <Button square aria-label='Italic' variant='secondary' appearance='transparent'>
        <Icon><ItalicIcon /></Icon>
      </Button>
      <Button square aria-label='Insert link' variant='secondary' appearance='transparent'>
        <Icon><LinkIcon /></Icon>
      </Button>
      <Separator orientation='vertical' style={{ height: 'var(--spacing-10)', marginInline: 'var(--spacing-2)' }} />
      <Button square aria-label='Bulleted list' variant='secondary' appearance='transparent'>
        <Icon><ListIcon /></Icon>
      </Button>
      <Button square aria-label='Numbered list' variant='secondary' appearance='transparent'>
        <Icon><ListOrderedIcon /></Icon>
      </Button>
      <Separator orientation='vertical' style={{ height: 'var(--spacing-10)', marginInline: 'var(--spacing-2)' }} />
      <Button square aria-label='Align left' variant='secondary' appearance='transparent'>
        <Icon><AlignLeftIcon /></Icon>
      </Button>
      <Button square aria-label='Align center' variant='secondary' appearance='transparent'>
        <Icon><AlignCenterIcon /></Icon>
      </Button>
    </div>
  );
}
