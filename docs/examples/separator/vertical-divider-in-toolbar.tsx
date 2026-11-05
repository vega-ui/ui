import { Icon, IconButton, Separator } from '@vega-ui/react';
import { AlignCenter, AlignLeft, Bold, Italic, Link, List, ListOrdered } from '@vega-ui/icons';

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
      <IconButton aria-label='Bold' variant='secondary' appearance='transparent'>
        <Icon><Bold /></Icon>
      </IconButton>
      <IconButton aria-label='Italic' variant='secondary' appearance='transparent'>
        <Icon><Italic /></Icon>
      </IconButton>
      <IconButton aria-label='Insert link' variant='secondary' appearance='transparent'>
        <Icon><Link /></Icon>
      </IconButton>
      <Separator orientation='vertical' style={{ height: 'var(--spacing-10)', marginInline: 'var(--spacing-2)' }} />
      <IconButton aria-label='Bulleted list' variant='secondary' appearance='transparent'>
        <Icon><List /></Icon>
      </IconButton>
      <IconButton aria-label='Numbered list' variant='secondary' appearance='transparent'>
        <Icon><ListOrdered /></Icon>
      </IconButton>
      <Separator orientation='vertical' style={{ height: 'var(--spacing-10)', marginInline: 'var(--spacing-2)' }} />
      <IconButton aria-label='Align left' variant='secondary' appearance='transparent'>
        <Icon><AlignLeft /></Icon>
      </IconButton>
      <IconButton aria-label='Align center' variant='secondary' appearance='transparent'>
        <Icon><AlignCenter /></Icon>
      </IconButton>
    </div>
  );
}
