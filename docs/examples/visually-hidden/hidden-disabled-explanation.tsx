import { Button, VisuallyHidden } from '@vega-ui/react';
import { useState } from 'react';

const sizes = [
  { label: 'S', inStock: true },
  { label: 'M', inStock: true },
  { label: 'L', inStock: false },
  { label: 'XL', inStock: false },
];

export default function HiddenDisabledExplanation() {
  const [selected, setSelected] = useState('M');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', width: '100%' }}>
      <div role='group' aria-label='Size' style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        {sizes.map((size) => (
          <Button
            key={size.label}
            type='button'
            size='sm'
            variant={selected === size.label ? 'primary' : 'secondary'}
            appearance='ghost'
            aria-pressed={selected === size.label}
            disabled={!size.inStock}
            onClick={() => setSelected(size.label)}
            style={{ textDecoration: size.inStock ? 'none' : 'line-through' }}
          >
            {size.label}
            {!size.inStock && (
              <VisuallyHidden asChild>
                <span>, sold out</span>
              </VisuallyHidden>
            )}
          </Button>
        ))}
      </div>
      <p style={{ margin: 0, color: 'var(--label-secondary)' }}>Selected size: {selected}</p>
    </div>
  );
}
