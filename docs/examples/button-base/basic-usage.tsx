import { ButtonBase } from '@vega-ui/react';
import { useState } from 'react';

export default function BasicUsage() {
  const [likes, setLikes] = useState(24);

  return (
    <ButtonBase
      type='button'
      variant='secondary'
      appearance='ghost'
      onClick={() => setLikes(likes + 1)}
      style={{
        padding: 'var(--spacing-3) var(--spacing-8)',
        borderRadius: 'var(--radius-3)',
        fontSize: 'var(--font-size-2)',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      Like · {likes}
    </ButtonBase>
  );
}
