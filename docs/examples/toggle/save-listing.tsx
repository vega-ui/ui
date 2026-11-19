import { useState } from 'react';
import { Icon, Text, Toggle } from '@vega-ui/react';
import { HeartIcon } from '@vega-ui/icons';

export default function SaveListing() {
  const [saved, setSaved] = useState(false);

  return (
    <article
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 360,
        padding: 'var(--spacing-8)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
        background: 'var(--surface-primary)',
      }}
    >
      <div style={{ display: 'grid', gap: 'var(--spacing-1)', flex: 1, minWidth: 0 }}>
        <Text size={3} fontWeight={600}>Cabin by the lake</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>2 guests · 1 bedroom · €120 a night</Text>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
          {saved ? 'Saved to your favorites' : 'Not saved'}
        </Text>
      </div>
      <Toggle pressed={saved} onChangePressed={setSaved} square size='sm' aria-label='Save to favorites' style={{ flexShrink: 0 }}>
        <Icon><HeartIcon fill={saved ? 'currentColor' : 'none'} /></Icon>
      </Toggle>
    </article>
  );
}
