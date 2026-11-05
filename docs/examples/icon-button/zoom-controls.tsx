import { Icon, IconButton } from '@vega-ui/react';
import { MinusIcon, PlusIcon } from '@vega-ui/icons';
import { useState } from 'react';

const steps = [25, 50, 75, 100, 150, 200, 400];

export default function ZoomControls() {
  const [index, setIndex] = useState(3);
  const atMin = index === 0;
  const atMax = index === steps.length - 1;

  return (
    <div role='group' aria-label='Zoom' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <IconButton
        type='button'
        size='sm'
        variant='secondary'
        appearance='ghost'
        aria-label='Zoom out'
        disabled={atMin}
        onClick={() => setIndex(index - 1)}
      >
        <Icon><MinusIcon /></Icon>
      </IconButton>
      <output aria-live='polite' style={{ minWidth: '4ch', textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
        {steps[index]}%
      </output>
      <IconButton
        type='button'
        size='sm'
        variant='secondary'
        appearance='ghost'
        aria-label='Zoom in'
        disabled={atMax}
        onClick={() => setIndex(index + 1)}
      >
        <Icon><PlusIcon /></Icon>
      </IconButton>
    </div>
  );
}
