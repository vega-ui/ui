import { Icon, IconButton } from '@vega-ui/react';
import { HeartIcon } from '@vega-ui/icons';
import { useState } from 'react';

export default function ParentOwnedFavoriteToggle() {
  const [favorite, setFavorite] = useState(false);
  const count = favorite ? 129 : 128;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', width: '100%' }}>
      <IconButton
        type='button'
        variant='secondary'
        appearance='ghost'
        aria-label='Favorite'
        aria-pressed={favorite}
        onClick={() => setFavorite(!favorite)}
      >
        <Icon><HeartIcon fill={favorite ? 'currentColor' : 'none'} /></Icon>
      </IconButton>
      <span style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{count} people saved this recipe</span>
    </div>
  );
}
